'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { Button, Card, Badge, Tabs, TabsList, TabsTrigger, TabsContent } from '@hive/ui';
import {
  Hash,
  Users,
  Calendar,
  FileText,
  Settings,
  Bell,
  Share,
  Pin,
  TrendingUp,
  MessageSquare,
  ChevronRight,
  Menu,
  X,
  Plus,
  Star
} from 'lucide-react';
import { useAuth } from '@hive/auth-logic';
import { api } from '@/lib/api-client';
import { SpaceChatBoard } from '@/components/spaces/space-chat-board';
import { SpaceSidebar } from '@/components/spaces/space-sidebar';
import { EventsPanel } from '@/components/spaces/panels/events-panel';
import { MembersPanel } from '@/components/spaces/panels/members-panel';
import { ResourcesPanel } from '@/components/spaces/panels/resources-panel';

interface SpaceData {
  id: string;
  name: string;
  description: string;
  category: string;
  memberCount: number;
  onlineCount: number;
  bannerImage?: string;
  avatarImage?: string;
  joinPolicy: string;
  visibility: string;
  leaders: string[];
  settings: {
    maxPinnedPosts: number;
    autoArchiveDays: number;
  };
}

interface SpaceMembership {
  role: 'owner' | 'leader' | 'moderator' | 'member';
  joinedAt?: Date;
  notifications?: {
    posts: boolean;
    events: boolean;
    announcements: boolean;
    mentions: boolean;
  };
}

