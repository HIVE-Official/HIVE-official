"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Card } from "../atoms/card";
import { Input } from "../atoms/input";
import { Badge } from "../atoms/badge";
import { Button } from "../atoms/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../atoms/tabs";
import { Search, TrendingUp, Copy, Users, Clock, Sparkles } from "lucide-react";
const categories = [
    { id: "all", name: "All Templates", icon: "🎨" },
    { id: "academic", name: "Academic", icon: "📚" },
    { id: "social", name: "Social", icon: "🎉" },
    { id: "greek-life", name: "Greek Life", icon: "🏛️" },
    { id: "residential", name: "Residential", icon: "🏠" },
    { id: "career", name: "Career", icon: "💼" },
    { id: "wellness", name: "Wellness", icon: "💚" },
];
const HiveLabTemplateBrowser = React.forwardRef(({ className, templates = [], onTemplateSelect, onForkTemplate, onDeployTemplate, searchQuery = "", onSearchChange, isLeader = false, ...props }, ref) => {
    const [internalSearch, setInternalSearch] = React.useState("");
    const [selectedCategory, setSelectedCategory] = React.useState("all");
    const search = searchQuery || internalSearch;
    const setSearch = onSearchChange || setInternalSearch;
    // Filter templates
    const filteredTemplates = React.useMemo(() => {
        let filtered = templates;
        // Category filter
        if (selectedCategory !== "all") {
            filtered = filtered.filter((t) => t.category === selectedCategory);
        }
        // Search filter
        if (search) {
            filtered = filtered.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()) ||
                t.description.toLowerCase().includes(search.toLowerCase()) ||
                t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())));
        }
        return filtered;
    }, [templates, selectedCategory, search]);
    // Group templates
    const trending = filteredTemplates.filter((t) => t.isTrending).slice(0, 6);
    const newTemplates = filteredTemplates.filter((t) => t.isNew).slice(0, 6);
    const mostForked = [...filteredTemplates]
        .sort((a, b) => b.forksCount - a.forksCount)
        .slice(0, 6);
    const quickBuilds = filteredTemplates
        .filter((t) => t.complexity === "simple")
        .slice(0, 6);
    return (_jsxs(Card, { ref: ref, className: cn("flex flex-col h-full", className), ...props, children: [_jsxs("div", { className: "p-6 border-b border-white/8", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-xl font-bold text-white", children: "Template Marketplace" }), _jsx("p", { className: "text-sm text-white/70", children: "60-second deploy \u00B7 Fork and customize" })] }), _jsxs(Badge, { variant: "outline", className: "text-xs", children: [filteredTemplates.length, " templates"] })] }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" }), _jsx(Input, { placeholder: "Search templates or problems...", value: search, onChange: (e) => setSearch(e.target.value), className: "pl-9 h-10" })] })] }), _jsxs(Tabs, { defaultValue: "discover", className: "flex-1 flex flex-col", children: [_jsxs(TabsList, { className: "grid w-full grid-cols-4 mx-6 mt-4", children: [_jsx(TabsTrigger, { value: "discover", children: "Discover" }), _jsx(TabsTrigger, { value: "trending", children: "Trending" }), _jsx(TabsTrigger, { value: "categories", children: "Categories" }), _jsx(TabsTrigger, { value: "new", children: "New" })] }), _jsxs(TabsContent, { value: "discover", className: "flex-1 overflow-y-auto p-6 space-y-6", children: [_jsx(Section, { title: "Trending This Week", icon: _jsx(TrendingUp, { className: "h-4 w-4" }), templates: trending, onTemplateSelect: onTemplateSelect, onForkTemplate: onForkTemplate, onDeployTemplate: onDeployTemplate }), _jsx(Section, { title: "5-Minute Builds", icon: _jsx(Clock, { className: "h-4 w-4" }), description: "Simple tools, big impact", templates: quickBuilds, onTemplateSelect: onTemplateSelect, onForkTemplate: onForkTemplate, onDeployTemplate: onDeployTemplate }), _jsx(Section, { title: "Most Forked", icon: _jsx(Copy, { className: "h-4 w-4" }), description: "Community favorites", templates: mostForked, onTemplateSelect: onTemplateSelect, onForkTemplate: onForkTemplate, onDeployTemplate: onDeployTemplate })] }), _jsx(TabsContent, { value: "trending", className: "flex-1 overflow-y-auto p-6", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: trending.map((template) => (_jsx(TemplateCard, { template: template, onSelect: onTemplateSelect, onFork: onForkTemplate, onDeploy: onDeployTemplate }, template.id))) }) }), _jsx(TabsContent, { value: "categories", className: "flex-1 overflow-y-auto p-6 space-y-6", children: categories.slice(1).map((category) => {
                            const categoryTemplates = filteredTemplates
                                .filter((t) => t.category === category.id)
                                .slice(0, 3);
                            if (categoryTemplates.length === 0)
                                return null;
                            return (_jsx(Section, { title: category.name, icon: _jsx("span", { className: "text-lg", children: category.icon }), templates: categoryTemplates, onTemplateSelect: onTemplateSelect, onForkTemplate: onForkTemplate, onDeployTemplate: onDeployTemplate }, category.id));
                        }) }), _jsx(TabsContent, { value: "new", className: "flex-1 overflow-y-auto p-6", children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: newTemplates.map((template) => (_jsx(TemplateCard, { template: template, onSelect: onTemplateSelect, onFork: onForkTemplate, onDeploy: onDeployTemplate }, template.id))) }) })] }), _jsx("div", { className: "p-4 border-t border-white/8 bg-white/5", children: _jsx("p", { className: "text-xs text-white/70 text-center", children: "\uD83D\uDCA1 All templates are fully customizable \u00B7 Fork and make it your own" }) })] }));
});
HiveLabTemplateBrowser.displayName = "HiveLabTemplateBrowser";
const Section = ({ title, icon, description, templates, onTemplateSelect, onForkTemplate, onDeployTemplate, }) => {
    if (templates.length === 0)
        return null;
    return (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [icon, _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-semibold text-white", children: title }), description && (_jsx("p", { className: "text-xs text-white/70", children: description }))] })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: templates.map((template) => (_jsx(TemplateCard, { template: template, onSelect: onTemplateSelect, onFork: onForkTemplate, onDeploy: onDeployTemplate }, template.id))) })] }));
};
const TemplateCard = ({ template, onSelect, onFork, onDeploy, }) => {
    return (_jsx(Card, { className: cn("group relative overflow-hidden transition-all hover:shadow-lg cursor-pointer", "border border-white/8 hover:border-[#FFD700]/50"), onClick: () => onSelect?.(template), children: _jsxs("div", { className: "p-4 space-y-3", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "text-2xl", children: template.icon }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsx("h4", { className: "text-sm font-semibold text-white truncate", children: template.name }), _jsxs("p", { className: "text-xs text-white/70", children: ["by ", template.creatorName] })] })] }), template.isTrending && (_jsxs(Badge, { variant: "default", className: "h-5 px-1.5 text-[9px]", children: [_jsx(TrendingUp, { className: "h-3 w-3 mr-0.5" }), "HOT"] })), template.isNew && (_jsxs(Badge, { variant: "default", className: "h-5 px-1.5 text-[9px]", children: [_jsx(Sparkles, { className: "h-3 w-3 mr-0.5" }), "NEW"] }))] }), _jsx("p", { className: "text-xs text-white/70 line-clamp-2", children: template.description }), _jsxs("div", { className: "flex items-center gap-3 text-xs text-white/70", children: [_jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Users, { className: "h-3 w-3" }), _jsxs("span", { children: [template.deploysCount, " deploys"] })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(Copy, { className: "h-3 w-3" }), _jsxs("span", { children: [template.forksCount, " forks"] })] })] }), template.responseRate && (_jsx("div", { className: "pt-2 border-t border-white/8", children: _jsxs("div", { className: "flex items-center justify-between text-xs", children: [_jsx("span", { className: "text-white/70", children: "Success Rate" }), _jsxs("span", { className: "font-semibold text-green-500", children: [template.responseRate, "% response"] })] }) })), _jsxs("div", { className: "flex flex-wrap gap-1", children: [template.tags.slice(0, 3).map((tag, idx) => (_jsx(Badge, { variant: "secondary", className: "h-5 px-1.5 text-[9px]", children: tag }, idx))), _jsxs(Badge, { variant: "outline", className: "h-5 px-1.5 text-[9px]", children: [template.elementCount, " elements"] })] }), _jsxs("div", { className: "flex gap-2 pt-2", children: [_jsx(Button, { size: "sm", className: "flex-1 h-7 text-xs", onClick: (e) => {
                                e.stopPropagation();
                                onDeploy?.(template.id);
                            }, children: "Quick Deploy" }), _jsx(Button, { size: "sm", variant: "outline", className: "h-7 px-2", onClick: (e) => {
                                e.stopPropagation();
                                onFork?.(template.id);
                            }, children: _jsx(Copy, { className: "h-3 w-3" }) })] })] }) }));
};
export { HiveLabTemplateBrowser };
//# sourceMappingURL=hivelab-template-browser.js.map