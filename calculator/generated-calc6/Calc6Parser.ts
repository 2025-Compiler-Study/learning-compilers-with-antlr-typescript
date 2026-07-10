
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";

import { Calc6Listener } from "./Calc6Listener.js";
import { Calc6Visitor } from "./Calc6Visitor.js";

// for running tests with parameters, TODO: discuss strategy for typed parameters in CI
// eslint-disable-next-line no-unused-vars
type int = number;


export class Calc6Parser extends antlr.Parser {
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
    public static readonly IDENT = 25;
    public static readonly RULE_program = 0;
    public static readonly RULE_funcDef = 1;
    public static readonly RULE_stmt = 2;
    public static readonly RULE_expr = 3;
    public static readonly RULE_paramList = 4;
    public static readonly RULE_argList = 5;
    public static readonly RULE_cond = 6;
    public static readonly RULE_block = 7;

    public static readonly literalNames = [
        null, "'func'", "'int'", "'('", "')'", "','", "';'", "'='", "'if'", 
        "'else'", "'return'", "'*'", "'/'", "'+'", "'-'", "'=='", "'!='", 
        "'>'", "'>='", "'<'", "'<='", "'{'", "'}'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, "WS", "INT", "IDENT"
    ];
    public static readonly ruleNames = [
        "program", "funcDef", "stmt", "expr", "paramList", "argList", "cond", 
        "block",
    ];

    public get grammarFileName(): string { return "Calc6.g4"; }
    public get literalNames(): (string | null)[] { return Calc6Parser.literalNames; }
    public get symbolicNames(): (string | null)[] { return Calc6Parser.symbolicNames; }
    public get ruleNames(): string[] { return Calc6Parser.ruleNames; }
    public get serializedATN(): number[] { return Calc6Parser._serializedATN; }

    protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
        return new antlr.FailedPredicateException(this, predicate, message);
    }

    public constructor(input: antlr.TokenStream) {
        super(input);
        this.interpreter = new antlr.ParserATNSimulator(this, Calc6Parser._ATN, Calc6Parser.decisionsToDFA, new antlr.PredictionContextCache());
    }
    public program(): ProgramContext {
        let localContext = new ProgramContext(this.context, this.state);
        this.enterRule(localContext, 0, Calc6Parser.RULE_program);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 17;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            do {
                {
                {
                this.state = 16;
                this.funcDef();
                }
                }
                this.state = 19;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            } while (_la === 1);
            this.state = 21;
            this.match(Calc6Parser.EOF);
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
    public funcDef(): FuncDefContext {
        let localContext = new FuncDefContext(this.context, this.state);
        this.enterRule(localContext, 2, Calc6Parser.RULE_funcDef);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 23;
            this.match(Calc6Parser.T__0);
            this.state = 25;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 24;
                this.match(Calc6Parser.T__1);
                }
            }

            this.state = 27;
            this.match(Calc6Parser.IDENT);
            this.state = 28;
            this.match(Calc6Parser.T__2);
            this.state = 30;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            if (_la === 2) {
                {
                this.state = 29;
                this.paramList();
                }
            }

            this.state = 32;
            this.match(Calc6Parser.T__3);
            this.state = 33;
            this.block();
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
        this.enterRule(localContext, 4, Calc6Parser.RULE_stmt);
        let _la: number;
        try {
            this.state = 68;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 6, this.context) ) {
            case 1:
                localContext = new DeclareContext(localContext);
                this.enterOuterAlt(localContext, 1);
                {
                this.state = 35;
                this.match(Calc6Parser.T__1);
                this.state = 36;
                this.match(Calc6Parser.IDENT);
                this.state = 41;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                while (_la === 5) {
                    {
                    {
                    this.state = 37;
                    this.match(Calc6Parser.T__4);
                    this.state = 38;
                    this.match(Calc6Parser.IDENT);
                    }
                    }
                    this.state = 43;
                    this.errorHandler.sync(this);
                    _la = this.tokenStream.LA(1);
                }
                this.state = 44;
                this.match(Calc6Parser.T__5);
                }
                break;
            case 2:
                localContext = new ExprAssignContext(localContext);
                this.enterOuterAlt(localContext, 2);
                {
                this.state = 45;
                this.match(Calc6Parser.IDENT);
                this.state = 46;
                this.match(Calc6Parser.T__6);
                this.state = 47;
                this.expr(0);
                this.state = 48;
                this.match(Calc6Parser.T__5);
                }
                break;
            case 3:
                localContext = new ExprStmtContext(localContext);
                this.enterOuterAlt(localContext, 3);
                {
                this.state = 50;
                this.expr(0);
                this.state = 51;
                this.match(Calc6Parser.T__5);
                }
                break;
            case 4:
                localContext = new IfElseContext(localContext);
                this.enterOuterAlt(localContext, 4);
                {
                this.state = 53;
                this.match(Calc6Parser.T__7);
                this.state = 54;
                this.match(Calc6Parser.T__2);
                this.state = 55;
                this.cond();
                this.state = 56;
                this.match(Calc6Parser.T__3);
                this.state = 57;
                (localContext as IfElseContext)._thenBlock = this.block();
                this.state = 60;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if (_la === 9) {
                    {
                    this.state = 58;
                    this.match(Calc6Parser.T__8);
                    this.state = 59;
                    (localContext as IfElseContext)._elseBlock = this.block();
                    }
                }

                }
                break;
            case 5:
                localContext = new StmtBlockContext(localContext);
                this.enterOuterAlt(localContext, 5);
                {
                this.state = 62;
                this.block();
                }
                break;
            case 6:
                localContext = new ReturnContext(localContext);
                this.enterOuterAlt(localContext, 6);
                {
                this.state = 63;
                this.match(Calc6Parser.T__9);
                this.state = 65;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 50331656) !== 0)) {
                    {
                    this.state = 64;
                    this.expr(0);
                    }
                }

                this.state = 67;
                this.match(Calc6Parser.T__5);
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
        let _startState = 6;
        this.enterRecursionRule(localContext, 6, Calc6Parser.RULE_expr, _p);
        let _la: number;
        try {
            let alternative: number;
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 83;
            this.errorHandler.sync(this);
            switch (this.interpreter.adaptivePredict(this.tokenStream, 8, this.context) ) {
            case 1:
                {
                localContext = new IntContext(localContext);
                this.context = localContext;
                previousContext = localContext;

                this.state = 71;
                this.match(Calc6Parser.INT);
                }
                break;
            case 2:
                {
                localContext = new VarContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 72;
                this.match(Calc6Parser.IDENT);
                }
                break;
            case 3:
                {
                localContext = new ParensContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 73;
                this.match(Calc6Parser.T__2);
                this.state = 74;
                this.expr(0);
                this.state = 75;
                this.match(Calc6Parser.T__3);
                }
                break;
            case 4:
                {
                localContext = new FuncCallContext(localContext);
                this.context = localContext;
                previousContext = localContext;
                this.state = 77;
                this.match(Calc6Parser.IDENT);
                this.state = 78;
                this.match(Calc6Parser.T__2);
                this.state = 80;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
                if ((((_la) & ~0x1F) === 0 && ((1 << _la) & 50331656) !== 0)) {
                    {
                    this.state = 79;
                    this.argList();
                    }
                }

                this.state = 82;
                this.match(Calc6Parser.T__3);
                }
                break;
            }
            this.context!.stop = this.tokenStream.LT(-1);
            this.state = 93;
            this.errorHandler.sync(this);
            alternative = this.interpreter.adaptivePredict(this.tokenStream, 10, this.context);
            while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
                if (alternative === 1) {
                    if (this.parseListeners != null) {
                        this.triggerExitRuleEvent();
                    }
                    previousContext = localContext;
                    {
                    this.state = 91;
                    this.errorHandler.sync(this);
                    switch (this.interpreter.adaptivePredict(this.tokenStream, 9, this.context) ) {
                    case 1:
                        {
                        localContext = new MulDivContext(new ExprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, Calc6Parser.RULE_expr);
                        this.state = 85;
                        if (!(this.precpred(this.context, 6))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 6)");
                        }
                        this.state = 86;
                        (localContext as MulDivContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 11 || _la === 12)) {
                            (localContext as MulDivContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 87;
                        this.expr(7);
                        }
                        break;
                    case 2:
                        {
                        localContext = new AddSubContext(new ExprContext(parentContext, parentState));
                        this.pushNewRecursionContext(localContext, _startState, Calc6Parser.RULE_expr);
                        this.state = 88;
                        if (!(this.precpred(this.context, 5))) {
                            throw this.createFailedPredicateException("this.precpred(this.context, 5)");
                        }
                        this.state = 89;
                        (localContext as AddSubContext)._op = this.tokenStream.LT(1);
                        _la = this.tokenStream.LA(1);
                        if(!(_la === 13 || _la === 14)) {
                            (localContext as AddSubContext)._op = this.errorHandler.recoverInline(this);
                        }
                        else {
                            this.errorHandler.reportMatch(this);
                            this.consume();
                        }
                        this.state = 90;
                        this.expr(6);
                        }
                        break;
                    }
                    }
                }
                this.state = 95;
                this.errorHandler.sync(this);
                alternative = this.interpreter.adaptivePredict(this.tokenStream, 10, this.context);
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
    public paramList(): ParamListContext {
        let localContext = new ParamListContext(this.context, this.state);
        this.enterRule(localContext, 8, Calc6Parser.RULE_paramList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 96;
            this.match(Calc6Parser.T__1);
            this.state = 97;
            this.match(Calc6Parser.IDENT);
            this.state = 103;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 98;
                this.match(Calc6Parser.T__4);
                this.state = 99;
                this.match(Calc6Parser.T__1);
                this.state = 100;
                this.match(Calc6Parser.IDENT);
                }
                }
                this.state = 105;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
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
            this.exitRule();
        }
        return localContext;
    }
    public argList(): ArgListContext {
        let localContext = new ArgListContext(this.context, this.state);
        this.enterRule(localContext, 10, Calc6Parser.RULE_argList);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 106;
            this.expr(0);
            this.state = 111;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while (_la === 5) {
                {
                {
                this.state = 107;
                this.match(Calc6Parser.T__4);
                this.state = 108;
                this.expr(0);
                }
                }
                this.state = 113;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
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
            this.exitRule();
        }
        return localContext;
    }
    public cond(): CondContext {
        let localContext = new CondContext(this.context, this.state);
        this.enterRule(localContext, 12, Calc6Parser.RULE_cond);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 114;
            this.expr(0);
            this.state = 115;
            localContext._comOp = this.tokenStream.LT(1);
            _la = this.tokenStream.LA(1);
            if(!((((_la) & ~0x1F) === 0 && ((1 << _la) & 2064384) !== 0))) {
                localContext._comOp = this.errorHandler.recoverInline(this);
            }
            else {
                this.errorHandler.reportMatch(this);
                this.consume();
            }
            this.state = 116;
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
        this.enterRule(localContext, 14, Calc6Parser.RULE_block);
        let _la: number;
        try {
            this.enterOuterAlt(localContext, 1);
            {
            this.state = 118;
            this.match(Calc6Parser.T__20);
            this.state = 122;
            this.errorHandler.sync(this);
            _la = this.tokenStream.LA(1);
            while ((((_la) & ~0x1F) === 0 && ((1 << _la) & 52430092) !== 0)) {
                {
                {
                this.state = 119;
                this.stmt();
                }
                }
                this.state = 124;
                this.errorHandler.sync(this);
                _la = this.tokenStream.LA(1);
            }
            this.state = 125;
            this.match(Calc6Parser.T__21);
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
        case 3:
            return this.expr_sempred(localContext as ExprContext, predIndex);
        }
        return true;
    }
    private expr_sempred(localContext: ExprContext | null, predIndex: number): boolean {
        switch (predIndex) {
        case 0:
            return this.precpred(this.context, 6);
        case 1:
            return this.precpred(this.context, 5);
        }
        return true;
    }

    public static readonly _serializedATN: number[] = [
        4,1,25,128,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,6,7,
        6,2,7,7,7,1,0,4,0,18,8,0,11,0,12,0,19,1,0,1,0,1,1,1,1,3,1,26,8,1,
        1,1,1,1,1,1,3,1,31,8,1,1,1,1,1,1,1,1,2,1,2,1,2,1,2,5,2,40,8,2,10,
        2,12,2,43,9,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,
        2,1,2,1,2,1,2,3,2,61,8,2,1,2,1,2,1,2,3,2,66,8,2,1,2,3,2,69,8,2,1,
        3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,1,3,3,3,81,8,3,1,3,3,3,84,8,3,
        1,3,1,3,1,3,1,3,1,3,1,3,5,3,92,8,3,10,3,12,3,95,9,3,1,4,1,4,1,4,
        1,4,1,4,5,4,102,8,4,10,4,12,4,105,9,4,1,5,1,5,1,5,5,5,110,8,5,10,
        5,12,5,113,9,5,1,6,1,6,1,6,1,6,1,7,1,7,5,7,121,8,7,10,7,12,7,124,
        9,7,1,7,1,7,1,7,0,1,6,8,0,2,4,6,8,10,12,14,0,3,1,0,11,12,1,0,13,
        14,1,0,15,20,139,0,17,1,0,0,0,2,23,1,0,0,0,4,68,1,0,0,0,6,83,1,0,
        0,0,8,96,1,0,0,0,10,106,1,0,0,0,12,114,1,0,0,0,14,118,1,0,0,0,16,
        18,3,2,1,0,17,16,1,0,0,0,18,19,1,0,0,0,19,17,1,0,0,0,19,20,1,0,0,
        0,20,21,1,0,0,0,21,22,5,0,0,1,22,1,1,0,0,0,23,25,5,1,0,0,24,26,5,
        2,0,0,25,24,1,0,0,0,25,26,1,0,0,0,26,27,1,0,0,0,27,28,5,25,0,0,28,
        30,5,3,0,0,29,31,3,8,4,0,30,29,1,0,0,0,30,31,1,0,0,0,31,32,1,0,0,
        0,32,33,5,4,0,0,33,34,3,14,7,0,34,3,1,0,0,0,35,36,5,2,0,0,36,41,
        5,25,0,0,37,38,5,5,0,0,38,40,5,25,0,0,39,37,1,0,0,0,40,43,1,0,0,
        0,41,39,1,0,0,0,41,42,1,0,0,0,42,44,1,0,0,0,43,41,1,0,0,0,44,69,
        5,6,0,0,45,46,5,25,0,0,46,47,5,7,0,0,47,48,3,6,3,0,48,49,5,6,0,0,
        49,69,1,0,0,0,50,51,3,6,3,0,51,52,5,6,0,0,52,69,1,0,0,0,53,54,5,
        8,0,0,54,55,5,3,0,0,55,56,3,12,6,0,56,57,5,4,0,0,57,60,3,14,7,0,
        58,59,5,9,0,0,59,61,3,14,7,0,60,58,1,0,0,0,60,61,1,0,0,0,61,69,1,
        0,0,0,62,69,3,14,7,0,63,65,5,10,0,0,64,66,3,6,3,0,65,64,1,0,0,0,
        65,66,1,0,0,0,66,67,1,0,0,0,67,69,5,6,0,0,68,35,1,0,0,0,68,45,1,
        0,0,0,68,50,1,0,0,0,68,53,1,0,0,0,68,62,1,0,0,0,68,63,1,0,0,0,69,
        5,1,0,0,0,70,71,6,3,-1,0,71,84,5,24,0,0,72,84,5,25,0,0,73,74,5,3,
        0,0,74,75,3,6,3,0,75,76,5,4,0,0,76,84,1,0,0,0,77,78,5,25,0,0,78,
        80,5,3,0,0,79,81,3,10,5,0,80,79,1,0,0,0,80,81,1,0,0,0,81,82,1,0,
        0,0,82,84,5,4,0,0,83,70,1,0,0,0,83,72,1,0,0,0,83,73,1,0,0,0,83,77,
        1,0,0,0,84,93,1,0,0,0,85,86,10,6,0,0,86,87,7,0,0,0,87,92,3,6,3,7,
        88,89,10,5,0,0,89,90,7,1,0,0,90,92,3,6,3,6,91,85,1,0,0,0,91,88,1,
        0,0,0,92,95,1,0,0,0,93,91,1,0,0,0,93,94,1,0,0,0,94,7,1,0,0,0,95,
        93,1,0,0,0,96,97,5,2,0,0,97,103,5,25,0,0,98,99,5,5,0,0,99,100,5,
        2,0,0,100,102,5,25,0,0,101,98,1,0,0,0,102,105,1,0,0,0,103,101,1,
        0,0,0,103,104,1,0,0,0,104,9,1,0,0,0,105,103,1,0,0,0,106,111,3,6,
        3,0,107,108,5,5,0,0,108,110,3,6,3,0,109,107,1,0,0,0,110,113,1,0,
        0,0,111,109,1,0,0,0,111,112,1,0,0,0,112,11,1,0,0,0,113,111,1,0,0,
        0,114,115,3,6,3,0,115,116,7,2,0,0,116,117,3,6,3,0,117,13,1,0,0,0,
        118,122,5,21,0,0,119,121,3,4,2,0,120,119,1,0,0,0,121,124,1,0,0,0,
        122,120,1,0,0,0,122,123,1,0,0,0,123,125,1,0,0,0,124,122,1,0,0,0,
        125,126,5,22,0,0,126,15,1,0,0,0,14,19,25,30,41,60,65,68,80,83,91,
        93,103,111,122
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!Calc6Parser.__ATN) {
            Calc6Parser.__ATN = new antlr.ATNDeserializer().deserialize(Calc6Parser._serializedATN);
        }

        return Calc6Parser.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(Calc6Parser.literalNames, Calc6Parser.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return Calc6Parser.vocabulary;
    }

    private static readonly decisionsToDFA = Calc6Parser._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}

