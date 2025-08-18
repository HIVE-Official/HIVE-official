"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from "react";
import { Button } from "../button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, } from "../card";
import { Input } from "../input";
import { Label } from "../label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../select";
import { Badge } from "../badge";
import { Loader2, X, Plus, GraduationCap } from "lucide-react";
// Academic levels
const ACADEMIC_LEVELS = [
    { value: "undergraduate", label: "Undergraduate" },
    { value: "masters", label: "Master's" },
    { value: "phd", label: "Ph.D." },
];
// Common majors - simplified list for better UX
const COMMON_MAJORS = [
    "Computer Science",
    "Engineering",
    "Business Administration",
    "Psychology",
    "Biology",
    "English",
    "History",
    "Mathematics",
    "Economics",
    "Political Science",
    "Chemistry",
    "Physics",
    "Art",
    "Music",
    "Education",
    "Communications",
    "Sociology",
    "Philosophy",
    "Pre-Med",
    "Pre-Law",
    "Other"
];
const GRADUATION_YEARS = Array.from({ length: 8 }, (_, i) => new Date().getFullYear() + i);
export const AcademicCardStep = ({ initialData = {}, onSubmit, onSkip, }) => {
    const [academicLevel, setAcademicLevel] = useState(initialData.academicLevel || "undergraduate");
    const [selectedMajors, setSelectedMajors] = useState(initialData.majors || []);
    const [currentMajor, setCurrentMajor] = useState("");
    const [customMajor, setCustomMajor] = useState("");
    const [graduationYear, setGraduationYear] = useState(initialData.graduationYear || GRADUATION_YEARS[0]);
    const [isLoading, setIsLoading] = useState(false);
    const [showCustomInput, setShowCustomInput] = useState(false);
    const handleSubmit = async () => {
        if (selectedMajors.length === 0 || !graduationYear)
            return;
        setIsLoading(true);
        try {
            await onSubmit({
                academicLevel,
                majors: selectedMajors,
                graduationYear,
            });
        }
        catch (error) {
            console.error("Failed to submit academic info", error);
            setIsLoading(false);
        }
    };
    const addMajor = () => {
        let majorToAdd = "";
        if (showCustomInput && customMajor.trim()) {
            majorToAdd = customMajor.trim();
            setCustomMajor("");
            setShowCustomInput(false);
        }
        else if (currentMajor && currentMajor !== "Other") {
            majorToAdd = currentMajor;
        }
        else if (currentMajor === "Other") {
            setShowCustomInput(true);
            return;
        }
        if (majorToAdd && !selectedMajors.includes(majorToAdd) && selectedMajors.length < 3) {
            setSelectedMajors([...selectedMajors, majorToAdd]);
            setCurrentMajor("");
        }
    };
    const removeMajor = (majorName) => {
        setSelectedMajors(selectedMajors.filter(m => m !== majorName));
    };
    const handleSkip = () => {
        if (onSkip) {
            onSkip();
        }
    };
    const availableMajors = COMMON_MAJORS.filter(major => !selectedMajors.includes(major));
    return (_jsxs(Card, { className: "w-full max-w-lg bg-card border-border", children: [_jsxs(CardHeader, { className: "text-center space-y-2", children: [_jsx("div", { className: "w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto", children: _jsx(GraduationCap, { className: "w-6 h-6 text-accent" }) }), _jsx(CardTitle, { className: "text-xl font-display text-card-foreground", children: "Academic Information" }), _jsx(CardDescription, { className: "text-muted-foreground font-sans", children: "Tell us about your studies to help us connect you with the right communities" })] }), _jsxs(CardContent, { className: "space-y-6", children: [_jsxs("div", { className: "space-y-3", children: [_jsx(Label, { className: "text-sm font-medium text-card-foreground", children: "Academic Level" }), _jsxs(Select, { value: academicLevel, onValueChange: setAcademicLevel, children: [_jsx(SelectTrigger, { className: "h-12", children: _jsx(SelectValue, { placeholder: "Select your academic level" }) }), _jsx(SelectContent, { children: ACADEMIC_LEVELS.map((level) => (_jsx(SelectItem, { value: level.value, children: level.label }, level.value))) })] })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(Label, { className: "text-sm font-medium text-card-foreground", children: "Major(s)" }), _jsxs("span", { className: "text-xs text-muted-foreground", children: [selectedMajors.length, "/3 selected"] })] }), _jsx("div", { className: "space-y-3", children: !showCustomInput ? (_jsxs("div", { className: "flex gap-2", children: [_jsxs(Select, { value: currentMajor, onValueChange: setCurrentMajor, children: [_jsx(SelectTrigger, { className: "flex-1", children: _jsx(SelectValue, { placeholder: "Select a major" }) }), _jsx(SelectContent, { children: availableMajors.map((major) => (_jsx(SelectItem, { value: major, children: major }, major))) })] }), _jsx(Button, { type: "button", onClick: addMajor, disabled: !currentMajor || selectedMajors.length >= 3, children: _jsx(Plus, { className: "w-4 h-4" }) })] })) : (_jsxs("div", { className: "flex gap-2", children: [_jsx(Input, { value: customMajor, onChange: (e) => setCustomMajor(e.target.value), placeholder: "Enter your major", className: "flex-1", onKeyPress: (e) => {
                                                if (e.key === 'Enter') {
                                                    addMajor();
                                                }
                                            } }), _jsx(Button, { type: "button", onClick: addMajor, disabled: !customMajor.trim() || selectedMajors.length >= 3, children: _jsx(Plus, { className: "w-4 h-4" }) }), _jsx(Button, { type: "button", variant: "outline", onClick: () => {
                                                setShowCustomInput(false);
                                                setCustomMajor("");
                                                setCurrentMajor("");
                                            }, children: "Cancel" })] })) }), selectedMajors.length > 0 && (_jsx("div", { className: "flex flex-wrap gap-2", children: selectedMajors.map((major) => (_jsxs(Badge, { variant: "accent", className: "flex items-center gap-2 py-1 px-3", children: [_jsx("span", { className: "text-sm", children: major }), _jsx("button", { type: "button", onClick: () => removeMajor(major), className: "ml-1 p-0.5 rounded hover:bg-destructive/20 hover:text-destructive transition-colors", children: _jsx(X, { className: "w-3 h-3" }) })] }, major))) }))] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Label, { className: "text-sm font-medium text-card-foreground", children: "Expected Graduation Year" }), _jsxs(Select, { value: graduationYear?.toString(), onValueChange: (value) => setGraduationYear(parseInt(value)), children: [_jsx(SelectTrigger, { className: "h-12", children: _jsx(SelectValue, { placeholder: "Select graduation year" }) }), _jsx(SelectContent, { children: GRADUATION_YEARS.map((year) => (_jsx(SelectItem, { value: year.toString(), children: year }, year))) })] })] }), _jsxs("div", { className: "flex gap-3 pt-4", children: [onSkip && (_jsx(Button, { type: "button", variant: "outline", onClick: handleSkip, className: "flex-1", children: "Skip for now" })), _jsx(Button, { type: "button", onClick: handleSubmit, className: "flex-1", disabled: isLoading || selectedMajors.length === 0 || !graduationYear, children: isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-4 w-4 animate-spin" }), "Saving..."] })) : ("Continue") })] })] })] }));
};
//# sourceMappingURL=academic-card-step.js.map