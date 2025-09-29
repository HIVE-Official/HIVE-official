'use client';

import React, { useState } from 'react';
import { cn } from '../../lib/utils';
import { Eye, EyeOff, Users, Globe, Lock, Ghost } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../atoms/select';
import { Button } from '../atoms/button';

/**
 * SPEC-COMPLIANT PRIVACY CONTROL
 *
 * Per SPEC.md:
 * - Three-tier privacy system: Visible, Private, Ghost
 * - Per-widget granular controls
 * - Psychological safety through perceived control
 *
 * Behavioral Design: Giving control reduces anxiety about sharing
 */

export type PrivacyLevel = 'public' | 'connections' | 'private' | 'ghost';

export interface PrivacyControlProps {
  level: PrivacyLevel;
  onLevelChange: (level: PrivacyLevel) => void;
  widgetName?: string;
  compact?: boolean;
  showDescription?: boolean;
  className?: string;
}

const privacyLevels = [
  {
    value: 'public' as const,
    label: 'Public',
    icon: Globe,
    description: 'Everyone can see this',
    color: 'text-green-500'
  },
  {
    value: 'connections' as const,
    label: 'Connections',
    icon: Users,
    description: 'Only your connections can see',
    color: 'text-blue-500'
  },
  {
    value: 'private' as const,
    label: 'Private',
    icon: Lock,
    description: 'Only you can see',
    color: 'text-orange-500'
  },
  {
    value: 'ghost' as const,
    label: 'Ghost',
    icon: Ghost,
    description: 'Hidden from everyone',
    color: 'text-purple-500'
  }
];

export const PrivacyControl: React.FC<PrivacyControlProps> = ({
  level,
  onLevelChange,
  widgetName,
  compact = false,
  showDescription = false,
  className
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const currentLevel = privacyLevels.find(l => l.value === level) || privacyLevels[0];
  const Icon = currentLevel.icon;

  if (compact) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          // Cycle through privacy levels
          const currentIndex = privacyLevels.findIndex(l => l.value === level);
          const nextIndex = (currentIndex + 1) % privacyLevels.length;
          onLevelChange(privacyLevels[nextIndex].value);
        }}
        className={cn(
          'gap-1 h-7 px-2',
          currentLevel.color,
          'hover:bg-white/5',
          className
        )}
      >
        <Icon className="h-3 w-3" />
        <span className="text-xs">{currentLevel.label}</span>
      </Button>
    );
  }

  return (
    <div className={cn('space-y-2', className)}>
      {widgetName && (
        <label className="text-sm text-gray-400">
          Privacy for {widgetName}
        </label>
      )}

      <Select value={level} onValueChange={(v) => onLevelChange(v as PrivacyLevel)}>
        <SelectTrigger
          className={cn(
            'w-full bg-black/40 border-gray-800',
            'hover:border-gray-600 transition-colors'
          )}
        >
          <SelectValue>
            <div className="flex items-center gap-2">
              <Icon className={cn('h-4 w-4', currentLevel.color)} />
              <span>{currentLevel.label}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-black border-gray-800">
          {privacyLevels.map((privLevel) => {
            const LevelIcon = privLevel.icon;
            return (
              <SelectItem
                key={privLevel.value}
                value={privLevel.value}
                className="hover:bg-gray-900"
              >
                <div className="flex items-center gap-2">
                  <LevelIcon className={cn('h-4 w-4', privLevel.color)} />
                  <div className="flex flex-col">
                    <span className="text-white">{privLevel.label}</span>
                    {showDescription && (
                      <span className="text-xs text-gray-500">
                        {privLevel.description}
                      </span>
                    )}
                  </div>
                </div>
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>

      {/* Privacy explanation */}
      {showDescription && currentLevel && (
        <p className="text-xs text-gray-500">
          {currentLevel.description}
        </p>
      )}
    </div>
  );
};

/**
 * Bulk privacy controls for managing multiple widgets at once
 */
export interface BulkPrivacyControlProps {
  widgets: Array<{
    id: string;
    name: string;
    level: PrivacyLevel;
  }>;
  onBulkChange: (updates: Record<string, PrivacyLevel>) => void;
  className?: string;
}

export const BulkPrivacyControl: React.FC<BulkPrivacyControlProps> = ({
  widgets,
  onBulkChange,
  className
}) => {
  const [updates, setUpdates] = useState<Record<string, PrivacyLevel>>({});

  const handleWidgetChange = (widgetId: string, level: PrivacyLevel) => {
    setUpdates(prev => ({
      ...prev,
      [widgetId]: level
    }));
  };

  const handleApplyAll = (level: PrivacyLevel) => {
    const allUpdates = widgets.reduce((acc, widget) => ({
      ...acc,
      [widget.id]: level
    }), {});
    setUpdates(allUpdates);
    onBulkChange(allUpdates);
  };

  const handleSave = () => {
    if (Object.keys(updates).length > 0) {
      onBulkChange(updates);
      setUpdates({});
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      {/* Quick actions */}
      <div className="flex items-center justify-between p-3 bg-gray-900/50 rounded-lg">
        <span className="text-sm text-gray-400">Set all widgets to:</span>
        <div className="flex gap-2">
          {privacyLevels.map(level => {
            const Icon = level.icon;
            return (
              <Button
                key={level.value}
                size="sm"
                variant="ghost"
                onClick={() => handleApplyAll(level.value)}
                className={cn(
                  'gap-1',
                  level.color,
                  'hover:bg-white/5'
                )}
              >
                <Icon className="h-3 w-3" />
                <span className="text-xs">{level.label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Individual widget controls */}
      <div className="space-y-3">
        {widgets.map(widget => {
          const currentLevel = updates[widget.id] || widget.level;
          return (
            <div
              key={widget.id}
              className="flex items-center justify-between p-3 bg-black/40 rounded-lg border border-gray-800"
            >
              <span className="text-sm text-white">{widget.name}</span>
              <PrivacyControl
                level={currentLevel}
                onLevelChange={(level) => handleWidgetChange(widget.id, level)}
                compact
              />
            </div>
          );
        })}
      </div>

      {/* Save button */}
      {Object.keys(updates).length > 0 && (
        <Button
          onClick={handleSave}
          className="w-full bg-hive-brand-gold text-black hover:bg-hive-brand-gold/90"
        >
          Save Privacy Settings
        </Button>
      )}
    </div>
  );
};