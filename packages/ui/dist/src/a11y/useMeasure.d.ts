export type MeasureBounds = {
    width: number;
    height: number;
    top: number;
    left: number;
    right: number;
    bottom: number;
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
export declare function useMeasure<T extends Element = HTMLDivElement>({ box, onResize, }?: UseMeasureOptions): {
    ref: (node: T | null) => void;
    bounds: MeasureBounds;
};
//# sourceMappingURL=useMeasure.d.ts.map