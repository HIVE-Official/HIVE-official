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
} from '../../atomic/atoms/container';
import { Users, Calendar, BookOpen, Settings, Zap, Target } from 'lucide-react';

const meta: Meta<typeof Container> = {
  title: '01-Atoms/Container',
  component: Container,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'HIVE container component for layout structure with responsive sizing, spacing, and variants for campus interfaces.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    maxWidth: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', 'full', 'none'],
      description: 'Maximum width constraint',
    },
    padding: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Internal padding',
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
      description: 'Break out of parent container constraints',
    },
    variant: {
      control: 'select',
      options: ['default', 'card', 'panel', 'section'],
      description: 'Visual variant',
    },
    gutter: {
      control: 'boolean',
      description: 'Use responsive gutter padding',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    children: (
      <div className="bg-hive-gold/20 p-4 rounded-lg border-2 border-dashed border-hive-gold text-center">
        <p className="text-hive-text-primary">Default Container Content</p>
      </div>
    ),
  },
};

export const Card: Story = {
  args: {
    variant: 'card',
    children: (
      <div className="text-center">
        <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Card Container</h3>
        <p className="text-hive-text-secondary">Content inside a card-styled container</p>
      </div>
    ),
  },
};

export const Panel: Story = {
  args: {
    variant: 'panel',
    children: (
      <div className="text-center">
        <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Panel Container</h3>
        <p className="text-hive-text-secondary">Content inside a panel-styled container</p>
      </div>
    ),
  },
};

export const Section: Story = {
  args: {
    variant: 'section',
    children: (
      <div className="text-center">
        <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Section Container</h3>
        <p className="text-hive-text-secondary">Content inside a section-styled container</p>
      </div>
    ),
  },
};

// All max widths
export const AllMaxWidths: Story = {
  render: () => (
    <div className="space-y-4 p-4 bg-hive-background-primary">
      {[
        { size: 'xs', label: 'Extra Small (320px)' },
        { size: 'sm', label: 'Small (384px)' },
        { size: 'md', label: 'Medium (448px)' },
        { size: 'lg', label: 'Large (512px)' },
        { size: 'xl', label: 'Extra Large (576px)' },
        { size: '2xl', label: '2X Large (672px)' },
        { size: '3xl', label: '3X Large (768px)' },
        { size: '4xl', label: '4X Large (896px)' },
        { size: '5xl', label: '5X Large (1024px)' },
        { size: '6xl', label: '6X Large (1152px)' },
        { size: '7xl', label: '7X Large (1280px)' },
      ].map(({ size, label }) => (
        <Container key={size} maxWidth={size as any} padding="sm">
          <div className="bg-hive-emerald/20 p-4 rounded-lg border-2 border-dashed border-hive-emerald text-center">
            <p className="text-hive-text-primary font-medium">{label}</p>
            <p className="text-hive-text-secondary text-sm">max-w-{size}</p>
          </div>
        </Container>
      ))}
    </div>
  ),
};

// All padding sizes
export const AllPaddingSizes: Story = {
  render: () => (
    <div className="space-y-4 p-4 bg-hive-background-primary">
      {[
        { size: 'none', label: 'No Padding' },
        { size: 'xs', label: 'Extra Small (8px)' },
        { size: 'sm', label: 'Small (16px)' },
        { size: 'md', label: 'Medium (24px)' },
        { size: 'lg', label: 'Large (32px)' },
        { size: 'xl', label: 'Extra Large (48px)' },
      ].map(({ size, label }) => (
        <Container key={size} maxWidth="2xl" padding={size as any} variant="card">
          <div className="bg-hive-sapphire/20 rounded-lg border-2 border-dashed border-hive-sapphire text-center">
            <p className="text-hive-text-primary font-medium">{label}</p>
            <p className="text-hive-text-secondary text-sm">padding: {size}</p>
          </div>
        </Container>
      ))}
    </div>
  ),
};

