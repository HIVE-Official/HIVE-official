/**
 * Bento Grid Layout System Stories
 * Comprehensive showcase of the responsive grid system powering HIVE profiles
 */

import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useCallback } from 'react';
import { motion } from '../../components/framer-motion-proxy';
import { Card, CardContent, CardHeader } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Switch } from '../../components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';

// Import the bento grid system
import { BentoGridLayout, useBentoGrid, type GridItem } from '../../components/profile/bento-grid/bento-grid-layout';

import { 
  Monitor, 
  Tablet, 
  Smartphone, 
  Grid,
  Layout,
  Move,
  Maximize,
  Minimize,
  Settings,
  RotateCcw,
  Save,
  Edit,
  Eye,
  Info,
  CheckCircle,
  Users,
  Calendar,
  Bell,
  Crown,
  Zap,
  User
} from 'lucide-react';

const meta: Meta<typeof BentoGridLayout> = {
  title: '97-Profile Components/Bento Grid Layout System',
  component: BentoGridLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# Bento Grid Layout System

The responsive grid system that powers HIVE profile customization. Supports drag & drop reordering, 
resizing, and responsive adaptation from 4-column desktop to single-column mobile.

## Key Features
- **Responsive Design**: 4 columns (desktop) → 2 columns (tablet) → 1 column (mobile)
- **Drag & Drop**: Intuitive reordering with smooth animations
- **Dynamic Resizing**: Cards can be 1x1, 1x2, 2x1, or 2x2
- **Edit Mode**: Toggle between view and customization modes
- **Auto Layout**: Intelligent positioning algorithm prevents overlaps
- **Persistence**: Layout state can be saved to Firebase/localStorage

## Grid Specifications
- **Desktop**: 4-column grid with full functionality
- **Tablet**: 2-column grid with limited resize options  
- **Mobile**: Single column stack with swipe reordering
- **Card Sizes**: 1x1 (compact), 1x2 (tall), 2x1 (wide), 2x2 (large)
- **Animations**: Framer Motion for smooth transitions
        `
      }
    }
  }
};

export default meta;

// Mock card data for grid testing
const createMockGridItems = (): GridItem[] => [
  {
    id: 'avatar',
    cardType: 'avatar',
    position: { x: 0, y: 0 },
    size: { width: 2, height: 1 },
    isVisible: true,
    settings: {}
  },
  {
    id: 'calendar',
    cardType: 'calendar', 
    position: { x: 2, y: 0 },
    size: { width: 2, height: 1 },
    isVisible: true,
    settings: {}
  },
  {
    id: 'notifications',
    cardType: 'notifications',
    position: { x: 0, y: 1 },
    size: { width: 2, height: 1 },
    isVisible: true,
    settings: {}
  },
  {
    id: 'spaces',
    cardType: 'spaces',
    position: { x: 2, y: 1 },
    size: { width: 1, height: 2 },
    isVisible: true,
    settings: {}
  },
  {
    id: 'ghost-mode',
    cardType: 'ghostMode',
    position: { x: 3, y: 1 },
    size: { width: 1, height: 1 },
    isVisible: true,
    settings: {}
  },
  {
    id: 'hive-lab',
    cardType: 'hiveLab',
    position: { x: 3, y: 2 },
    size: { width: 1, height: 1 },
    isVisible: true,
    settings: {}
  }
];

// Card type configuration for visual representation
const cardTypeConfig = {
  avatar: { label: 'Avatar Card', icon: User, color: 'bg-blue-100 text-blue-700 border-blue-200' },
  calendar: { label: 'Calendar Card', icon: Calendar, color: 'bg-green-100 text-green-700 border-green-200' },
  notifications: { label: 'Notifications Card', icon: Bell, color: 'bg-orange-100 text-orange-700 border-orange-200' },
  spaces: { label: 'Spaces Card', icon: Users, color: 'bg-purple-100 text-purple-700 border-purple-200' },
  ghostMode: { label: 'Ghost Mode Card', icon: Eye, color: 'bg-gray-100 text-gray-700 border-gray-200' },
  hiveLab: { label: 'HiveLAB Card', icon: Zap, color: 'bg-yellow-100 text-yellow-700 border-yellow-200' }
};

// Mock card component for grid testing
function MockCard({ item }: { item: GridItem }) {
  const config = cardTypeConfig[item.cardType as keyof typeof cardTypeConfig];
  const Icon = config.icon;

  return (
    <Card className={`h-full border-2 ${config.color}`}>
      <CardContent className="p-4 h-full flex flex-col items-center justify-center text-center">
        <Icon className="w-8 h-8 mb-3" />
        <h3 className="font-semibold text-lg mb-2">{config.label}</h3>
        <Badge variant="outline" className="mb-2">
          {item.size.width}x{item.size.height}
        </Badge>
        <p className="text-sm opacity-80">
          Position: ({item.position.x}, {item.position.y})
        </p>
      </CardContent>
    </Card>
  );
}

// Device Preview Controls
function DeviceControls({ 
  device, 
  onDeviceChange,
  isEditMode,
  onEditModeToggle 
}: {
  device: 'desktop' | 'tablet' | 'mobile';
  onDeviceChange: (device: 'desktop' | 'tablet' | 'mobile') => void;
  isEditMode: boolean;
  onEditModeToggle: () => void;
}) {
  const devices = [
    { key: 'desktop', label: 'Desktop', icon: Monitor, columns: 4 },
    { key: 'tablet', label: 'Tablet', icon: Tablet, columns: 2 },
    { key: 'mobile', label: 'Mobile', icon: Smartphone, columns: 1 }
  ] as const;

  return (
    <div className="flex items-center justify-between p-4 bg-[var(--hive-background-secondary)] rounded-lg border">
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium text-[var(--hive-text-primary)]">Device Preview:</span>
        <div className="flex gap-1">
          {devices.map(({ key, label, icon: Icon, columns }) => (
            <Button
              key={key}
              size="sm"
              variant={device === key ? "default" : "outline"}
              onClick={() => onDeviceChange(key)}
            >
              <Icon className="w-4 h-4 mr-2" />
              {label}
              <Badge variant="secondary" className="ml-2 text-xs">
                {columns} col
              </Badge>
            </Button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-[var(--hive-text-primary)]">Edit Mode</span>
          <Switch checked={isEditMode} onCheckedChange={onEditModeToggle} />
        </div>
      </div>
    </div>
  );
}

// Grid Analytics Component
function GridAnalytics({ items }: { items: GridItem[] }) {
  const totalCards = items.filter(item => item.isVisible).length;
  const cardSizes = items.reduce((acc, item) => {
    if (!item.isVisible) return acc;
    const size = `${item.size.width}x${item.size.height}`;
    acc[size] = (acc[size] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const gridUtilization = items.reduce((acc, item) => {
    if (!item.isVisible) return acc;
    return acc + (item.size.width * item.size.height);
  }, 0);

  return (
    <Card>
      <CardHeader>
        <h4 className="font-semibold text-[var(--hive-text-primary)]">Grid Analytics</h4>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-[var(--hive-text-primary)]">{totalCards}</div>
            <div className="text-sm text-[var(--hive-text-muted)]">Total Cards</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-[var(--hive-text-primary)]">{gridUtilization}</div>
            <div className="text-sm text-[var(--hive-text-muted)]">Grid Units</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-[var(--hive-text-primary)]">
              {Object.keys(cardSizes).length}
            </div>
            <div className="text-sm text-[var(--hive-text-muted)]">Size Types</div>
          </div>
          
          <div className="text-center">
            <div className="text-lg font-bold text-[var(--hive-text-primary)]">
              {Math.round((gridUtilization / 16) * 100)}%
            </div>
            <div className="text-sm text-[var(--hive-text-muted)]">Utilization</div>
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <h5 className="font-medium text-[var(--hive-text-primary)]">Card Size Distribution</h5>
          {Object.entries(cardSizes).map(([size, count]) => (
            <div key={size} className="flex items-center justify-between text-sm">
              <span className="text-[var(--hive-text-secondary)]">{size} cards</span>
              <Badge variant="outline">{count}</Badge>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

// Basic Grid Demo
export const BasicGridDemo: StoryObj = {
  render: () => {
    const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
    const {
      items,
      isEditMode,
      updateItems,
      toggleEditMode,
      setIsEditMode
    } = useBentoGrid(createMockGridItems());

    const maxColumns = device === 'desktop' ? 4 : device === 'tablet' ? 2 : 1;

    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-[var(--hive-text-primary)]">
              Bento Grid Layout Demo
            </h1>
            <p className="text-[var(--hive-text-muted)]">
              Interactive demonstration of the responsive grid system
            </p>
          </div>

          <DeviceControls
            device={device}
            onDeviceChange={setDevice}
            isEditMode={isEditMode}
            onEditModeToggle={toggleEditMode}
          />

          <div className={`transition-all duration-300 mx-auto ${
            device === 'mobile' ? 'max-w-sm' :
            device === 'tablet' ? 'max-w-4xl' :
            'max-w-7xl'
          }`}>
            <BentoGridLayout
              items={items}
              isEditMode={isEditMode}
              onItemsChange={updateItems}
              onEditModeChange={setIsEditMode}
              maxColumns={maxColumns}
            >
              {items
                .filter(item => item.isVisible)
                .map((item) => (
                  <MockCard key={item.id} item={item} />
                ))}
            </BentoGridLayout>
          </div>

          <GridAnalytics items={items} />
        </div>
      </div>
    );
  }
};

// Responsive Behavior Demo
export const ResponsiveBehaviorDemo: StoryObj = {
  render: () => {
    const [autoDevice, setAutoDevice] = useState(true);
    const [manualDevice, setManualDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
    const {
      items,
      isEditMode,
      updateItems,
      toggleEditMode,
      setIsEditMode
    } = useBentoGrid(createMockGridItems());

    // Auto device detection based on container width
    const [containerWidth, setContainerWidth] = useState(1200);
    const device = autoDevice 
      ? containerWidth < 768 ? 'mobile' : containerWidth < 1200 ? 'tablet' : 'desktop'
      : manualDevice;

    const maxColumns = device === 'desktop' ? 4 : device === 'tablet' ? 2 : 1;

    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-[var(--hive-text-primary)]">
              Responsive Behavior Demo
            </h1>
            <p className="text-[var(--hive-text-muted)]">
              See how the grid adapts to different screen sizes
            </p>
          </div>

          <Card>
            <CardContent className="p-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">Auto Responsive</span>
                    <Switch 
                      checked={autoDevice} 
                      onCheckedChange={setAutoDevice} 
                    />
                  </div>
                  <div className="text-sm text-[var(--hive-text-muted)]">
                    Current: {device} ({maxColumns} columns)
                  </div>
                </div>

                {autoDevice && (
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Container Width: {containerWidth}px
                    </label>
                    <input
                      type="range"
                      min="320"
                      max="1400"
                      step="10"
                      value={containerWidth}
                      onChange={(e) => setContainerWidth(Number(e.target.value))}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-[var(--hive-text-muted)]">
                      <span>Mobile (320px)</span>
                      <span>Tablet (768px)</span>
                      <span>Desktop (1200px+)</span>
                    </div>
                  </div>
                )}

                {!autoDevice && (
                  <div className="flex gap-2">
                    {(['desktop', 'tablet', 'mobile'] as const).map((deviceType) => (
                      <Button
                        key={deviceType}
                        size="sm"
                        variant={manualDevice === deviceType ? "default" : "outline"}
                        onClick={() => setManualDevice(deviceType)}
                        className="capitalize"
                      >
                        {deviceType}
                      </Button>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div 
            className="mx-auto transition-all duration-500"
            style={{ 
              maxWidth: autoDevice ? `${containerWidth}px` : 
                device === 'mobile' ? '400px' :
                device === 'tablet' ? '768px' :
                '1200px'
            }}
          >
            <BentoGridLayout
              items={items}
              isEditMode={isEditMode}
              onItemsChange={updateItems}
              onEditModeChange={setIsEditMode}
              maxColumns={maxColumns}
            >
              {items
                .filter(item => item.isVisible)
                .map((item) => (
                  <MockCard key={item.id} item={item} />
                ))}
            </BentoGridLayout>
          </div>

          {/* Breakpoint Indicators */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { name: 'Mobile', range: '< 768px', active: device === 'mobile' },
              { name: 'Tablet', range: '768px - 1199px', active: device === 'tablet' },
              { name: 'Desktop', range: '≥ 1200px', active: device === 'desktop' }
            ].map((breakpoint) => (
              <Card key={breakpoint.name} className={`p-4 text-center ${
                breakpoint.active ? 'ring-2 ring-[var(--hive-brand-primary)]' : ''
              }`}>
                <h4 className="font-semibold text-[var(--hive-text-primary)]">
                  {breakpoint.name}
                </h4>
                <p className="text-sm text-[var(--hive-text-muted)]">
                  {breakpoint.range}
                </p>
                {breakpoint.active && (
                  <Badge className="mt-2">Active</Badge>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

// Edit Mode Features Demo
export const EditModeFeaturesDemo: StoryObj = {
  render: () => {
    const {
      items,
      isEditMode,
      updateItems,
      toggleEditMode
    } = useBentoGrid(createMockGridItems());

    const [showInstructions, setShowInstructions] = useState(true);

    const handleResetLayout = useCallback(() => {
      updateItems(createMockGridItems());
    }, [updateItems]);

    const toggleCardVisibility = useCallback((cardId: string) => {
      const updatedItems = items.map(item =>
        item.id === cardId ? { ...item, isVisible: !item.isVisible } : item
      );
      updateItems(updatedItems);
    }, [items, updateItems]);

    const features = [
      { icon: Move, label: 'Drag & Drop', description: 'Reorder cards by dragging' },
      { icon: Maximize, label: 'Resize', description: 'Use corner handles to resize' },
      { icon: Settings, label: 'Settings', description: 'Configure individual cards' },
      { icon: Eye, label: 'Visibility', description: 'Show/hide cards' }
    ];

    return (
      <div className="min-h-screen bg-[var(--hive-background-primary)] p-6">
        <div className="max-w-7xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold text-[var(--hive-text-primary)]">
              Edit Mode Features Demo
            </h1>
            <p className="text-[var(--hive-text-muted)]">
              Explore all customization capabilities of the bento grid
            </p>
          </div>

          {/* Instructions */}
          {showInstructions && (
            <Card className="border-blue-200 bg-blue-50">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-semibold text-blue-900 mb-2">How to Use Edit Mode</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {features.map((feature) => {
                        const Icon = feature.icon;
                        return (
                          <div key={feature.label} className="flex items-center gap-2">
                            <Icon className="w-4 h-4 text-blue-700" />
                            <span className="text-sm">
                              <strong className="text-blue-900">{feature.label}:</strong>{' '}
                              <span className="text-blue-800">{feature.description}</span>
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowInstructions(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant={isEditMode ? "default" : "outline"}
                onClick={toggleEditMode}
              >
                {isEditMode ? (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit className="w-4 h-4 mr-2" />
                    Enter Edit Mode
                  </>
                )}
              </Button>
              
              <Button
                variant="outline"
                onClick={handleResetLayout}
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset Layout
              </Button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-sm text-[var(--hive-text-muted)]">
                {items.filter(item => item.isVisible).length} of {items.length} cards visible
              </span>
            </div>
          </div>

          {/* Card Visibility Controls */}
          <Card>
            <CardHeader>
              <h4 className="font-semibold text-[var(--hive-text-primary)]">Card Visibility</h4>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {items.map((item) => {
                  const config = cardTypeConfig[item.cardType as keyof typeof cardTypeConfig];
                  const Icon = config.icon;
                  
                  return (
                    <div key={item.id} className="flex items-center justify-between p-2 border rounded">
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4" />
                        <span className="text-sm text-[var(--hive-text-primary)]">
                          {config.label}
                        </span>
                      </div>
                      <Switch
                        checked={item.isVisible}
                        onCheckedChange={() => toggleCardVisibility(item.id)}
                      />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Grid */}
          <BentoGridLayout
            items={items}
            isEditMode={isEditMode}
            onItemsChange={updateItems}
            onEditModeChange={toggleEditMode}
            maxColumns={4}
          >
            {items
              .filter(item => item.isVisible)
              .map((item) => (
                <MockCard key={item.id} item={item} />
              ))}
          </BentoGridLayout>

          {/* Status */}
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${
                    isEditMode ? 'bg-orange-500' : 'bg-green-500'
                  }`} />
                  <span className="text-sm font-medium">
                    {isEditMode ? 'Edit Mode Active' : 'View Mode'}
                  </span>
                </div>
                <div className="text-sm text-[var(--hive-text-muted)]">
                  Grid: 4 columns • {items.filter(item => item.isVisible).length} cards visible
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }
};