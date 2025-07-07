'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, Button, Badge, Input } from '@hive/ui';
import { useOnboardingStore } from '@/lib/stores/onboarding';
import { Search, Users, GraduationCap, Building, Home, Heart, ChevronRight, CheckCircle, Loader2 } from 'lucide-react';
import { logger } from '@hive/core';

interface SpaceData {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  type: string;
  tags?: Array<{
    type: string;
    sub_type: string;
  }>;
  status: string;
}

interface SpacesResponse {
  success: boolean;
  spaces: {
    campus_living: SpaceData[];
    fraternity_and_sorority: SpaceData[];
    hive_exclusive: SpaceData[];
    student_organizations: SpaceData[];
    university_organizations: SpaceData[];
  };
  autoJoinSpaces: string[];
}

interface SpaceCategory {
  id: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  autoJoin?: boolean;
}

const SPACE_CATEGORIES: SpaceCategory[] = [
  {
    id: 'campus_living',
    title: 'Campus Living',
    description: 'Connect with your dorm, residence hall, or housing community',
    icon: Home,
  },
  {
    id: 'fraternity_and_sorority',
    title: 'Greek Life',
    description: 'Fraternities, sororities, and Greek organizations',
    icon: Heart,
  },
  {
    id: 'hive_exclusive',
    title: 'HIVE Exclusive',
    description: 'Special HIVE-curated spaces and communities',
    icon: GraduationCap,
  },
  {
    id: 'student_organizations',
    title: 'Student Organizations',
    description: 'Clubs, societies, and student-run groups',
    icon: Users,
  },
  {
    id: 'university_organizations',
    title: 'University Organizations',
    description: 'Official university departments and programs',
    icon: Building,
    autoJoin: true,
  }
];

