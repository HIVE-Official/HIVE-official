'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Users, UserPlus, MapPin, Lightbulb, GraduationCap, Coffee, AlertCircle, Loader2 } from 'lucide-react';
export const CampusConnections = ({ connections, isLoading = false, error, onConnectionClick }) => {
    if (isLoading) {
        return (_jsx(Card, { className: "p-6", children: _jsx("div", { className: "flex items-center justify-center py-4", children: _jsx(Loader2, { className: "h-6 w-6 animate-spin text-[var(--hive-brand-secondary)]" }) }) }));
    }
    if (error) {
        return (_jsx(Card, { className: "p-6", children: _jsx("div", { className: "flex items-center justify-center py-4 text-center", children: _jsxs("div", { children: [_jsx(AlertCircle, { className: "h-8 w-8 text-red-400 mx-auto mb-2" }), _jsx("p", { className: "text-red-400 mb-2", children: "Failed to load connections" }), _jsx("p", { className: "text-sm text-gray-400", children: error })] }) }) }));
    }
    const getConnectionIcon = (type) => {
        switch (type) {
            case 'dorm_classmate':
                return _jsx(MapPin, { className: "h-4 w-4" });
            case 'tool_usage':
                return _jsx(Lightbulb, { className: "h-4 w-4" });
            case 'multi_overlap':
                return _jsx(Users, { className: "h-4 w-4" });
            case 'tool_collaboration':
                return _jsx(Lightbulb, { className: "h-4 w-4" });
            case 'cultural_connection':
                return _jsx(Coffee, { className: "h-4 w-4" });
            case 'mentorship':
                return _jsx(GraduationCap, { className: "h-4 w-4" });
            case 'alumni_network':
                return _jsx(Users, { className: "h-4 w-4" });
            default:
                return _jsx(UserPlus, { className: "h-4 w-4" });
        }
    };
    const getConnectionColor = (type) => {
        switch (type) {
            case 'dorm_classmate':
                return 'from-blue-500/20 to-blue-600/20 border-blue-500/30';
            case 'tool_usage':
                return 'from-purple-500/20 to-purple-600/20 border-purple-500/30';
            case 'multi_overlap':
                return 'from-green-500/20 to-green-600/20 border-green-500/30';
            case 'tool_collaboration':
                return 'from-hive-gold/20 to-yellow-400/20 border-hive-gold/30';
            case 'cultural_connection':
                return 'from-orange-500/20 to-orange-600/20 border-orange-500/30';
            case 'mentorship':
                return 'from-indigo-500/20 to-indigo-600/20 border-indigo-500/30';
            case 'alumni_network':
                return 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30';
            default:
                return 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
        }
    };
    const getConnectionPriority = (type) => {
        switch (type) {
            case 'dorm_classmate':
                return 'High';
            case 'tool_collaboration':
                return 'High';
            case 'multi_overlap':
                return 'Medium';
            case 'mentorship':
                return 'High';
            default:
                return 'Medium';
        }
    };
    return (_jsxs(Card, { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-6", children: [_jsxs("h2", { className: "text-xl font-semibold text-[var(--hive-text-primary)] flex items-center gap-2", children: [_jsx(Users, { className: "h-5 w-5 text-[var(--hive-brand-secondary)]" }), "Campus Connections"] }), _jsx(Badge, { variant: "skill-tag", className: "text-xs", children: "Smart Discovery" })] }), connections.length === 0 ? (_jsxs("div", { className: "text-center py-4", children: [_jsx(Users, { className: "h-12 w-12 text-gray-500 mx-auto mb-4" }), _jsx("p", { className: "text-gray-400 mb-2", children: "No connections found" }), _jsx("p", { className: "text-sm text-gray-500", children: "Join more spaces to discover connections" })] })) : (_jsx("div", { className: "space-y-4", children: connections.map((connection) => (_jsx("div", { className: `bg-gradient-to-r ${getConnectionColor(connection.type)} border rounded-lg p-4 hover:border-opacity-60 transition-all cursor-pointer`, onClick: () => onConnectionClick?.(connection.id), children: _jsx("div", { className: "flex items-start justify-between", children: _jsxs("div", { className: "flex items-start gap-3", children: [_jsx("div", { className: "w-10 h-10 bg-[var(--hive-text-primary)]/10 rounded-lg flex items-center justify-center", children: getConnectionIcon(connection.type) }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-[var(--hive-text-primary)] mb-2", children: connection.message }), connection.people.length > 0 && (_jsxs("div", { className: "flex items-center gap-2 text-sm text-gray-300 mb-2", children: [_jsx(Users, { className: "h-3 w-3" }), _jsx("span", { children: connection.people.slice(0, 3).join(', ') }), connection.people.length > 3 && (_jsxs("span", { className: "text-[var(--hive-brand-secondary)]", children: ["+", connection.people.length - 3, " others"] }))] })), _jsxs("div", { className: "flex items-center gap-2", children: [_jsxs(Badge, { variant: getConnectionPriority(connection.type) === 'High' ? 'active-tag' : 'skill-tag', className: "text-xs", children: [getConnectionPriority(connection.type), " Priority"] }), _jsx(Button, { variant: "ghost", size: "sm", className: "text-xs h-6 px-2", onClick: (e) => {
                                                        e.stopPropagation();
                                                        onConnectionClick?.(connection.id);
                                                    }, children: connection.action })] })] })] }) }) }, connection.id))) })), connections.length > 0 && (_jsx("div", { className: "mt-6 pt-6 border-t border-hive-border-secondary", children: _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsxs("span", { className: "text-gray-400", children: [connections.length, " connection opportunities found"] }), _jsx(Button, { variant: "ghost", size: "sm", children: "View All Connections" })] }) })), _jsxs("div", { className: "mt-4 p-3 bg-[var(--hive-brand-secondary)]/10 rounded-lg border border-hive-gold/20", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx(Lightbulb, { className: "h-4 w-4 text-[var(--hive-brand-secondary)]" }), _jsx("span", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: "Pro Tip" })] }), _jsx("p", { className: "text-xs text-gray-300", children: "Join more spaces and use tools to discover better connections with your classmates!" })] })] }));
};
export default CampusConnections;
//# sourceMappingURL=campus-connections.js.map