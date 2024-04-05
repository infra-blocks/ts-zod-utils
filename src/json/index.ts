import { json, literal, stringifiedJson } from "./json.js";

const module = (() => {
  function module() {
    return json();
  }
  module.stringified = stringifiedJson;
  module.literal = literal;

  return module;
})();

export { module as json };