export default function SpaceDiscoveryStep() {
  const router = useRouter();
  const { data: onboardingData, update: updateOnboardingData } = useOnboardingStore();
  
  const [spaces, setSpaces] = useState<SpacesResponse['spaces'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedSpaces, setSelectedSpaces] = useState<string[]>(onboardingData?.selectedSpaces ?? []);
  const [searchQuery, setSearchQuery] = useState('');
  const [autoJoinSpaces, setAutoJoinSpaces] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch spaces from API
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        const majors = onboardingData?.majors?.join(',') || '';
        const response = await fetch(`/api/spaces/onboarding-discovery?majors=${encodeURIComponent(majors)}`);
        
        if (!response.ok) {
          throw new Error('Failed to fetch spaces');
        }
        
        const data: SpacesResponse = await response.json();
        setSpaces(data.spaces);
        
                 // Auto-select university organization spaces based on user's majors
         if (onboardingData?.majors && data.spaces.university_organizations.length > 0) {
           const matchingAcademicSpaces = data.spaces.university_organizations
             .filter(space => 
               space.tags?.some(tag => 
                 onboardingData.majors?.some(major => 
                   major.toLowerCase().includes(tag.sub_type.toLowerCase()) ||
                   tag.sub_type.toLowerCase().includes(major.toLowerCase())
                 )
               )
             )
             .map(space => space.id);
          
          setAutoJoinSpaces(matchingAcademicSpaces);
          setSelectedSpaces(prev => [...new Set([...prev, ...matchingAcademicSpaces])]);
        }
        
      } catch (error) {
        logger.error('Failed to fetch spaces', { 
          error: error instanceof Error ? error : new Error(String(error))
        });
      } finally {
        setLoading(false);
      }
    };

         void fetchSpaces();
  }, [onboardingData?.majors]);

  const handleSpaceToggle = (spaceId: string) => {
    setSelectedSpaces(prev => 
      prev.includes(spaceId) 
        ? prev.filter(id => id !== spaceId)
        : [...prev, spaceId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Update onboarding data with selected spaces
      updateOnboardingData({
        selectedSpaces,
        autoJoinSpaces,
        spaceDiscoveryCompleted: true
      });

      logger.info('Space discovery completed', { 
        selectedSpaces: selectedSpaces.length,
        autoJoinSpaces: autoJoinSpaces.length 
      });

      // Navigate to display name step
      router.push('/onboarding/3');
    } catch (error) {
      logger.error('Failed to save space selections', { 
        error: error instanceof Error ? error : new Error(String(error))
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getFilteredSpaces = (categorySpaces: SpaceData[]) => {
    if (!searchQuery) return categorySpaces;
    
    return categorySpaces.filter(space =>
      space.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      space.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-accent" />
          <h2 className="text-xl font-semibold mb-2">Loading Spaces</h2>
          <p className="text-muted-foreground">Finding communities that match your interests...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-3">
          Discover Your Communities
        </h1>
        <p className="text-lg text-muted-foreground">
          Find and join spaces that match your interests and involvement on campus
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Auto-Join Section */}
        {autoJoinSpaces.length > 0 && (
          <Card className="p-6 border-accent/20 bg-accent/5">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-5 w-5 text-accent" />
              <h3 className="font-semibold text-foreground">Auto-Joining Based on Your Major</h3>
            </div>
            <div className="space-y-2">
              {spaces?.university_organizations
                .filter(space => autoJoinSpaces.includes(space.id))
                .map((space) => (
                  <div key={space.id} className="flex items-center justify-between p-3 bg-surface-02 rounded-lg">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-4 w-4 text-accent" />
                      <div>
                        <span className="font-medium">{space.name}</span>
                        <p className="text-sm text-muted-foreground">{space.memberCount} members</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="text-accent border-accent">
                      Auto-Joining
                    </Badge>
                  </div>
                ))}
            </div>
            <p className="text-sm text-muted-foreground mt-3">
              We&apos;ll automatically connect you with students in your academic programs
            </p>
          </Card>
        )}

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search for specific organizations or interests..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-surface-02 border-border/20"
          />
        </div>

        {/* Space Categories */}
        <div className="space-y-6">
          {SPACE_CATEGORIES.map((category) => {
            const Icon = category.icon;
            const categorySpaces = spaces?.[category.id as keyof typeof spaces] || [];
            const filteredSpaces = getFilteredSpaces(categorySpaces);
            
            if (filteredSpaces.length === 0) return null;
            
            return (
              <div key={category.id}>
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 rounded-lg bg-surface-03">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">{category.title}</h3>
                    <p className="text-sm text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                
                <div className="grid gap-3">
                  {filteredSpaces.slice(0, 6).map((space) => {
                    const isSelected = selectedSpaces.includes(space.id);
                    const isAutoJoin = autoJoinSpaces.includes(space.id);
                    
                    return (
                      <Card 
                        key={space.id}
                        className={`p-4 cursor-pointer transition-all hover:border-accent/40 ${
                          isSelected ? 'border-accent bg-accent/5' : 'border-border/20'
                        }`}
                        onClick={() => !isAutoJoin && handleSpaceToggle(space.id)}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3">
                              <h4 className="font-medium text-foreground">{space.name}</h4>
                              {isSelected && <CheckCircle className="h-4 w-4 text-accent" />}
                            </div>
                            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                              {space.description}
                            </p>
                            <div className="flex items-center gap-4 mt-2">
                              <span className="text-xs text-muted-foreground">
                                {space.memberCount} members
                              </span>
                              {isAutoJoin && (
                                <Badge variant="outline" className="text-xs text-accent border-accent">
                                  Auto-Join
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                  
                  {categorySpaces.length > 6 && (
                    <p className="text-sm text-muted-foreground text-center py-2">
                      +{categorySpaces.length - 6} more spaces available
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selection Summary */}
        {selectedSpaces.length > 0 && (
          <Card className="p-4 bg-surface-02">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">
                {selectedSpaces.length} space{selectedSpaces.length !== 1 ? 's' : ''} selected
              </span>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setSelectedSpaces(autoJoinSpaces)}
                className="text-muted-foreground hover:text-foreground"
              >
                Reset to auto-join only
              </Button>
            </div>
          </Card>
        )}

        {/* Navigation */}
        <div className="flex justify-between pt-6">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.push('/onboarding/1')}
            className="text-muted-foreground hover:text-foreground"
          >
            ← Back
          </Button>
          
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-foreground text-background hover:bg-foreground/90 font-medium px-8"
          >
            {isSubmitting ? 'Saving...' : 'Continue'}
            {!isSubmitting && <ChevronRight className="ml-2 h-4 w-4" />}
          </Button>
        </div>
      </form>
    </div>
  );
} 