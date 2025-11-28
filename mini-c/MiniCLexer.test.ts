import { describe, it, expect } from "vitest";
import {
  getTokenNames,
  printTokens,
  getLexerErrors,
  tokenizeWithErrors,
  tokenizeStrict,
  getTokenNamesStrict,
} from "./helper.js";

describe("MiniCLexer - Longest Matching 원칙", () => {
  it("연산자 longest matching: =와 ==, +와 ++ 및 +=를 구분", () => {
    expect(getTokenNames("x = y")).toContain("ASSIGN");
    expect(getTokenNames("x == y")).toContain("EQ");
    expect(getTokenNames("x + y")).toContain("PLUS");
    expect(getTokenNames("x++")).toContain("INC");
    expect(getTokenNames("x += y")).toContain("PLUS_ASSIGN");
    expect(getTokenNames("x -= y")).toContain("MINUS_ASSIGN");
  });

  it("키워드 vs 식별자: int와 integer, while과 whilex를 구분", () => {
    expect(getTokenNames("int x")).toContain("INT");
    expect(getTokenNames("integer x")).toContain("IDENTIFIER");
    expect(getTokenNames("while")).toContain("WHILE");
    expect(getTokenNames("whilex")).toContain("IDENTIFIER");
    expect(getTokenNames("const")).toContain("CONST");
    expect(getTokenNames("constant")).toContain("IDENTIFIER");
  });

  it("정수 리터럴: 10진수, 8진수, 16진수 구분", () => {
    expect(getTokenNames("0")).toEqual(["INTEGER"]);
    expect(getTokenNames("123")).toEqual(["INTEGER"]);
    expect(getTokenNames("0777")).toEqual(["INTEGER"]);
    expect(getTokenNames("0xFF")).toEqual(["INTEGER"]);
    expect(getTokenNames("0x1A3")).toEqual(["INTEGER"]);
  });
});

describe("MiniCLexer - 토큰화와 파싱의 차이", () => {
  it("8진수 리터럴의 잘못된 자릿수: 8이 포함되면 별도 토큰으로 분리", () => {
    const code = "012345678";
    printTokens(code);
    expect(getTokenNames(code)).toEqual(["INTEGER", "INTEGER"]);
  });

  it("정의되지 않은 문자 '#'는 토큰으로 인식하지 않음", () => {
    const code = "#";
    printTokens(code);
    const result = tokenizeWithErrors(code);
    expect(result.tokenNames).toEqual([]);
    expect(result.errors[0]).toContain("token recognition error");
  });
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
    expect(getTokenNames("int void const")).toEqual(["INT", "VOID", "CONST"]);
    expect(getTokenNames("if else while return")).toEqual(["IF", "ELSE", "WHILE", "RETURN"]);
    expect(getTokenNames("read write")).toEqual(["READ", "WRITE"]);
    // 연산자
    expect(getTokenNames("+ - * / %")).toEqual(["PLUS", "MINUS", "MUL", "DIV", "MOD"]);
    expect(getTokenNames("== != < > <= >=")).toEqual(["EQ", "NE", "LT", "GT", "LE", "GE"]);
    expect(getTokenNames("&& || !")).toEqual(["AND", "OR", "NOT"]);
    expect(getTokenNames("= += -= *= /= %=")).toEqual([
      "ASSIGN",
      "PLUS_ASSIGN",
      "MINUS_ASSIGN",
      "MUL_ASSIGN",
      "DIV_ASSIGN",
      "MOD_ASSIGN",
    ]);
    expect(getTokenNames("++ --")).toEqual(["INC", "DEC"]);
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
    expect(getTokenNames("123")).toContain("INTEGER");
    expect(getTokenNames("0xFF")).toContain("INTEGER");
    expect(getTokenNames("0777")).toContain("INTEGER");
    // 주석 무시
    expect(getTokenNames("int x; // comment")).toEqual(["INT", "IDENTIFIER", "SEMI"]);
    expect(getTokenNames("int /* comment */ x;")).toEqual(["INT", "IDENTIFIER", "SEMI"]);
  });
});

