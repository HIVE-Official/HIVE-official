import React from "react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface HiveLogoProps extends React.HTMLProps<HTMLDivElement> {
  variant?: "white" | "black" | "gold";
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "3xl";
  animationType?: "none" | "pulse" | "spin" | "gentle-float";
}

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
      repeatType: "reverse" as const,
    },
  },
};

export function HiveLogo({
  className,
  variant = "white",
  size = "md",
  animationType = "none",
  ...props
}: HiveLogoProps) {
  // Use real logo files
  const logoSrc =
    variant === "black" ? "/assets/blacklogo.svg" : "/assets/whitelogo.svg";

  const LogoImage = () => (
    <img
      src={logoSrc}
      alt="HIVE Logo"
      className={cn(
        sizeClasses[size],
        "object-contain",
        variant === "gold" &&
          "brightness-0 saturate-100 hue-rotate-45 contrast-150",
        className
      )}
      {...props}
    />
  );

  if (animationType !== "none") {
    return (
      <motion.div
        className={cn(sizeClasses[size], "flex items-center justify-center")}
        animate={animationType}
        variants={animationVariants}
      >
        <LogoImage />
      </motion.div>
    );
  }

  return (
    <div
      className={cn(
        sizeClasses[size],
        "flex items-center justify-center",
        className
      )}
    >
      <LogoImage />
    </div>
  );
}
