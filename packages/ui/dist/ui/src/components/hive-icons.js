import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../lib/utils.js';
// HIVE Brand Logo Component
export const HiveLogo = ({ size = 24, className, variant = 'white', alt = 'HIVE', ...props }) => {
    // Dynamic import based on variant
    const logoSrc = {
        white: '/src/assets/hive-logo-white.svg',
        black: '/src/assets/hive-logo-black.svg',
        gold: '/src/assets/hive-logo-gold.svg'
    }[variant];
    return (_jsx("img", { src: logoSrc, alt: alt, width: size, height: size, className: cn("hive-logo select-none", className), ...props }));
};
// Re-export commonly used Lucide icons for convenience
// This provides a clean, consistent API while using battle-tested icons
export { 
// Navigation & Core
Home, User, Users, Search, Bell, Settings, Menu, X, ChevronDown, ChevronRight, ChevronLeft, ChevronUp, ArrowRight, ArrowLeft, 
// Content & Communication  
MessageSquare, MessageCircle, Send, Plus, Edit, Trash2, Share, Bookmark, Heart, Star, 
// Academic & Campus
BookOpen, GraduationCap, Calendar, Clock, MapPin, Building, Coffee, 
// Tools & Creation
Zap, Code, Wrench, Sparkles, Target, Award, Trophy, 
// Status & Feedback
Check, CheckCircle, AlertCircle, Info, Loader, RefreshCw, 
// Files & Media
Image, File, FileText, Video, Link, ExternalLink, 
// Actions
Eye, EyeOff, Lock, Unlock, Download, Upload, Save, } from 'lucide-react';
// Size variants for consistent icon sizing across HIVE
export const iconSizes = {
    xs: 12, // Tiny icons in dense UI
    sm: 16, // Small icons (default Lucide size)
    md: 20, // Medium icons
    lg: 24, // Large icons  
    xl: 32, // Extra large icons
    '2xl': 48 // Hero icons
};
export const IconWrapper = ({ size = 'sm', className, children }) => {
    const iconSize = typeof size === 'number' ? size : iconSizes[size];
    return (_jsx("span", { className: cn("inline-flex items-center justify-center", className), style: { width: iconSize, height: iconSize }, children: React.cloneElement(children, { size: iconSize }) }));
};
//# sourceMappingURL=hive-icons.js.map