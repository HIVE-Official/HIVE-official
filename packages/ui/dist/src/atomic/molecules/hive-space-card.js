"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "../atoms/card";
import { cn } from "../../lib/utils";
import { Users, ChevronDown, ArrowRight } from "lucide-react";
/**
 * HIVE Space Card
 *
 * Custom space card with HIVE's unique visual identity.
 * Features collapsible sections, distinctive hover states, and no generic badges.
 *
 * Design Philosophy:
 * - Bulletin board aesthetic with paper-like cards
 * - Gold accents on interaction (#FFD700)
 * - Collapsible to show/hide details
 * - Clear member count display
 * - Immediate visual feedback for joined state
 */
const HiveSpaceCard = React.forwardRef(({ className, title, description, coverImage, memberCount, isJoined = false, expandedContent, defaultExpanded = false, onCardClick, onJoinToggle, ...props }, ref) => {
    const [isExpanded, setIsExpanded] = React.useState(defaultExpanded);
    const handleCardClick = () => {
        if (onCardClick) {
            onCardClick();
        }
        else {
            setIsExpanded(!isExpanded);
        }
    };
    return (_jsx(motion.div, { whileHover: { y: -4 }, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }, children: _jsxs(Card, { ref: ref, className: cn("relative overflow-hidden cursor-pointer group", "border-l-4 transition-all duration-300", isJoined
                ? "border-l-[#FFD700] bg-[#FFD700]/5"
                : "border-l-border hover:border-l-[#FFD700]/50", "hover:shadow-xl", className), ...props, children: [coverImage && (_jsxs("div", { className: "relative h-40 w-full overflow-hidden bg-muted", children: [_jsx("img", { src: coverImage, alt: "", className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" })] })), _jsxs("div", { className: "p-6 space-y-4", children: [_jsxs("div", { className: "flex items-start justify-between gap-4", children: [_jsxs("div", { className: "flex-1 space-y-2 cursor-pointer", onClick: handleCardClick, children: [_jsx("h3", { className: "text-xl font-bold tracking-tight group-hover:text-[#FFD700] transition-colors", children: title }), description && (_jsx("p", { className: "text-sm text-muted-foreground line-clamp-2", children: description }))] }), expandedContent && (_jsx("button", { onClick: (e) => {
                                        e.stopPropagation();
                                        setIsExpanded(!isExpanded);
                                    }, className: cn("flex-shrink-0 p-2 rounded-md transition-all", "hover:bg-muted", isExpanded && "rotate-180"), "aria-label": isExpanded ? "Collapse" : "Expand", children: _jsx(ChevronDown, { className: "h-4 w-4 text-muted-foreground", "aria-hidden": "true" }) }))] }), _jsx(AnimatePresence, { initial: false, children: isExpanded && expandedContent && (_jsx(motion.div, { initial: { height: 0, opacity: 0 }, animate: { height: "auto", opacity: 1 }, exit: { height: 0, opacity: 0 }, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] }, className: "overflow-hidden", children: _jsx("div", { className: "pt-4 border-t border-border", children: expandedContent }) })) }), _jsxs("div", { className: "flex items-center justify-between pt-2", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("div", { className: "flex h-8 w-8 items-center justify-center rounded-full bg-muted", children: _jsx(Users, { className: "h-4 w-4 text-muted-foreground", "aria-hidden": "true" }) }), _jsxs("div", { className: "text-sm", children: [_jsx("span", { className: "font-semibold", children: memberCount.toLocaleString() }), _jsx("span", { className: "text-muted-foreground ml-1", children: memberCount === 1 ? "member" : "members" })] })] }), _jsxs("button", { onClick: (e) => {
                                        e.stopPropagation();
                                        if (onJoinToggle) {
                                            onJoinToggle();
                                        }
                                        else {
                                            onCardClick?.();
                                        }
                                    }, className: cn("group/btn flex items-center gap-2 px-4 py-2 rounded-md font-medium text-sm", "transition-all duration-200", isJoined
                                        ? "bg-[#FFD700]/10 text-[#FFD700] hover:bg-[#FFD700]/20"
                                        : "bg-primary text-primary-foreground hover:bg-primary/90"), children: [_jsx("span", { children: isJoined ? "Open" : "Join" }), _jsx(ArrowRight, { className: "h-4 w-4 transition-transform group-hover/btn:translate-x-1", "aria-hidden": "true" })] })] })] })] }) }));
});
HiveSpaceCard.displayName = "HiveSpaceCard";
export { HiveSpaceCard };
//# sourceMappingURL=hive-space-card.js.map