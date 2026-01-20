import { stringSplit } from "./string-split.js";

const codec = stringSplit(",");

/**
 * Returns a codec that takes in a CSV string and outputs a string array.
 *
 * The string is splitted on the "," character. It uses `stringSplit(",")`
 * internally.
 *
 * @returns A CSV codec.
 */
export const csv = () => codec;
