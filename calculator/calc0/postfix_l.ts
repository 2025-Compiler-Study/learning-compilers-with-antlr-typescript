import { IntContext, MulDivContext, AddSubContext } from "../generated/CalcPlusParser";
import { CalcPlusListener } from "../generated/CalcPlusListener";

export class PostFixListener extends CalcPlusListener {
  private postfixOutput: string[] = [];

  exitInt = (ctx: IntContext): void => {
    const value = ctx.INT()!.getText();
    this.postfixOutput.push(value);
  };

  exitMulDiv = (ctx: MulDivContext): void => {
    const op = ctx._op!.text!;
    this.postfixOutput.push(op);
  };

  exitAddSub = (ctx: AddSubContext): void => {
    const op = ctx._op!.text!;
    this.postfixOutput.push(op);
  };

  getPostFix(): string {
    const result = this.postfixOutput.join(" ");

    return result;
  }
}
