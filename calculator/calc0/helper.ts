import { CharStream, CommonTokenStream, ParseTreeWalker } from "antlr4ng";
import { CalcPlusLexer } from "../generated/CalcPlusLexer";
import { Calc0Context, CalcPlusParser } from "../generated/CalcPlusParser";
import { CalculatorL } from "./calc0_l";
import { CalculatorV } from "./calc0_v";
import { PostFixListener } from "./postfix_l";
import { PostFixVisitor } from "./postfix_v";
import { PreFixListener } from "./prefix_l";

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

export const convertToPostFixWithListener = (input: string): string => {
  const converter = new PostFixListener();
  const tree = createParserTree(input);
  ParseTreeWalker.DEFAULT.walk(converter, tree);

  return converter.getPostFix();
};

export const convertToPostFixWithVisitor = (input: string): string => {
  const converter = new PostFixVisitor();
  const tree = createParserTree(input);

  return converter.getPostFix(tree.expr());
};

export const convertToPreFixWithListener = (input: string): string => {
  const converter = new PreFixListener();
  const tree = createParserTree(input);
  ParseTreeWalker.DEFAULT.walk(converter, tree);

  return converter.getPreFix();
};
