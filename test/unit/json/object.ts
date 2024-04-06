import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export function injectObjectTests() {
  describe("object", function () {
    it("should work with empty object", function () {
      expect(zu.json.object().parse({})).to.deep.equal({});
    });
    it("should work with literal fields", function () {
      const value = {
        number: 0,
        string: "stuff",
        boolean: false,
        null: null,
      };
      expect(zu.json.object().parse(value)).to.deep.equal(value);
    });
    it("should work with a nested object", function () {
      const value = {
        object: {
          number: 0,
          string: "stuff",
          boolean: false,
          null: null,
        },
      };
      expect(zu.json.object().parse(value)).to.deep.equal(value);
    });
    it("should work with a nested array", function () {
      const value = {
        array: [42, "hello", false, null],
      };
      expect(zu.json.object().parse(value)).to.deep.equal(value);
    });
    it("should work as a default value", function () {
      const value = {
        number: 0,
        string: "stuff",
        boolean: false,
        null: null,
      };
      expect(zu.json.object().default(value).parse(undefined)).to.deep.equal(
        value
      );
    });
    it("should throw for undefined", function () {
      expect(() => zu.json.object().parse(undefined)).to.throw();
    });
    it("should throw for an undefined field", function () {
      expect(() => zu.json.object().parse({ oops: undefined })).to.throw();
    });
    it("should throw for a primitive", function () {
      expect(() => zu.json.object().parse(42)).to.throw();
    });
    it("should throw for an array", function () {
      expect(() => zu.json.object().parse([])).to.throw();
    });
  });
}
