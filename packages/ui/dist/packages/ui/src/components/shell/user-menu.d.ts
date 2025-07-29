interface UserMenuProps {
    user: {
        id: string;
        name: string;
        handle: string;
        avatar?: string;
        builderStatus?: 'none' | 'pending' | 'active';
        role?: 'student' | 'faculty' | 'admin';
    };
    onSignOut?: () => void;
}
export declare function UserMenu({ user, onSignOut }: UserMenuProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=user-menu.d.ts.map