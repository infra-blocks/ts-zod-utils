import { isPrimitive } from "es-toolkit";
import { z } from "zod";

// Those types are taken from zod's util Literal type, which is the constraint imposed
// on values that can be passed to z.literal().
type PrimitiveLiteral = string | number | bigint | boolean | null | undefined;
type ValueLiteral = PrimitiveLiteral | ObjectLiteral;
interface ObjectLiteral extends Record<string, ValueLiteral> {}
type ObjectLiteralShape<T extends ObjectLiteral> = {
  [K in keyof T]: T[K] extends ObjectLiteral
    ? ObjectLiteralShape<T[K]>
    : T[K] extends PrimitiveLiteral
      ? z.ZodLiteral<T[K]>
      : never;
};

export type LiteralObject<T extends ObjectLiteral> = ReturnType<
  typeof literalObject<T>
>;

export function literalObject<T extends ObjectLiteral>(value: T) {
  // TODO: use es-toolkit here, maybe.
  const shape: Record<string, unknown> = {};
  for (const [k, v] of Object.entries(value)) {
    if (isPrimitive(v)) {
      shape[k] = z.literal(v);
    } else {
      shape[k] = literalObject(v);
    }
  }
  return { ...z.strictObject(shape as ObjectLiteralShape<T>), value };
}
