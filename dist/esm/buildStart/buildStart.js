import * as path from "path";
import glob from "glob";
import logger from "../log";
import fs from "fs";
import { generateHydrationEntryPoints } from "./hydration";
const REACT_EXTENSIONS = /* @__PURE__ */ new Set([".tsx", ".jsx"]);
var buildStart_default = async (paths) => {
  console.log(yextBanner);
  clean(paths.yextDir);
  const templates = glob.sync(`${paths.templateDir}/**/*.{tsx,jsx,js,ts}`);
  const reactTemplates = templates.filter((templatePath) => REACT_EXTENSIONS.has(path.parse(templatePath).ext));
  let finisher = logger.timedLog({
    startLog: "Generating entry-points for hydration"
  });
  await generateHydrationEntryPoints(reactTemplates, paths.hydrationOutputDir);
  finisher.succeed(`Generated ${reactTemplates.length} hydration entry-point${reactTemplates.length > 1 ? "s" : ""}`);
};
const clean = (yextDir) => {
  const finisher = logger.timedLog({
    startLog: "Cleaning build artifacts"
  });
  try {
    fs.rmSync(yextDir, { recursive: true });
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
export {
  buildStart_default as default
};
