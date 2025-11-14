import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Button, Tabs, TabsList, TabsTrigger, TabsContent } from '../../00-Global/atoms/index.js';
import { HiveLabElementPalette } from '../molecules/hivelab-element-palette.js';
import { HiveLabInspectorPanel } from '../molecules/hivelab-inspector-panel.js';
import { HiveLabLintPanel } from '../molecules/hivelab-lint-panel.js';
import { VisualToolComposer } from '../../../components/hivelab/visual-tool-composer.js';
export function HiveLabStudio({ userId, initialComposition, onSave, onPreview, onCancel }) {
    const [selectedName, setSelectedName] = React.useState(undefined);
    const [selectedConfig, setSelectedConfig] = React.useState(undefined);
    const [issues, setIssues] = React.useState([]);
    const handleInsert = (_el) => {
        // Minimal: show a lint reminder when many elements are added (placeholder behavior)
        setIssues((prev) => prev.length === 0 ? [{ level: 'warning', message: 'Consider setting a close time for your tool.' }] : prev);
    };
    return (_jsxs("div", { className: "h-full w-full grid grid-cols-[280px_minmax(0,1fr)_360px] grid-rows-[64px_minmax(0,1fr)]", children: [_jsxs("div", { className: "col-span-3 flex items-center gap-2 px-3 border-b border-hive-border-default bg-hive-background-overlay", children: [_jsx(Button, { variant: "ghost", onClick: onCancel, children: "Back" }), _jsx("div", { className: "text-sm text-hive-text-tertiary flex-1", children: "HiveLab Studio" }), _jsx(Button, { variant: "secondary", onClick: () => onPreview(initialComposition || { id: 'temp', name: 'Untitled', description: '', elements: [], connections: [], layout: 'grid' }), children: "Preview" }), _jsx(Button, { onClick: () => onSave(initialComposition || { id: 'temp', name: 'Untitled', description: '', elements: [], connections: [], layout: 'grid' }), children: "Save" })] }), _jsx("div", { className: "row-start-2 border-r border-hive-border-default p-3 bg-hive-background-secondary overflow-hidden", children: _jsx(HiveLabElementPalette, { onInsert: handleInsert }) }), _jsx("div", { className: "row-start-2 overflow-hidden", children: _jsx(VisualToolComposer, { userId: userId, initialComposition: initialComposition, onSave: onSave, onPreview: onPreview, onCancel: onCancel || (() => { }) }) }), _jsx("div", { className: "row-start-2 border-l border-hive-border-default p-3 bg-hive-background-secondary overflow-hidden", children: _jsxs(Tabs, { defaultValue: "inspector", className: "h-full flex flex-col", children: [_jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "inspector", children: "Inspector" }), _jsx(TabsTrigger, { value: "lint", children: "Lint" })] }), _jsxs("div", { className: "mt-3 flex-1 min-h-0", children: [_jsx(TabsContent, { value: "inspector", className: "h-full", children: _jsx(HiveLabInspectorPanel, { selectedName: selectedName, config: selectedConfig, onChange: setSelectedConfig }) }), _jsx(TabsContent, { value: "lint", className: "h-full", children: _jsx(HiveLabLintPanel, { issues: issues }) })] })] }) })] }));
}
HiveLabStudio.displayName = 'HiveLabStudio';
//# sourceMappingURL=hivelab-studio.js.map