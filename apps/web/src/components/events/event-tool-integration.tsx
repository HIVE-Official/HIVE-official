"use client";

import { useState, useEffect } from "react";
import { Button, Card, Badge, HiveModal } from "@hive/ui";
import { 
  Zap, 
  Play, 
  Users, 
  Settings,
  ExternalLink,
  Activity,
  Clock
} from "lucide-react";

interface EventToolIntegrationProps {
  eventId: string;
  availableTools: string[];
  isEventActive: boolean;
  userRole: 'organizer' | 'attendee' | 'viewer';
  onToolLaunch: (_toolId: string, _config?: any) => void;
}

interface ToolSession {
  id: string;
  toolId: string;
  name: string;
  status: 'active' | 'paused' | 'ended';
  participants: number;
  startedAt: string;
  lastActivity: string;
  data?: any;
}

const TOOL_DEFINITIONS = {
  'study-timer': {
    name: 'Study Timer',
    icon: '⏱️',
    description: 'Synchronized focus sessions for group study',
    category: 'productivity',
    supportsGroups: true,
    requiresSetup: true,
    features: ['Pomodoro cycles', 'Break reminders', 'Group sync', 'Analytics']
  },
  'poll-maker': {
    name: 'Live Polls',
    icon: '📊',
    description: 'Real-time polling and voting during events',
    category: 'engagement',
    supportsGroups: true,
    requiresSetup: true,
    features: ['Multiple choice', 'Real-time results', 'Anonymous voting', 'Export data']
  },
  'whiteboard': {
    name: 'Collaborative Whiteboard',
    icon: '📝',
    description: 'Shared drawing and brainstorming space',
    category: 'collaboration',
    supportsGroups: true,
    requiresSetup: false,
    features: ['Real-time collaboration', 'Drawing tools', 'Text notes', 'Save/export']
  },
  'file-share': {
    name: 'File Sharing Hub',
    icon: '📁',
    description: 'Centralized file sharing for event materials',
    category: 'collaboration',
    supportsGroups: true,
    requiresSetup: false,
    features: ['Upload/download', 'Version control', 'Comments', 'Access control']
  },
  'group-chat': {
    name: 'Event Chat Room',
    icon: '💬',
    description: 'Dedicated chat channel for event coordination',
    category: 'communication',
    supportsGroups: true,
    requiresSetup: false,
    features: ['Real-time messaging', 'File sharing', 'Mentions', 'Message history']
  },
  'attendance': {
    name: 'Attendance Tracker',
    icon: '✅',
    description: 'Track and verify event attendance',
    category: 'organization',
    supportsGroups: false,
    requiresSetup: true,
    features: ['Check-in codes', 'Location verification', 'Export reports', 'Certificates']
  }
};

