"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Users, 
  ArrowLeft, 
  Settings, 
  Bell, 
  Share, 
  Calendar,
  MessageSquare,
  Pin,
  Crown,
  UserPlus,
  MoreHorizontal,
  Activity,
  MapPin,
  Clock,
  Hash
} from 'lucide-react';

// HIVE UI Components
import { 
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Avatar,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Separator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@hive/ui';

// Components
import { FeedDisplay } from '../../../../../components/social/feed-display';

// Hooks
import { useUnifiedAuth } from '@hive/ui';

// Types
interface SpaceData {
  id: string;
  name: string;
  description: string;
  type: string;
  category: string;
  memberCount: number;
  isVerified: boolean;
  isPrivate: boolean;
  status: 'active' | 'preview' | 'invite_only';
  createdAt: string;
  lastActivity: string;
  isJoined: boolean;
  isLeader: boolean;
  isModerator: boolean;
  leaders: Array<{
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    role: 'leader' | 'moderator';
  }>;
  recentMembers: Array<{
    id: string;
    name: string;
    handle: string;
    avatar?: string;
    joinedAt: string;
  }>;
  stats: {
    postsThisWeek: number;
    activeMembers: number;
    upcomingEvents: number;
  };
  upcomingEvents: Array<{
    id: string;
    title: string;
    date: string;
    time: string;
    attendees: number;
  }>;
}

interface SpaceDashboardViewProps {
  spaceId: string;
}

// Transform API space data to component format
function transformApiSpaceToComponent(apiSpace: any, currentUserId?: string): SpaceData {
  return {
    id: apiSpace.id,
    name: apiSpace.name,
    description: apiSpace.description || '',
    type: apiSpace.type || '',
    category: getCategoryFromType(apiSpace.type),
    memberCount: apiSpace.memberCount || 0,
    isVerified: apiSpace.isVerified || false,
    isPrivate: apiSpace.isPrivate || false,
    status: apiSpace.status || 'active',
    createdAt: formatDate(apiSpace.createdAt),
    lastActivity: formatLastActivity(apiSpace.updatedAt || apiSpace.lastActivity),
    isJoined: apiSpace.members?.includes(currentUserId) || false,
    isLeader: apiSpace.leaders?.includes(currentUserId) || false,
    isModerator: apiSpace.moderators?.includes(currentUserId) || false,
    leaders: apiSpace.leaders?.map((leaderId: string) => ({
      id: leaderId,
      name: `Leader ${leaderId.slice(0, 8)}`, // Fallback until we fetch user data
      handle: leaderId,
      role: 'leader'
    })) || [],
    recentMembers: apiSpace.members?.slice(0, 5).map((memberId: string) => ({
      id: memberId,
      name: `Member ${memberId.slice(0, 8)}`, // Fallback until we fetch user data
      handle: memberId,
      joinedAt: '1 week ago' // Fallback
    })) || [],
    stats: {
      postsThisWeek: Math.floor(Math.random() * 20), // TODO: Get from API
      activeMembers: Math.floor((apiSpace.memberCount || 0) * 0.7),
      upcomingEvents: Math.floor(Math.random() * 5)
    },
    upcomingEvents: [] // TODO: Fetch from events API
  };
}

// Helper functions
function getCategoryFromType(type: string): string {
  const typeMap: Record<string, string> = {
    'campus_living': 'Residential',
    'fraternity_and_sorority': 'Greek Life',
    'student_organizations': 'Academic', 
    'university_organizations': 'Academic',
    'hive_exclusive': 'Innovation'
  };
  return typeMap[type] || 'General';
}

function formatDate(dateString: string | Date): string {
  if (!dateString) return 'Unknown';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

function formatLastActivity(timestamp: string | Date): string {
  if (!timestamp) return 'No recent activity';
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) return 'Just now';
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInHours < 48) return '1 day ago';
  return `${Math.floor(diffInHours / 24)} days ago`;
}

