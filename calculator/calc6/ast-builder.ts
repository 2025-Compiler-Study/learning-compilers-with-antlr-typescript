import { ParserRuleContext, Token } from "antlr4ng";
import {
  ProgramContext,
  FuncDefContext,
  DeclareContext,
  ExprAssignContext,
  ExprStmtContext,
  ReturnContext,
  IfElseContext,
  StmtBlockContext,
  FuncCallContext,
  IntContext,
  VarContext,
  ParensContext,
  MulDivContext,
  AddSubContext,
  ParamListContext,
  ArgListContext,
  CondContext,
  BlockContext,
  StmtContext,
} from "../generated-calc6/Calc6Parser";
import { Calc6Visitor } from "../generated-calc6/Calc6Visitor";
import {
  AstNode,
  TypeName,
  Program,
  Stmt,
  Expr,
  BlockStmt,
  VariableDecl,
  Param,
  DeclareStmt,
  AssignStmt,
  ExprStmt,
  IfStmt,
  ReturnStmt,
  IntLiteralExpr,
  IdentifierExpr,
  BinaryExpr,
  CallExpr,
  FuncDef,
  SourceSpan,
} from "./ast";
import { SymbolTableStack } from "./symbol-table";
import { SemanticError, SemanticErrorKind } from "./errors/semantic-error";
import { RESERVED_NAMES, RESERVED_IDENTIFIERS, RESERVED_IDENTIFIERS_EXCEPT_ENTRY_POINT } from "./reserved-names";

type FunctionSignature = {
  params: Map<string, TypeName>;
  returnType: TypeName;
};

export class AstBuilder extends Calc6Visitor<AstNode | AstNode[]> {
  private readonly symbolTable: SymbolTableStack = new SymbolTableStack();
  private readonly errors: SemanticError[] = [];
  private readonly functionSignatures: Map<string, FunctionSignature> = new Map();

  getErrors(): SemanticError[] {
    return [...this.errors];
  }

  private pushError(kind: SemanticErrorKind, name: string, span: SourceSpan, message: string): void {
    this.errors.push(new SemanticError(kind, name, span, message));
  }

  private checkReservedNames(name: string, reservedNames: ReadonlySet<string>): boolean {
    return reservedNames.has(name);
  }

  private getSpan(ctx: ParserRuleContext) {
    return {
      startLine: ctx.start?.line ?? 0,
      startColumn: ctx.start?.column ?? 0,
      endLine: ctx.stop?.line ?? ctx.start?.line ?? 0,
      endColumn: (ctx.stop?.column ?? 0) + (ctx.stop?.text?.length ?? 0),
    };
  }

  private getIdentSpan(token: Token, name: string): SourceSpan {
    return {
      startLine: token.line,
      startColumn: token.column,
      endLine: token.line,
      endColumn: token.column + name.length,
    };
  }

  private visitStmts(stmts: StmtContext[]): Stmt[] {
    return stmts.flatMap((s) => {
      const result = this.visit(s);
      return Array.isArray(result) ? (result as Stmt[]) : [result as Stmt];
    });
  }

  private getReturnType(ctx: FuncDefContext): TypeName {
    return ctx.getChild(1)?.getText() === TypeName.Int ? TypeName.Int : TypeName.Void;
  }

  private inferExprType(expr: Expr): TypeName {
    if (expr instanceof CallExpr) {
      return this.functionSignatures.get(expr.callee)?.returnType ?? TypeName.Int;
    }
    return TypeName.Int;
  }

  visitProgram = (ctx: ProgramContext): Program => {
    this.symbolTable.enterScope();

    ctx.funcDef().forEach((fd) => {
      const params = new Map<string, TypeName>();
      fd.paramList()
        ?.IDENT()
        .forEach((ident) => params.set(ident.getText(), TypeName.Int));
      this.functionSignatures.set(fd.IDENT().getText(), { params, returnType: this.getReturnType(fd) });
    });

    const functions = ctx.funcDef().map((fd) => this.visit(fd) as FuncDef);
    if (!functions.some((f) => f.name === RESERVED_NAMES.ENTRY_POINT)) {
      this.errors.push(
        new SemanticError(
          SemanticErrorKind.MissingMain,
          RESERVED_NAMES.ENTRY_POINT,
          this.getSpan(ctx),
          `진입점 함수 '${RESERVED_NAMES.ENTRY_POINT}'이 없습니다`,
        ),
      );
    }
    this.symbolTable.exitScope();
    return new Program(functions, this.getSpan(ctx));
  };

