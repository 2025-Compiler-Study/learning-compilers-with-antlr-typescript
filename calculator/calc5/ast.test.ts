import { describe, it, expect, vi, beforeEach } from "vitest";
import { buildAst } from "./parser";
import { printAst } from "./printer";

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
    expect(lines[1]).toMatch(/DeclareStmt \[int a, int b\]/);
    expect(lines[2]).toMatch(/AssignStmt.*a =/);
    expect(lines.some((l) => l.includes("AssignStmt") && l.includes("b ="))).toBe(true);
    expect(lines.some((l) => l.includes("BlockStmt"))).toBe(true);
    expect(lines.some((l) => l.includes("DeclareStmt [int c]"))).toBe(true);
    expect(lines.some((l) => l.includes("BinaryExpr(+)"))).toBe(true);
    expect(lines.some((l) => l.includes("CallExpr(write)"))).toBe(true);
    expect(lines.some((l) => l.includes("CallExpr(read)"))).toBe(true);
  });
});
