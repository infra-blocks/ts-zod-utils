import type { TestContext } from "node:test";
import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export async function injectMsTests(t: TestContext) {
  await t.test("ms", async (t) => {
    const codec = zu.codec.ms();

    await t.test("parse", async (t) => {
      const expectThrows = expectParseThrows(codec);
      const expectEquals = expectParseEquals(codec);

      await t.test("should throw for undefined", () => {
        expectThrows(undefined);
      });

      await t.test("should throw for empty string", () => {
        expectThrows("");
      });

      await t.test("should throw for invalid string", () => {
        expectThrows("1 billion msecs");
      });

      await t.test("should work with '42'", () => {
        expectEquals("42", 42);
      });

      await t.test("should work with '42min'", () => {
        expectEquals("42min", 2520000);
      });

      await t.test("should work with '42 min'", () => {
        expectEquals("42 min", 2520000);
      });
    });

    await t.test("decode", async (t) => {
      await t.test("should require a string as input", () => {
        // @ts-expect-error string required
        expect(() => codec.decode(1)).to.throw();
      });

      await t.test("should work with valid string input", () => {
        expect(codec.decode("1d")).to.deep.equal(86400000);
      });
    });

    await t.test("encode", async (t) => {
      await t.test("should require number as input", () => {
        // @ts-expect-error JSON required.
        expect(() => codec.encode(42n)).to.throw();
      });

      await t.test("should give back a string with valid number", () => {
        const result = codec.encode(60_000);
        expect(result).to.equal("1m");
      });

      await t.test("should respect the options", () => {
        const codec = zu.codec.ms({ long: true });
        const result = codec.encode(60_000);
        expect(result).to.equal("1 minute");
      });
    });
  });
}
