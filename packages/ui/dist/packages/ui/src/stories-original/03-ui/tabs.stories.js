import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components';
const meta = {
    title: '03-UI/Tabs',
    component: Tabs,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A set of layered sections of content—known as tab panels—that are displayed one at a time.'
            }
        }
    },
    tags: ['autodocs'],
};
export default meta;
export const Default = {
    render: () => (_jsxs(Tabs, { defaultValue: "account", className: "w-100", children: [_jsxs(TabsList, { children: [_jsx(TabsTrigger, { value: "account", children: "Account" }), _jsx(TabsTrigger, { value: "password", children: "Password" })] }), _jsx(TabsContent, { value: "account", children: _jsx("p", { className: "text-sm text-muted-foreground", children: "Make changes to your account here. Click save when you're done." }) }), _jsx(TabsContent, { value: "password", children: _jsx("p", { className: "text-sm text-muted-foreground", children: "Change your password here. After saving, you'll be logged out." }) })] })),
};
export const WithCards = {
    render: () => (_jsxs(Tabs, { defaultValue: "overview", className: "w-150", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-3", children: [_jsx(TabsTrigger, { value: "overview", children: "Overview" }), _jsx(TabsTrigger, { value: "analytics", children: "Analytics" }), _jsx(TabsTrigger, { value: "reports", children: "Reports" })] }), _jsx(TabsContent, { value: "overview", className: "space-y-4", children: _jsxs("div", { className: "rounded-lg border p-4", children: [_jsx("h3", { className: "font-semibold", children: "Overview Content" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Here's an overview of your dashboard metrics and activity." })] }) }), _jsx(TabsContent, { value: "analytics", className: "space-y-4", children: _jsxs("div", { className: "rounded-lg border p-4", children: [_jsx("h3", { className: "font-semibold", children: "Analytics" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Detailed analytics and insights about your data." })] }) }), _jsx(TabsContent, { value: "reports", className: "space-y-4", children: _jsxs("div", { className: "rounded-lg border p-4", children: [_jsx("h3", { className: "font-semibold", children: "Reports" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Generate and view comprehensive reports." })] }) })] })),
};
//# sourceMappingURL=tabs.stories.js.map