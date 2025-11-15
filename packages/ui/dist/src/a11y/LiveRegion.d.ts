import * as React from "react";
export interface LiveRegionProps extends React.HTMLAttributes<HTMLDivElement> {
    /**
     * When provided, this string will be announced to assistive tech. Controlled via React state.
     */
    message?: string | null;
    /**
     * Choose polite (default) or assertive announcements.
     */
    politeness?: "polite" | "assertive";
    /**
      * Show the region visually. Defaults to false (screen reader only).
     */
    visible?: boolean;
    /**
     * Automatically clear the region after N milliseconds. Set to null to disable.
     */
    clearAfter?: number | null;
}
/**
 * LiveRegion announces dynamic updates to assistive technology using aria-live.
 * Useful for toasts, async status updates, and background operations.
 */
export declare const LiveRegion: React.ForwardRefExoticComponent<LiveRegionProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=LiveRegion.d.ts.map