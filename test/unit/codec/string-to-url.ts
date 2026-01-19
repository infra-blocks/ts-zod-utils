import { zu } from "../../../src/index.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export function injectStringToUrlTests() {
  // describe("decode", () => {
  //   it("should require a string as input", () => {
  //     // @ts-expect-error string required
  //     expect(() => codec.decode(1)).to.throw();
  //   });
  //   it("should work with valid string input", () => {
  //     expect(codec.decode("a,b,c")).to.deep.equal(["a", "b", "c"]);
  //   });
  // });
  // describe("encode", () => {
  //   it("should require a string array as input", () => {
  //     // @ts-expect-error string array required.
  //     expect(() => codec.encode(["1", 2, "3"])).to.throw();
  //   });
  //   it("should give back a string with a valid string array", () => {
  //     const decoded = codec.decode("a,b,c");
  //     expectTypeOf(decoded).toEqualTypeOf<Array<string>>();
  //     const result = codec.encode(decoded);
  //     expect(result).to.equal("a,b,c");
  //     expectTypeOf(result).toEqualTypeOf<string>();
  //   });
  // });

  describe(zu.codec.stringToUrl.name, () => {
    const codec = zu.codec.stringToUrl();

    describe("parse", () => {
      const expectThrows = expectParseThrows(codec);
      const expectWorks = expectParseEquals(codec);

      it("should throw for undefined", () => {
        expectThrows(undefined);
      });
      it("should throw for empty string", () => {
        expectThrows("");
      });
      it("should work with sftp://user:pass@stfu.com", () => {
        const input = "sftp://user:pass@stfu.com";
        expectWorks(input, new URL(input));
      });
      it("should work with http://localhost:3000/zod-utils", () => {
        const input = "http://localhost:3000/zod-utils";
        expectWorks(input, new URL(input));
      });
    });
    // TODO codec tests
  });
}
