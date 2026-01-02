import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export function injectObjectTests() {
  describe("object", () => {
    it("should work with empty object", () => {
      expect(zu.json.object().parse({})).to.deep.equal({});
    });
    it("should work with literal fields", () => {
      const value = {
        number: 0,
        string: "stuff",
        boolean: false,
        null: null,
      };
      expect(zu.json.object().parse(value)).to.deep.equal(value);
    });
    it("should work with a nested object", () => {
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
    it("should work with a nested array", () => {
      const value = {
        array: [42, "hello", false, null],
      };
      expect(zu.json.object().parse(value)).to.deep.equal(value);
    });
    it("should work as a default value", () => {
      const value = {
        number: 0,
        string: "stuff",
        boolean: false,
        null: null,
      };
      expect(zu.json.object().default(value).parse(undefined)).to.deep.equal(
        value,
      );
    });
    it("should throw for undefined", () => {
      expect(() => zu.json.object().parse(undefined)).to.throw();
    });
    it("should throw for an undefined field", () => {
      expect(() => zu.json.object().parse({ oops: undefined })).to.throw();
    });
    it("should throw for a primitive", () => {
      expect(() => zu.json.object().parse(42)).to.throw();
    });
    it("should throw for an array", () => {
      expect(() => zu.json.object().parse([])).to.throw();
    });
  });
}
