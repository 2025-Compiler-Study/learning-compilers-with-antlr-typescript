# 질문 정리

## Q1. 복수 변수 선언 시 AST 노드 펼치기

`int a, b;` 처럼 하나의 문법 규칙에서 복수 변수를 선언할 때,
`visitDeclare`의 반환 타입은 `AstNode` 하나로 고정되어 있어 `DeclareStmt` 하나를 반환할 수밖에 없다.

그런데 다이어그램처럼 변수별로 분리된 노드로 표현하려면 `Stmt[]` 형태의 복수 반환이 필요하다.
이 경우 `visitDeclare`에서 직접 펼치는 것은 visitor 반환 타입의 한계상 불가능하고,
부모 노드(`visitProgram`, `visitBlock`)에서 `DeclareStmt.declarations`를 순회하며 펼치는 방식이 맞는가?

### 입력 예시

```
int a, b;
a = 1;
b = read();
{ int c; c = a + b; write(c); }
b = 0;
```

### 현재 출력 (DeclareStmt 배열)

```
Program
├── DeclareStmt [int a, int b]    ← a, b가 하나의 노드
├── AssignStmt  a =
│   └── Int(1)
├── AssignStmt  b =
│   └── CallExpr(read)
├── BlockStmt
│   ├── DeclareStmt [int c]
│   ├── AssignStmt  c =
│   │   └── BinaryExpr(+)
│   │       ├── Var(a)
│   │       └── Var(b)
│   └── ExprStmt
│       └── CallExpr(write)
│           └── Var(c)
└── AssignStmt  b =
    └── Int(0)
```

---

## Q2. `write` 구현 시 ExprStmt 래퍼가 필요한가

`visitWrite`는 `CallExpr("write", [arg])`를 만들고 이를 `ExprStmt`로 감싸서 반환한다.
`Program.statements`는 `Stmt[]`를 받기 때문에 `Expr`인 `CallExpr`을 직접 넣을 수 없어서 래퍼가 필요하다.

- **`WriteStmt { arg: Expr }`**: write 전용 Stmt 노드를 만들면 뎁스가 줄어들지만, `CallExpr`의 역할이 사라지고 write 의미가 노드 타입에 하드코딩된다.
- **`ExprStmt { expr: CallExpr }`**: 현재 구조. 뎁스가 하나 더 생기지만, "write는 함수 호출이고 그것을 statement 자리에 쓴 것"이라는 의미를 AST가 그대로 반영한다.

고민내용

- `ExprStmt`라는 래퍼 뎁스는 불필요한 복잡도인가, 아니면 표현식과 문장의 계층을 명확히 하는 설계인가?
- `WriteStmt`로 단순화하면 `CallExpr`의 범용성을 포기하는 것 아닌가?

---

## Q3. AST 출력과 실제 구조의 불일치

`AssignStmt b = 0`처럼 출력을 평탄하게 표현할 수 있고, 트리로 자식 노드를 두는 방식도 가능하다.

```
# 출력 스타일 A (트리)       # 출력 스타일 B (압축)
AssignStmt  b =              AssignStmt(b = 0)
  └── Int(0)
```

그런데 오른쪽 값(`value`)은 항상 리터럴이 아닌데 가능한가?

```
b = 0          → Int(0)
b = a + b * 2  → BinaryExpr(+, Var(a), BinaryExpr(*, Var(b), Int(2)))
b = read()     → CallExpr(read)
```

출력에서만 그렇게 표기된건지 실제 AST 구조를 그렇게 가져갈 수 있는건지?
