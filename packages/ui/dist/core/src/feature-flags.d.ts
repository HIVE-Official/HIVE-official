export interface FeatureFlags {
    toolBuilderVariant: 'visual' | 'wizard' | 'template' | 'code';
    navigationVariant: 'sidebar' | 'topnav' | 'command' | 'mobile';
    dashboardLayout: 'cards' | 'list' | 'timeline';
    spaceDiscovery: 'grid' | 'map' | 'feed' | 'recommendations';
    enableAdvancedBuilder: boolean;
    enableCollaborativeEditing: boolean;
    enableRealTimeNotifications: boolean;
}
export declare const DEFAULT_FLAGS: FeatureFlags;
export declare function getFeatureFlags(userId: string): FeatureFlags;
export interface VariantEvent {
    userId: string;
    variant: string;
    feature: keyof FeatureFlags;
    action: 'view' | 'interact' | 'complete' | 'abandon';
    timestamp: Date;
    metadata?: Record<string, unknown>;
}
export declare function trackVariantEvent(event: Omit<VariantEvent, 'timestamp'>): void;
//# sourceMappingURL=feature-flags.d.ts.map