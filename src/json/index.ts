import { array, object, json, primitive, stringifiedJson } from "./json.js";

const module = (() => {
  function module() {
    return json();
  }
  module.array = array;
  module.object = object;
  module.primitive = primitive;
  module.stringified = stringifiedJson;

  return module;
})();

export { module as json };
