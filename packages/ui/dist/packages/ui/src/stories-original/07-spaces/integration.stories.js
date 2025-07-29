import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { HiveSpaceLayout } from '../../components/hive-space-layout';
import { HiveButton } from '../../components/hive-button';
import { HiveCard } from '../../components/hive-card';
import { HiveBadge } from '../../components/hive-badge';
import { HiveInput } from '../../components/hive-input';
import { motion } from 'framer-motion';
import { useState } from 'react';
const meta = {
    title: 'Spaces/Integration',
    parameters: {
        layout: 'fullscreen',
        docs: {
            description: {
                component: 'Space integration patterns showing how spaces connect with external systems, APIs, and third-party services within the HIVE ecosystem.',
            },
        },
    },
};
export default meta;
// Mock data for integrations
const mockIntegrations = [
    {
        id: 'calendar',
        name: 'Google Calendar',
        icon: '📅',
        status: 'connected',
        description: 'Sync space events with Google Calendar',
        lastSync: '2 minutes ago',
        features: ['Event sync', 'Two-way sync', 'Notifications']
    },
    {
        id: 'slack',
        name: 'Slack',
        icon: '💬',
        status: 'connected',
        description: 'Post space updates to Slack channels',
        lastSync: '5 minutes ago',
        features: ['Message forwarding', 'Notifications', 'Commands']
    },
    {
        id: 'github',
        name: 'GitHub',
        icon: '🐙',
        status: 'disconnected',
        description: 'Link code repositories to spaces',
        lastSync: 'Never',
        features: ['Repository linking', 'Issue tracking', 'PR notifications']
    },
    {
        id: 'notion',
        name: 'Notion',
        icon: '📝',
        status: 'pending',
        description: 'Share space content with Notion workspace',
        lastSync: 'Connecting...',
        features: ['Content sync', 'Documentation', 'Templates']
    }
];
const mockApiEndpoints = [
    {
        endpoint: '/api/spaces/[id]/integrations',
        method: 'GET',
        description: 'List all integrations for a space',
        status: 'active',
        lastCall: '30 seconds ago'
    },
    {
        endpoint: '/api/spaces/[id]/integrations/[integration]/connect',
        method: 'POST',
        description: 'Connect a new integration',
        status: 'active',
        lastCall: '2 minutes ago'
    },
    {
        endpoint: '/api/spaces/[id]/integrations/[integration]/disconnect',
        method: 'DELETE',
        description: 'Disconnect an integration',
        status: 'active',
        lastCall: '1 hour ago'
    },
    {
        endpoint: '/api/spaces/[id]/webhooks',
        method: 'POST',
        description: 'Create webhook for space events',
        status: 'active',
        lastCall: '5 minutes ago'
    }
];
const mockWebhooks = [
    {
        id: 'wh_1',
        url: 'https://api.example.com/hive/webhooks',
        events: ['space.member.joined', 'space.post.created', 'space.tool.deployed'],
        status: 'active',
        lastDelivery: '2 minutes ago',
        deliveries: 1247
    },
    {
        id: 'wh_2',
        url: 'https://slack.com/api/webhooks/abc123',
        events: ['space.post.created', 'space.event.created'],
        status: 'active',
        lastDelivery: '1 minute ago',
        deliveries: 892
    },
    {
        id: 'wh_3',
        url: 'https://discord.com/api/webhooks/def456',
        events: ['space.announcement.created'],
        status: 'failed',
        lastDelivery: '1 hour ago',
        deliveries: 234
    }
];
export const IntegrationOverview = {
    render: () => {
        const [selectedIntegration, setSelectedIntegration] = useState(null);
        return (_jsx(HiveSpaceLayout, { children: _jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Space Integrations" }), _jsx("p", { className: "text-gray-600", children: "Connect your space with external tools and services" })] }), _jsx(HiveButton, { variant: "primary", children: "Browse Integration Store" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4", children: mockIntegrations.map((integration) => (_jsx(motion.div, { whileHover: { y: -4 }, transition: { duration: 0.2 }, children: _jsx(HiveCard, { className: "h-full cursor-pointer", onClick: () => setSelectedIntegration(integration.id), children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "text-2xl", children: integration.icon }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold", children: integration.name }), _jsx("p", { className: "text-sm text-gray-600", children: integration.description })] })] }), _jsx(HiveBadge, { variant: integration.status === 'connected' ? 'success' :
                                                        integration.status === 'pending' ? 'warning' : 'secondary', children: integration.status })] }), _jsxs("div", { className: "space-y-2", children: [_jsxs("div", { className: "text-sm text-gray-500", children: ["Last sync: ", integration.lastSync] }), _jsx("div", { className: "flex flex-wrap gap-1", children: integration.features.map((feature) => (_jsx(HiveBadge, { variant: "outline", size: "sm", children: feature }, feature))) })] })] }) }) }, integration.id))) }), selectedIntegration && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mt-6", children: _jsx(HiveCard, { children: _jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Integration Details" }), _jsxs("p", { className: "text-gray-600", children: ["Selected: ", mockIntegrations.find(i => i.id === selectedIntegration)?.name] })] }) }) }))] }) }));
    },
};
export const APIEndpointsDashboard = {
    render: () => {
        const [selectedEndpoint, setSelectedEndpoint] = useState(null);
        return (_jsx(HiveSpaceLayout, { children: _jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "API Endpoints" }), _jsx("p", { className: "text-gray-600", children: "Monitor and manage space API integrations" })] }), _jsx(HiveButton, { variant: "outline", children: "View API Documentation" })] }), _jsx("div", { className: "grid gap-4", children: mockApiEndpoints.map((endpoint, index) => (_jsx(motion.div, { whileHover: { x: 4 }, transition: { duration: 0.2 }, children: _jsx(HiveCard, { className: "cursor-pointer", onClick: () => setSelectedEndpoint(endpoint.endpoint), children: _jsx("div", { className: "p-4", children: _jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx(HiveBadge, { variant: endpoint.method === 'GET' ? 'success' :
                                                            endpoint.method === 'POST' ? 'primary' : 'destructive', children: endpoint.method }), _jsxs("div", { children: [_jsx("code", { className: "text-sm font-mono bg-gray-100 px-2 py-1 rounded", children: endpoint.endpoint }), _jsx("p", { className: "text-sm text-gray-600 mt-1", children: endpoint.description })] })] }), _jsxs("div", { className: "text-right", children: [_jsx(HiveBadge, { variant: "outline", children: endpoint.status }), _jsx("p", { className: "text-sm text-gray-500 mt-1", children: endpoint.lastCall })] })] }) }) }) }, index))) }), selectedEndpoint && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mt-6", children: _jsx(HiveCard, { children: _jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Endpoint Details" }), _jsx("code", { className: "block bg-gray-100 p-4 rounded text-sm", children: selectedEndpoint })] }) }) }))] }) }));
    },
};
export const WebhookManagement = {
    render: () => {
        const [showCreateWebhook, setShowCreateWebhook] = useState(false);
        const [newWebhookUrl, setNewWebhookUrl] = useState('');
        const [selectedEvents, setSelectedEvents] = useState([]);
        const availableEvents = [
            'space.member.joined',
            'space.member.left',
            'space.post.created',
            'space.post.updated',
            'space.post.deleted',
            'space.event.created',
            'space.tool.deployed',
            'space.announcement.created'
        ];
        return (_jsx(HiveSpaceLayout, { children: _jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Webhook Management" }), _jsx("p", { className: "text-gray-600", children: "Manage real-time notifications for space events" })] }), _jsx(HiveButton, { variant: "primary", onClick: () => setShowCreateWebhook(true), children: "Create Webhook" })] }), _jsx("div", { className: "grid gap-4", children: mockWebhooks.map((webhook) => (_jsx(motion.div, { whileHover: { x: 4 }, transition: { duration: 0.2 }, children: _jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center justify-between mb-3", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx(HiveBadge, { variant: webhook.status === 'active' ? 'success' : 'destructive', children: webhook.status }), _jsxs("div", { children: [_jsx("code", { className: "text-sm font-mono bg-gray-100 px-2 py-1 rounded", children: webhook.url }), _jsxs("p", { className: "text-sm text-gray-600 mt-1", children: [webhook.deliveries, " deliveries \u2022 Last: ", webhook.lastDelivery] })] })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(HiveButton, { variant: "outline", size: "sm", children: "Test" }), _jsx(HiveButton, { variant: "outline", size: "sm", children: "Edit" }), _jsx(HiveButton, { variant: "destructive", size: "sm", children: "Delete" })] })] }), _jsx("div", { className: "flex flex-wrap gap-1", children: webhook.events.map((event) => (_jsx(HiveBadge, { variant: "outline", size: "sm", children: event }, event))) })] }) }) }, webhook.id))) }), showCreateWebhook && (_jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, className: "mt-6", children: _jsx(HiveCard, { children: _jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Create New Webhook" }), _jsxs("div", { className: "space-y-4", children: [_jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-1", children: "Webhook URL" }), _jsx(HiveInput, { value: newWebhookUrl, onChange: (e) => setNewWebhookUrl(e.target.value), placeholder: "https://api.example.com/webhooks", className: "w-full" })] }), _jsxs("div", { children: [_jsx("label", { className: "block text-sm font-medium mb-2", children: "Events to Subscribe" }), _jsx("div", { className: "grid grid-cols-2 gap-2", children: availableEvents.map((event) => (_jsxs("label", { className: "flex items-center gap-2", children: [_jsx("input", { type: "checkbox", checked: selectedEvents.includes(event), onChange: (e) => {
                                                                        if (e.target.checked) {
                                                                            setSelectedEvents([...selectedEvents, event]);
                                                                        }
                                                                        else {
                                                                            setSelectedEvents(selectedEvents.filter(e => e !== event));
                                                                        }
                                                                    } }), _jsx("span", { className: "text-sm", children: event })] }, event))) })] }), _jsxs("div", { className: "flex gap-2", children: [_jsx(HiveButton, { variant: "primary", children: "Create Webhook" }), _jsx(HiveButton, { variant: "outline", onClick: () => setShowCreateWebhook(false), children: "Cancel" })] })] })] }) }) }))] }) }));
    },
};
export const ThirdPartyConnections = {
    render: () => {
        const [connections, setConnections] = useState(mockIntegrations);
        const [connectingService, setConnectingService] = useState(null);
        const handleConnect = (integrationId) => {
            setConnectingService(integrationId);
            // Simulate connection process
            setTimeout(() => {
                setConnections(prev => prev.map(conn => conn.id === integrationId
                    ? { ...conn, status: 'connected', lastSync: 'Just now' }
                    : conn));
                setConnectingService(null);
            }, 2000);
        };
        const handleDisconnect = (integrationId) => {
            setConnections(prev => prev.map(conn => conn.id === integrationId
                ? { ...conn, status: 'disconnected', lastSync: 'Never' }
                : conn));
        };
        return (_jsx(HiveSpaceLayout, { children: _jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Third-Party Connections" }), _jsx("p", { className: "text-gray-600", children: "Connect your space with external services and platforms" })] }), _jsx(HiveButton, { variant: "outline", children: "View Integration Guide" })] }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-6", children: connections.map((integration) => (_jsx(motion.div, { whileHover: { scale: 1.02 }, transition: { duration: 0.2 }, children: _jsx(HiveCard, { className: "h-full", children: _jsxs("div", { className: "p-6", children: [_jsxs("div", { className: "flex items-center justify-between mb-4", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "text-3xl", children: integration.icon }), _jsxs("div", { children: [_jsx("h3", { className: "font-semibold text-lg", children: integration.name }), _jsx("p", { className: "text-gray-600", children: integration.description })] })] }), _jsx(HiveBadge, { variant: integration.status === 'connected' ? 'success' :
                                                        integration.status === 'pending' ? 'warning' : 'secondary', children: integration.status })] }), _jsxs("div", { className: "space-y-3", children: [_jsxs("div", { className: "text-sm text-gray-500", children: ["Last sync: ", integration.lastSync] }), _jsx("div", { className: "flex flex-wrap gap-1", children: integration.features.map((feature) => (_jsx(HiveBadge, { variant: "outline", size: "sm", children: feature }, feature))) }), _jsx("div", { className: "flex gap-2 mt-4", children: integration.status === 'connected' ? (_jsxs(_Fragment, { children: [_jsx(HiveButton, { variant: "outline", size: "sm", onClick: () => handleDisconnect(integration.id), children: "Disconnect" }), _jsx(HiveButton, { variant: "outline", size: "sm", children: "Configure" })] })) : (_jsx(HiveButton, { variant: "primary", size: "sm", onClick: () => handleConnect(integration.id), disabled: connectingService === integration.id, children: connectingService === integration.id ? 'Connecting...' : 'Connect' })) })] })] }) }) }, integration.id))) })] }) }));
    },
};
export const RealTimeDataSync = {
    render: () => {
        const [syncStatus, setSyncStatus] = useState('idle');
        const [lastSync, setLastSync] = useState('2 minutes ago');
        const [syncLog, setSyncLog] = useState([
            { time: '14:32:15', action: 'Member joined', status: 'success' },
            { time: '14:31:42', action: 'Post created', status: 'success' },
            { time: '14:30:18', action: 'Event updated', status: 'success' },
            { time: '14:29:55', action: 'Tool deployed', status: 'warning' },
            { time: '14:28:30', action: 'Webhook delivery', status: 'error' }
        ]);
        const handleForceSync = () => {
            setSyncStatus('syncing');
            setTimeout(() => {
                setSyncStatus('idle');
                setLastSync('Just now');
                setSyncLog(prev => [
                    { time: new Date().toLocaleTimeString(), action: 'Manual sync', status: 'success' },
                    ...prev
                ]);
            }, 2000);
        };
        return (_jsx(HiveSpaceLayout, { children: _jsxs("div", { className: "p-6 space-y-6", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsxs("div", { children: [_jsx("h1", { className: "text-2xl font-bold", children: "Real-Time Data Sync" }), _jsx("p", { className: "text-gray-600", children: "Monitor live data synchronization across integrations" })] }), _jsx(HiveButton, { variant: "primary", onClick: handleForceSync, disabled: syncStatus === 'syncing', children: syncStatus === 'syncing' ? 'Syncing...' : 'Force Sync' })] }), _jsxs("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-4", children: [_jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("div", { className: "w-3 h-3 bg-green-500 rounded-full" }), _jsx("span", { className: "font-semibold", children: "Sync Status" })] }), _jsx("p", { className: "text-2xl font-bold", children: syncStatus === 'idle' ? 'Active' :
                                                syncStatus === 'syncing' ? 'Syncing' : 'Error' }), _jsxs("p", { className: "text-sm text-gray-600", children: ["Last sync: ", lastSync] })] }) }), _jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("div", { className: "w-3 h-3 bg-blue-500 rounded-full" }), _jsx("span", { className: "font-semibold", children: "Active Connections" })] }), _jsx("p", { className: "text-2xl font-bold", children: "4" }), _jsx("p", { className: "text-sm text-gray-600", children: "Google, Slack, GitHub, Discord" })] }) }), _jsx(HiveCard, { children: _jsxs("div", { className: "p-4", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2", children: [_jsx("div", { className: "w-3 h-3 bg-yellow-500 rounded-full" }), _jsx("span", { className: "font-semibold", children: "Events Today" })] }), _jsx("p", { className: "text-2xl font-bold", children: "127" }), _jsx("p", { className: "text-sm text-gray-600", children: "98% success rate" })] }) })] }), _jsx(HiveCard, { children: _jsxs("div", { className: "p-6", children: [_jsx("h3", { className: "text-lg font-semibold mb-4", children: "Sync Activity Log" }), _jsx("div", { className: "space-y-2", children: syncLog.map((log, index) => (_jsxs(motion.div, { initial: { opacity: 0, x: -20 }, animate: { opacity: 1, x: 0 }, transition: { delay: index * 0.1 }, className: "flex items-center justify-between p-2 bg-gray-50 rounded", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("span", { className: "text-sm font-mono text-gray-500", children: log.time }), _jsx("span", { className: "text-sm", children: log.action })] }), _jsx(HiveBadge, { variant: log.status === 'success' ? 'success' :
                                                    log.status === 'warning' ? 'warning' : 'destructive', size: "sm", children: log.status })] }, index))) })] }) })] }) }));
    },
};
//# sourceMappingURL=integration.stories.js.map