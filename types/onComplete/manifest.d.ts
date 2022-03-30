import { Paths } from "../paths";
/**
 * Creates a manifest.json for use with the Yext Sites plugin
 * @param featureNameToBundlePath a mapping of featureName to bundle paths registered to that
 * feature.
 */
export declare const generateManifestFile: (featureNameToBundlePath: Map<string, string>, { distDir, yextDir, rootPath }: Paths) => void;
