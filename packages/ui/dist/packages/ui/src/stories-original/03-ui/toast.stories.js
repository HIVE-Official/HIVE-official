import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Toast, ToastAction, ToastClose, ToastDescription, ToastProvider, ToastTitle, ToastViewport } from '../../components';
import { CheckCircle, XCircle } from 'lucide-react';
const meta = {
    title: '03-UI/Toast',
    component: Toast,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'Toast notification components for user feedback.',
            },
        },
    },
    tags: ['autodocs'],
};
export default meta;
export const Default = {
    render: () => (_jsxs(ToastProvider, { children: [_jsxs(Toast, { children: [_jsxs("div", { className: "grid gap-1", children: [_jsx(ToastTitle, { children: "Scheduled: Catch up" }), _jsx(ToastDescription, { children: "Friday, February 10, 2023 at 5:57 PM" })] }), _jsx(ToastClose, {})] }), _jsx(ToastViewport, {})] })),
};
export const WithAction = {
    render: () => (_jsxs(ToastProvider, { children: [_jsxs(Toast, { children: [_jsxs("div", { className: "grid gap-1", children: [_jsx(ToastTitle, { children: "Uh oh! Something went wrong." }), _jsx(ToastDescription, { children: "There was a problem with your request." })] }), _jsx(ToastAction, { altText: "Try again", children: "Try again" })] }), _jsx(ToastViewport, {})] })),
};
export const Destructive = {
    render: () => (_jsxs(ToastProvider, { children: [_jsxs(Toast, { variant: "destructive", children: [_jsxs("div", { className: "grid gap-1", children: [_jsx(ToastTitle, { children: "Uh oh! Something went wrong." }), _jsx(ToastDescription, { children: "There was a problem with your request." })] }), _jsx(ToastAction, { altText: "Try again", children: "Try again" })] }), _jsx(ToastViewport, {})] })),
};
export const WithIcons = {
    render: () => (_jsxs(ToastProvider, { children: [_jsxs("div", { className: "space-y-4", children: [_jsxs(Toast, { children: [_jsxs("div", { className: "grid gap-1", children: [_jsxs(ToastTitle, { className: "flex items-center gap-2", children: [_jsx(CheckCircle, { className: "h-4 w-4 text-green-500" }), "Success"] }), _jsx(ToastDescription, { children: "Your changes have been saved successfully." })] }), _jsx(ToastClose, {})] }), _jsxs(Toast, { variant: "destructive", children: [_jsxs("div", { className: "grid gap-1", children: [_jsxs(ToastTitle, { className: "flex items-center gap-2", children: [_jsx(XCircle, { className: "h-4 w-4" }), "Error"] }), _jsx(ToastDescription, { children: "Failed to save changes. Please try again." })] }), _jsx(ToastAction, { altText: "Retry", children: "Retry" })] })] }), _jsx(ToastViewport, {})] })),
};
//# sourceMappingURL=toast.stories.js.map