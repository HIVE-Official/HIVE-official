import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { WaitlistForm } from "../../components/waitlist-form";
import { action } from "@storybook/addon-actions";
const meta = {
    title: "12. Onboarding/Waitlist Form",
    component: WaitlistForm,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
# HIVE Waitlist Form

A sleek waitlist signup form for pre-launch user acquisition. Features:

## Key Features
- **Email Collection**: Validates .edu email addresses for campus verification
- **Loading States**: Visual feedback during submission
- **Success Animation**: Smooth transition to confirmation state
- **HIVE Branding**: Uses HIVE design system components
- **Motion System**: Integrated with गति (HIVE motion library)

## Design Elements
- Premium HIVE card styling with elevation
- Gold accent colors matching HIVE brand
- Responsive layout with proper spacing
- Micro-interactions for enhanced UX

## Use Cases
- Pre-launch landing pages
- Campus beta program signups
- Early access registration
- University partnership onboarding
        `
            }
        }
    },
    tags: ["autodocs"],
    argTypes: {
        onSubmit: {
            action: "submitted",
            description: 'Callback function when form is submitted'
        },
    },
};
export default meta;
// Mock submission function for stories
const mockSubmit = async (email) => {
    action("submitted")(email);
    console.log('Waitlist submission:', email);
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    if (email.includes('error')) {
        throw new Error('Submission failed');
    }
};
export const Default = {
    args: {
        onSubmit: mockSubmit
    }
};
export const LoadingState = {
    args: {
        onSubmit: async (email) => {
            action("loading-demo")(email);
            console.log('Loading state demo:', email);
            // Extended delay to show loading state
            await new Promise(resolve => setTimeout(resolve, 5000));
        }
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates the loading state during form submission with extended delay.'
            }
        }
    }
};
export const SuccessState = {
    args: {
        onSubmit: async (email) => {
            action("success-demo")(email);
            console.log('Success state demo:', email);
            // Quick success
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    },
    parameters: {
        docs: {
            description: {
                story: 'Shows the success animation and confirmation message after form submission.'
            }
        }
    }
};
export const ErrorState = {
    args: {
        onSubmit: async (email) => {
            action("error-demo")(email);
            console.log('Error state demo:', email);
            await new Promise(resolve => setTimeout(resolve, 1000));
            throw new Error('Network error - please try again');
        }
    },
    parameters: {
        docs: {
            description: {
                story: 'Demonstrates error handling when form submission fails.'
            }
        }
    }
};
// Campus-specific examples
export const BuffaloStudents = {
    args: {
        onSubmit: mockSubmit
    },
    render: (args) => (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "text-center space-y-2 mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "University at Buffalo" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Join the HIVE community at UB" })] }), _jsx(WaitlistForm, { ...args })] })),
    parameters: {
        docs: {
            description: {
                story: 'Campus-specific branding for University at Buffalo students.'
            }
        }
    }
};
export const StoneyBrookStudents = {
    args: {
        onSubmit: mockSubmit
    },
    render: (args) => (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "text-center space-y-2 mb-6", children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "Stony Brook University" }), _jsx("p", { className: "text-[var(--hive-text-muted)]", children: "Connect with builders at Stony Brook" })] }), _jsx(WaitlistForm, { ...args })] })),
    parameters: {
        docs: {
            description: {
                story: 'Campus-specific branding for Stony Brook University students.'
            }
        }
    }
};
export const MultipleFormsShowcase = {
    render: () => (_jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-8 p-8", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] text-center", children: "Engineering Students" }), _jsx(WaitlistForm, { onSubmit: mockSubmit })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-[var(--hive-text-primary)] text-center", children: "Business Students" }), _jsx(WaitlistForm, { onSubmit: mockSubmit })] })] })),
    parameters: {
        docs: {
            description: {
                story: 'Multiple waitlist forms for different student demographics.'
            }
        }
    }
};
// Dark theme showcase
export const DarkTheme = {
    args: {
        onSubmit: mockSubmit
    },
    parameters: {
        backgrounds: {
            default: 'dark'
        },
        docs: {
            description: {
                story: 'Waitlist form in dark theme environment.'
            }
        }
    },
    render: (args) => (_jsx("div", { className: "p-8 bg-[var(--hive-background-primary)] min-h-screen flex items-center justify-center", children: _jsx(WaitlistForm, { ...args }) }))
};
// Integration with landing page
export const LandingPageIntegration = {
    args: {
        onSubmit: mockSubmit
    },
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                story: 'Complete landing page integration showing waitlist form in context with hero content and metrics.'
            }
        }
    },
    render: (args) => (_jsx("div", { className: "min-h-screen bg-gradient-to-br from-[var(--hive-background-primary)] via-[var(--hive-background-secondary)] to-[var(--hive-background-tertiary)] flex items-center justify-center p-4", children: _jsxs("div", { className: "max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center", children: [_jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsxs("h1", { className: "text-4xl lg:text-5xl font-bold text-[var(--hive-text-primary)]", children: ["Build the Future", _jsx("span", { className: "text-[var(--hive-brand-primary)]", children: " Together" })] }), _jsx("p", { className: "text-xl text-[var(--hive-text-muted)]", children: "HIVE is the digital campus platform where student builders create tools, share knowledge, and transform their university experience." })] }), _jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-3 gap-4", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-brand-primary)]", children: "1000+" }), _jsx("div", { className: "text-sm text-[var(--hive-text-muted)]", children: "Student Builders" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-brand-primary)]", children: "50+" }), _jsx("div", { className: "text-sm text-[var(--hive-text-muted)]", children: "Campus Tools" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-brand-primary)]", children: "25" }), _jsx("div", { className: "text-sm text-[var(--hive-text-muted)]", children: "Universities" })] })] })] }), _jsx("div", { className: "flex justify-center", children: _jsx(WaitlistForm, { ...args }) })] }) }))
};
//# sourceMappingURL=waitlist-form.stories.js.map