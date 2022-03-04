import {Plugin} from "rollup"
import buildStart from "./buildStart/buildStart";
import buildEnd from "./buildEnd/buildEnd";

const plugin = (): Plugin => {
  return {
    name: "yext-sites-ssg",
    buildStart,
    buildEnd,
  };
};

export default plugin;