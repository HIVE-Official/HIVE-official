'use client';

import { useState, useEffect } from 'react';
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
  GraduationCap
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
    description: 'Dorms, residence halls, and campus living communities'
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
    description: 'Clubs, societies, and student-led organizations'
  }
];

export function EnhancedSpaceDiscovery() {
  const router = useRouter();
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [filteredSpaces, setFilteredSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'name'>('popular');
  const [showJoinModal, setShowJoinModal] = useState<Space | null>(null);

  // Fetch spaces from API
  useEffect(() => {
    async function fetchSpaces() {
      try {
        const response = await fetch('/api/spaces');
        if (response.ok) {
          const data = await response.json();
          setSpaces(data.spaces || []);
        }
      } catch (error) {
        console.error('Failed to fetch spaces:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSpaces();
  }, []);

  // Filter and search spaces
  useEffect(() => {
    let filtered = spaces;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(space => space.type === selectedCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(space =>
        space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        space.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort spaces
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.memberCount - a.memberCount);
        break;
      case 'recent':
        filtered.sort((a, b) => b.recentActivity - a.recentActivity);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
    }

    setFilteredSpaces(filtered);
  }, [spaces, searchQuery, selectedCategory, sortBy]);

  const joinSpace = async (spaceId: string) => {
    try {
      const response = await fetch('/api/spaces/join', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spaceId })
      });

      if (response.ok) {
        // Update space member count locally
        setSpaces(prev => 
          prev.map(space => 
            space.id === spaceId 
              ? { ...space, memberCount: space.memberCount + 1 }
              : space
          )
        );
        setShowJoinModal(null);
      }
    } catch (error) {
      console.error('Failed to join space:', error);
    }
  };

  const requestLeadership = async (spaceId: string) => {
    try {
      const response = await fetch('/api/spaces/request-to-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spaceId })
      });

      if (response.ok) {
        // Handle success (show confirmation)
        setShowJoinModal(null);
      }
    } catch (error) {
      console.error('Failed to request leadership:', error);
    }
  };

  const getSpaceIcon = (type: string) => {
    const category = SPACE_CATEGORIES.find(cat => cat.id === type);
    const IconComponent = category?.icon || Users;
    return <IconComponent className="h-5 w-5" />;
  };

  const getSpaceColor = (type: string) => {
    const category = SPACE_CATEGORIES.find(cat => cat.id === type);
    return category?.color || 'bg-gray-500';
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="h-8 bg-gray-200 rounded w-48 animate-pulse" />
          <div className="h-10 bg-gray-200 rounded w-32 animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-64 bg-gray-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold">Campus Spaces</h1>
          <p className="text-muted-foreground">
            Discover and join communities across UB campus
          </p>
        </div>
        <Button onClick={() => router.push('/spaces/create')}>
          <Plus className="h-4 w-4 mr-2" />
          Create Space
        </Button>
      </div>

      {/* Category Overview */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {SPACE_CATEGORIES.map((category) => {
          const categorySpaces = spaces.filter(space => space.type === category.id);
          const IconComponent = category.icon;
          
          return (
            <Card 
              key={category.id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedCategory(category.id)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg ${category.color} text-[var(--hive-text-inverse)]`}>
                    <IconComponent className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold">{category.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {categorySpaces.length} spaces
                    </div>
                  </div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {category.description}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Filters and Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <SearchBar
                placeholder="Search spaces by name, description, or tags..."
                value={searchQuery}
                onChange={setSearchQuery}
              />
            </div>
            <div className="flex gap-2">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-40">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {SPACE_CATEGORIES.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy as any}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="popular">Popular</SelectItem>
                  <SelectItem value="recent">Recent</SelectItem>
                  <SelectItem value="name">Name</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Spaces Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence>
          {filteredSpaces.map((space) => (
            <motion.div
              key={space.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="hover:shadow-lg transition-shadow cursor-pointer group">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`p-2 rounded-lg ${getSpaceColor(space.type)} text-[var(--hive-text-inverse)]`}>
                        {getSpaceIcon(space.type)}
                      </div>
                      <div>
                        <CardTitle className="text-lg group-hover:text-hive-accent transition-colors">
                          {space.name}
                        </CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {SPACE_CATEGORIES.find(cat => cat.id === space.type)?.name}
                          </Badge>
                          {space.isPrivate && (
                            <Badge variant="secondary">
                              <EyeOff className="h-3 w-3 mr-1" />
                              Private
                            </Badge>
                          )}
                          {space.leadersNeeded && (
                            <Badge variant="destructive">
                              <Crown className="h-3 w-3 mr-1" />
                              Leader Needed
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-2">
                    {space.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="h-4 w-4" />
                        {space.memberCount}
                      </div>
                      <div className="flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        {space.metrics.postCount}
                      </div>
                      <div className="flex items-center gap-1">
                        <Zap className="h-4 w-4" />
                        {space.metrics.toolCount}
                      </div>
                    </div>
                    {space.isActive && (
                      <Badge variant="outline" className="text-green-600 border-green-600">
                        <div className="w-2 h-2 bg-green-600 rounded-full mr-1" />
                        Active
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      className="flex-1"
                      variant={space.leadersNeeded ? "default" : "outline"}
                      onClick={() => setShowJoinModal(space)}
                    >
                      {space.leadersNeeded ? (
                        <>
                          <Crown className="h-4 w-4 mr-2" />
                          Claim Leadership
                        </>
                      ) : (
                        <>
                          <Plus className="h-4 w-4 mr-2" />
                          Join Space
                        </>
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => router.push(`/spaces/${space.id}`)}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>

                  {space.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {space.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          #{tag}
                        </Badge>
                      ))}
                      {space.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{space.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Empty State */}
      {filteredSpaces.length === 0 && !loading && (
        <Card>
          <CardContent className="text-center py-12">
            <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Spaces Found</h3>
            <p className="text-muted-foreground mb-4">
              Try adjusting your search criteria or create a new space
            </p>
            <Button onClick={() => router.push('/spaces/create')}>
              <Plus className="h-4 w-4 mr-2" />
              Create New Space
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Join/Claim Modal */}
      <Dialog open={!!showJoinModal} onOpenChange={() => setShowJoinModal(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {showJoinModal?.leadersNeeded ? 'Claim Leadership' : 'Join Space'}
            </DialogTitle>
            <DialogDescription>
              {showJoinModal?.leadersNeeded
                ? `Become a leader of ${showJoinModal?.name} and help activate this community.`
                : `Join ${showJoinModal?.name} and connect with ${showJoinModal?.memberCount} other members.`
              }
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="flex items-center gap-3 mb-4">
              <div className={`p-3 rounded-lg ${getSpaceColor(showJoinModal?.type || '')} text-[var(--hive-text-inverse)]`}>
                {getSpaceIcon(showJoinModal?.type || '')}
              </div>
              <div>
                <div className="font-semibold">{showJoinModal?.name}</div>
                <div className="text-sm text-muted-foreground">
                  {showJoinModal?.description}
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowJoinModal(null)}>
              Cancel
            </Button>
            <Button
              onClick={() => {
                if (showJoinModal?.leadersNeeded) {
                  requestLeadership(showJoinModal.id);
                } else {
                  joinSpace(showJoinModal?.id || '');
                }
              }}
            >
              {showJoinModal?.leadersNeeded ? 'Request Leadership' : 'Join Space'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}