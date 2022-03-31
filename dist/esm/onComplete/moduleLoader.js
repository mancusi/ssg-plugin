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
  templateModules.map((module) => module.config.name).forEach((featureName) => {
    if (featureNames.has(featureName)) {
      throw new Error(`Templates must have unique feature names. Found multiple modules with "${featureName}"`);
    }
    featureNames.add(featureName);
  });
};
export {
  loadTemplateModules
};
