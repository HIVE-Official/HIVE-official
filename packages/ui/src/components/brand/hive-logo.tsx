import React from "react";
import { cn } from "../../lib/utils";

// Use direct paths for robust asset handling in both Next.js and Storybook
const LOGO_PATHS = {
  white: "/assets/whitelogo.svg",
  black: "/assets/blacklogo.svg",
};

export interface HiveLogoProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  variant?: "white" | "black";
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: "h-8",
  md: "h-10",
  lg: "h-12",
};

export function HiveLogo({
  variant = "white",
  size = "md",
  className,
  ...props
}: HiveLogoProps) {
  const logoSrc = LOGO_PATHS[variant];
  const sizeClass = sizeMap[size];

  return (
    <img
      src={logoSrc}
      alt="HIVE Logo"
      className={cn("object-contain", sizeClass, className)}
      {...props}
    />
  );
}

export default HiveLogo;
