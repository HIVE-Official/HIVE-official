'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from '../framer-motion-proxy';
import { cn } from '../../lib/utils';
import { 
  Settings,
  BarChart3,
  Shield,
  Wrench,
  Plus,
  Calendar,
  Bell,
  X
} from 'lucide-react';

// Import the expand-focus system
import { ExpandFocus, useExpandFocus } from '../animations/expand-focus';

// Import profile widgets
import { ProfileSettingsWidget } from './widgets/profile-settings-widget';
import { ProfileAnalyticsWidget } from './widgets/profile-analytics-widget';
import { PrivacyControlWidget } from './widgets/privacy-control-widget';

// Import existing profile components
import { ProfileDashboard, type ProfileDashboardProps } from '../../atomic/organisms/profile-dashboard';

interface EnhancedProfileDashboardProps extends ProfileDashboardProps {
  // Additional props for expand-focus functionality
  enableExpandFocus?: boolean;
}

export const EnhancedProfileDashboard: React.FC<EnhancedProfileDashboardProps> = ({
  enableExpandFocus = true,
  ...profileDashboardProps
}) => {
  // Expand-focus states for different widgets
  const settingsModal = useExpandFocus();
  const analyticsModal = useExpandFocus();
  const privacyModal = useExpandFocus(); 
  const toolsModal = useExpandFocus();

  // Profile action buttons that will expand-focus
  const profileActions = [
    {
      id: 'settings',
      name: 'Settings',
      description: 'Account & preferences',
      icon: Settings,
      color: 'blue',
      modal: settingsModal,
      widget: ProfileSettingsWidget
    },
    {
      id: 'analytics',
      name: 'Analytics',
      description: 'Usage insights',
      icon: BarChart3,
      color: 'purple',
      modal: analyticsModal,
      widget: ProfileAnalyticsWidget
    },
    {
      id: 'privacy',
      name: 'Privacy',
      description: 'Control visibility',
      icon: Shield,
      color: 'green',
      modal: privacyModal,
      widget: PrivacyControlWidget
    },
    {
      id: 'tools',
      name: 'Builder Tools',
      description: 'v1 release',
      icon: Wrench,
      color: 'yellow',
      modal: toolsModal,
      widget: null, // Will show coming soon
      locked: true
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-500/10 text-blue-400 border-blue-500/20 hover:bg-blue-500/20';
      case 'purple': return 'bg-purple-500/10 text-purple-400 border-purple-500/20 hover:bg-purple-500/20';
      case 'green': return 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500/20';
      case 'yellow': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20 hover:bg-yellow-500/20';
      default: return 'bg-hive-brand-secondary/10 text-hive-brand-secondary border-hive-brand-secondary/20 hover:bg-hive-brand-secondary/20';
    }
  };

  // Override the profile dashboard's navigation callbacks to use expand-focus
  const enhancedProps = {
    ...profileDashboardProps,
    onEditProfile: enableExpandFocus ? settingsModal.expand : profileDashboardProps.onEditProfile
  };

  return (
    <div className="relative">
      {/* Original Profile Dashboard */}
      <ProfileDashboard {...enhancedProps} />

      {/* Floating Action Panel - Only show if expand-focus is enabled */}
      {enableExpandFocus && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="bg-hive-background-elevated rounded-2xl border border-hive-border-subtle shadow-2xl p-4">
            <div className="grid grid-cols-2 gap-3">
              {profileActions.map((action) => {
                const IconComponent = action.icon;
                const WidgetComponent = action.widget;
                
                return (
                  <div key={action.id}>
                    <ExpandFocus
                      isExpanded={action.modal.isExpanded}
                      onExpand={action.modal.expand}
                      onCollapse={action.modal.collapse}
                      expandFrom="bottom"
                      animationDuration={0.4}
                      focusContent={
                        WidgetComponent ? (
                          <WidgetComponent 
                            onPrivacyClick={action.id === 'settings' ? privacyModal.expand : undefined}
                          />
                        ) : (
                          <div className="text-center py-12">
                            <div className="inline-flex items-center justify-center w-16 h-16 bg-hive-brand-secondary/10 rounded-xl mb-4">
                              <IconComponent size={28} className="text-hive-brand-secondary" />
                            </div>
                            <h2 className="text-heading-lg font-semibold text-hive-text-primary mb-2">
                              {action.name}
                            </h2>
                            <p className="text-body-md text-hive-text-secondary mb-6">
                              {action.description} coming in v1 release
                            </p>
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-hive-brand-secondary/10 rounded-lg border border-hive-brand-secondary/20">
                              <Calendar size={16} className="text-hive-brand-secondary" />
                              <span className="text-sm font-medium text-hive-brand-secondary">v1 Launch</span>
                            </div>
                          </div>
                        )
                      }
                    >
                      <motion.button
                        className={cn(
                          'w-16 h-16 rounded-xl border transition-all duration-200 flex items-center justify-center relative group',
                          getColorClasses(action.color),
                          action.locked && 'opacity-75'
                        )}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconComponent size={20} />
                        {action.locked && (
                          <div className="absolute -top-1 -right-1 w-3 h-3 bg-hive-brand-secondary rounded-full border-2 border-hive-background-elevated" />
                        )}
                        
                        {/* Tooltip */}
                        <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                          <div className="bg-hive-background-secondary text-hive-text-primary text-xs px-2 py-1 rounded whitespace-nowrap">
                            {action.name}
                          </div>
                        </div>
                      </motion.button>
                    </ExpandFocus>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      )}

      {/* Notification Bell - Additional floating action */}
      {enableExpandFocus && (
        <motion.button
          className="fixed top-6 right-6 z-40 w-12 h-12 bg-hive-background-elevated rounded-xl border border-hive-border-subtle shadow-lg flex items-center justify-center text-hive-text-secondary hover:text-hive-text-primary hover:border-hive-border-focus transition-all duration-200"
          initial={{ opacity: 0, scale: 0.8, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Bell size={18} />
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse" />
        </motion.button>
      )}
    </div>
  );
};

export default EnhancedProfileDashboard;