// Campus layout scenarios
export const CampusLayoutScenarios: Story = {
  render: () => (
    <div className="space-y-8 bg-hive-background-primary min-h-screen">
      <div>
        <h2 className="text-2xl font-bold text-hive-text-primary mb-6 text-center">Campus Dashboard Layout</h2>
        
        {/* Page Header */}
        <PageContainer variant="section" padding="lg">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-hive-text-primary">Welcome back, Alex!</h1>
              <p className="text-hive-text-secondary">Computer Science • Junior Year</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-hive-gold rounded-full flex items-center justify-center">
                <span className="text-hive-background-primary font-bold">AR</span>
              </div>
            </div>
          </div>
        </PageContainer>

        {/* Quick Stats */}
        <ContentContainer padding="lg">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Users, label: 'Study Groups', value: '5 Active', color: 'hive-emerald' },
              { icon: Calendar, label: 'This Week', value: '12 Events', color: 'hive-sapphire' },
              { icon: BookOpen, label: 'Tools Built', value: '8 Published', color: 'hive-gold' },
            ].map((stat, index) => (
              <CardContainer key={index} padding="lg">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 bg-${stat.color}/20 rounded-lg flex items-center justify-center`}>
                    <stat.icon className={`w-6 h-6 text-${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-hive-text-primary">{stat.value}</p>
                    <p className="text-hive-text-secondary">{stat.label}</p>
                  </div>
                </div>
              </CardContainer>
            ))}
          </div>
        </ContentContainer>

        {/* Main Content Area */}
        <Container maxWidth="6xl" center padding="lg">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Primary Content */}
            <div className="lg:col-span-2 space-y-6">
              <CardContainer padding="lg">
                <h3 className="text-xl font-semibold text-hive-text-primary mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    'Joined CS 101 Study Group',
                    'Published GPA Calculator v2.0',
                    'Scheduled tutoring session',
                    'Completed Data Structures assignment'
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3 p-3 bg-hive-background-tertiary rounded-lg">
                      <div className="w-2 h-2 bg-hive-gold rounded-full"></div>
                      <p className="text-hive-text-primary">{activity}</p>
                    </div>
                  ))}
                </div>
              </CardContainer>

              <CardContainer padding="lg">
                <h3 className="text-xl font-semibold text-hive-text-primary mb-4">Popular Tools</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { name: 'GPA Calculator', users: '1.2k users', color: 'hive-emerald' },
                    { name: 'Study Planner', users: '847 users', color: 'hive-sapphire' },
                    { name: 'Grade Tracker', users: '2.1k users', color: 'hive-gold' },
                    { name: 'Course Scheduler', users: '673 users', color: 'hive-ruby' },
                  ].map((tool, index) => (
                    <div key={index} className="p-4 bg-hive-background-tertiary rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 bg-${tool.color}/20 rounded-lg flex items-center justify-center`}>
                          <Settings className={`w-5 h-5 text-${tool.color}`} />
                        </div>
                        <div>
                          <p className="font-semibold text-hive-text-primary">{tool.name}</p>
                          <p className="text-sm text-hive-text-secondary">{tool.users}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContainer>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <PanelContainer padding="lg">
                <h4 className="font-semibold text-hive-text-primary mb-4">Quick Actions</h4>
                <div className="space-y-3">
                  {[
                    { icon: Zap, label: 'New Tool', color: 'hive-gold' },
                    { icon: Users, label: 'Join Group', color: 'hive-emerald' },
                    { icon: Calendar, label: 'Schedule', color: 'hive-sapphire' },
                    { icon: Target, label: 'Set Goals', color: 'hive-ruby' },
                  ].map((action, index) => (
                    <button
                      key={index}
                      className="w-full flex items-center space-x-3 p-3 text-left hover:bg-hive-interactive-hover rounded-lg transition-colors"
                    >
                      <action.icon className={`w-5 h-5 text-${action.color}`} />
                      <span className="text-hive-text-primary">{action.label}</span>
                    </button>
                  ))}
                </div>
              </PanelContainer>

              <CardContainer padding="lg">
                <h4 className="font-semibold text-hive-text-primary mb-4">Upcoming</h4>
                <div className="space-y-3">
                  {[
                    { time: '2:00 PM', event: 'CS 101 Study Session' },
                    { time: '4:30 PM', event: 'Data Structures Lab' },
                    { time: '7:00 PM', event: 'Hackathon Planning' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-16 text-sm text-hive-text-secondary">{item.time}</div>
                      <div className="flex-1 text-hive-text-primary">{item.event}</div>
                    </div>
                  ))}
                </div>
              </CardContainer>
            </div>
          </div>
        </Container>
      </div>
    </div>
  ),
};

