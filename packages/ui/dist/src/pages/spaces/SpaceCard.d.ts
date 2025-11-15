export interface SpaceCardHost {
    name: string;
    avatarUrl?: string;
    initials?: string;
    role?: string;
}
export interface SpaceCardMetric {
    label: string;
    value: string;
}
export interface SpaceCardData {
    id: string;
    name: string;
    description: string;
    members: number;
    momentum?: string;
    tags?: string[];
    bannerImage?: string;
    bannerColor?: string;
    category?: string;
    hosts?: SpaceCardHost[];
    metrics?: SpaceCardMetric[];
    isInviteOnly?: boolean;
}
export interface SpaceCardProps {
    space: SpaceCardData;
    ctaLabel?: string;
    onJoin?: (spaceId: string) => void;
}
export declare function SpaceCard({ space, ctaLabel, onJoin }: SpaceCardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=SpaceCard.d.ts.map