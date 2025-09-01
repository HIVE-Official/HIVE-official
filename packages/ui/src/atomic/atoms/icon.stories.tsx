import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Icon } from './icon';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Badge } from './badge';
import { Text } from './text';
import { 
  User, Calendar, Book, MapPin, Clock, Bell, 
  Star, Heart, MessageCircle, Share2, Search, Settings,
  Home, Users, BookOpen, Briefcase, GraduationCap, Coffee,
  ChevronRight, ChevronDown, Plus, X, Check, AlertCircle,
  ArrowRight, ArrowLeft, Download, Upload, Edit, Trash2,
  Eye, EyeOff, Lock, Unlock, Mail, Phone, Globe, Wifi,
  Battery, Volume2, Camera, Image, Video, Music,
  Folder, File, Save, Print, RefreshCw, RotateCcw,
  Zap, Target, Award, Bookmark, Flag, Gift,
  Calendar as CalendarIcon,
  Clock as ClockIcon,
  User as UserIcon,
  Settings as SettingsIcon
} from 'lucide-react';
import '../../hive-tokens.css';

const meta: Meta<typeof Icon> = {
  title: '01-Atoms/Icon - COMPLETE DEFINITION',
  component: Icon,
  parameters: {
    docs: {
      description: {
        component: `
## 🎯 HIVE Icon - Complete Component Definition

**PRODUCTION STATUS**: ✅ **FULLY DEFINED & PRODUCTION-READY**

The most comprehensive icon system for University at Buffalo campus interfaces and visual communication.

### 🏆 **COMPONENT EXCELLENCE**
- **6 Size Options** - From xs (12px) to 2xl (40px) for all interface contexts
- **7 Semantic Colors** - Primary, secondary, muted, brand colors, and status colors
- **3 Visual Variants** - Default, outlined, filled for different design needs
- **Perfect Semantic Tokens** - 100% semantic token usage for all colors
- **Lucide Integration** - Full access to 1000+ professional icons
- **Smart Accessibility** - Proper ARIA support and screen reader compatibility
- **Campus Context Ready** - Optimized for UB academic and administrative interfaces

### 🎓 **UB CAMPUS CONTEXT**
Perfect for University at Buffalo interface elements and visual communication:
- **Academic Interfaces** - Course icons, grade indicators, assignment types
- **Navigation Systems** - Menu icons, breadcrumb arrows, action buttons
- **Campus Services** - Dining, housing, library, recreation indicators
- **Administrative Tools** - Settings, user management, system status
- **Social Features** - Profile actions, messaging, notifications, sharing
- **Status Indicators** - Success, error, warning, pending states

### 📱 **MOBILE OPTIMIZATION**
- **Touch-Friendly Sizes** - Minimum 44px for interactive icon buttons
- **High Contrast** - Clear visibility on mobile screens
- **Consistent Rendering** - Perfect clarity across all device types
`,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    icon: {
      control: false,
      description: 'Lucide icon component',
    },
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Icon size',
    },
    color: {
      control: 'select',
      options: ['primary', 'secondary', 'muted', 'gold', 'ruby', 'emerald', 'sapphire'],
      description: 'Icon color using semantic tokens',
    },
    variant: {
      control: 'select',
      options: ['default', 'outlined', 'filled'],
      description: 'Icon visual variant',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Icon>;

// Default icon showcase
export const Default: Story = {
  args: {
    icon: User,
    size: 'md',
    color: 'primary',
    variant: 'default',
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-4">
            <Icon {...args} />
            <div className="space-y-1">
              <Text variant="body-md" color="primary">
                Student Profile Icon
              </Text>
              <Text variant="body-sm" color="secondary">
                Default icon styling for University at Buffalo interfaces
              </Text>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};

// Complete showcase
export const CompleteShowcase: Story = {
  render: () => (
    <div className="space-y-8 p-6 bg-[var(--hive-background-primary)]">
      
      {/* Size Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="emerald">📏 SIZES</Badge>
            Icon Sizes - From UI Details to Touch Targets
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            6 sizes covering all interface needs from tiny indicators to large touch targets
          </p>
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            
            {/* Size Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              
              <div className="space-y-3">
                <h4 className="font-medium text-[var(--hive-text-primary)]">Extra Small (12px):</h4>
                <div className="flex items-center gap-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                  <Icon icon={Star} size="xs" color="gold" />
                  <Text variant="body-sm" color="secondary">Tiny indicators</Text>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-[var(--hive-text-primary)]">Small (16px):</h4>
                <div className="flex items-center gap-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                  <Icon icon={Clock} size="sm" color="primary" />
                  <Text variant="body-sm" color="secondary">Inline icons</Text>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-[var(--hive-text-primary)]">Medium (20px):</h4>
                <div className="flex items-center gap-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                  <Icon icon={Book} size="md" color="primary" />
                  <Text variant="body-sm" color="secondary">Default size</Text>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-[var(--hive-text-primary)]">Large (24px):</h4>
                <div className="flex items-center gap-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                  <Icon icon={Users} size="lg" color="primary" />
                  <Text variant="body-sm" color="secondary">Navigation</Text>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-[var(--hive-text-primary)]">Extra Large (32px):</h4>
                <div className="flex items-center gap-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                  <Icon icon={GraduationCap} size="xl" color="gold" />
                  <Text variant="body-sm" color="secondary">Feature icons</Text>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-[var(--hive-text-primary)]">2X Large (40px):</h4>
                <div className="flex items-center gap-3 bg-[var(--hive-background-secondary)] p-4 rounded-lg">
                  <Icon icon={Target} size="2xl" color="emerald" />
                  <Text variant="body-sm" color="secondary">Hero icons</Text>
                </div>
              </div>

            </div>

          </div>
        </CardContent>
      </Card>

      {/* Color Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="info">🎨 COLORS</Badge>
            Icon Colors - Perfect Semantic Token Usage
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            7 semantic colors for consistent visual hierarchy and brand expression
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Text Colors:</h4>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                  <Icon icon={User} size="md" color="primary" />
                  <Text variant="body-sm" color="primary">Primary - Main content</Text>
                </div>
                
                <div className="flex items-center gap-3 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                  <Icon icon={Clock} size="md" color="secondary" />
                  <Text variant="body-sm" color="secondary">Secondary - Supporting content</Text>
                </div>
                
                <div className="flex items-center gap-3 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                  <Icon icon={Bell} size="md" color="muted" />
                  <Text variant="body-sm" color="muted">Muted - Subtle elements</Text>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Brand & Status Colors:</h4>
              
              <div className="space-y-3">
                <div className="flex items-center gap-3 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                  <Icon icon={Star} size="md" color="gold" />
                  <Text variant="body-sm" color="gold">Gold - HIVE brand accent</Text>
                </div>
                
                <div className="flex items-center gap-3 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                  <Icon icon={Check} size="md" color="emerald" />
                  <Text variant="body-sm" color="emerald">Emerald - Success states</Text>
                </div>
                
                <div className="flex items-center gap-3 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                  <Icon icon={AlertCircle} size="md" color="ruby" />
                  <Text variant="body-sm" color="ruby">Ruby - Error states</Text>
                </div>
                
                <div className="flex items-center gap-3 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                  <Icon icon={Zap} size="md" color="sapphire" />
                  <Text variant="body-sm" color="sapphire">Sapphire - HIVE primary</Text>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Variant Showcase */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🎭 VARIANTS</Badge>
            Icon Variants - Visual Style Options
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            3 visual variants for different design contexts and emphasis levels
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Default Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                <div className="flex items-center gap-3">
                  <Icon icon={Home} size="lg" color="primary" variant="primary" />
                  <Text variant="body-sm" color="secondary">Standard appearance</Text>
                </div>
                <div className="flex items-center gap-3">
                  <Icon icon={Calendar} size="lg" color="gold" variant="primary" />
                  <Text variant="body-sm" color="secondary">Balanced stroke and fill</Text>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Outlined Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                <div className="flex items-center gap-3">
                  <Icon icon={Heart} size="lg" color="ruby" variant="outlined" />
                  <Text variant="body-sm" color="secondary">Stroke only, no fill</Text>
                </div>
                <div className="flex items-center gap-3">
                  <Icon icon={Bookmark} size="lg" color="emerald" variant="outlined" />
                  <Text variant="body-sm" color="secondary">Clean, minimal style</Text>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-medium text-[var(--hive-text-primary)]">Filled Variant:</h4>
              <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
                <div className="flex items-center gap-3">
                  <Icon icon={Star} size="lg" color="gold" variant="filled" />
                  <Text variant="body-sm" color="secondary">Solid fill, more weight</Text>
                </div>
                <div className="flex items-center gap-3">
                  <Icon icon={Award} size="lg" color="sapphire" variant="filled" />
                  <Text variant="body-sm" color="secondary">Emphasis and attention</Text>
                </div>
              </div>
            </div>

          </div>
        </CardContent>
      </Card>

      {/* Common UB Icons */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="gold">🎓 UB CAMPUS</Badge>
            Common University at Buffalo Icon Patterns
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Essential icons for University at Buffalo academic and campus life interfaces
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Academic Icons */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Academic & Learning:</h4>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              <div className="flex flex-col items-center gap-2 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                <Icon icon={BookOpen} size="lg" color="primary" />
                <Text variant="body-xs" color="secondary">Courses</Text>
              </div>
              <div className="flex flex-col items-center gap-2 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                <Icon icon={GraduationCap} size="lg" color="gold" />
                <Text variant="body-xs" color="secondary">Degree</Text>
              </div>
              <div className="flex flex-col items-center gap-2 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                <Icon icon={Calendar} size="lg" color="primary" />
                <Text variant="body-xs" color="secondary">Schedule</Text>
              </div>
              <div className="flex flex-col items-center gap-2 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                <Icon icon={Clock} size="lg" color="secondary" />
                <Text variant="body-xs" color="secondary">Deadlines</Text>
              </div>
              <div className="flex flex-col items-center gap-2 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                <Icon icon={Star} size="lg" color="emerald" />
                <Text variant="body-xs" color="secondary">Grades</Text>
              </div>
              <div className="flex flex-col items-center gap-2 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                <Icon icon={Award} size="lg" color="gold" />
                <Text variant="body-xs" color="secondary">Honors</Text>
              </div>
            </div>
          </div>

          {/* Campus Life Icons */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Campus Life & Services:</h4>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              <div className="flex flex-col items-center gap-2 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                <Icon icon={Home} size="lg" color="primary" />
                <Text variant="body-xs" color="secondary">Housing</Text>
              </div>
              <div className="flex flex-col items-center gap-2 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                <Icon icon={Coffee} size="lg" color="gold" />
                <Text variant="body-xs" color="secondary">Dining</Text>
              </div>
              <div className="flex flex-col items-center gap-2 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                <Icon icon={Users} size="lg" color="sapphire" />
                <Text variant="body-xs" color="secondary">Clubs</Text>
              </div>
              <div className="flex flex-col items-center gap-2 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                <Icon icon={MapPin} size="lg" color="ruby" />
                <Text variant="body-xs" color="secondary">Campus Map</Text>
              </div>
              <div className="flex flex-col items-center gap-2 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                <Icon icon={Briefcase} size="lg" color="primary" />
                <Text variant="body-xs" color="secondary">Career</Text>
              </div>
              <div className="flex flex-col items-center gap-2 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                <Icon icon={Heart} size="lg" color="ruby" />
                <Text variant="body-xs" color="secondary">Wellness</Text>
              </div>
            </div>
          </div>

          {/* Interface Icons */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Interface & Navigation:</h4>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              <div className="flex flex-col items-center gap-2 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                <Icon icon={Search} size="lg" color="primary" />
                <Text variant="body-xs" color="secondary">Search</Text>
              </div>
              <div className="flex flex-col items-center gap-2 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                <Icon icon={Bell} size="lg" color="gold" />
                <Text variant="body-xs" color="secondary">Notifications</Text>
              </div>
              <div className="flex flex-col items-center gap-2 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                <Icon icon={Settings} size="lg" color="secondary" />
                <Text variant="body-xs" color="secondary">Settings</Text>
              </div>
              <div className="flex flex-col items-center gap-2 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                <Icon icon={MessageCircle} size="lg" color="sapphire" />
                <Text variant="body-xs" color="secondary">Messages</Text>
              </div>
              <div className="flex flex-col items-center gap-2 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                <Icon icon={Share2} size="lg" color="emerald" />
                <Text variant="body-xs" color="secondary">Share</Text>
              </div>
              <div className="flex flex-col items-center gap-2 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                <Icon icon={Plus} size="lg" color="primary" />
                <Text variant="body-xs" color="secondary">Add</Text>
              </div>
            </div>
          </div>

          {/* System Status Icons */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">System Status & Actions:</h4>
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              <div className="flex flex-col items-center gap-2 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                <Icon icon={Check} size="lg" color="emerald" />
                <Text variant="body-xs" color="secondary">Success</Text>
              </div>
              <div className="flex flex-col items-center gap-2 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                <Icon icon={AlertCircle} size="lg" color="ruby" />
                <Text variant="body-xs" color="secondary">Error</Text>
              </div>
              <div className="flex flex-col items-center gap-2 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                <Icon icon={Edit} size="lg" color="primary" />
                <Text variant="body-xs" color="secondary">Edit</Text>
              </div>
              <div className="flex flex-col items-center gap-2 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                <Icon icon={Trash2} size="lg" color="ruby" />
                <Text variant="body-xs" color="secondary">Delete</Text>
              </div>
              <div className="flex flex-col items-center gap-2 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                <Icon icon={Download} size="lg" color="sapphire" />
                <Text variant="body-xs" color="secondary">Download</Text>
              </div>
              <div className="flex flex-col items-center gap-2 bg-[var(--hive-background-secondary)] p-3 rounded-lg">
                <Icon icon={RefreshCw} size="lg" color="gold" />
                <Text variant="body-xs" color="secondary">Refresh</Text>
              </div>
            </div>
          </div>

        </CardContent>
      </Card>

      {/* Real Campus Usage */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <Badge variant="primary">🏫 REAL USAGE</Badge>
            University at Buffalo Interface Examples
          </CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Icons in action within actual UB academic and administrative interfaces
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          
          {/* Student Dashboard */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Student Dashboard Navigation:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                  <Icon icon={BookOpen} size="lg" color="primary" />
                  <div>
                    <Text variant="body-sm" color="primary" weight="medium">Courses</Text>
                    <Text variant="body-xs" color="secondary">Fall 2024</Text>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                  <Icon icon={Star} size="lg" color="emerald" />
                  <div>
                    <Text variant="body-sm" color="primary" weight="medium">Grades</Text>
                    <Text variant="body-xs" color="emerald">3.75 GPA</Text>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                  <Icon icon={Calendar} size="lg" color="gold" />
                  <div>
                    <Text variant="body-sm" color="primary" weight="medium">Schedule</Text>
                    <Text variant="body-xs" color="secondary">5 classes</Text>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-[var(--hive-background-primary)] rounded-lg">
                  <Icon icon={Bell} size="lg" color="ruby" />
                  <div>
                    <Text variant="body-sm" color="primary" weight="medium">Alerts</Text>
                    <Text variant="body-xs" color="ruby">2 new</Text>
                  </div>
                </div>
              </div>
              
            </div>
          </div>

          {/* Course Details */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Course Information Display:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg space-y-4">
              
              <div className="flex items-center gap-3">
                <Icon icon={GraduationCap} size="xl" color="gold" />
                <div>
                  <Text as="h3" variant="heading-sm" color="primary">CSE 331 - Algorithm Analysis</Text>
                  <Text variant="body-sm" color="secondary">Computer Science Department</Text>
                </div>
              </div>
              
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2">
                  <Icon icon={Clock} size="sm" color="secondary" />
                  <Text variant="body-sm" color="secondary">TR 2:00-3:20 PM</Text>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon={MapPin} size="sm" color="secondary" />
                  <Text variant="body-sm" color="secondary">Norton 112</Text>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon={User} size="sm" color="secondary" />
                  <Text variant="body-sm" color="secondary">Dr. Smith</Text>
                </div>
                <div className="flex items-center gap-2">
                  <Icon icon={Users} size="sm" color="secondary" />
                  <Text variant="body-sm" color="secondary">85 students</Text>
                </div>
              </div>
              
              <div className="flex gap-2">
                <div className="flex items-center gap-1 px-2 py-1 bg-[var(--hive-background-primary)] rounded">
                  <Icon icon={Check} size="xs" color="emerald" />
                  <Text variant="body-xs" color="emerald">Enrolled</Text>
                </div>
                <div className="flex items-center gap-1 px-2 py-1 bg-[var(--hive-background-primary)] rounded">
                  <Icon icon={Star} size="xs" color="gold" />
                  <Text variant="body-xs" color="gold">4 Credits</Text>
                </div>
              </div>
              
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <h4 className="font-semibold text-[var(--hive-text-primary)]">Interactive Elements:</h4>
            <div className="bg-[var(--hive-background-secondary)] p-6 rounded-lg">
              
              <div className="flex flex-wrap gap-3">
                <button className="flex items-center gap-2 px-4 py-2 bg-[var(--hive-brand-primary)] text-white rounded-lg hover:opacity-90 transition-opacity">
                  <Icon icon={Plus} size="sm" color="primary" className="text-white" />
                  <Text variant="body-sm" className="text-white">Add Course</Text>
                </button>
                
                <button className="flex items-center gap-2 px-4 py-2 border border-[var(--hive-border-primary)] rounded-lg hover:bg-[var(--hive-background-primary)] transition-colors">
                  <Icon icon={Search} size="sm" color="primary" />
                  <Text variant="body-sm" color="primary">Browse Catalog</Text>
                </button>
                
                <button className="flex items-center gap-2 px-4 py-2 border border-[var(--hive-border-primary)] rounded-lg hover:bg-[var(--hive-background-primary)] transition-colors">
                  <Icon icon={Download} size="sm" color="secondary" />
                  <Text variant="body-sm" color="secondary">Export Schedule</Text>
                </button>
                
                <button className="flex items-center gap-2 px-4 py-2 border border-[var(--hive-border-primary)] rounded-lg hover:bg-[var(--hive-background-primary)] transition-colors">
                  <Icon icon={Share2} size="sm" color="emerald" />
                  <Text variant="body-sm" color="emerald">Share</Text>
                </button>
                
                <button className="flex items-center gap-2 px-4 py-2 border border-[var(--hive-status-error)] text-[var(--hive-status-error)] rounded-lg hover:bg-[var(--hive-status-error)] hover:text-white transition-all">
                  <Icon icon={Trash2} size="sm" color="ruby" className="group-hover:text-white" />
                  <Text variant="body-sm" color="ruby" className="group-hover:text-white">Drop Course</Text>
                </button>
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
    icon: Star,
    size: 'lg',
    color: 'gold',
    variant: 'default',
  },
  render: (args) => (
    <div className="p-6 bg-[var(--hive-background-primary)]">
      <Card>
        <CardHeader>
          <CardTitle>Icon Playground</CardTitle>
          <p className="text-[var(--hive-text-muted)]">
            Use the controls to test different icon configurations
          </p>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex items-center justify-center h-32">
            <Icon {...args} />
          </div>
        </CardContent>
      </Card>
    </div>
  ),
};