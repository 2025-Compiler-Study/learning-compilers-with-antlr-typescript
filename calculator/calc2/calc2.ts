import { Calc1Visitor } from "../calc1/calc1_v";
import { BlockContext, Calc2Context, CondContext, IfElseContext } from "../generated/CalcPlusParser";
import { compare, type ComparisonOperator } from "./helper";

export class Calc2Visitor extends Calc1Visitor {
  visitCalc2 = (ctx: Calc2Context): void => {
    const stmts = ctx.stmt();

    for (const stmt of stmts) {
      this.visit(stmt);
    }
  };

  visitIfElse = (ctx: IfElseContext): void => {
    const condNode = ctx.cond();
    const condResult = this.visit(condNode);
    const thenBlock = ctx._thenBlock;
    const elseBlock = ctx._elseBlock;

    if (condResult) {
      if (!thenBlock) {
        throw new Error("then 블록을 찾을 수 없습니다");
      }
      this.visit(thenBlock);
    } else if (elseBlock) {
      this.visit(elseBlock);
    }
  };

  visitCond = (ctx: CondContext): boolean => {
    const leftExpr = ctx.expr(0);
    const rightExpr = ctx.expr(1);
    const cmpOpNode = ctx._cmpOp;

    if (!leftExpr) {
      throw new Error("왼쪽 표현식을 찾을 수 없습니다");
    }
    if (!rightExpr) {
      throw new Error("오른쪽 표현식을 찾을 수 없습니다");
    }

    const leftValue = this.visit(leftExpr);
    const rightValue = this.visit(rightExpr);

    const cmpOp = cmpOpNode?.text as ComparisonOperator;

    return compare(leftValue, rightValue, cmpOp);
  };

  visitBlock = (ctx: BlockContext): void => {
    const stmts = ctx.stmt();

    for (const stmt of stmts) {
      this.visit(stmt);
    }
  };
}
