import type { TestContext } from "node:test";
import { expect, expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export async function injectBytesTests(t: TestContext) {
  await t.test(zu.codec.bytes.name, async (t) => {
    const codec = zu.codec.bytes();

    await t.test(codec.parse.name, async (t) => {
      const expectThrows = expectParseThrows(codec);
      const expectWorks = expectParseEquals(codec);

      await t.test("should throw with undefined", () => {
        expectThrows(undefined);
      });

      await t.test("should throw for empty string", () => {
        expectThrows("");
      });

      await t.test("should throw for invalid byte string", () => {
        expectThrows("hello?");
      });

      await t.test("should work for byte value without unit", () => {
        expectWorks("42", 42);
      });

      await t.test("should work for byte value without unit", () => {
        expectWorks("42", 42);
      });

      await t.test("should work for byte value with unit", () => {
        expectWorks("1tb", 1099511627776);
      });

      // This is actually from the library's implementation. Big disapprove.
      await t.test("should ignore trailing garbage", () => {
        expectWorks("1tbnk", 1);
      });
    });

    await t.test(codec.decode.name, async (t) => {
      await t.test("should require a string as input", () => {
        // @ts-expect-error string required
        expect(() => codec.decode(1)).to.throw();
      });

      await t.test("should work with valid string input", () => {
        expect(codec.decode("12345")).to.deep.equal(12345);
      });
    });

    await t.test(codec.encode.name, async (t) => {
      await t.test("should require a number as input", () => {
        // @ts-expect-error number required.
        expect(() => codec.encode("3")).to.throw();
      });

      await t.test("should give back a string with a valid bytes value", () => {
        const decoded = codec.decode("42KB");
        expectTypeOf(decoded).toEqualTypeOf<number>();
        const result = codec.encode(decoded);
        expect(result).to.equal("42KB");
        expectTypeOf(result).toEqualTypeOf<string>();
      });

      await t.test("should forward the formatting options", () => {
        const codec = zu.codec.bytes({ unit: "kb" });
        const decoded = codec.decode("42mb");
        expectTypeOf(decoded).toEqualTypeOf<number>();
        const result = codec.encode(decoded);
        expect(result).to.equal("43008kb");
      });
    });
  });
}
