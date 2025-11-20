import { CharStream, CommonTokenStream } from "antlr4ng";
import { ExprLexer } from "./ExprLexer.js";
import { ExprParser } from "./ExprParser.js";

// 수식 문자열을 파싱하는 함수
function parseExpression(input: string) {
  // 1. 입력 문자열을 CharStream으로 변환
  const inputStream = CharStream.fromString(input);

  // 2. Lexer로 토큰화 (문자열을 토큰으로 분리)
  const lexer = new ExprLexer(inputStream);
  console.log({ lexer });
  const tokenStream = new CommonTokenStream(lexer);

  // 3. Parser로 구문 분석
  const parser = new ExprParser(tokenStream);

  // 4. 파싱 시작 (prog는 문법의 시작 규칙)
  const tree = parser.prog();

  return { tree, parser };
}

// 예제 사용
console.log("=== ANTLR로 수식 파싱하기 ===\n");

// 간단한 수식들
const expressions = ["123", "1+2", "3*4", "(5+6)*7", "10+20*30"];

expressions.forEach((expr) => {
  console.log(`입력: ${expr}`);
  try {
    const { tree, parser } = parseExpression(expr);
    console.log(`✓ 파싱 성공!`);
    console.log(`파싱 트리: ${tree.toStringTree(parser)}\n`);
  } catch (error) {
    console.log(`✗ 파싱 실패: ${error}\n`);
  }
});
