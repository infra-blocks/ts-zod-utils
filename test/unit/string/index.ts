import { injectIntegerTests } from "./integer.js";
import { injectJsonTests } from "./json.js";
import { injectUrlTests } from "./url.js";

export function injectStringTests() {
  describe("string", () => {
    injectIntegerTests();
    injectJsonTests();
    injectUrlTests();
  });
}
