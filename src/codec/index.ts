import { csv } from "./csv.js";
import { jsonParse } from "./json-parse.js";
import { ms } from "./ms.js";
import { stringToBuffer } from "./string-to-buffer.js";
import { stringToInteger } from "./string-to-integer.js";
import { stringToJson } from "./string-to-json.js";
import { stringToUrl } from "./string-to-url.js";

const codec = {
  csv,
  jsonParse,
  ms,
  stringToBuffer,
  stringToInteger,
  stringToJson,
  stringToUrl,
};

export { codec };
