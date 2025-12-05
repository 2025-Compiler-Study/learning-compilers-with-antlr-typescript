import { describe, it, expect } from "vitest";
import { convertToPostFixWithListener } from "./helper";

describe("PostFixListener", () => {
  it("단일 숫자", () => {
    const result = convertToPostFixWithListener("1");
    expect(result).toBe("1");
  });

  it("연산자 우선순위", () => {
    const result = convertToPostFixWithListener("1+2*3");
    expect(result).toBe("1 2 3 * +");
  });

  it("괄호 사용", () => {
    const result = convertToPostFixWithListener("(1+2)*3");
    expect(result).toBe("1 2 + 3 *");
  });

  it("복잡한 수식", () => {
    const result = convertToPostFixWithListener("10+2*(5-9/3)");
    expect(result).toBe("10 2 5 9 3 / - * +");
  });
});
