# PreFixListener 전위 순회 설명

## ANTLR Listener의 동작 원리

ANTLR의 `ParseTreeWalker`는 **깊이 우선 전위 순회(Depth-First Preorder Traversal)** 로 트리를 탐색합니다. 각 노드에 진입할 때 `enter` 메서드가 호출

## 예제 1: "1" (단일 숫자)

```
calc0
  └─ expr (Int)
       └─ INT: "1"
```

**순회 순서:**

1. `enterInt` → "1" 추가

**결과:** `"1"`

---

## 예제 2: "1+2\*3" (연산자 우선순위)

문법에서 `MulDiv`가 `AddSub`보다 높은 우선순위를 가지므로:

```
calc0
  └─ expr (AddSub)
       ├─ expr (Int)
       │    └─ INT: "1"
       ├─ "+": 연산자
       └─ expr (MulDiv)
            ├─ expr (Int)
            │    └─ INT: "2"
            ├─ "*": 연산자
            └─ expr (Int)
                 └─ INT: "3"
```

**순회 순서:**

1. `enterAddSub` → "+" 추가 (AddSub 노드 진입)
2. `enterInt` → "1" 추가 (왼쪽 자식)
3. `enterMulDiv` → "\*" 추가 (오른쪽 자식의 MulDiv 노드)
4. `enterInt` → "2" 추가 (MulDiv의 왼쪽 자식)
5. `enterInt` → "3" 추가 (MulDiv의 오른쪽 자식)

**결과:** `"+ 1 * 2 3"`

---

## 예제 3: "(1+2)\*3" (괄호 사용)

괄호는 우선순위를 변경합니다:

```
calc0
  └─ expr (MulDiv)
       ├─ expr (Parens)
       │    └─ expr (AddSub)
       │         ├─ expr (Int)
       │         │    └─ INT: "1"
       │         ├─ "+": 연산자
       │         └─ expr (Int)
       │              └─ INT: "2"
       ├─ "*": 연산자
       └─ expr (Int)
            └─ INT: "3"
```

**순회 순서:**

1. `enterMulDiv` → "\*" 추가 (최상위 MulDiv 노드)
2. `enterAddSub` → "+" 추가 (괄호 안의 AddSub 노드)
3. `enterInt` → "1" 추가
4. `enterInt` → "2" 추가
5. `enterInt` → "3" 추가

**결과:** `"* + 1 2 3"`

---

## 예제 4: "10+2\*(5-9/3)" (복잡한 수식)

```
calc0
  └─ expr (AddSub)
       ├─ expr (Int)
       │    └─ INT: "10"
       ├─ "+": 연산자
       └─ expr (MulDiv)
            ├─ expr (Int)
            │    └─ INT: "2"
            ├─ "*": 연산자
            └─ expr (Parens)
                 └─ expr (AddSub)
                      ├─ expr (Int)
                      │    └─ INT: "5"
                      ├─ "-": 연산자
                      └─ expr (MulDiv)
                           ├─ expr (Int)
                           │    └─ INT: "9"
                           ├─ "/": 연산자
                           └─ expr (Int)
                                └─ INT: "3"
```

**순회 순서:**

1. `enterAddSub` → "+" 추가 (최상위 AddSub)
2. `enterInt` → "10" 추가
3. `enterMulDiv` → "\*" 추가 (오른쪽의 MulDiv)
4. `enterInt` → "2" 추가
5. `enterAddSub` → "-" 추가 (괄호 안의 AddSub)
6. `enterInt` → "5" 추가
7. `enterMulDiv` → "/" 추가 (괄호 안의 MulDiv)
8. `enterInt` → "9" 추가
9. `enterInt` → "3" 추가

**결과:** `"+ 10 * 2 - 5 / 9 3"`

---

## 핵심 포인트

1. **전위 순회 특성**: 부모 노드를 먼저 방문하므로 연산자가 피연산자보다 먼저 출력됩니다.
2. **문법 우선순위**: ANTLR 문법에서 `MulDiv`가 `AddSub`보다 먼저 정의되어 있어 더 깊은 트리 구조를 만듭니다.
3. **enter 메서드**: 노드에 진입할 때마다 호출되며, 자식 노드 방문 전에 실행됩니다.