export default function SpaceDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const spaceId = params.spaceId as string;

  const [loading, setLoading] = useState(true);
  const [space, setSpace] = useState<SpaceData | null>(null);
  const [membership, setMembership] = useState<SpaceMembership | null>(null);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [contextPanel, setContextPanel] = useState<string | null>(null);

  // SPEC.md: Hot thread tabs
  const [hotThreads, setHotThreads] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState('main');

  useEffect(() => {
    loadSpace();
  }, [spaceId]);

  const loadSpace = async () => {
    try {
      setLoading(true);

      const spaceData = await api.get<SpaceData>(`/api/spaces/${spaceId}`);
      setSpace(spaceData);

      const membershipData = await api.spaces.membership.get<{ requestingUser?: SpaceMembership }>(spaceId);
      setMembership(membershipData?.requestingUser ?? null);

      const threadsResponse = await api.get<{ posts: any[] }>(`/api/spaces/${spaceId}/posts`, {
        params: {
          type: 'hot_threads',
          minReplies: 10,
          limit: 5
        }
      });
      setHotThreads(threadsResponse.posts || []);

    } catch (error) {
      console.error('Failed to load space:', error);
      router.push('/spaces');
    } finally {
      setLoading(false);
    }
  };

  const handleJoinSpace = async () => {
    try {
      await api.post(`/api/spaces/${spaceId}/join`);
      const membershipData = await api.spaces.membership.get<{ requestingUser?: SpaceMembership }>(spaceId);
      setMembership(membershipData?.requestingUser ?? null);
    } catch (error) {
      console.error('Failed to join space:', error);
    }
  };

  const handleLeaveSpace = async () => {
    try {
      await api.post(`/api/spaces/${spaceId}/leave`);
      setMembership(null);
    } catch (error) {
      console.error('Failed to leave space:', error);
    }
  };

  const isLeader = membership?.role === 'owner' || membership?.role === 'leader';
  const isModerator = isLeader || membership?.role === 'moderator';

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-[var(--hive-brand-primary)]">Loading space...</p>
      </div>
    );
  }

  if (!space) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-red-400">Space not found</p>
      </div>
    );
  }

  // SPEC.md: 60/40 split with context panels
  const mainWidth = contextPanel ? 'w-[40%]' : (sidebarCollapsed ? 'w-[85%]' : 'w-[60%]');
  const sidebarWidth = sidebarCollapsed ? 'w-[15%]' : 'w-[40%]';
  const contextWidth = 'w-[40%]';

  return (
    <div className="min-h-screen bg-black">
      {/* Space Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="relative h-32 bg-gradient-to-br from-hive-gold/20 to-purple-600/20">
          {space.bannerImage && (
            <img src={space.bannerImage} alt="" className="w-full h-full object-cover" />
          )}

          {/* Header Content */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <div className="max-w-7xl mx-auto flex items-end justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-[var(--hive-brand-primary)] rounded-lg flex items-center justify-center">
                  <Hash className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                    {space.name}
                    <Badge className="bg-gray-800 text-gray-300">
                      {space.category.replace('_', ' ')}
                    </Badge>
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span>{space.memberCount} members</span>
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      {space.onlineCount} online
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2">
                {membership ? (
                  <>
                    <Button
                      className="max-w-sm border-gray-700"
                      variant="outline"
                      
                      onClick={() => {}}
                    >
                      <Bell className="w-4 h-4" />
                    </Button>
                    <Button
                      className="max-w-sm border-gray-700"
                      variant="outline"
                      
                      onClick={() => {}}
                    >
                      <Share className="w-4 h-4" />
                    </Button>
                    {isLeader && (
                      <Button
                        className="max-w-sm border-gray-700"
                        variant="outline"
                        
                        onClick={() => router.push(`/spaces/${spaceId}/settings`)}
                      >
                        <Settings className="w-4 h-4" />
                      </Button>
                    )}
                    <Button
                      className="max-w-sm border-red-500 text-red-400 hover:bg-red-500/10"
                      variant="outline"
                      
                      onClick={handleLeaveSpace}
                    >
                      Leave
                    </Button>
                  </>
                ) : (
                  <Button
                    className="bg-[var(--hive-brand-primary)] text-black hover:bg-yellow-400"
                    onClick={handleJoinSpace}
                  >
                    Join Space
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* SPEC.md: Tab System for Hot Threads */}
      {hotThreads.length > 0 && (
        <div className="bg-gray-900 border-b border-gray-800">
          <div className="max-w-7xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-transparent border-0 h-auto p-0">
                <TabsTrigger
                  value="main"
                  className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[var(--hive-brand-primary)] rounded-none px-4 py-3"
                >
                  <Hash className="w-4 h-4 mr-2" />
                  Main Board
                </TabsTrigger>
                {hotThreads.slice(0, 5).map((thread) => (
                  <TabsTrigger
                    key={thread.id}
                    value={thread.id}
                    className="data-[state=active]:bg-transparent data-[state=active]:border-b-2 data-[state=active]:border-[var(--hive-brand-primary)] rounded-none px-4 py-3"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    {thread.content ?
                      `${thread.content.slice(0, 30)}...` :
                      `Thread (${thread.commentCount || thread.replyCount || 0})`
                    }
                    {thread.isLive && (
                      <div className="ml-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    )}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>
      )}

      {/* Main Content Area - SPEC.md 60/40 Split */}
      <div className="flex h-[calc(100vh-12rem)]">
        {/* Main Board (60% or 40% with context panel) */}
        <div className={`${mainWidth} transition-all duration-300 border-r border-gray-800`}>
          {activeTab === 'main' ? (
            <SpaceChatBoard
              spaceId={spaceId}
              membership={membership}
              isLeader={isLeader}
              isModerator={isModerator}
              onOpenContext={(panel) => setContextPanel(panel)}
            />
          ) : (
            <SpaceChatBoard
              spaceId={spaceId}
              threadId={activeTab}
              membership={membership}
              isLeader={isLeader}
              isModerator={isModerator}
              onOpenContext={(panel) => setContextPanel(panel)}
            />
          )}
        </div>

        {/* Sidebar (40% or collapsed) */}
        <div className={`${sidebarWidth} transition-all duration-300 bg-gray-900/50`}>
          <SpaceSidebar
            spaceId={spaceId}
            collapsed={sidebarCollapsed}
            onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
            onOpenPanel={(panel) => setContextPanel(panel)}
            membership={membership}
          />
        </div>

        {/* Context Panel (40% when open) */}
        {contextPanel && (
          <div className={`${contextWidth} bg-gray-900 border-l border-gray-800 animate-slide-in-right`}>
            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
              <h3 className="font-bold text-white capitalize">{contextPanel}</h3>
              <Button
                className="max-w-sm"
                variant="outline"
                onClick={() => setContextPanel(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* Context Panel Content */}
            {contextPanel === 'events' && (
              <EventsPanel
                spaceId={spaceId}
                userRole={membership?.role || 'guest'}
                canCreateEvents={isLeader || isModerator}
              />
            )}
            {contextPanel === 'members' && (
              <MembersPanel
                spaceId={spaceId}
                userRole={membership?.role || 'guest'}
                isLeader={isLeader}
              />
            )}
            {contextPanel === 'resources' && (
              <ResourcesPanel
                spaceId={spaceId}
                userRole={membership?.role || 'guest'}
                canUpload={membership !== null}
                isLeader={isLeader}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
