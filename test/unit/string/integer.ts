import { expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import type { IntegerString } from "../../../src/string/integer.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export function injectIntegerTests() {
  const schema = zu.string.integer();
  const expectThrows = expectParseThrows(schema);
  const expectEquals = expectParseEquals(schema);
  const expectWorks = (value: string) => {
    expectTypeOf(expectEquals(value)).toEqualTypeOf<IntegerString>();
  };

  describe("integer", () => {
    it("should be branded", () => {
      expectTypeOf<string>().not.toExtend<IntegerString>();
    });
    it("should throw for undefined", () => {
      expectThrows(undefined);
    });
    it("should throw for invalid number string", () => {
      expectThrows("not an int");
    });
    it("should throw for float", () => {
      expectThrows("123.456");
    });
    it("should fail for number 0", () => {
      expectThrows(0);
    });
    it("should work for '0'", () => {
      expectWorks("0");
    });
    it("should work for '-1'", () => {
      expectWorks("-1");
    });
    it("should work for '1'", () => {
      expectWorks("1");
    });
  });
}
