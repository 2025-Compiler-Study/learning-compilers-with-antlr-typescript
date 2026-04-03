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
    if (stmt instanceof DeclareStmt) {
      for (const decl of stmt.declarations) {
        this.symbolTable.declareVariable(decl.name);
      }
    } else if (stmt instanceof AssignStmt) {
      const value = this.evaluateExpr(stmt.value);
      this.symbolTable.setVariable(stmt.target.name, value);
    } else if (stmt instanceof BlockStmt) {
      this.symbolTable.enterScope();
      for (const s of stmt.statements) {
        this.executeStmt(s);
      }
      this.symbolTable.exitScope();
    } else if (stmt instanceof ExprStmt) {
      this.evaluateExpr(stmt.expr);
    } else if (stmt instanceof IfStmt) {
      const condition = this.evaluateExpr(stmt.condition);
      if (condition !== 0) {
        this.executeStmt(stmt.thenBranch);
      } else if (stmt.elseBranch !== undefined) {
        this.executeStmt(stmt.elseBranch);
      }
    } else {
      throw new Error(`알 수 없는 구문 타입입니다`);
    }
  }

  private evaluateExpr(expr: Expr): number {
    if (expr instanceof IntLiteralExpr) {
      return expr.value;
    } else if (expr instanceof IdentifierExpr) {
      return this.symbolTable.getVariable(expr.name);
    } else if (expr instanceof BinaryExpr) {
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
      }
    } else if (expr instanceof CallExpr) {
      if (expr.callee === "read") {
        return this.reader();
      } else if (expr.callee === "write") {
        const value = this.evaluateExpr(expr.args![0]!);
        this.writer(value);
        return value;
      }
      throw new Error(`알 수 없는 함수입니다: '${expr.callee}'`);
    }
    throw new Error(`알 수 없는 표현식 타입입니다`);
  }
}
