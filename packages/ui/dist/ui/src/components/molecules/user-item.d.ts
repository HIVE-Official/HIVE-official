import * as React from "react";
export interface UserItemProps {
    user: {
        id: string;
        name: string;
        handle?: string;
        avatar?: string;
        role?: string;
        year?: string;
        isOnline?: boolean;
        isGhostMode?: boolean;
        isBlocked?: boolean;
        isBuilder?: boolean;
    };
    variant?: 'default' | 'compact' | 'detailed';
    showStatus?: boolean;
    actionButton?: {
        label: string;
        onClick: (user: any) => void;
        variant?: 'primary' | 'secondary' | 'destructive';
        loading?: boolean;
    };
    onUserClick?: (user: any) => void;
    className?: string;
    disabled?: boolean;
}
export declare const UserItem: React.ForwardRefExoticComponent<UserItemProps & React.RefAttributes<HTMLDivElement>>;
export declare const UserItemPresets: {
    MemberListItem: (props: Omit<UserItemProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    SearchResultItem: (props: Omit<UserItemProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    CompactListItem: (props: Omit<UserItemProps, "variant">) => import("react/jsx-runtime").JSX.Element;
    MentionItem: (props: Omit<UserItemProps, "variant" | "showStatus">) => import("react/jsx-runtime").JSX.Element;
};
export { UserItem as UserItemMolecule };
//# sourceMappingURL=user-item.d.ts.map