import * as React from "react";
export interface ProfileHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Profile display name */
    name: string;
    /** Profile handle (@username) */
    handle: string;
    /** Avatar image URL */
    avatarUrl?: string;
    /** Multiple profile photos for swipeable avatar (max 5) */
    photos?: string[];
    /** Bio/description text */
    bio?: string;
    /** Academic major */
    major?: string;
    /** Academic year (Freshman, Sophomore, etc) */
    academicYear?: string;
    /** Graduation year */
    graduationYear?: number;
    /** Pronouns */
    pronouns?: string;
    /** Whether profile is verified */
    verified?: boolean;
    /** Whether this is the current user's profile (show edit button) */
    isOwnProfile?: boolean;
    /** Whether already connected */
    isConnected?: boolean;
    /** Connection status badges */
    badges?: Array<{
        label: string;
        variant?: "default" | "secondary" | "outline" | "destructive";
    }>;
    /** Callback when connect button is clicked */
    onConnect?: () => void;
    /** Callback when message button is clicked */
    onMessage?: () => void;
    /** Callback when edit profile is clicked */
    onEdit?: () => void;
}
declare const ProfileHeader: React.ForwardRefExoticComponent<ProfileHeaderProps & React.RefAttributes<HTMLDivElement>>;
export { ProfileHeader };
//# sourceMappingURL=profile-header.d.ts.map