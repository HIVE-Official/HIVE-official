import type { Meta, StoryObj } from '@storybook/react';
import { 
  HiveLogo, 
  Icon, 
  PlatformIcons,
  // Typography components
  Heading,
  Text,
  Caption,
  Link,
  Code,
  Blockquote,
  List,
  ListItem,
  TypographyPresets,
  // Icons
  Home, User, Settings, Heart, Search, Plus, 
  Loader2, CheckCircle, XCircle, GraduationCap,
} from '../../atomic/atoms';

const meta: Meta = {
  title: '01-Foundation/HIVE Foundation',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
# HIVE Foundation System

Complete foundation using our **actual design system**:
- **HIVE Logos**: Real black, gold, white SVG assets
- **PRD Color System**: Vercel-inspired monochrome with gold accent (#FFD700)
- **Typography**: Existing semantic token system
- **Lucide Icons**: Student-extensible icon system

## Our Color System
- **Black Foundation**: #000000 primary, #171717 secondary, #262626 tertiary
- **White Text**: #FFFFFF primary, #D4D4D4 secondary, #A3A3A3 tertiary  
- **Gold Accent**: #FFD700 (hive-brand-secondary)
- **Status Colors**: Success #00D46A, Error #FF3737, Warning #FFB800, Info #0070F3

## Typography Hierarchy
- **Space Grotesk**: Display font for headings and impact
- **Geist Sans**: Body font for readability and interface
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;

// HIVE Brand & Logos
export const HiveBrand: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Heading level={2} className="mb-4">HIVE Logos</Heading>
        <Caption className="mb-6">Using actual SVG assets from /assets/</Caption>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Gold Logo (Default) */}
          <div className="text-center space-y-4">
            <div className="bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-8">
              <HiveLogo size="3xl" color="gold" />
            </div>
            <div>
              <Text weight="medium">Gold Logo</Text>
              <Caption>Primary brand color (#FFD700)</Caption>
            </div>
          </div>
          
          {/* Black Logo */}
          <div className="text-center space-y-4">
            <div className="bg-white rounded-lg p-8 border">
              <HiveLogo size="3xl" color="black" />
            </div>
            <div>
              <Text weight="medium">Black Logo</Text>
              <Caption>On light backgrounds</Caption>
            </div>
          </div>
          
          {/* White Logo */}
          <div className="text-center space-y-4">
            <div className="bg-black rounded-lg p-8 border border-[var(--hive-border-default)]">
              <HiveLogo size="3xl" color="white" />
            </div>
            <div>
              <Text weight="medium">White Logo</Text>
              <Caption>On dark backgrounds</Caption>
            </div>
          </div>
        </div>
      </div>
      
      <div>
        <Heading level={3} className="mb-4">Logo Sizes</Heading>
        <div className="flex items-end space-x-6 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg p-6">
          <div className="text-center">
            <HiveLogo size="xs" />
            <Caption className="mt-2">xs</Caption>
          </div>
          <div className="text-center">
            <HiveLogo size="sm" />
            <Caption className="mt-2">sm</Caption>
          </div>
          <div className="text-center">
            <HiveLogo size="default" />
            <Caption className="mt-2">default</Caption>
          </div>
          <div className="text-center">
            <HiveLogo size="md" />
            <Caption className="mt-2">md</Caption>
          </div>
          <div className="text-center">
            <HiveLogo size="lg" />
            <Caption className="mt-2">lg</Caption>
          </div>
          <div className="text-center">
            <HiveLogo size="xl" />
            <Caption className="mt-2">xl</Caption>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Typography System
export const TypographySystem: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Heading level={2} className="mb-4">Typography Hierarchy</Heading>
        <Caption className="mb-6">Using semantic tokens with Space Grotesk (display) and Geist Sans (body)</Caption>
        
        <div className="space-y-6">
          <div>
            <Heading level={1}>Page Title (H1)</Heading>
            <Caption>font-display text-6xl leading-tight font-bold</Caption>
          </div>
          
          <div>
            <Heading level={2}>Section Header (H2)</Heading>
            <Caption>font-display text-5xl leading-tight font-semibold</Caption>
          </div>
          
          <div>
            <Heading level={3} color="brand">Space Title (H3) - Gold Accent</Heading>
            <Caption>font-display text-4xl leading-snug font-semibold</Caption>
          </div>
          
          <div>
            <Text size="lg">Large body text for emphasis and important content</Text>
            <Caption>font-sans text-lg leading-relaxed</Caption>
          </div>
          
          <div>
            <Text size="base">Base body text for posts, descriptions, and general content</Text>
            <Caption>font-sans text-base leading-relaxed</Caption>
          </div>
          
          <div>
            <Text size="sm" color="secondary">Small text for comments and metadata</Text>
            <Caption>font-sans text-sm leading-relaxed</Caption>
          </div>
        </div>
      </div>
      
      <div>
        <Heading level={3} className="mb-4">Color Variants</Heading>
        <div className="space-y-3">
          <Text color="primary">Primary text - main content</Text>
          <Text color="secondary">Secondary text - supporting content</Text>
          <Text color="tertiary">Tertiary text - subtle information</Text>
          <Text color="brand">Brand text - HIVE gold accent</Text>
          <Text color="success">Success text - positive feedback</Text>
          <Text color="error">Error text - error messages</Text>
          <Text color="warning">Warning text - caution</Text>
          <Text color="info">Info text - informational</Text>
        </div>
      </div>
    </div>
  ),
};

