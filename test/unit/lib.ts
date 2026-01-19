import { expect } from "@infra-blocks/test";
import type { z } from "zod";
import type { Unbranded } from "../../src/lib.js";

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
 * Returns a function that takes as input a value to parse, its
 * expected parsed result, and tests that the result is the equals
 * to the expectation.
 *
 * If only the input is provided, then it is used as the expectation
 * as well. The parsed value is returned for further analysis.
 *
 * @param schema - The schema used when parsing.
 *
 * @returns The function asserting the expectation.
 */
export function expectParseEquals<S extends z.ZodType>(schema: S) {
  return (value: z.input<S>, expected?: Unbranded<z.infer<S>>): z.infer<S> => {
    const result = schema.parse(value);
    const effective = expected != null ? expected : value;
    expect(result).to.deep.equal(effective);
    return result;
  };
}
