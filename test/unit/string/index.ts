import { injectIntegerTests } from "./integer.js";
import { injectUrlTests } from "./url.js";

export function injectStringTests() {
  describe("string", () => {
    injectIntegerTests();
    injectUrlTests();
  });
}
