/**
 * Social Spaces Card - Community Social Discovery
 * Display user's communities with social context and activity
 */
import '../../styles/social-profile.css';
interface Space {
    id: string;
    name: string;
    type: 'academic' | 'housing' | 'club' | 'course' | 'community' | 'social';
    memberCount: number;
    role: 'member' | 'moderator' | 'leader' | 'admin';
    activityLevel: 'quiet' | 'active' | 'busy' | 'very-active';
    unreadCount?: number;
    recentActivity?: {
        type: 'post' | 'event' | 'poll' | 'announcement';
        author: string;
        content: string;
        timestamp: string;
    };
    upcomingEvents?: {
        count: number;
        nextEvent?: string;
    };
    mutualFriends?: string[];
    isPrivate: boolean;
    color: string;
    icon?: string;
    lastActivity: string;
}
interface SocialSpacesCardProps {
    spaces: Space[];
    recommendations?: Space[];
    onSpaceClick?: (spaceId: string) => void;
    onJoinSpace?: (spaceId: string) => void;
    onCreateSpace?: () => void;
    onExploreSpaces?: () => void;
    className?: string;
}
export declare function SocialSpacesCard({ spaces, recommendations, onSpaceClick, onJoinSpace, onCreateSpace, onExploreSpaces, className }: SocialSpacesCardProps): import("react/jsx-runtime").JSX.Element;
export default SocialSpacesCard;
//# sourceMappingURL=social-spaces-card.d.ts.map