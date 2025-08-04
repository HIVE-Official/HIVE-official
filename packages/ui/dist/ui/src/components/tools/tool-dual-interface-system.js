"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { HiveCard, HiveButton, HiveBadge } from '../index.js';
import { Settings, Eye, EyeOff, BarChart3, MessageSquare, Monitor, Play, Pause, Download, Zap } from 'lucide-react';
import { cn } from '../../lib/utils.js';
// Mock Interface Component (Utility Side - for leaders/builders)
const PollInterface = ({ toolState, onUpdate }) => (_jsxs("div", { className: "space-y-4", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "font-semibold text-gray-900", children: "Poll Configuration" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx(HiveBadge, { className: "bg-blue-100 text-blue-800 border-blue-200", children: "Interface" }), _jsxs(HiveBadge, { variant: "outline", children: [toolState?.responses?.length || 0, " responses"] })] })] }), _jsxs("div", { className: "p-4 bg-gray-50 rounded-lg", children: [_jsx("h4", { className: "font-medium mb-2", children: "Question" }), _jsx("input", { type: "text", value: toolState?.question || "What's your favorite study location?", onChange: (e) => onUpdate({ question: e.target.value }), className: "w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500" })] }), _jsxs("div", { className: "p-4 bg-gray-50 rounded-lg", children: [_jsx("h4", { className: "font-medium mb-2", children: "Options" }), _jsx("div", { className: "space-y-2", children: (toolState?.options || ['Library', 'Coffee Shop', 'Dorm Room', 'Study Hall']).map((option, index) => (_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("input", { type: "text", value: option, onChange: (e) => {
                                    const newOptions = [...(toolState?.options || [])];
                                    newOptions[index] = e.target.value;
                                    onUpdate({ options: newOptions });
                                }, className: "flex-1 px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500" }), _jsxs("span", { className: "ml-2 text-sm text-gray-500", children: [Math.floor(Math.random() * 20), " votes"] })] }, index))) })] }), _jsxs("div", { className: "grid grid-cols-2 gap-4", children: [_jsxs(HiveButton, { size: "sm", variant: "outline", children: [_jsx(BarChart3, { className: "w-4 h-4 mr-2" }), "View Analytics"] }), _jsxs(HiveButton, { size: "sm", variant: "outline", children: [_jsx(Download, { className: "w-4 h-4 mr-2" }), "Export Data"] })] })] }));
// Mock Surface Component (Informational Side - for Post Board)
const PollSurface = ({ toolState }) => (_jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx("h3", { className: "font-medium text-gray-900", children: toolState?.question || "What's your favorite study location?" }), _jsx(HiveBadge, { className: "bg-green-100 text-green-800 border-green-200", children: "Surface" })] }), _jsx("div", { className: "space-y-2", children: (toolState?.options || ['Library', 'Coffee Shop', 'Dorm Room', 'Study Hall']).map((option, index) => {
                const votes = Math.floor(Math.random() * 20);
                const percentage = Math.floor(Math.random() * 100);
                return (_jsxs("div", { className: "space-y-1", children: [_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { className: "text-gray-700", children: option }), _jsxs("span", { className: "text-gray-500", children: [votes, " votes (", percentage, "%)"] })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-amber-500 h-2 rounded-full transition-all duration-500", style: { width: `${percentage}%` } }) })] }, index));
            }) }), _jsxs("div", { className: "pt-2 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500", children: [_jsxs("span", { children: [Math.floor(Math.random() * 50) + 10, " total responses"] }), _jsxs("span", { children: ["Updated ", Math.floor(Math.random() * 10) + 1, "m ago"] })] })] }));
