"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../atoms/card";
import { Button } from "../atoms/button";
import { Badge } from "../atoms/badge";
import { Grid } from "../atoms/grid";
import { HiveProgress } from "../atoms/hive-progress";
const CompleteHIVEToolsSystem = React.forwardRef(({ tools, onToolSelect, onToolCreate, onToolEdit, onToolDelete, onToolDuplicate, className, showCreateButton = true, showSearch = true, showFilters = true, ...props }, ref) => {
    const [searchQuery, setSearchQuery] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState("all");
    const [selectedStatus, setSelectedStatus] = React.useState("all");
    // Filter tools based on search and filters
    const filteredTools = React.useMemo(() => {
        return tools.filter(tool => {
            const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                tool.description.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "all" || tool.category === selectedCategory;
            const matchesStatus = selectedStatus === "all" || tool.status === selectedStatus;
            return matchesSearch && matchesCategory && matchesStatus;
        });
    }, [tools, searchQuery, selectedCategory, selectedStatus]);
    // Get unique categories
    const categories = React.useMemo(() => {
        const cats = Array.from(new Set(tools.map(tool => tool.category)));
        return ["all", ...cats];
    }, [tools]);
    const getStatusColor = (status) => {
        switch (status) {
            case 'published': return 'success';
            case 'draft': return 'warning';
            case 'archived': return 'secondary';
            default: return 'default';
        }
    };
    const getComplexityColor = (complexity) => {
        switch (complexity) {
            case 'beginner': return 'success';
            case 'intermediate': return 'warning';
            case 'advanced': return 'destructive';
            default: return 'default';
        }
    };
    return (_jsxs("div", { ref: ref, className: cn("w-full space-y-6", className), ...props, children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-bold text-[var(--hive-text-primary)]", children: "HIVE Tools System" }), _jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "Manage and explore tools in your HIVE workspace" })] }), showCreateButton && onToolCreate && (_jsx(Button, { onClick: onToolCreate, variant: "default", children: "Create New Tool" }))] }), (showSearch || showFilters) && (_jsx(Card, { children: _jsx(CardContent, { className: "p-4", children: _jsxs("div", { className: "flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4", children: [showSearch && (_jsx("div", { className: "flex-1", children: _jsx("input", { type: "text", placeholder: "Search tools...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "w-full px-3 py-2 border border-[var(--hive-border-default)] rounded-md bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)] placeholder-[var(--hive-text-placeholder)] focus:outline-none focus:ring-2 focus:ring-[var(--hive-interactive-focus)]" }) })), showFilters && (_jsxs("div", { className: "flex space-x-2", children: [_jsx("select", { value: selectedCategory, onChange: (e) => setSelectedCategory(e.target.value), className: "px-3 py-2 border border-[var(--hive-border-default)] rounded-md bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]", children: categories.map(category => (_jsx("option", { value: category, children: category === "all" ? "All Categories" : category }, category))) }), _jsxs("select", { value: selectedStatus, onChange: (e) => setSelectedStatus(e.target.value), className: "px-3 py-2 border border-[var(--hive-border-default)] rounded-md bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]", children: [_jsx("option", { value: "all", children: "All Status" }), _jsx("option", { value: "published", children: "Published" }), _jsx("option", { value: "draft", children: "Draft" }), _jsx("option", { value: "archived", children: "Archived" })] })] }))] }) }) })), _jsx(Grid, { columns: "auto-fit", gap: 6, className: "min-h-", children: filteredTools.map((tool) => (_jsxs(Card, { className: "h-full flex flex-col", children: [_jsxs(CardHeader, { children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(CardTitle, { className: "text-lg", children: tool.name }), _jsxs("div", { className: "flex space-x-1", children: [_jsx(Badge, { variant: getStatusColor(tool.status), children: tool.status }), _jsx(Badge, { variant: getComplexityColor(tool.complexity), children: tool.complexity })] })] }), _jsx(CardDescription, { children: tool.description })] }), _jsxs(CardContent, { className: "flex-1 flex flex-col", children: [_jsxs("div", { className: "space-y-3 flex-1", children: [_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Usage" }), _jsx("span", { className: "font-medium", children: tool.usage })] }), _jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-[var(--hive-text-secondary)]", children: "Rating" }), _jsxs("span", { className: "font-medium", children: [tool.rating, "/5"] })] }), _jsx(HiveProgress, { value: tool.rating * 20, max: 100 })] }), _jsxs("div", { className: "flex flex-wrap gap-1", children: [tool.tags.slice(0, 3).map((tag) => (_jsx(Badge, { variant: "outline", className: "text-xs", children: tag }, tag))), tool.tags.length > 3 && (_jsxs(Badge, { variant: "outline", className: "text-xs", children: ["+", tool.tags.length - 3] }))] })] }), _jsxs("div", { className: "flex space-x-2 mt-4", children: [onToolSelect && (_jsx(Button, { variant: "outline", size: "sm", onClick: () => onToolSelect(tool), className: "flex-1", children: "Open" })), onToolEdit && (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => onToolEdit(tool), children: "Edit" }))] })] })] }, tool.id))) }), filteredTools.length === 0 && (_jsx(Card, { children: _jsxs(CardContent, { className: "p-8 text-center", children: [_jsx("p", { className: "text-[var(--hive-text-secondary)]", children: "No tools found matching your criteria." }), showCreateButton && onToolCreate && (_jsx(Button, { onClick: onToolCreate, variant: "outline", className: "mt-4", children: "Create Your First Tool" }))] }) }))] }));
});
CompleteHIVEToolsSystem.displayName = "CompleteHIVEToolsSystem";
export { CompleteHIVEToolsSystem };
//# sourceMappingURL=complete-hive-tools-system.js.map