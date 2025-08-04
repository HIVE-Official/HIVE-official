import { jsx as _jsx } from "react/jsx-runtime";
import { Button } from '../ui/button.js';
import { useStandardElementStyles, useStandardElementBehavior } from '../../hooks/use-standard-element-styles.js';
export const ButtonRenderer = ({ element, config, onChange, onStateChange, readOnly = false, runtimeContext }) => {
    // Use standard style system (flexible input, consistent output)
    const { classes, styles } = useStandardElementStyles(config.style);
    const behavior = useStandardElementBehavior({
        disabled: config.disabled,
        readOnly,
    });
    const handleClick = () => {
        if (behavior.isReadOnly || behavior.isDisabled)
            return;
        // Handle different click actions (element-specific behavior)
        if (config.onClick) {
            switch (config.onClick.type) {
                case 'submit':
                    if (onChange) {
                        onChange({ type: 'submit', timestamp: Date.now() });
                    }
                    break;
                case 'reset':
                    if (onChange) {
                        onChange({ type: 'reset', timestamp: Date.now() });
                    }
                    break;
                case 'navigate':
                    if (config.onClick.target) {
                        if (config.onClick.target.startsWith('http')) {
                            window.open(config.onClick.target, '_blank');
                        }
                        else {
                            window.location.href = config.onClick.target;
                        }
                    }
                    break;
                case 'custom':
                    if (onChange) {
                        onChange({
                            type: 'custom',
                            data: config.onClick.data,
                            timestamp: Date.now()
                        });
                    }
                    break;
            }
        }
        // Standard analytics tracking
        if (onStateChange) {
            onStateChange({
                clicked: true,
                lastClickedAt: Date.now(),
                clickCount: (runtimeContext?.elementStates.get(element.id)?.clickCount || 0) + 1
            });
        }
    };
    // Map element-specific variants (keep flexibility)
    const getButtonVariant = (variant) => {
        switch (variant) {
            case 'primary': return 'default';
            case 'secondary': return 'secondary';
            case 'outline': return 'outline';
            case 'ghost': return 'ghost';
            default: return 'default';
        }
    };
    const getButtonSize = (size) => {
        switch (size) {
            case 'sm': return 'sm';
            case 'md': return 'default';
            case 'lg': return 'lg';
            default: return 'default';
        }
    };
    return (_jsx("div", { className: `${classes.container} ${classes.spacing}`, children: _jsx(Button, { variant: getButtonVariant(config.variant), size: getButtonSize(config.size), onClick: handleClick, disabled: behavior.isDisabled, style: styles, className: `${classes.element} ${config.variant === 'primary' ? 'bg-[var(--hive-primary)] hover:bg-[var(--hive-primary-dark)] text-white' : ''}`, ...behavior.ariaAttributes, children: config.text }) }));
};
//# sourceMappingURL=button-renderer.js.map