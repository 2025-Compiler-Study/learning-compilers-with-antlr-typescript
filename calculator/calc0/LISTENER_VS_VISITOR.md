# Listener vs Visitor 패턴 완전 분석

## 입력: `10 + 2 * (5 - 9 / 3)`

---

## 1단계: 파서 트리 구조 (공통)

두 패턴 모두 **동일한 파서 트리**를 사용합니다:

```
Calc0Context: "10+2*(5-9/3)"
└─ AddSubContext: "10+2*(5-9/3)"  (연산자: +)
   ├─ IntContext: "10"                    ← 왼쪽
   │  └─ TerminalNode: "10"
   │
   ├─ TerminalNode: "+"                   ← 연산자
   │
   └─ MulDivContext: "2*(5-9/3)"          ← 오른쪽
      ├─ IntContext: "2"
      │  └─ TerminalNode: "2"
      │
      ├─ TerminalNode: "*"
      │
      └─ ParensContext: "(5-9/3)"
         ├─ TerminalNode: "("
         │
         ├─ AddSubContext: "5-9/3"  (연산자: -)
         │  ├─ IntContext: "5"
         │  │  └─ TerminalNode: "5"
         │  │
         │  ├─ TerminalNode: "-"
         │  │
         │  └─ MulDivContext: "9/3"  (연산자: /)
         │     ├─ IntContext: "9"
         │     │  └─ TerminalNode: "9"
         │     │
         │     ├─ TerminalNode: "/"
         │     │
         │     └─ IntContext: "3"
         │        └─ TerminalNode: "3"
         │
         └─ TerminalNode: ")"
```

---

## 2단계: 실행 순서 비교

### 🔵 Listener 패턴 - 자동 후위 순회

```
실행 순서:
1. exitInt(10)              ← 맨 왼쪽 리프 노드부터
2. exitInt(2)
3. exitInt(5)
4. exitInt(9)
5. exitInt(3)               ← 모든 Int 노드 방문 완료
6. exitMulDiv(9 / 3 = 3)    ← 가장 깊은 MulDiv부터 계산
7. exitAddSub(5 - 3 = 2)    ← 괄호 안의 AddSub 계산
8. exitMulDiv(2 * 2 = 4)    ← 바깥쪽 MulDiv 계산
9. exitAddSub(10 + 4 = 14)  ← 최상위 AddSub 계산
```

**스택 변화:**
```
1. exitInt(10)    → [10]
2. exitInt(2)     → [10, 2]
3. exitInt(5)     → [10, 2, 5]
4. exitInt(9)     → [10, 2, 5, 9]
5. exitInt(3)     → [10, 2, 5, 9, 3]
6. exitMulDiv     → [10, 2, 5, 3]      (9/3=3)
7. exitAddSub     → [10, 2, 2]         (5-3=2)
8. exitMulDiv     → [10, 4]            (2*2=4)
9. exitAddSub     → [14]               (10+4=14)
```

---

### 🔴 Visitor 패턴 - 명시적 재귀 순회

```
실행 순서:
1.  📍 visitCalc0("10+2*(5-9/3)")          ← 루트부터 시작
2.    ➕ visitAddSub("10+2*(5-9/3)")       ← 최상위 덧셈 진입
3.      ⬅️ 왼쪽 방문: "10"
4.        🔢 visitInt("10") → 10           ← 재귀: Int 방문
5.      ⬅️ left = 10 받음
6.      ➡️ 오른쪽 방문: "2*(5-9/3)"
7.        🔄 visitMulDiv("2*(5-9/3)")      ← 재귀: MulDiv 진입
8.          ⬅️ 왼쪽 방문: "2"
9.            🔢 visitInt("2") → 2         ← 재귀: Int 방문
10.         ⬅️ left = 2 받음
11.         ➡️ 오른쪽 방문: "(5-9/3)"
12.           📦 visitParens("(5-9/3)")    ← 재귀: Parens 진입
13.             🔽 내부 방문: "5-9/3"
14.               ➕ visitAddSub("5-9/3")   ← 재귀: 괄호 안 덧셈
15.                 ⬅️ 왼쪽 방문: "5"
16.                   🔢 visitInt("5") → 5 ← 재귀: Int 방문
17.                 ⬅️ left = 5 받음
18.                 ➡️ 오른쪽 방문: "9/3"
19.                   🔄 visitMulDiv("9/3") ← 재귀: 가장 깊은 곳!
20.                     ⬅️ 왼쪽 방문: "9"
21.                       🔢 visitInt("9") → 9
22.                     ⬅️ left = 9 받음
23.                     ➡️ 오른쪽 방문: "3"
24.                       🔢 visitInt("3") → 3
25.                     ➡️ right = 3 받음
26.                   ✅ return 9/3 = 3    ← 첫 계산!
27.                 ➡️ right = 3 받음
28.               ✅ return 5-3 = 2       ← 두 번째 계산!
29.           ✅ return 2                  ← 괄호 벗김
30.         ➡️ right = 2 받음
31.       ✅ return 2*2 = 4               ← 세 번째 계산!
32.     ➡️ right = 4 받음
33.   ✅ return 10+4 = 14                 ← 네 번째 계산!
34. ✅ return 14                          ← 최종 결과!
```

