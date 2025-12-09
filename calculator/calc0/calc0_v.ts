import { IntContext, MulDivContext, AddSubContext, ParensContext, Calc0Context } from "../generated/CalcPlusParser";
import { CalcPlusVisitor } from "../generated/CalcPlusVisitor";

export class CalculatorV extends CalcPlusVisitor<number> {
  visitCalc0 = (ctx: Calc0Context): number => {
    const result = this.visit(ctx.expr());

    if (result === null) {
      throw new Error("표현식 평가 결과가 null입니다");
    }

    return result;
  };

  visitInt = (ctx: IntContext): number => {
    const intNode = ctx.INT();
    if (!intNode) {
      throw new Error("INT 노드를 찾을 수 없습니다");
    }
    const value = parseInt(intNode.getText());

    return value;
  };

  visitMulDiv = (ctx: MulDivContext): number => {
    const leftExpr = ctx.expr(0);
    const rightExpr = ctx.expr(1);

    if (!leftExpr) {
      throw new Error("왼쪽 피연산자를 찾을 수 없습니다");
    }
    if (!rightExpr) {
      throw new Error("오른쪽 피연산자를 찾을 수 없습니다");
    }

    const left = this.visit(leftExpr);
    const right = this.visit(rightExpr);

    if (left === null || right === null) {
      throw new Error("표현식 평가 결과가 null입니다");
    }

    const opNode = ctx.getChild(1);
    if (!opNode) {
      throw new Error("연산자를 찾을 수 없습니다");
    }
    const op = opNode.getText();

    const result = op === "*" ? left * right : Math.floor(left / right);

    return result;
  };

  visitAddSub = (ctx: AddSubContext): number => {
    const leftExpr = ctx.expr(0);
    const rightExpr = ctx.expr(1);

    if (!leftExpr) {
      throw new Error("왼쪽 피연산자를 찾을 수 없습니다");
    }
    if (!rightExpr) {
      throw new Error("오른쪽 피연산자를 찾을 수 없습니다");
    }

    const left = this.visit(leftExpr);
    const right = this.visit(rightExpr);

    if (left === null || right === null) {
      throw new Error("표현식 평가 결과가 null입니다");
    }

    const opNode = ctx.getChild(1);
    if (!opNode) {
      throw new Error("연산자를 찾을 수 없습니다");
    }
    const op = opNode.getText();

    const result = op === "+" ? left + right : left - right;

    return result;
  };

  visitParens = (ctx: ParensContext): number => {
    const expr = ctx.expr();
    if (!expr) {
      throw new Error("괄호 내부 표현식을 찾을 수 없습니다");
    }

    const result = this.visit(expr);

    if (result === null) {
      throw new Error("표현식 평가 결과가 null입니다");
    }

    return result;
  };
}
