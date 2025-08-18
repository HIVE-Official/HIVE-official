import React from "react";
interface HiveLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    variant?: "white" | "black" | "gold";
    size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
    animationType?: "none" | "pulse" | "spin" | "gentle-float";
}
export declare function HiveLogo({ className, variant, size, animationType, ...props }: HiveLogoProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=HiveLogo.d.ts.map