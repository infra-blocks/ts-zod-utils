import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export function geometryCollectionTests() {
  describe(zu.geojson.geometryCollection.name, () => {
    const schema = zu.geojson.geometryCollection();
    describe("valid values", () => {
      it("should work with empty geometries", () => {
        const value = {
          type: "GeometryCollection",
          geometries: [],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with a line string", () => {
        const value = {
          type: "GeometryCollection",
          geometries: [
            {
              type: "LineString",
              coordinates: [
                [1, 2],
                [2, 3],
              ],
            },
          ],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with a multi-line string", () => {
        const value = {
          type: "GeometryCollection",
          geometries: [
            {
              type: "MultiLineString",
              coordinates: [
                [
                  [1, 2],
                  [2, 3],
                ],
              ],
            },
          ],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with a multi-point", () => {
        const value = {
          type: "GeometryCollection",
          geometries: [
            {
              type: "MultiPoint",
              coordinates: [[1, 2]],
            },
          ],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with a multi-polygon", () => {
        const value = {
          type: "GeometryCollection",
          geometries: [
            {
              type: "MultiPolygon",
              coordinates: [[[[1, 2]]]],
            },
          ],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with a point", () => {
        const value = {
          type: "GeometryCollection",
          geometries: [
            {
              type: "Point",
              coordinates: [1, 2],
            },
          ],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with a polygon", () => {
        const value = {
          type: "GeometryCollection",
          geometries: [
            {
              type: "Polygon",
              coordinates: [[[1, 2]]],
            },
          ],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with a geometry collection", () => {
        const value = {
          type: "GeometryCollection",
          geometries: [
            {
              type: "GeometryCollection",
              geometries: [
                {
                  type: "Point",
                  coordinates: [1, 2],
                },
              ],
            },
          ],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
    });
    describe("invalid values", () => {
      const validValue = {
        type: "GeometryCollection",
        geometries: [
          {
            type: "Point",
            coordinates: [1, 2],
          },
        ],
      };

      it("should throw for missing type", () => {
        const { type: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for invalid type", () => {
        const value = {
          ...validValue,
          type: "BigGeometryCollection",
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for missing geometries", () => {
        const { geometries: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for invalid geometry", () => {
        const value = {
          ...validValue,
          geometries: [
            {
              type: "BigGeometry",
              coordinates: [1, 2],
            },
          ],
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for extra properties", () => {
        const value = {
          ...validValue,
          extra: "boom",
        };
        expect(() => schema.parse(value)).to.throw();
      });
    });
  });
}
