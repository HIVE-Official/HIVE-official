import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { Grid } from '../../components/Grid';
import { Box } from '../../components/Box';
const meta = {
    title: '02-Layout/Grid',
    component: Grid,
    tags: ['autodocs'],
};
export default meta;
const content = (_jsxs(_Fragment, { children: [_jsx(Box, { className: "p-4 bg-bg-card rounded-lg", children: "Item 1" }), _jsx(Box, { className: "p-4 bg-bg-card rounded-lg", children: "Item 2" }), _jsx(Box, { className: "p-4 bg-bg-card rounded-lg", children: "Item 3" }), _jsx(Box, { className: "p-4 bg-bg-card rounded-lg", children: "Item 4" }), _jsx(Box, { className: "p-4 bg-bg-card rounded-lg", children: "Item 5" }), _jsx(Box, { className: "p-4 bg-bg-card rounded-lg", children: "Item 6" })] }));
export const Default = {
    args: {
        cols: 3,
        gap: 4,
        children: content,
    },
};
//# sourceMappingURL=grid.stories.js.map