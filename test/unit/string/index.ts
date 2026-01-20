import { injectIntegerTests } from "./integer.js";
import { injectJsonTests } from "./json.js";
import { injectNumberTests } from "./number.js";
import { injectUrlTests } from "./url.js";

export function injectStringTests() {
  describe("string", () => {
    injectIntegerTests();
    injectJsonTests();
    injectNumberTests();
    injectUrlTests();
  });
}
