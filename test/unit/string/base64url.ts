import type { TestContext } from "node:test";
import { expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export async function injectBase64UrlTests(t: TestContext) {
  const schema = zu.string.base64url();
  const expectThrows = expectParseThrows(schema);
  const expectEquals = expectParseEquals(schema);
  const expectWorks = (value: string) => {
    expectTypeOf(expectEquals(value)).toEqualTypeOf<zu.Base64UrlString>();
  };

  await t.test("base64url", async (t) => {
    await t.test("should be branded", () => {
      expectTypeOf<string>().not.toExtend<zu.Base64UrlString>();
    });

    await t.test("should throw for undefined", () => {
      expectThrows(undefined);
    });

    await t.test("should throw for invalid string", () => {
      // This is base64, but not base64url
      expectThrows("SGVsbG8gV29ybGQhCg==");
    });

    await t.test("should work for empty string", () => {
      expectWorks("");
    });

    await t.test("should work for valid string", () => {
      expectWorks(
        "eW91IHRoaW5rIHlvdSdyZSBzbWFydCBmb3IgcmVhZGluZyB0aGlzIGVzw6k_",
      );
    });
  });
}
