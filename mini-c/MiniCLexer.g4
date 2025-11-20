lexer grammar MiniCLexer;

// Keywords
// Data Types
INT : 'int';
VOID : 'void';
CHAR : 'char';

// Control Flow
IF : 'if';
ELSE : 'else';
WHILE : 'while';
FOR : 'for';
RETURN : 'return';

// Loop Control
BREAK : 'break';
CONTINUE : 'continue';

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
fragment LETTER : [a-zA-Z_];

// Literals
INTEGER : DIGIT+ ;
CHAR_LITERAL : '\'' ( ~['\\] | '\\' . ) '\'';
STRING_LITERAL : '"' ( ~["\\] | '\\' . )* '"' ;

// Identifier
IDENTIFIER : ('_' | LETTER) ('_' | LETTER | DIGIT)* ;

// Comments
LINE_COMMENT : '//' ~[\r\n]* -> skip ;
BLOCK_COMMENT : '/*' .*? '*/' -> skip ;

// Whitespace
WS : [ \t\r\n]+ -> skip ;
