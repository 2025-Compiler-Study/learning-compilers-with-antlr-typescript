import { ParserRuleContext } from "antlr4ng";
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
} from "./ast";
import { SymbolTableStack } from "./symbol-table";
import { SemanticError, SemanticErrorKind } from "./errors/semantic-error";

const ENTRY_POINT_NAME = "main";

export class AstBuilder extends Calc6Visitor<AstNode | AstNode[]> {
  private readonly symbolTable: SymbolTableStack = new SymbolTableStack();
  private readonly errors: SemanticError[] = [];

  getErrors(): SemanticError[] {
    return [...this.errors];
  }

  private getSpan(ctx: ParserRuleContext) {
    return {
      startLine: ctx.start?.line ?? 0,
      startColumn: ctx.start?.column ?? 0,
      endLine: ctx.stop?.line ?? ctx.start?.line ?? 0,
      endColumn: (ctx.stop?.column ?? 0) + (ctx.stop?.text?.length ?? 0),
    };
  }

  private visitFuncDefs(funcDefs: FuncDefContext[]): FuncDef[] {
    return funcDefs.map((fd) => this.visit(fd) as FuncDef);
  }

  private visitStmts(stmts: StmtContext[]): Stmt[] {
    return stmts.flatMap((s) => {
      const result = this.visit(s);
      return Array.isArray(result) ? (result as Stmt[]) : [result as Stmt];
    });
  }

  visitProgram = (ctx: ProgramContext): Program => {
    this.symbolTable.enterScope();
    const functions = this.visitFuncDefs(ctx.funcDef());
    if (!functions.some((f) => f.name === ENTRY_POINT_NAME)) {
      this.errors.push(
        new SemanticError(
          SemanticErrorKind.MissingMain,
          ENTRY_POINT_NAME,
          this.getSpan(ctx),
          `진입점 함수 '${ENTRY_POINT_NAME}'이 없습니다`,
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
      const varSpan = {
        startLine: v.symbol.line,
        startColumn: v.symbol.column,
        endLine: v.symbol.line,
        endColumn: v.symbol.column + varName.length,
      };
      if (varName === ENTRY_POINT_NAME) {
        this.errors.push(
          new SemanticError(
            SemanticErrorKind.ReservedIdentifier,
            varName,
            varSpan,
            `'${ENTRY_POINT_NAME}'은 예약된 이름이라 변수로 사용할 수 없습니다`,
          ),
        );
      } else {
        try {
          this.symbolTable.declare(varName);
        } catch (e) {
          this.errors.push(
            new SemanticError(SemanticErrorKind.RedeclaredIdentifier, varName, varSpan, (e as Error).message),
          );
        }
      }
      return new DeclareStmt([new VariableDecl(TypeName.Int, varName, varSpan)], stmtSpan);
    });
  };

  visitExprAssign = (ctx: ExprAssignContext): AssignStmt => {
    const span = this.getSpan(ctx);
    const varName = ctx.IDENT().getText();
    const varToken = ctx.IDENT().symbol;
    const varSpan = {
      startLine: varToken.line,
      startColumn: varToken.column,
      endLine: varToken.line,
      endColumn: varToken.column + varName.length,
    };
    try {
      this.symbolTable.assertDeclared(varName);
    } catch (e) {
      this.errors.push(new SemanticError(SemanticErrorKind.UndeclaredVariable, varName, varSpan, (e as Error).message));
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
    const returnType: TypeName = ctx.getChild(1)?.getText() === TypeName.Int ? TypeName.Int : TypeName.Void;

    try {
      this.symbolTable.declare(name);
    } catch (e) {
      this.errors.push(new SemanticError(SemanticErrorKind.RedeclaredIdentifier, name, span, (e as Error).message));
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
      const paramSpan = {
        startLine: ident.symbol.line,
        startColumn: ident.symbol.column,
        endLine: ident.symbol.line,
        endColumn: ident.symbol.column + paramName.length,
      };
      if (paramName === ENTRY_POINT_NAME) {
        this.errors.push(
          new SemanticError(
            SemanticErrorKind.ReservedIdentifier,
            paramName,
            paramSpan,
            `'${ENTRY_POINT_NAME}'은 예약된 이름이라 매개변수로 사용할 수 없습니다`,
          ),
        );
      } else {
        try {
          this.symbolTable.declare(paramName);
        } catch (e) {
          this.errors.push(
            new SemanticError(SemanticErrorKind.RedeclaredIdentifier, paramName, paramSpan, (e as Error).message),
          );
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
    if (callee === ENTRY_POINT_NAME) {
      this.errors.push(
        new SemanticError(
          SemanticErrorKind.InvalidMainCall,
          callee,
          span,
          `진입점 함수 '${ENTRY_POINT_NAME}'은 일반 호출식으로 사용할 수 없습니다`,
        ),
      );
    }
    const argListCtx = ctx.argList();
    const args = argListCtx ? (this.visit(argListCtx) as Expr[]) : undefined;
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
      this.errors.push(new SemanticError(SemanticErrorKind.UndeclaredVariable, name, span, (e as Error).message));
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
