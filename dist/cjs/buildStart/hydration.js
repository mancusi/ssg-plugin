var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var hydration_exports = {};
__export(hydration_exports, {
  generateHydrationEntryPoints: () => generateHydrationEntryPoints
});
module.exports = __toCommonJS(hydration_exports);
var import_path = __toESM(require("path"));
var import_fs_extra = __toESM(require("fs-extra"));
var import_handlebars = __toESM(require("handlebars"));
const hydrationTemplate = `import * as React from "react";
import * as ReactDOM from "react-dom";
import Page from "{{importPath}}";

const data = (window as any).__INITIAL__DATA__;
ReactDOM.hydrate(<Page data={data} />, document.getElementById("reactele"));`;
const genHydrationTemplates = (importPath) => import_handlebars.default.compile(hydrationTemplate)({ importPath });
const generateHydrationEntryPoints = async (reactEntryPoints, hydrationOutputDir) => {
  reactEntryPoints.forEach((entrypoint) => generateEntryPoint(entrypoint, hydrationOutputDir));
};
const generateEntryPoint = (templatePath, hydrationOutputDir) => {
  const basename = import_path.default.basename(templatePath);
  const extension = import_path.default.extname(templatePath);
  const absoluteTemplatePath = import_path.default.resolve(templatePath);
  const relPath = import_path.default.relative(hydrationOutputDir, absoluteTemplatePath);
  const templateBytes = genHydrationTemplates(relPath.substring(0, relPath.length - extension.length));
  if (!import_fs_extra.default.existsSync(hydrationOutputDir)) {
    import_fs_extra.default.mkdirSync(hydrationOutputDir, { recursive: true });
  }
  const outPath = `${hydrationOutputDir}/${basename}`;
  import_fs_extra.default.writeFileSync(outPath, templateBytes, {});
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  generateHydrationEntryPoints
});
