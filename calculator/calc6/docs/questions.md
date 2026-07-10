# 질문 정리

## Q1. `program`의 진입점이 왜 `funcDef+`로 고정되어 있는가?

현재 `Calc6.g4`는 다음과 같이 정의되어 있다.

```
program : (funcDef)+ EOF;
funcDef : 'func' 'int'? IDENT '(' paramList? ')' block ;
stmt    : Declare | ExprAssign | ExprStmt | IfElse | StmtBlock | Return ;
```

`block`이 받는 건 `stmt`뿐이고 `stmt`의 어떤 alternative에도 `funcDef`가 없어서,
**함수 몸통 안에 또 다른 `func`를 정의하는 것(중첩 함수)은 현재 문법상 불가능**하다.
그래서 진입점을 `funcDef+`로 고정할 필요 없이 `stmt` 중심으로 설계했어야 하지 않나?

`funcDef+`가 진입점이라는 건 \*\*전역(global)이라는 개념 자체가 사라진 것 아닌가?
함수 바깥에서 선언되는 변수나 함수에 속하지 않는 최상위 문장은 애초에 존재할 수 없다.
함수간 상태를 공유할 방법이 있나?

```
1번

program : (funcDef|stmt)+ EOF;
funcDef : 'func' 'int'? IDENT '(' paramList? ')' block ;
stmt    : Declare | ExprAssign | ExprStmt | IfElse | StmtBlock | Return ;

2번

program : (stmt)+ EOF;
stmt    : Declare | ExprAssign | ExprStmt | IfElse | StmtBlock | funcDef ;
funcDef : 'func' 'int'? IDENT '(' paramList? ')' block ;
```
