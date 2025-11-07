export interface HiveLabWorkflow {
    id: string;
    name: string;
    description: string;
    status: "draft" | "live" | "paused";
    updatedAt: string;
    owner: string;
    metrics: Array<{
        label: string;
        value: string;
    }>;
    tags?: string[];
}
export interface HiveLabExperiment {
    id: string;
    title: string;
    summary: string;
    author: string;
    campusSpace: string;
    createdAt: string;
}
export interface HiveLabToolsPageProps {
    campusName?: string;
    workflows?: HiveLabWorkflow[];
    experiments?: HiveLabExperiment[];
    activeTab?: string;
    onTabChange?: (tab: string) => void;
    onLaunchClick?: () => void;
}
export declare function HiveLabToolsPage({ campusName, workflows, experiments, activeTab, onTabChange, onLaunchClick, }: HiveLabToolsPageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=HiveLabToolsPage.d.ts.map