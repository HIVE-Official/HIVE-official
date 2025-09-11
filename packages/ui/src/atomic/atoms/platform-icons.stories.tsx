import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { HiveIcon, PlatformIcons, PlatformIconProps } from './platform-icons';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import '../../hive-tokens.css';

const meta: Meta<typeof HiveIcon> = {
  title: '01-Atoms/Platform Icons - COMPLETE DEFINITION',
  component: HiveIcon,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Platform Icons - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated platform icon system for University at Buffalo campus navigation and feature identification.

### 🏆 **COMPONENT EXCELLENCE**
- **11 Platform Icons** - Complete icon set for all HIVE platform features and sections
- **5 Icon Sizes** - XS to XL with perfect visual scaling and mobile optimization
- **Smart Logo Handling** - Custom HIVE logo with intelligent fallback to Lucide Hexagon
- **Semantic Integration** - Icons represent platform features with clear campus context
- **Lucide Foundation** - Built on industry-standard Lucide React icon library
- **Campus Navigation Ready** - Optimized for UB platform navigation and feature discovery
- **Perfect Accessibility** - Screen reader friendly with semantic naming

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo platform navigation and feature identification:
- **Profile Navigation** - Student profiles, academic information, personal dashboards
- **Spaces Discovery** - Campus communities, study groups, academic spaces
- **Tools Access** - Campus utilities, academic tools, productivity features
- **Feed Browsing** - Social activity, campus updates, community engagement
- **Lab Features** - Experimental tools, beta features, advanced functionality
- **Calendar Integration** - Academic schedules, events, campus activities

### 📱 **MOBILE OPTIMIZATION**
- **Touch Recognition** - Icons sized for easy mobile navigation and identification
- **Visual Clarity** - Sharp rendering at all sizes across device types
- **Thumb Navigation** - Optimal sizing for single-handed mobile browsing
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Icon size (all optimized for mobile and desktop)',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes for styling',
    },
  },
};

export default meta;
type Story = StoryObj<typeof HiveIcon>;

