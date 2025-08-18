"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useMemo } from "react";
import { Button } from "../button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../card";
import { Input } from "../input";
import { Label } from "../label";
import { Textarea } from "../textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import { Badge } from "../badge";
import { Loader2, Search, Users, Plus, Sparkles, GraduationCap, BookOpen, Coffee, Code } from "lucide-react";
// Space categories for better organization - HIVE monochrome system
const SPACE_CATEGORIES = [
    { value: "academic", label: "Academic", icon: GraduationCap, color: "text-muted" },
    { value: "study", label: "Study Groups", icon: BookOpen, color: "text-muted" },
    { value: "social", label: "Social", icon: Coffee, color: "text-muted" },
    { value: "project", label: "Projects", icon: Code, color: "text-muted" },
];
// Popular space suggestions based on category
const POPULAR_SPACES = {
    academic: [
        { name: "CS 161: Computer Security", members: 247, description: "Study group for algorithms and data structures", verified: true },
        { name: "Psychology 101", members: 156, description: "Introduction to Psychology study group", verified: true },
        { name: "Engineering Physics", members: 89, description: "Collaborative problem solving", verified: false },
    ],
    study: [
        { name: "Finals Prep Squad", members: 312, description: "Cross-campus study sessions", verified: false },
        { name: "Library Study Group", members: 178, description: "Quiet study meetups", verified: false },
        { name: "Coffee & Cramming", members: 234, description: "Casual study cafe meetups", verified: false },
    ],
    social: [
        { name: "Campus Gamers", members: 445, description: "Gaming and esports community", verified: false },
        { name: "International Students", members: 567, description: "Global community on campus", verified: true },
        { name: "Music Lovers", members: 289, description: "Share and discover music together", verified: false },
    ],
    project: [
        { name: "Startup Founders", members: 123, description: "Build the next big thing", verified: false },
        { name: "Open Source Club", members: 167, description: "Contribute to open source projects", verified: true },
        { name: "Design Collective", members: 198, description: "UI/UX and graphic design projects", verified: false },
    ],
};
export const SpaceSelectionStep = ({ initialData = {}, onSubmit, onSkip, }) => {
    const [mode, setMode] = useState("browse");
    const [selectedCategory, setSelectedCategory] = useState(initialData.spaceCategory || "academic");
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedSpace, setSelectedSpace] = useState(initialData.selectedSpace || null);
    const [customSpaceName, setCustomSpaceName] = useState(initialData.customSpaceName || "");
    const [customSpaceDescription, setCustomSpaceDescription] = useState(initialData.customSpaceDescription || "");
    const [isLoading, setIsLoading] = useState(false);
    // Filter spaces based on search query
    const filteredSpaces = useMemo(() => {
        const categorySpaces = POPULAR_SPACES[selectedCategory] || [];
        if (!searchQuery)
            return categorySpaces;
        return categorySpaces.filter(space => space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            space.description.toLowerCase().includes(searchQuery.toLowerCase()));
    }, [selectedCategory, searchQuery]);
    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            if (mode === "browse" && selectedSpace) {
                await onSubmit({
                    mode: "join",
                    spaceCategory: selectedCategory,
                    selectedSpace,
                });
            }
            else if (mode === "create" && customSpaceName && customSpaceDescription) {
                await onSubmit({
                    mode: "create",
                    spaceCategory: selectedCategory,
                    customSpaceName,
                    customSpaceDescription,
                });
            }
        }
        catch (error) {
            console.error("Failed to submit space selection", error);
            setIsLoading(false);
        }
    };
    const handleSkip = () => {
        if (onSkip) {
            onSkip();
        }
    };
    return (_jsxs(Card, { className: "w-full max-w-2xl bg-card border-border", children: [_jsxs(CardHeader, { className: "text-center space-y-2", children: [_jsx("div", { className: "w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto", children: _jsx(Users, { className: "w-6 h-6 text-accent" }) }), _jsx(CardTitle, { className: "text-xl font-display text-card-foreground", children: "Find Your Community" }), _jsx(CardDescription, { className: "text-muted-foreground font-sans", children: "Join existing spaces or create your own to connect with like-minded students" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "flex gap-2 p-1 bg-surface-01 rounded-lg", children: [_jsxs(Button, { type: "button", variant: mode === "browse" ? "default" : "surface", onClick: () => setMode("browse"), className: "flex-1", children: [_jsx(Search, { className: "w-4 h-4 mr-2" }), "Browse Spaces"] }), _jsxs(Button, { type: "button", variant: mode === "create" ? "default" : "surface", onClick: () => setMode("create"), className: "flex-1", children: [_jsx(Plus, { className: "w-4 h-4 mr-2" }), "Create New"] })] }), mode === "browse" ? (_jsxs(_Fragment, { children: [_jsxs("div", { className: "space-y-3", children: [_jsx(Label, { className: "text-sm font-medium text-card-foreground", children: "Category" }), _jsx("div", { className: "grid grid-cols-2 md:grid-cols-4 gap-2", children: SPACE_CATEGORIES.map((category) => {
                                            const Icon = category.icon;
                                            return (_jsxs(Button, { type: "button", variant: selectedCategory === category.value ? "accent" : "outline", onClick: () => setSelectedCategory(category.value), className: "h-16 flex flex-col gap-1", children: [_jsx(Icon, { className: `w-5 h-5 ${selectedCategory === category.value ? 'text-background' : category.color}` }), _jsx("span", { className: "text-xs", children: category.label })] }, category.value));
                                        }) })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { className: "text-sm font-medium text-card-foreground", children: "Search Spaces" }), _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" }), _jsx(Input, { value: searchQuery, onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search by name or description...", className: "pl-10" })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { className: "text-sm font-medium text-card-foreground", children: "Available Spaces" }), _jsxs("span", { className: "text-xs text-muted-foreground", children: [filteredSpaces.length, " spaces found"] })] }), _jsx("div", { className: "grid gap-3 max-h-64 overflow-y-auto", children: filteredSpaces.map((space) => (_jsx("div", { onClick: () => setSelectedSpace(space.name), className: `p-4 border rounded-lg cursor-pointer transition-all ${selectedSpace === space.name
                                                ? "border-accent bg-accent/5"
                                                : "border-border hover:border-accent/50 hover:bg-accent/5"}`, children: _jsx("div", { className: "flex items-start justify-between", children: _jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h4", { className: "font-medium text-card-foreground", children: space.name }), space.verified && (_jsxs(Badge, { variant: "accent", className: "text-xs", children: [_jsx(Sparkles, { className: "w-3 h-3 mr-1" }), "Official"] }))] }), _jsx("p", { className: "text-sm text-muted-foreground mb-2", children: space.description }), _jsxs("div", { className: "flex items-center gap-1 text-xs text-muted-foreground", children: [_jsx(Users, { className: "w-3 h-3" }), _jsxs("span", { children: [space.members.toLocaleString(), " members"] })] })] }) }) }, space.name))) }), filteredSpaces.length === 0 && (_jsxs("div", { className: "text-center py-8 text-muted-foreground", children: [_jsx(Users, { className: "w-8 h-8 mx-auto mb-2 opacity-50" }), _jsx("p", { children: "No spaces found matching your search." }), _jsx(Button, { type: "button", variant: "outline", onClick: () => setMode("create"), className: "mt-2", children: "Create a new space instead" })] }))] })] })) : (_jsx(_Fragment, { children: _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "space-y-3", children: [_jsx(Label, { className: "text-sm font-medium text-card-foreground", children: "Space Category" }), _jsxs(Select, { value: selectedCategory, onValueChange: setSelectedCategory, children: [_jsx(SelectTrigger, { children: _jsx(SelectValue, { placeholder: "Choose a category" }) }), _jsx(SelectContent, { children: SPACE_CATEGORIES.map((category) => (_jsx(SelectItem, { value: category.value, children: category.label }, category.value))) })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { className: "text-sm font-medium text-card-foreground", children: "Space Name" }), _jsx(Input, { value: customSpaceName, onChange: (e) => setCustomSpaceName(e.target.value), placeholder: "e.g., CS 161 Study Group" })] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { className: "text-sm font-medium text-card-foreground", children: "Description" }), _jsx(Textarea, { value: customSpaceDescription, onChange: (e) => setCustomSpaceDescription(e.target.value), placeholder: "What's this space about? What will members do together?", rows: 3 })] })] }) })), _jsxs("div", { className: "flex gap-3 pt-4", children: [_jsx(Button, { type: "button", variant: "outline", onClick: handleSkip, className: "flex-1", children: "Skip for now" }), _jsx(Button, { type: "button", onClick: handleSubmit, className: "flex-1", disabled: isLoading ||
                                    (mode === "browse" && !selectedSpace) ||
                                    (mode === "create" && (!customSpaceName || !customSpaceDescription)), children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), mode === "browse" ? "Joining..." : "Creating..."] })) : (mode === "browse" ? "Join Space" : "Create Space") })] })] })] }));
};
//# sourceMappingURL=space-selection-step.js.map