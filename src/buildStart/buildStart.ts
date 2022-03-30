import { Paths } from "../paths";
import * as path from "path";
import glob from "glob";
import logger from "../log";
import fs from "fs";
import { generateHydrationEntryPoints } from "./hydration";

const REACT_EXTENSIONS = new Set([".tsx", ".jsx"]);

export default async (paths: Paths) => {
  console.log(yextBanner);
  clean();

  const templates: string[] = glob.sync(
    `${paths.templateDir}/**/*.{tsx,jsx,js,ts}`
  );

  const reactTemplates = templates.filter((templatePath) =>
    REACT_EXTENSIONS.has(path.parse(templatePath).ext)
  );

  let finisher = logger.timedLog({
    startLog: "Generating entry-points for hydration",
  });
  await generateHydrationEntryPoints(reactTemplates, paths.hydrationOutputDir);
  finisher.succeed(
    `Generated ${reactTemplates.length} hydration entry-point${
      reactTemplates.length > 1 ? "s" : ""
    }`
  );
};

const clean = () => {
  const finisher = logger.timedLog({
    startLog: "Cleaning build artifacts",
  });
  try {
    fs.rmSync(paths.yextDir, { recursive: true });
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
