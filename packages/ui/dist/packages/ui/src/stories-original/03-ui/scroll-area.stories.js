import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import { ScrollArea } from '../../components/ui/scroll-area';
import { Separator } from '../../components/ui/separator';
import { Badge } from '../../components/ui/badge';
const meta = {
    title: '03-UI/Scroll Area',
    component: ScrollArea,
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: 'A custom scrollable area component with styled scrollbars.',
            },
        },
    },
    tags: ['autodocs'],
};
export default meta;
export const Basic = {
    render: () => (_jsx(ScrollArea, { className: "h-72 w-48 rounded-md border p-4", children: _jsx("div", { className: "space-y-3", children: Array.from({ length: 50 }, (_, i) => (_jsxs("div", { className: "text-sm", children: ["Item ", i + 1, " - This is a scrollable item that demonstrates the scroll area component."] }, i))) }) })),
};
export const WithSeparators = {
    render: () => (_jsx(ScrollArea, { className: "h-72 w-48 rounded-md border", children: _jsxs("div", { className: "p-4", children: [_jsx("h4", { className: "mb-4 text-sm font-medium leading-none", children: "Tags" }), Array.from({ length: 50 }, (_, i) => (_jsxs("div", { children: [_jsxs("div", { className: "text-sm py-2", children: ["v1.2.", i] }), i < 49 && _jsx(Separator, {})] }, i)))] }) })),
};
export const HorizontalScroll = {
    render: () => (_jsx(ScrollArea, { className: "w-96 whitespace-nowrap rounded-md border", children: _jsx("div", { className: "flex w-max space-x-4 p-4", children: Array.from({ length: 20 }, (_, i) => (_jsxs("div", { className: "shrink-0 rounded-md border w-[150px] h-[100px] flex items-center justify-center bg-muted", children: ["Card ", i + 1] }, i))) }) })),
};
export const WithBadges = {
    render: () => (_jsx(ScrollArea, { className: "h-72 w-64 rounded-md border p-4", children: _jsx("div", { className: "space-y-2", children: Array.from({ length: 30 }, (_, i) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("span", { className: "text-sm", children: ["Feature ", i + 1] }), _jsx(Badge, { variant: i % 3 === 0 ? 'default' : i % 3 === 1 ? 'secondary' : 'outline', children: i % 3 === 0 ? 'Active' : i % 3 === 1 ? 'Pending' : 'Draft' })] }, i))) }) })),
};
export const LargeContent = {
    render: () => (_jsx(ScrollArea, { className: "h-100 w-150 rounded-md border p-4", children: _jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-lg font-semibold", children: "Large Content Area" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "This scroll area contains a lot of content to demonstrate scrolling behavior." }), Array.from({ length: 10 }, (_, sectionIndex) => (_jsxs("div", { className: "space-y-2", children: [_jsxs("h3", { className: "text-md font-medium", children: ["Section ", sectionIndex + 1] }), _jsx("div", { className: "grid grid-cols-2 gap-4", children: Array.from({ length: 8 }, (_, itemIndex) => (_jsxs("div", { className: "p-3 border rounded-md bg-muted/50", children: [_jsxs("h4", { className: "font-medium", children: ["Item ", itemIndex + 1] }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore." })] }, itemIndex))) }), sectionIndex < 9 && _jsx(Separator, { className: "my-4" })] }, sectionIndex)))] }) })),
};
export const KitchenSink = {
    render: () => (_jsxs("div", { className: "grid grid-cols-2 gap-6 p-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "text-sm font-medium", children: "Vertical Scroll" }), _jsx(ScrollArea, { className: "h-48 w-full rounded-md border p-4", children: _jsx("div", { className: "space-y-2", children: Array.from({ length: 25 }, (_, i) => (_jsxs("div", { className: "flex items-center justify-between p-2 hover:bg-muted rounded", children: [_jsxs("span", { className: "text-sm", children: ["Item ", i + 1] }), _jsx(Badge, { variant: "outline", children: "Tag" })] }, i))) }) })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("h3", { className: "text-sm font-medium", children: "Horizontal Scroll" }), _jsx(ScrollArea, { className: "w-full whitespace-nowrap rounded-md border", children: _jsx("div", { className: "flex w-max space-x-4 p-4", children: Array.from({ length: 10 }, (_, i) => (_jsx("div", { className: "shrink-0 w-32 h-20 rounded border flex items-center justify-center bg-muted", children: _jsxs("span", { className: "text-sm", children: ["Card ", i + 1] }) }, i))) }) })] }), _jsxs("div", { className: "col-span-2 space-y-2", children: [_jsx("h3", { className: "text-sm font-medium", children: "Mixed Content Scroll" }), _jsx(ScrollArea, { className: "h-64 w-full rounded-md border p-4", children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-2", children: "Text Section" }), _jsx("p", { className: "text-sm text-muted-foreground", children: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris." })] }), _jsx(Separator, {}), _jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-2", children: "List Items" }), _jsx("div", { className: "space-y-1", children: Array.from({ length: 15 }, (_, i) => (_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-primary" }), _jsxs("span", { className: "text-sm", children: ["List item ", i + 1] })] }, i))) })] }), _jsx(Separator, {}), _jsxs("div", { children: [_jsx("h4", { className: "font-medium mb-2", children: "Card Grid" }), _jsx("div", { className: "grid grid-cols-2 gap-3", children: Array.from({ length: 8 }, (_, i) => (_jsxs("div", { className: "p-3 border rounded bg-muted/30", children: [_jsxs("h5", { className: "font-medium text-sm", children: ["Card ", i + 1] }), _jsx("p", { className: "text-xs text-muted-foreground", children: "Card description" })] }, i))) })] })] }) })] })] })),
};
//# sourceMappingURL=scroll-area.stories.js.map