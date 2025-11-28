import { CharStream, CommonTokenStream, Token, ATNSimulator, Recognizer, RecognitionException } from "antlr4ng";
import type { ANTLRErrorListener } from "antlr4ng";
import { MiniCLexer } from "./MiniCLexer.js";

// 커스텀 에러 리스너: 에러 메시지를 수집
class LexerErrorListener implements ANTLRErrorListener {
  errors: string[] = [];

  syntaxError<S extends Token, T extends ATNSimulator>(
    _recognizer: Recognizer<T>,
    _offendingSymbol: S | null,
    line: number,
    charPositionInLine: number,
    msg: string,
    _e: RecognitionException | null
  ): void {
    this.errors.push(`line ${line}:${charPositionInLine} ${msg}`);
  }

  reportAmbiguity(): void {
    // Lexer에서는 사용되지 않음
  }

  reportAttemptingFullContext(): void {
    // Lexer에서는 사용되지 않음
  }

  reportContextSensitivity(): void {
    // Lexer에서는 사용되지 않음
  }
}

// Strict 모드 에러 리스너: 에러 발생 시 즉시 throw
class StrictLexerErrorListener implements ANTLRErrorListener {
  syntaxError<S extends Token, T extends ATNSimulator>(
    _recognizer: Recognizer<T>,
    _offendingSymbol: S | null,
    line: number,
    charPositionInLine: number,
    msg: string,
    _e: RecognitionException | null
  ): void {
    throw new Error(`line ${line}:${charPositionInLine} ${msg}`);
  }

  reportAmbiguity(): void {
    // Lexer에서는 사용되지 않음
  }

  reportAttemptingFullContext(): void {
    // Lexer에서는 사용되지 않음
  }

  reportContextSensitivity(): void {
    // Lexer에서는 사용되지 않음
  }
}

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

// 에러 메시지를 수집하는 함수
export function getLexerErrors(input: string): string[] {
  const lexer = new MiniCLexer(CharStream.fromString(input));
  const errorListener = new LexerErrorListener();

  // 기본 에러 리스너 제거하고 커스텀 에러 리스너 추가
  lexer.removeErrorListeners();
  lexer.addErrorListener(errorListener);

  const tokens = new CommonTokenStream(lexer);
  tokens.fill();

  return errorListener.errors;
}

// 토큰과 에러를 함께 반환하는 함수
export function tokenizeWithErrors(input: string) {
  const lexer = new MiniCLexer(CharStream.fromString(input));
  const errorListener = new LexerErrorListener();

  lexer.removeErrorListeners();
  lexer.addErrorListener(errorListener);

  const tokens = new CommonTokenStream(lexer);
  tokens.fill();

  const validTokens = tokens.getTokens().filter((t) => t.type !== MiniCLexer.EOF);
  const tokenNames = validTokens.map((t) => MiniCLexer.symbolicNames[t.type]);

  return {
    tokens: validTokens,
    tokenNames,
    errors: errorListener.errors,
  };
}

// Strict 모드: 에러 발생 시 즉시 throw하여 토큰화 중단
export function tokenizeStrict(input: string) {
  const lexer = new MiniCLexer(CharStream.fromString(input));
  const strictListener = new StrictLexerErrorListener();

  lexer.removeErrorListeners();
  lexer.addErrorListener(strictListener);

  const tokens = new CommonTokenStream(lexer);
  tokens.fill();

  return tokens.getTokens().filter((t) => t.type !== MiniCLexer.EOF);
}

// Strict 모드로 토큰 이름 반환
export function getTokenNamesStrict(input: string) {
  return tokenizeStrict(input).map((t) => MiniCLexer.symbolicNames[t.type]);
}