export function EventToolIntegration({ 
  eventId: _eventId, 
  availableTools, 
  isEventActive, 
  userRole,
  onToolLaunch 
}: EventToolIntegrationProps) {
  const [activeSessions, setActiveSessions] = useState<ToolSession[]>([]);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [toolConfig, setToolConfig] = useState<any>({});

  // Mock active sessions
  useEffect(() => {
    if (isEventActive) {
      const mockSessions: ToolSession[] = [
        {
          id: 'session-1',
          toolId: 'group-chat',
          name: 'Event Chat',
          status: 'active',
          participants: 12,
          startedAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
          lastActivity: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
          data: { messageCount: 45, activeUsers: 8 }
        },
        {
          id: 'session-2',
          toolId: 'poll-maker',
          name: 'Opening Poll',
          status: 'active',
          participants: 15,
          startedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
          lastActivity: new Date(Date.now() - 1 * 60 * 1000).toISOString(),
          data: { responses: 15, questions: 3 }
        }
      ];
      setActiveSessions(mockSessions);
    }
  }, [isEventActive]);

  const getToolDefinition = (toolId: string) => {
    return TOOL_DEFINITIONS[toolId as keyof typeof TOOL_DEFINITIONS] || {
      name: toolId,
      icon: '🔧',
      description: 'Tool description',
      category: 'utility',
      supportsGroups: false,
      requiresSetup: false,
      features: []
    };
  };

  const handleToolStart = (toolId: string) => {
    const toolDef = getToolDefinition(toolId);
    
    if (toolDef.requiresSetup && userRole === 'organizer') {
      setSelectedTool(toolId);
      setShowSetupModal(true);
    } else {
      onToolLaunch(toolId);
    }
  };

  const handleSetupComplete = () => {
    if (selectedTool) {
      onToolLaunch(selectedTool, toolConfig);
      setShowSetupModal(false);
      setSelectedTool(null);
      setToolConfig({});
    }
  };

  const formatTimeAgo = (dateString: string) => {
    const minutes = Math.floor((Date.now() - new Date(dateString).getTime()) / 60000);
    if (minutes < 1) return 'Just now';
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'productivity': return 'bg-blue-500';
      case 'engagement': return 'bg-purple-500';
      case 'collaboration': return 'bg-green-500';
      case 'communication': return 'bg-orange-500';
      case 'organization': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  if (!isEventActive && userRole !== 'organizer') {
    return (
      <div className="text-center py-8">
        <Zap className="h-12 w-12 text-zinc-600 mx-auto mb-3" />
        <p className="text-zinc-400">Tools will be available when the event starts</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Active Sessions */}
      {activeSessions.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-white mb-4">Active Tools</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {activeSessions.map((session) => {
              const toolDef = getToolDefinition(session.toolId);
              return (
                <Card key={session.id} className="p-4 bg-zinc-800/50 border-green-500/30">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="text-2xl">{toolDef.icon}</div>
                      <div>
                        <div className="font-medium text-white">{session.name}</div>
                        <div className="text-sm text-zinc-400">
                          {session.participants} participants • {formatTimeAgo(session.lastActivity)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Badge variant="building-tools" className="text-xs">
                        <Activity className="h-3 w-3 mr-1" />
                        Live
                      </Badge>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onToolLaunch(session.toolId, { sessionId: session.id })}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  {/* Session Data */}
                  {session.data && (
                    <div className="flex items-center space-x-4 text-sm text-zinc-400">
                      {session.toolId === 'group-chat' && (
                        <>
                          <span>{session.data.messageCount} messages</span>
                          <span>•</span>
                          <span>{session.data.activeUsers} active</span>
                        </>
                      )}
                      {session.toolId === 'poll-maker' && (
                        <>
                          <span>{session.data.responses} responses</span>
                          <span>•</span>
                          <span>{session.data.questions} questions</span>
                        </>
                      )}
                    </div>
                  )}
                </Card>
              );
            })}
          </div>
        </div>
      )}

      {/* Available Tools */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Available Tools</h3>
          {userRole === 'organizer' && (
            <Badge variant="skill-tag" className="text-xs">
              Organizer Controls
            </Badge>
          )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {availableTools.map((toolId) => {
            const toolDef = getToolDefinition(toolId);
            const hasActiveSession = activeSessions.some(s => s.toolId === toolId);
            
            return (
              <Card key={toolId} className="p-4 bg-zinc-800/50 border-zinc-700">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-start space-x-3">
                    <div className={`w-10 h-10 ${getCategoryColor(toolDef.category)} rounded-lg flex items-center justify-center text-lg`}>
                      {toolDef.icon}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-white">{toolDef.name}</div>
                      <div className="text-sm text-zinc-400 mt-1 leading-tight">
                        {toolDef.description}
                      </div>
                      <Badge variant="skill-tag" className="text-xs mt-2 capitalize">
                        {toolDef.category}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex flex-col space-y-2">
                    {hasActiveSession ? (
                      <Button
                        variant="primary"
                        size="sm"
                        onClick={() => onToolLaunch(toolId)}
                      >
                        <Play className="h-4 w-4 mr-1" />
                        Join
                      </Button>
                    ) : (
                      <Button
                        variant={userRole === 'organizer' ? 'outline' : 'ghost'}
                        size="sm"
                        onClick={() => handleToolStart(toolId)}
                        disabled={userRole === 'viewer'}
                      >
                        {userRole === 'organizer' ? (
                          <>
                            <Settings className="h-4 w-4 mr-1" />
                            Start
                          </>
                        ) : (
                          <>
                            <Clock className="h-4 w-4 mr-1" />
                            Waiting
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </div>
                
                {/* Tool Features */}
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-1">
                    {toolDef.features.slice(0, 3).map((feature) => (
                      <span key={feature} className="text-xs text-zinc-500 bg-zinc-800 px-2 py-1 rounded">
                        {feature}
                      </span>
                    ))}
                    {toolDef.features.length > 3 && (
                      <span className="text-xs text-zinc-500">+{toolDef.features.length - 3} more</span>
                    )}
                  </div>
                  
                  {toolDef.supportsGroups && (
                    <div className="flex items-center space-x-1 text-xs text-zinc-400">
                      <Users className="h-3 w-3" />
                      <span>Supports group collaboration</span>
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Tool Setup Modal */}
      <HiveModal
        isOpen={showSetupModal}
        onClose={() => setShowSetupModal(false)}
        title={`Setup ${selectedTool ? getToolDefinition(selectedTool).name : 'Tool'}`}
        size="lg"
      >
        {selectedTool && (
          <div className="space-y-6">
            <div className="text-center">
              <div className="text-4xl mb-3">{getToolDefinition(selectedTool).icon}</div>
              <h3 className="text-xl font-semibold text-white mb-2">
                {getToolDefinition(selectedTool).name}
              </h3>
              <p className="text-zinc-400">
                {getToolDefinition(selectedTool).description}
              </p>
            </div>

            {/* Tool-specific setup UI would go here */}
            <div className="bg-zinc-800/50 rounded-lg p-4">
              <h4 className="font-medium text-white mb-3">Configuration Options</h4>
              
              {selectedTool === 'study-timer' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">Session Duration</label>
                    <select 
                      className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded text-white"
                      value={toolConfig.duration || '25'}
                      onChange={(e) => setToolConfig((prev: any) => ({...prev, duration: e.target.value}))}
                    >
                      <option value="15">15 minutes</option>
                      <option value="25">25 minutes</option>
                      <option value="45">45 minutes</option>
                      <option value="60">60 minutes</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={toolConfig.autoBreaks || false}
                        onChange={(e) => setToolConfig((prev: any) => ({...prev, autoBreaks: e.target.checked}))}
                      />
                      <span className="text-sm text-zinc-400">Automatic break reminders</span>
                    </label>
                  </div>
                </div>
              )}

              {selectedTool === 'poll-maker' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">Poll Title</label>
                    <input 
                      type="text"
                      className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded text-white"
                      placeholder="Enter poll question..."
                      value={toolConfig.title || ''}
                      onChange={(e) => setToolConfig((prev: any) => ({...prev, title: e.target.value}))}
                    />
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={toolConfig.anonymous || true}
                        onChange={(e) => setToolConfig((prev: any) => ({...prev, anonymous: e.target.checked}))}
                      />
                      <span className="text-sm text-zinc-400">Anonymous responses</span>
                    </label>
                  </div>
                </div>
              )}

              {selectedTool === 'attendance' && (
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-1">Check-in Method</label>
                    <select 
                      className="w-full p-2 bg-zinc-800 border border-zinc-700 rounded text-white"
                      value={toolConfig.method || 'code'}
                      onChange={(e) => setToolConfig((prev: any) => ({...prev, method: e.target.value}))}
                    >
                      <option value="code">Check-in Code</option>
                      <option value="location">Location Verification</option>
                      <option value="manual">Manual Check-in</option>
                    </select>
                  </div>
                  <div>
                    <label className="flex items-center space-x-2">
                      <input 
                        type="checkbox" 
                        checked={toolConfig.certificates || false}
                        onChange={(e) => setToolConfig((prev: any) => ({...prev, certificates: e.target.checked}))}
                      />
                      <span className="text-sm text-zinc-400">Generate attendance certificates</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
              <Button variant="outline" onClick={() => setShowSetupModal(false)}>
                Cancel
              </Button>
              <Button 
                onClick={handleSetupComplete}
                className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
              >
                Start Tool
              </Button>
            </div>
          </div>
        )}
      </HiveModal>
    </div>
  );
}