// Icon System
export const IconSystem: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Heading level={2} className="mb-4">Platform Icons</Heading>
        <Caption className="mb-6">Lucide icons with PRD color system</Caption>
        
        <div className="grid grid-cols-6 gap-6">
          <div className="text-center">
            <Icon icon={PlatformIcons.Profile} size="lg" color="brand" />
            <Caption className="mt-2">Profile</Caption>
          </div>
          <div className="text-center">
            <Icon icon={PlatformIcons.Spaces} size="lg" color="brand" />
            <Caption className="mt-2">Spaces</Caption>
          </div>
          <div className="text-center">
            <Icon icon={PlatformIcons.Tools} size="lg" color="brand" />
            <Caption className="mt-2">Tools</Caption>
          </div>
          <div className="text-center">
            <Icon icon={PlatformIcons.Feed} size="lg" color="brand" />
            <Caption className="mt-2">Feed</Caption>
          </div>
          <div className="text-center">
            <Icon icon={PlatformIcons.Lab} size="lg" color="brand" />
            <Caption className="mt-2">HIVE Lab</Caption>
          </div>
          <div className="text-center">
            <Icon icon={PlatformIcons.Calendar} size="lg" color="brand" />
            <Caption className="mt-2">Calendar</Caption>
          </div>
        </div>
      </div>
      
      <div>
        <Heading level={3} className="mb-4">University Context</Heading>
        <div className="grid grid-cols-3 gap-6">
          <div className="text-center">
            <Icon icon={PlatformIcons.University} size="lg" color="info" />
            <Caption className="mt-2">University</Caption>
          </div>
          <div className="text-center">
            <Icon icon={PlatformIcons.Residential} size="lg" color="success" />
            <Caption className="mt-2">Residential</Caption>
          </div>
          <div className="text-center">
            <Icon icon={PlatformIcons.Greek} size="lg" color="warning" />
            <Caption className="mt-2">Greek Life</Caption>
          </div>
        </div>
      </div>
      
      <div>
        <Heading level={3} className="mb-4">Interactive States</Heading>
        <Caption className="mb-4">Hover these icons to see interaction</Caption>
        <div className="flex space-x-4">
          <Icon icon={Heart} size="lg" interactive />
          <Icon icon={Search} size="lg" interactive />
          <Icon icon={Settings} size="lg" interactive />
          <Icon icon={Plus} size="lg" interactive />
        </div>
      </div>
    </div>
  ),
};

// Color System
export const ColorSystem: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Heading level={2} className="mb-4">PRD Color System</Heading>
        <Caption className="mb-6">Vercel-inspired monochrome with gold accent</Caption>
        
        {/* Background Colors */}
        <div className="space-y-4">
          <Heading level={4}>Backgrounds</Heading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)] rounded-lg"></div>
              <Text size="sm" className="mt-2">Primary</Text>
              <Caption>#000000</Caption>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] rounded-lg"></div>
              <Text size="sm" className="mt-2">Secondary</Text>
              <Caption>#171717</Caption>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[var(--hive-background-tertiary)] border border-[var(--hive-border-default)] rounded-lg"></div>
              <Text size="sm" className="mt-2">Tertiary</Text>
              <Caption>#262626</Caption>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[var(--hive-interactive-hover)] border border-[var(--hive-border-default)] rounded-lg"></div>
              <Text size="sm" className="mt-2">Interactive</Text>
              <Caption>rgba(255,255,255,0.04)</Caption>
            </div>
          </div>
        </div>
        
        {/* Brand Colors */}
        <div className="space-y-4">
          <Heading level={4}>Brand Colors</Heading>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[var(--hive-brand-primary)] rounded-lg"></div>
              <Text size="sm" className="mt-2">Primary</Text>
              <Caption>#0070F3</Caption>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[var(--hive-brand-secondary)] rounded-lg"></div>
              <Text size="sm" className="mt-2">Secondary (Gold)</Text>
              <Caption>#FFD700</Caption>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[var(--hive-brand-hover)] rounded-lg"></div>
              <Text size="sm" className="mt-2">Hover</Text>
              <Caption>#0761D1</Caption>
            </div>
          </div>
        </div>
        
        {/* Status Colors */}
        <div className="space-y-4">
          <Heading level={4}>Status Colors</Heading>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[var(--hive-status-success)] rounded-lg"></div>
              <Text size="sm" className="mt-2">Success</Text>
              <Caption>#00D46A</Caption>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[var(--hive-status-error)] rounded-lg"></div>
              <Text size="sm" className="mt-2">Error</Text>
              <Caption>#FF3737</Caption>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[var(--hive-status-warning)] rounded-lg"></div>
              <Text size="sm" className="mt-2">Warning</Text>
              <Caption>#FFB800</Caption>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto bg-[var(--hive-status-info)] rounded-lg"></div>
              <Text size="sm" className="mt-2">Info</Text>
              <Caption>#0070F3</Caption>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
};

