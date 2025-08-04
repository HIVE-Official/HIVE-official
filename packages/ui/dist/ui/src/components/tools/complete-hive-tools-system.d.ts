import React from 'react';
export interface CompleteHIVEToolsSystemProps {
    activeTab?: 'marketplace' | 'personal' | 'hivelab';
    userRole?: 'student' | 'leader' | 'admin';
    selectedCategory?: string;
    searchQuery?: string;
    viewMode?: 'grid' | 'list';
    onTabChange?: (tab: 'marketplace' | 'personal' | 'hivelab') => void;
    onToolInstall?: (toolId: string) => void;
    onToolAction?: (toolId: string, action: string) => void;
    onToolPreview?: (toolId: string) => void;
    onCreateTool?: (mode: 'visual' | 'template' | 'wizard') => void;
    onSearchChange?: (query: string) => void;
    onCategoryChange?: (category: string) => void;
    onViewModeChange?: (mode: 'grid' | 'list') => void;
    onToolFavorite?: (toolId: string) => void;
    onToolShare?: (toolId: string) => void;
    marketplaceTools?: any[];
    personalTools?: any[];
    loading?: boolean;
    error?: string | null;
    showDebugLabels?: boolean;
}
export declare const CompleteHIVEToolsSystem: React.FC<CompleteHIVEToolsSystemProps>;
//# sourceMappingURL=complete-hive-tools-system.d.ts.map