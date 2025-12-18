import { CalculatorL } from "../calc0/calc0_l";
import { VarContext, ExprAssignContext } from "../generated/CalcPlusParser";
import { LinterError } from "./LinterError";

export class LinterListener extends CalculatorL {
  private memory: Map<string, number> = new Map();
  private linterErrors: LinterError[] = [];

  exitExprAssign = (ctx: ExprAssignContext): void => {
    const varNode = ctx.VAR();
    const varName = varNode.getText();
    const value = this.stack.pop();

    if (value === undefined) {
      throw new Error("스택이 비어있습니다");
    }

    this.memory.set(varName, value);
  };

  exitVar = (ctx: VarContext): void => {
    const varNode = ctx.VAR();
    const varName = varNode.getText();
    const value = this.memory.get(varName);

    if (value === undefined) {
      this.linterErrors.push(
        new LinterError(`변수 ${varName} 이(가) 할당되지 않았습니다`, {
          line: ctx.start!.line,
          column: ctx.start!.column,
          value: varName,
        })
      );
    } else {
      this.stack.push(value);
    }
  };

  getVariables(): Map<string, number> {
    return new Map(this.memory);
  }

  getLinterErrors(): LinterError[] {
    return this.linterErrors;
  }
}
