import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button } from '../../../atomic/atoms/button';
import { Plus, Download, Heart, Star } from 'lucide-react';
const meta = {
    title: '02-atoms/Core Foundation/Button',
    component: Button,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
The **Button** atom is the primary interactive element in HIVE's design system. 
Built with enhanced HIVE design tokens, it provides consistent styling, accessibility, 
and behavior across all HIVE applications.

### Key Features
- **5 Variants**: Primary, secondary, ghost, outline, destructive
- **4 Sizes**: sm (32px), md (10), lg (48px), xl (56px) 
- **44px+ Touch Targets**: Mobile-optimized for accessibility
- **Loading States**: Built-in spinner with accessible labels
- **Icon Support**: Leading and trailing icon positions
- **Full Accessibility**: WCAG 2.1 AA compliant with proper focus management

### Design Token Usage
Uses \`hive-gold\`, \`hive-obsidian\`, \`hive-background-*\` and \`hive-border-*\` tokens exclusively.
        `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: 'select',
            options: ['primary', 'secondary', 'ghost', 'outline', 'destructive'],
            description: 'Visual style variant'
        },
        size: {
            control: 'select',
            options: ['sm', 'md', 'lg', 'xl'],
            description: 'Button size (affects height and padding)'
        },
        disabled: {
            control: 'boolean',
            description: 'Disabled state with reduced opacity and no interactions'
        },
        loading: {
            control: 'boolean',
            description: 'Loading state with spinner and disabled interactions'
        },
        fullWidth: {
            control: 'boolean',
            description: 'Expand to full container width'
        },
        children: {
            control: 'text',
            description: 'Button content (text, icons, etc.)'
        }
    }
};
export default meta;
// === BASIC USAGE ===
export const Default = {
    args: {
        children: 'Get Started'
    }
};
export const Primary = {
    args: {
        variant: 'primary',
        children: 'Primary Action'
    }
};
export const Secondary = {
    args: {
        variant: 'secondary',
        children: 'Secondary Action'
    }
};
// === ALL VARIANTS ===
export const AllVariants = {
    render: () => (_jsxs("div", { className: "flex flex-wrap gap-4 items-center", children: [_jsx(Button, { variant: "primary", children: "Primary" }), _jsx(Button, { variant: "secondary", children: "Secondary" }), _jsx(Button, { variant: "ghost", children: "Ghost" }), _jsx(Button, { variant: "outline", children: "Outline" }), _jsx(Button, { variant: "destructive", children: "Destructive" })] })),
    parameters: {
        docs: {
            description: {
                story: 'All available button variants using HIVE design tokens for consistent styling.'
            }
        }
    }
};
// === ALL SIZES ===
export const AllSizes = {
    render: () => (_jsxs("div", { className: "flex flex-wrap gap-4 items-end", children: [_jsx(Button, { size: "sm", children: "Small (32px)" }), _jsx(Button, { size: "md", children: "Medium (10)" }), _jsx(Button, { size: "lg", children: "Large (48px)" }), _jsx(Button, { size: "xl", children: "Extra Large (56px)" })] })),
    parameters: {
        docs: {
            description: {
                story: 'All available sizes. Large and XL sizes meet 44px minimum touch target for accessibility.'
            }
        }
    }
};
// === STATES ===
export const ButtonStates = {
    render: () => (_jsxs("div", { className: "grid grid-cols-2 gap-4 max-w-md", children: [_jsx(Button, { children: "Normal" }), _jsx(Button, { disabled: true, children: "Disabled" }), _jsx(Button, { loading: true, children: "Loading" }), _jsx(Button, { loading: true, disabled: true, children: "Loading + Disabled" })] })),
    parameters: {
        docs: {
            description: {
                story: 'Different button states including loading spinner and disabled state.'
            }
        }
    }
};
// === WITH ICONS ===
export const WithIcons = {
    render: () => (_jsxs("div", { className: "flex flex-wrap gap-4", children: [_jsxs(Button, { children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "Add Item"] }), _jsxs(Button, { variant: "secondary", children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Download"] }), _jsxs(Button, { variant: "ghost", children: ["Save", _jsx(Heart, { className: "w-4 h-4 ml-2" })] }), _jsxs(Button, { variant: "outline", size: "lg", children: [_jsx(Star, { className: "w-5 h-5 mr-2" }), "Premium Feature", _jsx(Star, { className: "w-5 h-5 ml-2" })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Buttons with icons in leading and trailing positions. Icons scale with button size.'
            }
        }
    }
};
// === LOADING STATES ===
export const LoadingStates = {
    render: () => (_jsxs("div", { className: "flex flex-wrap gap-4", children: [_jsx(Button, { loading: true, children: "Processing..." }), _jsxs(Button, { variant: "secondary", loading: true, children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Downloading..."] }), _jsx(Button, { variant: "destructive", loading: true, children: "Deleting..." })] })),
    parameters: {
        docs: {
            description: {
                story: 'Loading states with spinner. Icons are replaced by spinner while loading.'
            }
        }
    }
};
// === FULL WIDTH ===
export const FullWidth = {
    render: () => (_jsxs("div", { className: "w-full max-w-md space-y-3", children: [_jsx(Button, { fullWidth: true, children: "Full Width Primary" }), _jsx(Button, { variant: "secondary", fullWidth: true, children: "Full Width Secondary" }), _jsxs(Button, { variant: "outline", fullWidth: true, loading: true, children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Processing Full Width..."] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Full width buttons expand to fill their container. Useful for mobile layouts and forms.'
            }
        }
    }
};
// === INTERACTIVE DEMO ===
export const Interactive = {
    render: (args) => _jsx(Button, { ...args }),
    args: {
        variant: 'primary',
        size: 'md',
        children: 'Click me!',
        disabled: false,
        loading: false,
        fullWidth: false
    },
    parameters: {
        docs: {
            description: {
                story: 'Interactive demo - use the controls below to test different combinations of props.'
            }
        }
    }
};
// === KITCHEN SINK ===
export const KitchenSink = {
    render: () => (_jsxs("div", { className: "space-y-6 max-w-4xl", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-hive-text-primary mb-4", children: "All Variants \u00D7 All Sizes" }), _jsxs("div", { className: "grid grid-cols-5 gap-2 text-xs", children: [_jsx("div", {}), _jsx("div", { className: "text-center font-medium text-hive-text-secondary", children: "SM" }), _jsx("div", { className: "text-center font-medium text-hive-text-secondary", children: "MD" }), _jsx("div", { className: "text-center font-medium text-hive-text-secondary", children: "LG" }), _jsx("div", { className: "text-center font-medium text-hive-text-secondary", children: "XL" }), _jsx("div", { className: "text-right font-medium text-hive-text-secondary py-2", children: "Primary" }), _jsx(Button, { variant: "primary", size: "sm", children: "Button" }), _jsx(Button, { variant: "primary", size: "md", children: "Button" }), _jsx(Button, { variant: "primary", size: "lg", children: "Button" }), _jsx(Button, { variant: "primary", size: "xl", children: "Button" }), _jsx("div", { className: "text-right font-medium text-hive-text-secondary py-2", children: "Secondary" }), _jsx(Button, { variant: "secondary", size: "sm", children: "Button" }), _jsx(Button, { variant: "secondary", size: "md", children: "Button" }), _jsx(Button, { variant: "secondary", size: "lg", children: "Button" }), _jsx(Button, { variant: "secondary", size: "xl", children: "Button" }), _jsx("div", { className: "text-right font-medium text-hive-text-secondary py-2", children: "Ghost" }), _jsx(Button, { variant: "ghost", size: "sm", children: "Button" }), _jsx(Button, { variant: "ghost", size: "md", children: "Button" }), _jsx(Button, { variant: "ghost", size: "lg", children: "Button" }), _jsx(Button, { variant: "ghost", size: "xl", children: "Button" }), _jsx("div", { className: "text-right font-medium text-hive-text-secondary py-2", children: "Outline" }), _jsx(Button, { variant: "outline", size: "sm", children: "Button" }), _jsx(Button, { variant: "outline", size: "md", children: "Button" }), _jsx(Button, { variant: "outline", size: "lg", children: "Button" }), _jsx(Button, { variant: "outline", size: "xl", children: "Button" }), _jsx("div", { className: "text-right font-medium text-hive-text-secondary py-2", children: "Destructive" }), _jsx(Button, { variant: "destructive", size: "sm", children: "Button" }), _jsx(Button, { variant: "destructive", size: "md", children: "Button" }), _jsx(Button, { variant: "destructive", size: "lg", children: "Button" }), _jsx(Button, { variant: "destructive", size: "xl", children: "Button" })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-hive-text-primary mb-4", children: "Real-world Usage Examples" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "p-6 bg-hive-background-secondary rounded-xl border border-hive-border-default", children: [_jsx("h4", { className: "font-semibold text-hive-text-primary mb-2", children: "Call to Action" }), _jsx("p", { className: "text-hive-text-secondary mb-4", children: "Primary action with secondary alternative" }), _jsxs("div", { className: "flex gap-3", children: [_jsx(Button, { variant: "primary", children: "Get Started" }), _jsx(Button, { variant: "ghost", children: "Learn More" })] })] }), _jsxs("div", { className: "p-6 bg-hive-background-secondary rounded-xl border border-hive-border-default", children: [_jsx("h4", { className: "font-semibold text-hive-text-primary mb-2", children: "Form Actions" }), _jsx("p", { className: "text-hive-text-secondary mb-4", children: "Standard form button layout" }), _jsxs("div", { className: "flex gap-3 justify-end", children: [_jsx(Button, { variant: "ghost", children: "Cancel" }), _jsx(Button, { variant: "primary", children: "Save Changes" })] })] }), _jsxs("div", { className: "p-6 bg-hive-background-secondary rounded-xl border border-hive-border-default", children: [_jsx("h4", { className: "font-semibold text-hive-text-primary mb-2", children: "Toolbar Actions" }), _jsx("p", { className: "text-hive-text-secondary mb-4", children: "Icon buttons in toolbar layout" }), _jsxs("div", { className: "flex gap-2", children: [_jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Plus, { className: "w-4 h-4" }) }), _jsx(Button, { variant: "ghost", size: "sm", children: _jsx(Download, { className: "w-4 h-4" }) }), _jsxs(Button, { variant: "outline", size: "sm", children: [_jsx(Heart, { className: "w-4 h-4 mr-2" }), "Like"] })] })] }), _jsxs("div", { className: "p-6 bg-hive-background-secondary rounded-xl border border-hive-border-default", children: [_jsx("h4", { className: "font-semibold text-hive-text-primary mb-2", children: "Loading States" }), _jsx("p", { className: "text-hive-text-secondary mb-4", children: "Various loading button examples" }), _jsxs("div", { className: "space-y-3", children: [_jsx(Button, { loading: true, fullWidth: true, children: "Processing Payment..." }), _jsx(Button, { variant: "destructive", loading: true, fullWidth: true, children: "Deleting Account..." })] })] })] })] }), _jsxs("div", { className: "p-4 bg-hive-background-tertiary rounded-lg border border-hive-border-subtle", children: [_jsx("h4", { className: "font-semibold text-hive-text-primary mb-2", children: "\u267F Accessibility Notes" }), _jsxs("ul", { className: "text-sm text-hive-text-secondary space-y-1", children: [_jsx("li", { children: "\u2022 All sizes meet or exceed 44px minimum touch target requirement" }), _jsx("li", { children: "\u2022 Loading state announces \"Loading\" to screen readers" }), _jsx("li", { children: "\u2022 Disabled buttons are properly excluded from tab order" }), _jsx("li", { children: "\u2022 Focus indicators meet WCAG 2.1 AA contrast requirements" }), _jsx("li", { children: "\u2022 Semantic HTML button element maintains native keyboard behavior" })] })] })] })),
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                story: 'Comprehensive showcase of all button capabilities, variants, and real-world usage patterns.'
            }
        }
    }
};
//# sourceMappingURL=button.stories.js.map