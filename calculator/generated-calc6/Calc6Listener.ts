
import { ErrorNode, ParseTreeListener, ParserRuleContext, TerminalNode } from "antlr4ng";


import { ProgramContext } from "./Calc6Parser.js";
import { FuncDefContext } from "./Calc6Parser.js";
import { DeclareContext } from "./Calc6Parser.js";
import { ExprAssignContext } from "./Calc6Parser.js";
import { ExprStmtContext } from "./Calc6Parser.js";
import { IfElseContext } from "./Calc6Parser.js";
import { StmtBlockContext } from "./Calc6Parser.js";
import { ReturnContext } from "./Calc6Parser.js";
import { IntContext } from "./Calc6Parser.js";
import { VarContext } from "./Calc6Parser.js";
import { ParensContext } from "./Calc6Parser.js";
import { FuncCallContext } from "./Calc6Parser.js";
import { MulDivContext } from "./Calc6Parser.js";
import { AddSubContext } from "./Calc6Parser.js";
import { ParamListContext } from "./Calc6Parser.js";
import { ArgListContext } from "./Calc6Parser.js";
import { CondContext } from "./Calc6Parser.js";
import { BlockContext } from "./Calc6Parser.js";


/**
 * This interface defines a complete listener for a parse tree produced by
 * `Calc6Parser`.
 */
