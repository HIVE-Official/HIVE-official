'use client';

import * as React from "react";
import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// HIVE Brand System - Using Existing Assets and Design Tokens
// Uses actual HIVE logos and PRD-aligned color system

const logoVariants = cva(
  "shrink-0",
  {
    variants: {
      size: {
        xs: "h-4 w-4",
        sm: "h-6 w-6",
        default: "h-8 w-8",
        md: "h-10 w-10",
        lg: "h-12 w-12",
        xl: "h-16 w-16",
        "2xl": "h-20 w-20",
        "3xl": "h-24 w-24",
      },
      color: {
        black: "",
        gold: "",
        white: "",
        auto: "", // Adapts to theme
      }
    },
    defaultVariants: {
      size: "default",
      color: "auto",
    },
  }
);

// HIVE Logo Component using actual SVG assets
export interface HiveLogoProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>,
    VariantProps<typeof logoVariants> {
  variant?: 'solid' | 'outline' | 'minimal' | 'gradient' | 'glass' | 'neon' | 'textured' | 'animated' | 'monochrome';
  withText?: boolean;
  textPosition?: 'right' | 'bottom' | 'center';
  glowEffect?: boolean;
  rounded?: boolean;
}

// Inline SVG components for better control and styling
const HiveLogoSVG = ({ color, variant, className, glowEffect }: { color?: string; variant?: string; className?: string; glowEffect?: boolean }) => {
  const logoPath = "M432.83,133.2l373.8,216.95v173.77s-111.81,64.31-111.81,64.31v-173.76l-262.47-150.64-262.27,150.84.28,303.16,259.55,150.31,5.53-.33,633.4-365.81,374.52,215.84v433.92l-372.35,215.04h-2.88l-372.84-215.99-.27-174.53,112.08-63.56v173.76c87.89,49.22,174.62,101.14,262.48,150.69l261.99-151.64v-302.41s-261.51-151.27-261.51-151.27l-2.58.31-635.13,366.97c-121.32-69.01-241.36-140.28-362.59-209.44-4.21-2.4-8.42-5.15-13.12-6.55v-433.92l375.23-216h.96Z";
  
  const baseProps = {
    viewBox: "0 0 1500 1500",
    className,
    xmlns: "http://www.w3.org/2000/svg"
  };

  if (variant === 'gradient') {
    return (
      <svg {...baseProps}>
        <defs>
          <linearGradient id="hiveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="var(--hive-brand-secondary)" />
            <stop offset="50%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          {glowEffect && (
            <filter id="glow">
              <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          )}
        </defs>
        <path 
          d={logoPath} 
          fill="url(#hiveGradient)" 
          filter={glowEffect ? "url(#glow)" : undefined}
        />
      </svg>
    );
  }

  if (variant === 'glass') {
    return (
      <svg {...baseProps}>
        <defs>
          <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(255,255,255,0.3)" />
            <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
          </linearGradient>
          <filter id="glassBorder">
            <feGaussianBlur in="SourceGraphic" stdDeviation="1"/>
          </filter>
        </defs>
        <path 
          d={logoPath} 
          fill="url(#glassGradient)" 
          stroke="rgba(255,255,255,0.4)"
          strokeWidth="2"
          filter="url(#glassBorder)"
          style={{ backdropFilter: 'blur(10px)' }}
        />
      </svg>
    );
  }

  if (variant === 'neon') {
    return (
      <svg {...baseProps}>
        <defs>
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        <path 
          d={logoPath} 
          fill="none"
          stroke={color || "var(--hive-brand-secondary)"}
          strokeWidth="8"
          filter="url(#neonGlow)"
          style={{ 
            filter: 'drop-shadow(0 0 10px currentColor)',
            animation: 'pulse 2s infinite'
          }}
        />
      </svg>
    );
  }

  if (variant === 'textured') {
    return (
      <svg {...baseProps}>
        <defs>
          <pattern id="texture" patternUnits="userSpaceOnUse" width="20" height="20">
            <rect width="20" height="20" fill={color || "currentColor"} opacity="0.9"/>
            <circle cx="10" cy="10" r="2" fill="rgba(255,255,255,0.2)"/>
            <circle cx="5" cy="5" r="1" fill="rgba(255,255,255,0.1)"/>
            <circle cx="15" cy="15" r="1" fill="rgba(255,255,255,0.1)"/>
          </pattern>
        </defs>
        <path d={logoPath} fill="url(#texture)" />
      </svg>
    );
  }

  if (variant === 'animated') {
    return (
      <svg {...baseProps} className={`${className} animate-spin`} style={{ animation: 'spin 8s linear infinite' }}>
        <path 
          d={logoPath} 
          fill={color || "currentColor"}
          style={{ 
            transformOrigin: 'center',
            animation: 'pulse 2s ease-in-out infinite alternate'
          }}
        />
      </svg>
    );
  }

  if (variant === 'monochrome') {
    return (
      <svg {...baseProps} style={{ filter: 'grayscale(100%) contrast(1.2)' }}>
        <path d={logoPath} fill={color || "currentColor"} />
      </svg>
    );
  }

  if (variant === 'outline') {
    return (
      <svg {...baseProps} fill="none">
        <path 
          d={logoPath}
          stroke={color || "currentColor"}
          strokeWidth="20"
          fill="none"
        />
      </svg>
    );
  }
  
  if (variant === 'minimal') {
    return (
      <svg 
        viewBox="0 0 100 100" 
        className={className}
        fill={color || "currentColor"}
        xmlns="http://www.w3.org/2000/svg"
      >
        <polygon points="50,10 85,30 85,70 50,90 15,70 15,30" />
        <polygon points="50,25 70,35 70,65 50,75 30,65 30,35" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2"/>
      </svg>
    );
  }
  
  // Default solid variant
  return (
    <svg {...baseProps} fill={color || "currentColor"}>
      <path d={logoPath} />
    </svg>
  );
};

