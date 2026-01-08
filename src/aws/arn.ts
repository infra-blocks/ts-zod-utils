import { z } from "zod";
import { zu } from "../index.js";

function isValid(arn: string): boolean {
  const parts = arn.split(":");

  if (parts.length < 6) {
    return false;
  }

  if (parts[0] !== "arn") {
    return false;
  }

  if (!zu.isValid(zu.aws.partition(), parts[1])) {
    throw new Error(`invalid ARN ${arn}`);
  }

  // The service cannot be empty.
  if (parts[2] === "") {
    return false;
  }

  // Region can be absent.
  if (parts[3] !== "" && !zu.isValid(zu.aws.region(), parts[3])) {
    return false;
  }

  // Account ID can be absent.
  if (parts[4] !== "" && !zu.isValid(zu.aws.accountId(), parts[4])) {
    return false;
  }

  // Resource ID/type cannot be empty.
  if (parts[5] === "") {
    return false;
  }

  return true;
}

const schema = z
  .string()
  .refine(isValid, { error: "invalid AWS ARN" })
  .brand("AwsArn");

export type AwsArn = z.infer<typeof schema>;

/**
 * Validates that a string is a valid AWS ARN.
 *
 * The schema enforces the following rules:
 * - There must be at least 6 tokens separated by colons.
 * - The first token must be "arn".
 * - The second token must be a valid AWS partition, as validated by `zu.aws.partition()`.
 * - The third token (service) cannot be empty. No further checks are done.
 * - The fourth token (region) can be empty or must be a valid AWS region, as validated by `zu.aws.region()`.
 * - The fifth token (account ID) can be empty or must be a valid AWS account ID, as validated by `zu.aws.accountId()`.
 * - The sixth token (resource ID/type) cannot be empty. No further checks are done.
 *
 * @returns A schema that validates AWS ARNs.
 *
 * @see https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html
 */
export function arn() {
  return schema;
}
