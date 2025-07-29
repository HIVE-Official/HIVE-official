import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiveButton } from '../../components/hive-button';
import { Star, Download, Plus, ArrowRight, Heart } from 'lucide-react';
const meta = {
    title: '04-Hive/Hive Button',
    component: HiveButton,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'The consolidated HIVE Button component featuring liquid metal motion, magnetic interactions, glass morphism effects, and comprehensive variant system. Supports all HIVE design tokens and interaction patterns including tool-building and space-activation workflows.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'premium', 'outline', 'outline-subtle', 'ghost', 'ghost-gold', 'chip', 'chip-platinum', 'chip-gold', 'chip-glass', 'glow', 'minimal', 'success', 'destructive', 'warning', 'link'],
            description: 'HIVE button variants using semantic design tokens'
        },
        size: {
            control: 'select',
            options: ['xs', 'sm', 'default', 'lg', 'xl', 'icon', 'icon-sm', 'icon-lg', 'chip-xs', 'chip-sm', 'chip', 'chip-lg'],
            description: 'Button sizes including chip variants'
        },
        magneticHover: {
            control: 'boolean',
            description: 'Enable magnetic hover interactions for premium variants'
        },
        magneticIntensity: {
            control: 'select',
            options: ['subtle', 'medium', 'strong'],
            description: 'Intensity of magnetic hover effect'
        },
        disabled: {
            control: 'boolean',
        },
    },
};
export default meta;
// Re-export for migration compatibility
export { HiveButton as Button } from '../../components/hive-button';
export const Primary = {
    args: {
        children: 'HIVE Button',
        variant: 'primary',
    },
    parameters: {
        docs: {
            description: {
                story: 'Primary button with platinum background and liquid metal motion - the signature HIVE interaction'
            }
        }
    }
};
export const CoreVariants = {
    render: () => (_jsxs("div", { className: "flex flex-wrap gap-4 p-8 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx(HiveButton, { variant: "primary", children: "Primary" }), _jsx(HiveButton, { variant: "secondary", children: "Secondary" }), _jsx(HiveButton, { variant: "premium", children: "Premium" }), _jsx(HiveButton, { variant: "outline", children: "Outline" }), _jsx(HiveButton, { variant: "ghost", children: "Ghost" }), _jsx(HiveButton, { variant: "glow", children: "Glow" })] })),
    parameters: {
        docs: {
            description: {
                story: 'Core HIVE button variants showcasing the primary interaction patterns for campus infrastructure'
            }
        }
    }
};
export const Sizes = {
    render: () => (_jsxs("div", { className: "flex items-center gap-4 p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx(HiveButton, { size: "xs", children: "Extra Small" }), _jsx(HiveButton, { size: "sm", children: "Small" }), _jsx(HiveButton, { size: "default", children: "Default" }), _jsx(HiveButton, { size: "lg", children: "Large" }), _jsx(HiveButton, { size: "xl", children: "Extra Large" })] })),
    parameters: {
        docs: {
            description: {
                story: 'Button size variants for different UI contexts and importance levels'
            }
        }
    }
};
export const WithIcons = {
    render: () => (_jsxs("div", { className: "flex flex-wrap gap-4 p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx(HiveButton, { leftIcon: _jsx(Plus, { className: "w-4 h-4" }), children: "Create Tool" }), _jsx(HiveButton, { rightIcon: _jsx(ArrowRight, { className: "w-4 h-4" }), variant: "premium", children: "Activate Space" }), _jsx(HiveButton, { leftIcon: _jsx(Download, { className: "w-4 h-4" }), rightIcon: _jsx(Star, { className: "w-4 h-4" }), variant: "glow", children: "Save & Rate" }), _jsx(HiveButton, { size: "icon", variant: "ghost", children: _jsx(Heart, { className: "w-4 h-4" }) })] })),
    parameters: {
        docs: {
            description: {
                story: 'Buttons with left icons, right icons, and icon-only variants for tool-building interfaces'
            }
        }
    }
};
export const ChipVariants = {
    render: () => (_jsxs("div", { className: "flex flex-wrap gap-3 p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx(HiveButton, { variant: "chip", size: "chip-sm", children: "Filter" }), _jsx(HiveButton, { variant: "chip-gold", size: "chip", children: "Premium" }), _jsx(HiveButton, { variant: "chip-platinum", size: "chip", children: "Selected" }), _jsx(HiveButton, { variant: "chip-glass", size: "chip-lg", children: "Category" })] })),
    parameters: {
        docs: {
            description: {
                story: 'Chip-style buttons perfect for filters, tags, and selection interfaces in space directories'
            }
        }
    }
};
export const StatusVariants = {
    render: () => (_jsxs("div", { className: "flex flex-wrap gap-4 p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx(HiveButton, { variant: "success", leftIcon: _jsx(Plus, { className: "w-4 h-4" }), children: "Tool Created" }), _jsx(HiveButton, { variant: "warning", leftIcon: _jsx(Star, { className: "w-4 h-4" }), children: "Pending Review" }), _jsx(HiveButton, { variant: "destructive", leftIcon: _jsx(Heart, { className: "w-4 h-4" }), children: "Remove Tool" })] })),
    parameters: {
        docs: {
            description: {
                story: 'Status buttons for tool creation, space activation, and feedback workflows'
            }
        }
    }
};
export const InteractiveStates = {
    render: () => (_jsxs("div", { className: "flex flex-wrap gap-4 p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx(HiveButton, { children: "Normal" }), _jsx(HiveButton, { loading: true, children: "Creating Tool..." }), _jsx(HiveButton, { disabled: true, children: "Disabled" }), _jsx(HiveButton, { variant: "premium", magneticHover: true, magneticIntensity: "strong", children: "Magnetic Hover" })] })),
    parameters: {
        docs: {
            description: {
                story: 'Interactive states including loading, disabled, and magnetic hover effects'
            }
        }
    }
};
export const PremiumShowcase = {
    render: () => (_jsxs("div", { className: "flex flex-col gap-6 p-8 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { className: "text-center", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Premium Tool Builder Actions" }), _jsxs("div", { className: "flex gap-4 justify-center", children: [_jsx(HiveButton, { variant: "premium", size: "lg", leftIcon: _jsx(Plus, { className: "w-5 h-5" }), magneticHover: true, children: "Create Element" }), _jsx(HiveButton, { variant: "glow", size: "lg", rightIcon: _jsx(ArrowRight, { className: "w-5 h-5" }), magneticHover: true, children: "Deploy Tool" })] })] }), _jsxs("div", { className: "text-center", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Space Activation Flow" }), _jsxs("div", { className: "flex gap-3 justify-center", children: [_jsx(HiveButton, { variant: "chip-gold", size: "chip", children: "Preview" }), _jsx(HiveButton, { variant: "premium", size: "default", children: "Activate Space" }), _jsx(HiveButton, { variant: "glow", size: "default", children: "Invite Builders" })] })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Premium showcase demonstrating HIVE buttons in tool-building and space-activation workflows with magnetic interactions'
            }
        }
    }
};
export const AsChildPattern = {
    render: () => (_jsxs("div", { className: "flex gap-4 p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx(HiveButton, { asChild: true, variant: "premium", children: _jsx("a", { href: "#tools", className: "no-underline", children: "Browse Tools" }) }), _jsx(HiveButton, { asChild: true, variant: "glow", children: _jsx("a", { href: "#spaces", className: "no-underline", children: "Explore Spaces" }) })] })),
    parameters: {
        docs: {
            description: {
                story: 'Using asChild prop for link styling while maintaining HIVE button appearance - perfect for navigation'
            }
        }
    }
};
//# sourceMappingURL=hive-button.stories.js.map