// Default icon showcase
export const Default: Story = {
  args: {
    size: 'md',
    className: 'text-[var(--hive-brand-secondary)]',
  },
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* HIVE Logo Icon */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="emerald">✅ HIVE LOGO</Badge>
            HIVE Logo Icon - Brand Identity with Smart Fallback
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Custom HIVE logo with intelligent fallback to Lucide Hexagon if SVG fails to load
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            <div className="flex items-center justify-center gap-8 p-8 bg-[var(--hive-background-secondary)] rounded-lg">
              <div className="text-center space-y-2">
                <HiveIcon size="xs" className="text-[var(--hive-brand-secondary)] mx-auto" />
                <p className="text-xs text-[var(--hive-text-tertiary)]">XS: 16px</p>
              </div>
              <div className="text-center space-y-2">
                <HiveIcon size="sm" className="text-[var(--hive-brand-secondary)] mx-auto" />
                <p className="text-xs text-[var(--hive-text-tertiary)]">SM: 20px</p>
              </div>
              <div className="text-center space-y-2">
                <HiveIcon size="md" className="text-[var(--hive-brand-secondary)] mx-auto" />
                <p className="text-xs text-[var(--hive-text-tertiary)]">MD: 24px</p>
              </div>
              <div className="text-center space-y-2">
                <HiveIcon size="lg" className="text-[var(--hive-brand-secondary)] mx-auto" />
                <p className="text-xs text-[var(--hive-text-tertiary)]">LG: 32px</p>
              </div>
              <div className="text-center space-y-2">
                <HiveIcon size="xl" className="text-[var(--hive-brand-secondary)] mx-auto" />
                <p className="text-xs text-[var(--hive-text-tertiary)]">XL: 40px</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Complete Platform Icons */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🗂️ PLATFORM ICONS</Badge>
            Complete Platform Icon Set - Campus Feature Navigation
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            11 comprehensive icons representing all major HIVE platform features and sections
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Core Platform Features */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Core Platform Features:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                
                <div className="text-center space-y-3 p-4 rounded-lg bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-interactive-hover)] transition-colors">
                  <PlatformIcons.Profile 
                    size={32} 
                    className="text-[var(--hive-brand-secondary)] mx-auto" 
                  />
                  <div className="space-y-1">
                    <p className="font-medium text-[var(--hive-text-primary)]">Profile</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Student dashboard, academic info</p>
                  </div>
                </div>
                
                <div className="text-center space-y-3 p-4 rounded-lg bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-interactive-hover)] transition-colors">
                  <PlatformIcons.Spaces 
                    size={32} 
                    className="text-[var(--hive-brand-secondary)] mx-auto" 
                  />
                  <div className="space-y-1">
                    <p className="font-medium text-[var(--hive-text-primary)]">Spaces</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Campus communities, study groups</p>
                  </div>
                </div>
                
                <div className="text-center space-y-3 p-4 rounded-lg bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-interactive-hover)] transition-colors">
                  <PlatformIcons.Tools 
                    size={32} 
                    className="text-[var(--hive-brand-secondary)] mx-auto" 
                  />
                  <div className="space-y-1">
                    <p className="font-medium text-[var(--hive-text-primary)]">Tools</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Campus utilities, productivity apps</p>
                  </div>
                </div>
                
                <div className="text-center space-y-3 p-4 rounded-lg bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-interactive-hover)] transition-colors">
                  <PlatformIcons.Feed 
                    size={32} 
                    className="text-[var(--hive-brand-secondary)] mx-auto" 
                  />
                  <div className="space-y-1">
                    <p className="font-medium text-[var(--hive-text-primary)]">Feed</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Campus activity, social updates</p>
                  </div>
                </div>
                
              </div>
            </div>

            {/* Supporting Features */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Supporting Features:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                
                <div className="text-center space-y-3 p-4 rounded-lg bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-interactive-hover)] transition-colors">
                  <PlatformIcons.Calendar 
                    size={32} 
                    className="text-[var(--hive-status-info)] mx-auto" 
                  />
                  <div className="space-y-1">
                    <p className="font-medium text-[var(--hive-text-primary)]">Calendar</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Academic schedules, events</p>
                  </div>
                </div>
                
                <div className="text-center space-y-3 p-4 rounded-lg bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-interactive-hover)] transition-colors">
                  <PlatformIcons.University 
                    size={32} 
                    className="text-[var(--hive-status-success)] mx-auto" 
                  />
                  <div className="space-y-1">
                    <p className="font-medium text-[var(--hive-text-primary)]">University</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">UB official resources, academics</p>
                  </div>
                </div>
                
                <div className="text-center space-y-3 p-4 rounded-lg bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-interactive-hover)] transition-colors">
                  <PlatformIcons.Ghost 
                    size={32} 
                    className="text-[var(--hive-text-secondary)] mx-auto" 
                  />
                  <div className="space-y-1">
                    <p className="font-medium text-[var(--hive-text-primary)]">Ghost Mode</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Privacy settings, invisible browsing</p>
                  </div>
                </div>
                
                <div className="text-center space-y-3 p-4 rounded-lg bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-interactive-hover)] transition-colors">
                  <PlatformIcons.Builder 
                    size={32} 
                    className="text-[var(--hive-status-warning)] mx-auto" 
                  />
                  <div className="space-y-1">
                    <p className="font-medium text-[var(--hive-text-primary)]">Builder</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Tool creation, app development</p>
                  </div>
                </div>
                
              </div>
            </div>

            {/* Experimental Features */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Experimental Features:</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                
                <div className="text-center space-y-3 p-4 rounded-lg bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-interactive-hover)] transition-colors">
                  <PlatformIcons.Lab 
                    size={32} 
                    className="text-[var(--hive-status-warning)] mx-auto" 
                  />
                  <div className="space-y-1">
                    <p className="font-medium text-[var(--hive-text-primary)]">Lab</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Experimental features, testing</p>
                    <Badge variant="gold" size="sm">Experimental</Badge>
                  </div>
                </div>
                
                <div className="text-center space-y-3 p-4 rounded-lg bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-interactive-hover)] transition-colors">
                  <PlatformIcons.Beta 
                    size={32} 
                    className="text-[var(--hive-status-info)] mx-auto" 
                  />
                  <div className="space-y-1">
                    <p className="font-medium text-[var(--hive-text-primary)]">Beta</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Beta features, early access</p>
                    <Badge variant="info" size="sm">Beta</Badge>
                  </div>
                </div>
                
                <div className="text-center space-y-3 p-4 rounded-lg bg-[var(--hive-background-secondary)] hover:bg-[var(--hive-interactive-hover)] transition-colors">
                  <PlatformIcons.Hive 
                    size={32} 
                    className="text-[var(--hive-brand-secondary)] mx-auto" 
                  />
                  <div className="space-y-1">
                    <p className="font-medium text-[var(--hive-text-primary)]">HIVE</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Platform branding, main logo</p>
                    <Badge variant="primary" size="sm">Brand</Badge>
                  </div>
                </div>
                
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Icon Sizes Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">📏 SIZES</Badge>
            Icon Sizes - Mobile-First Scaling
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            5 icon sizes optimized for different UI contexts and mobile touch targets
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            
            {/* Size Comparison */}
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
              <h4 className="font-medium text-[var(--hive-text-primary)] mb-4">Size Comparison:</h4>
              <div className="grid grid-cols-5 gap-6 text-center">
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <PlatformIcons.Profile size={16} className="text-[var(--hive-brand-secondary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">XS</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">16px</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Small UI elements</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <PlatformIcons.Spaces size={20} className="text-[var(--hive-brand-secondary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">SM</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">20px</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Inline icons, buttons</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <PlatformIcons.Tools size={24} className="text-[var(--hive-brand-secondary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">MD</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">24px</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Navigation, cards</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <PlatformIcons.Feed size={32} className="text-[var(--hive-brand-secondary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">LG</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">32px</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Headers, featured</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex justify-center">
                    <PlatformIcons.Calendar size={40} className="text-[var(--hive-brand-secondary)]" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">XL</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">40px</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Hero sections, logos</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Context Usage Examples */}
            <div className="grid md:grid-cols-3 gap-6">
              
              <div className="space-y-3">
                <h5 className="font-medium text-[var(--hive-text-primary)]">Mobile Navigation (SM):</h5>
                <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg flex justify-center gap-6">
                  <PlatformIcons.Profile size={20} className="text-[var(--hive-brand-secondary)]" />
                  <PlatformIcons.Spaces size={20} className="text-[var(--hive-text-secondary)]" />
                  <PlatformIcons.Tools size={20} className="text-[var(--hive-text-secondary)]" />
                  <PlatformIcons.Feed size={20} className="text-[var(--hive-text-secondary)]" />
                </div>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-medium text-[var(--hive-text-primary)]">Card Headers (MD):</h5>
                <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg flex items-center gap-3">
                  <PlatformIcons.University size={24} className="text-[var(--hive-brand-secondary)]" />
                  <div>
                    <p className="font-medium text-sm">CSE Department</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Computer Science</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-medium text-[var(--hive-text-primary)]">Feature Highlights (LG):</h5>
                <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg flex flex-col items-center gap-2">
                  <PlatformIcons.Lab size={32} className="text-[var(--hive-status-warning)]" />
                  <p className="text-sm font-medium text-center">HIVE Lab</p>
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
            Real Campus Navigation Examples
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Platform icons in actual University at Buffalo navigation and feature identification contexts
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Main Navigation Example */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">HIVE Platform Main Navigation:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                
                <div className="flex flex-col items-center space-y-3 p-4 rounded-lg hover:bg-[var(--hive-interactive-hover)] transition-colors cursor-pointer">
                  <PlatformIcons.Profile size={32} className="text-[var(--hive-brand-secondary)]" />
                  <div className="text-center">
                    <p className="font-medium text-[var(--hive-text-primary)]">My Profile</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Academic dashboard, personal info</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-3 p-4 rounded-lg hover:bg-[var(--hive-interactive-hover)] transition-colors cursor-pointer">
                  <PlatformIcons.Spaces size={32} className="text-[var(--hive-brand-secondary)]" />
                  <div className="text-center">
                    <p className="font-medium text-[var(--hive-text-primary)]">Campus Spaces</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Study groups, communities</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-3 p-4 rounded-lg hover:bg-[var(--hive-interactive-hover)] transition-colors cursor-pointer">
                  <PlatformIcons.Tools size={32} className="text-[var(--hive-brand-secondary)]" />
                  <div className="text-center">
                    <p className="font-medium text-[var(--hive-text-primary)]">Campus Tools</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Utilities, productivity apps</p>
                  </div>
                </div>
                
                <div className="flex flex-col items-center space-y-3 p-4 rounded-lg hover:bg-[var(--hive-interactive-hover)] transition-colors cursor-pointer">
                  <PlatformIcons.Feed size={32} className="text-[var(--hive-brand-secondary)]" />
                  <div className="text-center">
                    <p className="font-medium text-[var(--hive-text-primary)]">Campus Feed</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Social activity, updates</p>
                  </div>
                </div>
                
              </div>
            </div>
          </div>

          {/* Mobile Bottom Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile Bottom Navigation:</h4>
            <div className="bg-[var(--hive-background-secondary)] rounded-lg overflow-hidden">
              <div className="flex justify-around items-center py-3">
                <div className="flex flex-col items-center space-y-1 px-4 py-2">
                  <PlatformIcons.Feed size={20} className="text-[var(--hive-brand-secondary)]" />
                  <span className="text-xs font-medium text-[var(--hive-brand-secondary)]">Feed</span>
                </div>
                <div className="flex flex-col items-center space-y-1 px-4 py-2">
                  <PlatformIcons.Spaces size={20} className="text-[var(--hive-text-secondary)]" />
                  <span className="text-xs text-[var(--hive-text-secondary)]">Spaces</span>
                </div>
                <div className="flex flex-col items-center space-y-1 px-4 py-2">
                  <PlatformIcons.Tools size={20} className="text-[var(--hive-text-secondary)]" />
                  <span className="text-xs text-[var(--hive-text-secondary)]">Tools</span>
                </div>
                <div className="flex flex-col items-center space-y-1 px-4 py-2">
                  <PlatformIcons.Calendar size={20} className="text-[var(--hive-text-secondary)]" />
                  <span className="text-xs text-[var(--hive-text-secondary)]">Calendar</span>
                </div>
                <div className="flex flex-col items-center space-y-1 px-4 py-2">
                  <PlatformIcons.Profile size={20} className="text-[var(--hive-text-secondary)]" />
                  <span className="text-xs text-[var(--hive-text-secondary)]">Profile</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-[var(--hive-text-tertiary)] text-center">
              Optimized for single-thumb navigation on mobile devices
            </p>
          </div>

          {/* Feature Cards */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Feature Discovery Cards:</h4>
            <div className="grid md:grid-cols-2 gap-6">
              
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                <div className="flex items-center gap-3">
                  <PlatformIcons.University size={24} className="text-[var(--hive-status-success)]" />
                  <h5 className="font-medium text-[var(--hive-text-primary)]">UB Academic Integration</h5>
                </div>
                <p className="text-sm text-[var(--hive-text-secondary)]">
                  Connect with official University at Buffalo systems including UBLearns, 
                  HUB Student Center, and academic department resources.
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="emerald" size="sm">Official</Badge>
                  <Badge variant="info" size="sm">Verified</Badge>
                </div>
              </div>
              
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                <div className="flex items-center gap-3">
                  <PlatformIcons.Lab size={24} className="text-[var(--hive-status-warning)]" />
                  <h5 className="font-medium text-[var(--hive-text-primary)]">HIVE Innovation Lab</h5>
                </div>
                <p className="text-sm text-[var(--hive-text-secondary)]">
                  Experimental features and beta tools developed by UB students for the campus community. 
                  Test cutting-edge functionality before official release.
                </p>
                <div className="flex items-center gap-2">
                  <Badge variant="gold" size="sm">Experimental</Badge>
                  <Badge variant="secondary" size="sm">Student Built</Badge>
                </div>
              </div>
              
            </div>
          </div>

          {/* Settings and Privacy */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Privacy & Settings Features:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="flex items-center gap-3 p-4 rounded-lg hover:bg-[var(--hive-interactive-hover)] transition-colors">
                  <PlatformIcons.Ghost size={20} className="text-[var(--hive-text-secondary)]" />
                  <div>
                    <p className="font-medium text-sm text-[var(--hive-text-primary)]">Ghost Mode</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Browse invisibly</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 rounded-lg hover:bg-[var(--hive-interactive-hover)] transition-colors">
                  <PlatformIcons.Builder size={20} className="text-[var(--hive-status-warning)]" />
                  <div>
                    <p className="font-medium text-sm text-[var(--hive-text-primary)]">Builder Access</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Create custom tools</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-4 rounded-lg hover:bg-[var(--hive-interactive-hover)] transition-colors">
                  <PlatformIcons.Beta size={20} className="text-[var(--hive-status-info)]" />
                  <div>
                    <p className="font-medium text-sm text-[var(--hive-text-primary)]">Beta Features</p>
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Early access program</p>
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
    size: 'md',
    className: 'text-[var(--hive-brand-secondary)]',
  },
  render: (args: any) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Platform Icons Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different icon configurations
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-full max-w-md text-center">
            <HiveIcon {...args} />
            <p className="text-sm text-[var(--hive-text-tertiary)] mt-4">
              HIVE Platform Logo Icon
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};