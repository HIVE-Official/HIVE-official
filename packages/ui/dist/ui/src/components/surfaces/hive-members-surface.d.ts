import React from 'react';
import { type VariantProps } from 'class-variance-authority';
import { type Space } from '@hive/core';
declare const hiveMembersSurfaceVariants: (props?: {
    mode?: "view" | "builder" | "edit";
} & import("class-variance-authority/types").ClassProp) => string;
declare const memberRoles: {
    readonly builder: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Builder";
        readonly color: "text-yellow-400";
        readonly bg: "bg-yellow-500/20";
        readonly description: "Space creator and admin";
    };
    readonly moderator: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Moderator";
        readonly color: "text-blue-400";
        readonly bg: "bg-blue-500/20";
        readonly description: "Community moderator";
    };
    readonly member: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Member";
        readonly color: "text-green-400";
        readonly bg: "bg-green-500/20";
        readonly description: "Active community member";
    };
    readonly guest: {
        readonly icon: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
        readonly label: "Guest";
        readonly color: "text-gray-400";
        readonly bg: "bg-gray-500/20";
        readonly description: "Limited access member";
    };
};
declare const memberStatuses: {
    readonly online: {
        readonly label: "Online";
        readonly color: "bg-green-500";
        readonly description: "Currently active";
    };
    readonly away: {
        readonly label: "Away";
        readonly color: "bg-yellow-500";
        readonly description: "Temporarily away";
    };
    readonly busy: {
        readonly label: "Busy";
        readonly color: "bg-red-500";
        readonly description: "Do not disturb";
    };
    readonly offline: {
        readonly label: "Offline";
        readonly color: "bg-gray-500";
        readonly description: "Not currently active";
    };
};
export interface Member {
    id: string;
    name: string;
    username: string;
    avatar?: string;
    bio?: string;
    role: keyof typeof memberRoles;
    status: keyof typeof memberStatuses;
    joinedAt: Date | {
        toDate: () => Date;
    };
    lastActive: Date | {
        toDate: () => Date;
    };
    isVerified?: boolean;
    badges?: string[];
    stats?: {
        postsCount: number;
        likesReceived: number;
        eventsAttended: number;
        contributionScore: number;
    };
    interests?: string[];
    major?: string;
    graduationYear?: number;
    location?: string;
    socialLinks?: {
        github?: string;
        twitter?: string;
        instagram?: string;
        linkedin?: string;
        website?: string;
    };
    permissions?: {
        canMessage: boolean;
        canViewProfile: boolean;
        canInviteOthers: boolean;
    };
    spaceRole?: string;
    isOnline?: boolean;
}
export interface HiveMembersSurfaceProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof hiveMembersSurfaceVariants> {
    space: Space;
    members?: Member[];
    currentUserId?: string;
    isBuilder?: boolean;
    canModerate?: boolean;
    leaderMode?: 'moderate' | 'manage' | 'configure' | 'insights' | null;
    onViewProfile?: (memberId: string) => void;
    onMessageMember?: (memberId: string) => void;
    onInviteMember?: () => void;
    onRemoveMember?: (memberId: string) => void;
    onChangeRole?: (memberId: string, role: keyof typeof memberRoles) => void;
    onBlockMember?: (memberId: string) => void;
    viewMode?: 'grid' | 'list';
    showOfflineMembers?: boolean;
    showMemberStats?: boolean;
    maxMembers?: number;
    autoFetch?: boolean;
    authToken?: string;
}
export declare const HiveMembersSurface: React.ForwardRefExoticComponent<HiveMembersSurfaceProps & React.RefAttributes<HTMLDivElement>>;
export { hiveMembersSurfaceVariants, memberRoles, memberStatuses };
//# sourceMappingURL=hive-members-surface.d.ts.map