**콜 스택 변화 (JavaScript Call Stack):**
```
visitCalc0
  → visitAddSub (최상위)
    → visitInt(10) → 10 리턴
    → visitMulDiv
      → visitInt(2) → 2 리턴
      → visitParens
        → visitAddSub (괄호 안)
          → visitInt(5) → 5 리턴
          → visitMulDiv (가장 깊은 곳)
            → visitInt(9) → 9 리턴
            → visitInt(3) → 3 리턴
          ← 3 리턴 (9/3)
        ← 2 리턴 (5-3)
      ← 2 리턴 (괄호)
    ← 4 리턴 (2*2)
  ← 14 리턴 (10+4)
← 14 리턴
```

---

## 3단계: 왜 이런 차이가 나는가?

### 🔵 Listener 패턴의 동작 원리

#### 코드 분석:
```typescript
// helper.ts
const calculator = new CalculatorL();
ParseTreeWalker.DEFAULT.walk(calculator, tree);
```

**ParseTreeWalker의 동작:**
```typescript
// ANTLR 내부 코드 (의사코드)
class ParseTreeWalker {
  walk(listener, tree) {
    this.walkRecursive(listener, tree);
  }

  walkRecursive(listener, node) {
    // 1. enterXXX 호출 (현재 노드 진입)
    node.enterRule(listener);

    // 2. 자식들을 재귀적으로 방문
    for (const child of node.children) {
      this.walkRecursive(listener, child);
    }

    // 3. exitXXX 호출 (현재 노드 퇴장)
    node.exitRule(listener);
  }
}
```

**왜 리프 노드부터 exit할까?**

트리를 DFS로 순회하면서 **자식을 먼저 처리**하기 때문입니다:

```
트리:
  AddSub
  ├─ Int(10)
  └─ MulDiv
     └─ ...

실행:
1. enterAddSub
2.   enterInt(10)
3.   exitInt(10)      ← 자식이 없으므로 바로 exit
4.   enterMulDiv
5.     (자식들 처리...)
6.   exitMulDiv
7. exitAddSub         ← 모든 자식 처리 후 exit
```

**핵심: exit는 항상 자식들의 exit 이후에 호출됩니다!**

---

### 🔴 Visitor 패턴의 동작 원리

#### 코드 분석:
```typescript
// helper.ts
const calculator = new CalculatorV();
calculator.visit(tree);  // 수동 호출!
```

**visit 메서드의 동작:**
```typescript
// ANTLR의 visit 메서드
visit(tree) {
  return tree.accept(this);  // Context의 accept 호출
}

// IntContext의 accept 메서드
accept(visitor) {
  if (visitor.visitInt) {
    return visitor.visitInt(this);  // visitInt 호출
  } else {
    return visitor.visitChildren(this);
  }
}

// AddSubContext의 accept 메서드
accept(visitor) {
  if (visitor.visitAddSub) {
    return visitor.visitAddSub(this);  // visitAddSub 호출
  } else {
    return visitor.visitChildren(this);
  }
}
```

**우리의 visitAddSub 구현:**
```typescript
visitAddSub = (ctx: AddSubContext): number => {
  // 1. 왼쪽 자식 방문 (이 시점에서 재귀!)
  const left = this.visit(leftExpr);
  // ↑ leftExpr.accept(this) 호출
  // → leftExpr가 IntContext면 visitInt 호출
  // → leftExpr가 MulDivContext면 visitMulDiv 호출

  // 2. 오른쪽 자식 방문 (이 시점에서 재귀!)
  const right = this.visit(rightExpr);

  // 3. 계산 (자식들의 결과를 받은 후)
  return left + right;
};
```

**왜 루트부터 진입할까?**

수동으로 `this.visit()`를 호출하기 때문입니다:

```
1. calculator.visit(Calc0Context)
   → Calc0Context.accept(visitor)
   → visitor.visitCalc0(Calc0Context)
   ↓
2. visitCalc0에서 this.visit(AddSubContext) 호출
   → AddSubContext.accept(visitor)
   → visitor.visitAddSub(AddSubContext)
   ↓
3. visitAddSub에서 this.visit(IntContext) 호출
   → IntContext.accept(visitor)
   → visitor.visitInt(IntContext)
   → return 10
```

**핵심: 각 visit 메서드 안에서 명시적으로 자식을 방문합니다!**

---

## 4단계: 핵심 차이점 정리

### 제어 흐름 (Control Flow)

