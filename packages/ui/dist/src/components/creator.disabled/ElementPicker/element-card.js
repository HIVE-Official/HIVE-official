"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { cn } from "../../../lib/utils.js";
import { Type, Image, Minus, Square, MousePointer, CheckSquare, TextCursor, Clock, BarChart3, GitBranch, Zap, } from "lucide-react";
import { motion } from "../../framer-motion-proxy.js";
// Map element types to Lucide icons
const ELEMENT_ICONS = {
    textBlock: Type,
    imageBlock: Image,
    divider: Minus,
    stack: Square,
    button: MousePointer,
    choiceSelect: CheckSquare,
    textInput: TextCursor,
    countdownTimer: Clock,
    progressBar: BarChart3,
    conditionGate: GitBranch,
    pingTrigger: Zap,
};
export const ElementCard = ({ element, onSelect, enableDrag = false, className, }) => {
    const handleDragStart = (e) => {
        e.dataTransfer.setData("application/json", JSON.stringify({
            elementId: element.id,
            elementType: element.type,
        }));
    };
    const handleClick = () => {
        onSelect(element.id);
    };
    const IconComponent = ELEMENT_ICONS[element.type] || Type;
    const cardClassName = cn("group relative flex flex-col items-center gap-2 p-3 rounded-lg border border-white/10 bg-[var(--hive-text-primary)]/5 hover:bg-[var(--hive-text-primary)]/10 cursor-pointer transition-colors", className);
    const cardContent = (_jsxs(_Fragment, { children: [_jsx("div", { className: "flex items-center justify-center w-8 h-8 rounded-md bg-accent-gold/20 text-accent-gold", children: _jsx(IconComponent, { className: "w-4 h-4" }) }), _jsxs("div", { className: "text-center", children: [_jsx("h3", { className: "text-sm font-medium text-text-primary", children: element.name }), _jsx("p", { className: "text-xs text-text-muted mt-1 line-clamp-2", children: element.description })] }), _jsx("div", { className: "absolute inset-0 rounded-lg border-2 border-accent-gold opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" })] }));
    if (enableDrag) {
        // Use regular div for drag functionality to avoid framer motion conflicts
        return (_jsx("div", { className: cardClassName, draggable: true, onDragStart: handleDragStart, onClick: handleClick, children: cardContent }));
    }
    // Use motion.div for non-draggable cards
    return (_jsx(motion.div, { className: cardClassName, onClick: handleClick, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: cardContent }));
};
//# sourceMappingURL=element-card.js.map