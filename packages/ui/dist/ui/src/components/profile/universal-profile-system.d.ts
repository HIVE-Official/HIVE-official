export interface UniversalProfileUser {
    id: string;
    name: string;
    handle: string;
    email: string;
    avatar?: string;
    coverImage?: string;
    bio?: string;
    location?: string;
    website?: string;
    joinedAt: string;
    lastActive: string;
    major?: string;
    gradYear?: string;
    school?: string;
    gpa?: number;
    isBuilder: boolean;
    builderLevel?: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    isVerified: boolean;
    ghostMode: boolean;
    onlineStatus: 'online' | 'offline' | 'away' | 'busy';
    stats: {
        spacesJoined: number;
        spacesLed: number;
        toolsCreated: number;
        toolsUsed: number;
        connectionsCount: number;
        totalActivity: number;
        weekStreak: number;
        reputation: number;
    };
    preferences: {
        showActivity: boolean;
        showSpaces: boolean;
        showConnections: boolean;
        allowMessages: boolean;
        showOnlineStatus: boolean;
    };
}
interface ProfileSpace {
    id: string;
    name: string;
    type: 'course' | 'housing' | 'club' | 'academic' | 'community';
    role: 'member' | 'moderator' | 'leader';
    memberCount: number;
    lastActivity: string;
    isPrivate: boolean;
    color: string;
    icon?: string;
}
interface ProfileTool {
    id: string;
    name: string;
    description: string;
    category: string;
    icon: string;
    lastUsed: string;
    usageCount: number;
    isCreated: boolean;
    isFavorite: boolean;
    rating?: number;
    tags: string[];
}
interface ActivityItem {
    id: string;
    type: 'space_joined' | 'tool_created' | 'tool_used' | 'connection_made' | 'achievement_earned';
    title: string;
    description: string;
    timestamp: string;
    metadata?: any;
}
interface UniversalProfileSystemProps {
    user: UniversalProfileUser;
    spaces: ProfileSpace[];
    tools: ProfileTool[];
    recentActivity: ActivityItem[];
    isOwnProfile: boolean;
    isLoading?: boolean;
    onEditProfile?: () => void;
    onMessageUser?: () => void;
    onFollowUser?: () => void;
    onShareProfile?: () => void;
    onPrivacySettings?: () => void;
    className?: string;
}
export declare function UniversalProfileSystem({ user, spaces, tools, recentActivity, isOwnProfile, isLoading, onEditProfile, onMessageUser, onFollowUser, onShareProfile, onPrivacySettings, className }: UniversalProfileSystemProps): import("react/jsx-runtime").JSX.Element;
declare function ActivityItem({ activity }: {
    activity: ActivityItem;
}): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=universal-profile-system.d.ts.map