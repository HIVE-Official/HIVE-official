import * as React from "react";
export type ActivityType = "post" | "comment" | "connection" | "space_join" | "space_post" | "ritual_complete" | "tool_create" | "achievement";
export interface Activity {
    id: string;
    type: ActivityType;
    timestamp: string;
    title: string;
    description?: string;
    metadata?: {
        spaceName?: string;
        connectionName?: string;
        avatarUrl?: string;
        postPreview?: string;
        badge?: {
            label: string;
            variant?: "default" | "secondary" | "outline" | "destructive";
        };
    };
    onClick?: () => void;
}
export interface ActivityTimelineProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Array of activities */
    activities: Activity[];
    /** Variant */
    variant?: "default" | "compact";
    /** Maximum activities to show */
    limit?: number;
    /** Show "View All" button when limited */
    showViewAll?: boolean;
    /** Callback when "View All" is clicked */
    onViewAll?: () => void;
}
declare const ActivityTimeline: React.ForwardRefExoticComponent<ActivityTimelineProps & React.RefAttributes<HTMLDivElement>>;
export { ActivityTimeline };
//# sourceMappingURL=activity-timeline.d.ts.map