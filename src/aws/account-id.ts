import { z } from "zod";

const schema = z.string().regex(z.regexes.integer).length(12);

/**
 * Validates that a string is a valid AWS account ID.
 *
 * The schema enforces the following rules:
 * - The string must be exactly 12 characters long.
 * - Each character must be a digit (0-9).
 *
 * @returns A schema that validates AWS account IDs.
 *
 * @see https://docs.aws.amazon.com/accounts/latest/reference/manage-acct-identifiers.html
 */
export function accountId() {
  return schema;
}
