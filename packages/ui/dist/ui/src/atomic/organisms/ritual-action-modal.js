"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
import { Dialog, DialogContent } from "../atoms/dialog.js";
import { Button } from "../atoms/button.js";
import { Input } from "../atoms/input.js";
import { Textarea } from "../atoms/textarea.js";
import { Trophy, Sparkles, Zap, PartyPopper, Check, Loader2 } from "lucide-react";
const RitualActionModal = React.forwardRef(({ open, onClose, action, ritualName, onComplete, isLoading = false, }, ref) => {
    const [formData, setFormData] = React.useState({});
    const [files, setFiles] = React.useState([]);
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [showCelebration, setShowCelebration] = React.useState(false);
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isSubmitting || isLoading)
            return;
        setIsSubmitting(true);
        // Show celebration animation
        setShowCelebration(true);
        // Wait for celebration, then complete
        setTimeout(async () => {
            try {
                await onComplete({
                    actionId: action.id,
                    ...formData,
                    files: files.length > 0 ? files : undefined,
                });
                onClose();
            }
            catch (error) {
                console.error("Error completing action:", error);
                setShowCelebration(false);
            }
            finally {
                setIsSubmitting(false);
            }
        }, 1200);
    };
    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files || []);
        setFiles(selectedFiles);
    };
    const isValid = action.type === "manual" ||
        (action.type === "upload" && files.length > 0) ||
        (action.type === "text" && formData.text?.trim()) ||
        (action.type === "number" && !isNaN(formData.value));
    // Celebration Screen
    if (showCelebration) {
        return (_jsx(Dialog, { open: open, onOpenChange: onClose, children: _jsx(DialogContent, { ref: ref, className: "bg-gradient-to-br from-[#0c0c0c] to-[#1a1a1a] border border-[#FFD700]/30 max-w-md overflow-hidden", children: _jsxs("div", { className: "relative flex flex-col items-center justify-center py-16 space-y-6", children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-br from-[#FFD700]/10 via-transparent to-[#FFD700]/5 animate-pulse" }), _jsxs("div", { className: "absolute inset-0 overflow-hidden", children: [_jsx(Sparkles, { className: "absolute top-10 left-10 h-6 w-6 text-[#FFD700] animate-bounce", style: { animationDelay: "0s" } }), _jsx(Sparkles, { className: "absolute top-20 right-16 h-4 w-4 text-[#FFD700]/70 animate-bounce", style: { animationDelay: "0.2s" } }), _jsx(Sparkles, { className: "absolute bottom-16 left-16 h-5 w-5 text-[#FFD700]/80 animate-bounce", style: { animationDelay: "0.4s" } }), _jsx(Zap, { className: "absolute top-16 right-10 h-7 w-7 text-[#FFD700] animate-pulse", style: { animationDelay: "0.1s" } }), _jsx(PartyPopper, { className: "absolute bottom-20 right-20 h-6 w-6 text-[#FFD700]/60 animate-bounce", style: { animationDelay: "0.3s" } })] }), _jsx("div", { className: "relative z-10 animate-bounce", children: _jsx("div", { className: "h-24 w-24 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-[0_0_40px_rgba(255,215,0,0.4)]", children: _jsx(Trophy, { className: "h-12 w-12 text-black" }) }) }), _jsxs("div", { className: "relative z-10 text-center space-y-2", children: [_jsx("h2", { className: "text-3xl font-bold text-white", children: "Amazing!" }), _jsx("p", { className: "text-lg text-[#FFD700] font-semibold", children: "+1 Step Closer" })] })] }) }) }));
    }
    // Main Action Screen - Redesigned to be engaging, not form-like
    return (_jsx(Dialog, { open: open, onOpenChange: onClose, children: _jsxs(DialogContent, { ref: ref, className: "bg-[#0c0c0c] border border-white/8 sm:max-w-md p-0 overflow-hidden", children: [action.reward && (_jsxs("div", { className: "relative bg-gradient-to-r from-[#FFD700]/20 to-[#FFD700]/10 border-b border-[#FFD700]/30 px-6 py-4", children: [_jsx("div", { className: "absolute top-0 right-0 h-full w-32 bg-gradient-to-l from-[#FFD700]/10 to-transparent" }), _jsxs("div", { className: "relative flex items-center gap-3", children: [_jsx("div", { className: "h-12 w-12 rounded-full bg-[#FFD700]/20 border border-[#FFD700]/40 flex items-center justify-center flex-shrink-0", children: _jsx(Trophy, { className: "h-6 w-6 text-[#FFD700]" }) }), _jsxs("div", { children: [_jsx("p", { className: "text-xs text-white/70 uppercase tracking-wide font-medium", children: "Unlock" }), _jsx("p", { className: "text-base font-bold text-[#FFD700]", children: action.reward })] })] })] })), _jsxs("form", { onSubmit: handleSubmit, className: "px-6 py-6 space-y-6", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("h2", { className: "text-2xl font-bold text-white leading-tight", children: action.name }), _jsx("p", { className: "text-sm text-white/70 leading-relaxed", children: action.description })] }), _jsxs("div", { children: [action.type === "text" && (_jsx(Textarea, { value: formData.text || "", onChange: (e) => setFormData({ ...formData, text: e.target.value }), placeholder: action.placeholder || "Share your thoughts...", required: action.required, className: "bg-white/5 border-white/8 text-white placeholder:text-white/50 text-base min-h-[120px] focus:border-[#FFD700]/50 focus:ring-1 focus:ring-[#FFD700]/50 transition-all" })), action.type === "number" && (_jsx(Input, { type: "number", step: "0.1", value: formData.value || "", onChange: (e) => setFormData({ ...formData, value: parseFloat(e.target.value) }), placeholder: action.placeholder || "0", required: action.required, className: "bg-white/5 border-white/8 text-white text-3xl font-bold text-center h-20 placeholder:text-white/50 focus:border-[#FFD700]/50 focus:ring-1 focus:ring-[#FFD700]/50 transition-all" })), action.type === "upload" && (_jsxs("label", { className: cn("relative flex flex-col items-center justify-center h-40 rounded-lg border-2 border-dashed cursor-pointer transition-all", files.length > 0
                                        ? "border-[#FFD700] bg-[#FFD700]/10"
                                        : "border-white/20 hover:border-[#FFD700]/50 hover:bg-white/5"), children: [_jsx("input", { type: "file", onChange: handleFileChange, accept: "image/*,video/*", multiple: true, required: action.required, className: "hidden" }), files.length > 0 ? (_jsxs("div", { className: "flex flex-col items-center space-y-2", children: [_jsx("div", { className: "h-12 w-12 rounded-full bg-[#FFD700] flex items-center justify-center", children: _jsx(Check, { className: "h-6 w-6 text-black" }) }), _jsxs("p", { className: "text-sm font-semibold text-white", children: [files.length, " file", files.length > 1 ? "s" : "", " selected"] }), _jsx("p", { className: "text-xs text-white/50 px-4 text-center truncate max-w-full", children: files.map((f) => f.name).join(", ") })] })) : (_jsxs("div", { className: "flex flex-col items-center space-y-3", children: [_jsx("div", { className: "h-12 w-12 rounded-full bg-white/10 flex items-center justify-center", children: _jsx(Zap, { className: "h-6 w-6 text-white/70" }) }), _jsxs("div", { className: "text-center", children: [_jsx("p", { className: "text-sm font-medium text-white", children: "Tap to upload" }), _jsx("p", { className: "text-xs text-white/50 mt-1", children: "Show your progress" })] })] }))] })), action.type === "manual" && (_jsxs("div", { className: "flex flex-col items-center justify-center py-8 space-y-4", children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: "absolute inset-0 bg-[#FFD700]/20 blur-2xl animate-pulse" }), _jsx("div", { className: "relative h-20 w-20 rounded-full bg-gradient-to-br from-[#FFD700] to-[#FFA500] flex items-center justify-center shadow-lg", children: _jsx(Sparkles, { className: "h-10 w-10 text-black" }) })] }), _jsx("p", { className: "text-sm text-white/70 text-center", children: "Tap below to mark complete" })] }))] }), ritualName && (_jsxs("div", { className: "flex items-center justify-center gap-2 text-xs text-white/50", children: [_jsx("div", { className: "h-1.5 w-1.5 rounded-full bg-[#FFD700]" }), _jsx("span", { children: ritualName })] })), _jsxs("div", { className: "space-y-3", children: [_jsx(Button, { type: "submit", size: "lg", disabled: !isValid || isSubmitting || isLoading, className: cn("w-full h-14 text-base font-bold transition-all", isValid
                                        ? "bg-white text-black hover:bg-[#FFD700] hover:text-black hover:scale-[1.02] active:scale-[0.98]"
                                        : "bg-white/10 text-white/30 cursor-not-allowed"), children: isSubmitting || isLoading ? (_jsxs(_Fragment, { children: [_jsx(Loader2, { className: "mr-2 h-5 w-5 animate-spin" }), "Completing..."] })) : (_jsx(_Fragment, { children: action.type === "manual" ? "Mark Complete" : "Submit & Continue" })) }), _jsx("button", { type: "button", onClick: onClose, disabled: isSubmitting || isLoading, className: "w-full py-2 text-sm text-white/70 hover:text-white transition-colors", children: "Maybe later" })] })] })] }) }));
});
RitualActionModal.displayName = "RitualActionModal";
export { RitualActionModal };
//# sourceMappingURL=ritual-action-modal.js.map