# 질문 정리

## Q1. `program`의 진입점이 왜 `funcDef+`로 고정되어 있는가?

(코드는 모든 함수 정의들로만 구성되며, 전역변수 개념은 없다. 해당 내용 확인!)

현재 `Calc6.g4`는 다음과 같이 정의되어 있다.

```
program : (funcDef)+ EOF;
funcDef : 'func' 'int'? IDENT '(' paramList? ')' block ;
stmt    : Declare | ExprAssign | ExprStmt | IfElse | StmtBlock | Return ;
```

`block`이 받는 건 `stmt`뿐이고 `stmt`의 어떤 alternative에도 `funcDef`가 없어서,
**함수 몸통 안에 또 다른 `func`를 정의하는 것(중첩 함수)은 현재 문법상 불가능**하다.
그래서 진입점을 `funcDef+`로 고정할 필요 없이 `stmt` 중심으로 설계했어야 하지 않나?

`funcDef+`가 진입점이라는 건 \*\*전역(global)이라는 개념 자체가 사라진 것 아닌가?
함수 바깥에서 선언되는 변수나 함수에 속하지 않는 최상위 문장은 애초에 존재할 수 없다.
함수간 상태를 공유할 방법이 있나?

```
1번

program : (funcDef|stmt)+ EOF;
funcDef : 'func' 'int'? IDENT '(' paramList? ')' block ;
stmt    : Declare | ExprAssign | ExprStmt | IfElse | StmtBlock | Return ;

2번

program : (stmt)+ EOF;
stmt    : Declare | ExprAssign | ExprStmt | IfElse | StmtBlock | funcDef ;
funcDef : 'func' 'int'? IDENT '(' paramList? ')' block ;
```

---

## Q2. 함수 도입에 따라 새로 필요한 AST 노드 (CallExpr / FuncDef / Param)

`funcDef`, `FuncCall`(expr), `paramList`, `argList`가 문법에 추가되면서 어떤 노드가 필요한지 정리.

### 고민 항목 3가지

1. **함수 호출 일반화 (CallExpr)**
   기존 `CallExpr`는 calc5의 `read()`/`write()` 전용이었는데, `Calc6.g4`에서는 `read`/`write`가 주석 처리되고
   대신 `FuncCall : IDENT '(' argList? ')' # FuncCall`이 `expr`의 alternative로 들어옴.
   `CallExpr(callee: string, args?: Expr[])`는 모양이 그대로 들어맞아서 새 타입 없이 재사용 가능.
   `Expr` 상속도 문제 없음 — `FuncCall`이 실제로 `expr`의 alternative이므로 문법적으로 정당함
   (반면 read/write는 원래 `stmt`의 alternative였는데 `Expr`로 감쌌던 거라 문법과 어긋나는 부분이 있었음. 어차피 죽은 코드).

2. **함수 정의 노드 (FuncDef)**
   `program`이 아니라 `funcDef` 자체를 감싸는 노드가 필요. `Stmt`도 `Expr`도 아닌 `AstNode` 직속으로 설계.

   ```ts
   class FuncDef extends AstNode {
     name: string;
     params: Param[];
     body: BlockStmt;
     returnType?: "int";
   }
   ```

3. **매개변수 선언 vs 인자 전달 — 노드가 둘 다 필요한가?**
   - `argList`(호출부, `expr (',' expr)*`) → 각 원소가 이미 `expr` 그 자체라 추가 정보가 없음.
     기존 `Expr` 타입으로 100% 표현 가능하므로 별도 `Argument` 노드 불필요. `CallExpr.args: Expr[]`가 그대로 담당.
   - `paramList`(정의부, `'int' IDENT (',' 'int' IDENT)*`) → "타입 + 이름"이라는 새로운 조합이라 노드 필요.
     기존 `VariableDecl`(`Declare`용, 모양이 완전히 동일: `typeName: "int"`, `name: string`)과 구조가 겹침.

   판단 기준: **문법 조각이 기존 타입(`Expr`) 하나로 이미 표현되는가?** → 그대로 재사용 (argList).
   **여러 정보의 새 조합인가?** → 그 조합을 담을 노드 필요 (paramList).

### VariableDecl / Param 관계 — 검토한 3가지 안

