/**
 * Social Avatar Card - Tinder-Style Profile Identity
 * Portrait design with swipe gestures and social context
 */
import '../../styles/social-profile.css';
interface SocialAvatarCardProps {
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
    socialProof?: {
        mutualConnections: number;
        mutualFriends?: string[];
    };
    isOwn?: boolean;
    onEditProfile?: () => void;
    onPrivacySettings?: () => void;
    onPhotoUpload?: (file: File) => void;
    onConnect?: () => void;
    onMessage?: () => void;
    className?: string;
}
export declare function SocialAvatarCard({ user, socialProof, isOwn, onEditProfile, onPrivacySettings, onPhotoUpload, onConnect, onMessage, className }: SocialAvatarCardProps): import("react/jsx-runtime").JSX.Element;
export default SocialAvatarCard;
//# sourceMappingURL=social-avatar-card.d.ts.map