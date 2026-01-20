import { expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import type { NumberString } from "../../../src/string/number.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export function injectNumberTests() {
  const schema = zu.string.number();
  const expectThrows = expectParseThrows(schema);
  const expectEquals = expectParseEquals(schema);
  const expectWorks = (value: string) => {
    expectTypeOf(expectEquals(value)).toEqualTypeOf<NumberString>();
  };

  describe("number", () => {
    it("should be branded", () => {
      expectTypeOf<string>().not.toExtend<NumberString>();
    });
    it("should throw for undefined", () => {
      expectThrows(undefined);
    });
    it("should throw for invalid number string", () => {
      expectThrows("not an int");
    });
    it("should fail for number 0", () => {
      expectThrows(0);
    });
    it("should work for float", () => {
      expectWorks("123.456");
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
