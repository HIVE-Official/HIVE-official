import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Stack } from '../../components/Stack';
import { Box } from '../../components/Box';
const meta = {
    title: '02-Layout/Stack',
    component: Stack,
    tags: ['autodocs'],
};
export default meta;
const content = (_jsxs(_Fragment, { children: [_jsx(Box, { className: "p-4 bg-bg-card rounded-lg", children: "Item 1" }), _jsx(Box, { className: "p-4 bg-bg-card rounded-lg", children: "Item 2" }), _jsx(Box, { className: "p-4 bg-bg-card rounded-lg", children: "Item 3" })] }));
export const Vertical = {
    args: {
        direction: 'col',
        gap: 4,
        children: content,
    },
};
export const Horizontal = {
    args: {
        direction: 'row',
        gap: 4,
        children: content,
    },
};
//# sourceMappingURL=stack.stories.js.map