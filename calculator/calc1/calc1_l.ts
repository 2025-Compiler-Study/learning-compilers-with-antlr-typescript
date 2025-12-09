import { CalculatorL } from "../calc0/calc0_l";
import { VarContext, ExprAssignContext } from "../generated/CalcPlusParser";

export class Calc1Listener extends CalculatorL {
  private memory: Map<string, number> = new Map();

  exitExprAssign = (ctx: ExprAssignContext): void => {
    const varNode = ctx.VAR();
    if (!varNode) {
      throw new Error("변수명을 찾을 수 없습니다");
    }
    const varName = varNode.getText();

    const value = this.stack.pop();
    if (value === undefined) {
      throw new Error("스택이 비어있습니다");
    }

    this.memory.set(varName, value);
  };

  exitVar = (ctx: VarContext): void => {
    const varNode = ctx.VAR();
    if (!varNode) {
      throw new Error("변수 노드를 찾을 수 없습니다");
    }
    const varName = varNode.getText();

    const value = this.memory.get(varName) ?? 0;
    this.stack.push(value);
  };

  getVariables(): Map<string, number> {
    return new Map(this.memory);
  }
}
