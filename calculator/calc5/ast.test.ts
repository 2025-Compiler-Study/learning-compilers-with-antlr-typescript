import { describe, it, expect, vi, beforeEach } from "vitest";
import { buildAst } from "./parser";
import { printAst } from "./printer";
import { DeclareStmt } from "./ast";

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
    printAst(buildAst("x = 5 * 3 + a * (5 - 9 / 3);"));
    const lines = getLines();
    expect(lines[0]).toBe("Program");
    expect(lines.some((l) => l.includes("AssignStmt"))).toBe(true);
    expect(lines.some((l) => l.includes("BinaryExpr(+)"))).toBe(true);
    expect(lines.some((l) => l.includes("BinaryExpr(*)"))).toBe(true);
    expect(lines.some((l) => l.includes("Var(a)"))).toBe(true);
  });

  it("복수 선언(int a, b;)은 각각 별도 DeclareStmt로 분리된다", () => {
    const program = buildAst("int a, b;");
    printAst(program);
    const lines = getLines();
    expect(lines.filter((l) => l.includes("DeclareStmt")).length).toBe(2);
    expect(lines.some((l) => l.includes("DeclareStmt [int a]"))).toBe(true);
    expect(lines.some((l) => l.includes("DeclareStmt [int b]"))).toBe(true);

    const stmts = program.statements as DeclareStmt[];
    // DeclareStmt span — "int a, b;" 전체
    expect(stmts[0]!.span).toEqual({ startLine: 1, startColumn: 0, endLine: 1, endColumn: 9 });
    expect(stmts[1]!.span).toEqual({ startLine: 1, startColumn: 0, endLine: 1, endColumn: 9 });
    // VariableDecl span — 각 변수 토큰 위치
    expect(stmts[0]!.declarations[0]!.span).toEqual({ startLine: 1, startColumn: 4, endLine: 1, endColumn: 5 });
    expect(stmts[1]!.declarations[0]!.span).toEqual({ startLine: 1, startColumn: 7, endLine: 1, endColumn: 8 });
  });

  it("복합 프로그램 — 복수 선언, read, 블록 스코프, write", () => {
    const code = `
      int a, b;
      a = 1;
      b = read();
      {
        int c;
        c = a + b;
        write(c);
      }
      b = 0;
    `;
    printAst(buildAst(code));
    const lines = getLines();

    expect(lines[0]).toBe("Program");
    expect(lines[1]).toMatch(/DeclareStmt \[int a\]/);
    expect(lines[2]).toMatch(/DeclareStmt \[int b\]/);
    expect(lines[3]).toMatch(/AssignStmt.*a =/);
    expect(lines.some((l) => l.includes("AssignStmt") && l.includes("b ="))).toBe(true);
    expect(lines.some((l) => l.includes("BlockStmt"))).toBe(true);
    expect(lines.some((l) => l.includes("DeclareStmt [int c]"))).toBe(true);
    expect(lines.some((l) => l.includes("BinaryExpr(+)"))).toBe(true);
    expect(lines.some((l) => l.includes("CallExpr(write)"))).toBe(true);
    expect(lines.some((l) => l.includes("CallExpr(read)"))).toBe(true);
  });
});
