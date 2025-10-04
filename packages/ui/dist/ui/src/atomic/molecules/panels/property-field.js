/**
 * Property Field Component
 *
 * Single configuration field in the properties panel.
 * Supports multiple field types: text, number, boolean, select, etc.
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { cn } from '@/lib/utils';
import { Input } from '@/atomic/atoms/input';
import { Label } from '@/atomic/atoms/label';
import { Textarea } from '@/atomic/atoms/textarea';
import { Switch } from '@/atomic/atoms/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/atomic/atoms/select';
import { HelpCircle } from 'lucide-react';
export function PropertyField({ label, type, value, onChange, required = false, helpText: propHelpText, help, placeholder, options = [], min, max, disabled = false, className, }) {
    const id = `field-${label.toLowerCase().replace(/\s+/g, '-')}`;
    const helpText = propHelpText ?? help;
    const renderField = () => {
        switch (type) {
            case 'text':
                return (_jsx(Input, { id: id, type: "text", value: value || '', onChange: (e) => onChange(e.target.value), placeholder: placeholder, disabled: disabled, required: required }));
            case 'number':
                return (_jsx(Input, { id: id, type: "number", value: value ?? '', onChange: (e) => onChange(e.target.valueAsNumber), placeholder: placeholder, min: min, max: max, disabled: disabled, required: required }));
            case 'boolean':
                return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx(Switch, { id: id, checked: value || false, onCheckedChange: onChange, disabled: disabled }), _jsx(Label, { htmlFor: id, className: "text-sm cursor-pointer", children: value ? 'Enabled' : 'Disabled' })] }));
            case 'select':
                return (_jsxs(Select, { value: value, onValueChange: onChange, disabled: disabled, children: [_jsx(SelectTrigger, { id: id, children: _jsx(SelectValue, { placeholder: placeholder || 'Select an option' }) }), _jsx(SelectContent, { children: options.map((option) => (_jsx(SelectItem, { value: option.value, children: option.label }, option.value))) })] }));
            case 'textarea':
                return (_jsx(Textarea, { id: id, value: value || '', onChange: (e) => onChange(e.target.value), placeholder: placeholder, disabled: disabled, required: required, rows: 4 }));
            case 'color':
                return (_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("input", { id: id, type: "color", value: value || '#000000', onChange: (e) => onChange(e.target.value), disabled: disabled, className: "h-9 w-16 rounded border cursor-pointer" }), _jsx(Input, { type: "text", value: value || '', onChange: (e) => onChange(e.target.value), placeholder: "#000000", disabled: disabled, className: "flex-1" })] }));
            case 'date':
                return (_jsx(Input, { id: id, type: "date", value: value || '', onChange: (e) => onChange(e.target.value), disabled: disabled, required: required }));
            default:
                return null;
        }
    };
    return (_jsxs("div", { className: cn('property-field space-y-2', className), children: [type !== 'boolean' && (_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Label, { htmlFor: id, className: "text-sm font-medium", children: [label, required && _jsx("span", { className: "text-destructive ml-1", children: "*" })] }), helpText && (_jsxs("div", { className: "group relative", children: [_jsx(HelpCircle, { className: "h-3.5 w-3.5 text-muted-foreground cursor-help" }), _jsx("div", { className: "absolute left-0 top-6 hidden group-hover:block z-10 w-64 p-2 bg-popover border rounded-md shadow-md text-xs", children: helpText })] }))] })), renderField(), type === 'boolean' && helpText && (_jsx("p", { className: "text-xs text-muted-foreground", children: helpText }))] }));
}
PropertyField.displayName = 'PropertyField';
//# sourceMappingURL=property-field.js.map