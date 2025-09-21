import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './search-bar';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Text } from './ui/typography';
import { action } from '@storybook/addon-actions';
import '../../hive-tokens.css';

const meta: Meta<typeof SearchBar> = {
  title: '02-Molecules/Search Bar - COMPLETE DEFINITION',
  component: SearchBar,
  parameters: {
    docs: {
      description: {
        component: `
## 🔍 HIVE Search Bar - Complete Molecule Definition;
**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The comprehensive search interface for University at Buffalo HIVE platform discovery and navigation.

### 🎯 **COMPONENT EXCELLENCE**
- **3 Visual Variants** - Default, ghost, filled for different interface contexts;
- **3 Size Options** - Small, medium, large for responsive design;
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors and states;
- **Loading States** - Built-in spinner animation for async search operations;
- **Clearable Input** - One-click clearing with accessibility support;
- **Form Integration** - Proper form submission with enter key support;
- **Icon Integration** - Search and clear icons with semantic styling;
- **Accessibility Ready** - Proper ARIA labels, keyboard navigation, and screen reader support;
- **Campus Discovery** - Built for University at Buffalo student platform search workflows;
### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo HIVE platform discovery:
- **Study Partner Search** - Find classmates for CSE 331, engineering projects, exam prep;
- **Space Discovery** - Search for academic spaces, residential communities, student organizations;
- **Tool Marketplace** - Discover campus tools for productivity, collaboration, academic success;
- **Event Finding** - Search campus events, study sessions, social gatherings;
- **Profile Discovery** - Find students by major, interests, skills, availability;
- **Academic Resources** - Search course materials, study guides, project templates;
- **Campus Navigation** - Find buildings, dining options, services, support resources;
### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Design** - Large search targets and clear visual feedback;
- **Responsive Sizing** - Adaptive search bar for different screen sizes;
- **Voice Search Ready** - Integration points for voice input (future enhancement)
- **Autocomplete Support** - Ready for predictive search suggestions;
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Search bar size',
    },
    variant: {
      control: 'select',
      options: ['default', 'ghost', 'filled'],
      description: 'Search bar visual variant',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state with spinner',
    },
    clearable: {
      control: 'boolean',
      description: 'Show clear button when text is entered',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    onSearch: {
      action: 'searched',
      description: 'Search submission handler',
    },
    onChange: {
      action: 'changed',
      description: 'Text change handler',
    },
    onClear: {
      action: 'cleared',
      description: 'Clear button handler',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

// Default search bar showcase;
export const Default: Story = {
  args: {
    placeholder: 'Search spaces, tools, and students...',
    size: 'md',
    variant: 'default',
    loading: false,
    clearable: true,
    onSearch: action('search-submitted'),
    onChange: action('search-changed'),
    onClear: action('search-cleared'),
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="space-y-4">
          <Text variant="body-md" color="primary">
            HIVE search interface for University at Buffalo platform discovery:
          </Text>
          <SearchBar {...args} />
          <Text variant="body-sm" color="secondary">
            Interactive search with loading states, clear functionality, and form submission;
          </Text>
        </CardContent>
      </Card>
    </div>
  ),
};

// Complete showcase;
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Search Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="success">🔍 SEARCH VARIANTS</Badge>
            Visual Variant Options;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 search bar variants for different University at Buffalo HIVE platform interface contexts;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Visual Variants:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Default (Standard):</Text>
                  <SearchBar;
                    placeholder="Search CSE 331 study groups..."
                    variant="secondary"
                    onSearch={action('default-search')}
                    onChange={action('default-change')}
                  />
                  <Text variant="body-xs" color="secondary">
                    Standard search for main platform areas - space discovery, tool marketplace, profile search;
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Ghost (Subtle):</Text>
                  <SearchBar;
                    placeholder="Quick search..."
                    variant="ghost"
                    onSearch={action('ghost-search')}
                    onChange={action('ghost-change')}
                  />
                  <Text variant="body-xs" color="secondary">
                    Subtle search for embedded contexts, widget search, secondary navigation;
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Filled (Prominent):</Text>
                  <SearchBar;
                    placeholder="Find your next study partner..."
                    variant="filled"
                    onSearch={action('filled-search')}
                    onChange={action('filled-change')}
                  />
                  <Text variant="body-xs" color="secondary">
                    Prominent search for hero sections, onboarding flows, feature discovery;
                  </Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Search Sizes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">📏 SEARCH SIZES</Badge>
            Size Variations;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 search bar sizes for different interface densities and responsive design;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Size Options:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Small (Compact):</Text>
                  <SearchBar;
                    size="sm"
                    placeholder="Search tools..."
                    onSearch={action('small-search')}
                    onChange={action('small-change')}
                  />
                  <Text variant="body-xs" color="secondary">
                    Compact search for toolbars, widget headers, secondary navigation areas;
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Medium (Standard):</Text>
                  <SearchBar;
                    size="md"
                    placeholder="Search spaces and communities..."
                    onSearch={action('medium-search')}
                    onChange={action('medium-change')}
                  />
                  <Text variant="body-xs" color="secondary">
                    Standard search for main content areas, space discovery, profile browsing;
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Large (Prominent):</Text>
                  <SearchBar;
                    size="lg"
                    placeholder="What are you looking for at UB?"
                    onSearch={action('large-search')}
                    onChange={action('large-change')}
                  />
                  <Text variant="body-xs" color="secondary">
                    Large search for hero sections, landing pages, primary platform entry points;
                  </Text>
                </div>

              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Interactive States */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">⚡ INTERACTIVE STATES</Badge>
            Search States and Functionality;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Interactive search features for user feedback and enhanced functionality;
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Interactive Features:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Loading State:</Text>
                  <SearchBar;
                    placeholder="Searching campus spaces..."
                    loading={true}
                    onSearch={action('loading-search')}
                    onChange={action('loading-change')}
                  />
                  <Text variant="body-xs" color="secondary">
                    Loading state with spinner for async search operations and API calls;
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Clearable Input:</Text>
                  <SearchBar;
                    placeholder="Search UB students..."
                    value="Sarah Chen Computer Science"
                    clearable={true}
                    onSearch={action('clearable-search')}
                    onChange={action('clearable-change')}
                    onClear={action('clearable-clear')}
                  />
                  <Text variant="body-xs" color="secondary">
                    Clear button appears when text is entered, provides quick reset functionality;
                  </Text>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Non-Clearable:</Text>
                  <SearchBar;
                    placeholder="Filter current results..."
                    clearable={false}
                    onSearch={action('non-clearable-search')}
                    onChange={action('non-clearable-change')}
                  />
                  <Text variant="body-xs" color="secondary">
                    Search without clear button for contexts where clearing isn't appropriate;
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
            Real Campus Search Scenarios;
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Search usage in actual University at Buffalo student discovery and navigation contexts;
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Academic Discovery */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Discovery & Study Partner Search:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  CSE 331 Algorithm Analysis Study Group Formation;
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Study Partner Search:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <SearchBar;
                        placeholder="Find CSE 331 study partners..."
                        size="md"
                        variant="secondary"
                        onSearch={action('study-partner-search')}
                        onChange={action('study-partner-change')}
                      />
                      <Text variant="body-xs" color="secondary">
                        Search for classmates taking Algorithm Analysis, filter by availability and study preferences;
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Course Resource Discovery:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <SearchBar;
                        placeholder="Algorithm study tools and guides..."
                        size="md"
                        variant="filled"
                        onSearch={action('resource-search')}
                        onChange={action('resource-change')}
                      />
                      <Text variant="body-xs" color="secondary">
                        Find study tools, practice problems, and community-created resources for computer science courses;
                      </Text>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          </div>

          {/* Campus Community Discovery */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Community & Space Discovery:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">University Spaces:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <SearchBar;
                      size="sm"
                      placeholder="Computer Science spaces..."
                      variant="ghost"
                      onSearch={action('university-search')}
                      onChange={action('university-change')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Find official academic spaces, department communities, course-specific groups;
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Residential Communities:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <SearchBar;
                      size="sm"
                      placeholder="Ellicott Complex activities..."
                      variant="ghost"
                      onSearch={action('residential-search')}
                      onChange={action('residential-change')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Discover dorm communities, floor activities, residential life events and coordination;
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Student Organizations:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <SearchBar;
                      size="sm"
                      placeholder="Programming clubs..."
                      variant="ghost"
                      onSearch={action('organization-search')}
                      onChange={action('organization-change')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Find student clubs, interest groups, professional organizations, and social communities;
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Tool Marketplace */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Platform Tool Discovery:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Academic Tools:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <SearchBar;
                      placeholder="GPA calculator, study scheduler..."
                      size="md"
                      variant="secondary"
                      onSearch={action('academic-tools-search')}
                      onChange={action('academic-tools-change')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Find productivity tools for academic success, grade tracking, assignment management;
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Social Coordination Tools:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <SearchBar;
                      placeholder="Event planner, group chat..."
                      size="md"
                      variant="secondary"
                      onSearch={action('social-tools-search')}
                      onChange={action('social-tools-change')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Discover tools for event coordination, group communication, community building;
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Mobile Campus Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile Campus Navigation:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <Text variant="body-md" color="primary">
                Mobile-optimized search for on-campus platform usage:
              </Text>

              <div className="grid md:grid-cols-2 gap-6">
                
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Quick Campus Search:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <SearchBar;
                      size="lg"
                      placeholder="Find dining, libraries, events..."
                      variant="filled"
                      onSearch={action('mobile-campus-search')}
                      onChange={action('mobile-campus-change')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Large search interface for mobile discovery while walking around campus;
                    </Text>
                  </div>
                </div>

                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Study Space Finder:</Text>
                  <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                    <SearchBar;
                      size="lg"
                      placeholder="Lockwood Library study rooms..."
                      variant="filled"
                      loading={true}
                      onSearch={action('study-space-search')}
                      onChange={action('study-space-change')}
                    />
                    <Text variant="body-xs" color="secondary">
                      Location-aware search for available study spaces, quiet areas, collaborative zones;
                    </Text>
                  </div>
                </div>

              </div>

            </div>
          </div>

          {/* Search Result Integration */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Search Integration Contexts:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-6">
              
              <div className="space-y-4">
                <Text as="h3" variant="heading-sm" color="primary">
                  Platform-Wide Search Functionality;
                </Text>
                
                <div className="grid md:grid-cols-2 gap-6">
                  
                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Global Platform Search:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <SearchBar;
                        size="lg"
                        placeholder="Search everything at UB..."
                        variant="filled"
                        onSearch={action('global-search')}
                        onChange={action('global-change')}
                      />
                      <Text variant="body-xs" color="secondary">
                        Universal search across spaces, tools, students, events, and resources;
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Text variant="body-sm" color="gold" weight="medium">Filtered Context Search:</Text>
                    <div className="p-4 bg-[var(--hive-background-primary)] rounded-lg border border-[var(--hive-border-primary)] space-y-3">
                      <SearchBar;
                        size="md"
                        placeholder="Filter current space..."
                        variant="ghost"
                        clearable={false}
                        onSearch={action('filter-search')}
                        onChange={action('filter-change')}
                      />
                      <Text variant="body-xs" color="secondary">
                        Context-aware filtering within current space, tool library, or community;
                      </Text>
                    </div>
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

// Interactive playground;
export const Playground: Story = {
  args: {
    placeholder: 'Search...',
    size: 'md',
    variant: 'default',
    loading: false,
    clearable: true,
    onSearch: action('playground-search'),
    onChange: action('playground-change'),
    onClear: action('playground-clear'),
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Search Bar Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different search configurations;
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            <SearchBar {...args} />
            <Text variant="body-sm" color="secondary">
              Interactive search testing for University at Buffalo HIVE platform interface design;
            </Text>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};