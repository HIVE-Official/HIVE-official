'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Badge } from '../atoms/badge';
import { Text } from '../atoms/text';
import { ButtonEnhanced as Button } from '../atoms/button-enhanced';
import { Zap, Plus, Wrench, Code, Beaker, Lightbulb, Rocket, Star, Users, Play, Settings, ChevronRight, ExternalLink, Trophy, Target, Sparkles, FlaskConical } from 'lucide-react';
const getToolCategoryConfig = (category) => {
    const configs = {
        academic: {
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20',
            icon: Lightbulb,
            label: 'Academic'
        },
        productivity: {
            color: 'text-[var(--hive-gold)]',
            bgColor: 'bg-[var(--hive-gold)]/10',
            borderColor: 'border-[var(--hive-gold)]/20',
            icon: Zap,
            label: 'Productivity'
        },
        social: {
            color: 'text-[var(--hive-gold)]',
            bgColor: 'bg-[var(--hive-gold)]/10',
            borderColor: 'border-[var(--hive-gold)]/20',
            icon: Users,
            label: 'Social'
        },
        utility: {
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
            borderColor: 'border-green-500/20',
            icon: Wrench,
            label: 'Utility'
        },
        experimental: {
            color: 'text-pink-500',
            bgColor: 'bg-pink-500/10',
            borderColor: 'border-pink-500/20',
            icon: FlaskConical,
            label: 'Experimental'
        }
    };
    return configs[category] || configs.utility;
};
const getBuildStatusConfig = (status) => {
    const configs = {
        concept: {
            color: 'text-gray-500',
            bgColor: 'bg-gray-500/10',
            label: 'Concept',
            progress: 10
        },
        prototype: {
            color: 'text-[var(--hive-gold)]',
            bgColor: 'bg-[var(--hive-gold)]/10',
            label: 'Prototype',
            progress: 35
        },
        testing: {
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
            label: 'Testing',
            progress: 70
        },
        published: {
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
            label: 'Published',
            progress: 100
        },
        archived: {
            color: 'text-[var(--hive-text-muted)]',
            bgColor: 'bg-[var(--hive-background-secondary)]',
            label: 'Archived',
            progress: 0
        }
    };
    return configs[status] || configs.concept;
};
const getBuilderLevelConfig = (level) => {
    const configs = {
        novice: {
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
            icon: Sparkles,
            label: 'Novice Builder'
        },
        apprentice: {
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
            icon: Code,
            label: 'Apprentice Builder'
        },
        expert: {
            color: 'text-[var(--hive-gold)]',
            bgColor: 'bg-[var(--hive-gold)]/10',
            icon: Rocket,
            label: 'Expert Builder'
        },
        master: {
            color: 'text-[var(--hive-gold)]',
            bgColor: 'bg-[var(--hive-gold)]/10',
            icon: Trophy,
            label: 'Master Builder'
        }
    };
    return configs[level] || configs.novice;
};
const formatTimeAgo = (timestamp) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    if (diffInHours < 1) {
        const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
        return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes}m ago`;
    }
    else if (diffInHours < 24) {
        return `${diffInHours}h ago`;
    }
    else {
        const diffInDays = Math.floor(diffInHours / 24);
        return `${diffInDays}d ago`;
    }
};
export const ProfileHiveLabWidget = ({ user, builderTools = [], activeProjects = [], totalBuilds = 0, totalDeployments = 0, totalCollaborations = 0, builderScore = 0, weeklyBuildTime = 0, featuredBuild, isEditable = true, onCreateTool, onViewTool, onEditTool, onDeployTool, onViewAllBuilds, onViewBuildLab, className }) => {
    const [isHovered, setIsHovered] = useState(false);
    // Get the most recent builds (up to 3)
    const recentBuilds = builderTools
        .sort((a, b) => new Date(b.lastWorkedOn).getTime() - new Date(a.lastWorkedOn).getTime())
        .slice(0, 3);
    const builderLevelConfig = getBuilderLevelConfig(user.builderLevel || 'novice');
    const activeBuilds = builderTools.filter(tool => ['prototype', 'testing'].includes(tool.buildStatus)).length;
    const publishedBuilds = builderTools.filter(tool => tool.buildStatus === 'published').length;
    return (_jsxs(Card, { className: cn('relative overflow-hidden transition-all duration-300 hover:shadow-lg', 'bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]', isHovered && 'scale-[1.02]', className), onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Text, { variant: "body-sm", color: "gold", weight: "medium", children: "HiveLab Builder" }), _jsxs(Badge, { variant: "secondary", className: cn('text-xs', builderLevelConfig.color), children: [_jsx(builderLevelConfig.icon, { className: "h-3 w-3 mr-1" }), builderLevelConfig.label] })] }), isEditable && (_jsx(Button, { variant: "ghost", size: "icon", onClick: onViewBuildLab, className: "h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Settings, { className: "h-3 w-3" }) }))] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(Beaker, { className: "h-3 w-3 text-[var(--hive-text-secondary)]" }), _jsx(Text, { variant: "body-sm", weight: "medium", color: "primary", children: totalBuilds })] }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Total Builds" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(Rocket, { className: "h-3 w-3 text-green-500" }), _jsx(Text, { variant: "body-sm", weight: "medium", color: "primary", children: totalDeployments })] }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Deployments" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(Users, { className: "h-3 w-3 text-[var(--hive-gold)]" }), _jsx(Text, { variant: "body-sm", weight: "medium", color: "primary", children: totalCollaborations })] }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Collaborations" })] })] }), builderScore > 0 && (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "body-sm", color: "primary", weight: "medium", children: "Builder Score:" }), _jsxs(Text, { variant: "body-xs", color: "gold", weight: "medium", children: [builderScore, "/100"] })] }), _jsx("div", { className: "w-full bg-[var(--hive-background-secondary)] rounded-full h-2", children: _jsx("div", { className: "bg-gradient-to-r from-[var(--hive-gold)] to-[var(--hive-gold)] rounded-full h-2 transition-all duration-500", style: { width: `${builderScore}%` } }) }), _jsx(Text, { variant: "body-xs", color: "secondary", children: builderScore >= 80 ? 'Master level builder! 🚀' :
                                    builderScore >= 60 ? 'Expert builder - keep growing! ⚡' :
                                        builderScore >= 40 ? 'Apprentice builder - great progress! 💫' :
                                            'Novice builder - exciting journey ahead! ✨' })] })), featuredBuild && (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "body-sm", color: "primary", weight: "medium", children: "Featured Build:" }), _jsx(Star, { className: "h-3 w-3 text-[var(--hive-gold)]" })] }), _jsx("div", { className: cn('p-3 rounded-lg border transition-colors hover:bg-[var(--hive-background-secondary)] cursor-pointer', getToolCategoryConfig(featuredBuild.category).bgColor, getToolCategoryConfig(featuredBuild.category).borderColor), onClick: () => onViewTool?.(featuredBuild.id), children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-start gap-2 flex-1 min-w-0", children: [(() => {
                                                    const IconComponent = getToolCategoryConfig(featuredBuild.category).icon;
                                                    return _jsx(IconComponent, { className: cn('h-4 w-4 mt-0.5 flex-shrink-0', getToolCategoryConfig(featuredBuild.category).color) });
                                                })(), _jsxs("div", { className: "min-w-0 flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(Text, { variant: "body-sm", weight: "medium", color: "primary", className: "truncate", children: featuredBuild.name }), _jsx(Badge, { variant: "secondary", className: cn('text-xs', getBuildStatusConfig(featuredBuild.buildStatus).color), children: getBuildStatusConfig(featuredBuild.buildStatus).label })] }), _jsx(Text, { variant: "body-xs", color: "secondary", className: "line-clamp-2", children: featuredBuild.description }), _jsxs("div", { className: "flex items-center gap-3 mt-2", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Target, { className: "h-3 w-3 text-[var(--hive-text-secondary)]" }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: [featuredBuild.progress, "% complete"] })] }), featuredBuild.collaborators > 1 && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "h-3 w-3 text-[var(--hive-gold)]" }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: [featuredBuild.collaborators, " collaborators"] })] })), featuredBuild.deployments > 0 && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Rocket, { className: "h-3 w-3 text-green-500" }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: [featuredBuild.deployments, " deployments"] })] }))] })] })] }), _jsxs("div", { className: "flex items-center gap-1 ml-2", children: [isEditable && onEditTool && (_jsx(Button, { variant: "ghost", size: "icon", onClick: (e) => {
                                                        e.stopPropagation();
                                                        onEditTool(featuredBuild.id);
                                                    }, className: "h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Play, { className: "h-3 w-3" }) })), onDeployTool && featuredBuild.buildStatus === 'testing' && (_jsx(Button, { variant: "ghost", size: "icon", onClick: (e) => {
                                                        e.stopPropagation();
                                                        onDeployTool(featuredBuild.id);
                                                    }, className: "h-6 w-6 text-green-500 hover:text-green-600", children: _jsx(Rocket, { className: "h-3 w-3" }) }))] })] }) })] })), recentBuilds.length > 0 && (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "body-sm", color: "primary", weight: "medium", children: "Recent Builds:" }), builderTools.length > 3 && (_jsxs(Text, { variant: "body-xs", color: "secondary", children: ["+", builderTools.length - 3, " more"] }))] }), _jsx("div", { className: "space-y-1", children: recentBuilds.map((tool) => {
                                    const categoryConfig = getToolCategoryConfig(tool.category);
                                    const statusConfig = getBuildStatusConfig(tool.buildStatus);
                                    return (_jsxs("div", { className: "flex items-center gap-2 p-2 rounded hover:bg-[var(--hive-background-secondary)] transition-colors cursor-pointer", onClick: () => onViewTool?.(tool.id), children: [_jsx(categoryConfig.icon, { className: cn('h-3 w-3', categoryConfig.color) }), _jsx(Text, { variant: "body-xs", color: "primary", className: "flex-1 truncate", children: tool.name }), _jsx(Badge, { variant: "secondary", className: cn('text-xs', statusConfig.color), children: statusConfig.label }), _jsx(Text, { variant: "body-xs", color: "secondary", children: formatTimeAgo(tool.lastWorkedOn) }), _jsx(ChevronRight, { className: "h-3 w-3 text-[var(--hive-text-secondary)]" })] }, tool.id));
                                }) })] })), activeProjects.length > 0 && (_jsxs("div", { className: "space-y-2 pt-2 border-t border-[var(--hive-border-primary)]", children: [_jsx(Text, { variant: "body-sm", color: "primary", weight: "medium", children: "Active Projects:" }), _jsx("div", { className: "space-y-1", children: activeProjects.slice(0, 2).map((project) => (_jsxs("div", { className: "flex items-center gap-2 p-2 rounded hover:bg-[var(--hive-background-secondary)] transition-colors", children: [_jsxs("div", { className: "flex items-center gap-2 flex-1", children: [_jsx("div", { className: cn('w-2 h-2 rounded-full', project.isActive ? 'bg-green-500' : 'bg-[var(--hive-text-muted)]') }), _jsx(Text, { variant: "body-xs", color: "primary", className: "truncate", children: project.name })] }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: [project.progress, "%"] }), project.teamSize > 1 && (_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "h-2 w-2 text-[var(--hive-text-secondary)]" }), _jsx(Text, { variant: "body-xs", color: "secondary", children: project.teamSize })] }))] }, project.id))) })] })), weeklyBuildTime > 0 && (_jsxs("div", { className: "space-y-2 pt-2 border-t border-[var(--hive-border-primary)]", children: [_jsx(Text, { variant: "body-sm", color: "primary", weight: "medium", children: "This Week:" }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "body-sm", color: "secondary", children: "Build Time" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "w-16 h-2 bg-[var(--hive-background-secondary)] rounded-full", children: _jsx("div", { className: "h-2 bg-gradient-to-r from-[var(--hive-gold)] to-[var(--hive-gold)] rounded-full transition-all duration-500", style: { width: `${Math.min((weeklyBuildTime / 20) * 100, 100)}%` } }) }), _jsxs(Text, { variant: "body-xs", color: "gold", weight: "medium", children: [weeklyBuildTime, "h"] })] })] })] })), _jsxs("div", { className: "flex gap-2 pt-2 border-t border-[var(--hive-border-primary)]", children: [isEditable && onCreateTool && (_jsxs(Button, { variant: "secondary", size: "sm", onClick: onCreateTool, className: "flex-1", children: [_jsx(Plus, { className: "h-3 w-3 mr-1" }), "New Build"] })), onViewAllBuilds && (_jsxs(Button, { variant: "primary", size: "sm", onClick: onViewAllBuilds, className: "flex-1", children: [_jsx(Beaker, { className: "h-3 w-3 mr-1" }), "All Builds"] })), onViewBuildLab && (_jsx(Button, { variant: "ghost", size: "icon", onClick: onViewBuildLab, className: "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]", children: _jsx(ExternalLink, { className: "h-3 w-3" }) }))] }), builderTools.length === 0 && (_jsxs("div", { className: "text-center py-6", children: [_jsx(Beaker, { className: "h-8 w-8 mx-auto mb-3 text-[var(--hive-text-muted)]" }), _jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "No builds yet" }), _jsx(Text, { variant: "body-xs", color: "secondary", className: "mb-4", children: "Start building your first tool in HiveLab for the UB community" }), isEditable && onCreateTool && (_jsxs(Button, { variant: "secondary", size: "sm", onClick: onCreateTool, children: [_jsx(Plus, { className: "h-3 w-3 mr-1" }), "Start Your First Build"] }))] }))] }), isHovered && (_jsx("div", { className: "absolute inset-0 -z-10 bg-gradient-to-r from-[var(--hive-gold)]/5 to-[var(--hive-gold)]/5 rounded-lg blur-xl" }))] }));
};
//# sourceMappingURL=profile-hivelab-widget.js.map