| 안  | 내용                                      | 장점                                                                              | 단점                                                                                                                                  |
| --- | ----------------------------------------- | --------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | `VariableDecl`로 통일                     | 가장 단순, 타입 안 늘어남                                                         | `Param`인지 `VariableDecl`인지 타입으로 구분 불가 — 나중에 "파라미터 중복"과 "변수 재선언"을 다른 `SemanticErrorKind`로 나누기 어려움 |
| 2   | `Param extends VariableDecl`              | 코드 재사용                                                                       | 실제 관계는 형제(둘 다 "이름+타입" 선언)지 IS-A가 아님 — 한쪽에만 필드/메서드가 늘면 다른 쪽이 원치 않게 상속받는 문제                |
| 3   | 공통 추상 클래스(`Decl`) 만들고 각자 상속 | `Stmt`/`Expr`처럼 이미 있는 "역할 구분용 추상 클래스" 패턴과 일관, 필드 중복 없음 | 클래스 하나 늘어남 (사소한 보일러플레이트)                                                                                            |

```ts
export abstract class Decl extends AstNode {
  constructor(
    public readonly typeName: "int",
    public readonly name: string,
    span?: SourceSpan,
  ) {
    super(span);
  }
}

export class VariableDecl extends Decl {} // stmt 내부 'int' 선언용
export class Param extends Decl {} // funcDef 시그니처의 매개변수용
```

**잠정 결론: 3번 방향으로 채택 논의 중.** 실질적인 관계가 상속이 아니라 형제 관계이기 때문에
2번처럼 상속으로 묶으면 의미상 어색해질 여지가 있고, 1번은 지금은 편하지만 역할 구분이
필요해지는 시점에 다시 리팩터링해야 함.

### 남는 과제 (범위 밖으로 미룸)

- 호출 시 넘긴 `args`의 개수/타입이 `params`와 맞는지 체크하는 로직(arity/타입 체크)은
  노드 설계가 아니라 의미론 검증 영역 — `FuncDef` + 심볼테이블 설계가 어느 정도 잡힌 뒤 별도로 다룰 것.

---

## Q3. `main` 관련 에러 처리는 어디서 하나? (AstBuilder vs Interpreter vs Executor)

1. **진입점 유효성** — 최상위 함수 이름이 `main`이 아니면 에러
2. **`main`을 일반 호출식으로 사용 금지** — `func foo() { main(); }`처럼 진입점 호출이 아니라 보통 함수 호출로 쓰는 것 금지.
3. **`main`은 예약어 취급** — 스코프에 상관없이, 지역변수나 파라미터 이름으로 `main`을 쓰는 것 자체를 금지.

### 어디서 처리할까 — 검토한 후보

| 후보                  | 근거                                                                                                                                                                                                                                                                                                                                                                                                                                                               | 미선택 이유                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Interpreter           | "진입점이 있는지"는 프로그램을 어떻게 **실행**할지의 문제니까 실행을 조율하는 Interpreter가 담당해야 한다는 직관. C의 "컴파일 에러 vs 링크 에러"(undefined reference to main) 구분과 유사해 보임.                                                                                                                                                                                                                                                                  | 지금 `Interpreter.run()`은 `buildAst` → 에러 있으면 중단 → `executor.execute()`, 이 세 줄뿐인 순수 파이프라인이라 자체 검증 로직이 없다. 여기에 검증을 추가하면 시맨틱 에러 생성처가 `AstBuilder`/`Interpreter` 둘로 쪼개져, 지금까지 모든 에러 테스트가 의존하는 `buildAst(code).errors`만으로는 완전한 진단을 못 얻게 된다. 그리고 C의 링크 단계는 "여러 번역 단위를 나중에 합친다"는 실제 정보 격차가 있어야 성립하는데, calc6는 `buildAst` 한 번으로 전체 프로그램을 이미 다 보고 있어 그런 격차가 없다 — `Interpreter`가 나중에 확인해도 `AstBuilder`가 이미 알던 것과 똑같은 정보다. |
| Executor              | "지역 스코프의 main"은 실제로 변수가 선언되는 순간(런타임)에 걸리는 게 자연스럽다는 직관.                                                                                                                                                                                                                                                                                                                                                                          | Executor는 지금 구조화된 에러 보고 방법이 없다(`throw new Error`뿐이고, `Interpreter.run()`은 `executor.execute()` 호출에 try/catch가 없어서 uncaught exception으로 튄다). 게다가 위반이 실행 안 되는 분기(`if` 조건 등) 안에 있으면 그 입력에서만 우연히 안 잡힌다 — "소스 자체의 유효성 규칙"이라면 입력/실행 경로와 무관하게 항상 잡혀야 하는데 Executor 시점 체크로는 그게 안 된다.                                                                                                                                                                                                    |
| **AstBuilder (채택)** | 지금 `AstBuilder`가 이미 하는 일(`UndeclaredVariable`, `RedeclaredIdentifier`)의 공통점은 **CFG 문법이 표현 못 하는 문맥의존적 제약**을 대신 검증한다는 것. `funcDef+`는 "함수가 하나 이상"까지만 표현 가능하고 "그중 하나는 반드시 이름이 main이어야 한다"는 특정 개체를 지목하는 제약은 CFG로 못 쓴다 — "이름이 겹치면 안 된다"를 CFG로 못 쓰는 것과 완전히 같은 이유다. 즉 실행을 알아야 나오는 체크가 아니라, 문법이 못 하는 걸 대신하는 같은 카테고리의 체크. |                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |

