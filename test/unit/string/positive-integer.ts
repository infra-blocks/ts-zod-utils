import type { TestContext } from "node:test";
import { expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export async function injectPositiveIntegerTests(t: TestContext) {
  const schema = zu.string.positiveInteger();
  const expectThrows = expectParseThrows(schema);
  const expectEquals = expectParseEquals(schema);
  const expectWorks = (value: string) => {
    expectTypeOf(expectEquals(value)).toEqualTypeOf<zu.PositiveIntegerString>();
  };

  await t.test("positiveinteger", async (t) => {
    await t.test("should be branded", () => {
      expectTypeOf<string>().not.toExtend<zu.PositiveIntegerString>();
    });

    await t.test("should throw for undefined", () => {
      expectThrows(undefined);
    });

    await t.test("should work for empty string", () => {
      expectThrows("");
    });

    await t.test("should throw for invalid number string", () => {
      expectThrows("not an int");
    });

    await t.test("should throw for float", () => {
      expectThrows("123.456");
    });

    await t.test("should fail for number 0", () => {
      expectThrows(0);
    });

    await t.test("should fail for '-1'", () => {
      expectThrows("-1");
    });

    await t.test("should work for '0'", () => {
      expectWorks("0");
    });

    await t.test("should work for '1'", () => {
      expectWorks("1");
    });
  });
}
