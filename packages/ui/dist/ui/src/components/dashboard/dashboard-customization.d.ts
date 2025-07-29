export interface DashboardWidget {
    id: string;
    type: 'overview' | 'analytics' | 'activity' | 'notifications' | 'recommendations' | 'calendar' | 'tools' | 'spaces' | 'profile';
    title: string;
    description: string;
    isVisible: boolean;
    position: {
        x: number;
        y: number;
    };
    size: 'small' | 'medium' | 'large' | 'xl';
    isLocked: boolean;
    config: Record<string, any>;
}
export interface DashboardLayout {
    id: string;
    name: string;
    description: string;
    widgets: DashboardWidget[];
    gridColumns: number;
    theme: 'default' | 'compact' | 'spacious';
    isActive: boolean;
}
export interface CustomizationPreferences {
    autoSave: boolean;
    showGrid: boolean;
    snapToGrid: boolean;
    animationsEnabled: boolean;
    compactMode: boolean;
    darkMode: boolean;
    colorScheme: 'default' | 'blue' | 'purple' | 'green' | 'orange';
    fontSize: 'small' | 'medium' | 'large';
    refreshInterval: number;
}
interface DashboardCustomizationProps {
    currentLayout: DashboardLayout;
    availableWidgets: DashboardWidget[];
    preferences: CustomizationPreferences;
    onLayoutUpdate: (layout: DashboardLayout) => void;
    onPreferencesUpdate: (preferences: CustomizationPreferences) => void;
    onSaveLayout: (layout: DashboardLayout) => void;
    onResetLayout: () => void;
    isEditMode: boolean;
    onToggleEditMode: (enabled: boolean) => void;
    className?: string;
}
export declare function DashboardCustomization({ currentLayout, availableWidgets, preferences, onLayoutUpdate, onPreferencesUpdate, onSaveLayout, onResetLayout, isEditMode, onToggleEditMode, className }: DashboardCustomizationProps): import("react/jsx-runtime").JSX.Element;
export default DashboardCustomization;
//# sourceMappingURL=dashboard-customization.d.ts.map