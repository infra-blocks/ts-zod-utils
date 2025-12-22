import { expect } from "@infra-blocks/test";
import { zu } from "../../src/index.js";
import { injectGeoJsonTests } from "./geojson/index.js";
import { injectJsonTests } from "./json/index.js";

describe("zu", function () {
  injectGeoJsonTests();
  injectJsonTests();
  describe(zu.csv.name, function () {
    it("should throw with undefined", function () {
      expect(() => zu.csv().parse(undefined)).to.throw();
    });
    it("should resolve to an array with empty string with an empty string", function () {
      expect(zu.csv().parse("")).to.deep.equal([""]);
    });
    it("should split a comma-separated string", function () {
      expect(zu.csv().parse("a,b,c")).to.deep.equal(["a", "b", "c"]);
    });
    it("should work otherwise with a default value", function () {
      expect(zu.csv().default(["x", "y"]).parse(undefined)).to.deep.equal([
        "x",
        "y",
      ]);
    });
  });
});
