import { EnvironmentStack } from "./environment";
import {
  AssignStmt,
  BinaryExpr,
  BlockStmt,
  CallExpr,
  DeclareStmt,
  Expr,
  ExprStmt,
  FuncDef,
  IdentifierExpr,
  IfStmt,
  IntLiteralExpr,
  Program,
  ReturnStmt,
  Stmt,
} from "./ast";

class ReturnSignal {
  constructor(public readonly value: number) {}
}

export class Executor {
  private functionTable = new Map<string, FuncDef>();
  private readonly callStack: EnvironmentStack[] = [];

  constructor(
    private readonly reader: () => number,
    private readonly writer: (value: number) => void,
  ) {}

  execute(program: Program): void {
    this.functionTable = new Map(program.functions.map((f) => [f.name, f]));
    const main = this.functionTable.get("main")!;
    this.callFunction(main, []);
  }

  private get currentFrame(): EnvironmentStack {
    return this.callStack[this.callStack.length - 1]!;
  }

  private callFunction(func: FuncDef, args: number[]): number {
    const frame = new EnvironmentStack();
    this.callStack.push(frame);
    try {
      func.params.forEach((param, i) => {
        frame.declareVariable(param.name);
        frame.setVariable(param.name, args[i] ?? 0);
      });
      for (const stmt of func.body.statements) {
        this.executeStmt(stmt);
      }
      return 0;
    } catch (e) {
      if (e instanceof ReturnSignal) return e.value;
      throw e;
    } finally {
      this.callStack.pop();
    }
  }

  private executeStmt(stmt: Stmt): void {
    if (stmt instanceof DeclareStmt) return this.executeDeclareStmt(stmt);
    if (stmt instanceof AssignStmt) return this.executeAssignStmt(stmt);
    if (stmt instanceof BlockStmt) return this.executeBlockStmt(stmt);
    if (stmt instanceof ExprStmt) return this.executeExprStmt(stmt);
    if (stmt instanceof IfStmt) return this.executeIfStmt(stmt);
    if (stmt instanceof ReturnStmt) return this.executeReturnStmt(stmt);
    throw new Error(`알 수 없는 구문 타입입니다`);
  }

  private executeDeclareStmt(stmt: DeclareStmt): void {
    for (const decl of stmt.declarations) {
      this.currentFrame.declareVariable(decl.name);
    }
  }

  private executeAssignStmt(stmt: AssignStmt): void {
    const value = this.evaluateExpr(stmt.value);
    this.currentFrame.setVariable(stmt.target.name, value);
  }

  private executeBlockStmt(stmt: BlockStmt): void {
    this.currentFrame.enterScope();
    for (const s of stmt.statements) {
      this.executeStmt(s);
    }
    this.currentFrame.exitScope();
  }

  private executeExprStmt(stmt: ExprStmt): void {
    this.evaluateExpr(stmt.expr);
  }

  private executeIfStmt(stmt: IfStmt): void {
    const condition = this.evaluateExpr(stmt.condition);
    if (condition !== 0) {
      this.executeStmt(stmt.thenBranch);
    } else if (stmt.elseBranch !== undefined) {
      this.executeStmt(stmt.elseBranch);
    }
  }

  private executeReturnStmt(stmt: ReturnStmt): never {
    const value = stmt.value !== undefined ? this.evaluateExpr(stmt.value) : 0;
    throw new ReturnSignal(value);
  }

  private evaluateExpr(expr: Expr): number {
    if (expr instanceof IntLiteralExpr) return this.evaluateIntLiteralExpr(expr);
    if (expr instanceof IdentifierExpr) return this.evaluateIdentifierExpr(expr);
    if (expr instanceof BinaryExpr) return this.evaluateBinaryExpr(expr);
    if (expr instanceof CallExpr) return this.evaluateCallExpr(expr);
    throw new Error(`알 수 없는 표현식 타입입니다`);
  }

  private evaluateIntLiteralExpr(expr: IntLiteralExpr): number {
    return expr.value;
  }

  private evaluateIdentifierExpr(expr: IdentifierExpr): number {
    return this.currentFrame.getVariable(expr.name);
  }

  private evaluateBinaryExpr(expr: BinaryExpr): number {
    const left = this.evaluateExpr(expr.left);
    const right = this.evaluateExpr(expr.right);

    switch (expr.op) {
      case "+":
        return left + right;
      case "-":
        return left - right;
      case "*":
        return left * right;
      case "/":
        if (right === 0) throw new Error("0으로 나눌 수 없습니다");
        return Math.trunc(left / right);
      case "==":
        return left === right ? 1 : 0;
      case "!=":
        return left !== right ? 1 : 0;
      case ">":
        return left > right ? 1 : 0;
      case ">=":
        return left >= right ? 1 : 0;
      case "<":
        return left < right ? 1 : 0;
      case "<=":
        return left <= right ? 1 : 0;
      default:
        throw new Error(`알 수 없는 연산자입니다: '${expr.op}'`);
    }
  }

  private evaluateCallExpr(expr: CallExpr): number {
    if (expr.callee === "read") {
      return this.reader();
    }
    if (expr.callee === "write") {
      const value = this.evaluateExpr(expr.args![0]!);
      this.writer(value);
      return value;
    }
    const func = this.functionTable.get(expr.callee);
    if (func === undefined) {
      throw new Error(`알 수 없는 함수입니다: '${expr.callee}'`);
    }
    const args = (expr.args ?? []).map((arg) => this.evaluateExpr(arg));
    return this.callFunction(func, args);
  }
}
