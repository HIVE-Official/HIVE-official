"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Users, 
  Star, 
  GraduationCap, 
  Building,
  Sparkles,
  Plus,
  ArrowLeft,
  Grid3X3,
  List,
  MapPin,
  Clock,
  TrendingUp
} from 'lucide-react';

// HIVE UI Components
import { 
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
  Badge,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from '@hive/ui';

// Hooks
import { useUnifiedAuth } from '@hive/ui';

// Types
interface Space {
  id: string;
  name: string;
  description: string;
  type: 'campus_living' | 'fraternity_and_sorority' | 'hive_exclusive' | 'student_organizations' | 'university_organizations';
  memberCount: number;
  potentialMembers?: number;
  isVerified: boolean;
  leaders: string[];
  members: string[];
  status: 'active' | 'preview' | 'invite_only';
  anticipatedEvents?: number;
  keywords?: string[];
  category: string;
  lastActivity: string;
  unreadCount?: number;
  isJoined?: boolean;
}

interface SpacesData {
  mySpaces: Space[];
  discoverySpaces: Space[];
  recommendedSpaces: Space[];
  totalAvailable: number;
}

// Transform API space data to frontend format
function transformSpace(apiSpace: any): Space {
  return {
    id: apiSpace.id || apiSpace.spaceId,
    name: apiSpace.name,
    description: apiSpace.description || '',
    type: apiSpace.type || 'student_organizations',
    memberCount: apiSpace.memberCount || 0,
    potentialMembers: apiSpace.potentialMembers,
    isVerified: apiSpace.isVerified || false,
    leaders: apiSpace.leaders || [],
    members: apiSpace.members || [],
    status: apiSpace.status || 'active',
    anticipatedEvents: apiSpace.anticipatedEvents,
    keywords: apiSpace.keywords,
    category: getCategoryFromType(apiSpace.type),
    lastActivity: formatLastActivity(apiSpace.updatedAt || apiSpace.lastActivity),
    unreadCount: apiSpace.unreadCount || 0,
    isJoined: apiSpace.membershipStatus === 'active' || apiSpace.isJoined || false
  };
}

// Map space types to display categories
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

// Format last activity timestamp
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

export function SpacesDashboardClient() {
  const router = useRouter();
  const { user } = useUnifiedAuth();
  const [spacesData, setSpacesData] = useState<SpacesData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'academic' | 'residential' | 'social' | 'organizations'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showJoinModal, setShowJoinModal] = useState<Space | null>(null);
  const [joiningSpaceId, setJoiningSpaceId] = useState<string | null>(null);

  // Load spaces data
  useEffect(() => {
    const loadSpacesData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch real data from APIs
        const [mySpacesResponse, discoveryResponse] = await Promise.all([
          fetch('/api/spaces/my').then(r => r.json()),
          fetch('/api/spaces/discovery').then(r => r.json())
        ]);
        // Process API responses
        const processedData: SpacesData = {
          mySpaces: mySpacesResponse.success ? (mySpacesResponse.activeSpaces || []).map(transformSpace) : [],
          discoverySpaces: discoveryResponse.success ? (discoveryResponse.spaces?.student_organizations || []).concat(discoveryResponse.spaces?.university_organizations || []).map(transformSpace) : [],
          recommendedSpaces: discoveryResponse.success ? (discoveryResponse.spaces?.campus_living || []).concat(discoveryResponse.spaces?.fraternity_and_sorority || []).map(transformSpace) : [],
          totalAvailable: discoveryResponse.totalCount || 0
        };
        
        setSpacesData(processedData);
      } catch (error) {
        console.error('Failed to load spaces data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (user) {
      loadSpacesData();
    }
  }, [user]);

  const handleJoinSpace = async (space: Space) => {
    if (joiningSpaceId) return;
    
    setJoiningSpaceId(space.id);
    try {
      // Real API call to join space
      const response = await fetch(`/api/spaces/join`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spaceId: space.id })
      });

      if (!response.ok) {
        throw new Error('Failed to join space');
      }

      const result = await response.json();
      
      // Update local state
      setSpacesData(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          mySpaces: [...prev.mySpaces, { ...space, isJoined: true, unreadCount: 0 }],
          discoverySpaces: prev.discoverySpaces.filter(s => s.id !== space.id),
          recommendedSpaces: prev.recommendedSpaces.filter(s => s.id !== space.id)
        };
      });
      
      setShowJoinModal(null);
    } catch (error) {
      console.error('Failed to join space:', error);
    } finally {
      setJoiningSpaceId(null);
    }
  };

  const filteredSpaces = spacesData ? [
    ...spacesData.discoverySpaces,
    ...spacesData.recommendedSpaces
  ].filter(space => {
    const matchesSearch = !searchQuery || 
      space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesFilter = selectedFilter === 'all' || 
      space.category.toLowerCase().includes(selectedFilter) ||
      (selectedFilter === 'organizations' && space.type.includes('organizations'));
    
    return matchesSearch && matchesFilter;
  }) : [];

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="h-8 w-48 bg-accent rounded animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {Array.from({ length: 6 }, (_, i) => (
            <Card key={i}>
              <CardContent className="p-4">
                <div className="h-32 bg-accent rounded animate-pulse" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (!spacesData) {
    return (
      <div className="text-center py-12">
        <div className="text-xl font-semibold mb-2">Unable to load spaces</div>
        <ButtonEnhanced onClick={() => window.location.reload()}>Try Again</ButtonEnhanced>
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
        <div>
          <h1 className="text-2xl font-bold text-foreground mb-2">Campus Spaces</h1>
          <p className="text-muted-foreground">
            Discover and join {spacesData.totalAvailable} UB communities
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <ButtonEnhanced 
            variant="outline"
            size="sm"
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
          >
            {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid3X3 className="h-4 w-4" />}
          </ButtonEnhanced>
          <ButtonEnhanced 
            onClick={() => router.push('/spaces/request')}
            className="flex items-center space-x-2"
          >
            <Plus className="h-4 w-4" />
            <span>Request Space</span>
          </ButtonEnhanced>
        </div>
      </motion.div>

      {/* Search and Filters */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4"
      >
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <InputEnhanced
            placeholder="Search spaces, majors, interests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <Tabs value={selectedFilter} onValueChange={(value: any) => setSelectedFilter(value)}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="academic">Academic</TabsTrigger>
            <TabsTrigger value="residential">Residential</TabsTrigger>
            <TabsTrigger value="social">Social</TabsTrigger>
            <TabsTrigger value="organizations">Organizations</TabsTrigger>
          </TabsList>
        </Tabs>
      </motion.div>

      {/* My Spaces Section */}
      {spacesData.mySpaces.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5" />
                  <span>My Spaces</span>
                  <Badge variant="secondary">{spacesData.mySpaces.length}</Badge>
                </div>
                <ButtonEnhanced variant="ghost" size="sm" onClick={() => router.push('/')}>
                  <ArrowLeft className="h-4 w-4 mr-1" />
                  Dashboard
                </ButtonEnhanced>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
                {spacesData.mySpaces.map((space) => (
                  <div
                    key={space.id}
                    className={`border border-border rounded-lg p-4 hover:bg-accent/50 cursor-pointer transition-colors ${
                      viewMode === 'list' ? 'flex items-center justify-between' : ''
                    }`}
                    onClick={() => router.push(`/spaces/${space.id}`)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="h-10 w-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-[var(--hive-text-inverse)] font-semibold text-sm">
                          {space.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground mb-1">{space.name}</div>
                        <div className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {space.description}
                        </div>
                        <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{space.memberCount} members</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{space.lastActivity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {viewMode === 'list' && (
                      <div className="flex items-center space-x-2 ml-4">
                        <Badge variant="secondary" className="text-xs">
                          {space.category}
                        </Badge>
                        {space.unreadCount && space.unreadCount > 0 && (
                          <Badge className="h-6 w-6 p-0 flex items-center justify-center text-xs">
                            {space.unreadCount}
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Discovery Spaces */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Discover Spaces</span>
              <Badge variant="outline">{filteredSpaces.length} available</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4' : 'space-y-3'}>
              <AnimatePresence>
                {filteredSpaces.map((space, index) => (
                  <motion.div
                    key={space.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ delay: index * 0.05 }}
                    className={`border border-border rounded-lg p-4 hover:bg-accent/50 cursor-pointer transition-colors ${
                      viewMode === 'list' ? 'flex items-center justify-between' : ''
                    }`}
                    onClick={() => setShowJoinModal(space)}
                  >
                    <div className="flex items-start space-x-3">
                      <div className="h-10 w-10 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                        <span className="text-[var(--hive-text-inverse)] font-semibold text-sm">
                          {space.name.charAt(0)}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-foreground mb-1">{space.name}</div>
                        <div className="text-sm text-muted-foreground mb-2 line-clamp-2">
                          {space.description}
                        </div>
                        <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Users className="h-3 w-3" />
                            <span>{space.memberCount} members</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{space.lastActivity}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    {viewMode === 'list' && (
                      <div className="flex items-center space-x-2 ml-4">
                        <Badge variant="secondary" className="text-xs">
                          {space.category}
                        </Badge>
                        <ButtonEnhanced size="sm">Join</ButtonEnhanced>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {filteredSpaces.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No spaces found matching your search</p>
                <ButtonEnhanced variant="ghost" size="sm" className="mt-2" onClick={() => setSearchQuery('')}>
                  Clear Search
                </ButtonEnhanced>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Join Space Modal */}
      <Dialog open={!!showJoinModal} onOpenChange={() => setShowJoinModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Join {showJoinModal?.name}</DialogTitle>
          </DialogHeader>
          {showJoinModal && (
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="h-12 w-12 bg-gradient-to-br from-green-500 to-blue-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <span className="text-[var(--hive-text-inverse)] font-semibold">
                    {showJoinModal.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-medium text-foreground mb-1">{showJoinModal.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{showJoinModal.description}</p>
                  <div className="flex items-center space-x-3 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{showJoinModal.memberCount} members</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {showJoinModal.category}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <ButtonEnhanced 
                  variant="outline" 
                  onClick={() => setShowJoinModal(null)}
                  className="flex-1"
                >
                  Cancel
                </ButtonEnhanced>
                <ButtonEnhanced 
                  onClick={() => handleJoinSpace(showJoinModal)}
                  disabled={joiningSpaceId === showJoinModal.id}
                  className="flex-1"
                >
                  {joiningSpaceId === showJoinModal.id ? 'Joining...' : 'Join Space'}
                </ButtonEnhanced>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}