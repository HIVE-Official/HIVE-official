/**
 * ICON LIBRARY - CAMPUS VISUAL COMMUNICATION SYSTEM
 * 
 * The complete iconography system for HIVE platform with semantic meaning,
 * accessibility features, and campus-specific visual patterns for University at Buffalo.
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Badge } from '../../../components/ui/badge';
import { Input } from '../../../components/ui/input';
import { 
  // Navigation & Actions
  Home,
  Search,
  Bell,
  Settings,
  Menu,
  X,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  ArrowDown,
  Plus,
  Minus,
  Edit,
  Trash2,
  Save,
  Download,
  Upload,
  Share2,
  ExternalLink,
  Copy,
  Check,
  AlertCircle,
  AlertTriangle,
  Info,
  HelpCircle,
  // Academic & Learning
  GraduationCap,
  BookOpen,
  Book,
  FileText,
  PenTool,
  Calculator,
  Calendar,
  Clock,
  Target,
  Award,
  TrendingUp,
  BarChart3,
  PieChart,
  // Social & Communication
  Users,
  User,
  UserPlus,
  MessageCircle,
  MessageSquare,
  Mail,
  Phone,
  Video,
  Mic,
  MicOff,
  Camera,
  Image,
  Heart,
  ThumbsUp,
  Star,
  Flag,
  // Campus & Location
  MapPin,
  Map,
  Building,
  Building2,
  Home as Residence,
  Car,
  Bus,
  Navigation,
  Globe,
  Wifi,
  WifiOff,
  Signal,
  // Tools & Technology
  Smartphone,
  Monitor,
  Tablet,
  Laptop,
  Headphones,
  Keyboard,
  Mouse,
  Printer,
  Zap,
  Battery,
  Plug,
  // Privacy & Security
  Lock,
  Unlock,
  Shield,
  Eye,
  EyeOff,
  Key,
  ShieldCheck,
  // Status & Feedback
  CheckCircle,
  XCircle,
  AlertCircle as Alert,
  Loader,
  RefreshCw,
  PlayCircle,
  PauseCircle,
  StopCircle,
  Volume2,
  VolumeX,
  // File & Content
  File,
  Folder,
  FolderOpen,
  Archive,
  Bookmark,
  Tag,
  Hash,
  Link,
  Paperclip,
  // Miscellaneous
  Sun,
  Moon,
  CloudRain,
  Umbrella,
  Coffee,
  Pizza,
  Gift,
  Gamepad2
} from 'lucide-react';
import '../../../hive-tokens.css';

// Create a simple component wrapper for the story
const IconLibrary = () => (
  <div className="p-6 space-y-8">
    <h2 className="text-2xl font-semibold">Icon Library System</h2>
    <p className="text-muted-foreground">Complete iconography system for campus visual communication</p>
  </div>
);

const meta: Meta<typeof IconLibrary> = {
  component: IconLibrary,
  title: '02-Atoms/Content Elements/Icon Library',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# ⚛️ Icon Library - Campus Visual Communication System

**The comprehensive iconography system that creates clear, accessible, and meaningful visual communication across HIVE**

The Icon Library provides a complete set of semantic icons designed specifically for University at Buffalo campus scenarios. Every icon serves a clear communicative purpose, maintains accessibility standards, and reinforces the platform's focus on authentic social utility through visual consistency.

## 🎯 ICON DESIGN PHILOSOPHY

### **Campus-First Visual Language**
Every icon is selected and contextualized for University at Buffalo student scenarios:
- **Academic Activities** - Clear iconography for courses, study groups, academic tools
- **Social Coordination** - Intuitive symbols for events, communities, friend connections
- **Campus Navigation** - Location and building icons specific to UB campus geography
- **Administrative Functions** - Professional icons for settings, privacy, account management

### **Semantic Consistency**
- **Universal Recognition** - Icons follow established conventions for immediate understanding
- **Contextual Clarity** - Icons maintain meaning across different platform contexts
- **Accessibility Integration** - Every icon includes semantic labeling and alternative text
- **Scalable Design** - Vector-based icons that render clearly at all sizes

## 🎨 ICON CATEGORIES & USAGE

### **Navigation & Actions**
Core interface actions and navigation elements:
- **Primary Navigation** - Home, Search, Profile, Settings, Notifications
- **Content Actions** - Edit, Delete, Share, Save, Copy, External links
- **Directional Controls** - Arrows, chevrons for navigation and state changes
- **Interactive Feedback** - Plus/minus, check marks, alerts, help indicators

### **Academic & Learning**
Education-focused icons for university context:
- **Academic Identity** - Graduation cap, books, academic achievements
- **Study Tools** - Calculator, pen, notebook, academic calendars
- **Performance Tracking** - Charts, trends, awards, academic progress
- **Time Management** - Clocks, calendars, deadline indicators

### **Social & Communication**
Community building and interaction icons:
- **People & Groups** - Individual users, communities, friend connections
- **Communication** - Messaging, email, phone, video calls
- **Social Actions** - Hearts, likes, stars, flags for content interaction
- **Media Sharing** - Camera, images, video, audio recording

### **Campus & Location**
University-specific location and navigation icons:
- **Campus Geography** - Buildings, residence halls, academic locations
- **Transportation** - Walking, driving, campus shuttle, parking
- **Connectivity** - WiFi, cellular signal, network status
- **Campus Services** - Dining, libraries, recreational facilities

### **Tools & Technology**
Platform functionality and device integration:
- **Device Types** - Smartphones, tablets, laptops, desktop computers
- **Connectivity** - Network status, battery levels, charging states
- **Platform Features** - Tool creation, automation, integration symbols
- **Technical Status** - Loading states, refresh actions, system health

## 📏 ICON SIZE SYSTEM

### **Campus Usage Sizes**
- **16px** - Inline icons, dense information, mobile optimization
- **20px** - Standard UI elements, buttons, navigation items
- **24px** - Emphasized actions, card headers, important indicators
- **32px** - Large touch targets, accessibility enhancement
- **48px+** - Hero icons, empty states, promotional graphics

### **Responsive Considerations**
- **Mobile Campus Usage** - Minimum 20px for touch accessibility between classes
- **Desktop Study Sessions** - 16-24px optimal for extended reading and interaction
- **Accessibility Enhancement** - 32px+ for users with visual or motor accessibility needs
- **High Density Displays** - Vector scaling for retina and high-DPI campus devices

## ♿ ACCESSIBILITY FEATURES

### **Screen Reader Support**
- **Semantic Labeling** - Every icon includes descriptive aria-labels
- **Context Descriptions** - Icons explained within their usage context
- **Decorative vs Functional** - Clear distinction between decorative and functional icons
- **Alternative Text** - Meaningful descriptions for all informational icons

### **Visual Accessibility**
- **High Contrast** - Icons maintain visibility in high contrast modes
- **Color Independence** - Icon meaning never depends solely on color
- **Scalability** - Clean rendering at 200%+ zoom levels
- **Focus Indicators** - Clear focus states for interactive icons

### **Motor Accessibility**
- **Touch Targets** - Interactive icons meet 44px minimum touch area
- **Spacing** - Adequate spacing between interactive icon elements
- **Error Prevention** - Clear visual hierarchy prevents accidental activation
- **Alternative Interaction** - Icons work with keyboard, voice, and assistive technology

## 🎓 CAMPUS ICON CONTEXTS

### **Academic Workflow Icons**
Study coordination and course management:
- Course selection and enrollment status indicators
- Study group formation and academic collaboration
- Assignment tracking and deadline management
- Grade discussion and academic achievement recognition

### **Social Coordination Icons**
Community building and event planning:
- Event creation and participation status
- Community membership and role indicators
- Friend connections and social network building
- Activity sharing and engagement tracking

### **Campus Navigation Icons**
Location awareness and campus movement:
- Building identification and room finding
- Transportation options and route planning
- Campus service location and availability
- Accessibility route and accommodation indicators

### **Administrative Icons**
Platform management and personal settings:
- Privacy control and information sharing settings
- Notification preferences and communication management
- Account security and authentication status
- Help resources and support system access

## 🔧 TECHNICAL IMPLEMENTATION

### **Icon System Architecture**
- **Lucide React** - Consistent, high-quality icon library with campus customization
- **SVG Format** - Vector graphics for perfect scaling and performance
- **Tree Shaking** - Only imported icons included in bundle for optimal performance
- **TypeScript Support** - Full type safety for icon props and usage

### **Performance Optimization**
- **Lazy Loading** - Icons loaded on demand for complex interfaces
- **Bundle Optimization** - Minimal icon sets for different platform areas
- **Caching Strategy** - Efficient icon caching for repeated campus usage
- **Memory Management** - Optimized rendering for lower-end campus devices

### **Campus Integration**
- **Brand Consistency** - Icons align with HIVE visual identity and UB partnership
- **Context Awareness** - Icons adapt appearance based on academic vs social contexts
- **Accessibility Compliance** - Full compatibility with campus assistive technology
- **Multi-Platform** - Consistent appearance across web, mobile, and future platforms

## 🎯 ICON USAGE GUIDELINES

### **Semantic Clarity**
- Use icons that immediately convey their intended meaning
- Maintain consistency in icon usage across similar contexts
- Always pair icons with text labels for important actions
- Consider cultural context and universal symbol recognition

### **Visual Hierarchy**
- Primary actions use more prominent icons (24px+)
- Secondary actions use standard sizing (20px)
- Tertiary information uses smaller icons (16px)
- Maintain consistent sizing within related icon groups

### **Campus Appropriateness**
- Choose icons that reflect university environment and values
- Avoid icons that might be culturally inappropriate or confusing
- Consider academic context when selecting metaphorical icons
- Ensure icons work for diverse student populations and abilities
        `
      }
    },
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0a0a0a' },
        { name: 'light', value: '#ffffff' }
      ]
    }
  }
};

export default meta;
type Story = StoryObj<typeof meta>;

// =============================================================================
// ICON LIBRARY DATA
// =============================================================================

const iconCategories = [
  {
    category: 'Navigation & Actions',
    description: 'Core interface actions and navigation elements',
    color: 'blue',
    icons: [
      { icon: Home, name: 'Home', usage: 'Main dashboard, primary navigation' },
      { icon: Search, name: 'Search', usage: 'Campus content discovery' },
      { icon: Bell, name: 'Notifications', usage: 'Activity alerts and updates' },
      { icon: Settings, name: 'Settings', usage: 'Configuration and preferences' },
      { icon: Menu, name: 'Menu', usage: 'Navigation drawer toggle' },
      { icon: X, name: 'Close', usage: 'Modal dismissal, cancellation' },
      { icon: Plus, name: 'Add', usage: 'Create content, join groups' },
      { icon: Edit, name: 'Edit', usage: 'Modify content or settings' },
      { icon: Trash2, name: 'Delete', usage: 'Remove content or leave groups' },
      { icon: Share2, name: 'Share', usage: 'Content sharing and invitations' },
      { icon: Check, name: 'Confirm', usage: 'Success states and confirmations' },
      { icon: AlertCircle, name: 'Alert', usage: 'Important information and warnings' }
    ]
  },
  {
    category: 'Academic & Learning',
    description: 'Education-focused icons for university context',
    color: 'green',
    icons: [
      { icon: GraduationCap, name: 'Academic', usage: 'Academic content and achievements' },
      { icon: BookOpen, name: 'Study', usage: 'Study groups and learning activities' },
      { icon: FileText, name: 'Documents', usage: 'Academic papers and assignments' },
      { icon: Calculator, name: 'Mathematics', usage: 'Math and science courses' },
      { icon: Calendar, name: 'Schedule', usage: 'Academic calendar and deadlines' },
      { icon: Clock, name: 'Time', usage: 'Deadlines and time management' },
      { icon: Target, name: 'Goals', usage: 'Academic objectives and targets' },
      { icon: Award, name: 'Achievement', usage: 'Academic accomplishments' },
      { icon: TrendingUp, name: 'Progress', usage: 'Academic performance trends' },
      { icon: BarChart3, name: 'Analytics', usage: 'Academic performance data' },
      { icon: PenTool, name: 'Writing', usage: 'Essays and written assignments' },
      { icon: Book, name: 'Resources', usage: 'Textbooks and academic materials' }
    ]
  },
  {
    category: 'Social & Communication',
    description: 'Community building and interaction icons',
    color: 'purple',
    icons: [
      { icon: Users, name: 'Community', usage: 'Groups and campus communities' },
      { icon: User, name: 'Profile', usage: 'Individual student profiles' },
      { icon: UserPlus, name: 'Add Friend', usage: 'Friend connections and invitations' },
      { icon: MessageCircle, name: 'Chat', usage: 'Real-time messaging and discussions' },
      { icon: Mail, name: 'Email', usage: 'Email communication and notifications' },
      { icon: Heart, name: 'Like', usage: 'Content appreciation and favorites' },
      { icon: Star, name: 'Rating', usage: 'Content rating and bookmarking' },
      { icon: Camera, name: 'Photo', usage: 'Photo sharing and media content' },
      { icon: Video, name: 'Video', usage: 'Video calls and media sharing' },
      { icon: Mic, name: 'Audio', usage: 'Voice messages and audio content' },
      { icon: ThumbsUp, name: 'Approve', usage: 'Content approval and positive feedback' },
      { icon: Flag, name: 'Report', usage: 'Content reporting and moderation' }
    ]
  },
  {
    category: 'Campus & Location',
    description: 'University-specific location and navigation icons',
    color: 'gold',
    icons: [
      { icon: MapPin, name: 'Location', usage: 'Specific campus locations and venues' },
      { icon: Building, name: 'Academic Building', usage: 'Academic buildings and classrooms' },
      { icon: Building2, name: 'Residence Hall', usage: 'Residence halls and housing' },
      { icon: Map, name: 'Campus Map', usage: 'Campus navigation and directions' },
      { icon: Car, name: 'Parking', usage: 'Parking locations and transportation' },
      { icon: Bus, name: 'Transit', usage: 'Campus shuttle and public transport' },
      { icon: Globe, name: 'Global', usage: 'International programs and connections' },
      { icon: Wifi, name: 'Internet', usage: 'Campus WiFi and connectivity' },
      { icon: Navigation, name: 'Directions', usage: 'Navigation and wayfinding' },
      { icon: Signal, name: 'Connection', usage: 'Network signal and connectivity status' },
      { icon: Coffee, name: 'Dining', usage: 'Campus dining and food services' },
      { icon: Umbrella, name: 'Weather', usage: 'Weather conditions and advisories' }
    ]
  },
  {
    category: 'Tools & Technology',
    description: 'Platform functionality and device integration',
    color: 'red',
    icons: [
      { icon: Smartphone, name: 'Mobile', usage: 'Mobile app and phone features' },
      { icon: Monitor, name: 'Desktop', usage: 'Desktop application and computers' },
      { icon: Tablet, name: 'Tablet', usage: 'Tablet optimization and features' },
      { icon: Laptop, name: 'Laptop', usage: 'Laptop usage and portability' },
      { icon: Zap, name: 'Quick Action', usage: 'Fast actions and automation' },
      { icon: Battery, name: 'Power', usage: 'Device battery and power management' },
      { icon: Headphones, name: 'Audio Device', usage: 'Audio accessories and privacy' },
      { icon: Printer, name: 'Print', usage: 'Document printing and academic papers' },
      { icon: Keyboard, name: 'Input', usage: 'Text input and data entry' },
      { icon: Mouse, name: 'Navigation', usage: 'Cursor navigation and interaction' },
      { icon: RefreshCw, name: 'Refresh', usage: 'Content refresh and synchronization' },
      { icon: Loader, name: 'Loading', usage: 'Processing states and waiting' }
    ]
  },
  {
    category: 'Privacy & Security',
    description: 'Privacy control and security indicators',
    color: 'indigo',
    icons: [
      { icon: Lock, name: 'Private', usage: 'Private content and restricted access' },
      { icon: Unlock, name: 'Public', usage: 'Public content and open access' },
      { icon: Shield, name: 'Security', usage: 'Security features and protection' },
      { icon: Eye, name: 'Visible', usage: 'Content visibility and viewing' },
      { icon: EyeOff, name: 'Hidden', usage: 'Hidden content and privacy' },
      { icon: Key, name: 'Access', usage: 'Authentication and access control' },
      { icon: ShieldCheck, name: 'Verified', usage: 'Verified accounts and content' }
    ]
  }
];

const iconSizes = [
  { size: 16, name: '16px', usage: 'Inline icons, dense information', className: 'w-4 h-4' },
  { size: 20, name: '20px', usage: 'Standard UI elements, buttons', className: 'w-5 h-5' },
  { size: 24, name: '24px', usage: 'Emphasized actions, card headers', className: 'w-6 h-6' },
  { size: 32, name: '32px', usage: 'Large touch targets, accessibility', className: 'w-8 h-8' },
  { size: 48, name: '48px', usage: 'Hero icons, empty states', className: 'w-12 h-12' }
];

// =============================================================================
// INTERACTIVE SHOWCASE COMPONENTS
// =============================================================================

const IconCategoriesShowcase = () => {
  const [activeCategory, setActiveCategory] = useState('Navigation & Actions');
  const [searchTerm, setSearchTerm] = useState('');

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/20',
      green: 'from-green-500/20 to-green-600/10 border-green-500/20',
      purple: 'from-[var(--hive-gold)]/20 to-[var(--hive-gold-dark)]/10 border-[var(--hive-gold)]/20',
      gold: 'from-[var(--hive-gold)]/20 to-[var(--hive-gold)]/10 border-[var(--hive-gold)]/20',
      red: 'from-red-500/20 to-red-600/10 border-red-500/20',
      indigo: 'from-indigo-500/20 to-indigo-600/10 border-indigo-500/20'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const filteredCategories = iconCategories.map(category => ({
    ...category,
    icons: category.icons.filter(icon => 
      searchTerm === '' || 
      icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      icon.usage.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.icons.length > 0);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
          Campus Icon Categories
        </h3>
        <div className="flex items-center gap-3">
          <Search className="w-4 h-4 text-[var(--hive-text-secondary)]" />
          <Input
            placeholder="Search icons..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
      </div>

      {/* Category Navigation */}
      <div className="flex flex-wrap gap-2">
        {iconCategories.map((category) => (
          <Button
            key={category.category}
            variant={activeCategory === category.category ? 'primary' : 'secondary'}
            onClick={() => setActiveCategory(category.category)}
            size="sm"
          >
            {category.category}
          </Button>
        ))}
      </div>

      {/* Icon Grid */}
      <div className="space-y-8">
        {filteredCategories
          .filter(category => searchTerm === '' || activeCategory === category.category)
          .map((category, categoryIndex) => (
            <Card key={categoryIndex} className={`border-2 bg-gradient-to-br ${getColorClasses(category.color)}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div>
                    <div className="text-[var(--hive-text-primary)]">{category.category}</div>
                    <div className="text-sm font-normal text-[var(--hive-text-secondary)]">
                      {category.description}
                    </div>
                  </div>
                  <Badge variant="secondary">
                    {category.icons.length} icons
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {category.icons.map((iconItem, iconIndex) => (
                    <div 
                      key={iconIndex}
                      className="p-4 rounded-lg bg-[var(--hive-background-secondary)] border border-[var(--hive-border-default)] hover:bg-[var(--hive-background-tertiary)] transition-colors group cursor-pointer"
                    >
                      <div className="flex flex-col items-center text-center space-y-2">
                        <iconItem.icon className="w-6 h-6 text-[var(--hive-brand-primary)] group-hover:scale-110 transition-transform" />
                        <div className="font-medium text-[var(--hive-text-primary)] text-sm">
                          {iconItem.name}
                        </div>
                        <div className="text-xs text-[var(--hive-text-muted)] leading-tight">
                          {iconItem.usage}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
};

const IconSizesShowcase = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Icon Size System
      </h3>
      
      <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
        <CardContent className="p-6">
          <div className="space-y-8">
            {iconSizes.map((size) => (
              <div key={size.size} className="flex items-center gap-8">
                <div className="w-24 shrink-0">
                  <div className="font-medium text-[var(--hive-text-primary)]">
                    {size.name}
                  </div>
                  <div className="text-sm text-[var(--hive-text-secondary)]">
                    {size.usage}
                  </div>
                </div>
                
                <div className="flex items-center gap-6">
                  {/* Navigation Example */}
                  <div className="flex items-center gap-2">
                    <Home className={`${size.className} text-[var(--hive-brand-primary)]`} />
                    <span className="text-sm text-[var(--hive-text-secondary)]">Home</span>
                  </div>
                  
                  {/* Academic Example */}
                  <div className="flex items-center gap-2">
                    <GraduationCap className={`${size.className} text-[var(--hive-brand-primary)]`} />
                    <span className="text-sm text-[var(--hive-text-secondary)]">Academic</span>
                  </div>
                  
                  {/* Social Example */}
                  <div className="flex items-center gap-2">
                    <Users className={`${size.className} text-[var(--hive-brand-primary)]`} />
                    <span className="text-sm text-[var(--hive-text-secondary)]">Community</span>
                  </div>
                  
                  {/* Location Example */}
                  <div className="flex items-center gap-2">
                    <MapPin className={`${size.className} text-[var(--hive-brand-primary)]`} />
                    <span className="text-sm text-[var(--hive-text-secondary)]">Location</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

const CampusContextShowcase = () => {
  const campusScenarios = [
    {
      scenario: 'Academic Dashboard',
      description: 'Study coordination and course management',
      icons: [
        { icon: GraduationCap, label: 'My Courses', context: 'Course enrollment and management' },
        { icon: BookOpen, label: 'Study Groups', context: 'Active study group participation' },
        { icon: Calendar, label: 'Deadlines', context: 'Upcoming assignment due dates' },
        { icon: BarChart3, label: 'Progress', context: 'Academic performance tracking' }
      ]
    },
    {
      scenario: 'Social Feed',
      description: 'Community engagement and event coordination',
      icons: [
        { icon: Users, label: 'Communities', context: 'Campus communities and spaces' },
        { icon: Calendar, label: 'Events', context: 'Upcoming campus events' },
        { icon: Heart, label: 'Favorites', context: 'Liked posts and saved content' },
        { icon: MessageCircle, label: 'Discussions', context: 'Active conversation threads' }
      ]
    },
    {
      scenario: 'Campus Navigation',
      description: 'Location services and campus wayfinding',
      icons: [
        { icon: MapPin, label: 'Current Location', context: 'Your position on campus' },
        { icon: Building, label: 'Academic Buildings', context: 'Classroom and lab locations' },
        { icon: Building2, label: 'Residence Halls', context: 'Housing and dining locations' },
        { icon: Car, label: 'Parking', context: 'Available parking areas' }
      ]
    },
    {
      scenario: 'Privacy Settings',
      description: 'Information sharing and security controls',
      icons: [
        { icon: Eye, label: 'Profile Visibility', context: 'Who can see your information' },
        { icon: Lock, label: 'Private Content', context: 'Personal and restricted information' },
        { icon: Shield, label: 'Security Settings', context: 'Account protection features' },
        { icon: Bell, label: 'Notifications', context: 'Communication preferences' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
        Campus Context Usage
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {campusScenarios.map((scenario, scenarioIndex) => (
          <Card key={scenarioIndex} className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
            <CardHeader>
              <CardTitle className="text-[var(--hive-text-primary)]">
                {scenario.scenario}
              </CardTitle>
              <div className="text-sm text-[var(--hive-text-secondary)]">
                {scenario.description}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {scenario.icons.map((iconItem, iconIndex) => (
                  <div key={iconIndex} className="flex items-start gap-3 p-3 rounded-lg bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)]">
                    <iconItem.icon className="w-5 h-5 text-[var(--hive-brand-primary)] mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-[var(--hive-text-primary)] text-sm">
                        {iconItem.label}
                      </div>
                      <div className="text-xs text-[var(--hive-text-muted)] leading-tight">
                        {iconItem.context}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const AccessibilityShowcase = () => {
  const [contrastMode, setContrastMode] = useState(false);

  const accessibilityFeatures = [
    {
      feature: 'Screen Reader Support',
      description: 'All icons include semantic labeling',
      examples: [
        { icon: Home, label: 'Navigate to dashboard', ariaLabel: 'Go to main dashboard' },
        { icon: Bell, label: 'View notifications', ariaLabel: 'View 3 unread notifications' },
        { icon: Settings, label: 'Open settings', ariaLabel: 'Open account settings menu' }
      ]
    },
    {
      feature: 'High Contrast Mode',
      description: 'Icons maintain visibility in accessibility modes',
      examples: [
        { icon: Check, label: 'Success indicator', usage: 'Confirmation states' },
        { icon: AlertTriangle, label: 'Warning indicator', usage: 'Caution and alerts' },
        { icon: XCircle, label: 'Error indicator', usage: 'Error states and problems' }
      ]
    },
    {
      feature: 'Touch Accessibility',
      description: 'Interactive icons meet 44px minimum touch targets',
      examples: [
        { icon: Plus, label: 'Create new content', size: 'w-8 h-8', target: '44px touch area' },
        { icon: Heart, label: 'Like content', size: 'w-6 h-6', target: '44px touch area' },
        { icon: Share2, label: 'Share content', size: 'w-6 h-6', target: '44px touch area' }
      ]
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-[var(--hive-text-primary)]">
          Icon Accessibility Features
        </h3>
        <Button
          variant={contrastMode ? 'primary' : 'secondary'}
          size="sm"
          onClick={() => setContrastMode(!contrastMode)}
        >
          {contrastMode ? 'High Contrast On' : 'High Contrast Off'}
        </Button>
      </div>
      
      <div className="space-y-6">
        {accessibilityFeatures.map((feature, featureIndex) => (
          <Card key={featureIndex} className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-[var(--hive-text-primary)]">
                <Shield className="w-5 h-5" />
                {feature.feature}
              </CardTitle>
              <div className="text-sm text-[var(--hive-text-secondary)]">
                {feature.description}
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {feature.examples.map((example, exampleIndex) => (
                  <div key={exampleIndex} className="p-4 rounded-lg bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)]">
                    <div className="flex items-center gap-3 mb-2">
                      <example.icon 
                        className={`${example.size || 'w-6 h-6'} ${
                          contrastMode ? 'text-[var(--hive-text-primary)]' : 'text-[var(--hive-brand-primary)]'
                        }`} 
                        aria-label={example.ariaLabel || example.label}
                      />
                      <span className="font-medium text-[var(--hive-text-primary)] text-sm">
                        {example.label}
                      </span>
                    </div>
                    <div className="text-xs text-[var(--hive-text-muted)]">
                      {example.ariaLabel || example.usage || example.target}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

// =============================================================================
// ICON LIBRARY MAIN COMPONENT
// =============================================================================

const IconLibraryShowcase = () => {
  const [activeSection, setActiveSection] = useState('categories');

  const sections = [
    { id: 'categories', label: 'Icon Categories', icon: GraduationCap },
    { id: 'sizes', label: 'Size System', icon: BarChart3 },
    { id: 'context', label: 'Campus Context', icon: MapPin },
    { id: 'accessibility', label: 'Accessibility', icon: Eye }
  ];

  return (
    <div className="min-h-screen bg-[var(--hive-background-primary)] text-[var(--hive-text-primary)]">
      <div className="max-w-7xl mx-auto p-6">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-3 mb-6">
            <div className="p-3 rounded-xl bg-gradient-to-r from-[var(--hive-brand-primary)]/10 to-[var(--hive-brand-accent)]/10 border border-[var(--hive-border-gold)]">
              <Star className="w-8 h-8 text-[var(--hive-brand-primary)]" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-[var(--hive-brand-primary)] to-[var(--hive-brand-accent)] bg-clip-text text-transparent">
                Icon Library
              </h1>
              <p className="text-[var(--hive-text-secondary)] text-lg">
                Campus Visual Communication System
              </p>
            </div>
          </div>
          
          <p className="text-xl text-[var(--hive-text-secondary)] mb-8 max-w-3xl mx-auto">
            The comprehensive iconography system that creates clear, accessible, and meaningful visual communication 
            across HIVE. Every icon serves University at Buffalo campus scenarios with semantic consistency.
          </p>
        </div>

        {/* Section Navigation */}
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={activeSection === section.id ? 'primary' : 'secondary'}
              onClick={() => setActiveSection(section.id)}
              className="flex items-center gap-2"
            >
              <section.icon className="w-4 h-4" />
              {section.label}
            </Button>
          ))}
        </div>

        {/* Content Sections */}
        <div className="space-y-12">
          {activeSection === 'categories' && <IconCategoriesShowcase />}
          {activeSection === 'sizes' && <IconSizesShowcase />}
          {activeSection === 'context' && <CampusContextShowcase />}
          {activeSection === 'accessibility' && <AccessibilityShowcase />}
        </div>

        {/* Icon System Information */}
        <Card className="border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)] mt-12">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-[var(--hive-brand-primary)]">
              <Zap className="w-5 h-5" />
              Icon System Technical Implementation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  Icon Library
                </h4>
                <div className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
                  <div>• Lucide React icon system</div>
                  <div>• SVG vector graphics for perfect scaling</div>
                  <div>• Tree shaking for optimal bundle size</div>
                  <div>• TypeScript support and type safety</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4 flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Accessibility
                </h4>
                <div className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
                  <div>• Semantic labeling for screen readers</div>
                  <div>• High contrast mode compatibility</div>
                  <div>• 44px minimum touch targets</div>
                  <div>• Color-independent communication</div>
                </div>
              </div>
              <div>
                <h4 className="font-medium text-[var(--hive-text-primary)] mb-4 flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Campus Integration
                </h4>
                <div className="space-y-2 text-sm text-[var(--hive-text-secondary)]">
                  <div>• University at Buffalo context awareness</div>
                  <div>• Academic and social scenario optimization</div>
                  <div>• Consistent brand identity alignment</div>
                  <div>• Multi-platform icon consistency</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// =============================================================================
// STORYBOOK STORIES
// =============================================================================

export const IconLibraryShowcaseStory: Story = {
  render: () => <IconLibraryShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Complete Icon Library showcase with categories, sizes, campus context usage, and accessibility features optimized for University at Buffalo usage.'
      }
    }
  }
};

export const IconCategories: Story = {
  render: () => <IconCategoriesShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Complete icon categories including navigation, academic, social, campus location, technology, and privacy icons.'
      }
    }
  }
};

export const IconSizes: Story = {
  render: () => <IconSizesShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Icon size system from 16px to 48px with campus usage contexts and accessibility considerations.'
      }
    }
  }
};

export const CampusContextUsage: Story = {
  render: () => <CampusContextShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Real-world campus usage scenarios showing how icons work in academic, social, navigation, and privacy contexts.'
      }
    }
  }
};

export const AccessibilityFeatures: Story = {
  render: () => <AccessibilityShowcase />,
  parameters: {
    docs: {
      description: {
        story: 'Icon accessibility features including screen reader support, high contrast mode, and touch accessibility.'
      }
    }
  }
};

// Individual icon examples
export const NavigationIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div className="flex items-center gap-2 p-3 border border-[var(--hive-border-default)] rounded-lg">
        <Home className="w-5 h-5 text-[var(--hive-brand-primary)]" />
        <span className="text-sm">Home</span>
      </div>
      <div className="flex items-center gap-2 p-3 border border-[var(--hive-border-default)] rounded-lg">
        <Search className="w-5 h-5 text-[var(--hive-brand-primary)]" />
        <span className="text-sm">Search</span>
      </div>
      <div className="flex items-center gap-2 p-3 border border-[var(--hive-border-default)] rounded-lg">
        <Bell className="w-5 h-5 text-[var(--hive-brand-primary)]" />
        <span className="text-sm">Notifications</span>
      </div>
      <div className="flex items-center gap-2 p-3 border border-[var(--hive-border-default)] rounded-lg">
        <Settings className="w-5 h-5 text-[var(--hive-brand-primary)]" />
        <span className="text-sm">Settings</span>
      </div>
    </div>
  ),
};

export const AcademicIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <div className="flex items-center gap-2 p-3 border border-[var(--hive-border-default)] rounded-lg">
        <GraduationCap className="w-5 h-5 text-[var(--hive-brand-primary)]" />
        <span className="text-sm">Academic</span>
      </div>
      <div className="flex items-center gap-2 p-3 border border-[var(--hive-border-default)] rounded-lg">
        <BookOpen className="w-5 h-5 text-[var(--hive-brand-primary)]" />
        <span className="text-sm">Study</span>
      </div>
      <div className="flex items-center gap-2 p-3 border border-[var(--hive-border-default)] rounded-lg">
        <Calendar className="w-5 h-5 text-[var(--hive-brand-primary)]" />
        <span className="text-sm">Schedule</span>
      </div>
      <div className="flex items-center gap-2 p-3 border border-[var(--hive-border-default)] rounded-lg">
        <Award className="w-5 h-5 text-[var(--hive-brand-primary)]" />
        <span className="text-sm">Achievement</span>
      </div>
    </div>
  ),
};