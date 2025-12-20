
import { AbstractParseTreeVisitor } from "antlr4ng";


import { Calc0Context } from "./CalcPlusParser.js";
import { IntContext } from "./CalcPlusParser.js";
import { VarContext } from "./CalcPlusParser.js";
import { ParensContext } from "./CalcPlusParser.js";
import { MulDivContext } from "./CalcPlusParser.js";
import { AddSubContext } from "./CalcPlusParser.js";
import { Calc1Context } from "./CalcPlusParser.js";
import { ExprAssignContext } from "./CalcPlusParser.js";
import { IfElseContext } from "./CalcPlusParser.js";
import { Calc2Context } from "./CalcPlusParser.js";
import { CondContext } from "./CalcPlusParser.js";
import { BlockContext } from "./CalcPlusParser.js";


/**
 * This interface defines a complete generic visitor for a parse tree produced
 * by `CalcPlusParser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class CalcPlusVisitor<Result> extends AbstractParseTreeVisitor<Result> {
    /**
     * Visit a parse tree produced by `CalcPlusParser.calc0`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCalc0?: (ctx: Calc0Context) => Result;
    /**
     * Visit a parse tree produced by the `Int`
     * labeled alternative in `CalcPlusParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInt?: (ctx: IntContext) => Result;
    /**
     * Visit a parse tree produced by the `Var`
     * labeled alternative in `CalcPlusParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVar?: (ctx: VarContext) => Result;
    /**
     * Visit a parse tree produced by the `Parens`
     * labeled alternative in `CalcPlusParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParens?: (ctx: ParensContext) => Result;
    /**
     * Visit a parse tree produced by the `MulDiv`
     * labeled alternative in `CalcPlusParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMulDiv?: (ctx: MulDivContext) => Result;
    /**
     * Visit a parse tree produced by the `AddSub`
     * labeled alternative in `CalcPlusParser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAddSub?: (ctx: AddSubContext) => Result;
    /**
     * Visit a parse tree produced by `CalcPlusParser.calc1`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCalc1?: (ctx: Calc1Context) => Result;
    /**
     * Visit a parse tree produced by the `ExprAssign`
     * labeled alternative in `CalcPlusParser.stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExprAssign?: (ctx: ExprAssignContext) => Result;
    /**
     * Visit a parse tree produced by the `IfElse`
     * labeled alternative in `CalcPlusParser.stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIfElse?: (ctx: IfElseContext) => Result;
    /**
     * Visit a parse tree produced by `CalcPlusParser.calc2`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCalc2?: (ctx: Calc2Context) => Result;
    /**
     * Visit a parse tree produced by `CalcPlusParser.cond`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCond?: (ctx: CondContext) => Result;
    /**
     * Visit a parse tree produced by `CalcPlusParser.block`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBlock?: (ctx: BlockContext) => Result;
}