export function SpaceDashboardView({ spaceId }: SpaceDashboardViewProps) {
  const router = useRouter();
  const { user } = useUnifiedAuth();
  const [spaceData, setSpaceData] = useState<SpaceData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isJoining, setIsJoining] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const [activeTab, setActiveTab] = useState('feed');

  // Load space data
  useEffect(() => {
    const loadSpaceData = async () => {
      try {
        setIsLoading(true);
        
        // Real API call to get space data
        const response = await fetch(`/api/spaces/${spaceId}`);
        if (!response.ok) {
          throw new Error(`Failed to load space: ${response.status}`);
        }
        
        const apiData = await response.json();
        if (!apiData.success) {
          throw new Error(apiData.error || 'Failed to load space data');
        }
        
        // Transform API data to component format
        const transformedData = transformApiSpaceToComponent(apiData.space, user?.uid);
        setSpaceData(transformedData);
        
      } catch (error) {
        console.error('Failed to load space data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSpaceData();
  }, [spaceId, user?.uid]);

  const handleJoinSpace = async () => {
    if (isJoining || !spaceData) return;
    
    setIsJoining(true);
    try {
      // Real API call to join space
      const response = await fetch(`/api/spaces/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spaceId })
      });

      if (!response.ok) {
        throw new Error('Failed to join space');
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to join space');
      }
      
      setSpaceData(prev => prev ? { ...prev, isJoined: true, memberCount: prev.memberCount + 1 } : prev);
    } catch (error) {
      console.error('Failed to join space:', error);
    } finally {
      setIsJoining(false);
    }
  };

  const handleLeaveSpace = async () => {
    if (isLeaving || !spaceData) return;
    
    setIsLeaving(true);
    try {
      // Real API call to leave space
      const response = await fetch(`/api/spaces/leave`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spaceId })
      });

      if (!response.ok) {
        throw new Error('Failed to leave space');
      }

      const result = await response.json();
      if (!result.success) {
        throw new Error(result.error || 'Failed to leave space');
      }
      
      setSpaceData(prev => prev ? { ...prev, isJoined: false, memberCount: prev.memberCount - 1 } : prev);
    } catch (error) {
      console.error('Failed to leave space:', error);
    } finally {
      setIsLeaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="h-8 w-8 bg-accent rounded animate-pulse" />
          <div className="h-8 w-48 bg-accent rounded animate-pulse" />
        </div>
        <div className="h-32 bg-accent rounded animate-pulse" />
        <div className="h-64 bg-accent rounded animate-pulse" />
      </div>
    );
  }

  if (!spaceData) {
    return (
      <div className="text-center py-12">
        <div className="text-xl font-semibold mb-2">Space not found</div>
        <p className="text-muted-foreground mb-4">This space may have been deleted or is private.</p>
        <ButtonEnhanced onClick={() => router.push('/spaces')}>Browse Spaces</ButtonEnhanced>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center space-x-3">
          <ButtonEnhanced 
            variant="ghost" 
            size="sm" 
            onClick={() => router.push('/spaces')}
            className="flex items-center space-x-1"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Spaces</span>
          </ButtonEnhanced>
          <Separator orientation="vertical" className="h-6" />
          <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
            <span className="text-[var(--hive-text-inverse)] font-semibold text-sm">
              {spaceData.name.charAt(0)}
            </span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-foreground">{spaceData.name}</h1>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {spaceData.isJoined ? (
            <>
              <ButtonEnhanced variant="outline" size="sm">
                <Bell className="h-4 w-4" />
              </ButtonEnhanced>
              <ButtonEnhanced variant="outline" size="sm">
                <Share className="h-4 w-4" />
              </ButtonEnhanced>
              {(spaceData.isLeader || spaceData.isModerator) && (
                <ButtonEnhanced variant="outline" size="sm">
                  <Settings className="h-4 w-4" />
                </ButtonEnhanced>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <ButtonEnhanced variant="outline" size="sm">
                    <MoreHorizontal className="h-4 w-4" />
                  </ButtonEnhanced>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleLeaveSpace} disabled={isLeaving}>
                    {isLeaving ? 'Leaving...' : 'Leave Space'}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <ButtonEnhanced onClick={handleJoinSpace} disabled={isJoining}>
              {isJoining ? 'Joining...' : 'Join Space'}
            </ButtonEnhanced>
          )}
        </div>
      </motion.div>

      {/* Space Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Badge variant="secondary">{spaceData.category}</Badge>
                  {spaceData.isVerified && <Badge variant="default">Verified</Badge>}
                  {spaceData.isPrivate && <Badge variant="outline">Private</Badge>}
                </div>
                <p className="text-muted-foreground mb-3">{spaceData.description}</p>
                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{spaceData.memberCount} members</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Clock className="h-4 w-4" />
                    <span>Active {spaceData.lastActivity}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Hash className="h-4 w-4" />
                    <span>Created {spaceData.createdAt}</span>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 md:ml-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{spaceData.stats.postsThisWeek}</div>
                  <div className="text-xs text-muted-foreground">Posts this week</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{spaceData.stats.activeMembers}</div>
                  <div className="text-xs text-muted-foreground">Active members</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-foreground">{spaceData.stats.upcomingEvents}</div>
                  <div className="text-xs text-muted-foreground">Upcoming events</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Content Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="feed" className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4" />
              <span>Feed</span>
            </TabsTrigger>
            <TabsTrigger value="members" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span>Members</span>
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Events</span>
            </TabsTrigger>
            <TabsTrigger value="about" className="flex items-center space-x-2">
              <Activity className="h-4 w-4" />
              <span>About</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="feed" className="mt-6">
            <FeedDisplay 
              spaceId={spaceData.id}
              spaceName={spaceData.name}
              feedType="space"
              showPostCreator={spaceData.isJoined}
            />
          </TabsContent>

          <TabsContent value="members" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>Recent Members</span>
                      <Badge variant="outline">{spaceData.memberCount} total</Badge>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {spaceData.recentMembers.map((member) => (
                      <div key={member.id} className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          {member.avatar ? (
                            <img src={member.avatar} alt={member.name} className="rounded-full" />
                          ) : (
                            <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-[var(--hive-text-inverse)] font-medium text-sm">
                                {member.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </Avatar>
                        <div className="flex-1">
                          <div className="font-medium text-foreground">{member.name}</div>
                          <div className="text-sm text-muted-foreground">@{member.handle}</div>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Joined {member.joinedAt}
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>

              <div>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Crown className="h-5 w-5" />
                      <span>Leaders</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {spaceData.leaders.map((leader) => (
                      <div key={leader.id} className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          {leader.avatar ? (
                            <img src={leader.avatar} alt={leader.name} className="rounded-full" />
                          ) : (
                            <div className="h-8 w-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center">
                              <span className="text-[var(--hive-text-inverse)] font-medium text-xs">
                                {leader.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-foreground text-sm">{leader.name}</div>
                          <div className="text-xs text-muted-foreground">@{leader.handle}</div>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {leader.role}
                        </Badge>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="events" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Upcoming Events</span>
                  {spaceData.isJoined && (
                    <ButtonEnhanced size="sm">
                      <Calendar className="h-4 w-4 mr-2" />
                      Create Event
                    </ButtonEnhanced>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {spaceData.upcomingEvents.length > 0 ? (
                  <div className="space-y-4">
                    {spaceData.upcomingEvents.map((event) => (
                      <div key={event.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-medium text-foreground mb-1">{event.title}</h3>
                            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                              <span>{event.date} at {event.time}</span>
                              <span>•</span>
                              <span>{event.attendees} attending</span>
                            </div>
                          </div>
                          {spaceData.isJoined && (
                            <ButtonEnhanced size="sm" variant="outline">
                              RSVP
                            </ButtonEnhanced>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-muted-foreground">
                    <Calendar className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>No upcoming events</p>
                    {spaceData.isJoined && (
                      <ButtonEnhanced variant="ghost" size="sm" className="mt-2">
                        Create the first event
                      </ButtonEnhanced>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="about" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>About {spaceData.name}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Description</h4>
                    <p className="text-muted-foreground">{spaceData.description}</p>
                  </div>
                  <Separator />
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Community Guidelines</h4>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Be respectful and inclusive of all community members</li>
                      <li>• Stay on topic and contribute meaningfully to discussions</li>
                      <li>• No spam, harassment, or inappropriate content</li>
                      <li>• Help create a welcoming environment for new members</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>
    </div>
  );
}

// Mock data generator for development
function generateMockSpaceData(spaceId: string, currentUserId?: string): SpaceData {
  const spaceMap: Record<string, Partial<SpaceData>> = {
    'cs250-study': {
      name: 'CS 250 Study Group',
      description: 'Collaborative learning community for Data Structures. Weekly study sessions, homework help, and exam prep.',
      category: 'Academic',
      type: 'student_organizations',
      memberCount: 24,
      isJoined: true,
      isLeader: false,
      isModerator: false
    },
    'ellicott-3rd': {
      name: 'Ellicott 3rd Floor',
      description: 'Third floor community in Ellicott Complex - events, study groups, friendships, and floor bonding.',
      category: 'Residential',
      type: 'campus_living',
      memberCount: 18,
      isJoined: true,
      isLeader: false,
      isModerator: false,
      isPrivate: true
    },
    'ub-engineering': {
      name: 'UB Engineering',
      description: 'Official School of Engineering and Applied Sciences community for all engineering majors.',
      category: 'Academic',
      type: 'university_organizations',
      memberCount: 156,
      isJoined: true,
      isLeader: false,
      isModerator: false
    }
  };

  const baseData = spaceMap[spaceId] || {
    name: 'Unknown Space',
    description: 'Space description not available.',
    category: 'General',
    type: 'student_organizations',
    memberCount: 5,
    isJoined: false,
    isLeader: false,
    isModerator: false
  };

  return {
    id: spaceId,
    isVerified: true,
    status: 'active',
    createdAt: 'Aug 2024',
    lastActivity: '2 hours ago',
    leaders: [
      {
        id: 'leader1',
        name: 'Sarah Johnson',
        handle: 'sarahj',
        role: 'leader'
      },
      {
        id: 'leader2', 
        name: 'Mike Chen',
        handle: 'mikechen',
        role: 'moderator'
      }
    ],
    recentMembers: [
      {
        id: 'member1',
        name: 'Alex Rodriguez',
        handle: 'alexr',
        joinedAt: '2 days ago'
      },
      {
        id: 'member2',
        name: 'Emma Davis',
        handle: 'emmad',
        joinedAt: '4 days ago'
      },
      {
        id: 'member3',
        name: 'Jordan Kim',
        handle: 'jordank',
        joinedAt: '1 week ago'
      }
    ],
    stats: {
      postsThisWeek: 12,
      activeMembers: Math.floor(baseData.memberCount! * 0.7),
      upcomingEvents: 2
    },
    upcomingEvents: [
      {
        id: 'event1',
        title: 'Study Session',
        date: 'Tomorrow',
        time: '2:00 PM',
        attendees: 8
      },
      {
        id: 'event2',
        title: 'Group Project Workshop', 
        date: 'Friday',
        time: '4:00 PM',
        attendees: 6
      }
    ],
    ...baseData
  } as SpaceData;
}