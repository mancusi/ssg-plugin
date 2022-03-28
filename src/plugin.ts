import { Plugin, PluginOption } from "vite";
import buildStart from "./buildStart/buildStart";
import closeBundle from "./onComplete/onComplete";
import { readdir } from "fs/promises";
import { parse } from "path";
import * as paths from "./paths";

const plugin = (): PluginOption[] => ([{
  name: "yext-sites-ssg",
  config: async (config) => {
    await buildStart();
    return {
      build: {
        manifest: true,
        rollupOptions: {
          preserveEntrySignatures: "strict",
          input: (await readdir(paths.templateDir)).reduce(
            (input, template) => {
              const parsedPath = parse(template);

              if (parsedPath.ext.includes("tsx")) {
                input[
                  `hydrate/${parsedPath.name}`
                ] = `${paths.hydrationOutputDir}/${template}`;
              }

              input[
                `server/${parsedPath.name}`
              ] = `${paths.templateDir}/${template}`;
              return input;
            },
            {}
          ),
        },
      },
    };
  },
  closeBundle,
}]);

export default plugin;
