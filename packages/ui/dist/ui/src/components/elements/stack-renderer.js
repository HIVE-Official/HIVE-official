import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { useStandardElementStyles } from '../../hooks/use-standard-element-styles';
export const StackRenderer = ({ element, config, tool, renderElement }) => {
    // Use standard style system (flexible input, consistent output)
    const { classes, styles } = useStandardElementStyles(config.style);
    // Get child elements
    const childElements = tool?.elements
        .filter(el => el.parentId === element.id)
        .sort((a, b) => a.order - b.order) || [];
    // Flexbox direction
    const flexDirection = config.direction === 'horizontal' ? 'row' : 'column';
    // Alignment mapping
    const getAlignItems = (alignment) => {
        switch (alignment) {
            case 'center': return 'center';
            case 'end': return 'flex-end';
            case 'stretch': return 'stretch';
            default: return 'flex-start';
        }
    };
    const getJustifyContent = (alignment) => {
        switch (alignment) {
            case 'center': return 'center';
            case 'end': return 'flex-end';
            default: return 'flex-start';
        }
    };
    // Element-specific flex styles (layout behavior)
    const flexStyles = {
        ...styles,
        display: 'flex',
        flexDirection,
        alignItems: getAlignItems(config.alignment),
        justifyContent: getJustifyContent(config.alignment),
        flexWrap: config.wrap ? 'wrap' : 'nowrap',
        gap: `${config.spacing || 8}px`,
    };
    return (_jsxs("div", { className: `${classes.container} ${classes.spacing} ${classes.element}`, style: flexStyles, children: [childElements.map(childElement => renderElement ? renderElement(childElement) : (_jsxs("div", { className: "text-xs text-[var(--hive-text-tertiary)]", children: ["Nested element: ", childElement.elementId] }, childElement.id))), childElements.length === 0 && (_jsx("div", { className: "text-xs text-[var(--hive-text-tertiary)] p-4 border-2 border-dashed border-[var(--hive-border)] rounded-lg", children: "Empty stack container" }))] }));
};
//# sourceMappingURL=stack-renderer.js.map