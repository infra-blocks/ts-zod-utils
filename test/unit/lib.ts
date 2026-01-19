import { expect } from "@infra-blocks/test";
import type { z } from "zod";

/**
 * Returns a function that uses the schema to parse its input
 * value, asserting that the parse function throws.
 *
 * @param schema - The schema used when parsing.
 * @returns The function asserting the expectation.
 */
export function expectParseThrows<S extends z.ZodType>(schema: S) {
  return (value: unknown) => {
    expect(() => schema.parse(value)).to.throw();
  };
}

/**
 * Returns a function that takes as input the value parsed by the schema
 * and tests that the value parsed is the equals to the input.
 *
 * The parsed value is returned for further analysis.
 *
 * @param schema - The schema used when parsing.
 *
 * @returns The function asserting the expectation.
 */
export function expectParseEquals<S extends z.ZodType>(schema: S) {
  return (value: z.input<S>): z.infer<S> => {
    const result = schema.parse(value);
    expect(result).to.equal(value);
    return result;
  };
}
