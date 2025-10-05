"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from "react";
import { cn } from "../../lib/utils.js";
import { InlineToolMenu } from "./inline-tool-menu.js";
import { useSlashCommands } from "../../hooks/use-slash-commands.js";
import { Plus, Paperclip, Image as ImageIcon, Send } from "lucide-react";
const SpaceComposerWithTools = React.forwardRef(({ className, value, onValueChange, onCreatePost, onToolSelect, placeholder = "Message #space...", canAttach = true, onAttachFile, onAttachImage, showInlineTools = true, ...props }, ref) => {
    const textareaRef = React.useRef(null);
    const [toolMenuOpen, setToolMenuOpen] = React.useState(false);
    // Slash command detection
    const { command, isSlashInput } = useSlashCommands({
        value,
        onCommand: (cmd) => {
            onToolSelect?.(cmd);
            onValueChange(""); // Clear input after command
        },
        autoClear: true,
    });
    // Auto-resize textarea
    React.useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = "auto";
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
        }
    }, [value]);
    // Handle post creation
    const handlePost = () => {
        if (value.trim() && onCreatePost) {
            onCreatePost(value);
            onValueChange("");
        }
    };
    // Handle Enter key (Shift+Enter for newline, Enter to send)
    const handleKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handlePost();
        }
    };
    return (_jsx("div", { ref: ref, className: cn("border-t border-white/8 bg-[#000000] p-6", className), ...props, children: _jsxs("div", { className: "relative max-w-4xl mx-auto", children: [isSlashInput && !command && (_jsxs("div", { className: "absolute bottom-full left-0 mb-2 w-64 rounded-lg border border-white/8 bg-[#0c0c0c] shadow-lg p-3 text-xs", children: [_jsx("p", { className: "font-semibold text-white mb-1", children: "Slash Commands:" }), _jsxs("ul", { className: "space-y-1 text-white/70", children: [_jsxs("li", { children: [_jsx("code", { className: "bg-[#000000] px-1 rounded", children: "/poll" }), " - Create a poll"] }), _jsxs("li", { children: [_jsx("code", { className: "bg-[#000000] px-1 rounded", children: "/event" }), " - Create an event"] }), _jsxs("li", { children: [_jsx("code", { className: "bg-[#000000] px-1 rounded", children: "/task" }), " - Create a task"] }), _jsxs("li", { children: [_jsx("code", { className: "bg-[#000000] px-1 rounded", children: "/resource" }), " - Add a resource"] })] })] })), _jsxs("div", { className: "relative rounded-3xl border border-white/8 bg-[#0c0c0c] focus-within:border-white/20 focus-within:ring-1 focus-within:ring-white/20 transition-all duration-[400ms]", children: [showInlineTools && (_jsx("div", { className: "absolute left-2 bottom-2 flex items-center gap-1", children: _jsx(InlineToolMenu, { open: toolMenuOpen, onOpenChange: setToolMenuOpen, onToolSelect: onToolSelect, position: "above", trigger: _jsx("button", { type: "button", className: cn("p-2 hover:bg-white/10 rounded-full transition-all duration-[400ms]", toolMenuOpen
                                        ? "bg-white/10 text-white"
                                        : "text-white/70 hover:text-white"), title: "Quick tools (Poll, Event, Task, Resource)", children: _jsx(Plus, { className: "h-5 w-5" }) }) }) })), _jsx("textarea", { ref: textareaRef, value: value, onChange: (e) => onValueChange(e.target.value), onKeyDown: handleKeyDown, placeholder: placeholder, className: cn("w-full resize-none rounded-3xl bg-transparent text-sm text-white placeholder:text-white/50 focus:outline-none min-h-[52px] max-h-[200px]", showInlineTools ? "px-14 py-3 pr-32" : "px-6 py-3 pr-24"), rows: 1 }), _jsxs("div", { className: "absolute bottom-2 right-2 flex items-center gap-1", children: [canAttach && onAttachFile && (_jsx("button", { type: "button", onClick: onAttachFile, className: "p-2 hover:bg-white/10 rounded-full transition-all duration-[400ms] text-white/70 hover:text-white", title: "Attach file", children: _jsx(Paperclip, { className: "h-5 w-5" }) })), canAttach && onAttachImage && (_jsx("button", { type: "button", onClick: onAttachImage, className: "p-2 hover:bg-white/10 rounded-full transition-all duration-[400ms] text-white/70 hover:text-white", title: "Add image", children: _jsx(ImageIcon, { className: "h-5 w-5" }) })), _jsx("button", { type: "button", onClick: handlePost, disabled: !value.trim(), className: cn("p-2 rounded-full transition-all duration-[400ms]", value.trim()
                                        ? "bg-white text-black hover:bg-white/90"
                                        : "bg-white/10 text-white/30 cursor-not-allowed"), title: "Send message (Enter)", children: _jsx(Send, { className: "h-5 w-5" }) })] })] }), _jsxs("p", { className: "text-[10px] text-white/70 text-center mt-2", children: ["Press ", _jsx("kbd", { className: "px-1.5 py-0.5 rounded bg-white/10", children: "Enter" }), " to send,", " ", _jsx("kbd", { className: "px-1.5 py-0.5 rounded bg-white/10", children: "Shift+Enter" }), " for new line", showInlineTools && (_jsxs(_Fragment, { children: [" ", " \u00B7 Click ", _jsx(Plus, { className: "h-3 w-3 inline" }), " for quick tools"] }))] })] }) }));
});
SpaceComposerWithTools.displayName = "SpaceComposerWithTools";
export { SpaceComposerWithTools };
//# sourceMappingURL=space-composer-with-tools.js.map