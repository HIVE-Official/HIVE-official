import React from 'react';
import type { BentoGridLayout, ProfileSystem } from '@hive/core/types/profile-system';
interface ProfileBentoGridProps {
    profile: ProfileSystem;
    editable?: boolean;
    onLayoutChange?: (layout: BentoGridLayout) => void;
    className?: string;
}
/**
 * Mobile-first responsive Bento Grid
 * - Mobile: 2 columns max, vertical scroll
 * - Tablet: 3 columns
 * - Desktop: 4 columns full grid
 */
export declare const ProfileBentoGrid: React.FC<ProfileBentoGridProps>;
export {};
//# sourceMappingURL=profile-bento-grid.d.ts.map