  visitDeclare = (ctx: DeclareContext): DeclareStmt[] => {
    const stmtSpan = this.getSpan(ctx);
    return ctx.IDENT().map((v) => {
      const varName = v.getText();
      const varSpan = this.getIdentSpan(v.symbol, varName);
      if (this.checkReservedNames(varName, RESERVED_IDENTIFIERS)) {
        this.pushError(
          SemanticErrorKind.ReservedIdentifier,
          varName,
          varSpan,
          `'${varName}'은 예약된 이름이라 변수로 사용할 수 없습니다`,
        );
      } else {
        try {
          this.symbolTable.declare(varName);
        } catch (e) {
          this.pushError(SemanticErrorKind.RedeclaredIdentifier, varName, varSpan, (e as Error).message);
        }
      }
      return new DeclareStmt([new VariableDecl(TypeName.Int, varName, varSpan)], stmtSpan);
    });
  };

  visitExprAssign = (ctx: ExprAssignContext): AssignStmt => {
    const span = this.getSpan(ctx);
    const identNode = ctx.IDENT();
    const varName = identNode.getText();
    const varSpan = this.getIdentSpan(identNode.symbol, varName);
    try {
      this.symbolTable.assertDeclared(varName);
    } catch (e) {
      this.pushError(SemanticErrorKind.UndeclaredVariable, varName, varSpan, (e as Error).message);
    }
    const target = new IdentifierExpr(varName, varSpan);
    const value = this.visit(ctx.expr()) as Expr;
    return new AssignStmt(target, value, span);
  };

  visitExprStmt = (ctx: ExprStmtContext): ExprStmt => {
    const expr = this.visit(ctx.expr()) as Expr;
    return new ExprStmt(expr, this.getSpan(ctx));
  };

  visitReturn = (ctx: ReturnContext): ReturnStmt => {
    const exprCtx = ctx.expr();
    const value = exprCtx ? (this.visit(exprCtx) as Expr) : undefined;
    return new ReturnStmt(value, this.getSpan(ctx));
  };

  visitFuncDef = (ctx: FuncDefContext): FuncDef => {
    const span = this.getSpan(ctx);
    const name = ctx.IDENT().getText();
    const returnType: TypeName = this.getReturnType(ctx);

    if (this.checkReservedNames(name, RESERVED_IDENTIFIERS_EXCEPT_ENTRY_POINT)) {
      this.pushError(
        SemanticErrorKind.ReservedIdentifier,
        name,
        span,
        `'${name}'은 예약된 이름이라 함수로 사용할 수 없습니다`,
      );
    } else {
      try {
        this.symbolTable.declare(name);
      } catch (e) {
        this.pushError(SemanticErrorKind.RedeclaredIdentifier, name, span, (e as Error).message);
      }
    }

    this.symbolTable.enterScope();

    const paramListCtx = ctx.paramList();
    const params: Param[] = paramListCtx ? (this.visit(paramListCtx) as Param[]) : [];

    const blockCtx = ctx.block();
    const bodyStmts = this.visitStmts(blockCtx.stmt());
    const body = new BlockStmt(bodyStmts, this.getSpan(blockCtx));

    this.symbolTable.exitScope();

    return new FuncDef(name, params, returnType, body, span);
  };

  visitParamList = (ctx: ParamListContext): Param[] => {
    return ctx.IDENT().map((ident) => {
      const paramName = ident.getText();
      const paramSpan = this.getIdentSpan(ident.symbol, paramName);
      if (this.checkReservedNames(paramName, RESERVED_IDENTIFIERS)) {
        this.pushError(
          SemanticErrorKind.ReservedIdentifier,
          paramName,
          paramSpan,
          `'${paramName}'은 예약된 이름이라 매개변수로 사용할 수 없습니다`,
        );
      } else {
        try {
          this.symbolTable.declare(paramName);
        } catch (e) {
          this.pushError(SemanticErrorKind.RedeclaredIdentifier, paramName, paramSpan, (e as Error).message);
        }
      }
      return new Param(TypeName.Int, paramName, paramSpan);
    });
  };

