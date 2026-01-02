import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export function injectStringifiedTests() {
  describe("json.stringified", () => {
    describe("primitive", () => {
      it("should work for a number", () => {
        expect(zu.json.stringified().parse("5")).to.equal(5);
      });
      it("should work for a boolean", () => {
        expect(zu.json.stringified().parse("true")).to.be.true;
      });
      it("should work for a string", () => {
        expect(zu.json.stringified().parse('"word"')).to.equal("word");
      });
      it("should work for null", () => {
        expect(zu.json.stringified().parse("null")).to.be.null;
      });
      it("should work as a default value", () => {
        expect(zu.json.stringified().default(42).parse(undefined)).to.equal(42);
      });
      it("should throw for undefined", () => {
        expect(() => zu.json.stringified().parse(undefined)).to.throw();
      });
    });
    describe("array", () => {
      it("should work with empty array", () => {
        expect(zu.json.stringified().parse(JSON.stringify([]))).to.deep.equal(
          [],
        );
      });
      it("should work with array of literals", () => {
        const value = [42, "hello", false, null];
        expect(
          zu.json.stringified().parse(JSON.stringify(value)),
        ).to.deep.equal(value);
      });
      it("should work with a nested array", () => {
        const value = [[42, "hello", false, null]];
        expect(
          zu.json.stringified().parse(JSON.stringify(value)),
        ).to.deep.equal(value);
      });
      it("should work with a nested object", () => {
        const value = [{ field: "hello" }];
        expect(
          zu.json.stringified().parse(JSON.stringify(value)),
        ).to.deep.equal(value);
      });
      it("should work as a default value", () => {
        const value = [42, "hello", false, null];
        expect(
          zu.json.stringified().default(value).parse(undefined),
        ).to.deep.equal(value);
      });
      it("should throw for undefined", () => {
        expect(() => zu.json.stringified().parse("[undefined]")).to.throw();
      });
    });
    describe("object", () => {
      it("should work with empty object", () => {
        expect(zu.json.stringified().parse(JSON.stringify({}))).to.deep.equal(
          {},
        );
      });
      it("should work with literal fields", () => {
        const value = {
          number: 0,
          string: "stuff",
          boolean: false,
          null: null,
        };
        expect(
          zu.json.stringified().parse(JSON.stringify(value)),
        ).to.deep.equal(value);
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
        expect(
          zu.json.stringified().parse(JSON.stringify(value)),
        ).to.deep.equal(value);
      });
      it("should work with a nested array", () => {
        const value = {
          array: [42, "hello", false, null],
        };
        expect(
          zu.json.stringified().parse(JSON.stringify(value)),
        ).to.deep.equal(value);
      });
      it("should work as a default value", () => {
        const value = {
          number: 0,
          string: "stuff",
          boolean: false,
          null: null,
        };
        expect(
          zu.json.stringified().default(value).parse(undefined),
        ).to.deep.equal(value);
      });
      it("should throw with a field undefined", () => {
        expect(() =>
          zu.json.stringified().parse("{ oops: undefined }"),
        ).to.throw();
      });
    });
  });
}
