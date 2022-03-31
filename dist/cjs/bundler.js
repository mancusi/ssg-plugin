const esbuild = require("esbuild");
const glob = require("glob");
const builds = [];
files = glob.sync("./src/**/*");
console.log(files);
files = files.filter((f) => f === "./src/bundler.js");
try {
  builds.push(esbuild.build({
    bundle: false,
    minify: false,
    entryPoints: files,
    outdir: "dist/cjs",
    platform: "node",
    format: "cjs",
    loader: { ".ts": "ts" },
    tsconfig: "tsconfig.json",
    logLevel: "error"
  }));
} catch (e) {
  console.error(e);
}
try {
  builds.push(esbuild.build({
    bundle: false,
    minify: false,
    entryPoints: files,
    outdir: "dist/esm",
    platform: "node",
    format: "esm",
    loader: { ".ts": "ts" },
    tsconfig: "tsconfig.json",
    logLevel: "error"
  }));
} catch (e) {
  console.error(e);
}
