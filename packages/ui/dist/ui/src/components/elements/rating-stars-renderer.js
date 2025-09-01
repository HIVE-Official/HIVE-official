"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
/**
 * HIVE RatingStars Element Renderer
 * Renders star rating inputs within tools
 * Uses standard style system for consistent output
 */
import { useState } from 'react';
import { Label } from '../../ui/label';
import { Star } from 'lucide-react';
import { useStandardElementStyles, useStandardElementBehavior } from '../../hooks/use-standard-element-styles.js';
export const RatingStarsRenderer = ({ element, config, value = 0, onChange, onStateChange, readOnly = false, runtimeContext }) => {
    const [hoverRating, setHoverRating] = useState(0);
    // Use standard style system (flexible input, consistent output)
    const { classes, styles } = useStandardElementStyles(config.style);
    const behavior = useStandardElementBehavior({
        required: config.required,
        disabled: config.disabled,
        readOnly,
    });
    const maxRating = config.maxRating || 5;
    const starColor = config.color || '#fbbf24';
    // Size mapping (element-specific feature)
    const getSizeClass = (size) => {
        switch (size) {
            case 'sm': return 'w-4 h-4';
            case 'md': return 'w-5 h-5';
            case 'lg': return 'w-6 h-6';
            default: return 'w-5 h-5';
        }
    };
    const handleStarClick = (rating) => {
        if (behavior.isReadOnly || behavior.isDisabled || !onChange)
            return;
        // If clicking the same star, toggle to 0
        const newRating = value === rating ? 0 : rating;
        onChange(newRating);
        if (onStateChange) {
            onStateChange({
                rating: newRating,
                lastUpdated: Date.now(),
            });
        }
    };
    const handleStarHover = (rating) => {
        if (behavior.isReadOnly || behavior.isDisabled)
            return;
        setHoverRating(rating);
    };
    const handleMouseLeave = () => {
        if (behavior.isReadOnly || behavior.isDisabled)
            return;
        setHoverRating(0);
    };
    // Determine which rating to show (hover takes precedence)
    const displayRating = hoverRating || value;
    return (_jsxs("div", { className: `space-y-2 ${classes.container} ${classes.spacing}`, style: styles, children: [_jsxs(Label, { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: [config.label, behavior.isRequired && (_jsx("span", { className: "text-red-500 ml-1", children: "*" }))] }), _jsxs("div", { className: `flex items-center space-x-1 ${classes.element}`, onMouseLeave: handleMouseLeave, ...behavior.ariaAttributes, children: [Array.from({ length: maxRating }, (_, index) => {
                        const starNumber = index + 1;
                        const isFilled = starNumber <= displayRating;
                        const isHalfFilled = config.allowHalf &&
                            starNumber - 0.5 === displayRating;
                        return (_jsx("button", { type: "button", onClick: () => handleStarClick(starNumber), onMouseEnter: () => handleStarHover(starNumber), disabled: behavior.isDisabled, className: `
                transition-all duration-150 
                ${behavior.isReadOnly || behavior.isDisabled ? 'cursor-default' : 'cursor-pointer hover:scale-110'}
                focus:outline-none focus:ring-2 focus:ring-[var(--hive-primary)] focus:ring-offset-1 rounded
                disabled:opacity-50
              `, children: _jsx(Star, { className: `${getSizeClass(config.size)} transition-colors duration-150`, fill: isFilled || isHalfFilled ? starColor : 'transparent', stroke: isFilled || isHalfFilled || hoverRating >= starNumber ? starColor : '#d1d5db', strokeWidth: 1.5 }) }, starNumber));
                    }), _jsx("span", { className: "ml-2 text-sm text-[var(--hive-text-secondary)]", children: value > 0 ? `${value}/${maxRating}` : 'No rating' })] }), config.allowHalf && !behavior.isReadOnly && !behavior.isDisabled && (_jsx("p", { className: "text-xs text-[var(--hive-text-tertiary)]", children: "Click between stars for half ratings" }))] }));
};
//# sourceMappingURL=rating-stars-renderer.js.map