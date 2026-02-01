import { expect, expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export function isoCountryCodeTests() {
  describe("countryCode", () => {
    describe("alpha3", () => {
      it("should throw for undefined", () => {
        expect(() => zu.iso.countryCode.alpha3().parse(undefined)).to.throw();
      });
      it("should throw for empty string", () => {
        expect(() => zu.iso.countryCode.alpha3().parse("")).to.throw();
      });
      // The greatest country on earth.
      it("should work with USA", () => {
        const result = zu.iso.countryCode.alpha3().parse("USA");
        expectTypeOf(result).toEqualTypeOf<zu.IsoAlpha3CountryCode>();
        expect(result).to.equal("USA");
      });
      it("should work with CAN", () => {
        const result = zu.iso.countryCode.alpha3().parse("CAN");
        expectTypeOf(result).toEqualTypeOf<zu.IsoAlpha3CountryCode>();
        expect(result).to.equal("CAN");
      });
    });
  });
}
