'use client';

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "../../../lib/utils";

const avatarVariants = cva(
  "relative flex shrink-0 overflow-hidden text-[var(--hive-text-primary)]",
  {
    variants: {
      size: {
        sm: "h-6 aspect-square",
        default: "h-10 aspect-square",
        lg: "h-16 aspect-square",
        xl: "h-20 aspect-square",
        "2xl": "h-24 aspect-square",
      },
      variant: {
        default: "bg-[var(--hive-background-tertiary)]",
        brand:
          "bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-secondary)]",
        outline:
          "border border-[color-mix(in_srgb,var(--hive-border-primary) 65%,transparent)] bg-[var(--hive-background-primary)]",
      },
      shape: {
        circle: "rounded-full",
        rounded: "rounded-xl",
        portrait: "rounded-[20px] aspect-[3/4]",
      },
    },
    compoundVariants: [
      {
        shape: "portrait",
        size: "default",
        class: "h-16",
      },
      {
        shape: "portrait",
        size: "lg",
        class: "h-24",
      },
      {
        shape: "portrait",
        size: "xl",
        class: "h-[7.5rem]",
      },
      {
        shape: "portrait",
        size: "2xl",
        class: "h-[9rem]",
      },
    ],
    defaultVariants: {
      size: "default",
      variant: "default",
      shape: "portrait",
    },
  }
);

export interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof avatarVariants> {}

const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({ className, size, variant, shape, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(avatarVariants({ size, variant, shape }), className)}
      {...props}
    />
  )
);
Avatar.displayName = "Avatar";

const AvatarImage = React.forwardRef<
  HTMLImageElement,
  React.ImgHTMLAttributes<HTMLImageElement> & {
    onLoadingStatusChange?: (status: "idle" | "loading" | "loaded" | "error") => void
  }
>(({ className, src, alt, onLoadingStatusChange, ...props }, ref) => {
  const [loadingStatus, setLoadingStatus] = React.useState<"idle" | "loading" | "loaded" | "error">(
    "idle"
  );

  React.useEffect(() => {
    if (!src) {
      setLoadingStatus("error");
      return;
    }

    setLoadingStatus("loading");

    const img = new Image();
    img.onload = () => {
      setLoadingStatus("loaded");
      onLoadingStatusChange?.("loaded");
    };
    img.onerror = () => {
      setLoadingStatus("error");
      onLoadingStatusChange?.("error");
    };
    img.src = src;
  }, [src, onLoadingStatusChange]);

  if (loadingStatus === "loaded") {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        className={cn("h-full w-full rounded-inherit object-cover", className)}
        {...props}
      />
    );
  }

  return null;
});
AvatarImage.displayName = "AvatarImage";

const AvatarFallback = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "flex h-full w-full items-center justify-center rounded-inherit bg-[var(--hive-background-tertiary)] text-[var(--hive-text-primary)] text-sm font-medium",
      className
    )}
    {...props}
  />
));
AvatarFallback.displayName = "AvatarFallback";

// Alternative names for compatibility
const ShadcnAvatar = Avatar;
const ShadcnAvatarImage = AvatarImage;
const ShadcnAvatarFallback = AvatarFallback;

export {
  Avatar,
  AvatarImage,
  AvatarFallback,
  ShadcnAvatar,
  ShadcnAvatarImage,
  ShadcnAvatarFallback,
  avatarVariants,
};
