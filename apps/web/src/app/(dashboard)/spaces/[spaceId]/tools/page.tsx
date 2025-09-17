"use client";

import { useState, useEffect } from "react";
import { Button, Card, Badge, Modal } from "@hive/ui";
import { PageContainer } from "@hive/ui";
import { 
  Zap, 
  Plus, 
  Search, 
  Filter, 
  Star, 
  Users, 
  Activity, 
  Settings, 
  ExternalLink,
  Play,
  Pause,
  BarChart3,
  Clock,
  ArrowLeft,
  Eye,
  EyeOff,
  Trash2
} from "lucide-react";
import { ErrorBoundary } from "../../../../../components/error-boundary";
import { useRouter as _useRouter } from "next/navigation";

interface SpaceToolsPageProps {
  params: Promise<{
    spaceId: string;
  }>;
}

interface SpaceTool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'productivity' | 'collaboration' | 'communication' | 'organization' | 'engagement' | 'academic';
  type: 'built-in' | 'custom' | 'external';
  isActive: boolean;
  permissions: {
    view: string[];
    use: string[];
    manage: string[];
  };
  usage: {
    totalSessions: number;
    activeUsers: number;
    lastUsed: string;
    averageSessionTime: number;
  };
  settings: {
    autoLaunch: boolean;
    requirePermission: boolean;
    maxConcurrentUsers?: number;
    customConfig?: Record<string, unknown>;
  };
  integrations: string[];
  createdBy?: string;
  createdAt: string;
  updatedAt: string;
}

interface ToolTemplate {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  features: string[];
  popularity: number;
  difficulty: 'easy' | 'medium' | 'hard';
}

