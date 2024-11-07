
declare const __brand: unique symbol;
type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> & U[keyof U];
type Brand<B> = { [__brand]: B };

export type A = "a";
export type B = "b";
export type C = "c";
export type MyKeys = A | B | C;

export type EntityA = {
    a: string
} & Brand<"a">

export type EntityB = {
    b: string
} & Brand<"b">

export type EntityC = {
    c: string
} & Brand<"c">

export type Uniq = {
  [K in A]: string;
} & Brand<"uniq" | "a">;

export type Combined = AtLeastOne<{
  [K in Exclude<MyKeys, A>]: string
}> & {
  [__brand]: "combined" | "b" | "c";
};

export type Operation = (
  { a: string, b?: never, c?: never } |
  { a?: never, b?: string, c: string } |
  { a?: never, b: string, c?: string }
)

export function isEntityA(v: any): v is EntityA {
    return typeof v === "object" && Object.keys(v).length === 1 && 'a' in v
}

export function isEntityB(v: any): v is EntityB {
    return typeof v === "object" && Object.keys(v).length === 1 && 'b' in v
}

export function isEntityC(v: any): v is EntityC {
    return typeof v === "object" && Object.keys(v).length === 1 && 'c' in v
}

export function isUniq(v: any): v is Uniq {
  return typeof v === "object" && Object.entries(v).every(([k,v]) => k === 'a' && typeof v === 'string');
}

export function isCombined(v: any): v is Combined {
  return typeof v === "object" && Object.entries(v).every(([k,v]) => ['b', 'c'].includes(k) && typeof v === 'string');
}

export function isOperation(v: any): v is Operation {
  return (
    typeof v === "object" &&
    (
      Object.entries(v).every(([k,v]) => k === 'a' && typeof v === 'string') ||
      Object.entries(v).every(([k,v]) => ['b', 'c'].includes(k) && typeof v === 'string')
    )
  );
}
