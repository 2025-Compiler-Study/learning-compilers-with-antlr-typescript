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

function getSpan(ctx: ParserRuleContext) {
  return {
    startLine: ctx.start?.line ?? 0,
    startColumn: ctx.start?.column ?? 0,
    endLine: ctx.stop?.line ?? ctx.start?.line ?? 0,
    endColumn: (ctx.stop?.column ?? 0) + (ctx.stop?.text?.length ?? 0),
  };
}

export class AstBuilder extends Calc5Visitor<AstNode> {
  visitProgram = (ctx: ProgramContext): Program => {
    const statements = ctx.stmt().map((s) => this.visit(s) as Stmt);
    return new Program(statements, getSpan(ctx));
  };

  visitDeclare = (ctx: DeclareContext): DeclareStmt => {
    const declarations = ctx.VAR().map((v) => new VariableDecl("int", v.getText(), getSpan(ctx)));
    return new DeclareStmt(declarations, getSpan(ctx));
  };

  visitExprAssign = (ctx: ExprAssignContext): AssignStmt => {
    const target = new IdentifierExpr(ctx.VAR().getText(), getSpan(ctx));
    const value = this.visit(ctx.expr()) as Expr;
    return new AssignStmt(target, value, getSpan(ctx));
  };

  visitReadAssign = (ctx: ReadAssignContext): AssignStmt => {
    const target = new IdentifierExpr(ctx.VAR().getText(), getSpan(ctx));
    const value = new CallExpr("read", undefined, getSpan(ctx));
    return new AssignStmt(target, value, getSpan(ctx));
  };

  visitWrite = (ctx: WriteContext): ExprStmt => {
    const arg = this.visit(ctx.expr()) as Expr;
    const expr = new CallExpr("write", [arg], getSpan(ctx));
    return new ExprStmt(expr, getSpan(ctx));
  };

  visitIfElse = (ctx: IfElseContext): IfStmt => {
    const condition = this.visit(ctx.cond()) as Expr;
    const thenBranch = this.visit(ctx._thenBlock!) as Stmt;
    const elseBranch = ctx._elseBlock ? (this.visit(ctx._elseBlock) as Stmt) : undefined;
    return new IfStmt(condition, thenBranch, elseBranch, getSpan(ctx));
  };

  visitStmtBlock = (ctx: StmtBlockContext): BlockStmt => {
    return this.visit(ctx.block()) as BlockStmt;
  };

  visitBlock = (ctx: BlockContext): BlockStmt => {
    const statements = ctx.stmt().map((s) => this.visit(s) as Stmt);
    return new BlockStmt(statements, getSpan(ctx));
  };

  visitInt = (ctx: IntContext): IntLiteralExpr => {
    const value = parseInt(ctx.INT().getText(), 10);
    return new IntLiteralExpr(value, getSpan(ctx));
  };

  visitVar = (ctx: VarContext): IdentifierExpr => {
    return new IdentifierExpr(ctx.VAR().getText(), getSpan(ctx));
  };

  visitParens = (ctx: ParensContext): Expr => {
    return this.visit(ctx.expr()) as Expr;
  };

  visitMulDiv = (ctx: MulDivContext): BinaryExpr => {
    const op = ctx.getChild(1)!.getText() as "*" | "/";
    const left = this.visit(ctx.expr(0)!) as Expr;
    const right = this.visit(ctx.expr(1)!) as Expr;
    return new BinaryExpr(op, left, right, getSpan(ctx));
  };

  visitAddSub = (ctx: AddSubContext): BinaryExpr => {
    const op = ctx.getChild(1)!.getText() as "+" | "-";
    const left = this.visit(ctx.expr(0)!) as Expr;
    const right = this.visit(ctx.expr(1)!) as Expr;
    return new BinaryExpr(op, left, right, getSpan(ctx));
  };

  visitCond = (ctx: CondContext): BinaryExpr => {
    const op = ctx.getChild(1)!.getText() as "==" | "!=" | ">" | ">=" | "<" | "<=";
    const left = this.visit(ctx.expr(0)!) as Expr;
    const right = this.visit(ctx.expr(1)!) as Expr;
    return new BinaryExpr(op, left, right, getSpan(ctx));
  };
}
