import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export function injectPrimitiveTests() {
  describe("primitive", function () {
    it("should work for a number", function () {
      expect(zu.json.primitive().parse(5)).to.equal(5);
    });
    it("should work for a boolean", function () {
      expect(zu.json.primitive().parse(true)).to.be.true;
    });
    it("should work for a string", function () {
      expect(zu.json.primitive().parse("word")).to.equal("word");
    });
    it("should work for null", function () {
      expect(zu.json.primitive().parse(null)).to.be.null;
    });
    it("should work as a default value", function () {
      expect(zu.json.primitive().default(42).parse(undefined)).to.equal(42);
    });
    it("should throw for undefined", function () {
      expect(() => zu.json.primitive().parse(undefined)).to.throw();
    });
    it("should throw for a symbol", function () {
      expect(() => zu.json.primitive().parse(Symbol("nope"))).to.throw();
    });
    it("should throw for a set", function () {
      expect(() => zu.json.primitive().parse(new Set())).to.throw();
    });
    it("should throw for an array", function () {
      expect(() => zu.json.primitive().parse([])).to.throw();
    });
    it("should throw for an object", function () {
      expect(() => zu.json.primitive().parse({})).to.throw();
    });
  });
}
