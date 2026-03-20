
import { AbstractParseTreeVisitor } from "antlr4ng";


import { ProgramContext } from "./Calc5Parser.js";
import { DeclareContext } from "./Calc5Parser.js";
import { ExprAssignContext } from "./Calc5Parser.js";
import { ReadAssignContext } from "./Calc5Parser.js";
import { WriteContext } from "./Calc5Parser.js";
import { IfElseContext } from "./Calc5Parser.js";
import { StmtBlockContext } from "./Calc5Parser.js";
import { IntContext } from "./Calc5Parser.js";
import { VarContext } from "./Calc5Parser.js";
import { ParensContext } from "./Calc5Parser.js";
import { MulDivContext } from "./Calc5Parser.js";
import { AddSubContext } from "./Calc5Parser.js";
import { CondContext } from "./Calc5Parser.js";
import { BlockContext } from "./Calc5Parser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `Calc5Parser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class Calc5Visitor<Result> extends AbstractParseTreeVisitor<Result> {
    /**
     * Visit a parse tree produced by `Calc5Parser.program`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProgram?: (ctx: ProgramContext) => Result;
    /**
     * Visit a parse tree produced by the `Declare`
     * labeled alternative in `Calc5Parser.stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDeclare?: (ctx: DeclareContext) => Result;
    /**
     * Visit a parse tree produced by the `ExprAssign`
     * labeled alternative in `Calc5Parser.stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExprAssign?: (ctx: ExprAssignContext) => Result;
    /**
     * Visit a parse tree produced by the `ReadAssign`
     * labeled alternative in `Calc5Parser.stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitReadAssign?: (ctx: ReadAssignContext) => Result;
    /**
     * Visit a parse tree produced by the `Write`
     * labeled alternative in `Calc5Parser.stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitWrite?: (ctx: WriteContext) => Result;
    /**
     * Visit a parse tree produced by the `IfElse`
     * labeled alternative in `Calc5Parser.stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIfElse?: (ctx: IfElseContext) => Result;
    /**
     * Visit a parse tree produced by the `StmtBlock`
     * labeled alternative in `Calc5Parser.stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStmtBlock?: (ctx: StmtBlockContext) => Result;
    /**
     * Visit a parse tree produced by the `Int`
     * labeled alternative in `Calc5Parser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInt?: (ctx: IntContext) => Result;
    /**
     * Visit a parse tree produced by the `Var`
     * labeled alternative in `Calc5Parser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVar?: (ctx: VarContext) => Result;
    /**
     * Visit a parse tree produced by the `Parens`
     * labeled alternative in `Calc5Parser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParens?: (ctx: ParensContext) => Result;
    /**
     * Visit a parse tree produced by the `MulDiv`
     * labeled alternative in `Calc5Parser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMulDiv?: (ctx: MulDivContext) => Result;
    /**
     * Visit a parse tree produced by the `AddSub`
     * labeled alternative in `Calc5Parser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAddSub?: (ctx: AddSubContext) => Result;
    /**
     * Visit a parse tree produced by `Calc5Parser.cond`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCond?: (ctx: CondContext) => Result;
    /**
     * Visit a parse tree produced by `Calc5Parser.block`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBlock?: (ctx: BlockContext) => Result;
}

