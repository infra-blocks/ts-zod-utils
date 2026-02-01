import { accountId } from "./account-id.js";
import { arn } from "./arn.js";
import { partition } from "./partition.js";
import { region } from "./region.js";

export const aws = {
  accountId,
  arn,
  region,
  partition,
};
export type { AwsAccountId } from "./account-id.js";
export type { AwsArn } from "./arn.js";
export type { AwsPartition } from "./partition.js";
export type { AwsRegion } from "./region.js";
