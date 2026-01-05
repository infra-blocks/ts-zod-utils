import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export function regionTests() {
  describe("region", () => {
    it("should throw for undefined", () => {
      expect(() => zu.aws.region().parse(undefined)).to.throw();
    });
    it("should throw for empty string", () => {
      expect(() => zu.aws.region().parse("")).to.throw();
    });
    it("should throw for invalid region", () => {
      expect(() => zu.aws.region().parse("ca-north-1")).to.throw();
    });
    it("should work for us-east-1", () => {
      const region = zu.aws.region().parse("us-east-1");
      expect(region).to.equal("us-east-1");
    });
  });
}
