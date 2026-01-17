import { Calc2Visitor } from "../calc2/calc2";
import { Calc3Context, ReadAssignContext, WriteContext } from "../generated/CalcPlusParser";
import { Readable, Writable } from "stream";

export class Calc3Visitor extends Calc2Visitor {
  constructor(private reader: Readable, private writer: Writable) {
    super();
  }

  visitCalc3 = (ctx: Calc3Context): void => {
    const stmts = ctx.stmt();

    for (const stmt of stmts) {
      this.visit(stmt);
    }
  };

  visitReadAssign = (ctx: ReadAssignContext): void => {
    const chunk = this.reader.read();
    const lines = chunk.split("\n");
    const input = lines[0];

    this.reader = Readable.from([lines.slice(1).join("\n")]);

    const varName = ctx.VAR().getText();
    const value = parseInt(input.trim()) || 0;

    this.memory.set(varName, value);
  };

  visitWrite = (ctx: WriteContext): void => {
    const exprNode = ctx.expr();
    const result: number = this.visit(exprNode);

    this.writer.write(result.toString() + "\n");
  };
}
