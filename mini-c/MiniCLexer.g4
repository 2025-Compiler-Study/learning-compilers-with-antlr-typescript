lexer grammar MiniCLexer;

// Keywords
// Type Specifier
INT : 'int';
VOID : 'void';

// Type Qualifiers
CONST : 'const';

// Control Flow
IF : 'if';
ELSE : 'else';
WHILE : 'while';
RETURN : 'return';

// Built-in Functions
READ : 'read';
WRITE : 'write';

// Operators
PLUS : '+';
MINUS : '-';
MUL : '*';
DIV : '/';
MOD : '%';
EQ : '==';
NE : '!=';
LT : '<'; // Less Than
GT : '>'; // Greater Than
LE : '<='; // Less Than or Equal To
GE : '>='; // Greater Than or Equal To
AND : '&&';
OR : '||';
NOT : '!';
PLUS_ASSIGN : '+=';
MINUS_ASSIGN : '-=';
MUL_ASSIGN : '*=';
DIV_ASSIGN : '/=';
MOD_ASSIGN : '%=';
ASSIGN : '=';
INC : '++';
DEC : '--';

// Delimiters
LPAREN : '('; // Parenthesis
RPAREN : ')';
LBRACE : '{'; // Brace
RBRACE : '}';
LBRACK : '['; // Bracket
RBRACK : ']';
SEMI : ';';
COMMA : ',';

fragment DIGIT : [0-9];
fragment HEX_DIGIT : [0-9a-fA-F];
fragment OCT_DIGIT : [0-7];
fragment LETTER : [a-zA-Z_];

// Literals
INTEGER
    : '0' [xX] HEX_DIGIT+    // 16진수: 0xFF, 0x1A
    | '0' OCT_DIGIT+         // 8진수: 0755
    | [1-9] DIGIT*           // 10진수: 123, 5
    | '0'
    ;

// Identifier
IDENTIFIER : ('_' | LETTER) ('_' | LETTER | DIGIT)* ;

// Comments
LINE_COMMENT : '//' ~[\r\n]* -> skip ;
BLOCK_COMMENT : '/*' .*? '*/' -> skip ;

// Whitespace
WS : [ \t\r\n]+ -> skip ;

