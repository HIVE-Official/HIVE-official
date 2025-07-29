export interface ProfileDashboardData {
    user: {
        id: string;
        name: string;
        handle: string;
        email: string;
        profilePhotoUrl?: string;
        major?: string;
        academicYear?: string;
        interests: string[];
        joinedAt: string;
        lastActive: string;
    };
    summary: {
        totalSpaces: number;
        activeSpaces: number;
        favoriteSpaces: number;
        totalTimeSpent: number;
        weeklyActivity: number;
        contentCreated: number;
        toolsUsed: number;
        socialInteractions: number;
    };
    recentActivity: {
        spaces: Array<{
            spaceId: string;
            spaceName: string;
            action: string;
            timestamp: string;
            duration?: number;
        }>;
        tools: Array<{
            toolId: string;
            toolName?: string;
            action: string;
            timestamp: string;
            spaceId?: string;
        }>;
        social: Array<{
            type: string;
            description: string;
            timestamp: string;
            spaceId?: string;
        }>;
    };
    upcomingEvents: Array<{
        id: string;
        title: string;
        startDate: string;
        endDate: string;
        type: 'personal' | 'space';
        spaceId?: string;
        spaceName?: string;
        isToday: boolean;
        isUpcoming: boolean;
    }>;
    quickActions: {
        favoriteSpaces: Array<{
            spaceId: string;
            spaceName: string;
            unreadCount: number;
            lastActivity: string;
        }>;
        pinnedSpaces: Array<{
            spaceId: string;
            spaceName: string;
            unreadCount: number;
            lastActivity: string;
        }>;
        recommendations: Array<{
            spaceId: string;
            spaceName: string;
            matchScore: number;
            matchReasons: string[];
        }>;
    };
    insights: {
        peakActivityTime: string;
        mostActiveSpace: {
            spaceId: string;
            spaceName: string;
            timeSpent: number;
        } | null;
        weeklyGoal: {
            target: number;
            current: number;
            percentage: number;
        };
        streaks: {
            currentStreak: number;
            longestStreak: number;
            type: 'daily_activity' | 'content_creation' | 'tool_usage';
        };
    };
    privacy: {
        ghostMode: {
            enabled: boolean;
            level: string;
        };
        visibility: {
            profileVisible: boolean;
            activityVisible: boolean;
            onlineStatus: boolean;
        };
    };
}
interface HiveDashboardProps {
    data?: ProfileDashboardData;
    isLoading?: boolean;
    onRefresh?: () => void;
    onNavigate?: (path: string) => void;
    className?: string;
}
export declare function HiveDashboard({ data, isLoading, onRefresh, onNavigate, className }: HiveDashboardProps): import("react/jsx-runtime").JSX.Element;
export default HiveDashboard;
//# sourceMappingURL=hive-dashboard.d.ts.map