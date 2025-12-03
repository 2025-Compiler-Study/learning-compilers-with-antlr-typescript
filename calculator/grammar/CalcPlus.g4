grammar CalcPlus;
calc0 :   expr EOF;
expr : expr op=('*'|'/') expr # MulDiv
     | expr op=('+'|'-') expr # AddSub 
     | INT                    # Int
     | '(' expr ')'           # Parens
     ;

WS : [ \t\r\n]+ -> skip ;
INT : [0-9]+ ;

