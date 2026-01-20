import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export function injectMsTests() {
  describe("ms", () => {
    const codec = zu.codec.ms();

    describe("parse", () => {
      const expectThrows = expectParseThrows(codec);
      const expectEquals = expectParseEquals(codec);

      it("should throw for undefined", () => {
        expectThrows(undefined);
      });
      it("should throw for empty string", () => {
        expectThrows("");
      });
      it("should throw for invalid string", () => {
        expectThrows("1 billion msecs");
      });
      it("should work with '42'", () => {
        expectEquals("42", 42);
      });
      it("should work with '42min'", () => {
        expectEquals("42min", 2520000);
      });
      it("should work with '42 min'", () => {
        expectEquals("42 min", 2520000);
      });
    });
    describe("decode", () => {
      it("should require a string as input", () => {
        // @ts-expect-error string required
        expect(() => codec.decode(1)).to.throw();
      });
      it("should work with valid string input", () => {
        expect(codec.decode("1d")).to.deep.equal(86400000);
      });
    });
    describe("encode", () => {
      it("should require number as input", () => {
        // @ts-expect-error JSON required.
        expect(() => codec.encode(42n)).to.throw();
      });
      it("should give back a string with valid number", () => {
        const result = codec.encode(60_000);
        expect(result).to.equal("1m");
      });
      it("should respect the options", () => {
        const codec = zu.codec.ms({ long: true });
        const result = codec.encode(60_000);
        expect(result).to.equal("1 minute");
      });
    });
  });
}
