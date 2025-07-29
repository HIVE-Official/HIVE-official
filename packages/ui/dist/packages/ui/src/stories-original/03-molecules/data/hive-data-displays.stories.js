import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { TrendingUp, TrendingDown, Users, BookOpen, Clock, Star, Award, Target, Zap, BarChart3, PieChart, Activity, CheckCircle } from 'lucide-react';
// HIVE Data Display Molecules - Student Engagement Analytics
const meta = {
    title: 'Molecules/📊 Data Displays',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: `
**HIVE Data Display Molecules** - Student engagement analytics with dense responsive layouts

Brand-compliant data visualization patterns using strict HIVE color palette: Gold (var(--hive-brand-secondary)), Obsidian (#0A0A0B), and Platinum (#E5E5E7) variants only. Dense, efficient layouts that present campus engagement data clearly across all screen sizes.

## Brand Compliance
- **Gold Only**: HIVE Gold (var(--hive-brand-secondary)) for positive metrics and highlights
- **Black Variants**: Obsidian (var(--hive-background-primary)), Charcoal (#111113) for backgrounds
- **White Variants**: Platinum (#E5E5E7), Silver (var(--hive-text-secondary)) for data text
- **Zero Non-Brand Colors**: No blues, greens, reds for data visualization

## Dense Data Patterns
- **Compact Metrics**: Maximum information density with minimal space
- **Glanceable Data**: Quick insights for busy student schedules
- **Campus Context**: Data relevant to university social engagement
- **Mobile-First**: Touch-friendly data interactions that scale up

## Student Engagement Focus
- Study streaks and academic progress
- Social connections and campus engagement
- Tool usage and creation analytics
- Space participation and community metrics
        `
            }
        }
    },
    tags: ['autodocs']
};
export default meta;
// Study Streak Card - Academic Progress Tracking
const StudyStreakCard = ({ currentStreak = 47, longestStreak = 89, todayComplete = true, weeklyGoal = 7, weeklyProgress = 5 }) => {
    const streakDays = Array.from({ length: 7 }, (_, i) => ({
        day: ['S', 'M', 'T', 'W', 'T', 'F', 'S'][i],
        complete: i < weeklyProgress
    }));
    return (_jsxs("div", { className: "bg-charcoal border border-steel rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("h3", { className: "text-sm font-semibold text-platinum flex items-center", children: [_jsx(Zap, { className: "h-4 w-4 text-gold mr-2" }), "Study Streak"] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx("span", { className: "text-xs text-silver", children: "Today" }), todayComplete ? (_jsx(CheckCircle, { className: "h-4 w-4 text-gold" })) : (_jsx("div", { className: "h-4 w-4 border border-steel rounded-full" }))] })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-gold mb-1", children: currentStreak }), _jsx("div", { className: "text-xs text-silver", children: "Current" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-platinum mb-1", children: longestStreak }), _jsx("div", { className: "text-xs text-silver", children: "Best" })] })] }), _jsx("div", { className: "flex justify-between mb-2", children: streakDays.map((day, index) => (_jsxs("div", { className: "flex flex-col items-center", children: [_jsx("div", { className: `w-6 h-6 rounded-full border-2 flex items-center justify-center mb-1 ${day.complete
                                ? 'bg-gold border-gold'
                                : 'border-steel'}`, children: day.complete && _jsx(CheckCircle, { className: "h-3 w-3 text-obsidian" }) }), _jsx("span", { className: "text-xs text-silver", children: day.day })] }, index))) }), _jsxs("div", { className: "text-xs text-silver text-center", children: [weeklyProgress, "/", weeklyGoal, " days this week"] })] }));
};
// Campus Engagement Stats - Social Activity Metrics
const CampusEngagementStats = ({ totalSpaces = 23, activeSpaces = 15, connectionsCount = 187, weeklyMessages = 42, engagementTrend = 'up', trendPercentage = 12 }) => {
    const metrics = [
        { label: 'Total Spaces', value: totalSpaces, icon: Users },
        { label: 'Active Spaces', value: activeSpaces, icon: BookOpen },
        { label: 'Connections', value: connectionsCount, icon: Users },
        { label: 'Messages/Week', value: weeklyMessages, icon: Activity }
    ];
    const TrendIcon = engagementTrend === 'up' ? TrendingUp : TrendingDown;
    return (_jsxs("div", { className: "bg-charcoal border border-steel rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h3", { className: "text-sm font-semibold text-platinum", children: "Campus Engagement" }), _jsxs("div", { className: `flex items-center space-x-1 ${engagementTrend === 'up' ? 'text-gold' : 'text-silver'}`, children: [_jsx(TrendIcon, { className: "h-4 w-4" }), _jsxs("span", { className: "text-xs font-medium", children: [trendPercentage, "%"] })] })] }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: metrics.map((metric, index) => {
                    const Icon = metric.icon;
                    return (_jsxs("div", { className: "text-center p-3 bg-graphite rounded-lg", children: [_jsx(Icon, { className: "h-5 w-5 text-gold mx-auto mb-2" }), _jsx("div", { className: "text-lg font-bold text-platinum mb-1", children: metric.value }), _jsx("div", { className: "text-xs text-silver", children: metric.label })] }, index));
                }) })] }));
};
// HIVE Tools Analytics - Creation and Usage Stats
const HIVEToolsAnalytics = ({ toolsCreated = 12, totalUsers = 234, weeklyActiveUsers = 89, topTool = {
    name: 'Grade Tracker',
    users: 67,
    rating: 4.8
} }) => {
    return (_jsxs("div", { className: "bg-charcoal border border-steel rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("h3", { className: "text-sm font-semibold text-platinum flex items-center", children: [_jsx(BookOpen, { className: "h-4 w-4 text-gold mr-2" }), "HIVE Tools Impact"] }), _jsx(Award, { className: "h-4 w-4 text-gold" })] }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex justify-between items-center", children: [_jsxs("div", { children: [_jsx("div", { className: "text-2xl font-bold text-gold", children: toolsCreated }), _jsx("div", { className: "text-xs text-silver", children: "Tools Created" })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-2xl font-bold text-platinum", children: totalUsers }), _jsx("div", { className: "text-xs text-silver", children: "Total Users" })] })] }), _jsxs("div", { className: "border-t border-steel pt-3", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsx("span", { className: "text-xs text-silver", children: "Weekly Active" }), _jsx("span", { className: "text-sm font-semibold text-platinum", children: weeklyActiveUsers })] }), _jsx("div", { className: "w-full bg-graphite rounded-full h-2", children: _jsx("div", { className: "bg-gold h-2 rounded-full", style: { width: `${(weeklyActiveUsers / totalUsers) * 100}%` } }) })] }), _jsx("div", { className: "bg-graphite rounded-lg p-3", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium text-platinum", children: topTool.name }), _jsxs("div", { className: "text-xs text-silver", children: [topTool.users, " users"] })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Star, { className: "h-3 w-3 text-gold", fill: "currentColor" }), _jsx("span", { className: "text-xs font-medium text-gold", children: topTool.rating })] })] }) })] })] }));
};
// Study Session Analytics - Time Management Insights
const StudySessionAnalytics = ({ totalHours = 127, averageSession = 45, focusScore = 87, todaysSessions = [
    { subject: 'CS 106B', duration: 90, focus: 92 },
    { subject: 'Math 51', duration: 60, focus: 78 },
    { subject: 'PWR 1', duration: 30, focus: 95 }
] }) => {
    return (_jsxs("div", { className: "bg-charcoal border border-steel rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("h3", { className: "text-sm font-semibold text-platinum flex items-center", children: [_jsx(Clock, { className: "h-4 w-4 text-gold mr-2" }), "Study Analytics"] }), _jsx(Target, { className: "h-4 w-4 text-gold" })] }), _jsxs("div", { className: "grid grid-cols-3 gap-3 mb-4", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-lg font-bold text-gold", children: [totalHours, "h"] }), _jsx("div", { className: "text-xs text-silver", children: "Total" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-lg font-bold text-platinum", children: [averageSession, "m"] }), _jsx("div", { className: "text-xs text-silver", children: "Avg Session" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-lg font-bold text-gold", children: [focusScore, "%"] }), _jsx("div", { className: "text-xs text-silver", children: "Focus Score" })] })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "text-xs font-medium text-silver mb-2", children: "Today's Sessions" }), todaysSessions.map((session, index) => (_jsxs("div", { className: "flex items-center justify-between bg-graphite rounded p-2", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium text-platinum", children: session.subject }), _jsxs("div", { className: "text-xs text-silver", children: [session.duration, " minutes"] })] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "text-sm font-semibold text-gold", children: [session.focus, "%"] }), _jsx("div", { className: "text-xs text-silver", children: "focus" })] })] }, index)))] })] }));
};
// Course Progress Dashboard - Academic Achievement Tracking
const CourseProgressDashboard = ({ courses = [
    { id: 'cs106b', name: 'CS 106B', progress: 78, grade: 'A-', assignments: 12, completed: 9 },
    { id: 'math51', name: 'Math 51', progress: 85, grade: 'A', assignments: 8, completed: 7 },
    { id: 'pwr1', name: 'PWR 1', progress: 92, grade: 'A+', assignments: 6, completed: 6 },
    { id: 'cs161', name: 'CS 161', progress: 65, grade: 'B+', assignments: 10, completed: 6 }
] }) => {
    const overallProgress = Math.round(courses.reduce((sum, course) => sum + course.progress, 0) / courses.length);
    return (_jsxs("div", { className: "bg-charcoal border border-steel rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("h3", { className: "text-sm font-semibold text-platinum flex items-center", children: [_jsx(BarChart3, { className: "h-4 w-4 text-gold mr-2" }), "Course Progress"] }), _jsxs("div", { className: "text-right", children: [_jsxs("div", { className: "text-lg font-bold text-gold", children: [overallProgress, "%"] }), _jsx("div", { className: "text-xs text-silver", children: "Overall" })] })] }), _jsx("div", { className: "space-y-3", children: courses.map((course) => (_jsxs("div", { className: "bg-graphite rounded-lg p-3", children: [_jsxs("div", { className: "flex items-center justify-between mb-2", children: [_jsxs("div", { children: [_jsx("div", { className: "text-sm font-medium text-platinum", children: course.name }), _jsxs("div", { className: "text-xs text-silver", children: [course.completed, "/", course.assignments, " assignments"] })] }), _jsxs("div", { className: "text-right", children: [_jsx("div", { className: "text-sm font-semibold text-gold", children: course.grade }), _jsxs("div", { className: "text-xs text-silver", children: [course.progress, "%"] })] })] }), _jsx("div", { className: "w-full bg-steel rounded-full h-2", children: _jsx("div", { className: "bg-gold h-2 rounded-full transition-all duration-300", style: { width: `${course.progress}%` } }) })] }, course.id))) })] }));
};
// Campus Activity Feed - Social Engagement Summary
const CampusActivitySummary = ({ weeklyStats = {
    postsRead: 156,
    commentsPosted: 23,
    spacesVisited: 12,
    eventsAttended: 3
}, topSpaces = [
    { name: 'CS 106B', type: 'course', activity: 45 },
    { name: 'Wilbur Hall 3rd', type: 'housing', activity: 32 },
    { name: 'HCI Club', type: 'club', activity: 18 }
] }) => {
    const getTypeIcon = (type) => {
        switch (type) {
            case 'course': return BookOpen;
            case 'housing': return Users;
            case 'club': return Star;
            default: return Users;
        }
    };
    return (_jsxs("div", { className: "bg-charcoal border border-steel rounded-lg p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("h3", { className: "text-sm font-semibold text-platinum flex items-center", children: [_jsx(Activity, { className: "h-4 w-4 text-gold mr-2" }), "Weekly Activity"] }), _jsx(PieChart, { className: "h-4 w-4 text-gold" })] }), _jsxs("div", { className: "grid grid-cols-2 gap-2 mb-4", children: [_jsxs("div", { className: "bg-graphite rounded p-2 text-center", children: [_jsx("div", { className: "text-lg font-bold text-gold", children: weeklyStats.postsRead }), _jsx("div", { className: "text-xs text-silver", children: "Posts Read" })] }), _jsxs("div", { className: "bg-graphite rounded p-2 text-center", children: [_jsx("div", { className: "text-lg font-bold text-platinum", children: weeklyStats.commentsPosted }), _jsx("div", { className: "text-xs text-silver", children: "Comments" })] }), _jsxs("div", { className: "bg-graphite rounded p-2 text-center", children: [_jsx("div", { className: "text-lg font-bold text-platinum", children: weeklyStats.spacesVisited }), _jsx("div", { className: "text-xs text-silver", children: "Spaces" })] }), _jsxs("div", { className: "bg-graphite rounded p-2 text-center", children: [_jsx("div", { className: "text-lg font-bold text-gold", children: weeklyStats.eventsAttended }), _jsx("div", { className: "text-xs text-silver", children: "Events" })] })] }), _jsxs("div", { children: [_jsx("div", { className: "text-xs font-medium text-silver mb-2", children: "Most Active Spaces" }), _jsx("div", { className: "space-y-2", children: topSpaces.map((space, index) => {
                            const Icon = getTypeIcon(space.type);
                            return (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Icon, { className: "h-3 w-3 text-gold" }), _jsx("span", { className: "text-sm text-platinum", children: space.name })] }), _jsx("span", { className: "text-xs font-medium text-gold", children: space.activity })] }, index));
                        }) })] })] }));
};
// Stories
export const StudentStudyStreaks = {
    name: '⚡ Study Streak Tracking',
    render: () => (_jsx("div", { className: "bg-obsidian p-6 min-h-screen", children: _jsxs("div", { className: "max-w-sm mx-auto", children: [_jsx(StudyStreakCard, {}), _jsxs("div", { className: "mt-6 bg-charcoal rounded-lg p-4 text-center", children: [_jsx("h3", { className: "text-lg font-semibold text-platinum mb-2", children: "Academic Momentum" }), _jsx("p", { className: "text-sm text-silver", children: "Track daily study habits and maintain academic consistency with visual progress indicators" })] })] }) }))
};
export const CampusEngagementMetrics = {
    name: '🏛️ Campus Engagement Stats',
    render: () => (_jsx("div", { className: "bg-obsidian p-6 min-h-screen", children: _jsxs("div", { className: "max-w-sm mx-auto", children: [_jsx(CampusEngagementStats, {}), _jsxs("div", { className: "mt-6 bg-charcoal rounded-lg p-4 text-center", children: [_jsx("h3", { className: "text-lg font-semibold text-platinum mb-2", children: "Social Analytics" }), _jsx("p", { className: "text-sm text-silver", children: "Monitor campus social engagement across spaces, connections, and community participation" })] })] }) }))
};
export const HIVEToolsImpactDashboard = {
    name: '🛠️ HIVE Tools Analytics',
    render: () => (_jsx("div", { className: "bg-obsidian p-6 min-h-screen", children: _jsxs("div", { className: "max-w-sm mx-auto", children: [_jsx(HIVEToolsAnalytics, {}), _jsxs("div", { className: "mt-6 bg-charcoal rounded-lg p-4 text-center", children: [_jsx("h3", { className: "text-lg font-semibold text-platinum mb-2", children: "Builder Impact" }), _jsx("p", { className: "text-sm text-silver", children: "Track the impact of your created HIVE tools on the campus community" })] })] }) }))
};
export const StudySessionInsights = {
    name: '⏱️ Study Session Analytics',
    render: () => (_jsx("div", { className: "bg-obsidian p-6 min-h-screen", children: _jsxs("div", { className: "max-w-sm mx-auto", children: [_jsx(StudySessionAnalytics, {}), _jsxs("div", { className: "mt-6 bg-charcoal rounded-lg p-4 text-center", children: [_jsx("h3", { className: "text-lg font-semibold text-platinum mb-2", children: "Focus Insights" }), _jsx("p", { className: "text-sm text-silver", children: "Analyze study patterns, session duration, and focus metrics for academic optimization" })] })] }) }))
};
export const AcademicProgressDashboard = {
    name: '📚 Course Progress Tracking',
    render: () => (_jsx("div", { className: "bg-obsidian p-6 min-h-screen", children: _jsxs("div", { className: "max-w-md mx-auto", children: [_jsx(CourseProgressDashboard, {}), _jsxs("div", { className: "mt-6 bg-charcoal rounded-lg p-4 text-center", children: [_jsx("h3", { className: "text-lg font-semibold text-platinum mb-2", children: "Academic Overview" }), _jsx("p", { className: "text-sm text-silver", children: "Comprehensive course progress tracking with grades and assignment completion" })] })] }) }))
};
export const CampusActivityOverview = {
    name: '📊 Campus Activity Summary',
    render: () => (_jsx("div", { className: "bg-obsidian p-6 min-h-screen", children: _jsxs("div", { className: "max-w-sm mx-auto", children: [_jsx(CampusActivitySummary, {}), _jsxs("div", { className: "mt-6 bg-charcoal rounded-lg p-4 text-center", children: [_jsx("h3", { className: "text-lg font-semibold text-platinum mb-2", children: "Social Engagement" }), _jsx("p", { className: "text-sm text-silver", children: "Weekly activity summary showing engagement across campus spaces and events" })] })] }) }))
};
export const DenseDataDashboard = {
    name: '📱 Dense Mobile Dashboard',
    render: () => (_jsx("div", { className: "bg-obsidian p-4 min-h-screen", children: _jsxs("div", { className: "max-w-sm mx-auto space-y-4", children: [_jsx(StudyStreakCard, {}), _jsx(CampusEngagementStats, {}), _jsx(HIVEToolsAnalytics, {}), _jsx(StudySessionAnalytics, {}), _jsxs("div", { className: "bg-charcoal rounded-lg p-4 text-center", children: [_jsx(Activity, { className: "h-8 w-8 text-gold mx-auto mb-2" }), _jsx("h3", { className: "text-lg font-semibold text-platinum mb-2", children: "Complete Analytics" }), _jsx("p", { className: "text-sm text-silver", children: "Dense mobile dashboard showing all student engagement metrics in a compact, scannable format" })] })] }) })),
    parameters: {
        viewport: { defaultViewport: 'mobile2' }
    }
};
export const ResponsiveDataGrid = {
    name: '📐 Responsive Data Display',
    render: () => (_jsx("div", { className: "bg-obsidian p-6 min-h-screen", children: _jsxs("div", { className: "max-w-4xl mx-auto", children: [_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: [_jsx(StudyStreakCard, {}), _jsx(CampusEngagementStats, {}), _jsx(HIVEToolsAnalytics, {}), _jsx(StudySessionAnalytics, {}), _jsx(CourseProgressDashboard, {}), _jsx(CampusActivitySummary, {})] }), _jsxs("div", { className: "mt-8 bg-charcoal rounded-lg p-6 text-center", children: [_jsx(BarChart3, { className: "h-12 w-12 text-gold mx-auto mb-4" }), _jsx("h2", { className: "text-2xl font-bold text-platinum mb-4", children: "Student Analytics Hub" }), _jsx("p", { className: "text-silver max-w-2xl mx-auto", children: "Comprehensive responsive dashboard that adapts from single-column mobile to three-column desktop, maintaining data clarity and visual hierarchy across all screen sizes" })] })] }) }))
};
//# sourceMappingURL=hive-data-displays.stories.js.map