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
  public static readonly WS = 7;
  public static readonly INT = 8;
  public static readonly RULE_calc0 = 0;
  public static readonly RULE_expr = 1;

  public static readonly literalNames = [null, "'*'", "'/'", "'+'", "'-'", "'('", "')'"];

  public static readonly symbolicNames = [null, null, null, null, null, null, null, "WS", "INT"];
  public static readonly ruleNames = ["calc0", "expr"];

  public get grammarFileName(): string {
    return "CalcPlus.g4";
  }
  public get literalNames(): (string | null)[] {
    return CalcPlusParser.literalNames;
  }
  public get symbolicNames(): (string | null)[] {
    return CalcPlusParser.symbolicNames;
  }
  public get ruleNames(): string[] {
    return CalcPlusParser.ruleNames;
  }
  public get serializedATN(): number[] {
    return CalcPlusParser._serializedATN;
  }

  protected createFailedPredicateException(predicate?: string, message?: string): antlr.FailedPredicateException {
    return new antlr.FailedPredicateException(this, predicate, message);
  }

  public constructor(input: antlr.TokenStream) {
    super(input);
    this.interpreter = new antlr.ParserATNSimulator(
      this,
      CalcPlusParser._ATN,
      CalcPlusParser.decisionsToDFA,
      new antlr.PredictionContextCache()
    );
  }
  public calc0(): Calc0Context {
    let localContext = new Calc0Context(this.context, this.state);
    this.enterRule(localContext, 0, CalcPlusParser.RULE_calc0);
    try {
      this.enterOuterAlt(localContext, 1);
      {
        this.state = 4;
        this.expr(0);
        this.state = 5;
        this.match(CalcPlusParser.EOF);
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
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
        this.state = 13;
        this.errorHandler.sync(this);
        switch (this.tokenStream.LA(1)) {
          case CalcPlusParser.INT:
            {
              localContext = new IntContext(localContext);
              this.context = localContext;
              previousContext = localContext;

              this.state = 8;
              this.match(CalcPlusParser.INT);
            }
            break;
          case CalcPlusParser.T__4:
            {
              localContext = new ParensContext(localContext);
              this.context = localContext;
              previousContext = localContext;
              this.state = 9;
              this.match(CalcPlusParser.T__4);
              this.state = 10;
              this.expr(0);
              this.state = 11;
              this.match(CalcPlusParser.T__5);
            }
            break;
          default:
            throw new antlr.NoViableAltException(this);
        }
        this.context!.stop = this.tokenStream.LT(-1);
        this.state = 23;
        this.errorHandler.sync(this);
        alternative = this.interpreter.adaptivePredict(this.tokenStream, 2, this.context);
        while (alternative !== 2 && alternative !== antlr.ATN.INVALID_ALT_NUMBER) {
          if (alternative === 1) {
            if (this.parseListeners != null) {
              this.triggerExitRuleEvent();
            }
            previousContext = localContext;
            {
              this.state = 21;
              this.errorHandler.sync(this);
              switch (this.interpreter.adaptivePredict(this.tokenStream, 1, this.context)) {
                case 1:
                  {
                    localContext = new MulDivContext(new ExprContext(parentContext, parentState));
                    this.pushNewRecursionContext(localContext, _startState, CalcPlusParser.RULE_expr);
                    this.state = 15;
                    if (!this.precpred(this.context, 4)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 4)");
                    }
                    this.state = 16;
                    (localContext as MulDivContext)._op = this.tokenStream.LT(1);
                    _la = this.tokenStream.LA(1);
                    if (!(_la === 1 || _la === 2)) {
                      (localContext as MulDivContext)._op = this.errorHandler.recoverInline(this);
                    } else {
                      this.errorHandler.reportMatch(this);
                      this.consume();
                    }
                    this.state = 17;
                    this.expr(5);
                  }
                  break;
                case 2:
                  {
                    localContext = new AddSubContext(new ExprContext(parentContext, parentState));
                    this.pushNewRecursionContext(localContext, _startState, CalcPlusParser.RULE_expr);
                    this.state = 18;
                    if (!this.precpred(this.context, 3)) {
                      throw this.createFailedPredicateException("this.precpred(this.context, 3)");
                    }
                    this.state = 19;
                    (localContext as AddSubContext)._op = this.tokenStream.LT(1);
                    _la = this.tokenStream.LA(1);
                    if (!(_la === 3 || _la === 4)) {
                      (localContext as AddSubContext)._op = this.errorHandler.recoverInline(this);
                    } else {
                      this.errorHandler.reportMatch(this);
                      this.consume();
                    }
                    this.state = 20;
                    this.expr(4);
                  }
                  break;
              }
            }
          }
          this.state = 25;
          this.errorHandler.sync(this);
          alternative = this.interpreter.adaptivePredict(this.tokenStream, 2, this.context);
        }
      }
    } catch (re) {
      if (re instanceof antlr.RecognitionException) {
        this.errorHandler.reportError(this, re);
        this.errorHandler.recover(this, re);
      } else {
        throw re;
      }
    } finally {
      this.unrollRecursionContexts(parentContext);
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
        return this.precpred(this.context, 4);
      case 1:
        return this.precpred(this.context, 3);
    }
    return true;
  }

  public static readonly _serializedATN: number[] = [
    4, 1, 8, 27, 2, 0, 7, 0, 2, 1, 7, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 14, 8, 1, 1, 1, 1,
    1, 1, 1, 1, 1, 1, 1, 1, 1, 5, 1, 22, 8, 1, 10, 1, 12, 1, 25, 9, 1, 1, 1, 0, 1, 2, 2, 0, 2, 0, 2, 1, 0, 1, 2, 1, 0,
    3, 4, 27, 0, 4, 1, 0, 0, 0, 2, 13, 1, 0, 0, 0, 4, 5, 3, 2, 1, 0, 5, 6, 5, 0, 0, 1, 6, 1, 1, 0, 0, 0, 7, 8, 6, 1, -1,
    0, 8, 14, 5, 8, 0, 0, 9, 10, 5, 5, 0, 0, 10, 11, 3, 2, 1, 0, 11, 12, 5, 6, 0, 0, 12, 14, 1, 0, 0, 0, 13, 7, 1, 0, 0,
    0, 13, 9, 1, 0, 0, 0, 14, 23, 1, 0, 0, 0, 15, 16, 10, 4, 0, 0, 16, 17, 7, 0, 0, 0, 17, 22, 3, 2, 1, 5, 18, 19, 10,
    3, 0, 0, 19, 20, 7, 1, 0, 0, 20, 22, 3, 2, 1, 4, 21, 15, 1, 0, 0, 0, 21, 18, 1, 0, 0, 0, 22, 25, 1, 0, 0, 0, 23, 21,
    1, 0, 0, 0, 23, 24, 1, 0, 0, 0, 24, 3, 1, 0, 0, 0, 25, 23, 1, 0, 0, 0, 3, 13, 21, 23,
  ];

  private static __ATN: antlr.ATN;
  public static get _ATN(): antlr.ATN {
    if (!CalcPlusParser.__ATN) {
      CalcPlusParser.__ATN = new antlr.ATNDeserializer().deserialize(CalcPlusParser._serializedATN);
    }

    return CalcPlusParser.__ATN;
  }

  private static readonly vocabulary = new antlr.Vocabulary(
    CalcPlusParser.literalNames,
    CalcPlusParser.symbolicNames,
    []
  );

  public override get vocabulary(): antlr.Vocabulary {
    return CalcPlusParser.vocabulary;
  }

  private static readonly decisionsToDFA = CalcPlusParser._ATN.decisionToState.map(
    (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index)
  );
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
    if (listener.enterCalc0) {
      listener.enterCalc0(this);
    }
  }
  public override exitRule(listener: CalcPlusListener): void {
    if (listener.exitCalc0) {
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
    if (listener.enterInt) {
      listener.enterInt(this);
    }
  }
  public override exitRule(listener: CalcPlusListener): void {
    if (listener.exitInt) {
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
export class ParensContext extends ExprContext {
  public constructor(ctx: ExprContext) {
    super(ctx.parent, ctx.invokingState);
    super.copyFrom(ctx);
  }
  public expr(): ExprContext {
    return this.getRuleContext(0, ExprContext)!;
  }
  public override enterRule(listener: CalcPlusListener): void {
    if (listener.enterParens) {
      listener.enterParens(this);
    }
  }
  public override exitRule(listener: CalcPlusListener): void {
    if (listener.exitParens) {
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
  public override enterRule(listener: CalcPlusListener): void {
    if (listener.enterMulDiv) {
      listener.enterMulDiv(this);
    }
  }
  public override exitRule(listener: CalcPlusListener): void {
    if (listener.exitMulDiv) {
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
  public override enterRule(listener: CalcPlusListener): void {
    if (listener.enterAddSub) {
      listener.enterAddSub(this);
    }
  }
  public override exitRule(listener: CalcPlusListener): void {
    if (listener.exitAddSub) {
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
