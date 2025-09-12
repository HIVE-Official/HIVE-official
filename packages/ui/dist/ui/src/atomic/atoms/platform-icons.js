'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { cn } from '../../lib/utils';
import { HiveLogo } from './hive-brand';
import { User, Grid3X3, Wrench, Activity, FlaskConical, Calendar, Eye, GraduationCap, Star, TestTube } from 'lucide-react';
// Map platform icon sizes to HiveLogo sizes
const mapSizeToHiveLogo = (size) => {
    const sizeMap = {
        xs: 'xs',
        sm: 'sm',
        md: 'default',
        lg: 'lg',
        xl: 'xl'
    };
    return sizeMap[size] || 'default';
};
// HIVE Logo Component using the unified HiveLogo component
export const HiveIcon = ({ size = 'md', className }) => {
    return (_jsx(HiveLogo, { size: mapSizeToHiveLogo(size), color: "auto", variant: "solid", className: className }));
};
// Platform icons using consistent Lucide icons
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
// Unified platform icon component
export const PlatformIcon = ({ icon, size = 'md', className, color = 'currentColor', ...props }) => {
    const IconComponent = PlatformIcons[icon];
    if (icon === 'Hive') {
        return _jsx(HiveIcon, { size: size, className: className });
    }
    const iconSizes = {
        xs: 16,
        sm: 20,
        md: 24,
        lg: 32,
        xl: 40
    };
    return (_jsx(IconComponent, { className: cn('shrink-0', className), color: color, style: { width: iconSizes[size], height: iconSizes[size] }, ...props }));
};
//# sourceMappingURL=platform-icons.js.map