/**
 * UserProfileCard - Purpose-built for UB student profiles
 *
 * Shows what students actually want to know about each other:
 * 1. Who is this person? (name, major, year)
 * 2. Are they active? (online status, recent activity)
 * 3. How do I connect? (message, add friend)
 */
export interface UserProfile {
    id: string;
    name: string;
    handle: string;
    major?: string;
    year?: string;
    avatar?: string;
    bio?: string;
    location?: string;
    status: 'online' | 'away' | 'studying' | 'offline';
    lastSeen?: string;
    spacesCount?: number;
    isBuilder?: boolean;
    toolsBuilt?: number;
    mutualSpaces?: number;
}
export interface UserProfileCardProps {
    profile: UserProfile;
    currentUserId?: string;
    showBio?: boolean;
    showStats?: boolean;
    onMessage?: (userId: string) => void;
    onConnect?: (userId: string) => void;
    onViewProfile?: (userId: string) => void;
    isConnected?: boolean;
    className?: string;
}
export declare function UserProfileCard({ profile, currentUserId, showBio, showStats, onMessage, onConnect, onViewProfile, isConnected, className }: UserProfileCardProps): import("react/jsx-runtime").JSX.Element;
export declare function UserProfileCardCompact({ profile, onMessage, className }: UserProfileCardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=user-profile-card.d.ts.map