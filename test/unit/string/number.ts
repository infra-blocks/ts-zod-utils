import type { TestContext } from "node:test";
import { expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export async function injectNumberTests(t: TestContext) {
  const schema = zu.string.number();
  const expectThrows = expectParseThrows(schema);
  const expectEquals = expectParseEquals(schema);
  const expectWorks = (value: string) => {
    expectTypeOf(expectEquals(value)).toEqualTypeOf<zu.NumberString>();
  };

  await t.test("number", async (t) => {
    await t.test("should be branded", () => {
      expectTypeOf<string>().not.toExtend<zu.NumberString>();
    });

    await t.test("should throw for undefined", () => {
      expectThrows(undefined);
    });

    await t.test("should throw for empty string", () => {
      expectThrows("");
    });

    await t.test("should throw for invalid number string", () => {
      expectThrows("not an int");
    });

    await t.test("should fail for number 0", () => {
      expectThrows(0);
    });

    await t.test("should work for float", () => {
      expectWorks("123.456");
    });

    await t.test("should work for '0'", () => {
      expectWorks("0");
    });

    await t.test("should work for '-1'", () => {
      expectWorks("-1");
    });

    await t.test("should work for '1'", () => {
      expectWorks("1");
    });
  });
}
