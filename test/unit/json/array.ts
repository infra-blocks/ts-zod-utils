import type { TestContext } from "node:test";
import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export async function injectArrayTests(t: TestContext) {
  await t.test(zu.json.array.name, async (t) => {
    await t.test("should work with empty array", () => {
      expect(zu.json.array().parse([])).to.deep.equal([]);
    });

    await t.test("should work with array of literals", () => {
      const value = [42, "hello", false, null];
      expect(zu.json.array().parse(value)).to.deep.equal(value);
    });

    await t.test("should work with a nested array", () => {
      const value = [[42, "hello", false, null]];
      expect(zu.json.array().parse(value)).to.deep.equal(value);
    });

    await t.test("should work with a nested object", () => {
      const value = [{ field: "hello" }];
      expect(zu.json.array().parse(value)).to.deep.equal(value);
    });

    await t.test("should work as a default value", () => {
      const value = [42, "hello", false, null];
      expect(zu.json.array().default(value).parse(undefined)).to.deep.equal(
        value,
      );
    });

    await t.test("should throw for undefined", () => {
      expect(() => zu.json.array().parse(undefined)).to.throw();
    });

    await t.test("should throw for an undefined element", () => {
      expect(() => zu.json.array().parse([undefined])).to.throw();
    });

    await t.test("should throw for a primitive", () => {
      expect(() => zu.json.array().parse(42)).to.throw();
    });

    await t.test("should throw for an object", () => {
      expect(() => zu.json.array().parse({})).to.throw();
    });
  });
}
