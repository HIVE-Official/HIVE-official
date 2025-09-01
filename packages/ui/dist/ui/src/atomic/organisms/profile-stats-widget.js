'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { cn } from '../../lib/utils.js';
import { Card, CardContent, CardHeader } from '../../components/ui/card.js';
import { Badge } from '../atoms/badge.js';
import { Text } from '../atoms/text.js';
import { ButtonEnhanced as Button } from '../atoms/button-enhanced.js';
import { BarChart3, TrendingUp, Target, Award, Zap, Users, Heart, Trophy, Activity, Settings, ChevronRight, ArrowUp, ArrowDown, Minus, Eye, Download } from 'lucide-react';
const getMetricCategoryConfig = (category) => {
    const configs = {
        engagement: {
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
            borderColor: 'border-blue-500/20',
            icon: Activity,
            label: 'Engagement'
        },
        academic: {
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
            borderColor: 'border-green-500/20',
            icon: Target,
            label: 'Academic'
        },
        social: {
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/10',
            borderColor: 'border-purple-500/20',
            icon: Users,
            label: 'Social'
        },
        productivity: {
            color: 'text-[var(--hive-gold)]',
            bgColor: 'bg-[var(--hive-gold)]/10',
            borderColor: 'border-[var(--hive-gold)]/20',
            icon: Zap,
            label: 'Productivity'
        },
        growth: {
            color: 'text-pink-500',
            bgColor: 'bg-pink-500/10',
            borderColor: 'border-pink-500/20',
            icon: TrendingUp,
            label: 'Growth'
        }
    };
    return configs[category] || configs.engagement;
};
const getTrendIcon = (trend) => {
    const icons = {
        up: ArrowUp,
        down: ArrowDown,
        stable: Minus
    };
    return icons[trend] || Minus;
};
const getTrendColor = (trend) => {
    const colors = {
        up: 'text-green-500',
        down: 'text-red-500',
        stable: 'text-[var(--hive-text-muted)]'
    };
    return colors[trend] || colors.stable;
};
const getGoalCategoryConfig = (category) => {
    const configs = {
        academic: {
            color: 'text-blue-500',
            bgColor: 'bg-blue-500/10',
            icon: Target,
            label: 'Academic'
        },
        social: {
            color: 'text-purple-500',
            bgColor: 'bg-purple-500/10',
            icon: Users,
            label: 'Social'
        },
        personal: {
            color: 'text-green-500',
            bgColor: 'bg-green-500/10',
            icon: Heart,
            label: 'Personal'
        },
        career: {
            color: 'text-[var(--hive-gold)]',
            bgColor: 'bg-[var(--hive-gold)]/10',
            icon: Trophy,
            label: 'Career'
        }
    };
    return configs[category] || configs.personal;
};
export const ProfileStatsWidget = ({ user, keyMetrics = [], personalGoals = [], overallScore = 0, weeklyGrowth = 0, academicProgress = 0, socialEngagement = 0, platformLevel = 1, streak = 0, isEditable = true, onViewMetric, onViewAllStats, onSetGoal, onExportData, onViewInsights, className }) => {
    const [isHovered, setIsHovered] = useState(false);
    // Get top metrics for display
    const topMetrics = keyMetrics.slice(0, 4);
    const activeGoals = personalGoals.filter(goal => goal.isActive);
    const completedGoals = personalGoals.filter(goal => goal.current >= goal.target && goal.isActive);
    return (_jsxs(Card, { className: cn('relative overflow-hidden transition-all duration-300 hover:shadow-lg', 'bg-[var(--hive-background-primary)] border-[var(--hive-border-primary)]', isHovered && 'scale-[1.02]', className), onMouseEnter: () => setIsHovered(true), onMouseLeave: () => setIsHovered(false), children: [_jsx(CardHeader, { className: "pb-2", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Text, { variant: "body-sm", color: "gold", weight: "medium", children: "Personal Analytics" }), streak > 0 && (_jsxs(Badge, { variant: "secondary", className: "text-xs", children: [_jsx(Trophy, { className: "h-3 w-3 mr-1" }), "Level ", platformLevel] }))] }), isEditable && (_jsx(Button, { variant: "ghost", size: "icon", onClick: onViewAllStats, className: "h-6 w-6 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Settings, { className: "h-3 w-3" }) }))] }) }), _jsxs(CardContent, { className: "space-y-4", children: [_jsxs("div", { className: "grid grid-cols-3 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(BarChart3, { className: "h-3 w-3 text-[var(--hive-text-secondary)]" }), _jsx(Text, { variant: "body-sm", weight: "medium", color: "primary", children: overallScore })] }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Overall Score" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(TrendingUp, { className: "h-3 w-3 text-green-500" }), _jsxs(Text, { variant: "body-sm", weight: "medium", color: "primary", children: ["+", weeklyGrowth, "%"] })] }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Weekly Growth" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-1", children: [_jsx(Award, { className: "h-3 w-3 text-[var(--hive-gold)]" }), _jsx(Text, { variant: "body-sm", weight: "medium", color: "primary", children: streak })] }), _jsx(Text, { variant: "body-xs", color: "secondary", children: "Day Streak" })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "body-sm", color: "primary", children: "Academic Progress" }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: [academicProgress, "%"] })] }), _jsx("div", { className: "w-full bg-[var(--hive-background-secondary)] rounded-full h-2", children: _jsx("div", { className: "bg-blue-500 rounded-full h-2 transition-all duration-500", style: { width: `${academicProgress}%` } }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "body-sm", color: "primary", children: "Social Engagement" }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: [socialEngagement, "%"] })] }), _jsx("div", { className: "w-full bg-[var(--hive-background-secondary)] rounded-full h-2", children: _jsx("div", { className: "bg-purple-500 rounded-full h-2 transition-all duration-500", style: { width: `${socialEngagement}%` } }) })] })] }), topMetrics.length > 0 && (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "body-sm", color: "primary", weight: "medium", children: "Key Metrics:" }), keyMetrics.length > 4 && (_jsxs(Text, { variant: "body-xs", color: "secondary", children: ["+", keyMetrics.length - 4, " more"] }))] }), _jsx("div", { className: "space-y-1", children: topMetrics.map((metric) => {
                                    const config = getMetricCategoryConfig(metric.category);
                                    const TrendIcon = getTrendIcon(metric.trend);
                                    const trendColor = getTrendColor(metric.trend);
                                    return (_jsxs("div", { className: cn('flex items-center gap-2 p-2 rounded transition-colors cursor-pointer', 'hover:bg-[var(--hive-background-secondary)]', metric.isHighlighted && 'bg-[var(--hive-gold)]/5 border border-[var(--hive-gold)]/20'), onClick: () => onViewMetric?.(metric.id), children: [_jsx(config.icon, { className: cn('h-3 w-3', config.color) }), _jsx(Text, { variant: "body-xs", color: "primary", className: "flex-1 truncate", children: metric.name }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsxs(Text, { variant: "body-xs", color: "primary", weight: "medium", children: [metric.value.toLocaleString(), metric.unit] }), _jsx(TrendIcon, { className: cn('h-2 w-2', trendColor) }), _jsxs(Text, { variant: "body-xs", className: trendColor, children: [metric.trendPercentage, "%"] })] }), _jsx(ChevronRight, { className: "h-3 w-3 text-[var(--hive-text-secondary)]" })] }, metric.id));
                                }) })] })), activeGoals.length > 0 && (_jsxs("div", { className: "space-y-2 pt-2 border-t border-[var(--hive-border-primary)]", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Text, { variant: "body-sm", color: "primary", weight: "medium", children: "Active Goals:" }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: [completedGoals.length, "/", activeGoals.length, " completed"] })] }), _jsx("div", { className: "space-y-2", children: activeGoals.slice(0, 2).map((goal) => {
                                    const config = getGoalCategoryConfig(goal.category);
                                    const progress = Math.min((goal.current / goal.target) * 100, 100);
                                    const isCompleted = goal.current >= goal.target;
                                    return (_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(config.icon, { className: cn('h-3 w-3', config.color) }), _jsx(Text, { variant: "body-xs", color: "primary", className: "truncate", children: goal.name })] }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: [goal.current, "/", goal.target, " ", goal.unit] })] }), _jsx("div", { className: "w-full bg-[var(--hive-background-secondary)] rounded-full h-1.5", children: _jsx("div", { className: cn('rounded-full h-1.5 transition-all duration-500', isCompleted ? 'bg-green-500' : config.color.replace('text-', 'bg-')), style: { width: `${progress}%` } }) })] }, goal.id));
                                }) })] })), user.academicYear && (_jsxs("div", { className: "space-y-2 pt-2 border-t border-[var(--hive-border-primary)]", children: [_jsxs(Text, { variant: "body-sm", color: "primary", weight: "medium", children: [user.academicYear.charAt(0).toUpperCase() + user.academicYear.slice(1), " Year Progress:"] }), _jsxs("div", { className: "p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx(Text, { variant: "body-sm", color: "primary", children: "Semester Completion" }), _jsxs(Text, { variant: "body-xs", color: "secondary", children: [academicProgress, "%"] })] }), _jsx("div", { className: "w-full bg-[var(--hive-background-secondary)] rounded-full h-2", children: _jsx("div", { className: "bg-blue-500 rounded-full h-2 transition-all duration-500", style: { width: `${academicProgress}%` } }) }), _jsx(Text, { variant: "body-xs", color: "secondary", className: "mt-1", children: academicProgress >= 75 ? 'Excellent progress this semester! 🎓' :
                                            academicProgress >= 50 ? 'Good progress - keep it up! 📚' :
                                                academicProgress >= 25 ? 'Building momentum this term 💪' :
                                                    'Early semester - great potential ahead! ✨' })] })] })), _jsxs("div", { className: "flex gap-2 pt-2 border-t border-[var(--hive-border-primary)]", children: [isEditable && onSetGoal && (_jsxs(Button, { variant: "secondary", size: "sm", onClick: onSetGoal, className: "flex-1", children: [_jsx(Target, { className: "h-3 w-3 mr-1" }), "Set Goal"] })), onViewAllStats && (_jsxs(Button, { variant: "primary", size: "sm", onClick: onViewAllStats, className: "flex-1", children: [_jsx(BarChart3, { className: "h-3 w-3 mr-1" }), "All Stats"] })), onViewInsights && (_jsx(Button, { variant: "ghost", size: "icon", onClick: onViewInsights, className: "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Eye, { className: "h-3 w-3" }) })), onExportData && (_jsx(Button, { variant: "ghost", size: "icon", onClick: onExportData, className: "text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]", children: _jsx(Download, { className: "h-3 w-3" }) }))] }), keyMetrics.length === 0 && personalGoals.length === 0 && (_jsxs("div", { className: "text-center py-6", children: [_jsx(BarChart3, { className: "h-8 w-8 mx-auto mb-3 text-[var(--hive-text-muted)]" }), _jsx(Text, { variant: "body-sm", color: "secondary", className: "mb-2", children: "No analytics data yet" }), _jsx(Text, { variant: "body-xs", color: "secondary", className: "mb-4", children: "Start engaging with the platform to see your personal analytics and insights" }), isEditable && onSetGoal && (_jsxs(Button, { variant: "secondary", size: "sm", onClick: onSetGoal, children: [_jsx(Target, { className: "h-3 w-3 mr-1" }), "Set Your First Goal"] }))] }))] }), isHovered && (_jsx("div", { className: "absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/5 to-[var(--hive-gold)]/5 rounded-lg blur-xl" }))] }));
};
//# sourceMappingURL=profile-stats-widget.js.map