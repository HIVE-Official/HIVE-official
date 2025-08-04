import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../../atomic/atoms/text';

const meta: Meta<typeof Text> = {
  title: '01-Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE text component with semantic typography scale, colors, and campus-specific styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'],
      description: 'HTML element to render',
    },
    variant: {
      control: 'select',
      options: [
        'display-2xl', 'display-xl', 'display-lg', 'display-md', 'display-sm',
        'heading-xl', 'heading-lg', 'heading-md', 'heading-sm',
        'body-lg', 'body-md', 'body-sm', 'body-xs', 'body-2xs'
      ],
      description: 'Typography variant',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'mutedLight', 'mutedDark', 'subtle', 'gold', 'ruby', 'emerald'],
      description: 'Text color',
    },
    weight: {
      control: 'select',
      options: ['light', 'normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight override',
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
    },
    truncate: {
      control: 'boolean',
      description: 'Truncate text with ellipsis',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic variants
export const Default: Story = {
  args: {
    children: 'This is the default text component.',
  },
};

// Display scale
export const DisplayScale: Story = {
  render: () => (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-4">Display Scale</h3>
        <div className="space-y-4">
          <Text as="h1" variant="display-2xl" color="primary">
            Welcome to HIVE Campus
          </Text>
          <Text as="h1" variant="display-xl" color="primary">
            Build Tools. Connect Students.
          </Text>
          <Text as="h2" variant="display-lg" color="primary">
            Your Campus Community Hub
          </Text>
          <Text as="h2" variant="display-md" color="primary">
            Social Utility Platform
          </Text>
          <Text as="h3" variant="display-sm" color="primary">
            Where Connections Have Purpose
          </Text>
        </div>
      </div>
    </div>
  ),
};

// Heading scale
export const HeadingScale: Story = {
  render: () => (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-4">Heading Scale</h3>
        <div className="space-y-3">
          <Text as="h1" variant="heading-xl" color="primary">
            Extra Large Heading - Page Titles
          </Text>
          <Text as="h2" variant="heading-lg" color="primary">
            Large Heading - Section Titles
          </Text>
          <Text as="h3" variant="heading-md" color="primary">
            Medium Heading - Subsection Titles
          </Text>
          <Text as="h4" variant="heading-sm" color="primary">
            Small Heading - Component Titles
          </Text>
        </div>
      </div>
    </div>
  ),
};

// Body scale
export const BodyScale: Story = {
  render: () => (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-4">Body Scale</h3>
        <div className="space-y-3">
          <Text variant="body-lg" color="primary">
            Large Body - Perfect for introductory paragraphs and important content that needs emphasis.
          </Text>
          <Text variant="body-md" color="primary">
            Medium Body - The standard body text for most content, articles, and descriptions throughout HIVE.
          </Text>
          <Text variant="body-sm" color="secondary">
            Small Body - Used for secondary information, captions, and supportive text elements.
          </Text>
          <Text variant="body-xs" color="muted">
            Extra Small Body - For metadata, timestamps, and tertiary information.
          </Text>
          <Text variant="body-2xs" color="mutedLight">
            2XS Body - For fine print, legal text, and minimal annotations.
          </Text>
        </div>
      </div>
    </div>
  ),
};

// Color variants
export const ColorVariants: Story = {
  render: () => (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-4">Text Colors</h3>
        <div className="space-y-3">
          <Text variant="body-lg" color="primary">
            Primary Text - Main content and headings
          </Text>
          <Text variant="body-lg" color="secondary">
            Secondary Text - Supporting information
          </Text>
          <Text variant="body-lg" color="muted">
            Muted Text - Less important content
          </Text>
          <Text variant="body-lg" color="mutedLight">
            Muted Light - Subtle information
          </Text>
          <Text variant="body-lg" color="mutedDark">
            Muted Dark - Subdued but readable
          </Text>
          <Text variant="body-lg" color="subtle">
            Subtle Text - Barely visible accents
          </Text>
          <Text variant="body-lg" color="gold">
            Gold Text - HIVE brand accent
          </Text>
          <Text variant="body-lg" color="ruby">
            Ruby Text - Error states and warnings
          </Text>
          <Text variant="body-lg" color="emerald">
            Emerald Text - Success states and positive actions
          </Text>
        </div>
      </div>
    </div>
  ),
};

// Font weights
export const FontWeights: Story = {
  render: () => (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-4">Font Weights</h3>
        <div className="space-y-3">
          <Text variant="body-lg" weight="light">
            Light Weight - Elegant and minimal text
          </Text>
          <Text variant="body-lg" weight="normal">
            Normal Weight - Standard readable text
          </Text>
          <Text variant="body-lg" weight="medium">
            Medium Weight - Slightly emphasized text
          </Text>
          <Text variant="body-lg" weight="semibold">
            Semibold Weight - Important information
          </Text>
          <Text variant="body-lg" weight="bold">
            Bold Weight - Strong emphasis and attention
          </Text>
        </div>
      </div>
    </div>
  ),
};

// Text alignment
export const TextAlignment: Story = {
  render: () => (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-4">Text Alignment</h3>
        <div className="space-y-4 p-4 border border-hive-border-subtle rounded">
          <Text variant="body-md" align="left">
            Left aligned text - This is the default alignment for most text content.
          </Text>
          <Text variant="body-md" align="center">
            Center aligned text - Perfect for titles, callouts, and emphasis.
          </Text>
          <Text variant="body-md" align="right">
            Right aligned text - Useful for metadata, timestamps, and navigation.
          </Text>
        </div>
      </div>
    </div>
  ),
};

// Campus scenarios
export const CampusScenarios: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-hive-background-primary max-w-4xl">
      <div>
        <Text as="h1" variant="display-lg" color="gold" align="center">
          Welcome to HIVE at Tech University
        </Text>
        <Text variant="body-lg" color="secondary" align="center" className="mt-4">
          Where connections have purpose and community gets things done.
        </Text>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Text as="h2" variant="heading-lg" color="primary">
            For Students
          </Text>
          <Text variant="body-md" color="secondary">
            Join study groups, find your community, and access tools built by your peers.
          </Text>
          <div className="space-y-2">
            <Text variant="body-sm" color="emerald" weight="medium">
              ✓ Connect with classmates
            </Text>
            <Text variant="body-sm" color="emerald" weight="medium">
              ✓ Organize study sessions
            </Text>
            <Text variant="body-sm" color="emerald" weight="medium">
              ✓ Access campus resources
            </Text>
          </div>
        </div>

        <div className="space-y-4">
          <Text as="h2" variant="heading-lg" color="primary">
            For Builders
          </Text>
          <Text variant="body-md" color="secondary">
            Create tools that solve real campus problems and help fellow students succeed.
          </Text>
          <div className="space-y-2">
            <Text variant="body-sm" color="gold" weight="medium">
              ⚡ Build useful tools
            </Text>
            <Text variant="body-sm" color="gold" weight="medium">
              ⚡ Share with community
            </Text>
            <Text variant="body-sm" color="gold" weight="medium">
              ⚡ Make impact on campus
            </Text>
          </div>
        </div>
      </div>

      <div className="border-t border-hive-border-subtle pt-6">
        <Text as="h3" variant="heading-md" color="primary" className="mb-4">
          Recent Activity
        </Text>
        <div className="space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <Text variant="body-md" color="primary" weight="medium">
                Marcus built GPA Calculator Pro
              </Text>
              <Text variant="body-sm" color="mutedLight">
                A comprehensive tool for tracking academic progress
              </Text>
            </div>
            <Text variant="body-xs" color="muted">
              2 hours ago
            </Text>
          </div>
          
          <div className="flex justify-between items-start">
            <div>
              <Text variant="body-md" color="primary" weight="medium">
                Sarah created CS 101 Study Group
              </Text>
              <Text variant="body-sm" color="mutedLight">
                Weekly sessions every Tuesday at the library
              </Text>
            </div>
            <Text variant="body-xs" color="muted">
              5 hours ago
            </Text>
          </div>
          
          <div className="flex justify-between items-start">
            <div>
              <Text variant="body-md" color="primary" weight="medium">
                Floor 3B shared Laundry Tracker
              </Text>
              <Text variant="body-sm" color="mutedLight">
                Never miss your laundry again with real-time notifications
              </Text>
            </div>
            <Text variant="body-xs" color="muted">
              1 day ago
            </Text>
          </div>
        </div>
      </div>

      <div className="bg-hive-surface-elevated p-6 rounded-lg">
        <Text as="h3" variant="heading-sm" color="gold" className="mb-3">
          Featured Tool of the Week
        </Text>
        <Text variant="body-lg" color="primary" weight="semibold" className="mb-2">
          Study Schedule Optimizer
        </Text>
        <Text variant="body-md" color="secondary" className="mb-4">
          AI-powered scheduling that finds the perfect study times based on your course load, 
          energy levels, and social commitments. Built by Alex from Computer Science.
        </Text>
        <div className="flex justify-between items-center">
          <Text variant="body-sm" color="emerald" weight="medium">
            1,247 students using this tool
          </Text>
          <Text variant="body-xs" color="muted">
            Updated 3 days ago
          </Text>
        </div>
      </div>
    </div>
  ),
};

