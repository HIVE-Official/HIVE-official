import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiveSlider, Slider, HiveVolumeSlider, HiveBrightnessSlider, HiveProgressSlider, HivePriceRangeSlider, HiveTemperatureSlider } from '../../../components/hive-slider';
import { HiveCard } from '../../../components/hive-card';
import { Volume2, Sun, DollarSign, Thermometer, Settings } from 'lucide-react';
const meta = {
    title: '02-atoms/Form Controls/Slider',
    component: HiveSlider,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**HIVE Slider Component** - A luxury range input with glass morphism and liquid metal motion

Part of the HIVE Atomic Design System with PRD-aligned styling, enhanced accessibility, and premium interactions.

## Features
- **4 Variants**: Default, gold, success, minimal with glass morphism styling
- **4 Sizes**: sm, default, lg, xl with proper touch targets
- **Liquid Motion**: Premium spring animations with customizable motion system
- **Value Display**: Optional value formatting and display
- **Glass Morphism**: Backdrop blur effects with semantic design tokens
- **Touch-Friendly**: 44px+ touch targets for mobile accessibility
- **Keyboard Support**: Arrow keys, Home, End, Page Up/Down navigation
- **Full Accessibility**: WCAG 2.1 AA compliant with proper ARIA support

## Design Token Usage
Uses \`hive-background-*\`, \`hive-border-*\`, \`hive-brand-*\`, \`hive-status-*\` tokens exclusively.

## Pre-built Variants
- **HiveVolumeSlider**: For audio controls (0-100%)
- **HiveBrightnessSlider**: For display settings with gold styling
- **HiveProgressSlider**: For progress indication (disabled state)
- **HivePriceRangeSlider**: For price filtering with currency formatting
- **HiveTemperatureSlider**: For temperature controls with unit display
- **Slider**: Simple version for basic use cases
        `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['default', 'gold', 'success', 'minimal'],
            description: 'Visual style variant'
        },
        size: {
            control: 'select',
            options: ['sm', 'default', 'lg', 'xl'],
            description: 'Slider size variant'
        },
        label: {
            control: 'text',
            description: 'Label text above the slider'
        },
        description: {
            control: 'text',
            description: 'Helper text below the slider'
        },
        showValue: {
            control: 'boolean',
            description: 'Show current value next to label'
        },
        liquidMotion: {
            control: 'boolean',
            description: 'Enable liquid metal motion animations'
        },
        min: {
            control: 'number',
            description: 'Minimum value'
        },
        max: {
            control: 'number',
            description: 'Maximum value'
        },
        step: {
            control: 'number',
            description: 'Step increment'
        },
        disabled: {
            control: 'boolean',
            description: 'Disabled state'
        }
    }
};
export default meta;
// Default Slider
export const Default = {
    args: {
        label: 'Default Slider',
        value: [50],
        showValue: true
    }
};
// All Variants
export const AllVariants = {
    render: () => (_jsxs("div", { className: "space-y-8 w-80", children: [_jsx(HiveSlider, { label: "Default", description: "Standard glass morphism styling", variant: "default", value: [60], showValue: true }), _jsx(HiveSlider, { label: "Gold Premium", description: "Enhanced gold styling with stronger glow", variant: "gold", value: [75], showValue: true }), _jsx(HiveSlider, { label: "Success", description: "Success state with green accent", variant: "success", value: [90], showValue: true }), _jsx(HiveSlider, { label: "Minimal", description: "Clean minimal design", variant: "minimal", value: [45], showValue: true })] }))
};
// All Sizes
export const AllSizes = {
    render: () => (_jsxs("div", { className: "space-y-8 w-80", children: [_jsx(HiveSlider, { label: "Small", size: "sm", value: [25], description: "Compact slider for tight spaces", showValue: true }), _jsx(HiveSlider, { label: "Default", size: "default", value: [50], description: "Standard size for most use cases", showValue: true }), _jsx(HiveSlider, { label: "Large", size: "lg", value: [75], description: "Larger size for enhanced touch targets", showValue: true }), _jsx(HiveSlider, { label: "Extra Large", size: "xl", value: [90], description: "Maximum size for accessibility", showValue: true })] }))
};
// Custom Value Formatters
export const CustomFormatters = {
    render: () => (_jsxs("div", { className: "space-y-8 w-80", children: [_jsx(HiveSlider, { label: "Percentage", value: [65], showValue: true, valueFormatter: (value) => `${value}%`, description: "Percentage formatting" }), _jsx(HiveSlider, { label: "Currency", value: [250], min: 0, max: 500, showValue: true, valueFormatter: (value) => `$${value}`, description: "Currency formatting", variant: "gold" }), _jsx(HiveSlider, { label: "Temperature", value: [72], min: 60, max: 80, showValue: true, valueFormatter: (value) => `${value}°F`, description: "Temperature with units", variant: "success" }), _jsx(HiveSlider, { label: "File Size", value: [1500], min: 0, max: 2000, showValue: true, valueFormatter: (value) => `${(value / 1000).toFixed(1)}GB`, description: "File size formatting", variant: "minimal" })] }))
};
// Motion Variants
export const MotionVariants = {
    render: () => (_jsxs("div", { className: "space-y-8 w-80", children: [_jsx(HiveSlider, { label: "With Liquid Motion", value: [60], showValue: true, liquidMotion: true, description: "Smooth spring animations enabled", variant: "gold" }), _jsx(HiveSlider, { label: "Without Motion", value: [60], showValue: true, liquidMotion: false, description: "Static interactions for performance", variant: "minimal" })] }))
};
// Range and Step Variations
export const RangeAndStep = {
    render: () => (_jsxs("div", { className: "space-y-8 w-80", children: [_jsx(HiveSlider, { label: "Fine Control", value: [5.5], min: 0, max: 10, step: 0.1, showValue: true, valueFormatter: (value) => value.toFixed(1), description: "Step: 0.1 for precise control" }), _jsx(HiveSlider, { label: "Coarse Steps", value: [50], min: 0, max: 100, step: 10, showValue: true, description: "Step: 10 for quick selection", variant: "gold" }), _jsx(HiveSlider, { label: "Large Range", value: [5000], min: 0, max: 10000, step: 100, showValue: true, valueFormatter: (value) => value.toLocaleString(), description: "Large range with formatted display", variant: "success" })] }))
};
// Disabled States
export const DisabledStates = {
    render: () => (_jsxs("div", { className: "space-y-8 w-80", children: [_jsx(HiveSlider, { label: "Disabled Slider", value: [60], disabled: true, showValue: true, description: "Cannot be interacted with" }), _jsx(HiveSlider, { label: "Progress Indicator", value: [75], disabled: true, showValue: true, variant: "success", description: "Used for showing progress" })] }))
};
// Pre-built Variants
export const PrebuiltVariants = {
    render: () => (_jsxs("div", { className: "space-y-8 w-80", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Volume2, { className: "w-5 h-5 text-gray-400" }), _jsx(HiveVolumeSlider, { value: [80] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Sun, { className: "w-5 h-5 text-yellow-400" }), _jsx(HiveBrightnessSlider, { value: [65] })] }), _jsx(HiveProgressSlider, { value: [45] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(DollarSign, { className: "w-5 h-5 text-green-400" }), _jsx(HivePriceRangeSlider, { value: [350] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Thermometer, { className: "w-5 h-5 text-blue-400" }), _jsx(HiveTemperatureSlider, { value: [72] })] })] }))
};
// Settings Panel Example
export const SettingsPanel = {
    render: () => (_jsxs(HiveCard, { className: "p-6 space-y-6 max-w-md", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx(Settings, { className: "w-5 h-5 text-[var(--hive-text-primary)]" }), _jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)]", children: "Audio Settings" })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Volume2, { className: "w-4 h-4 text-gray-400" }), _jsx(HiveVolumeSlider, { value: [75], description: "Master volume control" })] }), _jsx(HiveSlider, { label: "Bass", value: [60], min: 0, max: 100, showValue: true, valueFormatter: (value) => `${value}%`, description: "Bass frequency enhancement", variant: "gold" }), _jsx(HiveSlider, { label: "Treble", value: [55], min: 0, max: 100, showValue: true, valueFormatter: (value) => `${value}%`, description: "High frequency clarity", variant: "gold" }), _jsx(HiveSlider, { label: "Balance", value: [0], min: -100, max: 100, showValue: true, valueFormatter: (value) => {
                    if (value === 0)
                        return 'Center';
                    return value > 0 ? `R${value}` : `L${Math.abs(value)}`;
                }, description: "Left/right audio balance" })] }))
};
// Simple Slider
export const SimpleSlider = {
    render: () => (_jsxs("div", { className: "space-y-6 w-80", children: [_jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Simple Slider" }), _jsx(Slider, { value: [40] }), _jsx("p", { className: "text-xs text-gray-400 mt-1", children: "Basic slider without labels or motion" })] }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-medium text-[var(--hive-text-primary)] mb-2", children: "Advanced Slider" }), _jsx(HiveSlider, { label: "Advanced Controls", value: [40], showValue: true, description: "Full-featured slider with all enhancements" })] })] }))
};
// Accessibility Demo
export const AccessibilityDemo = {
    render: () => (_jsxs("div", { className: "space-y-4 w-80", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Accessibility Features" }), _jsxs("div", { className: "space-y-2", children: [_jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Keyboard navigation (Arrow keys, Home, End, Page Up/Down)" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Screen reader support with ARIA labels" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Focus indicators and management" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Touch-friendly targets (44px+ thumb size)" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Value announcements on change" }), _jsx("p", { className: "text-sm text-gray-300", children: "\u2705 Proper role and state attributes" })] }), _jsxs("div", { className: "border border-[var(--hive-border-default)] rounded-lg p-4 space-y-4", children: [_jsx("h4", { className: "font-medium text-[var(--hive-text-primary)]", children: "Try keyboard navigation:" }), _jsx(HiveSlider, { label: "Accessible Slider", value: [50], showValue: true, description: "Use Tab to focus, Arrow keys to adjust, Home/End for min/max", "aria-describedby": "slider-help" }), _jsx("p", { id: "slider-help", className: "text-xs text-gray-400", children: "Tab to focus, Left/Right arrows for fine adjustment, Home for minimum, End for maximum" }), _jsx(HiveSlider, { label: "Step Navigation", value: [30], min: 0, max: 100, step: 10, showValue: true, description: "Page Up/Down for larger steps when step size is defined", variant: "gold" })] })] }))
};
// Interactive Demo
export const Interactive = {
    render: (args) => (_jsx("div", { className: "w-80", children: _jsx(HiveSlider, { ...args }) })),
    args: {
        label: 'Interactive Demo',
        description: 'Use the controls below to customize this slider',
        variant: 'default',
        size: 'default',
        showValue: true,
        liquidMotion: true,
        value: [50],
        min: 0,
        max: 100,
        step: 1,
        disabled: false
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive demo - use the controls below to test different slider configurations and see how they affect the behavior and appearance.'
            }
        }
    }
};
//# sourceMappingURL=slider.stories.js.map