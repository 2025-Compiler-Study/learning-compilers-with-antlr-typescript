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
