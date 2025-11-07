import * as React from "react";
export type VisuallyHiddenProps = React.HTMLAttributes<HTMLElement> & {
    /**
     * Element type to render. Defaults to `span`.
     */
    as?: React.ElementType;
};
/**
 * VisuallyHidden hides content from sighted users while keeping it available to assistive technology.
 * Useful for screen-reader-only labels, descriptions, or announcements.
 */
export declare const VisuallyHidden: React.ForwardRefExoticComponent<React.HTMLAttributes<HTMLElement> & {
    /**
     * Element type to render. Defaults to `span`.
     */
    as?: React.ElementType;
} & React.RefAttributes<HTMLElement>>;
//# sourceMappingURL=VisuallyHidden.d.ts.map