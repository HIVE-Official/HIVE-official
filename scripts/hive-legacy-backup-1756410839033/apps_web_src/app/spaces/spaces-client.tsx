"use client";

import { useState, useEffect } from 'react';
import { AppLayout } from "@/components/layout/AppLayout";
import { SpaceCard, SpaceCardPreview, SpaceActivationRequestForm } from "@hive/ui";
import { ButtonEnhanced } from "@hive/ui";
import { InputEnhanced } from "@hive/ui";
import { Badge } from "@hive/ui";
import { Dialog, DialogContent, DialogOverlay } from "@hive/ui";
import { 
  Search, 
  Filter, 
  Sparkles,
  Users,
  Star,
  GraduationCap,
  Building,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Space {
  id: string;
  name: string;
  description: string;
  type: 'campus_living' | 'fraternity_and_sorority' | 'hive_exclusive' | 'student_organizations' | 'university_organizations';
  memberCount: number;
  potentialMembers?: number; // For preview mode spaces
  isVerified: boolean;
  leaders: string[];
  members: string[];
  status?: 'active' | 'preview' | 'invite_only';
  anticipatedEvents?: number;
  keywords?: string[];
}

interface SpaceDiscoveryResponse {
  success: boolean;
  spaces: {
    campus_living: Space[];
    fraternity_and_sorority: Space[];
    hive_exclusive: Space[];
    student_organizations: Space[];
    university_organizations: Space[];
  };
  totalCount: number;
}

const spaceTypeConfig = {
  campus_living: {
    label: 'Residential',
    icon: Users,
    color: 'chip' as const,
    description: 'Dorms, residential halls, and housing communities'
  },
  fraternity_and_sorority: {
    label: 'Greek Life',
    icon: Star,
    color: 'accent' as const,
    description: 'Greek organizations and professional fraternities'
  },
  student_organizations: {
    label: 'Student Orgs',
    icon: Users,
    color: 'chip' as const,
    description: 'Student-led clubs, societies, and groups (including HIVE Lab)'
  },
  university_organizations: {
    label: 'Academic',
    icon: GraduationCap,
    color: 'chip' as const,
    description: 'Academic departments and university programs'
  },
  hive_exclusive: {
    label: 'Campus Innovation',
    icon: Sparkles,
    color: 'accent' as const,
    description: 'HIVE Lab and campus innovation spaces'
  },
};

export function SpacesClient() {
  const [spaces, setSpaces] = useState<SpaceDiscoveryResponse['spaces'] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSection, setSelectedSection] = useState<string | null>(null);
  const [showPreviewSpaces, setShowPreviewSpaces] = useState(true);
  const [activationRequestSpace, setActivationRequestSpace] = useState<Space | null>(null);

  // Fetch spaces from discovery API
  useEffect(() => {
    const fetchSpaces = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        if (searchQuery) params.append('search', searchQuery);
        if (selectedSection) params.append('section', selectedSection);
        
        const response = await fetch(`/api/spaces/discovery?${params}`);
        if (!response.ok) {
          throw new Error('Failed to fetch spaces');
        }
        
        const data: SpaceDiscoveryResponse = await response.json();
        if (data.success) {
          setSpaces(data.spaces);
        } else {
          // If no spaces are returned, use mock data for demonstration
          console.log('No spaces returned from API, using mock data');
          setSpaces(getMockSpaces());
        }
      } catch (err) {
        console.log('API error, using mock data:', err);
        // Fall back to mock data if API fails
        setSpaces(getMockSpaces());
      } finally {
        setLoading(false);
      }
    };

    fetchSpaces();
  }, [searchQuery, selectedSection]);

  const handleSpaceAction = async (spaceId: string, action: 'join' | 'request' | 'view') => {
    console.log(`Space ${spaceId}: ${action}`);
    
    if (action === 'request') {
      // Find the space and open activation request form
      const space = findSpaceById(spaceId);
      if (space) {
        setActivationRequestSpace(space);
      }
    } else if (action === 'join') {
      // TODO: Implement join functionality
      console.log(`Joining space ${spaceId}`);
    } else if (action === 'view') {
      // TODO: Navigate to space detail page
      console.log(`Viewing space ${spaceId}`);
    }
  };

  // Helper function to find a space by ID across all categories
  const findSpaceById = (spaceId: string): Space | null => {
    if (!spaces) return null;
    
    for (const categorySpaces of Object.values(spaces)) {
      const space = categorySpaces.find(s => s.id === spaceId);
      if (space) return space;
    }
    return null;
  };

  // Handle activation request submission
  const handleActivationRequest = async (data: {
    connection: string;
    connectionDetails?: string;
    reason: string;
    firstTool: string;
  }) => {
    if (!activationRequestSpace) return;

    try {
      const response = await fetch(`/api/spaces/${activationRequestSpace.id}/request-activation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit activation request');
      }

      const result = await response.json();
      console.log('Activation request submitted:', result);
      
      // The form will handle the success state and auto-close
    } catch (error) {
      console.error('Failed to submit activation request:', error);
      throw error; // Re-throw to let the form handle the error
    }
  };

  if (loading) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-background">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-12">
              <div className="animate-spin w-8 h-8 border-2 border-accent border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-muted">Discovering your campus communities...</p>
            </div>
          </main>
        </div>
      </AppLayout>
    );
  }

  if (error) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-background">
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center py-12">
              <p className="text-red-500 mb-4">Error loading spaces: {error}</p>
              <ButtonEnhanced onClick={() => window.location.reload()}>
                Try Again
              </ButtonEnhanced>
            </div>
          </main>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border bg-surface-01/50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-display font-bold text-foreground mb-4">
                Discover Your Campus
              </h1>
              <p className="text-lg text-muted font-sans max-w-2xl mx-auto">
                Find your people, join communities, and shape campus life at your university.
              </p>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted" />
                <InputEnhanced
                  placeholder="Search spaces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <ButtonEnhanced variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </ButtonEnhanced>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Section Filters */}
          <div className="flex flex-wrap items-center gap-2 mb-8">
            <ButtonEnhanced
              variant={selectedSection === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedSection(null)}
              className="gap-2"
            >
              <Building className="w-4 h-4" />
              All Spaces
            </ButtonEnhanced>
            {Object.entries(spaceTypeConfig).map(([key, config]) => {
              const IconComponent = config.icon;
              return (
                <ButtonEnhanced
                  key={key}
                  variant={selectedSection === key ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedSection(key)}
                  className="gap-2"
                >
                  <IconComponent className="w-4 h-4" />
                  {config.label}
                </ButtonEnhanced>
              );
            })}
            
            {/* Preview Mode Toggle */}
            <div className="flex items-center gap-2 ml-auto">
              <ButtonEnhanced
                variant={showPreviewSpaces ? "default" : "outline"}
                size="sm"
                onClick={() => setShowPreviewSpaces(!showPreviewSpaces)}
                className="gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Preview Mode
              </ButtonEnhanced>
            </div>
          </div>

          {/* Spaces by Category */}
          {spaces && Object.entries(spaces).map(([categoryKey, categorySpaces]) => {
            if (selectedSection && selectedSection !== categoryKey) return null;
            if (!categorySpaces?.length) return null;

            // Filter spaces based on preview mode toggle
            const filteredSpaces = categorySpaces.filter((space) => {
              if (!showPreviewSpaces && space.status === 'preview') return false;
              return true;
            });

            if (!filteredSpaces.length) return null;

            const config = spaceTypeConfig[categoryKey as keyof typeof spaceTypeConfig];
            const IconComponent = config.icon;

            return (
              <section key={categoryKey} className="mb-12">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-surface-02 border border-border rounded-lg flex items-center justify-center">
                    <IconComponent className={cn(
                      "w-4 h-4",
                      config.color === 'accent' ? 'text-accent' : 'text-foreground'
                    )} />
                  </div>
                  <div>
                    <h2 className="text-xl font-display font-semibold text-foreground">
                      {config.label}
                    </h2>
                    <p className="text-sm text-muted">{config.description}</p>
                  </div>
                  <Badge variant={config.color} className="ml-auto">
                    {filteredSpaces.length}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredSpaces.map((space) => {
                    // Use SpaceCardPreview for preview mode spaces
                    if (space.status === 'preview') {
                      return (
                        <SpaceCardPreview
                          key={space.id}
                          id={space.id}
                          name={space.name}
                          description={space.description}
                          type={mapSpaceTypeToCardType(space.type)}
                          potentialMembers={space.potentialMembers || 0}
                          anticipatedEvents={space.anticipatedEvents}
                          category={spaceTypeConfig[space.type as keyof typeof spaceTypeConfig].label}
                          keywords={space.keywords}
                          onRequestActivation={() => handleSpaceAction(space.id, 'request')}
                          onLearnMore={() => handleSpaceAction(space.id, 'view')}
                        />
                      );
                    }
                    
                    // Use regular SpaceCard for active spaces
                    return (
                      <SpaceCard
                        key={space.id}
                        id={space.id}
                        name={space.name}
                        description={space.description}
                        type={mapSpaceTypeToCardType(space.type)}
                        status={space.status || 'active'}
                        memberCount={space.memberCount}
                        upcomingEvents={space.anticipatedEvents}
                        leaders={[]} // TODO: Map from actual leaders
                        onJoin={() => handleSpaceAction(space.id, 'join')}
                        onRequestAccess={() => handleSpaceAction(space.id, 'request')}
                        onViewSpace={() => handleSpaceAction(space.id, 'view')}
                      />
                    );
                  })}
                </div>
              </section>
            );
          })}

          {/* Empty State */}
          {spaces && Object.values(spaces).every(category => !category?.length) && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-surface-02 border border-border rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-muted" />
              </div>
              <h3 className="text-lg font-display font-semibold text-foreground mb-2">
                No spaces found
              </h3>
              <p className="text-muted">
                {searchQuery ? 'Try adjusting your search terms' : 'Check back soon for new communities'}
              </p>
            </div>
          )}
        </main>
      </div>

      {/* Activation Request Modal */}
      <Dialog open={!!activationRequestSpace} onOpenChange={() => setActivationRequestSpace(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
          {activationRequestSpace && (
            <SpaceActivationRequestForm
              space={{
                id: activationRequestSpace.id,
                name: activationRequestSpace.name,
                category: mapSpaceTypeToCardType(activationRequestSpace.type),
                description: activationRequestSpace.description,
                potentialMembers: activationRequestSpace.potentialMembers || 0,
                rssEvents: [] // TODO: Add real RSS events when available
              }}
              onSubmit={handleActivationRequest}
              onCancel={() => setActivationRequestSpace(null)}
            />
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}

// Mock data for demonstration (will be replaced with real seeded data)
function getMockSpaces(): SpaceDiscoveryResponse['spaces'] {
  return {
    university_organizations: [
      {
        id: 'cs-dept',
        name: 'Computer Science Department',
        description: 'Official CS department space for announcements, resources, and academic discussions.',
        type: 'university_organizations',
        memberCount: 1247,
        isVerified: true,
        leaders: ['prof-smith'],
        members: [],
        status: 'active'
      },
      {
        id: 'engineering-school',
        name: 'School of Engineering',
        description: 'Connect with fellow engineering students across all disciplines.',
        type: 'university_organizations',
        memberCount: 2856,
        isVerified: true,
        leaders: ['dean-johnson'],
        members: [],
        status: 'active'
      },
      {
        id: 'math-dept-preview',
        name: 'Mathematics Department',
        description: 'Connect with math students, get help with problem sets, and discuss advanced topics.',
        type: 'university_organizations',
        memberCount: 0,
        potentialMembers: 892,
        isVerified: false,
        leaders: [],
        members: [],
        status: 'preview',
        anticipatedEvents: 5,
        keywords: ['calculus', 'linear algebra', 'study groups']
      }
    ],
    student_organizations: [
      {
        id: 'gaming-society',
        name: 'Gaming Society',
        description: 'For gamers by gamers. Weekly tournaments, LAN parties, and gaming discussions.',
        type: 'student_organizations',
        memberCount: 324,
        isVerified: true,
        leaders: ['student-alex'],
        members: [],
        status: 'active'
      },
      {
        id: 'debate-club',
        name: 'Debate Club',
        description: 'Sharpen your argumentative skills and engage in intellectual discourse.',
        type: 'student_organizations',
        memberCount: 78,
        isVerified: true,
        leaders: ['student-sarah'],
        members: [],
        status: 'active'
      },
      {
        id: 'hive-lab',
        name: 'HIVE Lab',
        description: 'Build custom tools for your spaces. Learn programming and create solutions that spread across campus.',
        type: 'student_organizations',
        memberCount: 42,
        isVerified: true,
        leaders: ['hive-team'],
        members: [],
        status: 'active'
      },
      {
        id: 'robotics-club-preview',
        name: 'Robotics Club',
        description: 'Build robots, compete in competitions, and learn about automation and AI.',
        type: 'student_organizations',
        memberCount: 0,
        potentialMembers: 156,
        isVerified: false,
        leaders: [],
        members: [],
        status: 'preview',
        anticipatedEvents: 8,
        keywords: ['arduino', 'programming', 'competitions', 'engineering']
      },
      {
        id: 'photography-club-preview',
        name: 'Photography Club',
        description: 'Capture campus life, learn new techniques, and share your artistic vision.',
        type: 'student_organizations',
        memberCount: 0,
        potentialMembers: 234,
        isVerified: false,
        leaders: [],
        members: [],
        status: 'preview',
        anticipatedEvents: 3,
        keywords: ['digital', 'portfolio', 'workshops', 'darkroom']
      }
    ],
    campus_living: [
      {
        id: 'north-campus',
        name: 'North Campus Residents',
        description: 'Connect with your neighbors, organize events, and build community.',
        type: 'campus_living',
        memberCount: 892,
        isVerified: true,
        leaders: ['ra-mike'],
        members: [],
        status: 'active'
      },
      {
        id: 'ellicott-complex',
        name: 'Ellicott Complex',
        description: 'The heart of freshman life at UB. Share resources and make friends.',
        type: 'campus_living',
        memberCount: 1156,
        isVerified: true,
        leaders: ['ra-jenny'],
        members: [],
        status: 'active'
      },
      {
        id: 'south-campus-preview',
        name: 'South Campus Community',
        description: 'Connect graduate students and upperclassmen living in South Campus.',
        type: 'campus_living',
        memberCount: 0,
        potentialMembers: 567,
        isVerified: false,
        leaders: [],
        members: [],
        status: 'preview',
        anticipatedEvents: 4,
        keywords: ['graduate', 'upperclassmen', 'quiet study']
      }
    ],
    fraternity_and_sorority: [
      {
        id: 'alpha-phi-alpha',
        name: 'Alpha Phi Alpha',
        description: 'Brotherhood, scholarship, and service since 1906.',
        type: 'fraternity_and_sorority',
        memberCount: 45,
        isVerified: true,
        leaders: ['brother-james'],
        members: [],
        status: 'invite_only'
      },
      {
        id: 'gamma-phi-beta-preview',
        name: 'Gamma Phi Beta',
        description: 'Building strong, confident women through sisterhood and philanthropy.',
        type: 'fraternity_and_sorority',
        memberCount: 0,
        potentialMembers: 89,
        isVerified: false,
        leaders: [],
        members: [],
        status: 'preview',
        anticipatedEvents: 6,
        keywords: ['sisterhood', 'philanthropy', 'leadership']
      }
    ],
    hive_exclusive: [
      {
        id: 'campus-builders',
        name: 'Campus Builders',
        description: 'For students building the future of campus life through technology and innovation.',
        type: 'hive_exclusive',
        memberCount: 23,
        isVerified: true,
        leaders: ['hive-team'],
        members: [],
        status: 'active'
      },
      {
        id: 'tool-creators-preview',
        name: 'Tool Creators Network',
        description: 'Connect with students who build custom tools and solutions for campus problems.',
        type: 'hive_exclusive',
        memberCount: 0,
        potentialMembers: 67,
        isVerified: false,
        leaders: [],
        members: [],
        status: 'preview',
        anticipatedEvents: 4,
        keywords: ['programming', 'innovation', 'entrepreneurship', 'campus solutions']
      }
    ]
  };
}

// Helper function to map API space types to card component types
function mapSpaceTypeToCardType(apiType: string): 'academic' | 'residential' | 'interest' | 'organization' | 'greek' {
  switch (apiType) {
    case 'campus_living':
      return 'residential';
    case 'fraternity_and_sorority':
      return 'greek';
    case 'university_organizations':
      return 'academic';
    case 'student_organizations':
      return 'organization';
    case 'hive_exclusive':
      return 'interest';
    default:
      return 'organization';
  }
}