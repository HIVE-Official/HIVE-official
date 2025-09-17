"use client";

import { useState, useEffect } from 'react';
import { logger } from '@/lib/logger';

import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { 
  Search,
  Filter,
  TrendingUp,
  Users,
  Eye,
  Heart,
  Share,
  Plus,
  Star,
  Calendar,
  BarChart3,
  ExternalLink,
  Zap,
  Award,
  Clock,
  ThumbsUp
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@hive/ui';

// Hooks
import { useUnifiedAuth } from '@hive/ui';

// Types
interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'polls' | 'signups' | 'forms' | 'resources' | 'coordination';
  visibility: 'public' | 'space' | 'private';
  status: 'draft' | 'active' | 'archived';
  createdAt: string;
  createdBy: string;
  creatorName: string;
  creatorHandle: string;
  spaceId?: string;
  spaceName?: string;
  stats: {
    views: number;
    submissions: number;
    shares: number;
    uniqueUsers: number;
    likes: number;
  };
  tags?: string[];
  featured?: boolean;
  trending?: boolean;
}

const TOOL_CATEGORIES = {
  polls: { 
    name: 'Polls & Voting', 
    icon: BarChart3, 
    color: 'from-blue-500 to-indigo-600',
    description: 'Collect opinions and make group decisions'
  },
  signups: { 
    name: 'Sign-up Sheets', 
    icon: Users, 
    color: 'from-green-500 to-emerald-600',
    description: 'Organize events and collect RSVPs'
  },
  forms: { 
    name: 'Data Collection', 
    icon: ExternalLink, 
    color: 'from-[var(--hive-gold)] to-violet-600',
    description: 'Gather information and feedback'
  },
  resources: { 
    name: 'Resource Sharing', 
    icon: ExternalLink, 
    color: 'from-[var(--hive-gold)] to-amber-600',
    description: 'Share links, files, and materials'
  },
  coordination: { 
    name: 'Event Coordination', 
    icon: Calendar, 
    color: 'from-pink-500 to-rose-600',
    description: 'Plan and coordinate group activities'
  }
};

