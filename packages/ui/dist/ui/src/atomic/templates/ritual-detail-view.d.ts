import * as React from "react";
import { type Milestone } from "../organisms/ritual-milestone-track";
export interface RitualDetailViewProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Ritual data */
    ritual: {
        id: string;
        title: string;
        description: string;
        icon: string;
        type: "onboarding" | "seasonal" | "challenge" | "emergency";
        category: "social" | "academic" | "wellness" | "community";
        startDate: string;
        endDate: string;
        progress: {
            personal: number;
            campus: number;
            participants: number;
            target: number;
        };
        milestones: Milestone[];
        rewards: {
            badge?: string;
            title?: string;
            feature?: string;
        };
        hasJoined: boolean;
        timeRemaining?: {
            days: number;
            hours: number;
            isUrgent: boolean;
        };
    };
    /** Join handler */
    onJoin?: () => void | Promise<void>;
    /** Leave handler */
    onLeave?: () => void | Promise<void>;
    /** Milestone click handler */
    onMilestoneClick?: (milestone: Milestone) => void;
    /** Back navigation handler */
    onBack?: () => void;
    /** Share handler */
    onShare?: () => void;
    /** Show leaderboard */
    showLeaderboard?: boolean;
}
declare const RitualDetailView: React.ForwardRefExoticComponent<RitualDetailViewProps & React.RefAttributes<HTMLDivElement>>;
export { RitualDetailView };
//# sourceMappingURL=ritual-detail-view.d.ts.map