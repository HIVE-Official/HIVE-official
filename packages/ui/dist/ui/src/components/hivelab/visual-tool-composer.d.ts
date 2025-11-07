import { type ToolComposition } from '../../lib/hivelab/element-system';
export interface VisualToolComposerProps {
    onSave: (composition: ToolComposition) => Promise<void> | void;
    onPreview: (composition: ToolComposition) => void;
    onCancel: () => void;
    initialComposition?: ToolComposition;
    userId: string;
}
export declare function VisualToolComposer({ onSave, onPreview, onCancel, initialComposition, userId, }: VisualToolComposerProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=visual-tool-composer.d.ts.map