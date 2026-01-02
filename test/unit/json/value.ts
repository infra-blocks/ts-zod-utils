import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export function injectJsonValueTests() {
  describe("value", () => {
    it("should work for a primitive", () => {
      expect(zu.json().parse(42)).to.equal(42);
    });
    it("should work for an array", () => {
      const value = [[42, "hello", false, null]];
      expect(zu.json().parse(value)).to.deep.equal(value);
    });
    it("should work for an object", () => {
      const value = {
        object: {
          number: 0,
          string: "stuff",
          boolean: false,
          null: null,
        },
      };
      expect(zu.json().parse(value)).to.deep.equal(value);
    });
  });
}
