"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { ToolMarketplace } from "@hive/ui";
import { useFeatureFlags } from "@hive/hooks";
import { useAuth } from "@/hooks/use-auth";
import { ToolNavigation } from "@/lib/tool-navigation";
import { 
  MessageSquare, 
  Timer, 
  Calculator, 
  Palette, 
  Users, 
  Calendar, 
  Map, 
  Camera,
  BarChart3,
  QrCode,
  Award,
  Clock
} from "lucide-react";

// Convert to marketplace tool format
const MARKETPLACE_TOOLS = [
  {
    id: 'poll-maker',
    name: 'Poll Maker',
    description: 'Create interactive polls for spaces and events',
    category: 'social' as const,
    type: 'individual' as const,
    icon: MessageSquare,
    color: '#3B82F6',
    downloads: 1247,
    rating: 4.8,
    ratingCount: 89,
    creator: 'HIVE Team',
    creatorType: 'hive_team' as const,
    tags: ['polling', 'engagement', 'voting'],
    version: '2.1.0',
    lastUpdated: new Date('2024-01-15'),
    isFeatured: true,
    isVerified: true,
    isInstalled: true,
    isPremium: false,
    supportedPlatforms: ['web', 'mobile'] as const,
    requiredPermissions: ['spaces.read', 'spaces.write']
  },
  {
    id: 'study-timer',
    name: 'Study Timer',
    description: 'Pomodoro-style timer with focus tracking',
    category: 'productivity' as const,
    type: 'individual' as const,
    icon: Timer,
    color: '#FFD700',
    downloads: 892,
    rating: 4.6,
    ratingCount: 67,
    creator: 'Focus Labs',
    creatorType: 'organization' as const,
    tags: ['timer', 'productivity', 'study'],
    version: '1.5.2',
    lastUpdated: new Date('2024-01-10'),
    isFeatured: true,
    isVerified: true,
    isInstalled: false,
    isPremium: false,
    supportedPlatforms: ['web', 'mobile', 'desktop'] as const,
    requiredPermissions: ['notifications']
  },
  {
    id: 'grade-calculator',
    name: 'Grade Calculator',
    description: 'Calculate GPA and track academic progress',
    category: 'academic' as const,
    type: 'individual' as const,
    icon: Calculator,
    color: '#F59E0B',
    downloads: 2156,
    rating: 4.9,
    ratingCount: 234,
    creator: 'Academic Tools',
    creatorType: 'student' as const,
    tags: ['grades', 'gpa', 'academic'],
    version: '3.0.1',
    lastUpdated: new Date('2024-01-08'),
    isFeatured: false,
    isVerified: true,
    isInstalled: true,
    isPremium: false,
    supportedPlatforms: ['web', 'mobile'] as const,
    requiredPermissions: ['profile.read']
  },
  {
    id: 'analytics-dashboard',
    name: 'Analytics Dashboard',
    description: 'Track and visualize your space engagement',
    category: 'productivity' as const,
    type: 'individual' as const,
    icon: BarChart3,
    color: '#10B981',
    downloads: 543,
    rating: 4.7,
    ratingCount: 45,
    creator: 'HIVE Team',
    creatorType: 'hive_team' as const,
    tags: ['analytics', 'dashboard', 'metrics'],
    version: '1.2.0',
    lastUpdated: new Date('2024-01-12'),
    isFeatured: true,
    isVerified: true,
    isInstalled: false,
    isPremium: true,
    supportedPlatforms: ['web'] as const,
    requiredPermissions: ['analytics.read', 'spaces.read']
  }
];

