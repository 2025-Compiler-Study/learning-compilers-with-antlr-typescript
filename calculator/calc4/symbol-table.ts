export class SymbolTable {
  private table: Map<string, number> = new Map();

  get(name: string): number {
    const value = this.table.get(name);
    if (value === undefined) {
      throw new Error(`변수 '${name}'를 현재 스코프에서 찾을 수 없습니다`);
    }
    return value;
  }

  has(name: string): boolean {
    return this.table.has(name);
  }

  declare(name: string): void {
    if (this.table.has(name)) {
      throw new Error(`변수 '${name}'는 이미 선언되었습니다`);
    }
    this.table.set(name, 0);
  }

  set(name: string, value: number): void {
    if (!this.table.has(name)) {
      throw new Error(`변수 '${name}'를 현재 스코프에서 찾을 수 없습니다`);
    }
    this.table.set(name, value);
  }
}

export class SymbolTableStack {
  private stack: SymbolTable[] = [];

  constructor() {
    this.stack = [new SymbolTable()];
  }

  enterScope(): void {
    this.stack.push(new SymbolTable());
  }

  exitScope(): void {
    if (this.stack.length <= 1) {
      throw new Error("전역 범위를 벗어날 수 없습니다");
    }
    this.stack.pop();
  }

  getVariable(name: string): number {
    for (let i = this.stack.length - 1; i >= 0; i--) {
      if (!this.stack[i]!.has(name)) continue;
      return this.stack[i]!.get(name);
    }
    throw new Error(`변수 '${name}'는 선언되지 않았습니다`);
  }

  declareVariable(name: string): void {
    const currentScope = this.stack[this.stack.length - 1]!;
    currentScope.declare(name);
  }

  setVariable(name: string, value: number): void {
    for (let i = this.stack.length - 1; i >= 0; i--) {
      if (!this.stack[i]!.has(name)) continue;
      this.stack[i]!.set(name, value);
      return;
    }
    throw new Error(`변수 '${name}'는 선언되지 않았습니다`);
  }
}
