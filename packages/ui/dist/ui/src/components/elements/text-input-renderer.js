import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Input } from '../ui/input.js';
import { Label } from '../ui/label.js';
import { useStandardElementStyles, useStandardElementBehavior } from '../../hooks/use-standard-element-styles.js';
export const TextInputRenderer = ({ element, config, value = '', onChange, readOnly = false, runtimeContext }) => {
    // Use standard style system (flexible input, consistent output)
    const { classes, styles } = useStandardElementStyles(config.style);
    const behavior = useStandardElementBehavior({
        required: config.required,
        disabled: config.disabled,
        readOnly,
        validation: {
            pattern: config.pattern,
            minLength: config.minLength,
            maxLength: config.maxLength,
        },
    });
    const handleChange = (e) => {
        if (behavior.isReadOnly || !onChange)
            return;
        onChange(e.target.value);
    };
    return (_jsxs("div", { className: `space-y-2 ${classes.container} ${classes.spacing}`, children: [_jsxs(Label, { htmlFor: element.id, className: "text-sm font-medium text-[var(--hive-text-primary)]", children: [config.label, behavior.isRequired && (_jsx("span", { className: "text-red-500 ml-1", children: "*" }))] }), _jsx(Input, { id: element.id, type: config.type, placeholder: config.placeholder, value: value, onChange: handleChange, disabled: behavior.isDisabled, required: behavior.isRequired, minLength: behavior.validation.minLength, maxLength: behavior.validation.maxLength, pattern: behavior.validation.pattern, style: styles, className: `${classes.element} w-full border rounded-md px-3 py-2 text-sm placeholder:text-[var(--hive-text-tertiary)] focus:outline-none focus:ring-2 focus:ring-[var(--hive-primary)] focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed ${behavior.isReadOnly ? 'bg-[var(--hive-background-secondary)]' : 'bg-white'}`, ...behavior.ariaAttributes }), config.maxLength && config.type === 'text' && (_jsxs("div", { className: "text-xs text-[var(--hive-text-secondary)] text-right", children: [value.length, "/", config.maxLength] }))] }));
};
//# sourceMappingURL=text-input-renderer.js.map