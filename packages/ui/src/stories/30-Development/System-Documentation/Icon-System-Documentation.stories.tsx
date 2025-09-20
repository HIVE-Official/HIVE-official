/**
 * HIVE Icon System: Comprehensive Documentation
 * Complete icon system documentation for campus social utility interface consistency
 */

import React, { useState, useMemo } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { motion, AnimatePresence } from '../../../components/framer-motion-proxy';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { 
  // Core Interface Icons
  Home, Users, Calendar, Search, Plus, Settings, Menu, X, ChevronRight, ChevronLeft, ChevronUp, ChevronDown,
  // Social & Communication
  Heart, MessageSquare, Share, Bell, UserPlus, UserMinus, Star, Bookmark, Flag, Send,
  // Campus & Location
  MapPin, Building, Navigation, Clock, Wifi, Battery, Smartphone, Laptop, Monitor,
  // Tools & Creation
  Zap, Wrench, Code, Paintbrush, Camera, Image, FileText, Download, Upload, Save,
  // Status & Feedback
  Check, X as XIcon, AlertTriangle, Info, HelpCircle, Eye, EyeOff, Lock, Unlock,
  // Navigation & Flow
  ArrowLeft, ArrowRight, ArrowUp, ArrowDown, RotateCcw, RefreshCw, ExternalLink,
  // Academic & Study
  BookOpen, GraduationCap, Calculator, Microscope, FlaskConical, Lightbulb,
  // Social Utility Specific
  UserCheck, Users2, Activity, TrendingUp, Award, Target, Handshake, Megaphone
} from 'lucide-react';
import { hiveVariants, hiveEasing, hiveDuration } from '../../motion/hive-motion';
import '../../../hive-tokens.css';

