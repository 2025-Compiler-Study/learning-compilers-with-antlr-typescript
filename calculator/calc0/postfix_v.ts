import { IntContext, MulDivContext, AddSubContext, ParensContext, Calc0Context } from "../generated/CalcPlusParser";
import { CalcPlusVisitor } from "../generated/CalcPlusVisitor";

export class PostFixVisitor extends CalcPlusVisitor<string> {
  visitCalc0 = (ctx: Calc0Context): string => {
    const result = this.visit(ctx.expr());

    if (result === null) {
      throw new Error("표현식 평가 결과가 null입니다");
    }

    return result;
  };

  visitInt = (ctx: IntContext): string => {
    const intNode = ctx.INT();

    if (!intNode) {
      throw new Error("INT 노드를 찾을 수 없습니다");
    }

    return intNode.getText();
  };

  visitMulDiv = (ctx: MulDivContext): string => {
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

    if (left === null) {
      throw new Error("왼쪽 피연산자 평가 결과가 null입니다");
    }
    if (right === null) {
      throw new Error("오른쪽 피연산자 평가 결과가 null입니다");
    }

    if (!ctx._op) {
      throw new Error("연산자를 찾을 수 없습니다");
    }

    const op = ctx._op.text;
    return `${left} ${right} ${op}`;
  };

  visitAddSub = (ctx: AddSubContext): string => {
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

    if (left === null) {
      throw new Error("왼쪽 피연산자 평가 결과가 null입니다");
    }
    if (right === null) {
      throw new Error("오른쪽 피연산자 평가 결과가 null입니다");
    }

    if (!ctx._op) {
      throw new Error("연산자를 찾을 수 없습니다");
    }

    const op = ctx._op.text;

    return `${left} ${right} ${op}`;
  };

  visitParens = (ctx: ParensContext): string => {
    const result = this.visit(ctx.expr());
    if (result === null) {
      throw new Error("괄호 내부 표현식 평가 결과가 null입니다");
    }
    return result;
  };

  getPostFix(ctx: any): string {
    const result = this.visit(ctx);
    if (result === null) {
      throw new Error("표현식 평가 결과가 null입니다");
    }
    return result;
  }
}
