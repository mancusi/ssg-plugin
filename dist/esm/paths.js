import * as path from "path";
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
export {
  paths_default as default
};
