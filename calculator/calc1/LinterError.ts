interface TokenPosition {
  line: number;
  column: number;
  value: string;
}

export class LinterError extends Error {
  private readonly line: number;
  private readonly column: number;
  private readonly value: string;

  constructor(message: string, options: TokenPosition) {
    super(message);
    this.name = "LinterError";
    this.line = options.line;
    this.column = options.column;
    this.value = options.value;
  }

  toObject(): TokenPosition {
    return {
      line: this.line,
      column: this.column,
      value: this.value,
    };
  }
}
