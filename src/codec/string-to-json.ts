import { json } from "../json/index.js";
import { jsonParse } from "./json-parse.js";

const codec = jsonParse(json());

/**
 * A string to JSON codec.
 *
 * @returns A string to JSON codec.
 */
export const stringToJson = () => codec;
