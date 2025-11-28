# ANTLR Parse Tree Listener & Visitor 완벽 가이드

## 1. Parse Tree와 라벨링 (Labeling)

파서가 생성하는 **Parse Tree(구문 트리)**를 효과적으로 다루기 위해서는 문법 정의 단계에서 **라벨(#)**을 붙이는 것이 필수적입니다.

```antlr
expr: expr op=('*'|'/') expr   # MulDiv   ← 라벨 필수!
    | expr op=('+'|'-') expr   # AddSub   ← 라벨 필수!
    | INT                       # Int
    ;
```

- **라벨이 있으면:** `visitMulDiv`, `enterAddSub` 처럼 구체적인 메서드가 자동 생성됩니다.
- **라벨이 없으면:** 뭉뚱그려진 `visitExpr` 하나만 생성되어, 내부에서 연산자를 직접 `if`문으로 구분해야 하는 번거로움이 생깁니다.

---

## 2. Listener 패턴

### 핵심 컨셉: "상태 변경 (Mutation)"

Listener는 **비순수 함수(Impure Function)**들의 집합과 같습니다. 리턴값이 없으며(`void`), **외부의 상태(멤버 변수, 전역 변수 등)를 변경하는 부수 효과(Side Effect)**를 위해 존재합니다.

### 특징

- **자동 순회:** `ParseTreeWalker`가 트리를 알아서 구석구석 돌아다닙니다(DFS).
- **수동적:** "이 노드에 들어왔어", "나갔어"라고 알려주면 그때 동작합니다.
- **용도:** 결과를 리턴받을 필요 없이, **정보를 수집하거나 누적**할 때 사용합니다.

### 실전 코드: 심볼 테이블 구성 (수집)

```typescript
class SymbolTableListener extends MyBaseListener {
  // 1. 외부 상태 (여기에 결과가 누적됨)
  public symbols = new Map<string, string>();

  // 2. 비순수 함수 (리턴 없이 상태만 변경)
  exitVarDecl(ctx: VarDeclContext): void {
    const name = ctx.ID().text;
    const type = ctx.TYPE().text;

    // Side Effect 발생!
    this.symbols.set(name, type);
    console.log(`변수 등록됨: ${name} (${type})`);
  }
}

// 사용
const listener = new SymbolTableListener();
ParseTreeWalker.DEFAULT.walk(listener, tree);
console.log(listener.symbols); // 결과 확인
```

---

## 3. Visitor 패턴

### 핵심 컨셉: "값의 변환과 제어 (Transformation & Control)"

Visitor는 **순수 함수**에 가깝습니다. 입력을 받아 계산된 **결과를 반환(Return)**합니다.

### 특징

- **수동 순회:** 개발자가 `this.visit()`을 호출해야만 자식 노드로 이동합니다.
- **제어권:** 특정 자식을 건너뛰거나, 순서를 바꾸거나, 반복해서 방문할 수 있습니다.
- **용도:** 수식 계산, 인터프리터, **AST(추상 구문 트리) 변환** 등 결과값이 필요할 때 사용합니다.

### 실전 코드: 계산기 (결과 반환)

```typescript
// <number> 제네릭을 통해 반환 타입 지정
class Calculator extends MyVisitor<number> {
  visitInt(ctx: IntContext): number {
    return parseInt(ctx.getText());
  }

  visitMulDiv(ctx: MulDivContext): number {
    // ✅ 자식의 결과를 받아와서(Return) 새로운 값을 만듦
    const left = this.visit(ctx.expr(0));
    const right = this.visit(ctx.expr(1));

    return ctx.op.text === "*" ? left * right : left / right;
  }

  // 흐름 제어 예시
  visitIfStat(ctx: IfStatContext): number {
    const condition = this.visit(ctx.condition());
    // 조건에 따라 방문할 가지(Branch)를 선택
    if (condition) return this.visit(ctx.thenBlock());
    else return this.visit(ctx.elseBlock());
  }
}
```

---

## 4. Listener vs Visitor 핵심 비교

| 특징            | Listener                       | Visitor                        |
| :-------------- | :----------------------------- | :----------------------------- |
| **핵심 동작**   | **상태 변경 (Side Effect)**    | **값 반환 (Return Value)**     |
| **데이터 전달** | 클래스 멤버 변수에 누적        | 메서드 리턴값으로 전달         |
| **순회 방식**   | Walker가 자동 수행 (Iterative) | 개발자가 직접 호출 (Recursive) |
| **흐름 제어**   | 불가능 (모든 노드 방문)        | 가능 (건너뛰기, 반복 가능)     |
| **스택 메모리** | 안전함                         | 깊은 트리에서 Overflow 위험    |
| **주요 용도**   | 심볼 수집, 코드 검증(Linting)  | 인터프리터, AST 변환, 컴파일   |

---

## 5. 활용

### ① Parse Tree → AST 변환

실제 컴파일러 개발 시, Parse Tree는 문법적 요소(괄호, 세미콜론)가 너무 많아 다루기 힘듭니다.
보통 **Visitor**를 사용하여 Parse Tree를 순회하며, 로직에 필요한 핵심 정보만 담은 **AST(Abstract Syntax Tree) 객체**를 리턴하는 패턴을 가장 많이 사용합니다.

### ② 하이브리드 패턴 (Visitor 내부에서 Listener 사용)

Visitor로 전체 실행 흐름을 제어하다가, 특정 구간에서만 "빠른 정보 수집"이 필요할 때 Listener를 호출해 사용할 수 있습니다.

**상황:** 함수를 실행(`visit`)하기 전에, 함수 내부에 '금지된 명령어'가 있는지 검사하고 싶음.

```typescript
class Interpreter extends MyVisitor<Value> {
  visitFunctionDecl(ctx: FunctionDeclContext): Value {
    // 1. 실행 전 스캔: Listener를 이용해 해당 함수 범위만 빠르게 훑기
    const scanner = new SecurityScannerListener();
    const walker = new ParseTreeWalker();
    walker.walk(scanner, ctx); // 전체 트리가 아니라 현재 노드(ctx)만 스캔

    if (scanner.hasDangerousCode) {
      throw new Error("보안 위반 코드 발견!");
    }

    // 2. 안전하면 실행: Visitor의 본연의 임무(실행 및 리턴) 수행
    return this.visit(ctx.body());
  }
}
```

---

## 6. 요약 가이드

1.  **결과값이 필요한가?**

    - YES (계산, 변환) → **Visitor**
    - NO (단순 수집, 출력) → **Listener**

2.  **실행 흐름을 제어해야 하는가?**

    - YES (`if-else`, 루프 구현) → **Visitor**
    - NO (코드 전체를 빠짐없이 훑기) → **Listener**

3.  **구조를 잘 몰라도 되는가?**
    - YES (그냥 변수 선언만 다 찾아줘) → **Listener** (Walker가 알아서 찾아줌)
    - NO (구조에 따라 로직이 달라짐) → **Visitor**
