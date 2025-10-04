"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Card } from "../atoms/card";
import { Input } from "../atoms/input";
import { Badge } from "../atoms/badge";
import { Search, Star } from "lucide-react";
const categories = [
    { id: "all", name: "All Elements", icon: "🎨", color: "text-white" },
    { id: "interaction", name: "Interaction", icon: "🎮", color: "text-blue-500", description: "How users interact" },
    { id: "logic", name: "Logic", icon: "🧠", color: "text-purple-500", description: "Make it smart" },
    { id: "display", name: "Display", icon: "👁️", color: "text-green-500", description: "Show cool stuff" },
    { id: "data", name: "Data", icon: "💾", color: "text-orange-500", description: "Store & remember" },
    { id: "action", name: "Action", icon: "🚀", color: "text-pink-500", description: "Make things happen" },
    { id: "connect", name: "Connect", icon: "🔌", color: "text-cyan-500", description: "Link to world" },
];
const HiveLabElementLibrary = React.forwardRef(({ className, elements = [], selectedCategory = "all", onCategoryChange, onElementSelect, onToggleFavorite, searchQuery = "", onSearchChange, showFavoritesOnly = false, ...props }, ref) => {
    const [internalSearch, setInternalSearch] = React.useState("");
    const search = searchQuery || internalSearch;
    const setSearch = onSearchChange || setInternalSearch;
    // Filter elements
    const filteredElements = React.useMemo(() => {
        let filtered = elements;
        // Category filter
        if (selectedCategory !== "all") {
            filtered = filtered.filter((e) => e.category === selectedCategory);
        }
        // Search filter
        if (search) {
            filtered = filtered.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()) ||
                e.description.toLowerCase().includes(search.toLowerCase()));
        }
        // Favorites filter
        if (showFavoritesOnly) {
            filtered = filtered.filter((e) => e.isFavorite);
        }
        return filtered;
    }, [elements, selectedCategory, search, showFavoritesOnly]);
    // Group by category for display
    const groupedElements = React.useMemo(() => {
        return filteredElements.reduce((acc, element) => {
            if (!acc[element.category]) {
                acc[element.category] = [];
            }
            acc[element.category].push(element);
            return acc;
        }, {});
    }, [filteredElements]);
    return (_jsxs(Card, { ref: ref, className: cn("flex flex-col h-full", className), ...props, children: [_jsxs("div", { className: "p-4 border-b border-white/8", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("h3", { className: "text-sm font-semibold text-white", children: "Element Library" }), _jsxs(Badge, { variant: "freshman", className: "text-xs", children: [filteredElements.length, " elements"] })] }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/70" }), _jsx(Input, { placeholder: "Search elements...", value: search, onChange: (e) => setSearch(e.target.value), className: "pl-9 h-9 text-sm" })] })] }), _jsx("div", { className: "px-4 py-3 border-b border-white/8 overflow-x-auto", children: _jsx("div", { className: "flex gap-2", children: categories.map((category) => (_jsxs("button", { onClick: () => onCategoryChange?.(category.id), className: cn("px-3 py-1.5 rounded-md text-xs font-medium transition-all shrink-0", "hover:bg-white/10", selectedCategory === category.id
                            ? "bg-[#FFD700] text-black"
                            : "bg-white/10 text-white/70"), children: [_jsx("span", { className: "mr-1", children: category.icon }), category.name] }, category.id))) }) }), _jsxs("div", { className: "flex-1 overflow-y-auto p-4 space-y-4", children: [selectedCategory === "all" ? (
                    // Show grouped by category
                    _jsx(_Fragment, { children: categories.slice(1).map((category) => {
                            const categoryElements = groupedElements[category.id];
                            if (!categoryElements || categoryElements.length === 0)
                                return null;
                            return (_jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsxs("span", { className: cn("text-sm font-semibold", category.color), children: [category.icon, " ", category.name] }), _jsx(Badge, { variant: "sophomore", className: "h-5 px-1.5 text-xs", children: categoryElements.length })] }), _jsx("div", { className: "space-y-1", children: categoryElements.map((element) => (_jsx(ElementCard, { element: element, onSelect: onElementSelect, onToggleFavorite: onToggleFavorite }, element.id))) })] }, category.id));
                        }) })) : (
                    // Show flat list for specific category
                    _jsx("div", { className: "space-y-1", children: filteredElements.map((element) => (_jsx(ElementCard, { element: element, onSelect: onElementSelect, onToggleFavorite: onToggleFavorite }, element.id))) })), filteredElements.length === 0 && (_jsxs("div", { className: "flex flex-col items-center justify-center h-full text-center py-12", children: [_jsx("div", { className: "text-4xl mb-3", children: "\uD83D\uDD0D" }), _jsx("p", { className: "text-sm font-medium text-white mb-1", children: "No elements found" }), _jsx("p", { className: "text-xs text-white/70", children: "Try a different search or category" })] }))] }), _jsx("div", { className: "p-3 border-t border-white/8 bg-white/5", children: _jsx("p", { className: "text-[10px] text-white/70 text-center", children: "\uD83D\uDCA1 Drag elements to the canvas to build your tool" }) })] }));
});
HiveLabElementLibrary.displayName = "HiveLabElementLibrary";
const ElementCard = ({ element, onSelect, onToggleFavorite }) => {
    const handleDragStart = (e) => {
        e.dataTransfer.setData("application/json", JSON.stringify(element));
        e.dataTransfer.effectAllowed = "copy";
    };
    return (_jsxs("div", { draggable: true, onDragStart: handleDragStart, onClick: () => onSelect?.(element), className: cn("group relative flex items-center gap-3 p-2.5 rounded-lg", "border border-white/8 bg-[#0c0c0c]", "hover:bg-white/10 hover:border-[#FFD700]/50 transition-all cursor-grab active:cursor-grabbing", "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700]/20"), children: [_jsx("div", { className: "flex items-center justify-center w-8 h-8 rounded bg-white/10 shrink-0 text-lg group-hover:scale-110 transition-transform", children: element.icon }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("p", { className: "text-xs font-medium text-white truncate", children: element.name }), element.isNew && (_jsx(Badge, { variant: "freshman", className: "h-4 px-1 text-[9px] shrink-0", children: "NEW" })), element.complexity && element.complexity !== "simple" && (_jsx(Badge, { variant: "sophomore", className: "h-4 px-1 text-[9px] shrink-0", children: element.complexity === "advanced" ? "Advanced" : "Med" }))] }), _jsx("p", { className: "text-[10px] text-white/70 truncate", children: element.description })] }), _jsx("button", { onClick: (e) => {
                    e.stopPropagation();
                    onToggleFavorite?.(element.id);
                }, className: cn("shrink-0 p-1 rounded hover:bg-[#0c0c0c]/80 transition-colors", "opacity-0 group-hover:opacity-100", element.isFavorite && "opacity-100"), children: _jsx(Star, { className: cn("h-3.5 w-3.5", element.isFavorite ? "fill-yellow-500 text-yellow-500" : "text-white/70") }) })] }));
};
export { HiveLabElementLibrary };
//# sourceMappingURL=hivelab-element-library.js.map