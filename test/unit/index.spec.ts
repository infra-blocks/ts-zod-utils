import { expect } from "@infra-blocks/test";
import { zu } from "../../src/index.js";

describe("index", function () {
  describe(zu.json.name, function () {
    describe("literals", function () {
      it("should work for a number", function () {
        expect(zu.json().parse(5)).to.equal(5);
      });
      it("should work for a boolean", function () {
        expect(zu.json().parse(true)).to.be.true;
      });
      it("should work for a string", function () {
        expect(zu.json().parse("word")).to.equal("word");
      });
      it("should work for null", function () {
        expect(zu.json().parse(null)).to.be.null;
      });
      it("should work as a default value", function () {
        expect(zu.json().default(42).parse(undefined)).to.equal(42);
      });
      it("should throw for undefined", function () {
        expect(() => zu.json().parse(undefined)).to.throw();
      });
    });
    describe("arrays", function () {
      it("should work with empty array", function () {
        expect(zu.json().parse([])).to.deep.equal([]);
      });
      it("should work with array of literals", function () {
        const value = [42, "hello", false, null];
        expect(zu.json().parse(value)).to.deep.equal(value);
      });
      it("should work with a nested array", function () {
        const value = [[42, "hello", false, null]];
        expect(zu.json().parse(value)).to.deep.equal(value);
      });
      it("should work with a nested object", function () {
        const value = [{ field: "hello" }];
        expect(zu.json().parse(value)).to.deep.equal(value);
      });
      it("should work as a default value", function () {
        const value = [42, "hello", false, null];
        expect(zu.json().default(value).parse(undefined)).to.deep.equal(value);
      });
      it("should throw for undefined", function () {
        expect(() => zu.json().parse([undefined])).to.throw();
      });
    });
    describe("objects", function () {
      it("should work with empty object", function () {
        expect(zu.json().parse({})).to.deep.equal({});
      });
      it("should work with literal fields", function () {
        const value = {
          number: 0,
          string: "stuff",
          boolean: false,
          null: null,
        };
        expect(zu.json().parse(value)).to.deep.equal(value);
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
        expect(zu.json().parse(value)).to.deep.equal(value);
      });
      it("should work with a nested array", function () {
        const value = {
          array: [42, "hello", false, null],
        };
        expect(zu.json().parse(value)).to.deep.equal(value);
      });
      it("should work as a default value", function () {
        const value = {
          number: 0,
          string: "stuff",
          boolean: false,
          null: null,
        };
        expect(zu.json().default(value).parse(undefined)).to.deep.equal(value);
      });
      it("should throw with a field undefined", function () {
        expect(() => zu.json().parse({ oops: undefined })).to.throw();
      });
    });
  });
  // Same tests as above, but from a stringified JSON.
  describe(zu.jsonFromString.name, function () {
    describe("literals", function () {
      it("should work for a number", function () {
        expect(zu.jsonFromString().parse("5")).to.equal(5);
      });
      it("should work for a boolean", function () {
        expect(zu.jsonFromString().parse("true")).to.be.true;
      });
      it("should work for a string", function () {
        expect(zu.jsonFromString().parse('"word"')).to.equal("word");
      });
      it("should work for null", function () {
        expect(zu.jsonFromString().parse("null")).to.be.null;
      });
      it("should work as a default value", function () {
        expect(zu.jsonFromString().default("42").parse(undefined)).to.equal(42);
      });
      it("should throw for undefined", function () {
        expect(() => zu.jsonFromString().parse(undefined)).to.throw();
      });
    });
    describe("arrays", function () {
      it("should work with empty array", function () {
        expect(zu.jsonFromString().parse(JSON.stringify([]))).to.deep.equal([]);
      });
      it("should work with array of literals", function () {
        const value = [42, "hello", false, null];
        expect(zu.jsonFromString().parse(JSON.stringify(value))).to.deep.equal(
          value
        );
      });
      it("should work with a nested array", function () {
        const value = [[42, "hello", false, null]];
        expect(zu.jsonFromString().parse(JSON.stringify(value))).to.deep.equal(
          value
        );
      });
      it("should work with a nested object", function () {
        const value = [{ field: "hello" }];
        expect(zu.jsonFromString().parse(JSON.stringify(value))).to.deep.equal(
          value
        );
      });
      it("should work as a default value", function () {
        const value = [42, "hello", false, null];
        expect(
          zu.jsonFromString().default(JSON.stringify(value)).parse(undefined)
        ).to.deep.equal(value);
      });
      it("should throw for undefined", function () {
        expect(() => zu.jsonFromString().parse("[undefined]")).to.throw();
      });
    });
    describe("objects", function () {
      it("should work with empty object", function () {
        expect(zu.jsonFromString().parse(JSON.stringify({}))).to.deep.equal({});
      });
      it("should work with literal fields", function () {
        const value = {
          number: 0,
          string: "stuff",
          boolean: false,
          null: null,
        };
        expect(zu.jsonFromString().parse(JSON.stringify(value))).to.deep.equal(
          value
        );
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
        expect(zu.jsonFromString().parse(JSON.stringify(value))).to.deep.equal(
          value
        );
      });
      it("should work with a nested array", function () {
        const value = {
          array: [42, "hello", false, null],
        };
        expect(zu.jsonFromString().parse(JSON.stringify(value))).to.deep.equal(
          value
        );
      });
      it("should work as a default value", function () {
        const value = {
          number: 0,
          string: "stuff",
          boolean: false,
          null: null,
        };
        expect(
          zu.jsonFromString().default(JSON.stringify(value)).parse(undefined)
        ).to.deep.equal(value);
      });
      it("should throw with a field undefined", function () {
        expect(() =>
          zu.jsonFromString().parse("{ oops: undefined }")
        ).to.throw();
      });
    });
  });
});
