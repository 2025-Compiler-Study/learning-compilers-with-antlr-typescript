
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { Calc5Listener } from "./Calc5Listener.js";
import { Calc5Visitor } from "./Calc5Visitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class Calc5Parser extends antlr.Parser {
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
    public static readonly T__18 = 19;
    public static readonly T__19 = 20;
    public static readonly T__20 = 21;
    public static readonly T__21 = 22;
    public static readonly WS = 23;
    public static readonly INT = 24;
    public static readonly VAR = 25;
    public static readonly RULE_program = 0;
    public static readonly RULE_stmt = 1;
    public static readonly RULE_expr = 2;
    public static readonly RULE_cond = 3;
    public static readonly RULE_block = 4;

    public static readonly literalNames = [
        null, "'int'", "','", "';'", "'='", "'read'", "'('", "')'", "'write'", 
        "'if'", "'else'", "'*'", "'/'", "'+'", "'-'", "'=='", "'!='", "'>'", 
        "'>='", "'<'", "'<='", "'{'", "'}'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, "WS", "INT", "VAR"
    ];
    public static readonly ruleNames = [
        "program", "stmt", "expr", "cond", "block",
    ];

    public get grammarFileName(): string { return "Calc5.g4"; }
    public get literalNames(): (string | null)[] { return Calc5Parser.literalNames; }
    public get symbolicNames(): (string | null)[] { return Calc5Parser.symbolicNames; }
    public get ruleNames(): string[] { return Calc5Parser.ruleNames; }
    public get serializedATN(): number[] { return Calc5Parser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, Calc5Parser._ATN, Calc5Parser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public program(): ProgramContext {
        let localContext = new ProgramContext(this.context, this.state);
        this.enterRule(localContext, 0, Calc5Parser.RULE_program);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 11;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 10;
                this.stmt();
                }
                }
                this.state = 13;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 35652354) !== 0));
            this.state = 15;
            this.match(Calc5Parser.EOF);
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
        this.enterRule(localContext, 2, Calc5Parser.RULE_stmt);
        let _la: number;
        try {
            this.state = 54;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 3, this.context) ) {
            case 1:
                localContext = new DeclareContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 17;
                this.match(Calc5Parser.T__0);
                this.state = 18;
                this.match(Calc5Parser.VAR);
                this.state = 23;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 2) {
                    {
                    {
                    this.state = 19;
                    this.match(Calc5Parser.T__1);
                    this.state = 20;
                    this.match(Calc5Parser.VAR);
                    }
                    }
                    this.state = 25;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 26;
                this.match(Calc5Parser.T__2);
                }
                break;
            case 2:
                localContext = new ExprAssignContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 27;
                this.match(Calc5Parser.VAR);
                this.state = 28;
                this.match(Calc5Parser.T__3);
                this.state = 29;
                this.expr(0);
                this.state = 30;
                this.match(Calc5Parser.T__2);
                }
                break;
            case 3:
                localContext = new ReadAssignContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 32;
                this.match(Calc5Parser.VAR);
                this.state = 33;
                this.match(Calc5Parser.T__3);
                this.state = 34;
                this.match(Calc5Parser.T__4);
                this.state = 35;
                this.match(Calc5Parser.T__5);
                this.state = 36;
                this.match(Calc5Parser.T__6);
                this.state = 37;
                this.match(Calc5Parser.T__2);
                }
                break;
            case 4:
                localContext = new WriteContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 38;
                this.match(Calc5Parser.T__7);
                this.state = 39;
                this.match(Calc5Parser.T__5);
                this.state = 40;
                this.expr(0);
                this.state = 41;
                this.match(Calc5Parser.T__6);
                this.state = 42;
                this.match(Calc5Parser.T__2);
                }
                break;
            case 5:
                localContext = new IfElseContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 44;
                this.match(Calc5Parser.T__8);
                this.state = 45;
                this.match(Calc5Parser.T__5);
                this.state = 46;
                this.cond();
                this.state = 47;
                this.match(Calc5Parser.T__6);
                this.state = 48;
                (localContext as IfElseContext)._thenBlock = this.block();
                this.state = 51;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 10) {
                    {
                    this.state = 49;
                    this.match(Calc5Parser.T__9);
                    this.state = 50;
                    (localContext as IfElseContext)._elseBlock = this.block();
                    }
                }

                }
                break;
            case 6:
                localContext = new StmtBlockContext(localContext);
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 53;
                this.block();
                }
                break;
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
        let _startState = 4;
        this.enterRecursionRule(localContext, 4, Calc5Parser.RULE_expr, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 63;
            this.errorHandler.sync(this);
            switch (this.tokenStream.LA(1)) {
            case Calc5Parser.INT:
                {
                localContext = new IntContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 57;
                this.match(Calc5Parser.INT);
                }
                break;
            case Calc5Parser.VAR:
                {
                localContext = new VarContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 58;
                this.match(Calc5Parser.VAR);
                }
                break;
            case Calc5Parser.T__5:
                {
                localContext = new ParensContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 59;
                this.match(Calc5Parser.T__5);
                this.state = 60;
                this.expr(0);
                this.state = 61;
                this.match(Calc5Parser.T__6);
                }
                break;
            default:
                throw new antlr.NoViableAltException(this);
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 73;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 6, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 71;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 5, this.context) ) {
                    case 1:
                        {
                        localContext = new MulDivContext(new ExprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, Calc5Parser.RULE_expr);
                        this.state = 65;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 66;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 11 || _la === 12)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 67;
                        this.expr(6);
                        }
                        break;
                    case 2:
                        {
                        localContext = new AddSubContext(new ExprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, Calc5Parser.RULE_expr);
                        this.state = 68;
                        if (!(this.precpred(this.context, 4))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                        }
                        this.state = 69;
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 13 || _la === 14)) {
                        this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 70;
                        this.expr(5);
                        }
                        break;
                    }
                    }
                }
                this.state = 75;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 6, this.context);
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
    public cond(): CondContext {
        let localContext = new CondContext(this.context, this.state);
        this.enterRule(localContext, 6, Calc5Parser.RULE_cond);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 76;
            this.expr(0);
            this.state = 77;
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 2064384) !== 0))) {
            this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 78;
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
        this.enterRule(localContext, 8, Calc5Parser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 80;
            this.match(Calc5Parser.T__20);
            this.state = 84;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 35652354) !== 0)) {
                {
                {
                this.state = 81;
                this.stmt();
                }
                }
                this.state = 86;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 87;
            this.match(Calc5Parser.T__21);
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
        case 2:
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
        4,1,25,90,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,1,0,4,0,12,8,0,
        11,0,12,0,13,1,0,1,0,1,1,1,1,1,1,1,1,5,1,22,8,1,10,1,12,1,25,9,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,3,1,52,8,1,1,1,3,1,55,8,1,1,
        2,1,2,1,2,1,2,1,2,1,2,1,2,3,2,64,8,2,1,2,1,2,1,2,1,2,1,2,1,2,5,2,
        72,8,2,10,2,12,2,75,9,2,1,3,1,3,1,3,1,3,1,4,1,4,5,4,83,8,4,10,4,
        12,4,86,9,4,1,4,1,4,1,4,0,1,4,5,0,2,4,6,8,0,3,1,0,11,12,1,0,13,14,
        1,0,15,20,97,0,11,1,0,0,0,2,54,1,0,0,0,4,63,1,0,0,0,6,76,1,0,0,0,
        8,80,1,0,0,0,10,12,3,2,1,0,11,10,1,0,0,0,12,13,1,0,0,0,13,11,1,0,
        0,0,13,14,1,0,0,0,14,15,1,0,0,0,15,16,5,0,0,1,16,1,1,0,0,0,17,18,
        5,1,0,0,18,23,5,25,0,0,19,20,5,2,0,0,20,22,5,25,0,0,21,19,1,0,0,
        0,22,25,1,0,0,0,23,21,1,0,0,0,23,24,1,0,0,0,24,26,1,0,0,0,25,23,
        1,0,0,0,26,55,5,3,0,0,27,28,5,25,0,0,28,29,5,4,0,0,29,30,3,4,2,0,
        30,31,5,3,0,0,31,55,1,0,0,0,32,33,5,25,0,0,33,34,5,4,0,0,34,35,5,
        5,0,0,35,36,5,6,0,0,36,37,5,7,0,0,37,55,5,3,0,0,38,39,5,8,0,0,39,
        40,5,6,0,0,40,41,3,4,2,0,41,42,5,7,0,0,42,43,5,3,0,0,43,55,1,0,0,
        0,44,45,5,9,0,0,45,46,5,6,0,0,46,47,3,6,3,0,47,48,5,7,0,0,48,51,
        3,8,4,0,49,50,5,10,0,0,50,52,3,8,4,0,51,49,1,0,0,0,51,52,1,0,0,0,
        52,55,1,0,0,0,53,55,3,8,4,0,54,17,1,0,0,0,54,27,1,0,0,0,54,32,1,
        0,0,0,54,38,1,0,0,0,54,44,1,0,0,0,54,53,1,0,0,0,55,3,1,0,0,0,56,
        57,6,2,-1,0,57,64,5,24,0,0,58,64,5,25,0,0,59,60,5,6,0,0,60,61,3,
        4,2,0,61,62,5,7,0,0,62,64,1,0,0,0,63,56,1,0,0,0,63,58,1,0,0,0,63,
        59,1,0,0,0,64,73,1,0,0,0,65,66,10,5,0,0,66,67,7,0,0,0,67,72,3,4,
        2,6,68,69,10,4,0,0,69,70,7,1,0,0,70,72,3,4,2,5,71,65,1,0,0,0,71,
        68,1,0,0,0,72,75,1,0,0,0,73,71,1,0,0,0,73,74,1,0,0,0,74,5,1,0,0,
        0,75,73,1,0,0,0,76,77,3,4,2,0,77,78,7,2,0,0,78,79,3,4,2,0,79,7,1,
        0,0,0,80,84,5,21,0,0,81,83,3,2,1,0,82,81,1,0,0,0,83,86,1,0,0,0,84,
        82,1,0,0,0,84,85,1,0,0,0,85,87,1,0,0,0,86,84,1,0,0,0,87,88,5,22,
        0,0,88,9,1,0,0,0,8,13,23,51,54,63,71,73,84
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!Calc5Parser.__ATN) {
            Calc5Parser.__ATN = new antlr.ATNDeserializer().deserialize(Calc5Parser._serializedATN);
        }

        return Calc5Parser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(Calc5Parser.literalNames, Calc5Parser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return Calc5Parser.vocabulary;
    }

    private static readonly decisionsToDFA = Calc5Parser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(Calc5Parser.EOF, 0)!;
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
        return Calc5Parser.RULE_program;
    }
    public override enterRule(listener: Calc5Listener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: Calc5Listener): void {
        if(listener.exitProgram) {
             listener.exitProgram(this);
        }
    }
    public override accept<Result>(visitor: Calc5Visitor<Result>): Result | null {
        if (visitor.visitProgram) {
            return visitor.visitProgram(this);
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
        return Calc5Parser.RULE_stmt;
    }
    public override copyFrom(ctx: StmtContext): void {
        super.copyFrom(ctx);
    }
}
export class DeclareContext extends StmtContext {
    public constructor(ctx: StmtContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public VAR(): antlr.TerminalNode[];
    public VAR(i: number): antlr.TerminalNode | null;
    public VAR(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Calc5Parser.VAR);
    	} else {
    		return this.getToken(Calc5Parser.VAR, i);
    	}
    }
    public override enterRule(listener: Calc5Listener): void {
        if(listener.enterDeclare) {
             listener.enterDeclare(this);
        }
    }
    public override exitRule(listener: Calc5Listener): void {
        if(listener.exitDeclare) {
             listener.exitDeclare(this);
        }
    }
    public override accept<Result>(visitor: Calc5Visitor<Result>): Result | null {
        if (visitor.visitDeclare) {
            return visitor.visitDeclare(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ExprAssignContext extends StmtContext {
    public constructor(ctx: StmtContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public VAR(): antlr.TerminalNode {
        return this.getToken(Calc5Parser.VAR, 0)!;
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public override enterRule(listener: Calc5Listener): void {
        if(listener.enterExprAssign) {
             listener.enterExprAssign(this);
        }
    }
    public override exitRule(listener: Calc5Listener): void {
        if(listener.exitExprAssign) {
             listener.exitExprAssign(this);
        }
    }
    public override accept<Result>(visitor: Calc5Visitor<Result>): Result | null {
        if (visitor.visitExprAssign) {
            return visitor.visitExprAssign(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ReadAssignContext extends StmtContext {
    public constructor(ctx: StmtContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public VAR(): antlr.TerminalNode {
        return this.getToken(Calc5Parser.VAR, 0)!;
    }
    public override enterRule(listener: Calc5Listener): void {
        if(listener.enterReadAssign) {
             listener.enterReadAssign(this);
        }
    }
    public override exitRule(listener: Calc5Listener): void {
        if(listener.exitReadAssign) {
             listener.exitReadAssign(this);
        }
    }
    public override accept<Result>(visitor: Calc5Visitor<Result>): Result | null {
        if (visitor.visitReadAssign) {
            return visitor.visitReadAssign(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class WriteContext extends StmtContext {
    public constructor(ctx: StmtContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public override enterRule(listener: Calc5Listener): void {
        if(listener.enterWrite) {
             listener.enterWrite(this);
        }
    }
    public override exitRule(listener: Calc5Listener): void {
        if(listener.exitWrite) {
             listener.exitWrite(this);
        }
    }
    public override accept<Result>(visitor: Calc5Visitor<Result>): Result | null {
        if (visitor.visitWrite) {
            return visitor.visitWrite(this);
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
    public override enterRule(listener: Calc5Listener): void {
        if(listener.enterIfElse) {
             listener.enterIfElse(this);
        }
    }
    public override exitRule(listener: Calc5Listener): void {
        if(listener.exitIfElse) {
             listener.exitIfElse(this);
        }
    }
    public override accept<Result>(visitor: Calc5Visitor<Result>): Result | null {
        if (visitor.visitIfElse) {
            return visitor.visitIfElse(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class StmtBlockContext extends StmtContext {
    public constructor(ctx: StmtContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public override enterRule(listener: Calc5Listener): void {
        if(listener.enterStmtBlock) {
             listener.enterStmtBlock(this);
        }
    }
    public override exitRule(listener: Calc5Listener): void {
        if(listener.exitStmtBlock) {
             listener.exitStmtBlock(this);
        }
    }
    public override accept<Result>(visitor: Calc5Visitor<Result>): Result | null {
        if (visitor.visitStmtBlock) {
            return visitor.visitStmtBlock(this);
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
        return Calc5Parser.RULE_expr;
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
        return this.getToken(Calc5Parser.INT, 0)!;
    }
    public override enterRule(listener: Calc5Listener): void {
        if(listener.enterInt) {
             listener.enterInt(this);
        }
    }
    public override exitRule(listener: Calc5Listener): void {
        if(listener.exitInt) {
             listener.exitInt(this);
        }
    }
    public override accept<Result>(visitor: Calc5Visitor<Result>): Result | null {
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
        return this.getToken(Calc5Parser.VAR, 0)!;
    }
    public override enterRule(listener: Calc5Listener): void {
        if(listener.enterVar) {
             listener.enterVar(this);
        }
    }
    public override exitRule(listener: Calc5Listener): void {
        if(listener.exitVar) {
             listener.exitVar(this);
        }
    }
    public override accept<Result>(visitor: Calc5Visitor<Result>): Result | null {
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
    public override enterRule(listener: Calc5Listener): void {
        if(listener.enterParens) {
             listener.enterParens(this);
        }
    }
    public override exitRule(listener: Calc5Listener): void {
        if(listener.exitParens) {
             listener.exitParens(this);
        }
    }
    public override accept<Result>(visitor: Calc5Visitor<Result>): Result | null {
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
    public override enterRule(listener: Calc5Listener): void {
        if(listener.enterMulDiv) {
             listener.enterMulDiv(this);
        }
    }
    public override exitRule(listener: Calc5Listener): void {
        if(listener.exitMulDiv) {
             listener.exitMulDiv(this);
        }
    }
    public override accept<Result>(visitor: Calc5Visitor<Result>): Result | null {
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
    public override enterRule(listener: Calc5Listener): void {
        if(listener.enterAddSub) {
             listener.enterAddSub(this);
        }
    }
    public override exitRule(listener: Calc5Listener): void {
        if(listener.exitAddSub) {
             listener.exitAddSub(this);
        }
    }
    public override accept<Result>(visitor: Calc5Visitor<Result>): Result | null {
        if (visitor.visitAddSub) {
            return visitor.visitAddSub(this);
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
        return Calc5Parser.RULE_cond;
    }
    public override enterRule(listener: Calc5Listener): void {
        if(listener.enterCond) {
             listener.enterCond(this);
        }
    }
    public override exitRule(listener: Calc5Listener): void {
        if(listener.exitCond) {
             listener.exitCond(this);
        }
    }
    public override accept<Result>(visitor: Calc5Visitor<Result>): Result | null {
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
        return Calc5Parser.RULE_block;
    }
    public override enterRule(listener: Calc5Listener): void {
        if(listener.enterBlock) {
             listener.enterBlock(this);
        }
    }
    public override exitRule(listener: Calc5Listener): void {
        if(listener.exitBlock) {
             listener.exitBlock(this);
        }
    }
    public override accept<Result>(visitor: Calc5Visitor<Result>): Result | null {
        if (visitor.visitBlock) {
            return visitor.visitBlock(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
