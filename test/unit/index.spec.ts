import { testMe } from "../../src/index.js";
import { expect } from "@infra-blocks/test";

describe("index", function () {
  describe(testMe.name, function () {
    it("should return the right stuff", function () {
      expect(testMe()).to.equal("you tested me all right!");
    });
  });
});
