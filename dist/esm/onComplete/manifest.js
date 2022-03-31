import fs from "fs-extra";
const generateManifestFile = (featureNameToBundlePath, { distDir, yextDir, rootPath }) => {
  const relativeBundlePaths = Array.from(featureNameToBundlePath.entries()).map(([name, path]) => [name, rootPath(path)]);
  let bundlerManifest = Buffer.from("{}");
  if (fs.existsSync(`${distDir}/manifest.json`)) {
    bundlerManifest = fs.readFileSync(`${distDir}/manifest.json`);
  }
  const manifest = {
    bundlePaths: Object.fromEntries(relativeBundlePaths),
    bundlerManifest: JSON.parse(bundlerManifest.toString())
  };
  fs.writeFileSync(`${yextDir}/manifest.json`, JSON.stringify(manifest, null, "  "));
};
export {
  generateManifestFile
};
