import { describe, it, expect } from "vitest";
import { getTokenNames, printTokens } from "./helper.js";

describe("MiniCLexer - Longest Matching 원칙", () => {
  it("연산자 longest matching: =와==, +와++를 구분", () => {
    expect(getTokenNames("x = y")).toContain("ASSIGN");
    expect(getTokenNames("x == y")).toContain("EQ");
    expect(getTokenNames("x + y")).toContain("PLUS");
    expect(getTokenNames("x++")).toContain("INC");
  });

  it("키워드 vs 식별자: int와 integer, for와 fork를 구분", () => {
    expect(getTokenNames("int x")).toContain("INT");
    expect(getTokenNames("integer x")).toContain("IDENTIFIER");
    expect(getTokenNames("for")).toContain("FOR");
    expect(getTokenNames("fork")).toContain("IDENTIFIER");
  });
});

describe("MiniCLexer - 토큰화와 파싱의 차이", () => {
  it("순서가 뒤바뀐 함수 선언도 토큰화 성공", () => {
    const code = "main() int";
    printTokens(code);
    expect(getTokenNames(code)).toEqual(["IDENTIFIER", "LPAREN", "RPAREN", "INT"]);
  });

  it("무작위 순서의 토큰들도 모두 인식", () => {
    const code = "= int 5 x ; } while +";
    printTokens(code);
    expect(getTokenNames(code)).toEqual(["ASSIGN", "INT", "INTEGER", "IDENTIFIER", "SEMI", "RBRACE", "WHILE", "PLUS"]);
  });

  it("괄호가 맞지 않아도 토큰화 성공", () => {
    const code = "{ ( [ ) } ]";
    printTokens(code);
    expect(getTokenNames(code)).toEqual(["LBRACE", "LPAREN", "LBRACK", "RPAREN", "RBRACE", "RBRACK"]);
  });

  it("연산자만 나열해도 토큰화 성공", () => {
    const code = "+ + - * / = == !=";
    printTokens(code);
    expect(getTokenNames(code).length).toBe(8);
  });
});

describe("MiniCLexer - 기본 토큰", () => {
  it("모든 토큰 타입을 올바르게 인식", () => {
    // 키워드
    expect(getTokenNames("int void char")).toEqual(["INT", "VOID", "CHAR"]);
    // 연산자
    expect(getTokenNames("+ - * / %")).toEqual(["PLUS", "MINUS", "MUL", "DIV", "MOD"]);
    // 구분자
    expect(getTokenNames("( ) { } [ ] ; ,")).toEqual([
      "LPAREN",
      "RPAREN",
      "LBRACE",
      "RBRACE",
      "LBRACK",
      "RBRACK",
      "SEMI",
      "COMMA",
    ]);
    // 리터럴
    expect(getTokenNames("123 'a' \"hello\"")).toContain("INTEGER");
    expect(getTokenNames("123 'a' \"hello\"")).toContain("CHAR_LITERAL");
    expect(getTokenNames("123 'a' \"hello\"")).toContain("STRING_LITERAL");
    // 주석 무시
    expect(getTokenNames("int x; // comment")).toEqual(["INT", "IDENTIFIER", "SEMI"]);
  });
});

describe("MiniCLexer - 실제 C 코드 파싱", () => {
  it("피보나치 함수", () => {
    const code = `
int fibonacci(int n) {
  if (n <= 1) {
    return n;
  }
  return fibonacci(n - 1) + fibonacci(n - 2);
}`;
    const tokens = printTokens(code);
    expect(tokens.length).toBe(34);
  });

  it("배열 합계 계산", () => {
    const code = `
int sum(int arr[], int size) {
  int total = 0;
  for (int i = 0; i < size; i++) {
    total = total + arr[i];
  }
  return total;
}`;
    const tokens = printTokens(code);
    expect(tokens.length).toBe(46);
  });
});