export class Calc6Listener implements ParseTreeListener {
    /**
     * Enter a parse tree produced by `Calc6Parser.program`.
     * @param ctx the parse tree
     */
    enterProgram?: (ctx: ProgramContext) => void;
    /**
     * Exit a parse tree produced by `Calc6Parser.program`.
     * @param ctx the parse tree
     */
    exitProgram?: (ctx: ProgramContext) => void;
    /**
     * Enter a parse tree produced by `Calc6Parser.funcDef`.
     * @param ctx the parse tree
     */
    enterFuncDef?: (ctx: FuncDefContext) => void;
    /**
     * Exit a parse tree produced by `Calc6Parser.funcDef`.
     * @param ctx the parse tree
     */
    exitFuncDef?: (ctx: FuncDefContext) => void;
    /**
     * Enter a parse tree produced by the `Declare`
     * labeled alternative in `Calc6Parser.stmt`.
     * @param ctx the parse tree
     */
    enterDeclare?: (ctx: DeclareContext) => void;
    /**
     * Exit a parse tree produced by the `Declare`
     * labeled alternative in `Calc6Parser.stmt`.
     * @param ctx the parse tree
     */
    exitDeclare?: (ctx: DeclareContext) => void;
    /**
     * Enter a parse tree produced by the `ExprAssign`
     * labeled alternative in `Calc6Parser.stmt`.
     * @param ctx the parse tree
     */
    enterExprAssign?: (ctx: ExprAssignContext) => void;
    /**
     * Exit a parse tree produced by the `ExprAssign`
     * labeled alternative in `Calc6Parser.stmt`.
     * @param ctx the parse tree
     */
    exitExprAssign?: (ctx: ExprAssignContext) => void;
    /**
     * Enter a parse tree produced by the `ExprStmt`
     * labeled alternative in `Calc6Parser.stmt`.
     * @param ctx the parse tree
     */
    enterExprStmt?: (ctx: ExprStmtContext) => void;
    /**
     * Exit a parse tree produced by the `ExprStmt`
     * labeled alternative in `Calc6Parser.stmt`.
     * @param ctx the parse tree
     */
    exitExprStmt?: (ctx: ExprStmtContext) => void;
    /**
     * Enter a parse tree produced by the `IfElse`
     * labeled alternative in `Calc6Parser.stmt`.
     * @param ctx the parse tree
     */
    enterIfElse?: (ctx: IfElseContext) => void;
    /**
     * Exit a parse tree produced by the `IfElse`
     * labeled alternative in `Calc6Parser.stmt`.
     * @param ctx the parse tree
     */
    exitIfElse?: (ctx: IfElseContext) => void;
    /**
     * Enter a parse tree produced by the `StmtBlock`
     * labeled alternative in `Calc6Parser.stmt`.
     * @param ctx the parse tree
     */
    enterStmtBlock?: (ctx: StmtBlockContext) => void;
    /**
     * Exit a parse tree produced by the `StmtBlock`
     * labeled alternative in `Calc6Parser.stmt`.
     * @param ctx the parse tree
     */
    exitStmtBlock?: (ctx: StmtBlockContext) => void;
    /**
     * Enter a parse tree produced by the `Return`
     * labeled alternative in `Calc6Parser.stmt`.
     * @param ctx the parse tree
     */
    enterReturn?: (ctx: ReturnContext) => void;
    /**
     * Exit a parse tree produced by the `Return`
     * labeled alternative in `Calc6Parser.stmt`.
     * @param ctx the parse tree
     */
    exitReturn?: (ctx: ReturnContext) => void;
    /**
     * Enter a parse tree produced by the `Int`
     * labeled alternative in `Calc6Parser.expr`.
     * @param ctx the parse tree
     */
    enterInt?: (ctx: IntContext) => void;
    /**
     * Exit a parse tree produced by the `Int`
     * labeled alternative in `Calc6Parser.expr`.
     * @param ctx the parse tree
     */
    exitInt?: (ctx: IntContext) => void;
    /**
     * Enter a parse tree produced by the `Var`
     * labeled alternative in `Calc6Parser.expr`.
     * @param ctx the parse tree
     */
    enterVar?: (ctx: VarContext) => void;
    /**
     * Exit a parse tree produced by the `Var`
     * labeled alternative in `Calc6Parser.expr`.
     * @param ctx the parse tree
     */
    exitVar?: (ctx: VarContext) => void;
    /**
     * Enter a parse tree produced by the `Parens`
     * labeled alternative in `Calc6Parser.expr`.
     * @param ctx the parse tree
     */
    enterParens?: (ctx: ParensContext) => void;
    /**
     * Exit a parse tree produced by the `Parens`
     * labeled alternative in `Calc6Parser.expr`.
     * @param ctx the parse tree
     */
    exitParens?: (ctx: ParensContext) => void;
    /**
     * Enter a parse tree produced by the `FuncCall`
     * labeled alternative in `Calc6Parser.expr`.
     * @param ctx the parse tree
     */
    enterFuncCall?: (ctx: FuncCallContext) => void;
    /**
     * Exit a parse tree produced by the `FuncCall`
     * labeled alternative in `Calc6Parser.expr`.
     * @param ctx the parse tree
     */
    exitFuncCall?: (ctx: FuncCallContext) => void;
    /**
     * Enter a parse tree produced by the `MulDiv`
     * labeled alternative in `Calc6Parser.expr`.
     * @param ctx the parse tree
     */
    enterMulDiv?: (ctx: MulDivContext) => void;
    /**
     * Exit a parse tree produced by the `MulDiv`
     * labeled alternative in `Calc6Parser.expr`.
     * @param ctx the parse tree
     */
    exitMulDiv?: (ctx: MulDivContext) => void;
    /**
     * Enter a parse tree produced by the `AddSub`
     * labeled alternative in `Calc6Parser.expr`.
     * @param ctx the parse tree
     */
    enterAddSub?: (ctx: AddSubContext) => void;
    /**
     * Exit a parse tree produced by the `AddSub`
     * labeled alternative in `Calc6Parser.expr`.
     * @param ctx the parse tree
     */
    exitAddSub?: (ctx: AddSubContext) => void;
    /**
     * Enter a parse tree produced by `Calc6Parser.paramList`.
     * @param ctx the parse tree
     */
    enterParamList?: (ctx: ParamListContext) => void;
    /**
     * Exit a parse tree produced by `Calc6Parser.paramList`.
     * @param ctx the parse tree
     */
    exitParamList?: (ctx: ParamListContext) => void;
    /**
     * Enter a parse tree produced by `Calc6Parser.argList`.
     * @param ctx the parse tree
     */
    enterArgList?: (ctx: ArgListContext) => void;
    /**
     * Exit a parse tree produced by `Calc6Parser.argList`.
     * @param ctx the parse tree
     */
    exitArgList?: (ctx: ArgListContext) => void;
    /**
     * Enter a parse tree produced by `Calc6Parser.cond`.
     * @param ctx the parse tree
     */
    enterCond?: (ctx: CondContext) => void;
    /**
     * Exit a parse tree produced by `Calc6Parser.cond`.
     * @param ctx the parse tree
     */
    exitCond?: (ctx: CondContext) => void;
    /**
     * Enter a parse tree produced by `Calc6Parser.block`.
     * @param ctx the parse tree
     */
    enterBlock?: (ctx: BlockContext) => void;
    /**
     * Exit a parse tree produced by `Calc6Parser.block`.
     * @param ctx the parse tree
     */
    exitBlock?: (ctx: BlockContext) => void;

    visitTerminal(node: TerminalNode): void {}
    visitErrorNode(node: ErrorNode): void {}
    enterEveryRule(node: ParserRuleContext): void {}
    exitEveryRule(node: ParserRuleContext): void {}
}

