import type { TestContext } from "node:test";
import { expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import type { UrlString } from "../../../src/string/url.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export async function injectUrlTests(t: TestContext) {
  const schema = zu.string.url();
  const expectThrows = expectParseThrows(schema);
  const expectEquals = expectParseEquals(schema);
  const expectWorks = (value: string) => {
    expectTypeOf(expectEquals(value)).toEqualTypeOf<UrlString>();
  };

  await t.test("url", async (t) => {
    await t.test("should be branded", () => {
      expectTypeOf<string>().not.toExtend<UrlString>();
    });

    await t.test("should throw for undefined", () => {
      expectThrows(undefined);
    });

    await t.test("should throw for empty string", () => {
      expectThrows("");
    });

    await t.test("should throw for invalid url", () => {
      expectThrows("not-a-url");
    });

    await t.test("should work for http://localhost:3000", () => {
      expectEquals("http://localhost:3000");
    });

    await t.test("should work for stfp://user:pass@secret.com", () => {
      expectWorks("stfp://user:pass@secret.com");
    });
  });
}
