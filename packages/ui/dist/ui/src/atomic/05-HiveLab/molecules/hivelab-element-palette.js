import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Card, CardContent, Input, Label, Button } from '../atoms';
import { initializeElementSystem } from '../../lib/hivelab/element-system';
export function HiveLabElementPalette({ onDragStart, onInsert }) {
    const [query, setQuery] = React.useState('');
    const [elements, setElements] = React.useState([]);
    React.useEffect(() => {
        const registry = initializeElementSystem();
        setElements(registry.getAllElements());
    }, []);
    const filtered = React.useMemo(() => {
        if (!query.trim())
            return elements;
        const q = query.toLowerCase();
        return elements.filter(e => e.name.toLowerCase().includes(q) || e.description.toLowerCase().includes(q));
    }, [query, elements]);
    return (_jsxs("div", { className: "h-full flex flex-col gap-3", children: [_jsxs("div", { children: [_jsx(Label, { htmlFor: "palette-search", className: "text-xs", children: "Search elements" }), _jsx(Input, { id: "palette-search", value: query, onChange: (e) => setQuery(e.target.value), placeholder: "Find elements...", className: "mt-1" })] }), _jsxs("div", { className: "flex-1 overflow-auto space-y-2 pr-1", role: "list", children: [filtered.map((el) => (_jsx(Card, { className: "bg-hive-background-tertiary border-hive-border-default", role: "listitem", children: _jsxs(CardContent, { className: "p-3 flex items-center gap-3", children: [_jsx("div", { className: "w-9 h-9 rounded-lg bg-hive-background-primary border border-hive-border-default flex items-center justify-center text-sm", "aria-hidden": true, children: "\uD83D\uDCE6" }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "text-sm font-medium text-white truncate", children: el.name }), _jsx("div", { className: "text-xs text-hive-text-tertiary truncate", children: el.description })] }), _jsx(Button, { size: "sm", variant: "secondary", draggable: true, onDragStart: () => onDragStart?.(el), onClick: () => onInsert?.(el), "aria-label": `Insert ${el.name}`, children: "Add" })] }) }, el.id))), filtered.length === 0 && (_jsx("div", { className: "text-sm text-hive-text-tertiary p-2", children: "No elements found" }))] })] }));
}
HiveLabElementPalette.displayName = 'HiveLabElementPalette';
//# sourceMappingURL=hivelab-element-palette.js.map