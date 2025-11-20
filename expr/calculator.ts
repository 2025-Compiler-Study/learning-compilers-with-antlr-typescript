import { CharStream, CommonTokenStream } from "antlr4ng";
import { ExprLexer } from "./ExprLexer.js";
import { ExprParser, ExprContext } from "./ExprParser.js";

// 수식을 재귀적으로 계산하는 함수
function evaluateExpr(ctx: ExprContext): number {
    // 단순 숫자인 경우
    if (ctx.INT()) {
        return parseInt(ctx.INT()!.getText());
    }

    // 괄호로 감싼 경우 (expr)
    const text = ctx.getText();
    if (text.startsWith('(') && text.endsWith(')')) {
        // expr() 메서드로 자식 expr을 가져옴
        const innerExpr = ctx.expr(0);
        if (innerExpr) return evaluateExpr(innerExpr);
    }

    // 이항 연산자가 있는 경우
    const childCount = ctx.getChildCount();
    if (childCount === 3) {
        const left = ctx.expr(0);
        const operator = ctx.getChild(1)!.getText();
        const right = ctx.expr(1);

        if (!left || !right) throw new Error("Invalid expression");

        const leftValue = evaluateExpr(left);
        const rightValue = evaluateExpr(right);

        switch (operator) {
            case '*': return leftValue * rightValue;
            case '/': return leftValue / rightValue;
            case '+': return leftValue + rightValue;
            case '-': return leftValue - rightValue;
            default: throw new Error(`Unknown operator: ${operator}`);
        }
    }

    throw new Error(`Cannot evaluate: ${text}`);
}

// 수식을 계산하는 함수
function calculate(input: string): number {
    const inputStream = CharStream.fromString(input);
    const lexer = new ExprLexer(inputStream);
    const tokenStream = new CommonTokenStream(lexer);
    const parser = new ExprParser(tokenStream);
    const tree = parser.prog();

    // prog는 expr EOF로 구성되므로 첫 번째 자식이 expr
    const exprContext = tree.expr();
    return evaluateExpr(exprContext);
}

// 테스트
console.log("=== ANTLR 계산기 ===\n");

const testCases = [
    { expr: "123", expected: 123 },
    { expr: "1+2", expected: 3 },
    { expr: "3*4", expected: 12 },
    { expr: "10+20*30", expected: 610 },
    { expr: "(5+6)*7", expected: 77 },
    { expr: "100/10+5", expected: 15 },
];

testCases.forEach(({ expr, expected }) => {
    try {
        const result = calculate(expr);
        const status = result === expected ? "✓" : "✗";
        console.log(`${status} ${expr} = ${result} (기댓값: ${expected})`);
    } catch (error) {
        console.log(`✗ ${expr} - 에러: ${error}`);
    }
});

console.log("\n=== ANTLR의 활용 ===");
console.log(`
ANTLR로 생성된 파서를 사용하면:

1. 프로그래밍 언어 파싱
   - Python, Java, SQL 등의 코드를 분석
   - 코드 포맷터, 린터 개발

2. 도메인 특화 언어(DSL) 생성
   - 설정 파일 파서
   - 쿼리 언어 구현

3. 데이터 변환
   - JSON, XML 등의 형식 변환
   - 템플릿 엔진

4. 컴파일러/인터프리터 개발
   - 위 예제처럼 수식 계산기
   - 간단한 스크립트 언어 구현

5. 코드 분석 도구
   - 정적 분석
   - 코드 메트릭 계산
`);
