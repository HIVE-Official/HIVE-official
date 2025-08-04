import React from 'react';
export interface ToolLibraryTool {
    id: string;
    name: string;
    description: string;
    icon: string;
    category: 'productivity' | 'social' | 'academic' | 'coordination';
    version: string;
    author: string;
    rating: number;
    installations: number;
    lastUpdated: string;
    features: string[];
    screenshots?: string[];
    tags: string[];
    isOfficial: boolean;
    isPremium?: boolean;
    requirements?: string[];
}
export interface ToolLibraryModalProps {
    isOpen: boolean;
    onClose: () => void;
    availableTools: ToolLibraryTool[];
    onPlantTool?: (tool: ToolLibraryTool) => void;
    spaceType?: 'university' | 'residential' | 'greek' | 'student';
    isPlanting?: boolean;
    plantingToolId?: string;
    className?: string;
}
export declare const ToolLibraryModal: React.FC<ToolLibraryModalProps>;
export default ToolLibraryModal;
//# sourceMappingURL=tool-library-modal.d.ts.map