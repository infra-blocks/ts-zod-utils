import { expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import type { Integer } from "../../../src/number/types.js";
import { expectParseEquals, expectParseThrows } from "../lib.js";

export function injectIntegerTests() {
  describe("integer", () => {
    const schema = zu.number.integer();
    const expectThrows = expectParseThrows(schema);
    const expectEquals = expectParseEquals(schema);
    const expectWorks = (value: number) => {
      expectTypeOf(expectEquals(value)).toEqualTypeOf<Integer>();
    };

    it("should throw for undefined", () => {
      expectThrows(undefined);
    });
    it("should throw for float", () => {
      expectThrows(123.456);
    });
    it("should work with 0", () => {
      expectWorks(0);
    });
    it("should work with -1", () => {
      expectWorks(-1);
    });
    it("should work with 1", () => {
      expectWorks(1);
    });
  });
}
