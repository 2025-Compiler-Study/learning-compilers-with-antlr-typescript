import type { SourceSpan } from "../ast";
import { CompilerError } from "./compiler-error";

export type SemanticErrorKind = "undeclared-variable" | "redeclared-variable";

export class SemanticError extends CompilerError {
  constructor(
    public readonly kind: SemanticErrorKind,
    public readonly name: string,
    span: SourceSpan,
    message: string,
  ) {
    super(message, span);
  }
}
