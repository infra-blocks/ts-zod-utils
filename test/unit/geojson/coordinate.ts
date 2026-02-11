import type { TestContext } from "node:test";
import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export async function positionTests(t: TestContext) {
  await t.test(zu.geojson.coordinate.name, async (t) => {
    const schema = zu.geojson.coordinate();

    await t.test("valid values", async (t) => {
      await t.test("should work with two-dimensional position", () => {
        expect(schema.parse([1, 2])).to.deep.equal([
          1, 2,
        ] as zu.GeoJsonCoordinate);
      });

      await t.test("should work with three-dimensional position", () => {
        expect(schema.parse([1, 2, 3])).to.deep.equal([
          1, 2, 3,
        ] as zu.GeoJsonCoordinate);
      });
    });

    await t.test("invalid values", async (t) => {
      await t.test("should throw for tuple of 1", () => {
        expect(() => schema.parse([0])).to.throw();
      });

      await t.test("should throw for empty array", () => {
        expect(() => schema.parse([])).to.throw();
      });

      await t.test("should throw for null", () => {
        expect(() => schema.parse(null)).to.throw();
      });

      await t.test("should throw for undefined", () => {
        expect(() => schema.parse(undefined)).to.throw();
      });
    });
  });
}
