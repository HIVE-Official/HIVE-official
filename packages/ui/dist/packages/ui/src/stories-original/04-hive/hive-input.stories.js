import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { HiveInput, HiveToolNameInput, HiveSpaceNameInput, HiveSearchInput, HivePasswordInput } from '../../components/hive-input';
import { Search, User, Mail, Lock, Wrench, Building } from 'lucide-react';
const meta = {
    title: '04-HIVE/Input',
    component: HiveInput,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'HIVE Input system with floating labels, liquid metal motion, and premium glass morphism aesthetics. Includes specialized variants for common use cases.'
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        variant: {
            control: { type: 'select' },
            options: ['default', 'error', 'success', 'disabled', 'premium', 'minimal']
        },
        size: {
            control: { type: 'select' },
            options: ['sm', 'default', 'lg', 'xl']
        },
        radius: {
            control: { type: 'select' },
            options: ['sm', 'default', 'lg', 'xl']
        },
        floatingLabel: {
            control: 'boolean'
        },
        showCharacterCount: {
            control: 'boolean'
        },
        loading: {
            control: 'boolean'
        }
    }
};
export default meta;
export const Default = {
    args: {
        label: 'Email Address',
        placeholder: 'Enter your email...',
        type: 'email'
    }
};
export const AllVariants = {
    render: () => (_jsxs("div", { className: "space-y-6 w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx(HiveInput, { label: "Default Input", placeholder: "Standard input field", variant: "default" }), _jsx(HiveInput, { label: "Premium Input", placeholder: "Gold accent styling", variant: "premium" }), _jsx(HiveInput, { label: "Success State", placeholder: "Validation passed", variant: "success", successText: "Email format is valid" }), _jsx(HiveInput, { label: "Error State", placeholder: "Something went wrong", variant: "error", errorText: "This field is required" }), _jsx(HiveInput, { label: "Minimal Style", placeholder: "Clean and simple", variant: "minimal" })] })),
    parameters: {
        docs: {
            description: {
                story: 'All input variants showcasing different states and styling approaches'
            }
        }
    }
};
export const InputSizes = {
    render: () => (_jsxs("div", { className: "space-y-4 w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx(HiveInput, { label: "Small Size", placeholder: "Compact input", size: "sm" }), _jsx(HiveInput, { label: "Default Size", placeholder: "Standard input", size: "default" }), _jsx(HiveInput, { label: "Large Size", placeholder: "Prominent input", size: "lg" }), _jsx(HiveInput, { label: "Extra Large", placeholder: "Hero input field", size: "xl" })] })),
    parameters: {
        docs: {
            description: {
                story: 'Input size variants for different UI contexts'
            }
        }
    }
};
export const WithIcons = {
    render: () => (_jsxs("div", { className: "space-y-4 w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx(HiveInput, { label: "Search", placeholder: "Search tools and spaces...", leftIcon: _jsx(Search, { size: 16 }), variant: "premium" }), _jsx(HiveInput, { label: "User Profile", placeholder: "Enter username", leftIcon: _jsx(User, { size: 16 }), rightIcon: _jsx(Building, { size: 16 }) }), _jsx(HiveInput, { label: "Email Address", placeholder: "your.email@university.edu", leftIcon: _jsx(Mail, { size: 16 }), type: "email" }), _jsx(HiveInput, { label: "Secure Password", placeholder: "Create a strong password", leftIcon: _jsx(Lock, { size: 16 }), type: "password" })] })),
    parameters: {
        docs: {
            description: {
                story: 'Input fields with left and right icons for enhanced UX'
            }
        }
    }
};
export const FloatingLabels = {
    render: () => (_jsxs("div", { className: "grid grid-cols-2 gap-6 p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Floating Labels" }), _jsx(HiveInput, { label: "Tool Name", placeholder: "Enter tool name", floatingLabel: true, variant: "premium" }), _jsx(HiveInput, { label: "Description", placeholder: "Describe your tool", floatingLabel: true, leftIcon: _jsx(Wrench, { size: 16 }) })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Static Labels" }), _jsx(HiveInput, { label: "Tool Name", placeholder: "Enter tool name", floatingLabel: false, variant: "premium" }), _jsx(HiveInput, { label: "Description", placeholder: "Describe your tool", floatingLabel: false, leftIcon: _jsx(Wrench, { size: 16 }) })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Comparison between floating labels and static labels'
            }
        }
    }
};
export const CharacterCounting = {
    render: () => (_jsxs("div", { className: "space-y-4 w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx(HiveInput, { label: "Tool Name", placeholder: "Name your creation", showCharacterCount: true, maxLength: 30, variant: "premium", helperText: "Choose a memorable name for your tool" }), _jsx(HiveInput, { label: "Short Description", placeholder: "Brief description...", showCharacterCount: true, maxLength: 100, leftIcon: _jsx(Tool, { size: 16 }) }), _jsx(HiveInput, { label: "Space Name", placeholder: "Create your space", showCharacterCount: true, maxLength: 50, variant: "premium", defaultValue: "CS Study Group - Advanced Algorithms" })] })),
    parameters: {
        docs: {
            description: {
                story: 'Character counting with visual feedback and limit warnings'
            }
        }
    }
};
export const PasswordInput = {
    render: () => (_jsxs("div", { className: "space-y-4 w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx(HiveInput, { label: "Current Password", placeholder: "Enter current password", type: "password", leftIcon: _jsx(Lock, { size: 16 }) }), _jsx(HiveInput, { label: "New Password", placeholder: "Create a secure password", type: "password", variant: "premium", helperText: "Password must be at least 8 characters", showCharacterCount: true, maxLength: 128 }), _jsx(HiveInput, { label: "Confirm Password", placeholder: "Confirm your password", type: "password", variant: "success", successText: "Passwords match!" })] })),
    parameters: {
        docs: {
            description: {
                story: 'Password inputs with toggle visibility and validation states'
            }
        }
    }
};
export const LoadingStates = {
    render: () => (_jsxs("div", { className: "space-y-4 w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx(HiveInput, { label: "Checking Availability", placeholder: "username", loading: true, leftIcon: _jsx(User, { size: 16 }), helperText: "Verifying username availability..." }), _jsx(HiveInput, { label: "Processing Payment", placeholder: "Card number", loading: true, variant: "premium" }), _jsx(HiveInput, { label: "Saving Changes", placeholder: "Tool description", loading: true, value: "Advanced GPA calculator with predictive analytics" })] })),
    parameters: {
        docs: {
            description: {
                story: 'Loading states for async validation and processing'
            }
        }
    }
};
export const SpecializedInputs = {
    render: () => (_jsxs("div", { className: "space-y-6 w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Tool Creation" }), _jsx(HiveToolNameInput, { placeholder: "GPA Calculator Pro", helperText: "This will be visible to all users" })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Space Creation" }), _jsx(HiveSpaceNameInput, { placeholder: "CS Study Hub", helperText: "Choose a name that represents your community" })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Search" }), _jsx(HiveSearchInput, { leftIcon: _jsx(Search, { size: 16 }) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] mb-4", children: "Security" }), _jsx(HivePasswordInput, { label: "Account Password", placeholder: "Enter your password" })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Pre-built specialized input components for common HIVE use cases'
            }
        }
    }
};
export const ValidationStates = {
    render: () => (_jsxs("div", { className: "space-y-4 w-full max-w-md p-6 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsx(HiveInput, { label: "Email Address", placeholder: "your.email@university.edu", type: "email", variant: "error", errorText: "Please enter a valid .edu email address", leftIcon: _jsx(Mail, { size: 16 }) }), _jsx(HiveInput, { label: "Tool Name", placeholder: "Name your creation", variant: "success", successText: "Great name! This is available.", value: "Study Schedule Optimizer", showCharacterCount: true, maxLength: 50 }), _jsx(HiveInput, { label: "Space Description", placeholder: "Describe your space", helperText: "Help others understand what your space is about", maxLength: 200, showCharacterCount: true }), _jsx(HiveInput, { label: "Disabled Field", placeholder: "This field is disabled", variant: "disabled", disabled: true, value: "Cannot edit this field" })] })),
    parameters: {
        docs: {
            description: {
                story: 'Different validation states with contextual messaging'
            }
        }
    }
};
export const InteractiveDemo = {
    render: () => (_jsxs("div", { className: "space-y-8 p-8 bg-[var(--hive-background-primary)] rounded-2xl", children: [_jsxs("div", { className: "text-center mb-6", children: [_jsx("h3", { className: "text-2xl font-semibold text-[var(--hive-text-primary)] mb-2", children: "HIVE Tool Builder Form" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Create your custom campus tool" })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx(HiveToolNameInput, { placeholder: "GPA Tracker Pro" }), _jsx(HiveInput, { label: "Category", placeholder: "Academic Tools", leftIcon: _jsx(Building, { size: 16 }) }), _jsx(HiveInput, { label: "Description", placeholder: "Describe what your tool does...", showCharacterCount: true, maxLength: 150, helperText: "This will appear in search results" })] }), _jsxs("div", { className: "space-y-4", children: [_jsx(HiveInput, { label: "Tags", placeholder: "gpa, calculator, academic", helperText: "Comma-separated tags for discovery" }), _jsx(HiveInput, { label: "Version", placeholder: "1.0.0", defaultValue: "1.0.0", variant: "success", successText: "Valid semantic version" }), _jsx(HivePasswordInput, { label: "Admin Password", placeholder: "Secure your tool", helperText: "Required for tool management" })] })] }), _jsx("div", { className: "pt-4 border-t border-[var(--hive-border-subtle)]", children: _jsx(HiveSearchInput, { placeholder: "Search existing tools for inspiration..." }) })] })),
    parameters: {
        docs: {
            description: {
                story: 'Interactive demo showing HIVE inputs in a realistic tool creation form'
            }
        }
    }
};
//# sourceMappingURL=hive-input.stories.js.map