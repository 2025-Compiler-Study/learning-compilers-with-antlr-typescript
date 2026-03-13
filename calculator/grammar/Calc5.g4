grammar Calc5;

program :   (stmt)+ EOF;

stmt    :   'int' VAR (',' VAR)* ';'            # Declare
        |   VAR '=' expr ';'                    # ExprAssign
        |   VAR '=' 'read' '(' ')' ';'          # ReadAssign
        |   'write' '(' expr ')' ';'            # Write
        |   'if' '(' cond ')' thenBlock=block
            ('else' elseBlock=block)?           # IfElse
        |   block                               # StmtBlock
        ;

expr    :   expr ('*'|'/') expr # MulDiv
        |   expr ('+'|'-') expr # AddSub
        |   INT                 # Int
        |   VAR                 # Var
        |   '(' expr ')'        # Parens
        ;

cond    :   expr ('=='|'!='|'>'|'>='|'<'|'<=') expr ;
block   :   '{' (stmt)* '}' ;

WS  : [ \t\r\n]+ -> skip;
INT : [0-9]+ ;
VAR : [A-Za-z]+ ;