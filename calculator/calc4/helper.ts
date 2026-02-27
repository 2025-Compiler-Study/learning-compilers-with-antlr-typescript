import { CharStream, CommonTokenStream } from "antlr4ng";
import { Calc3Context, CalcPlusParser } from "../generated/CalcPlusParser";
import { CalcPlusLexer } from "../generated/CalcPlusLexer";
import { Calc4Visitor } from "./calc4";
import { Readable, Writable } from "stream";

const createParserTree = (input: string): Calc3Context => {
  const charStream = CharStream.fromString(input);
  const lexer = new CalcPlusLexer(charStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new CalcPlusParser(tokenStream);

  return parser.calc4();
};

export const calculateWithVisitor = (
  input: string,
  reader: Readable = process.stdin,
  writer: Writable = process.stdout,
) => {
  const calculator = new Calc4Visitor(reader, writer);
  const tree = createParserTree(input);

  calculator.visit(tree);
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
