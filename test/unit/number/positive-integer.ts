import { expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export function injectPositiveIntegerTests() {
  describe("positiveInteger", () => {
    const schema = zu.number.positiveInteger();
    const expectThrows = expectParseThrows(schema);
    const expectEquals = expectParseEquals(schema);
    const expectWorks = (value: number) => {
      expectTypeOf(expectEquals(value)).toEqualTypeOf<zu.PositiveInteger>();
    };

    it("should throw for undefined", () => {
      expectThrows(undefined);
    });
    it("should throw for float", () => {
      expectThrows(123.456);
    });
    it("should throw for -1", () => {
      expectThrows(-1);
    });
    it("should work with 0", () => {
      expectWorks(0);
    });
    it("should work with 1", () => {
      expectWorks(1);
    });
  });
}
