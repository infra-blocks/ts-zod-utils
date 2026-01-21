import { trusted } from "@infra-blocks/types";
import { z } from "zod";
import { string } from "../string/index.js";

/**
 * A codec factory that returns a codec that expects a valid JSON string
 * as input, parses it using JSON.parse, then passes the result to the
 * provided schema.
 *
 * @returns A codec where the first schema is {@link string.json}, and the
 * second one is the provided input.
 */
export const jsonParse = <S extends z.ZodType>(schema: S) =>
  z.codec(string.json(), schema, {
    decode: (str) => JSON.parse(str),
    encode: (json) => trusted(JSON.stringify(json)),
  });
