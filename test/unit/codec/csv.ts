import type { TestContext } from "node:test";
import { expect, expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export async function injectCsvTests(t: TestContext) {
  await t.test(zu.codec.csv.name, async (t) => {
    const codec = zu.codec.csv();

    await t.test("parse", async (t) => {
      const expectThrows = expectParseThrows(codec);
      const expectWorks = expectParseEquals(codec);

      await t.test("should throw with undefined", () => {
        expectThrows(undefined);
      });

      await t.test(
        "should resolve to an array with empty string with an empty string",
        () => {
          expectWorks("", [""]);
        },
      );

      await t.test("should split a comma-separated string", () => {
        expectWorks("a,b,c", ["a", "b", "c"]);
      });
    });

    await t.test("decode", async (t) => {
      await t.test("should require a string as input", () => {
        // @ts-expect-error string required
        expect(() => codec.decode(1)).to.throw();
      });

      await t.test("should work with valid string input", () => {
        expect(codec.decode("a,b,c")).to.deep.equal(["a", "b", "c"]);
      });
    });

    await t.test("encode", async (t) => {
      await t.test("should require a string array as input", () => {
        // @ts-expect-error string array required.
        expect(() => codec.encode(["1", 2, "3"])).to.throw();
      });

      await t.test(
        "should give back a string with a valid string array",
        () => {
          const decoded = codec.decode("a,b,c");
          expectTypeOf(decoded).toEqualTypeOf<Array<string>>();
          const result = codec.encode(decoded);
          expect(result).to.equal("a,b,c");
          expectTypeOf(result).toEqualTypeOf<string>();
        },
      );
    });
  });
}
