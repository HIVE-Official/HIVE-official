'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import { cn } from '../../lib/utils';
import { Settings, AlertCircle, Eye, EyeOff, Globe, Lock, Database, Key, Link as LinkIcon, FileText, Image as ImageIcon, Calendar, Clock, Hash, Type, ListIcon, CheckSquare } from 'lucide-react';
const FIELD_ICONS = {
    text: Type,
    password: Lock,
    number: Hash,
    email: Globe,
    url: LinkIcon,
    textarea: FileText,
    boolean: CheckSquare,
    select: ListIcon,
    multiselect: ListIcon,
    date: Calendar,
    time: Clock,
    color: ImageIcon,
    file: FileText,
    api_key: Key,
    webhook_url: Database,
};
export const ToolConfigurationPanel = ({ tool, isOpen, onClose, onSave, onActivate, onDeactivate, onReset, onRemove, onTestConfiguration, isSaving = false, className }) => {
    const [values, setValues] = useState(tool.currentValues);
    const [errors, setErrors] = useState({});
    const [showSensitive, setShowSensitive] = useState({});
    const [isDirty, setIsDirty] = useState(false);
    const [testResult, setTestResult] = useState(null);
    const [isTestingConfig, setIsTestingConfig] = useState(false);
    const [activeTab, setActiveTab] = useState('config');
    const fileInputRefs = useRef({});
    const handleValueChange = (fieldId, value) => {
        setValues(prev => ({ ...prev, [fieldId]: value }));
        setIsDirty(true);
        // Clear field-specific errors
        if (errors[fieldId]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[fieldId];
                return newErrors;
            });
        }
        ;
    };
};
const validateField = (field, value) => {
    if (field.required && (!value || (typeof value === 'string' && !value.trim()))) {
        return `${field.name} is required`;
    }
    if (field.validation) {
        const { min, max, pattern, message } = field.validation;
        if (typeof value === 'string' && pattern) {
            const regex = new RegExp(pattern);
            if (!regex.test(value)) {
                return message || `${field.name} format is invalid`;
            }
        }
        if (typeof value === 'number') {
            if (min !== undefined && value < min) {
                return `${field.name} must be at least ${min}`;
            }
            if (max !== undefined && value > max) {
                return `${field.name} must be at most ${max}`;
            }
        }
    }
    return null;
};
const validateForm = () => {
    const newErrors = {};
    tool.fields.forEach(field => {
        const error = validateField(field, values[field.id]);
        if (error) {
            newErrors[field.id] = error;
        }
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
};
const handleSave = async () => {
    if (!validateForm())
        return;
    try {
        await onSave(tool.toolId, values);
        setIsDirty(false);
    }
    catch (error) {
        console.error('Failed to save configuration:', error);
    }
};
const handleTestConfiguration = async () => {
    if (!onTestConfiguration || !validateForm())
        return;
    setIsTestingConfig(true);
    try {
        const result = await onTestConfiguration(tool.toolId, values);
        setTestResult(result);
    }
    catch (error) {
        setTestResult({ success: false, message: 'Test failed with an error' });
    }
    finally {
        setIsTestingConfig(false);
    }
};
const handleReset = async () => {
    if (!onReset)
        return;
    try {
        await onReset(tool.toolId);
        setValues(tool.currentValues);
        setIsDirty(false);
        setErrors({});
    }
    catch (error) {
        console.error('Failed to reset configuration:', error);
    }
};
const renderField = (field) => {
    const FieldIcon = FIELD_ICONS[field.type] || Settings;
    const value = values[field.id] ?? field.defaultValue ?? '';
    const error = errors[field.id];
    const isPassword = field.type === 'password' || field.sensitive;
    const showValue = !isPassword || showSensitive[field.id];
    const commonInputProps = {
        id: field.id,
        className: cn('w-full px-4 py-3 rounded-xl border transition-all duration-200', 'bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)]', 'placeholder:text-[var(--hive-text-muted)] focus:outline-none focus:ring-0', error
            ? 'border-[var(--hive-status-error)]/50 focus:border-[var(--hive-status-error)]'
            : 'border-[var(--hive-border-primary)]/30 focus:border-[var(--hive-brand-primary)]/50'),
    };
    return (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("label", { htmlFor: field.id, className: "flex items-center gap-2 text-sm font-medium text-[var(--hive-text-primary)]", children: [_jsx(FieldIcon, { className: "w-4 h-4" }), _jsx("span", { children: field.name }), field.required && _jsx("span", { className: "text-[var(--hive-status-error)]", children: "*" })] }), isPassword && (_jsx("button", { type: "button", onClick: () => setShowSensitive(prev => ({ ...prev, [field.id]: !prev[field.id] })), className: "p-1 rounded text-[var(--hive-text-muted)] hover:text-[var(--hive-text-primary)] transition-colors duration-200", children: showValue ? _jsx(EyeOff, { className: "w-4 h-4" }) : _jsx(Eye, { className: "w-4 h-4" }) }))] }), field.description && (_jsx("p", { className: "text-xs text-[var(--hive-text-muted)]", children: field.description })), _jsx("div", { className: "relative", children: field.type === 'textarea' ? (_jsx("textarea", { ...commonInputProps, value: value, onChange: (e) => handleValueChange(field.id, e.target.value), placeholder: field.placeholder, rows: 4, className: cn(commonInputProps.className, 'resize-none') })) : field.type === 'boolean' ? (_jsxs("label", { className: "flex items-center gap-3 p-3 rounded-xl border border-[var(--hive-border-primary)]/30 cursor-pointer hover:bg-[var(--hive-brand-primary)]/5 transition-all duration-200", children: [_jsx("input", { type: "checkbox", checked: value, onChange: (e) => handleValueChange(field.id, e.target.checked), className: "w-4 h-4 rounded border-[var(--hive-border-primary)]/30 text-[var(--hive-brand-primary)] focus:ring-[var(--hive-brand-primary)]/20" }), _jsx("span", { className: "text-[var(--hive-text-primary)]", children: field.placeholder || 'Enabled' })] })) : field.type === 'select' ? (_jsxs("select", { ...commonInputProps, value: value, onChange: (e) => handleValueChange(field.id, e.target.value), children: [_jsx("option", { value: "", children: field.placeholder || 'Select an option' }), field.options?.map((option) => (_jsx("option", { value: option.value, children: option.label }, option.value)))] })) : field.type === 'file' ? (_jsxs("div", { children: [_jsx("input", { ref: (el) => { fileInputRefs.current[field.id] = el; }, type: "file", onChange: (e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                    handleValueChange(field.id, file);
                                }
                            }, className: "hidden" }), _jsxs("button", { type: "button", onClick: () => fileInputRefs.current[field.id]?.click(), className: cn(commonInputProps.className, 'flex items-center justify-between cursor-pointer'), children: [_jsx("span", { className: cn(value instanceof File ? 'text-[var(--hive-text-primary)]' : 'text-[var(--hive-text-muted)]'), children: value instanceof File ? value.name : field.placeholder || 'Choose file' }), _jsx(FileText, { className: "w-4 h-4 text-[var(--hive-text-muted)]" })] })] })) : (_jsx("input", { ...commonInputProps, type: isPassword && !showValue ? 'password' : field.type === 'number' ? 'number' : field.type, value: value, onChange: (e) => handleValueChange(field.id, field.type === 'number' ? Number(e.target.value) : e.target.value), placeholder: field.placeholder, min: field.validation?.min, max: field.validation?.max })) }), error && (_jsxs("p", { className: "text-xs text-[var(--hive-status-error)] flex items-center gap-1", children: [_jsx(AlertCircle, { className: "w-3 h-3" }), error] }))] }, field.id));
};
const groupedFields = tool.fields.reduce((groups, field) => {
    const group = field.group || 'General';
    if (!groups[group])
        groups[group] = [];
    groups[group].push(field);
    return groups;
}, {});
if (!isOpen)
    return null;
