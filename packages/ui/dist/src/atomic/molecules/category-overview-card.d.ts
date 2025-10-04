import * as React from "react";
import { LucideIcon } from "lucide-react";
export interface CategoryOverviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Category icon from lucide-react */
    icon: LucideIcon;
    /** Category name */
    title: string;
    /** Subtitle/description */
    subtitle?: string;
    /** Space count in category */
    count: number;
    /** Click handler to expand category */
    onExplore?: () => void;
    /** Featured/new badge */
    badge?: string;
}
/**
 * Category Overview Card
 *
 * Large clickable card for homebase category navigation.
 * Shows icon, title, count, and explore action.
 *
 * Features:
 * - Large icon display
 * - Count badge
 * - Hover lift effect
 * - Click to explore category
 */
declare const CategoryOverviewCard: React.ForwardRefExoticComponent<CategoryOverviewCardProps & React.RefAttributes<HTMLDivElement>>;
export { CategoryOverviewCard };
//# sourceMappingURL=category-overview-card.d.ts.map