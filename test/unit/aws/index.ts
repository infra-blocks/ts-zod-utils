import { accountIdTests } from "./account-id.js";
import { arnTests } from "./arn.js";
import { partitionTests } from "./partition.js";
import { regionTests } from "./region.js";

export function inject() {
  describe("aws", () => {
    accountIdTests();
    arnTests();
    partitionTests();
    regionTests();
  });
}
