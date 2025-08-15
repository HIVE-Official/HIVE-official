import type { Meta, StoryObj } from '@storybook/react';
import { Text } from '../../../atomic/atoms/text';
import { HiveCard } from '../../../components/hive-card';

const meta: Meta<typeof Text> = {
  title: '02-atoms/Core Foundation/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Text Component** - A comprehensive typography system with semantic color tokens

Part of the HIVE Atomic Design System providing consistent text rendering across all applications.

## Features
- **14 Typography Variants**: Display, heading, and body scales with proper sizing
- **9 Semantic Colors**: Primary, secondary, muted variants, and accent colors
- **5 Font Weights**: Light to bold with proper hierarchy
- **3 Text Alignments**: Left, center, right alignment options
- **Semantic HTML**: Proper heading hierarchy with customizable rendering
- **Responsive**: Automatic scaling for mobile devices
- **Truncation**: Built-in text overflow handling
- **Design Token Integration**: Uses HIVE semantic color tokens

## Typography Scale
- **Display**: For hero sections and large headings (2xl to sm)
- **Heading**: For section titles and content hierarchy (xl to sm)
- **Body**: For paragraph text and UI labels (lg to 2xs)

## Color System
Uses semantic HIVE color tokens for consistent theming and accessibility.
        `
      }
    }
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: 'select',
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div'],
      description: 'HTML element to render'
    },
    variant: {
      control: 'select',
      options: [
        'display-2xl', 'display-xl', 'display-lg', 'display-md', 'display-sm',
        'heading-xl', 'heading-lg', 'heading-md', 'heading-sm',
        'body-lg', 'body-md', 'body-sm', 'body-xs', 'body-2xs'
      ],
      description: 'Typography variant (size and styling)'
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'mutedLight', 'mutedDark', 'subtle', 'gold', 'ruby', 'emerald'],
      description: 'Semantic color variant'
    },
    weight: {
      control: 'select',
      options: ['light', 'normal', 'medium', 'semibold', 'bold'],
      description: 'Font weight override'
    },
    align: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Text alignment'
    },
    truncate: {
      control: 'boolean',
      description: 'Enable text truncation with ellipsis'
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Text
export const Default: Story = {
  args: {
    children: 'The quick brown fox jumps over the lazy dog'
  }
};

// Display Scale
export const DisplayScale: Story = {
  render: () => (
    <div className="space-y-6 max-w-4xl">
      <Text variant="display-2xl" as="h1">
        Display 2XL - Hero Headlines
      </Text>
      
      <Text variant="display-xl" as="h1">
        Display XL - Major Announcements
      </Text>
      
      <Text variant="display-lg" as="h1">
        Display LG - Section Heroes
      </Text>
      
      <Text variant="display-md" as="h2">
        Display MD - Page Titles
      </Text>
      
      <Text variant="display-sm" as="h2">
        Display SM - Content Sections
      </Text>
    </div>
  )
};

// Heading Scale
export const HeadingScale: Story = {
  render: () => (
    <div className="space-y-4 max-w-4xl">
      <Text variant="heading-xl" as="h2">
        Heading XL - Primary Sections
      </Text>
      
      <Text variant="heading-lg" as="h3">
        Heading LG - Secondary Sections
      </Text>
      
      <Text variant="heading-md" as="h4">
        Heading MD - Subsections
      </Text>
      
      <Text variant="heading-sm" as="h5">
        Heading SM - Minor Headings
      </Text>
    </div>
  )
};

// Body Scale
export const BodyScale: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Text variant="body-lg">
        Body LG - Large paragraph text for enhanced readability and emphasis. Perfect for introductory content and important descriptions.
      </Text>
      
      <Text variant="body-md">
        Body MD - Standard paragraph text for most content. This is the default size for body copy, articles, and general text content throughout the application.
      </Text>
      
      <Text variant="body-sm">
        Body SM - Smaller text for secondary information, captions, and supporting details. Good for metadata and less prominent content.
      </Text>
      
      <Text variant="body-xs">
        Body XS - Small text for fine print, labels, and compact UI elements.
      </Text>
      
      <Text variant="body-2xs">
        Body 2XS - Minimal text for timestamps and micro-labels.
      </Text>
    </div>
  )
};

// Color Variants
export const ColorVariants: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Text color="primary">
        Primary - Main text color for primary content and headings
      </Text>
      
      <Text color="secondary">
        Secondary - Secondary text color for supporting information
      </Text>
      
      <Text color="muted">
        Muted - Muted text color for less important content
      </Text>
      
      <Text color="mutedLight">
        Muted Light - Lighter muted color for subtle text
      </Text>
      
      <Text color="mutedDark">
        Muted Dark - Darker muted color for emphasis within muted content
      </Text>
      
      <Text color="subtle">
        Subtle - Very subtle text for background information
      </Text>
      
      <Text color="gold">
        Gold - Brand accent color for premium features and highlights
      </Text>
      
      <Text color="ruby">
        Ruby - Error color for warnings and critical information
      </Text>
      
      <Text color="emerald">
        Emerald - Success color for positive feedback and confirmations
      </Text>
    </div>
  )
};

// Font Weights
export const FontWeights: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Text weight="light">
        Light Weight - Delicate and refined appearance for special use cases
      </Text>
      
      <Text weight="normal">
        Normal Weight - Standard text weight for body content and readable text
      </Text>
      
      <Text weight="medium">
        Medium Weight - Slightly emphasized text for subtle importance
      </Text>
      
      <Text weight="semibold">
        Semibold Weight - Strong emphasis for headings and important information
      </Text>
      
      <Text weight="bold">
        Bold Weight - Maximum emphasis for critical information and strong headings
      </Text>
    </div>
  )
};

// Text Alignment
export const TextAlignment: Story = {
  render: () => (
    <div className="space-y-6 w-full max-w-2xl">
      <div className="border border-[var(--hive-border-default)] rounded-lg p-4">
        <Text align="left" variant="heading-sm" className="mb-2">Left Aligned</Text>
        <Text align="left">
          This text is aligned to the left side of its container. This is the default alignment for most text content and provides natural reading flow for left-to-right languages.
        </Text>
      </div>
      
      <div className="border border-[var(--hive-border-default)] rounded-lg p-4">
        <Text align="center" variant="heading-sm" className="mb-2">Center Aligned</Text>
        <Text align="center">
          This text is centered within its container. Center alignment is often used for headings, callouts, and content that needs visual balance and emphasis.
        </Text>
      </div>
      
      <div className="border border-[var(--hive-border-default)] rounded-lg p-4">
        <Text align="right" variant="heading-sm" className="mb-2">Right Aligned</Text>
        <Text align="right">
          This text is aligned to the right side of its container. Right alignment is useful for numerical data, timestamps, and creating visual hierarchy.
        </Text>
      </div>
    </div>
  )
};

// Text Truncation
export const TextTruncation: Story = {
  render: () => (
    <div className="space-y-6 max-w-xs">
      <div>
        <Text variant="heading-sm" className="mb-2">Normal Text</Text>
        <Text>
          This is a long text that will wrap to multiple lines when it exceeds the container width, showing the natural text flow behavior.
        </Text>
      </div>
      
      <div>
        <Text variant="heading-sm" className="mb-2">Truncated Text</Text>
        <Text truncate>
          This is a long text that will be truncated with an ellipsis when it exceeds the container width, keeping it on a single line.
        </Text>
      </div>
    </div>
  )
};

// Semantic HTML Elements
export const SemanticElements: Story = {
  render: () => (
    <div className="space-y-4 max-w-2xl">
      <Text as="h1" variant="display-lg">H1 - Main Page Title</Text>
      <Text as="h2" variant="heading-xl">H2 - Major Section</Text>
      <Text as="h3" variant="heading-lg">H3 - Subsection</Text>
      <Text as="h4" variant="heading-md">H4 - Content Group</Text>
      <Text as="h5" variant="heading-sm">H5 - Minor Heading</Text>
      <Text as="h6" variant="heading-sm" weight="medium">H6 - Smallest Heading</Text>
      
      <Text as="p" variant="body-md">
        Paragraph - Standard body text content with proper semantic meaning for screen readers and SEO.
      </Text>
      
      <Text as="span" variant="body-sm" color="secondary">
        Span - Inline text element for styling portions of text within other elements.
      </Text>
      
      <Text as="div" variant="body-xs" color="muted">
        Div - Block element for structural text content that needs specific styling.
      </Text>
    </div>
  )
};

// Content Hierarchy Example
export const ContentHierarchy: Story = {
  render: () => (
    <HiveCard className="p-6 space-y-6 max-w-2xl">
      <Text as="h1" variant="display-md" color="primary">
        Getting Started with HIVE
      </Text>
      
      <Text variant="body-lg" color="secondary">
        Welcome to the HIVE ecosystem. This guide will help you understand the core concepts and get you up and running quickly.
      </Text>
      
      <Text as="h2" variant="heading-xl" color="primary">
        Core Concepts
      </Text>
      
      <Text variant="body-md">
        HIVE is built around three main concepts that work together to create powerful collaborative experiences.
      </Text>
      
      <Text as="h3" variant="heading-lg" color="primary">
        1. Spaces
      </Text>
      
      <Text variant="body-md" color="secondary">
        Spaces are collaborative environments where teams can work together on projects, share resources, and build tools.
      </Text>
      
      <Text as="h3" variant="heading-lg" color="primary">
        2. Tools
      </Text>
      
      <Text variant="body-md" color="secondary">
        Tools are custom applications built within spaces to solve specific problems and automate workflows.
      </Text>
      
      <Text as="h3" variant="heading-lg" color="primary">
        3. Community
      </Text>
      
      <Text variant="body-md" color="secondary">
        The HIVE community connects creators, sharing knowledge and collaborating on innovative solutions.
      </Text>
      
      <div className="mt-8 p-4 bg-gray-800 rounded-lg">
        <Text variant="body-sm" color="gold" weight="medium">
          💡 Pro Tip
        </Text>
        <Text variant="body-sm" color="muted" className="mt-2">
          Start by exploring existing spaces to understand how others are using HIVE, then create your own space to begin building.
        </Text>
      </div>
    </HiveCard>
  )
};

// Typography Combinations
export const TypographyCombinations: Story = {
  render: () => (
    <div className="space-y-8 max-w-4xl">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <Text as="h1" variant="display-xl" color="primary">
          Build the Future
        </Text>
        <Text variant="body-lg" color="secondary" className="max-w-2xl mx-auto">
          Create powerful tools and collaborate with innovators in the HIVE ecosystem. Join thousands of creators building the next generation of digital experiences.
        </Text>
      </div>
      
      {/* Feature Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 border border-[var(--hive-border-default)] rounded-lg space-y-3">
          <Text as="h3" variant="heading-md" color="gold">
            Create
          </Text>
          <Text variant="body-sm" color="secondary">
            Build custom tools and applications with our visual builder and powerful APIs.
          </Text>
          <Text variant="body-xs" color="muted">
            Available in Pro plan
          </Text>
        </div>
        
        <div className="p-6 border border-[var(--hive-border-default)] rounded-lg space-y-3">
          <Text as="h3" variant="heading-md" color="emerald">
            Collaborate
          </Text>
          <Text variant="body-sm" color="secondary">
            Work together in real-time with advanced collaboration features and shared workspaces.
          </Text>
          <Text variant="body-xs" color="muted">
            Free for all users
          </Text>
        </div>
        
        <div className="p-6 border border-[var(--hive-border-default)] rounded-lg space-y-3">
          <Text as="h3" variant="heading-md" color="ruby">
            Scale
          </Text>
          <Text variant="body-sm" color="secondary">
            Deploy and scale your tools to serve thousands of users with enterprise-grade infrastructure.
          </Text>
          <Text variant="body-xs" color="muted">
            Enterprise only
          </Text>
        </div>
      </div>
    </div>
  )
};

// Interactive Demo
export const Interactive: Story = {
  render: (args) => (
    <div className="max-w-2xl">
      <Text {...args} />
    </div>
  ),
  args: {
    as: 'p',
    variant: 'body-md',
    color: 'primary',
    weight: undefined,
    align: 'left',
    truncate: false,
    children: 'Customize this text using the controls below to see how different combinations of props affect the appearance and semantic meaning.'
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo - use the controls below to test different text configurations including variant, color, weight, alignment, and semantic HTML elements.'
      }
    }
  }
};