const InterfacePreviewCard = ({ interface: iface, isActive, onToggle, onConfigure }) => (_jsx(HiveCard, { className: cn("p-4 transition-all", isActive ? "ring-2 ring-amber-500 bg-amber-50" : "hover:shadow-md"), children: _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "flex items-start justify-between", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-2 mb-1", children: [_jsx("h4", { className: "font-semibold text-gray-900", children: iface.title }), _jsx(HiveBadge, { className: iface.type === 'interface'
                                            ? "bg-blue-100 text-blue-800 border-blue-200"
                                            : "bg-green-100 text-green-800 border-green-200", children: iface.type === 'interface' ? 'Interface' : 'Surface' })] }), _jsx("p", { className: "text-sm text-gray-600", children: iface.description })] }), _jsxs("div", { className: "flex items-center gap-1", children: [_jsx(HiveButton, { size: "sm", variant: "outline", onClick: onConfigure, children: _jsx(Settings, { className: "w-3 h-3" }) }), _jsx(HiveButton, { size: "sm", variant: isActive ? "primary" : "outline", onClick: onToggle, children: isActive ? _jsx(Eye, { className: "w-3 h-3" }) : _jsx(EyeOff, { className: "w-3 h-3" }) })] })] }), _jsxs("div", { className: "grid grid-cols-3 gap-2 text-xs", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-lg font-semibold text-gray-900", children: iface.analytics.views }), _jsx("div", { className: "text-gray-500", children: "Views" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-lg font-semibold text-gray-900", children: iface.analytics.interactions }), _jsx("div", { className: "text-gray-500", children: "Interactions" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-lg font-semibold text-gray-900", children: [Math.floor((Date.now() - iface.analytics.lastUsed.getTime()) / (1000 * 60)), "m"] }), _jsx("div", { className: "text-gray-500", children: "Last Used" })] })] }), _jsx("div", { className: "pt-2 border-t border-gray-200", children: _jsx("div", { className: "flex items-center justify-between text-xs text-gray-500", children: _jsxs("div", { className: "flex items-center gap-4", children: [_jsxs("span", { className: cn("flex items-center gap-1", iface.visibility.showInToolGrid && "text-green-600"), children: [_jsx(Monitor, { className: "w-3 h-3" }), "Tool Grid: ", iface.visibility.showInToolGrid ? 'Yes' : 'No'] }), _jsxs("span", { className: cn("flex items-center gap-1", iface.visibility.showInPostBoard && "text-green-600"), children: [_jsx(MessageSquare, { className: "w-3 h-3" }), "Post Board: ", iface.visibility.showInPostBoard ? 'Yes' : 'No'] })] }) }) })] }) }));
export function ToolDualInterfaceSystem({ toolId, toolName, toolDescription, isLeaderView = false, isActive = true, onToggleInterface, onToggleActive, onConfigureInterface, onConfigureSurface, className }) {
    const [currentView, setCurrentView] = useState(isLeaderView ? 'interface' : 'surface');
    const [toolState, setToolState] = useState({
        isActive,
        currentUsers: Math.floor(Math.random() * 10) + 1,
        totalInteractions: Math.floor(Math.random() * 100) + 50,
        lastActivity: new Date(),
        surfaceData: {},
        interfaceData: {}
    });
    // Mock interfaces for demonstration
    const toolInterfaces = useMemo(() => [
        {
            id: 'poll_interface',
            type: 'interface',
            title: 'Poll Configuration',
            description: 'Create and manage poll questions, options, and settings',
            component: PollInterface,
            permissions: {
                canView: ['leader', 'admin', 'moderator'],
                canEdit: ['leader', 'admin'],
                canInteract: ['leader', 'admin', 'moderator']
            },
            visibility: {
                showInToolGrid: true,
                showInPostBoard: false,
                requiresAuth: true
            },
            analytics: {
                views: Math.floor(Math.random() * 50) + 10,
                interactions: Math.floor(Math.random() * 30) + 5,
                lastUsed: new Date(Date.now() - Math.random() * 3600000)
            }
        },
        {
            id: 'poll_surface',
            type: 'surface',
            title: 'Poll Results Display',
            description: 'Public view of poll results and voting interface',
            component: PollSurface,
            permissions: {
                canView: ['member', 'leader', 'admin', 'guest'],
                canEdit: [],
                canInteract: ['member', 'leader', 'admin']
            },
            visibility: {
                showInToolGrid: false,
                showInPostBoard: true,
                requiresAuth: false
            },
            analytics: {
                views: Math.floor(Math.random() * 200) + 50,
                interactions: Math.floor(Math.random() * 100) + 20,
                lastUsed: new Date(Date.now() - Math.random() * 1800000)
            }
        }
    ], []);
    const activeInterface = toolInterfaces.find(iface => iface.type === 'interface');
    const activeSurface = toolInterfaces.find(iface => iface.type === 'surface');
    const handleViewChange = (view) => {
        setCurrentView(view);
        if (view !== 'both') {
            onToggleInterface?.(view === 'interface');
        }
    };
    const handleToolStateUpdate = (data) => {
        setToolState(prev => ({
            ...prev,
            interfaceData: { ...prev.interfaceData, ...data },
            lastActivity: new Date()
        }));
    };
    return (_jsxs("div", { className: cn("space-y-6", className), children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsxs("h2", { className: "text-2xl font-bold text-gray-900 flex items-center gap-2", children: [_jsx(Zap, { className: "w-6 h-6 text-amber-500" }), toolName] }), _jsx("p", { className: "text-gray-600", children: toolDescription })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "flex items-center gap-2", children: [_jsx("span", { className: "text-sm text-gray-600", children: "Status:" }), _jsx(HiveBadge, { className: toolState.isActive
                                            ? "bg-green-100 text-green-800 border-green-200"
                                            : "bg-red-100 text-red-800 border-red-200", children: toolState.isActive ? 'Active' : 'Inactive' })] }), _jsxs(HiveButton, { variant: "outline", onClick: onToggleActive, children: [toolState.isActive ? _jsx(Pause, { className: "w-4 h-4 mr-2" }) : _jsx(Play, { className: "w-4 h-4 mr-2" }), toolState.isActive ? 'Deactivate' : 'Activate'] })] })] }), _jsxs("div", { className: "flex items-center justify-between p-4 bg-gray-50 rounded-lg", children: [_jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-gray-900", children: "Interface View" }), _jsx("p", { className: "text-sm text-gray-600", children: "Switch between Interface (utility) and Surface (informational) views" })] }), _jsxs("div", { className: "flex items-center bg-white rounded-lg p-1 shadow-sm", children: [_jsxs(HiveButton, { size: "sm", variant: currentView === 'interface' ? 'primary' : 'ghost', onClick: () => handleViewChange('interface'), children: [_jsx(Settings, { className: "w-4 h-4 mr-1" }), "Interface"] }), _jsxs(HiveButton, { size: "sm", variant: currentView === 'surface' ? 'primary' : 'ghost', onClick: () => handleViewChange('surface'), children: [_jsx(Eye, { className: "w-4 h-4 mr-1" }), "Surface"] }), _jsxs(HiveButton, { size: "sm", variant: currentView === 'both' ? 'primary' : 'ghost', onClick: () => handleViewChange('both'), children: [_jsx(Monitor, { className: "w-4 h-4 mr-1" }), "Both"] })] })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-4", children: [_jsxs(HiveCard, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-gray-900", children: toolState.currentUsers }), _jsx("div", { className: "text-sm text-gray-500", children: "Active Users" })] }), _jsxs(HiveCard, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-green-600", children: toolState.totalInteractions }), _jsx("div", { className: "text-sm text-gray-500", children: "Total Interactions" })] }), _jsxs(HiveCard, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-blue-600", children: activeInterface?.analytics.views || 0 }), _jsx("div", { className: "text-sm text-gray-500", children: "Interface Views" })] }), _jsxs(HiveCard, { className: "p-4 text-center", children: [_jsx("div", { className: "text-2xl font-bold text-purple-600", children: activeSurface?.analytics.views || 0 }), _jsx("div", { className: "text-sm text-gray-500", children: "Surface Views" })] })] }), _jsx("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: toolInterfaces.map((iface) => (_jsx(InterfacePreviewCard, { interface: iface, isActive: (currentView === 'both') ||
                        (currentView === 'interface' && iface.type === 'interface') ||
                        (currentView === 'surface' && iface.type === 'surface'), onToggle: () => {
                        const newView = iface.type === 'interface' ? 'interface' : 'surface';
                        handleViewChange(newView);
                    }, onConfigure: () => {
                        if (iface.type === 'interface') {
                            onConfigureInterface?.();
                        }
                        else {
                            onConfigureSurface?.();
                        }
                    } }, iface.id))) }), _jsxs("div", { className: "space-y-4", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900", children: "Live Preview" }), _jsxs("div", { className: cn("grid gap-6", currentView === 'both' ? "lg:grid-cols-2" : "lg:grid-cols-1"), children: [(currentView === 'interface' || currentView === 'both') && activeInterface && (_jsxs(HiveCard, { className: "p-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Settings, { className: "w-5 h-5 text-blue-600" }), _jsx("h4", { className: "font-semibold text-gray-900", children: "Interface View (Leaders/Builders)" }), _jsx(HiveBadge, { className: "bg-blue-100 text-blue-800 border-blue-200", children: "Utility Side" })] }), _jsx(PollInterface, { toolState: toolState.interfaceData, onUpdate: handleToolStateUpdate })] })), (currentView === 'surface' || currentView === 'both') && activeSurface && (_jsxs(HiveCard, { className: "p-6", children: [_jsxs("div", { className: "flex items-center gap-2 mb-4", children: [_jsx(Eye, { className: "w-5 h-5 text-green-600" }), _jsx("h4", { className: "font-semibold text-gray-900", children: "Surface View (Post Board)" }), _jsx(HiveBadge, { className: "bg-green-100 text-green-800 border-green-200", children: "Informational Side" })] }), _jsx(PollSurface, { toolState: toolState.interfaceData })] }))] })] }), _jsxs(HiveCard, { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold text-gray-900 mb-4", children: "Usage Analytics" }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: [_jsxs("div", { children: [_jsx("h4", { className: "font-medium text-gray-900 mb-2", children: "Interface vs Surface Usage" }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { children: "Interface Views" }), _jsx("span", { className: "font-medium", children: activeInterface?.analytics.views || 0 })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-blue-500 h-2 rounded-full", style: { width: '35%' } }) }), _jsxs("div", { className: "flex items-center justify-between text-sm", children: [_jsx("span", { children: "Surface Views" }), _jsx("span", { className: "font-medium", children: activeSurface?.analytics.views || 0 })] }), _jsx("div", { className: "w-full bg-gray-200 rounded-full h-2", children: _jsx("div", { className: "bg-green-500 h-2 rounded-full", style: { width: '65%' } }) })] })] }), _jsxs("div", { children: [_jsx("h4", { className: "font-medium text-gray-900 mb-2", children: "Interaction Timeline" }), _jsxs("div", { className: "text-sm text-gray-600", children: [_jsxs("p", { children: ["Last interface interaction: ", Math.floor(Math.random() * 30) + 1, "m ago"] }), _jsxs("p", { children: ["Last surface interaction: ", Math.floor(Math.random() * 10) + 1, "m ago"] }), _jsxs("p", { children: ["Peak usage: ", Math.floor(Math.random() * 12) + 1, ":00 PM"] })] })] })] })] })] }));
}
export default ToolDualInterfaceSystem;
//# sourceMappingURL=tool-dual-interface-system.js.map