
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

    public static readonly channelNames = [
        "DEFAULT_TOKEN_CHANNEL", "HIDDEN"
    ];

    public static readonly literalNames = [
        null, "'*'", "'/'", "'+'", "'-'", "'('", "')'", "'='", "';'", "'read'", 
        "'if'", "'else'", "'write'", "'int'", "','", "'=='", "'!='", "'>'", 
        "'>='", "'<'", "'<='", "'{'", "'}'"
    ];

    public static readonly symbolicNames = [
        null, null, null, null, null, null, null, null, null, null, null, 
        null, null, null, null, null, null, null, null, null, null, null, 
        null, "WS", "INT", "VAR"
    ];

    public static readonly modeNames = [
        "DEFAULT_MODE",
    ];

    public static readonly ruleNames = [
        "T__0", "T__1", "T__2", "T__3", "T__4", "T__5", "T__6", "T__7", 
        "T__8", "T__9", "T__10", "T__11", "T__12", "T__13", "T__14", "T__15", 
        "T__16", "T__17", "T__18", "T__19", "T__20", "T__21", "WS", "INT", 
        "VAR",
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
        4,0,25,129,6,-1,2,0,7,0,2,1,7,1,2,2,7,2,2,3,7,3,2,4,7,4,2,5,7,5,
        2,6,7,6,2,7,7,7,2,8,7,8,2,9,7,9,2,10,7,10,2,11,7,11,2,12,7,12,2,
        13,7,13,2,14,7,14,2,15,7,15,2,16,7,16,2,17,7,17,2,18,7,18,2,19,7,
        19,2,20,7,20,2,21,7,21,2,22,7,22,2,23,7,23,2,24,7,24,1,0,1,0,1,1,
        1,1,1,2,1,2,1,3,1,3,1,4,1,4,1,5,1,5,1,6,1,6,1,7,1,7,1,8,1,8,1,8,
        1,8,1,8,1,9,1,9,1,9,1,10,1,10,1,10,1,10,1,10,1,11,1,11,1,11,1,11,
        1,11,1,11,1,12,1,12,1,12,1,12,1,13,1,13,1,14,1,14,1,14,1,15,1,15,
        1,15,1,16,1,16,1,17,1,17,1,17,1,18,1,18,1,19,1,19,1,19,1,20,1,20,
        1,21,1,21,1,22,4,22,114,8,22,11,22,12,22,115,1,22,1,22,1,23,4,23,
        121,8,23,11,23,12,23,122,1,24,4,24,126,8,24,11,24,12,24,127,0,0,
        25,1,1,3,2,5,3,7,4,9,5,11,6,13,7,15,8,17,9,19,10,21,11,23,12,25,
        13,27,14,29,15,31,16,33,17,35,18,37,19,39,20,41,21,43,22,45,23,47,
        24,49,25,1,0,3,3,0,9,10,13,13,32,32,1,0,48,57,2,0,65,90,97,122,131,
        0,1,1,0,0,0,0,3,1,0,0,0,0,5,1,0,0,0,0,7,1,0,0,0,0,9,1,0,0,0,0,11,
        1,0,0,0,0,13,1,0,0,0,0,15,1,0,0,0,0,17,1,0,0,0,0,19,1,0,0,0,0,21,
        1,0,0,0,0,23,1,0,0,0,0,25,1,0,0,0,0,27,1,0,0,0,0,29,1,0,0,0,0,31,
        1,0,0,0,0,33,1,0,0,0,0,35,1,0,0,0,0,37,1,0,0,0,0,39,1,0,0,0,0,41,
        1,0,0,0,0,43,1,0,0,0,0,45,1,0,0,0,0,47,1,0,0,0,0,49,1,0,0,0,1,51,
        1,0,0,0,3,53,1,0,0,0,5,55,1,0,0,0,7,57,1,0,0,0,9,59,1,0,0,0,11,61,
        1,0,0,0,13,63,1,0,0,0,15,65,1,0,0,0,17,67,1,0,0,0,19,72,1,0,0,0,
        21,75,1,0,0,0,23,80,1,0,0,0,25,86,1,0,0,0,27,90,1,0,0,0,29,92,1,
        0,0,0,31,95,1,0,0,0,33,98,1,0,0,0,35,100,1,0,0,0,37,103,1,0,0,0,
        39,105,1,0,0,0,41,108,1,0,0,0,43,110,1,0,0,0,45,113,1,0,0,0,47,120,
        1,0,0,0,49,125,1,0,0,0,51,52,5,42,0,0,52,2,1,0,0,0,53,54,5,47,0,
        0,54,4,1,0,0,0,55,56,5,43,0,0,56,6,1,0,0,0,57,58,5,45,0,0,58,8,1,
        0,0,0,59,60,5,40,0,0,60,10,1,0,0,0,61,62,5,41,0,0,62,12,1,0,0,0,
        63,64,5,61,0,0,64,14,1,0,0,0,65,66,5,59,0,0,66,16,1,0,0,0,67,68,
        5,114,0,0,68,69,5,101,0,0,69,70,5,97,0,0,70,71,5,100,0,0,71,18,1,
        0,0,0,72,73,5,105,0,0,73,74,5,102,0,0,74,20,1,0,0,0,75,76,5,101,
        0,0,76,77,5,108,0,0,77,78,5,115,0,0,78,79,5,101,0,0,79,22,1,0,0,
        0,80,81,5,119,0,0,81,82,5,114,0,0,82,83,5,105,0,0,83,84,5,116,0,
        0,84,85,5,101,0,0,85,24,1,0,0,0,86,87,5,105,0,0,87,88,5,110,0,0,
        88,89,5,116,0,0,89,26,1,0,0,0,90,91,5,44,0,0,91,28,1,0,0,0,92,93,
        5,61,0,0,93,94,5,61,0,0,94,30,1,0,0,0,95,96,5,33,0,0,96,97,5,61,
        0,0,97,32,1,0,0,0,98,99,5,62,0,0,99,34,1,0,0,0,100,101,5,62,0,0,
        101,102,5,61,0,0,102,36,1,0,0,0,103,104,5,60,0,0,104,38,1,0,0,0,
        105,106,5,60,0,0,106,107,5,61,0,0,107,40,1,0,0,0,108,109,5,123,0,
        0,109,42,1,0,0,0,110,111,5,125,0,0,111,44,1,0,0,0,112,114,7,0,0,
        0,113,112,1,0,0,0,114,115,1,0,0,0,115,113,1,0,0,0,115,116,1,0,0,
        0,116,117,1,0,0,0,117,118,6,22,0,0,118,46,1,0,0,0,119,121,7,1,0,
        0,120,119,1,0,0,0,121,122,1,0,0,0,122,120,1,0,0,0,122,123,1,0,0,
        0,123,48,1,0,0,0,124,126,7,2,0,0,125,124,1,0,0,0,126,127,1,0,0,0,
        127,125,1,0,0,0,127,128,1,0,0,0,128,50,1,0,0,0,4,0,115,122,127,1,
        6,0,0
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