import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { type Space } from '@hive/core';
declare const hiveToolsSurfaceVariants: (props?: {
    mode?: "view" | "edit" | "builder";
} & import("class-variance-authority/types").ClassProp) => string;
declare const toolCategories: {
    readonly communication: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Communication";
        readonly color: "text-blue-400";
        readonly description: "Posts, discussions, announcements";
    };
    readonly productivity: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Productivity";
        readonly color: "text-green-400";
        readonly description: "To-do lists, planners, trackers";
    };
    readonly multimedia: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Multimedia";
        readonly color: "text-purple-400";
        readonly description: "Images, videos, galleries";
    };
    readonly collaboration: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Collaboration";
        readonly color: "text-orange-400";
        readonly description: "Shared docs, whiteboards, polls";
    };
    readonly entertainment: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Entertainment";
        readonly color: "text-pink-400";
        readonly description: "Games, quizzes, music";
    };
    readonly utilities: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Utilities";
        readonly color: "text-gray-400";
        readonly description: "Calculators, converters, tools";
    };
};
declare const toolStatuses: {
    readonly active: {
        readonly label: "Active";
        readonly color: "text-green-400";
        readonly bg: "bg-green-500/20";
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly description: "Tool is running normally";
    };
    readonly paused: {
        readonly label: "Paused";
        readonly color: "text-yellow-400";
        readonly bg: "bg-yellow-500/20";
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly description: "Tool is temporarily disabled";
    };
    readonly error: {
        readonly label: "Error";
        readonly color: "text-red-400";
        readonly bg: "bg-red-500/20";
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly description: "Tool has encountered an issue";
    };
    readonly loading: {
        readonly label: "Loading";
        readonly color: "text-blue-400";
        readonly bg: "bg-blue-500/20";
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly description: "Tool is initializing";
    };
};
export interface Tool {
    id: string;
    name: string;
    description: string;
    category: keyof typeof toolCategories;
    status: keyof typeof toolStatuses;
    icon: string;
    version: string;
    addedAt: Date;
    addedBy: string;
    lastUsed?: Date;
    usageCount: number;
    isVisible: boolean;
    isPinned: boolean;
    configuration: Record<string, any>;
    permissions: {
        canView: boolean;
        canEdit: boolean;
        canDelete: boolean;
        canConfigure: boolean;
    };
    analytics?: {
        views: number;
        interactions: number;
        activeUsers: number;
        lastActivity: Date;
    };
}
export interface HiveToolsSurfaceProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof hiveToolsSurfaceVariants> {
    space: Space;
    tools?: Tool[];
    isBuilder?: boolean;
    canManageTools?: boolean;
    onAddTool?: () => void;
    onConfigureTool?: (toolId: string) => void;
    onRemoveTool?: (toolId: string) => void;
    onToggleToolStatus?: (toolId: string) => void;
    onReorderTools?: (toolIds: string[]) => void;
    onViewToolAnalytics?: (toolId: string) => void;
    showAnalytics?: boolean;
    compact?: boolean;
    maxTools?: number;
}
export declare const HiveToolsSurface: React.ForwardRefExoticComponent<HiveToolsSurfaceProps & React.RefAttributes<HTMLDivElement>>;
export { hiveToolsSurfaceVariants, toolCategories, toolStatuses };
//# sourceMappingURL=hive-tools-surface.d.ts.map