import { trusted } from "@infra-blocks/types";
import { z } from "zod";
import { zu } from "../index.js";
import { number } from "../number/index.js";
import { string } from "../string/index.js";

const codec = z.codec(string.positiveInteger(), number.positiveInteger(), {
  decode: (str) => Number.parseInt(str, 10),
  encode: (num) => trusted(num.toString()),
});

/**
 * A string to positive integer codec.
 *
 * Almost the same as {@link zu.codec.stringToInteger} but leveraging their `positiveInteger`
 * variants.
 *
 * @returns A string to positive integer codec.
 *
 * @see https://zod.dev/codecs#stringtoint
 */
export const stringToPositiveInteger = () => codec;
