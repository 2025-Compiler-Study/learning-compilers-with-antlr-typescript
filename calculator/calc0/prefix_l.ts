import { IntContext, MulDivContext, AddSubContext } from "../generated/CalcPlusParser";
import { CalcPlusListener } from "../generated/CalcPlusListener";

export class PreFixListener extends CalcPlusListener {
  private prefixOutput: string[] = [];

  enterInt = (ctx: IntContext): void => {
    const value = ctx.INT()!.getText();
    this.prefixOutput.push(value);
  };

  enterMulDiv = (ctx: MulDivContext): void => {
    const opNode = ctx.getChild(1);
    if (!opNode) {
      throw new Error("연산자를 찾을 수 없습니다");
    }
    const op = opNode.getText();
    this.prefixOutput.push(op);
  };

  enterAddSub = (ctx: AddSubContext): void => {
    const opNode = ctx.getChild(1);
    if (!opNode) {
      throw new Error("연산자를 찾을 수 없습니다");
    }
    const op = opNode.getText();
    this.prefixOutput.push(op);
  };

  getPreFix(): string {
    const result = this.prefixOutput.join(" ");

    return result;
  }
}
