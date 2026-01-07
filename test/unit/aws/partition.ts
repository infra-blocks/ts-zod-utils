import { expect, expectTypeOf } from "@infra-blocks/test";
import type { AwsPartition } from "../../../src/aws/types.js";
import { zu } from "../../../src/index.js";

export function partitionTests() {
  describe("AwsPartition", () => {
    it("should be assignable to strings", () => {
      expectTypeOf<AwsPartition>().toExtend<string>();
    });
    it("should not compile with string assignment", () => {
      expectTypeOf<string>().not.toExtend<AwsPartition>();
    });
  });
  describe("partition", () => {
    it("should throw for undefined", () => {
      expect(() => zu.aws.partition().parse(undefined)).to.throw();
    });
    it("should throw for empty string", () => {
      expect(() => zu.aws.partition().parse("")).to.throw();
    });
    it("should throw for invalid partition", () => {
      expect(() => zu.aws.partition().parse("aws-iso")).to.throw();
    });
    it("should work for aws", () => {
      const partition = zu.aws.partition().parse("aws");
      expectTypeOf(partition).toEqualTypeOf<AwsPartition>();
      expect(partition).to.equal("aws");
    });
    it("should work for aws-cn", () => {
      const partition = zu.aws.partition().parse("aws-cn");
      expectTypeOf(partition).toEqualTypeOf<AwsPartition>();
      expect(partition).to.equal("aws-cn");
    });
    it("should work for aws-us-gov", () => {
      const partition = zu.aws.partition().parse("aws-us-gov");
      expectTypeOf(partition).toEqualTypeOf<AwsPartition>();
      expect(partition).to.equal("aws-us-gov");
    });
  });
}
