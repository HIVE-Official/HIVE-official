import type { BentoGridLayout, ProfileSystem } from "@hive/core";
export interface ProfileBentoGridProps {
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
export declare function ProfileBentoGrid({ profile, editable, onLayoutChange, className, }: ProfileBentoGridProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=profile-bento-grid.d.ts.map