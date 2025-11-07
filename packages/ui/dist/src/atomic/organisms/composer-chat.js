'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { AtSign, Calendar, FileText, Globe2, ListChecks, Lock, Mic, Paperclip, Plus, Send, Smile, Sparkles, UploadCloud, X, } from "lucide-react";
import { cn } from "../../lib/utils";
const GOLD = "#FFD700";
const SLASH_COMMANDS = [
    { slug: "poll", label: "Poll", hint: "One-question poll", icon: ListChecks },
    { slug: "event", label: "Event", hint: "Create an event", icon: Calendar },
    { slug: "checkin", label: "Check-in", hint: "Open check-in", icon: Sparkles },
    { slug: "file", label: "File request", hint: "Collect files", icon: FileText },
    { slug: "slots", label: "Slots", hint: "Manage signup slots", icon: ListChecks },
    { slug: "invite", label: "Invite", hint: "Share campus invite", icon: Globe2 },
];
const DEMO_MENTIONS = [
    { id: "m1", label: "@Laney" },
    { id: "m2", label: "@UB ACM" },
    { id: "m3", label: "@HIVE Crew" },
    { id: "m4", label: "@Student Association" },
    { id: "m5", label: "@HIVE Team" },
];
const easeSpring = { type: "spring", stiffness: 420, damping: 32 };
const toBytes = (value) => {
    if (value < 1024)
        return `${value} B`;
    const kb = value / 1024;
    if (kb < 1024)
        return `${kb.toFixed(1)} KB`;
    const mb = kb / 1024;
    if (mb < 1024)
        return `${mb.toFixed(1)} MB`;
    return `${(mb / 1024).toFixed(1)} GB`;
};
const makeId = () => Math.random().toString(36).slice(2, 10);
function useReducedMotionPref() {
    const [prefersReduced, setPrefersReduced] = React.useState(false);
    React.useEffect(() => {
        if (typeof window === "undefined")
            return;
        const media = window.matchMedia("(prefers-reduced-motion: reduce)");
        const update = () => setPrefersReduced(media.matches);
        update();
        media.addEventListener("change", update);
        return () => media.removeEventListener("change", update);
    }, []);
    return prefersReduced;
}
function useAutoResizeTextArea(ref, value) {
    React.useEffect(() => {
        const textarea = ref.current;
        if (!textarea)
            return;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
    }, [value, ref]);
}
const VisibilityToggle = ({ value, onChange }) => {
    const items = [
        { key: "campus", icon: Globe2, label: "Campus" },
        { key: "space", icon: Lock, label: "Members" },
    ];
    return (_jsx("div", { role: "radiogroup", "aria-label": "Post visibility", className: "inline-flex items-center gap-1 rounded-xl border border-neutral-800 bg-neutral-950/80 p-1 text-xs text-neutral-200 shadow-inner shadow-black/40", children: items.map(({ key, icon: Icon, label }) => {
            const selected = value === key;
            return (_jsxs("button", { type: "button", role: "radio", "aria-checked": selected, onClick: () => onChange(key), className: cn("relative inline-flex items-center gap-1 rounded-lg px-2 py-1 transition-colors focus-visible:outline-none", "focus-visible:ring-2 focus-visible:ring-[" + GOLD + "]", selected
                    ? "text-neutral-50"
                    : "text-neutral-300 hover:text-neutral-100"), children: [_jsx(AnimatePresence, { initial: false, children: selected && (_jsx(motion.span, { layoutId: "visibility-pill", className: "absolute inset-0 rounded-lg", style: {
                                background: "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(0,0,0,0))",
                                boxShadow: `inset 0 0 0 1px ${GOLD}66`,
                            }, transition: easeSpring })) }), _jsx(Icon, { className: "relative h-3.5 w-3.5", "aria-hidden": true }), _jsx("span", { className: "relative font-medium", children: label })] }, key));
        }) }));
};
const IconButton = ({ icon: Icon, label, onClick, disabled, className }) => (_jsxs("button", { type: "button", "aria-label": label, disabled: disabled, onClick: onClick, className: cn("group relative grid h-9 w-9 place-items-center rounded-xl border border-neutral-800 bg-neutral-900/70 text-neutral-200", "shadow-inner shadow-black/40 transition-all hover:bg-neutral-800/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[" + GOLD + "]", "disabled:cursor-not-allowed disabled:opacity-40", className), children: [_jsx(Icon, { className: "h-4.5 w-4.5 transition-transform group-active:scale-95", "aria-hidden": true }), _jsx("span", { className: "pointer-events-none absolute -top-7 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-[10px] text-white opacity-0 shadow-lg ring-1 ring-white/10 backdrop-blur transition-all group-hover:-translate-y-1 group-hover:opacity-100", children: label })] }));
const AttachmentChip = ({ attachment, onRemove }) => {
    const isImage = attachment.type.startsWith("image/");
    return (_jsxs(motion.div, { layout: true, initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -6 }, transition: easeSpring, className: "group relative flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/70 px-2 py-1 text-xs text-neutral-200 shadow-inner shadow-black/40", children: [_jsx("div", { className: "h-8 w-8 overflow-hidden rounded-lg border border-neutral-800 bg-neutral-950/70", children: isImage && attachment.url ? (_jsx("img", { src: attachment.url, alt: attachment.name, className: "h-full w-full object-cover" })) : (_jsx("div", { className: "grid h-full w-full place-items-center text-neutral-300", children: _jsx(FileText, { className: "h-3.5 w-3.5", "aria-hidden": true }) })) }), _jsxs("div", { className: "max-w-40 truncate", children: [_jsx("div", { className: "truncate font-medium leading-4 text-neutral-100", children: attachment.name }), _jsx("div", { className: "text-[10px] text-neutral-400", children: toBytes(attachment.size) })] }), typeof attachment.progress === "number" && attachment.progress < 100 && (_jsx("div", { className: "relative h-1 w-16 overflow-hidden rounded bg-neutral-800", children: _jsx("div", { className: "absolute inset-y-0 left-0 rounded bg-neutral-200", style: { width: `${attachment.progress}%` } }) })), _jsx("button", { type: "button", onClick: onRemove, className: cn("grid h-6 w-6 place-items-center rounded-lg border border-neutral-800 bg-neutral-900/70 text-neutral-300 transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2", `focus-visible:ring-[${GOLD}]`), "aria-label": `Remove ${attachment.name}`, children: _jsx(X, { className: "h-3.5 w-3.5", "aria-hidden": true }) })] }));
};
const RadialTools = ({ open, onPick }) => {
    const radius = 96;
    const activeCommands = SLASH_COMMANDS.slice(0, 6);
    const angleStart = -110;
    const angleStep = activeCommands.length > 1 ? 220 / (activeCommands.length - 1) : 0;
    return (_jsx(AnimatePresence, { children: open && (_jsx("div", { className: "pointer-events-none absolute bottom-12 left-2 h-0 w-0", children: activeCommands.map((command, index) => {
                const angle = (angleStart + angleStep * index) * (Math.PI / 180);
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const Icon = command.icon;
                return (_jsx(motion.button, { type: "button", onClick: () => onPick(command), initial: { opacity: 0, x: 0, y: 0, scale: 0.75 }, animate: { opacity: 1, x, y, scale: 1 }, exit: { opacity: 0, x: 0, y: 0, scale: 0.75 }, transition: { ...easeSpring, delay: index * 0.03 }, className: cn("pointer-events-auto grid h-10 w-10 place-items-center rounded-xl border border-neutral-800 bg-neutral-900/80 text-neutral-200 shadow-inner shadow-black/40 backdrop-blur focus-visible:outline-none focus-visible:ring-2", `focus-visible:ring-[${GOLD}]`), "aria-label": command.label, title: `${command.label} — ${command.hint}`, children: _jsx(Icon, { className: "h-4.5 w-4.5", "aria-hidden": true }) }, command.slug));
            }) })) }));
};
const SlashMenu = ({ open, query, onClose, onInvoke }) => {
    const items = React.useMemo(() => {
        const q = query.toLowerCase();
        return SLASH_COMMANDS.filter((command) => command.slug.includes(q) || command.label.toLowerCase().includes(q));
    }, [query]);
    const [index, setIndex] = React.useState(0);
    React.useEffect(() => {
        if (!open)
            return;
        setIndex(0);
    }, [open, query]);
    React.useEffect(() => {
        if (!open)
            return;
        const handleKey = (event) => {
            if (event.key === "Escape") {
                onClose();
                return;
            }
            if (event.key === "ArrowDown") {
                event.preventDefault();
                setIndex((prev) => Math.min(prev + 1, items.length - 1));
            }
            if (event.key === "ArrowUp") {
                event.preventDefault();
                setIndex((prev) => Math.max(prev - 1, 0));
            }
            if (event.key === "Enter") {
                event.preventDefault();
                const command = items[index];
                if (command)
                    onInvoke(command);
            }
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [open, items, index, onInvoke, onClose]);
    return (_jsx(AnimatePresence, { children: open && (_jsx(motion.div, { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 6 }, transition: easeSpring, role: "dialog", "aria-label": "Slash commands", className: "absolute -top-2 left-2 z-20 w-64 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950/95 text-sm text-neutral-200 shadow-xl ring-1 ring-black/60 backdrop-blur", children: _jsxs("div", { className: "max-h-64 overflow-y-auto", children: [items.length === 0 && (_jsxs("div", { className: "px-3 py-3 text-neutral-400", children: ["No commands for \u201C/", query, "\u201D."] })), items.map((command, i) => {
                        const active = i === index;
                        const Icon = command.icon;
                        return (_jsxs("button", { type: "button", onMouseEnter: () => setIndex(i), onClick: () => onInvoke(command), className: cn("flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left transition-colors", active ? "bg-neutral-800/70" : "hover:bg-neutral-900/60"), children: [_jsx(Icon, { className: "h-4 w-4", "aria-hidden": true }), _jsxs("div", { className: "flex flex-col", children: [_jsxs("span", { className: "leading-4", children: ["/", command.slug] }), _jsx("span", { className: "text-xs text-neutral-400", children: command.hint })] })] }, command.slug));
                    })] }) })) }));
};
const MentionMenu = ({ open, query, onPick }) => {
    const items = React.useMemo(() => {
        const q = query.toLowerCase();
        return DEMO_MENTIONS.filter((mention) => mention.label.toLowerCase().includes(q));
    }, [query]);
    return (_jsx(AnimatePresence, { children: open && (_jsx(motion.div, { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: 6 }, transition: easeSpring, role: "dialog", "aria-label": "Mention suggestions", className: "absolute -top-2 left-28 z-20 w-52 overflow-hidden rounded-xl border border-neutral-800 bg-neutral-950/95 text-sm text-neutral-200 shadow-xl ring-1 ring-black/60 backdrop-blur", children: _jsxs("div", { className: "max-h-64 overflow-y-auto", children: [items.length === 0 && (_jsxs("div", { className: "px-3 py-3 text-neutral-400", children: ["No matches for \u201C@", query, "\u201D."] })), items.map((mention) => (_jsxs("button", { type: "button", onClick: () => onPick(mention), className: "flex w-full items-center gap-2 px-3 py-2 text-left transition-colors hover:bg-neutral-900/60", children: [_jsx(AtSign, { className: "h-3.5 w-3.5", "aria-hidden": true }), _jsx("span", { className: "leading-4", children: mention.label })] }, mention.id)))] }) })) }));
};
const ComposerChat = React.forwardRef(({ className, placeholder = "Share something with your space…", defaultValue = "", defaultVisibility = "space", maxCharacters = 500, attachmentsLimit = 4, compact, disabled, onSend, onOpenTool, onToggleVisibility, onLintError, ...props }, ref) => {
    const reducedMotion = useReducedMotionPref();
    const textareaRef = React.useRef(null);
    const [message, setMessage] = React.useState(defaultValue);
    useAutoResizeTextArea(textareaRef, message);
    const [visibility, setVisibility] = React.useState(defaultVisibility);
    const [focused, setFocused] = React.useState(false);
    const [isDragging, setDragging] = React.useState(false);
    const [showRadial, setShowRadial] = React.useState(false);
    const [attachments, setAttachments] = React.useState([]);
    const [mentions, setMentions] = React.useState([]);
    const [commands, setCommands] = React.useState([]);
    const [slashQuery, setSlashQuery] = React.useState("");
    const [mentionQuery, setMentionQuery] = React.useState("");
    const [slashOpen, setSlashOpen] = React.useState(false);
    const [mentionOpen, setMentionOpen] = React.useState(false);
    const remaining = maxCharacters - message.length;
    const canSend = !disabled && (message.trim().length > 0 || attachments.length > 0);
    React.useEffect(() => {
        const text = message;
        const slashMatch = /(^|\s)\/(\w*)$/.exec(text);
        setSlashOpen(Boolean(slashMatch));
        setSlashQuery(slashMatch ? slashMatch[2] : "");
        const mentionMatch = /(^|\s)@(\w*)$/.exec(text);
        setMentionOpen(Boolean(mentionMatch));
        setMentionQuery(mentionMatch ? mentionMatch[2] : "");
    }, [message]);
    React.useEffect(() => {
        return () => {
            attachments.forEach((attachment) => {
                if (attachment.url)
                    URL.revokeObjectURL(attachment.url);
            });
        };
    }, [attachments]);
    const updateText = React.useCallback((next) => {
        const computed = typeof next === 'function' ? next(message) : next;
        if (computed.length > maxCharacters) {
            onLintError?.({ code: 'max-chars-exceeded', message: `Message limited to ${maxCharacters} characters.` });
        }
        setMessage(computed.slice(0, maxCharacters));
    }, [maxCharacters, onLintError, message]);
    const handleFiles = React.useCallback((fileList) => {
        if (!fileList)
            return;
        const files = Array.from(fileList);
        const available = Math.max(attachmentsLimit - attachments.length, 0);
        if (available <= 0) {
            onLintError?.({ code: 'attachment-cap-exceeded', message: `You can attach up to ${attachmentsLimit} files.` });
            return;
        }
        const selected = files.slice(0, available);
        const created = selected.map((file) => ({
            id: makeId(),
            name: file.name,
            size: file.size,
            type: file.type,
            file,
            url: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
            progress: 0,
        }));
        if (created.length === 0)
            return;
        setAttachments((prev) => [...prev, ...created]);
        created.forEach((attachment) => {
            const start = Date.now();
            const tick = () => {
                const elapsed = Date.now() - start;
                const progress = Math.min(100, (elapsed / 800) * 100);
                setAttachments((prev) => prev.map((item) => (item.id === attachment.id ? { ...item, progress } : item)));
                if (progress < 100)
                    requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        });
    }, [attachments.length, attachmentsLimit]);
    const insertToken = React.useCallback((token, pattern) => {
        updateText((prev) => prev.replace(pattern, (match, prefix) => `${prefix}${token} `));
        requestAnimationFrame(() => textareaRef.current?.focus());
    }, [updateText]);
    const invokeSlash = React.useCallback((command) => {
        insertToken(`/${command.slug}`, /(^|\s)\/(\w*)$/);
        setSlashOpen(false);
        setCommands((prev) => [...prev, command.slug]);
        onOpenTool?.(command.slug);
    }, [insertToken, onOpenTool]);
    const pickMention = React.useCallback((mention) => {
        insertToken(mention.label, /(^|\s)@(\w*)$/);
        setMentionOpen(false);
        setMentions((prev) => (prev.includes(mention.label) ? prev : [...prev, mention.label]));
    }, [insertToken]);
    const handleSubmit = React.useCallback(() => {
        if (!canSend) {
            onLintError?.({ code: 'empty-message', message: 'Add a message or attachment before sending.' });
            return;
        }
        const payload = {
            message: message.trim(),
            visibility,
            attachments,
            mentions,
            commands,
        };
        onSend?.(payload);
        setMessage("");
        setAttachments((prev) => {
            prev.forEach((item) => item.url && URL.revokeObjectURL(item.url));
            return [];
        });
        setMentions([]);
        setCommands([]);
        setShowRadial(false);
    }, [attachments, canSend, commands, message, mentions, onSend, visibility]);
    const handleKeyDown = (event) => {
        if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
            event.preventDefault();
            handleSubmit();
            return;
        }
        if (event.key === "Enter" && !event.shiftKey && !slashOpen && !mentionOpen) {
            event.preventDefault();
            handleSubmit();
            return;
        }
        if (event.key === "Escape") {
            setSlashOpen(false);
            setMentionOpen(false);
            setShowRadial(false);
        }
    };
    const handlePaste = (event) => {
        const files = event.clipboardData?.files;
        if (files && files.length) {
            event.preventDefault();
            handleFiles(files);
        }
    };
    const onDragOver = (event) => {
        event.preventDefault();
        if (!isDragging)
            setDragging(true);
    };
    const onDrop = (event) => {
        event.preventDefault();
        setDragging(false);
        handleFiles(event.dataTransfer?.files || null);
    };
    const onDragLeave = () => setDragging(false);
    return (_jsx("section", { ref: ref, className: cn("w-full", className), "aria-label": "Composer", ...props, children: _jsxs(motion.div, { layout: true, onDragOver: onDragOver, onDrop: onDrop, onDragLeave: onDragLeave, className: cn("relative w-[min(720px,100%)] rounded-2xl border bg-neutral-950/85 p-3 text-neutral-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.05),0_18px_38px_rgba(0,0,0,0.32)] backdrop-blur", isDragging ? "border-[" + GOLD + "]" : "border-neutral-800", disabled && "opacity-60"), animate: {
                boxShadow: focused
                    ? "inset 0 0 0 1px rgba(255,215,0,0.32), 0 20px 40px rgba(0,0,0,0.38)"
                    : "inset 0 1px 0 rgba(255,255,255,0.04), 0 18px 38px rgba(0,0,0,0.32)",
            }, transition: reducedMotion ? { duration: 0 } : { duration: 0.25 }, children: [_jsxs("div", { className: "flex items-center justify-between gap-3 px-1 pb-2", children: [_jsx(VisibilityToggle, { value: visibility, onChange: (v) => { setVisibility(v); /* notify contract */ /* notify contract */ onToggleVisibility?.(v); } }), _jsxs("div", { className: cn("text-[11px]", remaining < 0 ? "text-rose-400" : "text-neutral-400"), children: [remaining, " / ", maxCharacters] })] }), _jsx(AnimatePresence, { initial: false, children: attachments.length > 0 && (_jsx(motion.div, { layout: true, initial: { opacity: 0, y: -4 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -4 }, transition: easeSpring, className: "mb-2 flex flex-wrap gap-2 px-1", children: attachments.map((attachment) => (_jsx(AttachmentChip, { attachment: attachment, onRemove: () => {
                                setAttachments((prev) => prev.filter((item) => item.id !== attachment.id));
                                if (attachment.url)
                                    URL.revokeObjectURL(attachment.url);
                            } }, attachment.id))) })) }), _jsxs("div", { className: "relative rounded-xl border border-neutral-900 bg-neutral-950/70 px-3 py-2", children: [_jsx("textarea", { ref: textareaRef, value: message, onChange: (event) => updateText(event.target.value), onFocus: () => setFocused(true), onBlur: () => {
                                setFocused(false);
                                setSlashOpen(false);
                                setMentionOpen(false);
                            }, onKeyDown: handleKeyDown, onPaste: handlePaste, rows: compact ? 2 : 3, placeholder: placeholder, "aria-label": "Message text", className: "w-full resize-none bg-transparent text-[15px] leading-6 text-neutral-100 placeholder:text-neutral-500 focus:outline-none", disabled: disabled }), _jsx(SlashMenu, { open: slashOpen && !disabled, query: slashQuery, onClose: () => setSlashOpen(false), onInvoke: invokeSlash }), _jsx(MentionMenu, { open: mentionOpen && !disabled, query: mentionQuery, onPick: pickMention })] }), _jsxs("div", { className: "mt-3 flex items-center justify-between gap-2 px-1", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsxs("div", { className: "relative", children: [_jsx(IconButton, { icon: Plus, label: "Tools", onClick: () => setShowRadial((prev) => !prev), disabled: disabled }), _jsx(RadialTools, { open: showRadial && !disabled, onPick: (command) => {
                                                setShowRadial(false);
                                                invokeSlash(command);
                                            } })] }), _jsx(IconButton, { icon: Paperclip, label: attachments.length >= attachmentsLimit ? "Attachment limit reached" : "Attach", disabled: disabled || attachments.length >= attachmentsLimit, onClick: () => {
                                        if (disabled || attachments.length >= attachmentsLimit)
                                            return;
                                        const input = document.createElement("input");
                                        input.type = "file";
                                        input.multiple = true;
                                        input.onchange = (event) => handleFiles(event.target.files);
                                        input.click();
                                    } }), _jsx(IconButton, { icon: Smile, label: "Emoji (placeholder)", onClick: () => insertToken(":)", /(.*)$/), disabled: disabled }), _jsx(IconButton, { icon: Mic, label: "Voice (coming soon)", onClick: () => { }, disabled: true })] }), _jsxs(motion.button, { type: "button", onClick: handleSubmit, disabled: !canSend, whileTap: { scale: canSend ? 0.97 : 1 }, animate: {
                                scale: canSend ? 1 : 0.98,
                                opacity: canSend ? 1 : 0.6,
                                boxShadow: canSend
                                    ? `0 0 0 1px rgba(255,255,255,0.08), 0 10px 24px rgba(0,0,0,0.45), inset 0 0 0 1px rgba(255,215,0,0.25)`
                                    : `0 0 0 1px rgba(255,255,255,0.05), 0 8px 18px rgba(0,0,0,0.35)`,
                            }, transition: easeSpring, className: cn("group inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/85 px-3 py-2 text-sm font-medium text-neutral-50 backdrop-blur focus-visible:outline-none focus-visible:ring-2 disabled:cursor-not-allowed", `focus-visible:ring-[${GOLD}]`), children: [_jsx(Send, { className: "h-4 w-4 transition-transform group-active:translate-x-0.5", "aria-hidden": true }), _jsx("span", { children: "Send" })] })] }), _jsx(AnimatePresence, { children: isDragging && (_jsx(motion.div, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, className: "pointer-events-none absolute inset-0 grid place-items-center rounded-2xl border-2 border-dashed border-[rgba(255,215,0,0.45)] bg-[rgba(0,0,0,0.45)]", children: _jsxs("div", { className: "inline-flex items-center gap-2 rounded-xl border border-neutral-800 bg-neutral-900/70 px-4 py-2 text-sm text-neutral-200 shadow-inner shadow-black/40", children: [_jsx(UploadCloud, { className: "h-4.5 w-4.5", "aria-hidden": true }), "Drop files to attach"] }) })) })] }) }));
});
ComposerChat.displayName = "ComposerChat";
export { ComposerChat };
//# sourceMappingURL=composer-chat.js.map