import { expect } from "@infra-blocks/test";
import { type Integer, zu } from "../../src/index.js";

export function injectIntegerTests() {
  function expectEquals(result: Integer, value: number) {
    expect(result).to.equal(value);
  }

  describe("integer", () => {
    it("should throw for undefined", () => {
      expect(() => zu.integer().parse(undefined)).to.throw();
    });
    it("should throw for float", () => {
      expect(() => zu.integer().parse(1.234)).to.throw();
    });
    it("should work with 0", () => {
      expectEquals(zu.integer().parse(0), 0);
    });
    it("should work with -1", () => {
      expectEquals(zu.integer().parse(-1), -1);
    });
    it("should work with 1", () => {
      expectEquals(zu.integer().parse(1), 1);
    });
  });
}
