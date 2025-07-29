"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Grid, Plus, X, Palette, Layout, Sliders, Save, RotateCcw, Monitor, Smartphone, Tablet, ChevronDown, ChevronRight, Lock, Unlock } from 'lucide-react';
import { Button } from '../hive-button';
import { Badge } from '../ui/badge';
import { Switch } from '../hive-switch';
import { Slider } from '../hive-slider';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
// Animation variants
const containerVariants = {
    hidden: { opacity: 0, x: 300 },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15,
            staggerChildren: 0.1
        }
    },
    exit: {
        opacity: 0,
        x: 300,
        transition: {
            duration: 0.2
        }
    }
};
const sectionVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};
export function DashboardCustomization({ currentLayout, availableWidgets, preferences, onLayoutUpdate, onPreferencesUpdate, onSaveLayout, onResetLayout, isEditMode, onToggleEditMode, className = "" }) {
    const [activeTab, setActiveTab] = useState('layout');
    const [isExpanded, setIsExpanded] = useState(false);
    const [previewDevice, setPreviewDevice] = useState('desktop');
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
    // Handle widget visibility toggle
    const handleWidgetVisibility = useCallback((widgetId, isVisible) => {
        const updatedWidgets = currentLayout.widgets.map(widget => widget.id === widgetId ? { ...widget, isVisible } : widget);
        const updatedLayout = { ...currentLayout, widgets: updatedWidgets };
        onLayoutUpdate(updatedLayout);
        setHasUnsavedChanges(true);
    }, [currentLayout, onLayoutUpdate]);
    // Handle widget size change
    const handleWidgetSizeChange = useCallback((widgetId, size) => {
        const updatedWidgets = currentLayout.widgets.map(widget => widget.id === widgetId ? { ...widget, size } : widget);
        const updatedLayout = { ...currentLayout, widgets: updatedWidgets };
        onLayoutUpdate(updatedLayout);
        setHasUnsavedChanges(true);
    }, [currentLayout, onLayoutUpdate]);
    // Handle widget lock/unlock
    const handleWidgetLock = useCallback((widgetId, isLocked) => {
        const updatedWidgets = currentLayout.widgets.map(widget => widget.id === widgetId ? { ...widget, isLocked } : widget);
        const updatedLayout = { ...currentLayout, widgets: updatedWidgets };
        onLayoutUpdate(updatedLayout);
        setHasUnsavedChanges(true);
    }, [currentLayout, onLayoutUpdate]);
    // Handle preference updates
    const handlePreferenceUpdate = useCallback((key, value) => {
        const updatedPreferences = { ...preferences, [key]: value };
        onPreferencesUpdate(updatedPreferences);
        setHasUnsavedChanges(true);
    }, [preferences, onPreferencesUpdate]);
    // Save changes
    const handleSave = useCallback(() => {
        onSaveLayout(currentLayout);
        setHasUnsavedChanges(false);
    }, [currentLayout, onSaveLayout]);
    // Reset to defaults
    const handleReset = useCallback(() => {
        onResetLayout();
        setHasUnsavedChanges(false);
    }, [onResetLayout]);
    return (_jsxs(AnimatePresence, { children: [isEditMode && (_jsx(motion.div, { className: `dashboard-customization fixed top-0 right-0 h-full w-96 bg-hive-background-primary border-l border-hive-border-default shadow-2xl z-50 overflow-hidden ${className}`, variants: containerVariants, initial: true })), "\\\"hidden\\\" animate=\\\"visible\\\" exit=\\\"exit\\\" >", _jsx("div", { className: true }), "\\\"flex items-center justify-between p-4 border-b border-hive-border-default\\\">", _jsx("div", { className: true }), "\\\"flex items-center space-x-2\\\">", _jsx(Settings, { className: true }), "\\\"h-5 w-5 text-hive-gold\\\" />", _jsx("h2", { className: true }), "\\\"text-lg font-semibold text-white\\\">Customize Dashboard"] }));
    div >
        _jsx("div", { className: true });
    "flex items-center space-x-2\">;
    {
        hasUnsavedChanges && (_jsx(Badge, { variant: true }));
        "secondary\" className=\"text-xs bg-orange-500 text-white\">;
        Unsaved;
        Badge >
        ;
    }
    _jsx(Button, { variant: true });
    "ghost\";
    size = ;
    "sm\";
    onClick = {}();
    onToggleEditMode(false);
}
    >
        _jsx(X, { className: true });
"h-4 w-4\" />;
Button >
;
div >
;
div >
    { /* Tabs */}
    < div;
