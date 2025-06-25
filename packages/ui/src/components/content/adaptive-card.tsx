"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const adaptiveCardVariants = cva(
  "relative overflow-hidden rounded-2xl border transition-all duration-300 ease-[cubic-bezier(0.22,0.61,0.36,1)]",
  {
    variants: {
      variant: {
        glass:
          "bg-[#0A0A0A]/60 backdrop-blur-xl border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05)]",
        outline: "bg-transparent border-white/10 hover:bg-white/5",
      },
      size: {
        default: "p-6",
        sm: "p-4",
        lg: "p-8",
      },
      interactive: {
        none: "",
        hover:
          "hover:border-white/20 hover:shadow-[0_0_20px_0_rgba(255,255,255,0.05)]",
        glow: "hover:shadow-[0_0_20px_0_var(--glow-color,rgba(255,215,0,0.2))]",
      },
    },
    defaultVariants: {
      variant: "glass",
      size: "default",
      interactive: "none",
    },
  }
);

export interface AdaptiveCardProps
  extends Omit<
      React.HTMLAttributes<HTMLDivElement>,
      "onDrag" | "onDragEnd" | "onDragStart"
    >,
    VariantProps<typeof adaptiveCardVariants> {
  children: React.ReactNode;
  loading?: boolean;
  onInteract?: () => void;
}

const AdaptiveCard = React.forwardRef<HTMLDivElement, AdaptiveCardProps>(
  (
    {
      className,
      variant,
      size,
      interactive,
      children,
      loading = false,
      onInteract,
      id,
      role,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      ..._props
    },
    ref
  ) => {
    const MotionDiv = motion.div;

    return (
      <MotionDiv
        ref={ref}
        className={cn(
          adaptiveCardVariants({ variant, size, interactive }),
          className
        )}
        onClick={onInteract}
        id={id}
        role={role}
        aria-label={ariaLabel}
        aria-labelledby={ariaLabelledBy}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.2,
          ease: [0.4, 0, 0.2, 1],
        }}
        whileHover={
          interactive !== "none"
            ? {
                y: -2,
                transition: { duration: 0.09, ease: "easeOut" },
              }
            : undefined
        }
      >
        {loading ? (
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
            <div className="h-20 bg-muted rounded"></div>
          </div>
        ) : (
          children
        )}
      </MotionDiv>
    );
  }
);
AdaptiveCard.displayName = "AdaptiveCard";

// Card composition components
const AdaptiveCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex flex-col space-y-2 pb-4", className)}
    {...props}
  />
));
AdaptiveCardHeader.displayName = "AdaptiveCardHeader";

const AdaptiveCardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex-1", className)} {...props} />
));
AdaptiveCardContent.displayName = "AdaptiveCardContent";

const AdaptiveCardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex items-center justify-between pt-4 border-t border-white/5",
      className
    )}
    {...props}
  />
));
AdaptiveCardFooter.displayName = "AdaptiveCardFooter";

const AdaptiveCardTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm font-medium leading-none", className)}
    {...props}
  />
));
AdaptiveCardTitle.displayName = "AdaptiveCardTitle";

const AdaptiveCardDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
));
AdaptiveCardDescription.displayName = "AdaptiveCardDescription";

const CardMedia = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    aspectRatio?: "square" | "video" | "wide" | "tall";
  }
>(({ className, aspectRatio = "video", ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative overflow-hidden rounded-md bg-muted",
      {
        "aspect-square": aspectRatio === "square",
        "aspect-video": aspectRatio === "video",
        "aspect-[2/1]": aspectRatio === "wide",
        "aspect-[3/4]": aspectRatio === "tall",
      },
      className
    )}
    {...props}
  />
));
CardMedia.displayName = "CardMedia";

export {
  AdaptiveCardHeader as CardHeader,
  AdaptiveCardContent as CardContent,
  AdaptiveCardFooter as CardFooter,
  AdaptiveCardTitle as CardTitle,
  AdaptiveCardDescription as CardDescription,
  AdaptiveCard as Card,
  AdaptiveCard,
  CardMedia,
  adaptiveCardVariants,
};
