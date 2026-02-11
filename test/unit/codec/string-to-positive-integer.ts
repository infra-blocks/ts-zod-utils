import type { TestContext } from "node:test";
import { expect, expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export async function injectStringToPositiveIntegerTests(t: TestContext) {
  await t.test(zu.codec.stringToPositiveInteger.name, async (t) => {
    const codec = zu.codec.stringToPositiveInteger();

    await t.test("parse", async (t) => {
      const expectThrows = expectParseThrows(codec);
      const expectEquals = expectParseEquals(codec);
      const expectWorks = (value: number) => {
        expectTypeOf(
          expectEquals(value.toString(10), value),
        ).toEqualTypeOf<zu.PositiveInteger>();
      };

      await t.test("should throw for undefined", () => {
        expectThrows(undefined);
      });

      await t.test("should throw for empty string", () => {
        expectThrows("");
      });

      await t.test("should throw for float string", () => {
        expectThrows("3.14");
      });

      await t.test("should throw with negative integer", () => {
        expectThrows(-42);
      });

      await t.test("should work with 0", () => {
        expectWorks(0);
      });

      await t.test("should work with positive integer", () => {
        expectWorks(42);
      });
    });

    await t.test("decode", async (t) => {
      await t.test("should work with strings as input", () => {
        const result = codec.decode("1234");
        expectTypeOf(result).toEqualTypeOf<zu.PositiveInteger>();
        expect(result).to.equal(1234);
      });
    });

    await t.test("encode", async (t) => {
      await t.test(
        "should work with PositiveInteger as input and produce string as output",
        () => {
          const decoded = codec.decode("1234");
          const result = codec.encode(decoded);
          expectTypeOf(result).toEqualTypeOf<string>();
          expect(result).to.equal("1234");
        },
      );
    });
  });
}
