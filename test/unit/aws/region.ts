import { expect, expectTypeOf } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export function regionTests() {
  describe("AwsRegion", () => {
    it("should be assignable to strings", () => {
      expectTypeOf<zu.AwsRegion>().toExtend<string>();
    });
    it("should not compile with string assignment", () => {
      expectTypeOf<string>().not.toExtend<zu.AwsRegion>();
    });
  });
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
      expectTypeOf(region).toEqualTypeOf<zu.AwsRegion>();
      expect(region).to.equal("us-east-1");
    });
  });
}
