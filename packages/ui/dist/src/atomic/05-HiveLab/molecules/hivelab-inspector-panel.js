import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Card, CardContent, Label, Input, Button } from '../../00-Global/atoms';
export function HiveLabInspectorPanel({ selectedName, config, onChange }) {
    const entries = React.useMemo(() => Object.entries(config || {}), [config]);
    return (_jsxs("div", { className: "h-full flex flex-col gap-3", children: [_jsx("div", { className: "text-sm font-semibold text-white", children: "Inspector" }), !selectedName && (_jsx("div", { className: "text-sm text-hive-text-tertiary", children: "Select an element to edit its properties." })), selectedName && (_jsx(Card, { className: "bg-hive-background-tertiary border-hive-border-default", children: _jsxs(CardContent, { className: "p-3 space-y-3", children: [_jsx("div", { className: "text-sm text-white", children: selectedName }), entries.map(([k, v]) => (_jsxs("div", { className: "space-y-1", children: [_jsx(Label, { className: "text-xs uppercase tracking-wide text-hive-text-tertiary", children: k }), _jsx(Input, { value: String(v), onChange: (e) => onChange?.({ ...(config || {}), [k]: e.target.value }) })] }, k))), entries.length === 0 && (_jsx("div", { className: "text-xs text-hive-text-tertiary", children: "No configurable properties." }))] }) })), _jsx("div", { className: "mt-auto" }), _jsx(Button, { size: "sm", variant: "secondary", children: "Documentation" })] }));
}
HiveLabInspectorPanel.displayName = 'HiveLabInspectorPanel';
//# sourceMappingURL=hivelab-inspector-panel.js.map