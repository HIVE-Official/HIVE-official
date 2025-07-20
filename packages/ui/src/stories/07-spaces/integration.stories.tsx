import type { Meta, StoryObj } from '@storybook/react';
import { HiveSpaceCard } from '../../components/hive-space-card';
import { HiveSpaceDirectory } from '../../components/hive-space-directory';
import { HiveSpaceLayout } from '../../components/hive-space-layout';
import { HiveButton } from '../../components/hive-button';
import { HiveCard } from '../../components/hive-card';
import { HiveBadge } from '../../components/hive-badge';
import { HiveInput } from '../../components/hive-input';
import { motion } from 'framer-motion';
import { useState } from 'react';

const meta: Meta = {
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
type Story = StoryObj<typeof meta>;

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

export const IntegrationOverview: Story = {
  render: () => {
    const [selectedIntegration, setSelectedIntegration] = useState<string | null>(null);

    return (
      <HiveSpaceLayout>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Space Integrations</h1>
              <p className="text-gray-600">Connect your space with external tools and services</p>
            </div>
            <HiveButton variant="primary">
              Browse Integration Store
            </HiveButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockIntegrations.map((integration) => (
              <motion.div
                key={integration.id}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
              >
                <HiveCard 
                  className="h-full cursor-pointer"
                  onClick={() => setSelectedIntegration(integration.id)}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{integration.icon}</div>
                        <div>
                          <h3 className="font-semibold">{integration.name}</h3>
                          <p className="text-sm text-gray-600">{integration.description}</p>
                        </div>
                      </div>
                      <HiveBadge 
                        variant={
                          integration.status === 'connected' ? 'success' : 
                          integration.status === 'pending' ? 'warning' : 'secondary'
                        }
                      >
                        {integration.status}
                      </HiveBadge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="text-sm text-gray-500">
                        Last sync: {integration.lastSync}
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {integration.features.map((feature) => (
                          <HiveBadge key={feature} variant="outline" size="sm">
                            {feature}
                          </HiveBadge>
                        ))}
                      </div>
                    </div>
                  </div>
                </HiveCard>
              </motion.div>
            ))}
          </div>

          {selectedIntegration && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <HiveCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Integration Details</h3>
                  <p className="text-gray-600">
                    Selected: {mockIntegrations.find(i => i.id === selectedIntegration)?.name}
                  </p>
                </div>
              </HiveCard>
            </motion.div>
          )}
        </div>
      </HiveSpaceLayout>
    );
  },
};

export const APIEndpointsDashboard: Story = {
  render: () => {
    const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null);

    return (
      <HiveSpaceLayout>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">API Endpoints</h1>
              <p className="text-gray-600">Monitor and manage space API integrations</p>
            </div>
            <HiveButton variant="outline">
              View API Documentation
            </HiveButton>
          </div>

          <div className="grid gap-4">
            {mockApiEndpoints.map((endpoint, index) => (
              <motion.div
                key={index}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <HiveCard 
                  className="cursor-pointer"
                  onClick={() => setSelectedEndpoint(endpoint.endpoint)}
                >
                  <div className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <HiveBadge 
                          variant={endpoint.method === 'GET' ? 'success' : 
                                   endpoint.method === 'POST' ? 'primary' : 'destructive'}
                        >
                          {endpoint.method}
                        </HiveBadge>
                        <div>
                          <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                            {endpoint.endpoint}
                          </code>
                          <p className="text-sm text-gray-600 mt-1">{endpoint.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <HiveBadge variant="outline">
                          {endpoint.status}
                        </HiveBadge>
                        <p className="text-sm text-gray-500 mt-1">{endpoint.lastCall}</p>
                      </div>
                    </div>
                  </div>
                </HiveCard>
              </motion.div>
            ))}
          </div>

          {selectedEndpoint && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <HiveCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Endpoint Details</h3>
                  <code className="block bg-gray-100 p-4 rounded text-sm">
                    {selectedEndpoint}
                  </code>
                </div>
              </HiveCard>
            </motion.div>
          )}
        </div>
      </HiveSpaceLayout>
    );
  },
};

