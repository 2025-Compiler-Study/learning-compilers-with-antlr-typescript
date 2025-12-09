
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { CalcPlusListener } from "./CalcPlusListener.js";
import { CalcPlusVisitor } from "./CalcPlusVisitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class CalcPlusParser extends antlr.Parser {
    public static readonly T__0 = 1;
    public static readonly T__1 = 2;
    public static readonly T__2 = 3;
    public static readonly T__3 = 4;
    public static readonly T__4 = 5;
    public static readonly T__5 = 6;
    public static readonly T__6 = 7;
    public static readonly T__7 = 8;
    public static readonly WS = 9;
    public static readonly INT = 10;
    public static readonly VAR = 11;
    public static readonly RULE_calc0 = 0;
    public static readonly RULE_expr = 1;
    public static readonly RULE_calc1 = 2;
    public static readonly RULE_stmt = 3;

    public static readonly literalNames = [
        null, "'*'", "'/'", "'+'", "'-'", "'('", "')'", "'='", "';'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, null, "WS", "INT", 
        "VAR"
    ];
    public static readonly ruleNames = [
        "calc0", "expr", "calc1", "stmt",
    ];

    public get grammarFileName(): string { return "CalcPlus.g4"; }
    public get literalNames(): (string | null)[] { return CalcPlusParser.literalNames; }
    public get symbolicNames(): (string | null)[] { return CalcPlusParser.symbolicNames; }
    public get ruleNames(): string[] { return CalcPlusParser.ruleNames; }
    public get serializedATN(): number[] { return CalcPlusParser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, CalcPlusParser._ATN, CalcPlusParser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public calc0(): Calc0Context {
        let localContext = new Calc0Context(this.context, this.state);
        this.enterRule(localContext, 0, CalcPlusParser.RULE_calc0);
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 8;
            this.expr(0);
            this.state = 9;
            this.match(CalcPlusParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public expr(): ExprContext;
    public expr(_p: number): ExprContext;
    public expr(_p?: number): ExprContext {
        if (_p === undefined) {
            _p = 0;
        }

        let parentContext = this.context;
        let parentState = this.state;
        let localContext = new ExprContext(this.context, parentState);
        let previousContext = localContext;
        let _startState = 2;
        this.enterRecursionRule(localContext, 2, CalcPlusParser.RULE_expr, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 18;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CalcPlusParser.INT:
                {
                localContext = new IntContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 12;
                this.match(CalcPlusParser.INT);
                }
                break;
            case CalcPlusParser.VAR:
                {
                localContext = new VarContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 13;
                this.match(CalcPlusParser.VAR);
                }
                break;
            case CalcPlusParser.T__4:
                {
                localContext = new ParensContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 14;
                this.match(CalcPlusParser.T__4);
                this.state = 15;
                this.expr(0);
                this.state = 16;
                this.match(CalcPlusParser.T__5);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 28;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 2, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 26;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
                    case 1:
                        {
                        localContext = new MulDivContext(new ExprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CalcPlusParser.RULE_expr);
                        this.state = 20;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 21;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 1 || _la === 2)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 22;
                        this.expr(6);
                        }
                        break;
                    case 2:
                        {
                        localContext = new AddSubContext(new ExprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CalcPlusParser.RULE_expr);
                        this.state = 23;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 24;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 3 || _la === 4)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 25;
                        this.expr(5);
                        }
                        break;
                    }
                    }
                }
                this.state = 30;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 2, this.context);
            }
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.unrollRecursionContexts(parentContext);
        }
        return localContext;
    }
    public calc1(): Calc1Context {
        let localContext = new Calc1Context(this.context, this.state);
        this.enterRule(localContext, 4, CalcPlusParser.RULE_calc1);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 32;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 31;
                this.stmt();
                }
                }
                this.state = 34;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 11);
            this.state = 36;
            this.match(CalcPlusParser.EOF);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }
    public stmt(): StmtContext {
        let localContext = new StmtContext(this.context, this.state);
        this.enterRule(localContext, 6, CalcPlusParser.RULE_stmt);
        try {
            localContext = new ExprAssignContext(localContext);
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 38;
            this.match(CalcPlusParser.VAR);
            this.state = 39;
            this.match(CalcPlusParser.T__6);
            this.state = 40;
            this.expr(0);
            this.state = 41;
            this.match(CalcPlusParser.T__7);
            }
        }
        catch (re) {
            if (re instanceof antlr.RecognitionException) {
                this.errorHandler.reportError(this, re);
                this.errorHandler.recover(this, re);
            } else {
                throw re;
            }
        }
        finally {
            this.exitRule();
        }
        return localContext;
    }

    public override sempred(localContext: antlr.ParserRuleContext | null, ruleIndex: number, predIndex: number): boolean {
        switch (ruleIndex) {
        case 1:
            return this.expr_sempred(localContext as ExprContext, predIndex);
        }
        return true;
    }
    private expr_sempred(localContext: ExprContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 5);
        case 1:
            return this.precpred(this.context, 4);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,11,44,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,1,0,1,0,1,0,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,3,1,19,8,1,1,1,1,1,1,1,1,1,1,1,1,1,5,1,27,8,1,
        10,1,12,1,30,9,1,1,2,4,2,33,8,2,11,2,12,2,34,1,2,1,2,1,3,1,3,1,3,
        1,3,1,3,1,3,0,1,2,4,0,2,4,6,0,2,1,0,1,2,1,0,3,4,44,0,8,1,0,0,0,2,
        18,1,0,0,0,4,32,1,0,0,0,6,38,1,0,0,0,8,9,3,2,1,0,9,10,5,0,0,1,10,
        1,1,0,0,0,11,12,6,1,-1,0,12,19,5,10,0,0,13,19,5,11,0,0,14,15,5,5,
        0,0,15,16,3,2,1,0,16,17,5,6,0,0,17,19,1,0,0,0,18,11,1,0,0,0,18,13,
        1,0,0,0,18,14,1,0,0,0,19,28,1,0,0,0,20,21,10,5,0,0,21,22,7,0,0,0,
        22,27,3,2,1,6,23,24,10,4,0,0,24,25,7,1,0,0,25,27,3,2,1,5,26,20,1,
        0,0,0,26,23,1,0,0,0,27,30,1,0,0,0,28,26,1,0,0,0,28,29,1,0,0,0,29,
        3,1,0,0,0,30,28,1,0,0,0,31,33,3,6,3,0,32,31,1,0,0,0,33,34,1,0,0,
        0,34,32,1,0,0,0,34,35,1,0,0,0,35,36,1,0,0,0,36,37,5,0,0,1,37,5,1,
        0,0,0,38,39,5,11,0,0,39,40,5,7,0,0,40,41,3,2,1,0,41,42,5,8,0,0,42,
        7,1,0,0,0,4,18,26,28,34
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!CalcPlusParser.__ATN) {
            CalcPlusParser.__ATN = new antlr.ATNDeserializer().deserialize(CalcPlusParser._serializedATN);
        }

        return CalcPlusParser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(CalcPlusParser.literalNames, CalcPlusParser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return CalcPlusParser.vocabulary;
    }

    private static readonly decisionsToDFA = CalcPlusParser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class Calc0Context extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(CalcPlusParser.EOF, 0)!;
    }
    public override get ruleIndex(): number {
        return CalcPlusParser.RULE_calc0;
    }
    public override enterRule(listener: CalcPlusListener): void {
        if(listener.enterCalc0) {
             listener.enterCalc0(this);
        }
    }
    public override exitRule(listener: CalcPlusListener): void {
        if(listener.exitCalc0) {
             listener.exitCalc0(this);
        }
    }
    public override accept<Result>(visitor: CalcPlusVisitor<Result>): Result | null {
        if (visitor.visitCalc0) {
            return visitor.visitCalc0(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ExprContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return CalcPlusParser.RULE_expr;
    }
    public override copyFrom(ctx: ExprContext): void {
        super.copyFrom(ctx);
    }
}
export class IntContext extends ExprContext {
    public constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public INT(): antlr.TerminalNode {
        return this.getToken(CalcPlusParser.INT, 0)!;
    }
    public override enterRule(listener: CalcPlusListener): void {
        if(listener.enterInt) {
             listener.enterInt(this);
        }
    }
    public override exitRule(listener: CalcPlusListener): void {
        if(listener.exitInt) {
             listener.exitInt(this);
        }
    }
    public override accept<Result>(visitor: CalcPlusVisitor<Result>): Result | null {
        if (visitor.visitInt) {
            return visitor.visitInt(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class VarContext extends ExprContext {
    public constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public VAR(): antlr.TerminalNode {
        return this.getToken(CalcPlusParser.VAR, 0)!;
    }
    public override enterRule(listener: CalcPlusListener): void {
        if(listener.enterVar) {
             listener.enterVar(this);
        }
    }
    public override exitRule(listener: CalcPlusListener): void {
        if(listener.exitVar) {
             listener.exitVar(this);
        }
    }
    public override accept<Result>(visitor: CalcPlusVisitor<Result>): Result | null {
        if (visitor.visitVar) {
            return visitor.visitVar(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ParensContext extends ExprContext {
    public constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public override enterRule(listener: CalcPlusListener): void {
        if(listener.enterParens) {
             listener.enterParens(this);
        }
    }
    public override exitRule(listener: CalcPlusListener): void {
        if(listener.exitParens) {
             listener.exitParens(this);
        }
    }
    public override accept<Result>(visitor: CalcPlusVisitor<Result>): Result | null {
        if (visitor.visitParens) {
            return visitor.visitParens(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class MulDivContext extends ExprContext {
    public constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr(): ExprContext[];
    public expr(i: number): ExprContext | null;
    public expr(i?: number): ExprContext[] | ExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        }

        return this.getRuleContext(i, ExprContext);
    }
    public override enterRule(listener: CalcPlusListener): void {
        if(listener.enterMulDiv) {
             listener.enterMulDiv(this);
        }
    }
    public override exitRule(listener: CalcPlusListener): void {
        if(listener.exitMulDiv) {
             listener.exitMulDiv(this);
        }
    }
    public override accept<Result>(visitor: CalcPlusVisitor<Result>): Result | null {
        if (visitor.visitMulDiv) {
            return visitor.visitMulDiv(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class AddSubContext extends ExprContext {
    public constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr(): ExprContext[];
    public expr(i: number): ExprContext | null;
    public expr(i?: number): ExprContext[] | ExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        }

        return this.getRuleContext(i, ExprContext);
    }
    public override enterRule(listener: CalcPlusListener): void {
        if(listener.enterAddSub) {
             listener.enterAddSub(this);
        }
    }
    public override exitRule(listener: CalcPlusListener): void {
        if(listener.exitAddSub) {
             listener.exitAddSub(this);
        }
    }
    public override accept<Result>(visitor: CalcPlusVisitor<Result>): Result | null {
        if (visitor.visitAddSub) {
            return visitor.visitAddSub(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Calc1Context extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(CalcPlusParser.EOF, 0)!;
    }
    public stmt(): StmtContext[];
    public stmt(i: number): StmtContext | null;
    public stmt(i?: number): StmtContext[] | StmtContext | null {
        if (i === undefined) {
            return this.getRuleContexts(StmtContext);
        }

        return this.getRuleContext(i, StmtContext);
    }
    public override get ruleIndex(): number {
        return CalcPlusParser.RULE_calc1;
    }
    public override enterRule(listener: CalcPlusListener): void {
        if(listener.enterCalc1) {
             listener.enterCalc1(this);
        }
    }
    public override exitRule(listener: CalcPlusListener): void {
        if(listener.exitCalc1) {
             listener.exitCalc1(this);
        }
    }
    public override accept<Result>(visitor: CalcPlusVisitor<Result>): Result | null {
        if (visitor.visitCalc1) {
            return visitor.visitCalc1(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class StmtContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public override get ruleIndex(): number {
        return CalcPlusParser.RULE_stmt;
    }
    public override copyFrom(ctx: StmtContext): void {
        super.copyFrom(ctx);
    }
}
export class ExprAssignContext extends StmtContext {
    public constructor(ctx: StmtContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public VAR(): antlr.TerminalNode {
        return this.getToken(CalcPlusParser.VAR, 0)!;
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public override enterRule(listener: CalcPlusListener): void {
        if(listener.enterExprAssign) {
             listener.enterExprAssign(this);
        }
    }
    public override exitRule(listener: CalcPlusListener): void {
        if(listener.exitExprAssign) {
             listener.exitExprAssign(this);
        }
    }
    public override accept<Result>(visitor: CalcPlusVisitor<Result>): Result | null {
        if (visitor.visitExprAssign) {
            return visitor.visitExprAssign(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
