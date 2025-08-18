"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "../button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../card";
import { Loader2 } from "lucide-react";
const AVAILABLE_INTERESTS = [
    "Software Development",
    "Web Development",
    "Mobile Development",
    "Data Science",
    "Machine Learning",
    "Artificial Intelligence",
    "Cybersecurity",
    "Cloud Computing",
    "DevOps",
    "UI/UX Design",
    "Product Management",
    "Entrepreneurship",
    "Research",
    "Open Source",
    "Blockchain",
];
export const InterestsStep = ({ initialInterests, onSubmit, onBack, }) => {
    const [selectedInterests, setSelectedInterests] = useState(initialInterests);
    const [isLoading, setIsLoading] = useState(false);
    const toggleInterest = (interest) => {
        setSelectedInterests((prev) => prev.includes(interest)
            ? prev.filter((i) => i !== interest)
            : [...prev, interest]);
    };
    const handleSubmit = async () => {
        if (selectedInterests.length === 0)
            return;
        setIsLoading(true);
        try {
            onSubmit({
                interests: selectedInterests,
            });
        }
        catch (error) {
            console.error("Failed to submit interests", error);
            setIsLoading(false);
        }
    };
    return (_jsxs(Card, { className: "w-full max-w-lg bg-card border-border", children: [_jsxs(CardHeader, { children: [_jsx(CardTitle, { className: "text-card-foreground", children: "Your Interests" }), _jsx(CardDescription, { className: "text-muted-foreground", children: "Select topics that interest you to help us personalize your experience." })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsx("div", { className: "grid grid-cols-2 gap-2 sm:grid-cols-3", children: AVAILABLE_INTERESTS.map((interest) => (_jsx(Button, { type: "button", variant: selectedInterests.includes(interest) ? "default" : "outline", onClick: () => toggleInterest(interest), className: "text-sm", children: interest }, interest))) }), _jsxs("div", { className: "flex gap-2", children: [onBack && (_jsx(Button, { type: "button", variant: "outline", onClick: onBack, className: "flex-1", children: "Back" })), _jsxs(Button, { type: "button", variant: "default", onClick: handleSubmit, className: "flex-1", disabled: isLoading || selectedInterests.length === 0, children: [isLoading ? (_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" })) : null, "Continue"] })] })] })] }));
};
//# sourceMappingURL=interests-step.js.map