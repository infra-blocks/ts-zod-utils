import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export function injectStringToJsonTests() {
  describe("stringToJson", () => {
    const codec = zu.codec.stringToJson();

    describe("parse", () => {
      const expectThrows = expectParseThrows(codec);
      const expectEquals = expectParseEquals(codec);

      it("should throw for undefined", () => {
        expectThrows(undefined);
      });
      it("should throw for empty string", () => {
        expectThrows("");
      });
      it("should throw for invalid json string", () => {
        expectThrows("{ unclosed fucking bracket");
      });
      it("should work with '5'", () => {
        expectEquals("5", 5);
      });
      it("should work with 'word'", () => {
        expectEquals('"word"', "word");
      });
      it("should work with '[1, true, null]'", () => {
        expectEquals("[1, true, null]", [1, true, null]);
      });
      it("should work with an object", () => {
        const object = {
          number: 5,
          string: "toto",
          null: null,
          boolean: false,
          array: [1, "tata", null, true],
          nested: { whoCares: "me" },
        };
        expectEquals(JSON.stringify(object), object);
      });
    });
    describe("decode", () => {
      it("should require a string as input", () => {
        // @ts-expect-error string required
        expect(() => codec.decode(1)).to.throw();
      });
      it("should work with valid string input", () => {
        expect(codec.decode("[1, 2, 3]")).to.deep.equal([1, 2, 3]);
      });
    });
    describe("encode", () => {
      it("should require JSON as input", () => {
        // @ts-expect-error JSON required.
        expect(() => codec.encode(42n)).to.throw();
      });
      it("should give back a string with valid JSON", () => {
        const decoded = codec.decode('{"hello":"world"}');
        const result = codec.encode(decoded);
        expect(result).to.equal('{"hello":"world"}');
      });
    });
  });
}
