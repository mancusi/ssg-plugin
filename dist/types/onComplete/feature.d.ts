import { TemplateModuleCollection } from "./moduleLoader.js";
/**
 * Run feature.json Generation. Returns a mapping of feature name to bundle path.
 */
export declare const createFeatureJson: (templateModules: TemplateModuleCollection, featurePath: string) => Promise<Map<string, string>>;
