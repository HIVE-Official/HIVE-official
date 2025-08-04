import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const profileAvatarVariants: (props?: {
    size?: "xs" | "sm" | "md" | "lg" | "xl" | "xxl";
    shape?: "rounded" | "circle" | "square";
    border?: "primary" | "none" | "builder" | "verified" | "subtle";
    status?: "none" | "online" | "offline" | "away" | "busy";
} & import("class-variance-authority/types").ClassProp) => string;
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
    onUpload?: (file: File) => void;
    loading?: boolean;
}
export declare function ProfileAvatar({ src, alt, name, isBuilder, isVerified, ghostMode, onlineStatus, showStatus, showBadges, editable, onEdit, onUpload, loading, size, shape, border, status, className, ...props }: ProfileAvatarProps): import("react/jsx-runtime").JSX.Element;
export { profileAvatarVariants };
//# sourceMappingURL=profile-avatar.d.ts.map