export const HiveLogo = React.forwardRef<HTMLDivElement, HiveLogoProps>(
  ({ 
    className, 
    size, 
    color = "auto", 
    variant = "solid", 
    withText = false,
    textPosition = "right",
    glowEffect = false,
    rounded = false,
    ...props 
  }, ref) => {
    // Determine color based on preference
    const getColor = () => {
      if (color === "black") return "#000000";
      if (color === "white") return "#ffffff";
      if (color === "gold") return "var(--hive-brand-secondary)";
      
      // Auto mode - use current color for theme adaptation
      return undefined;
    };
    
    const logoColor = getColor();
    
    const logoElement = (
      <HiveLogoSVG 
        color={logoColor}
        variant={variant}
        glowEffect={glowEffect}
        className="h-full w-full object-contain"
      />
    );

    const textElement = withText && (
      <span className={cn(
        "font-bold tracking-tight",
        size === 'xs' && "text-xs",
        size === 'sm' && "text-sm", 
        size === 'default' && "text-base",
        size === 'md' && "text-lg",
        size === 'lg' && "text-xl",
        size === 'xl' && "text-2xl",
        size === '2xl' && "text-3xl",
        size === '3xl' && "text-4xl",
        color === 'auto' && "text-[var(--hive-brand-secondary)]",
        color === 'black' && "text-black",
        color === 'white' && "text-white",
        color === 'gold' && "text-[var(--hive-brand-secondary)]"
      )}>
        HIVE
      </span>
    );
    
    return (
      <div
        ref={ref}
        className={cn(
          // Base container
          "flex items-center",
          textPosition === 'right' && withText && "flex-row gap-3",
          textPosition === 'bottom' && withText && "flex-col gap-2",
          textPosition === 'center' && withText && "flex-col items-center gap-2",
          
          // Logo sizing
          !withText && logoVariants({ size }),
          withText && "h-auto w-auto",
          
          // Effects and styling
          "transition-all duration-300 ease-out",
          variant === 'outline' && "hover:drop-shadow-lg",
          variant === 'solid' && "hover:scale-105",
          variant === 'gradient' && "hover:brightness-110",
          variant === 'glass' && "hover:backdrop-blur-md",
          variant === 'neon' && "hover:brightness-125",
          variant === 'animated' && "hover:animation-play-state-paused",
          
          // Rounded container
          rounded && "rounded-2xl p-2 bg-[var(--hive-background-secondary)]",
          
          // Glow effect
          glowEffect && "drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]",
          
          color === 'auto' && !withText && "text-[var(--hive-brand-secondary)]",
          className
        )}
        {...props}
      >
        <div className={cn(
          logoVariants({ size }),
          withText && textPosition === 'right' && logoVariants({ size }),
          withText && textPosition !== 'right' && logoVariants({ size })
        )}>
          {logoElement}
        </div>
        {textElement}
      </div>
    );
  }
);
HiveLogo.displayName = "HiveLogo";

