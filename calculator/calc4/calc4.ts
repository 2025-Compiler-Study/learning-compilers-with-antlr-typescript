import { CalcPlusVisitor } from "../generated/CalcPlusVisitor";
import {
  Calc4Context,
  IntContext,
  MulDivContext,
  AddSubContext,
  ParensContext,
  ExprAssignContext,
  VarContext,
  IfElseContext,
  CondContext,
  BlockContext,
  ReadAssignContext,
  WriteContext,
  DeclareContext,
} from "../generated/CalcPlusParser";
import { Readable, Writable } from "stream";
import { compare, type ComparisonOperator } from "../calc4/helper";
import { SymbolTableStack } from "./symbol-table";

export class Calc4Visitor extends CalcPlusVisitor<any> {
  private symbolTable: SymbolTableStack;

  constructor(
    private reader: Readable,
    private writer: Writable,
  ) {
    super();
    this.symbolTable = new SymbolTableStack();
  }

  visitCalc4 = (ctx: Calc4Context): void => {
    const stmts = ctx.stmt();

    for (const stmt of stmts) {
      this.visit(stmt);
    }
  };

  visitInt = (ctx: IntContext): number => {
    return parseInt(ctx.INT().getText());
  };

  visitMulDiv = (ctx: MulDivContext): number => {
    const left = this.visit(ctx.expr(0)!);
    const right = this.visit(ctx.expr(1)!);
    const op = ctx._op?.text;

    return op === "*" ? left * right : Math.floor(left / right);
  };

  visitAddSub = (ctx: AddSubContext): number => {
    const left = this.visit(ctx.expr(0)!);
    const right = this.visit(ctx.expr(1)!);
    const op = ctx._op?.text;

    return op === "+" ? left + right : left - right;
  };

  visitParens = (ctx: ParensContext): number => {
    return this.visit(ctx.expr());
  };

  visitExprAssign = (ctx: ExprAssignContext): number => {
    const varName = ctx.VAR().getText();
    const value = this.visit(ctx.expr());
    this.symbolTable.setVariable(varName, value);
    return value;
  };

  visitVar = (ctx: VarContext): number => {
    return this.symbolTable.getVariable(ctx.VAR().getText());
  };

  visitDeclare = (ctx: DeclareContext): void => {
    const varNames = ctx.VAR();
    for (const varNode of varNames) {
      this.symbolTable.declareVariable(varNode.getText());
    }
  };

  visitIfElse = (ctx: IfElseContext): void => {
    const condResult = this.visit(ctx.cond());

    if (condResult) {
      this.visit(ctx._thenBlock!);
    } else if (ctx._elseBlock) {
      this.visit(ctx._elseBlock);
    }
  };

  visitCond = (ctx: CondContext): boolean => {
    const leftValue = this.visit(ctx.expr(0)!);
    const rightValue = this.visit(ctx.expr(1)!);
    const cmpOp = ctx._cmpOp!.text as ComparisonOperator;

    return compare(leftValue, rightValue, cmpOp);
  };

  visitBlock = (ctx: BlockContext): void => {
    this.symbolTable.enterScope();

    const stmts = ctx.stmt();
    for (const stmt of stmts) {
      this.visit(stmt);
    }

    this.symbolTable.exitScope();
  };

  visitReadAssign = (ctx: ReadAssignContext): void => {
    const chunk = this.reader.read();
    const lines = chunk.split("\n");
    const input = lines[0];

    this.reader = Readable.from([lines.slice(1).join("\n")]);

    const varName = ctx.VAR().getText();
    const value = parseInt(input.trim()) || 0;

    this.symbolTable.setVariable(varName, value);
  };

  visitWrite = (ctx: WriteContext): void => {
    const result: number = this.visit(ctx.expr());
    this.writer.write(result.toString() + "\n");
  };
}
