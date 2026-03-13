type SourceSpan = {
  startLine: number;
  startColumn: number;
  endLine: number;
  endColumn: number;
};

abstract class AstNode {
  constructor(public readonly span?: SourceSpan) {}
}

export class Program extends AstNode {
  constructor(
    public readonly statements: Stmt[],
    span?: SourceSpan,
  ) {
    super(span);
  }
}

abstract class Stmt extends AstNode {}

export class BlockStmt extends Stmt {
  constructor(
    public readonly statements: Stmt[],
    span?: SourceSpan,
  ) {
    super(span);
  }
}

export class VariableDecl extends AstNode {
  constructor(
    public readonly typeName: "int",
    public readonly name: string,
    span?: SourceSpan,
  ) {
    super(span);
  }
}

export class DeclareStmt extends Stmt {
  constructor(
    public readonly declarations: VariableDecl[],
    span?: SourceSpan,
  ) {
    super(span);
  }
}

export class AssignStmt extends Stmt {
  constructor(
    public readonly target: IdentifierExpr,
    public readonly value: Expr,
    span?: SourceSpan,
  ) {
    super(span);
  }
}

export class ExprStmt extends Stmt {
  constructor(
    public readonly expr: Expr,
    span?: SourceSpan,
  ) {
    super(span);
  }
}

export class IfStmt extends Stmt {
  constructor(
    public readonly condition: Expr,
    public readonly thenBranch: Stmt,
    public readonly elseBranch?: Stmt,
    span?: SourceSpan,
  ) {
    super(span);
  }
}

abstract class Expr extends AstNode {}

export class IntLiteralExpr extends Expr {
  constructor(
    public readonly value: number,
    span?: SourceSpan,
  ) {
    super(span);
  }
}

export class IdentifierExpr extends Expr {
  constructor(
    public readonly name: string,
    span?: SourceSpan,
  ) {
    super(span);
  }
}

type BinaryOp = "+" | "-" | "*" | "/" | "==" | "!=" | ">" | ">=" | "<" | "<=";

export class BinaryExpr extends Expr {
  constructor(
    public readonly op: BinaryOp,
    public readonly left: Expr,
    public readonly right: Expr,
    span?: SourceSpan,
  ) {
    super(span);
  }
}

export class CallExpr extends Expr {
  constructor(
    public readonly callee: string,
    public readonly args: Expr[],
    span?: SourceSpan,
  ) {
    super(span);
  }
}
