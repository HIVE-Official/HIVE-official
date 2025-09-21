import * as React from "react";
export interface HIVETool {
    id: string;
    name: string;
    description: string;
    category: string;
    status: 'draft' | 'published' | 'archived';
    usage: number;
    rating: number;
    createdAt: Date;
    updatedAt: Date;
    author: {
        id: string;
        name: string;
        avatar?: string;
    };
    tags: string[];
    complexity: 'beginner' | 'intermediate' | 'advanced';
}
export interface CompleteHIVEToolsSystemProps {
    tools: HIVETool[];
    onToolSelect?: (tool: HIVETool) => void;
    onToolCreate?: () => void;
    onToolEdit?: (tool: HIVETool) => void;
    onToolDelete?: (tool: HIVETool) => void;
    onToolDuplicate?: (tool: HIVETool) => void;
    className?: string;
    showCreateButton?: boolean;
    showSearch?: boolean;
    showFilters?: boolean;
}
declare const CompleteHIVEToolsSystem: React.ForwardRefExoticComponent<CompleteHIVEToolsSystemProps & React.RefAttributes<HTMLDivElement>>;
export { CompleteHIVEToolsSystem };
//# sourceMappingURL=complete-hive-tools-system.d.ts.map