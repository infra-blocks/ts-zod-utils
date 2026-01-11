import { expect, expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import type { IsoCurrencyCode } from "../../../src/iso/types.js";

export function isoCodeTests() {
  describe("isoCode", () => {
    it("should throw for invalid currency iso code", () => {
      expect(() => zu.iso.currencyCode().parse("stfu")).to.throw();
    });
    it("should throw for lowercase value", () => {
      expect(() => zu.iso.currencyCode().parse("usd")).to.throw();
    });
    it("should work with USD", () => {
      const result = zu.iso.currencyCode().parse("USD");
      expectTypeOf(result).toEqualTypeOf<IsoCurrencyCode>();
      expect(result).to.equal("USD");
    });
    it("should work with EUR", () => {
      const result = zu.iso.currencyCode().parse("EUR");
      expectTypeOf(result).toEqualTypeOf<IsoCurrencyCode>();
      expect(result).to.equal("EUR");
    });
  });
}
