
import { AbstractParseTreeVisitor } from "antlr4ng";


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
 * This interface defines a complete generic visitor for a parse tree produced
 * by `Calc6Parser`.
 *
 * @param <Result> The return type of the visit operation. Use `void` for
 * operations with no return type.
 */
export class Calc6Visitor<Result> extends AbstractParseTreeVisitor<Result> {
    /**
     * Visit a parse tree produced by `Calc6Parser.program`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitProgram?: (ctx: ProgramContext) => Result;
    /**
     * Visit a parse tree produced by `Calc6Parser.funcDef`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFuncDef?: (ctx: FuncDefContext) => Result;
    /**
     * Visit a parse tree produced by the `Declare`
     * labeled alternative in `Calc6Parser.stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitDeclare?: (ctx: DeclareContext) => Result;
    /**
     * Visit a parse tree produced by the `ExprAssign`
     * labeled alternative in `Calc6Parser.stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExprAssign?: (ctx: ExprAssignContext) => Result;
    /**
     * Visit a parse tree produced by the `ExprStmt`
     * labeled alternative in `Calc6Parser.stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitExprStmt?: (ctx: ExprStmtContext) => Result;
    /**
     * Visit a parse tree produced by the `IfElse`
     * labeled alternative in `Calc6Parser.stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitIfElse?: (ctx: IfElseContext) => Result;
    /**
     * Visit a parse tree produced by the `StmtBlock`
     * labeled alternative in `Calc6Parser.stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitStmtBlock?: (ctx: StmtBlockContext) => Result;
    /**
     * Visit a parse tree produced by the `Return`
     * labeled alternative in `Calc6Parser.stmt`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitReturn?: (ctx: ReturnContext) => Result;
    /**
     * Visit a parse tree produced by the `Int`
     * labeled alternative in `Calc6Parser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitInt?: (ctx: IntContext) => Result;
    /**
     * Visit a parse tree produced by the `Var`
     * labeled alternative in `Calc6Parser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitVar?: (ctx: VarContext) => Result;
    /**
     * Visit a parse tree produced by the `Parens`
     * labeled alternative in `Calc6Parser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParens?: (ctx: ParensContext) => Result;
    /**
     * Visit a parse tree produced by the `FuncCall`
     * labeled alternative in `Calc6Parser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitFuncCall?: (ctx: FuncCallContext) => Result;
    /**
     * Visit a parse tree produced by the `MulDiv`
     * labeled alternative in `Calc6Parser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitMulDiv?: (ctx: MulDivContext) => Result;
    /**
     * Visit a parse tree produced by the `AddSub`
     * labeled alternative in `Calc6Parser.expr`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitAddSub?: (ctx: AddSubContext) => Result;
    /**
     * Visit a parse tree produced by `Calc6Parser.paramList`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitParamList?: (ctx: ParamListContext) => Result;
    /**
     * Visit a parse tree produced by `Calc6Parser.argList`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitArgList?: (ctx: ArgListContext) => Result;
    /**
     * Visit a parse tree produced by `Calc6Parser.cond`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitCond?: (ctx: CondContext) => Result;
    /**
     * Visit a parse tree produced by `Calc6Parser.block`.
     * @param ctx the parse tree
     * @return the visitor result
     */
    visitBlock?: (ctx: BlockContext) => Result;
}

