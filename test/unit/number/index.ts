import { injectIntegerTests } from "./integer.js";

export function injectNumberTests() {
  describe("number", () => {
    injectIntegerTests();
  });
}
