"use client";

import React, { useState, useEffect } from 'react';
import { Card, Button, Badge } from '@hive/ui';
import { 
  Compass,
  MapPin,
  Calendar,
  Users,
  Wrench,
  Star,
  Clock,
  ArrowRight,
  Plus,
  Settings,
  Zap,
  TrendingUp,
  Search,
  Filter,
  Eye,
  Heart
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import { formatDistanceToNow, parseISO, format } from 'date-fns';

interface DiscoveryItem {
  id: string;
  type: 'space' | 'event' | 'tool' | 'person' | 'opportunity';
  title: string;
  description: string;
  relevanceScore: number;
  category: string;
  metadata: {
    memberCount?: number;
    eventDate?: string;
    location?: string;
    creatorName?: string;
    tags?: string[];
    requirements?: string[];
  };
  actionLabel: string;
  isNew: boolean;
  isTrending: boolean;
  matchReason: string;
}

interface CampusDiscoveryCardProps {
  settings?: Record<string, any>;
  isEditMode?: boolean;
  className?: string;
}

export function CampusDiscoveryCard({ settings, isEditMode, className }: CampusDiscoveryCardProps) {
  const router = useRouter();
  const [discoveries, setDiscoveries] = useState<DiscoveryItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'spaces' | 'events' | 'tools' | 'people'>('all');

  useEffect(() => {
    fetchDiscoveries();
  }, []);

  const fetchDiscoveries = async () => {
    try {
      const response = await fetch('/api/spaces/discovery');
      if (response.ok) {
        const data = await response.json();
        // The API should return discovery items, but let's handle both formats
        let discoveryItems: DiscoveryItem[] = [];
        
        if (data.discoveries) {
          discoveryItems = data.discoveries;
        } else if (data.spaces) {
          // Map spaces to discovery items
          discoveryItems = data.spaces.map((space: any) => ({
            id: space.id,
            type: 'space' as const,
            title: space.name,
            description: space.description || 'Join this campus community',
            relevanceScore: space.relevanceScore || 75,
            category: space.type || 'Community',
            metadata: {
              memberCount: space.memberCount,
              tags: space.tags || [],
              creatorName: space.creatorName
            },
            actionLabel: 'Join Space',
            isNew: space.isNew || false,
            isTrending: space.isTrending || false,
            matchReason: space.matchReason || 'Recommended for you based on your interests'
          }));
        }
        
        setDiscoveries(discoveryItems);
      }
    } catch (error) {
      console.error('Error fetching discoveries:', error);
      // Mock data for development
      setDiscoveries([
        {
          id: '1',
          type: 'space',
          title: 'UB Startup Incubator',
          description: 'Connect with fellow entrepreneurs and build the next big thing',
          relevanceScore: 92,
          category: 'Entrepreneurship',
          metadata: {
            memberCount: 68,
            tags: ['startup', 'entrepreneurship', 'networking'],
            creatorName: 'Alex Chen'
          },
          actionLabel: 'Join Space',
          isNew: true,
          isTrending: true,
          matchReason: 'Based on your interest in app development and HIVE Builders activity'
        },
        {
          id: '2',
          type: 'event',
          title: 'AI/ML Study Session',
          description: 'Weekly deep dive into machine learning concepts and applications',
          relevanceScore: 88,
          category: 'Computer Science',
          metadata: {
            eventDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(),
            location: 'Davis Hall 101',
            memberCount: 24,
            tags: ['machine-learning', 'AI', 'study-group']
          },
          actionLabel: 'RSVP',
          isNew: false,
          isTrending: true,
          matchReason: 'You\'re in Computer Science and have shown interest in ML topics'
        },
        {
          id: '3',
          type: 'tool',
          title: 'Course Schedule Optimizer',
          description: 'Smart tool to help plan your semester schedule with conflict detection',
          relevanceScore: 85,
          category: 'Academic Tools',
          metadata: {
            creatorName: 'Sarah Kim',
            tags: ['scheduling', 'academic', 'productivity'],
            requirements: ['Student access']
          },
          actionLabel: 'Try Tool',
          isNew: true,
          isTrending: false,
          matchReason: 'Popular among Computer Science students like you'
        },
        {
          id: '4',
          type: 'person',
          title: 'Jessica Liu',
          description: 'CS Senior, React enthusiast, looking for project collaborators',
          relevanceScore: 82,
          category: 'Study Partner',
          metadata: {
            tags: ['React', 'frontend', 'senior-project'],
            creatorName: 'Jessica Liu'
          },
          actionLabel: 'Connect',
          isNew: false,
          isTrending: false,
          matchReason: 'Shares 3 classes with you and has similar interests'
        },
        {
          id: '5',
          type: 'opportunity',
          title: 'Floor Representative Position',
          description: 'Lead your floor community and organize events for residents',
          relevanceScore: 78,
          category: 'Leadership',
          metadata: {
            location: 'Ellicott Red',
            requirements: ['Floor resident', 'Leadership experience preferred'],
            tags: ['leadership', 'community', 'residential']
          },
          actionLabel: 'Apply',
          isNew: true,
          isTrending: false,
          matchReason: 'You\'ve shown leadership in your current spaces'
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'space': return Users;
      case 'event': return Calendar;
      case 'tool': return Wrench;
      case 'person': return Heart;
      case 'opportunity': return Star;
      default: return Compass;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'space': return 'text-blue-400';
      case 'event': return 'text-green-400';
      case 'tool': return 'text-[var(--hive-gold)]';
      case 'person': return 'text-pink-400';
      case 'opportunity': return 'text-[var(--hive-gold)]';
      default: return 'text-muted-foreground';
    }
  };

  const getRelevanceColor = (score: number) => {
    if (score >= 90) return 'text-green-400 bg-green-500/20 border-green-500/30';
    if (score >= 80) return 'text-[var(--hive-gold)] bg-[var(--hive-gold)]/20 border-[var(--hive-gold)]/30';
    if (score >= 70) return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
    return 'text-muted-foreground bg-muted/20 border-muted/30';
  };

  const filteredDiscoveries = discoveries.filter(item => {
    if (filter === 'all') return true;
    if (filter === 'spaces') return item.type === 'space';
    if (filter === 'events') return item.type === 'event';
    if (filter === 'tools') return item.type === 'tool';
    if (filter === 'people') return item.type === 'person' || item.type === 'opportunity';
    return true;
  }).sort((a, b) => b.relevanceScore - a.relevanceScore);

  if (isLoading) {
    return (
      <Card className={`p-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-4 bg-muted rounded w-1/2 mb-4"></div>
          <div className="space-y-3">
            <div className="h-3 bg-muted rounded w-3/4"></div>
            <div className="h-3 bg-muted rounded w-1/2"></div>
            <div className="h-3 bg-muted rounded w-5/6"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={`p-6 relative ${className}`}>
      {/* Edit Mode Indicator */}
      {isEditMode && (
        <div className="absolute top-2 right-2 opacity-50">
          <Settings className="h-4 w-4 text-muted-foreground" />
        </div>
      )}

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Compass className="h-5 w-5 text-accent" />
          <h3 className="font-semibold text-foreground">Campus Discovery</h3>
        </div>
        
        {!isEditMode && (
          <div className="flex items-center gap-1">
            <Filter className="h-4 w-4 text-muted-foreground" />
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      {!isEditMode && (
        <div className="flex items-center gap-1 mb-4">
          {(['all', 'spaces', 'events', 'tools', 'people'] as const).map((filterType) => (
            <button
              key={filterType}
              onClick={() => setFilter(filterType)}
              className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                filter === filterType 
                  ? 'bg-accent text-accent-foreground' 
                  : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              }`}
            >
              {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
            </button>
          ))}
        </div>
      )}

      {/* Discovery Items */}
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {filteredDiscoveries.slice(0, 4).map((item) => {
          const TypeIcon = getTypeIcon(item.type);
          return (
            <div
              key={item.id}
              className={`p-3 rounded-lg border border-border/50 hover:border-border transition-all group ${
                isEditMode ? 'pointer-events-none opacity-70' : 'cursor-pointer'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center">
                  <TypeIcon className={`h-4 w-4 ${getTypeColor(item.type)}`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <h4 className="font-medium text-foreground text-sm truncate">
                        {item.title}
                      </h4>
                      {item.isNew && (
                        <Badge className="bg-accent/20 text-accent text-xs px-1.5 py-0.5">
                          New
                        </Badge>
                      )}
                      {item.isTrending && (
                        <TrendingUp className="h-3 w-3 text-green-400" />
                      )}
                    </div>
                    <Badge className={`text-xs border ${getRelevanceColor(item.relevanceScore)}`}>
                      {item.relevanceScore}%
                    </Badge>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                    {item.description}
                  </p>

                  {/* Metadata */}
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mb-2">
                    {item.metadata.memberCount && (
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {item.metadata.memberCount}
                      </span>
                    )}
                    {item.metadata.eventDate && (
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {format(parseISO(item.metadata.eventDate), 'MMM dd')}
                      </span>
                    )}
                    {item.metadata.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {item.metadata.location}
                      </span>
                    )}
                    {item.metadata.creatorName && (
                      <span className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {item.metadata.creatorName}
                      </span>
                    )}
                  </div>

                  {/* Match Reason */}
                  <p className="text-xs text-accent mb-3 italic">
                    {item.matchReason}
                  </p>

                  {/* Tags */}
                  {item.metadata.tags && item.metadata.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.metadata.tags.slice(0, 3).map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs px-2 py-0.5">
                          {tag}
                        </Badge>
                      ))}
                      {item.metadata.tags.length > 3 && (
                        <Badge variant="secondary" className="text-xs px-2 py-0.5">
                          +{item.metadata.tags.length - 3}
                        </Badge>
                      )}
                    </div>
                  )}

                  {/* Action Button */}
                  {!isEditMode && (
                    <div className="flex items-center justify-between">
                      <Button 
                        size="sm" 
                        variant="outline"
                        className="text-xs"
                      >
                        {item.actionLabel}
                      </Button>
                      <ArrowRight className="h-3 w-3 text-muted-foreground group-hover:text-foreground transition-colors" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredDiscoveries.length === 0 && (
        <div className="text-center py-6 text-muted-foreground">
          <Compass className="h-8 w-8 mx-auto mb-2 opacity-50" />
          <p className="text-sm">No discoveries found</p>
          <p className="text-xs mt-1">
            Check back later for personalized recommendations
          </p>
        </div>
      )}

      {/* Discovery Stats */}
      {!isEditMode && discoveries.length > 0 && (
        <div className="grid grid-cols-3 gap-3 mt-4 pt-4 border-t border-border/50">
          <div className="text-center">
            <div className="text-lg font-bold text-accent">
              {discoveries.filter(d => d.isNew).length}
            </div>
            <div className="text-xs text-muted-foreground">New</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">
              {discoveries.filter(d => d.isTrending).length}
            </div>
            <div className="text-xs text-muted-foreground">Trending</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">
              {Math.round(discoveries.reduce((acc, d) => acc + d.relevanceScore, 0) / discoveries.length)}%
            </div>
            <div className="text-xs text-muted-foreground">Avg Match</div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      {!isEditMode && (
        <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border/50">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1"
          >
            <Search className="h-3 w-3 mr-2" />
            Explore More
          </Button>
          
          <Button 
            variant="outline" 
            size="sm"
            title="Refresh discoveries"
          >
            <Zap className="h-3 w-3" />
          </Button>
        </div>
      )}

      {/* Personalization Notice */}
      {!isEditMode && (
        <p className="text-xs text-muted-foreground mt-3 text-center">
          Discoveries are personalized based on your interests and campus activity
        </p>
      )}
    </Card>
  );
}