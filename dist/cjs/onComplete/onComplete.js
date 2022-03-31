var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var onComplete_exports = {};
__export(onComplete_exports, {
  default: () => onComplete_default
});
module.exports = __toCommonJS(onComplete_exports);
var import_glob = __toESM(require("glob"), 1);
var path = __toESM(require("path"), 1);
var import_feature = require("./feature.js");
var import_log = __toESM(require("../log"), 1);
var import_manifest = require("./manifest.js");
var import_moduleLoader = require("./moduleLoader.js");
var onComplete_default = (paths) => {
  return async () => {
    let finisher = import_log.default.timedLog({ startLog: "Validating template modules" });
    let templateModules;
    try {
      const serverBundles = import_glob.default.sync(path.join(paths.serverBundleOutputDir, "**/*.js"));
      templateModules = await (0, import_moduleLoader.loadTemplateModules)(serverBundles);
      finisher.succeed("Validated template modules");
    } catch (e) {
      finisher.fail("One or more template modules failed validation");
      console.error(e);
      return;
    }
    finisher = import_log.default.timedLog({ startLog: `Writing ${paths.featureJsonDir}` });
    let featureNameToBundlePath;
    try {
      featureNameToBundlePath = await (0, import_feature.createFeatureJson)(templateModules, paths.featureJsonDir);
      finisher.succeed(`Successfully wrote ${paths.featureJsonDir}`);
    } catch (e) {
      finisher.fail(`Failed to write ${paths.featureJsonDir}`);
      console.error(e);
      return;
    }
    finisher = import_log.default.timedLog({ startLog: "Writing .yext/manifest.json" });
    try {
      await (0, import_manifest.generateManifestFile)(featureNameToBundlePath, paths);
      finisher.succeed("Successfully wrote .yext/manifest.json");
    } catch (e) {
      finisher.fail("Failed to write .yext/manifest.json");
      console.error(e);
    }
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
