import { Calc2Visitor } from "../calc2/calc2";
import { Calc3Context, ReadAssignContext, WriteContext } from "../generated/CalcPlusParser";
import { Readable, Writable } from "stream";

export class Calc3Visitor extends Calc2Visitor {
  private buffer: string = "";

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
    let input = "";

    while (true) {
      const lines = this.buffer.split("\n");

      if (lines.length > 1) {
        // buffer에 \n이 있으면: 첫 줄을 가져오고 나머지는 buffer에 보관
        input = lines[0] ?? "";
        this.buffer = lines.slice(1).join("\n");
        break;
      }

      const chunk: string | null = this.reader.read();

      if (!chunk) {
        // stream 끝: buffer에 남은 전부를 입력으로 사용
        input = this.buffer;
        this.buffer = "";
        break;
      }

      this.buffer += chunk;
    }

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
