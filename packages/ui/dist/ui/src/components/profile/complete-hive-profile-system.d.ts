import React from 'react';
export interface CompleteHIVEProfileSystemProps {
    user?: any;
    stats?: any;
    editMode?: boolean;
    onEditModeToggle?: () => void;
    onWidgetConfigure?: (widgetId: string) => void;
    completeness?: any;
    onUploadAvatar?: (file: File) => void;
    onToggleGhostMode?: () => void;
    loading?: boolean;
    error?: string | null;
}
export declare const CompleteHIVEProfileSystem: React.FC<CompleteHIVEProfileSystemProps>;
//# sourceMappingURL=complete-hive-profile-system.d.ts.map