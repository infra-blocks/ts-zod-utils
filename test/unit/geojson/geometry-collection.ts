import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export function geometryCollectionTests() {
  describe(zu.geojson.geometryCollection.name, function () {
    const schema = zu.geojson.geometryCollection();
    describe("valid values", function () {
      it("should work with empty geometries", function () {
        const value = {
          type: "GeometryCollection",
          geometries: [],
        };
        expect(schema.parse(value)).to.deep.equal(value);
      });
      it("should work with a line string", function () {
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
      it("should work with a multi-line string", function () {
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
      it("should work with a multi-point", function () {
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
      it("should work with a multi-polygon", function () {
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
      it("should work with a point", function () {
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
      it("should work with a polygon", function () {
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
      it("should work with a geometry collection", function () {
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
    describe("invalid values", function () {
      const validValue = {
        type: "GeometryCollection",
        geometries: [
          {
            type: "Point",
            coordinates: [1, 2],
          },
        ],
      };

      it("should throw for missing type", function () {
        const { type: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for invalid type", function () {
        const value = {
          ...validValue,
          type: "BigGeometryCollection",
        };
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for missing geometries", function () {
        const { geometries: _, ...value } = validValue;
        expect(() => schema.parse(value)).to.throw();
      });
      it("should throw for invalid geometry", function () {
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
      it("should throw for extra properties", function () {
        const value = {
          ...validValue,
          extra: "boom",
        };
        expect(() => schema.parse(value)).to.throw();
      });
    });
  });
}
