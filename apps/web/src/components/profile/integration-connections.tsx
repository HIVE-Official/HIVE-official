'use client';

import React, { useState, useEffect } from 'react';
import { logger } from '@hive/core/utils/logger';

import { motion, AnimatePresence } from 'framer-motion';
import {
  Link2,
  Calendar,
  Music,
  Github,
  Slack,
  Twitter,
  Instagram,
  Youtube,
  Twitch,
  Discord,
  Linkedin,
  Facebook,
  Mail,
  MessageCircle,
  Cloud,
  Database,
  Globe,
  Zap,
  Check,
  X,
  Settings,
  RefreshCw,
  AlertCircle,
  Shield,
  Lock,
  Unlock,
  ExternalLink,
  Plus,
  Trash2,
  Info
} from 'lucide-react';
import { Button, Badge, Switch } from '@hive/ui';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import { authenticatedFetch } from '@/lib/auth/utils/auth-utils';

interface Integration {
  id: string;
  type: string;
  name: string;
  description: string;
  icon: React.ElementType | string;
  color: string;
  bgColor: string;
  connected: boolean;
  connectedAt?: Date;
  lastSync?: Date;
  permissions: string[];
  dataTypes: string[];
  syncFrequency: 'realtime' | 'hourly' | 'daily' | 'weekly' | 'manual';
  status: 'active' | 'paused' | 'error' | 'disconnected';
  errorMessage?: string;
  settings?: Record<string, any>;
}

interface IntegrationCategory {
  id: string;
  name: string;
  description: string;
  integrations: Integration[];
}

interface IntegrationConnectionsProps {
  userId: string;
  className?: string;
}

const AVAILABLE_INTEGRATIONS: IntegrationCategory[] = [
  {
    id: 'academic',
    name: 'Academic',
    description: 'Connect your academic tools and platforms',
    integrations: [
      {
        id: 'google-calendar',
        type: 'calendar',
        name: 'Google Calendar',
        description: 'Sync your class schedule and events',
        icon: Calendar,
        color: 'text-blue-400',
        bgColor: 'bg-blue-400/10',
        connected: false,
        permissions: ['read_events', 'write_events'],
        dataTypes: ['events', 'reminders'],
        syncFrequency: 'realtime',
        status: 'disconnected'
      },
      {
        id: 'canvas',
        type: 'lms',
        name: 'Canvas LMS',
        description: 'Import assignments and grades',
        icon: '📚',
        color: 'text-red-400',
        bgColor: 'bg-red-400/10',
        connected: false,
        permissions: ['read_courses', 'read_assignments'],
        dataTypes: ['courses', 'assignments', 'grades'],
        syncFrequency: 'daily',
        status: 'disconnected'
      },
      {
        id: 'notion',
        type: 'productivity',
        name: 'Notion',
        description: 'Sync your notes and study materials',
        icon: '📝',
        color: 'text-gray-400',
        bgColor: 'bg-gray-400/10',
        connected: false,
        permissions: ['read_pages', 'write_pages'],
        dataTypes: ['notes', 'databases'],
        syncFrequency: 'hourly',
        status: 'disconnected'
      }
    ]
  },
  {
    id: 'social',
    name: 'Social Media',
    description: 'Connect your social accounts',
    integrations: [
      {
        id: 'discord',
        type: 'social',
        name: 'Discord',
        description: 'Show your Discord status and servers',
        icon: Discord,
        color: 'text-indigo-400',
        bgColor: 'bg-indigo-400/10',
        connected: false,
        permissions: ['read_profile', 'read_guilds'],
        dataTypes: ['profile', 'activity'],
        syncFrequency: 'realtime',
        status: 'disconnected'
      },
      {
        id: 'instagram',
        type: 'social',
        name: 'Instagram',
        description: 'Share your latest posts',
        icon: Instagram,
        color: 'text-pink-400',
        bgColor: 'bg-pink-400/10',
        connected: false,
        permissions: ['read_media', 'read_profile'],
        dataTypes: ['posts', 'stories'],
        syncFrequency: 'hourly',
        status: 'disconnected'
      },
      {
        id: 'spotify',
        type: 'music',
        name: 'Spotify',
        description: 'Share what you\'re listening to',
        icon: Music,
        color: 'text-green-400',
        bgColor: 'bg-green-400/10',
        connected: false,
        permissions: ['read_playback', 'read_playlists'],
        dataTypes: ['currently_playing', 'playlists'],
        syncFrequency: 'realtime',
        status: 'disconnected'
      }
    ]
  },
  {
    id: 'developer',
    name: 'Developer Tools',
    description: 'Connect your coding platforms',
    integrations: [
      {
        id: 'github',
        type: 'code',
        name: 'GitHub',
        description: 'Show your contributions and projects',
        icon: Github,
        color: 'text-white',
        bgColor: 'bg-white/10',
        connected: false,
        permissions: ['read_repos', 'read_commits'],
        dataTypes: ['repositories', 'contributions'],
        syncFrequency: 'daily',
        status: 'disconnected'
      },
      {
        id: 'slack',
        type: 'communication',
        name: 'Slack',
        description: 'Connect your workspace',
        icon: Slack,
        color: 'text-purple-400',
        bgColor: 'bg-purple-400/10',
        connected: false,
        permissions: ['read_messages', 'read_channels'],
        dataTypes: ['messages', 'presence'],
        syncFrequency: 'realtime',
        status: 'disconnected'
      }
    ]
  }
];

