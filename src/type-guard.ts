import type { TypeGuard } from "@infra-blocks/types";
import type { z } from "zod";
import { isValid } from "./is-valid.js";

/**
 * Returns a type guard function using the provided schema as the source of truth.
 *
 * It uses the `validate` function internally.
 *
 * @param schema - The schema used to verify the inputs will be of the correct type.
 *
 * @returns A type guard function that uses the provided schema to asserts whether the
 * input is of the proper type or not.
 *
 * @note Type guards work best with branded types. Given two schemas, z.string().min(5),
 * and z.string().min(5).brand("Min5String"), the former type guard would only assert
 * that the input is string (even if the length check is also done), whereas in the
 * former case, that information is also carried with the type.
 */

export function typeGuard<S extends z.ZodType>(
  schema: S,
): TypeGuard<z.infer<S>> {
  return (value: unknown): value is z.infer<S> => {
    return isValid(schema, value);
  };
}
