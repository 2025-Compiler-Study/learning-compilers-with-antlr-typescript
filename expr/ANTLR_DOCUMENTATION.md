# ANTLR Expr 파서 문서

ANTLR4로 생성된 수식 계산기 파서입니다. TypeScript로 작성되었으며, 간단한 산술 표현식을 파싱하고 계산할 수 있습니다.

## 프로젝트 구조

### 1. 원본 문법 파일
- **Expr.g4** - ANTLR 문법 정의 파일
  - 수식 파서를 정의하는 원본 소스
  - 지원 연산: `+`, `-`, `*`, `/`, 괄호 `()`
  - 정수(INT) 및 연산자 우선순위 처리

### 2. 자동 생성된 파일 (코드에서 사용)

#### ExprLexer.ts
- **역할**: 토큰화(Tokenization)
- **기능**: 입력 문자열을 토큰으로 분리
- **토큰 타입**:
  - `T__0` ~ `T__5`: 연산자 (`*`, `/`, `+`, `-`, `(`, `)`)
  - `INT`: 정수
  - `NEWLINE`: 줄바꿈 (스킵됨)

```typescript
import { ExprLexer } from './ExprLexer.js';
import { CharStream } from 'antlr4ng';

const inputStream = CharStream.fromString("1+2");
const lexer = new ExprLexer(inputStream);
```

#### ExprParser.ts
- **역할**: 구문 분석(Parsing)
- **기능**: 토큰 스트림을 파스 트리로 변환
- **주요 규칙**:
  - `prog()`: 전체 프로그램 (expr + EOF)
  - `expr()`: 수식 표현 (재귀적으로 처리)
- **Context 클래스**:
  - `ProgContext`: 프로그램 컨텍스트
  - `ExprContext`: 수식 컨텍스트

```typescript
import { ExprParser } from './ExprParser.js';
import { CommonTokenStream } from 'antlr4ng';

const tokenStream = new CommonTokenStream(lexer);
const parser = new ExprParser(tokenStream);
const tree = parser.prog();
```

#### ExprListener.ts
- **역할**: 파스 트리 순회 인터페이스
- **기능**: Visitor 패턴으로 파스 트리를 처리
- **메서드**:
  - `enterProg()`: prog 노드 진입 시
  - `exitProg()`: prog 노드 종료 시
  - `enterExpr()`: expr 노드 진입 시
  - `exitExpr()`: expr 노드 종료 시

```typescript
import { ExprListener } from './ExprListener.js';

class MyListener extends ExprListener {
  enterExpr(ctx: ExprContext) {
    console.log("표현식 발견:", ctx.getText());
  }
}
```

### 3. 중간/디버깅 파일 (참고용)
- **Expr.interp** - 파서 인터프리터 데이터
- **Expr.tokens** - 토큰 정의 목록
- **ExprLexer.interp** - 렉서 인터프리터 데이터
- **ExprLexer.tokens** - 렉서 토큰 목록

이 파일들은 ANTLR이 내부적으로 사용하며, 직접 수정할 필요가 없습니다.

## 사용 예제

### example.ts - 기본 파싱 예제
파싱만 수행하고 파스 트리를 출력합니다.

```typescript
import { CharStream, CommonTokenStream } from "antlr4ng";
import { ExprLexer } from "./ExprLexer.js";
import { ExprParser } from "./ExprParser.js";

function parseExpression(input: string) {
  const inputStream = CharStream.fromString(input);
  const lexer = new ExprLexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new ExprParser(tokenStream);
  const tree = parser.prog();
  return { tree, parser };
}

const { tree, parser } = parseExpression("1+2");
console.log(tree.toStringTree(parser));
```

### calculator.ts - 계산기 구현 예제
파싱한 결과를 실제로 계산합니다.

