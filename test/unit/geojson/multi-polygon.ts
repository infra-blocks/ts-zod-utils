import type { TestContext } from "node:test";
import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export async function multiPolygonTests(t: TestContext) {
  await t.test(zu.geojson.multiPolygon.name, async (t) => {
    const schema = zu.geojson.multiPolygon();

    await t.test("valid values", async (t) => {
      await t.test("should work with empty coordinates", () => {
        const value = {
          type: "MultiPolygon",
          coordinates: [],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });

      await t.test("should work with one empty polygon", () => {
        const value = {
          type: "MultiPolygon",
          coordinates: [[]],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });

      await t.test(
        "should work with one polygon with empty outer ring coordinates",
        () => {
          const value = {
            type: "MultiPolygon",
            coordinates: [[[]]],
          };
          expect(schema.parse(value)).to.deep.equal(value);
        },
      );

      await t.test("should work with two-dimensional coordinates", () => {
        const value = {
          type: "MultiPolygon",
          coordinates: [[[[1, 2]]]],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });

      await t.test("should work with three-dimensional coordinates", () => {
        const value = {
          type: "MultiPolygon",
          coordinates: [[[[1, 2, 3]]]],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
    });

    await t.test("invalid values", async (t) => {
      const validValue = {
        type: "MultiPolygon",
        coordinates: [[[[1, 2]]]],
      };

      await t.test("should throw for missing type", () => {
        const { type: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });

      await t.test("should throw for invalid type", () => {
        const value = {
          ...validValue,
          type: "BigMultiPolygon",
        };
        expect(() => schema.parse(value)).to.throw();
      });

      await t.test("should throw for missing coordinates", () => {
        const { coordinates: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });

      await t.test(
        "should throw for single tuple outer ring coordinates",
        () => {
          const value = {
            ...validValue,
            coordinates: [[[[1]]]],
          };
          expect(() => schema.parse(value)).to.throw();
        },
      );

      await t.test("should throw for extra properties", () => {
        const value = {
          ...validValue,
          extra: "extra",
        };
        expect(() => schema.parse(value)).to.throw();
      });
    });
  });
}
