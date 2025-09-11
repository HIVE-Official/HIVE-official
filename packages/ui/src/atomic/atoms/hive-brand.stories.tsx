import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { 
  HiveLogo, 
  Icon, 
  PlatformIcons,
  User,
  Users,
  Wrench,
  Home,
  Calendar,
  GraduationCap,
  Search,
  Settings,
  Heart,
  CheckCircle,
  AlertTriangle,
  Edit,
  Share2
} from './hive-brand';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import '../../hive-tokens.css';

const meta: Meta<typeof HiveLogo> = {
  title: '01-Atoms/HIVE Brand - COMPLETE DEFINITION',
  component: HiveLogo,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Brand System - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most sophisticated brand and icon system for University at Buffalo campus visual identity and platform iconography.

### 🏆 **COMPONENT EXCELLENCE**
- **Custom HIVE Logos** - 3 color variants (gold, black, white) with intelligent fallbacks
- **60+ Lucide Icons** - Complete icon library with semantic token integration
- **Platform Icon Collections** - Curated icon sets for core HIVE features
- **8 Logo Sizes** - XS to 3XL with perfect scaling and clarity
- **Perfect Semantic Tokens** - 100% semantic token usage with color-mix sophistication
- **Brand Consistency** - Official HIVE visual identity with UB gold branding
- **Smart Accessibility** - Screen reader optimized, semantic naming, keyboard friendly

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo brand consistency and platform visual identity:
- **Official Branding** - HIVE logos for headers, footers, authentication pages
- **Platform Navigation** - Icon system for all campus features and tools
- **Campus Communication** - Consistent iconography for announcements and updates
- **Academic Integration** - University-specific icons and visual elements
- **Mobile Experience** - Optimized logos and icons for mobile campus usage
- **Brand Recognition** - Consistent UB gold brand colors and visual hierarchy

### 📱 **MOBILE OPTIMIZATION**
- **Logo Clarity** - Sharp logo rendering at all mobile screen sizes
- **Icon Touch Targets** - Icons sized appropriately for thumb navigation
- **Visual Consistency** - Consistent brand experience across all device types
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'default', 'md', 'lg', 'xl', '2xl', '3xl'],
      description: 'Logo size (perfect scaling from mobile to desktop)',
    },
    color: {
      control: 'select',
      options: ['auto', 'gold', 'black', 'white'],
      description: 'Logo color variant',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
};

export default meta;
type Story = StoryObj<typeof HiveLogo>;