**결론**
"AstBuilder가 실행 관점까지 책임져야 하나"라는 우려에 대한 답은 —
AstBuilder는 `main`이 **왜** 중요한지(나중에 Executor가 찾아서 호출한다는 것)는 전혀 몰라도 되고,
그냥 `functions` 배열에 그 이름이 있는지 없는지만 보면 된다. "실행 모델을 아는 것"과
"이름 하나의 존재 여부를 확인하는 것"은 다른 층위이고, 후자만 필요하다.

구체적으로:

```ts
const ENTRY_POINT_NAME = "main";

// 1) visitProgram — 함수 목록을 다 만든 직후
if (!functions.some((f) => f.name === ENTRY_POINT_NAME)) {
  // SemanticErrorKind.MissingMain
}

// 2) visitFuncCall — callee 검증
if (callee === ENTRY_POINT_NAME) {
  // SemanticErrorKind.InvalidMainCall
}

// 3) visitDeclare / visitParamList — 스코프 무관하게 이름 자체를 예약어 취급
if (varName === ENTRY_POINT_NAME) {
  // SemanticErrorKind.ReservedIdentifier
}
```

### 추가 질문 — `AstBuilder`가 두 가지 역할을 겸하고 있는 것 아닌가?

위 논의 중에 나온 관찰: `AstBuilder`는 사실 **(1) 파스 트리 → AST 변환**과 **(2) 스코프/선언 시맨틱 검증**을
한 클래스에서 같이 하고 있다. "제대로 된" 파이프라인이라면

```
Parser → (순수) AST → SemanticAnalyzer(스코프/선언 검증) → Interpreter/Executor
```

이렇게 나뉘어야 하는데, calc6는 프로젝트 규모상 이 둘을 합쳐놨다. `AstBuilder`가 "변환기인데
왜 이런 것까지 하나"라는 위화감은, AstBuilder가 잘못 설계돼서가 아니라 **이름이 실제 역할의
절반(시맨틱 분석)을 안 드러내서** 생기는 것.

**검토한 두 방향:**

- **A. AST빌더에서 시맨틱 처리** — `AstBuilder`가 변환+시맨틱 분석을 계속 겸하고, main 관련 체크도
  기존 `UndeclaredVariable`/`RedeclaredIdentifier`와 같은 자리에 추가.
- **B. 시맨틱 처리 분리** — `SemanticAnalyzer` 같은 새 클래스를 만들어 기존 시맨틱 체크(함수 등록 포함)를
  전부 옮기고 `AstBuilder`는 순수 변환만 담당. 구조적으로는 더 깨끗하지만, 전체 코드 리팩토링 필요

---

## Q4. `return` 문의 값을 자바스크립트의 `return`으로 처리할 지 `ReturnSignal`을 던져서 전달할지?

`Executor.executeStmt`는 `if`/`block`처럼 문장을 재귀적으로 순회하는데, `return`은 그 순회 도중 임의
깊이(중첩된 `if`, 중첩된 `{ }` 블록)에서 나타날 수 있다. 이 값을 `callFunction`까지 옮기는 방법으로
두 가지를 검토

