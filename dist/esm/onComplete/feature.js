import fs from "fs-extra";
import path from "path";
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
  const featureDir = path.dirname(featurePath);
  if (!fs.existsSync(featureDir)) {
    fs.mkdirSync(featureDir);
  }
  fs.writeFileSync(featurePath, JSON.stringify({ features, streams }, null, "  "));
  return featureNameToBundlePath;
};
export {
  createFeatureJson
};
