import { expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export function injectBase64UrlTests() {
  const schema = zu.string.base64url();
  const expectThrows = expectParseThrows(schema);
  const expectEquals = expectParseEquals(schema);
  const expectWorks = (value: string) => {
    expectTypeOf(expectEquals(value)).toEqualTypeOf<zu.Base64UrlString>();
  };

  describe("base64url", () => {
    it("should be branded", () => {
      expectTypeOf<string>().not.toExtend<zu.Base64UrlString>();
    });
    it("should throw for undefined", () => {
      expectThrows(undefined);
    });
    it("should throw for invalid string", () => {
      // This is base64, but not base64url
      expectThrows("SGVsbG8gV29ybGQhCg==");
    });
    it("should work for empty string", () => {
      expectWorks("");
    });
    it("should work for valid string", () => {
      expectWorks(
        "eW91IHRoaW5rIHlvdSdyZSBzbWFydCBmb3IgcmVhZGluZyB0aGlzIGVzw6k_",
      );
    });
  });
}
