'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { cn } from '../../lib/utils';
import { Users, Globe, Lock, Ghost } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../atoms/select';
import { Button } from '../atoms/button';
const privacyLevels = [
    {
        value: 'public',
        label: 'Public',
        icon: Globe,
        description: 'Everyone can see this',
        color: 'text-green-500'
    },
    {
        value: 'connections',
        label: 'Connections',
        icon: Users,
        description: 'Only your connections can see',
        color: 'text-blue-500'
    },
    {
        value: 'private',
        label: 'Private',
        icon: Lock,
        description: 'Only you can see',
        color: 'text-orange-500'
    },
    {
        value: 'ghost',
        label: 'Ghost',
        icon: Ghost,
        description: 'Hidden from everyone',
        color: 'text-purple-500'
    }
];
export const PrivacyControl = ({ level, onLevelChange, widgetName, compact = false, showDescription = false, className }) => {
    // dropdown state managed by Select; local open state not required
    const currentLevel = privacyLevels.find(l => l.value === level) || privacyLevels[0];
    const Icon = currentLevel.icon;
    if (compact) {
        return (_jsxs(Button, { variant: "ghost", size: "sm", onClick: () => {
                // Cycle through privacy levels
                const currentIndex = privacyLevels.findIndex(l => l.value === level);
                const nextIndex = (currentIndex + 1) % privacyLevels.length;
                onLevelChange(privacyLevels[nextIndex].value);
            }, className: cn('gap-1 h-7 px-2', currentLevel.color, 'hover:bg-white/5', className), children: [_jsx(Icon, { className: "h-3 w-3" }), _jsx("span", { className: "text-xs", children: currentLevel.label })] }));
    }
    return (_jsxs("div", { className: cn('space-y-2', className), children: [widgetName && (_jsxs("label", { className: "text-sm text-gray-400", children: ["Privacy for ", widgetName] })), _jsxs(Select, { value: level, onValueChange: (v) => onLevelChange(v), children: [_jsx(SelectTrigger, { className: cn('w-full bg-black/40 border-gray-800', 'hover:border-gray-600 transition-colors'), children: _jsx(SelectValue, { children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Icon, { className: cn('h-4 w-4', currentLevel.color) }), _jsx("span", { children: currentLevel.label })] }) }) }), _jsx(SelectContent, { className: "bg-black border-gray-800", children: privacyLevels.map((privLevel) => {
                            const LevelIcon = privLevel.icon;
                            return (_jsx(SelectItem, { value: privLevel.value, className: "hover:bg-gray-900", children: _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(LevelIcon, { className: cn('h-4 w-4', privLevel.color) }), _jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-white", children: privLevel.label }), showDescription && (_jsx("span", { className: "text-xs text-gray-500", children: privLevel.description }))] })] }) }, privLevel.value));
                        }) })] }), showDescription && currentLevel && (_jsx("p", { className: "text-xs text-gray-500", children: currentLevel.description }))] }));
};
export const BulkPrivacyControl = ({ widgets, onBulkChange, className }) => {
    const [updates, setUpdates] = useState({});
    const handleWidgetChange = (widgetId, level) => {
        setUpdates(prev => ({
            ...prev,
            [widgetId]: level
        }));
    };
    const handleApplyAll = (level) => {
        const allUpdates = widgets.reduce((acc, widget) => ({
            ...acc,
            [widget.id]: level
        }), {});
        setUpdates(allUpdates);
        onBulkChange(allUpdates);
    };
    const handleSave = () => {
        if (Object.keys(updates).length > 0) {
            onBulkChange(updates);
            setUpdates({});
        }
    };
    return (_jsxs("div", { className: cn('space-y-4', className), children: [_jsxs("div", { className: "flex items-center justify-between p-3 bg-gray-900/50 rounded-lg", children: [_jsx("span", { className: "text-sm text-gray-400", children: "Set all widgets to:" }), _jsx("div", { className: "flex gap-2", children: privacyLevels.map(level => {
                            const Icon = level.icon;
                            return (_jsxs(Button, { size: "sm", variant: "ghost", onClick: () => handleApplyAll(level.value), className: cn('gap-1', level.color, 'hover:bg-white/5'), children: [_jsx(Icon, { className: "h-3 w-3" }), _jsx("span", { className: "text-xs", children: level.label })] }, level.value));
                        }) })] }), _jsx("div", { className: "space-y-3", children: widgets.map(widget => {
                    const currentLevel = updates[widget.id] || widget.level;
                    return (_jsxs("div", { className: "flex items-center justify-between p-3 bg-black/40 rounded-lg border border-gray-800", children: [_jsx("span", { className: "text-sm text-white", children: widget.name }), _jsx(PrivacyControl, { level: currentLevel, onLevelChange: (level) => handleWidgetChange(widget.id, level), compact: true })] }, widget.id));
                }) }), Object.keys(updates).length > 0 && (_jsx(Button, { onClick: handleSave, className: "w-full bg-hive-brand-gold text-black hover:bg-hive-brand-gold/90", children: "Save Privacy Settings" }))] }));
};
//# sourceMappingURL=privacy-control.js.map