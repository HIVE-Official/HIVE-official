"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../../atomic/atoms/button-enhanced.js';
import { Badge } from '../badge';
import { cn } from '../../lib/utils.js';
import { Users, Calendar, Sparkles, Clock, Star, Eye, Zap } from 'lucide-react';
const spaceTypeConfig = {
    academic: {
        label: 'Academic',
        icon: Star,
        color: 'accent',
        bgGradient: 'from-surface-02/30 to-transparent',
        borderColor: 'border-border',
    },
    residential: {
        label: 'Residential',
        icon: Users,
        color: 'chip',
        bgGradient: 'from-surface-02/20 to-transparent',
        borderColor: 'border-border',
    },
    interest: {
        label: 'Interest',
        icon: Sparkles,
        color: 'chip',
        bgGradient: 'from-surface-02/20 to-transparent',
        borderColor: 'border-border',
    },
    organization: {
        label: 'Organization',
        icon: Users,
        color: 'chip',
        bgGradient: 'from-surface-02/20 to-transparent',
        borderColor: 'border-border',
    },
    greek: {
        label: 'Greek Life',
        icon: Star,
        color: 'accent',
        bgGradient: 'from-surface-02/30 to-transparent',
        borderColor: 'border-border',
    },
};
export const SpaceCardPreview = ({ id: _id, name, description, type, potentialMembers, anticipatedEvents = 0, category, keywords = [], onRequestActivation, onLearnMore, className, }) => {
    const [isHovered, setIsHovered] = useState(false);
    const config = spaceTypeConfig[type];
    return (_jsxs(motion.article, { layout: true, initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, onHoverStart: () => setIsHovered(true), onHoverEnd: () => setIsHovered(false), className: cn("group relative overflow-hidden", "bg-gradient-to-br bg-surface border rounded-xl", "transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]", "hover:shadow-lg hover:border-border-hover hover:-translate-y-1", config.borderColor, config.bgGradient, className), children: [_jsx("div", { className: "absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/30 via-accent/10 to-transparent" }), _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-start justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: cn("w-10 h-10 rounded-lg flex items-center justify-center", "bg-gradient-to-br from-surface-02 to-surface-01 border border-border"), children: _jsx(config.icon, { className: cn("h-5 w-5", config.color === 'accent' ? 'text-accent' : 'text-foreground') }) }), _jsxs("div", { children: [_jsx("h3", { className: "font-display font-semibold text-foreground text-lg leading-tight", children: name }), _jsxs("div", { className: "flex items-center gap-2 mt-1", children: [_jsx(Badge, { variant: config.color, className: "text-xs", children: config.label }), _jsx("span", { className: "text-xs text-muted", children: category })] })] })] }), _jsxs("div", { className: "flex items-center gap-2 px-3 py-1 bg-surface-01 border border-border rounded-full", children: [_jsx(Clock, { className: "h-3 w-3 text-accent" }), _jsx("span", { className: "text-xs font-medium text-accent", children: "Preview" })] })] }), _jsx("p", { className: "text-muted font-body text-sm leading-relaxed mb-4 line-clamp-2", children: description }), keywords.length > 0 && (_jsxs("div", { className: "flex flex-wrap gap-1 mb-4", children: [keywords.slice(0, 4).map((keyword) => (_jsx("span", { className: "text-xs px-2 py-1 bg-surface-01 border border-border rounded-md text-muted", children: keyword }, keyword))), keywords.length > 4 && (_jsxs("span", { className: "text-xs px-2 py-1 text-muted", children: ["+", keywords.length - 4, " more"] }))] })), _jsxs("div", { className: "grid grid-cols-2 gap-4 mb-6 p-4 bg-surface-01/50 border border-border/50 rounded-lg", children: [_jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-1 mb-1", children: [_jsx(Users, { className: "h-4 w-4 text-muted" }), _jsx("span", { className: "text-xs text-muted", children: "Potential Members" })] }), _jsx("span", { className: "font-display font-semibold text-foreground text-lg", children: potentialMembers.toLocaleString() })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "flex items-center justify-center gap-1 mb-1", children: [_jsx(Calendar, { className: "h-4 w-4 text-muted" }), _jsx("span", { className: "text-xs text-muted", children: "Anticipated Events" })] }), _jsx("span", { className: "font-display font-semibold text-foreground text-lg", children: anticipatedEvents })] })] }), _jsx("div", { className: "mb-6 p-4 bg-surface-01 border border-border rounded-lg", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx(Zap, { className: "h-4 w-4 text-accent flex-shrink-0 mt-0.5" }), _jsxs("div", { children: [_jsx("p", { className: "text-sm font-medium text-foreground mb-1", children: "Ready for Activation" }), _jsx("p", { className: "text-xs text-muted leading-relaxed", children: "This Space will come alive when a student leader requests access and gets approved. Be the first to shape this community!" })] })] }) }), _jsxs("div", { className: "flex gap-3", children: [_jsxs(Button, { variant: "primary", size: "lg", onClick: onRequestActivation, className: "flex-1 gap-2 font-semibold", children: [_jsx(Sparkles, { className: "h-4 w-4" }), "Request to Lead"] }), _jsxs(Button, { variant: "secondary", size: "lg", onClick: onLearnMore, className: "gap-2", children: [_jsx(Eye, { className: "h-4 w-4" }), "Learn More"] })] })] }), _jsxs(motion.div, { className: "absolute inset-0 pointer-events-none", initial: { opacity: 0 }, animate: { opacity: isHovered ? 1 : 0 }, transition: { duration: 0.2 }, children: [_jsx("div", { className: "absolute top-0 left-0 w-full h-full bg-gradient-to-br from-surface-02/50 via-transparent to-transparent" }), _jsx(motion.div, { className: "absolute top-6 right-6", animate: {
                            y: isHovered ? [-2, 2, -2] : [0],
                            opacity: isHovered ? [0.3, 0.6, 0.3] : [0]
                        }, transition: { duration: 2, repeat: Infinity }, children: _jsx(Sparkles, { className: "h-4 w-4 text-accent" }) })] }), _jsx(motion.div, { className: "absolute top-4 right-4 w-2 h-2 bg-accent rounded-full", animate: {
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 1, 0.5]
                }, transition: {
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                } })] }));
};
//# sourceMappingURL=space-card-preview.js.map