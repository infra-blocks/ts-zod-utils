import { injectCsvTests } from "./csv.js";
import { injectMsTests } from "./ms.js";
import { injectStringToIntegerTests } from "./string-to-integer.js";
import { injectStringToJsonTests } from "./string-to-json.js";
import { injectStringToUrlTests } from "./string-to-url.js";

export function injectCodecTests() {
  describe("codec", () => {
    injectCsvTests();
    injectMsTests();
    injectStringToIntegerTests();
    injectStringToJsonTests();
    injectStringToUrlTests();
  });
}
