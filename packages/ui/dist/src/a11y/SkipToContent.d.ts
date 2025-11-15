import * as React from "react";
export interface SkipToContentProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    /**
     * ID of the main content container. Used to generate the default href.
     * Defaults to `main-content`.
     */
    targetId?: string;
}
/**
 * SkipToContent provides a focusable link that lets keyboard and assistive technology users jump directly
 * to the primary page content, bypassing navigation chrome.
 */
export declare const SkipToContent: React.ForwardRefExoticComponent<SkipToContentProps & React.RefAttributes<HTMLAnchorElement>>;
//# sourceMappingURL=SkipToContent.d.ts.map