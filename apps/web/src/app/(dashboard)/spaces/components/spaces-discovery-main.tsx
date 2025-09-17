'use client';

import { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  GraduationCap,
  Home, 
  Crown,
  Users,
  Search,
  Filter,
  Plus,
  Sparkles,
  TrendingUp,
  Clock,
  MapPin,
  Hash,
  ChevronRight,
  Eye,
  Zap
} from 'lucide-react';

import { 
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Avatar,
  Input,
  Display,
  Typography,
  SearchBar,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@hive/ui';

import { useSession } from '@/hooks/use-session';
import { SpaceRequestModal } from './space-request-modal';
import { SpaceActivationModal } from './space-activation-modal';

// Space Categories with UB-specific context
const SPACE_CATEGORIES = [
  {
    id: 'university',
    name: 'UNI',
    title: 'University Spaces',
    description: 'Academic departments, courses, and official UB communities',
    icon: GraduationCap,
    color: 'from-blue-500 to-indigo-600',
    examples: ['CS Majors', 'CALC 101', 'Engineering School', 'Pre-Med Track']
  },
  {
    id: 'residential',
    name: 'REZ',
    title: 'Residential Life',
    description: 'Dorm communities, floor groups, and campus living',
    icon: Home,
    color: 'from-green-500 to-emerald-600',
    examples: ['Ellicott 3rd Floor', 'North Campus', 'Hadley Village', 'Creekside']
  },
  {
    id: 'greek',
    name: 'GREEK',
    title: 'Greek Life',
    description: 'Fraternities, sororities, and Greek organizations',
    icon: Crown,
    color: 'from-[var(--hive-gold)] to-violet-600',
    examples: ['Alpha Phi Alpha', 'Delta Gamma', 'IFC Council', 'Panhellenic']
  },
  {
    id: 'student',
    name: 'STUDENT',
    title: 'Student Spaces',
    description: 'Student-created communities, clubs, and interest groups',
    icon: Users,
    color: 'from-[var(--hive-gold)] to-red-600',
    examples: ['Study Groups', 'Gaming Club', 'Startup Squad', 'Photography Club']
  }
];

interface Space {
  id: string;
  name: string;
  description: string;
  category: string;
  type: string;
  status: 'active' | 'preview' | 'invite_only';
  memberCount: number;
  potentialMembers?: number;
  isJoined: boolean;
  isLeader: boolean;
  isVerified: boolean;
  lastActivity: string;
  leaders: Array<{
    id: string;
    name: string;
    avatar?: string;
  }>;
  stats: {
    toolsPlanted: number;
    eventsThisMonth: number;
    postsThisWeek: number;
  };
  requiredVerification?: {
    type: 'faculty_endorsement' | 'membership_proof' | 'leadership_election' | 'department_approval';
    description: string;
  };
}

export function SpacesDiscoveryMain() {
  const router = useRouter();
  const { session } = useSession();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [categoryStats, setCategoryStats] = useState<Record<string, {total: number, active: number}>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showRequestModal, setShowRequestModal] = useState(false);
  const [showActivationModal, setShowActivationModal] = useState(false);
  const [selectedSpaceForActivation, setSelectedSpaceForActivation] = useState<Space | null>(null);

  // Load spaces data
  useEffect(() => {
    const loadSpacesData = async () => {
      try {
        setIsLoading(true);
        
        // Fetch from discovery API (already exists)
        const response = await fetch('/api/spaces/discovery');
        if (!response.ok) throw new Error('Failed to fetch spaces');
        
        const data = await response.json();
        
        if (data.success) {
          setSpaces(data.spaces || []);
          
          // Calculate category stats
          const stats = data.spaces?.reduce((acc: any, space: any) => {
            const category = space.category || 'student';
            if (!acc[category]) acc[category] = { total: 0, active: 0 };
            acc[category].total++;
            if (space.status === 'active') acc[category].active++;
            return acc;
          }, {}) || {};
          
          setCategoryStats(stats);
        }
      } catch (error) {
        logger.error('Failed to load spaces:', { error: String(error) });
      } finally {
        setIsLoading(false);
      }
    };

    loadSpacesData();
  }, []);

  const filteredSpaces = spaces.filter(space => {
    const matchesSearch = searchQuery === '' || 
      space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = activeCategory === 'all' || space.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSpaceClick = (space: Space) => {
    router.push(`/spaces/${space.id}`);
  };

  const handleRequestSpace = () => {
    setShowRequestModal(true);
  };

  const handleActivateSpace = (space: Space) => {
    setSelectedSpaceForActivation(space);
    setShowActivationModal(true);
  };

  const handleActivationSuccess = (activatedSpace: Space) => {
    // Update the space in our local state
    setSpaces(prev => prev.map(s => 
      s.id === activatedSpace.id 
        ? { ...s, status: 'requested' as const }
        : s
    ));
    setShowActivationModal(false);
    setSelectedSpaceForActivation(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <Display size="large" className="text-foreground">
          HIVE Spaces
        </Display>
        <Typography size="large" color="medium" className="max-w-3xl mx-auto">
          Your entire University at Buffalo campus, pre-mapped and ready to activate.
          Join existing communities or claim leadership of dormant spaces.
        </Typography>
      </motion.div>

      {/* Search and Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col md:flex-row gap-4 items-center justify-between"
      >
        <div className="w-full md:w-96">
          <SearchBar
            placeholder="Search spaces, communities, departments..."
            value={searchQuery}
            onValueChange={setSearchQuery}
            onSearch={(query: any) => setSearchQuery(query)}
          />
        </div>
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}>
            {viewMode === 'grid' ? 'List View' : 'Grid View'}
          </Button>
          <Button variant="primary" onClick={handleRequestSpace}>
            <Plus className="h-4 w-4 mr-2" />
            Request New Space
          </Button>
        </div>
      </motion.div>

      {/* Category Overview Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <Card className="bg-gradient-to-r from-background/50 to-accent/5 border-accent/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-accent" />
              Your Campus Communities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {SPACE_CATEGORIES.map((category: any) => {
                const IconComponent = category.icon;
                const stats = categoryStats[category.id] || { total: 0, active: 0 };
                
                return (
                  <motion.div
                    key={category.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActiveCategory(category.id)}
                    className="cursor-pointer group"
                  >
                    <Card className={`border-2 transition-all duration-200 ${
                      activeCategory === category.id 
                        ? 'border-accent shadow-lg shadow-accent/25' 
                        : 'border-border hover:border-accent/50'
                    }`}>
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`h-10 w-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}>
                            <IconComponent className="h-5 w-5 text-[var(--hive-text-inverse)]" />
                          </div>
                          <div>
                            <div className="font-bold text-foreground">{category.name}</div>
                            <div className="text-xs text-muted-foreground">{category.title}</div>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Total Spaces</span>
                            <span className="font-semibold text-foreground">{stats.total}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-muted-foreground">Active</span>
                            <span className="font-semibold text-accent">{stats.active}</span>
                          </div>
                          
                          {/* Preview Examples */}
                          <div className="mt-3 text-xs text-muted-foreground">
                            <div className="flex flex-wrap gap-1">
                              {category.examples.slice(0, 2).map((example, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs py-0">
                                  {example}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <ChevronRight className={`h-4 w-4 mt-2 transition-transform ${
                          activeCategory === category.id ? 'rotate-90' : ''
                        } group-hover:translate-x-1`} />
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Category Filter Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="all" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">All</span>
            </TabsTrigger>
            {SPACE_CATEGORIES.map((category: any) => {
              const IconComponent = category.icon;
              return (
                <TabsTrigger key={category.id} value={category.id} className="flex items-center gap-2">
                  <IconComponent className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.name}</span>
                </TabsTrigger>
              );
            })}
          </TabsList>

          <TabsContent value="all" className="mt-6">
            <SpacesList 
              spaces={filteredSpaces}
              viewMode={viewMode}
              onSpaceClick={handleSpaceClick}
              onActivateSpace={handleActivateSpace}
              isLoading={isLoading}
            />
          </TabsContent>

          {SPACE_CATEGORIES.map((category: any) => (
            <TabsContent key={category.id} value={category.id} className="mt-6">
              <div className="mb-4">
                <Typography size="large" weight="semibold" className="mb-2">
                  {category.title}
                </Typography>
                <Typography color="medium">
                  {category.description}
                </Typography>
              </div>
              <SpacesList 
                spaces={filteredSpaces.filter(s => s.category === category.id)}
                viewMode={viewMode}
                onSpaceClick={handleSpaceClick}
                onActivateSpace={handleActivateSpace}
                isLoading={isLoading}
                category={category}
              />
            </TabsContent>
          ))}
        </Tabs>
      </motion.div>

      {/* Modals */}
      <SpaceRequestModal 
        isOpen={showRequestModal} 
        onClose={() => setShowRequestModal(false)} 
      />
      
      <SpaceActivationModal
        isOpen={showActivationModal}
        onClose={() => {
          setShowActivationModal(false);
          setSelectedSpaceForActivation(null);
        }}
        space={selectedSpaceForActivation}
        onSuccess={handleActivationSuccess}
      />
    </div>
  );
}

interface SpacesListProps {
  spaces: Space[];
  viewMode: 'grid' | 'list';
  onSpaceClick: (space: Space) => void;
  onActivateSpace: (space: Space) => void;
  isLoading: boolean;
  category?: typeof SPACE_CATEGORIES[0];
}

function SpacesList({ spaces, viewMode, onSpaceClick, onActivateSpace, isLoading, category }: SpacesListProps) {
  if (isLoading) {
    return (
      <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
        {[...Array(6)].map((_, i) => (
          <Card key={i} className="animate-pulse">
            <CardContent className="p-4">
              <div className="h-4 bg-accent rounded mb-2" />
              <div className="h-3 bg-accent/60 rounded mb-3" />
              <div className="flex gap-2">
                <div className="h-5 w-16 bg-accent/40 rounded" />
                <div className="h-5 w-20 bg-accent/40 rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (spaces.length === 0) {
    return (
      <Card className="text-center py-12">
        <CardContent>
          <Search className="h-8 w-8 mx-auto mb-4 text-muted-foreground" />
          <Typography size="large" weight="semibold" className="mb-2">
            No spaces found
          </Typography>
          <Typography color="medium" className="mb-4">
            Try adjusting your search or browse a different category
          </Typography>
          <Button variant="outline">
            Clear Filters
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={`grid gap-4 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
      {spaces.map((space, index) => (
        <SpaceCard 
          key={space.id} 
          space={space} 
          onClick={() => onSpaceClick(space)}
          onActivate={() => onActivateSpace(space)}
          delay={index * 0.05}
          viewMode={viewMode}
        />
      ))}
    </div>
  );
}

interface SpaceCardProps {
  space: Space;
  onClick: () => void;
  onActivate: () => void;
  delay: number;
  viewMode: 'grid' | 'list';
}

function SpaceCard({ space, onClick, onActivate, delay, viewMode }: SpaceCardProps) {
  const getStatusInfo = (status: string) => {
    switch (status) {
      case 'preview':
        return {
          badge: 'Preview Mode',
          variant: 'outline' as const,
          description: 'Waiting for student leader to activate'
        };
      case 'invite_only':
        return {
          badge: 'Invite Only', 
          variant: 'secondary' as const,
          description: 'Request access from leaders'
        };
      default:
        return {
          badge: 'Active',
          variant: 'default' as const,
          description: 'Join instantly'
        };
    }
  };

  const statusInfo = getStatusInfo(space.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      whileHover={{ y: -2 }}
    >
      <Card 
        className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-accent/10 border-border hover:border-accent/50 ${
          space.status === 'preview' ? 'bg-gradient-to-br from-background to-accent/5' : ''
        }`}
        onClick={onClick}
      >
        <CardContent className={`p-4 ${viewMode === 'list' ? 'flex items-center gap-4' : ''}`}>
          
          {/* Space Header */}
          <div className={viewMode === 'list' ? 'flex-1' : 'mb-4'}>
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Typography weight="semibold" className="text-foreground">
                    {space.name}
                  </Typography>
                  {space.status === 'preview' && (
                    <Eye className="h-4 w-4 text-muted-foreground" />
                  )}
                </div>
                <Typography size="small" color="medium" className="line-clamp-2">
                  {space.description}
                </Typography>
              </div>
            </div>

            {/* Status and Membership Info */}
            <div className="flex items-center gap-2 mb-3">
              <Badge variant={statusInfo.variant}>
                {statusInfo.badge}
              </Badge>
              {space.isJoined && (
                <Badge variant="outline" className="border-accent text-accent">
                  Joined
                </Badge>
              )}
              {space.isLeader && (
                <Badge variant="outline" className="border-[var(--hive-gold)] text-yellow-600">
                  Leader
                </Badge>
              )}
            </div>

            {/* Member Count */}
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              {space.status === 'preview' ? (
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{space.potentialMembers || 0} potential members</span>
                </div>
              ) : (
                <div className="flex items-center gap-1">
                  <Users className="h-4 w-4" />
                  <span>{space.memberCount} members</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{space.lastActivity}</span>
              </div>
            </div>
          </div>

          {/* Space Stats & Actions */}
          <div className={viewMode === 'list' ? 'flex items-center gap-4' : ''}>
            {space.status === 'active' && (
              <div className="grid grid-cols-3 gap-2 mb-3 text-center">
                <div>
                  <div className="text-sm font-semibold text-foreground">{space.stats.toolsPlanted}</div>
                  <div className="text-xs text-muted-foreground">Tools</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{space.stats.eventsThisMonth}</div>
                  <div className="text-xs text-muted-foreground">Events</div>
                </div>
                <div>
                  <div className="text-sm font-semibold text-foreground">{space.stats.postsThisWeek}</div>
                  <div className="text-xs text-muted-foreground">Posts</div>
                </div>
              </div>
            )}

            {/* Action Button */}
            <div className="flex justify-end">
              {space.status === 'preview' ? (
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="border-accent hover:bg-accent hover:text-accent-foreground"
                  onClick={(e: any) => {
                    e.stopPropagation();
                    onActivate();
                  }}
                >
                  <Zap className="h-3 w-3 mr-1" />
                  Claim Leadership
                </Button>
              ) : space.isJoined ? (
                <Button size="sm" variant="ghost" onClick={onClick}>
                  View Space
                </Button>
              ) : (
                <Button size="sm" variant="primary" onClick={onClick}>
                  {space.status === 'invite_only' ? 'Request Access' : 'Join Space'}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}