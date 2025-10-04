import * as React from "react";
import { LucideIcon } from "lucide-react";
export interface SpaceCategoryAccordionProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Category identifier */
    value: string;
    /** Category icon */
    icon: LucideIcon;
    /** Category title */
    title: string;
    /** Subtitle/description */
    subtitle?: string;
    /** Space count */
    count: number;
    /** Smart recommendations indicator */
    isRecommended?: boolean;
}
/**
 * Space Category Accordion Item
 *
 * Built on shadcn Accordion primitive with HIVE visual language.
 * Uses design tokens from hive-theme.ts (monochrome + gold accent).
 *
 * Features:
 * - Accordion pattern for collapsible categories
 * - Monochrome design with gold accent for recommended
 * - Icon in circular container
 * - Count badge
 * - Proper semantic HTML
 */
declare const SpaceCategoryAccordion: React.ForwardRefExoticComponent<SpaceCategoryAccordionProps & React.RefAttributes<HTMLDivElement>>;
export { SpaceCategoryAccordion };
//# sourceMappingURL=space-category-accordion.d.ts.map