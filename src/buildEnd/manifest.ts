import fs from "fs";
import { manifestPath, yextDir } from "../paths";

/**
 * Creates a manifest.json for use with the Yext Sites plugin
 * @param featureNameToBundlePath a mapping of featureName to bundle paths registered to that
 * feature.
 */
export const generateManifestFile = (
  featureNameToBundlePath: Map<string, string>
): void => {
  const relativeBundlePaths = Array.from(featureNameToBundlePath.entries()).map(
    ([name, path]) => [name, manifestPath(path)]
  );

  const manifest = {
    bundlePaths: Object.fromEntries(relativeBundlePaths),
  };
  fs.writeFileSync(
    `${yextDir}/manifest.json`,
    JSON.stringify(manifest, null, "  ")
  );
};
