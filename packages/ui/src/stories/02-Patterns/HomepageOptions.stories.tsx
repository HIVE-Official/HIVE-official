import type { Meta, StoryObj } from '@storybook/react';
import { 
  HeroFirstHomepage,
  FeedFirstHomepage,
  DashboardFirstHomepage,
  CampusFirstHomepage,
  CommunityFirstHomepage
} from '../../components/page-layouts/homepage-options';

const meta = {
  component: React.Fragment,
  title: 'Page Layouts/📱 Homepage Options',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Homepage Layout Options

Five distinct homepage layouts that test different user experience approaches and information architecture strategies.

## 🎯 Layout Philosophies

### 1. **Hero-First** - Traditional SaaS Landing
Clean, professional approach with strong value proposition front and center. Best for conveying credibility and clear messaging.

### 2. **Feed-First** - Social Media Style
Immediate engagement with live campus activity. Shows real usage and creates FOMO. Best for demonstrating active community.

### 3. **Dashboard-First** - App-like Experience
Functional, utility-focused interface showing campus data and tools. Best for demonstrating practical value and organization.

### 4. **Campus-First** - Education Focused
Organized by familiar campus structures (dorms, majors, clubs). Best for intuitive navigation and academic context.

### 5. **Community-First** - Social Proof Heavy
Testimonials, success stories, and community impact. Best for building trust and demonstrating real results.

## 🧪 A/B Testing Applications

Each layout tests different user psychology:
- **Hero-First**: Clarity and value proposition
- **Feed-First**: Social proof and activity
- **Dashboard-First**: Utility and organization
- **Campus-First**: Familiarity and structure
- **Community-First**: Trust and belonging

## 🎨 Design Quality Features

All layouts feature:
- **Flawless Spacing**: Consistent 8px grid system with proper visual hierarchy
- **Professional Typography**: Clear type scale and proper line heights
- **Responsive Design**: Mobile-first approach with breakpoint optimization
- **Accessible Colors**: Proper contrast ratios and focus states
- **Micro-interactions**: Subtle hover effects and transitions
- **Brand Consistency**: HIVE design system compliance throughout
        `,
      },
    },
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const HeroFirst: Story = {
  render: () => <HeroFirstHomepage />,
  parameters: {
    docs: {
      description: {
        story: `
### Hero-First Layout
Traditional SaaS landing page approach with clear value proposition and strong call-to-action. 
Features prominent hero section, social proof stats, and feature showcase.

**Best for:** Clear messaging, professional credibility, value-focused onboarding
        `,
      },
    },
  },
};

export const FeedFirst: Story = {
  render: () => <FeedFirstHomepage />,
  parameters: {
    docs: {
      description: {
        story: `
### Feed-First Layout
Social media style interface showing live campus activity and conversations.
Creates immediate engagement and demonstrates active community.

**Best for:** Social proof, FOMO creation, community demonstration
        `,
      },
    },
  },
};

export const DashboardFirst: Story = {
  render: () => <DashboardFirstHomepage />,
  parameters: {
    docs: {
      description: {
        story: `
### Dashboard-First Layout
App-like experience with functional dashboard showing campus data, metrics, and tools.
Emphasizes utility and organization over marketing.

**Best for:** Power users, utility demonstration, data-driven onboarding
        `,
      },
    },
  },
};

export const CampusFirst: Story = {
  render: () => <CampusFirstHomepage />,
  parameters: {
    docs: {
      description: {
        story: `
### Campus-First Layout
Organized by familiar campus structures (dorms, majors, clubs).
Provides intuitive navigation based on existing mental models.

**Best for:** Academic context, familiar navigation, structured onboarding
        `,
      },
    },
  },
};

export const CommunityFirst: Story = {
  render: () => <CommunityFirstHomepage />,
  parameters: {
    docs: {
      description: {
        story: `
### Community-First Layout
Heavy emphasis on testimonials, success stories, and community impact.
Builds trust through social proof and real user experiences.

**Best for:** Trust building, social proof, community demonstration
        `,
      },
    },
  },
};

export const AllOptions: Story = {
  render: () => (
    <div className="bg-black text-white">
      <div className="p-8 text-center border-b border-white/10">
        <h1 className="text-3xl font-bold mb-4">HIVE Homepage Layout Options</h1>
        <p className="text-white/70 max-w-2xl mx-auto">
          Five distinct approaches to homepage design, each optimized for different user experiences and A/B testing scenarios.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8 p-8">
        {/* Hero-First Preview */}
        <div className="space-y-4">
          <div className="aspect-video bg-surface border border-white/10 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 bg-accent rounded-lg mx-auto mb-3"></div>
                <div className="text-sm font-semibold">Hero-First</div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Traditional SaaS Landing</h3>
            <p className="text-sm text-white/70">
              Clear value proposition with professional credibility focus
            </p>
          </div>
        </div>

        {/* Feed-First Preview */}
        <div className="space-y-4">
          <div className="aspect-video bg-surface border border-white/10 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-accent/5 to-accent/10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 bg-accent rounded-lg mx-auto mb-3"></div>
                <div className="text-sm font-semibold">Feed-First</div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Social Media Style</h3>
            <p className="text-sm text-white/70">
              Live campus activity with immediate engagement
            </p>
          </div>
        </div>

        {/* Dashboard-First Preview */}
        <div className="space-y-4">
          <div className="aspect-video bg-surface border border-white/10 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 bg-accent rounded-lg mx-auto mb-3"></div>
                <div className="text-sm font-semibold">Dashboard-First</div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">App-like Experience</h3>
            <p className="text-sm text-white/70">
              Functional dashboard with campus data and tools
            </p>
          </div>
        </div>

        {/* Campus-First Preview */}
        <div className="space-y-4">
          <div className="aspect-video bg-surface border border-white/10 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-accent/5 to-accent/10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 bg-accent rounded-lg mx-auto mb-3"></div>
                <div className="text-sm font-semibold">Campus-First</div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Education Focused</h3>
            <p className="text-sm text-white/70">
              Organized by familiar campus structures
            </p>
          </div>
        </div>

        {/* Community-First Preview */}
        <div className="space-y-4">
          <div className="aspect-video bg-surface border border-white/10 rounded-lg overflow-hidden">
            <div className="w-full h-full bg-gradient-to-br from-white/5 to-white/10 flex items-center justify-center">
              <div className="text-center">
                <div className="w-8 h-8 bg-accent rounded-lg mx-auto mb-3"></div>
                <div className="text-sm font-semibold">Community-First</div>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Social Proof Heavy</h3>
            <p className="text-sm text-white/70">
              Testimonials and community impact focus
            </p>
          </div>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: `
### Layout Comparison Overview
Visual comparison of all five homepage layout approaches, showing the different strategies for user onboarding and value communication.
        `,
      },
    },
  },
};