import { Plugin, PluginOption } from "vite";
import buildStart from "./buildStart/buildStart";
import buildEnd from "./buildEnd/buildEnd";
import { readdir } from "fs/promises";
import { parse } from "path";
import * as paths from "./paths";

const plugin = (): PluginOption[] => ([{
  name: "yext-sites-ssg",
  config: async (config) => {
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
  buildStart,
  buildEnd,
}]);

export default plugin;
