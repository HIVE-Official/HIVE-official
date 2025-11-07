import * as React from "react";
import { HiveCard } from "../atoms/hive-card";
export type SpaceActivityLevel = "very_active" | "active" | "moderate" | "quiet";
export type SpaceJoinPolicy = "open" | "approval" | "invite_only";
export interface SpaceCardData {
    id: string;
    name: string;
    description: string;
    category?: string;
    memberCount: number;
    onlineCount?: number;
    activityLevel: SpaceActivityLevel;
    joinPolicy: SpaceJoinPolicy;
    bannerImage?: string;
    anxietyReliefScore?: number;
    socialProofScore?: number;
    insiderAccessScore?: number;
    recommendationScore?: number;
    joinToActiveRate?: number;
    mutualConnections?: number;
    friendsInSpace?: number;
}
export interface SpaceCardProps extends React.ComponentProps<typeof HiveCard> {
    space: SpaceCardData;
    onJoin?: (space: SpaceCardData) => void;
    onClick?: (space: SpaceCardData) => void;
    showFriends?: boolean;
    showExclusive?: boolean;
}
export declare const SpaceCard: React.FC<SpaceCardProps> & {
    Skeleton: React.FC;
}, as: any, any: any;
export default SpaceCard;
//# sourceMappingURL=space-card.d.ts.map