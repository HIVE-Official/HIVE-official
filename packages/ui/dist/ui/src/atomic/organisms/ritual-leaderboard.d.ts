import * as React from "react";
export interface LeaderboardEntry {
    /** User rank */
    rank: number;
    /** User name */
    name: string;
    /** User handle */
    handle: string;
    /** User avatar URL */
    avatar?: string;
    /** Progress percentage */
    progress: number;
    /** Is this the current user? */
    isCurrentUser?: boolean;
}
export interface RitualLeaderboardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Leaderboard entries */
    entries: LeaderboardEntry[];
    /** Show only top N entries */
    limit?: number;
    /** Highlight current user */
    highlightCurrentUser?: boolean;
}
declare const RitualLeaderboard: React.ForwardRefExoticComponent<RitualLeaderboardProps & React.RefAttributes<HTMLDivElement>>;
export { RitualLeaderboard };
//# sourceMappingURL=ritual-leaderboard.d.ts.map