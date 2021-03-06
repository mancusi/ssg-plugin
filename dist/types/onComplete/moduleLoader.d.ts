/**
 * Imports modules from the server bundle paths and validates that they are of the expected form.
 * If they are not valid then an error is thrown.
 *
 * @throws when a module in the serverBundlePaths is invalid
 * @returns A mapping for feature name to template module
 */
export declare const loadTemplateModules: (serverBundlePaths: string[]) => Promise<TemplateModuleCollection>;
export interface TemplateModule {
    serverPath: string;
    config: {
        name: string;
        stream: any;
        streamId?: string;
    };
    getPath: any;
    render: any;
}
export interface HydrationTemplateModule extends TemplateModule {
    Page: any;
}
export declare type TemplateModuleCollection = Map<string, TemplateModule>;
