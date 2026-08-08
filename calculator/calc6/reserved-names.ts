export const RESERVED_NAMES = {
  ENTRY_POINT: "main",
  READ: "read",
  WRITE: "write",
} as const;

export const BUILTIN_FUNCTION_NAMES: ReadonlySet<string> = new Set([RESERVED_NAMES.READ, RESERVED_NAMES.WRITE]);

export const RESERVED_IDENTIFIERS: ReadonlySet<string> = new Set([
  RESERVED_NAMES.ENTRY_POINT,
  ...BUILTIN_FUNCTION_NAMES,
]);

export const RESERVED_IDENTIFIERS_EXCEPT_ENTRY_POINT: ReadonlySet<string> = new Set(
  [...RESERVED_IDENTIFIERS].filter((name) => name !== RESERVED_NAMES.ENTRY_POINT),
);
