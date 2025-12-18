import { CharStream, CommonTokenStream, ParseTreeWalker } from "antlr4ng";
import { CalcPlusLexer } from "../generated/CalcPlusLexer";
import { Calc1Context, CalcPlusParser } from "../generated/CalcPlusParser";
import { Calc1Visitor } from "./calc1_v";
import { Calc1Listener } from "./calc1_l";
import { LinterListener } from "./linter_l";
import { LinterError } from "./LinterError";

export const createParserTree = (input: string): Calc1Context => {
  const charStream = CharStream.fromString(input);
  const lexer = new CalcPlusLexer(charStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new CalcPlusParser(tokenStream);

  return parser.calc1();
};

export const calculateWithVisitor = (input: string): Map<string, number> => {
  const calculator = new Calc1Visitor();
  const tree = createParserTree(input);

  calculator.visit(tree);

  return calculator.getVariables();
};

export const calculateWithListener = (input: string): Map<string, number> => {
  const calculator = new Calc1Listener();
  const tree = createParserTree(input);

  ParseTreeWalker.DEFAULT.walk(calculator, tree);

  return calculator.getVariables();
};

export const linterWithListener = (input: string): LinterError[] => {
  const charStream = CharStream.fromString(input);
  const lexer = new CalcPlusLexer(charStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new CalcPlusParser(tokenStream);
  const tree = parser.calc1();

  const linter = new LinterListener();

  ParseTreeWalker.DEFAULT.walk(linter, tree);

  return linter.getLinterErrors();
};
