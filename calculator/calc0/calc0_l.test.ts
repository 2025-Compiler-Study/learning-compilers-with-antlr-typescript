import { describe, it, expect } from "vitest";
import { calculateWithListener } from "./helper";

describe("CalculatorL", () => {
  it("단일 숫자 파싱", () => {
    const result = calculateWithListener("1");
    expect(result).toBe(1);
  });

  it("연산자 우선순위 처리", () => {
    const result = calculateWithListener("1+2*3");
    expect(result).toBe(7);
  });

  it("괄호 연산 처리", () => {
    const result = calculateWithListener("(1+2)*3");
    expect(result).toBe(9);
  });

  it("복잡한 수식 계산", () => {
    const result = calculateWithListener("10 + 2 * (5 - 9 / 3)");
    expect(result).toBe(14);
  });
});
