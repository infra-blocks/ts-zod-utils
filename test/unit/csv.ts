import { expect, expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../src/index.js";
import { expectParseThrows } from "./lib.js";

export function injectCsvTests() {
  describe(zu.csv.name, () => {
    const codec = zu.csv();
    const expectThrow = expectParseThrows(codec);

    describe("parse", () => {
      it("should throw with undefined", () => {
        expectThrow(undefined);
      });
      it("should resolve to an array with empty string with an empty string", () => {
        expect(codec.parse("")).to.deep.equal([""]);
      });
      it("should split a comma-separated string", () => {
        expect(codec.parse("a,b,c")).to.deep.equal(["a", "b", "c"]);
      });
    });
    describe("decode", () => {
      it("should require a string as input", () => {
        // @ts-expect-error string required
        expect(() => codec.decode(1)).to.throw();
      });
      it("should work with valid string input", () => {
        expect(codec.decode("a,b,c")).to.deep.equal(["a", "b", "c"]);
      });
    });
    describe("encode", () => {
      it("should require a string array as input", () => {
        // @ts-expect-error string array required.
        expect(() => codec.encode(["1", 2, "3"])).to.throw();
      });
      it("should give back a string with a valid string array", () => {
        const decoded = codec.decode("a,b,c");
        expectTypeOf(decoded).toEqualTypeOf<Array<string>>();
        const result = codec.encode(decoded);
        expect(result).to.equal("a,b,c");
        expectTypeOf(result).toEqualTypeOf<string>();
      });
    });
  });
}
