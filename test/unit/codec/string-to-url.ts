import type { TestContext } from "node:test";
import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export async function injectStringToUrlTests(t: TestContext) {
  await t.test(zu.codec.stringToUrl.name, async (t) => {
    const codec = zu.codec.stringToUrl();

    await t.test("parse", async (t) => {
      const expectThrows = expectParseThrows(codec);
      const expectWorks = expectParseEquals(codec);

      await t.test("should throw for undefined", () => {
        expectThrows(undefined);
      });

      await t.test("should throw for empty string", () => {
        expectThrows("");
      });

      await t.test("should work with sftp://user:pass@stfu.com", () => {
        const input = "sftp://user:pass@stfu.com";
        expectWorks(input, new URL(input));
      });

      await t.test("should work with http://localhost:3000/zod-utils", () => {
        const input = "http://localhost:3000/zod-utils";
        expectWorks(input, new URL(input));
      });
    });

    await t.test("decode", async (t) => {
      await t.test("should require a string as input", () => {
        // @ts-expect-error string required
        expect(() => codec.decode(1)).to.throw();
      });

      await t.test("should work with valid string input", () => {
        const url = "https://www.snoodle.cunt";
        expect(codec.decode(url)).to.deep.equal(new URL(url));
      });
    });

    await t.test("encode", async (t) => {
      await t.test("should require URL as input", () => {
        // @ts-expect-error URL required.
        expect(() => codec.encode()).to.throw();
      });

      await t.test("should give back a valid url string", () => {
        const url = "sftp://user:pass@localhost:3000";
        const decoded = codec.decode(url);
        const result = codec.encode(decoded);
        expect(result).to.equal(url);
      });
    });
  });
}
