
import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { Calc0Context } from "./CalcPlusParser.js";
import { IntContext } from "./CalcPlusParser.js";
import { VarContext } from "./CalcPlusParser.js";
import { ParensContext } from "./CalcPlusParser.js";
import { MulDivContext } from "./CalcPlusParser.js";
import { AddSubContext } from "./CalcPlusParser.js";
import { Calc1Context } from "./CalcPlusParser.js";
import { ExprAssignContext } from "./CalcPlusParser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `CalcPlusParser`.
 */
export class CalcPlusListener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `CalcPlusParser.calc0`.
     * @param ctx the parse tree
     */
    enterCalc0?: (ctx: Calc0Context) => void;
    /**
     * Exit a parse tree produced by `CalcPlusParser.calc0`.
     * @param ctx the parse tree
     */
    exitCalc0?: (ctx: Calc0Context) => void;
    /**
     * Enter a parse tree produced by the `Int`
     * labeled alternative in `CalcPlusParser.expr`.
     * @param ctx the parse tree
     */
    enterInt?: (ctx: IntContext) => void;
    /**
     * Exit a parse tree produced by the `Int`
     * labeled alternative in `CalcPlusParser.expr`.
     * @param ctx the parse tree
     */
    exitInt?: (ctx: IntContext) => void;
    /**
     * Enter a parse tree produced by the `Var`
     * labeled alternative in `CalcPlusParser.expr`.
     * @param ctx the parse tree
     */
    enterVar?: (ctx: VarContext) => void;
    /**
     * Exit a parse tree produced by the `Var`
     * labeled alternative in `CalcPlusParser.expr`.
     * @param ctx the parse tree
     */
    exitVar?: (ctx: VarContext) => void;
    /**
     * Enter a parse tree produced by the `Parens`
     * labeled alternative in `CalcPlusParser.expr`.
     * @param ctx the parse tree
     */
    enterParens?: (ctx: ParensContext) => void;
    /**
     * Exit a parse tree produced by the `Parens`
     * labeled alternative in `CalcPlusParser.expr`.
     * @param ctx the parse tree
     */
    exitParens?: (ctx: ParensContext) => void;
    /**
     * Enter a parse tree produced by the `MulDiv`
     * labeled alternative in `CalcPlusParser.expr`.
     * @param ctx the parse tree
     */
    enterMulDiv?: (ctx: MulDivContext) => void;
    /**
     * Exit a parse tree produced by the `MulDiv`
     * labeled alternative in `CalcPlusParser.expr`.
     * @param ctx the parse tree
     */
    exitMulDiv?: (ctx: MulDivContext) => void;
    /**
     * Enter a parse tree produced by the `AddSub`
     * labeled alternative in `CalcPlusParser.expr`.
     * @param ctx the parse tree
     */
    enterAddSub?: (ctx: AddSubContext) => void;
    /**
     * Exit a parse tree produced by the `AddSub`
     * labeled alternative in `CalcPlusParser.expr`.
     * @param ctx the parse tree
     */
    exitAddSub?: (ctx: AddSubContext) => void;
    /**
     * Enter a parse tree produced by `CalcPlusParser.calc1`.
     * @param ctx the parse tree
     */
    enterCalc1?: (ctx: Calc1Context) => void;
    /**
     * Exit a parse tree produced by `CalcPlusParser.calc1`.
     * @param ctx the parse tree
     */
    exitCalc1?: (ctx: Calc1Context) => void;
    /**
     * Enter a parse tree produced by the `ExprAssign`
     * labeled alternative in `CalcPlusParser.stmt`.
     * @param ctx the parse tree
     */
    enterExprAssign?: (ctx: ExprAssignContext) => void;
    /**
     * Exit a parse tree produced by the `ExprAssign`
     * labeled alternative in `CalcPlusParser.stmt`.
     * @param ctx the parse tree
     */
    exitExprAssign?: (ctx: ExprAssignContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

