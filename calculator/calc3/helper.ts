import { CharStream, CommonTokenStream } from "antlr4ng";
import { Calc3Context, CalcPlusParser } from "../generated/CalcPlusParser";
import { CalcPlusLexer } from "../generated/CalcPlusLexer";
import { Calc3Visitor } from "./calc3";
import { Readable, Writable } from "stream";

const createParserTree = (input: string): Calc3Context => {
  const charStream = CharStream.fromString(input);
  const lexer = new CalcPlusLexer(charStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new CalcPlusParser(tokenStream);

  return parser.calc3();
};

export const calculateWithVisitor = (
  input: string,
  reader: Readable = process.stdin,
  writer: Writable = process.stdout
): Map<string, number> => {
  const calculator = new Calc3Visitor(reader, writer);
  const tree = createParserTree(input);

  calculator.visit(tree);

  return calculator.getVariables();
};
