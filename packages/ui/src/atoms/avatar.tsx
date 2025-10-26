// Bounded Context Owner: Design System Guild
import * as React from "react";
import {
  Avatar as BaseAvatar,
  AvatarFallback as BaseAvatarFallback,
  AvatarImage as BaseAvatarImage,
  type AvatarSize,
} from "../components/ui/avatar";
import { cn } from "../utils/cn";

export interface AvatarProps
  extends Omit<React.ComponentPropsWithoutRef<typeof BaseAvatar>, "asChild"> {
  src?: string | null;
  alt?: string;
  fallback?: string;
  showRing?: boolean;
  size?: AvatarSize;
}

const getInitials = (value?: string) => {
  if (!value) return "";
  const [first = "", second = ""] = value.trim().split(/\s+/);
  return `${first[0] ?? ""}${second[0] ?? ""}`.toUpperCase();
};

export const Avatar = React.forwardRef<React.ElementRef<typeof BaseAvatar>, AvatarProps>(
  ({ className, src, alt, fallback, showRing = false, size = "md", children, ...props }, ref) => {
    const displayFallback = fallback ?? getInitials(alt);

    return (
      <BaseAvatar
        ref={ref}
        className={cn(
          showRing && "ring-2 ring-primary ring-offset-2 ring-offset-background",
          className
        )}
        size={size}
        {...props}
      >
        {src ? <BaseAvatarImage src={src} alt={alt} className="h-full w-full object-cover" /> : null}
        <BaseAvatarFallback className="flex h-full w-full items-center justify-center uppercase">
          {displayFallback}
        </BaseAvatarFallback>
        {children}
      </BaseAvatar>
    );
  }
);

Avatar.displayName = "Avatar";

export const AvatarImage = BaseAvatarImage;
export const AvatarFallback = BaseAvatarFallback;
export type { AvatarSize } from "../components/ui/avatar";
