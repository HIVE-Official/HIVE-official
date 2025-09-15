"use client";

import React, { useState, useEffect } from 'react';
import { Card } from '@hive/ui';
import { 
  Edit3, 
  Settings, 
  Smartphone,
  Tablet,
  Monitor,
  Save,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { CustomizableGrid } from '@/components/profile/dashboard/customizable-grid';
import { DashboardLayout } from '@/lib/firebase/collections/firebase-collections';
import { useSession } from '@/hooks/use-session';

type DeviceType = 'mobile' | 'tablet' | 'desktop';

export function ProfileDashboardClient() {
  const { user, isLoading: sessionLoading } = useSession();
  const [layout, setLayout] = useState<DashboardLayout | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentDevice, setCurrentDevice] = useState<DeviceType>('desktop');
  const [isLoading, setIsLoading] = useState(true);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Detect screen size and set appropriate device view
  useEffect(() => {
    const updateDeviceType = () => {
      const width = window.innerWidth;
      if (width < 768) {
        setCurrentDevice('mobile');
      } else if (width < 1024) {
        setCurrentDevice('tablet');
      } else {
        setCurrentDevice('desktop');
      }
    };

    updateDeviceType();
    window.addEventListener('resize', updateDeviceType);
    return () => window.removeEventListener('resize', updateDeviceType);
  }, []);

  // Fetch user's dashboard layout
  useEffect(() => {
    if (user) {
      fetchLayout();
    }
  }, [user]);

  const fetchLayout = async () => {
    try {
      const response = await fetch('/api/profile/dashboard/layout');
      if (response.ok) {
        const data = await response.json();
        setLayout(data.layout);
      }
    } catch (error) {
      console.error('Error fetching layout:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLayoutChange = (newLayout: DashboardLayout) => {
    setLayout(newLayout);
    setHasUnsavedChanges(false);
  };

  const handleEditModeChange = (editMode: boolean) => {
    setIsEditMode(editMode);
    if (!editMode) {
      setHasUnsavedChanges(false);
    }
  };

  const handleDeviceSwitch = (device: DeviceType) => {
    setCurrentDevice(device);
  };

  if (sessionLoading || isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="p-6">
                <div className="space-y-3">
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                  <div className="h-3 bg-muted rounded w-1/2"></div>
                  <div className="h-3 bg-muted rounded w-5/6"></div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      {/* Page Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground flex items-center gap-3">
            <Sparkles className="h-8 w-8 text-accent" />
            Campus Command Center
          </h1>
          <p className="text-muted-foreground mt-1">
            Your personalized dashboard for campus life, productivity, and connections
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Device View Switcher (Edit Mode Only) */}
          {isEditMode && (
            <div className="flex items-center border border-border rounded-lg overflow-hidden">
              <button
                onClick={() => handleDeviceSwitch('mobile')}
                className={`px-3 py-2 text-sm flex items-center gap-2 transition-colors ${
                  currentDevice === 'mobile' 
                    ? 'bg-accent text-accent-foreground' 
                    : 'hover:bg-muted/50'
                }`}
              >
                <Smartphone className="h-4 w-4" />
                Mobile
              </button>
              <button
                onClick={() => handleDeviceSwitch('tablet')}
                className={`px-3 py-2 text-sm flex items-center gap-2 transition-colors border-x border-border ${
                  currentDevice === 'tablet' 
                    ? 'bg-accent text-accent-foreground' 
                    : 'hover:bg-muted/50'
                }`}
              >
                <Tablet className="h-4 w-4" />
                Tablet
              </button>
              <button
                onClick={() => handleDeviceSwitch('desktop')}
                className={`px-3 py-2 text-sm flex items-center gap-2 transition-colors ${
                  currentDevice === 'desktop' 
                    ? 'bg-accent text-accent-foreground' 
                    : 'hover:bg-muted/50'
                }`}
              >
                <Monitor className="h-4 w-4" />
                Desktop
              </button>
            </div>
          )}

          {/* Edit Mode Toggle */}
          <button
            onClick={() => handleEditModeChange(!isEditMode)}
            className={`px-4 py-2 rounded-md transition-colors flex items-center gap-2 ${
              isEditMode 
                ? 'bg-accent text-accent-foreground hover:bg-accent/80' 
                : 'border border-border bg-background text-foreground hover:bg-muted'
            }`}
          >
            {isEditMode ? (
              <>
                <Save className="h-4 w-4" />
                Exit Edit Mode
              </>
            ) : (
              <>
                <Edit3 className="h-4 w-4" />
                Customize Dashboard
              </>
            )}
          </button>
        </div>
      </div>

      {/* Dashboard Stats (when not in edit mode) */}
      {!isEditMode && layout && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="p-4">
            <div className="text-2xl font-bold text-accent">12</div>
            <div className="text-sm text-muted-foreground">Active Spaces</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-accent">8</div>
            <div className="text-sm text-muted-foreground">Tools Built</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-accent">24</div>
            <div className="text-sm text-muted-foreground">Connections</div>
          </Card>
          <Card className="p-4">
            <div className="text-2xl font-bold text-accent">2.3k</div>
            <div className="text-sm text-muted-foreground">Campus Rep</div>
          </Card>
        </div>
      )}

      {/* Customizable Dashboard Grid */}
      {layout ? (
        <CustomizableGrid
          layout={layout}
          isEditMode={isEditMode}
          device={currentDevice}
          onLayoutChange={handleLayoutChange}
          onEditModeChange={handleEditModeChange}
        />
      ) : (
        <Card className="p-8 text-center">
          <Settings className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
          <h3 className="text-lg font-medium mb-2">Setting up your dashboard...</h3>
          <p className="text-sm text-muted-foreground mb-4">
            We're preparing your personalized campus command center.
          </p>
          <button 
            onClick={fetchLayout}
            className="px-4 py-2 bg-accent text-accent-foreground rounded-md hover:bg-accent/80 transition-colors flex items-center"
          >
            <RotateCcw className="h-4 w-4 mr-2" />
            Retry Setup
          </button>
        </Card>
      )}

      {/* Welcome Message for New Users */}
      {layout && !isEditMode && (
        <Card className="mt-8 p-6 bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
          <div className="flex items-start gap-4">
            <Sparkles className="h-6 w-6 text-accent mt-1" />
            <div>
              <h3 className="font-semibold text-foreground mb-2">
                Welcome to your Campus Command Center! 🎉
              </h3>
              <p className="text-sm text-muted-foreground mb-3">
                This is your personalized dashboard for managing campus life. Connect your calendar, 
                customize your layout, join spaces, build tools, and stay connected with your campus community.
              </p>
              <div className="flex flex-wrap gap-2">
                <button className="px-3 py-2 border border-border bg-background text-foreground rounded-md hover:bg-muted transition-colors text-sm">
                  Take Tour
                </button>
                <button 
                  onClick={() => setIsEditMode(true)}
                  className="px-3 py-2 border border-border bg-background text-foreground rounded-md hover:bg-muted transition-colors text-sm"
                >
                  Customize Layout
                </button>
                <button className="px-3 py-2 border border-border bg-background text-foreground rounded-md hover:bg-muted transition-colors text-sm">
                  Connect Calendar
                </button>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Debug Info (Development Only) */}
      {process.env.NODE_ENV === 'development' && (
        <Card className="mt-8 p-4 bg-muted/30">
          <details>
            <summary className="text-sm font-medium cursor-pointer">
              Debug Info (Dev Only)
            </summary>
            <pre className="text-xs mt-2 overflow-auto">
              {JSON.stringify({
                currentDevice,
                isEditMode,
                hasLayout: !!layout,
                visibleCards: layout?.layouts[currentDevice]?.filter(c => c.visible).length,
                totalCards: layout?.layouts[currentDevice]?.length
              }, null, 2)}
            </pre>
          </details>
        </Card>
      )}
    </div>
  );
}