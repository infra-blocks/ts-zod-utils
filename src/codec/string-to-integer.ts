import { z } from "zod";
import { zu } from "../index.js";
import { trusted } from "../lib.js";
import { number } from "../number/index.js";
import { string } from "../string/index.js";

const codec = z.codec(string.integer(), number.integer(), {
  decode: (str) => Number.parseInt(str, 10),
  encode: (num) => trusted(num.toString()),
});

/**
 * A string to integer codec.
 *
 * Same as defined in Zod's documentation, except branding is included using
 * {@link zu.integer} in place of {@link z.int} and {@link zu.string.integer}
 * in place of `z.string().regex(z.regexes.integer)`.
 *
 * @returns A string to integer codec.
 *
 * @see https://zod.dev/codecs#stringtoint
 */
export const stringtoInteger = () => codec;
