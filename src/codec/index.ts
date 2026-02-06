import { csv } from "./csv.js";
import { jsonParse } from "./json-parse.js";
import { ms } from "./ms.js";
import { stringToBuffer } from "./string-to-buffer.js";
import { stringToInteger } from "./string-to-integer.js";
import { stringToJson } from "./string-to-json.js";
import { stringToPositiveInteger } from "./string-to-positive-integer.js";
import { stringToUrl } from "./string-to-url.js";

export const codec = {
  csv,
  jsonParse,
  ms,
  stringToBuffer,
  stringToInteger,
  stringToJson,
  stringToPositiveInteger,
  stringToUrl,
};
