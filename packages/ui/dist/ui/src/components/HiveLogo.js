"use client";
import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from "../lib/utils";
import { MotionDiv } from "./motion-wrapper";
const sizeClasses = {
    sm: "h-5 w-5",
    md: "h-6 w-6",
    lg: "h-8 w-8",
    xl: "h-12 w-12",
    "2xl": "h-24 w-24",
    "3xl": "h-48 w-48",
};
const animationVariants = {
    pulse: {
        scale: [1, 1.05, 1],
        transition: {
            duration: 2,
            ease: "easeInOut",
            repeat: Infinity,
        },
    },
    spin: {
        rotate: [0, 360],
        transition: {
            duration: 15,
            ease: "linear",
            repeat: Infinity,
        },
    },
    "gentle-float": {
        y: ["-5%", "5%"],
        transition: {
            duration: 4,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
        },
    },
};
const LogoImage = ({ logoSrc, size, variant, className, ...props }) => (_jsx("img", { src: logoSrc, alt: "HIVE Logo", className: cn(sizeClasses[size], "object-contain", variant === "gold" &&
        "brightness-0 saturate-100 hue-rotate-45 contrast-150", className), ...props }));
export function HiveLogo({ className, variant = "white", size = "md", animationType = "none", ...props }) {
    // Use real logo files
    const logoSrc = variant === "black" ? "/assets/blacklogo.svg" : "/assets/whitelogo.svg";
    if (animationType !== "none") {
        return (_jsx(MotionDiv, { className: cn(sizeClasses[size], "flex items-center justify-center"), animate: animationType, variants: animationVariants, children: _jsx(LogoImage, { logoSrc: logoSrc, size: size, variant: variant, className: className, ...props }) }));
    }
    return (_jsx("div", { className: cn(sizeClasses[size], "flex items-center justify-center", className), children: _jsx(LogoImage, { logoSrc: logoSrc, size: size, variant: variant, className: className, ...props }) }));
}
//# sourceMappingURL=HiveLogo.js.map