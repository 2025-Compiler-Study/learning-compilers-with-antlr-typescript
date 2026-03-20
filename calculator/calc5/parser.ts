import { CharStream, CommonTokenStream } from "antlr4ng";
import { Calc5Lexer } from "../generated-ast/Calc5Lexer";
import { Calc5Parser } from "../generated-ast/Calc5Parser";
import { AstBuilder } from "./ast-builder";
import { Program } from "./ast";

const createParseTree = (input: string) => {
  const charStream = CharStream.fromString(input);
  const lexer = new Calc5Lexer(charStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new Calc5Parser(tokenStream);
  return parser.program();
};

export const buildAst = (input: string): Program => {
  const tree = createParseTree(input);
  const builder = new AstBuilder();
  return builder.visit(tree) as Program;
};
