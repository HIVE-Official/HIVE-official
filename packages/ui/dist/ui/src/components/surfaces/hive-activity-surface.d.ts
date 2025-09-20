import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { type Space } from '@hive/core';
declare const hiveActivitySurfaceVariants: (props?: {
    mode?: "builder" | "view" | "edit";
} & import("class-variance-authority/types").ClassProp) => string;
declare const activityTypes: {
    readonly post: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Post";
        readonly color: "text-blue-400";
        readonly bg: "bg-blue-500/20";
        readonly description: "New post created";
    };
    readonly event: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Event";
        readonly color: "text-green-400";
        readonly bg: "bg-green-500/20";
        readonly description: "Event created or updated";
    };
    readonly member_join: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Member Join";
        readonly color: "text-purple-400";
        readonly bg: "bg-purple-500/20";
        readonly description: "New member joined";
    };
    readonly member_leave: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Member Leave";
        readonly color: "text-orange-400";
        readonly bg: "bg-orange-500/20";
        readonly description: "Member left space";
    };
    readonly tool_deploy: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Tool Deploy";
        readonly color: "text-cyan-400";
        readonly bg: "bg-cyan-500/20";
        readonly description: "Tool deployed to space";
    };
    readonly tool_remove: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Tool Remove";
        readonly color: "text-red-400";
        readonly bg: "bg-red-500/20";
        readonly description: "Tool removed from space";
    };
    readonly event_rsvp: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "RSVP";
        readonly color: "text-yellow-400";
        readonly bg: "bg-yellow-500/20";
        readonly description: "Event RSVP response";
    };
    readonly space_update: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Space Update";
        readonly color: "text-pink-400";
        readonly bg: "bg-pink-500/20";
        readonly description: "Space information updated";
    };
};
export interface ActivityItem {
    id: string;
    type: keyof typeof activityTypes;
    spaceId: string;
    timestamp: string;
    user: {
        id: string;
        name: string;
        avatar?: string;
        handle?: string;
    };
    content: any;
    metadata?: {
        isHighlighted?: boolean;
        isPinned?: boolean;
        [key: string]: any;
    };
}
export interface HiveActivitySurfaceProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof hiveActivitySurfaceVariants> {
    space: Space;
    activities?: ActivityItem[];
    isBuilder?: boolean;
    canModerate?: boolean;
    onViewActivity?: (activityId: string) => void;
    onFilterActivities?: (types: string[]) => void;
    showFilters?: boolean;
    compact?: boolean;
    maxActivities?: number;
    autoRefresh?: boolean;
    refreshInterval?: number;
    autoFetch?: boolean;
    authToken?: string;
}
export declare const HiveActivitySurface: React.ForwardRefExoticComponent<HiveActivitySurfaceProps & React.RefAttributes<HTMLDivElement>>;
export { hiveActivitySurfaceVariants, activityTypes };
//# sourceMappingURL=hive-activity-surface.d.ts.map