import * as React from "react";
/**
 * Space Side Panel
 *
 * SPEC-compliant side panel overlay for widget expansion.
 * Replaces modals with smooth slide-in panels.
 *
 * Layout behavior:
 * - Desktop: Slides in from right, pushes content left (40% → 60% width)
 * - Mobile: Bottom sheet with swipe gestures
 * - Hash URL: Updates to #events, #members, #resources
 */
export interface SpaceSidePanelProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Panel is open */
    isOpen: boolean;
    /** Panel type (determines hash URL) */
    panelType?: "events" | "members" | "resources" | "about" | "tools";
    /** Title for panel header */
    title: string;
    /** Content to display in panel */
    children: React.ReactNode;
    /** Close handler */
    onClose: () => void;
    /** Panel width on desktop */
    width?: "40%" | "50%" | "60%";
}
export declare const SpaceSidePanel: React.ForwardRefExoticComponent<SpaceSidePanelProps & React.RefAttributes<HTMLDivElement>>;
//# sourceMappingURL=space-side-panel.d.ts.map