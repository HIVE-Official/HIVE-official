import React from 'react';
import type { UIProfile } from '../organisms/profile-types';
import type { PrivacyLevel } from '../molecules/privacy-control';
export interface ProfileViewLayoutProps {
    profile: UIProfile;
    isOwnProfile?: boolean;
    activities?: any[];
    spaces?: any[];
    connections?: any[];
    isSpaceLeader?: boolean;
    hasHiveLabAccess?: boolean;
    toolsCreated?: number;
    leadingSpaces?: Array<{
        id: string;
        name: string;
        memberCount: number;
    }>;
    onEditPhoto?: () => void;
    onPrivacyChange?: (widget: string, level: PrivacyLevel) => void;
    onStepClick?: (stepId: string) => void;
    onRequestHiveLabAccess?: () => void;
    onOpenHiveLab?: () => void;
    className?: string;
}
/**
 * Profile View Layout - DESIGN_SPEC Compliant
 *
 * Design Principles:
 * - 8px grid system with responsive columns
 * - Mobile: 1 column
 * - Tablet: 2 columns
 * - Desktop: 3 columns
 * - Luxury minimalism with careful spacing
 */
export declare const ProfileViewLayout: React.FC<ProfileViewLayoutProps>;
//# sourceMappingURL=profile-view-layout.d.ts.map