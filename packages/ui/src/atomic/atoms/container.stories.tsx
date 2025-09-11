import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  Container, 
  PageContainer,
  ContentContainer,
  NarrowContainer,
  WideContainer,
  FluidContainer,
  CardContainer,
  PanelContainer,
  SectionContainer,
  BreakoutContainer,
  SmallContainer,
  MediumContainer,
  LargeContainer,
  ExtraLargeContainer,
  CenteredContent,
  FullWidthSection
} from './container';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import { Text } from './text';
import '../../hive-tokens.css';

const meta: Meta<typeof Container> = {
  title: '01-Atoms/Container - COMPLETE DEFINITION',
  component: Container,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Container - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated container system for University at Buffalo campus layout structure and content organization.

### 🏆 **COMPONENT EXCELLENCE**
- **12 Max Width Options** - XS to 7XL plus full and none with responsive breakpoints
- **6 Padding Variants** - None to XL with consistent spacing scale
- **4 Container Types** - Default, card, panel, section with semantic styling
- **Advanced Layout Features** - Centering, fluid, breakout, gutter padding
- **Perfect Semantic Tokens** - 100% semantic token usage for backgrounds and borders
- **Responsive Behavior** - Intelligent responsive padding and max-width handling
- **Campus Layout Ready** - Optimized for UB content structure and page layouts

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo layout structure and content organization:
- **Page Layouts** - Course pages, student profiles, academic dashboards
- **Content Sections** - News articles, event details, academic announcements
- **Interface Structure** - Navigation containers, sidebar panels, main content areas
- **Form Layouts** - Registration forms, course selection, academic planning
- **Dashboard Organization** - Student portals, faculty interfaces, admin panels

### 📱 **MOBILE OPTIMIZATION**
- **Responsive Padding** - Intelligent gutter system for mobile edge spacing
- **Fluid Behavior** - Perfect mobile layout with touch-friendly spacing
- **Breakpoint Awareness** - Adaptive container sizes across device sizes
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', 'full', 'none'],
      description: 'Maximum width of container',
    },
    padding: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Internal padding',
    },
    variant: {
      control: 'select',
      options: ['default', 'card', 'panel', 'section'],
      description: 'Container visual style',
    },
    center: {
      control: 'boolean',
      description: 'Center container horizontally',
    },
    fluid: {
      control: 'boolean',
      description: 'Full width fluid container',
    },
    breakout: {
      control: 'boolean',
      description: 'Break out of parent constraints',
    },
    gutter: {
      control: 'boolean',
      description: 'Use responsive gutter padding',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Container>;

// Default container showcase
export const Default: Story = {
  args: {
    maxWidth: '4xl',
    padding: 'md',
    center: true,
    fluid: false,
    breakout: false,
    variant: 'default',
    gutter: false,
  },
  render: (args: any) => (
    <div className="min-h-32 bg-[var(--hive-background-primary)]">
      <Container {...args}>
        <div className="bg-[var(--hive-brand-secondary)] bg-opacity-10 border border-[var(--hive-brand-secondary)] border-dashed rounded-lg p-6 text-center">
          <Text variant="body-md" color="primary">
            University at Buffalo HIVE Container
          </Text>
          <Text variant="body-sm" color="secondary">
            Campus content layout and organization system
          </Text>
        </div>
      </Container>
    </div>
  ),
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Max Width Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="emerald">✅ MAX WIDTHS</Badge>
            Container Max Widths - Responsive Breakpoints
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            12 max width options with responsive breakpoints for different campus content types
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Small to Medium Widths:</h4>
              <div className="space-y-3">
                <Container maxWidth="xs" padding="sm" className="bg-[var(--hive-background-secondary)] rounded-lg">
                  <Text variant="body-sm" color="primary" align="center">XS: 320px - Form modals, narrow alerts</Text>
                </Container>
                <Container maxWidth="sm" padding="sm" className="bg-[var(--hive-background-secondary)] rounded-lg">
                  <Text variant="body-sm" color="primary" align="center">SM: 384px - Login forms, simple cards</Text>
                </Container>
                <Container maxWidth="md" padding="sm" className="bg-[var(--hive-background-secondary)] rounded-lg">
                  <Text variant="body-sm" color="primary" align="center">MD: 448px - Course registration, profile forms</Text>
                </Container>
                <Container maxWidth="lg" padding="sm" className="bg-[var(--hive-background-secondary)] rounded-lg">
                  <Text variant="body-sm" color="primary" align="center">LG: 512px - Article content, detailed forms</Text>
                </Container>
                <Container maxWidth="xl" padding="sm" className="bg-[var(--hive-background-secondary)] rounded-lg">
                  <Text variant="body-sm" color="primary" align="center">XL: 576px - Academic content, course descriptions</Text>
                </Container>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Large to Extra Large Widths:</h4>
              <div className="space-y-3">
                <Container maxWidth="2xl" padding="sm" className="bg-[var(--hive-background-secondary)] rounded-lg">
                  <Text variant="body-sm" color="primary" align="center">2XL: 672px - Blog posts, news articles, course content</Text>
                </Container>
                <Container maxWidth="3xl" padding="sm" className="bg-[var(--hive-background-secondary)] rounded-lg">
                  <Text variant="body-sm" color="primary" align="center">3XL: 768px - Academic dashboards, multi-column content</Text>
                </Container>
                <Container maxWidth="4xl" padding="sm" className="bg-[var(--hive-background-secondary)] rounded-lg">
                  <Text variant="body-sm" color="primary" align="center">4XL: 896px - Main content areas, student portals</Text>
                </Container>
                <Container maxWidth="5xl" padding="sm" className="bg-[var(--hive-background-secondary)] rounded-lg">
                  <Text variant="body-sm" color="primary" align="center">5XL: 1024px - Course listings, campus directories</Text>
                </Container>
                <Container maxWidth="6xl" padding="sm" className="bg-[var(--hive-background-secondary)] rounded-lg">
                  <Text variant="body-sm" color="primary" align="center">6XL: 1152px - Faculty interfaces, admin dashboards</Text>
                </Container>
                <Container maxWidth="7xl" padding="sm" className="bg-[var(--hive-background-secondary)] rounded-lg">
                  <Text variant="body-sm" color="primary" align="center">7XL: 1280px - Full page layouts, campus-wide interfaces</Text>
                </Container>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Variant Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎨 VARIANTS</Badge>
            Container Variants - Perfect Semantic Token Usage
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            4 container variants using 100% semantic tokens for consistent styling
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Default Container:</h4>
              <Container variant="primary" maxWidth="lg" padding="md">
                <Text variant="body-sm" color="primary">
                  Clean, unstyled container for flexible content layout. Perfect for main content areas and custom styling.
                </Text>
              </Container>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Card Container:</h4>
              <Container variant="card" maxWidth="lg" padding="md">
                <Text variant="body-sm" color="primary">
                  Elevated card-style container with secondary background, borders, and shadows. Ideal for course cards and feature highlights.
                </Text>
              </Container>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Panel Container:</h4>
              <Container variant="panel" maxWidth="lg" padding="md">
                <Text variant="body-sm" color="primary">
                  Primary background panel with borders. Perfect for sidebar content, navigation panels, and form sections.
                </Text>
              </Container>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Section Container:</h4>
              <Container variant="section" maxWidth="lg" padding="md">
                <Text variant="body-sm" color="primary">
                  Full-width section with tertiary background and horizontal borders. Great for page sections and content divisions.
                </Text>
              </Container>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Padding Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">📐 PADDING</Badge>
            Container Padding - Consistent Spacing Scale
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            6 padding options with consistent HIVE spacing scale for content breathing room
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Standard Padding:</h4>
              <div className="space-y-3">
                <Container variant="card" maxWidth="md" padding="none">
                  <div className="bg-[var(--hive-brand-secondary)] bg-opacity-10 rounded border-2 border-dashed border-[var(--hive-brand-secondary)]">
                    <Text variant="body-xs" color="secondary" align="center">None - No internal padding</Text>
                  </div>
                </Container>
                <Container variant="card" maxWidth="md" padding="xs">
                  <div className="bg-[var(--hive-brand-secondary)] bg-opacity-10 rounded border-2 border-dashed border-[var(--hive-brand-secondary)]">
                    <Text variant="body-xs" color="secondary" align="center">XS: 8px - Compact spacing</Text>
                  </div>
                </Container>
                <Container variant="card" maxWidth="md" padding="sm">
                  <div className="bg-[var(--hive-brand-secondary)] bg-opacity-10 rounded border-2 border-dashed border-[var(--hive-brand-secondary)]">
                    <Text variant="body-xs" color="secondary" align="center">SM: 16px - Standard spacing</Text>
                  </div>
                </Container>
                <Container variant="card" maxWidth="md" padding="md">
                  <div className="bg-[var(--hive-brand-secondary)] bg-opacity-10 rounded border-2 border-dashed border-[var(--hive-brand-secondary)]">
                    <Text variant="body-xs" color="secondary" align="center">MD: 24px - Comfortable spacing</Text>
                  </div>
                </Container>
                <Container variant="card" maxWidth="md" padding="lg">
                  <div className="bg-[var(--hive-brand-secondary)] bg-opacity-10 rounded border-2 border-dashed border-[var(--hive-brand-secondary)]">
                    <Text variant="body-xs" color="secondary" align="center">LG: 32px - Generous spacing</Text>
                  </div>
                </Container>
                <Container variant="card" maxWidth="md" padding="xl">
                  <div className="bg-[var(--hive-brand-secondary)] bg-opacity-10 rounded border-2 border-dashed border-[var(--hive-brand-secondary)]">
                    <Text variant="body-xs" color="secondary" align="center">XL: 48px - Maximum spacing</Text>
                  </div>
                </Container>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Responsive Gutter Padding:</h4>
              <Container variant="card" maxWidth="lg" padding="md" gutter>
                <div className="bg-[var(--hive-brand-secondary)] bg-opacity-10 rounded border-2 border-dashed border-[var(--hive-brand-secondary)] p-4">
                  <Text variant="body-sm" color="primary" align="center">
                    Responsive gutter padding adapts to screen size:
                  </Text>
                  <Text variant="body-xs" color="secondary" align="center">
                    Mobile: 16px • Tablet: 24px • Desktop: 32px • Large: 48px • XL: 64px
                  </Text>
                </div>
              </Container>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Layout Features */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">⚡ FEATURES</Badge>
            Advanced Layout Features - Fluid, Breakout, Centering
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Advanced container features for complex campus layout requirements
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Centering */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Container Centering:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <Container maxWidth="md" center={false} padding="sm" className="bg-[var(--hive-background-primary)] rounded border">
                  <Text variant="body-xs" color="secondary">Left-aligned container (center=false)</Text>
                </Container>
                <Container maxWidth="md" center padding="sm" className="bg-[var(--hive-background-primary)] rounded border">
                  <Text variant="body-xs" color="secondary" align="center">Centered container (center=true)</Text>
                </Container>
              </div>
            </div>

            {/* Fluid Behavior */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Fluid Behavior:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg space-y-3">
                <Container maxWidth="md" padding="sm" className="bg-[var(--hive-background-primary)] rounded border">
                  <Text variant="body-xs" color="secondary" align="center">Constrained width container</Text>
                </Container>
                <Container fluid padding="sm" className="bg-[var(--hive-background-primary)] rounded border">
                  <Text variant="body-xs" color="secondary" align="center">Fluid full-width container - spans entire available space</Text>
                </Container>
              </div>
            </div>

            {/* Breakout */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Breakout Container:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <Text variant="body-xs" color="secondary" align="center">
                  Parent container with constrained width
                </Text>
                <Container breakout padding="md" className="bg-[var(--hive-brand-secondary)] bg-opacity-10 my-4">
                  <Text variant="body-sm" color="primary" align="center">
                    Breakout container extends beyond parent constraints to full viewport width
                  </Text>
                  <Text variant="body-xs" color="secondary" align="center">
                    Perfect for full-width hero sections, featured content, and campus-wide announcements
                  </Text>
                </Container>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Preset Components */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="gold">🎯 PRESETS</Badge>
            Container Presets - Common Campus Patterns
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-built container components for common campus layout scenarios
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Layout Presets */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Layout Presets:</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Page Container:</Text>
                  <PageContainer padding="sm" className="bg-[var(--hive-background-secondary)] rounded">
                    <Text variant="body-xs" color="secondary" align="center">
                      7XL max-width with responsive gutters for main page layout
                    </Text>
                  </PageContainer>
                </div>
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Content Container:</Text>
                  <ContentContainer padding="sm" className="bg-[var(--hive-background-secondary)] rounded">
                    <Text variant="body-xs" color="secondary" align="center">
                      4XL max-width for main content areas and articles
                    </Text>
                  </ContentContainer>
                </div>
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Narrow Container:</Text>
                  <NarrowContainer padding="sm" className="bg-[var(--hive-background-secondary)] rounded">
                    <Text variant="body-xs" color="secondary" align="center">
                      2XL for focused content, forms, and detailed articles
                    </Text>
                  </NarrowContainer>
                </div>
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Wide Container:</Text>
                  <WideContainer padding="sm" className="bg-[var(--hive-background-secondary)] rounded">
                    <Text variant="body-xs" color="secondary" align="center">
                      6XL for dashboards, data tables, and admin interfaces
                    </Text>
                  </WideContainer>
                </div>
              </div>
            </div>

            {/* Style Presets */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Style Presets:</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Card Container:</Text>
                  <CardContainer maxWidth="lg" padding="md">
                    <Text variant="body-sm" color="primary">
                      Elevated card style with secondary background, perfect for course cards and feature highlights.
                    </Text>
                  </CardContainer>
                </div>
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Panel Container:</Text>
                  <PanelContainer maxWidth="lg" padding="md">
                    <Text variant="body-sm" color="primary">
                      Primary background panel with borders, ideal for sidebar content and navigation panels.
                    </Text>
                  </PanelContainer>
                </div>
              </div>
            </div>

            {/* Size Presets */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Size Presets:</h4>
              <div className="space-y-3">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <div className="text-center">
                    <SmallContainer padding="xs" className="bg-[var(--hive-background-secondary)] rounded">
                      <Text variant="body-2xs" color="secondary">Small</Text>
                    </SmallContainer>
                    <Text variant="body-2xs" color="tertiary">384px</Text>
                  </div>
                  <div className="text-center">
                    <MediumContainer padding="xs" className="bg-[var(--hive-background-secondary)] rounded">
                      <Text variant="body-2xs" color="secondary">Medium</Text>
                    </MediumContainer>
                    <Text variant="body-2xs" color="tertiary">448px</Text>
                  </div>
                  <div className="text-center">
                    <LargeContainer padding="xs" className="bg-[var(--hive-background-secondary)] rounded">
                      <Text variant="body-2xs" color="secondary">Large</Text>
                    </LargeContainer>
                    <Text variant="body-2xs" color="tertiary">512px</Text>
                  </div>
                  <div className="text-center">
                    <ExtraLargeContainer padding="xs" className="bg-[var(--hive-background-secondary)] rounded">
                      <Text variant="body-2xs" color="secondary">Extra Large</Text>
                    </ExtraLargeContainer>
                    <Text variant="body-2xs" color="tertiary">576px</Text>
                  </div>
                </div>
              </div>
            </div>

            {/* Composition Helpers */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Composition Helpers:</h4>
              <div className="space-y-6">
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Centered Content:</Text>
                  <CenteredContent className="bg-[var(--hive-background-secondary)] rounded">
                    <Text variant="body-sm" color="primary" align="center">
                      Pre-configured centered content with 4XL max-width and large padding for featured campus content.
                    </Text>
                  </CenteredContent>
                </div>
                <div className="space-y-3">
                  <Text variant="body-sm" color="gold" weight="medium">Full Width Section:</Text>
                  <FullWidthSection className="bg-[var(--hive-status-success)] bg-opacity-10">
                    <Text variant="body-sm" color="primary" align="center">
                      Full-width section with nested centered content - perfect for campus-wide announcements and featured sections.
                    </Text>
                  </FullWidthSection>
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
            Real Campus Container Usage Examples
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Container usage in actual University at Buffalo page layouts and content organization
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Academic Page Layout */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic Course Page Layout:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              {/* Page Header */}
              <FullWidthSection className="bg-[var(--hive-brand-secondary)] bg-opacity-5">
                <div className="text-center space-y-2">
                  <Text as="h1" variant="display-lg" color="primary">
                    CSE 331 - Algorithm Analysis and Design
                  </Text>
                  <Text variant="body-lg" color="secondary">
                    Fall 2024 • Computer Science and Engineering Department
                  </Text>
                </div>
              </FullWidthSection>
              
              {/* Main Content */}
              <ContentContainer>
                <div className="grid md:grid-cols-3 gap-6">
                  
                  {/* Course Info */}
                  <div className="md:col-span-2 space-y-4">
                    <CardContainer padding="lg">
                      <div className="space-y-4">
                        <Text as="h2" variant="heading-lg" color="primary">Course Information</Text>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Text variant="body-sm" color="gold" weight="medium">Credits:</Text>
                            <Text variant="body-sm" color="secondary">4 credit hours</Text>
                          </div>
                          <div>
                            <Text variant="body-sm" color="gold" weight="medium">Prerequisites:</Text>
                            <Text variant="body-sm" color="secondary">CSE 250, MTH 241</Text>
                          </div>
                          <div>
                            <Text variant="body-sm" color="gold" weight="medium">Format:</Text>
                            <Text variant="body-sm" color="secondary">Lecture + Recitation</Text>
                          </div>
                          <div>
                            <Text variant="body-sm" color="gold" weight="medium">Offered:</Text>
                            <Text variant="body-sm" color="secondary">Fall, Spring</Text>
                          </div>
                        </div>
                      </div>
                    </CardContainer>
                    
                    <CardContainer padding="lg">
                      <div className="space-y-4">
                        <Text as="h2" variant="heading-lg" color="primary">Course Description</Text>
                        <Text variant="body-md" color="secondary">
                          This course provides an introduction to the design and analysis of algorithms. Topics include asymptotic notation, recurrence relations, basic algorithmic paradigms such as divide-and-conquer, greedy, and dynamic programming. Graph algorithms and NP-completeness are also covered.
                        </Text>
                      </div>
                    </CardContainer>
                  </div>
                  
                  {/* Sidebar */}
                  <div className="space-y-4">
                    <PanelContainer padding="md">
                      <div className="space-y-3">
                        <Text variant="body-sm" color="gold" weight="medium">Quick Actions</Text>
                        <div className="space-y-2">
                          <Text variant="body-sm" color="primary">• View Schedule</Text>
                          <Text variant="body-sm" color="primary">• Check Prerequisites</Text>
                          <Text variant="body-sm" color="primary">• Register for Course</Text>
                          <Text variant="body-sm" color="primary">• Contact Instructor</Text>
                        </div>
                      </div>
                    </PanelContainer>
                    
                    <PanelContainer padding="md">
                      <div className="space-y-3">
                        <Text variant="body-sm" color="gold" weight="medium">Sections Available</Text>
                        <div className="space-y-3">
                          <div className="space-y-1">
                            <Text variant="body-sm" color="primary">Section A1</Text>
                            <Text variant="body-xs" color="secondary">MWF 10:00-10:50am</Text>
                            <Text variant="body-xs" color="secondary">Dr. Johnson • Available: 12/35</Text>
                          </div>
                          <div className="space-y-1">
                            <Text variant="body-sm" color="primary">Section A2</Text>
                            <Text variant="body-xs" color="secondary">TTh 2:00-3:20pm</Text>
                            <Text variant="body-xs" color="secondary">Dr. Smith • Available: 8/35</Text>
                          </div>
                        </div>
                      </div>
                    </PanelContainer>
                  </div>
                  
                </div>
              </ContentContainer>
              
            </div>
          </div>

          {/* Student Dashboard Layout */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Dashboard Layout:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              {/* Dashboard Header */}
              <PageContainer>
                <div className="flex justify-between items-start">
                  <div>
                    <Text as="h1" variant="heading-xl" color="primary">Welcome back, Alex!</Text>
                    <Text variant="body-md" color="secondary">Computer Science • Class of 2025</Text>
                  </div>
                  <NarrowContainer padding="none">
                    <Text variant="body-sm" color="gold" weight="medium" align="right">
                      Spring 2025 Registration Opens: Dec 20
                    </Text>
                  </NarrowContainer>
                </div>
              </PageContainer>
              
              {/* Dashboard Grid */}
              <WideContainer>
                <div className="grid md:grid-cols-4 gap-6">
                  
                  {/* Stats Cards */}
                  <CardContainer padding="md">
                    <div className="text-center space-y-2">
                      <Text variant="display-sm" color="emerald" weight="bold">3.75</Text>
                      <Text variant="body-sm" color="secondary">Current GPA</Text>
                    </div>
                  </CardContainer>
                  
                  <CardContainer padding="md">
                    <div className="text-center space-y-2">
                      <Text variant="display-sm" color="primary" weight="bold">102</Text>
                      <Text variant="body-sm" color="secondary">Credits Earned</Text>
                    </div>
                  </CardContainer>
                  
                  <CardContainer padding="md">
                    <div className="text-center space-y-2">
                      <Text variant="display-sm" color="gold" weight="bold">18</Text>
                      <Text variant="body-sm" color="secondary">Credits Remaining</Text>
                    </div>
                  </CardContainer>
                  
                  <CardContainer padding="md">
                    <div className="text-center space-y-2">
                      <Text variant="display-sm" color="emerald" weight="bold">Spring</Text>
                      <Text variant="body-sm" color="secondary">Expected Graduation</Text>
                    </div>
                  </CardContainer>
                  
                </div>
              </WideContainer>
              
              {/* Current Courses */}
              <ContentContainer>
                <CardContainer padding="lg">
                  <div className="space-y-4">
                    <Text as="h2" variant="heading-lg" color="primary">Current Courses - Fall 2024</Text>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Text variant="body-sm" color="primary" weight="medium">CSE 331 - Algorithm Analysis</Text>
                        <Text variant="body-xs" color="secondary">Section A1 • Dr. Johnson • Grade: A-</Text>
                      </div>
                      <div className="space-y-2">
                        <Text variant="body-sm" color="primary" weight="medium">MTH 241 - Calculus III</Text>
                        <Text variant="body-xs" color="secondary">Section B2 • Dr. Chen • Grade: B+</Text>
                      </div>
                      <div className="space-y-2">
                        <Text variant="body-sm" color="primary" weight="medium">PHI 237 - Ethics</Text>
                        <Text variant="body-xs" color="secondary">Section C1 • Prof. Williams • Grade: A</Text>
                      </div>
                      <div className="space-y-2">
                        <Text variant="body-sm" color="primary" weight="medium">ENG 105 - Writing</Text>
                        <Text variant="body-xs" color="secondary">Section D3 • Prof. Davis • Grade: B+</Text>
                      </div>
                    </div>
                  </div>
                </CardContainer>
              </ContentContainer>
              
            </div>
          </div>

          {/* Campus News Layout */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus News Article Layout:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              {/* Hero Section */}
              <FullWidthSection className="bg-gradient-to-r from-[var(--hive-brand-secondary)] to-[var(--hive-status-success)] bg-opacity-10">
                <CenteredContent>
                  <div className="text-center space-y-4">
                    <Text as="h1" variant="display-lg" color="primary">
                      UB Engineering Students Win National Robotics Competition
                    </Text>
                    <Text variant="body-lg" color="secondary">
                      Computer Science team takes first place with innovative autonomous navigation system
                    </Text>
                    <div className="flex justify-center gap-4">
                      <Text variant="body-sm" color="gold">Engineering News</Text>
                      <Text variant="body-sm" color="secondary">December 18, 2024</Text>
                      <Text variant="body-sm" color="secondary">By Campus Communications</Text>
                    </div>
                  </div>
                </CenteredContent>
              </FullWidthSection>
              
              {/* Article Content */}
              <NarrowContainer>
                <div className="space-y-6">
                  <Text variant="body-lg" color="primary" weight="medium">
                    A team of University at Buffalo engineering students has taken first place in the National Autonomous Robotics Challenge, beating 47 other university teams from across the United States.
                  </Text>
                  
                  <Text variant="body-md" color="secondary">
                    The winning team, composed of students from the Computer Science and Engineering department, developed an innovative navigation system that allows robots to operate in complex environments without human intervention.
                  </Text>
                  
                  <Text variant="body-md" color="secondary">
                    "This victory showcases the exceptional talent and dedication of our students," said Dr. Michael Chen, Chair of the Computer Science and Engineering Department. "Their innovative approach to autonomous navigation represents a significant advancement in robotics technology."
                  </Text>
                </div>
              </NarrowContainer>
              
              {/* Related Content */}
              <SectionContainer padding="lg">
                <PageContainer>
                  <div className="space-y-4">
                    <Text as="h3" variant="heading-md" color="primary" align="center">Related Stories</Text>
                    <div className="grid md:grid-cols-3 gap-6">
                      <SmallContainer padding="md" className="bg-[var(--hive-background-primary)] rounded">
                        <div className="space-y-2">
                          <Text variant="body-sm" color="primary" weight="medium">CS Department Launches AI Research Lab</Text>
                          <Text variant="body-xs" color="secondary">New facility focuses on machine learning applications for healthcare and sustainability.</Text>
                        </div>
                      </SmallContainer>
                      <SmallContainer padding="md" className="bg-[var(--hive-background-primary)] rounded">
                        <div className="space-y-2">
                          <Text variant="body-sm" color="primary" weight="medium">Students Present at International Conference</Text>
                          <Text variant="body-xs" color="secondary">UB researchers share breakthrough findings in computer vision and natural language processing.</Text>
                        </div>
                      </SmallContainer>
                      <SmallContainer padding="md" className="bg-[var(--hive-background-primary)] rounded">
                        <div className="space-y-2">
                          <Text variant="body-sm" color="primary" weight="medium">Industry Partnership Program Expands</Text>
                          <Text variant="body-xs" color="secondary">New collaborations with tech companies provide internship and research opportunities.</Text>
                        </div>
                      </SmallContainer>
                    </div>
                  </div>
                </PageContainer>
              </SectionContainer>
              
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
    maxWidth: '4xl',
    padding: 'md',
    center: true,
    fluid: false,
    breakout: false,
    variant: 'default',
    gutter: false,
  },
  render: (args: any) => (
    <div className="min-h-64 p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Container Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different container configurations
          </p>
        </CardHeader>
        <CardContent>
          <Container {...args}>
            <div className="bg-[var(--hive-brand-secondary)] bg-opacity-10 border border-[var(--hive-brand-secondary)] border-dashed rounded-lg p-8 text-center space-y-2">
              <Text variant="heading-md" color="primary">
                University at Buffalo HIVE Container
              </Text>
              <Text variant="body-md" color="secondary">
                Campus layout and content organization system
              </Text>
              <Text variant="body-sm" color="muted">
                Responsive • Accessible • Semantic Token Based
              </Text>
            </div>
          </Container>
        </CardContent>
      </Card>
    </div>
  ),
};