import type { z } from "zod";

/**
 * Validates that the value satisfies the provided schema.
 *
 * Upon success, the value's type is narrowed to the schema's output type.
 *
 * It uses `safeParse` internally.
 *
 * @param schema - The schema to validate against.
 * @param value - The value to validate.
 *
 * @returns Whether the value satisfies the schema.
 */
export function isValid<S extends z.ZodType>(
  schema: S,
  value: unknown,
): value is z.infer<S> {
  return schema.safeParse(value).success;
}
