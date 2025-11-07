import { type VisualToolComposerProps } from '../../components/hivelab/visual-tool-composer';
import type { ToolComposition } from '../../lib/hivelab/element-system';
export interface ToolEditPageProps {
    userId: string;
    initialComposition?: ToolComposition;
    onSave: VisualToolComposerProps['onSave'];
    onPreview: VisualToolComposerProps['onPreview'];
    onCancel: VisualToolComposerProps['onCancel'];
}
export declare function ToolEditPage({ userId, initialComposition, onSave, onPreview, onCancel }: ToolEditPageProps): import("react/jsx-runtime").JSX.Element;
export declare namespace ToolEditPage {
    var displayName: string;
}
//# sourceMappingURL=ToolEditPage.d.ts.map