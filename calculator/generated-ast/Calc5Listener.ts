
import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


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
 * This interface defines a complete listener for a parse tree produced by
 * `Calc5Parser`.
 */
export class Calc5Listener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `Calc5Parser.program`.
     * @param ctx the parse tree
     */
    enterProgram?: (ctx: ProgramContext) => void;
    /**
     * Exit a parse tree produced by `Calc5Parser.program`.
     * @param ctx the parse tree
     */
    exitProgram?: (ctx: ProgramContext) => void;
    /**
     * Enter a parse tree produced by the `Declare`
     * labeled alternative in `Calc5Parser.stmt`.
     * @param ctx the parse tree
     */
    enterDeclare?: (ctx: DeclareContext) => void;
    /**
     * Exit a parse tree produced by the `Declare`
     * labeled alternative in `Calc5Parser.stmt`.
     * @param ctx the parse tree
     */
    exitDeclare?: (ctx: DeclareContext) => void;
    /**
     * Enter a parse tree produced by the `ExprAssign`
     * labeled alternative in `Calc5Parser.stmt`.
     * @param ctx the parse tree
     */
    enterExprAssign?: (ctx: ExprAssignContext) => void;
    /**
     * Exit a parse tree produced by the `ExprAssign`
     * labeled alternative in `Calc5Parser.stmt`.
     * @param ctx the parse tree
     */
    exitExprAssign?: (ctx: ExprAssignContext) => void;
    /**
     * Enter a parse tree produced by the `ReadAssign`
     * labeled alternative in `Calc5Parser.stmt`.
     * @param ctx the parse tree
     */
    enterReadAssign?: (ctx: ReadAssignContext) => void;
    /**
     * Exit a parse tree produced by the `ReadAssign`
     * labeled alternative in `Calc5Parser.stmt`.
     * @param ctx the parse tree
     */
    exitReadAssign?: (ctx: ReadAssignContext) => void;
    /**
     * Enter a parse tree produced by the `Write`
     * labeled alternative in `Calc5Parser.stmt`.
     * @param ctx the parse tree
     */
    enterWrite?: (ctx: WriteContext) => void;
    /**
     * Exit a parse tree produced by the `Write`
     * labeled alternative in `Calc5Parser.stmt`.
     * @param ctx the parse tree
     */
    exitWrite?: (ctx: WriteContext) => void;
    /**
     * Enter a parse tree produced by the `IfElse`
     * labeled alternative in `Calc5Parser.stmt`.
     * @param ctx the parse tree
     */
    enterIfElse?: (ctx: IfElseContext) => void;
    /**
     * Exit a parse tree produced by the `IfElse`
     * labeled alternative in `Calc5Parser.stmt`.
     * @param ctx the parse tree
     */
    exitIfElse?: (ctx: IfElseContext) => void;
    /**
     * Enter a parse tree produced by the `StmtBlock`
     * labeled alternative in `Calc5Parser.stmt`.
     * @param ctx the parse tree
     */
    enterStmtBlock?: (ctx: StmtBlockContext) => void;
    /**
     * Exit a parse tree produced by the `StmtBlock`
     * labeled alternative in `Calc5Parser.stmt`.
     * @param ctx the parse tree
     */
    exitStmtBlock?: (ctx: StmtBlockContext) => void;
    /**
     * Enter a parse tree produced by the `Int`
     * labeled alternative in `Calc5Parser.expr`.
     * @param ctx the parse tree
     */
    enterInt?: (ctx: IntContext) => void;
    /**
     * Exit a parse tree produced by the `Int`
     * labeled alternative in `Calc5Parser.expr`.
     * @param ctx the parse tree
     */
    exitInt?: (ctx: IntContext) => void;
    /**
     * Enter a parse tree produced by the `Var`
     * labeled alternative in `Calc5Parser.expr`.
     * @param ctx the parse tree
     */
    enterVar?: (ctx: VarContext) => void;
    /**
     * Exit a parse tree produced by the `Var`
     * labeled alternative in `Calc5Parser.expr`.
     * @param ctx the parse tree
     */
    exitVar?: (ctx: VarContext) => void;
    /**
     * Enter a parse tree produced by the `Parens`
     * labeled alternative in `Calc5Parser.expr`.
     * @param ctx the parse tree
     */
    enterParens?: (ctx: ParensContext) => void;
    /**
     * Exit a parse tree produced by the `Parens`
     * labeled alternative in `Calc5Parser.expr`.
     * @param ctx the parse tree
     */
    exitParens?: (ctx: ParensContext) => void;
    /**
     * Enter a parse tree produced by the `MulDiv`
     * labeled alternative in `Calc5Parser.expr`.
     * @param ctx the parse tree
     */
    enterMulDiv?: (ctx: MulDivContext) => void;
    /**
     * Exit a parse tree produced by the `MulDiv`
     * labeled alternative in `Calc5Parser.expr`.
     * @param ctx the parse tree
     */
    exitMulDiv?: (ctx: MulDivContext) => void;
    /**
     * Enter a parse tree produced by the `AddSub`
     * labeled alternative in `Calc5Parser.expr`.
     * @param ctx the parse tree
     */
    enterAddSub?: (ctx: AddSubContext) => void;
    /**
     * Exit a parse tree produced by the `AddSub`
     * labeled alternative in `Calc5Parser.expr`.
     * @param ctx the parse tree
     */
    exitAddSub?: (ctx: AddSubContext) => void;
    /**
     * Enter a parse tree produced by `Calc5Parser.cond`.
     * @param ctx the parse tree
     */
    enterCond?: (ctx: CondContext) => void;
    /**
     * Exit a parse tree produced by `Calc5Parser.cond`.
     * @param ctx the parse tree
     */
    exitCond?: (ctx: CondContext) => void;
    /**
     * Enter a parse tree produced by `Calc5Parser.block`.
     * @param ctx the parse tree
     */
    enterBlock?: (ctx: BlockContext) => void;
    /**
     * Exit a parse tree produced by `Calc5Parser.block`.
     * @param ctx the parse tree
     */
    exitBlock?: (ctx: BlockContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

