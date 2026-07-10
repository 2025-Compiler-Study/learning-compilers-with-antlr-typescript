import {
  AstNode, Program, BlockStmt, DeclareStmt, AssignStmt,
  ExprStmt, IfStmt, BinaryExpr, CallExpr, IntLiteralExpr, IdentifierExpr,
} from "./ast";

function collectLines(node: AstNode, prefix: string, isLast: boolean, out: string[]): void {
  const branch = isLast ? "└── " : "├── ";
  const next = prefix + (isLast ? "    " : "│   ");
  const push = (label: string) => out.push(prefix + branch + label);
  const recurse = (kids: AstNode[]) =>
    kids.forEach((k, i) => collectLines(k, next, i === kids.length - 1, out));

  if (node instanceof Program) {
    push("Program"); recurse(node.statements);
  } else if (node instanceof BlockStmt) {
    push("BlockStmt"); recurse(node.statements);
  } else if (node instanceof DeclareStmt) {
    push(`DeclareStmt [${node.declarations.map((d) => `${d.typeName} ${d.name}`).join(", ")}]`);
  } else if (node instanceof AssignStmt) {
    push(`AssignStmt  ${node.target.name} =`); recurse([node.value]);
  } else if (node instanceof ExprStmt) {
    push("ExprStmt"); recurse([node.expr]);
  } else if (node instanceof IfStmt) {
    push("IfStmt");
    recurse([node.condition, node.thenBranch, ...(node.elseBranch ? [node.elseBranch] : [])]);
  } else if (node instanceof BinaryExpr) {
    push(`BinaryExpr(${node.op})`); recurse([node.left, node.right]);
  } else if (node instanceof CallExpr) {
    push(`CallExpr(${node.callee})`); recurse(node.args ?? []);
  } else if (node instanceof IntLiteralExpr) {
    push(`Int(${node.value})`);
  } else if (node instanceof IdentifierExpr) {
    push(`Var(${node.name})`);
  }
}

export function printAst(program: Program): void {
  const lines: string[] = ["Program"];
  program.statements.forEach((stmt, i) =>
    collectLines(stmt, "", i === program.statements.length - 1, lines)
  );
  console.log(lines.join("\n"));
}
