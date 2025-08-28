'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, CloudOff, AlertCircle, Check, RefreshCw } from 'lucide-react';
import { LayoutConfiguration, WidgetConfiguration, LayoutPersistenceState } from './types';
import { HiveButton } from '../../hive-button';
import { HiveCard } from '../../hive-card';
import { cn } from '../lib/utils';

interface LayoutPersistenceProps {
  currentLayout: WidgetConfiguration[];
  deviceType: 'desktop' | 'tablet' | 'mobile';
  onLayoutLoad: (widgets: WidgetConfiguration[]) => void;
  onLayoutSave?: (layout: LayoutConfiguration) => Promise<void>;
  onLayoutConflict?: (localLayout: LayoutConfiguration, remoteLayout: LayoutConfiguration) => LayoutConfiguration;
}

export const LayoutPersistence: React.FC<LayoutPersistenceProps> = ({
  currentLayout,
  deviceType,
  onLayoutLoad,
  onLayoutSave,
  onLayoutConflict
}) => {
  const [persistenceState, setPersistenceState] = useState<LayoutPersistenceState>({
    layouts: {},
    unsavedChanges: false,
    lastSync: null,
    syncStatus: 'idle'
  });

  const [showConflictModal, setShowConflictModal] = useState(false);
  const [conflictData, setConflictData] = useState<{
    local: LayoutConfiguration;
    remote: LayoutConfiguration;
  } | null>(null);

  // Generate layout key for storage
  const getLayoutKey = (device: string) => `hive_profile_layout_${device}`;

  // Create layout configuration from current widgets
  const createLayoutConfig = useCallback((widgets: WidgetConfiguration[]): LayoutConfiguration => ({
    widgets,
    gridColumns: deviceType === 'mobile' ? 1 : deviceType === 'tablet' ? 2 : 4,
    version: Date.now(),
    lastModified: new Date(),
    deviceType
  }), [deviceType]);

  // Save layout to localStorage
  const saveLayoutLocally = useCallback((layout: LayoutConfiguration) => {
    try {
      const key = getLayoutKey(layout.deviceType);
      localStorage.setItem(key, JSON.stringify(layout));
      
      setPersistenceState(prev => ({
        ...prev,
        layouts: { ...prev.layouts, [layout.deviceType]: layout },
        unsavedChanges: false,
        lastSync: new Date()
      }));
    } catch (error) {
      console.error('Failed to save layout locally:', error);
    }
  }, []);

  // Load layout from localStorage
  const loadLayoutLocally = useCallback((device: string): LayoutConfiguration | null => {
    try {
      const key = getLayoutKey(device);
      const stored = localStorage.getItem(key);
      if (stored) {
        const layout = JSON.parse(stored) as LayoutConfiguration;
        return layout;
      }
    } catch (error) {
      console.error('Failed to load layout locally:', error);
    }
    return null;
  }, []);

  // Sync with remote server
  const syncWithRemote = useCallback(async (layout: LayoutConfiguration) => {
    if (!onLayoutSave) return;

    setPersistenceState(prev => ({ ...prev, syncStatus: 'syncing' }));
    
    try {
      await onLayoutSave(layout);
      setPersistenceState(prev => ({
        ...prev,
        syncStatus: 'success',
        lastSync: new Date()
      }));
      
      // Auto-hide success status after 3 seconds
      setTimeout(() => {
        setPersistenceState(prev => 
          prev.syncStatus === 'success' ? { ...prev, syncStatus: 'idle' } : prev
        );
      }, 3000);
    } catch (error) {
      console.error('Failed to sync layout with remote:', error);
      setPersistenceState(prev => ({ ...prev, syncStatus: 'error' }));
    }
  }, [onLayoutSave]);

  // Auto-save when layout changes
  useEffect(() => {
    if (currentLayout.length > 0) {
      const newLayout = createLayoutConfig(currentLayout);
      
      // Check for local changes
      const currentStoredLayout = persistenceState.layouts[deviceType];
      const hasChanges = !currentStoredLayout || 
        JSON.stringify(currentStoredLayout.widgets) !== JSON.stringify(currentLayout);

      if (hasChanges) {
        setPersistenceState(prev => ({ ...prev, unsavedChanges: true }));
        
        // Save locally immediately
        saveLayoutLocally(newLayout);
        
        // Debounced remote sync
        const timeoutId = setTimeout(() => {
          syncWithRemote(newLayout);
        }, 2000);

        return () => clearTimeout(timeoutId);
      }
    }
  }, [currentLayout, deviceType, createLayoutConfig, saveLayoutLocally, syncWithRemote, persistenceState.layouts]);

  // Load saved layout on component mount
  useEffect(() => {
    const savedLayout = loadLayoutLocally(deviceType);
    if (savedLayout && savedLayout.widgets.length > 0) {
      onLayoutLoad(savedLayout.widgets);
      setPersistenceState(prev => ({
        ...prev,
        layouts: { ...prev.layouts, [deviceType]: savedLayout },
        lastSync: savedLayout.lastModified
      }));
    } else {
      // Load default layout for device type
      loadDefaultLayout();
    }
  }, [deviceType, loadLayoutLocally, onLayoutLoad]);

  const loadDefaultLayout = () => {
    const defaultWidgets: WidgetConfiguration[] = [
      {
        id: 'default-avatar',
        type: 'social-avatar',
        title: 'Profile',
        position: { x: 0, y: 0 },
        size: { width: 1, height: 1 },
        settings: {
          displayOptions: {
            showHeader: true,
            compactMode: false,
            updateFrequency: 'real-time'
          },
          dataFilters: {},
          privacy: {
            visibility: 'community',
            dataSharing: false
          }
        },
        isVisible: true
      },
      {
        id: 'default-priorities',
        type: 'priority-coordination',
        title: 'Priorities',
        position: { x: 1, y: 0 },
        size: { width: 1, height: 1 },
        settings: {
          displayOptions: {
            showHeader: true,
            compactMode: false,
            updateFrequency: 'real-time'
          },
          dataFilters: {
            timeRange: 'this_week'
          },
          privacy: {
            visibility: 'private',
            dataSharing: false
          }
        },
        isVisible: true
      }
    ];

    if (deviceType === 'desktop') {
      defaultWidgets.push(
        {
          id: 'default-calendar',
          type: 'social-calendar',
          title: 'Calendar',
          position: { x: 2, y: 0 },
          size: { width: 2, height: 1 },
          settings: {
            displayOptions: {
              showHeader: true,
              compactMode: false,
              updateFrequency: 'real-time'
            },
            dataFilters: {
              timeRange: 'today'
            },
            privacy: {
              visibility: 'friends',
              dataSharing: false
            }
          },
          isVisible: true
        },
        {
          id: 'default-communities',
          type: 'community-coordination',
          title: 'Communities',
          position: { x: 0, y: 1 },
          size: { width: 2, height: 1 },
          settings: {
            displayOptions: {
              showHeader: true,
              compactMode: false,
              updateFrequency: 'real-time'
            },
            dataFilters: {
              includeTypes: ['leadership', 'urgent']
            },
            privacy: {
              visibility: 'community',
              dataSharing: false
            }
          },
          isVisible: true
        },
        {
          id: 'default-privacy',
          type: 'privacy-control',
          title: 'Privacy',
          position: { x: 2, y: 1 },
          size: { width: 1, height: 1 },
          settings: {
            displayOptions: {
              showHeader: true,
              compactMode: true,
              updateFrequency: 'manual'
            },
            dataFilters: {},
            privacy: {
              visibility: 'private',
              dataSharing: false
            }
          },
          isVisible: true
        }
      );
    }

    onLayoutLoad(defaultWidgets);
  };

  const handleConflictResolution = (useLocal: boolean) => {
    if (!conflictData) return;

    const resolvedLayout = useLocal ? conflictData.local : conflictData.remote;
    
    if (onLayoutConflict) {
      const finalLayout = onLayoutConflict(conflictData.local, conflictData.remote);
      onLayoutLoad(finalLayout.widgets);
      saveLayoutLocally(finalLayout);
    } else {
      onLayoutLoad(resolvedLayout.widgets);
      saveLayoutLocally(resolvedLayout);
    }

    setConflictData(null);
    setShowConflictModal(false);
  };

  const getSyncStatusIcon = () => {
    switch (persistenceState.syncStatus) {
      case 'syncing':
        return <RefreshCw className="h-4 w-4 animate-spin text-blue-400" />;
      case 'success':
        return <Check className="h-4 w-4 text-green-400" />;
      case 'error':
        return <CloudOff className="h-4 w-4 text-red-400" />;
      default:
        return <Cloud className="h-4 w-4 text-hive-text-secondary" />;
    }
  };

  const getSyncStatusText = () => {
    switch (persistenceState.syncStatus) {
      case 'syncing':
        return 'Syncing...';
      case 'success':
        return 'Synced';
      case 'error':
        return 'Sync failed';
      default:
        return persistenceState.lastSync ? 
          `Synced ${persistenceState.lastSync.toLocaleTimeString()}` : 
          'Not synced';
    }
  };

  return (
    <>
      {/* Sync Status Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-4 right-4 z-50"
      >
        <div className={cn(
          'flex items-center gap-2 px-3 py-2 rounded-lg backdrop-blur-sm text-sm',
          'bg-hive-surface-elevated/90 border border-hive-border-subtle',
          persistenceState.syncStatus === 'error' && 'border-red-400/50 bg-red-400/10',
          persistenceState.syncStatus === 'success' && 'border-green-400/50 bg-green-400/10'
        )}>
          {getSyncStatusIcon()}
          <span className="text-hive-text-secondary">{getSyncStatusText()}</span>
          {persistenceState.unsavedChanges && (
            <div className="w-2 h-2 rounded-full bg-[var(--hive-brand-secondary)] animate-pulse" />
          )}
        </div>
      </motion.div>

      {/* Conflict Resolution Modal */}
      <AnimatePresence>
        {showConflictModal && conflictData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-[var(--hive-background-primary)]/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <HiveCard className="max-w-md w-full p-6">
                <div className="flex items-center gap-3 mb-4">
                  <AlertCircle className="h-6 w-6 text-[var(--hive-brand-secondary)]" />
                  <h3 className="text-lg font-semibold text-hive-text-primary">
                    Layout Conflict
                  </h3>
                </div>
                
                <p className="text-hive-text-secondary mb-6">
                  Your layout has been modified on another device. Choose which version to keep:
                </p>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <HiveButton
                      variant="secondary"
                      onClick={() => handleConflictResolution(true)}
                      className="flex-1"
                    >
                      Keep Local Changes
                      <span className="text-xs text-hive-text-tertiary block">
                        Modified: {conflictData.local.lastModified.toLocaleString()}
                      </span>
                    </HiveButton>
                    
                    <HiveButton
                      onClick={() => handleConflictResolution(false)}
                      className="flex-1"
                    >
                      Use Remote Version
                      <span className="text-xs text-hive-text-tertiary block">
                        Modified: {conflictData.remote.lastModified.toLocaleString()}
                      </span>
                    </HiveButton>
                  </div>
                </div>
              </HiveCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};