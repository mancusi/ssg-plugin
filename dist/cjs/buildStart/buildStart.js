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
var buildStart_exports = {};
__export(buildStart_exports, {
  default: () => buildStart_default
});
module.exports = __toCommonJS(buildStart_exports);
var path = __toESM(require("path"), 1);
var import_glob = __toESM(require("glob"), 1);
var import_log = __toESM(require("../log"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_hydration = require("./hydration.js");
const REACT_EXTENSIONS = /* @__PURE__ */ new Set([".tsx", ".jsx"]);
var buildStart_default = async (paths) => {
  console.log(yextBanner);
  clean(paths.yextDir);
  const templates = import_glob.default.sync(`${paths.templateDir}/**/*.{tsx,jsx,js,ts}`);
  const reactTemplates = templates.filter((templatePath) => REACT_EXTENSIONS.has(path.parse(templatePath).ext));
  let finisher = import_log.default.timedLog({
    startLog: "Generating entry-points for hydration"
  });
  await (0, import_hydration.generateHydrationEntryPoints)(reactTemplates, paths.hydrationOutputDir);
  finisher.succeed(`Generated ${reactTemplates.length} hydration entry-point${reactTemplates.length > 1 ? "s" : ""}`);
};
const clean = (yextDir) => {
  const finisher = import_log.default.timedLog({
    startLog: "Cleaning build artifacts"
  });
  try {
    import_fs.default.rmSync(yextDir, { recursive: true });
    finisher.succeed("Finished cleaning");
  } catch (e) {
    finisher.fail("Nothing to clean");
  }
};
const yextBanner = `
                  :=*#%@@@@@%#+-:
             :=#@@%*+==-----=+*#%@%*-.
          :*@%*-.                 :=*@%+.
       .=%@+:                         -#@#=
      +@@=                              .+@%-
    -@%-                                   +@#
   =@#.       :-       =:    :=+==:         :%@:
  =@*         +@#-   :%@=  =@%+==*@@:        .@%.
  @@.          :@@* +@%   :@%   *@@=          :@%
 #@-             =@@@+    +@- =%@*.:+:         *@-
=@#               =@+     .@@%@=  :@%.         -@*
%@+               -@+      .*@@#%@%+.           @%
@@=                                             @@
@@+           #@+.    +@+ :%%%%@@%%%%=          @@
+@*            -%@*:+@#:       %@.             :@#
 @@.             :@@@=         %@.             +@=
 -@#            *@@=%@+        %@.             @@.
  *@-         =%@*.  +@%-      %@.            #@-
   %@-        -=       +:      ==            *@=
    *@*                                    :%@-
     -%@+.                               :*@#.
       =#@*:                           -#@#:
         :*@%+:                     -*@%=
            -+%@#*=-:.       .:-+*%@#=.
                :-+*#%@@@@@@@%#*=-.

      Built with the Yext SSG Plugin
`;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
