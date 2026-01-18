import { expect, expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";
import type { IntegerString } from "../../../src/string/integer.js";

export function injectIntegerTests() {
  function expectThrow(value: unknown) {
    expect(() => zu.string.integer().parse(value)).to.throw();
  }

  function expectEquals(value: string) {
    const result = zu.string.integer().parse(value);
    expectTypeOf(result).toEqualTypeOf<IntegerString>();
    expect(result).to.equal(value);
  }

  describe("integer", () => {
    it("should throw for undefined", () => {
      expectThrow(undefined);
    });
    it("should throw for invalid number string", () => {
      expectThrow("not an int");
    });
    it("should throw for float", () => {
      expectThrow("123.456");
    });
    it("should fail for number 0", () => {
      expectThrow(0);
    });
    it("should work for '0'", () => {
      expectEquals("0");
    });
    it("should work for '-1'", () => {
      expectEquals("-1");
    });
    it("should work for '1'", () => {
      expectEquals("1");
    });
  });
}
