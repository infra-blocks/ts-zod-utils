import type { TypeGuard } from "@infra-blocks/types";
import type { z } from "zod";
import { aws } from "./aws/index.js";
import { codec } from "./codec/index.js";
import { geojson } from "./geojson/index.js";
import { integer } from "./integer.js";
import { iso } from "./iso/index.js";
import { json } from "./json/index.js";
import { string } from "./string/index.js";

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
function typeGuard<S extends z.ZodType>(schema: S): TypeGuard<z.infer<S>> {
  return (value: unknown): value is z.infer<S> => {
    return isValid(schema, value);
  };
}

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
function isValid<S extends z.ZodType>(
  schema: S,
  value: unknown,
): value is z.infer<S> {
  return schema.safeParse(value).success;
}

const zu = {
  aws,
  codec,
  geojson,
  iso,
  json,
  string,
  isValid,
  integer,
  typeGuard,
};

export type * from "./types.js";
export { zu };
