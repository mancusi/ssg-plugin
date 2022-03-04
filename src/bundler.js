const esbuild = require("esbuild");

try {
  esbuild.buildSync({
    bundle: true,
    minify: false,
    entryPoints: ["./src/plugin.ts"],
    outfile: "dist/plugin.js",
    platform: "node",
    loader: { ".ts": "ts" },
    tsconfig: "tsconfig.json",
    // external: ["@swc/core", "pnpapi", "esbuild", "mini-css-extract-plugin"],
    // inject: ["./bundler/import-meta-url.js"],
    // define: {
      // "import.meta.url": "import_meta_url",
      // "import.meta.resolve": "import_meta_resolve",
    // },
    logLevel: "error"
  })
} catch {}