export const WebhookManagement: Story = {
  render: () => {
    const [showCreateWebhook, setShowCreateWebhook] = useState(false);
    const [newWebhookUrl, setNewWebhookUrl] = useState('');
    const [selectedEvents, setSelectedEvents] = useState<string[]>([]);

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

    return (
      <HiveSpaceLayout>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Webhook Management</h1>
              <p className="text-gray-600">Manage real-time notifications for space events</p>
            </div>
            <HiveButton 
              variant="primary"
              onClick={() => setShowCreateWebhook(true)}
            >
              Create Webhook
            </HiveButton>
          </div>

          <div className="grid gap-4">
            {mockWebhooks.map((webhook) => (
              <motion.div
                key={webhook.id}
                whileHover={{ x: 4 }}
                transition={{ duration: 0.2 }}
              >
                <HiveCard>
                  <div className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <HiveBadge 
                          variant={webhook.status === 'active' ? 'success' : 'destructive'}
                        >
                          {webhook.status}
                        </HiveBadge>
                        <div>
                          <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">
                            {webhook.url}
                          </code>
                          <p className="text-sm text-gray-600 mt-1">
                            {webhook.deliveries} deliveries • Last: {webhook.lastDelivery}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <HiveButton variant="outline" size="sm">Test</HiveButton>
                        <HiveButton variant="outline" size="sm">Edit</HiveButton>
                        <HiveButton variant="destructive" size="sm">Delete</HiveButton>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {webhook.events.map((event) => (
                        <HiveBadge key={event} variant="outline" size="sm">
                          {event}
                        </HiveBadge>
                      ))}
                    </div>
                  </div>
                </HiveCard>
              </motion.div>
            ))}
          </div>

          {showCreateWebhook && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-6"
            >
              <HiveCard>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Create New Webhook</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">Webhook URL</label>
                      <HiveInput
                        value={newWebhookUrl}
                        onChange={(e) => setNewWebhookUrl(e.target.value)}
                        placeholder="https://api.example.com/webhooks"
                        className="w-full"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Events to Subscribe</label>
                      <div className="grid grid-cols-2 gap-2">
                        {availableEvents.map((event) => (
                          <label key={event} className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              checked={selectedEvents.includes(event)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedEvents([...selectedEvents, event]);
                                } else {
                                  setSelectedEvents(selectedEvents.filter(e => e !== event));
                                }
                              }}
                            />
                            <span className="text-sm">{event}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <HiveButton variant="primary">Create Webhook</HiveButton>
                      <HiveButton 
                        variant="outline"
                        onClick={() => setShowCreateWebhook(false)}
                      >
                        Cancel
                      </HiveButton>
                    </div>
                  </div>
                </div>
              </HiveCard>
            </motion.div>
          )}
        </div>
      </HiveSpaceLayout>
    );
  },
};

