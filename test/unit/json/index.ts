import { injectArrayTests } from "./array.js";
import { injectObjectTests } from "./object.js";
import { injectPrimitiveTests } from "./primitive.js";
import { injectStringifiedTests } from "./stringified.js";
import { injectJsonValueTests } from "./value.js";

export function injectJsonTests() {
  describe("json", function () {
    injectPrimitiveTests();
    injectArrayTests();
    injectObjectTests();
    injectJsonValueTests();
    injectStringifiedTests();
  });
}
