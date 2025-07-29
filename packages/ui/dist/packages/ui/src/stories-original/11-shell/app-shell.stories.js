import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppShell } from '../../components/shell/app-shell';
const meta = {
    title: '11-Shell/App Shell',
    component: AppShell,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Main application shell providing layout structure and navigation.'
            }
        }
    },
    tags: ['autodocs'],
};
export default meta;
export const Default = {
    args: {
        children: (_jsxs("div", { className: "p-6", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Welcome to Hive" }), _jsx("p", { className: "text-muted-foreground", children: "This is the main content area within the app shell." })] })),
    },
};
export const WithSidebar = {
    args: {
        showSidebar: true,
        children: (_jsxs("div", { className: "p-6", children: [_jsx("h1", { className: "text-2xl font-bold mb-4", children: "Dashboard" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6", children: [_jsxs("div", { className: "rounded-lg border p-4", children: [_jsx("h3", { className: "font-semibold mb-2", children: "Metric 1" }), _jsx("p", { className: "text-2xl font-bold", children: "123" })] }), _jsxs("div", { className: "rounded-lg border p-4", children: [_jsx("h3", { className: "font-semibold mb-2", children: "Metric 2" }), _jsx("p", { className: "text-2xl font-bold", children: "456" })] }), _jsxs("div", { className: "rounded-lg border p-4", children: [_jsx("h3", { className: "font-semibold mb-2", children: "Metric 3" }), _jsx("p", { className: "text-2xl font-bold", children: "789" })] })] })] })),
    },
};
export const Loading = {
    args: {
        loading: true,
        children: (_jsx("div", { className: "p-6", children: _jsxs("div", { className: "animate-pulse space-y-4", children: [_jsx("div", { className: "h-8 bg-gray-200 rounded w-1/4" }), _jsx("div", { className: "h-4 bg-gray-200 rounded w-1/2" }), _jsx("div", { className: "h-4 bg-gray-200 rounded w-3/4" })] }) })),
    },
};
//# sourceMappingURL=app-shell.stories.js.map