// Real Platform Examples
export const PlatformExamples: StoryObj = {
  render: () => (
    <div className="space-y-8">
      <div>
        <Heading level={2} className="mb-4">Platform Examples</Heading>
        <Caption className="mb-6">Real components using our design system</Caption>
        
        {/* Navigation Example */}
        <div className="border border-[var(--hive-border-default)] rounded-lg p-4 bg-[var(--hive-background-secondary)] mb-6">
          <Text weight="medium" className="mb-3">Navigation Bar</Text>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <HiveLogo size="md" />
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Icon icon={Home} color="brand" />
                  <Text size="sm">Feed</Text>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon icon={User} color="primary" />
                  <Text size="sm">Profile</Text>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon icon={PlatformIcons.Spaces} color="primary" />
                  <Text size="sm">Spaces</Text>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon icon={PlatformIcons.Tools} color="primary" />
                  <Text size="sm">Tools</Text>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Icon icon={Search} interactive />
              <Icon icon={Settings} interactive />
            </div>
          </div>
        </div>
        
        {/* Space Card Example */}
        <div className="border border-[var(--hive-border-default)] rounded-lg p-6 bg-[var(--hive-background-secondary)] mb-6">
          <Text weight="medium" className="mb-3">Space Card</Text>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[var(--hive-background-tertiary)] rounded-lg flex items-center justify-center border border-[var(--hive-border-default)]">
                <Icon icon={GraduationCap} color="brand" size="md" />
              </div>
              <div>
                <Heading level={4} color="brand">Computer Science Club</Heading>
                <div className="flex items-center space-x-2 mt-1">
                  <Icon icon={PlatformIcons.University} size="xs" color="tertiary" />
                  <Text size="sm" color="secondary">University • 1,247 members</Text>
                  <Icon icon={CheckCircle} size="xs" color="success" />
                  <Text size="sm" color="success">Active</Text>
                </div>
                <Text size="sm" color="tertiary" className="mt-2">
                  Weekly coding challenges, hackathons, and career development workshops
                </Text>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Icon icon={Heart} color="tertiary" interactive />
              <Icon icon={Bookmark} color="tertiary" interactive />
            </div>
          </div>
        </div>
        
        {/* Tool Card Example */}
        <div className="border border-[var(--hive-border-default)] rounded-lg p-6 bg-[var(--hive-background-secondary)]">
          <Text weight="medium" className="mb-3">Tool Card</Text>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-[var(--hive-background-tertiary)] rounded-lg flex items-center justify-center border border-[var(--hive-border-default)]">
                <Icon icon={PlatformIcons.Builder} color="brand" size="md" />
              </div>
              <div>
                <Heading level={4}>Study Group Scheduler</Heading>
                <div className="flex items-center space-x-2 mt-1">
                  <Text size="sm" color="secondary">Created by Alex Chen</Text>
                  <Icon icon={PlatformIcons.Builder} size="xs" color="brand" />
                  <Text size="sm" color="brand">Builder</Text>
                </div>
                <Text size="sm" color="tertiary" className="mt-2">
                  Coordinate study sessions with automatic calendar integration
                </Text>
                <div className="flex items-center space-x-4 mt-3">
                  <div className="text-center">
                    <Text weight="bold" color="brand">1.2k</Text>
                    <Caption>Installs</Caption>
                  </div>
                  <div className="text-center">
                    <Text weight="bold" color="success">4.8</Text>
                    <Caption>Rating</Caption>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: 'padded',
  },
};