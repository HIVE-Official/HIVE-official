import React from "react";
import { cn } from "../lib/utils";

interface HiveLogoProps extends React.SVGProps<SVGSVGElement> {
  variant?: "white" | "black";
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "h-5 w-5",
  md: "h-6 w-6",
  lg: "h-8 w-8",
  xl: "h-12 w-12",
};

export function HiveLogo({
  className,
  variant = "white",
  size = "md",
  ...props
}: HiveLogoProps) {
  const fillColor = variant === "white" ? "#FFFFFF" : "#000000";

  return (
    <svg
      id="hive-logo"
      data-name="HIVE Logo"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 1500 1500"
      className={cn(sizeClasses[size], className)}
      {...props}
    >
      <defs>
        <style>{`.hive-logo-path { fill: ${fillColor}; }`}</style>
      </defs>
      <path
        className="hive-logo-path"
        d="M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64-262.27,150.84.28,303.16,259.55,150.31,5.53-.33,633.4-365.81,374.52,215.84v433.92l-372.35,215.04h-2.88l-372.84-215.99-.27-174.53,112.08-63.56v173.76c87.89,49.22,174.62,101.14,262.48,150.69l261.99-151.64v-302.41s-261.51-151.27-261.51-151.27l-2.58.31-635.13,366.97c-121.32-69.01-241.36-140.28-362.59-209.44-4.21-2.4-8.42-5.15-13.12-6.55v-433.92l375.23-216h.96Z"
      />
    </svg>
  );
}