### 검토한 두 방식

- **A. 반환값으로 명시적 전파(threading)** — `executeStmt`류 전체의 반환 타입을 `number | undefined`로
  바꾸고(`undefined` = "return 없었음"), 문장을 순회하는 두 지점(`executeBlockStmt`의 for 루프,
  `callFunction`의 for 루프)마다 "직전 문장이 값을 반환했으면 즉시 멈추고 그 값을 그대로 위로 전달"하는
  체크를 넣는다.

  ```ts
  private executeBlockStmt(stmt: BlockStmt): number | undefined {
    this.currentFrame.enterScope();
    for (const s of stmt.statements) {
      const result = this.executeStmt(s);
      if (result !== undefined) {
        this.currentFrame.exitScope();
        return result; // 남은 문장 실행 안 하고 즉시 전달
      }
    }
    this.currentFrame.exitScope();
    return undefined;
  }
  ```

  `executeReturnStmt`는 값 없는 `return;`도 이미 `0`으로 치환해서 반환하므로(104-107), "진짜 반환값"과
  "return 없었음" 사이에 `undefined`가 겹칠 일은 없다.

- **B. 예외(`ReturnSignal`)를 던져서 스택을 unwind (채택)** — `executeReturnStmt`가
  `throw new ReturnSignal(value)`를 던지면, 중간의 `executeBlockStmt`/`executeIfStmt`에는 `try/catch`가
  전혀 없으므로 그대로 통과해서 올라가고, 호출 체인에서 유일하게 `try/catch`가 있는 `callFunction`에서만
  잡힌다. 재귀/중첩 함수 호출이 있어도 각 호출은 자기 자신의 `callFunction` 프레임에서 자기 몫의
  `ReturnSignal`을 먼저 가로채므로, 예외가 함수 호출 경계를 넘어 엉뚱한 곳까지 뚫고 나가는 일은 없다
  (`callStack.push`/`pop`으로 관리되는 프레임 단위와 정확히 대응).

### 비교

| 기준                         | A. 값 전파(threading)                                                                                                                                   | B. 예외(`ReturnSignal`)                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------- |
| 코드량                       | 문장을 순회하는 모든 지점(현재 block, 함수 body 2곳)마다 체크 코드 필요                                                                                 | `throw` 한 곳 + `catch` 한 곳으로 끝                                                   |
| **깜빡했을 때의 기본 동작**  | **위험** — 체크를 빠뜨리면 컴파일은 되는데 return 값이 조용히 버려지고 다음 문장이 계속 실행됨 (TS는 `number \| undefined` 반환값을 안 써도 에러 안 냄) | **안전** — catch를 안 걸어도 예외가 그냥 더 위로 계속 전파될 뿐, 기본 동작 자체가 정답 |
| 제어흐름 가시성              | 타입 시그니처(`number \| undefined`)에 드러남                                                                                                           | 타입만 봐서는 안 드러남(`executeReturnStmt`가 `never`를 반환하는 이유를 알아야 함)     |
| 향후 `break`/`continue` 확장 | 신호 종류가 늘 때마다 태그드 유니언과 모든 순회 지점의 분기를 다시 손봐야 함                                                                            | 신호 클래스만 추가하고 필요한 지점(가장 가까운 반복문)에서 catch하면 됨                |

**결론: B(예외) 구현**
두 방식 모두 유효하지만, "실수로 처리를 빠뜨렸을 때 어느 쪽이 안전하게 실패하는가"가 중요
A는 순회 지점이 늘어날수록(현재는 2곳뿐이라 적지만) 체크 누락 위험이 누적되고 그 실패가 조용한 정답 오류로 나타나는 반면, B는 아무 것도 안 해도 예외가 계속 전파되어 정답을 유지한다.
calc6 규모에서는 "예외를 일반 제어흐름에 쓰는 게 스타일상 어색하다"는 비용보다 이 안전성 이득이 크다고 판단.
`ReturnSignal`은 `executeReturnStmt`에서만 사용함으로 다른 곳에서 신경 쓸 필요가 없게끔 하는게 더 낫다?

## 구현과제 #3 4번 오류를 내는 시점

기존처럼 errors에 추가 후 인터프리터가 실행기를 호출하기 전인가?
