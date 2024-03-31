import { injectGeoJsonTests } from "./geojson/index.js";
import { injectJsonTests } from "./json/index.js";

describe("zu", function () {
  injectGeoJsonTests();
  injectJsonTests();
});
