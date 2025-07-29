"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback, useMemo } from "react";
import { cn } from "../../../lib/utils";
import { Button } from "../../../index";
import { Input } from "../../../index";
import { Label } from "../../ui/label";
import { Star } from "lucide-react";
// Individual element renderers
const TextBlockRenderer = ({ instance, state, onStateChange }) => {
    const config = instance.config;
    const style = {
        ...state.style,
        backgroundColor: config.style?.backgroundColor,
        color: config.style?.textColor,
        fontSize: config.style?.fontSize,
        fontWeight: config.style?.fontWeight,
        textAlign: config.style?.textAlign,
        padding: config.style?.padding ? `${config.style.padding}px` : undefined,
        margin: config.style?.margin ? `${config.style.margin}px` : undefined,
        borderRadius: config.style?.borderRadius ? `${config.style.borderRadius}px` : undefined,
        border: config.style?.borderWidth
            ? `${config.style.borderWidth}px solid ${config.style.borderColor || 'var(--hive-text-secondary)'}`
            : undefined,
    };
    if (!state.visible)
        return null;
    return (_jsx("div", { style: style, className: cn("text-block-element", config.style?.textAlign), children: config.text }));
};
const ImageBlockRenderer = ({ instance, state, onStateChange }) => {
    const config = instance.config;
    if (!state.visible)
        return null;
    const style = {
        ...state.style,
        width: config.style?.width === 'full' ? '100%' : config.style?.width,
        height: config.style?.height === 'auto' ? 'auto' : config.style?.height,
        borderRadius: config.style?.borderRadius ? `${config.style.borderRadius}px` : undefined,
    };
    return (_jsxs("div", { className: cn("image-block-element"), children: [_jsx("img", { src: config.src, alt: config.alt, style: style, className: "max-w-full h-auto" }), config.caption && (_jsx("p", { className: "text-sm text-muted-foreground mt-2", children: config.caption }))] }));
};
const DividerRenderer = ({ instance, state, onStateChange }) => {
    const config = instance.config;
    if (!state.visible)
        return null;
    const style = {
        height: `${config.thickness || 1}px`,
        backgroundColor: config.color || 'var(--hive-text-secondary)',
        margin: `${config.margin || 16}px 0`,
        border: 'none',
        borderStyle: config.style || 'solid',
    };
    return _jsx("hr", { style: style, className: "divider-element" });
};
const StackRenderer = ({ instance, state, onStateChange, children }) => {
    const config = instance.config;
    if (!state.visible)
        return null;
    const style = {
        display: 'flex',
        flexDirection: config.direction === 'horizontal' ? 'row' : 'column',
        gap: `${config.spacing || 8}px`,
        alignItems: config.alignment === 'center' ? 'center' :
            config.alignment === 'end' ? 'flex-end' :
                config.alignment === 'stretch' ? 'stretch' : 'flex-start',
        flexWrap: config.wrap ? 'wrap' : 'nowrap',
        ...state.style,
        backgroundColor: config.style?.backgroundColor,
        padding: config.style?.padding ? `${config.style.padding}px` : undefined,
        margin: config.style?.margin ? `${config.style.margin}px` : undefined,
        borderRadius: config.style?.borderRadius ? `${config.style.borderRadius}px` : undefined,
    };
    return (_jsx("div", { style: style, className: "stack-element", children: children }));
};
const ButtonRenderer = ({ instance, state, onStateChange, onAction }) => {
    const config = instance.config;
    if (!state.visible)
        return null;
    const handleClick = () => {
        if (config.onClick) {
            onAction('click', config.onClick);
        }
    };
    return (_jsx(Button, { variant: config.variant || 'primary', size: config.size || 'md', disabled: config.disabled || state.disabled, onClick: handleClick, className: "button-element", children: config.text }));
};
const TextInputRenderer = ({ instance, state, onStateChange }) => {
    const config = instance.config;
    const [value, setValue] = useState(state.value || '');
    if (!state.visible)
        return null;
    const handleChange = (e) => {
        const newValue = e.target.value;
        setValue(newValue);
        onStateChange({ ...state, value: newValue });
    };
    return (_jsxs("div", { className: "text-input-element space-y-2", children: [config.label && _jsx(Label, { children: config.label }), _jsx(Input, { type: config.type || 'text', placeholder: config.placeholder, value: value, onChange: handleChange, required: config.required, minLength: config.minLength, maxLength: config.maxLength, pattern: config.pattern, disabled: state.disabled })] }));
};
const ChoiceSelectRenderer = ({ instance, state, onStateChange }) => {
    const config = instance.config;
    const [selectedValues, setSelectedValues] = useState(state.value ? (Array.isArray(state.value) ? state.value : [state.value]) : []);
    if (!state.visible)
        return null;
    const handleOptionChange = (optionValue) => {
        let newValues;
        if (config.multiple) {
            newValues = selectedValues.includes(optionValue)
                ? selectedValues.filter(v => v !== optionValue)
                : [...selectedValues, optionValue];
        }
        else {
            newValues = [optionValue];
        }
        setSelectedValues(newValues);
        onStateChange({
            ...state,
            value: config.multiple ? newValues : newValues[0]
        });
    };
    return (_jsxs("div", { className: "choice-select-element space-y-3", children: [config.label && _jsx(Label, { children: config.label }), _jsx("div", { className: "space-y-2", children: config.options.map((option) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("input", { type: config.multiple ? 'checkbox' : 'radio', id: `${instance.id}-${option.value}`, name: config.multiple ? undefined : instance.id, value: option.value, checked: selectedValues.includes(option.value), onChange: () => handleOptionChange(option.value), disabled: option.disabled || state.disabled, className: "h-4 w-4" }), _jsx(Label, { htmlFor: `${instance.id}-${option.value}`, className: cn("text-sm", option.disabled && "text-muted-foreground"), children: option.label })] }, option.value))) })] }));
};
const RatingStarsRenderer = ({ instance, state, onStateChange }) => {
    const config = instance.config;
    const [rating, setRating] = useState(state.value || 0);
    const [hoveredRating, setHoveredRating] = useState(0);
    if (!state.visible)
        return null;
    const handleStarClick = (starValue) => {
        setRating(starValue);
        onStateChange({ ...state, value: starValue });
    };
    const renderStars = () => {
        const stars = [];
        const maxRating = config.maxRating || 5;
        const displayRating = hoveredRating || rating;
        for (let i = 1; i <= maxRating; i++) {
            const isFilled = i <= displayRating;
            const isHalf = config.allowHalf && i === Math.ceil(displayRating) && displayRating % 1 !== 0;
            stars.push(_jsx("button", { type: "button", onClick: () => handleStarClick(i), onMouseEnter: () => setHoveredRating(i), onMouseLeave: () => setHoveredRating(0), disabled: state.disabled, className: cn("focus:outline-none transition-colors", state.disabled && "cursor-not-allowed opacity-50"), children: _jsx(Star, { className: cn("h-6 w-6 transition-colors", config.size === 'sm' && "h-4 w-4", config.size === 'lg' && "h-8 w-8", isFilled || isHalf
                        ? "fill-current text-yellow-400"
                        : "text-gray-300") }) }, i));
        }
        return stars;
    };
    return (_jsxs("div", { className: "rating-stars-element space-y-2", children: [config.label && _jsx(Label, { children: config.label }), _jsxs("div", { className: "flex items-center space-x-1", children: [renderStars(), rating > 0 && (_jsxs("span", { className: "ml-2 text-sm text-muted-foreground", children: [rating, "/", config.maxRating || 5] }))] })] }));
};
const CountdownTimerRenderer = ({ instance, state, onStateChange, onAction }) => {
    const config = instance.config;
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 });
    if (!state.visible)
        return null;
    useEffect(() => {
        const calculateTimeLeft = () => {
            const targetDate = new Date(config.targetDate);
            const now = new Date();
            const difference = targetDate.getTime() - now.getTime();
            if (difference <= 0) {
                if (config.onComplete) {
                    onAction('timer_complete', config.onComplete);
                }
                return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
            }
            return {
                days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
                minutes: Math.floor((difference / 1000 / 60) % 60),
                seconds: Math.floor((difference / 1000) % 60),
                total: difference,
            };
        };
        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);
        // Initial calculation
        setTimeLeft(calculateTimeLeft());
        return () => clearInterval(timer);
    }, [config.targetDate, config.onComplete, onAction]);
    const formatTime = () => {
        const format = config.format || 'dhms';
        switch (format) {
            case 'days':
                return `${Math.ceil(timeLeft.total / (1000 * 60 * 60 * 24))} days`;
            case 'hours':
                return `${Math.ceil(timeLeft.total / (1000 * 60 * 60))} hours`;
            case 'minutes':
                return `${Math.ceil(timeLeft.total / (1000 * 60))} minutes`;
            case 'seconds':
                return `${Math.ceil(timeLeft.total / 1000)} seconds`;
            case 'dhms':
            default:
                return `${timeLeft.days}d ${timeLeft.hours}h ${timeLeft.minutes}m ${timeLeft.seconds}s`;
        }
    };
    return (_jsxs("div", { className: "countdown-timer-element space-y-2", children: [config.label && _jsx(Label, { children: config.label }), _jsx("div", { className: "text-2xl font-mono font-bold", children: timeLeft.total > 0 ? formatTime() : "Time's up!" })] }));
};
const ProgressBarRenderer = ({ instance, state, onStateChange }) => {
    const config = instance.config;
    const value = state.value !== undefined ? state.value : config.value || 0;
    const max = config.max || 100;
    const percentage = Math.min(100, Math.max(0, (value / max) * 100));
    if (!state.visible)
        return null;
    return (_jsxs("div", { className: "progress-bar-element space-y-2", style: { height: config.height || 8 }, children: [config.label && _jsx(Label, { children: config.label }), _jsxs("div", { className: "w-full", children: [_jsx("div", { className: "w-full bg-gray-200 rounded-full overflow-hidden", style: { height: `${config.height || 8}px` }, children: _jsx("div", { className: "h-full bg-blue-500 transition-all duration-300", style: { width: `${percentage}%` } }) }), config.showPercentage && (_jsxs("div", { className: "text-sm text-muted-foreground mt-1", children: [Math.round(percentage), "%"] }))] })] }));
};
// Main Runtime Renderer Component
export const ElementRuntimeRenderer = ({ instances, onStateChange, onAction, initialState = {}, className, }) => {
    const [runtimeState, setRuntimeState] = useState(() => {
        // Initialize state for all instances
        const state = {};
        instances.forEach(instance => {
            state[instance.id] = {
                visible: instance.isVisible,
                ...initialState[instance.id],
            };
        });
        return state;
    });
    const handleStateChange = useCallback((instanceId, newState) => {
        setRuntimeState(prev => ({
            ...prev,
            [instanceId]: newState,
        }));
        onStateChange?.(instanceId, newState);
    }, [onStateChange]);
    const handleAction = useCallback((instanceId, action, data) => {
        onAction?.(instanceId, action, data);
    }, [onAction]);
    // Sort instances by order and position for rendering
    const sortedInstances = useMemo(() => {
        return [...instances].sort((a, b) => a.order - b.order);
    }, [instances]);
    const renderElement = (instance) => {
        const state = runtimeState[instance.id];
        if (!state)
            return null;
        const commonProps = {
            instance,
            state,
            onStateChange: (newState) => handleStateChange(instance.id, newState),
        };
        const actionProps = {
            onAction: (action, data) => handleAction(instance.id, action, data),
        };
        // Find child instances for container elements
        const childInstances = instances.filter(child => child.parentId === instance.id)
            .sort((a, b) => a.order - b.order);
        switch (instance.elementId.split('-')[0]) {
            case 'textBlock':
                return _jsx(TextBlockRenderer, { ...commonProps }, instance.id);
            case 'imageBlock':
                return _jsx(ImageBlockRenderer, { ...commonProps }, instance.id);
            case 'divider':
                return _jsx(DividerRenderer, { ...commonProps }, instance.id);
            case 'stack':
                return (_jsx(StackRenderer, { ...commonProps, children: childInstances.map(child => renderElement(child)) }, instance.id));
            case 'button':
                return _jsx(ButtonRenderer, { ...commonProps, ...actionProps }, instance.id);
            case 'textInput':
                return _jsx(TextInputRenderer, { ...commonProps }, instance.id);
            case 'choiceSelect':
                return _jsx(ChoiceSelectRenderer, { ...commonProps }, instance.id);
            case 'ratingStars':
                return _jsx(RatingStarsRenderer, { ...commonProps }, instance.id);
            case 'countdownTimer':
                return _jsx(CountdownTimerRenderer, { ...commonProps, ...actionProps }, instance.id);
            case 'progressBar':
                return _jsx(ProgressBarRenderer, { ...commonProps }, instance.id);
            case 'conditionGate':
                // Condition gates are invisible - they just control other elements
                return null;
            case 'pingTrigger':
                // Ping triggers are invisible - they just trigger actions
                return null;
            default:
                return (_jsxs("div", { className: "bg-red-100 border border-red-300 p-2 rounded", children: ["Unknown element type: ", instance.elementId] }, instance.id));
        }
    };
    // Only render top-level instances (no parentId)
    const topLevelInstances = sortedInstances.filter(instance => !instance.parentId);
    return (_jsx("div", { className: cn("element-runtime-container", className), children: topLevelInstances.map(instance => renderElement(instance)) }));
};
export default ElementRuntimeRenderer;
//# sourceMappingURL=element-runtime-renderer.js.map