export default function SpaceToolsPage({ params }: SpaceToolsPageProps) {
  const [spaceId, setSpaceId] = useState<string>('');
  const [tools, setTools] = useState<SpaceTool[]>([]);
  const [showAddTool, setShowAddTool] = useState(false);
  const [showToolSettings, setShowToolSettings] = useState<SpaceTool | null>(null);
  const [categoryFilter, setCategoryFilter] = useState<'all' | SpaceTool['category']>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [spaceName, setSpaceName] = useState('');
  const [userRole, setUserRole] = useState<'admin' | 'moderator' | 'member'>('member');
  const [availableTemplates, setAvailableTemplates] = useState<ToolTemplate[]>([]);

  useEffect(() => {
    // Resolve params Promise
    const resolveParams = async () => {
      const resolvedParams = await params;
      setSpaceId(resolvedParams.spaceId);
    };
    resolveParams();
  }, [params]);

  useEffect(() => {
    if (!spaceId) return;
    const fetchData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setSpaceName('CS Study Group');
      setUserRole('admin');
      
      const mockTools: SpaceTool[] = [
        {
          id: '1',
          name: 'Study Timer',
          description: 'Synchronized focus sessions for group study with Pomodoro technique',
          icon: '⏱️',
          category: 'productivity',
          type: 'built-in',
          isActive: true,
          permissions: {
            view: ['all'],
            use: ['member', 'moderator', 'admin'],
            manage: ['admin']
          },
          usage: {
            totalSessions: 127,
            activeUsers: 8,
            lastUsed: '2024-02-01T14:30:00Z',
            averageSessionTime: 45
          },
          settings: {
            autoLaunch: false,
            requirePermission: false,
            maxConcurrentUsers: 25,
            customConfig: { defaultDuration: 25, breakDuration: 5 }
          },
          integrations: ['calendar', 'notifications'],
          createdAt: '2024-01-15T10:00:00Z',
          updatedAt: '2024-01-28T16:20:00Z'
        },
        {
          id: '2',
          name: 'Collaborative Whiteboard',
          description: 'Real-time drawing and brainstorming space for visual collaboration',
          icon: '📝',
          category: 'collaboration',
          type: 'built-in',
          isActive: true,
          permissions: {
            view: ['member', 'moderator', 'admin'],
            use: ['member', 'moderator', 'admin'],
            manage: ['moderator', 'admin']
          },
          usage: {
            totalSessions: 89,
            activeUsers: 5,
            lastUsed: '2024-02-01T11:15:00Z',
            averageSessionTime: 32
          },
          settings: {
            autoLaunch: false,
            requirePermission: true,
            maxConcurrentUsers: 15
          },
          integrations: ['file-share', 'export'],
          createdAt: '2024-01-16T14:00:00Z',
          updatedAt: '2024-01-30T09:45:00Z'
        },
        {
          id: '3',
          name: 'Live Polls',
          description: 'Real-time polling and voting for group decisions and feedback',
          icon: '📊',
          category: 'engagement',
          type: 'built-in',
          isActive: true,
          permissions: {
            view: ['all'],
            use: ['member', 'moderator', 'admin'],
            manage: ['moderator', 'admin']
          },
          usage: {
            totalSessions: 56,
            activeUsers: 12,
            lastUsed: '2024-01-31T18:20:00Z',
            averageSessionTime: 15
          },
          settings: {
            autoLaunch: false,
            requirePermission: false,
            customConfig: { allowAnonymous: true, showLiveResults: true }
          },
          integrations: ['analytics', 'export'],
          createdAt: '2024-01-18T11:30:00Z',
          updatedAt: '2024-01-31T20:10:00Z'
        },
        {
          id: '4',
          name: 'Code Review Helper',
          description: 'Custom tool for reviewing and discussing code submissions',
          icon: '💻',
          category: 'academic',
          type: 'custom',
          isActive: false,
          permissions: {
            view: ['member', 'moderator', 'admin'],
            use: ['member', 'moderator', 'admin'],
            manage: ['admin']
          },
          usage: {
            totalSessions: 23,
            activeUsers: 0,
            lastUsed: '2024-01-25T13:45:00Z',
            averageSessionTime: 28
          },
          settings: {
            autoLaunch: false,
            requirePermission: true,
            customConfig: { supportedLanguages: ['javascript', 'python', 'java'], maxFileSize: '10MB' }
          },
          integrations: ['github', 'file-share'],
          createdBy: 'admin-1',
          createdAt: '2024-01-20T15:00:00Z',
          updatedAt: '2024-01-25T13:50:00Z'
        }
      ];

      const mockTemplates: ToolTemplate[] = [
        {
          id: 'template-1',
          name: 'Flash Cards',
          description: 'Digital flashcards for memorization and quick review',
          icon: '🃏',
          category: 'academic',
          features: ['Spaced repetition', 'Progress tracking', 'Shared decks', 'Import/Export'],
          popularity: 85,
          difficulty: 'easy'
        },
        {
          id: 'template-2',
          name: 'Group Chat',
          description: 'Dedicated chat room for space members',
          icon: '💬',
          category: 'communication',
          features: ['Real-time messaging', 'File sharing', 'Mentions', 'Message history'],
          popularity: 92,
          difficulty: 'easy'
        },
        {
          id: 'template-3',
          name: 'Task Board',
          description: 'Kanban-style task management for group projects',
          icon: '📋',
          category: 'organization',
          features: ['Drag & drop', 'Due dates', 'Assignments', 'Progress tracking'],
          popularity: 78,
          difficulty: 'medium'
        },
        {
          id: 'template-4',
          name: 'Attendance Tracker',
          description: 'Track event and meeting attendance',
          icon: '✅',
          category: 'organization',
          features: ['QR codes', 'Location verification', 'Reports', 'Certificates'],
          popularity: 67,
          difficulty: 'medium'
        }
      ];

      setTools(mockTools);
      setAvailableTemplates(mockTemplates);
      setIsLoading(false);
    };

    fetchData();
  }, [spaceId]);

  const filteredTools = tools.filter(tool => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tool.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || tool.category === categoryFilter;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && tool.isActive) ||
                         (statusFilter === 'inactive' && !tool.isActive);
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffMs = now.getTime() - date.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return `${Math.floor(diffDays / 7)}w ago`;
  };

  const getCategoryColor = (category: SpaceTool['category']) => {
    switch (category) {
      case 'productivity': return 'bg-blue-500';
      case 'collaboration': return 'bg-green-500';
      case 'communication': return 'bg-[var(--hive-gold)]';
      case 'organization': return 'bg-[var(--hive-gold)]';
      case 'engagement': return 'bg-pink-500';
      case 'academic': return 'bg-indigo-500';
      default: return 'bg-gray-500';
    }
  };

  const handleToolToggle = (toolId: string) => {
    setTools(prev => prev.map(tool => 
      tool.id === toolId ? { ...tool, isActive: !tool.isActive } : tool
    ));
  };

  const handleAddTool = (templateId: string) => {
    const template = availableTemplates.find(t => t.id === templateId);
    if (!template) return;

    const newTool: SpaceTool = {
      id: `tool-${Date.now()}`,
      name: template.name,
      description: template.description,
      icon: template.icon,
      category: template.category as SpaceTool['category'],
      type: 'built-in',
      isActive: true,
      permissions: {
        view: ['all'],
        use: ['member', 'moderator', 'admin'],
        manage: ['admin']
      },
      usage: {
        totalSessions: 0,
        activeUsers: 0,
        lastUsed: new Date().toISOString(),
        averageSessionTime: 0
      },
      settings: {
        autoLaunch: false,
        requirePermission: false
      },
      integrations: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    setTools(prev => [newTool, ...prev]);
    setShowAddTool(false);
  };

  const handleRemoveTool = (toolId: string) => {
    setTools(prev => prev.filter(tool => tool.id !== toolId));
  };

  if (isLoading) {
    return (
      <PageContainer>
        <div className="flex items-center justify-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 bg-hive-gold rounded-lg animate-pulse mx-auto mb-4" />
            <p className="text-[var(--hive-text-inverse)]">Loading tools...</p>
          </div>
        </div>
      </PageContainer>
    );
  }

  const activeTools = tools.filter(t => t.isActive).length;
  const totalSessions = tools.reduce((sum, t) => sum + t.usage.totalSessions, 0);
  const totalActiveUsers = tools.reduce((sum, t) => sum + t.usage.activeUsers, 0);

  return (
    <ErrorBoundary>
      <PageContainer
        title="Tools"
        subtitle={`${spaceName} • ${activeTools} active tools`}
        breadcrumbs={[
          { 
            label: "Spaces", 
            href: "/spaces",
            icon: <ArrowLeft className="h-4 w-4" />
          },
          { 
            label: spaceName, 
            href: `/spaces/${spaceId}`
          },
          { 
            label: "Tools", 
            icon: <Zap />
          }
        ]}
        actions={
          <div className="flex items-center space-x-3">
            <Button variant="outline" size="sm">
              <BarChart3 className="h-4 w-4 mr-2" />
              Analytics
            </Button>
            
            {(userRole === 'admin' || userRole === 'moderator') && (
              <Button 
                onClick={() => setShowAddTool(true)}
                className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Tool
              </Button>
            )}
          </div>
        }
       
      >
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-zinc-800/50 border-zinc-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-[var(--hive-text-inverse)]">{tools.length}</div>
                <div className="text-sm text-zinc-400">Total Tools</div>
              </div>
              <Zap className="h-8 w-8 text-blue-400" />
            </div>
          </Card>
          
          <Card className="p-4 bg-zinc-800/50 border-zinc-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-[var(--hive-text-inverse)]">{activeTools}</div>
                <div className="text-sm text-zinc-400">Active Tools</div>
              </div>
              <Play className="h-8 w-8 text-green-400" />
            </div>
          </Card>
          
          <Card className="p-4 bg-zinc-800/50 border-zinc-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-[var(--hive-text-inverse)]">{totalSessions}</div>
                <div className="text-sm text-zinc-400">Total Sessions</div>
              </div>
              <Activity className="h-8 w-8 text-[var(--hive-gold)]" />
            </div>
          </Card>
          
          <Card className="p-4 bg-zinc-800/50 border-zinc-700">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-[var(--hive-text-inverse)]">{totalActiveUsers}</div>
                <div className="text-sm text-zinc-400">Active Users</div>
              </div>
              <Users className="h-8 w-8 text-[var(--hive-gold)]" />
            </div>
          </Card>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 mb-6">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e: any) => setSearchQuery(e.target.value)}
                placeholder="Search tools..."
                className="pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-[var(--hive-text-inverse)] placeholder-zinc-400 focus:border-hive-gold focus:outline-none w-64"
              />
            </div>
            
            <select
              value={categoryFilter}
              onChange={(e: any) => setCategoryFilter(e.target.value as 'all' | 'academic' | 'engagement' | 'productivity' | 'communication' | 'collaboration' | 'organization')}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-[var(--hive-text-inverse)] text-sm focus:border-hive-gold focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="productivity">Productivity</option>
              <option value="collaboration">Collaboration</option>
              <option value="communication">Communication</option>
              <option value="organization">Organization</option>
              <option value="engagement">Engagement</option>
              <option value="academic">Academic</option>
            </select>
            
            <select
              value={statusFilter}
              onChange={(e: any) => setStatusFilter(e.target.value as 'all' | 'active' | 'inactive')}
              className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-[var(--hive-text-inverse)] text-sm focus:border-hive-gold focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-zinc-400">
            <Filter className="h-4 w-4" />
            <span>{filteredTools.length} tools shown</span>
          </div>
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTools.map((tool: any) => (
            <Card 
              key={tool.id} 
              className={`p-6 border transition-all duration-200 ${
                tool.isActive 
                  ? 'bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/70' 
                  : 'bg-zinc-800/30 border-zinc-800 opacity-75'
              }`}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className={`w-12 h-12 ${getCategoryColor(tool.category)} rounded-lg flex items-center justify-center text-2xl`}>
                    {tool.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-1">
                      <h3 className="font-semibold text-[var(--hive-text-inverse)]">{tool.name}</h3>
                      <Badge 
                        variant={tool.type === 'built-in' ? 'skill-tag' : tool.type === 'custom' ? 'building-tools' : 'destructive'} 
                        className="text-xs"
                      >
                        {tool.type}
                      </Badge>
                    </div>
                    <p className="text-sm text-zinc-400 mb-2 line-clamp-2">{tool.description}</p>
                    <Badge variant="skill-tag" className="text-xs capitalize">
                      {tool.category}
                    </Badge>
                  </div>
                </div>
                
                <div className="flex items-center space-x-1">
                  {tool.isActive ? (
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  ) : (
                    <div className="w-2 h-2 bg-zinc-500 rounded-full"></div>
                  )}
                </div>
              </div>

              {/* Usage Stats */}
              <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                <div>
                  <div className="text-[var(--hive-text-inverse)] font-medium">{tool.usage.totalSessions}</div>
                  <div className="text-zinc-500">Sessions</div>
                </div>
                <div>
                  <div className="text-[var(--hive-text-inverse)] font-medium">{tool.usage.activeUsers}</div>
                  <div className="text-zinc-500">Active Users</div>
                </div>
              </div>

              {/* Last Used */}
              <div className="flex items-center space-x-2 text-xs text-zinc-500 mb-4">
                <Clock className="h-3 w-3" />
                <span>Last used {formatTimeAgo(tool.usage.lastUsed)}</span>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-zinc-700">
                <div className="flex items-center space-x-2">
                  {tool.isActive ? (
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-green-400 border-green-500/30 hover:bg-green-500/10"
                    >
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Launch
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      disabled
                      className="text-zinc-500"
                    >
                      <Pause className="h-4 w-4 mr-1" />
                      Inactive
                    </Button>
                  )}
                </div>
                
                {(userRole === 'admin' || userRole === 'moderator') && (
                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToolToggle(tool.id)}
                      className="text-zinc-400 hover:text-[var(--hive-text-inverse)]"
                    >
                      {tool.isActive ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </Button>
                    
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowToolSettings(tool)}
                      className="text-zinc-400 hover:text-[var(--hive-text-inverse)]"
                    >
                      <Settings className="h-4 w-4" />
                    </Button>
                    
                    {tool.type === 'custom' && userRole === 'admin' && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRemoveTool(tool.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredTools.length === 0 && (
          <div className="text-center py-12">
            <Zap className="h-16 w-16 text-zinc-600 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-[var(--hive-text-inverse)] mb-2">No tools found</h3>
            <p className="text-zinc-400 mb-6">
              {searchQuery || categoryFilter !== 'all' || statusFilter !== 'all'
                ? 'Try adjusting your search or filters.'
                : 'Add some tools to help your space coordinate and collaborate effectively.'
              }
            </p>
            {(userRole === 'admin' || userRole === 'moderator') && (
              <Button 
                onClick={() => setShowAddTool(true)}
                className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Your First Tool
              </Button>
            )}
          </div>
        )}

        {/* Add Tool Modal */}
        <Modal
          isOpen={showAddTool}
          onClose={() => setShowAddTool(false)}
          title="Add Tool to Space"
          size="lg"
        >
          <div className="space-y-6">
            <div className="text-center">
              <p className="text-zinc-400">Choose from our library of productivity and collaboration tools</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {availableTemplates.map((template: any) => (
                <Card 
                  key={template.id} 
                  className="p-4 bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/70 transition-colors cursor-pointer"
                  onClick={() => handleAddTool(template.id)}
                >
                  <div className="flex items-start space-x-3 mb-3">
                    <div className="text-2xl">{template.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-medium text-[var(--hive-text-inverse)]">{template.name}</h4>
                        <Badge 
                          variant={template.difficulty === 'easy' ? 'building-tools' : template.difficulty === 'medium' ? 'skill-tag' : 'destructive'} 
                          className="text-xs"
                        >
                          {template.difficulty}
                        </Badge>
                      </div>
                      <p className="text-sm text-zinc-400 mb-2">{template.description}</p>
                      <div className="flex items-center space-x-2">
                        <Star className="h-3 w-3 text-hive-gold fill-current" />
                        <span className="text-xs text-zinc-500">{template.popularity}% popularity</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-1">
                    {template.features.slice(0, 3).map((feature: any) => (
                      <span key={feature} className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                    {template.features.length > 3 && (
                      <span className="text-xs text-zinc-500">+{template.features.length - 3} more</span>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </Modal>

        {/* Tool Settings Modal */}
        <Modal
          isOpen={!!showToolSettings}
          onClose={() => setShowToolSettings(null)}
          title={showToolSettings ? `${showToolSettings.name} Settings` : ''}
          size="lg"
        >
          {showToolSettings && (
            <div className="space-y-6">
              {/* Basic Settings */}
              <div>
                <h4 className="font-medium text-[var(--hive-text-inverse)] mb-3">Basic Settings</h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-[var(--hive-text-inverse)]">Tool Status</div>
                      <div className="text-sm text-zinc-400">Enable or disable this tool for space members</div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleToolToggle(showToolSettings.id)}
                      className={showToolSettings.isActive ? 'text-green-400 border-green-500/30' : 'text-zinc-500'}
                    >
                      {showToolSettings.isActive ? 'Active' : 'Inactive'}
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-[var(--hive-text-inverse)]">Auto Launch</div>
                      <div className="text-sm text-zinc-400">Automatically start tool in events</div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={showToolSettings.settings.autoLaunch}
                      className="rounded"
                      readOnly
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-medium text-[var(--hive-text-inverse)]">Require Permission</div>
                      <div className="text-sm text-zinc-400">Members need approval to use this tool</div>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={showToolSettings.settings.requirePermission}
                      className="rounded"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Usage Stats */}
              <div>
                <h4 className="font-medium text-[var(--hive-text-inverse)] mb-3">Usage Statistics</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 bg-zinc-800/50 rounded-lg">
                    <div className="text-xl font-bold text-[var(--hive-text-inverse)]">{showToolSettings.usage.totalSessions}</div>
                    <div className="text-sm text-zinc-400">Total Sessions</div>
                  </div>
                  <div className="p-3 bg-zinc-800/50 rounded-lg">
                    <div className="text-xl font-bold text-[var(--hive-text-inverse)]">{showToolSettings.usage.averageSessionTime}m</div>
                    <div className="text-sm text-zinc-400">Avg Session</div>
                  </div>
                </div>
              </div>

              {/* Permissions */}
              <div>
                <h4 className="font-medium text-[var(--hive-text-inverse)] mb-3">Permissions</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Can View:</span>
                    <span className="text-[var(--hive-text-inverse)]">{showToolSettings.permissions.view.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Can Use:</span>
                    <span className="text-[var(--hive-text-inverse)]">{showToolSettings.permissions.use.join(', ')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-400">Can Manage:</span>
                    <span className="text-[var(--hive-text-inverse)]">{showToolSettings.permissions.manage.join(', ')}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </PageContainer>
    </ErrorBoundary>
  );
}