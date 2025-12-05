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
    const op = ctx._op!.text!;

    const result = op === "*" ? left * right : Math.floor(left / right);
    this.stack.push(result);
  };

  exitAddSub = (ctx: AddSubContext): void => {
    const right = this.stack.pop()!;
    const left = this.stack.pop()!;
    const op = ctx._op!.text!;

    const result = op === "+" ? left + right : left - right;
    this.stack.push(result);
  };

  result(): number | undefined {
    return this.stack[0];
  }
}
