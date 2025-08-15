export interface Space {
    id: string;
    name: string;
    description: string;
    avatar?: string;
    coverImage?: string;
    type: 'academic' | 'social' | 'hobby' | 'study' | 'dorm' | 'org' | 'professional';
    category: string;
    privacy: 'public' | 'private' | 'university';
    memberCount: number;
    maxMembers?: number;
    isActive: boolean;
    createdAt: Date;
    lastActivity: Date;
    membershipStatus: 'member' | 'admin' | 'pending' | 'invited' | 'not-member';
    role?: 'member' | 'moderator' | 'admin' | 'founder';
    joinedAt?: Date;
    recentActivity?: {
        type: 'post' | 'event' | 'tool' | 'member';
        title: string;
        timestamp: Date;
        actor?: {
            name: string;
            avatar?: string;
        };
    };
    stats: {
        postsThisWeek: number;
        eventsThisWeek: number;
        activeMembers: number;
        newMembersThisWeek: number;
    };
    tags: string[];
    features: ('tools' | 'events' | 'chat' | 'calendar' | 'files')[];
    building?: string;
    course?: string;
    semester?: string;
    isOfficial?: boolean;
}
export interface SpacesCardProps {
    spaces: Space[];
    recommendedSpaces?: Space[];
    isEditMode: boolean;
    onSpaceClick?: (spaceId: string) => void;
    onJoinSpace?: (spaceId: string) => void;
    onLeaveSpace?: (spaceId: string) => void;
    onCreateSpace?: () => void;
    onSearchSpaces?: (query: string) => void;
    onSettingsClick?: () => void;
    className?: string;
}
export declare function SpacesCard({ spaces, recommendedSpaces, isEditMode, onSpaceClick, onJoinSpace, onLeaveSpace, onCreateSpace, onSearchSpaces, onSettingsClick, className }: SpacesCardProps): import("react/jsx-runtime").JSX.Element;
export declare const mockSpaces: Space[];
export declare const mockRecommendedSpaces: Space[];
//# sourceMappingURL=spaces-card.d.ts.map