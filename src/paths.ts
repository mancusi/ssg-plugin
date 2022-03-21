import * as path from "path";

const fileUrl = new URL("http://www.example.com");
const __dirname = path.dirname(fileUrl.pathname);

/**
 * Creates an absolute filepath by evaluating a path relative to the YextJS executable.
 * @param relativePath: A file path relative to the root of the site repo.
 */
export const resolvePath = (relativePath: string): string => {
  return path.resolve(__dirname, path.relative(__dirname, relativePath));
};

// TODO: make these paths configurable
const templatePath = "./src/templates";
const yextPath = "./.yext";
const hydrationOut = `${yextPath}/hydration_templates`;
const serverBundleOut = `${yextPath}/server_bundles`;
const featureJson = "./sites-config/features.json";
const distPath = "./dist";

export const templateDir = resolvePath(templatePath);
export const yextDir = resolvePath(yextPath);
export const hydrationOutputDir = resolvePath(hydrationOut);
export const hydrationBundleOutputDir = resolvePath(`${distPath}/hydration`);
export const serverBundleOutputDir = resolvePath(serverBundleOut);
export const featureJsonDir = resolvePath(featureJson);
export const distDir = resolvePath(distPath);

/**
 * Creates a filepath relative to the generated manifest.json, which lives under .yext
 * @param filePath: an absolute filepath
 */
export const manifestPath = (filePath: string): string =>
  `./${path.relative(yextPath, filePath)}`;
