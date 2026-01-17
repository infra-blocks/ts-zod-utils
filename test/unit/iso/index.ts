import { isoCurrencyCodeTests as currencyCodeTests } from "./currency-code.js";

export function injectIsoTests() {
  describe("iso", () => {
    currencyCodeTests();
  });
}
