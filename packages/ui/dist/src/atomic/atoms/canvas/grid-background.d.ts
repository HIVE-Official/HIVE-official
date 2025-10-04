/**
 * Grid Background Component
 *
 * Infinite grid background for HiveLab canvas with dot or line pattern.
 * Scales with zoom and pans with viewport.
 */
import type { Viewport } from '@/types/hivelab.types';
export interface GridBackgroundProps {
    /** Viewport state (x, y, zoom) */
    viewport: Viewport;
    /** Grid size in pixels (default: 20) */
    gridSize?: number;
    /** Grid style */
    pattern?: 'dots' | 'lines';
    /** Grid color */
    color?: string;
    /** Background color */
    backgroundColor?: string;
    /** Show major grid lines every N cells */
    majorGridEvery?: number;
    /** Major grid line color */
    majorColor?: string;
    /** Additional class names */
    className?: string;
}
export declare function GridBackground({ viewport, gridSize, pattern, color, backgroundColor, majorGridEvery, majorColor, className, }: GridBackgroundProps): import("react/jsx-runtime").JSX.Element;
export declare namespace GridBackground {
    var displayName: string;
}
//# sourceMappingURL=grid-background.d.ts.map