import { describe, it, expect } from "vitest";
import { calculateWithVisitor } from "./helper";
import { Readable, Writable } from "stream";

describe("Calc3Visitor", () => {
  it.each([
    {
      name: "hello world",
      code: "write(1);",
      userInput: "",
      expectOutput: "1",
    },
    {
      name: "var write",
      code: "a = 2; write(a);",
      userInput: "",
      expectOutput: "2",
    },
    {
      name: "multiple writes",
      code: "a = 2; write(a); write(3);",
      userInput: "",
      expectOutput: "2\n3",
    },
    {
      name: "echo",
      code: "a = read(); write(a);",
      userInput: "10",
      expectOutput: "10",
    },
    {
      name: "multiple echo",
      code: "a = read(); write(a); b = read(); write(b);",
      userInput: "20\n40",
      expectOutput: "20\n40",
    },
    {
      name: "wrong input",
      code: "a = read(); write(a);",
      userInput: "wrong",
      expectOutput: "0",
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
