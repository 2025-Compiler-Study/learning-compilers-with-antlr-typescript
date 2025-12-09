
import * as antlr from "antlr4ng";
import { Token } from "antlr4ng";


export class CalcPlusLexer extends antlr.Lexer {
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

    public static readonly channelNames = [
        "DEFAULT_TOKEN_CHANNEL", "HIDDEN"
    ];

    public static readonly literalNames = [
        null, "'*'", "'/'", "'+'", "'-'", "'('", "')'", "'='", "';'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, null, "WS", "INT", 
        "VAR"
    ];

    public static readonly modeNames = [
        "DEFAULT_MODE",
    ];

    public static readonly ruleNames = [
        "T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", 
        "WS", "INT", "VAR",
    ];


    public constructor(input: antlr.CharStream) {
        super(input);
        this.interpreter = new antlr.LexerATNSimulator(this, CalcPlusLexer._ATN, CalcPlusLexer.decisionsToDFA, new antlr.PredictionContextCache());
    }

    public get grammarFileName(): string { return "CalcPlus.g4"; }

    public get literalNames(): (string | null)[] { return CalcPlusLexer.literalNames; }
    public get symbolicNames(): (string | null)[] { return CalcPlusLexer.symbolicNames; }
    public get ruleNames(): string[] { return CalcPlusLexer.ruleNames; }

    public get serializedATN(): number[] { return CalcPlusLexer._serializedATN; }

    public get channelNames(): string[] { return CalcPlusLexer.channelNames; }

    public get modeNames(): string[] { return CalcPlusLexer.modeNames; }

    public static readonly _serializedATN: number[] = [
        4,0,11,56,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,2,
        6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,1,0,1,0,1,1,1,1,1,2,1,2,
        1,3,1,3,1,4,1,4,1,5,1,5,1,6,1,6,1,7,1,7,1,8,4,8,41,8,8,11,8,12,8,
        42,1,8,1,8,1,9,4,9,48,8,9,11,9,12,9,49,1,10,4,10,53,8,10,11,10,12,
        10,54,0,0,11,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,17,9,19,10,21,11,
        1,0,3,3,0,9,10,13,13,32,32,1,0,48,57,2,0,65,90,97,122,58,0,1,1,0,
        0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,1,0,0,0,
        0,13,1,0,0,0,0,15,1,0,0,0,0,17,1,0,0,0,0,19,1,0,0,0,0,21,1,0,0,0,
        1,23,1,0,0,0,3,25,1,0,0,0,5,27,1,0,0,0,7,29,1,0,0,0,9,31,1,0,0,0,
        11,33,1,0,0,0,13,35,1,0,0,0,15,37,1,0,0,0,17,40,1,0,0,0,19,47,1,
        0,0,0,21,52,1,0,0,0,23,24,5,42,0,0,24,2,1,0,0,0,25,26,5,47,0,0,26,
        4,1,0,0,0,27,28,5,43,0,0,28,6,1,0,0,0,29,30,5,45,0,0,30,8,1,0,0,
        0,31,32,5,40,0,0,32,10,1,0,0,0,33,34,5,41,0,0,34,12,1,0,0,0,35,36,
        5,61,0,0,36,14,1,0,0,0,37,38,5,59,0,0,38,16,1,0,0,0,39,41,7,0,0,
        0,40,39,1,0,0,0,41,42,1,0,0,0,42,40,1,0,0,0,42,43,1,0,0,0,43,44,
        1,0,0,0,44,45,6,8,0,0,45,18,1,0,0,0,46,48,7,1,0,0,47,46,1,0,0,0,
        48,49,1,0,0,0,49,47,1,0,0,0,49,50,1,0,0,0,50,20,1,0,0,0,51,53,7,
        2,0,0,52,51,1,0,0,0,53,54,1,0,0,0,54,52,1,0,0,0,54,55,1,0,0,0,55,
        22,1,0,0,0,4,0,42,49,54,1,6,0,0
    ];

    private static __ATN: antlr.ATN;
    public static get _ATN(): antlr.ATN {
        if (!CalcPlusLexer.__ATN) {
            CalcPlusLexer.__ATN = new antlr.ATNDeserializer().deserialize(CalcPlusLexer._serializedATN);
        }

        return CalcPlusLexer.__ATN;
    }


    private static readonly vocabulary = new antlr.Vocabulary(CalcPlusLexer.literalNames, CalcPlusLexer.symbolicNames, []);

    public override get vocabulary(): antlr.Vocabulary {
        return CalcPlusLexer.vocabulary;
    }

    private static readonly decisionsToDFA = CalcPlusLexer._ATN.decisionToState.map( (ds: antlr.DecisionState, index: number) => new antlr.DFA(ds, index) );
}