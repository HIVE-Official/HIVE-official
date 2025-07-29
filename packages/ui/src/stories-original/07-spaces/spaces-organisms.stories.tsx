import { type Meta, type StoryObj } from '@storybook/react';
import { 
  HiveCard as Card, 
  HiveButton as Button, 
  Grid,
  CategoryGridOrganism as CategoryGrid,
  HeroSearchOrganism as HeroSearch,
  PersonalizationFeedOrganism as PersonalizationFeed,
  type UserSpace,
  type RecommendedSpace,
  type ActivityStats
} from '../../components';

const meta: Meta = {
  title: '07-Spaces/Organisms',
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'hive',
      values: [{ name: 'hive', value: 'var(--hive-background-primary)' }],
    },
    docs: {
      description: {
        component: `
**HIVE Spaces Organisms - Design System Options**

Comprehensive organism-level components for the HIVE spaces section. These organisms provide consistent, reusable patterns that can be composed to create discovery, browse, and management experiences.

## Available Organisms

### Discovery Organisms
- **HeroSearchOrganism**: Campus visualization + enhanced search
- **CategoryGridOrganism**: Filterable space categories
- **PersonalizationFeedOrganism**: My Spaces + recommendations

### Browse Organisms  
- **SpacesDiscoveryOrganism**: Complete discovery landing page
- **SpacesBrowseOrganism**: Advanced search and filtering
- **SpacesGridOrganism**: Standardized results display

## Design System Principles
- Built on existing HiveCard and PageContainer systems
- Uses semantic design tokens for consistency
- Modular composition for A/B testing and customization
- Responsive mobile-first design patterns
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

// Mock data for demonstrations
const mockUserSpaces: UserSpace[] = [
  { 
    id: '1', 
    name: 'Computer Science Majors', 
    description: 'Connect with fellow CS students',
    memberCount: 1248, 
    type: 'university_organizations',
    role: 'member',
    isActive: true
  },
  { 
    id: '2', 
    name: 'Campus Photography', 
    description: 'Capture campus life together',
    memberCount: 89, 
    type: 'student_organizations',
    role: 'admin',
    isActive: true
  },
  { 
    id: '3', 
    name: 'Alpha Beta Gamma', 
    description: 'Brotherhood and academic excellence',
    memberCount: 67, 
    type: 'greek_life',
    role: 'member',
    isActive: false
  },
];

const mockRecommendedSpaces: RecommendedSpace[] = [
  {
    id: 'rec1',
    name: 'AI/ML Research Group',
    description: 'Machine learning and artificial intelligence research',
    memberCount: 156,
    type: 'university_organizations',
    reason: 'Based on your CS major',
    confidence: 0.85
  },
  {
    id: 'rec2',
    name: 'Campus Sustainability',
    description: 'Environmental initiatives and green campus projects',
    memberCount: 234,
    type: 'student_organizations',
    reason: 'Popular with your connections',
    confidence: 0.72
  },
  {
    id: 'rec3',
    name: 'Student Government',
    description: 'Voice student concerns and shape campus policy',
    memberCount: 89,
    type: 'university_organizations',
    reason: 'Leadership interest match',
    confidence: 0.68
  }
];

const mockActivityStats: ActivityStats = {
  spacesJoined: 3,
  weeklyGrowth: 2,
  activeNow: 3,
  totalInteractions: 47,
  favoriteSpaces: 2
};

const categoryStats = {
  student_organizations: 120,
  university_organizations: 180,
  greek_life: 23,
  campus_living: 37,
};

// ===== OPTION 1: HERO SEARCH ORGANISM =====
export const HeroSearchOrganism: Story = {
  render: () => (
    <HeroSearch
      totalSpaces={360}
      categoryBreakdown={categoryStats}
      onSearch={(query) => console.log('Search:', query)}
      onBrowseAll={() => console.log('Browse All')}
      onTrending={() => console.log('Trending')}
      onMySpaces={() => console.log('My Spaces')}
      searchConfig={{
        placeholder: "Search spaces, organizations, communities...",
        showFilters: true,
        filterTags: ['Student Orgs', 'Greek Life', 'Academic', 'Sports', 'Arts', 'Tech']
      }}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: `
**HeroSearchOrganism** - Complete hero section with campus visualization and enhanced search capabilities.

**Features:**
- Animated campus visualization with interactive elements
- Enhanced search bar with filter capabilities  
- Quick action buttons for common paths
- Background ambient effects
- Responsive design with mobile optimization

**Use Cases:**
- Main spaces discovery landing page
- Marketing/onboarding hero sections
- Dashboard discovery widgets
        `,
      },
    },
  },
};

// ===== OPTION 2: CATEGORY GRID ORGANISM =====
export const CategoryGridOrganism: Story = {
  render: () => (
    <CategoryGrid
      categoryBreakdown={categoryStats}
      totalSpaces={360}
      onCategoryClick={(categoryId) => console.log('Category clicked:', categoryId)}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: `
**CategoryGridOrganism** - Standardized category display with consistent patterns.

**Features:**
- Animated icon patterns for each category type
- Liquid fill hover effects
- Consistent card structure with design system integration
- Real-time statistics display
- Responsive grid layout

**Use Cases:**
- Discovery page category sections
- Browse page filters
- Dashboard category widgets
- Landing page feature sections
        `,
      },
    },
  },
};

// ===== OPTION 3: PERSONALIZATION FEED ORGANISM =====
export const PersonalizationFeedOrganism: Story = {
  render: () => (
    <PersonalizationFeed
      mySpaces={mockUserSpaces}
      recommendedSpaces={mockRecommendedSpaces}
      activityStats={mockActivityStats}
      onSpaceClick={(spaceId) => console.log('Space clicked:', spaceId)}
      onRecommendationClick={(spaceId) => console.log('Recommendation clicked:', spaceId)}
      onJoinSpace={(spaceId) => console.log('Join space:', spaceId)}
      onBrowseSpaces={() => console.log('Browse spaces')}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: `
**PersonalizationFeedOrganism** - User-specific dashboard with recommendations and quick access.

**Features:**
- My active spaces with quick navigation
- AI-powered recommendations
- Personal activity statistics
- Role-based access indicators
- Liquid animation effects

**Use Cases:**
- Dashboard personalization sections
- User onboarding flows
- Profile page widgets
- Mobile app home screens
        `,
      },
    },
  },
};

// ===== VARIANTS AND CONFIGURATIONS =====
export const HeroSearchVariants: Story = {
  render: () => (
    <div className="space-y-16">
      <div>
        <h3 className="text-xl font-bold text-[var(--hive-text-primary)] mb-4">Default Variant</h3>
        <HeroSearch
          totalSpaces={360}
          categoryBreakdown={categoryStats}
          onSearch={(query) => console.log('Search:', query)}
        />
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-[var(--hive-text-primary)] mb-4">Compact Variant</h3>
        <HeroSearch
          variant="compact"
          totalSpaces={360}
          categoryBreakdown={categoryStats}
          onSearch={(query) => console.log('Search:', query)}
        />
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-[var(--hive-text-primary)] mb-4">Minimal Variant</h3>
        <HeroSearch
          variant="minimal"
          title="Find Your Community"
          subtitle="Search through campus spaces and organizations"
          onSearch={(query) => console.log('Search:', query)}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different variants of the HeroSearchOrganism showing layout flexibility.',
      },
    },
  },
};

export const CategoryGridVariants: Story = {
  render: () => (
    <div className="space-y-16">
      <div>
        <h3 className="text-xl font-bold text-[var(--hive-text-primary)] mb-4">Default Layout</h3>
        <CategoryGrid
          categoryBreakdown={categoryStats}
          totalSpaces={360}
        />
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-[var(--hive-text-primary)] mb-4">Compact Layout</h3>
        <CategoryGrid
          variant="compact"
          categoryBreakdown={categoryStats}
          showStats={false}
        />
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-[var(--hive-text-primary)] mb-4">Featured Layout</h3>
        <CategoryGrid
          variant="featured"
          title="Explore Campus Communities"
          subtitle="Discover spaces that match your interests and academic goals"
          categoryBreakdown={categoryStats}
          totalSpaces={360}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different layout variants of the CategoryGridOrganism.',
      },
    },
  },
};

export const PersonalizationFeedVariants: Story = {
  render: () => (
    <div className="space-y-16">
      <div>
        <h3 className="text-xl font-bold text-[var(--hive-text-primary)] mb-4">Default Layout</h3>
        <PersonalizationFeed
          mySpaces={mockUserSpaces}
          recommendedSpaces={mockRecommendedSpaces}
          activityStats={mockActivityStats}
        />
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-[var(--hive-text-primary)] mb-4">Compact Layout</h3>
        <PersonalizationFeed
          layout="compact"
          mySpaces={mockUserSpaces.slice(0, 2)}
          recommendedSpaces={mockRecommendedSpaces.slice(0, 2)}
          activityStats={mockActivityStats}
        />
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-[var(--hive-text-primary)] mb-4">Expanded Layout</h3>
        <PersonalizationFeed
          layout="expanded"
          mySpaces={mockUserSpaces}
          recommendedSpaces={mockRecommendedSpaces}
          activityStats={mockActivityStats}
          showSections={{
            mySpaces: true,
            recommendations: true,
            activity: true
          }}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different layout configurations of the PersonalizationFeedOrganism.',
      },
    },
  },
};

// ===== LOADING STATES =====
export const LoadingStates: Story = {
  render: () => (
    <div className="space-y-16">
      <div>
        <h3 className="text-xl font-bold text-[var(--hive-text-primary)] mb-4">Category Grid Loading</h3>
        <CategoryGrid
          isLoading={true}
        />
      </div>
      
      <div>
        <h3 className="text-xl font-bold text-[var(--hive-text-primary)] mb-4">Personalization Feed Loading</h3>
        <PersonalizationFeed
          isLoading={{
            mySpaces: true,
            recommendations: true,
            activity: true
          }}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Loading states for all organisms showing skeleton animations.',
      },
    },
  },
};

// ===== COMPLETE DISCOVERY ORGANISM =====
export const CompleteDiscoveryOrganism: Story = {
  render: () => (
    <div className="min-h-screen bg-gradient-to-br from-[var(--hive-background-primary)] via-[#0F0F0F] to-[var(--hive-background-tertiary)] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-[var(--hive-brand-secondary)]/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-[var(--hive-brand-secondary)]/3 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>
      
      {/* Hero Section */}
      <HeroSearch
        totalSpaces={360}
        categoryBreakdown={categoryStats}
        onSearch={(query) => console.log('Search:', query)}
        onBrowseAll={() => console.log('Browse All')}
        onTrending={() => console.log('Trending')}
        onMySpaces={() => console.log('My Spaces')}
      />

      {/* Personalization Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-8">
        <PersonalizationFeed
          mySpaces={mockUserSpaces}
          recommendedSpaces={mockRecommendedSpaces}
          activityStats={mockActivityStats}
          onSpaceClick={(spaceId) => console.log('Space clicked:', spaceId)}
          onRecommendationClick={(spaceId) => console.log('Recommendation clicked:', spaceId)}
          onJoinSpace={(spaceId) => console.log('Join space:', spaceId)}
          onBrowseSpaces={() => console.log('Browse spaces')}
        />
      </div>

      {/* Categories Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-8">
        <CategoryGrid
          categoryBreakdown={categoryStats}
          totalSpaces={360}
          onCategoryClick={(categoryId) => console.log('Category clicked:', categoryId)}
        />
      </div>

      {/* CTA Section */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 mb-8">
        <Card className="p-8 text-center bg-gradient-to-r from-[color-mix(in_srgb,var(--hive-brand-secondary)_5%,transparent)] to-[color-mix(in_srgb,var(--hive-brand-secondary)_2%,transparent)] border-[color-mix(in_srgb,var(--hive-brand-secondary)_10%,transparent)]">
          <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-4">Ready to explore?</h3>
          <p className="text-[var(--hive-text-tertiary)] mb-6 max-w-md mx-auto">
            Browse all spaces with advanced search and filtering, or check out what's trending.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button className="bg-[var(--hive-brand-secondary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-secondary)]">
              Browse & Search
            </Button>
            <Button variant="outline" className="border-[var(--hive-border-hover)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-interactive-active)]">
              View Trending
            </Button>
          </div>
        </Card>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
**CompleteDiscoveryOrganism** - Full-page discovery experience combining all organisms.

**Features:**
- Complete hero section with search
- Personalized dashboard integration  
- Category grid with statistics
- Call-to-action sections
- Responsive full-page layout
- Background ambient effects

**Use Cases:**
- Main spaces landing page
- Discovery dashboard
- Onboarding experiences
- Marketing landing pages
        `,
      },
    },
  },
};

