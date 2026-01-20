import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export function injectStringToUrlTests() {
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
    describe("decode", () => {
      it("should require a string as input", () => {
        // @ts-expect-error string required
        expect(() => codec.decode(1)).to.throw();
      });
      it("should work with valid string input", () => {
        const url = "https://www.snoodle.cunt";
        expect(codec.decode(url)).to.deep.equal(new URL(url));
      });
    });
    describe("encode", () => {
      it("should require URL as input", () => {
        // @ts-expect-error URL required.
        expect(() => codec.encode()).to.throw();
      });
      it("should give back a valid url string", () => {
        const url = "sftp://user:pass@localhost:3000";
        const decoded = codec.decode(url);
        const result = codec.encode(decoded);
        expect(result).to.equal(url);
      });
    });
  });
}
