import { z } from "zod";

const codec = z.codec(z.string(), z.array(z.string()), {
  decode: (str) => str.split(","),
  encode: (arr) => arr.join(","),
});

/**
 * Returns a codec that takes in a CSV string and outputs a string array.
 *
 * The string is splitted on the "," character.
 *
 * @returns A CSV codec.
 */
export const csv = () => codec;
