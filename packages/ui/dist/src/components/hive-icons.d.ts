import React from 'react';
interface HiveLogoProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    size?: number;
    variant?: 'white' | 'black' | 'gold';
}
export declare const HiveLogo: ({ size, className, variant, alt, ...props }: HiveLogoProps) => import("react/jsx-runtime").JSX.Element;
export { Home, User, Users, Search, Bell, Settings, Menu, X, ChevronDown, ChevronRight, ChevronLeft, ChevronUp, ArrowRight, ArrowLeft, MessageSquare, MessageCircle, Send, Plus, Edit, Trash2, Share, Bookmark, Heart, Star, BookOpen, GraduationCap, Calendar, Clock, MapPin, Building, Coffee, Zap, Code, Wrench, Sparkles, Target, Award, Trophy, Check, CheckCircle, AlertCircle, Info, Loader, RefreshCw, Image, File, FileText, Video, Link, ExternalLink, Eye, EyeOff, Lock, Unlock, Download, Upload, Save, } from 'lucide-react';
export declare const iconSizes: {
    readonly xs: 12;
    readonly sm: 16;
    readonly md: 20;
    readonly lg: 24;
    readonly xl: 32;
    readonly '2xl': 48;
};
export type IconSize = keyof typeof iconSizes;
interface IconWrapperProps {
    size?: IconSize | number;
    className?: string;
    children: React.ReactNode;
}
export declare const IconWrapper: ({ size, className, children }: IconWrapperProps) => import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=hive-icons.d.ts.map