// Default logo showcase
export const Default: Story = {
  args: {
    size: 'default',
    color: 'auto',
  },
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* HIVE Logo Variants */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="emerald">✅ HIVE LOGOS</Badge>
            HIVE Logo System - Official Brand Identity
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Custom HIVE logos with multiple color variants and intelligent asset loading
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Logo Color Variants */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Logo Color Variants:</h4>
              <div className="grid md:grid-cols-3 gap-6">
                
                <div className="text-center space-y-4 p-6 bg-[var(--hive-background-secondary)] rounded-lg">
                  <HiveLogo size="xl" color="gold" />
                  <div>
                    <p className="font-medium text-[var(--hive-text-primary)]">Gold (Default)</p>
                    <p className="text-sm text-[var(--hive-text-tertiary)]">Primary UB brand color</p>
                    <Badge variant="primary" size="sm">Brand Standard</Badge>
                  </div>
                </div>
                
                <div className="text-center space-y-4 p-6 bg-[var(--hive-background-secondary)] rounded-lg">
                  <HiveLogo size="xl" color="black" />
                  <div>
                    <p className="font-medium text-[var(--hive-text-primary)]">Black</p>
                    <p className="text-sm text-[var(--hive-text-tertiary)]">For light backgrounds</p>
                    <Badge variant="secondary" size="sm">Light Mode</Badge>
                  </div>
                </div>
                
                <div className="text-center space-y-4 p-6 bg-[var(--hive-text-primary)] rounded-lg">
                  <HiveLogo size="xl" color="white" />
                  <div>
                    <p className="font-medium text-[var(--hive-text-inverse)]">White</p>
                    <p className="text-sm text-[var(--hive-text-inverse)] opacity-70">For dark backgrounds</p>
                    <Badge variant="secondary" size="sm">Dark Mode</Badge>
                  </div>
                </div>
                
              </div>
            </div>

            {/* Logo Sizes */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Logo Sizes:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <div className="grid grid-cols-4 md:grid-cols-8 gap-6 items-end justify-items-center">
                  <div className="text-center space-y-2">
                    <HiveLogo size="xs" color="gold" />
                    <p className="text-xs text-[var(--hive-text-tertiary)]">XS: 16px</p>
                  </div>
                  <div className="text-center space-y-2">
                    <HiveLogo size="sm" color="gold" />
                    <p className="text-xs text-[var(--hive-text-tertiary)]">SM: 24px</p>
                  </div>
                  <div className="text-center space-y-2">
                    <HiveLogo size="default" color="gold" />
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Default: 32px</p>
                  </div>
                  <div className="text-center space-y-2">
                    <HiveLogo size="md" color="gold" />
                    <p className="text-xs text-[var(--hive-text-tertiary)]">MD: 40px</p>
                  </div>
                  <div className="text-center space-y-2">
                    <HiveLogo size="lg" color="gold" />
                    <p className="text-xs text-[var(--hive-text-tertiary)]">LG: 48px</p>
                  </div>
                  <div className="text-center space-y-2">
                    <HiveLogo size="xl" color="gold" />
                    <p className="text-xs text-[var(--hive-text-tertiary)]">XL: 64px</p>
                  </div>
                  <div className="text-center space-y-2">
                    <HiveLogo size="2xl" color="gold" />
                    <p className="text-xs text-[var(--hive-text-tertiary)]">2XL: 80px</p>
                  </div>
                  <div className="text-center space-y-2">
                    <HiveLogo size="3xl" color="gold" />
                    <p className="text-xs text-[var(--hive-text-tertiary)]">3XL: 96px</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Icon System */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🎨 ICON SYSTEM</Badge>
            Lucide Icon System - Semantic Token Integration
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            60+ Lucide icons with perfect semantic token integration and interactive states
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Icon Colors */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Icon Color Variants:</h4>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Icon icon={User} color="primary" size="md" />
                    <span className="text-sm">Primary - Main content icons</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon icon={Users} color="secondary" size="md" />
                    <span className="text-sm">Secondary - Supporting content</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon icon={Calendar} color="tertiary" size="md" />
                    <span className="text-sm">Tertiary - Subtle information</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon icon={GraduationCap} color="disabled" size="md" />
                    <span className="text-sm">Disabled - Inactive elements</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon icon={Wrench} color="brand" size="md" />
                    <span className="text-sm">Brand - UB gold emphasis</span>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Icon icon={CheckCircle} color="success" size="md" />
                    <span className="text-sm">Success - Completed actions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon icon={AlertTriangle} color="error" size="md" />
                    <span className="text-sm">Error - Critical issues</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon icon={AlertTriangle} color="warning" size="md" />
                    <span className="text-sm">Warning - Attention needed</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon icon={AlertTriangle} color="info" size="md" />
                    <span className="text-sm">Info - Additional context</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Icon icon={Heart} color="current" size="md" />
                    <span className="text-sm">Current - Inherits text color</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Icon Sizes */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Icon Sizes:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <div className="flex items-center justify-center gap-8">
                  <div className="text-center space-y-2">
                    <Icon icon={Search} size="xs" color="brand" />
                    <p className="text-xs text-[var(--hive-text-tertiary)]">XS: 12px</p>
                  </div>
                  <div className="text-center space-y-2">
                    <Icon icon={Search} size="sm" color="brand" />
                    <p className="text-xs text-[var(--hive-text-tertiary)]">SM: 16px</p>
                  </div>
                  <div className="text-center space-y-2">
                    <Icon icon={Search} size="default" color="brand" />
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Default: 20px</p>
                  </div>
                  <div className="text-center space-y-2">
                    <Icon icon={Search} size="md" color="brand" />
                    <p className="text-xs text-[var(--hive-text-tertiary)]">MD: 24px</p>
                  </div>
                  <div className="text-center space-y-2">
                    <Icon icon={Search} size="lg" color="brand" />
                    <p className="text-xs text-[var(--hive-text-tertiary)]">LG: 32px</p>
                  </div>
                  <div className="text-center space-y-2">
                    <Icon icon={Search} size="xl" color="brand" />
                    <p className="text-xs text-[var(--hive-text-tertiary)]">XL: 40px</p>
                  </div>
                  <div className="text-center space-y-2">
                    <Icon icon={Search} size="2xl" color="brand" />
                    <p className="text-xs text-[var(--hive-text-tertiary)]">2XL: 48px</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Icons */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Interactive Icons:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
                <div className="flex items-center gap-6">
                  <div className="text-center space-y-2">
                    <Icon icon={Heart} size="lg" color="secondary" interactive={true} />
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Like Button</p>
                  </div>
                  <div className="text-center space-y-2">
                    <Icon icon={Share2} size="lg" color="secondary" interactive={true} />
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Share Action</p>
                  </div>
                  <div className="text-center space-y-2">
                    <Icon icon={Edit} size="lg" color="secondary" interactive={true} />
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Edit Function</p>
                  </div>
                  <div className="text-center space-y-2">
                    <Icon icon={Settings} size="lg" color="secondary" interactive={true} />
                    <p className="text-xs text-[var(--hive-text-tertiary)]">Settings Menu</p>
                  </div>
                </div>
                <p className="text-sm text-[var(--hive-text-tertiary)] text-center mt-4">
                  Hover over icons to see interactive color transitions
                </p>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Platform Icon Collections */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="secondary">🗂️ PLATFORM COLLECTIONS</Badge>
            Platform Icon Collections - Curated Icon Sets
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Pre-organized icon collections for core HIVE platform features and campus navigation
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Core Navigation Icons */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Core Navigation:</h4>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                <div className="text-center space-y-2 p-4 bg-[var(--hive-background-secondary)] rounded-lg">
                  <PlatformIcons.Profile size={24} className="text-[var(--hive-brand-secondary)] mx-auto" />
                  <p className="text-xs font-medium">Profile</p>
                </div>
                <div className="text-center space-y-2 p-4 bg-[var(--hive-background-secondary)] rounded-lg">
                  <PlatformIcons.Spaces size={24} className="text-[var(--hive-brand-secondary)] mx-auto" />
                  <p className="text-xs font-medium">Spaces</p>
                </div>
                <div className="text-center space-y-2 p-4 bg-[var(--hive-background-secondary)] rounded-lg">
                  <PlatformIcons.Tools size={24} className="text-[var(--hive-brand-secondary)] mx-auto" />
                  <p className="text-xs font-medium">Tools</p>
                </div>
                <div className="text-center space-y-2 p-4 bg-[var(--hive-background-secondary)] rounded-lg">
                  <PlatformIcons.Feed size={24} className="text-[var(--hive-brand-secondary)] mx-auto" />
                  <p className="text-xs font-medium">Feed</p>
                </div>
                <div className="text-center space-y-2 p-4 bg-[var(--hive-background-secondary)] rounded-lg">
                  <PlatformIcons.Calendar size={24} className="text-[var(--hive-brand-secondary)] mx-auto" />
                  <p className="text-xs font-medium">Calendar</p>
                </div>
                <div className="text-center space-y-2 p-4 bg-[var(--hive-background-secondary)] rounded-lg">
                  <PlatformIcons.Lab size={24} className="text-[var(--hive-brand-secondary)] mx-auto" />
                  <p className="text-xs font-medium">Lab</p>
                </div>
              </div>
            </div>

            {/* University Context Icons */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">University Context:</h4>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center space-y-2 p-4 bg-[var(--hive-background-secondary)] rounded-lg">
                  <PlatformIcons.University size={24} className="text-[var(--hive-status-success)] mx-auto" />
                  <p className="text-xs font-medium">University</p>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">Academic resources</p>
                </div>
                <div className="text-center space-y-2 p-4 bg-[var(--hive-background-secondary)] rounded-lg">
                  <PlatformIcons.Residential size={24} className="text-[var(--hive-status-info)] mx-auto" />
                  <p className="text-xs font-medium">Residential</p>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">Housing & dorms</p>
                </div>
                <div className="text-center space-y-2 p-4 bg-[var(--hive-background-secondary)] rounded-lg">
                  <PlatformIcons.Greek size={24} className="text-[var(--hive-status-warning)] mx-auto" />
                  <p className="text-xs font-medium">Greek Life</p>
                  <p className="text-xs text-[var(--hive-text-tertiary)]">Fraternities & sororities</p>
                </div>
              </div>
            </div>

            {/* Action Icons */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Common Actions:</h4>
              <div className="grid grid-cols-2 md:grid-cols-7 gap-4">
                <div className="text-center space-y-2 p-3 bg-[var(--hive-background-secondary)] rounded-lg">
                  <PlatformIcons.Search size={20} className="text-[var(--hive-text-secondary)] mx-auto" />
                  <p className="text-xs">Search</p>
                </div>
                <div className="text-center space-y-2 p-3 bg-[var(--hive-background-secondary)] rounded-lg">
                  <PlatformIcons.Add size={20} className="text-[var(--hive-text-secondary)] mx-auto" />
                  <p className="text-xs">Add</p>
                </div>
                <div className="text-center space-y-2 p-3 bg-[var(--hive-background-secondary)] rounded-lg">
                  <PlatformIcons.Edit size={20} className="text-[var(--hive-text-secondary)] mx-auto" />
                  <p className="text-xs">Edit</p>
                </div>
                <div className="text-center space-y-2 p-3 bg-[var(--hive-background-secondary)] rounded-lg">
                  <PlatformIcons.Delete size={20} className="text-[var(--hive-text-secondary)] mx-auto" />
                  <p className="text-xs">Delete</p>
                </div>
                <div className="text-center space-y-2 p-3 bg-[var(--hive-background-secondary)] rounded-lg">
                  <PlatformIcons.Share size={20} className="text-[var(--hive-text-secondary)] mx-auto" />
                  <p className="text-xs">Share</p>
                </div>
                <div className="text-center space-y-2 p-3 bg-[var(--hive-background-secondary)] rounded-lg">
                  <PlatformIcons.Save size={20} className="text-[var(--hive-text-secondary)] mx-auto" />
                  <p className="text-xs">Save</p>
                </div>
                <div className="text-center space-y-2 p-3 bg-[var(--hive-background-secondary)] rounded-lg">
                  <PlatformIcons.Menu size={20} className="text-[var(--hive-text-secondary)] mx-auto" />
                  <p className="text-xs">Menu</p>
                </div>
              </div>
            </div>

            {/* Status & Social Icons */}
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Status & Social:</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="space-y-3">
                  <h5 className="text-sm font-medium text-[var(--hive-text-primary)]">Status Icons:</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <PlatformIcons.Online size={16} className="text-[var(--hive-status-success)]" />
                      <span className="text-sm">Online</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PlatformIcons.Offline size={16} className="text-[var(--hive-status-error)]" />
                      <span className="text-sm">Offline</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PlatformIcons.Loading size={16} className="text-[var(--hive-status-info)] animate-spin" />
                      <span className="text-sm">Loading</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h5 className="text-sm font-medium text-[var(--hive-text-primary)]">Privacy Icons:</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <PlatformIcons.Visible size={16} className="text-[var(--hive-text-secondary)]" />
                      <span className="text-sm">Visible</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PlatformIcons.Hidden size={16} className="text-[var(--hive-text-secondary)]" />
                      <span className="text-sm">Hidden</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PlatformIcons.Ghost size={16} className="text-[var(--hive-text-secondary)]" />
                      <span className="text-sm">Ghost Mode</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h5 className="text-sm font-medium text-[var(--hive-text-primary)]">Social Icons:</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <PlatformIcons.Like size={16} className="text-[var(--hive-status-error)]" />
                      <span className="text-sm">Like</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PlatformIcons.Comment size={16} className="text-[var(--hive-text-secondary)]" />
                      <span className="text-sm">Comment</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PlatformIcons.Bookmark size={16} className="text-[var(--hive-brand-secondary)]" />
                      <span className="text-sm">Bookmark</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <h5 className="text-sm font-medium text-[var(--hive-text-primary)]">Builder Icons:</h5>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <PlatformIcons.Builder size={16} className="text-[var(--hive-status-warning)]" />
                      <span className="text-sm">Code</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PlatformIcons.Design size={16} className="text-[var(--hive-status-info)]" />
                      <span className="text-sm">Design</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <PlatformIcons.Deploy size={16} className="text-[var(--hive-status-success)]" />
                      <span className="text-sm">Deploy</span>
                    </div>
                  </div>
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
            Real Campus Brand Usage Examples
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            HIVE brand system in actual University at Buffalo campus contexts and platform usage
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Header/Footer Branding */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Platform Header & Footer Branding:</h4>
            <div className="space-y-4">
              
              {/* Header Example */}
              <div className="bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <HiveLogo size="md" color="gold" />
                    <div>
                      <p className="font-semibold text-[var(--hive-text-primary)]">HIVE</p>
                      <p className="text-xs text-[var(--hive-text-tertiary)]">University at Buffalo</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <Icon icon={Search} size="sm" color="secondary" interactive={true} />
                    <Icon icon={Settings} size="sm" color="secondary" interactive={true} />
                    <Icon icon={User} size="sm" color="brand" />
                  </div>
                </div>
              </div>
              
              {/* Footer Example */}
              <div className="bg-[var(--hive-text-primary)] p-6 rounded-lg">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <HiveLogo size="sm" color="white" />
                    <div>
                      <p className="font-medium text-[var(--hive-text-inverse)]">HIVE Platform</p>
                      <p className="text-xs text-[var(--hive-text-inverse)] opacity-70">
                        Built for University at Buffalo students
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6 text-[var(--hive-text-inverse)] opacity-70">
                    <span className="text-xs">© 2025 HIVE</span>
                    <span className="text-xs">Privacy</span>
                    <span className="text-xs">Terms</span>
                    <span className="text-xs">Support</span>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          {/* Authentication Pages */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Authentication & Onboarding Pages:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-8 rounded-lg text-center space-y-6">
              <HiveLogo size="2xl" color="gold" className="mx-auto" />
              <div className="space-y-2">
                <h3 className="text-xl font-semibold text-[var(--hive-text-primary)]">Welcome to HIVE</h3>
                <p className="text-[var(--hive-text-secondary)]">
                  The social utility platform for University at Buffalo students
                </p>
              </div>
              <div className="space-y-3 max-w-sm mx-auto">
                <div className="flex items-center gap-3 text-left p-3 bg-[var(--hive-background-primary)] rounded-lg">
                  <Icon icon={GraduationCap} size="sm" color="brand" />
                  <span className="text-sm">Connect with your UB community</span>
                </div>
                <div className="flex items-center gap-3 text-left p-3 bg-[var(--hive-background-primary)] rounded-lg">
                  <Icon icon={Wrench} size="sm" color="brand" />
                  <span className="text-sm">Build and share campus tools</span>
                </div>
                <div className="flex items-center gap-3 text-left p-3 bg-[var(--hive-background-primary)] rounded-lg">
                  <Icon icon={Users} size="sm" color="brand" />
                  <span className="text-sm">Join study groups and spaces</span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Navigation */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Mobile App Navigation:</h4>
            <div className="bg-[var(--hive-background-secondary)] rounded-lg overflow-hidden">
              {/* Mobile Header */}
              <div className="flex items-center justify-between p-4 border-b border-[var(--hive-border-default)]">
                <HiveLogo size="sm" color="gold" />
                <div className="flex items-center gap-3">
                  <Icon icon={Search} size="sm" color="secondary" />
                  <Icon icon={PlatformIcons.Menu} size="sm" color="secondary" />
                </div>
              </div>
              
              {/* Mobile Bottom Navigation */}
              <div className="flex justify-around items-center py-3 bg-[var(--hive-background-primary)]">
                <div className="flex flex-col items-center space-y-1 px-3">
                  <Icon icon={Home} size="sm" color="brand" />
                  <span className="text-xs font-medium text-[var(--hive-brand-secondary)]">Feed</span>
                </div>
                <div className="flex flex-col items-center space-y-1 px-3">
                  <Icon icon={Users} size="sm" color="secondary" />
                  <span className="text-xs text-[var(--hive-text-secondary)]">Spaces</span>
                </div>
                <div className="flex flex-col items-center space-y-1 px-3">
                  <Icon icon={Wrench} size="sm" color="secondary" />
                  <span className="text-xs text-[var(--hive-text-secondary)]">Tools</span>
                </div>
                <div className="flex flex-col items-center space-y-1 px-3">
                  <Icon icon={Calendar} size="sm" color="secondary" />
                  <span className="text-xs text-[var(--hive-text-secondary)]">Calendar</span>
                </div>
                <div className="flex flex-col items-center space-y-1 px-3">
                  <Icon icon={User} size="sm" color="secondary" />
                  <span className="text-xs text-[var(--hive-text-secondary)]">Profile</span>
                </div>
              </div>
            </div>
          </div>

          {/* Loading & Error States */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">System States with Branding:</h4>
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Loading State */}
              <div className="bg-[var(--hive-background-secondary)] p-8 rounded-lg text-center space-y-4">
                <HiveLogo size="lg" color="gold" className="mx-auto opacity-50" />
                <div className="space-y-2">
                  <Icon icon={PlatformIcons.Loading} size="md" color="brand" className="mx-auto animate-spin" />
                  <p className="font-medium text-[var(--hive-text-primary)]">Loading Campus Data</p>
                  <p className="text-sm text-[var(--hive-text-tertiary)]">
                    Connecting to University at Buffalo systems...
                  </p>
                </div>
              </div>
              
              {/* Error State */}
              <div className="bg-[var(--hive-background-secondary)] p-8 rounded-lg text-center space-y-4">
                <HiveLogo size="lg" color="gold" className="mx-auto opacity-50" />
                <div className="space-y-2">
                  <Icon icon={AlertTriangle} size="md" color="warning" className="mx-auto" />
                  <p className="font-medium text-[var(--hive-text-primary)]">Connection Issue</p>
                  <p className="text-sm text-[var(--hive-text-tertiary)]">
                    Unable to reach UB campus services. Please try again.
                  </p>
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
    size: 'default',
    color: 'auto',
  },
  render: (args: any) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>HIVE Brand Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different logo configurations
          </p>
        </CardHeader>
        <CardContent className="flex justify-center">
          <div className="w-full max-w-md text-center space-y-4">
            <HiveLogo {...args} />
            <div className="space-y-2">
              <p className="text-sm font-medium text-[var(--hive-text-primary)]">HIVE Platform</p>
              <p className="text-xs text-[var(--hive-text-tertiary)]">
                University at Buffalo Campus Community
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};