| | Listener | Visitor |
|---|----------|---------|
| **누가 순회?** | ParseTreeWalker (자동) | 개발자가 직접 (수동) |
| **진입점** | ParseTreeWalker.walk() | calculator.visit() |
| **순회 방식** | DFS 후위 순회 (고정) | 개발자가 결정 |
| **호출 시점** | exit: 자식 처리 후 | visit: 필요할 때마다 |

### 데이터 흐름 (Data Flow)

| | Listener | Visitor |
|---|----------|---------|
| **값 전달** | 명시적 스택 필요 | 함수 반환값 사용 |
| **중간 결과** | 스택에 push/pop | 콜 스택에 저장 |
| **타입** | void (반환 없음) | 제네릭 타입 T |

### 방문 순서 (Visit Order)

**Listener (후위 순회):**
```
리프 노드 → 부모 노드 → 루트 노드
Int(10) → Int(2) → ... → MulDiv → AddSub
```

**Visitor (전위 진입 + 후위 계산):**
```
진입: 루트 → 부모 → 리프
계산: 리프 → 부모 → 루트

진입: Calc0 → AddSub → Int(10) → MulDiv → ...
계산: Int(3) return → MulDiv return → ... → Calc0 return
```

---

## 5단계: 실제 동작 흐름 비교

### 예시: `9 / 3` 계산

#### 🔵 Listener:
```
1. Walker가 트리 순회 중...
2. Int(9) 도착 → exitInt(9) 호출 → 스택에 9 push
3. Int(3) 도착 → exitInt(3) 호출 → 스택에 3 push
4. MulDiv(9/3) 도착 → exitMulDiv 호출
   - 스택에서 3 pop (right)
   - 스택에서 9 pop (left)
   - 9/3 = 3 계산
   - 스택에 3 push
```

#### 🔴 Visitor:
```
1. visitMulDiv("9/3") 호출됨
2. const left = this.visit(leftExpr)
   → visitInt("9") 호출
   → return 9
   → left = 9
3. const right = this.visit(rightExpr)
   → visitInt("3") 호출
   → return 3
   → right = 3
4. return 9 / 3 = 3
```

---

## 6단계: 왜 스택이 필요한가? (Listener)

Listener는 **반환값이 없기 때문에** 중간 결과를 저장할 곳이 필요합니다:

```typescript
exitInt = (ctx: IntContext): void => {  // void!
  const value = parseInt(ctx.INT()!.getText());
  this.stack.push(value);  // 저장할 곳이 필요!
};

exitMulDiv = (ctx: MulDivContext): void => {  // void!
  const right = this.stack.pop()!;  // 어디선가 가져와야 함
  const left = this.stack.pop()!;
  this.stack.push(left * right);  // 결과도 저장
};
```

**문제:**
- `exitInt`가 10을 계산했는데, 이걸 `exitAddSub`에게 어떻게 전달?
- 해결책: 스택에 저장!

---

## 7단계: 왜 반환값으로 충분한가? (Visitor)

Visitor는 **반환값으로 결과를 전달**하기 때문에 스택이 불필요합니다:

```typescript
visitInt = (ctx: IntContext): number => {  // number 반환!
  return parseInt(ctx.INT()!.getText());
};

visitMulDiv = (ctx: MulDivContext): number => {  // number 반환!
  const left = this.visit(leftExpr);   // 반환값 받음
  const right = this.visit(rightExpr); // 반환값 받음
  return left * right;                 // 계산 후 반환
};
```

**JavaScript 콜 스택이 자동으로 관리:**
```
visitAddSub 호출
  left = visitInt()
    → 10 반환
  left = 10 (변수에 저장)

  right = visitMulDiv()
    left2 = visitInt()
      → 2 반환
    left2 = 2
    right2 = visitParens()
      ...
      → 2 반환
    right2 = 2
    → 2 * 2 = 4 반환
  right = 4

  return 10 + 4 = 14
```

---

## 결론

### 🔵 Listener - "나는 관찰자일 뿐"
- Walker가 트리를 **자동으로 전체 순회**
- 리프부터 루트까지 **exit 메서드 호출**
- 스택으로 값 전달
- 제어 불가능 (전체 순회 강제)

### 🔴 Visitor - "나는 능동적 탐험가"
- 개발자가 **수동으로 순회 제어**
- 루트부터 시작해서 **필요한 노드만 방문**
- 반환값으로 값 전달
- 완전한 제어 가능 (선택적 방문)

---

## 언제 어떤 패턴을 사용할까?

| 상황 | 추천 패턴 | 이유 |
|------|----------|------|
| 간단한 계산 | Visitor | 반환값이 직관적 |
| 전체 트리 순회 필요 | Listener | 자동 순회가 편리 |
| 특정 노드만 처리 | Visitor | 선택적 방문 가능 |
| 코드 생성 | Visitor | 문자열 반환 |
| 검증/체크 | Listener | 전체 검사 필요 |
