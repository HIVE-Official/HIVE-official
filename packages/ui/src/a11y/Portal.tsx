import * as React from "react";
import { createPortal } from "react-dom";

const canUseDom = typeof window !== "undefined" && typeof document !== "undefined";

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
export function Portal({ children, container, containerId = "hive-portal-root" }: PortalProps) {
  const [mountNode, setMountNode] = React.useState<HTMLElement | null>(null);
  const wasCreatedRef = React.useRef(false);

  React.useEffect(() => {
    if (!canUseDom) return;

    if (container) {
      setMountNode(container);
      wasCreatedRef.current = false;
      return;
    }

    let element = containerId ? document.getElementById(containerId) : null;
    if (!element && containerId) {
      element = document.createElement("div");
      element.id = containerId;
      document.body.appendChild(element);
      wasCreatedRef.current = true;
    }

    if (element) {
      setMountNode(element);
    }

    return () => {
      if (element && wasCreatedRef.current && element.parentNode) {
        element.parentNode.removeChild(element);
      }
    };
  }, [container, containerId]);

  if (!canUseDom) return null;
  if (!mountNode) return null;

  return createPortal(children, mountNode);
}
