export interface EventManagerToolProps {
    spaceId: string;
    spaceName: string;
    isLeader?: boolean;
    currentUserRole?: 'owner' | 'admin' | 'moderator' | 'member';
    leaderMode?: 'moderate' | 'manage' | 'configure' | 'insights' | null;
    onEventAction?: (eventId: string, action: string, data?: any) => void;
    authenticatedFetch?: (url: string, options?: RequestInit) => Promise<Response>;
    className?: string;
}
export declare function EventManagerTool({ spaceId, spaceName, isLeader, currentUserRole, leaderMode, onEventAction, authenticatedFetch, className }: EventManagerToolProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=event-manager-tool.d.ts.map