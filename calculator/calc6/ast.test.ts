import { describe, it, expect, vi, beforeEach } from "vitest";
import { buildAst } from "./parser";
import { printAst } from "./printer";
import { DeclareStmt, FuncDef } from "./ast";

describe("printAst", () => {
  beforeEach(() => {
    vi.spyOn(console, "log");
    vi.clearAllMocks();
  });

  const getLines = (): string[] => {
    const call = (console.log as ReturnType<typeof vi.spyOn>).mock.calls[0] as unknown[];
    return (call[0] as string).split("\n");
  };

  it("단순 프로그램 트리 출력", () => {
    const { program } = buildAst(`
      func main() {
        x = 5 * 3 + a * (5 - 9 / 3);

        return x;
      }
    `);

    printAst(program);
    const lines = getLines();
    expect(lines[0]).toBe("Program");
    expect(lines.some((l) => l.includes("FuncDef"))).toBe(true);
    expect(lines.some((l) => l.includes("AssignStmt"))).toBe(true);
    expect(lines.some((l) => l.includes("BinaryExpr(+)"))).toBe(true);
    expect(lines.some((l) => l.includes("BinaryExpr(*)"))).toBe(true);
    expect(lines.some((l) => l.includes("Var(a)"))).toBe(true);
  });

  it("복수 선언(int a, b;)은 각각 별도 DeclareStmt로 분리된다", () => {
    const { program } = buildAst(`func main() {
  int a, b;
}`);
    printAst(program);
    const lines = getLines();
    expect(lines.filter((l) => l.includes("DeclareStmt")).length).toBe(2);
    expect(lines.some((l) => l.includes("VariableDecl int a"))).toBe(true);
    expect(lines.some((l) => l.includes("VariableDecl int b"))).toBe(true);

    const funcDef = program.statements[0] as unknown as FuncDef;
    const stmts = funcDef.body.statements as DeclareStmt[];
    // DeclareStmt span — "int a, b;" 전체 (2번째 줄, 2칸 들여쓰기)
    expect(stmts[0]!.span).toEqual({ startLine: 2, startColumn: 2, endLine: 2, endColumn: 11 });
    expect(stmts[1]!.span).toEqual({ startLine: 2, startColumn: 2, endLine: 2, endColumn: 11 });
    // VariableDecl span — 각 변수 토큰 위치
    expect(stmts[0]!.declarations[0]!.span).toEqual({ startLine: 2, startColumn: 6, endLine: 2, endColumn: 7 });
    expect(stmts[1]!.declarations[0]!.span).toEqual({ startLine: 2, startColumn: 9, endLine: 2, endColumn: 10 });
  });

  it("복합 프로그램 — 복수 선언, 함수 호출, 블록 스코프", () => {
    const code = `
      func main() {
        int a, b;
        a = 1;
        b = read();
        {
          int c;
          c = a + b;
          write(c);
        }
        b = 0;
      }
    `;

    const { program } = buildAst(code);

    printAst(program);
    const lines = getLines();

    expect(lines[0]).toBe("Program");
    expect(lines[1]).toMatch(/FuncDef/);
    expect(lines[2]).toMatch(/BlockStmt/);
    expect(lines[3]).toMatch(/DeclareStmt/);
    expect(lines[4]).toMatch(/VariableDecl int a/);
    expect(lines[5]).toMatch(/DeclareStmt/);
    expect(lines[6]).toMatch(/VariableDecl int b/);
    expect(lines[7]).toMatch(/AssignStmt/);
    expect(lines.filter((l) => l.includes("AssignStmt")).length).toBe(4);
    expect(lines.some((l) => l.includes("BlockStmt"))).toBe(true);
    expect(lines.some((l) => l.includes("VariableDecl int c"))).toBe(true);
    expect(lines.some((l) => l.includes("BinaryExpr(+)"))).toBe(true);
    expect(lines.some((l) => l.includes("CallExpr(write)"))).toBe(true);
    expect(lines.some((l) => l.includes("CallExpr(read)"))).toBe(true);
  });

  it("파라미터를 받는 함수 트리 출력", () => {
    const { program } = buildAst(`
      func int add(int a, int b) {
        return a + b;
      }
    `);

    printAst(program);
    const lines = getLines();

    expect(lines[0]).toBe("Program");
    expect(lines.some((l) => l.includes("FuncDef int add"))).toBe(true);
    expect(lines.some((l) => l.includes("Param int a"))).toBe(true);
    expect(lines.some((l) => l.includes("Param int b"))).toBe(true);
  });
});
