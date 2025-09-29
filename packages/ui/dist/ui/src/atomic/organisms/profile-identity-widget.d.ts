import React from 'react';
import type { UIProfile } from './profile-types';
import { type PresenceStatus } from '../atoms/presence-indicator';
import { type PrivacyLevel } from '../molecules/privacy-control';
export interface ProfileIdentityWidgetProps {
    profile: UIProfile;
    isOwnProfile?: boolean;
    onEditPhoto?: () => void;
    presenceStatus?: PresenceStatus;
    lastSeen?: Date;
    privacyLevel?: PrivacyLevel;
    onPrivacyChange?: (level: PrivacyLevel) => void;
    className?: string;
}
/**
 * Profile Identity Widget - DESIGN_SPEC Compliant
 *
 * Design Principles:
 * - Luxury minimalism with gold accent
 * - 8px grid system
 * - Black/Gold/White/Gray palette only
 * - 5 states: default, hover, focus, active, disabled
 * - Mobile-first with 44px touch targets
 */
export declare const ProfileIdentityWidget: React.FC<ProfileIdentityWidgetProps>;
//# sourceMappingURL=profile-identity-widget.d.ts.map