import type { TestContext } from "node:test";
import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export async function injectPrimitiveTests(t: TestContext) {
  await t.test("primitive", async (t) => {
    await t.test("should work for a number", () => {
      expect(zu.json.primitive().parse(5)).to.equal(5);
    });

    await t.test("should work for a boolean", () => {
      expect(zu.json.primitive().parse(true)).to.be.true;
    });

    await t.test("should work for a string", () => {
      expect(zu.json.primitive().parse("word")).to.equal("word");
    });

    await t.test("should work for null", () => {
      expect(zu.json.primitive().parse(null)).to.be.null;
    });

    await t.test("should work as a default value", () => {
      expect(zu.json.primitive().default(42).parse(undefined)).to.equal(42);
    });

    await t.test("should throw for undefined", () => {
      expect(() => zu.json.primitive().parse(undefined)).to.throw();
    });

    await t.test("should throw for a symbol", () => {
      expect(() => zu.json.primitive().parse(Symbol("nope"))).to.throw();
    });

    await t.test("should throw for a set", () => {
      expect(() => zu.json.primitive().parse(new Set())).to.throw();
    });

    await t.test("should throw for an array", () => {
      expect(() => zu.json.primitive().parse([])).to.throw();
    });

    await t.test("should throw for an object", () => {
      expect(() => zu.json.primitive().parse({})).to.throw();
    });
  });
}
