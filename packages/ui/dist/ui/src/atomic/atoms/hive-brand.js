'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
import { cva } from "class-variance-authority";
// HIVE Brand System - Using Existing Assets and Design Tokens
// Uses actual HIVE logos and PRD-aligned color system
const logoVariants = cva("shrink-0", {
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
});
export const HiveLogo = React.forwardRef(({ className, size, color = "auto", ...props }, ref) => {
    // Determine which logo to use based on color preference
    const getLogoPath = () => {
        if (color === "black")
            return "/assets/hive-logo-black.svg";
        if (color === "gold")
            return "/assets/hive-logo-gold.svg";
        if (color === "white")
            return "/assets/hive-logo-white.svg";
        // Auto mode - use gold by default (brand color)
        return "/assets/hive-logo-gold.svg";
    };
    return (_jsx("div", { ref: ref, className: cn(logoVariants({ size }), className), ...props, children: _jsx("img", { src: getLogoPath(), alt: "HIVE", className: "h-full w-full object-contain", draggable: false }) }));
});
HiveLogo.displayName = "HiveLogo";
// Lucide Icon Wrapper using PRD color system
import { 
// Navigation
ArrowLeft, ArrowRight, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Menu, X, Home, Search, Filter, 
// Actions  
Plus, Minus, Edit, Trash2, Save, Share2, Copy, Download, Upload, RefreshCw, Settings, MoreHorizontal, MoreVertical, 
// Status
Check, CheckCircle, XCircle, AlertTriangle, Info, AlertCircle, Loader2, Wifi, WifiOff, Signal, 
// Platform specific
User, Users, Building, Calendar, Clock, MapPin, Bell, MessageCircle, Heart, Bookmark, Flag, Eye, EyeOff, 
// Tools & Builder
Wrench, Hammer, Code, Palette, Layers, Grid3X3, Play, 
// University context
GraduationCap, Book, School, Home as House, Users2, 
// File & Media
File, FileText, Image, Video, Music, Paperclip, 
// Social
ThumbsUp, ThumbsDown, Star, Send, Reply, Forward, 
// System
Lock, Unlock, Shield, Key } from "lucide-react";
const iconVariants = cva("shrink-0 transition-colors", {
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
});
export const Icon = React.forwardRef(({ className, size, color, interactive, icon: IconComponent, ...props }, ref) => {
    return (_jsx(IconComponent, { ref: ref, className: cn(iconVariants({ size, color, interactive }), className), ...props }));
});
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
};
// Export all Lucide icons for direct use
export { 
// Navigation
ArrowLeft, ArrowRight, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Menu, X, Home, Search, Filter, 
// Actions  
Plus, Minus, Edit, Trash2, Save, Share2, Copy, Download, Upload, RefreshCw, Settings, MoreHorizontal, MoreVertical, 
// Status
Check, CheckCircle, XCircle, AlertTriangle, Info, AlertCircle, Loader2, Wifi, WifiOff, Signal, 
// Platform
User, Users, Building, Calendar, Clock, MapPin, Bell, MessageCircle, Heart, Bookmark, Flag, Eye, EyeOff, 
// Tools
Wrench, Hammer, Code, Palette, Layers, Grid3X3, 
// University
GraduationCap, Book, School, House, Users2, 
// Social
ThumbsUp, ThumbsDown, Star, Send, Reply, Forward, 
// Files
File, FileText, Image, Video, Music, Paperclip, 
// Security
Lock, Unlock, Shield, Key, };
// Export variants
export { logoVariants, iconVariants };
//# sourceMappingURL=hive-brand.js.map