```typescript
import { CharStream, CommonTokenStream } from "antlr4ng";
import { ExprLexer } from "./ExprLexer.js";
import { ExprParser, ExprContext } from "./ExprParser.js";

function evaluateExpr(ctx: ExprContext): number {
  // 단순 숫자
  if (ctx.INT()) {
    return parseInt(ctx.INT()!.getText());
  }

  // 괄호 처리
  const text = ctx.getText();
  if (text.startsWith('(') && text.endsWith(')')) {
    return evaluateExpr(ctx.expr(0));
  }

  // 이항 연산
  const childCount = ctx.getChildCount();
  if (childCount === 3) {
    const left = evaluateExpr(ctx.expr(0));
    const operator = ctx.getChild(1)!.getText();
    const right = evaluateExpr(ctx.expr(1));

    switch (operator) {
      case '*': return left * right;
      case '/': return left / right;
      case '+': return left + right;
      case '-': return left - right;
    }
  }
}

function calculate(input: string): number {
  const inputStream = CharStream.fromString(input);
  const lexer = new ExprLexer(inputStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new ExprParser(tokenStream);
  const tree = parser.prog();
  return evaluateExpr(tree.expr());
}

console.log(calculate("10+20*30")); // 610
console.log(calculate("(5+6)*7"));  // 77
```

## 실행 방법

### 1. 문법 파일 컴파일
```bash
npm run antlr
```

실행되는 명령:
```bash
antlr-ng -Dlanguage=TypeScript -o . Expr.g4
```

생성되는 파일:
- ExprLexer.ts
- ExprParser.ts
- ExprListener.ts
- *.interp, *.tokens (중간 파일)

### 2. 예제 실행
```bash
# 기본 파싱 예제
npm run dev example.ts

# 계산기 예제
npm run dev calculator.ts
```

## 문법 설명 (Expr.g4)

```antlr
grammar Expr;

prog: expr EOF ;

expr: expr ('*'|'/') expr    # 곱셈/나눗셈 (우선순위 높음)
    | expr ('+'|'-') expr    # 덧셈/뺄셈 (우선순위 낮음)
    | INT                    # 정수
    | '(' expr ')'           # 괄호
    ;

NEWLINE : [\r\n]+ -> skip;   # 줄바꿈 무시
INT     : [0-9]+ ;           # 정수 토큰
```

### 특징
- **왼쪽 재귀**: `expr: expr ('*'|'/') expr`로 왼쪽 결합
- **우선순위**: 곱셈/나눗셈이 덧셈/뺄셈보다 먼저 처리
- **괄호 지원**: 우선순위 변경 가능

## Expr.g4 영역별 분석

### 렉서 / 파서 / 리스너 영역 구분

```antlr
grammar Expr;              ← 문법 선언부

━━━━━━━━━━ 파서 영역 ━━━━━━━━━━
prog:	expr EOF ;          ← 파서 규칙 (소문자 시작)
expr:	expr ('*'|'/') expr  ← 파서 규칙 (소문자 시작)
    |	expr ('+'|'-') expr
    |	INT
    |	'(' expr ')'
    ;
━━━━━━━━━━ 렉서 영역 ━━━━━━━━━━
NEWLINE : [\r\n]+ -> skip;  ← 렉서 규칙 (대문자 시작)
INT     : [0-9]+ ;          ← 렉서 규칙 (대문자 시작)
```

**리스너는 .g4 파일에 명시되지 않고, ANTLR이 자동 생성합니다.**

---

### 1. 렉서 영역 (Lexer Rules)

#### g4 파일의 렉서 규칙
```antlr
NEWLINE : [\r\n]+ -> skip;
INT     : [0-9]+ ;
```

#### 특징
- **대문자로 시작**: `NEWLINE`, `INT`
- **토큰(Token) 정의**: 문자 스트림을 토큰으로 분리

#### 역할
**입력 문자열 → 토큰 스트림**

```
입력: "12+34"
      ↓ 렉서 처리
토큰: [INT("12"), +, INT("34")]
```

#### 생성 파일: ExprLexer.ts
```typescript
export class ExprLexer extends antlr.Lexer {
    public static readonly T__0 = 1;  // '*'
    public static readonly T__1 = 2;  // '/'
    public static readonly T__2 = 3;  // '+'
    public static readonly T__3 = 4;  // '-'
    public static readonly T__4 = 5;  // '('
    public static readonly T__5 = 6;  // ')'
    public static readonly NEWLINE = 7;
    public static readonly INT = 8;
}
```

#### 실제 사용
```typescript
import { CharStream } from "antlr4ng";
import { ExprLexer } from "./ExprLexer.js";

const inputStream = CharStream.fromString("12+34");
const lexer = new ExprLexer(inputStream);
// 렉서가 토큰화 수행
// "12+34" → [INT(12), +(+), INT(34)]
```

---

