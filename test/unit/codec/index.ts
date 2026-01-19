import { injectCsvTests } from "./csv.js";
import { injectStringToIntegerTests } from "./string-to-integer.js";
import { injectStringToUrlTests } from "./string-to-url.js";

export function injectCodecTests() {
  describe("codec", () => {
    injectCsvTests();
    injectStringToIntegerTests();
    injectStringToUrlTests();
  });
}
