import * as React from "react";
export interface HiveLogoProps extends React.SVGAttributes<SVGSVGElement> {
    /** Logo color variant */
    variant?: "white" | "gold" | "black" | "currentColor";
    /** Size in pixels (width and height) */
    size?: number;
}
declare const HiveLogo: React.ForwardRefExoticComponent<HiveLogoProps & React.RefAttributes<SVGSVGElement>>;
export { HiveLogo };
//# sourceMappingURL=hive-logo.d.ts.map