// Truncation example
export const TruncationExample: Story = {
  render: () => (
    <div className="space-y-6 max-w-md">
      <div>
        <h3 className="text-sm font-semibold text-hive-text-secondary mb-4">Text Truncation</h3>
        <div className="space-y-3">
          <div>
            <Text variant="body-sm" color="mutedLight" className="mb-1">Normal text (wraps):</Text>
            <Text variant="body-md" color="primary">
              This is a very long text that would normally wrap to multiple lines when the container is too narrow.
            </Text>
          </div>
          
          <div>
            <Text variant="body-sm" color="mutedLight" className="mb-1">Truncated text:</Text>
            <Text variant="body-md" color="primary" truncate>
              This is a very long text that would normally wrap to multiple lines when the container is too narrow.
            </Text>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Interactive example
export const Interactive: Story = {
  args: {
    as: 'p',
    variant: 'body-md',
    color: 'primary',
    weight: 'normal',
    align: 'left',
    truncate: false,
    children: 'Edit this text using the controls panel →',
  },
};

// Semantic usage
export const SemanticUsage: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      <article className="space-y-6">
        <header>
          <Text as="h1" variant="display-md" color="primary">
            The Future of Campus Collaboration
          </Text>
          <Text variant="body-lg" color="secondary" className="mt-2">
            How HIVE is transforming the way students connect and build together
          </Text>
          <Text variant="body-sm" color="mutedLight" className="mt-4">
            Published on March 15, 2024 • 5 min read
          </Text>
        </header>
        
        <section className="space-y-4">
          <Text as="h2" variant="heading-lg" color="primary">
            The Problem with Traditional Social Networks
          </Text>
          <Text variant="body-md" color="primary">
            Most social platforms are entertainment dressed up as connection — endless scrolling, 
            artificial engagement, dopamine hits that leave you emptier than before. Campus life 
            deserves better than another app that fragments your attention and wastes your time.
          </Text>
          <Text variant="body-md" color="primary">
            <Text as="span" weight="semibold" color="gold">HIVE is social utility</Text> — where every 
            connection has purpose, every community solves problems, and every interaction moves your life forward.
          </Text>
        </section>
        
        <section className="space-y-4">
          <Text as="h2" variant="heading-lg" color="primary">
            Building the Solution
          </Text>
          <Text variant="body-md" color="primary">
            The magic happens when social meets utility. Your profile isn't a highlight reel — it's 
            your campus command center. Your spaces aren't just discussion forums — they're functional 
            communities where things actually get done.
          </Text>
        </section>
        
        <footer className="border-t border-hive-border-subtle pt-6">
          <Text variant="body-xs" color="mutedLight">
            Written by the HIVE Team • Share your thoughts on our community forum
          </Text>
        </footer>
      </article>
    </div>
  ),
};

// Responsive behavior
export const ResponsiveBehavior: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
  },
  render: () => (
    <div className="space-y-6 p-4">
      <Text as="h1" variant="display-xl" color="primary" align="center">
        Responsive Typography
      </Text>
      <Text variant="body-lg" color="secondary" align="center">
        Typography automatically adapts to different screen sizes for optimal readability.
      </Text>
      <div className="space-y-4">
        <Text as="h2" variant="heading-lg" color="primary">
          Mobile Optimized
        </Text>
        <Text variant="body-md" color="primary">
          Text scales appropriately on mobile devices while maintaining readability and hierarchy.
        </Text>
      </div>
    </div>
  ),
};