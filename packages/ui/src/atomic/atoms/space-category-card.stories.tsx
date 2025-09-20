import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SpaceCategoryCard, SPACE_CATEGORIES, SpaceCategoryType } from './space-category-card';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import { Text } from './text';
import { action } from '@storybook/addon-actions';
import '../../hive-tokens.css';

const meta: Meta<typeof SpaceCategoryCard> = {
  title: '01-Atoms/Space Category Card - COMPLETE DEFINITION',
  component: SpaceCategoryCard,
  parameters: {
    docs: {
      description: {
        component: `
## 🏛️ HIVE Space Category Card - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive space category selection system for University at Buffalo campus space discovery and navigation.

### 🎯 **COMPONENT EXCELLENCE**
- **4 Predefined Categories** - University, residential, Greek, student for complete campus space coverage
- **2 Visual Variants** - Default and featured for different interface contexts
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors and gradients
- **Smooth Animations** - Framer Motion hover effects, scale transforms, and gradient transitions
- **Interactive Design** - Click handling, hover states, and visual feedback
- **Count Display** - Dynamic space count with proper number formatting
- **Example Previews** - Category examples for quick understanding
- **Accessibility Ready** - Proper ARIA labels, keyboard navigation, and focus states
- **Campus Context** - Built for University at Buffalo space organization and discovery

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo space discovery and organization:
- **University Spaces** - Official academic spaces for CSE, Engineering, courses, and departments
- **Residential Life** - Dorm spaces like Ellicott Complex, Governors, South Campus apartments
- **Greek Organizations** - Fraternity and sorority spaces, Greek life coordination
- **Student Groups** - Study groups, clubs, intramural teams, and student-created spaces
- **Space Discovery** - Primary entry point for browsing and finding relevant campus spaces
- **Community Building** - Helping students connect with appropriate campus communities

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Design** - Large interaction areas and clear visual hierarchy
- **Responsive Layout** - Adaptive sizing for different screen sizes
- **Clear Visual Feedback** - Immediate response to touch interactions
- **Accessibility** - Screen reader friendly with proper semantic structure
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'featured'],
      description: 'Visual variant of the card',
    },
    onClick: {
      action: 'clicked',
      description: 'Click handler for category selection',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SpaceCategoryCard>;

// Create category data with sample counts
const createCategoryWithCount = (type: SpaceCategoryType, count: number) => ({
  ...SPACE_CATEGORIES[type],
  count,
});

// Default space category card showcase
export const Default: Story = {
  args: {
    category: createCategoryWithCount('university', 247),
    variant: 'default',
    onClick: action('university-clicked'),
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            Space category card for University at Buffalo campus space discovery:
          </Text>
          <div className="max-w-sm">
            <SpaceCategoryCard {...args} />
          </div>
          <Text variant="body-sm" color="secondary">
            Interactive category selection for browsing campus spaces
          </Text>
        </CardContent>
      </Card>
    </div>
  ),
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Category Types */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">🏛️ CATEGORY TYPES</Badge>
            Space Category Options
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 predefined space categories for comprehensive University at Buffalo campus space organization
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">UB Campus Categories:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">University Spaces (Official Academic):</Text>
                  <div className="max-w-sm">
                    <SpaceCategoryCard
                      category={createCategoryWithCount('university', 247)}
                      onClick={action('university-clicked')}
                    />
                  </div>
                  <Text variant="body-xs" color="secondary">
                    CSE 331, Computer Science Department, School of Engineering spaces
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Residential Life (Campus Housing):</Text>
                  <div className="max-w-sm">
                    <SpaceCategoryCard
                      category={createCategoryWithCount('residential', 89)}
                      onClick={action('residential-clicked')}
                    />
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Ellicott Complex, Governors Complex, South Campus apartment communities
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Greek Life (Fraternities & Sororities):</Text>
                  <div className="max-w-sm">
                    <SpaceCategoryCard
                      category={createCategoryWithCount('greek', 34)}
                      onClick={action('greek-clicked')}
                    />
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Greek organization spaces, Panhellenic Council, IFC coordination
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Student Groups (Clubs & Organizations):</Text>
                  <div className="max-w-sm">
                    <SpaceCategoryCard
                      category={createCategoryWithCount('student', 156)}
                      onClick={action('student-clicked')}
                    />
                  </div>
                  <Text variant="body-xs" color="secondary">
                    Study groups, intramural teams, student clubs, and special interest communities
                  </Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Visual Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎨 VARIANTS</Badge>
            Category Card Variants
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Visual variants for different interface contexts and prominence levels
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Size Variants:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Default (Standard):</Text>
                  <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
                    <SpaceCategoryCard
                      category={createCategoryWithCount('university', 247)}
                      variant="default"
                      onClick={action('default-university')}
                    />
                    <SpaceCategoryCard
                      category={createCategoryWithCount('residential', 89)}
                      variant="default"
                      onClick={action('default-residential')}
                    />
                  </div>
                  <Text variant="body-xs" color="secondary">Standard size for space discovery grids</Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Featured (Prominent):</Text>
                  <div className="grid md:grid-cols-2 gap-4 max-w-2xl">
                    <SpaceCategoryCard
                      category={createCategoryWithCount('university', 247)}
                      variant="featured"
                      onClick={action('featured-university')}
                    />
                    <SpaceCategoryCard
                      category={createCategoryWithCount('student', 156)}
                      variant="featured"
                      onClick={action('featured-student')}
                    />
                  </div>
                  <Text variant="body-xs" color="secondary">Larger size for hero sections and primary navigation</Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Interactive Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">⚡ INTERACTIVE FEATURES</Badge>
            Space Category Grid Layout
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Interactive grid showing all four space categories as they would appear in the UB space discovery interface
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Complete Category Grid:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                
                <div className="grid md:grid-cols-2 gap-6 max-w-4xl">
                  <SpaceCategoryCard
                    category={createCategoryWithCount('university', 247)}
                    onClick={action('grid-university-clicked')}
                  />
                  <SpaceCategoryCard
                    category={createCategoryWithCount('residential', 89)}
                    onClick={action('grid-residential-clicked')}
                  />
                  <SpaceCategoryCard
                    category={createCategoryWithCount('greek', 34)}
                    onClick={action('grid-greek-clicked')}
                  />
                  <SpaceCategoryCard
                    category={createCategoryWithCount('student', 156)}
                    onClick={action('grid-student-clicked')}
                  />
                </div>
                
                <div className="mt-6">
                  <Text variant="body-sm" color="secondary">
                    Complete space discovery interface for University at Buffalo campus space browsing
                  </Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* UB Campus Context */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🦌 UNIVERSITY AT BUFFALO</Badge>
            Real Campus Space Discovery Scenarios
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Space category usage in actual University at Buffalo campus space discovery and community building contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Academic Space Discovery */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Space Discovery:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  New CSE Student Space Discovery Journey
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Finding Course Spaces:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <div className="max-w-sm">
                        <SpaceCategoryCard
                          category={{
                            ...SPACE_CATEGORIES.university,
                            count: 247,
                            examples: ['CSE 331', 'CSE 250', 'Engineering College'],
          }}
                          onClick={action('academic-discovery')}
                        />
                      </div>
                      <Text variant="body-xs" color="secondary">
                        New computer science students discover algorithm analysis course space, data structures study groups, and department-wide resources
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Connecting with Study Groups:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <div className="max-w-sm">
                        <SpaceCategoryCard
                          category={{
                            ...SPACE_CATEGORIES.student,
                            count: 156,
                            examples: ['Algorithm Study Group', 'CS Project Teams', 'Programming Club'],
          }}
                          onClick={action('study-group-discovery')}
                        />
                      </div>
                      <Text variant="body-xs" color="secondary">
                        Find peer study groups for challenging courses like CSE 331, collaborative project teams, and computer science social communities
                      </Text>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Residential Community Discovery */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Living Space Discovery:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Residential Communities:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="max-w-full">
                      <SpaceCategoryCard
                        category={{
                          ...SPACE_CATEGORIES.residential,
                          count: 89,
                          examples: ['Ellicott Complex', 'Governors Floor 8', 'South Campus'],
          }}
                        onClick={action('residential-discovery')}
                      />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Connect with your floor, building, and residential community for events, coordination, and social activities
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Greek Life:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="max-w-full">
                      <SpaceCategoryCard
                        category={{
                          ...SPACE_CATEGORIES.greek,
                          count: 34,
                          examples: ['Alpha Phi Alpha', 'Delta Sigma Theta', 'Sigma Chi'],
          }}
                        onClick={action('greek-discovery')}
                      />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Explore fraternity and sorority spaces, Greek life events, and Panhellenic Council activities
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Campus Organizations:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="max-w-full">
                      <SpaceCategoryCard
                        category={{
                          ...SPACE_CATEGORIES.student,
                          count: 156,
                          examples: ['UB Gaming Club', 'Engineering Society', 'Debate Team'],
          }}
                        onClick={action('organization-discovery')}
                      />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Find student organizations, clubs, intramural teams, and special interest groups across campus
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Empty States and Edge Cases */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Edge Cases & Empty States:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Low Activity Categories:</Text>
                  <div className="space-y-3">
                    <div className="max-w-sm">
                      <SpaceCategoryCard
                        category={createCategoryWithCount('greek', 0)}
                        onClick={action('empty-category-clicked')}
                      />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Handling categories with no active spaces (useful for smaller campuses or new implementations)
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">High Volume Categories:</Text>
                  <div className="space-y-3">
                    <div className="max-w-sm">
                      <SpaceCategoryCard
                        category={createCategoryWithCount('university', 1247)}
                        onClick={action('large-count-clicked')}
                      />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Large universities with extensive space counts (number formatting and display optimization)
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Mobile Discovery Interface */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile Space Discovery:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Mobile-optimized space category discovery for on-campus navigation:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Featured Categories (Mobile):</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="space-y-3">
                      <SpaceCategoryCard
                        category={createCategoryWithCount('university', 247)}
                        variant="featured"
                        onClick={action('mobile-university')}
                      />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Prominent category display for mobile space discovery homepage
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Quick Access Grid (Mobile):</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <div className="grid grid-cols-2 gap-2">
                      <SpaceCategoryCard
                        category={createCategoryWithCount('university', 247)}
                        onClick={action('mobile-grid-university')}
                      />
                      <SpaceCategoryCard
                        category={createCategoryWithCount('student', 156)}
                        onClick={action('mobile-grid-student')}
                      />
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Compact grid layout for mobile space browsing and quick category access
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </CardContent>
      </Card>

    </div>
  ),
};

// Interactive playground
export const Playground: Story = {
  args: {
    category: createCategoryWithCount('university', 247),
    variant: 'default',
    onClick: action('playground-clicked'),
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Space Category Card Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different category configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="max-w-sm">
              <SpaceCategoryCard {...args} />
            </div>
            <Text variant="body-sm" color="secondary">
              Interactive category card testing for University at Buffalo campus space discovery
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};