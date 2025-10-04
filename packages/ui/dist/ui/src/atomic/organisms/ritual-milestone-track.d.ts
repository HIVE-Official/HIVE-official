import * as React from "react";
export interface Milestone {
    id: string;
    name: string;
    description?: string;
    status: "completed" | "active" | "locked";
    progress?: number;
    reward?: string;
}
export interface RitualMilestoneTrackProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Milestones to display */
    milestones: Milestone[];
    /** Orientation */
    orientation?: "vertical" | "horizontal";
    /** Compact mode */
    compact?: boolean;
    /** Milestone click handler */
    onMilestoneClick?: (milestone: Milestone) => void;
}
declare const RitualMilestoneTrack: React.ForwardRefExoticComponent<RitualMilestoneTrackProps & React.RefAttributes<HTMLDivElement>>;
export { RitualMilestoneTrack };
//# sourceMappingURL=ritual-milestone-track.d.ts.map