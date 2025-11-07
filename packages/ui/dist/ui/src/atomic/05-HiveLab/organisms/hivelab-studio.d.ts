import type { ToolComposition } from '../../lib/hivelab/element-system';
export interface HiveLabStudioProps {
    userId: string;
    initialComposition?: ToolComposition;
    onSave: (composition: ToolComposition) => Promise<void> | void;
    onPreview: (composition: ToolComposition) => void;
    onCancel?: () => void;
}
export declare function HiveLabStudio({ userId, initialComposition, onSave, onPreview, onCancel }: HiveLabStudioProps): import("react/jsx-runtime").JSX.Element;
export declare namespace HiveLabStudio {
    var displayName: string;
}
//# sourceMappingURL=hivelab-studio.d.ts.map