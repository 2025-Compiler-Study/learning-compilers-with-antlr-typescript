import { CharStream, CommonTokenStream } from "antlr4ng";
import { MiniCLexer } from "./MiniCLexer.js";

function tokenize(input: string) {
  const lexer = new MiniCLexer(CharStream.fromString(input));
  const tokens = new CommonTokenStream(lexer);
  tokens.fill();
  return tokens.getTokens().filter((t) => t.type !== MiniCLexer.EOF);
}

export function getTokenNames(input: string) {
  return tokenize(input).map((t) => MiniCLexer.symbolicNames[t.type]);
}

export function printTokens(input: string) {
  console.log(`\n입력: ${input}`);
  console.log("─".repeat(60));

  const tokens = tokenize(input);
  tokens.forEach((token, index) => {
    const tokenName = MiniCLexer.symbolicNames[token.type];
    const tokenType = token.type;
    const tokenText = token.text;
    console.log(`토큰 ${index + 1}: ${tokenName} (${tokenType}) - "${tokenText}"`);
  });

  console.log("─".repeat(60));
  console.log(`총 ${tokens.length}개의 토큰\n`);

  return tokens;
}
