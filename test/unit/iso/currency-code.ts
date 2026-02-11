import type { TestContext } from "node:test";
import { expect, expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export async function isoCurrencyCodeTests(t: TestContext) {
  await t.test("currencyCode", async (t) => {
    await t.test("should throw for invalid currency iso code", () => {
      expect(() => zu.iso.currencyCode().parse("stfu")).to.throw();
    });

    await t.test("should throw for lowercase value", () => {
      expect(() => zu.iso.currencyCode().parse("usd")).to.throw();
    });

    await t.test("should work with USD", () => {
      const result = zu.iso.currencyCode().parse("USD");
      expectTypeOf(result).toEqualTypeOf<zu.IsoCurrencyCode>();
      expect(result).to.equal("USD");
    });

    await t.test("should work with EUR", () => {
      const result = zu.iso.currencyCode().parse("EUR");
      expectTypeOf(result).toEqualTypeOf<zu.IsoCurrencyCode>();
      expect(result).to.equal("EUR");
    });
  });
}
