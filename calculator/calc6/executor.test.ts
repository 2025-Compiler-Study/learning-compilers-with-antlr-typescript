import { describe, expect, it, vi } from "vitest";
import { buildAst } from "./parser";
import { Interpreter } from "./interpreter";
import { SemanticErrorKind } from "./errors/semantic-error";

function run(code: string, inputs: number[] = []) {
  const writer = vi.fn();
  let i = 0;
  const reader = () => inputs[i++] ?? 0;
  new Interpreter(reader, writer).run(code);
  return writer;
}

describe("Executor", () => {
  describe("산술과 변수", () => {
    it("기본 산술 및 변수 할당", () => {
      const writer = run(`
      func main() {
        int a;
        a = 3 + 4 * 2;
        write(a);
      }
    `);
      expect(writer).toHaveBeenCalledWith(11);
    });

    it("정수 나눗셈 (truncate)", () => {
      const writer = run(`
      func main() {
        int a;
        a = 7 / 2;
        write(a);
      }
    `);
      expect(writer).toHaveBeenCalledWith(3);
    });

    it("오류: 0으로 나누기", () => {
      expect(() =>
        run(`
      func main() {
        int a;
        a = 1 / 0;
      }
    `),
      ).toThrow("0으로 나눌 수 없습니다");
    });

    it("오류: 같은 스코프에서 변수 재선언", () => {
      const { errors } = buildAst(`
      func main() {
        int a;
        int a;
      }
    `);
      expect(errors).toHaveLength(1);
      expect(errors[0]!.kind).toBe(SemanticErrorKind.RedeclaredIdentifier);
      expect(errors[0]!.name).toBe("a");
      expect(errors[0]!.message).toBe("식별자 'a'는 이미 선언되었습니다");
    });

    it("오류: 미선언 변수 사용", () => {
      const { errors } = buildAst(`
      func main() {
        a = 1;
      }
    `);
      expect(errors).toHaveLength(1);
      expect(errors[0]!.kind).toBe(SemanticErrorKind.UndeclaredVariable);
      expect(errors[0]!.name).toBe("a");
      expect(errors[0]!.message).toBe("식별자 'a'는 선언되지 않았습니다");
    });

    it("연쇄 에러 — 미선언 변수가 여러 위치에서 참조되면 위치마다 에러가 발생한다", () => {
      const { errors } = buildAst(`
      func main() {
        a = 1;
        b = a + 1;
      }
    `);
      // a 미선언(할당), b 미선언(할당), a 미선언(표현식) — 근본 원인은 2개지만 에러는 3개
      expect(errors).toHaveLength(3);
      expect(errors.filter((e) => e.name === "a")).toHaveLength(2);
      expect(errors.filter((e) => e.name === "b")).toHaveLength(1);
    });
  });

  describe("스코프", () => {
    it("블록 스코프 — 외부 변수 수정 가능", () => {
      const writer = run(`
      func main() {
        int a;
        a = 1;
        {
          int b;
          b = 2;
          a = b;
        }
        write(a);
      }
    `);
      expect(writer).toHaveBeenCalledWith(2);
    });

    it("함수 이름과 같은 이름의 지역변수는 다른 함수 안에서 허용된다", () => {
      const { errors } = buildAst(`
      func main() { }
      func foo() { }
      func bar() {
        int foo;
        foo = 1;
      }
    `);
      expect(errors).toHaveLength(0);
    });

    it("서로 다른 함수의 파라미터 이름이 겹쳐도 허용된다", () => {
      const { errors } = buildAst(`
      func main() { }
      func foo(int x) { x = 1; }
      func bar(int x) { x = 2; }
    `);
      expect(errors).toHaveLength(0);
    });

    it("서로 다른 함수의 지역변수는 격리된다", () => {
      const writer = run(`
      func other() {
        int x;
        x = 999;
      }
      func main() {
        int x;
        x = 1;
        other();
        write(x);
      }
    `);
      expect(writer).toHaveBeenCalledWith(1);
    });
  });

  describe("조건문", () => {
    it("if 조건 참 → thenBranch 실행", () => {
      const writer = run(`
      func main() {
        int a;
        a = 1;
        if (a == 1) { a = 10; } else { a = 20; }
        write(a);
      }
    `);
      expect(writer).toHaveBeenCalledWith(10);
    });

    it("if 조건 거짓(0) → elseBranch 실행", () => {
      const writer = run(`
      func main() {
        int a;
        a = 0;
        if (a == 1) { a = 10; } else { a = 20; }
        write(a);
      }
    `);
      expect(writer).toHaveBeenCalledWith(20);
    });
  });

  describe("함수 정의와 호출", () => {
    it("오류: 함수 이름 중복", () => {
      const { errors } = buildAst(`
      func main() { }
      func main() { }
    `);
      expect(errors).toHaveLength(1);
      expect(errors[0]!.kind).toBe(SemanticErrorKind.RedeclaredIdentifier);
      expect(errors[0]!.name).toBe("main");
    });

    it("사용자 정의 함수를 호출하고 반환값을 사용할 수 있다", () => {
      const writer = run(`
      func add(int a, int b) {
        return a + b;
      }
      func main() {
        write(add(2, 3));
      }
    `);
      expect(writer).toHaveBeenCalledWith(5);
    });

    it("재귀 호출이 정상 동작한다", () => {
      const writer = run(`
      func fact(int n) {
        if (n <= 1) {
          return 1;
        }
        return n * fact(n - 1);
      }
      func main() {
        write(fact(5));
      }
    `);
      expect(writer).toHaveBeenCalledWith(120);
    });

    it("오류: 등록되지 않은 함수를 호출하면 에러", () => {
      expect(() =>
        run(`
      func main() {
        unknown();
      }
    `),
      ).toThrow("알 수 없는 함수입니다: 'unknown'");
    });

    it("return 없이 함수가 끝나면 0을 반환한다", () => {
      const writer = run(`
      func doesNothing() {
      }
      func main() {
        write(doesNothing());
      }
    `);
      expect(writer).toHaveBeenCalledWith(0);
    });
  });

  describe("사용자 정의 함수", () => {
    it("사용자 정의함수의 계산 결과를 담고 반환한다", () => {
      const writer = run(`
      func sum(int a, int b) {
        int result;
        result = a + b;
        return result;
      }
      func main() {
        write(sum(2, 3));
      }
    `);
      expect(writer).toHaveBeenCalledWith(5);
    });

    it("오류: 인자 개수가 파라미터 개수보다 적으면 ArgumentCountMismatch", () => {
      const { errors } = buildAst(`
      func sum(int a, int b) {
        int result;
        result = a + b;
        return result;
      }
      func main() {
        write(sum(2));
      }
    `);
      expect(errors).toHaveLength(1);
      expect(errors[0]!.kind).toBe(SemanticErrorKind.ArgumentCountMismatch);
      expect(errors[0]!.name).toBe("sum");
    });

    it("오류: 인자 개수가 파라미터 개수보다 많으면 ArgumentCountMismatch", () => {
      const { errors } = buildAst(`
      func sum(int a, int b) {
        int result;
        result = a + b;
        return result;
      }
      func main() {
        write(sum(2, 3, 4));
      }
    `);
      expect(errors).toHaveLength(1);
      expect(errors[0]!.kind).toBe(SemanticErrorKind.ArgumentCountMismatch);
      expect(errors[0]!.name).toBe("sum");
    });

    it("개수가 다르면 개수 오류만 나고 타입 체크는 하지 않는다", () => {
      const { errors } = buildAst(`
      func sideEffect() {
        write(1);
      }
      func sum(int a, int b) {
        return a + b;
      }
      func main() {
        write(sum(sideEffect()));
      }
    `);
      expect(errors).toHaveLength(1);
      expect(errors[0]!.kind).toBe(SemanticErrorKind.ArgumentCountMismatch);
    });
  });

  describe("return", () => {
    it("return을 만나면 그 이후 문장을 실행하지 않는다", () => {
      const writer = run(`
      func main() {
        write(1);
        return;
        write(2);
      }
    `);
      expect(writer).toHaveBeenCalledTimes(1);
      expect(writer).toHaveBeenCalledWith(1);
    });

    it("return에 값이 있어도 정상 동작한다 (최상위 main의 반환값은 버려짐)", () => {
      const writer = run(`
      func main() {
        write(1);
        return 42;
      }
    `);
      expect(writer).toHaveBeenCalledTimes(1);
      expect(writer).toHaveBeenCalledWith(1);
    });

    it("if 블록 안의 return도 함수 실행을 종료시킨다", () => {
      const writer = run(`
      func main() {
        int a;
        a = 1;
        if (a == 1) {
          write(10);
          return;
        }
        write(20);
      }
    `);
      expect(writer).toHaveBeenCalledTimes(1);
      expect(writer).toHaveBeenCalledWith(10);
    });
  });

  describe("main — 진입점", () => {
    it("오류: 진입점 함수 main이 없음", () => {
      const { errors } = buildAst(`
      func foo() { }
    `);
      expect(errors).toHaveLength(1);
      expect(errors[0]!.kind).toBe(SemanticErrorKind.MissingMain);
    });

    it("오류: main을 일반 호출식으로 사용", () => {
      const { errors } = buildAst(`
      func main() { }
      func foo() { main(); }
    `);
      expect(errors).toHaveLength(1);
      expect(errors[0]!.kind).toBe(SemanticErrorKind.InvalidMainCall);
      expect(errors[0]!.name).toBe("main");
    });

    it("오류: main을 지역변수 이름으로 사용", () => {
      const { errors } = buildAst(`
      func main() {
        int main;
      }
    `);
      expect(errors).toHaveLength(1);
      expect(errors[0]!.kind).toBe(SemanticErrorKind.ReservedIdentifier);
      expect(errors[0]!.name).toBe("main");
    });

    it("오류: main을 파라미터 이름으로 사용", () => {
      const { errors } = buildAst(`
      func main() { }
      func foo(int main) { }
    `);
      expect(errors).toHaveLength(1);
      expect(errors[0]!.kind).toBe(SemanticErrorKind.ReservedIdentifier);
      expect(errors[0]!.name).toBe("main");
    });

    it("main만 진입점으로 실행되고, 호출되지 않은 다른 함수는 실행되지 않는다", () => {
      const writer = run(`
      func other() {
        write(999);
      }
      func main() {
        write(1);
      }
    `);
      expect(writer).toHaveBeenCalledTimes(1);
      expect(writer).toHaveBeenCalledWith(1);
    });
  });

  describe("read/write — 내장 함수", () => {
    it("read/write I/O", () => {
      const writer = run(
        `
      func main() {
        int a;
        a = read();
        write(a + 1);
      }
    `,
        [42],
      );
      expect(writer).toHaveBeenCalledWith(43);
    });

    it("오류: read/write를 지역변수 이름으로 사용", () => {
      const { errors } = buildAst(`
      func main() {
        int read;
        int write;
      }
    `);
      expect(errors).toHaveLength(2);
      expect(errors.map((e) => e.kind)).toEqual([
        SemanticErrorKind.ReservedIdentifier,
        SemanticErrorKind.ReservedIdentifier,
      ]);
      expect(errors.map((e) => e.name)).toEqual(["read", "write"]);
    });

    it("오류: read/write를 파라미터 이름으로 사용", () => {
      const { errors } = buildAst(`
      func main() { }
      func foo(int read, int write) { }
    `);
      expect(errors).toHaveLength(2);
      expect(errors.map((e) => e.name)).toEqual(["read", "write"]);
    });

    it("오류: read/write를 함수 이름으로 정의", () => {
      const { errors } = buildAst(`
      func main() { }
      func read() { }
      func write() { }
    `);
      expect(errors).toHaveLength(2);
      expect(errors.map((e) => e.kind)).toEqual([
        SemanticErrorKind.ReservedIdentifier,
        SemanticErrorKind.ReservedIdentifier,
      ]);
      expect(errors.map((e) => e.name)).toEqual(["read", "write"]);
    });

    it("func main 안에서 선언/할당/조건문/블록/read/write가 정상 동작한다", () => {
      const writer = run(
        `
      func main() {
        int a, b;
        a = read();
        b = 0;
        if (a > 10) {
          b = 1;
        } else {
          b = 2;
        }
        {
          int c;
          c = a + b;
          write(c);
        }
      }
    `,
        [20],
      );
      expect(writer).toHaveBeenCalledWith(21);
    });
  });
});

describe("Interpreter — 에러 시 실행 차단", () => {
  it("재선언 에러 → 콘솔 출력 후 write 호출 안 함", () => {
    const consoleSpy = vi.spyOn(console, "error");
    const writer = vi.fn();
    const interpreter = new Interpreter(() => 0, writer);

    const errors = interpreter.run(`
      func main() {
        int a;
        int a;
        write(a);
      }
    `);

    expect(errors).toHaveLength(1);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/error:.*이미 선언/));
    expect(writer).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it("미선언 변수 에러 → 콘솔 출력 후 write 호출 안 함", () => {
    const consoleSpy = vi.spyOn(console, "error");
    const writer = vi.fn();
    const interpreter = new Interpreter(() => 0, writer);

    const errors = interpreter.run(`
      func main() {
        a = 1;
        write(a);
      }
    `);

    expect(errors).toHaveLength(2);
    expect(consoleSpy).toHaveBeenCalledTimes(2);
    expect(consoleSpy).toHaveBeenCalledWith(expect.stringMatching(/error:.*선언되지 않았습니다/));
    expect(writer).not.toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
