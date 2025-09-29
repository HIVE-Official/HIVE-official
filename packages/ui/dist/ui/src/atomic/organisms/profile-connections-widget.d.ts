import React from 'react';
import { type PrivacyLevel } from '../molecules/privacy-control';
import { type PresenceStatus } from '../atoms/presence-indicator';
export interface Connection {
    id: string;
    name: string;
    avatarUrl?: string;
    major?: string;
    academicYear?: string;
    isFriend: boolean;
    mutualSpaces: number;
    connectionStrength: number;
    lastInteraction?: Date;
    isOnline?: boolean;
    presenceStatus?: PresenceStatus;
    lastSeen?: Date;
}
export interface MyConnectionsWidgetProps {
    connections: Connection[];
    pendingFriendRequests?: number;
    isOwnProfile?: boolean;
    privacyLevel?: PrivacyLevel;
    onPrivacyChange?: (level: PrivacyLevel) => void;
    onConnectionClick?: (connectionId: string) => void;
    onViewAll?: () => void;
    onManageFriends?: () => void;
    className?: string;
}
/**
 * My Connections Widget - DESIGN_SPEC Compliant
 *
 * Design Principles:
 * - Two-layer social graph visualization
 * - Gold accent for friends (inner circle)
 * - Connection strength algorithm visualization
 * - Mobile-optimized grid layout
 */
export declare const MyConnectionsWidget: React.FC<MyConnectionsWidgetProps>;
//# sourceMappingURL=profile-connections-widget.d.ts.map