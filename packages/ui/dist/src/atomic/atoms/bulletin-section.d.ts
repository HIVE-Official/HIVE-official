import * as React from "react";
import { LucideIcon } from "lucide-react";
export interface BulletinSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Section title */
    title: string;
    /** Optional subtitle/description */
    subtitle?: string;
    /** Icon component from lucide-react */
    icon?: LucideIcon;
    /** Action button in header */
    action?: React.ReactNode;
    /** Count/badge text */
    count?: number;
}
/**
 * Bulletin Section Header
 *
 * Custom primitive for category section headers with bulletin board aesthetic.
 * Creates visual separation between different space categories.
 *
 * Features:
 * - Clean separator line (like bulletin board sections)
 * - Optional icon for category identification
 * - Count indicator for items in section
 * - Action slot for "View All" or filter buttons
 */
declare const BulletinSection: React.ForwardRefExoticComponent<BulletinSectionProps & React.RefAttributes<HTMLDivElement>>;
export { BulletinSection };
//# sourceMappingURL=bulletin-section.d.ts.map