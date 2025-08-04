import { type Space } from '@hive/core';
export interface EventManagerWidgetProps {
    space: Space;
    isLeader?: boolean;
    currentUserRole?: 'owner' | 'admin' | 'moderator' | 'member';
    leaderMode?: 'moderate' | 'manage' | 'configure' | 'insights' | null;
    showCompact?: boolean;
    maxEvents?: number;
    onEventAction?: (eventId: string, action: string, data?: any) => void;
    authenticatedFetch?: (url: string, options?: RequestInit) => Promise<Response>;
    className?: string;
}
export declare function EventManagerWidget({ space, isLeader, currentUserRole, leaderMode, showCompact, maxEvents, onEventAction, authenticatedFetch, className }: EventManagerWidgetProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=event-manager-widget.d.ts.map