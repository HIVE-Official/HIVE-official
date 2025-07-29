import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../../components/ui/resizable';
const meta = {
    title: '03-UI/Resizable',
    component: ResizablePanelGroup,
    parameters: {
        layout: 'padded',
        docs: {
            description: {
                component: `
**Resizable panel system for flexible layouts**

Advanced resizable panel components for creating flexible, user-customizable layouts. Perfect for Builder interfaces, Space layouts, and content organization.

## When to Use
- HiveLAB tool builder interface (canvas, library, properties)
- Space multi-surface layouts
- Dashboard with customizable sections
- Content viewing with adjustable sidebars

## Design Principles
- **Intuitive Interaction**: Clear resize handles with hover feedback
- **Smooth Motion**: Liquid metal physics for panel transitions
- **Visual Consistency**: HIVE's matte obsidian glass aesthetic
- **Productive Layouts**: Optimized for campus work and creation flows

## Panel Features
- **Flexible Sizing**: Percentage-based or fixed dimensions
- **Minimum/Maximum Constraints**: Prevent panels from becoming unusable
- **Nested Panels**: Complex layouts with multiple levels
- **Persistence**: Save user's preferred layout configurations

## Accessibility
- WCAG 2.1 AA compliant resize interactions
- Keyboard navigation for panel resizing
- Screen reader friendly panel labeling
- Clear visual feedback for resize operations
        `
            }
        }
    },
    tags: ['autodocs'],
    argTypes: {
        direction: {
            control: 'select',
            options: ['horizontal', 'vertical'],
            description: 'Panel group orientation'
        }
    }
};
export default meta;
export const HorizontalPanels = {
    render: () => (_jsx("div", { className: "h-96 w-full", children: _jsxs(ResizablePanelGroup, { direction: "horizontal", className: "h-full border border-hive-border rounded-lg", children: [_jsx(ResizablePanel, { defaultSize: 25, minSize: 15, maxSize: 40, children: _jsxs("div", { className: "p-6 h-full bg-hive-background-card", children: [_jsx("h3", { className: "font-semibold mb-2", children: "Left Panel" }), _jsx("p", { className: "text-sm text-hive-foreground-muted", children: "This panel can be resized horizontally. It has a minimum size of 15% and maximum of 40%." })] }) }), _jsx(ResizableHandle, {}), _jsx(ResizablePanel, { defaultSize: 75, children: _jsxs("div", { className: "p-6 h-full", children: [_jsx("h3", { className: "font-semibold mb-2", children: "Main Content" }), _jsx("p", { className: "text-sm text-hive-foreground-muted", children: "This is the main content area that takes up the remaining space. Drag the handle to the left to resize both panels." })] }) })] }) }))
};
export const VerticalPanels = {
    render: () => (_jsx("div", { className: "h-96 w-full", children: _jsxs(ResizablePanelGroup, { direction: "vertical", className: "h-full border border-hive-border rounded-lg", children: [_jsx(ResizablePanel, { defaultSize: 30, minSize: 20, children: _jsxs("div", { className: "p-6 h-full bg-hive-background-card", children: [_jsx("h3", { className: "font-semibold mb-2", children: "Top Panel" }), _jsx("p", { className: "text-sm text-hive-foreground-muted", children: "Resize vertically by dragging the handle below." })] }) }), _jsx(ResizableHandle, {}), _jsx(ResizablePanel, { defaultSize: 70, children: _jsxs("div", { className: "p-6 h-full", children: [_jsx("h3", { className: "font-semibold mb-2", children: "Bottom Panel" }), _jsx("p", { className: "text-sm text-hive-foreground-muted", children: "This panel takes up the remaining vertical space." })] }) })] }) }))
};
export const NestedPanels = {
    render: () => (_jsx("div", { className: "h-96 w-full", children: _jsxs(ResizablePanelGroup, { direction: "horizontal", className: "h-full border border-hive-border rounded-lg", children: [_jsx(ResizablePanel, { defaultSize: 25, minSize: 15, children: _jsxs("div", { className: "p-4 h-full bg-hive-background-card", children: [_jsx("h4", { className: "font-semibold mb-2", children: "Sidebar" }), _jsxs("div", { className: "space-y-2", children: [_jsx("div", { className: "p-2 bg-hive-background-muted rounded text-sm", children: "Navigation" }), _jsx("div", { className: "p-2 bg-hive-background-muted rounded text-sm", children: "Tools" }), _jsx("div", { className: "p-2 bg-hive-background-muted rounded text-sm", children: "Settings" })] })] }) }), _jsx(ResizableHandle, {}), _jsx(ResizablePanel, { defaultSize: 75, children: _jsxs(ResizablePanelGroup, { direction: "vertical", children: [_jsx(ResizablePanel, { defaultSize: 70, children: _jsxs("div", { className: "p-4 h-full", children: [_jsx("h4", { className: "font-semibold mb-2", children: "Main Content" }), _jsx("p", { className: "text-sm text-hive-foreground-muted", children: "This is the main content area with nested vertical panels." })] }) }), _jsx(ResizableHandle, {}), _jsx(ResizablePanel, { defaultSize: 30, minSize: 20, children: _jsxs("div", { className: "p-4 h-full bg-hive-background-card", children: [_jsx("h4", { className: "font-semibold mb-2", children: "Bottom Panel" }), _jsx("p", { className: "text-sm text-hive-foreground-muted", children: "Console, logs, or additional tools can go here." })] }) })] }) })] }) }))
};
export const HiveLabLayout = {
    render: () => (_jsx("div", { className: "h-96 w-full", children: _jsxs(ResizablePanelGroup, { direction: "horizontal", className: "h-full border border-hive-border rounded-lg", children: [_jsx(ResizablePanel, { defaultSize: 20, minSize: 15, maxSize: 30, children: _jsxs("div", { className: "p-4 h-full bg-hive-background-card border-r border-hive-border", children: [_jsx("h4", { className: "font-semibold mb-3 text-sm", children: "Element Library" }), _jsx("div", { className: "space-y-2", children: ['Timer ⏰', 'Chart 📊', 'Form 📋', 'Note 📝'].map((element, i) => (_jsx("div", { className: "p-2 bg-hive-background-muted rounded text-xs cursor-grab hover:bg-hive-background-subtle transition-colors", children: element }, i))) })] }) }), _jsx(ResizableHandle, {}), _jsx(ResizablePanel, { defaultSize: 60, children: _jsxs(ResizablePanelGroup, { direction: "vertical", children: [_jsx(ResizablePanel, { defaultSize: 75, children: _jsxs("div", { className: "p-4 h-full relative", children: [_jsxs("div", { className: "absolute top-2 left-4 right-4 flex items-center justify-between", children: [_jsx("h4", { className: "font-semibold text-sm", children: "Tool Canvas" }), _jsxs("div", { className: "flex gap-2", children: [_jsx("button", { className: "px-2 py-1 text-xs bg-hive-background-card border border-hive-border rounded", children: "Preview" }), _jsx("button", { className: "px-2 py-1 text-xs bg-hive-accent text-[var(--hive-background-primary)] rounded", children: "Save" })] })] }), _jsx("div", { className: "mt-8 h-full border-2 border-dashed border-hive-border rounded-lg flex items-center justify-center", children: _jsxs("div", { className: "text-center text-hive-foreground-muted", children: [_jsx("div", { className: "text-2xl mb-2", children: "\uD83C\uDFAF" }), _jsx("div", { className: "text-sm", children: "Drag elements here to build your tool" })] }) })] }) }), _jsx(ResizableHandle, {}), _jsx(ResizablePanel, { defaultSize: 25, minSize: 15, children: _jsxs("div", { className: "p-4 h-full bg-hive-background-card border-t border-hive-border", children: [_jsx("h4", { className: "font-semibold mb-2 text-sm", children: "Live Preview" }), _jsx("div", { className: "h-full bg-[var(--hive-text-primary)] rounded border text-[var(--hive-background-primary)] text-xs p-2", children: "Tool preview would appear here..." })] }) })] }) }), _jsx(ResizableHandle, {}), _jsx(ResizablePanel, { defaultSize: 20, minSize: 15, maxSize: 35, children: _jsxs("div", { className: "p-4 h-full bg-hive-background-card border-l border-hive-border", children: [_jsx("h4", { className: "font-semibold mb-3 text-sm", children: "Properties" }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { children: [_jsx("label", { className: "text-xs text-hive-foreground-muted", children: "Tool Name" }), _jsx("input", { className: "w-full mt-1 p-2 text-xs bg-hive-background border border-hive-border rounded", placeholder: "My Tool" })] }), _jsxs("div", { children: [_jsx("label", { className: "text-xs text-hive-foreground-muted", children: "Description" }), _jsx("textarea", { className: "w-full mt-1 p-2 text-xs bg-hive-background border border-hive-border rounded h-16", placeholder: "Tool description..." })] }), _jsxs("div", { children: [_jsx("label", { className: "text-xs text-hive-foreground-muted", children: "Category" }), _jsxs("select", { className: "w-full mt-1 p-2 text-xs bg-hive-background border border-hive-border rounded", children: [_jsx("option", { children: "Productivity" }), _jsx("option", { children: "Academic" }), _jsx("option", { children: "Social" })] })] })] })] }) })] }) }))
};
export const SpaceLayout = {
    render: () => (_jsx("div", { className: "h-96 w-full", children: _jsxs(ResizablePanelGroup, { direction: "horizontal", className: "h-full border border-hive-border rounded-lg", children: [_jsx(ResizablePanel, { defaultSize: 15, minSize: 12, maxSize: 25, children: _jsxs("div", { className: "p-3 h-full bg-hive-background-card border-r border-hive-border", children: [_jsx("h4", { className: "font-semibold mb-3 text-sm", children: "Surfaces" }), _jsx("div", { className: "space-y-1", children: ['Pinned 📌', 'Posts 📝', 'Events 📅', 'Tools 🔧', 'Chat 💬', 'Members 👥'].map((surface, i) => (_jsx("div", { className: `p-2 rounded text-xs cursor-pointer transition-colors ${i === 1 ? 'bg-hive-accent text-[var(--hive-background-primary)]' : 'hover:bg-hive-background-muted'}`, children: surface }, i))) })] }) }), _jsx(ResizableHandle, {}), _jsx(ResizablePanel, { defaultSize: 65, children: _jsxs("div", { className: "p-4 h-full", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsx("h4", { className: "font-semibold", children: "Posts Surface" }), _jsx("button", { className: "px-3 py-1 text-xs bg-hive-accent text-[var(--hive-background-primary)] rounded", children: "New Post" })] }), _jsx("div", { className: "space-y-3", children: [1, 2, 3].map(i => (_jsxs("div", { className: "p-3 bg-hive-background-card border border-hive-border rounded", children: [_jsxs("div", { className: "text-sm font-medium mb-1", children: ["Post Title ", i] }), _jsx("div", { className: "text-xs text-hive-foreground-muted", children: "Posted 2 hours ago by Student Name" })] }, i))) })] }) }), _jsx(ResizableHandle, {}), _jsx(ResizablePanel, { defaultSize: 20, minSize: 15, maxSize: 35, children: _jsxs("div", { className: "p-3 h-full bg-hive-background-card border-l border-hive-border", children: [_jsx("h4", { className: "font-semibold mb-3 text-sm", children: "Live Chat" }), _jsxs("div", { className: "space-y-2 text-xs", children: [_jsxs("div", { className: "p-2 bg-hive-background-muted rounded", children: [_jsx("div", { className: "font-medium", children: "Alice:" }), _jsx("div", { children: "Anyone working on the algorithms assignment?" })] }), _jsxs("div", { className: "p-2 bg-hive-background-muted rounded", children: [_jsx("div", { className: "font-medium", children: "Bob:" }), _jsx("div", { children: "Yes! Check out my study timer tool" })] })] }), _jsx("div", { className: "absolute bottom-3 right-3 left-3", children: _jsx("input", { className: "w-full p-2 text-xs bg-hive-background border border-hive-border rounded", placeholder: "Type a message..." }) })] }) })] }) }))
};
export const ResponsiveLayout = {
    render: () => {
        const [isMobile, setIsMobile] = useState(false);
        return (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("button", { onClick: () => setIsMobile(false), className: `px-3 py-1 text-sm rounded ${!isMobile ? 'bg-hive-accent text-[var(--hive-background-primary)]' : 'bg-hive-background-card border border-hive-border'}`, children: "Desktop" }), _jsx("button", { onClick: () => setIsMobile(true), className: `px-3 py-1 text-sm rounded ${isMobile ? 'bg-hive-accent text-[var(--hive-background-primary)]' : 'bg-hive-background-card border border-hive-border'}`, children: "Mobile" })] }), _jsx("div", { className: `h-96 ${isMobile ? 'max-w-sm' : 'w-full'}`, children: isMobile ? (_jsx("div", { className: "h-full border border-hive-border rounded-lg", children: _jsxs("div", { className: "p-4 h-full", children: [_jsx("h4", { className: "font-semibold mb-2", children: "Mobile Layout" }), _jsx("p", { className: "text-sm text-hive-foreground-muted", children: "On mobile, panels stack vertically instead of being resizable horizontally." })] }) })) : (_jsxs(ResizablePanelGroup, { direction: "horizontal", className: "h-full border border-hive-border rounded-lg", children: [_jsx(ResizablePanel, { defaultSize: 30, children: _jsxs("div", { className: "p-4 h-full bg-hive-background-card", children: [_jsx("h4", { className: "font-semibold mb-2", children: "Sidebar" }), _jsx("p", { className: "text-sm text-hive-foreground-muted", children: "Desktop layout with resizable panels." })] }) }), _jsx(ResizableHandle, {}), _jsx(ResizablePanel, { defaultSize: 70, children: _jsxs("div", { className: "p-4 h-full", children: [_jsx("h4", { className: "font-semibold mb-2", children: "Main Content" }), _jsx("p", { className: "text-sm text-hive-foreground-muted", children: "Switch to mobile to see the responsive behavior." })] }) })] })) })] }));
    }
};
//# sourceMappingURL=resizable.stories.js.map