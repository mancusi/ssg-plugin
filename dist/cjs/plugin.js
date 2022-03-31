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
var plugin_exports = {};
__export(plugin_exports, {
  default: () => plugin_default
});
module.exports = __toCommonJS(plugin_exports);
var import_buildStart = __toESM(require("./buildStart/buildStart"));
var import_onComplete = __toESM(require("./onComplete/onComplete"));
var import_promises = require("fs/promises");
var import_path = require("path");
var import_paths = __toESM(require("./paths"));
const plugin = (opts = {}) => {
  const paths = (0, import_paths.default)({ featuresOut: opts.featuresOut });
  const closeBundle = (0, import_onComplete.default)(paths);
  return [
    {
      name: "yext-sites-ssg",
      config: async (config) => {
        await (0, import_buildStart.default)(paths);
        return {
          build: {
            manifest: true,
            rollupOptions: {
              preserveEntrySignatures: "strict",
              input: (await (0, import_promises.readdir)(paths.templateDir)).reduce((input, template) => {
                const parsedPath = (0, import_path.parse)(template);
                if (parsedPath.ext.includes("tsx")) {
                  input[`hydrate/${parsedPath.name}`] = `${paths.hydrationOutputDir}/${template}`;
                }
                input[`server/${parsedPath.name}`] = `${paths.templateDir}/${template}`;
                return input;
              }, {})
            }
          }
        };
      },
      closeBundle
    }
  ];
};
var plugin_default = plugin;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
