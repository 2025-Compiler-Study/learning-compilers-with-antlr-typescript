import { describe, it, expect } from "vitest";
import { calculateWithVisitor } from "./helper";

describe("Calc2Visitor", () => {
  it("if condition", () => {
    const code = [
      "a = 1;",
      "if (a >= 1) {",
      "    b = a + 2;",
      "    c = b * 3;",
      "} else {",
      "    b = a;",
      "    c = b;",
      "}",
      "a = a + 1;",
      "d = (5 - e) * 2;",
    ].join("\n");
    const variables = calculateWithVisitor(code);
    expect(variables.get("a")).toBe(2);
    expect(variables.get("b")).toBe(3);
    expect(variables.get("c")).toBe(9);
    expect(variables.get("d")).toBe(10);
  });

  it("if without else", () => {
    const code = "if (a == 0) { b = 2; }";
    const variables = calculateWithVisitor(code);
    expect(variables.get("b")).toBe(2);
  });

  it("nested if", () => {
    const code = "if (a <= 0) { if (b < 0) { } else { c = 3; } }";
    const variables = calculateWithVisitor(code);
    expect(variables.get("c")).toBe(3);
  });
});
