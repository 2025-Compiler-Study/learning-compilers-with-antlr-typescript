
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
    public static readonly T__8 = 9;
    public static readonly T__9 = 10;
    public static readonly T__10 = 11;
    public static readonly T__11 = 12;
    public static readonly T__12 = 13;
    public static readonly T__13 = 14;
    public static readonly T__14 = 15;
    public static readonly T__15 = 16;
    public static readonly T__16 = 17;
    public static readonly T__17 = 18;
    public static readonly WS = 19;
    public static readonly INT = 20;
    public static readonly VAR = 21;
    public static readonly RULE_calc0 = 0;
    public static readonly RULE_expr = 1;
    public static readonly RULE_calc1 = 2;
    public static readonly RULE_stmt = 3;
    public static readonly RULE_calc2 = 4;
    public static readonly RULE_cond = 5;
    public static readonly RULE_block = 6;

    public static readonly literalNames = [
        null, "'*'", "'/'", "'+'", "'-'", "'('", "')'", "'='", "';'", "'if'", 
        "'else'", "'=='", "'!='", "'>'", "'>='", "'<'", "'<='", "'{'", "'}'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, "WS", "INT", "VAR"
    ];
    public static readonly ruleNames = [
        "calc0", "expr", "calc1", "stmt", "calc2", "cond", "block",
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
            this.state = 14;
            this.expr(0);
            this.state = 15;
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
            this.state = 24;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CalcPlusParser.INT:
                {
                localContext = new IntContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 18;
                this.match(CalcPlusParser.INT);
                }
                break;
            case CalcPlusParser.VAR:
                {
                localContext = new VarContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 19;
                this.match(CalcPlusParser.VAR);
                }
                break;
            case CalcPlusParser.T__4:
                {
                localContext = new ParensContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 20;
                this.match(CalcPlusParser.T__4);
                this.state = 21;
                this.expr(0);
                this.state = 22;
                this.match(CalcPlusParser.T__5);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 34;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 2, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 32;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context) ) {
                    case 1:
                        {
                        localContext = new MulDivContext(new ExprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CalcPlusParser.RULE_expr);
                        this.state = 26;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 27;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 1 || _la === 2)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 28;
                        this.expr(6);
                        }
                        break;
                    case 2:
                        {
                        localContext = new AddSubContext(new ExprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, CalcPlusParser.RULE_expr);
                        this.state = 29;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 30;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 3 || _la === 4)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 31;
                        this.expr(5);
                        }
                        break;
                    }
                    }
                }
                this.state = 36;
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
            this.state = 38;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 37;
                this.stmt();
                }
                }
                this.state = 40;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 9 || _la === 21);
            this.state = 42;
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
        let _la: number;
        try {
            this.state = 58;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case CalcPlusParser.VAR:
                localContext = new ExprAssignContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 44;
                this.match(CalcPlusParser.VAR);
                this.state = 45;
                this.match(CalcPlusParser.T__6);
                this.state = 46;
                this.expr(0);
                this.state = 47;
                this.match(CalcPlusParser.T__7);
                }
                break;
            case CalcPlusParser.T__8:
                localContext = new IfElseContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 49;
                this.match(CalcPlusParser.T__8);
                this.state = 50;
                this.match(CalcPlusParser.T__4);
                this.state = 51;
                this.cond();
                this.state = 52;
                this.match(CalcPlusParser.T__5);
                this.state = 53;
                (localContext as IfElseContext)._thenBlock = this.block();
                this.state = 56;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 10) {
                    {
                    this.state = 54;
                    this.match(CalcPlusParser.T__9);
                    this.state = 55;
                    (localContext as IfElseContext)._elseBlock = this.block();
                    }
                }

                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
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
    public calc2(): Calc2Context {
        let localContext = new Calc2Context(this.context, this.state);
        this.enterRule(localContext, 8, CalcPlusParser.RULE_calc2);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 61;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 60;
                this.stmt();
                }
                }
                this.state = 63;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 9 || _la === 21);
            this.state = 65;
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
    public cond(): CondContext {
        let localContext = new CondContext(this.context, this.state);
        this.enterRule(localContext, 10, CalcPlusParser.RULE_cond);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 67;
            this.expr(0);
            this.state = 68;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 129024) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 69;
            this.expr(0);
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
    public block(): BlockContext {
        let localContext = new BlockContext(this.context, this.state);
        this.enterRule(localContext, 12, CalcPlusParser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 71;
            this.match(CalcPlusParser.T__16);
            this.state = 75;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 9 || _la === 21) {
                {
                {
                this.state = 72;
                this.stmt();
                }
                }
                this.state = 77;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 78;
            this.match(CalcPlusParser.T__17);
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
        4,1,21,81,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,1,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,25,8,1,1,1,1,1,1,1,
        1,1,1,1,1,1,5,1,33,8,1,10,1,12,1,36,9,1,1,2,4,2,39,8,2,11,2,12,2,
        40,1,2,1,2,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,57,
        8,3,3,3,59,8,3,1,4,4,4,62,8,4,11,4,12,4,63,1,4,1,4,1,5,1,5,1,5,1,
        5,1,6,1,6,5,6,74,8,6,10,6,12,6,77,9,6,1,6,1,6,1,6,0,1,2,7,0,2,4,
        6,8,10,12,0,3,1,0,1,2,1,0,3,4,1,0,11,16,82,0,14,1,0,0,0,2,24,1,0,
        0,0,4,38,1,0,0,0,6,58,1,0,0,0,8,61,1,0,0,0,10,67,1,0,0,0,12,71,1,
        0,0,0,14,15,3,2,1,0,15,16,5,0,0,1,16,1,1,0,0,0,17,18,6,1,-1,0,18,
        25,5,20,0,0,19,25,5,21,0,0,20,21,5,5,0,0,21,22,3,2,1,0,22,23,5,6,
        0,0,23,25,1,0,0,0,24,17,1,0,0,0,24,19,1,0,0,0,24,20,1,0,0,0,25,34,
        1,0,0,0,26,27,10,5,0,0,27,28,7,0,0,0,28,33,3,2,1,6,29,30,10,4,0,
        0,30,31,7,1,0,0,31,33,3,2,1,5,32,26,1,0,0,0,32,29,1,0,0,0,33,36,
        1,0,0,0,34,32,1,0,0,0,34,35,1,0,0,0,35,3,1,0,0,0,36,34,1,0,0,0,37,
        39,3,6,3,0,38,37,1,0,0,0,39,40,1,0,0,0,40,38,1,0,0,0,40,41,1,0,0,
        0,41,42,1,0,0,0,42,43,5,0,0,1,43,5,1,0,0,0,44,45,5,21,0,0,45,46,
        5,7,0,0,46,47,3,2,1,0,47,48,5,8,0,0,48,59,1,0,0,0,49,50,5,9,0,0,
        50,51,5,5,0,0,51,52,3,10,5,0,52,53,5,6,0,0,53,56,3,12,6,0,54,55,
        5,10,0,0,55,57,3,12,6,0,56,54,1,0,0,0,56,57,1,0,0,0,57,59,1,0,0,
        0,58,44,1,0,0,0,58,49,1,0,0,0,59,7,1,0,0,0,60,62,3,6,3,0,61,60,1,
        0,0,0,62,63,1,0,0,0,63,61,1,0,0,0,63,64,1,0,0,0,64,65,1,0,0,0,65,
        66,5,0,0,1,66,9,1,0,0,0,67,68,3,2,1,0,68,69,7,2,0,0,69,70,3,2,1,
        0,70,11,1,0,0,0,71,75,5,17,0,0,72,74,3,6,3,0,73,72,1,0,0,0,74,77,
        1,0,0,0,75,73,1,0,0,0,75,76,1,0,0,0,76,78,1,0,0,0,77,75,1,0,0,0,
        78,79,5,18,0,0,79,13,1,0,0,0,8,24,32,34,40,56,58,63,75
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
export class IfElseContext extends StmtContext {
    public _thenBlock?: BlockContext;
    public _elseBlock?: BlockContext;
    public constructor(ctx: StmtContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public cond(): CondContext {
        return this.getRuleContext(0, CondContext)!;
    }
    public block(): BlockContext[];
    public block(i: number): BlockContext | null;
    public block(i?: number): BlockContext[] | BlockContext | null {
        if (i === undefined) {
            return this.getRuleContexts(BlockContext);
        }

        return this.getRuleContext(i, BlockContext);
    }
    public override enterRule(listener: CalcPlusListener): void {
        if(listener.enterIfElse) {
             listener.enterIfElse(this);
        }
    }
    public override exitRule(listener: CalcPlusListener): void {
        if(listener.exitIfElse) {
             listener.exitIfElse(this);
        }
    }
    public override accept<Result>(visitor: CalcPlusVisitor<Result>): Result | null {
        if (visitor.visitIfElse) {
            return visitor.visitIfElse(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class Calc2Context extends antlr.ParserRuleContext {
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
        return CalcPlusParser.RULE_calc2;
    }
    public override enterRule(listener: CalcPlusListener): void {
        if(listener.enterCalc2) {
             listener.enterCalc2(this);
        }
    }
    public override exitRule(listener: CalcPlusListener): void {
        if(listener.exitCalc2) {
             listener.exitCalc2(this);
        }
    }
    public override accept<Result>(visitor: CalcPlusVisitor<Result>): Result | null {
        if (visitor.visitCalc2) {
            return visitor.visitCalc2(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CondContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public expr(): ExprContext[];
    public expr(i: number): ExprContext | null;
    public expr(i?: number): ExprContext[] | ExprContext | null {
        if (i === undefined) {
            return this.getRuleContexts(ExprContext);
        }

        return this.getRuleContext(i, ExprContext);
    }
    public override get ruleIndex(): number {
        return CalcPlusParser.RULE_cond;
    }
    public override enterRule(listener: CalcPlusListener): void {
        if(listener.enterCond) {
             listener.enterCond(this);
        }
    }
    public override exitRule(listener: CalcPlusListener): void {
        if(listener.exitCond) {
             listener.exitCond(this);
        }
    }
    public override accept<Result>(visitor: CalcPlusVisitor<Result>): Result | null {
        if (visitor.visitCond) {
            return visitor.visitCond(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class BlockContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
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
        return CalcPlusParser.RULE_block;
    }
    public override enterRule(listener: CalcPlusListener): void {
        if(listener.enterBlock) {
             listener.enterBlock(this);
        }
    }
    public override exitRule(listener: CalcPlusListener): void {
        if(listener.exitBlock) {
             listener.exitBlock(this);
        }
    }
    public override accept<Result>(visitor: CalcPlusVisitor<Result>): Result | null {
        if (visitor.visitBlock) {
            return visitor.visitBlock(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
