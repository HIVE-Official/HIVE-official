import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
// Use specific imports to avoid conflicts
import { AlertDialog, ScrollArea, Tabs } from '../../components/ui';
import { Avatar } from '../../atomic/atoms/avatar';
import { Switch } from '../../atomic/atoms/switch';
import { Textarea } from '../../atomic/atoms/textarea';
import { Alert } from '../../components/alert';
import { Label } from '../../atomic/atoms/label';
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from '../../components/ui/resizable';
import { DropdownMenu } from '../../components/ui/dropdown-menu';
import { Settings, Download, Upload, User, FileText, X } from 'lucide-react';
// Placeholder components for components that don't exist yet
const HiveSelect = ({ children, variant, multiple, ...props }) => (_jsx("select", { className: "w-full px-3 py-2 bg-charcoal border border-steel rounded-lg text-platinum focus:border-gold focus:outline-none", ...props, children: children }));
const HiveModal = ({ children, open, onClose, size = 'md' }) => {
    if (!open)
        return null;
    return (_jsx("div", { className: "fixed inset-0 z-50 flex items-center justify-center bg-[var(--hive-background-primary)]/80", children: _jsx("div", { className: `bg-charcoal rounded-lg border border-steel ${size === 'sm' ? 'max-w-sm' : size === 'lg' ? 'max-w-2xl' : 'max-w-md'} w-full mx-4`, children: children }) }));
};
HiveModal.Header = ({ children }) => (_jsx("div", { className: "flex items-center justify-between p-6 border-b border-steel", children: children }));
HiveModal.Body = ({ children }) => (_jsx("div", { className: "p-6", children: children }));
HiveModal.Footer = ({ children }) => (_jsx("div", { className: "flex items-center justify-end gap-3 p-6 border-t border-steel", children: children }));
const HiveTable = ({ data = [], columns = [], variant, pagination, search, selection, onRowClick }) => (_jsx("div", { className: "bg-charcoal rounded-lg border border-steel overflow-hidden", children: _jsxs("table", { className: "w-full", children: [_jsx("thead", { className: "bg-graphite", children: _jsx("tr", { children: columns?.map((col, idx) => (_jsx("th", { className: "text-left p-4 text-silver font-medium", children: col.header }, idx))) }) }), _jsx("tbody", { children: data?.map((row, idx) => (_jsx("tr", { className: "border-t border-steel hover:bg-graphite", children: columns?.map((col, colIdx) => (_jsx("td", { className: "p-4 text-platinum", children: col.render ? col.render(row[col.key]) : row[col.key] }, colIdx))) }, idx))) })] }) }));
const HiveProgress = ({ value = 0, variant = 'default', type = 'linear', size = 'md', indeterminate }) => {
    if (type === 'circular') {
        const sizeClass = size === 'sm' ? 'w-8 h-8' : size === 'lg' ? 'w-16 h-16' : 'w-12 h-12';
        return (_jsxs("div", { className: `${sizeClass} relative`, children: [_jsxs("svg", { className: "w-full h-full transform -rotate-90", viewBox: "0 0 100 100", children: [_jsx("circle", { cx: "50", cy: "50", r: "40", stroke: "currentColor", strokeWidth: "8", fill: "transparent", className: "text-steel" }), _jsx("circle", { cx: "50", cy: "50", r: "40", stroke: "currentColor", strokeWidth: "8", fill: "transparent", strokeDasharray: `${2 * Math.PI * 40}`, strokeDashoffset: `${2 * Math.PI * 40 * (1 - value / 100)}`, className: variant === 'gold' ? 'text-gold' : variant === 'success' ? 'text-emerald' : 'text-sapphire' })] }), _jsxs("div", { className: "absolute inset-0 flex items-center justify-center text-platinum text-sm font-medium", children: [value, "%"] })] }));
    }
    return (_jsx("div", { className: "w-full bg-[var(--hive-border-default)] rounded-full h-2", children: _jsx("div", { className: `h-2 rounded-full transition-all duration-300 ${variant === 'gold' ? 'bg-gold' : variant === 'success' ? 'bg-emerald' : 'bg-sapphire'} ${indeterminate ? 'animate-pulse' : ''}`, style: { width: indeterminate ? '100%' : `${value}%` } }) }));
};
const HiveFileUpload = ({ onFileSelect, acceptedTypes, maxSize, multiple, variant, preview, size }) => (_jsxs("div", { className: `border-2 border-dashed border-steel rounded-lg p-8 text-center hover:border-gold transition-colors ${size === 'sm' ? 'p-4' : ''}`, children: [_jsx("div", { className: "text-mercury mb-2", children: variant === 'minimal' ? 'Upload file' : 'Drag & drop files here, or click to select' }), _jsx("input", { type: "file", className: "hidden", multiple: multiple, accept: acceptedTypes?.join(',') }), _jsx("button", { className: "px-4 py-2 bg-gold text-obsidian rounded-lg font-medium", children: "Choose Files" })] }));
const HiveCharts = ({ type, data, options, height }) => (_jsxs("div", { className: "bg-obsidian rounded-lg flex items-center justify-center text-mercury", style: { height: height || 300 }, children: [type.toUpperCase(), " Chart Placeholder", _jsxs("div", { className: "ml-2 text-xs", children: ["(", data?.labels?.length || 0, " data points)"] })] }));
const HiveMenu = ({ trigger, items }) => (_jsx("div", { className: "relative inline-block", children: trigger }));
const meta = {
    title: '01-Foundation/Foundation Components',
    parameters: {
        docs: {
            description: {
                component: 'Complete foundation components for building HIVE applications',
            },
        },
    },
};
export default meta;
// Mock data
const mockTableData = [
    { id: 1, name: 'John Smith', role: 'Designer', status: 'Active', lastSeen: '2m ago' },
    { id: 2, name: 'Sarah Chen', role: 'Developer', status: 'Active', lastSeen: '5m ago' },
    { id: 3, name: 'Alex Johnson', role: 'Product Manager', status: 'Away', lastSeen: '1h ago' },
    { id: 4, name: 'Jordan Kim', role: 'Designer', status: 'Offline', lastSeen: '3h ago' },
];
const mockChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        {
            label: 'Tools Created',
            data: [12, 19, 3, 5, 2, 3],
            borderColor: 'var(--hive-brand-secondary)', // HIVE gold
            backgroundColor: 'color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent)', // gold overlay
        },
        {
            label: 'Users Active',
            data: [2, 3, 20, 5, 1, 4],
            borderColor: 'rgb(59, 130, 246)', // sapphire
            backgroundColor: 'rgba(59, 130, 246, 0.1)', // sapphire overlay
        },
    ],
};
// HIVE Select
export const SelectComponent = {
    render: () => (_jsxs("div", { className: "p-8 bg-obsidian min-h-screen", children: [_jsx("h1", { className: "text-4xl font-bold text-platinum mb-8", children: "HIVE Select" }), _jsxs("div", { className: "max-w-2xl space-y-6", children: [_jsxs("div", { children: [_jsx(Label, { className: "text-silver mb-2 block", children: "Default Select" }), _jsxs(HiveSelect, { children: [_jsx("option", { value: "", children: "Choose an option..." }), _jsx("option", { value: "design", children: "Design" }), _jsx("option", { value: "development", children: "Development" }), _jsx("option", { value: "product", children: "Product" }), _jsx("option", { value: "marketing", children: "Marketing" })] })] }), _jsxs("div", { children: [_jsx(Label, { className: "text-silver mb-2 block", children: "Multi-select" }), _jsxs(HiveSelect, { multiple: true, variant: "glass", children: [_jsx("option", { value: "react", children: "React" }), _jsx("option", { value: "vue", children: "Vue" }), _jsx("option", { value: "angular", children: "Angular" }), _jsx("option", { value: "svelte", children: "Svelte" })] })] }), _jsxs("div", { children: [_jsx(Label, { className: "text-silver mb-2 block", children: "Gold Variant" }), _jsxs(HiveSelect, { variant: "gold", children: [_jsx("option", { value: "", children: "Premium options..." }), _jsx("option", { value: "pro", children: "Professional" }), _jsx("option", { value: "enterprise", children: "Enterprise" }), _jsx("option", { value: "custom", children: "Custom" })] })] })] })] })),
};
// HIVE Modal
export const ModalComponent = {
    render: () => (_jsxs("div", { className: "p-8 bg-obsidian min-h-screen", children: [_jsx("h1", { className: "text-4xl font-bold text-platinum mb-8", children: "HIVE Modal" }), _jsxs("div", { className: "space-y-6", children: [_jsxs("div", { className: "flex gap-4", children: [_jsx("button", { className: "px-4 py-2 bg-gold text-obsidian rounded-lg font-medium", children: "Open Basic Modal" }), _jsx("button", { className: "px-4 py-2 bg-charcoal border border-steel text-platinum rounded-lg font-medium", children: "Open Form Modal" }), _jsx("button", { className: "px-4 py-2 bg-[var(--hive-status-error)] text-[var(--hive-text-primary)] rounded-lg font-medium", children: "Open Confirmation" })] }), _jsxs("div", { className: "bg-charcoal p-6 rounded-lg border border-steel", children: [_jsx("h3", { className: "text-lg font-medium text-platinum mb-3", children: "Modal Preview" }), _jsx("div", { className: "bg-obsidian/80 p-8 rounded-lg border border-steel backdrop-blur-sm", children: _jsxs(HiveModal, { open: true, onClose: () => { }, size: "md", children: [_jsxs(HiveModal.Header, { children: [_jsx("h2", { className: "text-xl font-semibold text-platinum", children: "Create New Tool" }), _jsx("button", { className: "text-mercury hover:text-platinum", children: _jsx(X, { className: "w-5 h-5" }) })] }), _jsx(HiveModal.Body, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx(Label, { className: "text-silver mb-2 block", children: "Tool Name" }), _jsx("input", { type: "text", className: "w-full px-3 py-2 bg-graphite border border-steel rounded-lg text-platinum", placeholder: "Enter tool name..." })] }), _jsxs("div", { children: [_jsx(Label, { className: "text-silver mb-2 block", children: "Description" }), _jsx(Textarea, { className: "w-full px-3 py-2 bg-graphite border border-steel rounded-lg text-platinum", placeholder: "Describe your tool...", rows: 3 })] })] }) }), _jsxs(HiveModal.Footer, { children: [_jsx("button", { className: "px-4 py-2 text-silver hover:text-platinum", children: "Cancel" }), _jsx("button", { className: "px-4 py-2 bg-gold text-obsidian rounded-lg font-medium", children: "Create Tool" })] })] }) })] })] })] })),
};
// HIVE Table
export const TableComponent = {
    render: () => (_jsxs("div", { className: "p-8 bg-obsidian min-h-screen", children: [_jsx("h1", { className: "text-4xl font-bold text-platinum mb-8", children: "HIVE Table" }), _jsxs("div", { className: "space-y-8", children: [_jsx(HiveTable, { data: mockTableData, columns: [
                            { key: 'name', header: 'Name', sortable: true },
                            { key: 'role', header: 'Role', sortable: true },
                            {
                                key: 'status',
                                header: 'Status',
                                render: (value) => (_jsx("span", { className: `px-2 py-1 rounded-full text-xs ${value === 'Active' ? 'bg-emerald/20 text-emerald' :
                                        value === 'Away' ? 'bg-[var(--hive-status-warning)]/20 text-[var(--hive-status-warning)]' :
                                            'bg-[#6B7280]/20 text-[#6B7280]'}`, children: value }))
                            },
                            { key: 'lastSeen', header: 'Last Seen' },
                        ], variant: "glass", pagination: { pageSize: 10, showPagination: true }, search: { enabled: true, placeholder: 'Search members...' }, selection: { enabled: true, multiple: true }, onRowClick: (row) => console.log('Row clicked:', row) }), _jsxs("div", { className: "bg-charcoal p-6 rounded-lg border border-steel", children: [_jsx("h3", { className: "text-lg font-medium text-platinum mb-3", children: "Table Features" }), _jsxs("ul", { className: "text-silver space-y-2", children: [_jsx("li", { children: "\u2022 Sortable columns with custom sort functions" }), _jsx("li", { children: "\u2022 Search and filter with real-time results" }), _jsx("li", { children: "\u2022 Row selection (single and multiple)" }), _jsx("li", { children: "\u2022 Pagination with customizable page sizes" }), _jsx("li", { children: "\u2022 Custom cell renderers and formatters" }), _jsx("li", { children: "\u2022 Responsive design with horizontal scroll" })] })] })] })] })),
};
// HIVE Progress
export const ProgressComponent = {
    render: () => (_jsxs("div", { className: "p-8 bg-obsidian min-h-screen", children: [_jsx("h1", { className: "text-4xl font-bold text-platinum mb-8", children: "HIVE Progress" }), _jsxs("div", { className: "max-w-2xl space-y-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-platinum mb-4", children: "Linear Progress" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm text-silver mb-1", children: [_jsx("span", { children: "Tool Creation" }), _jsx("span", { children: "75%" })] }), _jsx(HiveProgress, { value: 75, variant: "default" })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm text-silver mb-1", children: [_jsx("span", { children: "Upload Progress" }), _jsx("span", { children: "45%" })] }), _jsx(HiveProgress, { value: 45, variant: "gold" })] }), _jsxs("div", { children: [_jsxs("div", { className: "flex justify-between text-sm text-silver mb-1", children: [_jsx("span", { children: "Success Rate" }), _jsx("span", { children: "90%" })] }), _jsx(HiveProgress, { value: 90, variant: "success" })] })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-platinum mb-4", children: "Circular Progress" }), _jsxs("div", { className: "flex gap-8", children: [_jsx(HiveProgress, { type: "circular", value: 65, size: "sm" }), _jsx(HiveProgress, { type: "circular", value: 85, size: "md", variant: "gold" }), _jsx(HiveProgress, { type: "circular", value: 95, size: "lg", variant: "success" })] })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-platinum mb-4", children: "Indeterminate" }), _jsx(HiveProgress, { indeterminate: true, variant: "glass" })] })] })] })),
};
// HIVE File Upload
export const FileUploadComponent = {
    render: () => (_jsxs("div", { className: "p-8 bg-obsidian min-h-screen", children: [_jsx("h1", { className: "text-4xl font-bold text-platinum mb-8", children: "HIVE File Upload" }), _jsxs("div", { className: "max-w-2xl space-y-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-platinum mb-4", children: "Drag & Drop Upload" }), _jsx(HiveFileUpload, { onFileSelect: (files) => console.log('Files selected:', files), acceptedTypes: ['image/*', '.pdf', '.doc', '.docx'], maxSize: 10 * 1024 * 1024, multiple: true, variant: "default" })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-platinum mb-4", children: "Gold Variant" }), _jsx(HiveFileUpload, { onFileSelect: (files) => console.log('Files selected:', files), acceptedTypes: ['image/*'], maxSize: 5 * 1024 * 1024, variant: "gold", preview: true })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-platinum mb-4", children: "Compact Upload" }), _jsx(HiveFileUpload, { onFileSelect: (files) => console.log('Files selected:', files), variant: "minimal", size: "sm", multiple: false })] })] })] })),
};
// HIVE Charts
export const ChartsComponent = {
    render: () => (_jsxs("div", { className: "p-8 bg-obsidian min-h-screen", children: [_jsx("h1", { className: "text-4xl font-bold text-platinum mb-8", children: "HIVE Charts" }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-8", children: [_jsxs("div", { className: "bg-charcoal p-6 rounded-lg border border-steel", children: [_jsx("h3", { className: "text-lg font-medium text-platinum mb-4", children: "Line Chart" }), _jsx(HiveCharts, { type: "line", data: mockChartData, options: {
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    theme: 'dark',
                                }, height: 300 })] }), _jsxs("div", { className: "bg-charcoal p-6 rounded-lg border border-steel", children: [_jsx("h3", { className: "text-lg font-medium text-platinum mb-4", children: "Bar Chart" }), _jsx(HiveCharts, { type: "bar", data: mockChartData, options: {
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    theme: 'dark',
                                }, height: 300 })] }), _jsxs("div", { className: "bg-charcoal p-6 rounded-lg border border-steel", children: [_jsx("h3", { className: "text-lg font-medium text-platinum mb-4", children: "Pie Chart" }), _jsx(HiveCharts, { type: "pie", data: {
                                    labels: ['Design', 'Development', 'Product', 'Marketing'],
                                    datasets: [{
                                            data: [35, 30, 20, 15],
                                            backgroundColor: ['var(--hive-brand-secondary)', 'var(--hive-status-info)', 'var(--hive-status-success)', 'var(--hive-status-warning)'],
                                        }]
                                }, height: 300 })] }), _jsxs("div", { className: "bg-charcoal p-6 rounded-lg border border-steel", children: [_jsx("h3", { className: "text-lg font-medium text-platinum mb-4", children: "Area Chart" }), _jsx(HiveCharts, { type: "area", data: mockChartData, options: {
                                    responsive: true,
                                    maintainAspectRatio: false,
                                    theme: 'dark',
                                    fill: true,
                                }, height: 300 })] })] })] })),
};
// HIVE Menu
export const MenuComponent = {
    render: () => (_jsxs("div", { className: "p-8 bg-obsidian min-h-screen", children: [_jsx("h1", { className: "text-4xl font-bold text-platinum mb-8", children: "HIVE Menu" }), _jsxs("div", { className: "space-y-8", children: [_jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-platinum mb-4", children: "Context Menu" }), _jsx("div", { className: "bg-charcoal p-6 rounded-lg border border-steel", children: _jsx(HiveMenu, { trigger: _jsx("button", { className: "px-4 py-2 bg-gold text-obsidian rounded-lg font-medium", children: "Right-click for menu" }), items: [
                                        { label: 'Edit', icon: _jsx(Settings, { className: "w-4 h-4" }), shortcut: 'Cmd+E' },
                                        { label: 'Duplicate', icon: _jsx(FileText, { className: "w-4 h-4" }), shortcut: 'Cmd+D' },
                                        { type: 'separator' },
                                        { label: 'Download', icon: _jsx(Download, { className: "w-4 h-4" }), shortcut: 'Cmd+S' },
                                        { label: 'Share', icon: _jsx(Upload, { className: "w-4 h-4" }) },
                                        { type: 'separator' },
                                        { label: 'Delete', destructive: true, shortcut: 'Del' },
                                    ] }) })] }), _jsxs("div", { children: [_jsx("h3", { className: "text-lg font-medium text-platinum mb-4", children: "Dropdown Menu" }), _jsx("div", { className: "bg-charcoal p-6 rounded-lg border border-steel", children: _jsxs(DropdownMenu, { children: [_jsx(DropdownMenu.Trigger, { asChild: true, children: _jsx("button", { className: "px-4 py-2 bg-charcoal border border-steel text-platinum rounded-lg font-medium", children: "Actions" }) }), _jsxs(DropdownMenu.Content, { children: [_jsxs(DropdownMenu.Item, { children: [_jsx(User, { className: "w-4 h-4 mr-2" }), "Profile"] }), _jsxs(DropdownMenu.Item, { children: [_jsx(Settings, { className: "w-4 h-4 mr-2" }), "Settings"] }), _jsx(DropdownMenu.Separator, {}), _jsx(DropdownMenu.Item, { className: "text-[var(--hive-status-error)]", children: "Sign out" })] })] }) })] })] })] })),
};
// Shadcn UI Components
export const ShadcnComponents = {
    render: () => (_jsxs("div", { className: "p-8 bg-obsidian min-h-screen", children: [_jsx("h1", { className: "text-4xl font-bold text-platinum mb-8", children: "Foundation UI Components" }), _jsxs("div", { className: "space-y-12", children: [_jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-semibold text-platinum mb-6", children: "Alert Dialog" }), _jsx("div", { className: "bg-charcoal p-6 rounded-lg border border-steel", children: _jsxs(AlertDialog, { children: [_jsx(AlertDialog.Trigger, { asChild: true, children: _jsx("button", { className: "px-4 py-2 bg-[var(--hive-status-error)] text-[var(--hive-text-primary)] rounded-lg", children: "Delete Item" }) }), _jsxs(AlertDialog.Content, { children: [_jsxs(AlertDialog.Header, { children: [_jsx(AlertDialog.Title, { children: "Are you sure?" }), _jsx(AlertDialog.Description, { children: "This action cannot be undone. This will permanently delete the item." })] }), _jsxs(AlertDialog.Footer, { children: [_jsx(AlertDialog.Cancel, { children: "Cancel" }), _jsx(AlertDialog.Action, { className: "bg-[var(--hive-status-error)]", children: "Delete" })] })] })] }) })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-semibold text-platinum mb-6", children: "Tabs" }), _jsx("div", { className: "bg-charcoal p-6 rounded-lg border border-steel", children: _jsxs(Tabs, { defaultValue: "overview", className: "w-full", children: [_jsxs(Tabs.List, { className: "grid w-full grid-cols-3", children: [_jsx(Tabs.Trigger, { value: "overview", children: "Overview" }), _jsx(Tabs.Trigger, { value: "analytics", children: "Analytics" }), _jsx(Tabs.Trigger, { value: "settings", children: "Settings" })] }), _jsx(Tabs.Content, { value: "overview", className: "mt-6", children: _jsx("div", { className: "text-silver", children: "Overview content goes here..." }) }), _jsx(Tabs.Content, { value: "analytics", className: "mt-6", children: _jsx("div", { className: "text-silver", children: "Analytics content goes here..." }) }), _jsx(Tabs.Content, { value: "settings", className: "mt-6", children: _jsx("div", { className: "text-silver", children: "Settings content goes here..." }) })] }) })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-semibold text-platinum mb-6", children: "Switch & Avatar" }), _jsxs("div", { className: "bg-charcoal p-6 rounded-lg border border-steel space-y-6", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx(Switch, {}), _jsx(Label, { className: "text-silver", children: "Enable notifications" })] }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs(Avatar, { children: [_jsx(Avatar.Image, { src: "/avatar-demo.jpg" }), _jsx(Avatar.Fallback, { children: "JD" })] }), _jsxs("div", { children: [_jsx("div", { className: "text-platinum font-medium", children: "John Doe" }), _jsx("div", { className: "text-mercury text-sm", children: "john@example.com" })] })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-semibold text-platinum mb-6", children: "Scroll Area & Resizable" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { className: "bg-charcoal p-6 rounded-lg border border-steel", children: [_jsx("h3", { className: "text-lg font-medium text-platinum mb-3", children: "Scroll Area" }), _jsx(ScrollArea, { className: "h-48 w-full border border-steel rounded-lg p-4", children: Array.from({ length: 20 }, (_, i) => (_jsxs("div", { className: "py-2 text-silver", children: ["Scrollable item ", i + 1] }, i))) })] }), _jsxs("div", { className: "bg-charcoal p-6 rounded-lg border border-steel", children: [_jsx("h3", { className: "text-lg font-medium text-platinum mb-3", children: "Resizable Panel" }), _jsxs(ResizablePanelGroup, { direction: "horizontal", className: "h-48 border border-steel rounded-lg", children: [_jsx(ResizablePanel, { defaultSize: 50, children: _jsx("div", { className: "p-4 text-silver", children: "Panel 1" }) }), _jsx(ResizableHandle, {}), _jsx(ResizablePanel, { defaultSize: 50, children: _jsx("div", { className: "p-4 text-silver", children: "Panel 2" }) })] })] })] })] }), _jsxs("section", { children: [_jsx("h2", { className: "text-2xl font-semibold text-platinum mb-6", children: "Alert" }), _jsxs("div", { className: "space-y-4", children: [_jsx(Alert, { children: _jsx(AlertDialog.Description, { children: "This is a default alert message." }) }), _jsx(Alert, { variant: "destructive", children: _jsx(AlertDialog.Description, { children: "This is an error alert message." }) })] })] })] })] })),
};
//# sourceMappingURL=foundation-components.stories.js.map