import glob from "glob";
import * as path from "path";
import { createFeatureJson } from "./feature";
import logger from "../log";
import { generateManifestFile } from "./manifest";
import { loadTemplateModules } from "./moduleLoader";
var onComplete_default = (paths) => {
  return async () => {
    let finisher = logger.timedLog({ startLog: "Validating template modules" });
    let templateModules;
    try {
      const serverBundles = glob.sync(path.join(paths.serverBundleOutputDir, "**/*.js"));
      templateModules = await loadTemplateModules(serverBundles);
      finisher.succeed("Validated template modules");
    } catch (e) {
      finisher.fail("One or more template modules failed validation");
      console.error(e);
      return;
    }
    finisher = logger.timedLog({ startLog: `Writing ${paths.featureJsonDir}` });
    let featureNameToBundlePath;
    try {
      featureNameToBundlePath = await createFeatureJson(templateModules, paths.featureJsonDir);
      finisher.succeed(`Successfully wrote ${paths.featureJsonDir}`);
    } catch (e) {
      finisher.fail(`Failed to write ${paths.featureJsonDir}`);
      console.error(e);
      return;
    }
    finisher = logger.timedLog({ startLog: "Writing .yext/manifest.json" });
    try {
      await generateManifestFile(featureNameToBundlePath, paths);
      finisher.succeed("Successfully wrote .yext/manifest.json");
    } catch (e) {
      finisher.fail("Failed to write .yext/manifest.json");
      console.error(e);
    }
  };
};
export {
  onComplete_default as default
};
