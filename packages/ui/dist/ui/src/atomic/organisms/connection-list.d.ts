import * as React from "react";
export interface Connection {
    id: string;
    name: string;
    handle: string;
    avatarUrl?: string;
    bio?: string;
    major?: string;
    academicYear?: string;
    verified?: boolean;
    mutualConnections?: number;
    isFollowing?: boolean;
}
export interface ConnectionListProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Array of connections */
    connections: Connection[];
    /** List type */
    variant?: "following" | "followers" | "both";
    /** Following list (only if variant is "both") */
    following?: Connection[];
    /** Show actions (Follow/Unfollow buttons) */
    showActions?: boolean;
    /** Callback when follow/unfollow is clicked */
    onToggleFollow?: (connectionId: string, isFollowing: boolean) => void;
    /** Callback when connection is clicked */
    onConnectionClick?: (connectionId: string) => void;
}
declare const ConnectionList: React.ForwardRefExoticComponent<ConnectionListProps & React.RefAttributes<HTMLDivElement>>;
export { ConnectionList };
//# sourceMappingURL=connection-list.d.ts.map