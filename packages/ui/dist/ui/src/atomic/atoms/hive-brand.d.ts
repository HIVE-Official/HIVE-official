import * as React from "react";
import { type VariantProps } from "class-variance-authority";
declare const logoVariants: (props?: ({
    size?: "default" | "sm" | "lg" | "xl" | "xs" | "md" | "2xl" | "3xl" | null | undefined;
    color?: "auto" | "gold" | "black" | "white" | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface HiveLogoProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'color'>, VariantProps<typeof logoVariants> {
    variant?: 'solid' | 'outline' | 'minimal' | 'gradient' | 'glass' | 'neon' | 'textured' | 'animated' | 'monochrome';
    withText?: boolean;
    textPosition?: 'right' | 'bottom' | 'center';
    glowEffect?: boolean;
    rounded?: boolean;
}
export declare const HiveLogo: React.ForwardRefExoticComponent<HiveLogoProps & React.RefAttributes<HTMLDivElement>>;
import { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Menu, X, Home, Search, Filter, Plus, Minus, Edit, Trash2, Save, Share2, Copy, Download, Upload, RefreshCw, Settings, MoreHorizontal, MoreVertical, Check, CheckCircle, XCircle, AlertTriangle, Info, AlertCircle, Loader2, Wifi, WifiOff, Signal, User, Users, Building, Calendar, Clock, MapPin, Bell, MessageCircle, Heart, Bookmark, Flag, Eye, EyeOff, Wrench, Hammer, Code, Palette, Layers, Grid3X3, GraduationCap, Book, School, Home as House, Users2, File, FileText, Image, Video, Music, Paperclip, ThumbsUp, ThumbsDown, Star, Send, Reply, Forward, Lock, Unlock, Shield, Key, type LucideIcon } from "lucide-react";
declare const iconVariants: (props?: ({
    size?: "default" | "sm" | "lg" | "xl" | "xs" | "md" | "2xl" | null | undefined;
    color?: "error" | "primary" | "secondary" | "success" | "warning" | "info" | "disabled" | "current" | "brand" | "tertiary" | null | undefined;
    interactive?: boolean | null | undefined;
} & import("class-variance-authority/types").ClassProp) | undefined) => string;
export interface IconProps extends Omit<React.SVGProps<SVGSVGElement>, 'color'>, VariantProps<typeof iconVariants> {
    icon: LucideIcon;
}
export declare const Icon: React.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
export declare const PlatformIcons: {
    readonly Profile: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Spaces: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Tools: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Feed: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Lab: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Calendar: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly University: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Residential: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Greek: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Search: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Menu: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Close: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Add: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Edit: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Delete: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Share: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Save: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Online: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Offline: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Loading: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Ghost: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Privacy: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Visible: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Hidden: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Like: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Comment: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Bookmark: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Flag: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Builder: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Design: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
    readonly Deploy: React.ForwardRefExoticComponent<Omit<import("lucide-react").LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>;
};
export { ArrowLeft, ArrowRight, ArrowUp, ArrowDown, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Menu, X, Home, Search, Filter, Plus, Minus, Edit, Trash2, Save, Share2, Copy, Download, Upload, RefreshCw, Settings, MoreHorizontal, MoreVertical, Check, CheckCircle, XCircle, AlertTriangle, Info, AlertCircle, Loader2, Wifi, WifiOff, Signal, User, Users, Building, Calendar, Clock, MapPin, Bell, MessageCircle, Heart, Bookmark, Flag, Eye, EyeOff, Wrench, Hammer, Code, Palette, Layers, Grid3X3, GraduationCap, Book, School, House, Users2, ThumbsUp, ThumbsDown, Star, Send, Reply, Forward, File, FileText, Image, Video, Music, Paperclip, Lock, Unlock, Shield, Key, };
export { logoVariants, iconVariants };
//# sourceMappingURL=hive-brand.d.ts.map