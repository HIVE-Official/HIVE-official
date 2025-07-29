"use client";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Users, QrCode, BarChart3, MessageSquare, Settings, Play, Pause, RotateCcw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../hive-button';
import { Badge } from '../../ui/badge';
import { cn } from '../../../lib/utils';
// Available Event System Components
const EVENT_SYSTEM_COMPONENTS = {
    'event-creator': {
        id: 'event-creator',
        name: 'Event Creator',
        description: 'Professional event planning',
        icon: Calendar,
        color: 'var(--hive-brand-secondary)',
        status: 'active'
    },
    'rsvp-manager': {
        id: 'rsvp-manager',
        name: 'RSVP Manager',
        description: 'Attendance coordination',
        icon: Users,
        color: 'var(--hive-status-success)',
        status: 'active'
    },
    'check-in-system': {
        id: 'check-in-system',
        name: 'Check-in System',
        description: 'QR code attendance tracking',
        icon: QrCode,
        color: 'var(--hive-status-info)',
        status: 'active'
    },
    'event-calendar': {
        id: 'event-calendar',
        name: 'Event Calendar',
        description: 'Integrated scheduling',
        icon: Calendar,
        color: 'var(--hive-status-info)',
        status: 'active'
    },
    'feedback-collector': {
        id: 'feedback-collector',
        name: 'Feedback Collector',
        description: 'Post-event analysis',
        icon: MessageSquare,
        color: 'var(--hive-status-warning)',
        status: 'active'
    }
};
// Animation variants
const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2
        }
    }
};
const componentVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 10 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    },
    hover: {
        scale: 1.02,
        y: -2,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 25
        }
    }
};
export const EventSystemContainer = ({ installationId, configuration, onSystemUpdate, onComponentAction, className }) => {
    // System state management
    const [systemState, setSystemState] = useState({
        systemId: "event-management-system",
        installedComponents: Object.keys(EVENT_SYSTEM_COMPONENTS),
        systemConfiguration: configuration,
        componentStates: new Map(),
        dataFlow: new Map(),
        integrations: {
            calendar: { status: 'connected', lastSync: new Date() },
            notifications: { status: 'active' },
            spaces: { status: 'connected' }
        },
        systemAnalytics: {
            eventsCreated: 0,
            totalAttendees: 0,
            averageAttendance: 0.85,
            memberEngagement: 0.67
        },
        lastSync: new Date()
    });
    const [activeComponent, setActiveComponent] = useState(null);
    const [systemRunning, setSystemRunning] = useState(true);
    // System context for inter-component communication
    const systemContext = useMemo(() => ({
        state: systemState,
        registerComponent: (componentId, componentState) => {
            setSystemState(prev => ({
                ...prev,
                componentStates: new Map(prev.componentStates).set(componentId, componentState)
            }));
        },
        updateComponent: (componentId, updates) => {
            setSystemState(prev => {
                const newComponentStates = new Map(prev.componentStates);
                const currentState = newComponentStates.get(componentId) || {};
                newComponentStates.set(componentId, { ...currentState, ...updates });
                return {
                    ...prev,
                    componentStates: newComponentStates
                };
            });
        },
        shareData: (fromComponent, data) => {
            setSystemState(prev => ({
                ...prev,
                dataFlow: new Map(prev.dataFlow).set(`${fromComponent}:shared`, data),
                lastSync: new Date()
            }));
        },
        subscribeToData: (componentId, callback) => {
            // In a real implementation, this would set up real-time subscriptions
            const data = systemState.dataFlow.get(`${componentId}:shared`);
            if (data)
                callback(data);
        }
    }), [systemState]);
    // System coordination methods
    const createEvent = useCallback(async (eventData) => {
        try {
            // Coordinate event creation across system
            await onComponentAction?.('event-creator', 'createEvent', eventData);
            // Auto-initialize RSVP if enabled
            if (systemState.installedComponents.includes('rsvp-manager') && eventData?.id) {
                await onComponentAction?.('rsvp-manager', 'initializeRSVP', { eventId: eventData.id });
            }
            // Setup calendar integration
            if (systemState.installedComponents.includes('event-calendar')) {
                await onComponentAction?.('event-calendar', 'addEvent', eventData);
            }
            // Update system analytics
            setSystemState(prev => ({
                ...prev,
                systemAnalytics: {
                    ...prev.systemAnalytics,
                    eventsCreated: prev.systemAnalytics.eventsCreated + 1
                },
                lastSync: new Date()
            }));
            return eventData;
        }
        catch (error) {
            console.error('Event System: Failed to create event', error);
            throw error;
        }
    }, [systemState.installedComponents, onComponentAction]);
    // System health monitoring
    useEffect(() => {
        const healthCheck = setInterval(() => {
            // Check integration status
            setSystemState(prev => ({
                ...prev,
                integrations: {
                    ...prev.integrations,
                    calendar: {
                        ...prev.integrations.calendar,
                        lastSync: new Date()
                    }
                },
                lastSync: new Date()
            }));
        }, 30000); // Check every 30 seconds
        return () => clearInterval(healthCheck);
    }, []);
    // Notify parent of system updates
    useEffect(() => {
        onSystemUpdate?.(systemState);
    }, [systemState, onSystemUpdate]);
    const handleComponentLaunch = (componentId) => {
        setActiveComponent(componentId);
        onComponentAction?.(componentId, 'launch');
    };
    const handleSystemToggle = () => {
        setSystemRunning(prev => !prev);
        onComponentAction?.('system', systemRunning ? 'pause' : 'resume');
    };
    const handleSystemReset = () => {
        setSystemState(prev => ({
            ...prev,
            componentStates: new Map(),
            dataFlow: new Map(),
            lastSync: new Date()
        }));
        onComponentAction?.('system', 'reset');
    };
    return (_jsxs(motion.div, { className: cn("event-system-container space-y-6", className), variants: containerVariants, initial: "hidden", animate: "visible", children: [_jsx(motion.div, { variants: componentVariants, children: _jsxs(Card, { className: "bg-gradient-to-br from-[var(--hive-brand-secondary)]/10 to-[var(--hive-brand-secondary)]/5 border-[var(--hive-brand-secondary)]/20", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center space-x-3", children: [_jsx("div", { className: "w-12 h-12 bg-[var(--hive-brand-secondary)] rounded-xl flex items-center justify-center", children: _jsx(Calendar, { className: "h-6 w-6 text-[var(--hive-background-primary)]" }) }), _jsxs("div", { children: [_jsx(CardTitle, { className: "text-xl font-bold", children: "Event Management System" }), _jsx("p", { className: "text-sm text-gray-600", children: "Complete event coordination solution" })] })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx(Badge, { variant: systemRunning ? "default" : "secondary", className: systemRunning ? "bg-green-500" : "", children: systemRunning ? "Active" : "Paused" }), _jsx(Button, { variant: "outline", size: "sm", onClick: handleSystemToggle, children: systemRunning ? _jsx(Pause, { className: "h-4 w-4" }) : _jsx(Play, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "outline", size: "sm", onClick: handleSystemReset, children: _jsx(RotateCcw, { className: "h-4 w-4" }) }), _jsx(Button, { variant: "outline", size: "sm", children: _jsx(Settings, { className: "h-4 w-4" }) })] })] }) }), _jsxs(CardContent, { children: [_jsxs("div", { className: "grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6", children: [_jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-brand-secondary)]", children: systemState.systemAnalytics.eventsCreated }), _jsx("div", { className: "text-sm text-gray-600", children: "Events Created" })] }), _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "text-2xl font-bold text-[var(--hive-status-success)]", children: systemState.systemAnalytics.totalAttendees }), _jsx("div", { className: "text-sm text-gray-600", children: "Total Attendees" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-[var(--hive-status-info)]", children: [Math.round(systemState.systemAnalytics.averageAttendance * 100), "%"] }), _jsx("div", { className: "text-sm text-gray-600", children: "Avg Attendance" })] }), _jsxs("div", { className: "text-center", children: [_jsxs("div", { className: "text-2xl font-bold text-[var(--hive-status-info)]", children: [Math.round(systemState.systemAnalytics.memberEngagement * 100), "%"] }), _jsx("div", { className: "text-sm text-gray-600", children: "Engagement" })] })] }), _jsxs("div", { className: "flex items-center justify-between text-sm text-gray-600", children: [_jsxs("div", { className: "flex items-center space-x-4", children: [_jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: cn("w-2 h-2 rounded-full", systemState.integrations.calendar.status === 'connected' ? "bg-green-500" : "bg-red-500") }), _jsx("span", { children: "Calendar" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: cn("w-2 h-2 rounded-full", systemState.integrations.notifications.status === 'active' ? "bg-green-500" : "bg-red-500") }), _jsx("span", { children: "Notifications" })] }), _jsxs("div", { className: "flex items-center space-x-2", children: [_jsx("div", { className: cn("w-2 h-2 rounded-full", systemState.integrations.spaces.status === 'connected' ? "bg-green-500" : "bg-red-500") }), _jsx("span", { children: "Spaces" })] })] }), _jsxs("div", { children: ["Last sync: ", systemState.lastSync.toLocaleTimeString()] })] })] })] }) }), _jsx(motion.div, { variants: componentVariants, children: _jsxs(Card, { children: [_jsx(CardHeader, { children: _jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx(BarChart3, { className: "h-5 w-5 text-[var(--hive-brand-secondary)]" }), _jsx("span", { children: "System Components" })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: _jsx(AnimatePresence, { mode: "popLayout", children: Object.values(EVENT_SYSTEM_COMPONENTS).map((component) => {
                                        const IconComponent = component.icon;
                                        const isActive = activeComponent === component.id;
                                        return (_jsx(motion.div, { layout: true, variants: componentVariants, whileHover: "hover", initial: "hidden", animate: "visible", children: _jsx(Card, { className: cn("cursor-pointer transition-all duration-200", isActive
                                                    ? "border-[var(--hive-brand-secondary)] bg-[var(--hive-brand-secondary)]/5"
                                                    : "hover:border-gray-300"), onClick: () => handleComponentLaunch(component.id), children: _jsxs(CardContent, { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsx("div", { className: "w-10 h-10 rounded-lg flex items-center justify-center", style: { backgroundColor: `${component.color}20`, color: component.color }, children: _jsx(IconComponent, { className: "h-5 w-5" }) }), _jsx(Badge, { variant: component.status === 'active' ? "default" : "secondary", className: "text-xs", children: component.status })] }), _jsx("h3", { className: "font-semibold text-sm mb-1", children: component.name }), _jsx("p", { className: "text-xs text-gray-600", children: component.description })] }) }) }, component.id));
                                    }) }) }) })] }) }), _jsx(AnimatePresence, { mode: "wait", children: activeComponent && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, children: _jsxs(Card, { className: "min-h-100", children: [_jsx(CardHeader, { children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs(CardTitle, { className: "flex items-center space-x-2", children: [_jsx("div", { className: "w-8 h-8 rounded-lg flex items-center justify-center", style: {
                                                        backgroundColor: `${EVENT_SYSTEM_COMPONENTS[activeComponent]?.color}20`,
                                                        color: EVENT_SYSTEM_COMPONENTS[activeComponent]?.color
                                                    }, children: React.createElement(EVENT_SYSTEM_COMPONENTS[activeComponent]?.icon, { className: "h-4 w-4" }) }), _jsx("span", { children: EVENT_SYSTEM_COMPONENTS[activeComponent]?.name })] }), _jsx(Button, { variant: "outline", size: "sm", onClick: () => setActiveComponent(null), children: "Close" })] }) }), _jsx(CardContent, { children: _jsx("div", { className: "flex items-center justify-center h-64 text-gray-500", children: _jsxs("div", { className: "text-center", children: [_jsx("div", { className: "w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-4", children: React.createElement(EVENT_SYSTEM_COMPONENTS[activeComponent]?.icon, { className: "h-8 w-8" }) }), _jsx("h3", { className: "font-semibold mb-2", children: EVENT_SYSTEM_COMPONENTS[activeComponent]?.name }), _jsx("p", { className: "text-sm", children: "Component interface will be implemented here" })] }) }) })] }) })) })] }));
};
export default EventSystemContainer;
//# sourceMappingURL=EventSystemContainer.js.map