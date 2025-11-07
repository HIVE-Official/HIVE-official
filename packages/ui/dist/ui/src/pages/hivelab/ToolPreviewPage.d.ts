import * as React from 'react';
import type { ToolComposition } from '../../lib/hivelab/element-system';
export interface ToolPreviewPageProps {
    composition: ToolComposition;
    initialMode?: 'preview' | 'live';
    onBack?: () => void;
    onEdit?: (composition: ToolComposition) => void;
    onRun?: (composition: ToolComposition) => void;
    onOpenSettings?: (composition: ToolComposition) => void;
    renderRuntime: (composition: ToolComposition, mode: 'preview' | 'live') => React.ReactNode;
}
export declare function ToolPreviewPage({ composition, initialMode, onBack, onEdit, onRun, onOpenSettings, renderRuntime, }: ToolPreviewPageProps): import("react/jsx-runtime").JSX.Element;
export declare namespace ToolPreviewPage {
    var displayName: string;
}
//# sourceMappingURL=ToolPreviewPage.d.ts.map