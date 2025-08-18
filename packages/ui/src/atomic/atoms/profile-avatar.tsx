"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { Camera, Crown, Shield, Eye, EyeOff, Upload } from 'lucide-react';
import Image from 'next/image';

const profileAvatarVariants = cva(
  "relative flex-shrink-0 bg-[var(--hive-background-secondary)] border-[var(--hive-border-primary)] overflow-hidden",
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
        subtle: "border-2 border-[var(--hive-border-primary)]",
        primary: "border-2 border-[var(--hive-brand-gold)]",
        builder: "border-3 border-[var(--hive-brand-gold)] shadow-lg shadow-[var(--hive-brand-gold)]/20",
        verified: "border-3 border-[var(--hive-status-info)] shadow-lg shadow-[var(--hive-status-info)]/20"
      },
      status: {
        none: "",
        online: "ring-2 ring-[var(--hive-status-success)] ring-offset-2 ring-offset-[var(--hive-background-primary)]",
        away: "ring-2 ring-[var(--hive-status-warning)] ring-offset-2 ring-offset-[var(--hive-background-primary)]",
        busy: "ring-2 ring-[var(--hive-status-error)] ring-offset-2 ring-offset-[var(--hive-background-primary)]",
        offline: "ring-2 ring-[var(--hive-text-muted)] ring-offset-2 ring-offset-[var(--hive-background-primary)]"
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
  "absolute rounded-full border-2 border-[var(--hive-background-primary)]",
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
        online: "bg-[var(--hive-status-success)]",
        away: "bg-[var(--hive-status-warning)]", 
        busy: "bg-[var(--hive-status-error)]",
        offline: "bg-[var(--hive-text-muted)]"
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
        builder: "bg-[var(--hive-brand-gold)] rounded-full shadow-lg",
        verified: "bg-[var(--hive-status-info)] rounded-full shadow-lg",
        ghost: "bg-[var(--hive-text-muted)] rounded-full shadow-lg"
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
  onUpload?: (file: File) => void;
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
  onUpload,
  loading = false,
  size = "md",
  shape = "circle",
  border = "subtle",
  status = "none",
  className,
  ...props
}: ProfileAvatarProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  
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

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onUpload) {
      onUpload(file);
    }
    // Reset input value so same file can be selected again
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Handle upload trigger
  const triggerUpload = (e: React.MouseEvent) => {
    e.stopPropagation();
    fileInputRef.current?.click();
  };

  // Handle click
  const handleClick = () => {
    if (onEdit) {
      onEdit();
    }
  };

  // Get avatar size for Next.js Image
  const getAvatarSize = () => {
    const sizeMap = {
      xs: 32,
      sm: 48,
      md: 64,
      lg: 80,
      xl: 96,
      xxl: 128
    };
    return sizeMap[size];
  };

  return (
    <div
      className={cn(
        profileAvatarVariants({ size, shape, border: determinedBorder, status: determinedStatus }),
        "group cursor-pointer transition-all duration-200",
        editable && "hover:brightness-110 hover:scale-105",
        className
      )}
      onClick={editable ? handleClick : undefined}
      {...props}
    >
      {/* Avatar Image or Initials */}
      {loading ? (
        <div className="w-full h-full bg-[var(--hive-background-secondary)] animate-pulse" />
      ) : src ? (
        <Image
          src={src}
          alt={alt || `${name}'s profile`}
          width={getAvatarSize()}
          height={getAvatarSize()}
          className="w-full h-full object-cover"
          loading="lazy"
          onError={() => {
            // Image loading error will be handled by Next.js
            console.warn(`Failed to load avatar image: ${src}`);
          }}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[var(--hive-brand-gold)]/20 to-[var(--hive-brand-secondary)]/20 flex items-center justify-center">
          <span className={cn("font-bold text-[var(--hive-text-primary)]", textSize)}>
            {initials}
          </span>
        </div>
      )}

      {/* Fallback Initials (if image fails) */}
      {src && (
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--hive-brand-gold)]/20 to-[var(--hive-brand-secondary)]/20 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <span className={cn("font-bold text-[var(--hive-text-primary)]", textSize)}>
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
        <>
          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="flex flex-col items-center space-y-1 text-white">
              <Camera className={cn("text-white", iconSize)} />
              <span className="text-xs font-medium hidden sm:block">
                {onUpload ? 'Upload' : 'Edit'}
              </span>
            </div>
          </div>
          
          {onUpload && (
            <>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Upload profile photo"
              />
              
              {/* Upload Button (for touch devices) */}
              <button
                onClick={triggerUpload}
                className="absolute -bottom-2 -right-2 w-6 h-6 bg-[var(--hive-brand-primary)] rounded-full border-2 border-[var(--hive-background-primary)] flex items-center justify-center hover:scale-110 transition-transform sm:hidden"
                aria-label="Upload profile photo"
              >
                <Upload className="w-3 h-3 text-[var(--hive-background-primary)]" />
              </button>
            </>
          )}
        </>
      )}

      {/* Ghost Mode Overlay */}
      {ghostMode && (
        <div className="absolute inset-0 bg-[var(--hive-text-muted)]/20 flex items-center justify-center">
          <EyeOff className={cn("text-[var(--hive-text-muted)]", iconSize)} />
        </div>
      )}
    </div>
  );
}

// Export variants for external use
export { profileAvatarVariants };