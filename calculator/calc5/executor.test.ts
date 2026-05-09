import { describe, expect, it, vi } from "vitest";
import { buildAst } from "./parser";
import { Interpreter } from "./interpreter";
import { SemanticErrorKind } from "./errors/semantic-error";

function run(code: string, inputs: number[] = []) {
  const writer = vi.fn();
  let i = 0;
  const reader = () => inputs[i++] ?? 0;
  new Interpreter(reader, writer).run(code);
  return writer;
}

describe("Executor", () => {
  it("기본 산술 및 변수 할당", () => {
    const writer = run(`
      int a;
      a = 3 + 4 * 2;
      write(a);
    `);
    expect(writer).toHaveBeenCalledWith(11);
  });

  it("블록 스코프 — 외부 변수 수정 가능", () => {
    const writer = run(`
      int a;
      a = 1;
      {
        int b;
        b = 2;
        a = b;
      }
      write(a);
    `);
    expect(writer).toHaveBeenCalledWith(2);
  });

  it("if 조건 참 → thenBranch 실행", () => {
    const writer = run(`
      int a;
      a = 1;
      if (a == 1) { a = 10; } else { a = 20; }
      write(a);
    `);
    expect(writer).toHaveBeenCalledWith(10);
  });

  it("if 조건 거짓(0) → elseBranch 실행", () => {
    const writer = run(`
      int a;
      a = 0;
      if (a == 1) { a = 10; } else { a = 20; }
      write(a);
    `);
    expect(writer).toHaveBeenCalledWith(20);
  });

  it("read/write I/O", () => {
    const writer = run(
      `
      int a;
      a = read();
      write(a + 1);
    `,
      [42],
    );
    expect(writer).toHaveBeenCalledWith(43);
  });

  it("정수 나눗셈 (truncate)", () => {
    const writer = run(`
      int a;
      a = 7 / 2;
      write(a);
    `);
    expect(writer).toHaveBeenCalledWith(3);
  });

  it("오류: 같은 스코프에서 변수 재선언", () => {
    const { errors } = buildAst(`
      int a;
      int a;
    `);
    expect(errors).toHaveLength(1);
    expect(errors[0]!.kind).toBe(SemanticErrorKind.RedeclaredVariable);
    expect(errors[0]!.name).toBe("a");
    expect(errors[0]!.message).toBe("변수 'a'는 이미 선언되었습니다");
  });

  it("오류: 미선언 변수 사용", () => {
    const { errors } = buildAst(`
      a = 1;
    `);
    expect(errors).toHaveLength(1);
    expect(errors[0]!.kind).toBe(SemanticErrorKind.UndeclaredVariable);
    expect(errors[0]!.name).toBe("a");
    expect(errors[0]!.message).toBe("변수 'a'는 선언되지 않았습니다");
  });

  it("오류: 0으로 나누기", () => {
    expect(() =>
      run(`
      int a;
      a = 1 / 0;
    `),
    ).toThrow("0으로 나눌 수 없습니다");
  });
});
