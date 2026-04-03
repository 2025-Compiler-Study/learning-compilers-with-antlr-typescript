import { SymbolTableStack } from "../calc4/symbol-table";
import {
  AssignStmt,
  BinaryExpr,
  BlockStmt,
  CallExpr,
  DeclareStmt,
  Expr,
  ExprStmt,
  IdentifierExpr,
  IfStmt,
  IntLiteralExpr,
  Program,
  Stmt,
} from "./ast";

export class Executor {
  private readonly symbolTable: SymbolTableStack = new SymbolTableStack();

  constructor(
    private readonly reader: () => number,
    private readonly writer: (value: number) => void,
  ) {}

  execute(program: Program): void {
    for (const stmt of program.statements) {
      this.executeStmt(stmt);
    }
  }

  private executeStmt(stmt: Stmt): void {
    if (stmt instanceof DeclareStmt) return this.executeDeclareStmt(stmt);
    if (stmt instanceof AssignStmt) return this.executeAssignStmt(stmt);
    if (stmt instanceof BlockStmt) return this.executeBlockStmt(stmt);
    if (stmt instanceof ExprStmt) return this.executeExprStmt(stmt);
    if (stmt instanceof IfStmt) return this.executeIfStmt(stmt);
    throw new Error(`알 수 없는 구문 타입입니다`);
  }

  private executeDeclareStmt(stmt: DeclareStmt): void {
    for (const decl of stmt.declarations) {
      this.symbolTable.declareVariable(decl.name);
    }
  }

  private executeAssignStmt(stmt: AssignStmt): void {
    const value = this.evaluateExpr(stmt.value);
    this.symbolTable.setVariable(stmt.target.name, value);
  }

  private executeBlockStmt(stmt: BlockStmt): void {
    this.symbolTable.enterScope();
    for (const s of stmt.statements) {
      this.executeStmt(s);
    }
    this.symbolTable.exitScope();
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
    return this.symbolTable.getVariable(expr.name);
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
    throw new Error(`알 수 없는 함수입니다: '${expr.callee}'`);
  }
}
