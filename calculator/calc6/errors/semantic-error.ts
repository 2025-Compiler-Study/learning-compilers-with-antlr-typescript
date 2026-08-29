import type { SourceSpan } from "../ast";
import { CompilerError } from "./compiler-error";

export const SemanticErrorKind = {
  UndeclaredVariable: "undeclared-variable",
  RedeclaredIdentifier: "redeclared-identifier",
  MissingMain: "missing-main",
  InvalidMainCall: "invalid-main-call",
  ReservedIdentifier: "reserved-identifier",
  ArgumentCountMismatch: "argument-count-mismatch",
  ArgumentTypeMismatch: "argument-type-mismatch",
} as const;

export type SemanticErrorKind = (typeof SemanticErrorKind)[keyof typeof SemanticErrorKind];

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
