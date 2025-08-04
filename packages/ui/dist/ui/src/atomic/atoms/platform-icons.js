'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import React from 'react';
import { cn } from '../../lib/utils.js';
import { User, Grid3X3, Wrench, Activity, FlaskConical, Calendar, Eye, GraduationCap, Star, TestTube, Hexagon } from 'lucide-react';
const iconSizes = {
    xs: 16,
    sm: 20,
    md: 24,
    lg: 32,
    xl: 40
};
// HIVE Logo Component (fallback to Hexagon if SVG not found)
export const HiveIcon = ({ size = 'md', className }) => {
    const [imgError, setImgError] = React.useState(false);
    if (imgError) {
        // Fallback to Lucide Hexagon icon
        return _jsx(Hexagon, { size: iconSizes[size], className: className });
    }
    return (_jsx("img", { src: "/assets/hive-logo-white.svg", alt: "HIVE", width: iconSizes[size], height: iconSizes[size], className: cn('inline-block', className), onError: () => setImgError(true) }));
};
// Platform icons using Lucide
export const PlatformIcons = {
    Hive: HiveIcon,
    Profile: User,
    Spaces: Grid3X3,
    Tools: Wrench,
    Feed: Activity,
    Lab: FlaskConical,
    Calendar: Calendar,
    Ghost: Eye,
    University: GraduationCap,
    Builder: Star,
    Beta: TestTube
};
//# sourceMappingURL=platform-icons.js.map