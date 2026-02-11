import type { TestContext } from "node:test";
import { isoCountryCodeTests } from "./country-code.js";
import { isoCurrencyCodeTests } from "./currency-code.js";

export async function injectIsoTests(t: TestContext) {
  await t.test("iso", async (t) => {
    await isoCurrencyCodeTests(t);
    await isoCountryCodeTests(t);
  });
}
