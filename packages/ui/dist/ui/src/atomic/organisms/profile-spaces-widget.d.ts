import React from 'react';
import { type PrivacyLevel } from '../molecules/privacy-control';
export interface SpaceInfo {
    id: string;
    name: string;
    type: 'social' | 'academic' | 'event' | 'housing';
    memberCount: number;
    role: 'member' | 'moderator' | 'leader';
    isPrivate: boolean;
    lastActivity?: Date;
    activityLevel: 'high' | 'medium' | 'low';
    unreadCount?: number;
}
export interface MySpacesWidgetProps {
    spaces: SpaceInfo[];
    isOwnProfile?: boolean;
    privacyLevel?: PrivacyLevel;
    onPrivacyChange?: (level: PrivacyLevel) => void;
    onSpaceClick?: (spaceId: string) => void;
    onExploreSpaces?: () => void;
    className?: string;
}
/**
 * My Spaces Widget - DESIGN_SPEC Compliant
 *
 * Design Principles:
 * - Luxury card design with subtle depth
 * - Gold accent for leadership/special roles
 * - 8px grid spacing
 * - Mobile-optimized cards
 */
export declare const MySpacesWidget: React.FC<MySpacesWidgetProps>;
//# sourceMappingURL=profile-spaces-widget.d.ts.map