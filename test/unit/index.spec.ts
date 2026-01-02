import { expect, expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../src/index.js";
import { z } from "zod";
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
  describe(zu.typeGuard.name, function () {
    type Test = z.infer<typeof schema>;

    const schema = z.string().min(5).brand("Test");
    const guard = zu.typeGuard(schema);

    it("should correctly narrow the type of the value upon success", function () {
      // Note that the type of myString here is `"hello world"`, and not `string`.
      // The guard then asserts that myString is `"hello world" & z.$brand<"Test">` instead
      // of `string & z.$brand<"Test">`, which is indeed compatible with `Test`, but not equal to it.
      const myString = "hello world";
      if (guard(myString)) {
        expectTypeOf(myString).toExtend<Test>();
      } else {
        expect.fail("Type guard failed unexpectedly");
      }
    });
  });
});
