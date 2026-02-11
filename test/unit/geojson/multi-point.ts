import type { TestContext } from "node:test";
import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export async function multiPointTests(t: TestContext) {
  await t.test(zu.geojson.multiPoint.name, async (t) => {
    const schema = zu.geojson.multiPoint();

    await t.test("valid values", async (t) => {
      await t.test("should work with empty coordinates", () => {
        const value = {
          type: "MultiPoint",
          coordinates: [],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });

      await t.test("should work with two-dimensional coordinates", () => {
        const value = {
          type: "MultiPoint",
          coordinates: [[1, 2]],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });

      await t.test("should work with three-dimensional coordinates", () => {
        const value = {
          type: "MultiPoint",
          coordinates: [[1, 2, 3]],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
    });

    await t.test("invalid values", async (t) => {
      const validValue = {
        type: "MultiPoint",
        coordinates: [[1, 2]],
      };

      await t.test("should throw for missing type", () => {
        const { type: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });

      await t.test("should throw for invalid type", () => {
        const value = {
          ...validValue,
          type: "BigMultiPoint",
        };
        expect(() => schema.parse(value)).to.throw();
      });

      await t.test("should throw for missing coordinates", () => {
        const { coordinates: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });

      await t.test("should throw for invalid coordinates", () => {
        const value = {
          ...validValue,
          coordinates: [1, 2],
        };
        expect(() => schema.parse(value)).to.throw();
      });
    });
  });
}
