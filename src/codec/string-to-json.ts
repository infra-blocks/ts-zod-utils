import { z } from "zod";
import { json } from "../json/index.js";
import { trusted } from "../lib.js";
import { string } from "../string/index.js";

const codec = z.codec(string.json(), json(), {
  decode: (str) => JSON.parse(str),
  encode: (json) => trusted(JSON.stringify(json)),
});

/**
 * A string to JSON codec.
 *
 * @returns A string to JSON codec.
 */
export const stringToJson = () => codec;