export function IntegrationConnections({ userId, className = '' }: IntegrationConnectionsProps) {
  const [integrations, setIntegrations] = useState<IntegrationCategory[]>(AVAILABLE_INTEGRATIONS);
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState<string | null>(null);

  useEffect(() => {
    fetchUserIntegrations();
  }, [userId]);

  const fetchUserIntegrations = async () => {
    try {
      const response = await authenticatedFetch(`/api/users/${userId}/integrations`);
      if (response.ok) {
        const data = await response.json();
        updateIntegrationStatus(data.integrations || []);
      }
    } catch (error) {
      logger.error('Error fetching integrations:', error);
    }
  };

  const updateIntegrationStatus = (userIntegrations: any[]) => {
    setIntegrations(prev => prev.map(category => ({
      ...category,
      integrations: category.integrations.map(integration => {
        const userIntegration = userIntegrations.find(ui => ui.id === integration.id);
        if (userIntegration) {
          return {
            ...integration,
            connected: true,
            connectedAt: new Date(userIntegration.connectedAt),
            lastSync: userIntegration.lastSync ? new Date(userIntegration.lastSync) : undefined,
            status: userIntegration.status,
            settings: userIntegration.settings
          };
        }
        return integration;
      })
    })));
  };

  const connectIntegration = async (integration: Integration) => {
    setLoading(true);
    try {
      // Simulate OAuth flow
      const response = await authenticatedFetch('/api/integrations/connect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          integrationId: integration.id,
          type: integration.type
        })
      });

      if (response.ok) {
        const data = await response.json();
        // Redirect to OAuth URL or handle connection
        if (data.authUrl) {
          window.open(data.authUrl, '_blank');
        } else {
          // Update local state
          updateIntegrationStatus([{
            ...integration,
            id: integration.id,
            connectedAt: new Date(),
            status: 'active'
          }]);
        }
      }
    } catch (error) {
      logger.error('Error connecting integration:', error);
    } finally {
      setLoading(false);
    }
  };

  const disconnectIntegration = async (integration: Integration) => {
    if (!confirm(`Are you sure you want to disconnect ${integration.name}?`)) return;

    try {
      const response = await authenticatedFetch(`/api/integrations/${integration.id}/disconnect`, {
        method: 'POST'
      });

      if (response.ok) {
        updateIntegrationStatus([]);
        fetchUserIntegrations();
      }
    } catch (error) {
      logger.error('Error disconnecting integration:', error);
    }
  };

  const syncIntegration = async (integration: Integration) => {
    setSyncing(integration.id);
    try {
      const response = await authenticatedFetch(`/api/integrations/${integration.id}/sync`, {
        method: 'POST'
      });

      if (response.ok) {
        // Update last sync time
        setIntegrations(prev => prev.map(category => ({
          ...category,
          integrations: category.integrations.map(int => {
            if (int.id === integration.id) {
              return { ...int, lastSync: new Date() };
            }
            return int;
          })
        })));
      }
    } catch (error) {
      logger.error('Error syncing integration:', error);
    } finally {
      setSyncing(null);
    }
  };

  const getStatusColor = (status: Integration['status']) => {
    switch (status) {
      case 'active': return 'text-green-400 bg-green-400/10';
      case 'paused': return 'text-yellow-400 bg-yellow-400/10';
      case 'error': return 'text-red-400 bg-red-400/10';
      default: return 'text-neutral-400 bg-neutral-400/10';
    }
  };

  const totalConnected = integrations.reduce(
    (sum, category) => sum + category.integrations.filter(i => i.connected).length,
    0
  );

  const totalAvailable = integrations.reduce(
    (sum, category) => sum + category.integrations.length,
    0
  );

  return (
    <div className={cn('space-y-6', className)}>
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-white/10 p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-2">
              Integration Connections
            </h2>
            <p className="text-sm text-neutral-400">
              Connect your favorite apps and services
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-[var(--hive-brand-secondary)]">
              {totalConnected}/{totalAvailable}
            </div>
            <div className="text-xs text-neutral-400">Connected</div>
          </div>
        </div>

        {/* Security Notice */}
        <div className="flex items-center gap-2 p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
          <Shield className="h-4 w-4 text-blue-400 flex-shrink-0" />
          <p className="text-xs text-blue-300">
            Your data is encrypted and you can revoke access at any time. We only request necessary permissions.
          </p>
        </div>
      </div>

      {/* Integration Categories */}
      {integrations.map(category => (
        <div key={category.id} className="space-y-4">
          <div>
            <h3 className="font-semibold text-[var(--hive-text-inverse)] mb-1">
              {category.name}
            </h3>
            <p className="text-sm text-neutral-400">
              {category.description}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {category.integrations.map(integration => {
              const Icon = typeof integration.icon === 'string' ? null : integration.icon;
              const isConnected = integration.connected;
              const isSyncing = syncing === integration.id;
              
              return (
                <motion.div
                  key={integration.id}
                  whileHover={{ scale: 1.02 }}
                  className={cn(
                    'relative p-4 rounded-lg border transition-all',
                    isConnected
                      ? 'bg-white/[0.07] border-white/20'
                      : 'bg-white/[0.03] border-white/10 hover:bg-white/[0.05]'
                  )}
                >
                  {/* Connection Status Badge */}
                  {isConnected && (
                    <Badge
                      className={cn(
                        'absolute top-3 right-3 text-xs',
                        getStatusColor(integration.status)
                      )}
                    >
                      {integration.status}
                    </Badge>
                  )}

                  <div className="flex items-start gap-3 mb-3">
                    <div className={cn('p-2 rounded-lg', integration.bgColor)}>
                      {Icon ? (
                        <Icon className={cn('h-5 w-5', integration.color)} />
                      ) : (
                        <span className="text-xl">{integration.icon}</span>
                      )}
                    </div>
                    
                    <div className="flex-1">
                      <h4 className="font-medium text-[var(--hive-text-inverse)] mb-1">
                        {integration.name}
                      </h4>
                      <p className="text-xs text-neutral-400 line-clamp-2">
                        {integration.description}
                      </p>
                    </div>
                  </div>

                  {/* Connection Info */}
                  {isConnected && (
                    <div className="space-y-2 mb-3">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-400">Connected</span>
                        <span className="text-neutral-300">
                          {integration.connectedAt && formatDistanceToNow(integration.connectedAt, { addSuffix: true })}
                        </span>
                      </div>
                      
                      {integration.lastSync && (
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-neutral-400">Last sync</span>
                          <span className="text-neutral-300">
                            {formatDistanceToNow(integration.lastSync, { addSuffix: true })}
                          </span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-neutral-400">Sync</span>
                        <span className="text-neutral-300 capitalize">
                          {integration.syncFrequency}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Permissions */}
                  {!isConnected && (
                    <div className="mb-3">
                      <div className="text-xs text-neutral-400 mb-2">Permissions:</div>
                      <div className="flex flex-wrap gap-1">
                        {integration.permissions.slice(0, 3).map(permission => (
                          <Badge
                            key={permission}
                            className="bg-white/5 text-neutral-400 text-xs"
                          >
                            {permission.replace('_', ' ')}
                          </Badge>
                        ))}
                        {integration.permissions.length > 3 && (
                          <Badge className="bg-white/5 text-neutral-400 text-xs">
                            +{integration.permissions.length - 3}
                          </Badge>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    {isConnected ? (
                      <>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => syncIntegration(integration)}
                          disabled={isSyncing}
                          className="flex-1 border-white/20"
                        >
                          <RefreshCw className={cn('h-3 w-3 mr-1', isSyncing && 'animate-spin')} />
                          {isSyncing ? 'Syncing...' : 'Sync'}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedIntegration(integration)}
                          className="text-neutral-400"
                        >
                          <Settings className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => disconnectIntegration(integration)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </>
                    ) : (
                      <Button
                        onClick={() => connectIntegration(integration)}
                        disabled={loading}
                        className="flex-1 bg-[var(--hive-brand-secondary)] hover:bg-[var(--hive-brand-secondary)]/80"
                      >
                        <Link2 className="h-3 w-3 mr-2" />
                        Connect
                      </Button>
                    )}
                  </div>

                  {/* Error Message */}
                  {integration.status === 'error' && integration.errorMessage && (
                    <div className="mt-2 p-2 bg-red-500/10 rounded border border-red-500/20">
                      <div className="flex items-start gap-2">
                        <AlertCircle className="h-3 w-3 text-red-400 mt-0.5" />
                        <p className="text-xs text-red-300">{integration.errorMessage}</p>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Settings Modal */}
      <AnimatePresence>
        {selectedIntegration && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedIntegration(null)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            />
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-black border border-white/10 rounded-xl p-6 z-50"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-[var(--hive-text-inverse)]">
                  {selectedIntegration.name} Settings
                </h3>
                <button
                  onClick={() => setSelectedIntegration(null)}
                  className="text-neutral-400 hover:text-[var(--hive-text-inverse)]"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-neutral-400 mb-2 block">
                    Sync Frequency
                  </label>
                  <select className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-[var(--hive-text-inverse)]">
                    <option value="realtime">Real-time</option>
                    <option value="hourly">Hourly</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="manual">Manual only</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm text-neutral-400 mb-2 block">
                    Data Types
                  </label>
                  <div className="space-y-2">
                    {selectedIntegration.dataTypes.map(dataType => (
                      <label key={dataType} className="flex items-center gap-2">
                        <Switch defaultChecked />
                        <span className="text-sm text-neutral-300 capitalize">
                          {dataType.replace('_', ' ')}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="pt-4 flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setSelectedIntegration(null)}
                    className="flex-1 border-white/20"
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-[var(--hive-brand-secondary)] hover:bg-[var(--hive-brand-secondary)]/80"
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}