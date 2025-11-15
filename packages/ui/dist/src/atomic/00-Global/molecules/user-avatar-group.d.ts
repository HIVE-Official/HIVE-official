export interface UserAvatarGroupUser {
    id: string;
    name?: string | null;
    imageUrl?: string | null;
}
export interface UserAvatarGroupProps {
    users: UserAvatarGroupUser[];
    max?: number;
    size?: "xs" | "sm" | "md";
    className?: string;
}
/**
 * Overlapping avatar group with optional "+N" overflow indicator.
 */
export declare function UserAvatarGroup({ users, max, size, className, }: UserAvatarGroupProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=user-avatar-group.d.ts.map