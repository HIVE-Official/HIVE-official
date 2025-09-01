import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Label } from '../../ui/label';
import { useStandardElementStyles } from '../../hooks/use-standard-element-styles.js';
export const ProgressBarRenderer = ({ element, config, value, runtimeContext }) => {
    // Use standard style system (flexible input, consistent output)
    const { classes, styles } = useStandardElementStyles(config.style);
    const currentValue = value !== undefined ? value : (config.value || 0);
    const maxValue = config.max || 100;
    const percentage = Math.min(Math.max((currentValue / maxValue) * 100, 0), 100);
    const barColor = config.color || 'var(--hive-primary)';
    const bgColor = config.backgroundColor || 'var(--hive-background-secondary)';
    const barHeight = config.height || 8;
    // Dynamic value from form data (for progress that updates based on other inputs)
    const getDynamicValue = () => {
        if (!runtimeContext?.formData)
            return currentValue;
        // Check if there's a dynamic reference in the element config
        // This would typically be configured in the element's conditional rules
        // For now, we'll just use the current value
        return currentValue;
    };
    const displayValue = getDynamicValue();
    const displayPercentage = Math.min(Math.max((displayValue / maxValue) * 100, 0), 100);
    return (_jsxs("div", { className: `space-y-2 ${classes.container} ${classes.spacing}`, style: styles, children: [config.label && (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: config.label }), config.showPercentage && (_jsxs("span", { className: "text-sm text-[var(--hive-text-secondary)]", children: [Math.round(displayPercentage), "%"] }))] })), _jsxs("div", { className: `relative ${classes.element}`, children: [_jsx("div", { className: "w-full rounded-full overflow-hidden", style: {
                            height: `${barHeight}px`,
                            backgroundColor: bgColor
                        }, children: _jsx("div", { className: "h-full transition-all duration-300 ease-out rounded-full", style: {
                                width: `${displayPercentage}%`,
                                backgroundColor: barColor
                            } }) }), barHeight >= 20 && config.showPercentage && (_jsxs("div", { className: "absolute inset-0 flex items-center justify-center text-xs font-medium", style: { color: displayPercentage > 50 ? 'white' : '#374151' }, children: [Math.round(displayPercentage), "%"] }))] }), !config.showPercentage && (_jsxs("div", { className: "text-sm text-[var(--hive-text-secondary)] text-right", children: [displayValue, " / ", maxValue] }))] }));
};
//# sourceMappingURL=progress-bar-renderer.js.map