### 2. 파서 영역 (Parser Rules)

#### g4 파일의 파서 규칙
```antlr
prog:	expr EOF ;
expr:	expr ('*'|'/') expr
    |	expr ('+'|'-') expr
    |	INT
    |	'(' expr ')'
    ;
```

#### 특징
- **소문자로 시작**: `prog`, `expr`
- **구문 구조 정의**: 토큰들의 조합 규칙

#### 역할
**토큰 스트림 → 파스 트리(Parse Tree)**

```
토큰: [INT(1), +, INT(2), *, INT(3)]
      ↓ 파서 처리
트리:     +
        /   \
      INT(1) *
            / \
         INT(2) INT(3)
```

#### 생성 파일: ExprParser.ts
```typescript
export class ExprParser extends antlr.Parser {
    public static readonly RULE_prog = 0;
    public static readonly RULE_expr = 1;

    // prog 규칙에 대응하는 메서드
    public prog(): ProgContext {
        this.state = 4;
        this.expr(0);
        this.state = 5;
        this.match(ExprParser.EOF);
    }

    // expr 규칙에 대응하는 메서드
    public expr(_p?: number): ExprContext {
        // 재귀 하강 파싱 로직
    }
}

// prog 규칙의 컨텍스트 클래스
export class ProgContext extends antlr.ParserRuleContext {
    public expr(): ExprContext { ... }
    public EOF(): antlr.TerminalNode { ... }
}

// expr 규칙의 컨텍스트 클래스
export class ExprContext extends antlr.ParserRuleContext {
    public INT(): antlr.TerminalNode | null { ... }
    public expr(): ExprContext[] { ... }
}
```

#### 실제 사용
```typescript
import { CommonTokenStream } from "antlr4ng";
import { ExprParser } from "./ExprParser.js";

const tokenStream = new CommonTokenStream(lexer);
const parser = new ExprParser(tokenStream);

// 파서가 구문 분석 수행
const tree = parser.prog();  // prog 규칙 실행
```

---

### 3. 리스너 영역 (Listener - 자동 생성)

#### 특징
- **.g4 파일에는 없음!** ANTLR이 자동으로 생성
- 각 파서 규칙마다 enter/exit 메서드 생성

#### 생성 파일: ExprListener.ts
```typescript
export class ExprListener implements ParseTreeListener {
    // prog 규칙 진입 시 호출
    enterProg?: (ctx: ProgContext) => void;

    // prog 규칙 종료 시 호출
    exitProg?: (ctx: ProgContext) => void;

    // expr 규칙 진입 시 호출
    enterExpr?: (ctx: ExprContext) => void;

    // expr 규칙 종료 시 호출
    exitExpr?: (ctx: ExprContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}
```

#### 역할
**파스 트리 순회 (Tree Walking)**

```
파스 트리를 깊이 우선 탐색(DFS)하면서
각 노드 진입/종료 시 콜백 호출
```

#### 실제 사용 예시
```typescript
import { ExprListener } from "./ExprListener.js";
import { ProgContext, ExprContext } from "./ExprParser.js";
import { ParseTreeWalker } from "antlr4ng";

// 커스텀 리스너 작성
class MyCalculatorListener extends ExprListener {
    enterExpr(ctx: ExprContext) {
        console.log("수식 발견:", ctx.getText());
    }

    exitExpr(ctx: ExprContext) {
        console.log("수식 종료:", ctx.getText());
    }

    enterProg(ctx: ProgContext) {
        console.log("프로그램 시작");
    }

    exitProg(ctx: ProgContext) {
        console.log("프로그램 종료");
    }
}

// 파스 트리 순회
const tree = parser.prog();
const listener = new MyCalculatorListener();
ParseTreeWalker.DEFAULT.walk(listener, tree);
```

**출력 예시** (입력: `1+2`):
```
프로그램 시작
수식 발견: 1+2
수식 발견: 1
수식 종료: 1
수식 발견: 2
수식 종료: 2
수식 종료: 1+2
프로그램 종료
```

---

### 전체 파이프라인

