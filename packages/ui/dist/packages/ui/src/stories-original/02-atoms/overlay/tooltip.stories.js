import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tooltip } from '../../../atomic/atoms/tooltip';
import { Button } from '../../../atomic/atoms/button';
import { Badge } from '../../../atomic/atoms/badge';
import { InfoIcon, HelpCircle, AlertTriangle, Star, Settings } from 'lucide-react';
const meta = {
    title: '02-atoms/Content Media/Tooltip',
    component: Tooltip,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
The **Tooltip** atom provides contextual information on hover, click, or focus.
Built with proper accessibility support and flexible positioning options.

### Key Features
- **4 Placements**: Top, bottom, left, right with automatic positioning
- **3 Triggers**: Hover (default), click, focus for different interaction patterns
- **3 Variants**: Default, dark, light with HIVE design token theming
- **3 Sizes**: sm, md, lg for different content amounts
- **Arrow Support**: Optional arrow pointer with automatic color matching
- **Accessibility**: Full keyboard support, ARIA labels, screen reader friendly

### Design Token Usage
Uses \`hive-background-*\`, \`hive-border-*\`, \`hive-text-*\` tokens for consistent theming.

### When to Use
- **Hover**: Additional context or help text
- **Click**: More complex content or persistent display
- **Focus**: Keyboard navigation and accessibility
        `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        placement: {
            control: 'select',
            options: ['top', 'bottom', 'left', 'right'],
            description: 'Tooltip position relative to trigger element'
        },
        trigger: {
            control: 'select',
            options: ['hover', 'click', 'focus'],
            description: 'How the tooltip is activated'
        },
        variant: {
            control: 'select',
            options: ['default', 'dark', 'light'],
            description: 'Visual theme variant'
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg'],
            description: 'Tooltip size for different content amounts'
        },
        arrow: {
            control: 'boolean',
            description: 'Show arrow pointer to trigger element'
        },
        delay: {
            control: 'number',
            description: 'Delay in milliseconds before showing tooltip'
        },
        disabled: {
            control: 'boolean',
            description: 'Disable tooltip interactions'
        },
        content: {
            control: 'text',
            description: 'Tooltip content (text or React nodes)'
        }
    }
};
export default meta;
// === BASIC USAGE ===
export const Default = {
    args: {
        content: 'This is a helpful tooltip',
        children: _jsx(Button, { children: "Hover me" })
    }
};
export const WithArrow = {
    args: {
        content: 'Tooltip with arrow pointer',
        arrow: true,
        children: _jsx(Button, { children: "Hover for tooltip" })
    }
};
export const LongContent = {
    args: {
        content: 'This is a longer tooltip message that provides more detailed information about the element.',
        size: 'lg',
        arrow: true,
        children: _jsx(Button, { children: "Extended info" })
    }
};
// === ALL PLACEMENTS ===
export const AllPlacements = {
    render: () => (_jsxs("div", { className: "grid grid-cols-3 gap-8 place-items-center w-96 h-64", children: [_jsx("div", {}), _jsx(Tooltip, { content: "Top placement", placement: "top", arrow: true, children: _jsx(Button, { variant: "outline", children: "Top" }) }), _jsx("div", {}), _jsx(Tooltip, { content: "Left placement", placement: "left", arrow: true, children: _jsx(Button, { variant: "outline", children: "Left" }) }), _jsx("div", { className: "text-center text-hive-text-secondary", children: "Hover buttons for tooltips" }), _jsx(Tooltip, { content: "Right placement", placement: "right", arrow: true, children: _jsx(Button, { variant: "outline", children: "Right" }) }), _jsx("div", {}), _jsx(Tooltip, { content: "Bottom placement", placement: "bottom", arrow: true, children: _jsx(Button, { variant: "outline", children: "Bottom" }) }), _jsx("div", {})] })),
    parameters: {
        docs: {
            description: {
                story: 'All four placement options with arrows. Tooltips automatically adjust for viewport boundaries.'
            }
        }
    }
};
// === ALL TRIGGERS ===
export const AllTriggers = {
    render: () => (_jsxs("div", { className: "flex gap-4 flex-wrap", children: [_jsx(Tooltip, { content: "Appears on hover (default)", trigger: "hover", arrow: true, children: _jsxs(Button, { variant: "ghost", children: [_jsx(InfoIcon, { className: "w-4 h-4 mr-2" }), "Hover Trigger"] }) }), _jsx(Tooltip, { content: "Click to toggle tooltip", trigger: "click", arrow: true, children: _jsxs(Button, { variant: "outline", children: [_jsx(HelpCircle, { className: "w-4 h-4 mr-2" }), "Click Trigger"] }) }), _jsx(Tooltip, { content: "Focus with keyboard or mouse", trigger: "focus", arrow: true, children: _jsxs(Button, { variant: "secondary", children: [_jsx(AlertTriangle, { className: "w-4 h-4 mr-2" }), "Focus Trigger"] }) })] })),
    parameters: {
        docs: {
            description: {
                story: 'Different trigger types: hover (default), click (persistent), and focus (keyboard accessible).'
            }
        }
    }
};
// === ALL VARIANTS ===
export const AllVariants = {
    render: () => (_jsxs("div", { className: "flex gap-4 flex-wrap", children: [_jsx(Tooltip, { content: "Default variant tooltip", variant: "default", arrow: true, children: _jsx(Badge, { children: "Default" }) }), _jsx(Tooltip, { content: "Dark variant tooltip", variant: "dark", arrow: true, children: _jsx(Badge, { variant: "secondary", children: "Dark" }) }), _jsx(Tooltip, { content: "Light variant tooltip", variant: "light", arrow: true, children: _jsx(Badge, { variant: "outline", children: "Light" }) })] })),
    parameters: {
        docs: {
            description: {
                story: 'Visual variants using different HIVE design token combinations for various contexts.'
            }
        }
    }
};
// === ALL SIZES ===
export const AllSizes = {
    render: () => (_jsxs("div", { className: "flex gap-4 items-end", children: [_jsx(Tooltip, { content: "Small", size: "sm", arrow: true, children: _jsx(Button, { size: "sm", children: "Small" }) }), _jsx(Tooltip, { content: "Medium tooltip with more content", size: "md", arrow: true, children: _jsx(Button, { size: "md", children: "Medium" }) }), _jsx(Tooltip, { content: "Large tooltip with even more detailed content that can accommodate longer explanations", size: "lg", arrow: true, children: _jsx(Button, { size: "lg", children: "Large" }) })] })),
    parameters: {
        docs: {
            description: {
                story: 'Tooltip sizes scale with content needs. Match tooltip size to trigger element size for visual harmony.'
            }
        }
    }
};
// === RICH CONTENT ===
export const RichContent = {
    render: () => (_jsxs("div", { className: "flex gap-4 flex-wrap", children: [_jsx(Tooltip, { content: _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "font-semibold", children: "Feature Status" }), _jsxs("div", { className: "text-sm", children: [_jsx("div", { children: "\u2022 Available in Pro plan" }), _jsx("div", { children: "\u2022 Includes advanced analytics" }), _jsx("div", { children: "\u2022 24/7 support included" })] })] }), size: "lg", trigger: "click", arrow: true, children: _jsxs(Button, { variant: "primary", children: [_jsx(Star, { className: "w-4 h-4 mr-2" }), "Premium Feature"] }) }), _jsx(Tooltip, { content: _jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: "font-medium", children: "Settings" }), _jsx("div", { className: "text-xs opacity-75", children: "Configure your preferences" })] }), variant: "dark", arrow: true, children: _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Settings, { className: "w-4 h-4" }) }) })] })),
    parameters: {
        docs: {
            description: {
                story: 'Tooltips can contain rich content including multiple lines, formatting, and structured information.'
            }
        }
    }
};
// === DELAY & DISABLED ===
export const DelayAndDisabled = {
    render: () => (_jsxs("div", { className: "flex gap-4 flex-wrap", children: [_jsx(Tooltip, { content: "Appears immediately", delay: 0, arrow: true, children: _jsx(Button, { variant: "outline", children: "No Delay" }) }), _jsx(Tooltip, { content: "Appears after 500ms", delay: 500, arrow: true, children: _jsx(Button, { variant: "outline", children: "500ms Delay" }) }), _jsx(Tooltip, { content: "This won't show", disabled: true, arrow: true, children: _jsx(Button, { variant: "outline", children: "Disabled Tooltip" }) })] })),
    parameters: {
        docs: {
            description: {
                story: 'Control tooltip timing with delay prop and disable when needed for conditional help text.'
            }
        }
    }
};
// === INTERACTIVE DEMO ===
export const Interactive = {
    render: (args) => (_jsx("div", { className: "p-8", children: _jsx(Tooltip, { ...args, children: _jsx(Button, { children: "Interactive Tooltip" }) }) })),
    args: {
        content: 'Customizable tooltip',
        placement: 'top',
        trigger: 'hover',
        variant: 'default',
        size: 'md',
        arrow: true,
        delay: 200,
        disabled: false
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive demo - use the controls below to test different tooltip configurations.'
            }
        }
    }
};
// === KITCHEN SINK ===
export const KitchenSink = {
    render: () => (_jsxs("div", { className: "space-y-8 max-w-4xl", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-hive-text-primary mb-4", children: "Real-world Usage Examples" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "p-6 bg-hive-background-secondary rounded-xl border border-hive-border-default", children: [_jsx("h4", { className: "font-semibold text-hive-text-primary mb-3", children: "Help Text" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { children: "Password" }), _jsx(Tooltip, { content: "Must be at least 8 characters with uppercase, lowercase, and numbers", size: "md", arrow: true, children: _jsx(HelpCircle, { className: "w-4 h-4 text-hive-text-secondary cursor-help" }) })] }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { children: "API Key" }), _jsx(Tooltip, { content: "Found in your account settings under Developer Tools", size: "md", arrow: true, children: _jsx(InfoIcon, { className: "w-4 h-4 text-hive-text-secondary cursor-help" }) })] })] })] }), _jsxs("div", { className: "p-6 bg-hive-background-secondary rounded-xl border border-hive-border-default", children: [_jsx("h4", { className: "font-semibold text-hive-text-primary mb-3", children: "Status Indicators" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Badge, { variant: "success", children: "Active" }), _jsx(Tooltip, { content: "Service is running normally. Last check: 2 minutes ago", variant: "dark", arrow: true, children: _jsx(InfoIcon, { className: "w-4 h-4 text-hive-text-secondary cursor-help" }) })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsx(Badge, { variant: "warning", children: "Degraded" }), _jsx(Tooltip, { content: _jsxs("div", { className: "space-y-1", children: [_jsx("div", { className: "font-medium", children: "Performance Issues" }), _jsx("div", { className: "text-xs", children: "Response times 20% higher than normal" })] }), variant: "default", size: "md", arrow: true, children: _jsx(AlertTriangle, { className: "w-4 h-4 text-[var(--hive-brand-secondary)] cursor-help" }) })] })] })] }), _jsxs("div", { className: "p-6 bg-hive-background-secondary rounded-xl border border-hive-border-default", children: [_jsx("h4", { className: "font-semibold text-hive-text-primary mb-3", children: "Feature Previews" }), _jsx("div", { className: "space-y-3", children: _jsx(Tooltip, { content: _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "font-semibold", children: "AI Assistant" }), _jsx("div", { className: "text-sm", children: "Get intelligent suggestions and automation" }), _jsx("div", { className: "text-xs opacity-75", children: "Coming in v2.1" })] }), trigger: "click", size: "lg", arrow: true, children: _jsxs(Button, { variant: "outline", disabled: true, children: [_jsx(Star, { className: "w-4 h-4 mr-2" }), "AI Assistant (Preview)"] }) }) })] }), _jsxs("div", { className: "p-6 bg-hive-background-secondary rounded-xl border border-hive-border-default", children: [_jsx("h4", { className: "font-semibold text-hive-text-primary mb-3", children: "Keyboard Navigation" }), _jsxs("div", { className: "space-y-3", children: [_jsx(Tooltip, { content: "Press Tab to focus, Enter to activate", trigger: "focus", arrow: true, children: _jsx(Button, { variant: "ghost", children: "Focus me with Tab" }) }), _jsx("p", { className: "text-sm text-hive-text-secondary", children: "Try tabbing through elements to see focus tooltips" })] })] })] })] }), _jsxs("div", { className: "p-4 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle", children: [_jsx("h4", { className: "font-semibold text-hive-text-primary mb-2", children: "\u267F Accessibility Features" }), _jsxs("ul", { className: "text-sm text-hive-text-secondary space-y-1", children: [_jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "Keyboard Support:" }), " Focus trigger reveals tooltip"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "Screen Readers:" }), " aria-describedby links tooltip to trigger"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "Escape Key:" }), " Dismisses click-triggered tooltips"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "Focus Management:" }), " Returns focus to trigger on close"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "Role Attribution:" }), " Proper tooltip role for assistive technology"] }), _jsxs("li", { children: ["\u2022 ", _jsx("strong", { children: "Content Guidelines:" }), " Tooltip content shouldn't repeat visible text"] })] })] }), _jsxs("div", { className: "p-4 bg-blue-50 rounded-lg border border-blue-200", children: [_jsx("h4", { className: "font-semibold text-blue-900 mb-2", children: "\u26A1 Performance Notes" }), _jsxs("ul", { className: "text-sm text-blue-800 space-y-1", children: [_jsx("li", { children: "\u2022 Tooltips are rendered on-demand, not hidden in DOM" }), _jsx("li", { children: "\u2022 Event listeners are cleaned up automatically" }), _jsx("li", { children: "\u2022 Delay prop helps prevent accidental triggers" }), _jsx("li", { children: "\u2022 Use sparingly - too many tooltips can overwhelm users" })] })] })] })),
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: 'Comprehensive showcase of tooltip patterns, accessibility features, and real-world usage examples.'
            }
        }
    }
};
//# sourceMappingURL=tooltip.stories.js.map