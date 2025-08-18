import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "../lib/utils";
// OPTION A: MINIMAL CARDS - Clean, spacious, functional
const minimalCardVariants = cva("relative bg-black border transition-all duration-200 ease-out", {
    variants: {
        variant: {
            default: [
                "border-white/10 rounded-xl",
                "hover:border-white/20 hover:shadow-lg hover:shadow-black/50"
            ],
            elevated: [
                "border-white/15 rounded-xl shadow-lg shadow-black/20",
                "hover:border-accent/30 hover:shadow-xl hover:shadow-black/30",
                "bg-gradient-to-b from-white/[0.02] to-transparent"
            ],
            feature: [
                "border-accent/20 rounded-xl",
                "bg-gradient-to-br from-accent/[0.02] via-transparent to-transparent",
                "hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10"
            ],
            interactive: [
                "border-white/10 rounded-xl cursor-pointer",
                "hover:border-accent/30 hover:bg-white/[0.02] hover:scale-[1.02]",
                "active:scale-[0.98] transition-transform"
            ]
        },
        padding: {
            none: "p-0",
            sm: "p-4",
            md: "p-6",
            lg: "p-8"
        }
    },
    defaultVariants: {
        variant: "default",
        padding: "md"
    }
});
// OPTION B: GLASS CARDS - Blur effects, transparency, premium feel
const glassCardVariants = cva("relative overflow-hidden backdrop-blur-md transition-all duration-300 ease-out", {
    variants: {
        variant: {
            default: [
                "bg-white/5 border border-white/20 rounded-2xl",
                "hover:bg-white/10 hover:border-white/30"
            ],
            frosted: [
                "bg-white/[0.08] border border-white/30 rounded-2xl backdrop-blur-lg",
                "hover:bg-white/[0.12] hover:border-accent/40 hover:shadow-2xl hover:shadow-accent/10"
            ],
            iridescent: [
                "bg-gradient-to-br from-white/[0.08] via-accent/[0.03] to-white/[0.05]",
                "border border-white/20 rounded-2xl backdrop-blur-xl",
                "hover:from-white/[0.12] hover:via-accent/[0.06] hover:to-white/[0.08]",
                "hover:border-accent/30 hover:scale-[1.02]"
            ],
            crystal: [
                "bg-white/[0.06] border-2 border-white/[0.15] rounded-3xl backdrop-blur-2xl",
                "shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]",
                "hover:bg-white/[0.1] hover:border-accent/25 hover:shadow-2xl"
            ]
        },
        padding: {
            none: "p-0",
            sm: "p-5",
            md: "p-7",
            lg: "p-9"
        }
    },
    defaultVariants: {
        variant: "default",
        padding: "md"
    }
});
// OPTION C: CAMPUS CARDS - Authentic, bulletin-style, student life
const campusCardVariants = cva("relative transition-all duration-300 ease-out", {
    variants: {
        variant: {
            bulletin: [
                "bg-surface border-l-4 border-l-accent border border-white/10 rounded-r-xl rounded-l-sm",
                "hover:border-l-accent hover:border-accent/20 hover:scale-[1.01]",
                "shadow-md hover:shadow-lg",
                "relative before:absolute before:top-2 before:left-2 before:w-3 before:h-3",
                "before:bg-accent before:rounded-full before:shadow-sm"
            ],
            sticky: [
                "bg-accent/90 text-black rounded-lg transform rotate-[-1deg]",
                "hover:rotate-0 hover:scale-105 hover:shadow-xl hover:shadow-accent/30",
                "border-2 border-accent/50 relative",
                "after:absolute after:top-1 after:right-1 after:w-4 after:h-4",
                "after:bg-white/30 after:rounded-full after:blur-sm"
            ],
            dorm: [
                "bg-surface-02 border border-white/20 rounded-xl",
                "hover:bg-surface-03 hover:border-accent/30",
                "relative overflow-hidden",
                "before:absolute before:top-0 before:left-0 before:w-full before:h-1",
                "before:bg-gradient-to-r before:from-accent before:to-accent/50"
            ],
            study: [
                "bg-gradient-to-br from-surface to-surface-02 border border-accent/20 rounded-lg",
                "hover:from-surface-01 hover:to-surface-03 hover:border-accent/40",
                "shadow-inner hover:shadow-lg transition-all duration-500"
            ]
        },
        padding: {
            none: "p-0",
            sm: "p-4",
            md: "p-6",
            lg: "p-8"
        }
    },
    defaultVariants: {
        variant: "dorm",
        padding: "md"
    }
});
// OPTION D: TECH CARDS - Command-line inspired, developer-focused
const techCardVariants = cva("relative font-mono transition-all duration-150 ease-out", {
    variants: {
        variant: {
            terminal: [
                "bg-black border border-accent/50 rounded",
                "shadow-[0_0_20px_rgba(255,215,0,0.1)]",
                "hover:border-accent hover:shadow-[0_0_30px_rgba(255,215,0,0.2)]",
                "relative before:absolute before:top-2 before:left-3 before:text-accent before:text-xs",
                "before:content-['$']"
            ],
            console: [
                "bg-surface-02 border border-white/20 rounded-sm",
                "hover:bg-surface-03 hover:border-white/40",
                "font-mono text-sm",
                "shadow-inner"
            ],
            debug: [
                "bg-surface/50 border border-border rounded",
                "hover:bg-surface hover:border-accent/30",
                "text-muted-foreground"
            ],
            system: [
                "bg-surface border border-white/10 rounded-md",
                "hover:bg-surface-01 hover:border-accent/30",
                "relative before:absolute before:top-1 before:right-2 before:w-2 before:h-2",
                "before:bg-accent before:rounded-full before:animate-pulse"
            ]
        },
        padding: {
            none: "p-0",
            xs: "p-2",
            sm: "p-3",
            md: "p-4",
            lg: "p-6"
        }
    },
    defaultVariants: {
        variant: "terminal",
        padding: "md"
    }
});
// OPTION E: SOCIAL CARDS - Friendly, conversational, community-focused
const socialCardVariants = cva("relative transition-all duration-300 ease-out overflow-hidden", {
    variants: {
        variant: {
            post: [
                "bg-surface border border-white/10 rounded-2xl",
                "hover:border-accent/30 hover:bg-surface-01 hover:scale-[1.01]",
                "relative before:absolute before:bottom-0 before:left-0 before:w-full before:h-0.5",
                "before:bg-gradient-to-r before:from-transparent before:via-accent before:to-transparent",
                "before:scale-x-0 hover:before:scale-x-100 before:transition-transform before:duration-500"
            ],
            chat: [
                "bg-surface-01 border border-accent/20 rounded-3xl",
                "hover:bg-surface-02 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/10",
                "relative after:absolute after:bottom-[-8px] after:left-6 after:w-4 after:h-4",
                "after:bg-surface-01 after:border-l after:border-b after:border-accent/20",
                "after:transform after:rotate-[-45deg] after:rounded-bl-md"
            ],
            reaction: [
                "bg-white/5 backdrop-blur-sm border border-white/20 rounded-full",
                "hover:bg-accent/20 hover:border-accent/50 hover:scale-110",
                "active:scale-95 cursor-pointer",
                "transition-all duration-200"
            ],
            community: [
                "bg-gradient-to-br from-surface via-surface-01 to-surface-02",
                "border border-accent/15 rounded-xl",
                "hover:from-surface-01 hover:via-surface-02 hover:to-surface-03",
                "hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5",
                "group transition-all duration-500"
            ]
        },
        padding: {
            none: "p-0",
            sm: "p-4",
            md: "p-6",
            lg: "p-8",
            xl: "p-10"
        }
    },
    defaultVariants: {
        variant: "post",
        padding: "md"
    }
});
export const MinimalCard = React.forwardRef(({ className, variant, padding, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn(minimalCardVariants({ variant, padding }), className), ...props }));
});
MinimalCard.displayName = "MinimalCard";
export const GlassCard = React.forwardRef(({ className, variant, padding, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn(glassCardVariants({ variant, padding }), className), ...props }));
});
GlassCard.displayName = "GlassCard";
export const CampusCard = React.forwardRef(({ className, variant, padding, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn(campusCardVariants({ variant, padding }), className), ...props }));
});
CampusCard.displayName = "CampusCard";
export const TechCard = React.forwardRef(({ className, variant, padding, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn(techCardVariants({ variant, padding }), className), ...props }));
});
TechCard.displayName = "TechCard";
export const SocialCard = React.forwardRef(({ className, variant, padding, ...props }, ref) => {
    return (_jsx("div", { ref: ref, className: cn(socialCardVariants({ variant, padding }), className), ...props }));
});
SocialCard.displayName = "SocialCard";
//# sourceMappingURL=card-options.js.map