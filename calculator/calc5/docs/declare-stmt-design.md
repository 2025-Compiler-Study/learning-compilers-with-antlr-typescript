# DeclareStmt 설계 고민

## Q1. 복수 선언을 각각의 문으로 풀어야 한다면, 어디서 풀어야 하나?

`int a, b;`는 문법상 하나의 `stmt` 규칙이지만, 의미상으로는 `int a;`와 `int b;` 두 개의 독립적인 문으로 취급하는 것이 자연스럽다.
그렇다면 이 "펼치기(expand)"를 어느 레이어에서 담당해야 하는가?

### 선택지

#### A. 부모 노드(`visitProgram`, `visitBlock`)에서 결과를 보고 펼치기

```typescript
// visitDeclare — 기존처럼 단일 DeclareStmt 반환
visitDeclare = (ctx: DeclareContext): DeclareStmt => {
  const span = this.getSpan(ctx);
  const declarations = ctx.VAR().map((v) => new VariableDecl("int", v.getText(), span));
  return new DeclareStmt(declarations, span);
};

// visitProgram / visitBlock — instanceof로 감지 후 declarations를 분리
ctx.stmt().flatMap((s) => {
  const result = this.visit(s) as Stmt;
  if (result instanceof DeclareStmt) {
    return result.declarations.map((decl) => new DeclareStmt([decl], result.span));
  }
  return [result];
});
```

- visitor 반환 타입을 `AstNode`로 유지할 수 있다.
- 그러나 부모가 `DeclareStmt` 내부 구조(`declarations`)를 알고 직접 재조립해야 한다.
- 펼치기 책임이 부모에게 있지만, `visitDeclare`가 만든 노드를 부모가 다시 해체하는 구조라 어색하다.

#### B. `visitDeclare`가 직접 배열 반환, visitor 제네릭을 확장

```typescript
// AstBuilder
class AstBuilder extends Calc5Visitor<AstNode | AstNode[]>

visitDeclare = (ctx: DeclareContext): DeclareStmt[] => { ... };
```

- `visitDeclare`의 의도가 명확하다: "하나의 declare 구문은 여러 DeclareStmt를 만든다."
- visitor 제네릭 타입이 `AstNode | AstNode[]`로 넓어지면서, 다른 모든 `visitXxx` 반환값을 캐스팅할 때 타입 신뢰도가 낮아진다.

### 결론

`visitDeclare`에 의도가 담기는 점이 더 중요하다고 판단
부모(`visitProgram`, `visitBlock`)의 `visitStmts` 헬퍼에서 `Array.isArray` 분기로 통일해 처리

---

## Q2. 분리된 선언 변수의 Span을 어떻게 잡아야 하나?

`int a, b;` 하나의 구문에서 `DeclareStmt` 두 개가 만들어질 때,
각 노드의 Span을 어떻게 배분해야 하는가?

### 선택지

#### A. 두 DeclareStmt 모두 전체 구문의 Span을 가짐

```
DeclareStmt [int a]  span: (1:0 ~ 1:10)  ← "int a, b;" 전체
DeclareStmt [int b]  span: (1:0 ~ 1:10)  ← 동일
```

- 구현이 단순
- 두 노드가 동일한 위치를 가리켜 에러 메시지나 하이라이팅에서 혼란

#### B. DeclareStmt는 전체 구문 Span, 내부 VariableDecl은 토큰 Span

```
DeclareStmt [int a]  span: (1:0 ~ 1:10)  ← "int a, b;" 전체
  └── VariableDecl(a)  span: (1:4 ~ 1:5) ← 토큰 "a" 위치

DeclareStmt [int b]  span: (1:0 ~ 1:10)
  └── VariableDecl(b)  span: (1:7 ~ 1:8) ← 토큰 "b" 위치
```

- `DeclareStmt`와 `VariableDecl`의 Span이 의미상 구분된다.
- 에러 메시지에서 특정 변수 이름을 정확히 가리킬 수 있다.

### 결론

`VariableDecl`에는 ANTLR 터미널 노드의 토큰 위치(`v.symbol.line`, `v.symbol.column`)를 직접 사용한다.

```typescript
visitDeclare = (ctx: DeclareContext): DeclareStmt[] => {
  const stmtSpan = this.getSpan(ctx);
  return ctx.VAR().map((v) => {
    const varName = v.getText();
    const varSpan = {
      startLine: v.symbol.line,
      startColumn: v.symbol.column,
      endLine: v.symbol.line,
      endColumn: v.symbol.column + varName.length,
    };
    return new DeclareStmt([new VariableDecl("int", varName, varSpan)], stmtSpan);
  });
};
```
