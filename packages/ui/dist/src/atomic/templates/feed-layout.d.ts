import * as React from "react";
export interface FeedLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Optional header content (filters, rituals strip) */
    header?: React.ReactNode;
    /** Main feed content */
    children: React.ReactNode;
    /** Optional right sidebar (trending, suggestions) */
    sidebar?: React.ReactNode;
    /** Layout mode */
    layoutMode?: "centered" | "sidebar";
}
declare const FeedLayout: React.ForwardRefExoticComponent<FeedLayoutProps & React.RefAttributes<HTMLDivElement>>;
export { FeedLayout };
//# sourceMappingURL=feed-layout.d.ts.map