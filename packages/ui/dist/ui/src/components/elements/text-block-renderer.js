import { jsx as _jsx } from "react/jsx-runtime";
import { useStandardElementStyles } from '../../hooks/use-standard-element-styles.js';
export const TextBlockRenderer = ({ element, config, runtimeContext }) => {
    // Use standard style system (flexible input, consistent output)
    const { classes, styles } = useStandardElementStyles(config.style);
    // Process text for dynamic content (element-specific feature)
    const processText = (text) => {
        if (!runtimeContext)
            return text;
        // Replace {{elementId}} with values from form data
        return text.replace(/\{\{([^}]+)\}\}/g, (match, elementId) => {
            const value = runtimeContext.formData[elementId];
            return value !== undefined ? String(value) : match;
        });
    };
    const processedText = processText(config.text);
    return (_jsx("div", { className: `${classes.container} ${classes.spacing} ${classes.element} text-[var(--hive-text-primary)]`, style: styles, children: processedText.includes('<') ? (_jsx("div", { dangerouslySetInnerHTML: { __html: processedText } })) : (_jsx("span", { children: processedText })) }));
};
//# sourceMappingURL=text-block-renderer.js.map