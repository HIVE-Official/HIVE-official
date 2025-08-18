import { jsx as _jsx } from "react/jsx-runtime";
import { useStandardElementStyles } from '../../hooks/use-standard-element-styles';
export const DividerRenderer = ({ element, config }) => {
    // Use standard style system (flexible input, consistent output)
    const { classes, styles } = useStandardElementStyles(config.style);
    // Element-specific styles (divider appearance)
    const dividerStyles = {
        ...styles,
        height: `${config.thickness || 1}px`,
        backgroundColor: config.color || 'var(--hive-border)',
        border: 'none',
        width: '100%',
    };
    // Handle different border styles (element-specific feature)
    if (config.dividerStyle === 'dashed' || config.dividerStyle === 'dotted') {
        dividerStyles.backgroundColor = 'transparent';
        dividerStyles.borderTop = `${config.thickness || 1}px ${config.dividerStyle} ${config.color || 'var(--hive-border)'}`;
        dividerStyles.height = '0';
    }
    return (_jsx("div", { className: `w-full ${classes.container} ${classes.spacing}`, children: _jsx("hr", { style: dividerStyles, className: `w-full ${classes.element}` }) }));
};
//# sourceMappingURL=divider-renderer.js.map