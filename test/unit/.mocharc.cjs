const [nodeMajorVersion] = process.versions.node.split(".").map(Number);

if (nodeMajorVersion >= 20) {
  const { register } = require("node:module");
  const { pathToFileURL } = require("node:url");

  register("ts-node/esm", pathToFileURL("./"));

  module.exports = {};
} else {
  module.exports = {
    loader: ["ts-node/esm"],
  };
}
