import { z } from "zod";

const AWS_PARTITIONS = ["aws", "aws-cn", "aws-us-gov"];

const schema = z.enum(AWS_PARTITIONS);

/**
 * Validates that a string is a valid AWS partition.
 *
 * The schema enforces the following rules:
 * - The string must be one of the known AWS partitions: "aws", "aws-cn", "aws-us-gov".
 *
 * @returns A schema that validates AWS partitions.
 *
 * @see https://docs.aws.amazon.com/IAM/latest/UserGuide/reference-arns.html
 */
export function partition() {
  return schema;
}