// Unified Tools Section per @hive.md: Marketplace, Personal Tools, and HiveLab
export default function ToolsPage() {
  const [activeTab, setActiveTab] = useState<'marketplace' | 'personal' | 'hivelab'>('marketplace');
  const flags = useFeatureFlags();
  const { getAuthToken } = useAuth();

  const handleToolInstall = async (toolId: string) => {
    try {
      const authToken = await getAuthToken();
      const response = await fetch('/api/tools/install', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        },
        body: JSON.stringify({ toolId }),
      });

      if (!response.ok) {
        throw new Error('Failed to install tool');
      }

      flags.trackEvent('tools', 'install', { toolId });
      
      // Refresh the page to show updated install status
      window.location.reload();
    } catch (error) {
      console.error('Failed to install tool:', error);
      alert('Failed to install tool. Please try again.');
    }
  };

  const handleToolPreview = (toolId: string) => {
    flags.trackEvent('tools', 'preview', { toolId });
    ToolNavigation.toPreview(toolId, true);
  };

  const handleToolAction = (toolId: string, action: string) => {
    flags.trackEvent('tools', 'action', { toolId, action });
    
    switch (action) {
      case 'edit':
        ToolNavigation.editTool(toolId);
        break;
      case 'duplicate':
        ToolNavigation.duplicateTool(toolId);
        break;
      case 'share':
        const tool = MARKETPLACE_TOOLS.find(t => t.id === toolId);
        ToolNavigation.shareTool(toolId, tool?.name || 'Tool').then(success => {
          if (success) {
            alert('Tool link copied to clipboard!');
          } else {
            alert('Failed to share tool');
          }
        });
        break;
      case 'deploy':
        ToolNavigation.toDeploy(toolId);
        break;
      default:
        console.log('Unknown action:', action);
    }
  };

  useEffect(() => {
    flags.trackEvent('tools', 'view', { page: 'tools-marketplace' });
  }, [flags]);

  const handleCreateTool = (mode: 'visual' | 'template' | 'wizard' = 'visual') => {
    flags.trackEvent('tools', 'create_start', { mode });
    ToolNavigation.toBuild({ mode });
  };

  return (
    <div className="min-h-screen">
      {/* Header with Unified Tools Navigation */}
      <div className="bg-[var(--hive-background-primary)] border-b border-[var(--hive-border-primary)] px-6 py-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-[var(--hive-text-primary)]">
                Tools
              </h1>
              <p className="text-[var(--hive-text-secondary)] mt-1">
                Solutions & building - marketplace, personal tools, and HiveLab
              </p>
            </div>
            
            <div className="flex items-center gap-3">
              <button
                onClick={() => handleCreateTool('template')}
                className="px-4 py-2 text-sm border border-[var(--hive-border-primary)] rounded-lg hover:bg-[var(--hive-background-secondary)] transition-colors text-[var(--hive-text-secondary)]"
              >
                Use Template
              </button>
              <button
                onClick={() => handleCreateTool('wizard')}
                className="px-4 py-2 text-sm border border-[var(--hive-border-primary)] rounded-lg hover:bg-[var(--hive-background-secondary)] transition-colors text-[var(--hive-text-secondary)]"
              >
                Quick Builder
              </button>
              <button
                onClick={() => handleCreateTool('visual')}
                className="px-6 py-2 bg-[#FFD700] text-[#0A0A0A] rounded-lg hover:bg-[#FFE255] transition-colors font-medium flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Tool
              </button>
            </div>
          </div>
          
          {/* Three-Tier Tool Architecture Navigation */}
          <div className="flex items-center bg-[var(--hive-background-secondary)] rounded-lg p-1">
            <button
              onClick={() => setActiveTab('marketplace')}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'marketplace'
                  ? 'bg-[#FFD700] text-[#0A0A0A] font-medium'
                  : 'text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]'
              }`}
            >
              Marketplace
            </button>
            <button
              onClick={() => setActiveTab('personal')}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'personal'
                  ? 'bg-[#FFD700] text-[#0A0A0A] font-medium'
                  : 'text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]'
              }`}
            >
              Personal Tools
            </button>
            <button
              onClick={() => setActiveTab('hivelab')}
              className={`px-4 py-2 text-sm rounded-md transition-colors ${
                activeTab === 'hivelab'
                  ? 'bg-[#FFD700] text-[#0A0A0A] font-medium'
                  : 'text-[var(--hive-text-secondary)] hover:text-[var(--hive-text-primary)]'
              }`}
            >
              HiveLab
            </button>
          </div>
        </div>
      </div>

      {/* Tab Content */}
      {activeTab === 'marketplace' && (
        <ToolMarketplace
          tools={MARKETPLACE_TOOLS}
          onToolInstall={handleToolInstall}
          onToolPreview={handleToolPreview}
          onToolAction={handleToolAction}
          className="h-full"
        />
      )}
      
      {activeTab === 'personal' && (
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
                Personal Tools
              </h2>
              <p className="text-[var(--hive-text-secondary)] mb-6">
                Your installed tools and personal productivity suite
              </p>
              <button
                onClick={() => setActiveTab('marketplace')}
                className="px-6 py-2 bg-[#FFD700] text-[#0A0A0A] rounded-lg hover:bg-[#FFE255] transition-colors font-medium"
              >
                Browse Marketplace
              </button>
            </div>
          </div>
        </div>
      )}
      
      {activeTab === 'hivelab' && (
        <div className="p-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center py-12">
              <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
                HiveLab
              </h2>
              <p className="text-[var(--hive-text-secondary)] mb-6">
                Build and deploy custom campus tools with visual creation interface
              </p>
              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={() => handleCreateTool('visual')}
                  className="px-6 py-2 bg-[#FFD700] text-[#0A0A0A] rounded-lg hover:bg-[#FFE255] transition-colors font-medium"
                >
                  Start Building
                </button>
                <button
                  onClick={() => handleCreateTool('template')}
                  className="px-6 py-2 border border-[var(--hive-border-primary)] rounded-lg hover:bg-[var(--hive-background-secondary)] transition-colors text-[var(--hive-text-secondary)]"
                >
                  Use Template
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}