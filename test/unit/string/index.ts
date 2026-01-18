import { injectIntegerTests } from "./integer.js";

export function injectStringTests() {
  describe("string", () => {
    injectIntegerTests();
  });
}
