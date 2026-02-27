import { describe, it, expect } from "vitest";
import { calculateWithVisitor } from "./helper";
import { Readable, Writable } from "stream";

describe("Calc4Visitor", () => {
  describe("VariableDeclarePanic", () => {
    it.each([
      {
        name: "undefined variable read",
        code: "write(a);",
        userInput: "",
        expectOutput: "",
      },
      {
        name: "undefined variable write",
        code: "a = 1;",
        userInput: "",
        expectOutput: "",
      },
      {
        name: "re-declare variable in separate lines",
        code: "int a; int a;",
        userInput: "",
        expectOutput: "",
      },
      {
        name: "re-declare in single line",
        code: "int a, a;",
        userInput: "",
        expectOutput: "",
      },
      {
        name: "declared inner scope, use outer scope",
        code: "{ int a; a = 10; write(a); } write(a);",
        userInput: "",
        expectOutput: "",
      },
    ])("$name", ({ code, userInput, expectOutput: _expectOutput }) => {
      const stdin = Readable.from([userInput]);
      let output = "";
      const stdout = new Writable({
        write(chunk, _encoding, callback) {
          output += chunk.toString();
          callback();
        },
      });

      expect(() => {
        calculateWithVisitor(code, stdin, stdout);
      }).toThrow();
    });
  });

  describe("VariableScope", () => {
    it.each([
      {
        name: "define outer scope, use inner scope",
        code: "int a; a = 10; { write(a); } write(a);",
        userInput: "",
        expectOutput: "10\n10",
      },
      {
        name: "define outer scope, change inner scope",
        code: "int a; { a = 20; } write(a);",
        userInput: "",
        expectOutput: "20",
      },
      {
        name: "shadow in inner scope does not affect outer scope",
        code: "int a; a = 10; { int a; a = 20; } write(a);",
        userInput: "",
        expectOutput: "10",
      },
    ])("$name", ({ code, userInput, expectOutput }) => {
      const stdin = Readable.from([userInput]);
      let output = "";
      const stdout = new Writable({
        write(chunk, _encoding, callback) {
          output += chunk.toString();
          callback();
        },
      });

      calculateWithVisitor(code, stdin, stdout);

      const actual = output.replace(/\n$/, "");
      expect(actual).toBe(expectOutput);
    });
  });
});
