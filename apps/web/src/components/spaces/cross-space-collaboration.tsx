"use client";

import { useState, useEffect } from "react";
import { Button, Card, Badge, Modal, Input } from "@hive/ui";
import { 
  Users, 
  Plus, 
  Calendar, 
  Zap, 
  Link2, 
  Search, 
  Filter,
  MessageSquare,
  Settings,
  Star,
  Clock,
  MapPin,
  ArrowRight,
  X,
  CheckCircle,
  AlertCircle,
  Handshake,
  Target,
  GitBranch,
  Lightbulb
} from "lucide-react";

interface CollaborativeSpace {
  id: string;
  name: string;
  type: string;
  memberCount: number;
  avatar?: string;
  collaborationStatus: 'active' | 'pending' | 'invited';
  sharedProjects: number;
  sharedEvents: number;
  sharedTools: number;
  lastActivity: string;
}

interface CollaborationProject {
  id: string;
  title: string;
  description: string;
  participatingSpaces: Array<{
    id: string;
    name: string;
    role: 'lead' | 'partner' | 'contributor';
  }>;
  status: 'planning' | 'active' | 'completed' | 'paused';
  startDate: string;
  endDate?: string;
  tools: string[];
  tags: string[];
  progress: number;
  memberCount: number;
  nextMilestone?: string;
}

interface JointEvent {
  id: string;
  title: string;
  description: string;
  organizingSpaces: Array<{
    id: string;
    name: string;
  }>;
  datetime: {
    start: string;
    end: string;
  };
  location: {
    type: 'physical' | 'virtual' | 'hybrid';
    name: string;
  };
  capacity: number;
  registered: number;
  type: 'academic' | 'social' | 'professional';
  isJointEvent: boolean;
}

interface CrossSpaceCollaborationProps {
  currentSpaceId: string;
  currentSpaceName: string;
  userRole: 'admin' | 'moderator' | 'member';
}

