import type { Meta, StoryObj } from '@storybook/react';
import { 
  Heading, 
  Text, 
  Caption, 
  Link, 
  Code, 
  Blockquote, 
  List, 
  ListItem, 
  TypographyPresets 
} from '../../atomic/atoms/typography';

const meta: Meta<typeof Heading> = {
  title: '01-Atoms/Typography',
  component: Heading,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'HIVE typography system with semantic tokens, heading hierarchy, and campus-specific content styling.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Complete typography system showcase
export const TypographySystem: Story = {
  render: () => (
    <div className="space-y-12 max-w-4xl p-6 bg-hive-background-primary">
      {/* Heading Hierarchy */}
      <section>
        <Text size="sm" color="secondary" weight="semibold" className="mb-6 uppercase tracking-wider">
          Heading Hierarchy
        </Text>
        <div className="space-y-4">
          <Heading level={1}>Level 1 - Hero Headlines</Heading>
          <Heading level={2}>Level 2 - Page Titles</Heading>
          <Heading level={3}>Level 3 - Section Headers</Heading>
          <Heading level={4}>Level 4 - Subsection Headers</Heading>
          <Heading level={5}>Level 5 - Component Titles</Heading>
          <Heading level={6}>Level 6 - Small Headers</Heading>
        </div>
      </section>

      {/* Text Sizes */}
      <section>
        <Text size="sm" color="secondary" weight="semibold" className="mb-6 uppercase tracking-wider">
          Text Sizes
        </Text>
        <div className="space-y-3">
          <Text size="xl">Extra Large Text - For emphasis and introductions</Text>
          <Text size="lg">Large Text - For important body content</Text>
          <Text size="base">Base Text - Standard paragraph text for most content</Text>
          <Text size="sm">Small Text - For secondary information and metadata</Text>
          <Text size="xs">Extra Small Text - For fine print and annotations</Text>
        </div>
      </section>

      {/* Color Variants */}
      <section>
        <Text size="sm" color="secondary" weight="semibold" className="mb-6 uppercase tracking-wider">
          Color Variants
        </Text>
        <div className="space-y-2">
          <Text color="primary">Primary text color - Main content</Text>
          <Text color="secondary">Secondary text color - Supporting information</Text>
          <Text color="tertiary">Tertiary text color - Less important content</Text>
          <Text color="disabled">Disabled text color - Inactive elements</Text>
          <Text color="brand">Brand text color - HIVE gold accent</Text>
          <Text color="success">Success text color - Positive feedback</Text>
          <Text color="error">Error text color - Error messages</Text>
          <Text color="warning">Warning text color - Cautionary information</Text>
          <Text color="info">Info text color - Informational content</Text>
        </div>
      </section>

      {/* Font Weights */}
      <section>
        <Text size="sm" color="secondary" weight="semibold" className="mb-6 uppercase tracking-wider">
          Font Weights
        </Text>
        <div className="space-y-2">
          <Text weight="light">Light weight - Elegant and minimal</Text>
          <Text weight="normal">Normal weight - Standard readable text</Text>
          <Text weight="medium">Medium weight - Slightly emphasized</Text>
          <Text weight="semibold">Semibold weight - Important information</Text>
          <Text weight="bold">Bold weight - Strong emphasis</Text>
        </div>
      </section>

      {/* Captions */}
      <section>
        <Text size="sm" color="secondary" weight="semibold" className="mb-6 uppercase tracking-wider">
          Captions
        </Text>
        <div className="space-y-2">
          <Caption>Default caption text</Caption>
          <Caption color="brand">Brand colored caption</Caption>
          <Caption color="success" weight="medium">Success caption with medium weight</Caption>
          <Caption color="error">Error caption text</Caption>
        </div>
      </section>

      {/* Links */}
      <section>
        <Text size="sm" color="secondary" weight="semibold" className="mb-6 uppercase tracking-wider">
          Links
        </Text>
        <div className="space-y-2">
          <div><Link href="#" color="brand">Brand link (default)</Link></div>
          <div><Link href="#" color="primary">Primary text link</Link></div>
          <div><Link href="#" color="secondary">Secondary text link</Link></div>
          <div><Link href="#" decoration="always">Always underlined link</Link></div>
          <div><Link href="#" decoration="none">No decoration link</Link></div>
        </div>
      </section>

      {/* Code */}
      <section>
        <Text size="sm" color="secondary" weight="semibold" className="mb-6 uppercase tracking-wider">
          Code Elements
        </Text>
        <div className="space-y-4">
          <Text>
            Here's some inline code: <Code>npm install @hive/ui</Code> for installation.
          </Text>
          <Code variant="block">
{`// Example component usage
import { Button } from '@hive/ui';

export function MyComponent() {
  return <Button variant="primary">Click me</Button>;
}`}
          </Code>
        </div>
      </section>

      {/* Lists */}
      <section>
        <Text size="sm" color="secondary" weight="semibold" className="mb-6 uppercase tracking-wider">
          Lists
        </Text>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Text weight="medium" className="mb-3">Unordered List:</Text>
            <List variant="unordered">
              <ListItem>Connect with classmates</ListItem>
              <ListItem>Join study groups</ListItem>
              <ListItem>Access campus tools</ListItem>
              <ListItem>Build useful applications</ListItem>
            </List>
          </div>
          <div>
            <Text weight="medium" className="mb-3">Ordered List:</Text>
            <List variant="ordered">
              <ListItem>Create your profile</ListItem>
              <ListItem>Explore available spaces</ListItem>
              <ListItem>Join relevant communities</ListItem>
              <ListItem>Start building tools</ListItem>
            </List>
          </div>
        </div>
      </section>

      {/* Blockquote */}
      <section>
        <Text size="sm" color="secondary" weight="semibold" className="mb-6 uppercase tracking-wider">
          Blockquotes
        </Text>
        <Blockquote>
          "HIVE is social utility — where every connection has purpose, every community solves problems, 
          and every interaction moves your life forward."
        </Blockquote>
      </section>

      {/* Typography Presets */}
      <section>
        <Text size="sm" color="secondary" weight="semibold" className="mb-6 uppercase tracking-wider">
          Typography Presets
        </Text>
        <div className="space-y-4">
          <TypographyPresets.PageTitle>Page Title Preset</TypographyPresets.PageTitle>
          <TypographyPresets.SectionTitle>Section Title Preset</TypographyPresets.SectionTitle>
          <TypographyPresets.CardTitle>Card Title Preset</TypographyPresets.CardTitle>
          <TypographyPresets.Body>Body text preset for standard paragraphs.</TypographyPresets.Body>
          <TypographyPresets.Small>Small text preset for secondary information.</TypographyPresets.Small>
          <TypographyPresets.CaptionText>Caption text preset for annotations.</TypographyPresets.CaptionText>
          <TypographyPresets.BrandText>Brand text preset with HIVE gold.</TypographyPresets.BrandText>
          <TypographyPresets.ErrorText>Error text preset for validation messages.</TypographyPresets.ErrorText>
          <TypographyPresets.SuccessText>Success text preset for positive feedback.</TypographyPresets.SuccessText>
        </div>
      </section>
    </div>
  ),
};

// Campus content example
export const CampusContentExample: Story = {
  render: () => (
    <div className="max-w-4xl space-y-8 p-6 bg-hive-background-primary">
      <article className="space-y-6">
        <header className="text-center">
          <TypographyPresets.PageTitle color="brand">
            Welcome to HIVE at Tech University
          </TypographyPresets.PageTitle>
          <Text size="lg" color="secondary" className="mt-4">
            Where connections have purpose and community gets things done
          </Text>
          <Caption color="tertiary" className="mt-2">
            Last updated March 15, 2024
          </Caption>
        </header>

        <section className="space-y-4">
          <TypographyPresets.SectionTitle>What is HIVE?</TypographyPresets.SectionTitle>
          <TypographyPresets.Body>
            HIVE is the first social platform where connections form around solving real problems together. 
            Most social platforms are entertainment dressed up as connection — endless scrolling, artificial 
            engagement, dopamine hits that leave you emptier than before.
          </TypographyPresets.Body>
          <TypographyPresets.Body>
            <TypographyPresets.BrandText as="span">HIVE is social utility</TypographyPresets.BrandText> — where every 
            connection has purpose, every community solves problems, and every interaction moves your life forward.
          </TypographyPresets.Body>
        </section>

        <section className="space-y-4">
          <TypographyPresets.SectionTitle>For Students</TypographyPresets.SectionTitle>
          <TypographyPresets.Body>
            Connect with classmates, organize study sessions, and access tools built by your peers:
          </TypographyPresets.Body>
          <List variant="unordered">
            <ListItem>Join <Link href="#" color="brand">study groups</Link> in your major</ListItem>
            <ListItem>Discover <Link href="#" color="brand">campus spaces</Link> for collaboration</ListItem>
            <ListItem>Access <Link href="#" color="brand">productivity tools</Link> built by students</ListItem>
            <ListItem>Share resources and coordinate events</ListItem>
          </List>
        </section>

        <section className="space-y-4">
          <TypographyPresets.SectionTitle>For Builders</TypographyPresets.SectionTitle>
          <TypographyPresets.Body>
            Create tools that solve real campus problems and help fellow students succeed:
          </TypographyPresets.Body>
          <List variant="ordered">
            <ListItem>Identify problems your community faces</ListItem>
            <ListItem>Build solutions using our development platform</ListItem>
            <ListItem>Share your tools with relevant campus spaces</ListItem>
            <ListItem>Iterate based on user feedback and usage</ListItem>
          </List>
        </section>

        <Blockquote className="my-8">
          "The magic happens when social meets utility. Your Profile isn't a highlight reel — it's your 
          campus command center. Your Spaces aren't just discussion forums — they're functional communities 
          where things actually get done."
        </Blockquote>

        <section className="space-y-4">
          <TypographyPresets.SectionTitle>Getting Started</TypographyPresets.SectionTitle>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <TypographyPresets.CardTitle>Quick Setup</TypographyPresets.CardTitle>
              <TypographyPresets.Body>
                Install the HIVE mobile app and complete your profile setup:
              </TypographyPresets.Body>
              <Code>npm install -g @hive/cli</Code>
              <TypographyPresets.Small>
                Or download from the <Link href="#" color="brand">App Store</Link> or <Link href="#" color="brand">Google Play</Link>
              </TypographyPresets.Small>
            </div>
            <div className="space-y-3">
              <TypographyPresets.CardTitle>Join Your First Space</TypographyPresets.CardTitle>
              <TypographyPresets.Body>
                Find communities relevant to your interests and academic goals:
              </TypographyPresets.Body>
              <List variant="unordered">
                <ListItem>Your residence hall floor</ListItem>
                <ListItem>Major-specific study groups</ListItem>
                <ListItem>Campus clubs and organizations</ListItem>
              </List>
            </div>
          </div>
        </section>

        <footer className="border-t border-hive-border-subtle pt-6">
          <Caption>
            Questions? Visit our <Link href="#" color="brand">Help Center</Link> or contact{' '}
            <Link href="mailto:support@hive.university" color="brand">support@hive.university</Link>
          </Caption>
        </footer>
      </article>
    </div>
  ),
};

// Individual component stories
export const HeadingComponent: Story = {
  render: () => (
    <div className="space-y-4">
      <Heading level={1} color="brand">HIVE Campus Platform</Heading>
      <Heading level={2} color="primary">Build. Connect. Succeed.</Heading>
      <Heading level={3} weight="medium">Tools for Campus Life</Heading>
    </div>
  ),
};

export const TextComponent: Story = {
  render: () => (
    <div className="space-y-3 max-w-2xl">
      <Text size="lg">
        Large text perfect for introductory paragraphs and important announcements.
      </Text>
      <Text size="base">
        Base text size for standard content, articles, and general information throughout the platform.
      </Text>
      <Text size="sm" color="secondary">
        Small text for metadata, timestamps, and secondary information.
      </Text>
    </div>
  ),
};

export const LinkComponent: Story = {
  render: () => (
    <div className="space-y-3">
      <Text>
        Visit the <Link href="#" color="brand">HIVE documentation</Link> to learn more about building tools.
      </Text>
      <Text>
        Need help? Check out our <Link href="#" color="primary" decoration="always">support resources</Link> or 
        contact <Link href="mailto:help@hive.university" color="brand">help@hive.university</Link>.
      </Text>
    </div>
  ),
};

export const CodeComponent: Story = {
  render: () => (
    <div className="space-y-4">
      <Text>
        To install HIVE CLI, run <Code>npm install -g @hive/cli</Code> in your terminal.
      </Text>
      <Code variant="block">
{`// Example HIVE tool configuration
export default {
  name: "GPA Calculator",
  version: "1.0.0",
  description: "Calculate semester and cumulative GPA",
  author: "student@university.edu",
  permissions: ["academic_data"],
  ui: {
    theme: "hive-gold",
    responsive: true
  }
}`}
      </Code>
    </div>
  ),
};

export const InteractiveExample: Story = {
  args: {
    level: 2,
    color: 'primary',
    weight: 'semibold',
    children: 'Interactive Heading - Use controls to customize →',
  },
};