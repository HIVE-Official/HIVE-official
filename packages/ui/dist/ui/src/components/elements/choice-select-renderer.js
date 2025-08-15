import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { useStandardElementStyles, useStandardElementBehavior } from '../../hooks/use-standard-element-styles';
export const ChoiceSelectRenderer = ({ element, config, value, onChange, readOnly = false, runtimeContext }) => {
    // Use standard style system (flexible input, consistent output)
    const { classes, styles } = useStandardElementStyles(config.style);
    const behavior = useStandardElementBehavior({
        required: config.required,
        disabled: config.disabled,
        readOnly,
    });
    // Handle single select (dropdown or radio)
    const handleSingleSelect = (newValue) => {
        if (behavior.isReadOnly || !onChange)
            return;
        onChange(newValue);
    };
    // Handle multiple select (checkboxes)
    const handleMultipleSelect = (optionValue, checked) => {
        if (behavior.isReadOnly || !onChange)
            return;
        const currentValues = Array.isArray(value) ? value : [];
        let newValues;
        if (checked) {
            newValues = [...currentValues, optionValue];
        }
        else {
            newValues = currentValues.filter(v => v !== optionValue);
        }
        onChange(newValues);
    };
    // Render multiple choice (checkboxes)
    if (config.multiple) {
        const selectedValues = Array.isArray(value) ? value : [];
        return (_jsxs("div", { className: `space-y-3 ${classes.container} ${classes.spacing}`, style: styles, children: [_jsxs(Label, { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: [config.label, behavior.isRequired && (_jsx("span", { className: "text-red-500 ml-1", children: "*" }))] }), _jsx("div", { className: "space-y-2", children: config.options.map((option) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: `${element.id}-${option.value}`, checked: selectedValues.includes(option.value), onCheckedChange: (checked) => handleMultipleSelect(option.value, checked), disabled: behavior.isDisabled || option.disabled, className: "border-[var(--hive-border)]" }), _jsx(Label, { htmlFor: `${element.id}-${option.value}`, className: `text-sm ${option.disabled ? 'text-[var(--hive-text-tertiary)]' : 'text-[var(--hive-text-primary)]'}`, children: option.label })] }, option.value))) })] }));
    }
    // Render single choice (dropdown for many options, radio for few)
    const useRadio = config.options.length <= 4;
    if (useRadio) {
        return (_jsxs("div", { className: `space-y-3 ${classes.container} ${classes.spacing}`, style: styles, children: [_jsxs(Label, { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: [config.label, behavior.isRequired && (_jsx("span", { className: "text-red-500 ml-1", children: "*" }))] }), _jsx(RadioGroup, { name: element.id, value: typeof value === 'string' ? value : '', onValueChange: handleSingleSelect, disabled: behavior.isDisabled, className: `space-y-2 ${classes.element}`, children: config.options.map((option) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(RadioGroupItem, { value: option.value, id: `${element.id}-${option.value}`, disabled: behavior.isDisabled || option.disabled, className: "border-[var(--hive-border)]" }), _jsx(Label, { htmlFor: `${element.id}-${option.value}`, className: `text-sm ${option.disabled ? 'text-[var(--hive-text-tertiary)]' : 'text-[var(--hive-text-primary)]'}`, children: option.label })] }, option.value))) })] }));
    }
    // Render dropdown select
    return (_jsxs("div", { className: `space-y-2 ${classes.container} ${classes.spacing}`, style: styles, children: [_jsxs(Label, { htmlFor: element.id, className: "text-sm font-medium text-[var(--hive-text-primary)]", children: [config.label, behavior.isRequired && (_jsx("span", { className: "text-red-500 ml-1", children: "*" }))] }), _jsxs(Select, { value: typeof value === 'string' ? value : '', onValueChange: handleSingleSelect, disabled: behavior.isDisabled, children: [_jsx(SelectTrigger, { className: `w-full border-[var(--hive-border)] focus:ring-[var(--hive-primary)] ${classes.element}`, children: _jsx(SelectValue, { placeholder: config.placeholder || 'Select an option' }) }), _jsx(SelectContent, { children: config.options.map((option) => (_jsx(SelectItem, { value: option.value, disabled: option.disabled, children: option.label }, option.value))) })] })] }));
};
//# sourceMappingURL=choice-select-renderer.js.map