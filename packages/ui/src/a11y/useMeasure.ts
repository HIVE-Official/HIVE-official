import * as React from "react";

const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? React.useLayoutEffect : React.useEffect;

export type MeasureBounds = {
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;
};

const defaultBounds: MeasureBounds = {
  width: 0,
  height: 0,
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
};

export interface UseMeasureOptions {
  /**
   * Resize observer box type. Defaults to "border-box".
   */
  box?: "content-box" | "border-box" | "device-pixel-content-box";
  /**
   * Optional onResize callback fired with the new bounds.
   */
  onResize?: (bounds: MeasureBounds) => void;
}

/**
 * useMeasure returns live bounds for a DOM node using ResizeObserver.
 * Works in both layout and hydration-safe scenarios.
 */
export function useMeasure<T extends Element = HTMLDivElement>({
  box,
  onResize,
}: UseMeasureOptions = {}) {
  const ref = React.useRef<T | null>(null);
  const [bounds, setBounds] = React.useState<MeasureBounds>(defaultBounds);

  useIsomorphicLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof ResizeObserver === "undefined") {
      return;
    }

    const observer = new ResizeObserver((entries) => {
      const entry = entries[0];
      if (!entry) return;

      const { width, height, top, left, right, bottom } = entry.contentRect;
      const nextBounds: MeasureBounds = { width, height, top, left, right, bottom };
      setBounds(nextBounds);
      onResize?.(nextBounds);
    });

    observer.observe(node, box ? { box } : undefined);
    return () => observer.disconnect();
  }, [box, onResize]);

  const callbackRef = React.useCallback((node: T | null) => {
    ref.current = node;
  }, []);

  return { ref: callbackRef, bounds };
}

