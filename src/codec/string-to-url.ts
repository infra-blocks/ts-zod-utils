import { z } from "zod";
import { trusted } from "../lib.js";
import { string } from "../string/index.js";

const codec = z.codec(string.url(), z.instanceof(URL), {
  decode: (urlString) => new URL(urlString),
  encode: (url) => trusted(url.href),
});

/**
 * A string to URL codec, as defined in Zod's documentation.
 *
 * @returns A string to URL codec.
 *
 * @see https://zod.dev/codecs#stringtourl
 */
export const stringToUrl = () => codec;
