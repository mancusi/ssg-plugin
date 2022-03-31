var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var moduleLoader_exports = {};
__export(moduleLoader_exports, {
  loadTemplateModules: () => loadTemplateModules
});
module.exports = __toCommonJS(moduleLoader_exports);
const loadTemplateModules = async (serverBundlePaths) => {
  const importedModules = [];
  for (const p of serverBundlePaths) {
    let mod = {};
    try {
      mod = await import(p);
    } catch (e) {
      throw new Error(`Could not import ${p} ${e}`);
    }
    if (!mod.config) {
      throw new Error(`Template at "${p}" does not export a config$`);
    }
    importedModules.push({ ...mod, serverPath: p });
  }
  validateModules(importedModules);
  return importedModules.reduce((prev, mod) => prev.set(mod.config.name, mod), /* @__PURE__ */ new Map());
};
const validateModules = (templateModules) => {
  validateUniqueFeatureName(templateModules);
};
const validateUniqueFeatureName = (templateModules) => {
  const featureNames = /* @__PURE__ */ new Set();
  templateModules.map((module2) => module2.config.name).forEach((featureName) => {
    if (featureNames.has(featureName)) {
      throw new Error(`Templates must have unique feature names. Found multiple modules with "${featureName}"`);
    }
    featureNames.add(featureName);
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  loadTemplateModules
});