// Responsive behavior demonstration
export const ResponsiveBehavior: Story = {
  render: () => (
    <div className="space-y-8 bg-hive-background-primary min-h-screen">
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-hive-text-primary mb-2">Responsive Container Behavior</h2>
        <p className="text-hive-text-secondary">Resize your browser to see responsive behavior</p>
      </div>

      {/* Gutter padding demonstration */}
      <Container maxWidth="4xl" center gutter padding="lg" variant="card">
        <h3 className="text-xl font-semibold text-hive-text-primary mb-4">Responsive Gutter Padding</h3>
        <p className="text-hive-text-secondary mb-4">
          This container uses responsive gutter padding that adjusts based on screen size:
        </p>
        <ul className="text-sm text-hive-text-mutedLight space-y-1">
          <li>• Mobile: px-4 (16px horizontal padding)</li>
          <li>• Small screens: px-6 (24px horizontal padding)</li>
          <li>• Medium screens: px-8 (32px horizontal padding)</li>
          <li>• Large screens: px-12 (48px horizontal padding)</li>
          <li>• Extra large: px-16 (64px horizontal padding)</li>
        </ul>
      </Container>

      {/* Nested containers */}
      <PageContainer variant="section" padding="xl">
        <ContentContainer variant="card" padding="lg">
          <NarrowContainer padding="md">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Nested Containers</h3>
              <p className="text-hive-text-secondary">
                Page Container &gt; Content Container &gt; Narrow Container
              </p>
            </div>
          </NarrowContainer>
        </ContentContainer>
      </PageContainer>

      {/* Breakout container */}
      <ContentContainer padding="lg">
        <div className="mb-6">
          <h3 className="text-xl font-semibold text-hive-text-primary mb-2">Content in Regular Container</h3>
          <p className="text-hive-text-secondary">This content is constrained by the container width.</p>
        </div>
        
        <BreakoutContainer variant="section" padding="xl">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-hive-text-primary mb-2">Breakout Container</h3>
            <p className="text-hive-text-secondary">
              This container breaks out of the parent's width constraints and spans the full viewport width.
            </p>
          </div>
        </BreakoutContainer>
        
        <div className="mt-6">
          <p className="text-hive-text-secondary">Back to regular container-constrained content.</p>
        </div>
      </ContentContainer>
    </div>
  ),
};

