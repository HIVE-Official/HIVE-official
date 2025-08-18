"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, MapPin, Tag, TrendingUp, Check, Plus, } from "lucide-react";
import { Button } from "../../button";
export function SuggestedSpaces({ onNext, onBack, isLoading = false, }) {
    const [_suggestedSpaces, setSuggestedSpaces] = useState([]);
    const [groupedSpaces, setGroupedSpaces] = useState({});
    const [selectedSpaces, setSelectedSpaces] = useState(new Set());
    const [isLoadingSpaces, setIsLoadingSpaces] = useState(true);
    const [userProfile, setUserProfile] = useState(null);
    // Fetch suggested spaces
    useEffect(() => {
        const fetchSuggestedSpaces = async () => {
            try {
                const token = localStorage.getItem("hive-auth-token");
                if (!token)
                    return;
                const response = await fetch("/api/spaces/suggested", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setSuggestedSpaces(data.suggestedSpaces || []);
                    setGroupedSpaces(data.groupedSpaces || {});
                    setUserProfile(data.userProfile);
                }
            }
            catch (error) {
                console.error("Failed to fetch suggested spaces:", error);
            }
            finally {
                setIsLoadingSpaces(false);
            }
        };
        fetchSuggestedSpaces();
    }, []);
    const toggleSpace = (spaceId) => {
        const newSelected = new Set(selectedSpaces);
        if (newSelected.has(spaceId)) {
            newSelected.delete(spaceId);
        }
        else {
            newSelected.add(spaceId);
        }
        setSelectedSpaces(newSelected);
    };
    const handleContinue = () => {
        onNext({ joinedSpaces: Array.from(selectedSpaces) });
    };
    const spaceTypeLabels = {
        academic: "Academic",
        social: "Social",
        professional: "Professional",
        sports: "Sports",
        cultural: "Cultural",
        service: "Service",
    };
    const getRelevanceColor = (score) => {
        if (score >= 40)
            return "text-accent";
        if (score >= 25)
            return "text-foreground";
        return "text-muted";
    };
    const getRelevanceLabel = (score) => {
        if (score >= 40)
            return "Highly Relevant";
        if (score >= 25)
            return "Relevant";
        return "Suggested";
    };
    if (isLoadingSpaces) {
        return (_jsx("div", { className: "max-w-2xl mx-auto", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "animate-spin rounded-full h-8 w-8 border-b-2 border-accent mx-auto mb-4" }), _jsx("p", { className: "text-muted", children: "Finding spaces for you..." })] }) }));
    }
    return (_jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "text-center mb-8", children: [_jsx("h1", { className: "text-2xl font-display font-semibold text-foreground mb-2", children: "Join Your Communities" }), _jsx("p", { className: "text-muted font-sans mb-4", children: "We've found some spaces that match your interests and profile" }), userProfile && (_jsxs("div", { className: "inline-flex items-center space-x-2 text-sm text-muted bg-muted/20 px-3 py-1 rounded-full", children: [_jsx(MapPin, { className: "w-3 h-3" }), _jsx("span", { children: userProfile.majors?.join(", ") || "Your major" }), _jsx("span", { children: "\u2022" }), _jsxs("span", { children: ["Class of ", userProfile.graduationYear] })] }))] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.1 }, className: "bg-accent/5 border border-accent/20 rounded-lg p-4 mb-6", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h3", { className: "font-medium text-foreground", children: [selectedSpaces.size, " spaces selected"] }), _jsx("p", { className: "text-sm text-muted", children: "Join at least 3 spaces to get started" })] }), _jsxs("div", { className: "text-2xl font-display font-bold text-accent", children: [selectedSpaces.size, "/3+"] })] }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.2 }, className: "space-y-6 mb-8", children: Object.entries(groupedSpaces).map(([spaceType, spaces]) => (_jsxs("div", { children: [_jsxs("h3", { className: "font-display font-semibold text-foreground mb-3 flex items-center space-x-2", children: [_jsx("span", { children: spaceTypeLabels[spaceType] }), _jsxs("span", { className: "text-sm text-muted font-normal", children: ["(", spaces.length, " available)"] })] }), _jsx("div", { className: "grid gap-3", children: spaces.map((space) => (_jsx(motion.button, { whileHover: { scale: 1.01 }, whileTap: { scale: 0.99 }, onClick: () => toggleSpace(space.id), className: `p-4 border-2 rounded-lg transition-all duration-200 text-left ${selectedSpaces.has(space.id)
                                    ? "border-accent bg-accent/10"
                                    : "border-border hover:border-accent/50"}`, children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center space-x-2 mb-1", children: [_jsx("h4", { className: "font-medium text-foreground", children: space.name }), _jsxs("div", { className: `flex items-center space-x-1 ${getRelevanceColor(space.relevanceScore)}`, children: [_jsx(TrendingUp, { className: "w-3 h-3" }), _jsx("span", { className: "text-xs font-medium", children: getRelevanceLabel(space.relevanceScore) })] })] }), _jsx("p", { className: "text-sm text-muted mb-2", children: space.description }), _jsxs("div", { className: "flex items-center space-x-4 text-xs text-muted", children: [_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Users, { className: "w-3 h-3" }), _jsxs("span", { children: [space.memberCount, " members"] })] }), space.tags && (_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Tag, { className: "w-3 h-3" }), _jsx("span", { children: space.tags.slice(0, 2).join(", ") })] }))] })] }), _jsx("div", { className: `p-2 rounded-full transition-colors ${selectedSpaces.has(space.id)
                                                ? "bg-accent text-accent-foreground"
                                                : "bg-muted text-muted-foreground"}`, children: selectedSpaces.has(space.id) ? (_jsx(Check, { className: "w-4 h-4" })) : (_jsx(Plus, { className: "w-4 h-4" })) })] }) }, space.id))) })] }, spaceType))) }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.3 }, className: "space-y-4", children: [_jsx(Button, { onClick: handleContinue, disabled: selectedSpaces.size < 3 || isLoading, className: "w-full", size: "lg", children: isLoading
                            ? "Joining Spaces..."
                            : `Continue with ${selectedSpaces.size} spaces` }), selectedSpaces.size < 3 && (_jsx("p", { className: "text-sm text-muted text-center", children: "Select at least 3 spaces to continue" })), onBack && (_jsx(Button, { onClick: onBack, variant: "outline", className: "w-full", disabled: isLoading, children: "Back" }))] }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.4 }, className: "mt-6 p-4 bg-muted/20 rounded-lg", children: _jsx("p", { className: "text-sm text-muted text-center", children: "Don't worry - you can always join more spaces or leave these ones later from your feed" }) })] }));
}
//# sourceMappingURL=suggested-spaces.js.map