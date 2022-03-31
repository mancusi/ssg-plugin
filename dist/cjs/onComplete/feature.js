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
var feature_exports = {};
__export(feature_exports, {
  createFeatureJson: () => createFeatureJson
});
module.exports = __toCommonJS(feature_exports);
var import_fs_extra = __toESM(require("fs-extra"));
var import_path = __toESM(require("path"));
const createFeatureJson = async (templateModules, featurePath) => {
  const features = [];
  const streams = [];
  const featureNameToBundlePath = /* @__PURE__ */ new Map();
  for (const [featureName, mod] of templateModules.entries()) {
    const streamConfig = mod.config.stream || null;
    const streamId = mod.config.streamId;
    let featureConfig = {
      name: featureName,
      streamId: streamConfig ? streamConfig["$id"] : streamId ? streamId : "",
      templateType: "JS",
      entityPageSet: {
        plugin: {}
      }
    };
    if (!streamId && (!streamConfig || !streamConfig["$id"])) {
      featureConfig = {
        ...featureConfig,
        staticPage: {
          plugin: {}
        }
      };
      delete featureConfig["entityPageSet"];
    }
    features.push(featureConfig);
    featureNameToBundlePath.set(featureName, mod.serverPath);
    streamConfig && streams.push({ ...streamConfig });
  }
  const featureDir = import_path.default.dirname(featurePath);
  if (!import_fs_extra.default.existsSync(featureDir)) {
    import_fs_extra.default.mkdirSync(featureDir);
  }
  import_fs_extra.default.writeFileSync(featurePath, JSON.stringify({ features, streams }, null, "  "));
  return featureNameToBundlePath;
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createFeatureJson
});
