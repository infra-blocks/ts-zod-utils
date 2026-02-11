import type { TestContext } from "node:test";
import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export async function injectStringToJsonTests(t: TestContext) {
  await t.test("stringToJson", async (t) => {
    const codec = zu.codec.stringToJson();

    await t.test("parse", async (t) => {
      const expectThrows = expectParseThrows(codec);
      const expectEquals = expectParseEquals(codec);

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
        expectEquals("5", 5);
      });

      await t.test("should work with 'word'", () => {
        expectEquals('"word"', "word");
      });

      await t.test("should work with '[1, true, null]'", () => {
        expectEquals("[1, true, null]", [1, true, null]);
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
        expectEquals(JSON.stringify(object), object);
      });
    });

    await t.test("decode", async (t) => {
      await t.test("should require a string as input", () => {
        // @ts-expect-error string required
        expect(() => codec.decode(1)).to.throw();
      });

      await t.test("should work with valid string input", () => {
        expect(codec.decode("[1, 2, 3]")).to.deep.equal([1, 2, 3]);
      });
    });

    await t.test("encode", async (t) => {
      await t.test("should require JSON as input", () => {
        // @ts-expect-error JSON required.
        expect(() => codec.encode(42n)).to.throw();
      });

      await t.test("should give back a string with valid JSON", () => {
        const decoded = codec.decode('{"hello":"world"}');
        const result = codec.encode(decoded);
        expect(result).to.equal('{"hello":"world"}');
      });
    });
  });
}
