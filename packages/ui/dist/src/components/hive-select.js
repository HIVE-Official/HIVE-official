"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva } from 'class-variance-authority';
import { cn } from '../lib/utils.js';
import { liquidMetal, motionDurations, cascadeTiming } from '../motion/hive-motion-system.js';
import { ChevronDown, Check, Search, X, Plus } from 'lucide-react';
// HIVE Select System - Magnetic Dropdowns with Search and Multi-Select
// Sophisticated select components with magnetic interactions and liquid metal motion
const hiveSelectVariants = cva(
// Base select styles - matte obsidian glass
"relative w-full", {
    variants: {
        variant: {
            default: "",
            premium: "",
            minimal: "",
        },
        size: {
            sm: "",
            default: "",
            lg: "",
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default",
    },
});
const selectTriggerVariants = cva(
// Select trigger styles
"flex items-center justify-between w-full px-4 py-3 bg-[var(--hive-background-primary)]/40 backdrop-blur-xl border rounded-xl transition-all cursor-pointer", {
    variants: {
        variant: {
            default: "border-white/20 hover:border-white/30 focus:border-yellow-500/50",
            premium: "border-yellow-500/30 hover:border-yellow-500/50 focus:border-yellow-500",
            minimal: "border-white/10 hover:border-white/20 focus:border-white/30",
        },
        size: {
            sm: "px-3 py-2 text-sm",
            default: "px-4 py-3",
            lg: "px-5 py-4 text-lg",
        },
        state: {
            default: "",
            open: "border-yellow-500/50",
            disabled: "opacity-50 cursor-not-allowed",
            error: "border-red-500/50",
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default",
        state: "default",
    },
});
// Option animation variants
const optionVariants = {
    rest: {
        x: 0,
        backgroundColor: 'var(--hive-interactive-hover)',
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    },
    hover: {
        x: 4,
        backgroundColor: 'var(--hive-interactive-active)',
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    },
    selected: {
        x: 6,
        backgroundColor: 'color-mix(in_srgb,var(--hive-brand-secondary)_15%,transparent)',
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    }
};
// Dropdown animation
const dropdownVariants = {
    hidden: {
        opacity: 0,
        scale: 0.95,
        y: -10,
        transition: {
            duration: motionDurations.quick,
            ease: liquidMetal.easing,
        }
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: motionDurations.smooth,
            ease: liquidMetal.easing,
            staggerChildren: cascadeTiming.stagger,
        }
    }
};
const optionStaggerVariants = {
    hidden: {
        opacity: 0,
        x: -10,
    },
    visible: {
        opacity: 1,
        x: 0,
        transition: {
            duration: motionDurations.smooth,
            ease: liquidMetal.easing,
        }
    }
};
const HiveSelect = React.forwardRef(({ className, variant, size, options, value, defaultValue, onValueChange, placeholder = "Select an option...", searchable = false, searchPlaceholder = "Search options...", multiple = false, clearable = false, creatable = false, disabled = false, error = false, loading = false, maxHeight = "300px", noOptionsMessage = "No options available", emptySearchMessage = "No options found", renderOption, renderValue, ...props }, ref) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const [internalValue, setInternalValue] = useState(defaultValue || (multiple ? [] : ''));
    const selectRef = useRef(null);
    const searchRef = useRef(null);
    // Use controlled value if provided, otherwise use internal state
    const currentValue = value !== undefined ? value : internalValue;
    // Filter options based on search query
    const filteredOptions = useMemo(() => {
        if (!searchQuery)
            return options;
        const query = searchQuery.toLowerCase();
        return options.filter(option => option.label.toLowerCase().includes(query) ||
            option.description?.toLowerCase().includes(query));
    }, [options, searchQuery]);
    // Group options by group property
    const groupedOptions = useMemo(() => {
        const groups = {};
        filteredOptions.forEach(option => {
            const group = option.group || 'ungrouped';
            if (!groups[group])
                groups[group] = [];
            groups[group].push(option);
        });
        return groups;
    }, [filteredOptions]);
    // Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (selectRef.current && !selectRef.current.contains(event.target)) {
                setIsOpen(false);
                setSearchQuery('');
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);
    // Keyboard navigation
    useEffect(() => {
        if (!isOpen)
            return;
        const handleKeyDown = (e) => {
            switch (e.key) {
                case 'Escape':
                    setIsOpen(false);
                    setSearchQuery('');
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    setHighlightedIndex(prev => Math.min(prev + 1, filteredOptions.length - 1));
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    setHighlightedIndex(prev => Math.max(prev - 1, 0));
                    break;
                case 'Enter':
                    e.preventDefault();
                    if (filteredOptions[highlightedIndex]) {
                        handleOptionSelect(filteredOptions[highlightedIndex]);
                    }
                    break;
            }
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, highlightedIndex, filteredOptions]);
    // Reset highlighted index when filtered options change
    useEffect(() => {
        setHighlightedIndex(0);
    }, [filteredOptions]);
    // Focus search input when opening
    useEffect(() => {
        if (isOpen && searchable && searchRef.current) {
            setTimeout(() => searchRef.current?.focus(), 100);
        }
    }, [isOpen, searchable]);
    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
            if (!isOpen) {
                setSearchQuery('');
            }
        }
    };
    const handleOptionSelect = (option) => {
        if (option.disabled)
            return;
        let newValue;
        if (multiple) {
            const currentArray = Array.isArray(currentValue) ? currentValue : [];
            if (currentArray.includes(option.value)) {
                newValue = currentArray.filter(v => v !== option.value);
            }
            else {
                newValue = [...currentArray, option.value];
            }
        }
        else {
            newValue = option.value;
            setIsOpen(false);
            setSearchQuery('');
        }
        if (value === undefined) {
            setInternalValue(newValue);
        }
        onValueChange?.(newValue);
    };
    const handleClear = () => {
        const newValue = multiple ? [] : '';
        if (value === undefined) {
            setInternalValue(newValue);
        }
        onValueChange?.(newValue);
    };
    const handleCreateOption = () => {
        if (!creatable || !searchQuery)
            return;
        const newOption = {
            value: searchQuery,
            label: searchQuery,
        };
        handleOptionSelect(newOption);
        setSearchQuery('');
    };
    const isSelected = (option) => {
        if (multiple) {
            return Array.isArray(currentValue) && currentValue.includes(option.value);
        }
        return currentValue === option.value;
    };
    const getDisplayValue = () => {
        if (renderValue) {
            return renderValue(currentValue, options);
        }
        if (multiple) {
            const selectedOptions = options.filter(opt => Array.isArray(currentValue) && currentValue.includes(opt.value));
            if (selectedOptions.length === 0)
                return placeholder;
            if (selectedOptions.length === 1)
                return selectedOptions[0].label;
            return `${selectedOptions.length} items selected`;
        }
        const selectedOption = options.find(opt => opt.value === currentValue);
        return selectedOption ? selectedOption.label : placeholder;
    };
    const renderOptionContent = (option) => {
        if (renderOption) {
            return renderOption(option);
        }
        return (_jsxs("div", { className: "flex items-center justify-between w-full", children: [_jsxs("div", { className: "flex items-center space-x-3 flex-1 min-w-0", children: [option.icon && (_jsx("div", { className: "text-[var(--hive-text-primary)]/60 shrink-0", children: option.icon })), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("div", { className: "font-medium text-[var(--hive-text-primary)] truncate", children: option.label }), option.description && (_jsx("div", { className: "text-xs text-[var(--hive-text-primary)]/50 truncate", children: option.description }))] })] }), isSelected(option) && (_jsx(Check, { size: 16, className: "text-yellow-400 shrink-0" }))] }));
    };
    const shouldShowCreateOption = creatable && searchQuery &&
        !filteredOptions.some(opt => opt.label.toLowerCase() === searchQuery.toLowerCase());
    return (_jsxs("div", { ref: selectRef, className: cn(hiveSelectVariants({ variant, size, className })), ...props, children: [_jsxs(motion.div, { className: cn(selectTriggerVariants({
                    variant,
                    size,
                    state: error ? 'error' : isOpen ? 'open' : disabled ? 'disabled' : 'default'
                })), onClick: handleToggle, whileHover: !disabled ? { scale: 1.01 } : {}, whileTap: !disabled ? { scale: 0.99 } : {}, children: [_jsx("span", { className: cn("truncate", currentValue && (multiple ? Array.isArray(currentValue) && currentValue.length > 0 : currentValue !== '')
                            ? "text-[var(--hive-text-primary)]"
                            : "text-[var(--hive-text-primary)]/50"), children: getDisplayValue() }), _jsxs("div", { className: "flex items-center space-x-2 shrink-0 ml-2", children: [clearable && currentValue && (multiple ? Array.isArray(currentValue) && currentValue.length > 0 : currentValue !== '') && (_jsx(motion.button, { className: "text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 p-1", onClick: (e) => {
                                    e.stopPropagation();
                                    handleClear();
                                }, whileHover: { scale: 1.1 }, whileTap: { scale: 0.9 }, children: _jsx(X, { size: 14 }) })), _jsx(motion.div, { animate: { rotate: isOpen ? 180 : 0 }, transition: { duration: motionDurations.quick }, children: _jsx(ChevronDown, { size: 16, className: "text-[var(--hive-text-primary)]/60" }) })] })] }), _jsx(AnimatePresence, { children: isOpen && (_jsxs(motion.div, { className: "absolute top-full left-0 right-0 z-50 mt-2 bg-[var(--hive-background-primary)]/60 backdrop-blur-2xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden", variants: dropdownVariants, initial: "hidden", animate: "visible", exit: "hidden", children: [searchable && (_jsx("div", { className: "p-3 border-b border-white/10", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--hive-text-primary)]/40", size: 16 }), _jsx("input", { ref: searchRef, className: "w-full bg-[var(--hive-background-primary)]/40 border border-white/20 rounded-xl pl-10 pr-4 py-2 text-[var(--hive-text-primary)] placeholder-white/40 focus:outline-none focus:border-yellow-500/50", placeholder: searchPlaceholder, value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }) })), _jsx("div", { className: "max-h-60 overflow-y-auto py-2", style: { maxHeight }, children: loading ? (_jsxs("div", { className: "px-4 py-8 text-center text-[var(--hive-text-primary)]/60", children: [_jsx("div", { className: "animate-spin w-5 h-5 border-2 border-white/20 border-t-yellow-400 rounded-full mx-auto mb-2" }), "Loading options..."] })) : filteredOptions.length === 0 ? (_jsx("div", { className: "px-4 py-8 text-center text-[var(--hive-text-primary)]/60", children: searchQuery ? emptySearchMessage : noOptionsMessage })) : (_jsxs(motion.div, { variants: dropdownVariants, children: [shouldShowCreateOption && (_jsxs(motion.button, { className: "w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-[var(--hive-text-primary)]/10 transition-colors", variants: optionStaggerVariants, onClick: handleCreateOption, children: [_jsx(Plus, { size: 16, className: "text-yellow-400" }), _jsxs("span", { className: "text-[var(--hive-text-primary)]", children: ["Create \"", searchQuery, "\""] })] })), Object.entries(groupedOptions).map(([groupName, groupOptions]) => (_jsxs("div", { children: [groupName !== 'ungrouped' && (_jsx("div", { className: "px-4 py-2 text-xs font-medium text-[var(--hive-text-primary)]/40 uppercase tracking-wider", children: groupName })), groupOptions.map((option, index) => {
                                                const globalIndex = filteredOptions.indexOf(option);
                                                const isHighlighted = globalIndex === highlightedIndex;
                                                const selected = isSelected(option);
                                                return (_jsx(motion.button, { className: cn("w-full px-4 py-3 text-left transition-colors", option.disabled && "opacity-50 cursor-not-allowed"), variants: optionVariants, initial: "rest", animate: selected ? "selected" : isHighlighted ? "hover" : "rest", whileHover: !option.disabled ? "hover" : "rest", onClick: () => handleOptionSelect(option), onMouseEnter: () => setHighlightedIndex(globalIndex), disabled: option.disabled, children: _jsx(motion.div, { variants: optionStaggerVariants, children: renderOptionContent(option) }) }, option.value));
                                            })] }, groupName)))] })) })] })) })] }));
});
HiveSelect.displayName = "HiveSelect";
// Multi-select tag component for displaying selected values
export const HiveSelectTags = ({ options, value, onRemove, maxDisplay = 3 }) => {
    const selectedOptions = options.filter(opt => value.includes(opt.value));
    const displayOptions = selectedOptions.slice(0, maxDisplay);
    const remainingCount = selectedOptions.length - maxDisplay;
    return (_jsxs("div", { className: "flex flex-wrap gap-2", children: [displayOptions.map(option => (_jsxs(motion.div, { className: "flex items-center space-x-2 bg-yellow-500/20 text-yellow-400 px-3 py-1 rounded-full text-sm", initial: { opacity: 0, scale: 0.8 }, animate: { opacity: 1, scale: 1 }, exit: { opacity: 0, scale: 0.8 }, children: [option.icon && _jsx("span", { children: option.icon }), _jsx("span", { children: option.label }), _jsx("button", { onClick: () => onRemove(option.value), className: "text-yellow-400/60 hover:text-yellow-400 transition-colors", children: _jsx(X, { size: 12 }) })] }, option.value))), remainingCount > 0 && (_jsxs("div", { className: "bg-[var(--hive-text-primary)]/10 text-[var(--hive-text-primary)]/60 px-3 py-1 rounded-full text-sm", children: ["+", remainingCount, " more"] }))] }));
};
export { HiveSelect, hiveSelectVariants };
//# sourceMappingURL=hive-select.js.map