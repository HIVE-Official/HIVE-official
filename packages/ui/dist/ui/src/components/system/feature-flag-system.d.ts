/**
 * HIVE Feature Flag System
 * Centralized feature management for easy activation/deactivation
 */
import React from 'react';
export interface FeatureFlag {
    id: string;
    name: string;
    description: string;
    category: 'social' | 'tools' | 'communication' | 'ui' | 'system' | 'analytics' | 'experimental';
    status: 'enabled' | 'disabled' | 'beta' | 'deprecated';
    isEnabled: boolean;
    dependencies?: string[];
    rolloutPercentage?: number;
    userGroups?: string[];
    environment?: ('development' | 'staging' | 'production')[];
    createdAt: string;
    lastModified: string;
    modifiedBy: string;
    version: string;
    impact: 'low' | 'medium' | 'high' | 'critical';
    metrics?: {
        usageCount: number;
        errorRate: number;
        performanceImpact: number;
        userSatisfaction: number;
    };
    metadata?: Record<string, any>;
}
export interface FeatureFlagGroup {
    id: string;
    name: string;
    description: string;
    flags: string[];
    isCollapsed?: boolean;
}
interface FeatureFlagSystemProps {
    flags: FeatureFlag[];
    groups?: FeatureFlagGroup[];
    currentUserId: string;
    userRole: 'admin' | 'developer' | 'user';
    environment: 'development' | 'staging' | 'production';
    onToggleFlag?: (flagId: string, enabled: boolean) => Promise<void>;
    onUpdateFlag?: (flagId: string, updates: Partial<FeatureFlag>) => Promise<void>;
    onBulkToggle?: (flagIds: string[], enabled: boolean) => Promise<void>;
    onExportFlags?: (format: 'json' | 'csv') => Promise<void>;
    onImportFlags?: (data: any) => Promise<void>;
    enableFeatureFlag?: boolean;
}
interface FeatureFlagContextType {
    flags: Record<string, boolean>;
    isEnabled: (flagId: string) => boolean;
    toggleFlag: (flagId: string) => void;
    refreshFlags: () => void;
}
export declare const useFeatureFlag: (flagId: string) => boolean;
export declare const useFeatureFlags: () => FeatureFlagContextType;
export declare const DEFAULT_FEATURE_FLAGS: FeatureFlag[];
export declare const FeatureFlagProvider: React.FC<{
    children: React.ReactNode;
    initialFlags?: Record<string, boolean>;
}>;
export declare const FeatureFlagSystem: React.FC<FeatureFlagSystemProps>;
export {};
//# sourceMappingURL=feature-flag-system.d.ts.map