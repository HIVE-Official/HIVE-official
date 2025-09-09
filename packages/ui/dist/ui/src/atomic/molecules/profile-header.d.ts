import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const profileHeaderVariants: (props?: ({
    layout?: "horizontal" | "vertical" | "compact" | null | undefined;
    variant?: "ghost" | "default" | "minimal" | "card" | null | undefined;
    spacing?: "normal" | "loose" | "tight" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface ProfileUser {
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    bio?: string;
    location?: string;
    website?: string;
    school?: string;
    major?: string;
    gradYear?: string;
    joinedAt: string;
    isBuilder: boolean;
    isVerified: boolean;
    ghostMode: boolean;
    onlineStatus?: 'online' | 'offline' | 'away' | 'busy';
}
export interface ProfileHeaderProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof profileHeaderVariants> {
    user: ProfileUser;
    isOwnProfile?: boolean;
    showOnlineStatus?: boolean;
    showMeta?: boolean;
    showBio?: boolean;
    showBadges?: boolean;
    onEditProfile?: () => void;
    onEditAvatar?: () => void;
    onShareProfile?: () => void;
    avatarSize?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
    maxBioLength?: number;
    children?: React.ReactNode;
}
export declare function ProfileHeader({ user, isOwnProfile, showOnlineStatus, showMeta, showBio, showBadges, onEditProfile, onEditAvatar, onShareProfile, avatarSize, maxBioLength, layout, variant, spacing, className, children, ...props }: ProfileHeaderProps): import("react/jsx-runtime").JSX.Element;
export declare function CompactProfileHeader(props: Omit<ProfileHeaderProps, 'layout' | 'avatarSize'>): import("react/jsx-runtime").JSX.Element;
export declare function CardProfileHeader(props: Omit<ProfileHeaderProps, 'variant'>): import("react/jsx-runtime").JSX.Element;
export declare function MinimalProfileHeader(props: Omit<ProfileHeaderProps, 'variant' | 'showMeta'>): import("react/jsx-runtime").JSX.Element;
export { profileHeaderVariants };
//# sourceMappingURL=profile-header.d.ts.map