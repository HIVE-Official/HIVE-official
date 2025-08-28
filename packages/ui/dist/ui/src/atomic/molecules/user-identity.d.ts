/**
 * HIVE User Identity Molecule
 * Campus-optimized user display combining avatar, name, handle, and status
 *
 * Built using all foundation systems:
 * - Typography: Name hierarchy and handle styling
 * - Color: Campus context colors and status indicators
 * - Layout: Systematic spacing and alignment
 * - Icon: Status indicators and verification badges
 * - Interaction: Hover states and click feedback
 * - Shadow: Subtle elevation for avatars
 * - Border: Consistent radius and status rings
 * - Motion: Smooth transitions and spring animations
 */
import React from 'react';
import { type VariantProps } from 'class-variance-authority';
declare const userIdentityVariants: (props?: {
    size?: "small" | "base" | "large" | "micro";
    layout?: "horizontal" | "vertical" | "compact";
    interactive?: "none" | "social" | "subtle";
} & import("class-variance-authority/types").ClassProp) => string;
export interface UserIdentityProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof userIdentityVariants> {
    name: string;
    handle?: string;
    avatar?: string;
    status?: 'online' | 'away' | 'offline' | 'studying';
    role?: 'student' | 'faculty' | 'admin' | 'leader';
    verified?: boolean;
    showHandle?: boolean;
    showStatus?: boolean;
    showRole?: boolean;
    onClick?: () => void;
    onAvatarClick?: () => void;
}
export declare const UserIdentity: React.ForwardRefExoticComponent<UserIdentityProps & React.RefAttributes<HTMLDivElement>>;
export { userIdentityVariants };
//# sourceMappingURL=user-identity.d.ts.map