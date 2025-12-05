import { CharStream, CommonTokenStream, ParseTreeWalker } from "antlr4ng";
import { CalcPlusLexer } from "../generated/CalcPlusLexer";
import { Calc0Context, CalcPlusParser } from "../generated/CalcPlusParser";
import { CalculatorL } from "./calc0_l";
import { CalculatorV } from "./calc0_v";

export const createParserTree = (input: string): Calc0Context => {
  const charStream = CharStream.fromString(input);
  const lexer = new CalcPlusLexer(charStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new CalcPlusParser(tokenStream);

  return parser.calc0();
};

export const calculateWithListener = (input: string): number | undefined => {
  const calculator = new CalculatorL();
  const tree = createParserTree(input);
  ParseTreeWalker.DEFAULT.walk(calculator, tree);

  return calculator.result();
};

export const calculateWithVisitor = (input: string): number | null => {
  const calculator = new CalculatorV();
  const tree = createParserTree(input);

  return calculator.visit(tree);
};
