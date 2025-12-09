import { IntContext, MulDivContext, AddSubContext } from "../generated/CalcPlusParser";
import { CalcPlusListener } from "../generated/CalcPlusListener";

export class PostFixListener extends CalcPlusListener {
  private postfixOutput: string[] = [];

  exitInt = (ctx: IntContext): void => {
    const value = ctx.INT()!.getText();
    this.postfixOutput.push(value);
  };

  exitMulDiv = (ctx: MulDivContext): void => {
    const opNode = ctx.getChild(1);
    if (!opNode) {
      throw new Error("연산자를 찾을 수 없습니다");
    }
    const op = opNode.getText();
    this.postfixOutput.push(op);
  };

  exitAddSub = (ctx: AddSubContext): void => {
    const opNode = ctx.getChild(1);
    if (!opNode) {
      throw new Error("연산자를 찾을 수 없습니다");
    }
    const op = opNode.getText();
    this.postfixOutput.push(op);
  };

  getPostFix(): string {
    const result = this.postfixOutput.join(" ");

    return result;
  }
}
