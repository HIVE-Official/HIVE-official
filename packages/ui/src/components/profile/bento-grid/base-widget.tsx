'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Maximize2, Minimize2, X, Move } from 'lucide-react';
import { BaseWidgetProps } from './types';
import { HiveCard } from '../../hive-card';
import { HiveButton } from '../../hive-button';
import { cn } from '../../lib/utils';

interface BaseWidgetWrapperProps extends BaseWidgetProps {
  children: React.ReactNode;
  className?: string;
}

export const BaseWidget: React.FC<BaseWidgetWrapperProps> = ({
  id,
  title,
  size,
  position,
  settings,
  isEditing,
  isDragging = false,
  onSettingsChange,
  onSizeChange,
  onPositionChange,
  onRemove,
  children,
  className
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const gridSpan = {
    width: size.width === 2 ? 'col-span-2' : 'col-span-1',
    height: size.height === 2 ? 'row-span-2' : 'row-span-1'
  };

  const canResize = size.width === 1 || size.height === 1; // Can resize if not already max size

  const handleResize = () => {
    if (size.width === 1 && size.height === 1) {
      // Expand to 2x1 first
      onSizeChange({ width: 2, height: 1 });
    } else if (size.width === 2 && size.height === 1) {
      // Expand to 2x2
      onSizeChange({ width: 2, height: 2 });
    } else if (size.width === 1 && size.height === 2) {
      // Shrink back to 1x1
      onSizeChange({ width: 1, height: 1 });
    } else {
      // Shrink 2x2 to 1x1
      onSizeChange({ width: 1, height: 1 });
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ 
        opacity: isDragging ? 0.7 : 1, 
        scale: isDragging ? 1.05 : 1,
        zIndex: isDragging ? 50 : 1
      }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ 
        layout: { duration: 0.3, ease: "easeInOut" },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 }
      }}
      className={cn(
        gridSpan.width,
        gridSpan.height,
        'relative group',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-widget-id={id}
      data-widget-type={title}
    >
      <HiveCard className={cn(
        'h-full overflow-hidden transition-all duration-300',
        'bg-charcoal border border-steel/30',
        isEditing && 'ring-2 ring-gold/30',
        isDragging && 'shadow-2xl shadow-gold/20',
        'hover:border-steel/60'
      )}>
        {/* Widget Header */}
        <div className={cn(
          'flex items-center justify-between p-4 border-b border-hive-border-subtle/50',
          settings.displayOptions.showHeader ? 'block' : 'hidden'
        )}>
          <div className="flex items-center gap-3">
            {isEditing && (
              <div 
                className="cursor-move p-1 rounded hover:bg-hive-surface-elevated/60 transition-colors"
                data-drag-handle
              >
                <Move className="h-4 w-4 text-hive-text-secondary" />
              </div>
            )}
            <h3 className="text-lg font-semibold text-hive-text-primary">
              {settings.displayOptions.customTitle || title}
            </h3>
          </div>
          
          {/* Header Actions */}
          <AnimatePresence>
            {(isEditing || isHovered) && (
              <motion.div
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="flex items-center gap-2"
              >
                {canResize && (
                  <HiveButton
                    variant="ghost"
                    size="sm"
                    onClick={handleResize}
                    className="h-8 w-8 p-0"
                  >
                    {size.width === 1 && size.height === 1 ? (
                      <Maximize2 className="h-4 w-4" />
                    ) : (
                      <Minimize2 className="h-4 w-4" />
                    )}
                  </HiveButton>
                )}
                
                <HiveButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSettings(!showSettings)}
                  className="h-8 w-8 p-0"
                >
                  <Settings className="h-4 w-4" />
                </HiveButton>
                
                {isEditing && onRemove && (
                  <HiveButton
                    variant="ghost"
                    size="sm"
                    onClick={onRemove}
                    className="h-8 w-8 p-0 text-red-400 hover:text-red-300"
                  >
                    <X className="h-4 w-4" />
                  </HiveButton>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Widget Content */}
        <div className={cn(
          'flex-1 overflow-hidden',
          settings.displayOptions.compactMode ? 'p-3' : 'p-4'
        )}>
          {children}
        </div>

        {/* Widget Footer (if needed) */}
        <div className="px-4 pb-4">
          {/* Footer content can be passed via children or props */}
        </div>
      </HiveCard>

      {/* Settings Panel */}
      <AnimatePresence>
        {showSettings && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="absolute right-0 top-0 w-80 z-50"
          >
            <WidgetSettingsPanel
              settings={settings}
              onSettingsChange={onSettingsChange}
              onClose={() => setShowSettings(false)}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

interface WidgetSettingsPanelProps {
  settings: BaseWidgetProps['settings'];
  onSettingsChange: (settings: BaseWidgetProps['settings']) => void;
  onClose: () => void;
}

const WidgetSettingsPanel: React.FC<WidgetSettingsPanelProps> = ({
  settings,
  onSettingsChange,
  onClose
}) => {
  const updateSetting = (path: string, value: any) => {
    const newSettings = { ...settings };
    const keys = path.split('.');
    let current = newSettings as any;
    
    for (let i = 0; i < keys.length - 1; i++) {
      current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
    
    onSettingsChange(newSettings);
  };

  return (
    <HiveCard className="p-6 bg-hive-surface-modal backdrop-blur-sm border border-hive-border-subtle shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-hive-text-primary">Widget Settings</h3>
        <HiveButton variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
          <X className="h-4 w-4" />
        </HiveButton>
      </div>

      <div className="space-y-6">
        {/* Display Options */}
        <div>
          <h4 className="text-sm font-medium text-hive-text-primary mb-3">Display Options</h4>
          <div className="space-y-3">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.displayOptions.showHeader}
                onChange={(e) => updateSetting('displayOptions.showHeader', e.target.checked)}
                className="w-4 h-4 rounded border-hive-border-subtle bg-hive-surface-elevated focus:ring-hive-gold"
              />
              <span className="text-sm text-hive-text-secondary">Show Header</span>
            </label>
            
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.displayOptions.compactMode}
                onChange={(e) => updateSetting('displayOptions.compactMode', e.target.checked)}
                className="w-4 h-4 rounded border-hive-border-subtle bg-hive-surface-elevated focus:ring-hive-gold"
              />
              <span className="text-sm text-hive-text-secondary">Compact Mode</span>
            </label>

            <div>
              <label className="block text-sm text-hive-text-secondary mb-2">Custom Title</label>
              <input
                type="text"
                value={settings.displayOptions.customTitle || ''}
                onChange={(e) => updateSetting('displayOptions.customTitle', e.target.value)}
                placeholder="Enter custom title..."
                className="w-full px-3 py-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg text-hive-text-primary placeholder-hive-text-tertiary focus:ring-2 focus:ring-hive-gold/30 focus:border-hive-gold/50"
              />
            </div>

            <div>
              <label className="block text-sm text-hive-text-secondary mb-2">Update Frequency</label>
              <select
                value={settings.displayOptions.updateFrequency}
                onChange={(e) => updateSetting('displayOptions.updateFrequency', e.target.value)}
                className="w-full px-3 py-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg text-hive-text-primary focus:ring-2 focus:ring-hive-gold/30 focus:border-hive-gold/50"
              >
                <option value="real-time">Real-time</option>
                <option value="hourly">Hourly</option>
                <option value="manual">Manual</option>
              </select>
            </div>
          </div>
        </div>

        {/* Privacy Options */}
        <div>
          <h4 className="text-sm font-medium text-hive-text-primary mb-3">Privacy & Sharing</h4>
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-hive-text-secondary mb-2">Widget Visibility</label>
              <select
                value={settings.privacy.visibility}
                onChange={(e) => updateSetting('privacy.visibility', e.target.value)}
                className="w-full px-3 py-2 bg-hive-surface-elevated border border-hive-border-subtle rounded-lg text-hive-text-primary focus:ring-2 focus:ring-hive-gold/30 focus:border-hive-gold/50"
              >
                <option value="private">Private</option>
                <option value="friends">Friends Only</option>
                <option value="community">Community</option>
                <option value="public">Public</option>
              </select>
            </div>
            
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={settings.privacy.dataSharing}
                onChange={(e) => updateSetting('privacy.dataSharing', e.target.checked)}
                className="w-4 h-4 rounded border-hive-border-subtle bg-hive-surface-elevated focus:ring-hive-gold"
              />
              <span className="text-sm text-hive-text-secondary">Anonymous Analytics</span>
            </label>
          </div>
        </div>
      </div>

      <div className="flex gap-3 mt-6 pt-6 border-t border-hive-border-subtle">
        <HiveButton variant="secondary" onClick={onClose} className="flex-1">
          Cancel
        </HiveButton>
        <HiveButton onClick={onClose} className="flex-1">
          Save Changes
        </HiveButton>
      </div>
    </HiveCard>
  );
};