```
[입력 문자열]
    "1+2*3"
       ↓
[렉서 영역] ExprLexer.ts
    NEWLINE, INT 규칙 적용
       ↓
    [INT(1), +(+), INT(2), *(×), INT(3), EOF]
       ↓
[파서 영역] ExprParser.ts
    prog, expr 규칙 적용
       ↓
    파스 트리:
         prog
          |
         expr(+)
         /    \
      INT(1)  expr(*)
              /    \
           INT(2) INT(3)
       ↓
[리스너 영역] ExprListener.ts
    트리 순회하며 처리
       ↓
    계산 결과: 7
```

---

### 비교 표

| 구분 | 렉서 | 파서 | 리스너 |
|------|------|------|--------|
| **g4 파일** | `NEWLINE`, `INT` | `prog`, `expr` | (자동 생성) |
| **규칙 이름** | 대문자 시작 | 소문자 시작 | - |
| **입력** | 문자 스트림 | 토큰 스트림 | 파스 트리 |
| **출력** | 토큰 스트림 | 파스 트리 | 처리 결과 |
| **생성 파일** | ExprLexer.ts | ExprParser.ts | ExprListener.ts |
| **주요 클래스** | `ExprLexer` | `ExprParser`, `ProgContext`, `ExprContext` | `ExprListener` |
| **역할** | 토큰화 (어휘 분석) | 구문 분석 | 트리 순회/처리 |

---

### calculator.ts의 두 가지 구현 방법

#### 방법 1: Context 직접 접근 (현재 방식)
```typescript
function evaluateExpr(ctx: ExprContext): number {
    // 파서 영역에서 생성된 ExprContext 직접 사용
    if (ctx.INT()) {
        return parseInt(ctx.INT()!.getText());
    }

    // Context의 자식 노드 직접 접근
    const left = ctx.expr(0);
    const operator = ctx.getChild(1)!.getText();
    const right = ctx.expr(1);
    // ...
}
```

#### 방법 2: Listener 사용
```typescript
class CalculatorListener extends ExprListener {
    private stack: number[] = [];

    exitExpr(ctx: ExprContext) {
        if (ctx.INT()) {
            this.stack.push(parseInt(ctx.INT()!.getText()));
        } else if (ctx.getChildCount() === 3) {
            const right = this.stack.pop()!;
            const left = this.stack.pop()!;
            const operator = ctx.getChild(1)!.getText();

            let result = 0;
            switch (operator) {
                case '*': result = left * right; break;
                case '/': result = left / right; break;
                case '+': result = left + right; break;
                case '-': result = left - right; break;
            }
            this.stack.push(result);
        }
    }

    getResult(): number {
        return this.stack[0];
    }
}

// 사용
const tree = parser.prog();
const listener = new CalculatorListener();
ParseTreeWalker.DEFAULT.walk(listener, tree);
const result = listener.getResult();
```

## 파일 목록

### 소스 파일
| 파일명 | 타입 | 설명 |
|--------|------|------|
| Expr.g4 | 문법 파일 | ANTLR 문법 정의 (원본) |
| ExprLexer.ts | 자동 생성 | 렉서 클래스 |
| ExprParser.ts | 자동 생성 | 파서 클래스 |
| ExprListener.ts | 자동 생성 | 리스너 인터페이스 |
| example.ts | 예제 | 기본 파싱 예제 |
| calculator.ts | 예제 | 계산기 구현 예제 |

### 중간 파일
| 파일명 | 설명 |
|--------|------|
| Expr.interp | 파서 인터프리터 데이터 |
| Expr.tokens | 파서 토큰 목록 |
| ExprLexer.interp | 렉서 인터프리터 데이터 |
| ExprLexer.tokens | 렉서 토큰 목록 |

## ANTLR 활용 분야

### 1. 프로그래밍 언어 파싱
- Python, Java, SQL 등의 코드 분석
- 코드 포맷터, 린터 개발

### 2. 도메인 특화 언어(DSL) 생성
- 설정 파일 파서
- 쿼리 언어 구현

### 3. 데이터 변환
- JSON, XML 등의 형식 변환
- 템플릿 엔진

### 4. 컴파일러/인터프리터 개발
- 수식 계산기 (이 프로젝트)
- 간단한 스크립트 언어 구현

### 5. 코드 분석 도구
- 정적 분석
- 코드 메트릭 계산

## 참고 자료
- [ANTLR 공식 문서](https://www.antlr.org/)
- [antlr4ng GitHub](https://github.com/mike-lischke/antlr4ng)
- [antlr-ng NPM](https://www.npmjs.com/package/antlr-ng)
