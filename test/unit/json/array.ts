import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export function injectArrayTests() {
  describe(zu.json.array.name, function () {
    it("should work with empty array", function () {
      expect(zu.json.array().parse([])).to.deep.equal([]);
    });
    it("should work with array of literals", function () {
      const value = [42, "hello", false, null];
      expect(zu.json.array().parse(value)).to.deep.equal(value);
    });
    it("should work with a nested array", function () {
      const value = [[42, "hello", false, null]];
      expect(zu.json.array().parse(value)).to.deep.equal(value);
    });
    it("should work with a nested object", function () {
      const value = [{ field: "hello" }];
      expect(zu.json.array().parse(value)).to.deep.equal(value);
    });
    it("should work as a default value", function () {
      const value = [42, "hello", false, null];
      expect(zu.json.array().default(value).parse(undefined)).to.deep.equal(
        value
      );
    });
    it("should throw for undefined", function () {
      expect(() => zu.json.array().parse(undefined)).to.throw();
    });
    it("should throw for an undefined element", function () {
      expect(() => zu.json.array().parse([undefined])).to.throw();
    });
    it("should throw for a primitive", function () {
      expect(() => zu.json.array().parse(42)).to.throw();
    });
    it("should throw for an object", function () {
      expect(() => zu.json.array().parse({})).to.throw();
    });
  });
}
