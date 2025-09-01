"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, MapPin, Users, Calendar, ExternalLink, AlertCircle, CheckCircle, } from "lucide-react";
import { Button } from "../../button";
import { Input } from "../../input";
import { Textarea } from "../../textarea.js";
export function SpaceClaiming({ onNext, onBack, isLoading = false, _schoolId, }) {
    const [availableSpaces, setAvailableSpaces] = useState({});
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedSpace, setSelectedSpace] = useState(null);
    const [claimReason, setClaimReason] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState("idle");
    const [errorMessage, setErrorMessage] = useState("");
    // Fetch available spaces
    useEffect(() => {
        const fetchSpaces = async () => {
            try {
                const token = localStorage.getItem("hive-auth-token");
                if (!token)
                    return;
                const response = await fetch("/api/spaces/available", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (response.ok) {
                    const data = await response.json();
                    setAvailableSpaces(data.availableSpaces || {});
                }
            }
            catch (error) {
                console.error("Failed to fetch available spaces:", error);
            }
        };
        fetchSpaces();
    }, []);
    // Filter spaces based on search term
    const filteredSpaces = Object.entries(availableSpaces).reduce((acc, [spaceType, spaces]) => {
        const filtered = spaces.filter((space) => space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            space.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
            space.tags?.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase())));
        if (filtered.length > 0) {
            acc[spaceType] = filtered;
        }
        return acc;
    }, {});
    const handleClaimSpace = async () => {
        if (!selectedSpace || !claimReason.trim())
            return;
        setIsSubmitting(true);
        setSubmitStatus("idle");
        try {
            const token = localStorage.getItem("hive-auth-token");
            if (!token)
                throw new Error("Authentication required");
            const response = await fetch("/api/verification/submit-claim", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    spaceId: selectedSpace.id,
                    spaceName: selectedSpace.name,
                    spaceType: selectedSpace.spaceType,
                    claimReason: claimReason.trim(),
                }),
            });
            if (response.ok) {
                setSubmitStatus("success");
                setTimeout(() => {
                    onNext({
                        spaceClaims: [
                            {
                                spaceId: selectedSpace.id,
                                spaceName: selectedSpace.name,
                                spaceType: selectedSpace.spaceType,
                                claimReason: claimReason.trim(),
                                status: "pending",
                                submittedAt: new Date(),
                            },
                        ],
                    });
                }, 2000);
            }
            else {
                const error = await response.json();
                setErrorMessage(error.error || "Failed to submit claim");
                setSubmitStatus("error");
            }
        }
        catch (error) {
            console.error("Space claim error:", error);
            setErrorMessage("Network error occurred");
            setSubmitStatus("error");
        }
        finally {
            setIsSubmitting(false);
        }
    };
    const handleSkip = () => {
        onNext({ spaceClaims: [] });
    };
    const spaceTypeLabels = {
        academic: "Academic",
        social: "Social",
        professional: "Professional",
        sports: "Sports",
        cultural: "Cultural",
        service: "Service",
    };
    return (_jsxs("div", { className: "max-w-2xl mx-auto", children: [_jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "text-center mb-8", children: [_jsx("h1", { className: "text-2xl font-display font-semibold text-foreground mb-2", children: "Claim Your Organization's Space" }), _jsx("p", { className: "text-muted font-sans", children: "Find and claim your club or organization's space on HIVE" })] }), !selectedSpace ? (_jsxs(_Fragment, { children: [_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.1 }, className: "mb-6", children: _jsxs("div", { className: "relative", children: [_jsx(Search, { className: "absolute left-3 top-1/2 transform -translate-y-1/2 text-muted w-4 h-4" }), _jsx(Input, { placeholder: "Search for your organization...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value), className: "pl-10" })] }) }), _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.2 }, className: "space-y-6 mb-8", children: Object.entries(filteredSpaces).map(([spaceType, spaces]) => (_jsxs("div", { children: [_jsxs("h3", { className: "font-display font-semibold text-foreground mb-3", children: [spaceTypeLabels[spaceType], " ", "Organizations"] }), _jsx("div", { className: "grid gap-3", children: spaces.map((space) => (_jsx(motion.button, { whileHover: { scale: 1.01 }, whileTap: { scale: 0.99 }, onClick: () => setSelectedSpace(space), className: "p-4 bg-card border border-border rounded-lg hover:border-accent/50 transition-colors text-left", children: _jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsx("h4", { className: "font-medium text-foreground mb-1", children: space.name }), _jsx("p", { className: "text-sm text-muted mb-2", children: space.description }), _jsxs("div", { className: "flex items-center space-x-4 text-xs text-muted", children: [_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Users, { className: "w-3 h-3" }), _jsxs("span", { children: [space.memberCount, " members"] })] }), space.lastActivity && (_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Calendar, { className: "w-3 h-3" }), _jsxs("span", { children: ["Active ", space.lastActivity] })] }))] })] }), _jsx(ExternalLink, { className: "w-4 h-4 text-muted" })] }) }, space.id))) })] }, spaceType))) }), _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5, delay: 0.3 }, className: "text-center space-y-4", children: [_jsx(Button, { onClick: handleSkip, variant: "secondary", className: "w-full", disabled: isLoading, children: "Skip for now - I'll claim my space later" }), onBack && (_jsx(Button, { onClick: onBack, variant: "secondary", className: "w-full", disabled: isLoading, children: "Back" }))] })] })) : (
            /* Claim Form */
            _jsxs(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.5 }, className: "space-y-6", children: [_jsxs("div", { className: "p-4 bg-accent/5 border border-accent/20 rounded-lg", children: [_jsxs("div", { className: "flex items-start justify-between mb-2", children: [_jsx("h3", { className: "font-display font-semibold text-foreground", children: selectedSpace.name }), _jsx(Button, { onClick: () => setSelectedSpace(null), variant: "secondary", size: "sm", disabled: isSubmitting, children: "Change" })] }), _jsx("p", { className: "text-sm text-muted mb-2", children: selectedSpace.description }), _jsxs("div", { className: "flex items-center space-x-4 text-xs text-muted", children: [_jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(MapPin, { className: "w-3 h-3" }), _jsx("span", { children: spaceTypeLabels[selectedSpace.spaceType] })] }), _jsxs("div", { className: "flex items-center space-x-1", children: [_jsx(Users, { className: "w-3 h-3" }), _jsxs("span", { children: [selectedSpace.memberCount, " members"] })] })] })] }), _jsxs("div", { children: [_jsxs("label", { className: "block text-sm font-medium text-foreground mb-2", children: ["Why are you claiming this space?", " ", _jsx("span", { className: "text-accent", children: "*" })] }), _jsx(Textarea, { placeholder: "Please explain your role in this organization and why you should be granted access to manage this space...", value: claimReason, onChange: (e) => setClaimReason(e.target.value), rows: 4, disabled: isSubmitting, className: "resize-none" }), _jsx("p", { className: "text-xs text-muted mt-1", children: "This will be reviewed by the HIVE team for verification" })] }), _jsxs(AnimatePresence, { children: [submitStatus === "success" && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "p-4 bg-accent/10 border border-accent/20 rounded-lg", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(CheckCircle, { className: "w-5 h-5 text-accent" }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-accent", children: "Claim Submitted!" }), _jsx("p", { className: "text-sm text-muted", children: "Your claim has been submitted for review. You'll be notified once approved." })] })] }) })), submitStatus === "error" && (_jsx(motion.div, { initial: { opacity: 0, height: 0 }, animate: { opacity: 1, height: "auto" }, exit: { opacity: 0, height: 0 }, className: "p-4 bg-surface-02 border border-border rounded-lg", children: _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(AlertCircle, { className: "w-5 h-5 text-muted" }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-foreground", children: "Claim Failed" }), _jsx("p", { className: "text-sm text-muted", children: errorMessage })] })] }) }))] }), _jsxs("div", { className: "space-y-3", children: [_jsx(Button, { onClick: handleClaimSpace, disabled: !claimReason.trim() ||
                                    isSubmitting ||
                                    submitStatus === "success", className: "w-full", size: "lg", children: isSubmitting ? "Submitting Claim..." : "Submit Claim for Review" }), _jsx(Button, { onClick: () => setSelectedSpace(null), variant: "secondary", className: "w-full", disabled: isSubmitting || submitStatus === "success", children: "Choose Different Space" })] })] }))] }));
}
//# sourceMappingURL=space-claiming.js.map