describe("MiniCLexer - 에러 처리", () => {
  it("정의되지 않은 문자에 대한 에러 메시지", () => {
    const errors1 = getLexerErrors("#");
    expect(errors1.length).toBeGreaterThan(0);
    expect(errors1[0]).toContain("token recognition error at: '#'");

    const errors2 = getLexerErrors("@");
    expect(errors2.length).toBeGreaterThan(0);
    expect(errors2[0]).toContain("token recognition error at: '@'");

    const errors3 = getLexerErrors("$");
    expect(errors3.length).toBeGreaterThan(0);
    expect(errors3[0]).toContain("token recognition error at: '$'");
  });

  it("여러 에러가 있는 코드", () => {
    const code = "int x # = @ 5;";
    const result = tokenizeWithErrors(code);

    // 유효한 토큰들은 인식됨
    expect(result.tokenNames).toContain("INT");
    expect(result.tokenNames).toContain("IDENTIFIER");
    expect(result.tokenNames).toContain("ASSIGN");
    expect(result.tokenNames).toContain("INTEGER");
    expect(result.tokenNames).toContain("SEMI");

    // 에러 메시지도 수집됨
    expect(result.errors.length).toBe(2); // # 와 @
    expect(result.errors[0]).toContain("token recognition error");
    expect(result.errors[1]).toContain("token recognition error");
  });

  it("에러가 없는 정상 코드", () => {
    const code = "int x = 5;";
    const errors = getLexerErrors(code);
    expect(errors.length).toBe(0);
  });
});

describe("MiniCLexer - Strict 모드 (에러 시 throw)", () => {
  it("정의되지 않은 문자 발견 시 즉시 throw", () => {
    expect(() => tokenizeStrict("#")).toThrow("token recognition error at: '#'");
    expect(() => tokenizeStrict("@")).toThrow("token recognition error at: '@'");
    expect(() => tokenizeStrict("$")).toThrow("token recognition error at: '$'");
  });

  it("유효한 코드는 에러 없이 토큰화 성공", () => {
    expect(() => tokenizeStrict("int x = 5;")).not.toThrow();
    expect(() => getTokenNamesStrict("int x = 5;")).not.toThrow();

    const tokens = getTokenNamesStrict("int x = 5;");
    expect(tokens).toEqual(["INT", "IDENTIFIER", "ASSIGN", "INTEGER", "SEMI"]);
  });

  it("중간에 에러가 있으면 그 시점에서 중단", () => {
    // "int x # = 5;" 코드에서 #를 만나면 즉시 throw
    expect(() => tokenizeStrict("int x # = 5;")).toThrow("token recognition error");
  });

  it("일반 모드와 strict 모드 비교", () => {
    const code = "int x # y";

    // 일반 모드: 에러를 수집하고 계속 진행
    const result = tokenizeWithErrors(code);
    expect(result.tokenNames).toContain("INT");
    expect(result.tokenNames).toContain("IDENTIFIER");
    expect(result.errors.length).toBeGreaterThan(0);

    // Strict 모드: 에러 발생 시 즉시 throw
    expect(() => tokenizeStrict(code)).toThrow("token recognition error");
  });
});

describe("MiniCLexer - 실제 C 코드 파싱", () => {
  it("피보나치 함수", () => {
    const code = `
const int max = 100;
void main()
{
    int i, j, k;
    int rem, prime; // rem: reminder

    i = 2;
    while (i < max) {
        prime = 1;
        k = i / 2;
        j = 2;
        while (j <= k) {
            rem = i % j;
            if (rem == 0) prime = 0;
            ++j;
        }
        if (prime == 1) write(i);
        ++i;
    }
}`;
    const tokens = printTokens(code);
    expect(tokens.length).toBe(91);
  });

  it("bubble", () => {
    const code = `
void main()
{
    int list[100];
    int element;
    int total, i, top;
    int temp;
    i = 1;

    read(element);
    while (element != 0) {
        list[i] = element;
        i++;
        read(element);
    }

    top = total = i - 1;
    while (top > 1) {
        i = 1;
        while (i < top) {
            if (list[i] > list[i + 1]) {
                temp = list[i];
                list[i] = list[i + 1];
                list[i + 1] = temp;
            }
            ++i;
        }
        top--;
    }

    i = 1;
    while (i <= total) {
        write(list[i]);
        ++i;
    }
}`;
    const tokens = printTokens(code);
    expect(tokens.length).toBe(158);
  });

  it("factorial", () => {
    const code = `
/*
    factorial program by recursive call
 */

void main()
{
    int n, f;
    read(n);
    f = factorial(n);
    write(f);
}

int factorial(int n)
{
    if (n == 1) return 1;
    else return n * factorial(n - 1);
}`;
    const tokens = printTokens(code);
    expect(tokens.length).toBe(56);
  });
});