// Preset components showcase
export const PresetComponents: Story = {
  render: () => (
    <div className="space-y-8 bg-hive-background-primary">
      <div className="text-center py-8">
        <h2 className="text-2xl font-bold text-hive-text-primary mb-2">Container Presets</h2>
        <p className="text-hive-text-secondary">Pre-configured containers for common use cases</p>
      </div>

      {/* Size presets */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold text-hive-text-primary text-center">Size Presets</h3>
        
        <SmallContainer variant="card" padding="md">
          <div className="text-center">
            <h4 className="font-semibold text-hive-text-primary">Small Container</h4>
            <p className="text-sm text-hive-text-secondary">Max width: 384px</p>
          </div>
        </SmallContainer>

        <MediumContainer variant="card" padding="md">
          <div className="text-center">
            <h4 className="font-semibold text-hive-text-primary">Medium Container</h4>
            <p className="text-sm text-hive-text-secondary">Max width: 448px</p>
          </div>
        </MediumContainer>

        <LargeContainer variant="card" padding="md">
          <div className="text-center">
            <h4 className="font-semibold text-hive-text-primary">Large Container</h4>
            <p className="text-sm text-hive-text-secondary">Max width: 512px</p>
          </div>
        </LargeContainer>

        <WideContainer variant="card" padding="md">
          <div className="text-center">
            <h4 className="font-semibold text-hive-text-primary">Wide Container</h4>
            <p className="text-sm text-hive-text-secondary">Max width: 1152px</p>
          </div>
        </WideContainer>
      </div>

      {/* Layout composition helpers */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-hive-text-primary text-center">Layout Composition Helpers</h3>
        
        <CenteredContent>
          <div className="text-center">
            <h4 className="font-semibold text-hive-text-primary mb-2">Centered Content</h4>
            <p className="text-hive-text-secondary">
              Pre-configured for centered content with max-width 4xl and large padding
            </p>
          </div>
        </CenteredContent>

        <FullWidthSection>
          <div className="text-center">
            <h4 className="font-semibold text-hive-text-primary mb-2">Full Width Section</h4>
            <p className="text-hive-text-secondary">
              Full-width section with centered inner content container
            </p>
          </div>
        </FullWidthSection>
      </div>

      {/* Fluid container */}
      <FluidContainer variant="panel" padding="lg">
        <div className="text-center">
          <h4 className="font-semibold text-hive-text-primary mb-2">Fluid Container</h4>
          <p className="text-hive-text-secondary">
            This container spans the full width of its parent container
          </p>
        </div>
      </FluidContainer>
    </div>
  ),
};

// Campus-specific use cases
export const CampusSpecificUseCases: Story = {
  render: () => (
    <div className="space-y-8 bg-hive-background-primary">
      <PageContainer variant="section" padding="lg">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-hive-text-primary mb-2">HIVE Campus Interface Examples</h2>
          <p className="text-hive-text-secondary">Real-world container usage in campus applications</p>
        </div>
      </PageContainer>

      {/* Tool builder interface */}
      <ContentContainer>
        <CardContainer padding="lg">
          <div className="border-b border-hive-border-subtle pb-4 mb-6">
            <h3 className="text-xl font-semibold text-hive-text-primary">Tool Builder Interface</h3>
            <p className="text-hive-text-secondary">Create and customize your campus tools</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <PanelContainer padding="lg">
                <h4 className="font-semibold text-hive-text-primary mb-4">Tool Canvas</h4>
                <div className="aspect-video bg-hive-background-tertiary rounded-lg border-2 border-dashed border-hive-border-default flex items-center justify-center">
                  <p className="text-hive-text-mutedLight">Drag components here to build your tool</p>
                </div>
              </PanelContainer>
            </div>
            
            <div>
              <CardContainer padding="md">
                <h4 className="font-semibold text-hive-text-primary mb-4">Components</h4>
                <div className="space-y-2">
                  {['Button', 'Input', 'Text', 'Image', 'Chart'].map((component, index) => (
                    <div key={index} className="p-3 bg-hive-background-tertiary rounded-lg text-sm text-hive-text-primary cursor-pointer hover:bg-hive-interactive-hover transition-colors">
                      {component}
                    </div>
                  ))}
                </div>
              </CardContainer>
            </div>
          </div>
        </CardContainer>
      </ContentContainer>

      {/* Study space directory */}
      <WideContainer>
        <SectionContainer padding="xl">
          <Container maxWidth="5xl" center padding="none">
            <h3 className="text-xl font-semibold text-hive-text-primary mb-6 text-center">Study Space Directory</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'CS 101 Study Group', members: 15, subject: 'Computer Science' },
                { name: 'Calculus Tutoring', members: 8, subject: 'Mathematics' },
                { name: 'Physics Lab Prep', members: 12, subject: 'Physics' },
                { name: 'Writing Workshop', members: 6, subject: 'English' },
                { name: 'Chemistry Review', members: 10, subject: 'Chemistry' },
                { name: 'History Discussion', members: 9, subject: 'History' },
              ].map((space, index) => (
                <CardContainer key={index} padding="md">
                  <h4 className="font-semibold text-hive-text-primary mb-2">{space.name}</h4>
                  <p className="text-sm text-hive-text-secondary mb-1">{space.subject}</p>
                  <p className="text-xs text-hive-text-mutedLight">{space.members} members</p>
                </CardContainer>
              ))}
            </div>
          </Container>
        </SectionContainer>
      </WideContainer>

      {/* Profile showcase */}
      <NarrowContainer>
        <CardContainer padding="lg">
          <div className="text-center">
            <div className="w-24 h-24 bg-hive-gold rounded-full mx-auto mb-4 flex items-center justify-center">
              <span className="text-2xl font-bold text-hive-background-primary">AR</span>
            </div>
            <h3 className="text-xl font-semibold text-hive-text-primary mb-2">Alex Rodriguez</h3>
            <p className="text-hive-text-secondary mb-4">Computer Science Junior</p>
            
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-hive-text-primary">8</p>
                <p className="text-sm text-hive-text-secondary">Tools Built</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-hive-text-primary">5</p>
                <p className="text-sm text-hive-text-secondary">Study Groups</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-hive-text-primary">3.8</p>
                <p className="text-sm text-hive-text-secondary">GPA</p>
              </div>
            </div>
          </div>
        </CardContainer>
      </NarrowContainer>
    </div>
  ),
};

// Simple interactive
export const SimpleInteractive: Story = {
  args: {
    maxWidth: '4xl',
    padding: 'lg',
    center: true,
    fluid: false,
    breakout: false,
    variant: 'card',
    gutter: false,
    children: (
      <div className="text-center">
        <h3 className="text-lg font-semibold text-hive-text-primary mb-2">Interactive Container</h3>
        <p className="text-hive-text-secondary">Use controls to customize this container →</p>
      </div>
    ),
  },
};