export class SymbolTable {
  private readonly names = new Set<string>();

  has(name: string): boolean {
    return this.names.has(name);
  }

  declare(name: string): void {
    if (this.names.has(name)) {
      throw new Error(`식별자 '${name}'는 이미 선언되었습니다`);
    }
    this.names.add(name);
  }
}

export class SymbolTableStack {
  private stack: SymbolTable[] = [];

  enterScope(): void {
    this.stack.push(new SymbolTable());
  }

  exitScope(): void {
    if (this.stack.length === 0) {
      throw new Error("열려있는 스코프가 없습니다");
    }
    this.stack.pop();
  }

  declare(name: string): void {
    if (this.stack.length === 0) {
      throw new Error("열려있는 스코프가 없습니다");
    }
    this.stack[this.stack.length - 1]!.declare(name);
  }

  assertDeclared(name: string): void {
    if (!this.stack.some((frame) => frame.has(name))) {
      throw new Error(`식별자 '${name}'는 선언되지 않았습니다`);
    }
  }
}
