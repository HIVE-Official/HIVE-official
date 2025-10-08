import * as React from "react";
export interface SpaceAboutSectionProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Space description */
    description: string;
    /** Space tags */
    tags?: string[];
    /** Creation info */
    createdAt?: Date;
    createdBy?: {
        name: string;
        handle?: string;
        avatar?: string;
    };
    /** Space rules/guidelines */
    rules?: string[];
    /** Space category */
    category?: string;
    type?: "academic" | "greek" | "social" | "residential" | "interest" | "official";
    /** Quick stats */
    memberCount?: number;
    postCount?: number;
    eventCount?: number;
    /** Actions */
    onEditDescription?: () => void;
    onEditRules?: () => void;
    isLeader?: boolean;
    /** Expanded state */
    defaultExpanded?: boolean;
}
declare const SpaceAboutSection: React.ForwardRefExoticComponent<SpaceAboutSectionProps & React.RefAttributes<HTMLDivElement>>;
export { SpaceAboutSection };
//# sourceMappingURL=space-about-section.d.ts.map