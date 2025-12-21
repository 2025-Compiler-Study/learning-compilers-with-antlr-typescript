import { CharStream, CommonTokenStream } from "antlr4ng";
import { Calc2Context, CalcPlusParser } from "../generated/CalcPlusParser";
import { Calc2Visitor } from "./calc2";
import { CalcPlusLexer } from "../generated/CalcPlusLexer";

const createParserTree = (input: string): Calc2Context => {
  const charStream = CharStream.fromString(input);
  const lexer = new CalcPlusLexer(charStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new CalcPlusParser(tokenStream);

  return parser.calc2();
};

export const calculateWithVisitor = (input: string): Map<string, number> => {
  const calculator = new Calc2Visitor();
  const tree = createParserTree(input);

  calculator.visit(tree);

  return calculator.getVariables();
};

export type ComparisonOperator = "==" | "!=" | ">" | ">=" | "<" | "<=";

export const compare = (a: number, b: number, operator: ComparisonOperator): boolean => {
  switch (operator) {
    case ">":
      return a > b;
    case "<":
      return a < b;
    case ">=":
      return a >= b;
    case "<=":
      return a <= b;
    case "==":
      return a == b;
    case "!=":
      return a != b;
    default:
      throw new Error(`지원하지 않는 연산자입니다: ${operator}`);
  }
};
