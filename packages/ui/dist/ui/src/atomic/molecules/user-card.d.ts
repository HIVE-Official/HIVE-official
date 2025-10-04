import * as React from "react";
export interface UserCardProps extends React.HTMLAttributes<HTMLDivElement> {
    name: string;
    handle: string;
    avatar?: string;
    bio?: string;
    badge?: string;
    badgeVariant?: "default" | "secondary" | "destructive" | "outline";
    actionLabel?: string;
    onAction?: () => void;
    actionVariant?: "default" | "secondary" | "destructive" | "outline" | "ghost";
    isOnline?: boolean;
    disabled?: boolean;
}
declare const UserCard: React.ForwardRefExoticComponent<UserCardProps & React.RefAttributes<HTMLDivElement>>;
export { UserCard };
//# sourceMappingURL=user-card.d.ts.map