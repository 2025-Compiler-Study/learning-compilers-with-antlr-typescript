
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";


export class ExprLexer extends antlr.Lexer {
    public static readonly T__0 = 1;
    public static readonly T__1 = 2;
    public static readonly T__2 = 3;
    public static readonly T__3 = 4;
    public static readonly T__4 = 5;
    public static readonly T__5 = 6;
    public static readonly NEWLINE = 7;
    public static readonly INT = 8;

    public static readonly channelNames = [
        "DEFAULT_TOKEN_CHANNEL", "HIDDEN"
    ];

    public static readonly literalNames = [
        null, "'*'", "'/'", "'+'", "'-'", "'('", "')'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, "NEWLINE", "INT"
    ];

    public static readonly modeNames = [
        "DEFAULT_MODE",
    ];

    public static readonly ruleNames = [
        "T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "NEWLINE", "INT",
    ];


    public constructor(input: antlr.CharStream) {
        super(input);
        this.interpreter = new antlr.LexerATNSimulator(this, ExprLexer._ATN, ExprLexer.decisionsToDFA, new antlr.PredictionContextCache());
    }

    public get grammarFileName(): string { return "Expr.g4"; }

    public get literalNames(): (string | null)[] { return ExprLexer.literalNames; }
    public get symbolicNames(): (string | null)[] { return ExprLexer.symbolicNames; }
    public get ruleNames(): string[] { return ExprLexer.ruleNames; }

    public get serializedATN(): number[] { return ExprLexer._serializedATN; }

    public get channelNames(): string[] { return ExprLexer.channelNames; }

    public get modeNames(): string[] { return ExprLexer.modeNames; }

    public static readonly _serializedATN: number[] = [
        4,0,8,41,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,
        6,7,6,2,7,7,7,1,0,1,0,1,1,1,1,1,2,1,2,1,3,1,3,1,4,1,4,1,5,1,5,1,
        6,4,6,31,8,6,11,6,12,6,32,1,6,1,6,1,7,4,7,38,8,7,11,7,12,7,39,0,
        0,8,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,1,0,2,2,0,10,10,13,13,1,0,
        48,57,42,0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,0,0,0,9,1,0,
        0,0,0,11,1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,1,17,1,0,0,0,3,19,1,0,
        0,0,5,21,1,0,0,0,7,23,1,0,0,0,9,25,1,0,0,0,11,27,1,0,0,0,13,30,1,
        0,0,0,15,37,1,0,0,0,17,18,5,42,0,0,18,2,1,0,0,0,19,20,5,47,0,0,20,
        4,1,0,0,0,21,22,5,43,0,0,22,6,1,0,0,0,23,24,5,45,0,0,24,8,1,0,0,
        0,25,26,5,40,0,0,26,10,1,0,0,0,27,28,5,41,0,0,28,12,1,0,0,0,29,31,
        7,0,0,0,30,29,1,0,0,0,31,32,1,0,0,0,32,30,1,0,0,0,32,33,1,0,0,0,
        33,34,1,0,0,0,34,35,6,6,0,0,35,14,1,0,0,0,36,38,7,1,0,0,37,36,1,
        0,0,0,38,39,1,0,0,0,39,37,1,0,0,0,39,40,1,0,0,0,40,16,1,0,0,0,3,
        0,32,39,1,6,0,0
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!ExprLexer.__ATN) {
            ExprLexer.__ATN = new antlr.ATNDeserializer().deserialize(ExprLexer._serializedATN);
        }

        return ExprLexer.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(ExprLexer.literalNames, ExprLexer.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return ExprLexer.vocabulary;
    }

    private static readonly decisionsToDFA = ExprLexer._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}