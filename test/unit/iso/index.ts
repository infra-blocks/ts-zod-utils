import { isoCountryCodeTests } from "./country-code.js";
import { isoCurrencyCodeTests } from "./currency-code.js";

export function injectIsoTests() {
  describe("iso", () => {
    isoCurrencyCodeTests();
    isoCountryCodeTests();
  });
}
