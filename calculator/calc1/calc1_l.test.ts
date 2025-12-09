import { describe, it, expect } from "vitest";
import { calculateWithListener } from "./helper";

describe("Calc1Listener", () => {
  it("단순 변수 할당", () => {
    const variables = calculateWithListener("a = 1;");
    expect(variables.get("a")).toBe(1);
  });

  it("복잡한 수식 계산", () => {
    const variables = calculateWithListener("a = 1 + 2 * 3;");
    expect(variables.get("a")).toBe(7);
  });

  it("여러 변수 할당", () => {
    const variables = calculateWithListener("a = 1; b = 2;");
    expect(variables.get("a")).toBe(1);
    expect(variables.get("b")).toBe(2);
  });

  it("변수 참조", () => {
    const variables = calculateWithListener("a = 1; b = a + 2;");
    expect(variables.get("a")).toBe(1);
    expect(variables.get("b")).toBe(3);
  });

  it("여러 변수 참조", () => {
    const variables = calculateWithListener("a = 1; b = 2; c = a + b;");
    expect(variables.get("a")).toBe(1);
    expect(variables.get("b")).toBe(2);
    expect(variables.get("c")).toBe(3);
  });

  it("선언되지 않은 변수는 0으로 처리", () => {
    const variables = calculateWithListener("a = b + 1;");
    expect(variables.get("a")).toBe(1);
  });

  it("다양한 변수명 사용", () => {
    const variables = calculateWithListener("aa = 1; BB = aa + 2;");
    expect(variables.get("aa")).toBe(1);
    expect(variables.get("BB")).toBe(3);
  });

  it("여러 줄 코드 및 변수 덮어쓰기", () => {
    const code = ["a = 1;", "b = a + 2;", "c = b * 3;", "a = a + 1;", "d = (5 - e) * 2;"].join("\n");
    const variables = calculateWithListener(code);
    expect(variables.get("a")).toBe(2);
    expect(variables.get("b")).toBe(3);
    expect(variables.get("c")).toBe(9);
    expect(variables.get("d")).toBe(10);
  });
});
