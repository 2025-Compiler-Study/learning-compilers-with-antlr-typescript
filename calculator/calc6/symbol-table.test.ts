import { describe, it, expect } from "vitest";
import { SymbolTable, SymbolTableStack } from "./symbol-table";

describe("SymbolTable", () => {
  it("선언되지 않은 이름은 has()가 false", () => {
    const table = new SymbolTable();
    expect(table.has("x")).toBe(false);
  });

  it("declare 후 has()가 true", () => {
    const table = new SymbolTable();
    table.declare("x");
    expect(table.has("x")).toBe(true);
  });

  it("같은 이름을 두 번 declare하면 에러", () => {
    const table = new SymbolTable();
    table.declare("x");
    expect(() => table.declare("x")).toThrow("'x'는 이미 선언되었습니다");
  });
});

describe("SymbolTableStack", () => {
  it("enterScope 전에는 스코프가 없다 — exitScope는 에러", () => {
    const stack = new SymbolTableStack();
    expect(() => stack.exitScope()).toThrow("열려있는 스코프가 없습니다");
  });

  it("enterScope 없이 declare하면 에러", () => {
    const stack = new SymbolTableStack();
    expect(() => stack.declare("x")).toThrow("열려있는 스코프가 없습니다");
  });

  it("enterScope 후 declare 하면 assertDeclared가 통과한다", () => {
    const stack = new SymbolTableStack();
    stack.enterScope();
    stack.declare("x");
    expect(() => stack.assertDeclared("x")).not.toThrow();
  });

  it("선언되지 않은 이름은 assertDeclared가 에러", () => {
    const stack = new SymbolTableStack();
    stack.enterScope();
    expect(() => stack.assertDeclared("x")).toThrow("'x'는 선언되지 않았습니다");
  });

  it("같은 프레임에서 중복 declare하면 에러", () => {
    const stack = new SymbolTableStack();
    stack.enterScope();
    stack.declare("x");
    expect(() => stack.declare("x")).toThrow("'x'는 이미 선언되었습니다");
  });

  it("다른 프레임(중첩 스코프)에서는 같은 이름을 declare해도 에러가 안 난다", () => {
    const stack = new SymbolTableStack();
    stack.enterScope(); // frame 0
    stack.declare("x");
    stack.enterScope(); // frame 1
    expect(() => stack.declare("x")).not.toThrow();
  });

  it("중첩 스코프 안에서 바깥 프레임에 선언된 이름도 assertDeclared로 보인다", () => {
    const stack = new SymbolTableStack();
    stack.enterScope();
    stack.declare("x");
    stack.enterScope();
    expect(() => stack.assertDeclared("x")).not.toThrow();
  });

  it("exitScope 이후에는 그 프레임에서 declare한 이름이 안 보인다", () => {
    const stack = new SymbolTableStack();
    stack.enterScope();
    stack.enterScope();
    stack.declare("y");
    stack.exitScope();
    expect(() => stack.assertDeclared("y")).toThrow("'y'는 선언되지 않았습니다");
  });
});
