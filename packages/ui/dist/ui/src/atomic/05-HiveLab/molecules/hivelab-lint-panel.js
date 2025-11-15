import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, CardContent, Badge } from '../../00-Global/atoms';
export function HiveLabLintPanel({ issues = [] }) {
    return (_jsxs("div", { className: "h-full flex flex-col gap-3", children: [_jsx("div", { className: "text-sm font-semibold text-white", children: "Lint" }), _jsx(Card, { className: "bg-hive-background-tertiary border-hive-border-default flex-1", children: _jsxs(CardContent, { className: "p-3 space-y-2 overflow-auto", children: [issues.length === 0 && (_jsx("div", { className: "text-sm text-hive-text-tertiary", children: "No issues found." })), issues.map((it, i) => (_jsxs("div", { className: "flex items-start gap-2 text-sm", children: [_jsx(Badge, { tone: it.level === 'error' ? 'contrast' : 'muted', variant: "pill", children: it.level }), _jsx("div", { className: "text-hive-text-secondary", children: it.message })] }, i)))] }) })] }));
}
HiveLabLintPanel.displayName = 'HiveLabLintPanel';
//# sourceMappingURL=hivelab-lint-panel.js.map