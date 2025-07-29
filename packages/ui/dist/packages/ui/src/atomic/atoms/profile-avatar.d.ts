import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const profileAvatarVariants: (props?: {
    size?: "xs" | "sm" | "lg" | "xl" | "md" | "xxl";
    shape?: "circle" | "rounded" | "square";
    border?: "none" | "subtle" | "primary" | "builder" | "verified";
    status?: "none" | "online" | "away" | "busy" | "offline";
} & import("class-variance-authority/dist/types").ClassProp) => string;
export interface ProfileAvatarProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof profileAvatarVariants> {
    src?: string;
    alt?: string;
    name: string;
    isBuilder?: boolean;
    isVerified?: boolean;
    ghostMode?: boolean;
    onlineStatus?: 'online' | 'offline' | 'away' | 'busy';
    showStatus?: boolean;
    showBadges?: boolean;
    editable?: boolean;
    onEdit?: () => void;
    loading?: boolean;
}
export declare function ProfileAvatar({ src, alt, name, isBuilder, isVerified, ghostMode, onlineStatus, showStatus, showBadges, editable, onEdit, loading, size, shape, border, status, className, ...props }: ProfileAvatarProps): import("react/jsx-runtime").JSX.Element;
export { profileAvatarVariants };
//# sourceMappingURL=profile-avatar.d.ts.map