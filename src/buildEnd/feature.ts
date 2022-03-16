import fs from "fs";
import path from "path";
import { TemplateModuleCollection } from "./moduleLoader";

/**
 * Run feature.json Generation. Returns a mapping of feature name to bundle path.
 */
export const createFeatureJson = async (
  templateModules: TemplateModuleCollection,
  featurePath: string
): Promise<Map<string, string>> => {
  const features: FeatureConfig[] = [];
  const streams = [];
  const featureNameToBundlePath = new Map();
  for (const [featureName, mod] of templateModules.entries()) {
    const streamConfig = mod.config.stream || null;
    let featureConfig: FeatureConfig = {
      name: featureName,
      streamId: streamConfig ? streamConfig["$id"] : "",
      templateType: "JS",
      entityPageSet: {
        plugin: {},
      },
    };
    if (!streamConfig || !streamConfig["$id"]) {
      featureConfig = {
        ...featureConfig,
        staticPage: {
          plugin: {},
        },
      };
      delete featureConfig["entityPageSet"];
    }
    features.push(featureConfig);
    featureNameToBundlePath.set(featureName, mod.bundlePath);
    streamConfig && streams.push({ ...streamConfig });
  }

  const featureDir = path.dirname(featurePath);
  if (!fs.existsSync(featureDir)) {
    fs.mkdirSync(featureDir);
  }

  fs.writeFileSync(
    featurePath,
    JSON.stringify({ features, streams }, null, "  ")
  );
  return featureNameToBundlePath;
};

interface FeatureConfigBase {
  name: string;
  streamId: string;
  templateType: "JS";
}

interface EntityPageSetConfig extends FeatureConfigBase {
  entityPageSet: {
    plugin: {};
  };
}
interface StaticPageConfig extends FeatureConfigBase {
  staticPage: {
    plugin: {};
  };
}

type FeatureConfig = EntityPageSetConfig | StaticPageConfig;
