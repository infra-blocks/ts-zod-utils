import type { TestContext } from "node:test";
import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export async function featureCollectionTests(t: TestContext) {
  await t.test(zu.geojson.featureCollection.name, async (t) => {
    const schema = zu.geojson.featureCollection();

    await t.test("valid values", async (t) => {
      await t.test("should work with empty features", () => {
        const value = {
          type: "FeatureCollection",
          features: [],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });

      await t.test("should work with a single feature", () => {
        const value = {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              geometry: null,
              properties: null,
            },
          ],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
    });

    await t.test("invalid values", async (t) => {
      const validValue = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            geometry: {
              type: "Point",
              coordinates: [1, 2],
            },
            properties: null,
          },
        ],
      };

      await t.test("should throw for missing type", () => {
        const { type: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });

      await t.test("should throw for invalid type", () => {
        const value = {
          ...validValue,
          type: "BigFeatureCollection",
        };
        expect(() => schema.parse(value)).to.throw();
      });

      await t.test("should throw for missing features", () => {
        const { features: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });

      await t.test("should throw for invalid features", () => {
        const value = {
          ...validValue,
          features: [{ type: "BigFeature" }],
        };
        expect(() => schema.parse(value)).to.throw();
      });

      await t.test("should throw for extra properties", () => {
        const value = {
          ...validValue,
          extra: "boom",
        };
        expect(() => schema.parse(value)).to.throw();
      });
    });
  });
}
