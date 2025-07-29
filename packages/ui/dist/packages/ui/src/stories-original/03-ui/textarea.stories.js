import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Textarea, Label } from '../../components';
const meta = {
    title: '03-UI/Textarea',
    component: Textarea,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
**Multi-line text input component**

Textarea component for longer text input with HIVE design system styling. Optimized for content creation and Builder workflows.

## When to Use
- Long form text input (descriptions, content, code)
- Tool configuration text fields
- Comment and post composition
- Builder notes and documentation

## Design Principles
- **Consistent with Input styling** following HIVE design tokens
- **Responsive sizing** that adapts to content
- **Clear focus states** with gold outline indicators
- **Accessibility first** with proper labeling and keyboard support

## Accessibility
- WCAG 2.1 AA compliant focus indicators
- Proper label association
- Screen reader friendly
- Keyboard navigation support
        `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        placeholder: {
            control: 'text',
            description: 'Placeholder text'
        },
        disabled: {
            control: 'boolean',
            description: 'Disabled state'
        },
        rows: {
            control: 'number',
            description: 'Number of visible text lines'
        }
    }
};
export default meta;
export const Default = {
    args: {
        placeholder: 'Enter your text here...',
    },
};
export const WithLabel = {
    render: (args) => (_jsxs("div", { className: "grid w-full max-w-sm items-center gap-2", children: [_jsx(Label, { htmlFor: "message", children: "Your message" }), _jsx(Textarea, { ...args, id: "message" })] })),
    args: {
        placeholder: 'Type your message here...',
    },
};
export const ToolDescription = {
    render: (args) => (_jsxs("div", { className: "grid w-full max-w-md items-center gap-2", children: [_jsx(Label, { htmlFor: "tool-description", children: "Tool Description" }), _jsx(Textarea, { ...args, id: "tool-description" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Describe what your tool does and how students can use it." })] })),
    args: {
        placeholder: 'Enter a detailed description of your tool...',
        rows: 4,
    },
};
export const PostComposer = {
    render: (args) => (_jsxs("div", { className: "grid w-full max-w-lg items-center gap-2", children: [_jsx(Label, { htmlFor: "post-content", children: "Share with your Space" }), _jsx(Textarea, { ...args, id: "post-content" }), _jsxs("div", { className: "flex justify-between text-xs text-muted-foreground", children: [_jsx("span", { children: "What's happening in Computer Science?" }), _jsx("span", { children: "0/500" })] })] })),
    args: {
        placeholder: "What's on your mind?",
        rows: 3,
        maxLength: 500,
    },
};
export const CodeInput = {
    render: (args) => (_jsxs("div", { className: "grid w-full max-w-xl items-center gap-2", children: [_jsx(Label, { htmlFor: "code-snippet", children: "Code Snippet" }), _jsx(Textarea, { ...args, id: "code-snippet", className: "font-mono text-sm" }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Paste code to share with your Space or include in a tool." })] })),
    args: {
        placeholder: '// Paste your code here...',
        rows: 8,
    },
};
export const Disabled = {
    render: (args) => (_jsxs("div", { className: "grid w-full max-w-sm items-center gap-2", children: [_jsx(Label, { htmlFor: "disabled-textarea", children: "Disabled textarea" }), _jsx(Textarea, { ...args, id: "disabled-textarea" })] })),
    args: {
        placeholder: 'This textarea is disabled',
        disabled: true,
    },
};
export const WithError = {
    render: (args) => (_jsxs("div", { className: "grid w-full max-w-sm items-center gap-2", children: [_jsx(Label, { htmlFor: "error-textarea", children: "Message *" }), _jsx(Textarea, { ...args, id: "error-textarea", className: "border-destructive" }), _jsx("p", { className: "text-xs text-destructive", children: "This field is required." })] })),
    args: {
        placeholder: 'Required field...',
    },
};
export const AutoResize = {
    render: (args) => (_jsxs("div", { className: "grid w-full max-w-md items-center gap-2", children: [_jsx(Label, { htmlFor: "auto-resize", children: "Auto-resizing textarea" }), _jsx(Textarea, { ...args, id: "auto-resize", className: "min-h-20 resize-none", onInput: (e) => {
                    const target = e.target;
                    target.style.height = 'auto';
                    target.style.height = target.scrollHeight + 'px';
                } }), _jsx("p", { className: "text-xs text-muted-foreground", children: "This textarea grows as you type." })] })),
    args: {
        placeholder: 'Start typing and watch me grow...',
        rows: 2,
    },
};
export const Sizes = {
    render: () => (_jsxs("div", { className: "grid w-full max-w-lg gap-4", children: [_jsxs("div", { children: [_jsx(Label, { children: "Small (2 rows)" }), _jsx(Textarea, { placeholder: "Small textarea...", rows: 2 })] }), _jsxs("div", { children: [_jsx(Label, { children: "Medium (4 rows)" }), _jsx(Textarea, { placeholder: "Medium textarea...", rows: 4 })] }), _jsxs("div", { children: [_jsx(Label, { children: "Large (8 rows)" }), _jsx(Textarea, { placeholder: "Large textarea...", rows: 8 })] })] })),
};
//# sourceMappingURL=textarea.stories.js.map