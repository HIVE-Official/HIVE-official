import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ProfileSystem } from '../../components/profile/profile-system';
import { CalendarCard } from '../../components/profile/calendar-card';
import { useState, useEffect } from 'react';
const meta = {
    title: 'Profile/🎮 Interactive Demos',
    component: ProfileSystem,
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Interactive demonstrations showing real-time features, state changes, and user interactions. These stories simulate actual user behavior patterns.',
            },
        },
    },
    tags: ['autodocs'],
};
export default meta;
// Real-time Calendar Updates
export const LiveCalendarUpdates = {
    name: '⏰ Live Calendar Updates',
    render: () => {
        const [currentTime, setCurrentTime] = useState(new Date());
        const [eventsToday, setEventsToday] = useState([
            {
                id: '1',
                title: '🧪 Chemistry Lab',
                time: '2:00 PM',
                type: 'academic',
                location: 'Science Building 201',
                attendees: ['Lab Partner'],
                metadata: { duration: '3 hours' }
            },
            {
                id: '2',
                title: '📚 Study Group',
                time: '5:00 PM',
                type: 'study',
                location: 'Library Study Room',
                attendees: ['Study partners'],
                metadata: { subject: 'Organic Chemistry' }
            }
        ]);
        useEffect(() => {
            const timer = setInterval(() => {
                setCurrentTime(new Date());
            }, 1000);
            return () => clearInterval(timer);
        }, []);
        return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "bg-green-500/20 border border-green-500/30 p-4 rounded-lg", children: [_jsx("h2", { className: "text-xl font-bold text-green-300 mb-2", children: "\u23F0 Live Calendar Updates" }), _jsxs("p", { className: "text-green-200 mb-2", children: ["Current time: ", currentTime.toLocaleTimeString()] }), _jsx("div", { className: "text-sm text-green-300", children: "\uD83D\uDD34 Live updates every second | \uD83D\uDCC5 Events auto-refresh | \u26A1 Real-time synchronization" })] }), _jsx(CalendarCard, { state: "default", variant: "desktop", data: {
                        nextEvent: eventsToday[0],
                        upcomingEvents: eventsToday.slice(1),
                        todaysEvents: eventsToday,
                        connections: [
                            {
                                id: 'live-google',
                                name: 'Google Calendar (Live)',
                                type: 'google',
                                status: 'connected',
                                lastSync: currentTime,
                                color: 'var(--hive-status-info)'
                            }
                        ],
                        conflicts: []
                    } })] }));
    }
};
// Interactive Notification Flow
export const InteractiveNotificationFlow = {
    name: '🔔 Interactive Notifications',
    render: () => {
        const [notifications, setNotifications] = useState([
            {
                id: 'notif-1',
                title: 'Class Reminder',
                message: 'Chemistry Lab starts in 30 minutes',
                timestamp: new Date(),
                type: 'academic',
                isRead: false
            }
        ]);
        const notificationTypes = [
            {
                title: 'New Assignment',
                message: 'Organic Chemistry Problem Set uploaded',
                type: 'academic'
            },
            {
                title: 'Study Group',
                message: 'Sarah invited you to study session',
                type: 'social'
            },
            {
                title: 'Grade Posted',
                message: 'Quiz 3 results are available',
                type: 'academic'
            }
        ];
        useEffect(() => {
            const timer = setInterval(() => {
                const randomNotification = notificationTypes[Math.floor(Math.random() * notificationTypes.length)];
                setNotifications(prev => [...prev, {
                        id: `notif-${Date.now()}`,
                        ...randomNotification,
                        timestamp: new Date(),
                        isRead: false
                    }]);
            }, 5000);
            return () => clearInterval(timer);
        }, []);
        return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "bg-blue-500/20 border border-blue-500/30 p-4 rounded-lg", children: [_jsx("h2", { className: "text-xl font-bold text-blue-300 mb-2", children: "\uD83D\uDD14 Live Notifications" }), _jsx("p", { className: "text-blue-200 mb-4", children: "New notifications appear every 5 seconds" })] }), _jsxs("div", { className: "bg-hive-background-secondary p-4 rounded-lg", children: [_jsx("h3", { className: "font-medium text-[var(--hive-text-primary)] mb-4", children: "Recent Notifications" }), _jsx("div", { className: "space-y-2 max-h-64 overflow-y-auto", children: notifications.slice(-5).reverse().map((notif) => (_jsxs("div", { className: "flex items-start gap-3 p-3 bg-hive-background-tertiary rounded", children: [_jsx("div", { className: `w-2 h-2 rounded-full mt-2 ${notif.isRead ? 'bg-gray-500' : 'bg-[var(--hive-brand-secondary)]'}` }), _jsxs("div", { className: "flex-1", children: [_jsx("p", { className: "text-sm font-medium text-[var(--hive-text-primary)]", children: notif.title }), _jsx("p", { className: "text-xs text-gray-400", children: notif.message }), _jsx("p", { className: "text-xs text-gray-500", children: notif.timestamp.toLocaleTimeString() })] })] }, notif.id))) })] })] }));
    }
};
// Progressive Loading States
export const ProgressiveLoadingStates = {
    name: '⚡ Progressive Loading',
    render: () => {
        const [loadingState, setLoadingState] = useState('skeleton');
        const [progress, setProgress] = useState(0);
        useEffect(() => {
            const states = ['skeleton', 'partial', 'complete'];
            let currentIndex = 0;
            let progressValue = 0;
            const timer = setInterval(() => {
                progressValue += 10;
                setProgress(progressValue);
                if (progressValue >= 100) {
                    currentIndex = (currentIndex + 1) % states.length;
                    setLoadingState(states[currentIndex]);
                    progressValue = 0;
                    setProgress(0);
                }
            }, 300);
            return () => clearInterval(timer);
        }, []);
        return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "bg-purple-500/20 border border-purple-500/30 p-4 rounded-lg", children: [_jsx("h2", { className: "text-xl font-bold text-purple-300 mb-2", children: "\u26A1 Progressive Loading" }), _jsxs("p", { className: "text-purple-200 mb-4", children: ["Current state: ", _jsx("span", { className: "font-mono", children: loadingState })] }), _jsx("div", { className: "w-full bg-gray-700 rounded-full h-2", children: _jsx("div", { className: "bg-purple-400 h-2 rounded-full transition-all duration-300", style: { width: `${progress}%` } }) })] }), _jsx(CalendarCard, { state: loadingState, variant: "desktop", data: {
                        nextEvent: loadingState === 'complete' ? {
                            id: 'loaded-event',
                            title: 'Fully Loaded Event',
                            time: '1 hour',
                            type: 'academic',
                            location: 'Academic Building',
                            attendees: ['Students'],
                            metadata: {
                                loadingDemo: true,
                                state: loadingState
                            }
                        } : undefined,
                        upcomingEvents: loadingState !== 'skeleton' ? [
                            {
                                id: 'partial-event',
                                title: 'Partially Loaded Event',
                                time: '3:00 PM',
                                type: 'study',
                                location: 'Library',
                                attendees: ['Study group']
                            }
                        ] : [],
                        todaysEvents: [],
                        connections: [{
                                id: 'progressive-sync',
                                name: 'Progressive Sync',
                                type: 'google',
                                status: loadingState === 'skeleton' ? 'syncing' : 'connected',
                                lastSync: new Date(),
                                color: 'var(--hive-status-info)'
                            }],
                        conflicts: []
                    } })] }));
    }
};
// Responsive Breakpoint Demo
export const ResponsiveBreakpointDemo = {
    name: '📱 Responsive Breakpoints',
    render: () => {
        const [windowWidth, setWindowWidth] = useState(1200);
        const breakpoints = [
            { name: 'Mobile', width: 375 },
            { name: 'Tablet', width: 768 },
            { name: 'Desktop', width: 1024 },
            { name: 'Large', width: 1440 }
        ];
        useEffect(() => {
            let currentIndex = 0;
            const timer = setInterval(() => {
                currentIndex = (currentIndex + 1) % breakpoints.length;
                setWindowWidth(breakpoints[currentIndex].width);
            }, 3000);
            return () => clearInterval(timer);
        }, []);
        const currentBreakpoint = breakpoints.find(bp => bp.width === windowWidth)?.name || 'Desktop';
        return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "bg-orange-500/20 border border-orange-500/30 p-4 rounded-lg", children: [_jsx("h2", { className: "text-xl font-bold text-orange-300 mb-2", children: "\uD83D\uDCF1 Responsive Breakpoints" }), _jsxs("p", { className: "text-orange-200 mb-4", children: ["Current: ", currentBreakpoint, " (", windowWidth, "px)"] }), _jsx("div", { className: "flex gap-2", children: breakpoints.map((bp) => (_jsx("button", { onClick: () => setWindowWidth(bp.width), className: `px-3 py-1 rounded text-sm ${windowWidth === bp.width
                                    ? 'bg-orange-500 text-[var(--hive-text-primary)]'
                                    : 'bg-orange-500/20 text-orange-300'}`, children: bp.name }, bp.name))) })] }), _jsx("div", { className: "mx-auto bg-hive-background-secondary p-4 rounded-lg transition-all duration-500", style: { width: `${windowWidth}px`, maxWidth: '100%' }, children: _jsx(CalendarCard, { state: "default", variant: windowWidth < 768 ? 'mobile' : 'desktop', data: {
                            nextEvent: {
                                id: 'responsive-event',
                                title: `${currentBreakpoint} Event`,
                                time: '2 hours',
                                type: 'academic',
                                location: 'Responsive Building',
                                attendees: ['Responsive team']
                            },
                            upcomingEvents: windowWidth > 768 ? [
                                {
                                    id: 'desktop-event',
                                    title: 'Desktop Only Event',
                                    time: '4:00 PM',
                                    type: 'work',
                                    location: 'Large Screen Room',
                                    attendees: ['Desktop users']
                                }
                            ] : [],
                            todaysEvents: [],
                            connections: [{
                                    id: 'responsive-sync',
                                    name: `${currentBreakpoint} Sync`,
                                    type: 'google',
                                    status: 'connected',
                                    lastSync: new Date(),
                                    color: 'var(--hive-status-info)'
                                }],
                            conflicts: []
                        } }) })] }));
    }
};
// Real-time Collaboration
export const RealTimeCollaboration = {
    name: '👥 Real-time Collaboration',
    render: () => {
        const [activeUsers, setActiveUsers] = useState([
            { id: '1', name: 'Alex', color: 'var(--hive-status-info)', lastSeen: new Date() },
            { id: '2', name: 'Sarah', color: 'var(--hive-status-error)', lastSeen: new Date() }
        ]);
        const [recentActions, setRecentActions] = useState([
            {
                id: '1',
                user: 'Alex',
                action: 'joined the space',
                timestamp: new Date(),
                type: 'join'
            }
        ]);
        useEffect(() => {
            const actions = [
                { action: 'updated calendar event', type: 'edit' },
                { action: 'shared a resource', type: 'share' },
                { action: 'posted a comment', type: 'comment' },
                { action: 'joined the space', type: 'join' },
                { action: 'started working', type: 'status' }
            ];
            const timer = setInterval(() => {
                const randomUser = activeUsers[Math.floor(Math.random() * activeUsers.length)];
                const randomAction = actions[Math.floor(Math.random() * actions.length)];
                setRecentActions(prev => [...prev, {
                        id: `action-${Date.now()}`,
                        user: randomUser.name,
                        action: randomAction.action,
                        timestamp: new Date(),
                        type: randomAction.type
                    }].slice(-5));
                // Update user last seen
                setActiveUsers(prev => prev.map(user => user.id === randomUser.id
                    ? { ...user, lastSeen: new Date() }
                    : user));
            }, 4000);
            return () => clearInterval(timer);
        }, [activeUsers]);
        return (_jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "bg-green-500/20 border border-green-500/30 p-4 rounded-lg", children: [_jsx("h2", { className: "text-xl font-bold text-green-300 mb-2", children: "\uD83D\uDC65 Real-time Collaboration" }), _jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "flex -space-x-2", children: activeUsers.map((user) => (_jsx("div", { className: "w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[var(--hive-text-primary)] text-sm font-medium", style: { backgroundColor: user.color }, children: user.name[0] }, user.id))) }), _jsxs("span", { className: "text-green-200 text-sm", children: [activeUsers.length, " users online"] })] })] }), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-2 gap-6", children: [_jsx(CalendarCard, { state: "default", variant: "desktop", data: {
                                nextEvent: {
                                    id: 'collab-event',
                                    title: '👥 Team Collaboration',
                                    time: '30 minutes',
                                    type: 'work',
                                    location: 'Collaboration Space',
                                    attendees: activeUsers.map(u => u.name),
                                    metadata: {
                                        collaborators: activeUsers.length,
                                        realTime: true
                                    }
                                },
                                upcomingEvents: [],
                                todaysEvents: [],
                                connections: [{
                                        id: 'collab-sync',
                                        name: 'Collaboration Sync',
                                        type: 'google',
                                        status: 'connected',
                                        lastSync: new Date(),
                                        color: 'var(--hive-status-info)'
                                    }],
                                conflicts: []
                            } }), _jsxs("div", { className: "bg-hive-background-secondary p-4 rounded-lg", children: [_jsx("h3", { className: "font-medium text-[var(--hive-text-primary)] mb-4", children: "Recent Activity" }), _jsx("div", { className: "space-y-2 max-h-64 overflow-y-auto", children: recentActions.slice(-5).reverse().map((action) => (_jsxs("div", { className: "flex items-start gap-3 p-2 bg-hive-background-tertiary rounded", children: [_jsx("div", { className: "w-2 h-2 rounded-full bg-green-400 mt-2" }), _jsxs("div", { className: "flex-1", children: [_jsxs("p", { className: "text-sm text-[var(--hive-text-primary)]", children: [_jsx("span", { className: "font-medium", children: action.user }), " ", action.action] }), _jsx("p", { className: "text-xs text-gray-400", children: action.timestamp.toLocaleTimeString() })] })] }, action.id))) })] })] })] }));
    }
};
//# sourceMappingURL=interactive-profile-demos.stories.js.map