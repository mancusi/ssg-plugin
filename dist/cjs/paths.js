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
var paths_exports = {};
__export(paths_exports, {
  default: () => paths_default
});
module.exports = __toCommonJS(paths_exports);
var path = __toESM(require("path"));
const fileUrl = new URL("http://www.example.com");
const __dirname = path.dirname(fileUrl.pathname);
const resolvePath = (relativePath) => {
  return path.resolve(__dirname, path.relative(__dirname, relativePath));
};
const templatePath = "./src/templates";
const yextPath = "./.yext";
const hydrationOut = `${yextPath}/hydration_templates`;
let featureJson = "./sites-config/features.json";
const distPath = "./dist";
const serverBundleOut = `${distPath}/assets/server`;
const manifestPath = (filePath) => `./${path.relative(yextPath, filePath)}`;
const rootPath = (filePath) => `./${path.relative("./", filePath)}`;
var paths_default = (opts) => {
  if (opts) {
    if (opts.featuresOut) {
      featureJson = path.join(opts.featuresOut, "features.json");
    }
  }
  const templateDir = resolvePath(templatePath);
  const yextDir = resolvePath(yextPath);
  const hydrationOutputDir = resolvePath(hydrationOut);
  const hydrationBundleOutputDir = resolvePath(`${distPath}/hydration`);
  const serverBundleOutputDir = resolvePath(serverBundleOut);
  const featureJsonDir = resolvePath(featureJson);
  const distDir = resolvePath(distPath);
  return {
    resolvePath,
    templateDir,
    yextDir,
    hydrationBundleOutputDir,
    hydrationOutputDir,
    serverBundleOutputDir,
    featureJsonDir,
    distDir,
    manifestPath,
    rootPath
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
