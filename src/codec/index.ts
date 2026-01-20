import { csv } from "./csv.js";
import { stringtoInteger } from "./string-to-integer.js";
import { stringToJson } from "./string-to-json.js";
import { stringToUrl } from "./string-to-url.js";

const codec = {
  csv,
  stringtoInteger,
  stringToJson,
  stringToUrl,
};

export { codec };
