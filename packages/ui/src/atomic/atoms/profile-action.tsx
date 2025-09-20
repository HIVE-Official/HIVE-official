"use client";

import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../../lib/utils';
import { 
  Edit3, 
  Settings, 
  Share2, 
  MessageSquare, 
  UserPlus, 
  MoreHorizontal,
  Camera,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Heart,
  Bookmark,
  Link,
  Download,
  Upload,
  LucideIcon 
} from 'lucide-react';

const profileActionVariants = cva(
  "inline-flex items-center justify-center gap-2 font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed",
  {
    variants: {
      size: {
        xs: "px-2 py-1 text-xs min-h-[28px]",
        sm: "px-3 py-1.5 text-sm min-h-[32px]",
        md: "px-4 py-2 text-sm min-h-[36px]",
        lg: "px-6 py-3 text-base min-h-[44px]"
      },
      variant: {
        primary: "bg-[var(--hive-brand-gold)] text-[var(--hive-text-inverse)] hover:bg-[var(--hive-brand-secondary)] shadow-lg hover:shadow-xl",
        secondary: "bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] border border-[var(--hive-border-primary)] hover:bg-[var(--hive-background-interactive)] hover:border-[var(--hive-brand-gold)]/30",
        outline: "border border-[var(--hive-border-primary)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-interactive)] hover:border-[var(--hive-brand-gold)]/30",
        ghost: "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-interactive)]",
        destructive: "bg-[var(--hive-status-error)]/20 text-[var(--hive-status-error)] border border-[var(--hive-status-error)]/30 hover:bg-[var(--hive-status-error)]/30",
        success: "bg-[var(--hive-status-success)]/20 text-[var(--hive-status-success)] border border-[var(--hive-status-success)]/30 hover:bg-[var(--hive-status-success)]/30"
      },
      shape: {
        rounded: "rounded-lg",
        pill: "rounded-full",
        square: "rounded-md"
      },
      width: {
        auto: "w-auto",
        full: "w-full",
        icon: "aspect-square"
      },
      interactive: {
        true: "cursor-pointer hover:scale-105 active:scale-95",
        false: "cursor-default"
      }
    },
    defaultVariants: {
      size: "md",
      variant: "secondary",
      shape: "rounded",
      width: "auto",
      interactive: true
    }
  }
);

const iconVariants = cva(
  "flex-shrink-0",
  {
    variants: {
      size: {
        xs: "h-3 w-3",
        sm: "h-4 w-4",
        md: "h-4 w-4",
        lg: "h-5 w-5"
      }
    },
    defaultVariants: {
      size: "md"
    }
  }
);

// Predefined action types
export const ACTION_TYPES = {
  edit: {
    icon: Edit3,
    label: "Edit Profile",
    variant: "outline" as const
  },
  settings: {
    icon: Settings,
    label: "Settings",
    variant: "ghost" as const
  },
  share: {
    icon: Share2,
    label: "Share",
    variant: "ghost" as const
  },
  message: {
    icon: MessageSquare,
    label: "Message",
    variant: "primary" as const
  },
  connect: {
    icon: UserPlus,
    label: "Connect",
    variant: "outline" as const
  },
  follow: {
    icon: Heart,
    label: "Follow",
    variant: "outline" as const
  },
  bookmark: {
    icon: Bookmark,
    label: "Save",
    variant: "ghost" as const
  },
  camera: {
    icon: Camera,
    label: "Change Photo",
    variant: "secondary" as const
  },
  privacy: {
    icon: Shield,
    label: "Privacy",
    variant: "ghost" as const
  },
  notifications: {
    icon: Bell,
    label: "Notifications",
    variant: "ghost" as const
  },
  visibility: {
    icon: Eye,
    label: "Visibility",
    variant: "ghost" as const
  },
  ghost: {
    icon: EyeOff,
    label: "Ghost Mode",
    variant: "ghost" as const
  },
  copy: {
    icon: Link,
    label: "Copy Link",
    variant: "ghost" as const
  },
  download: {
    icon: Download,
    label: "Download",
    variant: "ghost" as const
  },
  upload: {
    icon: Upload,
    label: "Upload",
    variant: "secondary" as const
  },
  more: {
    icon: MoreHorizontal,
    label: "More",
    variant: "ghost" as const
  }
} as const;

export type ActionType = keyof typeof ACTION_TYPES;