// ===== COMPARISON VIEW =====
export const OrganismComparison: Story = {
  render: () => (
    <div className="space-y-16">
      {/* Layout Options Header */}
      <div className="text-center">
        <h1 className="text-3xl font-bold text-[var(--hive-text-primary)] mb-4">HIVE Spaces Organisms</h1>
        <p className="text-[var(--hive-text-tertiary)] max-w-3xl mx-auto">
          Three core organism components for rebuilding the spaces section with consistent design system patterns.
          Each organism can be used independently or composed together for complete experiences.
        </p>
      </div>

      {/* Quick Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            title: "HeroSearchOrganism",
            description: "Campus visualization + enhanced search capabilities",
            features: ["Animated campus map", "Enhanced search bar", "Quick action buttons"],
            complexity: "Medium",
            useCase: "Landing page hero"
          },
          {
            title: "CategoryGridOrganism", 
            description: "Standardized category display with consistent patterns",
            features: ["Animated icons", "Liquid hover effects", "Statistics integration"],
            complexity: "Low",
            useCase: "Category sections"
          },
          {
            title: "PersonalizationFeedOrganism",
            description: "User-specific dashboard with recommendations",
            features: ["My spaces display", "AI recommendations", "Activity statistics"],
            complexity: "High",
            useCase: "Dashboard widgets"
          }
        ].map((organism, index) => (
          <Card key={index} className="p-6 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border-[color-mix(in_srgb,var(--hive-interactive-active)_60%,transparent)]">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-2">{organism.title}</h3>
              <p className="text-sm text-[var(--hive-text-tertiary)] mb-3">{organism.description}</p>
              
              <div className="flex items-center gap-2 mb-3">
                <span className="text-xs px-2 py-1 bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] rounded">
                  {organism.complexity} Complexity
                </span>
                <span className="text-xs px-2 py-1 bg-[var(--hive-interactive-active)] text-[var(--hive-text-primary)] rounded">
                  {organism.useCase}
                </span>
              </div>
              
              <div className="space-y-1">
                {organism.features.map((feature, i) => (
                  <div key={i} className="text-xs text-[var(--hive-text-tertiary)] flex items-center">
                    <div className="w-1 h-1 bg-[var(--hive-brand-secondary)] rounded-full mr-2" />
                    {feature}
                  </div>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Implementation Recommendations */}
      <Card className="p-8 bg-gradient-to-br from-[var(--hive-brand-secondary)]/5 to-[var(--hive-brand-secondary)]/10 border-[var(--hive-brand-secondary)]/20">
        <h2 className="text-2xl font-bold text-[var(--hive-text-primary)] mb-6">Implementation Recommendations</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Start With (Phase 1)</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-[var(--hive-text-primary)] text-xs font-bold">1</div>
                <span className="text-[var(--hive-text-primary)]">CategoryGridOrganism - Lowest complexity, highest reusability</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-[var(--hive-text-primary)] text-xs font-bold">2</div>
                <span className="text-[var(--hive-text-primary)]">HeroSearchOrganism - Core discovery pattern</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-[var(--hive-text-primary)] mb-4">Expand With (Phase 2)</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-[var(--hive-text-primary)] text-xs font-bold">3</div>
                <span className="text-[var(--hive-text-primary)]">PersonalizationFeedOrganism - User customization</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-[var(--hive-text-primary)] text-xs font-bold">4</div>
                <span className="text-[var(--hive-text-primary)]">Complete discovery composition</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-8 p-4 bg-[color-mix(in_srgb,var(--hive-interactive-hover)_40%,transparent)] border border-[var(--hive-interactive-active)] rounded-lg">
          <h4 className="text-[var(--hive-text-primary)] font-semibold mb-2">Design System Benefits</h4>
          <div className="text-sm text-[var(--hive-text-tertiary)] space-y-1">
            <div>• All organisms build on existing HiveCard and HiveButton systems</div>
            <div>• Consistent with design tokens for theming and spacing</div>
            <div>• Modular composition enables A/B testing and customization</div>
            <div>• Patterns can be reused across other discovery sections</div>
          </div>
        </div>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: `
**Organism Comparison View** - Complete overview of all available spaces organisms with implementation guidance.

This story provides a comprehensive comparison of all organism options, helping you choose the right components for your implementation needs.
        `,
      },
    },
  },
};