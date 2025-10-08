import * as React from "react";
export interface RitualProgressRingProps extends React.HTMLAttributes<HTMLDivElement> {
    /** Personal progress percentage (0-100) */
    personal: number;
    /** Campus-wide progress percentage (0-100) */
    campus: number;
    /** Target value (for display) */
    target?: number;
    /** Size variant */
    size?: "sm" | "md" | "lg";
    /** Show labels */
    showLabels?: boolean;
}
declare const RitualProgressRing: React.ForwardRefExoticComponent<RitualProgressRingProps & React.RefAttributes<HTMLDivElement>>;
export { RitualProgressRing };
//# sourceMappingURL=ritual-progress-ring.d.ts.map