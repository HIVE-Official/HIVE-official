import React from 'react';
export interface CompleteHIVESpacesSystemProps {
    viewMode?: 'explore' | 'category' | 'space-preview' | 'space-board' | 'member-directory';
    userRole?: 'student' | 'leader' | 'admin';
    categoryType?: 'university' | 'residential' | 'greek' | 'student' | 'all';
    showDebugLabels?: boolean;
    onNavigate?: (view: string, data?: any) => void;
    spacesData?: any;
    loading?: boolean;
    error?: string | null;
}
export declare const CompleteHIVESpacesSystem: React.FC<CompleteHIVESpacesSystemProps>;
//# sourceMappingURL=complete-hive-spaces-system.d.ts.map