export default function BrowseToolsPage() {
  const { user } = useUnifiedAuth();
  const router = useRouter();
  
  const [tools, setTools] = useState<Tool[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'popular' | 'recent' | 'trending'>('popular');
  const [activeTab, setActiveTab] = useState<'all' | 'featured' | 'trending'>('all');

  useEffect(() => {
    fetchTools();
  }, []);

  const fetchTools = async () => {
    try {
      // Fetch tools from Firebase via API
      const response = await fetch('/api/tools/browse', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tools');
      }

      const data = await response.json();
      
      // Transform Firebase data to match Tool interface
      const transformedTools: Tool[] = data.tools?.map((tool: any) => ({
        id: tool.id,
        name: tool.name || 'Untitled Tool',
        description: tool.description || '',
        category: tool.category || 'forms',
        visibility: tool.visibility || 'public',
        status: tool.status || 'active',
        createdAt: tool.createdAt || new Date().toISOString(),
        createdBy: tool.createdBy || tool.authorId || '',
        creatorName: tool.creatorName || tool.authorName || 'Anonymous',
        creatorHandle: tool.creatorHandle || tool.authorHandle || 'anonymous',
        spaceId: tool.spaceId,
        spaceName: tool.spaceName,
        stats: {
          views: tool.stats?.views || 0,
          submissions: tool.stats?.submissions || tool.stats?.uses || 0,
          shares: tool.stats?.shares || 0,
          uniqueUsers: tool.stats?.uniqueUsers || tool.stats?.users || 0,
          likes: tool.stats?.likes || 0
        },
        tags: tool.tags || [],
        featured: tool.featured || false,
        trending: tool.trending || false
      })) || [];

      setTools(transformedTools);
    } catch (error) {
      logger.error('Error fetching tools:', { error: String(error) });
      // Set empty array on error - no fallback to mock data
      setTools([]);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredTools = tools.filter(tool => {
    if (activeTab === 'featured' && !tool.featured) return false;
    if (activeTab === 'trending' && !tool.trending) return false;
    if (categoryFilter !== 'all' && tool.category !== categoryFilter) return false;
    if (searchQuery && 
        !tool.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !tool.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !tool.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))) return false;
    return true;
  });

  const sortedTools = [...filteredTools].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return (b.stats.views + b.stats.submissions + b.stats.likes) - (a.stats.views + a.stats.submissions + a.stats.likes);
      case 'recent':
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      case 'trending':
        return (b.stats.shares + b.stats.likes) - (a.stats.shares + a.stats.likes);
      default:
        return 0;
    }
  });

  const renderToolCard = (tool: Tool) => {
    const CategoryIcon = TOOL_CATEGORIES[tool.category].icon;
    const category = TOOL_CATEGORIES[tool.category];
    
    return (
      <motion.div
        key={tool.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <Card 
          className="h-full hover:border-accent/50 transition-all cursor-pointer group relative"
          onClick={() => router.push(`/tools/${tool.id}`)}
        >
          {/* Featured/Trending Badges */}
          <div className="absolute top-3 right-3 flex gap-1 z-10">
            {tool.featured && (
              <Badge className="bg-[var(--hive-gold)]/20 text-[var(--hive-gold)] border-[var(--hive-gold)]/30">
                <Star className="h-3 w-3 mr-1" />
                Featured
              </Badge>
            )}
            {tool.trending && (
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                <TrendingUp className="h-3 w-3 mr-1" />
                Trending
              </Badge>
            )}
          </div>

          <CardHeader className="pb-3">
            <div className="flex items-start gap-3">
              <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} flex-shrink-0`}>
                <CategoryIcon className="h-5 w-5 text-[var(--hive-text-inverse)]" />
              </div>
              
              <div className="flex-1 min-w-0">
                <CardTitle className="text-base mb-2 line-clamp-2 pr-16">
                  {tool.name}
                </CardTitle>
                <p className="text-sm text-muted-foreground line-clamp-3 mb-3">
                  {tool.description}
                </p>
                
                {/* Creator */}
                <div className="flex items-center gap-2 mb-2">
                  <div className="text-xs text-muted-foreground">
                    by <span className="font-medium">{tool.creatorName}</span> (@{tool.creatorHandle})
                  </div>
                </div>

                {/* Tags */}
                {tool.tags && tool.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1 mb-3">
                    {tool.tags.slice(0, 3).map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs px-2 py-0">
                        {tag}
                      </Badge>
                    ))}
                    {tool.tags.length > 3 && (
                      <Badge variant="outline" className="text-xs px-2 py-0">
                        +{tool.tags.length - 3}
                      </Badge>
                    )}
                  </div>
                )}
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="pt-0">
            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Eye className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">{tool.stats.views.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">{tool.stats.submissions}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Heart className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">{tool.stats.likes}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Share className="h-3 w-3 text-muted-foreground" />
                <span className="text-muted-foreground">{tool.stats.shares}</span>
              </div>
            </div>

            {/* Category & Date */}
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <Badge variant="secondary" className={`${category.color.split(' ')[0]} text-xs`}>
                {category.name}
              </Badge>
              <span>{new Date(tool.createdAt).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-6">
          <div className="h-8 w-64 bg-muted rounded animate-pulse"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 9 }, (_, i) => (
              <div key={i} className="h-80 bg-muted rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Browse Tools</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover tools built by the UB community to solve campus problems and coordinate activities
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-accent mb-1">{tools.length}</div>
          <div className="text-sm text-muted-foreground">Available Tools</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-green-400 mb-1">
            {tools.filter(t => t.featured).length}
          </div>
          <div className="text-sm text-muted-foreground">Featured</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-foreground mb-1">
            {tools.reduce((sum, tool) => sum + tool.stats.submissions, 0).toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Total Uses</div>
        </Card>
        <Card className="p-4 text-center">
          <div className="text-2xl font-bold text-foreground mb-1">
            {tools.reduce((sum, tool) => sum + tool.stats.uniqueUsers, 0).toLocaleString()}
          </div>
          <div className="text-sm text-muted-foreground">Active Users</div>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search tools by name, description, or tags..."
              value={searchQuery}
              onChange={(e: any) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="flex gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {Object.entries(TOOL_CATEGORIES).map(([key, category]) => (
                <SelectItem key={key} value={key}>{category.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sortBy} onValueChange={(value: any) => setSortBy(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most Popular</SelectItem>
              <SelectItem value="recent">Most Recent</SelectItem>
              <SelectItem value="trending">Trending</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={(value: any) => setActiveTab(value)} className="mb-6">
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-3">
          <TabsTrigger value="all">All Tools</TabsTrigger>
          <TabsTrigger value="featured">
            <Star className="h-4 w-4 mr-1" />
            Featured
          </TabsTrigger>
          <TabsTrigger value="trending">
            <TrendingUp className="h-4 w-4 mr-1" />
            Trending
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Create Tool CTA */}
      <Card className="mb-8 bg-gradient-to-r from-accent/10 to-accent/5 border-accent/20">
        <CardContent className="p-6 text-center">
          <div className="space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Zap className="h-6 w-6 text-accent" />
              <h3 className="text-lg font-semibold text-foreground">
                Have an idea for a tool?
              </h3>
            </div>
            <p className="text-muted-foreground max-w-md mx-auto">
              Create your own tool to help solve problems in your communities. It's easy and takes just a few minutes!
            </p>
            <Button 
              onClick={() => router.push('/tools/builder')}
              className="bg-gradient-to-r from-accent to-accent/80 hover:from-accent/90 hover:to-accent/70"
            >
              <Plus className="h-4 w-4 mr-2" />
              Create a Tool
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tools Grid */}
      <div className="space-y-6">
        {sortedTools.length === 0 ? (
          <Card className="p-12 text-center">
            <div className="space-y-4">
              <div className="h-16 w-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Search className="h-8 w-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No tools found
                </h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search terms or filters to find more tools
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('all');
                    setActiveTab('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedTools.map(renderToolCard)}
          </div>
        )}
      </div>

      {/* Load More */}
      {sortedTools.length > 0 && sortedTools.length >= 9 && (
        <div className="text-center mt-8">
          <Button variant="outline" size="lg">
            Load More Tools
          </Button>
        </div>
      )}
    </div>
  );
}