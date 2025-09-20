"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { HiveCard, HiveButton, HiveBadge } from '../index';
import { 
  Settings, 
  Eye, 
  EyeOff, 
  Users, 
  BarChart3, 
  MessageSquare, 
  Activity, 
  Lock, 
  Unlock,
  Monitor,
  Smartphone,
  RotateCcw,
  Play,
  Pause,
  Share,
  Download,
  Edit3,
  Zap,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { cn } from '../../lib/utils';

interface ToolDualInterfaceProps {
  toolId: string;
  toolName: string;
  toolDescription: string;
  isLeaderView?: boolean;
  isActive?: boolean;
  onToggleInterface?: (isLeaderView: boolean) => void;
  onToggleActive?: () => void;
  onConfigureInterface?: () => void;
  onConfigureSurface?: () => void;
  className?: string;
}

interface ToolInterface {
  id: string;
  type: 'interface' | 'surface';
  title: string;
  description: string;
  component: React.ComponentType<any>;
  permissions: {
    canView: string[]; // roles that can view
    canEdit: string[]; // roles that can edit
    canInteract: string[]; // roles that can interact
  };
  visibility: {
    showInToolGrid: boolean;
    showInPostBoard: boolean;
    requiresAuth: boolean;
  };
  analytics: {
    views: number;
    interactions: number;
    lastUsed: Date;
  };
}

interface ToolState {
  isActive: boolean;
  currentUsers: number;
  totalInteractions: number;
  lastActivity: Date;
  surfaceData: Record<string, any>;
  interfaceData: Record<string, any>;
}

// Mock Interface Component (Utility Side - for leaders/builders)
const PollInterface = ({ toolState, onUpdate }: { toolState: any; onUpdate: (data: any) => void }) => (
  <div className="space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="font-semibold text-gray-900">Poll Configuration</h3>
      <div className="flex items-center gap-2">
        <HiveBadge className="bg-blue-100 text-blue-800 border-blue-200">
          Interface
        </HiveBadge>
        <HiveBadge variant="outline">
          {toolState?.responses?.length || 0} responses
        </HiveBadge>
      </div>
    </div>
    
    <div className="p-4 bg-gray-50 rounded-lg">
      <h4 className="font-medium mb-2">Question</h4>
      <input
        type="text"
        value={toolState?.question || "What's your favorite study location?"}
        onChange={(e) => onUpdate({ question: e.target.value }}
        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
      />
    </div>

    <div className="p-4 bg-gray-50 rounded-lg">
      <h4 className="font-medium mb-2">Options</h4>
      <div className="space-y-2">
        {(toolState?.options || ['Library', 'Coffee Shop', 'Dorm Room', 'Study Hall']).map((option: string, index: number) => (
          <div key={index} className="flex items-center justify-between">
            <input
              type="text"
              value={option}
              onChange={(e) => {
                const newOptions = [...(toolState?.options || [])];
                newOptions[index] = e.target.value;
                onUpdate({ options: newOptions });
              }}
              className="flex-1 px-3 py-1 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
            />
            <span className="ml-2 text-sm text-gray-500">
              {Math.floor(Math.random() * 20)} votes
            </span>
          </div>
        ))}
      </div>
    </div>

    <div className="grid grid-cols-2 gap-4">
      <HiveButton size="sm" variant="outline">
        <BarChart3 className="w-4 h-4 mr-2" />
        View Analytics
      </HiveButton>
      <HiveButton size="sm" variant="outline">
        <Download className="w-4 h-4 mr-2" />
        Export Data
      </HiveButton>
    </div>
  </div>
);

// Mock Surface Component (Informational Side - for Post Board)
const PollSurface = ({ toolState }: { toolState: any }) => (
  <div className="space-y-3">
    <div className="flex items-center justify-between">
      <h3 className="font-medium text-gray-900">
        {toolState?.question || "What's your favorite study location?"}
      </h3>
      <HiveBadge className="bg-green-100 text-green-800 border-green-200">
        Surface
      </HiveBadge>
    </div>
    
    <div className="space-y-2">
      {(toolState?.options || ['Library', 'Coffee Shop', 'Dorm Room', 'Study Hall']).map((option: string, index: number) => {
        const votes = Math.floor(Math.random() * 20);
        const percentage = Math.floor(Math.random() * 100);
        
        return (
          <div key={index} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-700">{option}</span>
              <span className="text-gray-500">{votes} votes ({percentage}%)</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-amber-500 h-2 rounded-full transition-all duration-500" 
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>

    <div className="pt-2 border-t border-gray-200 flex items-center justify-between text-sm text-gray-500">
      <span>{Math.floor(Math.random() * 50) + 10} total responses</span>
      <span>Updated {Math.floor(Math.random() * 10) + 1}m ago</span>
    </div>
  </div>
);

const InterfacePreviewCard = ({ 
  interface: iface, 
  isActive, 
  onToggle,
  onConfigure 
}: { 
  interface: ToolInterface; 
  isActive: boolean;
  onToggle: () => void;
  onConfigure: () => void;
}) => (
  <HiveCard className={cn(
    "p-4 transition-all",
    isActive ? "ring-2 ring-amber-500 bg-amber-50" : "hover:shadow-md"
  )}>
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-gray-900">{iface.title}</h4>
            <HiveBadge className={
              iface.type === 'interface' 
                ? "bg-blue-100 text-blue-800 border-blue-200"
                : "bg-green-100 text-green-800 border-green-200"
            }>
              {iface.type === 'interface' ? 'Interface' : 'Surface'}
            </HiveBadge>
          </div>
          <p className="text-sm text-gray-600">{iface.description}</p>
        </div>
        
        <div className="flex items-center gap-1">
          <HiveButton
            size="sm"
            variant="outline"
            onClick={onConfigure}
          >
            <Settings className="w-3 h-3" />
          </HiveButton>
          <HiveButton
            size="sm"
            variant={isActive ? "primary" : "outline"}
            onClick={onToggle}
          >
            {isActive ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
          </HiveButton>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 text-xs">
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">{iface.analytics.views}</div>
          <div className="text-gray-500">Views</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">{iface.analytics.interactions}</div>
          <div className="text-gray-500">Interactions</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-semibold text-gray-900">
            {Math.floor((Date.now() - iface.analytics.lastUsed.getTime()) / (1000 * 60))}m
          </div>
          <div className="text-gray-500">Last Used</div>
        </div>
      </div>

      <div className="pt-2 border-t border-gray-200">
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span className={cn(
              "flex items-center gap-1",
              iface.visibility.showInToolGrid && "text-green-600"
            )}>
              <Monitor className="w-3 h-3" />
              Tool Grid: {iface.visibility.showInToolGrid ? 'Yes' : 'No'}
            </span>
            <span className={cn(
              "flex items-center gap-1",
              iface.visibility.showInPostBoard && "text-green-600"
            )}>
              <MessageSquare className="w-3 h-3" />
              Post Board: {iface.visibility.showInPostBoard ? 'Yes' : 'No'}
            </span>
          </div>
        </div>
      </div>
    </div>
  </HiveCard>
);

export function ToolDualInterfaceSystem({
  toolId,
  toolName,
  toolDescription,
  isLeaderView = false,
  isActive = true,
  onToggleInterface,
  onToggleActive,
  onConfigureInterface,
  onConfigureSurface,
  className
}: ToolDualInterfaceProps) {
  const [currentView, setCurrentView] = useState<'interface' | 'surface' | 'both'>(
    isLeaderView ? 'interface' : 'surface'
  );
  const [toolState, setToolState] = useState<ToolState>({
    isActive,
    currentUsers: Math.floor(Math.random() * 10) + 1,
    totalInteractions: Math.floor(Math.random() * 100) + 50,
    lastActivity: new Date(),
    surfaceData: {},
    interfaceData: {}
  });

  // Mock interfaces for demonstration
  const toolInterfaces: ToolInterface[] = useMemo(() => [
    {
      id: 'poll_interface',
      type: 'interface',
      title: 'Poll Configuration',
      description: 'Create and manage poll questions, options, and settings',
      component: PollInterface,
      permissions: {
        canView: ['leader', 'admin', 'moderator'],
        canEdit: ['leader', 'admin'],
        canInteract: ['leader', 'admin', 'moderator']
      },
      visibility: {
        showInToolGrid: true,
        showInPostBoard: false,
        requiresAuth: true
      },
      analytics: {
        views: Math.floor(Math.random() * 50) + 10,
        interactions: Math.floor(Math.random() * 30) + 5,
        lastUsed: new Date(Date.now() - Math.random() * 3600000)
      }
    },
    {
      id: 'poll_surface',
      type: 'surface',
      title: 'Poll Results Display',
      description: 'Public view of poll results and voting interface',
      component: PollSurface,
      permissions: {
        canView: ['member', 'leader', 'admin', 'guest'],
        canEdit: [],
        canInteract: ['member', 'leader', 'admin']
      },
      visibility: {
        showInToolGrid: false,
        showInPostBoard: true,
        requiresAuth: false
      },
      analytics: {
        views: Math.floor(Math.random() * 200) + 50,
        interactions: Math.floor(Math.random() * 100) + 20,
        lastUsed: new Date(Date.now() - Math.random() * 1800000)
      }
    }
  ], []);

  const activeInterface = toolInterfaces.find(iface => iface.type === 'interface');
  const activeSurface = toolInterfaces.find(iface => iface.type === 'surface');

  const handleViewChange = (view: 'interface' | 'surface' | 'both') => {
    setCurrentView(view);
    if (view !== 'both') {
      onToggleInterface?.(view === 'interface');
    }
  };

  const handleToolStateUpdate = (data: any) => {
    setToolState(prev => ({
      ...prev,
      interfaceData: { ...prev.interfaceData, ...data },
      lastActivity: new Date()
    }));
  };

  return (
    <div className={cn("space-y-6", className)}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <Zap className="w-6 h-6 text-amber-500" />
            {toolName}
          </h2>
          <p className="text-gray-600">{toolDescription}</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600">Status:</span>
            <HiveBadge className={
              toolState.isActive 
                ? "bg-green-100 text-green-800 border-green-200"
                : "bg-red-100 text-red-800 border-red-200"
            }>
              {toolState.isActive ? 'Active' : 'Inactive'}
            </HiveBadge>
          </div>
          
          <HiveButton
            variant="outline"
            onClick={onToggleActive}
          >
            {toolState.isActive ? <Pause className="w-4 h-4 mr-2" /> : <Play className="w-4 h-4 mr-2" />}
            {toolState.isActive ? 'Deactivate' : 'Activate'}
          </HiveButton>
        </div>
      </div>

      {/* Interface Toggle */}
      <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
        <div>
          <h3 className="font-semibold text-gray-900">Interface View</h3>
          <p className="text-sm text-gray-600">
            Switch between Interface (utility) and Surface (informational) views
          </p>
        </div>

        <div className="flex items-center bg-white rounded-lg p-1 shadow-sm">
          <HiveButton
            size="sm"
            variant={currentView === 'interface' ? 'primary' : 'ghost'}
            onClick={() => handleViewChange('interface')}
          >
            <Settings className="w-4 h-4 mr-1" />
            Interface
          </HiveButton>
          <HiveButton
            size="sm"
            variant={currentView === 'surface' ? 'primary' : 'ghost'}
            onClick={() => handleViewChange('surface')}
          >
            <Eye className="w-4 h-4 mr-1" />
            Surface
          </HiveButton>
          <HiveButton
            size="sm"
            variant={currentView === 'both' ? 'primary' : 'ghost'}
            onClick={() => handleViewChange('both')}
          >
            <Monitor className="w-4 h-4 mr-1" />
            Both
          </HiveButton>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <HiveCard className="p-4 text-center">
          <div className="text-2xl font-bold text-gray-900">{toolState.currentUsers}</div>
          <div className="text-sm text-gray-500">Active Users</div>
        </HiveCard>
        
        <HiveCard className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">{toolState.totalInteractions}</div>
          <div className="text-sm text-gray-500">Total Interactions</div>
        </HiveCard>
        
        <HiveCard className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">
            {activeInterface?.analytics.views || 0}
          </div>
          <div className="text-sm text-gray-500">Interface Views</div>
        </HiveCard>

        <HiveCard className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">
            {activeSurface?.analytics.views || 0}
          </div>
          <div className="text-sm text-gray-500">Surface Views</div>
        </HiveCard>
      </div>

      {/* Interface Configuration */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {toolInterfaces.map((iface) => (
          <InterfacePreviewCard
            key={iface.id}
            interface={iface}
            isActive={
              (currentView === 'both') ||
              (currentView === 'interface' && iface.type === 'interface') ||
              (currentView === 'surface' && iface.type === 'surface')
            }
            onToggle={() => {
              const newView = iface.type === 'interface' ? 'interface' : 'surface';
              handleViewChange(newView);
            }}
            onConfigure={() => {
              if (iface.type === 'interface') {
                onConfigureInterface?.();
              } else {
                onConfigureSurface?.();
              }
            }}
          />
        ))}
      </div>

      {/* Live Preview */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Live Preview</h3>
        
        <div className={cn(
          "grid gap-6",
          currentView === 'both' ? "lg:grid-cols-2" : "lg:grid-cols-1"
        )}>
          {(currentView === 'interface' || currentView === 'both') && activeInterface && (
            <HiveCard className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Settings className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">Interface View (Leaders/Builders)</h4>
                <HiveBadge className="bg-blue-100 text-blue-800 border-blue-200">
                  Utility Side
                </HiveBadge>
              </div>
              <PollInterface toolState={toolState.interfaceData} onUpdate={handleToolStateUpdate} />
            </HiveCard>
          )}

          {(currentView === 'surface' || currentView === 'both') && activeSurface && (
            <HiveCard className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <Eye className="w-5 h-5 text-green-600" />
                <h4 className="font-semibold text-gray-900">Surface View (Post Board)</h4>
                <HiveBadge className="bg-green-100 text-green-800 border-green-200">
                  Informational Side
                </HiveBadge>
              </div>
              <PollSurface toolState={toolState.interfaceData} />
            </HiveCard>
          )}
        </div>
      </div>

      {/* Usage Analytics */}
      <HiveCard className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Usage Analytics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-gray-900 mb-2">Interface vs Surface Usage</h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span>Interface Views</span>
                <span className="font-medium">{activeInterface?.analytics.views || 0}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '35%' }} />
              </div>
              
              <div className="flex items-center justify-between text-sm">
                <span>Surface Views</span>
                <span className="font-medium">{activeSurface?.analytics.views || 0}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '65%' }} />
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Interaction Timeline</h4>
            <div className="text-sm text-gray-600">
              <p>Last interface interaction: {Math.floor(Math.random() * 30) + 1}m ago</p>
              <p>Last surface interaction: {Math.floor(Math.random() * 10) + 1}m ago</p>
              <p>Peak usage: {Math.floor(Math.random() * 12) + 1}:00 PM</p>
            </div>
          </div>
        </div>
      </HiveCard>
    </div>
  );
}

export default ToolDualInterfaceSystem;