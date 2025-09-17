'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Users, 
  Star, 
  Sparkles,
  Plus,
  Grid3X3,
  List,
  Clock,
  TrendingUp,
  Loader2
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
} from '@hive/ui';

// State Management
import { 
  useSpaces, 
  useJoinSpace, 
  useLeaveSpace,
  usePrefetchSpace,
  useAuthStore,
  useUIStore 
} from '@hive/hooks';

export function SpacesDashboardWithQuery() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  // Global state
  const { profile } = useAuthStore();
  const { addToast } = useUIStore();
  
  // React Query hooks
  const { data: spaces, isLoading, error, refetch } = useSpaces();
  const joinSpace = useJoinSpace();
  const leaveSpace = useLeaveSpace();
  const prefetchSpace = usePrefetchSpace();
  
  // Filter spaces based on membership
  const mySpaces = spaces?.filter(s => s.isMember) || [];
  const discoverySpaces = spaces?.filter(s => !s.isMember) || [];
  
  // Filter by search and category
  const filteredSpaces = (spaceList: typeof spaces) => {
    if (!spaceList) return [];
    
    return spaceList.filter(space => {
      const matchesSearch = searchQuery === '' || 
        space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || 
        space.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });
  };

  const handleJoinSpace = async (spaceId: string, spaceName: string) => {
    joinSpace.mutate(spaceId, {
      onSuccess: () => {
        addToast({
          title: 'Joined Space!',
          description: `You are now a member of ${spaceName}`,
          type: 'success',
        });
      },
      onError: (error) => {
        addToast({
          title: 'Failed to join',
          description: error.message || 'Something went wrong',
          type: 'error',
        });
      },
    });
  };

  const handleLeaveSpace = async (spaceId: string, spaceName: string) => {
    leaveSpace.mutate(spaceId, {
      onSuccess: () => {
        addToast({
          title: 'Left Space',
          description: `You have left ${spaceName}`,
          type: 'info',
        });
      },
      onError: (error) => {
        addToast({
          title: 'Failed to leave',
          description: error.message || 'Something went wrong',
          type: 'error',
        });
      },
    });
  };

  // Space Card Component
  const SpaceCard = ({ space }: { space: any }) => {
    const isJoining = joinSpace.isPending && joinSpace.variables === space.id;
    const isLeaving = leaveSpace.isPending && leaveSpace.variables === space.id;
    const isProcessing = isJoining || isLeaving;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        whileHover={{ scale: 1.02 }}
        onMouseEnter={() => prefetchSpace(space.id)}
      >
        <Card className="h-full hover:shadow-lg transition-all cursor-pointer">
          <CardHeader className="pb-3">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold flex items-center gap-2">
                  {space.name}
                  {space.isVerified && (
                    <Badge variant="secondary" className="text-xs">
                      Verified
                    </Badge>
                  )}
                </CardTitle>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                  {space.description}
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {/* Stats */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3 text-muted-foreground" />
                  <span>{space.memberCount} members</span>
                </div>
                <Badge variant="outline" className="text-xs">
                  {space.category}
                </Badge>
              </div>

              {/* Action Button */}
              <Button
                onClick={() => 
                  space.isMember 
                    ? handleLeaveSpace(space.id, space.name)
                    : handleJoinSpace(space.id, space.name)
                }
                disabled={isProcessing}
                variant={space.isMember ? 'outline' : 'default'}
                className="w-full"
                size="sm"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="mr-2 h-3 w-3 animate-spin" />
                    {isJoining ? 'Joining...' : 'Leaving...'}
                  </>
                ) : (
                  space.isMember ? 'Leave Space' : 'Join Space'
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 text-accent animate-spin" />
          <p className="text-muted-foreground">Loading spaces...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center space-y-3">
          <p className="text-destructive">Failed to load spaces</p>
          <Button onClick={() => refetch()} variant="outline">
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Spaces</h1>
          <p className="text-muted-foreground">
            Discover and join campus communities
          </p>
        </div>
        <Button onClick={() => router.push('/spaces/create')}>
          <Plus className="mr-2 h-4 w-4" />
          Create Space
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search spaces..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('grid')}
          >
            <Grid3X3 className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'outline'}
            size="icon"
            onClick={() => setViewMode('list')}
          >
            <List className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="discovery" className="flex-1">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="discovery" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Discover ({discoverySpaces.length})
          </TabsTrigger>
          <TabsTrigger value="my-spaces" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            My Spaces ({mySpaces.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="discovery" className="mt-6">
          <div className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            <AnimatePresence mode="popLayout">
              {filteredSpaces(discoverySpaces).map((space) => (
                <SpaceCard key={space.id} space={space} />
              ))}
            </AnimatePresence>
          </div>
          
          {filteredSpaces(discoverySpaces).length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No spaces found</p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="my-spaces" className="mt-6">
          <div className={`grid gap-4 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
              : 'grid-cols-1'
          }`}>
            <AnimatePresence mode="popLayout">
              {filteredSpaces(mySpaces).map((space) => (
                <SpaceCard key={space.id} space={space} />
              ))}
            </AnimatePresence>
          </div>
          
          {mySpaces.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">You haven't joined any spaces yet</p>
              <Button 
                onClick={() => document.querySelector('[value="discovery"]')?.click()}
                variant="link"
                className="mt-2"
              >
                Discover spaces to join
              </Button>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}