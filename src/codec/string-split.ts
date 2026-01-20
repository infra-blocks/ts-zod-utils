import { z } from "zod";

/**
 * A codec factory that returns a codec that expects a string
 * as input, splits it using {@link String.split} with the provided
 * seperator, then passes the result to the provided schema.
 *
 * When encoding, the array is joined with the same separator provided.
 *
 * @returns A codec where the first schema is {@link z.string}, the
 * second one is `z.array(z.string())`, and the transformations are
 * done using {@link String.split} and {@link Array.join}
 */
export const stringSplit = (separator: string) =>
  z.codec(z.string(), z.array(z.string()), {
    decode: (str) => str.split(separator),
    encode: (arr) => arr.join(separator),
  });
