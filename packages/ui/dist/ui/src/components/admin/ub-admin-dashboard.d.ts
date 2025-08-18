export interface UBCampusMetrics {
    platform: {
        name: string;
        version: string;
        environment: 'development' | 'staging' | 'production';
        university: 'University at Buffalo';
        campus: 'North Campus' | 'South Campus' | 'Downtown' | 'All Campuses';
    };
    students: {
        total: number;
        active: number;
        newThisWeek: number;
        byYear: Record<string, number>;
        byMajor: Record<string, number>;
        byDorm: Record<string, number>;
        verified: number;
        pendingVerification: number;
    };
    spaces: {
        total: number;
        active: number;
        dormant: number;
        needsModeration: number;
        byCategory: Record<string, {
            count: number;
            members: number;
        }>;
        totalMembers: number;
        averageEngagement: number;
    };
    tools: {
        total: number;
        active: number;
        pendingReview: number;
        deployments: number;
        byCategory: Record<string, number>;
        usage: {
            dailyActive: number;
            weeklyActive: number;
            monthlyActive: number;
        };
    };
    rituals: {
        total: number;
        active: number;
        completed: number;
        participation: {
            current: number;
            total: number;
            rate: number;
        };
        campusImpact: number;
    };
    content: {
        posts: number;
        comments: number;
        reported: number;
        moderated: number;
        flagged: number;
        approved: number;
    };
    system: {
        status: 'healthy' | 'warning' | 'critical';
        uptime: number;
        performance: {
            responseTime: number;
            errorRate: number;
            throughput: number;
        };
        storage: {
            used: number;
            total: number;
            percentage: number;
        };
        costs: {
            monthly: number;
            daily: number;
            trend: 'up' | 'down' | 'stable';
        };
    };
}
export interface UBModerationItem {
    id: string;
    type: 'space' | 'tool' | 'post' | 'comment' | 'user' | 'ritual';
    title: string;
    description: string;
    author: {
        id: string;
        name: string;
        handle: string;
        email: string;
    };
    reportedBy?: {
        id: string;
        name: string;
        handle: string;
    };
    reason: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    status: 'pending' | 'reviewing' | 'approved' | 'rejected' | 'escalated';
    createdAt: string;
    reviewedAt?: string;
    reviewedBy?: string;
    campusContext: {
        building?: string;
        dorm?: string;
        department?: string;
        course?: string;
    };
}
export interface UBAdminAction {
    id: string;
    type: 'user_action' | 'content_moderation' | 'system_admin' | 'campus_management';
    action: string;
    description: string;
    adminId: string;
    adminName: string;
    targetId: string;
    targetType: string;
    timestamp: string;
    impact: 'low' | 'medium' | 'high';
    reversible: boolean;
}
interface UBAdminMetricsOverviewProps {
    metrics: UBCampusMetrics;
    className?: string;
}
export declare function UBAdminMetricsOverview({ metrics, className }: UBAdminMetricsOverviewProps): import("react/jsx-runtime").JSX.Element;
interface UBModerationQueueProps {
    items: UBModerationItem[];
    onApprove?: (itemId: string) => void;
    onReject?: (itemId: string) => void;
    onEscalate?: (itemId: string) => void;
    onView?: (itemId: string) => void;
    className?: string;
}
export declare function UBModerationQueue({ items, onApprove, onReject, onEscalate, onView, className }: UBModerationQueueProps): import("react/jsx-runtime").JSX.Element;
interface UBAdminQuickActionsProps {
    onSendCampusNotification?: () => void;
    onExportUserData?: () => void;
    onGenerateReport?: (type: string) => void;
    onSystemMaintenance?: () => void;
    onBackupData?: () => void;
    className?: string;
}
export declare function UBAdminQuickActions({ onSendCampusNotification, onExportUserData, onGenerateReport, onSystemMaintenance, onBackupData, className }: UBAdminQuickActionsProps): import("react/jsx-runtime").JSX.Element;
export {};
//# sourceMappingURL=ub-admin-dashboard.d.ts.map