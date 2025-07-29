interface UniversalBottomNavProps {
    user?: {
        id: string;
        name: string;
        avatar?: string;
        builderStatus?: 'none' | 'pending' | 'active';
    } | null;
    unreadNotifications?: number;
    unreadMessages?: number;
    className?: string;
    onCreateAction?: () => void;
}
export declare function UniversalBottomNav({ user, unreadNotifications, unreadMessages, className, onCreateAction }: UniversalBottomNavProps): import("react/jsx-runtime").JSX.Element;
export declare function useUniversalBottomNav(): {
    shouldShow: boolean;
    currentPath: string;
};
export {};
//# sourceMappingURL=universal-bottom-nav.d.ts.map