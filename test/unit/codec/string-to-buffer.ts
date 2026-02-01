import { expect, expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export function injectStringToBufferTests() {
  describe(zu.codec.stringToBuffer.name, () => {
    const codec = zu.codec.stringToBuffer();

    // TODO: test more encodings.
    describe("parse", () => {
      const expectThrows = expectParseThrows(codec);
      const expectEquals = expectParseEquals(codec);
      const expectWorks = (input: string) => {
        expectTypeOf(
          expectEquals(input, Buffer.from(input)),
        ).toEqualTypeOf<Buffer>();
      };

      it("should throw for undefined", () => {
        expectThrows(undefined);
      });
      it("should work for empty string", () => {
        expectWorks("");
      });
      it("should work with any string", () => {
        expectWorks("hello möfèkà");
      });
    });
    describe("decode", () => {
      it("should work with strings as input", () => {
        const result = codec.decode("1234");
        expectTypeOf(result).toEqualTypeOf<Buffer>();
        expect(result).to.deep.equal(Buffer.from("1234"));
      });
    });
    describe("encode", () => {
      it("should work with Buffer as input and produce string as output", () => {
        const decoded = codec.decode("1234");
        const result = codec.encode(decoded);
        expectTypeOf(result).toEqualTypeOf<string>();
        expect(result).to.equal("1234");
      });
    });
  });
}