return (_jsx(AnimatePresence, { children: _jsxs(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "fixed inset-0 z-50 flex items-center justify-center p-4", children: [_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, onClick: onClose, className: "absolute inset-0 bg-[var(--hive-background-primary)]/80 backdrop-blur-xl" }), _jsxs(motion.div, { initial: { opacity: 0, scale: 0.95, y: 20 }, animate: { opacity: 1, scale: 1, y: 0 }, exit: { opacity: 0, scale: 0.95, y: 20 }, className: cn('relative w-full max-w-4xl max-h-[90vh] overflow-hidden', 'bg-gradient-to-br from-[var(--hive-background-secondary)]/95 via-[var(--hive-background-tertiary)]/90 to-[var(--hive-background-interactive)]/95', 'backdrop-blur-xl border border-[var(--hive-border-primary)]/30', 'rounded-3xl shadow-2xl', className), children: [_jsxs("div", { className: "flex items-center justify-between p-6 border-b border-[var(--hive-border-primary)]/20", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-12 h-12 rounded-2xl bg-[var(--hive-brand-primary)]/20 border border-[var(--hive-brand-primary)]/30 flex items-center justify-center text-2xl", children: tool.toolIcon }), _jsxs("div", { children: [_jsxs("h2", { className: "text-xl font-bold text-[var(--hive-text-primary)]", children: ["Configure ", tool.toolName] }), _jsxs("p", { className: "text-sm text-[var(--hive-text-secondary)]", children: ["Version ", tool.version, " \u2022 ", tool.category] })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [tool.documentationUrl && (_jsx("a", { href: tool.documentationUrl, target: "_blank", rel: "noopener noreferrer", className: "w-10 h-10 rounded-xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] transition-colors duration-200", children: _jsx(ExternalLink, { className: "w-5 h-5" }) })), _jsx("button", { onClick: onClose, className: "w-10 h-10 rounded-xl bg-[var(--hive-background-tertiary)]/60 border border-[var(--hive-border-primary)]/30 flex items-center justify-center text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] transition-colors duration-200", children: _jsx(X, { className: "w-5 h-5" }) })] })] }), tool.status === 'error' && (_jsx("div", { className: "px-6 py-3 bg-red-400/10 border-b border-red-400/20", children: _jsxs("div", { className: "flex items-center gap-2 text-red-400", children: [_jsx(AlertCircle, { className: "w-4 h-4" }), _jsx("span", { className: "text-sm font-medium", children: "Tool configuration has errors" })] }) })), _jsx("div", { className: "flex items-center px-6 border-b border-[var(--hive-border-primary)]/20", children: [
                            { id: 'config', label: 'Configuration', icon: Settings },
                            { id: 'advanced', label: 'Advanced', icon: Code },
                            { id: 'permissions', label: 'Permissions', icon: Shield },
                        ].map((tab) => (_jsxs("button", { onClick: () => setActiveTab(tab.id), className: cn('flex items-center gap-2 px-4 py-3 border-b-2 transition-all duration-200', activeTab === tab.id
                                ? 'border-[var(--hive-brand-primary)] text-[var(--hive-brand-primary)]'
                                : 'border-transparent text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]'), children: [_jsx(tab.icon, { className: "w-4 h-4" }), _jsx("span", { className: "font-medium", children: tab.label })] }, tab.id))) }), _jsxs("div", { className: "flex-1 overflow-y-auto p-6", children: [activeTab === 'config' && (_jsxs("div", { className: "space-y-8", children: [Object.entries(groupedFields).map(([groupName, fields]) => (_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: groupName }), _jsx("div", { className: "space-y-6", children: fields.map(renderField) })] }, groupName))), onTestConfiguration && (_jsxs("div", { className: "pt-4 border-t border-[var(--hive-border-primary)]/20", children: [_jsxs("button", { onClick: handleTestConfiguration, disabled: isTestingConfig, className: "flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-400/10 text-blue-400 border border-blue-400/30 hover:bg-blue-400/20 hover:border-blue-400/50 transition-all duration-300 disabled:opacity-50", children: [isTestingConfig ? (_jsx(RefreshCw, { className: "w-4 h-4 animate-spin" })) : (_jsx(Zap, { className: "w-4 h-4" })), _jsx("span", { children: "Test Configuration" })] }), testResult && (_jsxs("div", { className: cn('mt-3 p-3 rounded-xl flex items-center gap-2 text-sm', testResult.success
                                                    ? 'bg-green-400/10 text-green-400 border border-green-400/30'
                                                    : 'bg-red-400/10 text-red-400 border border-red-400/30'), children: [testResult.success ? (_jsx(CheckCircle, { className: "w-4 h-4" })) : (_jsx(AlertCircle, { className: "w-4 h-4" })), _jsx("span", { children: testResult.message })] }))] }))] })), activeTab === 'advanced' && (_jsx("div", { className: "space-y-6", children: _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Advanced Settings" }), tool.webhookUrl && (_jsxs("div", { className: "p-4 rounded-2xl bg-[var(--hive-background-tertiary)]/40 border border-[var(--hive-border-primary)]/20", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)] mb-2", children: "Webhook URL" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("code", { className: "flex-1 p-2 rounded-lg bg-[var(--hive-background-primary)]/50 text-[var(--hive-text-primary)] text-sm font-mono", children: tool.webhookUrl }), _jsx("button", { onClick: () => navigator.clipboard.writeText(tool.webhookUrl || ''), className: "w-8 h-8 rounded-lg bg-[var(--hive-background-tertiary)]/60 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] transition-colors duration-200 flex items-center justify-center", children: _jsx(Copy, { className: "w-4 h-4" }) })] })] })), tool.apiEndpoints && tool.apiEndpoints.length > 0 && (_jsxs("div", { className: "p-4 rounded-2xl bg-[var(--hive-background-tertiary)]/40 border border-[var(--hive-border-primary)]/20", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)] mb-3", children: "API Endpoints" }), _jsx("div", { className: "space-y-2", children: tool.apiEndpoints.map((endpoint, index) => (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: cn('px-2 py-1 rounded text-xs font-mono', endpoint.method === 'GET' && 'bg-green-400/20 text-green-400', endpoint.method === 'POST' && 'bg-blue-400/20 text-blue-400', endpoint.method === 'PUT' && 'bg-orange-400/20 text-orange-400', endpoint.method === 'DELETE' && 'bg-red-400/20 text-red-400'), children: endpoint.method }), _jsx("code", { className: "text-sm text-[var(--hive-text-primary)] font-mono", children: endpoint.url })] }, index))) })] }))] }) })), activeTab === 'permissions' && (_jsx("div", { className: "space-y-6", children: _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Tool Permissions" }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: Object.entries(tool.permissions).map(([permission, enabled]) => (_jsx("div", { className: cn('p-4 rounded-2xl border', enabled
                                                    ? 'bg-green-400/10 border-green-400/30'
                                                    : 'bg-[var(--hive-background-tertiary)]/40 border-[var(--hive-border-primary)]/20'), children: _jsxs("div", { className: "flex items-center gap-2 mb-2", children: [enabled ? (_jsx(CheckCircle, { className: "w-4 h-4 text-green-400" })) : (_jsx(X, { className: "w-4 h-4 text-[var(--hive-text-muted)]" })), _jsx("span", { className: "font-medium text-[var(--hive-text-primary)] capitalize", children: permission.replace(/([A-Z])/g, ' $1').toLowerCase() })] }) }, permission))) })] }) }))] }), _jsxs("div", { className: "flex items-center justify-between p-6 border-t border-[var(--hive-border-primary)]/20", children: [_jsxs("div", { className: "flex items-center gap-3", children: [onReset && (_jsxs("button", { onClick: handleReset, className: "px-4 py-2.5 rounded-2xl border border-[var(--hive-border-primary)]/30 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-all duration-300 flex items-center gap-2", children: [_jsx(RotateCcw, { className: "w-4 h-4" }), _jsx("span", { children: "Reset" })] })), onRemove && (_jsxs("button", { onClick: () => onRemove(tool.toolId), className: "px-4 py-2.5 rounded-2xl border border-red-400/30 text-red-400 hover:bg-red-400/10 hover:border-red-400/50 transition-all duration-300 flex items-center gap-2", children: [_jsx(Trash2, { className: "w-4 h-4" }), _jsx("span", { children: "Remove Tool" })] }))] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx("button", { onClick: onClose, disabled: isSaving, className: "px-6 py-2.5 rounded-2xl border border-[var(--hive-border-primary)]/30 text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)] hover:bg-[var(--hive-background-primary)]/50 transition-all duration-300 disabled:opacity-50", children: "Cancel" }), _jsx(motion.button, { whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, onClick: handleSave, disabled: isSaving || !isDirty, className: cn('px-6 py-2.5 rounded-2xl font-semibold transition-all duration-300 flex items-center gap-2', 'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/40', 'hover:bg-[var(--hive-brand-primary)]/30 hover:border-[var(--hive-brand-primary)]/60', 'disabled:opacity-50 disabled:cursor-not-allowed'), children: isSaving ? (_jsxs(_Fragment, { children: [_jsx(RefreshCw, { className: "w-4 h-4 animate-spin" }), _jsx("span", { children: "Saving..." })] })) : (_jsxs(_Fragment, { children: [_jsx(Save, { className: "w-4 h-4" }), _jsx("span", { children: "Save Configuration" })] })) })] })] })] })] }) }));
;
export default ToolConfigurationPanel;
//# sourceMappingURL=tool-configuration-panel.js.map