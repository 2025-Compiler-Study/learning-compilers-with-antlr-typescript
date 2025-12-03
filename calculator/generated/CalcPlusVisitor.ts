
import { AbstractParseTreeVisitor } from "antlr4ng";


import { Calc0Context } from "./CalcPlusParser";
import { IntContext } from "./CalcPlusParser";
import { ParensContext } from "./CalcPlusParser";
import { MulDivContext } from "./CalcPlusParser";
import { AddSubContext } from "./CalcPlusParser";


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
}

