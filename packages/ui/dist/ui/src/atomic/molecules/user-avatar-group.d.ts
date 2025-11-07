export type UserAvatarGroupProps = {
    users: {
        id: string;
        name?: string;
        imageUrl?: string;
    }[];
    max?: number;
    size?: 'xs' | 'sm' | 'md';
    className?: string;
};
export declare function UserAvatarGroup({ users, max, size, className }: UserAvatarGroupProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=user-avatar-group.d.ts.map