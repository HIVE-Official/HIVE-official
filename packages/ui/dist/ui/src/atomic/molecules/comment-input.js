"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Textarea } from "../atoms/textarea";
import { Button } from "../atoms/button";
import { cn } from "../../lib/utils";
const CommentInput = React.forwardRef(({ className, avatar, userName, placeholder = "Write a comment...", maxLength = 500, showCharCount = false, isLoading = false, disabled = false, onSubmit, submitLabel = "Post", ...props }, ref) => {
    const [value, setValue] = React.useState("");
    const [rows, setRows] = React.useState(1);
    const textareaRef = React.useRef(null);
    // Generate initials from name
    const initials = userName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2);
    // Auto-resize textarea
    const handleChange = (e) => {
        const newValue = e.target.value;
        if (maxLength && newValue.length > maxLength)
            return;
        setValue(newValue);
        // Calculate rows based on content
        const lineCount = (newValue.match(/\n/g) || []).length + 1;
        setRows(Math.min(Math.max(lineCount, 1), 6));
    };
    const handleSubmit = async () => {
        if (!value.trim() || isLoading || disabled)
            return;
        try {
            await onSubmit?.(value.trim());
            setValue("");
            setRows(1);
        }
        catch (error) {
            console.error("Failed to submit comment:", error);
        }
    };
    const handleKeyDown = (e) => {
        // Submit on Cmd/Ctrl + Enter
        if ((e.metaKey || e.ctrlKey) && e.key === "Enter") {
            e.preventDefault();
            handleSubmit();
        }
    };
    const remainingChars = maxLength - value.length;
    const isNearLimit = remainingChars < 50;
    const isAtLimit = remainingChars === 0;
    return (_jsxs("div", { ref: ref, className: cn("flex gap-3 rounded-lg border border-border bg-card p-3 transition-all duration-smooth ease-liquid focus-within:border-primary/50 focus-within:shadow-md", disabled && "opacity-60 pointer-events-none", className), ...props, children: [_jsx("div", { className: "h-12 w-10 shrink-0 overflow-hidden rounded-md border border-border bg-muted transition-smooth ease-liquid", children: avatar ? (_jsx("img", { src: avatar, alt: userName, className: "h-full w-full object-cover" })) : (_jsx("div", { className: "flex h-full w-full items-center justify-center bg-primary/10 text-xs font-semibold text-primary", children: initials })) }), _jsxs("div", { className: "flex flex-1 flex-col gap-2", children: [_jsx(Textarea, { ref: textareaRef, value: value, onChange: handleChange, onKeyDown: handleKeyDown, placeholder: placeholder, disabled: disabled || isLoading, rows: rows, className: "min-h-0 resize-none border-0 p-0 shadow-none focus-visible:ring-0 transition-smooth ease-liquid" }), _jsxs("div", { className: "flex items-center justify-between gap-2", children: [_jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [showCharCount && (_jsx("span", { className: cn("transition-smooth ease-liquid", isNearLimit && "text-orange-500", isAtLimit && "text-destructive font-medium"), children: remainingChars })), _jsxs("span", { className: "hidden sm:inline", children: [_jsx("kbd", { className: "rounded bg-muted px-1 font-mono text-[10px]", children: "\u2318" }), _jsx("kbd", { className: "rounded bg-muted px-1 font-mono text-[10px]", children: "Enter" }), " ", "to post"] })] }), _jsx(Button, { size: "sm", onClick: handleSubmit, disabled: !value.trim() || disabled || isLoading, className: "shrink-0 transition-smooth ease-liquid", children: isLoading ? "Posting..." : submitLabel })] })] })] }));
});
CommentInput.displayName = "CommentInput";
export { CommentInput };
//# sourceMappingURL=comment-input.js.map