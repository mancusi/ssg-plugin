declare type PathOptions = {
    /**
     * The path to output the feature.json to. By default, this is sites-config/feature.json.
     */
    featuresOut?: string;
};
declare const _default: (opts?: PathOptions) => Paths;
export default _default;
export declare type Paths = {
    resolvePath: (string: any) => string;
    templateDir: string;
    yextDir: string;
    hydrationBundleOutputDir: string;
    hydrationOutputDir: string;
    serverBundleOutputDir: string;
    featureJsonDir: string;
    distDir: string;
    manifestPath: (string: any) => string;
    rootPath: (string: any) => string;
};
