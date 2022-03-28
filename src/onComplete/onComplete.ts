import glob from "glob";
import * as path from "path";
import { createFeatureJson } from "./feature";
import * as paths from "../paths";
import logger from "../log";
import { generateManifestFile } from "./manifest";
import { loadTemplateModules, TemplateModuleCollection } from "./moduleLoader";

export default async () => {
  let finisher = logger.timedLog({ startLog: "Validating template modules" });
  let templateModules: TemplateModuleCollection;
  try {
    const serverBundles = glob.sync(
      path.join(paths.serverBundleOutputDir, "**/*.js")
    );
    templateModules = await loadTemplateModules(serverBundles);
    finisher.succeed("Validated template modules");
  } catch (e) {
    finisher.fail("One or more template modules failed validation");
    console.error(e);
    return;
  }

  finisher = logger.timedLog({ startLog: "Writing sites-config/feature.json" });
  let featureNameToBundlePath: Map<string, string>;
  try {
    featureNameToBundlePath = await createFeatureJson(
      templateModules,
      paths.featureJsonDir
    );
    finisher.succeed("Successfully wrote sites-config/feature.json");
  } catch (e) {
    finisher.fail("Failed to write sites-config/features.json");
    console.error(e);
    return;
  }

  finisher = logger.timedLog({ startLog: "Writing .yext/manifest.json" });
  try {
    await generateManifestFile(featureNameToBundlePath);
    finisher.succeed("Successfully wrote .yext/manifest.json");
  } catch (e) {
    finisher.fail("Failed to write .yext/manifest.json");
    console.error(e);
  }
};
