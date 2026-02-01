import { expect, expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export function injectStringToIntegerTests() {
  describe(zu.codec.stringToInteger.name, () => {
    const codec = zu.codec.stringToInteger();

    describe("parse", () => {
      const expectThrows = expectParseThrows(codec);
      const expectEquals = expectParseEquals(codec);
      const expectWorks = (value: number) => {
        expectTypeOf(
          expectEquals(value.toString(10), value),
        ).toEqualTypeOf<zu.Integer>();
      };

      it("should throw for undefined", () => {
        expectThrows(undefined);
      });
      it("should throw for empty string", () => {
        expectThrows("");
      });
      it("should throw for float string", () => {
        expectThrows("3.14");
      });
      it("should work with negative integer", () => {
        expectWorks(-42);
      });
      it("should work with 0", () => {
        expectWorks(0);
      });
      it("should work with positive integer", () => {
        expectWorks(42);
      });
    });
    describe("decode", () => {
      it("should work with strings as input", () => {
        const result = codec.decode("1234");
        expectTypeOf(result).toEqualTypeOf<zu.Integer>();
        expect(result).to.equal(1234);
      });
    });
    describe("encode", () => {
      it("should work with Integer as input and produce string as output", () => {
        const decoded = codec.decode("1234");
        const result = codec.encode(decoded);
        expectTypeOf(result).toEqualTypeOf<string>();
        expect(result).to.equal("1234");
      });
    });
  });
}
