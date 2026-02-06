import { expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export function injectPositiveIntegerTests() {
  const schema = zu.string.positiveInteger();
  const expectThrows = expectParseThrows(schema);
  const expectEquals = expectParseEquals(schema);
  const expectWorks = (value: string) => {
    expectTypeOf(expectEquals(value)).toEqualTypeOf<zu.PositiveIntegerString>();
  };

  describe("positiveinteger", () => {
    it("should be branded", () => {
      expectTypeOf<string>().not.toExtend<zu.PositiveIntegerString>();
    });
    it("should throw for undefined", () => {
      expectThrows(undefined);
    });
    it("should work for empty string", () => {
      expectThrows("");
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
    it("should fail for '-1'", () => {
      expectThrows("-1");
    });
    it("should work for '0'", () => {
      expectWorks("0");
    });
    it("should work for '1'", () => {
      expectWorks("1");
    });
  });
}
