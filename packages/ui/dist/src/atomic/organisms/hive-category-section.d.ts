import * as React from "react";
import { LucideIcon } from "lucide-react";
export interface HiveCategorySectionProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Category icon */
    icon: LucideIcon;
    /** Category title */
    title: string;
    /** Subtitle/description */
    subtitle?: string;
    /** Space count in category */
    count: number;
    /** Initially expanded */
    defaultExpanded?: boolean;
    /** Accent color (default: #FFD700) */
    accentColor?: string;
    /** Category-specific color override */
    categoryColor?: {
        /** Icon background */
        iconBg: string;
        /** Icon foreground */
        iconFg: string;
        /** Border accent */
        border: string;
    };
}
/**
 * HIVE Category Section
 *
 * Collapsible category section for space discovery.
 * Each category has unique visual identity with custom colors.
 *
 * Features:
 * - Click header to expand/collapse
 * - Smooth height animations
 * - Custom color schemes per category
 * - Large count display
 * - Icon with colored background
 */
declare const HiveCategorySection: React.ForwardRefExoticComponent<HiveCategorySectionProps & React.RefAttributes<HTMLDivElement>>;
export { HiveCategorySection };
//# sourceMappingURL=hive-category-section.d.ts.map