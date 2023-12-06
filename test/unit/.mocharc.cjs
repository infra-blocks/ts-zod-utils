const { register } = require("node:module");
const { pathToFileURL } = require("node:url");

register("ts-node/esm", pathToFileURL("./"));

module.exports = {};
