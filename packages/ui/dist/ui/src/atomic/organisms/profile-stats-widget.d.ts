import React from 'react';
export interface StatMetric {
    id: string;
    name: string;
    value: number;
    unit: string;
    category: 'engagement' | 'academic' | 'social' | 'productivity' | 'growth';
    trend: 'up' | 'down' | 'stable';
    trendPercentage: number;
    period: 'daily' | 'weekly' | 'monthly' | 'semester';
    isHighlighted?: boolean;
}
export interface PersonalGoal {
    id: string;
    name: string;
    target: number;
    current: number;
    unit: string;
    deadline: string;
    category: 'academic' | 'social' | 'personal' | 'career';
    isActive: boolean;
}
export interface ProfileStatsWidgetProps {
    user: {
        id: string;
        name: string;
        academicYear?: 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate';
    };
    keyMetrics?: StatMetric[];
    personalGoals?: PersonalGoal[];
    overallScore?: number;
    weeklyGrowth?: number;
    academicProgress?: number;
    socialEngagement?: number;
    platformLevel?: number;
    streak?: number;
    isEditable?: boolean;
    onViewMetric?: (metricId: string) => void;
    onViewAllStats?: () => void;
    onSetGoal?: () => void;
    onExportData?: () => void;
    onViewInsights?: () => void;
    className?: string;
}
export declare const ProfileStatsWidget: React.FC<ProfileStatsWidgetProps>;
//# sourceMappingURL=profile-stats-widget.d.ts.map