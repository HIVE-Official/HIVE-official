"use client";
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { cn } from "../lib/utils";
export function RequestAccessCard({ exclusiveSpaces = [], className }) {
    // Mock exclusive spaces for development
    const mockSpaces = [
        {
            id: "cs-honors",
            name: "CS Honors Society",
            type: "honors",
            requirements: ["3.7+ GPA", "CS Major", "Faculty Recommendation"],
            description: "Elite computer science students advancing the field",
            icon: "🏆",
            applicationStatus: null
        },
        {
            id: "ai-research",
            name: "AI Research Lab",
            type: "research",
            requirements: ["Graduate Level", "Research Experience", "Professor Approval"],
            description: "Cutting-edge artificial intelligence research",
            icon: "🤖",
            applicationStatus: "pending"
        },
        {
            id: "student-gov",
            name: "Student Government",
            type: "leadership",
            requirements: ["Student Vote", "Leadership Experience", "Campus Involvement"],
            description: "Representing student voice in university decisions",
            icon: "🏛️",
            applicationStatus: null
        }
    ];
    const displaySpaces = exclusiveSpaces.length > 0 ? exclusiveSpaces : mockSpaces;
    const availableSpaces = displaySpaces.filter(space => space.applicationStatus !== "approved");
    const getStatusIcon = (status) => {
        switch (status) {
            case "pending":
                return (_jsx("div", { className: "w-5 h-5 bg-[#FFD700]/20 rounded-full flex items-center justify-center", children: _jsx("svg", { className: "w-3 h-3 text-[#FFD700]", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" }) }) }));
            case "approved":
                return (_jsx("div", { className: "w-5 h-5 bg-[#FFD700] rounded-full flex items-center justify-center", children: _jsx("svg", { className: "w-3 h-3 text-black", fill: "currentColor", viewBox: "0 0 20 20", children: _jsx("path", { fillRule: "evenodd", d: "M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z", clipRule: "evenodd" }) }) }));
            case "rejected":
                return (_jsx("div", { className: "w-5 h-5 bg-red-500/20 rounded-full flex items-center justify-center", children: _jsx("svg", { className: "w-3 h-3 text-red-400", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" }) }) }));
            default:
                return (_jsx("div", { className: "w-5 h-5 bg-[#2A2A2A] rounded-full flex items-center justify-center", children: _jsx("svg", { className: "w-3 h-3 text-muted", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }) }) }));
        }
    };
    const getTypeColor = (type) => {
        switch (type) {
            case "honors": return "text-[#FFD700]";
            case "research": return "text-blue-400";
            case "greek": return "text-purple-400";
            case "leadership": return "text-green-400";
            default: return "text-muted";
        }
    };
    return (_jsxs("div", { className: cn("h-full flex flex-col", className), children: [_jsxs("div", { className: "mb-4", children: [_jsxs("div", { className: "flex items-center gap-3 mb-2", children: [_jsx("div", { className: "w-8 h-8 bg-[#2A2A2A] rounded-lg flex items-center justify-center", children: _jsx("svg", { className: "w-5 h-5 text-[#FFD700]", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }) }) }), _jsx("h3", { className: "text-lg font-semibold text-foreground font-display", children: "Exclusive Access" })] }), _jsx("p", { className: "text-muted text-sm", children: "Apply to invitation-only spaces and programs" })] }), availableSpaces.length > 0 ? (_jsx(_Fragment, { children: _jsxs("div", { className: "flex-1 space-y-3 mb-4", children: [availableSpaces.slice(0, 3).map((space) => (_jsx("div", { className: "bg-[#2A2A2A]/40 rounded-lg p-3 border border-[#2A2A2A]/50 hover:border-[#FFD700]/30 hover:bg-[#2A2A2A]/60 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] group cursor-pointer", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "text-xl mt-0.5", children: space.icon }), _jsxs("div", { className: "flex-1 min-w-0", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h4", { className: "font-medium text-foreground text-sm group-hover:text-[#FFD700] transition-colors truncate", children: space.name }), _jsx("span", { className: cn("text-xs font-medium uppercase tracking-wide", getTypeColor(space.type)), children: space.type })] }), _jsx("p", { className: "text-xs text-muted mb-2 line-clamp-2", children: space.description }), _jsxs("div", { className: "flex items-center gap-1 mb-2", children: [_jsx("span", { className: "text-xs text-muted", children: "Requirements:" }), _jsxs("span", { className: "text-xs text-foreground", children: [space.requirements.slice(0, 2).join(", "), space.requirements.length > 2 && "..."] })] })] }), _jsxs("div", { className: "flex flex-col items-end gap-1", children: [getStatusIcon(space.applicationStatus), space.applicationStatus === "pending" && (_jsx("span", { className: "text-xs text-[#FFD700]", children: "Pending" }))] })] }) }, space.id))), availableSpaces.length > 3 && (_jsx("div", { className: "text-center pt-2", children: _jsxs("button", { className: "text-xs text-[#FFD700] hover:text-[#FFD700]/80 transition-colors", children: ["View all ", availableSpaces.length, " opportunities \u2192"] }) }))] }) })) : (
            /* Empty state */
            _jsxs("div", { className: "flex-1 flex flex-col items-center justify-center text-center py-6", children: [_jsx("div", { className: "w-12 h-12 bg-[#2A2A2A]/50 rounded-xl flex items-center justify-center mb-3", children: _jsx("svg", { className: "w-6 h-6 text-muted", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 1.5, d: "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" }) }) }), _jsx("h4", { className: "text-sm font-medium text-foreground mb-1", children: "All Caught Up" }), _jsx("p", { className: "text-xs text-muted", children: "No exclusive spaces available for application" })] })), _jsx("div", { className: "mt-auto", children: _jsx("div", { className: "p-3 bg-[#1A1A1A] rounded-lg border border-[#2A2A2A]/50", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("svg", { className: "w-4 h-4 text-muted", fill: "none", stroke: "currentColor", viewBox: "0 0 24 24", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }) }), _jsx("span", { className: "text-muted text-xs", children: "Need an invitation?" })] }), _jsx("button", { className: "text-xs text-[#FFD700] hover:text-[#FFD700]/80 transition-colors", children: "Browse All" })] }) }) })] }));
}
//# sourceMappingURL=request-access-card.js.map