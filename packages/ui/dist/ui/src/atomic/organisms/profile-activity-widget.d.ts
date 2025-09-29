import React from 'react';
import { type PrivacyLevel } from '../molecules/privacy-control';
export interface ActivityItem {
    id: string;
    type: 'post' | 'comment' | 'connection' | 'space_join';
    title: string;
    description?: string;
    timestamp: Date;
    spaceId?: string;
    spaceName?: string;
    engagementCount?: number;
}
export interface MyActivityWidgetProps {
    activities: ActivityItem[];
    isOwnProfile?: boolean;
    privacyLevel?: PrivacyLevel;
    onPrivacyChange?: (level: PrivacyLevel) => void;
    onViewAll?: () => void;
    className?: string;
}
/**
 * My Activity Widget - DESIGN_SPEC Compliant
 *
 * Design Principles:
 * - 8px grid system for spacing
 * - Monochrome with gold accents for key interactions
 * - Subtle hover states with white/4 overlay
 * - Mobile-optimized with 44px touch targets
 */
export declare const MyActivityWidget: React.FC<MyActivityWidgetProps>;
//# sourceMappingURL=profile-activity-widget.d.ts.map