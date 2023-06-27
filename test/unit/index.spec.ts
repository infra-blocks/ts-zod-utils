import { expect } from "chai";
import { testMe } from "../../src/index.js";

describe("index", function () {
  describe(testMe.name, function () {
    it("should return the right stuff", function () {
      expect(testMe()).to.equal("you tested me all right!");
    });
  });
});
