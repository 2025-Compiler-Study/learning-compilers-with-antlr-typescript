import type { SourceSpan } from "../ast";

export abstract class CompilerError extends Error {
  constructor(
    message: string,
    public readonly span: SourceSpan,
  ) {
    super(message);
    this.name = this.constructor.name;

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
