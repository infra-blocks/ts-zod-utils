import type { TestContext } from "node:test";
import { expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export async function injectJsonTests(t: TestContext) {
  await t.test("json", async (t) => {
    const schema = zu.string.json();
    const expectThrows = expectParseThrows(schema);
    const expectEquals = expectParseEquals(schema);
    const expectWorks = (value: string) => {
      expectTypeOf(expectEquals(value)).toEqualTypeOf<zu.JsonString>();
    };

    await t.test("should throw for undefined", () => {
      expectThrows(undefined);
    });

    await t.test("should throw for empty string", () => {
      expectThrows("");
    });

    await t.test("should throw for invalid json string", () => {
      expectThrows("{ unclosed fucking bracket");
    });

    await t.test("should work with '5'", () => {
      expectWorks("5");
    });

    await t.test("should work with 'word'", () => {
      expectWorks('"word"');
    });

    await t.test("should work with '[1, true, null]'", () => {
      expectWorks("[1, true, null]");
    });

    await t.test("should work with an object", () => {
      const object = {
        number: 5,
        string: "toto",
        null: null,
        boolean: false,
        array: [1, "tata", null, true],
        nested: { whoCares: "me" },
      };
      expectWorks(JSON.stringify(object));
    });
  });
}
