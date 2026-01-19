import { expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import type { UrlString } from "../../../src/string/url.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export function injectUrlTests() {
  const schema = zu.string.url();
  const expectThrows = expectParseThrows(schema);
  const expectEquals = expectParseEquals(schema);
  const expectWorks = (value: string) => {
    expectTypeOf(expectEquals(value)).toEqualTypeOf<UrlString>();
  };

  describe("url", () => {
    it("should be branded", () => {
      expectTypeOf<string>().not.toExtend<UrlString>();
    });
    it("should throw for undefined", () => {
      expectThrows(undefined);
    });
    it("should throw for invalid url", () => {
      expectThrows("not-a-url");
    });
    it("should work for http://localhost:3000", () => {
      expectEquals("http://localhost:3000");
    });
    it("should work for stfp://user:pass@secret.com", () => {
      expectWorks("stfp://user:pass@secret.com");
    });
  });
}
