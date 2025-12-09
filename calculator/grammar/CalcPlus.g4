grammar CalcPlus;
calc0   :   expr EOF ;
expr    :   expr ('*'|'/') expr # MulDiv
        |   expr ('+'|'-') expr # AddSub
        |   INT                 # Int
        |   VAR                 # Var
        |   '(' expr ')'        # Parens
        ;

calc1   :   (stmt)+ EOF;
stmt    :   VAR '=' expr ';'    # ExprAssign
        ;

WS  : [ \t\r\n]+ -> skip;
INT : [0-9]+ ;
VAR : [A-Za-z]+ ;