// Lucide Icon Wrapper using PRD color system
import {
  // Navigation
  ArrowLeft, ArrowRight, ArrowUp, ArrowDown,
  ChevronLeft, ChevronRight, ChevronUp, ChevronDown,
  Menu, X, Home, Search, Filter,
  
  // Actions  
  Plus, Minus, Edit, Trash2, Save, Share2, Copy, Download, Upload,
  RefreshCw, Settings, MoreHorizontal, MoreVertical,
  
  // Status
  Check, CheckCircle, XCircle, AlertTriangle, Info, AlertCircle,
  Loader2, Wifi, WifiOff, Signal,
  
  // Platform specific
  User, Users, Building, Calendar, Clock, MapPin, Bell,
  MessageCircle, Heart, Bookmark, Flag, Eye, EyeOff,
  
  // Tools & Builder
  Wrench, Hammer, Code, Palette, Layers, Grid3X3, 
  Play, Pause, Square, Volume2, VolumeX,
  
  // University context
  GraduationCap, Book, School, Home as House, Users2,
  
  // File & Media
  File, FileText, Image, Video, Music, Paperclip,
  
  // Social
  ThumbsUp, ThumbsDown, Star, Send, Reply, Forward,
  
  // System
  Lock, Unlock, Shield, Key, Database, Server,
  
  type LucideIcon
} from "lucide-react";

const iconVariants = cva(
  "shrink-0 transition-colors",
  {
    variants: {
      size: {
        xs: "h-3 w-3",
        sm: "h-4 w-4", 
        default: "h-5 w-5",
        md: "h-6 w-6",
        lg: "h-8 w-8",
        xl: "h-10 w-10",
        "2xl": "h-12 w-12",
      },
      color: {
        current: "text-current",
        primary: "text-[var(--hive-text-primary)]",
        secondary: "text-[var(--hive-text-secondary)]", 
        tertiary: "text-[var(--hive-text-tertiary)]",
        disabled: "text-[var(--hive-text-disabled)]",
        brand: "text-[var(--hive-brand-secondary)]", // Gold
        success: "text-[var(--hive-status-success)]",
        error: "text-[var(--hive-status-error)]",
        warning: "text-[var(--hive-status-warning)]",
        info: "text-[var(--hive-status-info)]",
      },
      interactive: {
        true: "hover:text-[var(--hive-brand-secondary)] cursor-pointer transition-colors",
        false: "",
      }
    },
    defaultVariants: {
      size: "default",
      color: "current",
      interactive: false,
    },
  }
);

// Icon Component
export interface IconProps 
  extends Omit<React.SVGProps<SVGSVGElement>, 'color'>,
    VariantProps<typeof iconVariants> {
  icon: LucideIcon;
}

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  ({ className, size, color, interactive, icon: IconComponent, ...props }, ref) => {
    return (
      <IconComponent
        ref={ref}
        className={cn(iconVariants({ size, color, interactive }), className)}
        {...props}
      />
    );
  }
);
Icon.displayName = "Icon";

// Platform icon collections using existing design system
export const PlatformIcons = {
  // Core navigation
  Profile: User,
  Spaces: Users,
  Tools: Wrench,
  Feed: Home,
  Lab: Hammer,
  Calendar: Calendar,
  
  // University context
  University: GraduationCap,
  Residential: House,
  Greek: Building,
  
  // Actions
  Search: Search,
  Menu: Menu,
  Close: X,
  Add: Plus,
  Edit: Edit,
  Delete: Trash2,
  Share: Share2,
  Save: Save,
  
  // Status
  Online: CheckCircle,
  Offline: XCircle,
  Loading: Loader2,
  
  // Privacy
  Ghost: EyeOff,
  Privacy: Shield,
  Visible: Eye,
  Hidden: EyeOff,
  
  // Social
  Like: Heart,
  Comment: MessageCircle,
  Bookmark: Bookmark,
  Flag: Flag,
  
  // Builder
  Builder: Code,
  Design: Palette,
  Deploy: Play,
} as const;

// Export all Lucide icons for direct use
export {
  // Navigation
  ArrowLeft, ArrowRight, ArrowUp, ArrowDown,
  ChevronLeft, ChevronRight, ChevronUp, ChevronDown,
  Menu, X, Home, Search, Filter,
  
  // Actions  
  Plus, Minus, Edit, Trash2, Save, Share2, Copy, Download, Upload,
  RefreshCw, Settings, MoreHorizontal, MoreVertical,
  
  // Status
  Check, CheckCircle, XCircle, AlertTriangle, Info, AlertCircle,
  Loader2, Wifi, WifiOff, Signal,
  
  // Platform
  User, Users, Building, Calendar, Clock, MapPin, Bell,
  MessageCircle, Heart, Bookmark, Flag, Eye, EyeOff,
  
  // Tools
  Wrench, Hammer, Code, Palette, Layers, Grid3X3,
  
  // University
  GraduationCap, Book, School, House, Users2,
  
  // Social
  ThumbsUp, ThumbsDown, Star, Send, Reply, Forward,
  
  // Files
  File, FileText, Image, Video, Music, Paperclip,
  
  // Security
  Lock, Unlock, Shield, Key,
};

// Export variants
export { logoVariants, iconVariants };