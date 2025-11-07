import { jsx as _jsx } from "react/jsx-runtime";
import { VisualToolComposer } from '../../components/hivelab/visual-tool-composer.js';
export function ToolEditPage({ userId, initialComposition, onSave, onPreview, onCancel }) {
    return (_jsx(VisualToolComposer, { userId: userId, initialComposition: initialComposition, onSave: onSave, onPreview: onPreview, onCancel: onCancel }));
}
ToolEditPage.displayName = 'ToolEditPage';
//# sourceMappingURL=ToolEditPage.js.map