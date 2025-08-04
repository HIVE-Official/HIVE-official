"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useCallback, useMemo } from 'react';
import { HiveCard, HiveButton, HiveBadge } from '../index.js';
import { Play, RotateCcw, Code, Eye, Settings, Copy, Download, Save, Share, Maximize, Minimize, Palette, Sliders, Type, Hash, ToggleLeft, ToggleRight, Upload } from 'lucide-react';
import { cn } from '../../lib/utils.js';
const PropertyEditor = ({ prop, value, onChange }) => {
    const renderInput = () => {
        switch (prop.type) {
            case 'string':
                return (_jsx("input", { type: "text", value: value || '', onChange: (e) => onChange(e.target.value), placeholder: prop.defaultValue || '', className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500" }));
            case 'number':
                return (_jsx("input", { type: "number", value: value || '', onChange: (e) => onChange(parseFloat(e.target.value) || 0), min: prop.validation?.min, max: prop.validation?.max, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500" }));
            case 'boolean':
                return (_jsxs("button", { onClick: () => onChange(!value), className: cn("flex items-center gap-2 px-3 py-2 rounded-md transition-colors", value
                        ? "bg-green-100 text-green-800 border border-green-200"
                        : "bg-gray-100 text-gray-600 border border-gray-200"), children: [value ? _jsx(ToggleRight, { className: "w-4 h-4" }) : _jsx(ToggleLeft, { className: "w-4 h-4" }), value ? 'Enabled' : 'Disabled'] }));
            case 'select':
                return (_jsx("select", { value: value || prop.defaultValue, onChange: (e) => onChange(e.target.value), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500", children: prop.options?.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value))) }));
            case 'color':
                return (_jsxs("div", { className: "flex gap-2", children: [_jsx("input", { type: "color", value: value || '#000000', onChange: (e) => onChange(e.target.value), className: "w-12 h-10 border border-gray-300 rounded-md cursor-pointer" }), _jsx("input", { type: "text", value: value || '#000000', onChange: (e) => onChange(e.target.value), placeholder: "#000000", className: "flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500" })] }));
            case 'array':
                return (_jsxs("div", { className: "space-y-2", children: [_jsx("textarea", { value: Array.isArray(value) ? value.join('\n') : '', onChange: (e) => onChange(e.target.value.split('\n').filter(line => line.trim())), placeholder: "One item per line", rows: 4, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500" }), _jsx("p", { className: "text-xs text-gray-500", children: "Enter one item per line" })] }));
            case 'file':
                return (_jsxs("div", { className: "space-y-2", children: [_jsx("input", { type: "file", onChange: (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    // In a real implementation, you'd upload the file and get a URL
                                    onChange(`uploaded_file_${file.name}`);
                                }
                            }, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500" }), value && (_jsxs("p", { className: "text-sm text-gray-600", children: ["Current: ", value] }))] }));
            default:
                return (_jsx("input", { type: "text", value: JSON.stringify(value) || '', onChange: (e) => {
                        try {
                            onChange(JSON.parse(e.target.value));
                        }
                        catch {
                            onChange(e.target.value);
                        }
                    }, placeholder: "JSON value", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500" }));
        }
    };
    const getIcon = () => {
        switch (prop.type) {
            case 'string': return Type;
            case 'number': return Hash;
            case 'boolean': return value ? ToggleRight : ToggleLeft;
            case 'select': return Settings;
            case 'color': return Palette;
            case 'file': return Upload;
            default: return Sliders;
        }
    };
    const Icon = getIcon();
    return (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("label", { className: "flex items-center gap-2 text-sm font-medium text-gray-700", children: [_jsx(Icon, { className: "w-4 h-4 text-gray-400" }), prop.label, prop.required && _jsx("span", { className: "text-red-500", children: "*" })] }), prop.type !== 'boolean' && (_jsx(HiveButton, { size: "sm", variant: "ghost", onClick: () => onChange(prop.defaultValue), className: "text-xs", children: "Reset" }))] }), renderInput(), prop.description && (_jsx("p", { className: "text-xs text-gray-500", children: prop.description }))] }));
};
const CodeViewer = ({ element, props }) => {
    const generatedCode = useMemo(() => {
        const propsString = Object.entries(props)
            .filter(([_, value]) => value !== undefined && value !== '')
            .map(([key, value]) => {
            if (typeof value === 'string') {
                return `  ${key}="${value}"`;
            }
            else if (typeof value === 'boolean') {
                return value ? `  ${key}` : '';
            }
            else {
                return `  ${key}={${JSON.stringify(value)}}`;
            }
        })
            .filter(Boolean)
            .join('\n');
        return `<${element.name}${propsString ? '\n' + propsString + '\n' : ''}/>`;
    }, [element, props]);
    const handleCopy = () => {
        navigator.clipboard.writeText(generatedCode);
        // Show toast notification in real implementation
        alert('Code copied to clipboard!');
    };
    return (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "text-sm font-medium text-gray-900", children: "Generated Code" }), _jsxs(HiveButton, { size: "sm", variant: "outline", onClick: handleCopy, children: [_jsx(Copy, { className: "w-3 h-3 mr-1" }), "Copy"] })] }), _jsx("div", { className: "relative", children: _jsx("pre", { className: "bg-gray-900 text-gray-100 p-4 rounded-lg text-sm overflow-x-auto", children: _jsx("code", { children: generatedCode }) }) })] }));
};
export function InteractivePlayground({ element, onSave, onClose, className }) {
    const [currentProps, setCurrentProps] = useState(element.defaultProps);
    const [activeTab, setActiveTab] = useState('properties');
    const [isMaximized, setIsMaximized] = useState(false);
    const [configName, setConfigName] = useState(`${element.name} Configuration`);
    const [configDescription, setConfigDescription] = useState('');
    const updateProp = useCallback((propName, value) => {
        setCurrentProps(prev => ({
            ...prev,
            [propName]: value
        }));
    }, []);
    const resetProps = useCallback(() => {
        setCurrentProps(element.defaultProps);
    }, [element.defaultProps]);
    const handleSave = useCallback(() => {
        const configuration = {
            elementId: element.id,
            props: currentProps,
            metadata: {
                name: configName,
                description: configDescription,
                tags: element.tags
            }
        };
        onSave?.(configuration);
    }, [element.id, element.tags, currentProps, configName, configDescription, onSave]);
    const handleExportCode = useCallback(() => {
        const code = `<${element.name} ${Object.entries(currentProps)
            .filter(([_, value]) => value !== undefined && value !== '')
            .map(([key, value]) => {
            if (typeof value === 'string') {
                return `${key}="${value}"`;
            }
            else if (typeof value === 'boolean') {
                return value ? key : '';
            }
            else {
                return `${key}={${JSON.stringify(value)}}`;
            }
        })
            .filter(Boolean)
            .join(' ')} />`;
        // In a real implementation, this would trigger a download
        navigator.clipboard.writeText(code);
        alert('Code copied to clipboard!');
    }, [element.name, currentProps]);
    const PreviewComponent = element.previewComponent;
    return (_jsxs("div", { className: cn("bg-white border border-gray-200 rounded-lg shadow-lg", isMaximized ? "fixed inset-4 z-50" : "max-w-6xl mx-auto", className), children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-gray-200", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-gradient-to-br from-amber-400 to-amber-600 rounded-lg flex items-center justify-center", children: _jsx(element.icon, { className: "w-5 h-5 text-white" }) }), _jsxs("div", { children: [_jsx("h2", { className: "text-lg font-semibold text-gray-900", children: element.name }), _jsx("p", { className: "text-sm text-gray-600", children: "Interactive Playground" })] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiveButton, { size: "sm", variant: "outline", onClick: () => setIsMaximized(!isMaximized), children: isMaximized ? _jsx(Minimize, { className: "w-4 h-4" }) : _jsx(Maximize, { className: "w-4 h-4" }) }), _jsxs(HiveButton, { size: "sm", variant: "outline", onClick: handleExportCode, children: [_jsx(Code, { className: "w-4 h-4 mr-1" }), "Export"] }), onSave && (_jsxs(HiveButton, { size: "sm", onClick: handleSave, children: [_jsx(Save, { className: "w-4 h-4 mr-1" }), "Save Config"] })), onClose && (_jsx(HiveButton, { size: "sm", variant: "outline", onClick: onClose, children: "\u2715" }))] })] }), _jsxs("div", { className: "flex h-[600px]", children: [_jsxs("div", { className: "w-80 border-r border-gray-200 flex flex-col", children: [_jsx("div", { className: "flex border-b border-gray-200", children: [
                                    { id: 'properties', label: 'Properties', icon: Settings },
                                    { id: 'code', label: 'Code', icon: Code },
                                    { id: 'examples', label: 'Examples', icon: Eye }
                                ].map((tab) => {
                                    const Icon = tab.icon;
                                    return (_jsxs("button", { onClick: () => setActiveTab(tab.id), className: cn("flex-1 flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium transition-colors", activeTab === tab.id
                                            ? "bg-amber-50 text-amber-700 border-b-2 border-amber-500"
                                            : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"), children: [_jsx(Icon, { className: "w-4 h-4" }), tab.label] }, tab.id));
                                }) }), _jsxs("div", { className: "flex-1 overflow-y-auto p-4", children: [activeTab === 'properties' && (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "font-medium text-gray-900", children: "Element Properties" }), _jsxs(HiveButton, { size: "sm", variant: "outline", onClick: resetProps, children: [_jsx(RotateCcw, { className: "w-3 h-3 mr-1" }), "Reset"] })] }), _jsx("div", { className: "space-y-4", children: element.props.map((prop) => (_jsx(PropertyEditor, { prop: prop, value: currentProps[prop.name], onChange: (value) => updateProp(prop.name, value) }, prop.name))) }), onSave && (_jsxs("div", { className: "pt-4 border-t border-gray-200 space-y-3", children: [_jsx("h4", { className: "font-medium text-gray-900", children: "Save Configuration" }), _jsxs("div", { className: "space-y-2", children: [_jsx("input", { type: "text", value: configName, onChange: (e) => setConfigName(e.target.value), placeholder: "Configuration name", className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500" }), _jsx("textarea", { value: configDescription, onChange: (e) => setConfigDescription(e.target.value), placeholder: "Description (optional)", rows: 2, className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500" })] })] }))] })), activeTab === 'code' && (_jsx(CodeViewer, { element: element, props: currentProps })), activeTab === 'examples' && (_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "font-medium text-gray-900", children: "Usage Examples" }), element.examples && element.examples.length > 0 ? (_jsx("div", { className: "space-y-3", children: element.examples.map((example) => (_jsxs(HiveCard, { className: "p-3", children: [_jsxs("div", { className: "flex items-start justify-between mb-2", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-gray-900 text-sm", children: example.title }), _jsx("p", { className: "text-xs text-gray-600", children: example.description })] }), _jsxs(HiveButton, { size: "sm", variant: "outline", onClick: () => setCurrentProps({ ...element.defaultProps, ...example.props }), children: [_jsx(Play, { className: "w-3 h-3 mr-1" }), "Try"] })] }), example.code && (_jsx("pre", { className: "bg-gray-100 p-2 rounded text-xs overflow-x-auto", children: _jsx("code", { children: example.code }) }))] }, example.id))) })) : (_jsxs("div", { className: "text-center py-8", children: [_jsx(Eye, { className: "w-8 h-8 text-gray-400 mx-auto mb-2" }), _jsx("p", { className: "text-sm text-gray-600", children: "No examples available" })] }))] }))] })] }), _jsxs("div", { className: "flex-1 flex flex-col", children: [_jsxs("div", { className: "flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Eye, { className: "w-4 h-4 text-gray-600" }), _jsx("span", { className: "text-sm font-medium text-gray-900", children: "Live Preview" })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(HiveBadge, { variant: "outline", className: "text-xs", children: ["v", element.version] }), element.isVerified && (_jsx(HiveBadge, { className: "bg-green-100 text-green-800 border-green-200 text-xs", children: "Verified" }))] })] }), _jsx("div", { className: "flex-1 p-8 flex items-center justify-center bg-white", children: _jsx("div", { className: "w-full max-w-md", children: _jsx(PreviewComponent, { ...currentProps }) }) }), _jsx("div", { className: "p-4 border-t border-gray-200 bg-gray-50", children: _jsxs("div", { className: "flex items-center justify-between text-sm text-gray-600", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("span", { children: ["Properties: ", Object.keys(currentProps).length] }), _jsxs("span", { children: ["Modified: ", JSON.stringify(currentProps) !== JSON.stringify(element.defaultProps) ? 'Yes' : 'No'] })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(HiveButton, { size: "sm", variant: "outline", children: [_jsx(Share, { className: "w-3 h-3 mr-1" }), "Share"] }), _jsxs(HiveButton, { size: "sm", variant: "outline", children: [_jsx(Download, { className: "w-3 h-3 mr-1" }), "Export"] })] })] }) })] })] })] }));
}
export default InteractivePlayground;
//# sourceMappingURL=interactive-playground.js.map