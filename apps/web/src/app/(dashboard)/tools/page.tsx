"use client";

import { useState, useEffect, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { CompleteHIVEToolsSystem } from "@hive/ui";
import { useSession } from "../../../hooks/use-session";
import { ErrorBoundary } from "../../../components/error-boundary";
import { 
  MessageSquare, 
  Timer, 
  Calculator, 
  BarChart3,
  Calendar,
  Car
} from "lucide-react";

// Type definition for fetch headers
type HeadersInit = Record<string, string>;

// Enhanced tools fetch with API integration
async function fetchMarketplaceTools(): Promise<any[]> {
  const headers: HeadersInit = {};
  try {
    const sessionJson = window.localStorage.getItem('hive_session');
    if (sessionJson) {
      const session = JSON.parse(sessionJson);
      headers.Authorization = `Bearer ${process.env.NODE_ENV === 'development' ? 'test-token' : session.token}`;
    } else {
      headers.Authorization = `Bearer test-token`;
    }
  } catch (error) {
    headers.Authorization = `Bearer test-token`;
  }

  const response = await fetch('/api/tools/browse', { headers });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch marketplace tools: ${response.status}`);
  }
  
  const data = await response.json();
  return data.tools || [];
}

async function fetchPersonalTools(): Promise<any[]> {
  const headers: HeadersInit = {};
  try {
    const sessionJson = window.localStorage.getItem('hive_session');
    if (sessionJson) {
      const session = JSON.parse(sessionJson);
      headers.Authorization = `Bearer ${process.env.NODE_ENV === 'development' ? 'test-token' : session.token}`;
    } else {
      headers.Authorization = `Bearer test-token`;
    }
  } catch (error) {
    headers.Authorization = `Bearer test-token`;
  }

  const response = await fetch('/api/tools/personal', { headers });
  
  if (!response.ok) {
    throw new Error(`Failed to fetch personal tools: ${response.status}`);
  }
  
  const data = await response.json();
  return data.tools || [];
}

// Import campus-specific templates and deployment system
import { CAMPUS_TOOL_TEMPLATES, getViralTemplates } from '../../../lib/campus-tools-templates';
import { TemplateDeploymentService, DEPLOYMENT_PRESETS } from '../../../lib/template-deployment';

// Convert campus templates to marketplace format
const CAMPUS_MARKETPLACE_TOOLS = CAMPUS_TOOL_TEMPLATES.map(template => ({
  id: template.id,
  name: template.name,
  description: template.description,
  category: template.category,
  type: 'template' as const,
  icon: template.category === 'academic' ? Calculator : 
        template.category === 'social' ? MessageSquare :
        template.category === 'events' ? Calendar :
        template.category === 'services' ? Car :
        BarChart3,
  color: template.category === 'academic' ? '#10B981' :
         template.category === 'social' ? '#3B82F6' :
         template.category === 'events' ? '#F59E0B' :
         template.category === 'services' ? '#8B5CF6' :
         '#6B7280',
  downloads: template.viralPotential === 'very-high' ? 450 :
             template.viralPotential === 'high' ? 250 :
             100,
  rating: template.viralPotential === 'very-high' ? 4.8 : 
          template.viralPotential === 'high' ? 4.6 : 4.4,
  ratingCount: template.viralPotential === 'very-high' ? 65 :
               template.viralPotential === 'high' ? 45 : 35,
  creator: 'UB Students',
  creatorType: 'community' as const,
  tags: [template.category, 'campus', 'ub'],
  version: '1.0.0',
  lastUpdated: new Date(),
  isFeatured: template.viralPotential === 'very-high',
  isVerified: true,
  isInstalled: false,
  isPremium: false,
  supportedPlatforms: ['web', 'mobile'] as const,
  requiredPermissions: ['spaces.read', 'spaces.write'],
  viralPotential: template.viralPotential,
  ubSpecific: template.ubSpecific
}));

// Legacy marketplace tools for comparison
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
    color: 'var(--hive-brand-secondary)',
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
  const [isClient, setIsClient] = useState(false);
  const [activeTab, setActiveTab] = useState<'marketplace' | 'personal' | 'hivelab'>('marketplace');
   
  const { user: _user } = useSession();

  // Temporarily using default flags while fixing React context issue
  const flags = useMemo(() => ({
    trackEvent: (_feature: string, _action: string, _metadata?: any) => {
      
    }
  }), []);

  useEffect(() => {
    setIsClient(true);
    // Track page view
    flags.trackEvent('tools', 'view', { page: 'tools-marketplace' });
  }, [flags]);

  const { data: marketplaceTools, isLoading: marketplaceLoading, error: marketplaceError } = useQuery({
    queryKey: ["marketplace-tools"],
    queryFn: fetchMarketplaceTools,
    staleTime: 300000, // 5 minutes
    enabled: isClient && activeTab === 'marketplace'
  });

  const { data: personalTools, isLoading: personalLoading, error: personalError } = useQuery({
    queryKey: ["personal-tools"],
    queryFn: fetchPersonalTools,
    staleTime: 300000, // 5 minutes
    enabled: isClient && activeTab === 'personal'
  });

  const isLoading = marketplaceLoading || personalLoading;
  const error = marketplaceError || personalError;

  const handleTabChange = (tab: 'marketplace' | 'personal' | 'hivelab') => {
    setActiveTab(tab);
    flags.trackEvent('tools', 'tab_change', { tab });
  };

  const handleToolInstall = async (toolId: string) => {
    try {
      const tool = [...CAMPUS_MARKETPLACE_TOOLS, ...MARKETPLACE_TOOLS].find(t => t.id === toolId);
      if (!tool) {
        throw new Error('Tool not found');
      }

      // Check if this is a campus template
      const isCampusTemplate = CAMPUS_TOOL_TEMPLATES.some(t => t.id === toolId);
      
      if (isCampusTemplate) {
        // Deploy campus template as working tool
        const deploymentRequest = {
          templateId: toolId,
          userId: _user?.id || 'anonymous',
          socialSettings: DEPLOYMENT_PRESETS.space_shared // Default to viral sharing
        };

        const deployedTool = await TemplateDeploymentService.deployTemplate(deploymentRequest);
        
        flags.trackEvent('tools', 'template_deploy', { 
          toolId, 
          templateId: deployedTool.templateId,
          viralPotential: tool.viralPotential 
        });
        
        // Show success with link to use the tool
        const message = `${tool.name} created and ready to use! 🎉\n\nShare with friends to get the most value.`;
        alert(message);
        
        // Navigate to the deployed tool
        window.location.href = `/tools/${deployedTool.id}/run`;
        
      } else {
        // Legacy tool installation
        const sessionData = window.localStorage.getItem('hive_session');
        const authToken = sessionData ? 'session-token' : 'test-token';
        
        const response = await fetch('/api/tools/install', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`,
          },
          body: JSON.stringify({ toolId }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.message || `Installation failed (${response.status})`);
        }

        flags.trackEvent('tools', 'install', { toolId });
        alert(`${tool.name} installed successfully!`);
      }
      
    } catch (error) {
      console.error('Failed to install tool:', error);
      const errorMessage = error instanceof Error ? error.message : 'Failed to install tool';
      alert(`Installation failed: ${errorMessage}`);
    }
  };

  const handleToolPreview = (toolId: string) => {
    flags.trackEvent('tools', 'preview', { toolId });
    // Navigate to tool preview page
    window.location.href = `/tools/${toolId}/preview`;
  };

  const handleToolAction = (toolId: string, action: string) => {
    flags.trackEvent('tools', 'action', { toolId, action });
    
    switch (action) {
      case 'edit':
        window.location.href = `/tools/${toolId}/edit`;
        break;
      case 'run':
        window.location.href = `/tools/${toolId}/run`;
        break;
      case 'settings':
        window.location.href = `/tools/${toolId}/settings`;
        break;
      case 'share': {
        navigator.clipboard.writeText(`${window.location.origin}/tools/${toolId}`);
        alert('Tool link copied to clipboard!');
        break;
      }
      default:
        
    }
  };

  const handleCreateTool = (mode: 'visual' | 'template' | 'wizard' = 'visual') => {
    flags.trackEvent('tools', 'create_start', { mode });
    // Navigate to HiveLab with mode parameter
    window.location.href = `/hivelab?mode=${mode}`;
  };

  return (
    <ErrorBoundary>
      <CompleteHIVEToolsSystem
        userId={_user?.id || 'anonymous'}
        userProfile={{
          name: _user?.displayName || 'Student',
          handle: _user?.email?.split('@')[0] || 'student',
          avatar: _user?.photoURL,
          builderLevel: 'novice'
        }}
        initialTab={activeTab}
        onToolInstall={handleToolInstall}
        onToolCreate={(tool: any) => {
          flags.trackEvent('tools', 'created', { toolId: tool.id });
        }}
        onToolDeploy={(toolId, spaceId) => {
          flags.trackEvent('tools', 'deployed', { toolId, spaceId });
        }}
      />
    </ErrorBoundary>
  );
}