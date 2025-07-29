import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Switch, Label } from '../../components';
const meta = {
    title: '03-UI/Switch',
    component: Switch,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A control that allows the user to toggle between checked and not checked.'
            }
        }
    },
    tags: ['autodocs'],
};
export default meta;
export const Default = {
    args: {},
};
export const Checked = {
    args: {
        defaultChecked: true,
    },
};
export const Disabled = {
    args: {
        disabled: true,
    },
};
export const WithLabel = {
    render: () => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Switch, { id: "airplane-mode" }), _jsx(Label, { htmlFor: "airplane-mode", children: "Airplane Mode" })] })),
};
export const FormExample = {
    render: () => (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "notifications", className: "text-sm font-medium", children: "Push Notifications" }), _jsx(Switch, { id: "notifications" })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "analytics", className: "text-sm font-medium", children: "Analytics" }), _jsx(Switch, { id: "analytics", defaultChecked: true })] }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { htmlFor: "marketing", className: "text-sm font-medium", children: "Marketing Emails" }), _jsx(Switch, { id: "marketing", disabled: true })] })] })),
};
//# sourceMappingURL=switch.stories.js.map