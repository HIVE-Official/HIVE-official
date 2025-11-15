import * as React from "react";
export interface PortalProps {
    /**
     * Children to render inside the portal.
     */
    children: React.ReactNode;
    /**
     * Optional external container element. When provided, containerId is ignored.
     */
    container?: HTMLElement | null;
    /**
     * Fallback container ID (defaults to hive-portal-root) created under document.body when missing.
     */
    containerId?: string;
}
/**
 * Portal renders children into a detached DOM node (defaults to #hive-portal-root) to support overlays.
 */
export declare function Portal({ children, container, containerId }: PortalProps): React.ReactPortal;
//# sourceMappingURL=Portal.d.ts.map