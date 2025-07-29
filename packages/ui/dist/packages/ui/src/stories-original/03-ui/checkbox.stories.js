import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Checkbox, Label } from '../../components';
const meta = {
    title: '03-UI/Checkbox',
    component: Checkbox,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A checkbox component for binary choices with labels and states.',
            },
        },
    },
    tags: ['autodocs'],
};
export default meta;
export const Default = {
    render: () => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "terms" }), _jsx(Label, { htmlFor: "terms", children: "Accept terms and conditions" })] })),
};
export const Checked = {
    render: () => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "checked", defaultChecked: true }), _jsx(Label, { htmlFor: "checked", children: "Checked by default" })] })),
};
export const Disabled = {
    render: () => (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "disabled", disabled: true }), _jsx(Label, { htmlFor: "disabled", children: "Disabled checkbox" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "disabled-checked", disabled: true, defaultChecked: true }), _jsx(Label, { htmlFor: "disabled-checked", children: "Disabled and checked" })] })] })),
};
export const WithLongLabels = {
    render: () => (_jsxs("div", { className: "space-y-4 max-w-md", children: [_jsxs("div", { className: "flex items-start space-x-2", children: [_jsx(Checkbox, { id: "long1", className: "mt-1" }), _jsx(Label, { htmlFor: "long1", className: "text-sm", children: "I agree to the terms of service and privacy policy. By checking this box, I acknowledge that I have read and understood all the terms and conditions." })] }), _jsxs("div", { className: "flex items-start space-x-2", children: [_jsx(Checkbox, { id: "long2", className: "mt-1" }), _jsx(Label, { htmlFor: "long2", className: "text-sm", children: "Send me promotional emails and marketing communications about new features, updates, and special offers." })] })] })),
};
export const FormExample = {
    render: () => (_jsxs("div", { className: "space-y-6 p-6 border rounded-lg bg-muted/50 max-w-md", children: [_jsx("h3", { className: "text-lg font-medium", children: "Account Preferences" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "notifications", defaultChecked: true }), _jsx(Label, { htmlFor: "notifications", children: "Email notifications" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "newsletter" }), _jsx(Label, { htmlFor: "newsletter", children: "Subscribe to newsletter" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "marketing" }), _jsx(Label, { htmlFor: "marketing", children: "Marketing communications" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "security", defaultChecked: true, disabled: true }), _jsx(Label, { htmlFor: "security", children: "Security alerts (required)" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "beta" }), _jsx(Label, { htmlFor: "beta", children: "Beta features access" })] })] })] })),
};
export const KitchenSink = {
    render: () => (_jsxs("div", { className: "grid grid-cols-2 gap-8 p-6", children: [_jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-medium", children: "Basic States" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "unchecked" }), _jsx(Label, { htmlFor: "unchecked", children: "Unchecked" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "checked-demo", defaultChecked: true }), _jsx(Label, { htmlFor: "checked-demo", children: "Checked" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "indeterminate" }), _jsx(Label, { htmlFor: "indeterminate", children: "Indeterminate (manual)" })] })] })] }), _jsxs("div", { className: "space-y-4", children: [_jsx("h4", { className: "font-medium", children: "Disabled States" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "disabled-unchecked", disabled: true }), _jsx(Label, { htmlFor: "disabled-unchecked", children: "Disabled unchecked" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: "disabled-checked-demo", disabled: true, defaultChecked: true }), _jsx(Label, { htmlFor: "disabled-checked-demo", children: "Disabled checked" })] })] })] }), _jsxs("div", { className: "col-span-2 space-y-4", children: [_jsx("h4", { className: "font-medium", children: "Grouped Options" }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h5", { className: "text-sm font-medium", children: "Features" }), _jsx("div", { className: "space-y-2", children: ['Dark mode', 'Auto-save', 'Spell check', 'Smart suggestions'].map((feature, i) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: `feature-${i}`, defaultChecked: i % 2 === 0 }), _jsx(Label, { htmlFor: `feature-${i}`, className: "text-sm", children: feature })] }, i))) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h5", { className: "text-sm font-medium", children: "Notifications" }), _jsx("div", { className: "space-y-2", children: ['Push notifications', 'Email updates', 'SMS alerts', 'In-app messages'].map((notif, i) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Checkbox, { id: `notif-${i}`, defaultChecked: i === 0 }), _jsx(Label, { htmlFor: `notif-${i}`, className: "text-sm", children: notif })] }, i))) })] })] })] })] })),
};
//# sourceMappingURL=checkbox.stories.js.map