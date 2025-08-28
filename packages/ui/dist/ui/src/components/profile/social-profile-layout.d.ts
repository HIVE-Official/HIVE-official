/**
 * Social Profile Layout - Tinder-Style Social + Student Utility
 * Mobile-first bento grid with portrait avatar and social cards
 */
import '../../styles/social-profile.css';
interface SocialProfileData {
    user: {
        id: string;
        fullName: string;
        handle: string;
        bio?: string;
        avatar?: string;
        photos?: string[];
        major?: string;
        academicYear?: string;
        isBuilder: boolean;
        builderLevel?: string;
        toolsCreated?: number;
        campusImpact?: number;
        onlineStatus: 'online' | 'offline' | 'away' | 'studying';
        lastSeen?: string;
    };
    events: Array<{
        id: string;
        title: string;
        time: string;
        endTime?: string;
        type: 'class' | 'study' | 'social' | 'meeting' | 'exam';
        location?: string;
        attendees?: {
            going: number;
            maybe: number;
            spotsLeft?: number;
        };
        canJoin?: boolean;
        userStatus?: 'going' | 'maybe' | 'not-going' | null;
        friends?: string[];
    }>;
    tools: Array<{
        id: string;
        name: string;
        icon: string;
        category: 'academic' | 'productivity' | 'social' | 'finance' | 'health';
        rating: number;
        usageCount?: number;
        socialProof?: {
            friendsUsed: string[];
            totalUsers: number;
            trending?: boolean;
        };
        isCreated?: boolean;
        isNew?: boolean;
        isFavorite?: boolean;
        lastUsed?: string;
    }>;
    spaces: Array<{
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
        isPrivate: boolean;
        color: string;
        icon?: string;
        lastActivity: string;
    }>;
    privacy: {
        ghostMode: boolean;
        isPublic: boolean;
        showActivity: boolean;
    };
    availability?: {
        status: 'available' | 'busy' | 'studying' | 'do-not-disturb';
        freeUntil?: string;
    };
    recentActivity?: Array<{
        id: string;
        type: 'tool' | 'space' | 'event';
        description: string;
        timestamp: string;
    }>;
    notifications?: number;
}
interface SocialProfileLayoutProps {
    data: SocialProfileData;
    socialProof?: {
        mutualConnections: number;
        mutualFriends?: string[];
    };
    isOwn?: boolean;
    onEditProfile?: () => void;
    onPrivacySettings?: () => void;
    onSettings?: () => void;
    onCustomizeLayout?: () => void;
    onPhotoUpload?: (file: File) => void;
    onConnect?: () => void;
    onMessage?: () => void;
    className?: string;
}
export declare function SocialProfileLayout({ data, socialProof, isOwn, onEditProfile, onPrivacySettings, onSettings, onCustomizeLayout, onPhotoUpload, onConnect, onMessage, className }: SocialProfileLayoutProps): import("react/jsx-runtime").JSX.Element;
export default SocialProfileLayout;
//# sourceMappingURL=social-profile-layout.d.ts.map