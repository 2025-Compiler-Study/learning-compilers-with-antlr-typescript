import { CalculatorV } from "../calc0/calc0_v";
import { Calc1Context, ExprAssignContext, VarContext } from "../generated/CalcPlusParser";

export class Calc1Visitor extends CalculatorV {
  protected memory: Map<string, number> = new Map();

  visitCalc1 = (ctx: Calc1Context): number => {
    const stmts = ctx.stmt();

    for (const stmt of stmts) {
      this.visit(stmt);
    }

    return 0;
  };

  visitExprAssign = (ctx: ExprAssignContext): number => {
    const varNode = ctx.VAR();
    if (!varNode) {
      throw new Error("변수 이름을 찾을 수 없습니다");
    }
    const varName = varNode.getText();

    const exprNode = ctx.expr();
    if (!exprNode) {
      throw new Error("표현식을 찾을 수 없습니다");
    }

    const value = this.visit(exprNode);
    if (value === null) {
      throw new Error("표현식 평가 결과가 null입니다");
    }

    this.memory.set(varName, value);
    return value;
  };

  visitVar = (ctx: VarContext): number => {
    const varNode = ctx.VAR();
    if (!varNode) {
      throw new Error("변수 노드를 찾을 수 없습니다");
    }
    const varName = varNode.getText();

    return this.memory.get(varName) ?? 0;
  };

  getVariables(): Map<string, number> {
    return new Map(this.memory);
  }
}
