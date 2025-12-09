import { IntContext, MulDivContext, AddSubContext } from "../generated/CalcPlusParser";
import { CalcPlusListener } from "../generated/CalcPlusListener";

export class CalculatorL extends CalcPlusListener {
  private stack: number[] = [];

  exitInt = (ctx: IntContext): void => {
    const value = parseInt(ctx.INT()!.getText());
    this.stack.push(value);
  };

  exitMulDiv = (ctx: MulDivContext): void => {
    const right = this.stack.pop()!;
    const left = this.stack.pop()!;

    const opNode = ctx.getChild(1);
    if (!opNode) {
      throw new Error("연산자를 찾을 수 없습니다");
    }
    const op = opNode.getText();

    const result = op === "*" ? left * right : Math.floor(left / right);
    this.stack.push(result);
  };

  exitAddSub = (ctx: AddSubContext): void => {
    const right = this.stack.pop()!;
    const left = this.stack.pop()!;

    const opNode = ctx.getChild(1);
    if (!opNode) {
      throw new Error("연산자를 찾을 수 없습니다");
    }
    const op = opNode.getText();

    const result = op === "+" ? left + right : left - right;
    this.stack.push(result);
  };

  result(): number | undefined {
    return this.stack[0];
  }
}