const meta = {
  title: '11-Icon-System/Documentation',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Icon System: Campus Social Utility Icons

Comprehensive icon documentation for HIVE's campus-first social utility platform, built on Lucide icons with custom campus-specific additions.

## Icon Philosophy
- **Clarity**: Immediately recognizable at any size, especially on mobile
- **Campus Context**: Icons that resonate with university social dynamics
- **Consistency**: Standardized visual language across all features
- **Accessibility**: High contrast and screen reader compatible

## Icon Categories
1. **Core Interface**: Navigation, actions, and primary interface elements
2. **Social Communication**: Social interactions and community features
3. **Campus Context**: Location, academic, and university-specific icons
4. **Tool Creation**: Builder interface and creation workflow icons
5. **Status Feedback**: System states, notifications, and user feedback
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const IconSystemShowcase = () => {
  const [activeCategory, setActiveCategory] = useState<string>('core-interface');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIcon, setSelectedIcon] = useState<any>(null);
  const [copiedIcon, setCopiedIcon] = useState<string | null>(null);

  // Comprehensive Icon Categories
  const iconCategories = {
    'core-interface': {
      title: 'Core Interface',
      description: 'Primary navigation and interface elements',
      color: '#4F46E5',
      icons: [
        { name: 'Home', component: Home, usage: 'Dashboard navigation, home screen', context: 'Main navigation tab' },
        { name: 'Users', component: Users, usage: 'Spaces, community, member lists', context: 'Space discovery and member management' },
        { name: 'Calendar', component: Calendar, usage: 'Events, scheduling, calendar integration', context: 'Academic calendar and social events' },
        { name: 'Search', component: Search, usage: 'Search functionality, discovery', context: 'Finding spaces, people, and tools' },
        { name: 'Plus', component: Plus, usage: 'Create new, add content, join actions', context: 'Creating spaces, tools, and content' },
        { name: 'Settings', component: Settings, usage: 'Configuration, preferences, admin', context: 'Profile settings and space management' },
        { name: 'Menu', component: Menu, usage: 'Mobile navigation, dropdown menus', context: 'Mobile hamburger menu' },
        { name: 'X', component: X, usage: 'Close, cancel, dismiss actions', context: 'Modal dismissal and form cancellation' },
        { name: 'ChevronRight', component: ChevronRight, usage: 'Forward navigation, expand', context: 'List item details and nested navigation' },
        { name: 'ChevronLeft', component: ChevronLeft, usage: 'Back navigation, previous', context: 'Back button and breadcrumb navigation' },
        { name: 'ChevronUp', component: ChevronUp, usage: 'Collapse, minimize, up actions', context: 'Collapsible sections and vertical navigation' },
        { name: 'ChevronDown', component: ChevronDown, usage: 'Expand, maximize, down actions', context: 'Dropdown menus and expandable content' }
      ]
    },
    'social-communication': {
      title: 'Social & Communication',
      description: 'Social interactions and community engagement',
      color: '#EC4899',
      icons: [
        { name: 'Heart', component: Heart, usage: 'Like, favorite, appreciate actions', context: 'Post likes and space appreciation' },
        { name: 'MessageSquare', component: MessageSquare, usage: 'Comments, chat, messaging', context: 'Post comments and group chat' },
        { name: 'Share', component: Share, usage: 'Share content, invite friends', context: 'Sharing spaces and viral growth' },
        { name: 'Bell', component: Bell, usage: 'Notifications, alerts, updates', context: 'Campus activity notifications' },
        { name: 'UserPlus', component: UserPlus, usage: 'Add friend, join group, invite', context: 'Connection building and group joining' },
        { name: 'UserMinus', component: UserMinus, usage: 'Remove, unfollow, leave group', context: 'Unfriend and leave actions' },
        { name: 'Star', component: Star, usage: 'Rate, favorite, highlight', context: 'Rating tools and featured content' },
        { name: 'Bookmark', component: Bookmark, usage: 'Save for later, bookmarks', context: 'Saved spaces and tools' },
        { name: 'Flag', component: Flag, usage: 'Report, mark, moderate content', context: 'Content moderation and reporting' },
        { name: 'Send', component: Send, usage: 'Send message, submit, post', context: 'Sending messages and posting content' },
        { name: 'UserCheck', component: UserCheck, usage: 'Verified user, trusted member', context: 'Campus verification and trust indicators' },
        { name: 'Users2', component: Users2, usage: 'Group activities, collaboration', context: 'Study groups and collaborative tools' }
      ]
    },
    'campus-context': {
      title: 'Campus & Location',
      description: 'University-specific and location-aware features',
      color: '#059669',
      icons: [
        { name: 'MapPin', component: MapPin, usage: 'Location, campus buildings, meetup spots', context: 'Study locations and campus navigation' },
        { name: 'Building', component: Building, usage: 'Dorms, academic buildings, facilities', context: 'Campus building identification' },
        { name: 'Navigation', component: Navigation, usage: 'Directions, campus navigation', context: 'Getting around campus' },
        { name: 'Clock', component: Clock, usage: 'Time, schedules, deadlines', context: 'Class schedules and event timing' },
        { name: 'Wifi', component: Wifi, usage: 'Network status, connectivity', context: 'Campus WiFi and connection status' },
        { name: 'Battery', component: Battery, usage: 'Device status, power management', context: 'Mobile battery awareness' },
        { name: 'Smartphone', component: Smartphone, usage: 'Mobile features, phone integration', context: 'Mobile-first campus experience' },
        { name: 'Laptop', component: Laptop, usage: 'Study tools, computer access', context: 'Study spaces with computer access' },
        { name: 'Monitor', component: Monitor, usage: 'Presentation, large displays', context: 'Study rooms with presentation capability' },
        { name: 'BookOpen', component: BookOpen, usage: 'Academic content, study materials', context: 'Course materials and study resources' },
        { name: 'GraduationCap', component: GraduationCap, usage: 'Academic achievement, courses', context: 'Academic progress and achievements' },
        { name: 'Calculator', component: Calculator, usage: 'Math tools, calculations', context: 'STEM study tools and calculators' }
      ]
    },
    'tool-creation': {
      title: 'Tool & Creation',
      description: 'Building tools and creative content',
      color: '#F59E0B',
      icons: [
        { name: 'Zap', component: Zap, usage: 'Quick actions, energy, power tools', context: 'Tool execution and quick features' },
        { name: 'Wrench', component: Wrench, usage: 'Tool building, configuration', context: 'Tool creation and customization' },
        { name: 'Code', component: Code, usage: 'Programming tools, code snippets', context: 'CS tools and coding resources' },
        { name: 'Paintbrush', component: Paintbrush, usage: 'Design tools, creative features', context: 'Creative and design tools' },
        { name: 'Camera', component: Camera, usage: 'Photo capture, visual content', context: 'Campus photo sharing and documentation' },
        { name: 'Image', component: Image, usage: 'Visual content, photo galleries', context: 'Space photos and visual content' },
        { name: 'FileText', component: FileText, usage: 'Documents, text content', context: 'Study documents and note sharing' },
        { name: 'Download', component: Download, usage: 'Download files, save content', context: 'Downloading tools and resources' },
        { name: 'Upload', component: Upload, usage: 'Upload files, share content', context: 'Sharing files and user-generated content' },
        { name: 'Save', component: Save, usage: 'Save progress, bookmark content', context: 'Saving tool configurations and content' },
        { name: 'Lightbulb', component: Lightbulb, usage: 'Ideas, innovation, inspiration', context: 'Tool ideas and creative inspiration' },
        { name: 'Target', component: Target, usage: 'Goals, objectives, achievements', context: 'Academic goals and space objectives' }
      ]
    },
    'status-feedback': {
      title: 'Status & Feedback',
      description: 'System states and user feedback',
      color: '#8B5CF6',
      icons: [
        { name: 'Check', component: Check, usage: 'Success, completed, approved', context: 'Successful actions and completions' },
        { name: 'X', component: XIcon, usage: 'Error, failed, rejected', context: 'Failed actions and errors' },
        { name: 'AlertTriangle', component: AlertTriangle, usage: 'Warning, caution, important', context: 'Important notices and warnings' },
        { name: 'Info', component: Info, usage: 'Information, help, details', context: 'Help information and details' },
        { name: 'HelpCircle', component: HelpCircle, usage: 'Help, questions, support', context: 'Help tooltips and support' },
        { name: 'Eye', component: Eye, usage: 'Visible, show, view', context: 'Visibility settings and view modes' },
        { name: 'EyeOff', component: EyeOff, usage: 'Hidden, private, invisible', context: 'Privacy settings and hidden content' },
        { name: 'Lock', component: Lock, usage: 'Private, secure, restricted', context: 'Private spaces and secure content' },
        { name: 'Unlock', component: Unlock, usage: 'Public, open, accessible', context: 'Public spaces and open content' },
        { name: 'Activity', component: Activity, usage: 'Analytics, activity, metrics', context: 'Space activity and user metrics' },
        { name: 'TrendingUp', component: TrendingUp, usage: 'Growth, trending, popular', context: 'Popular spaces and trending content' },
        { name: 'Award', component: Award, usage: 'Achievement, recognition, success', context: 'User achievements and recognition' }
      ]
    }
  };

  // Icon Search and Filter
  const filteredIcons = useMemo(() => {
    if (!searchQuery) return iconCategories[activeCategory as keyof typeof iconCategories].icons;
    
    return iconCategories[activeCategory as keyof typeof iconCategories].icons.filter(icon =>
      icon.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      icon.usage.toLowerCase().includes(searchQuery.toLowerCase()) ||
      icon.context.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [activeCategory, searchQuery]);

  // Copy icon name to clipboard
  const copyIconName = (iconName: string) => {
    navigator.clipboard.writeText(`<${iconName} className="w-5 h-5" />`);
    setCopiedIcon(iconName);
    setTimeout(() => setCopiedIcon(null), 2000)
  };

  // Icon Display Component
  const IconDisplay = ({ icon, size = 'medium' }: { icon: any; size?: 'small' | 'medium' | 'large' }) => {
    const sizeClasses = {
      small: 'w-5 h-5',
      medium: 'w-8 h-8',
      large: 'w-12 h-12'
    };

    const IconComponent = icon.component;
    
    return (
      <motion.div
        className={`rounded-lg border cursor-pointer hive-interactive ${
          size === 'small' ? 'p-2' : size === 'medium' ? 'p-4' : 'p-6'
        }`}
        style={{
          backgroundColor: 'var(--hive-background-secondary)',
          borderColor: selectedIcon?.name === icon.name ? 'var(--hive-border-gold)' : 'var(--hive-border-primary)',
          transition: 'all var(--hive-duration-quick) var(--hive-easing-smooth)'
        }}
        onClick={() => {
          setSelectedIcon(icon);
          copyIconName(icon.name)
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
          e.currentTarget.style.backgroundColor = 'var(--hive-background-interactive)'
        }}
        onMouseLeave={(e) => {
          if (selectedIcon?.name !== icon.name) {
            e.currentTarget.style.borderColor = 'var(--hive-border-primary)'
          }
          e.currentTarget.style.backgroundColor = 'var(--hive-background-secondary)'
        }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        layout
      >
        <div className="flex flex-col items-center space-y-2">
          <IconComponent 
            className={sizeClasses[size]} 
            style={{ color: 'var(--hive-text-primary)' }}
          />
          {size !== 'small' && (
            <>
              <div className="font-medium text-sm text-center" style={{ color: 'var(--hive-text-primary)' }}>
                {icon.name}
              </div>
              {copiedIcon === icon.name && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="text-xs px-2 py-1 rounded"
                  style={{
                    backgroundColor: 'var(--hive-status-success)',
                    color: 'var(--hive-text-inverse)'
                  }}
                >
                  Copied!
                </motion.div>
              )}
            </>
          )}
        </div>
      </motion.div>
    )
  };

  // Campus Use Case Examples
  const useCaseExamples = [
    {
      title: 'Space Discovery Interface',
      description: 'Icons working together in campus space browsing',
      icons: [
        { name: 'Search', component: Search, role: 'Search trigger' },
        { name: 'Users', component: Users, role: 'Member count' },
        { name: 'MapPin', component: MapPin, role: 'Location indicator' },
        { name: 'Star', component: Star, role: 'Favorite action' },
        { name: 'Plus', component: Plus, role: 'Join space' }
      ]
    },
    {
      title: 'Tool Builder Interface',
      description: 'Creative tools for campus utility building',
      icons: [
        { name: 'Wrench', component: Wrench, role: 'Tool configuration' },
        { name: 'Code', component: Code, role: 'Custom code' },
        { name: 'Save', component: Save, role: 'Save progress' },
        { name: 'Eye', component: Eye, role: 'Preview tool' },
        { name: 'Share', component: Share, role: 'Share with community' }
      ]
    },
    {
      title: 'Social Feed Actions',
      description: 'Social interaction patterns for campus community',
      icons: [
        { name: 'Heart', component: Heart, role: 'Like post' },
        { name: 'MessageSquare', component: MessageSquare, role: 'Comment' },
        { name: 'Share', component: Share, role: 'Share content' },
        { name: 'Bookmark', component: Bookmark, role: 'Save for later' },
        { name: 'Flag', component: Flag, role: 'Report content' }
      ]
    }
  ];

  return (
    <div className="min-h-screen p-8" style={{ 
      background: 'linear-gradient(135deg, var(--hive-background-primary) 0%, var(--hive-color-void) 50%, var(--hive-background-secondary) 100%)',
      color: 'var(--hive-text-primary)'
    }}>
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 hive-interactive p-2"
                 style={{ 
                   backgroundColor: 'var(--hive-background-tertiary)',
                   border: '1px solid var(--hive-border-gold)'
                 }}>
              <Star className="w-full h-full" style={{ color: 'var(--hive-brand-primary)' }} />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[var(--hive-brand-primary)] to-white bg-clip-text text-transparent">
              Icon System
            </h1>
          </div>
          <p className="text-xl mb-6" style={{ color: 'var(--hive-text-secondary)' }}>
            Comprehensive icon documentation for HIVE's campus-first social utility platform, built on Lucide icons with campus-specific context.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge className="bg-gray-800/50 text-white border-gray-700">Lucide Icons</Badge>
            <Badge className="bg-gray-800/50 text-white border-gray-700">Campus Context</Badge>
            <Badge className="bg-gray-800/50 text-white border-gray-700">Mobile Optimized</Badge>
            <Badge className="bg-gray-800/50 text-white border-gray-700">Accessible</Badge>
          </div>
        </motion.div>

        {/* Search and Navigation */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search icons by name, usage, or context..."
              className="pl-10 text-lg py-3"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                backgroundColor: 'var(--hive-background-secondary)',
                borderColor: 'var(--hive-border-primary)',
                color: 'var(--hive-text-primary)'
              }}
            />
          </div>

          {/* Category Navigation */}
          <div className="flex flex-wrap gap-3">
            {Object.entries(iconCategories).map(([key, category]) => {
              const isActive = activeCategory === key;
              return (
                <Button
                  key={key}
                  variant={isActive ? "default" : "outline"}
                  size="lg"
                  className="hive-interactive"
                  style={isActive ? {
                    backgroundColor: category.color,
                    color: 'white',
                    borderColor: category.color
                  } : {
                    borderColor: 'var(--hive-border-primary)',
                    color: 'var(--hive-text-secondary)'
                  }}
                  onClick={() => {
                    setActiveCategory(key);
                    setSearchQuery('');
                    setSelectedIcon(null)
                  }}
                >
                  {category.title}
                  <Badge 
                    className="ml-2"
                    style={{
                      backgroundColor: isActive ? 'rgba(255,255,255,0.2)' : 'var(--hive-background-tertiary)',
                      color: isActive ? 'white' : 'var(--hive-text-muted)'
                    }}
                  >
                    {category.icons.length}
                  </Badge>
                </Button>
              )
            })}
          </div>
        </motion.div>

        {/* Icon Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="mb-12"
          >
            <Card className="hive-glass border border-gray-700">
              <CardHeader>
                <CardTitle style={{ color: iconCategories[activeCategory as keyof typeof iconCategories].color }}>
                  {iconCategories[activeCategory as keyof typeof iconCategories].title} Icons
                  {searchQuery && <span className="text-sm font-normal ml-2">- Search: "{searchQuery}"</span>}
                </CardTitle>
                <p style={{ color: 'var(--hive-text-muted)' }}>
                  {iconCategories[activeCategory as keyof typeof iconCategories].description}
                  {filteredIcons.length !== iconCategories[activeCategory as keyof typeof iconCategories].icons.length && 
                    ` (${filteredIcons.length} of ${iconCategories[activeCategory as keyof typeof iconCategories].icons.length} icons)`}
                </p>
              </CardHeader>
              <CardContent>
                <motion.div 
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4"
                  layout
                >
                  <AnimatePresence>
                    {filteredIcons.map((icon, index) => (
                      <motion.div
                        key={icon.name}
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ delay: index * 0.02, duration: 0.2 }}
                        layout
                      >
                        <IconDisplay icon={icon} size="medium" />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </motion.div>

                {filteredIcons.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                  >
                    <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p style={{ color: 'var(--hive-text-muted)' }}>
                      No icons found matching "{searchQuery}"
                    </p>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>

        {/* Selected Icon Details */}
        <AnimatePresence>
          {selectedIcon && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="mb-12"
            >
              <Card className="hive-glass border"
                    style={{ borderColor: iconCategories[activeCategory as keyof typeof iconCategories].color }}>
                <CardHeader>
                  <CardTitle className="flex items-center" 
                             style={{ color: iconCategories[activeCategory as keyof typeof iconCategories].color }}>
                    {React.createElement(selectedIcon.component, { className: "w-8 h-8 mr-3" })
                    {selectedIcon.name} Icon
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2" style={{ color: 'var(--hive-text-primary)' }}>
                          Usage Guidelines
                        </h4>
                        <p className="text-sm" style={{ color: 'var(--hive-text-muted)' }}>
                          {selectedIcon.usage}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2" style={{ color: 'var(--hive-text-primary)' }}>
                          Campus Context
                        </h4>
                        <p className="text-sm" style={{ color: 'var(--hive-text-muted)' }}>
                          {selectedIcon.context}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2" style={{ color: 'var(--hive-text-primary)' }}>
                          Size Variations
                        </h4>
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            {React.createElement(selectedIcon.component, { className: "w-4 h-4 mx-auto mb-1", style: { color: 'var(--hive-text-primary)' } })
                            <div className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>16px</div>
                          </div>
                          <div className="text-center">
                            {React.createElement(selectedIcon.component, { className: "w-5 h-5 mx-auto mb-1", style: { color: 'var(--hive-text-primary)' } })
                            <div className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>20px</div>
                          </div>
                          <div className="text-center">
                            {React.createElement(selectedIcon.component, { className: "w-6 h-6 mx-auto mb-1", style: { color: 'var(--hive-text-primary)' } })
                            <div className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>24px</div>
                          </div>
                          <div className="text-center">
                            {React.createElement(selectedIcon.component, { className: "w-8 h-8 mx-auto mb-1", style: { color: 'var(--hive-text-primary)' } })
                            <div className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>32px</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2" style={{ color: 'var(--hive-text-primary)' }}>
                          Color Variations
                        </h4>
                        <div className="flex items-center space-x-4">
                          {React.createElement(selectedIcon.component, { className: "w-6 h-6", style: { color: 'var(--hive-text-primary)' } })
                          {React.createElement(selectedIcon.component, { className: "w-6 h-6", style: { color: 'var(--hive-text-secondary)' } })
                          {React.createElement(selectedIcon.component, { className: "w-6 h-6", style: { color: 'var(--hive-text-muted)' } })
                          {React.createElement(selectedIcon.component, { className: "w-6 h-6", style: { color: 'var(--hive-brand-primary)' } })
                          {React.createElement(selectedIcon.component, { className: "w-6 h-6", style: { color: 'var(--hive-status-success)' } })
                          {React.createElement(selectedIcon.component, { className: "w-6 h-6", style: { color: 'var(--hive-status-warning)' } })
                          {React.createElement(selectedIcon.component, { className: "w-6 h-6", style: { color: 'var(--hive-status-error)' } })
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2" style={{ color: 'var(--hive-text-primary)' }}>
                        Implementation
                      </h4>
                      <div className="p-3 rounded-lg font-mono text-sm"
                           style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)' }}>
                        <div>import &#123; {selectedIcon.name} &#125; from 'lucide-react';</div>
                        <div className="mt-2">&lt;{selectedIcon.name}</div>
                        <div className="pl-4">className="w-5 h-5"</div>
                        <div className="pl-4">style=&#123;&#123; color: 'var(--hive-text-primary)' &#125;&#125;</div>
                        <div>/&gt;</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Use Case Examples */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <Card className="hive-glass border border-gray-700">
            <CardHeader>
              <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>
                Campus Use Case Examples
              </CardTitle>
              <p style={{ color: 'var(--hive-text-muted)' }}>
                See how icons work together in real campus interface patterns
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {useCaseExamples.map((useCase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2 + index * 0.1 }}
                    className="space-y-4"
                  >
                    <div className="p-6 rounded-lg border"
                         style={{
                           backgroundColor: 'var(--hive-background-secondary)',
                           borderColor: 'var(--hive-border-primary)'
                         }}>
                      <h4 className="font-medium mb-2" style={{ color: 'var(--hive-text-primary)' }}>
                        {useCase.title}
                      </h4>
                      <p className="text-sm mb-4" style={{ color: 'var(--hive-text-muted)' }}>
                        {useCase.description}
                      </p>
                      
                      <div className="space-y-3">
                        {useCase.icons.map((icon, idx) => (
                          <div key={idx} className="flex items-center space-x-3">
                            {React.createElement(icon.component, { 
                              className: "w-5 h-5 flex-shrink-0", 
                              style: { color: 'var(--hive-brand-primary)' } 
                            })}
                            <div className="flex-1 min-w-0">
                              <div className="font-medium text-sm" style={{ color: 'var(--hive-text-primary)' }}>
                                {icon.name}
                              </div>
                              <div className="text-xs" style={{ color: 'var(--hive-text-muted)' }}>
                                {icon.role}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Implementation Guidelines */}
        <motion.div
          className="mt-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <Card className="hive-glass border border-gray-700">
            <CardHeader>
              <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>
                Implementation Guidelines
              </CardTitle>
              <p style={{ color: 'var(--hive-text-muted)' }}>
                Best practices for using icons in HIVE's campus interface
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      Size Standards
                    </h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--hive-text-secondary)' }}>Inline icons:</span>
                        <code style={{ color: 'var(--hive-brand-primary)' }}>w-4 h-4 (16px)</code>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--hive-text-secondary)' }}>Button icons:</span>
                        <code style={{ color: 'var(--hive-brand-primary)' }}>w-5 h-5 (20px)</code>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--hive-text-secondary)' }}>Navigation icons:</span>
                        <code style={{ color: 'var(--hive-brand-primary)' }}>w-6 h-6 (24px)</code>
                      </div>
                      <div className="flex justify-between">
                        <span style={{ color: 'var(--hive-text-secondary)' }}>Feature icons:</span>
                        <code style={{ color: 'var(--hive-brand-primary)' }}>w-8 h-8 (32px)</code>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      Accessibility
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Always include aria-label for interactive icons
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Use aria-hidden="true" for decorative icons
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Ensure sufficient color contrast (4.5:1 minimum)
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Don't rely solely on color to convey meaning
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      Campus-Specific Usage
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Prioritize universal recognition over creativity
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Consider mobile viewing conditions (outdoor, walking)
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Use consistent icons across similar functions
                      </li>
                      <li className="flex items-start" style={{ color: 'var(--hive-text-muted)' }}>
                        <div className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                             style={{ backgroundColor: 'var(--hive-brand-primary)' }}></div>
                        Test icon recognition with diverse student groups
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3" style={{ color: 'var(--hive-text-primary)' }}>
                      Performance
                    </h4>
                    <div className="p-4 rounded-lg font-mono text-sm space-y-1"
                         style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)' }}>
                      <div>// Optimize icon imports</div>
                      <div>import &#123; Home &#125; from 'lucide-react';</div>
                      <div>// Not: import * as Icons from 'lucide-react';</div>
                      <div className="mt-2">// Use consistent sizing</div>
                      <div>const iconClasses = 'w-5 h-5';</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
};

export const IconSystemDocumentation: Story = {
  render: () => <IconSystemShowcase />,
  parameters: {
    layout: 'fullscreen'
  }
};