className = ;
"p-4 border-b border-hive-border-default\">
    < Tabs;
value = { activeTab };
onValueChange = {}(value);
setActiveTab(value);
 >
    _jsx(TabsList, { className: true });
"grid w-full grid-cols-4 bg-hive-background-overlay\">
    < TabsTrigger;
value = ;
"layout\" className=\"text-xs\">
    < Layout;
className = ;
"h-3 w-3 mr-1\" />;
Layout;
TabsTrigger >
    _jsx(TabsTrigger, { value: true });
"widgets\" className=\"text-xs\">
    < Grid;
className = ;
"h-3 w-3 mr-1\" />;
Widgets;
TabsTrigger >
    _jsx(TabsTrigger, { value: true });
"appearance\" className=\"text-xs\">
    < Palette;
className = ;
"h-3 w-3 mr-1\" />;
Style;
TabsTrigger >
    _jsx(TabsTrigger, { value: true });
"preferences\" className=\"text-xs\">
    < Sliders;
className = ;
"h-3 w-3 mr-1\" />;
Settings;
TabsTrigger >
;
TabsList >
;
Tabs >
;
div >
    { /* Content */}
    < div;
className = ;
"flex-1 overflow-y-auto custom-scrollbar\">
    < div;
className = ;
"p-4 space-y-6\">;
{ /* Layout Tab */ }
{
    activeTab === 'layout' && (_jsx(LayoutCustomization, { layout: currentLayout, previewDevice: previewDevice, onPreviewDeviceChange: setPreviewDevice, onLayoutUpdate: onLayoutUpdate, onReset: handleReset }));
}
{ /* Widgets Tab */ }
{
    activeTab === 'widgets' && (_jsx(WidgetCustomization, { widgets: currentLayout.widgets, availableWidgets: availableWidgets, onVisibilityChange: handleWidgetVisibility, onSizeChange: handleWidgetSizeChange, onLockChange: handleWidgetLock }));
}
{ /* Appearance Tab */ }
{
    activeTab === 'appearance' && (_jsx(AppearanceCustomization, { preferences: preferences, onPreferenceUpdate: handlePreferenceUpdate }));
}
{ /* Preferences Tab */ }
{
    activeTab === 'preferences' && (_jsx(PreferencesCustomization, { preferences: preferences, onPreferenceUpdate: handlePreferenceUpdate }));
}
div >
;
div >
    { /* Footer Actions */}
    < div;
className = ;
"p-4 border-t border-hive-border-default bg-hive-background-overlay\">
    < div;
className = ;
"flex items-center justify-between space-x-2\">
    < Button;
variant = ;
"outline\";
size = ;
"sm\";
onClick = { handleReset };
className = ;
"flex-1\"
    >
        _jsx(RotateCcw, { className: true });
"h-3 w-3 mr-1\" />;
Reset;
Button >
    _jsx(Button, { size: true });
"sm\";
onClick = { handleSave };
disabled = {};
hasUnsavedChanges;
className = ;
"flex-1 bg-hive-gold text-hive-obsidian hover:bg-hive-champagne\"
    >
        _jsx(Save, { className: true });
