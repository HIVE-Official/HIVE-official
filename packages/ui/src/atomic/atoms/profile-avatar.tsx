"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Camera, Crown, Shield, Eye, EyeOff } from 'lucide-react';

const profileAvatarVariants = cva(
  "relative flex-shrink-0 bg-hive-surface-elevated border-hive-border-subtle overflow-hidden",
  {
    variants: {
      size: {
        xs: "w-8 h-8",
        sm: "w-12 h-12", 
        md: "w-16 h-16",
        lg: "w-20 h-20",
        xl: "w-24 h-24",
        xxl: "w-32 h-32"
      },
      shape: {
        circle: "rounded-full",
        rounded: "rounded-xl",
        square: "rounded-lg"
      },
      border: {
        none: "border-0",
        subtle: "border-2 border-hive-border-subtle",
        primary: "border-2 border-hive-gold",
        builder: "border-3 border-hive-gold shadow-lg shadow-hive-gold/20",
        verified: "border-3 border-blue-400 shadow-lg shadow-blue-400/20"
      },
      status: {
        none: "",
        online: "ring-2 ring-green-400 ring-offset-2 ring-offset-hive-background-primary",
        away: "ring-2 ring-yellow-400 ring-offset-2 ring-offset-hive-background-primary",
        busy: "ring-2 ring-red-400 ring-offset-2 ring-offset-hive-background-primary",
        offline: "ring-2 ring-gray-400 ring-offset-2 ring-offset-hive-background-primary"
      }
    },
    defaultVariants: {
      size: "md",
      shape: "circle",
      border: "subtle",
      status: "none"
    }
  }
);

const statusDotVariants = cva(
  "absolute rounded-full border-2 border-hive-background-primary",
  {
    variants: {
      size: {
        xs: "w-2 h-2 bottom-0 right-0",
        sm: "w-3 h-3 bottom-0 right-0",
        md: "w-3 h-3 bottom-1 right-1",
        lg: "w-4 h-4 bottom-1 right-1", 
        xl: "w-4 h-4 bottom-1 right-1",
        xxl: "w-5 h-5 bottom-2 right-2"
      },
      status: {
        none: "hidden",
        online: "bg-green-400",
        away: "bg-yellow-400", 
        busy: "bg-red-400",
        offline: "bg-gray-400"
      }
    },
    defaultVariants: {
      size: "md",
      status: "none"
    }
  }
);

const badgeVariants = cva(
  "absolute flex items-center justify-center text-white",
  {
    variants: {
      size: {
        xs: "w-4 h-4 -top-1 -right-1",
        sm: "w-5 h-5 -top-1 -right-1", 
        md: "w-6 h-6 -top-2 -right-2",
        lg: "w-7 h-7 -top-2 -right-2",
        xl: "w-8 h-8 -top-3 -right-3",
        xxl: "w-10 h-10 -top-4 -right-4"
      },
      type: {
        none: "hidden",
        builder: "bg-hive-gold rounded-full shadow-lg",
        verified: "bg-blue-500 rounded-full shadow-lg",
        ghost: "bg-gray-600 rounded-full shadow-lg"
      }
    },
    defaultVariants: {
      size: "md",
      type: "none"
    }
  }
);

export interface ProfileAvatarProps 
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof profileAvatarVariants> {
  src?: string;
  alt?: string;
  name: string;
  isBuilder?: boolean;
  isVerified?: boolean;
  ghostMode?: boolean;
  onlineStatus?: 'online' | 'offline' | 'away' | 'busy';
  showStatus?: boolean;
  showBadges?: boolean;
  editable?: boolean;
  onEdit?: () => void;
  loading?: boolean;
}

export function ProfileAvatar({
  src,
  alt,
  name,
  isBuilder = false,
  isVerified = false,
  ghostMode = false,
  onlineStatus,
  showStatus = false,
  showBadges = true,
  editable = false,
  onEdit,
  loading = false,
  size = "md",
  shape = "circle",
  border = "subtle",
  status = "none",
  className,
  ...props
}: ProfileAvatarProps) {
  
  // Auto-determine border based on user status
  const determinedBorder = React.useMemo(() => {
    if (border !== "subtle") return border;
    if (isBuilder) return "builder";
    if (isVerified) return "verified";
    return "subtle";
  }, [border, isBuilder, isVerified]);

  // Auto-determine status from onlineStatus
  const determinedStatus = React.useMemo(() => {
    if (status !== "none") return status;
    if (!showStatus || !onlineStatus) return "none";
    return onlineStatus;
  }, [status, showStatus, onlineStatus]);

  // Generate initials from name
  const initials = React.useMemo(() => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }, [name]);

  // Icon sizes based on avatar size
  const iconSize = React.useMemo(() => {
    const sizes = {
      xs: "h-2 w-2",
      sm: "h-3 w-3",
      md: "h-3 w-3", 
      lg: "h-4 w-4",
      xl: "h-4 w-4",
      xxl: "h-5 w-5"
    };
    return sizes[size];
  }, [size]);

  const textSize = React.useMemo(() => {
    const sizes = {
      xs: "text-xs",
      sm: "text-sm",
      md: "text-base",
      lg: "text-lg", 
      xl: "text-xl",
      xxl: "text-2xl"
    };
    return sizes[size];
  }, [size]);

  return (
    <div
      className={cn(
        profileAvatarVariants({ size, shape, border: determinedBorder, status: determinedStatus }),
        "group cursor-pointer transition-all duration-200",
        editable && "hover:brightness-110 hover:scale-105",
        className
      )}
      onClick={editable ? onEdit : undefined}
      {...props}
    >
      {/* Avatar Image or Initials */}
      {loading ? (
        <div className="w-full h-full bg-hive-surface-elevated animate-pulse" />
      ) : src ? (
        <img
          src={src}
          alt={alt || `${name}'s profile`}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to initials if image fails
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-hive-gold/20 to-hive-brand-secondary/20 flex items-center justify-center">
          <span className={cn("font-bold text-hive-text-primary", textSize)}>
            {initials}
          </span>
        </div>
      )}

      {/* Fallback Initials (if image fails) */}
      {src && (
        <div className="absolute inset-0 bg-gradient-to-br from-hive-gold/20 to-hive-brand-secondary/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className={cn("font-bold text-hive-text-primary", textSize)}>
            {initials}
          </span>
        </div>
      )}

      {/* Status Dot */}
      {showStatus && (
        <div className={cn(statusDotVariants({ size, status: determinedStatus }))} />
      )}

      {/* Badges */}
      {showBadges && (
        <>
          {/* Builder Badge */}
          {isBuilder && (
            <div className={cn(badgeVariants({ size, type: "builder" }))}>
              <Crown className={iconSize} />
            </div>
          )}
          
          {/* Verified Badge */}
          {isVerified && !isBuilder && (
            <div className={cn(badgeVariants({ size, type: "verified" }))}>
              <Shield className={iconSize} />
            </div>
          )}
          
          {/* Ghost Mode Badge */}
          {ghostMode && !isBuilder && !isVerified && (
            <div className={cn(badgeVariants({ size, type: "ghost" }))}>
              <EyeOff className={iconSize} />
            </div>
          )}
        </>
      )}

      {/* Edit Overlay */}
      {editable && (
        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Camera className={cn("text-white", iconSize)} />
        </div>
      )}

      {/* Ghost Mode Overlay */}
      {ghostMode && (
        <div className="absolute inset-0 bg-gray-900/20 flex items-center justify-center">
          <EyeOff className={cn("text-gray-400", iconSize)} />
        </div>
      )}
    </div>
  );
}

// Export variants for external use
export { profileAvatarVariants };