export interface ProfileActionProps 
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'type'>,
    VariantProps<typeof profileActionVariants> {
  actionType?: ActionType;
  type?: "button" | "submit" | "reset";
  label?: string;
  icon?: LucideIcon;
  iconOnly?: boolean;
  loading?: boolean;
  badge?: string | number;
  tooltip?: string;
  href?: string;
  external?: boolean
}

export function ProfileAction({
  actionType,
  type = "button",
  label,
  icon: CustomIcon,
  iconOnly = false,
  loading = false,
  badge,
  tooltip,
  href,
  external = false,
  onClick,
  size = "md",
  variant = "secondary",
  shape = "rounded",
  width = "auto",
  interactive = true,
  disabled,
  className,
  children,
  ...props
}: ProfileActionProps) {
  
  // Get predefined action config if actionType is provided
  const actionConfig = actionType ? ACTION_TYPES[actionType] : null;
  
  // Determine final values
  const finalIcon = CustomIcon || actionConfig?.icon;
  const finalLabel = label || actionConfig?.label || "Action";
  const finalVariant = variant !== "secondary" ? variant : (actionConfig?.variant || "secondary");
  const finalDisabled = disabled || loading;

  // Handle click with loading state
  const handleClick = React.useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
    if (loading || disabled) return;
    if (href) {
      if (external) {
        window.open(href, '_blank', 'noopener,noreferrer')
      } else {
        window.location.href = href
      }
      return
    }
    onClick?.(e)
  }, [loading, disabled, href, external, onClick]);

  const content = (
    <>
      {/* Loading Spinner */}
      {loading && (
        <div className="animate-spin rounded-full border-2 border-current border-t-transparent h-4 w-4" />
      )}
      
      {/* Icon */}
      {!loading && finalIcon && (
        React.createElement(finalIcon, { className: cn(iconVariants({ size })) })
      )}
      
      {/* Label */}
      {!iconOnly && !loading && (
        <span className="truncate">{finalLabel}</span>
      )}
      
      {/* Children override */}
      {children}
      
      {/* Badge */}
      {badge && (
        <span className="ml-1 px-1.5 py-0.5 bg-[var(--hive-brand-gold)] text-[var(--hive-text-inverse)] text-xs font-bold rounded-full min-w-[16px] flex items-center justify-center">
          {typeof badge === 'number' && badge > 99 ? '99+' : badge}
        </span>
      )}
    </>
  );

  // Render as link if href is provided
  if (href && !onClick) {
    return (
      <a
        href={href}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        className={cn(
          profileActionVariants({
            size,
            variant: finalVariant,
            shape,
            width,
            interactive
          }),
          finalDisabled && "pointer-events-none",
          className
        )}
        title={tooltip}
        aria-label={finalLabel}
      >
        {content}
      </a>
    )
  }

  return (
    <button
      className={cn(
        profileActionVariants({ 
          size, 
          variant: finalVariant, 
          shape, 
          width, 
          interactive 
        }),
        className
      )}
      onClick={handleClick}
      disabled={finalDisabled}
      title={tooltip}
      aria-label={finalLabel}
      {...props}
    >
      {content}
    </button>
  )
}

// Preset action components for common use cases
export function EditAction({ ...props }: Omit<ProfileActionProps, 'actionType'>) {
  return <ProfileAction actionType="edit" {...props} />
}

export function ShareAction({ ...props }: Omit<ProfileActionProps, 'actionType'>) {
  return <ProfileAction actionType="share" {...props} />
}

export function MessageAction({ ...props }: Omit<ProfileActionProps, 'actionType'>) {
  return <ProfileAction actionType="message" {...props} />
}

export function ConnectAction({ ...props }: Omit<ProfileActionProps, 'actionType'>) {
  return <ProfileAction actionType="connect" {...props} />
}

export function SettingsAction({ ...props }: Omit<ProfileActionProps, 'actionType'>) {
  return <ProfileAction actionType="settings" {...props} />
}

export function CameraAction({ ...props }: Omit<ProfileActionProps, 'actionType'>) {
  return <ProfileAction actionType="camera" {...props} />
}

export function MoreAction({ ...props }: Omit<ProfileActionProps, 'actionType'>) {
  return <ProfileAction actionType="more" {...props} />
}

// Export variants for external use
export { profileActionVariants };