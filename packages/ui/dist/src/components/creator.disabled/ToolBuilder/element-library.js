"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { useDrag } from "react-dnd";
import { cn } from "../../../lib/utils.js";
import { Button } from "../../../index.js";
import { Input } from "../../../index.js";
import { Badge } from "../../ui/badge.js";
import { Tabs, TabsList, TabsTrigger } from "../../ui/tabs.js";
import { ScrollArea } from "../../ui/scroll-area.js";
import { Search, Type, Image, Minus, Layers, MousePointer, ChevronDown, Clock, BarChart3, GitBranch, Zap, Sparkles, TrendingUp, } from "lucide-react";
const ElementIcon = ({ iconName, className, }) => {
    const iconMap = {
        Type: Type,
        Image: Image,
        Minus: Minus,
        Layers: Layers,
        MousePointer: MousePointer,
        ChevronDown: ChevronDown,
        Clock: Clock,
        BarChart3: BarChart3,
        GitBranch: GitBranch,
        Zap: Zap,
    };
    const IconComponent = iconMap[iconName] || Type;
    return _jsx(IconComponent, { className: className });
};
const DraggableElement = ({ element, onSelect, }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "element",
        item: { elementId: element.id, elementType: element.type },
        end: (item, monitor) => {
            const dropResult = monitor.getDropResult();
            if (item && dropResult) {
                onSelect(item.elementId, dropResult.position);
            }
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));
    const handleClick = () => {
        // Default position for click-to-add
        onSelect(element.id, { x: 100, y: 100 });
    };
    return (_jsxs("div", { ref: drag, onClick: handleClick, className: cn("group relative p-3 border rounded-lg cursor-pointer transition-all hover:border-primary hover:shadow-sm", "bg-card hover:bg-accent/50", isDragging && "opacity-50 scale-95"), children: [_jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "flex-shrink-0 p-2 rounded-md bg-primary/10 text-primary", children: _jsx(ElementIcon, { iconName: element.icon, className: "h-4 w-4" }) }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h4", { className: "font-medium text-sm truncate", children: element.name }), element.isOfficial && (_jsx(Badge, { variant: "secondary", className: "text-xs px-1 py-0", children: _jsx(Sparkles, { className: "h-3 w-3" }) }))] }), _jsx("p", { className: "text-xs text-muted-foreground line-clamp-2 mb-2", children: element.description }), _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(Badge, { variant: "outline", className: "text-xs", children: ["v", element.version] }), element.usageCount > 0 && (_jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [_jsx(TrendingUp, { className: "h-3 w-3" }), element.usageCount] }))] })] })] }), element.presets && element.presets.length > 0 && (_jsx("div", { className: "absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity", children: _jsxs(Badge, { variant: "secondary", className: "text-xs", children: [element.presets.length, " presets"] }) }))] }));
};
export const ElementLibrary = ({ elements, onElementSelect, searchQuery: initialSearchQuery, selectedCategory: initialSelectedCategory, className, }) => {
    const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
    const [selectedCategory, setSelectedCategory] = useState(initialSelectedCategory);
    // Filter and organize elements
    const { filteredElements, categorizedElements, popularElements } = useMemo(() => {
        let filtered = elements;
        // Filter by search query
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter((element) => element.name.toLowerCase().includes(query) ||
                element.description.toLowerCase().includes(query) ||
                element.type.toLowerCase().includes(query) ||
                element.presets?.some((preset) => preset.name.toLowerCase().includes(query) ||
                    preset.tags?.some((tag) => tag.toLowerCase().includes(query))));
        }
        // Filter by category
        if (selectedCategory !== "all") {
            filtered = filtered.filter((element) => element.category === selectedCategory);
        }
        // Categorize elements
        const categorized = {
            "Display & Layout": filtered.filter((el) => el.category === "Display & Layout"),
            "Inputs & Choices": filtered.filter((el) => el.category === "Inputs & Choices"),
            "Logic & Dynamics": filtered.filter((el) => el.category === "Logic & Dynamics"),
        };
        // Get popular elements (based on usage count and presets popularity)
        const popular = [...filtered]
            .sort((a, b) => {
            const aPopularity = (a.usageCount || 0) +
                (a.presets?.reduce((sum, p) => sum + (p.popularity || 0), 0) || 0);
            const bPopularity = (b.usageCount || 0) +
                (b.presets?.reduce((sum, p) => sum + (p.popularity || 0), 0) || 0);
            return bPopularity - aPopularity;
        })
            .slice(0, 6);
        return {
            filteredElements: filtered,
            categorizedElements: categorized,
            popularElements: popular,
        };
    }, [elements, searchQuery, selectedCategory]);
    // const categories: {
    //   id: ElementCategory | "all";
    //   label: string;
    //   count: number;
    // }[] = [
    //   { id: "all", label: "All Elements", count: elements.length },
    //   {
    //     id: "Display & Layout",
    //     label: "Display & Layout",
    //     count: categorizedElements["Display & Layout"].length,
    //   },
    //   {
    //     id: "Inputs & Choices",
    //     label: "Inputs & Choices",
    //     count: categorizedElements["Inputs & Choices"].length,
    //   },
    //   {
    //     id: "Logic & Dynamics",
    //     label: "Logic & Dynamics",
    //     count: categorizedElements["Logic & Dynamics"].length,
    //   },
    // ];
    return (_jsxs("div", { className: cn("flex flex-col h-full bg-card border-r", className), children: [_jsxs("div", { className: "p-4 border-b", children: [_jsx("h2", { className: "font-semibold text-lg mb-3", children: "Elements" }), _jsxs("div", { className: "relative mb-3", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" }), _jsx(Input, { placeholder: "Search elements...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), className: "pl-10" })] }), _jsxs(Tabs, { value: selectedCategory, onValueChange: (value) => setSelectedCategory(value), children: [_jsxs(TabsList, { className: "grid w-full grid-cols-2 h-auto", children: [_jsx(TabsTrigger, { value: "all", className: "text-xs", children: "All" }), _jsx(TabsTrigger, { value: "Display & Layout", className: "text-xs", children: "Display" })] }), _jsxs(TabsList, { className: "grid w-full grid-cols-2 h-auto mt-1", children: [_jsx(TabsTrigger, { value: "Inputs & Choices", className: "text-xs", children: "Inputs" }), _jsx(TabsTrigger, { value: "Logic & Dynamics", className: "text-xs", children: "Logic" })] })] })] }), _jsx(ScrollArea, { className: "flex-1", children: _jsxs("div", { className: "p-4 space-y-4", children: [selectedCategory === "all" &&
                            !searchQuery &&
                            popularElements.length > 0 && (_jsxs("div", { children: [_jsxs("h3", { className: "font-medium text-sm mb-3 flex items-center gap-2", children: [_jsx(Sparkles, { className: "h-4 w-4 text-yellow-500" }), "Popular"] }), _jsx("div", { className: "space-y-2", children: popularElements.map((element) => (_jsx(DraggableElement, { element: element, onSelect: onElementSelect }, element.id))) })] })), selectedCategory === "all" ? (
                        // Show all categories
                        Object.entries(categorizedElements).map(([category, categoryElements]) => categoryElements.length > 0 && (_jsxs("div", { children: [_jsx("h3", { className: "font-medium text-sm mb-3", children: category }), _jsx("div", { className: "space-y-2", children: categoryElements.map((element) => (_jsx(DraggableElement, { element: element, onSelect: onElementSelect }, element.id))) })] }, category)))) : (
                        // Show selected category
                        _jsx("div", { className: "space-y-2", children: filteredElements.map((element) => (_jsx(DraggableElement, { element: element, onSelect: onElementSelect }, element.id))) })), filteredElements.length === 0 && (_jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [_jsx(Search, { className: "h-8 w-8 mx-auto mb-2 opacity-50" }), _jsx("p", { className: "text-sm", children: "No elements found" }), searchQuery && (_jsx(Button, { variant: "ghost", size: "sm", onClick: () => setSearchQuery(""), className: "mt-2", children: "Clear search" }))] }))] }) }), _jsxs("div", { className: "p-4 border-t bg-muted/50", children: [_jsxs("div", { className: "text-xs text-muted-foreground text-center", children: [filteredElements.length, " of ", elements.length, " elements"] }), _jsx("div", { className: "text-xs text-muted-foreground text-center mt-1", children: "Drag to canvas or click to add" })] })] }));
};
export default ElementLibrary;
//# sourceMappingURL=element-library.js.map