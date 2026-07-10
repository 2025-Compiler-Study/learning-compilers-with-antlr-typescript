import { CharStream, CommonTokenStream } from "antlr4ng";
import { Calc6Lexer } from "../generated-calc6/Calc6Lexer";
import { Calc6Parser } from "../generated-calc6/Calc6Parser";
import { AstBuilder } from "./ast-builder";
import { Program } from "./ast";
import { SemanticError } from "./errors/semantic-error";

export type BuildAstResult = {
  program: Program;
  errors: SemanticError[];
};

const createParseTree = (input: string) => {
  const charStream = CharStream.fromString(input);
  const lexer = new Calc6Lexer(charStream);
  const tokenStream = new CommonTokenStream(lexer);
  const parser = new Calc6Parser(tokenStream);
  return parser.program();
};

export const buildAst = (input: string): BuildAstResult => {
  const tree = createParseTree(input);
  const builder = new AstBuilder();
  const program = builder.visit(tree) as Program;
  return { program, errors: builder.getErrors() };
};
