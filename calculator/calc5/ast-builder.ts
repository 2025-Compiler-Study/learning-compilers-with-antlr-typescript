import { ParserRuleContext } from "antlr4ng";
import {
  ProgramContext,
  DeclareContext,
  ExprAssignContext,
  ReadAssignContext,
  WriteContext,
  IfElseContext,
  StmtBlockContext,
  IntContext,
  VarContext,
  ParensContext,
  MulDivContext,
  AddSubContext,
  CondContext,
  BlockContext,
} from "../generated-ast/Calc5Parser";
import { Calc5Visitor } from "../generated-ast/Calc5Visitor";
import {
  AstNode,
  Program,
  Stmt,
  Expr,
  BlockStmt,
  VariableDecl,
  DeclareStmt,
  AssignStmt,
  ExprStmt,
  IfStmt,
  IntLiteralExpr,
  IdentifierExpr,
  BinaryExpr,
  CallExpr,
} from "./ast";

export class AstBuilder extends Calc5Visitor<AstNode> {
  private getSpan(ctx: ParserRuleContext) {
    return {
      startLine: ctx.start?.line ?? 0,
      startColumn: ctx.start?.column ?? 0,
      endLine: ctx.stop?.line ?? ctx.start?.line ?? 0,
      endColumn: (ctx.stop?.column ?? 0) + (ctx.stop?.text?.length ?? 0),
    };
  }

  visitProgram = (ctx: ProgramContext): Program => {
    const statements = ctx.stmt().map((s) => this.visit(s) as Stmt);
    return new Program(statements, this.getSpan(ctx));
  };

  visitDeclare = (ctx: DeclareContext): DeclareStmt => {
    const span = this.getSpan(ctx);
    const declarations = ctx.VAR().map((v) => new VariableDecl("int", v.getText(), span));
    return new DeclareStmt(declarations, span);
  };

  visitExprAssign = (ctx: ExprAssignContext): AssignStmt => {
    const span = this.getSpan(ctx);
    const target = new IdentifierExpr(ctx.VAR().getText(), span);
    const value = this.visit(ctx.expr()) as Expr;
    return new AssignStmt(target, value, span);
  };

  visitReadAssign = (ctx: ReadAssignContext): AssignStmt => {
    const span = this.getSpan(ctx);
    const target = new IdentifierExpr(ctx.VAR().getText(), span);
    const value = new CallExpr("read", undefined, span);
    return new AssignStmt(target, value, span);
  };

  visitWrite = (ctx: WriteContext): ExprStmt => {
    const span = this.getSpan(ctx);
    const arg = this.visit(ctx.expr()) as Expr;
    const expr = new CallExpr("write", [arg], span);
    return new ExprStmt(expr, span);
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
    const statements = ctx.stmt().map((s) => this.visit(s) as Stmt);
    return new BlockStmt(statements, this.getSpan(ctx));
  };

  visitInt = (ctx: IntContext): IntLiteralExpr => {
    const value = parseInt(ctx.INT().getText(), 10);
    return new IntLiteralExpr(value, this.getSpan(ctx));
  };

  visitVar = (ctx: VarContext): IdentifierExpr => {
    return new IdentifierExpr(ctx.VAR().getText(), this.getSpan(ctx));
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
