import type { TestContext } from "node:test";
import { expect, expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export async function injectStringToBufferTests(t: TestContext) {
  await t.test(zu.codec.stringToBuffer.name, async (t) => {
    const codec = zu.codec.stringToBuffer();

    // TODO: test more encodings.
    await t.test("parse", async (t) => {
      const expectThrows = expectParseThrows(codec);
      const expectEquals = expectParseEquals(codec);
      const expectWorks = (input: string) => {
        expectTypeOf(
          expectEquals(input, Buffer.from(input)),
        ).toEqualTypeOf<Buffer>();
      };

      await t.test("should throw for undefined", () => {
        expectThrows(undefined);
      });

      await t.test("should work for empty string", () => {
        expectWorks("");
      });

      await t.test("should work with any string", () => {
        expectWorks("hello möfèkà");
      });
    });

    await t.test("decode", async (t) => {
      await t.test("should work with strings as input", () => {
        const result = codec.decode("1234");
        expectTypeOf(result).toEqualTypeOf<Buffer>();
        expect(result).to.deep.equal(Buffer.from("1234"));
      });
    });

    await t.test("encode", async (t) => {
      await t.test(
        "should work with Buffer as input and produce string as output",
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