"h-3 w-3 mr-1\" />;
Save;
Changes;
Button >
;
div >
;
div >
;
motion.div >
;
AnimatePresence >
;
;
function LayoutCustomization({ layout, previewDevice, onPreviewDeviceChange, onLayoutUpdate, onReset }) {
    return (_jsx(motion.div, { variants: sectionVariants, className: true }));
    "space-y-4\">
        < div >
        _jsx("h3", { className: true });
    "text-sm font-medium text-white mb-3\">Preview Device</h3>
        < div;
    className = ;
    "flex space-x-2\">;
    {
        [
            { key: 'desktop', icon: Monitor, label: 'Desktop' },
            { key: 'tablet', icon: Tablet, label: 'Tablet' },
            { key: 'mobile', icon: Smartphone, label: 'Mobile' }
        ].map(({ key, icon: Icon, label }) => (_jsx(Button, { variant: previewDevice === key ?  :  }, key)), "default\" : \"outline\"}, size = , "sm\", onClick = {}(), onPreviewDeviceChange(key));
    }
    className = ;
    "flex-1\"
        >
            _jsx(Icon, { className: true });
    "h-3 w-3 mr-1\" />;
    {
        label;
    }
    Button >
    ;
}
div >
;
div >
    (_jsxs("div", { children: [_jsx("h3", { className: true }), "\\\"text-sm font-medium text-white mb-3\\\">Grid Layout"] })
        ,
            _jsx("div", { className: true }));
"space-y-3\">
    < div;
className = ;
"flex items-center justify-between\">
    < span;
className = ;
"text-sm text-hive-text-mutedLight\">Columns</span>
    < div;
className = ;
"flex space-x-1\">;
{
    [12, 16, 24].map((cols) => (_jsx(Button, { variant: layout.gridColumns === cols ?  :  }, cols)), "default\" : \"outline\"}, size = , "sm\", onClick = {}(), onLayoutUpdate({ ...layout, gridColumns: cols }));
}
className = ;
"w-8 h-8 p-0 text-xs\"
    >
        { cols };
Button >
;
div >
;
div >
    _jsx("div", { className: true });
"flex items-center justify-between\">
    < span;
className = ;
"text-sm text-hive-text-mutedLight\">Theme</span>
    < select;
value = { layout, : .theme };
onChange = {}(e);
onLayoutUpdate({ ...layout, theme: e.target.value });
className = ;
"bg-hive-background-overlay border border-hive-border-default rounded px-2 py-1 text-sm text-white\"
    >
        _jsx("option", { value: true });
"default\">Default</option>
    < option;
value = ;
"compact\">Compact</option>
    < option;
value = ;
"spacious\">Spacious</option>;
select >
;
div >
;
div >
;
div >
    (_jsxs("div", { children: [_jsx("h3", { className: true }), "\\\"text-sm font-medium text-white mb-3\\\">Layout Presets"] })
        ,
            _jsx("div", { className: true }));
"grid grid-cols-2 gap-2\">;
{
    [
        { name: 'Academic', description: 'Focus on studies' },
        { name: 'Social', description: 'Community first' },
        { name: 'Analytics', description: 'Data driven' },
        { name: 'Minimal', description: 'Clean & simple' }
    ].map((preset) => (_jsx(Button, { variant: true }, preset.name)), "outline\", size = , "sm\", className = , "h-auto p-3 flex flex-col items-start\", onClick = {}(), console.log('Apply preset:', preset.name));
}
    >
        _jsx("span", { className: true });
"font-medium text-xs\">{preset.name}</span>
    < span;
className = ;
"text-xs text-hive-text-mutedLight\">{preset.description}</span>;
Button >
;
div >
;
div >
;
motion.div >
;
;
function WidgetCustomization({ widgets, availableWidgets, onVisibilityChange, onSizeChange, onLockChange }) {
    const [expandedWidget, setExpandedWidget] = useState(null);
    return (_jsx(motion.div, { variants: sectionVariants, className: true }));
    "space-y-4\">
        < div >
        _jsx("h3", { className: true });
    "text-sm font-medium text-white mb-3\">Active Widgets</h3>
        < div;
    className = ;
    "space-y-2\">;
    {
        widgets.map((widget) => (_jsx("div", { className: true }, widget.id)), "p-3 rounded-lg bg-hive-background-overlay border border-hive-border-default\"
            >
                _jsx("div", { className: true }), "flex items-center justify-between mb-2\">
            < div, className = , "flex items-center space-x-2\">
            < Button, variant = , "ghost\", size = , "sm\", onClick = {}(), setExpandedWidget(expandedWidget === widget.id ? null : widget.id));
    }
    className = ;
    "h-6 w-6 p-0\"
        >
            { expandedWidget } === widget.id ? (_jsx(ChevronDown, { className: true })) : ;
    "h-3 w-3\" />;
    (_jsx(ChevronRight, { className: true }));
    "h-3 w-3\" />;
}
Button >
    _jsx("span", { className: true });
"text-sm font-medium text-white\">{widget.title}</span>;
div >
    _jsx("div", { className: true });
"flex items-center space-x-1\">
    < Button;
variant = ;
"ghost\";
size = ;
"sm\";
onClick = {}();
onLockChange(widget.id, !widget.isLocked);
className = ;
"h-6 w-6 p-0\"
    >
        { widget, : .isLocked ? (_jsx(Lock, { className: true })) : , "h-3 w-3 text-orange-400\" />:  }(_jsx(Unlock, { className: true }), "h-3 w-3\" />);
Button >
    _jsx(Switch, { checked: widget.isVisible, onCheckedChange: (checked) => onVisibilityChange(widget.id, checked) });
div >
;
div >
    (_jsxs(AnimatePresence, { children: [expandedWidget === widget.id && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: 'auto' }, exit: { opacity: 0, height: 0 }, className: true })), "\\\"space-y-3 pt-2 border-t border-hive-border-default\\\" >", _jsx("p", { className: true }), "\\\"text-xs text-hive-text-mutedLight\\\">", widget.description] })
        ,
            _jsx("div", { className: true }));
"flex items-center justify-between\">
    < span;
className = ;
"text-xs text-hive-text-mutedLight\">Size</span>
    < div;
className = ;
"flex space-x-1\">;
{
    ['small', 'medium', 'large', 'xl'].map((size) => (_jsx(Button, { variant: widget.size === size ?  :  }, size)), "default\" : \"outline\"}, size = , "sm\", onClick = {}(), onSizeChange(widget.id, size));
}
className = ;
"text-xs px-2 py-1 h-6 capitalize\"
    >
        { size, : .charAt(0).toUpperCase() };
Button >
;
div >
;
div >
;
motion.div >
;
AnimatePresence >
;
div >
;
div >
;
div >
    (_jsxs("div", { children: [_jsx("h3", { className: true }), "\\\"text-sm font-medium text-white mb-3\\\">Available Widgets"] })
        ,
            _jsx("div", { className: true }));
"space-y-2\">;
{
    availableWidgets
        .filter(available => !widgets.find(w => w.id === available.id))
        .map((widget) => (_jsx("div", { className: true }, widget.id)), "p-3 rounded-lg bg-hive-background-overlay border border-hive-border-default opacity-50\"
        >
            _jsx("div", { className: true }), "flex items-center justify-between\">
        < div >
        _jsx("span", { className: true }), "text-sm font-medium text-white\">{widget.title}</span>
        < p, className = , "text-xs text-hive-text-mutedLight\">{widget.description}</p>, div >
        _jsx(Button, { size: true }), "sm\", onClick = {}(), console.log('Add widget:', widget.id));
}
className = ;
"bg-hive-gold text-hive-obsidian\"
    >
        _jsx(Plus, { className: true });
"h-3 w-3 mr-1\" />;
Add;
Button >
;
div >
;
div >
;
div >
;
div >
;
motion.div >
;
;
// Appearance Customization Component
function AppearanceCustomization({ preferences, onPreferenceUpdate }) {
    return (_jsx(motion.div, { variants: sectionVariants, className: true }));
    "space-y-4\">
        < div >
        _jsx("h3", { className: true });
    "text-sm font-medium text-white mb-3\">Color Scheme</h3>
        < div;
    className = ;
    "grid grid-cols-3 gap-2\">;
    {
        [
            { key: 'default', name: 'Default', color: 'bg-hive-gold' },
            { key: 'blue', name: 'Ocean', color: 'bg-blue-500' },
            { key: 'purple', name: 'Galaxy', color: 'bg-purple-500' },
            { key: 'green', name: 'Forest', color: 'bg-green-500' },
            { key: 'orange', name: 'Sunset', color: 'bg-orange-500' }
        ].map(({ key, name, color }) => (_jsx(Button, { variant: preferences.colorScheme === key ?  :  }, key)), "default\" : \"outline\"}, size = , "sm\", onClick = {}(), onPreferenceUpdate('colorScheme', key));
    }
    className = ;
    "h-auto p-3 flex flex-col items-center\"
        >
            (_jsx("div", { className: `w-6 h-6 rounded-full ${color} mb-1` })
                ,
                    _jsx("span", { className: true }));
    "text-xs\">{name}</span>;
    Button >
    ;
}
div >
;
div >
    (_jsxs("div", { children: [_jsx("h3", { className: true }), "\\\"text-sm font-medium text-white mb-3\\\">Typography"] })
        ,
            _jsx("div", { className: true }));
"space-y-3\">
    < div;
className = ;
"flex items-center justify-between\">
    < span;
className = ;
"text-sm text-hive-text-mutedLight\">Font Size</span>
    < div;
className = ;
"flex space-x-1\">;
{
    ['small', 'medium', 'large'].map((size) => (_jsx(Button, { variant: preferences.fontSize === size ?  :  }, size)), "default\" : \"outline\"}, size = , "sm\", onClick = {}(), onPreferenceUpdate('fontSize', size));
}
className = ;
"text-xs px-3 py-1 h-6 capitalize\"
    >
        { size };
Button >
;
div >
;
div >
;
div >
;
div >
    (_jsxs("div", { children: [_jsx("h3", { className: true }), "\\\"text-sm font-medium text-white mb-3\\\">Display Options"] })
        ,
            _jsx("div", { className: true }));
"space-y-3\">
    < div;
className = ;
"flex items-center justify-between\">
    < div >
    _jsx("span", { className: true });
"text-sm text-white\">Compact Mode</span>
    < p;
className = ;
"text-xs text-hive-text-mutedLight\">Reduce spacing and padding</p>;
div >
    _jsx(Switch, { checked: preferences.compactMode, onCheckedChange: (checked) => onPreferenceUpdate('compactMode', checked) });
div >
    _jsx("div", { className: true });
"flex items-center justify-between\">
    < div >
    _jsx("span", { className: true });
"text-sm text-white\">Show Grid</span>
    < p;
className = ;
"text-xs text-hive-text-mutedLight\">Display layout grid lines</p>;
div >
    _jsx(Switch, { checked: preferences.showGrid, onCheckedChange: (checked) => onPreferenceUpdate('showGrid', checked) });
div >
    _jsx("div", { className: true });
"flex items-center justify-between\">
    < div >
    _jsx("span", { className: true });
"text-sm text-white\">Animations</span>
    < p;
className = ;
"text-xs text-hive-text-mutedLight\">Enable smooth transitions</p>;
div >
    _jsx(Switch, { checked: preferences.animationsEnabled, onCheckedChange: (checked) => onPreferenceUpdate('animationsEnabled', checked) });
div >
;
div >
;
div >
;
motion.div >
;
;
// Preferences Customization Component
function PreferencesCustomization({ preferences, onPreferenceUpdate }) {
    return (_jsx(motion.div, { variants: sectionVariants, className: true }));
    "space-y-4\">
        < div >
        _jsx("h3", { className: true });
    "text-sm font-medium text-white mb-3\">Auto-Save</h3>
        < div;
    className = ;
    "flex items-center justify-between\">
        < div >
        _jsx("span", { className: true });
    "text-sm text-white\">Enable Auto-Save</span>
        < p;
    className = ;
    "text-xs text-hive-text-mutedLight\">Automatically save layout changes</p>;
    div >
        _jsx(Switch, { checked: preferences.autoSave, onCheckedChange: (checked) => onPreferenceUpdate('autoSave', checked) });
    div >
    ;
    div >
        (_jsxs("div", { children: [_jsx("h3", { className: true }), "\\\"text-sm font-medium text-white mb-3\\\">Data Refresh"] })
            ,
                _jsx("div", { className: true }));
    "space-y-3\">
        < div >
        _jsx("div", { className: true });
    "flex items-center justify-between mb-2\">
        < span;
    className = ;
    "text-sm text-white\">Refresh Interval</span>
        < span;
    className = ;
    "text-xs text-hive-text-mutedLight\">{preferences.refreshInterval}s</span>;
    div >
        _jsx(Slider, { value: [preferences.refreshInterval], onValueChange: ([value]) => onPreferenceUpdate('refreshInterval', value), min: 10, max: 300, step: 10, className: true });
    "w-full\"
        /  >
    ;
    div >
    ;
    div >
    ;
    div >
        (_jsxs("div", { children: [_jsx("h3", { className: true }), "\\\"text-sm font-medium text-white mb-3\\\">Layout Behavior"] })
            ,
                _jsx("div", { className: true }));
    "space-y-3\">
        < div;
    className = ;
    "flex items-center justify-between\">
        < div >
        _jsx("span", { className: true });
    "text-sm text-white\">Snap to Grid</span>
        < p;
    className = ;
    "text-xs text-hive-text-mutedLight\">Align widgets to grid when moving</p>;
    div >
        _jsx(Switch, { checked: preferences.snapToGrid, onCheckedChange: (checked) => onPreferenceUpdate('snapToGrid', checked) });
    div >
    ;
    div >
    ;
    div >
        (_jsxs("div", { children: [_jsx("h3", { className: true }), "\\\"text-sm font-medium text-white mb-3\\\">Export/Import"] })
            ,
                _jsx("div", { className: true }));
    "space-y-2\">
        < Button;
    variant = ;
    "outline\";
    size = ;
    "sm\";
    className = ;
    "w-full\";
    onClick = {}();
    console.log('Export layout');
}
    >
        Export;
Layout;
Button >
    _jsx(Button, { variant: true });
"outline\";
size = ;
"sm\";
className = ;
"w-full\";
onClick = {}();
console.log('Import layout');
    >
        Import;
Layout;
Button >
;
div >
;
div >
;
motion.div >
;
;
export default DashboardCustomization;
//# sourceMappingURL=dashboard-customization.js.map