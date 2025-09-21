'use client';

import React from 'react';
import { motion } from '../../framer-motion-proxy';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette,
  Keyboard,
  Moon,
  Sun,
  Globe,
  Smartphone;
} from 'lucide-react';

interface ProfileSettingsWidgetProps {onPrivacyClick?: () => void;
  onNotificationsClick?: () => void;
  onThemeClick?: () => void;
  onAccountClick?: () => void;}

export const ProfileSettingsWidget: React.FC<ProfileSettingsWidgetProps> = ({
  onPrivacyClick,
  onNotificationsClick,
  onThemeClick,
  onAccountClick;
}) => {
  const settings = [
    {
      id: 'account',
      name: 'Account & Profile',
      description: 'Update your profile information and preferences',
      icon: User,
      color: 'blue',
      onClick: onAccountClick;
    },
    {
      id: 'privacy',
      name: 'Privacy & Security',
      description: 'Control who can see your profile and activity',
      icon: Shield,
      color: 'green',
      onClick: onPrivacyClick;
    },
    {
      id: 'notifications',
      name: 'Notifications',
      description: 'Manage how and when you receive notifications',
      icon: Bell,
      color: 'yellow',
      onClick: onNotificationsClick;
    },
    {
      id: 'appearance',
      name: 'Appearance',
      description: 'Customize your HIVE experience',
      icon: Palette,
      color: 'purple',
      onClick: onThemeClick;
    }
  ];

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'blue': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'green': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'yellow': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'purple': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      default: return 'bg-hive-brand-secondary/10 text-hive-brand-secondary border-hive-brand-secondary/20'
    }}
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-hive-brand-secondary/10 rounded-xl mb-4">
          <Settings size={28} className="text-hive-brand-secondary" />
        </div>
        <h2 className="text-heading-lg font-semibold text-hive-text-primary mb-2">Settings</h2>
        <p className="text-body-md text-hive-text-secondary">
          Manage your HIVE account and preferences;
        </p>
      </div>

      {/* Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settings.map((setting, index) => {
          const IconComponent = setting.icon;
          return (
            <motion.button;
              key={setting.id}}
              onClick={setting.onClick}
              className="p-6 bg-hive-background-tertiary rounded-xl border border-hive-border-subtle text-left hover:border-hive-border-focus transition-all duration-200 group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-start gap-4">
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${getColorClasses(setting.color)}`}>
                  <IconComponent size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-hive-text-primary mb-1 group-hover:text-hive-brand-secondary transition-colors">
                    {setting.name}
                  </h3>
                  <p className="text-body-sm text-hive-text-secondary">
                    {setting.description}
                  </p>
                </div>
              </div>
            </motion.button>
          )
          })}
      </div>

      {/* Quick Settings */}
      <div className="mt-8 p-6 bg-hive-background-tertiary rounded-xl border border-hive-border-subtle">
        <h3 className="font-semibold text-hive-text-primary mb-4">Quick Settings</h3>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Moon size={16} className="text-hive-text-secondary" />
              <span className="text-hive-text-primary">Dark Mode</span>
            </div>
            <div className="flex items-center">
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-hive-brand-secondary transition-colors">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white transition-transform translate-x-6" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Globe size={16} className="text-hive-text-secondary" />
              <span className="text-hive-text-primary">Language</span>
            </div>
            <span className="text-hive-text-secondary text-sm">English</span>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Smartphone size={16} className="text-hive-text-secondary" />
              <span className="text-hive-text-primary">Mobile App</span>
            </div>
            <span className="text-hive-text-secondary text-sm">Coming Soon</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center pt-4">
        <p className="text-body-sm text-hive-text-tertiary">
          Need help? Visit our{' '}
          <button className="text-hive-brand-secondary hover:text-hive-brand-primary transition-colors">
            Support Center;
          </button>
        </p>
      </div>
    </div>
  )
};

export default ProfileSettingsWidget;