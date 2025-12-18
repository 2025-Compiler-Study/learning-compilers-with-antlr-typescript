import { describe, it, expect } from "vitest";
import { linterWithListener } from "./helper";

describe("LinterListener", () => {
  it("no errors", () => {
    const errors = linterWithListener("a = 1;");
    expect(errors).toHaveLength(0);
  });

  it("not assigned variable", () => {
    const errors = linterWithListener("a = b + 3;");

    expect(errors.map(e => e.toObject())).toEqual([
      { line: 1, column: 4, value: "b" },
    ]);
  });

  it("just assigned", () => {
    const errors = linterWithListener("a = a + 1;");

    expect(errors.map(e => e.toObject())).toEqual([
      { line: 1, column: 4, value: "a" },
    ]);
  });

  it("multiline errors", () => {
    const code = ["a = 4 + b;", "c = c + 1;"].join("\n");
    const errors = linterWithListener(code);

    expect(errors.map(e => e.toObject())).toEqual([
      { line: 1, column: 8, value: "b" },
      { line: 2, column: 4, value: "c" },
    ]);
  });
});