export function CrossSpaceCollaboration({ currentSpaceId, currentSpaceName, userRole }: CrossSpaceCollaborationProps) {
  const [activeTab, setActiveTab] = useState<'spaces' | 'projects' | 'events' | 'workspace'>('spaces');
  const [collaborativeSpaces, setCollaborativeSpaces] = useState<CollaborativeSpace[]>([]);
  const [collaborationProjects, setCollaborationProjects] = useState<CollaborationProject[]>([]);
  const [jointEvents, setJointEvents] = useState<JointEvent[]>([]);
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showCreateProjectModal, setShowCreateProjectModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'pending'>('all');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCollaborationData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const mockSpaces: CollaborativeSpace[] = [
        {
          id: 'space-2',
          name: 'Data Science Club',
          type: 'Student Organization',
          memberCount: 89,
          collaborationStatus: 'active',
          sharedProjects: 2,
          sharedEvents: 1,
          sharedTools: 3,
          lastActivity: '2024-02-01T14:30:00Z'
        },
        {
          id: 'space-3',
          name: 'Web Dev Society',
          type: 'Academic',
          memberCount: 156,
          collaborationStatus: 'active',
          sharedProjects: 1,
          sharedEvents: 2,
          sharedTools: 1,
          lastActivity: '2024-02-01T12:15:00Z'
        },
        {
          id: 'space-4',
          name: 'AI Research Group',
          type: 'Research',
          memberCount: 43,
          collaborationStatus: 'pending',
          sharedProjects: 0,
          sharedEvents: 0,
          sharedTools: 0,
          lastActivity: '2024-01-30T16:45:00Z'
        }
      ];

      const mockProjects: CollaborationProject[] = [
        {
          id: 'proj-1',
          title: 'Cross-Campus Hackathon Platform',
          description: 'Building a comprehensive platform for organizing and managing hackathons across multiple student organizations.',
          participatingSpaces: [
            { id: currentSpaceId, name: currentSpaceName, role: 'lead' },
            { id: 'space-2', name: 'Data Science Club', role: 'partner' },
            { id: 'space-3', name: 'Web Dev Society', role: 'partner' }
          ],
          status: 'active',
          startDate: '2024-01-15T10:00:00Z',
          endDate: '2024-03-15T18:00:00Z',
          tools: ['project-board', 'shared-docs', 'chat-room'],
          tags: ['hackathon', 'platform', 'collaboration'],
          progress: 65,
          memberCount: 18,
          nextMilestone: 'Beta Testing Phase'
        },
        {
          id: 'proj-2',
          title: 'Algorithmic Trading Workshop Series',
          description: 'Joint workshop series combining CS algorithms with data science applications in financial markets.',
          participatingSpaces: [
            { id: currentSpaceId, name: currentSpaceName, role: 'partner' },
            { id: 'space-2', name: 'Data Science Club', role: 'lead' }
          ],
          status: 'planning',
          startDate: '2024-02-20T10:00:00Z',
          tools: ['shared-calendar', 'resource-library'],
          tags: ['algorithms', 'finance', 'workshop'],
          progress: 25,
          memberCount: 8,
          nextMilestone: 'Workshop Content Creation'
        }
      ];

      const mockEvents: JointEvent[] = [
        {
          id: 'event-1',
          title: 'Inter-Space Tech Showcase',
          description: 'Annual showcase of collaborative projects and innovations from partnered spaces.',
          organizingSpaces: [
            { id: currentSpaceId, name: currentSpaceName },
            { id: 'space-2', name: 'Data Science Club' },
            { id: 'space-3', name: 'Web Dev Society' }
          ],
          datetime: {
            start: '2024-03-01T18:00:00Z',
            end: '2024-03-01T21:00:00Z'
          },
          location: {
            type: 'hybrid',
            name: 'Student Union Auditorium + Virtual Stream'
          },
          capacity: 200,
          registered: 127,
          type: 'academic',
          isJointEvent: true
        }
      ];

      setCollaborativeSpaces(mockSpaces);
      setCollaborationProjects(mockProjects);
      setJointEvents(mockEvents);
      setIsLoading(false);
    };

    fetchCollaborationData();
  }, [currentSpaceId, currentSpaceName]);

  const filteredSpaces = collaborativeSpaces.filter(space => {
    const matchesSearch = space.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || space.collaborationStatus === statusFilter;
    return matchesSearch && matchesStatus;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'pending': return 'text-hive-gold';
      case 'invited': return 'text-blue-400';
      default: return 'text-zinc-400';
    }
  };

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'planning': return 'bg-blue-500';
      case 'completed': return 'bg-[var(--hive-gold)]';
      case 'paused': return 'bg-[var(--hive-gold)]';
      default: return 'bg-zinc-500';
    }
  };

  const handleInviteSpace = (spaceId: string) => {
          <p className="text-[var(--hive-text-inverse)]">Loading collaboration data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-2">Cross-Space Collaboration</h2>
          <p className="text-zinc-400">Connect and collaborate with other spaces on campus</p>
        </div>
        
        {(userRole === 'admin' || userRole === 'moderator') && (
          <div className="flex items-center space-x-3">
            <Button
              onClick={() => setShowInviteModal(true)}
              className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
            >
              <Plus className="h-4 w-4 mr-2" />
              Invite Space
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowCreateProjectModal(true)}
            >
              <Target className="h-4 w-4 mr-2" />
              New Project
            </Button>
          </div>
        )}
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center space-x-1 bg-zinc-800/50 rounded-lg p-1">
        {[
          { id: 'spaces', label: 'Partner Spaces', icon: Handshake },
          { id: 'projects', label: 'Joint Projects', icon: Target },
          { id: 'events', label: 'Shared Events', icon: Calendar },
          { id: 'workspace', label: 'Planning Workspace', icon: Lightbulb }
        ].map((tab: any) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-hive-gold text-hive-obsidian font-medium'
                  : 'text-zinc-400 hover:text-[var(--hive-text-inverse)]'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-sm">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e: any) => setSearchQuery(e.target.value)}
            placeholder="Search collaborations..."
            className="pl-10 pr-4 py-2 bg-zinc-800 border border-zinc-700 rounded-lg text-[var(--hive-text-inverse)] placeholder-zinc-400 focus:border-hive-gold focus:outline-none w-full"
          />
        </div>
        
        <select
          value={statusFilter}
          onChange={(e: any) => setStatusFilter(e.target.value as any)}
          className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-[var(--hive-text-inverse)] text-sm focus:border-hive-gold focus:outline-none"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="pending">Pending</option>
        </select>
      </div>

      {/* Tab Content */}
      {activeTab === 'spaces' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredSpaces.map((space: any) => (
            <Card key={space.id} className="p-6 bg-zinc-800/50 border-zinc-700 hover:bg-zinc-800/70 transition-colors">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-3">
                  <div className="w-12 h-12 bg-zinc-600 rounded-xl flex items-center justify-center">
                    <span className="text-[var(--hive-text-inverse)] font-semibold">
                      {space.name.split(' ').map(word => word[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-[var(--hive-text-inverse)] mb-1">{space.name}</h3>
                    <p className="text-sm text-zinc-400">{space.type}</p>
                    <div className="flex items-center space-x-1 mt-1">
                      <Users className="h-3 w-3 text-zinc-500" />
                      <span className="text-xs text-zinc-500">{space.memberCount} members</span>
                    </div>
                  </div>
                </div>
                
                <Badge 
                  className={`text-xs ${getStatusColor(space.collaborationStatus)}`}
                  variant="skill-tag"
                >
                  {space.collaborationStatus}
                </Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-3 mb-4 text-center">
                <div>
                  <div className="text-lg font-bold text-[var(--hive-text-inverse)]">{space.sharedProjects}</div>
                  <div className="text-xs text-zinc-400">Projects</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[var(--hive-text-inverse)]">{space.sharedEvents}</div>
                  <div className="text-xs text-zinc-400">Events</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-[var(--hive-text-inverse)]">{space.sharedTools}</div>
                  <div className="text-xs text-zinc-400">Tools</div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-zinc-700">
                <span className="text-xs text-zinc-500">
                  Active {formatTimeAgo(space.lastActivity)}
                </span>
                <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-[var(--hive-text-inverse)]">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'projects' && (
        <div className="space-y-4">
          {collaborationProjects.map((project: any) => (
            <Card key={project.id} className="p-6 bg-zinc-800/50 border-zinc-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)]">{project.title}</h3>
                    <Badge 
                      className={`text-xs ${getProjectStatusColor(project.status)}`}
                      variant="skill-tag"
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <p className="text-zinc-400 text-sm mb-3">{project.description}</p>
                  
                  <div className="flex items-center space-x-4 text-sm text-zinc-500">
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>{project.memberCount} members</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>Started {new Date(project.startDate).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Target className="h-4 w-4" />
                      <span>{project.progress}% complete</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  {project.participatingSpaces.map((space: any) => (
                    <div key={space.id} className="flex items-center space-x-1">
                      <div className="w-6 h-6 bg-zinc-600 rounded-full flex items-center justify-center">
                        <span className="text-xs text-[var(--hive-text-inverse)] font-medium">
                          {space.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <span className="text-xs text-zinc-400">{space.role}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-zinc-400">Next:</span>
                    <span className="text-sm text-[var(--hive-text-inverse)]">{project.nextMilestone}</span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {project.tags.slice(0, 3).map((tag: any) => (
                      <Badge key={tag} variant="skill-tag" className="text-xs">
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <MessageSquare className="h-4 w-4 mr-1" />
                    Chat
                  </Button>
                  <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-[var(--hive-text-inverse)]">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-zinc-400">Progress</span>
                  <span className="text-xs text-zinc-400">{project.progress}%</span>
                </div>
                <div className="w-full bg-zinc-700 rounded-full h-2">
                  <div 
                    className="bg-hive-gold h-2 rounded-full transition-all"
                    style={{ width: `${project.progress}%` }}
                  />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'events' && (
        <div className="space-y-4">
          {jointEvents.map((event: any) => (
            <Card key={event.id} className="p-6 bg-zinc-800/50 border-zinc-700">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)]">{event.title}</h3>
                    <Badge variant="building-tools" className="text-xs">
                      Joint Event
                    </Badge>
                    <Badge variant="skill-tag" className="text-xs capitalize">
                      {event.type}
                    </Badge>
                  </div>
                  <p className="text-zinc-400 text-sm mb-3">{event.description}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-zinc-400" />
                  <div>
                    <div className="text-[var(--hive-text-inverse)] text-sm">
                      {new Date(event.datetime.start).toLocaleDateString()}
                    </div>
                    <div className="text-zinc-400 text-xs">
                      {new Date(event.datetime.start).toLocaleTimeString()} - {new Date(event.datetime.end).toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-zinc-400" />
                  <div>
                    <div className="text-[var(--hive-text-inverse)] text-sm">{event.location.type}</div>
                    <div className="text-zinc-400 text-xs">{event.location.name}</div>
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Users className="h-4 w-4 text-zinc-400" />
                  <div>
                    <div className="text-[var(--hive-text-inverse)] text-sm">{event.registered}/{event.capacity}</div>
                    <div className="text-zinc-400 text-xs">registered</div>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-3 border-t border-zinc-700">
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-zinc-400">Organized by:</span>
                  {event.organizingSpaces.map((space, index) => (
                    <span key={space.id} className="text-sm text-[var(--hive-text-inverse)]">
                      {space.name}{index < event.organizingSpaces.length - 1 && ', '}
                    </span>
                  ))}
                </div>
                
                <Button variant="outline" size="sm">
                  View Details
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {activeTab === 'workspace' && (
        <Card className="p-8 bg-zinc-800/50 border-zinc-700 text-center">
          <Lightbulb className="h-16 w-16 text-hive-gold mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-[var(--hive-text-inverse)] mb-2">Joint Planning Workspace</h3>
          <p className="text-zinc-400 mb-6 max-w-2xl mx-auto">
            Collaborative workspace for planning cross-space initiatives, sharing resources, and coordinating joint activities. This feature is coming soon.
          </p>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Request Early Access
          </Button>
        </Card>
      )}

      {/* Invite Space Modal */}
      <Modal
        isOpen={showInviteModal}
        onClose={() => setShowInviteModal(false)}
        title="Invite Space to Collaborate"
        size="lg"
      >
        <div className="space-y-4">
          <p className="text-zinc-400">
            Search for spaces on campus and send collaboration invitations
          </p>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-zinc-400" />
            <input
              type="text"
              placeholder="Search spaces by name or type..."
              className="pl-10 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-[var(--hive-text-inverse)] placeholder-zinc-400 focus:border-hive-gold focus:outline-none w-full"
            />
          </div>
          
          <div className="space-y-2 max-h-48 overflow-y-auto">
            {['AI Research Group', 'Design Studio', 'Business Club'].map((spaceName: any) => (
              <div key={spaceName} className="flex items-center justify-between p-3 bg-zinc-800/30 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-zinc-600 rounded-lg flex items-center justify-center">
                    <span className="text-[var(--hive-text-inverse)] text-xs font-semibold">
                      {spaceName.split(' ').map(word => word[0]).join('')}
                    </span>
                  </div>
                  <span className="text-[var(--hive-text-inverse)] text-sm">{spaceName}</span>
                </div>
                <Button size="sm" variant="outline">
                  Invite
                </Button>
              </div>
            ))}
          </div>
          
          <div className="flex justify-end space-x-3 pt-4 border-t border-zinc-800">
            <Button variant="outline" onClick={() => setShowInviteModal(false)}>
              Cancel
            </Button>
            <Button className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne">
              Send Invitations
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}