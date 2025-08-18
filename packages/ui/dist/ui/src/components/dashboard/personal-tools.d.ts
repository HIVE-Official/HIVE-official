import React from 'react';
export interface PersonalTool {
    id: string;
    name: string;
    description: string;
    icon: React.ReactNode;
    category: 'academic' | 'productivity' | 'social' | 'wellness';
    isActive: boolean;
    lastUsed?: string;
    data?: Record<string, any>;
    quickAction?: {
        label: string;
        value?: string | number;
        unit?: string;
    };
}
export interface PersonalToolsData {
    tools: PersonalTool[];
    quickStats: {
        gpa: number;
        studyHours: number;
        tasksCompleted: number;
        upcomingDeadlines: number;
    };
    recentActivities: Array<{
        toolId: string;
        toolName: string;
        action: string;
        timestamp: string;
        result?: string;
    }>;
}
interface PersonalToolsProps {
    data?: PersonalToolsData;
    isLoading?: boolean;
    onToolAction?: (toolId: string, action: string, data?: any) => void;
    onAddTool?: () => void;
    className?: string;
}
export declare function PersonalTools({ data, isLoading, onToolAction, onAddTool, className }: PersonalToolsProps): import("react/jsx-runtime").JSX.Element;
export declare const mockPersonalToolsData: PersonalToolsData;
export default PersonalTools;
//# sourceMappingURL=personal-tools.d.ts.map