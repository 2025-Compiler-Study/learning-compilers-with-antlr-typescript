import { buildAst } from "./parser";
import { Executor } from "./executor";
import { SemanticError } from "./errors/semantic-error";

export class Interpreter {
  private readonly executor: Executor;

  constructor(
    reader: () => number,
    writer: (value: number) => void,
  ) {
    this.executor = new Executor(reader, writer);
  }

  run(code: string): SemanticError[] {
    const { program, errors } = buildAst(code);
    if (errors.length > 0) {
      errors.forEach((e) =>
        console.error(`${e.span.startLine}:${e.span.startColumn}: error: ${e.message}`),
      );
      return errors;
    }
    this.executor.execute(program);
    return [];
  }
}