  visitArgList = (ctx: ArgListContext): Expr[] => {
    return ctx.expr().map((e) => this.visit(e) as Expr);
  };

  visitFuncCall = (ctx: FuncCallContext): CallExpr => {
    const span = this.getSpan(ctx);
    const callee = ctx.IDENT().getText();
    if (callee === RESERVED_NAMES.ENTRY_POINT) {
      this.errors.push(
        new SemanticError(
          SemanticErrorKind.InvalidMainCall,
          callee,
          span,
          `진입점 함수 '${RESERVED_NAMES.ENTRY_POINT}'은 일반 호출식으로 사용할 수 없습니다`,
        ),
      );
    }
    const argListCtx = ctx.argList();
    const args = argListCtx ? (this.visit(argListCtx) as Expr[]) : undefined;

    const signature = this.functionSignatures.get(callee);
    if (signature) {
      const paramNames = [...signature.params.keys()];
      const actualArgsCount = args?.length ?? 0;
      if (actualArgsCount !== paramNames.length) {
        this.pushError(
          SemanticErrorKind.ArgumentCountMismatch,
          callee,
          span,
          `함수 '${callee}'는 매개변수 ${paramNames.length}개가 필요한데 인자 ${actualArgsCount}개가 전달되었습니다`,
        );
      } else {
        paramNames.forEach((paramName, i) => {
          const paramType = signature.params.get(paramName)!;
          const argType = this.inferExprType(args![i]!);
          if (argType !== paramType) {
            this.pushError(
              SemanticErrorKind.ArgumentTypeMismatch,
              callee,
              span,
              `함수 '${callee}'의 ${i + 1}번째 인자 타입이 올바르지 않습니다 (매개변수 '${paramName}': '${paramType}' 필요, 전달된 타입: '${argType}')`,
            );
          }
        });
      }
    }

    return new CallExpr(callee, args, span);
  };

  visitIfElse = (ctx: IfElseContext): IfStmt => {
    const condition = this.visit(ctx.cond()) as Expr;
    const thenBranch = this.visit(ctx._thenBlock!) as Stmt;
    const elseBranch = ctx._elseBlock ? (this.visit(ctx._elseBlock) as Stmt) : undefined;
    return new IfStmt(condition, thenBranch, elseBranch, this.getSpan(ctx));
  };

  visitStmtBlock = (ctx: StmtBlockContext): BlockStmt => {
    return this.visit(ctx.block()) as BlockStmt;
  };

  visitBlock = (ctx: BlockContext): BlockStmt => {
    this.symbolTable.enterScope();
    const stmts = this.visitStmts(ctx.stmt());
    this.symbolTable.exitScope();
    return new BlockStmt(stmts, this.getSpan(ctx));
  };

  visitInt = (ctx: IntContext): IntLiteralExpr => {
    const value = parseInt(ctx.INT().getText(), 10);
    return new IntLiteralExpr(value, this.getSpan(ctx));
  };

  visitVar = (ctx: VarContext): IdentifierExpr => {
    const name = ctx.IDENT().getText();
    const span = this.getSpan(ctx);
    try {
      this.symbolTable.assertDeclared(name);
    } catch (e) {
      this.pushError(SemanticErrorKind.UndeclaredVariable, name, span, (e as Error).message);
    }
    return new IdentifierExpr(name, span);
  };

  visitParens = (ctx: ParensContext): Expr => {
    return this.visit(ctx.expr()) as Expr;
  };

  private buildBinaryExpr(ctx: MulDivContext | AddSubContext | CondContext): BinaryExpr {
    const op = ctx.getChild(1)!.getText() as BinaryExpr["op"];
    const left = this.visit(ctx.expr(0)!) as Expr;
    const right = this.visit(ctx.expr(1)!) as Expr;
    return new BinaryExpr(op, left, right, this.getSpan(ctx));
  }

  visitMulDiv = (ctx: MulDivContext): BinaryExpr => this.buildBinaryExpr(ctx);

  visitAddSub = (ctx: AddSubContext): BinaryExpr => this.buildBinaryExpr(ctx);

  visitCond = (ctx: CondContext): BinaryExpr => this.buildBinaryExpr(ctx);
}