export const ThirdPartyConnections: Story = {
  render: () => {
    const [connections, setConnections] = useState(mockIntegrations);
    const [connectingService, setConnectingService] = useState<string | null>(null);

    const handleConnect = (integrationId: string) => {
      setConnectingService(integrationId);
      
      // Simulate connection process
      setTimeout(() => {
        setConnections(prev => prev.map(conn => 
          conn.id === integrationId 
            ? { ...conn, status: 'connected' as const, lastSync: 'Just now' }
            : conn
        ));
        setConnectingService(null);
      }, 2000);
    };

    const handleDisconnect = (integrationId: string) => {
      setConnections(prev => prev.map(conn => 
        conn.id === integrationId 
          ? { ...conn, status: 'disconnected' as const, lastSync: 'Never' }
          : conn
      ));
    };

    return (
      <HiveSpaceLayout>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Third-Party Connections</h1>
              <p className="text-gray-600">Connect your space with external services and platforms</p>
            </div>
            <HiveButton variant="outline">
              View Integration Guide
            </HiveButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {connections.map((integration) => (
              <motion.div
                key={integration.id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <HiveCard className="h-full">
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{integration.icon}</div>
                        <div>
                          <h3 className="font-semibold text-lg">{integration.name}</h3>
                          <p className="text-gray-600">{integration.description}</p>
                        </div>
                      </div>
                      <HiveBadge 
                        variant={
                          integration.status === 'connected' ? 'success' : 
                          integration.status === 'pending' ? 'warning' : 'secondary'
                        }
                      >
                        {integration.status}
                      </HiveBadge>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="text-sm text-gray-500">
                        Last sync: {integration.lastSync}
                      </div>
                      
                      <div className="flex flex-wrap gap-1">
                        {integration.features.map((feature) => (
                          <HiveBadge key={feature} variant="outline" size="sm">
                            {feature}
                          </HiveBadge>
                        ))}
                      </div>
                      
                      <div className="flex gap-2 mt-4">
                        {integration.status === 'connected' ? (
                          <>
                            <HiveButton 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleDisconnect(integration.id)}
                            >
                              Disconnect
                            </HiveButton>
                            <HiveButton variant="outline" size="sm">
                              Configure
                            </HiveButton>
                          </>
                        ) : (
                          <HiveButton 
                            variant="primary" 
                            size="sm"
                            onClick={() => handleConnect(integration.id)}
                            disabled={connectingService === integration.id}
                          >
                            {connectingService === integration.id ? 'Connecting...' : 'Connect'}
                          </HiveButton>
                        )}
                      </div>
                    </div>
                  </div>
                </HiveCard>
              </motion.div>
            ))}
          </div>
        </div>
      </HiveSpaceLayout>
    );
  },
};

export const RealTimeDataSync: Story = {
  render: () => {
    const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'error'>('idle');
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

    return (
      <HiveSpaceLayout>
        <div className="p-6 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Real-Time Data Sync</h1>
              <p className="text-gray-600">Monitor live data synchronization across integrations</p>
            </div>
            <HiveButton 
              variant="primary"
              onClick={handleForceSync}
              disabled={syncStatus === 'syncing'}
            >
              {syncStatus === 'syncing' ? 'Syncing...' : 'Force Sync'}
            </HiveButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <HiveCard>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="font-semibold">Sync Status</span>
                </div>
                <p className="text-2xl font-bold">
                  {syncStatus === 'idle' ? 'Active' : 
                   syncStatus === 'syncing' ? 'Syncing' : 'Error'}
                </p>
                <p className="text-sm text-gray-600">Last sync: {lastSync}</p>
              </div>
            </HiveCard>

            <HiveCard>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="font-semibold">Active Connections</span>
                </div>
                <p className="text-2xl font-bold">4</p>
                <p className="text-sm text-gray-600">Google, Slack, GitHub, Discord</p>
              </div>
            </HiveCard>

            <HiveCard>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <span className="font-semibold">Events Today</span>
                </div>
                <p className="text-2xl font-bold">127</p>
                <p className="text-sm text-gray-600">98% success rate</p>
              </div>
            </HiveCard>
          </div>

          <HiveCard>
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Sync Activity Log</h3>
              <div className="space-y-2">
                {syncLog.map((log, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-sm font-mono text-gray-500">{log.time}</span>
                      <span className="text-sm">{log.action}</span>
                    </div>
                    <HiveBadge 
                      variant={
                        log.status === 'success' ? 'success' :
                        log.status === 'warning' ? 'warning' : 'destructive'
                      }
                      size="sm"
                    >
                      {log.status}
                    </HiveBadge>
                  </motion.div>
                ))}
              </div>
            </div>
          </HiveCard>
        </div>
      </HiveSpaceLayout>
    );
  },
};