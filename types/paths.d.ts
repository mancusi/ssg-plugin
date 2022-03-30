/**
 * Creates an absolute filepath by evaluating a path relative to the YextJS executable.
 * @param relativePath: A file path relative to the root of the site repo.
 */
export declare const resolvePath: (relativePath: string) => string;
export declare const templateDir: string;
export declare const yextDir: string;
export declare const hydrationOutputDir: string;
export declare const hydrationBundleOutputDir: string;
export declare const serverBundleOutputDir: string;
export declare const featureJsonDir: string;
export declare const distDir: string;
/**
 * Creates a filepath relative to the generated manifest.json, which lives under .yext
 * @param filePath: an absolute filepath
 */
export declare const manifestPath: (filePath: string) => string;
export declare const rootPath: (filePath: string) => string;
