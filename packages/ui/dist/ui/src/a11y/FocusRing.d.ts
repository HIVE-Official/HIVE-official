import * as React from "react";
export interface FocusRingProps {
    /**
     * The interactive element to decorate with a consistent focus outline.
     */
    children: React.ReactElement;
    /**
     * CSS color value for the ring. Defaults to Hive brand gold.
     */
    color?: string;
    /**
     * Outline offset in pixels. Defaults to 3.
     */
    offset?: number | string;
    /**
     * When true, applies the ring when any descendant receives focus.
     */
    within?: boolean;
    /**
     * Optional override for the outline radius (px value or CSS token).
     */
    radius?: number | string;
    /**
     * Extra className to append to the child element.
     */
    className?: string;
}
/**
 * FocusRing ensures every interactive element renders a consistent, high-contrast outline
 * that respects reduced motion and user theme tokens.
 */
export declare function FocusRing({ children, color, offset, within, radius, className, }: FocusRingProps): React.ReactElement<any, string | React.JSXElementConstructor<any>>;
//# sourceMappingURL=FocusRing.d.ts.map