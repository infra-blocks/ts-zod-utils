import type { TestContext } from "node:test";
import { expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export async function injectIntegerTests(t: TestContext) {
  await t.test("integer", async (t) => {
    const schema = zu.number.integer();
    const expectThrows = expectParseThrows(schema);
    const expectEquals = expectParseEquals(schema);
    const expectWorks = (value: number) => {
      expectTypeOf(expectEquals(value)).toEqualTypeOf<zu.Integer>();
    };

    await t.test("should throw for undefined", () => {
      expectThrows(undefined);
    });

    await t.test("should throw for float", () => {
      expectThrows(123.456);
    });

    await t.test("should work with 0", () => {
      expectWorks(0);
    });

    await t.test("should work with -1", () => {
      expectWorks(-1);
    });

    await t.test("should work with 1", () => {
      expectWorks(1);
    });
  });
}
