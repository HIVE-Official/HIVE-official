"use client";

import { useState } from 'react';
import {
  Button,
  Card,
  Switch,
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@hive/ui';
import { HiveModal, HiveModalContent, HiveModalHeader, HiveModalTitle, HiveModalFooter } from '@/components/temp-stubs';
import { 
  Layout, 
  Palette, 
  Eye, 
  Settings, 
  Zap,
  Check,
  Maximize,
  RotateCcw
} from 'lucide-react';

interface CardCustomizationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (_config: CardConfig) => void;
  card: {
    id: string;
    name: string;
    description: string;
    icon: any;
    category: string;
    currentSize: '1x1' | '2x1' | '1x2' | '2x2';
    currentPosition: { x: number; y: number };
    isVisible: boolean;
    isRequired?: boolean;
  };
}

interface CardConfig {
  size: '1x1' | '2x1' | '1x2' | '2x2';
  position: { x: number; y: number };
  isVisible: boolean;
  settings: {
    showHeader: boolean;
    showFooter: boolean;
    compactMode: boolean;
    autoRefresh: boolean;
    refreshInterval: number;
  };
  appearance: {
    theme: 'default' | 'minimal' | 'detailed';
    showIcon: boolean;
    showBadges: boolean;
  };
}

export function CardCustomizationModal({
  isOpen,
  onClose,
  onSave,
  card
}: CardCustomizationModalProps) {
  const [config, setConfig] = useState<CardConfig>({
    size: card.currentSize,
    position: card.currentPosition,
    isVisible: card.isVisible,
    settings: {
      showHeader: true,
      showFooter: true,
      compactMode: false,
      autoRefresh: false,
      refreshInterval: 300
    },
    appearance: {
      theme: 'default',
      showIcon: true,
      showBadges: true
    }
  });

  const IconComponent = card.icon;

  const handleSizeChange = (size: CardConfig['size']) => {
    setConfig(prev => ({ ...prev, size }));
  };

  const handleSettingChange = (key: keyof CardConfig['settings'], value: any) => {
    setConfig(prev => ({
      ...prev,
      settings: { ...prev.settings, [key]: value }
    }));
  };

  const handleAppearanceChange = (key: keyof CardConfig['appearance'], value: any) => {
    setConfig(prev => ({
      ...prev,
      appearance: { ...prev.appearance, [key]: value }
    }));
  };

  const handleSave = () => {
    onSave(config);
    onClose();
  };

  const getSizeLabel = (size: CardConfig['size']) => {
    switch (size) {
      case '1x1': return 'Small (1×1)';
      case '2x1': return 'Wide (2×1)';
      case '1x2': return 'Tall (1×2)';
      case '2x2': return 'Large (2×2)';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'identity': return 'bg-purple-500';
      case 'academic': return 'bg-blue-500';
      case 'community': return 'bg-green-500';
      case 'platform': return 'bg-orange-500';
      case 'privacy': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  return (
    <HiveModal open={isOpen} onOpenChange={onClose} size="lg">
      <HiveModalContent className="max-w-2xl">
        <HiveModalHeader>
          <HiveModalTitle className="flex items-center space-x-3">
            <div className={`w-8 h-8 ${getCategoryColor(card.category)} rounded-lg flex items-center justify-center`}>
              <IconComponent className="h-5 w-5 text-white" />
            </div>
            <div>
              <span>Customize {card.name}</span>
              <div className="text-sm text-hive-text-mutedLight font-normal capitalize">
                {card.category} Card • {getSizeLabel(config.size)}
              </div>
            </div>
          </HiveModalTitle>
        </HiveModalHeader>

        <div className="p-6">
          <Tabs defaultValue="layout" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="layout" className="flex items-center space-x-2">
                <Layout className="h-4 w-4" />
                <span>Layout</span>
              </TabsTrigger>
              <TabsTrigger value="appearance" className="flex items-center space-x-2">
                <Palette className="h-4 w-4" />
                <span>Appearance</span>
              </TabsTrigger>
              <TabsTrigger value="behavior" className="flex items-center space-x-2">
                <Settings className="h-4 w-4" />
                <span>Behavior</span>
              </TabsTrigger>
            </TabsList>

            {/* Layout Tab */}
            <TabsContent value="layout" className="space-y-6">
              <Card className="p-4 bg-hive-background-overlay border-hive-border-default">
                <h3 className="font-medium text-white mb-4 flex items-center space-x-2">
                  <Maximize className="h-4 w-4" />
                  <span>Card Size</span>
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {(['1x1', '2x1', '1x2', '2x2'] as const).map((size) => (
                    <button
                      key={size}
                      onClick={() => handleSizeChange(size)}
                      className={`
                        p-3 rounded-lg text-left transition-all duration-200
                        ${config.size === size 
                          ? 'bg-hive-gold/10 border-2 border-hive-gold' 
                          : 'bg-hive-background-tertiary border-2 border-transparent hover:border-hive-border-hover'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-white">{getSizeLabel(size)}</span>
                        {config.size === size && <Check className="h-4 w-4 text-hive-gold" />}
                      </div>
                      <div className="grid grid-cols-2 gap-1 w-8 h-8">
                        <div className={`bg-hive-gold/50 rounded-sm ${size.startsWith('2') ? 'col-span-2' : ''}`} />
                        {size === '1x1' && <div className="bg-gray-600 rounded-sm" />}
                        {size === '1x2' && (
                          <>
                            <div className="bg-gray-600 rounded-sm" />
                            <div className="bg-hive-gold/50 rounded-sm" />
                            <div className="bg-gray-600 rounded-sm" />
                          </>
                        )}
                        {size === '2x2' && (
                          <div className="bg-hive-gold/50 rounded-sm col-span-2" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </Card>

              <Card className="p-4 bg-hive-background-overlay border-hive-border-default">
                <h3 className="font-medium text-white mb-4 flex items-center space-x-2">
                  <Eye className="h-4 w-4" />
                  <span>Visibility</span>
                </h3>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-white">Show on Dashboard</div>
                    <div className="text-sm text-hive-text-mutedLight">
                      {card.isRequired ? 'This card is required and cannot be hidden' : 'Toggle card visibility on your profile'}
                    </div>
                  </div>
                  <Switch
                    checked={config.isVisible}
                    onCheckedChange={(checked) => setConfig(prev => ({ ...prev, isVisible: checked }))}
                    disabled={card.isRequired}
                  />
                </div>
              </Card>
            </TabsContent>

            {/* Appearance Tab */}
            <TabsContent value="appearance" className="space-y-6">
              <Card className="p-4 bg-hive-background-overlay border-hive-border-default">
                <h3 className="font-medium text-white mb-4 flex items-center space-x-2">
                  <Palette className="h-4 w-4" />
                  <span>Theme Style</span>
                </h3>
                <Select
                  value={config.appearance.theme}
                  onValueChange={(value: any) => handleAppearanceChange('theme', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="default">Default - Balanced information display</SelectItem>
                    <SelectItem value="minimal">Minimal - Clean and simple</SelectItem>
                    <SelectItem value="detailed">Detailed - Maximum information</SelectItem>
                  </SelectContent>
                </Select>
              </Card>

              <Card className="p-4 bg-hive-background-overlay border-hive-border-default">
                <h3 className="font-medium text-white mb-4">Display Options</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Show Icon</div>
                      <div className="text-sm text-hive-text-mutedLight">Display card icon in header</div>
                    </div>
                    <Switch
                      checked={config.appearance.showIcon}
                      onCheckedChange={(checked) => handleAppearanceChange('showIcon', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Show Badges</div>
                      <div className="text-sm text-hive-text-mutedLight">Display status badges and indicators</div>
                    </div>
                    <Switch
                      checked={config.appearance.showBadges}
                      onCheckedChange={(checked) => handleAppearanceChange('showBadges', checked)}
                    />
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Behavior Tab */}
            <TabsContent value="behavior" className="space-y-6">
              <Card className="p-4 bg-hive-background-overlay border-hive-border-default">
                <h3 className="font-medium text-white mb-4 flex items-center space-x-2">
                  <Settings className="h-4 w-4" />
                  <span>Card Behavior</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Show Header</div>
                      <div className="text-sm text-hive-text-mutedLight">Display card title and actions</div>
                    </div>
                    <Switch
                      checked={config.settings.showHeader}
                      onCheckedChange={(checked) => handleSettingChange('showHeader', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Show Footer</div>
                      <div className="text-sm text-hive-text-mutedLight">Display card footer with additional actions</div>
                    </div>
                    <Switch
                      checked={config.settings.showFooter}
                      onCheckedChange={(checked) => handleSettingChange('showFooter', checked)}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Compact Mode</div>
                      <div className="text-sm text-hive-text-mutedLight">Use condensed layout to fit more content</div>
                    </div>
                    <Switch
                      checked={config.settings.compactMode}
                      onCheckedChange={(checked) => handleSettingChange('compactMode', checked)}
                    />
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-hive-background-overlay border-hive-border-default">
                <h3 className="font-medium text-white mb-4 flex items-center space-x-2">
                  <Zap className="h-4 w-4" />
                  <span>Data Refresh</span>
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-white">Auto Refresh</div>
                      <div className="text-sm text-hive-text-mutedLight">Automatically update card data</div>
                    </div>
                    <Switch
                      checked={config.settings.autoRefresh}
                      onCheckedChange={(checked) => handleSettingChange('autoRefresh', checked)}
                    />
                  </div>
                  {config.settings.autoRefresh && (
                    <div>
                      <div className="font-medium text-white mb-2">Refresh Interval</div>
                      <Select
                        value={config.settings.refreshInterval.toString()}
                        onValueChange={(value) => handleSettingChange('refreshInterval', parseInt(value))}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="60">1 minute</SelectItem>
                          <SelectItem value="300">5 minutes</SelectItem>
                          <SelectItem value="900">15 minutes</SelectItem>
                          <SelectItem value="1800">30 minutes</SelectItem>
                          <SelectItem value="3600">1 hour</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Preview */}
          <Card className="p-4 bg-gradient-to-br from-hive-gold/5 to-hive-champagne/5 border-hive-gold/20">
            <h3 className="font-medium text-white mb-3 flex items-center space-x-2">
              <Eye className="h-4 w-4" />
              <span>Preview</span>
            </h3>
            <div className="p-3 rounded-lg bg-hive-background-overlay border border-hive-border-default">
              <div className="flex items-center space-x-3">
                {config.appearance.showIcon && (
                  <div className={`w-6 h-6 ${getCategoryColor(card.category)} rounded flex items-center justify-center`}>
                    <IconComponent className="h-4 w-4 text-white" />
                  </div>
                )}
                <div className="flex-1">
                  <div className="font-medium text-white text-sm">{card.name}</div>
                  {config.settings.showHeader && (
                    <div className="text-xs text-hive-text-mutedLight">
                      {config.appearance.theme} theme • {getSizeLabel(config.size)}
                    </div>
                  )}
                </div>
                {config.appearance.showBadges && (
                  <Badge variant="freshman" className="text-xs">
                    {config.isVisible ? 'Visible' : 'Hidden'}
                  </Badge>
                )}
              </div>
            </div>
          </Card>
        </div>

        <HiveModalFooter>
          <div className="flex items-center justify-between w-full">
            <Button
              variant="secondary"
              onClick={() => {
                setConfig({
                  size: card.currentSize,
                  position: card.currentPosition,
                  isVisible: card.isVisible,
                  settings: {
                    showHeader: true,
                    showFooter: true,
                    compactMode: false,
                    autoRefresh: false,
                    refreshInterval: 300
                  },
                  appearance: {
                    theme: 'default',
                    showIcon: true,
                    showBadges: true
                  }
                });
              }}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset
            </Button>
            <div className="flex items-center space-x-3">
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
              >
                <Check className="h-4 w-4 mr-2" />
                Apply Changes
              </Button>
            </div>
          </div>
        </HiveModalFooter>
      </HiveModalContent>
    </HiveModal>
  );
}