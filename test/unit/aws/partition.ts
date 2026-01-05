import { expect } from "@infra-blocks/test";
import { zu } from "../../../src/index.js";

export function partitionTests() {
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
      expect(partition).to.equal("aws");
    });
    it("should work for aws-cn", () => {
      const partition = zu.aws.partition().parse("aws-cn");
      expect(partition).to.equal("aws-cn");
    });
    it("should work for aws-us-gov", () => {
      const partition = zu.aws.partition().parse("aws-us-gov");
      expect(partition).to.equal("aws-us-gov");
    });
  });
}
