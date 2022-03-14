import {Plugin} from "vite";
import buildStart from "./buildStart/buildStart";
import buildEnd from "./buildEnd/buildEnd";
import { readdir } from "fs/promises";
import { parse } from "path";


const plugin = (): Plugin => {
  return {
    name: "yext-sites-ssg",
    config: async (config) => {
      const dir = await readdir("./src/templates");
      const input = {};
      for (const template of dir) {
        const parsedPath = parse(template);
        input[`server/${parsedPath.name}`] = `./src/templates/${template}`;
      }

      return {
        build: {
          manifest: true,
          rollupOptions: {
            preserveEntrySignatures: "strict",
            input,
          },
        },
      };
    },
    buildStart,
    buildEnd,
  };
};

export default plugin;