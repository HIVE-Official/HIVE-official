'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  TrendingUp,
  Users,
  Plus,
  Star,
  Clock,
  MapPin,
  Hash,
  Eye,
  EyeOff,
  Crown,
  Zap,
  BookOpen,
  Home,
  GraduationCap,
  Loader2
} from 'lucide-react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Button,
  Badge,
  Avatar,
  Input,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SearchBar,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@hive/ui';

// State Management
import { 
  useSpaces, 
  useJoinSpace, 
  useLeaveSpace,
  usePrefetchSpace,
  useHiveStore,
  useUIStore,
  useAuthStore
} from '@hive/hooks';

interface Space {
  id: string;
  name: string;
  description: string;
  type: 'university' | 'residential' | 'greek' | 'student';
  memberCount: number;
  isPrivate: boolean;
  isActive: boolean;
  tags: string[];
  bannerUrl?: string;
  recentActivity: number;
  leadersNeeded: boolean;
  isMember: boolean;
  metrics: {
    postCount: number;
    eventCount: number;
    toolCount: number;
    activeMembers: number;
  };
}

const SPACE_CATEGORIES = [
  {
    id: 'university',
    name: 'University',
    icon: GraduationCap,
    color: 'bg-blue-500',
    description: 'Academic departments, majors, and official university organizations'
  },
  {
    id: 'residential',
    name: 'Residential',
    icon: Home,
    color: 'bg-green-500',
    description: 'Dorm floors, residential halls, and campus living communities'
  },
  {
    id: 'greek',
    name: 'Greek Life',
    icon: Crown,
    color: 'bg-purple-500',
    description: 'Fraternities, sororities, and Greek organizations'
  },
  {
    id: 'student',
    name: 'Student Orgs',
    icon: Users,
    color: 'bg-orange-500',
    description: 'Clubs, societies, and student-run organizations'
  }
];

const SORT_OPTIONS = [
  { value: 'trending', label: 'Trending', icon: TrendingUp },
  { value: 'popular', label: 'Most Popular', icon: Users },
  { value: 'recent', label: 'Recently Active', icon: Clock },
  { value: 'new', label: 'Newest', icon: Plus },
];

export function EnhancedSpaceDiscoveryMigrated() {
  const router = useRouter();
  
  // Local UI state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState('trending');
  const [showFilters, setShowFilters] = useState(false);
  const [showPrivateSpaces, setShowPrivateSpaces] = useState(false);
  
  // Global state
  const { profile } = useAuthStore();
  const { addToast } = useUIStore();
  
  // React Query hooks
  const { data: spaces, isLoading, error, refetch } = useSpaces();
  const joinSpace = useJoinSpace();
  const leaveSpace = useLeaveSpace();
  const prefetchSpace = usePrefetchSpace();

  // Filter and sort spaces
  const filteredSpaces = spaces?.filter((space: Space) => {
    const matchesSearch = searchQuery === '' || 
      space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'all' || space.type === selectedCategory;
    const matchesPrivacy = showPrivateSpaces || !space.isPrivate;
    
    return matchesSearch && matchesCategory && matchesPrivacy;
  }).sort((a: Space, b: Space) => {
    switch (sortBy) {
      case 'popular':
        return b.memberCount - a.memberCount;
      case 'recent':
        return b.recentActivity - a.recentActivity;
      case 'new':
        return new Date(b.id).getTime() - new Date(a.id).getTime();
      case 'trending':
      default:
        return (b.recentActivity * b.memberCount) - (a.recentActivity * a.memberCount);
    }
  }) || [];

  const handleJoinSpace = async (space: Space) => {
    joinSpace.mutate(space.id, {
      onSuccess: () => {
        addToast({
          title: 'Joined Space!',
          description: `Welcome to ${space.name}`,
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

  const handleLeaveSpace = async (space: Space) => {
    leaveSpace.mutate(space.id, {
      onSuccess: () => {
        addToast({
          title: 'Left Space',
          description: `You have left ${space.name}`,
          type: 'info',
        });
      },
    });
  };

  // SpaceCard component with optimistic updates
  const SpaceCard = ({ space }: { space: Space }) => {
    const isJoining = joinSpace.isPending && joinSpace.variables === space.id;
    const isLeaving = leaveSpace.isPending && leaveSpace.variables === space.id;
    const isProcessing = isJoining || isLeaving;

    return (
      <motion.div
        layout
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
                  {space.isPrivate && (
                    <EyeOff className="h-4 w-4 text-muted-foreground" />
                  )}
                  {space.leadersNeeded && (
                    <Badge variant="secondary" className="text-xs">
                      Leaders Needed
                    </Badge>
                  )}
                </CardTitle>
                <CardDescription className="line-clamp-2">
                  {space.description}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Category & Stats */}
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="capitalize">
                  {space.type.replace('_', ' ')}
                </Badge>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <Users className="h-3 w-3" />
                  <span>{space.memberCount}</span>
                </div>
              </div>

              {/* Tags */}
              {space.tags.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {space.tags.slice(0, 3).map((tag, index) => (
                    <Badge key={index} variant="secondary" className="text-xs">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              )}

              {/* Metrics */}
              <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Hash className="h-3 w-3" />
                  <span>{space.metrics.postCount}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  <span>{space.metrics.eventCount}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Zap className="h-3 w-3" />
                  <span>{space.metrics.toolCount}</span>
                </div>
              </div>

              {/* Action Button */}
              <Button
                onClick={() => 
                  space.isMember 
                    ? handleLeaveSpace(space)
                    : handleJoinSpace(space)
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
                  <>
                    {space.isMember ? (
                      <>
                        <Star className="mr-2 h-3 w-3" />
                        Joined
                      </>
                    ) : (
                      <>
                        <Plus className="mr-2 h-3 w-3" />
                        Join Space
                      </>
                    )}
                  </>
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
          <p className="text-muted-foreground">Discovering spaces...</p>
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold">Discover Spaces</h1>
          <p className="text-muted-foreground">
            Find and join campus communities that match your interests
          </p>
        </div>
        <Button onClick={() => router.push('/spaces/create')}>
          <Plus className="mr-2 h-4 w-4" />
          Create Space
        </Button>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search spaces, tags, or descriptions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Advanced Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-4 p-4 border rounded-lg bg-muted/10"
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {SPACE_CATEGORIES.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Sort Filter */}
                <div>
                  <label className="text-sm font-medium">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SORT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Privacy Filter */}
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="showPrivate"
                    checked={showPrivateSpaces}
                    onChange={(e) => setShowPrivateSpaces(e.target.checked)}
                  />
                  <label htmlFor="showPrivate" className="text-sm">
                    Show private spaces
                  </label>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Found {filteredSpaces.length} spaces
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {filteredSpaces.map((space) => (
              <SpaceCard key={space.id} space={space} />
            ))}
          </AnimatePresence>
        </div>

        {filteredSpaces.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No spaces match your criteria</p>
            <Button 
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
                setShowPrivateSpaces(false);
              }}
              variant="link"
              className="mt-2"
            >
              Clear filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}