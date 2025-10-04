import * as React from "react";
export interface Template {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: "academic" | "social" | "greek-life" | "residential" | "career" | "wellness";
    elementCount: number;
    complexity: "simple" | "medium" | "complex";
    deploysCount: number;
    forksCount: number;
    successRate: number;
    responseRate?: number;
    creatorName: string;
    creatorHandle: string;
    isTrending?: boolean;
    isNew?: boolean;
    tags: string[];
    preview?: {
        elements: string[];
        flow: string;
    };
}
export interface HiveLabTemplateBrowserProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Available templates */
    templates?: Template[];
    /** Template selection handler */
    onTemplateSelect?: (template: Template) => void;
    /** Fork template handler */
    onForkTemplate?: (templateId: string) => void;
    /** Deploy template handler */
    onDeployTemplate?: (templateId: string) => void;
    /** Search query */
    searchQuery?: string;
    /** Search handler */
    onSearchChange?: (query: string) => void;
    /** Show leader stats */
    isLeader?: boolean;
}
declare const HiveLabTemplateBrowser: React.ForwardRefExoticComponent<HiveLabTemplateBrowserProps & React.RefAttributes<HTMLDivElement>>;
export { HiveLabTemplateBrowser };
//# sourceMappingURL=hivelab-template-browser.d.ts.map