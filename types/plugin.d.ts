import { PluginOption } from "vite";
/**
 * Options to configure functionality of the plugin.
 */
export declare type Options = {
    /**
     * The path to output the feature.json to. By default, this is sites-config/feature.json.
     */
    featuresOut?: string;
};
declare const plugin: (opts?: Options) => PluginOption[];
export default plugin;
