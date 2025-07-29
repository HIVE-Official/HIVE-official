import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiveLogo, IconWrapper, iconSizes } from '../../components/hive-icons';
import { Home, User, Users, Search, Bell, Settings, Plus, Edit, Share, Bookmark, Heart, Star, BookOpen, GraduationCap, Calendar, Clock, MapPin, Building, Zap, Code, Wrench, Sparkles, Target, Award, Check, CheckCircle, AlertCircle, Info, Loader, Download } from 'lucide-react';
const meta = {
    title: '04-HIVE/Icons',
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'HIVE Icon System - HIVE brand logos + Lucide icons for a clean, consistent approach.'
            }
        }
    },
    tags: ['autodocs'],
};
export default meta;
export const HiveLogos = {
    render: () => (_jsxs("div", { className: "flex gap-8 items-center p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(HiveLogo, { variant: "white", size: 48 }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "White" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2 p-4 bg-[var(--hive-text-primary)] rounded-lg", children: [_jsx(HiveLogo, { variant: "black", size: 48 }), _jsx("span", { className: "text-xs text-[var(--hive-background-primary)]", children: "Black" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(HiveLogo, { variant: "gold", size: 48 }), _jsx("span", { className: "text-xs text-[var(--hive-brand-secondary)]", children: "Gold" })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'HIVE brand logos in white, black, and gold variants for different backgrounds'
            }
        }
    }
};
export const NavigationIcons = {
    render: () => (_jsxs("div", { className: "grid grid-cols-6 gap-4 p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Home, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "Home" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(User, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "User" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Users, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "Users" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Search, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "Search" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Bell, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "Bell" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Settings, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "Settings" })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Common navigation icons from Lucide React'
            }
        }
    }
};
export const AcademicIcons = {
    render: () => (_jsxs("div", { className: "grid grid-cols-6 gap-4 p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(BookOpen, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "BookOpen" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(GraduationCap, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "GraduationCap" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Calendar, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "Calendar" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Clock, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "Clock" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(MapPin, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "MapPin" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Building, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "Building" })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Academic and campus-related icons for HIVE spaces'
            }
        }
    }
};
export const ToolIcons = {
    render: () => (_jsxs("div", { className: "grid grid-cols-6 gap-4 p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Zap, { className: "w-6 h-6 text-[var(--hive-brand-secondary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "Zap" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Code, { className: "w-6 h-6 text-[var(--hive-brand-secondary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "Code" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Wrench, { className: "w-6 h-6 text-[var(--hive-brand-secondary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "Wrench" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Sparkles, { className: "w-6 h-6 text-[var(--hive-brand-secondary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "Sparkles" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Target, { className: "w-6 h-6 text-[var(--hive-brand-secondary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "Target" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Award, { className: "w-6 h-6 text-[var(--hive-brand-secondary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "Award" })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Tool building and creation icons with gold accent colors'
            }
        }
    }
};
export const IconSizes = {
    render: () => (_jsxs("div", { className: "flex items-center gap-6 p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Star, { size: iconSizes.xs, className: "text-[var(--hive-brand-secondary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "XS (3)" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Star, { size: iconSizes.sm, className: "text-[var(--hive-brand-secondary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "SM (16px)" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Star, { size: iconSizes.md, className: "text-[var(--hive-brand-secondary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "MD (5)" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Star, { size: iconSizes.lg, className: "text-[var(--hive-brand-secondary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "LG (24px)" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Star, { size: iconSizes.xl, className: "text-[var(--hive-brand-secondary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "XL (32px)" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Star, { size: iconSizes['2xl'], className: "text-[var(--hive-brand-secondary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "2XL (48px)" })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Consistent icon sizing scale for HIVE components'
            }
        }
    }
};
export const IconWrapperDemo = {
    render: () => (_jsxs("div", { className: "flex gap-4 p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx(IconWrapper, { size: "sm", children: _jsx(Heart, { className: "text-red-400" }) }), _jsx(IconWrapper, { size: "md", children: _jsx(Heart, { className: "text-red-400" }) }), _jsx(IconWrapper, { size: "lg", children: _jsx(Heart, { className: "text-red-400" }) }), _jsx(IconWrapper, { size: 40, children: _jsx(Heart, { className: "text-red-400" }) })] })),
    parameters: {
        docs: {
            description: {
                story: 'IconWrapper utility component for consistent icon styling and sizing'
            }
        }
    }
};
export const StatusIcons = {
    render: () => (_jsxs("div", { className: "grid grid-cols-5 gap-4 p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Check, { className: "w-6 h-6 text-green-400" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "Check" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(CheckCircle, { className: "w-6 h-6 text-green-400" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "CheckCircle" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(AlertCircle, { className: "w-6 h-6 text-yellow-400" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "AlertCircle" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Info, { className: "w-6 h-6 text-blue-400" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "Info" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Loader, { className: "w-6 h-6 text-[var(--hive-text-primary)] animate-spin" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "Loader" })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Status and feedback icons with semantic colors'
            }
        }
    }
};
export const InteractionIcons = {
    render: () => (_jsxs("div", { className: "grid grid-cols-6 gap-4 p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Plus, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "Plus" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Edit, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "Edit" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Share, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "Share" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Heart, { className: "w-6 h-6 text-red-400" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "Heart" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Bookmark, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "Bookmark" })] }), _jsxs("div", { className: "flex flex-col items-center gap-2", children: [_jsx(Download, { className: "w-6 h-6 text-[var(--hive-text-primary)]" }), _jsx("span", { className: "text-xs text-[var(--hive-text-primary)]", children: "Download" })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Interactive action icons for user engagement'
            }
        }
    }
};
//# sourceMappingURL=hive-icons.stories.js.map