export class ProgramContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public EOF(): antlr.TerminalNode {
        return this.getToken(Calc6Parser.EOF, 0)!;
    }
    public funcDef(): FuncDefContext[];
    public funcDef(i: number): FuncDefContext | null;
    public funcDef(i?: number): FuncDefContext[] | FuncDefContext | null {
        if (i === undefined) {
            return this.getRuleContexts(FuncDefContext);
        }

        return this.getRuleContext(i, FuncDefContext);
    }
    public override get ruleIndex(): number {
        return Calc6Parser.RULE_program;
    }
    public override enterRule(listener: Calc6Listener): void {
        if(listener.enterProgram) {
             listener.enterProgram(this);
        }
    }
    public override exitRule(listener: Calc6Listener): void {
        if(listener.exitProgram) {
             listener.exitProgram(this);
        }
    }
    public override accept<Result>(visitor: Calc6Visitor<Result>): Result | null {
        if (visitor.visitProgram) {
            return visitor.visitProgram(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class FuncDefContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENT(): antlr.TerminalNode {
        return this.getToken(Calc6Parser.IDENT, 0)!;
    }
    public block(): BlockContext {
        return this.getRuleContext(0, BlockContext)!;
    }
    public paramList(): ParamListContext | null {
        return this.getRuleContext(0, ParamListContext);
    }
    public override get ruleIndex(): number {
        return Calc6Parser.RULE_funcDef;
    }
    public override enterRule(listener: Calc6Listener): void {
        if(listener.enterFuncDef) {
             listener.enterFuncDef(this);
        }
    }
    public override exitRule(listener: Calc6Listener): void {
        if(listener.exitFuncDef) {
             listener.exitFuncDef(this);
        }
    }
    public override accept<Result>(visitor: Calc6Visitor<Result>): Result | null {
        if (visitor.visitFuncDef) {
            return visitor.visitFuncDef(this);
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
        return Calc6Parser.RULE_stmt;
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
    public IDENT(): antlr.TerminalNode[];
    public IDENT(i: number): antlr.TerminalNode | null;
    public IDENT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Calc6Parser.IDENT);
    	} else {
    		return this.getToken(Calc6Parser.IDENT, i);
    	}
    }
    public override enterRule(listener: Calc6Listener): void {
        if(listener.enterDeclare) {
             listener.enterDeclare(this);
        }
    }
    public override exitRule(listener: Calc6Listener): void {
        if(listener.exitDeclare) {
             listener.exitDeclare(this);
        }
    }
    public override accept<Result>(visitor: Calc6Visitor<Result>): Result | null {
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
    public IDENT(): antlr.TerminalNode {
        return this.getToken(Calc6Parser.IDENT, 0)!;
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public override enterRule(listener: Calc6Listener): void {
        if(listener.enterExprAssign) {
             listener.enterExprAssign(this);
        }
    }
    public override exitRule(listener: Calc6Listener): void {
        if(listener.exitExprAssign) {
             listener.exitExprAssign(this);
        }
    }
    public override accept<Result>(visitor: Calc6Visitor<Result>): Result | null {
        if (visitor.visitExprAssign) {
            return visitor.visitExprAssign(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ExprStmtContext extends StmtContext {
    public constructor(ctx: StmtContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr(): ExprContext {
        return this.getRuleContext(0, ExprContext)!;
    }
    public override enterRule(listener: Calc6Listener): void {
        if(listener.enterExprStmt) {
             listener.enterExprStmt(this);
        }
    }
    public override exitRule(listener: Calc6Listener): void {
        if(listener.exitExprStmt) {
             listener.exitExprStmt(this);
        }
    }
    public override accept<Result>(visitor: Calc6Visitor<Result>): Result | null {
        if (visitor.visitExprStmt) {
            return visitor.visitExprStmt(this);
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
    public override enterRule(listener: Calc6Listener): void {
        if(listener.enterIfElse) {
             listener.enterIfElse(this);
        }
    }
    public override exitRule(listener: Calc6Listener): void {
        if(listener.exitIfElse) {
             listener.exitIfElse(this);
        }
    }
    public override accept<Result>(visitor: Calc6Visitor<Result>): Result | null {
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
    public override enterRule(listener: Calc6Listener): void {
        if(listener.enterStmtBlock) {
             listener.enterStmtBlock(this);
        }
    }
    public override exitRule(listener: Calc6Listener): void {
        if(listener.exitStmtBlock) {
             listener.exitStmtBlock(this);
        }
    }
    public override accept<Result>(visitor: Calc6Visitor<Result>): Result | null {
        if (visitor.visitStmtBlock) {
            return visitor.visitStmtBlock(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class ReturnContext extends StmtContext {
    public constructor(ctx: StmtContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public expr(): ExprContext | null {
        return this.getRuleContext(0, ExprContext);
    }
    public override enterRule(listener: Calc6Listener): void {
        if(listener.enterReturn) {
             listener.enterReturn(this);
        }
    }
    public override exitRule(listener: Calc6Listener): void {
        if(listener.exitReturn) {
             listener.exitReturn(this);
        }
    }
    public override accept<Result>(visitor: Calc6Visitor<Result>): Result | null {
        if (visitor.visitReturn) {
            return visitor.visitReturn(this);
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
        return Calc6Parser.RULE_expr;
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
        return this.getToken(Calc6Parser.INT, 0)!;
    }
    public override enterRule(listener: Calc6Listener): void {
        if(listener.enterInt) {
             listener.enterInt(this);
        }
    }
    public override exitRule(listener: Calc6Listener): void {
        if(listener.exitInt) {
             listener.exitInt(this);
        }
    }
    public override accept<Result>(visitor: Calc6Visitor<Result>): Result | null {
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
    public IDENT(): antlr.TerminalNode {
        return this.getToken(Calc6Parser.IDENT, 0)!;
    }
    public override enterRule(listener: Calc6Listener): void {
        if(listener.enterVar) {
             listener.enterVar(this);
        }
    }
    public override exitRule(listener: Calc6Listener): void {
        if(listener.exitVar) {
             listener.exitVar(this);
        }
    }
    public override accept<Result>(visitor: Calc6Visitor<Result>): Result | null {
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
    public override enterRule(listener: Calc6Listener): void {
        if(listener.enterParens) {
             listener.enterParens(this);
        }
    }
    public override exitRule(listener: Calc6Listener): void {
        if(listener.exitParens) {
             listener.exitParens(this);
        }
    }
    public override accept<Result>(visitor: Calc6Visitor<Result>): Result | null {
        if (visitor.visitParens) {
            return visitor.visitParens(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class FuncCallContext extends ExprContext {
    public constructor(ctx: ExprContext) {
        super(ctx.parent, ctx.invokingState);
        super.copyFrom(ctx);
    }
    public IDENT(): antlr.TerminalNode {
        return this.getToken(Calc6Parser.IDENT, 0)!;
    }
    public argList(): ArgListContext | null {
        return this.getRuleContext(0, ArgListContext);
    }
    public override enterRule(listener: Calc6Listener): void {
        if(listener.enterFuncCall) {
             listener.enterFuncCall(this);
        }
    }
    public override exitRule(listener: Calc6Listener): void {
        if(listener.exitFuncCall) {
             listener.exitFuncCall(this);
        }
    }
    public override accept<Result>(visitor: Calc6Visitor<Result>): Result | null {
        if (visitor.visitFuncCall) {
            return visitor.visitFuncCall(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class MulDivContext extends ExprContext {
    public _op?: Token | null;
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
    public override enterRule(listener: Calc6Listener): void {
        if(listener.enterMulDiv) {
             listener.enterMulDiv(this);
        }
    }
    public override exitRule(listener: Calc6Listener): void {
        if(listener.exitMulDiv) {
             listener.exitMulDiv(this);
        }
    }
    public override accept<Result>(visitor: Calc6Visitor<Result>): Result | null {
        if (visitor.visitMulDiv) {
            return visitor.visitMulDiv(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
export class AddSubContext extends ExprContext {
    public _op?: Token | null;
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
    public override enterRule(listener: Calc6Listener): void {
        if(listener.enterAddSub) {
             listener.enterAddSub(this);
        }
    }
    public override exitRule(listener: Calc6Listener): void {
        if(listener.exitAddSub) {
             listener.exitAddSub(this);
        }
    }
    public override accept<Result>(visitor: Calc6Visitor<Result>): Result | null {
        if (visitor.visitAddSub) {
            return visitor.visitAddSub(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ParamListContext extends antlr.ParserRuleContext {
    public constructor(parent: antlr.ParserRuleContext | null, invokingState: number) {
        super(parent, invokingState);
    }
    public IDENT(): antlr.TerminalNode[];
    public IDENT(i: number): antlr.TerminalNode | null;
    public IDENT(i?: number): antlr.TerminalNode | null | antlr.TerminalNode[] {
    	if (i === undefined) {
    		return this.getTokens(Calc6Parser.IDENT);
    	} else {
    		return this.getToken(Calc6Parser.IDENT, i);
    	}
    }
    public override get ruleIndex(): number {
        return Calc6Parser.RULE_paramList;
    }
    public override enterRule(listener: Calc6Listener): void {
        if(listener.enterParamList) {
             listener.enterParamList(this);
        }
    }
    public override exitRule(listener: Calc6Listener): void {
        if(listener.exitParamList) {
             listener.exitParamList(this);
        }
    }
    public override accept<Result>(visitor: Calc6Visitor<Result>): Result | null {
        if (visitor.visitParamList) {
            return visitor.visitParamList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class ArgListContext extends antlr.ParserRuleContext {
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
        return Calc6Parser.RULE_argList;
    }
    public override enterRule(listener: Calc6Listener): void {
        if(listener.enterArgList) {
             listener.enterArgList(this);
        }
    }
    public override exitRule(listener: Calc6Listener): void {
        if(listener.exitArgList) {
             listener.exitArgList(this);
        }
    }
    public override accept<Result>(visitor: Calc6Visitor<Result>): Result | null {
        if (visitor.visitArgList) {
            return visitor.visitArgList(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}


export class CondContext extends antlr.ParserRuleContext {
    public _comOp?: Token | null;
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
        return Calc6Parser.RULE_cond;
    }
    public override enterRule(listener: Calc6Listener): void {
        if(listener.enterCond) {
             listener.enterCond(this);
        }
    }
    public override exitRule(listener: Calc6Listener): void {
        if(listener.exitCond) {
             listener.exitCond(this);
        }
    }
    public override accept<Result>(visitor: Calc6Visitor<Result>): Result | null {
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
        return Calc6Parser.RULE_block;
    }
    public override enterRule(listener: Calc6Listener): void {
        if(listener.enterBlock) {
             listener.enterBlock(this);
        }
    }
    public override exitRule(listener: Calc6Listener): void {
        if(listener.exitBlock) {
             listener.exitBlock(this);
        }
    }
    public override accept<Result>(visitor: Calc6Visitor<Result>): Result | null {
        if (visitor.visitBlock) {
            return visitor.visitBlock(this);
        } else {
            return visitor.visitChildren(this);
        }
    }
}
