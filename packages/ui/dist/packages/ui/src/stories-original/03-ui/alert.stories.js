import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Alert } from '../../components';
const meta = {
    title: '03-UI/Alert',
    component: Alert,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A callout component for displaying important information to users.'
            }
        }
    },
    tags: ['autodocs'],
};
export default meta;
export const Default = {
    args: {
        children: 'This is a default alert message.',
    },
};
export const Destructive = {
    args: {
        variant: 'destructive',
        children: 'This is a destructive alert message.',
    },
};
export const WithTitle = {
    args: {
        children: (_jsxs(_Fragment, { children: [_jsx("h4", { className: "mb-1 font-medium leading-none tracking-tight", children: "Alert Title" }), _jsx("p", { className: "text-sm [&:not(:first-child)]:mt-6", children: "This alert has both a title and description." })] })),
    },
};
//# sourceMappingURL=alert.stories.js.map