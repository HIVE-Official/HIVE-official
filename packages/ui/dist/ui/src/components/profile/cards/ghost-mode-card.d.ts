export interface GhostModeSettings {
    isEnabled: boolean;
    level: 'light' | 'medium' | 'full';
    duration?: 'temporary' | 'session' | 'indefinite';
    expiresAt?: Date;
    hideOnlineStatus: boolean;
    hideActivity: boolean;
    hideLocation: boolean;
    hideSpaces: boolean;
    hideTools: boolean;
    muteNotifications: boolean;
    presets: {
        studying: boolean;
        sleeping: boolean;
        busy: boolean;
        invisible: boolean;
    };
    autoEnabled: boolean;
    quietHours: {
        enabled: boolean;
        start: string;
        end: string;
    };
}
export interface GhostModeCardProps {
    settings: GhostModeSettings;
    isEditMode: boolean;
    onSettingsChange: (settings: Partial<GhostModeSettings>) => void;
    onToggleGhostMode: (enabled: boolean) => void;
    onQuickPreset: (preset: keyof GhostModeSettings['presets']) => void;
    onSettingsClick?: () => void;
    className?: string;
}
export declare function GhostModeCard({ settings, isEditMode, onSettingsChange, onToggleGhostMode, onQuickPreset, onSettingsClick, className }: GhostModeCardProps): import("react/jsx-runtime").JSX.Element;
export declare const mockGhostModeSettings: GhostModeSettings;
//# sourceMappingURL=ghost-mode-card.d.ts.map