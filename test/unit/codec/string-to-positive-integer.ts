import { expect, expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export function injectStringToPositiveIntegerTests() {
  describe(zu.codec.stringToPositiveInteger.name, () => {
    const codec = zu.codec.stringToPositiveInteger();

    describe("parse", () => {
      const expectThrows = expectParseThrows(codec);
      const expectEquals = expectParseEquals(codec);
      const expectWorks = (value: number) => {
        expectTypeOf(
          expectEquals(value.toString(10), value),
        ).toEqualTypeOf<zu.PositiveInteger>();
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
      it("should throw with negative integer", () => {
        expectThrows(-42);
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
        expectTypeOf(result).toEqualTypeOf<zu.PositiveInteger>();
        expect(result).to.equal(1234);
      });
    });
    describe("encode", () => {
      it("should work with PositiveInteger as input and produce string as output", () => {
        const decoded = codec.decode("1234");
        const result = codec.encode(decoded);
        expectTypeOf(result).toEqualTypeOf<string>();
        expect(result).to.equal("1234");
      });
    });
  });
}
