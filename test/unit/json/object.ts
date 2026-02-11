import type { TestContext } from "node:test";
import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export async function injectObjectTests(t: TestContext) {
  await t.test("object", async (t) => {
    await t.test("should work with empty object", () => {
      expect(zu.json.object().parse({})).to.deep.equal({});
    });

    await t.test("should work with literal fields", () => {
      const value = {
        number: 0,
        string: "stuff",
        boolean: false,
        null: null,
      };
      expect(zu.json.object().parse(value)).to.deep.equal(value);
    });

    await t.test("should work with a nested object", () => {
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

    await t.test("should work with a nested array", () => {
      const value = {
        array: [42, "hello", false, null],
      };
      expect(zu.json.object().parse(value)).to.deep.equal(value);
    });

    await t.test("should work as a default value", () => {
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

    await t.test("should throw for undefined", () => {
      expect(() => zu.json.object().parse(undefined)).to.throw();
    });

    await t.test("should throw for an undefined field", () => {
      expect(() => zu.json.object().parse({ oops: undefined })).to.throw();
    });

    await t.test("should throw for a primitive", () => {
      expect(() => zu.json.object().parse(42)).to.throw();
    });

    await t.test("should throw for an array", () => {
      expect(() => zu.json.object().parse([])).to.throw();
    });
  });
}
