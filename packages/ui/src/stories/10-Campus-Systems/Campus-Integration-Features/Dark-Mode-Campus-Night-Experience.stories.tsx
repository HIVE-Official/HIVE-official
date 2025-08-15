/**
 * HIVE Dark Mode & Campus Night Experience
 * Comprehensive dark theme implementation designed for campus lifestyle and late-night usage patterns
 */

import React, { useState, useEffect } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { motion, AnimatePresence } from '../../../components/framer-motion-proxy';
import { Card, CardContent, CardHeader, CardTitle } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';
import { Button } from '../../../components/ui/button';
import { Switch } from '../../../components/ui/switch';
import { Slider } from '../../../components/ui/slider';
import { 
  Moon, 
  Sun, 
  Eye, 
  Lightbulb, 
  Clock, 
  Battery, 
  Smartphone, 
  Monitor, 
  Palette, 
  Contrast,
  Book,
  Coffee,
  MapPin,
  Users,
  MessageSquare,
  Calendar,
  Settings,
  Home,
  Search,
  Bell,
  User,
  Zap,
  ShieldCheck,
  CircleDot,
  Sunrise,
  Sunset,
  Stars,
  CloudMoon
} from 'lucide-react';
import { hiveVariants, hiveEasing, hiveDuration } from '../../motion/hive-motion';
import '../../hive-tokens.css';

const meta = {
  title: '14-Dark Mode/Campus Night Experience',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Dark Mode & Campus Night Experience

A comprehensive dark theme system designed specifically for campus lifestyle and late-night student usage patterns.

## Campus Night Context
- **Late-Night Study Sessions**: Reduced eye strain for extended library and dorm room usage
- **Battery Conservation**: Power-efficient dark interfaces for all-day mobile usage
- **Social Coordination**: Comfortable nighttime social interactions and event planning
- **Accessibility**: Enhanced visibility for users with light sensitivity

## Dark Mode Features
- **Adaptive Brightness**: Context-aware darkness levels based on time and usage
- **Campus-Specific Theming**: Night mode optimized for academic and social activities
- **Battery-Conscious Design**: OLED-friendly pure blacks and efficient color usage
- **Circadian-Friendly**: Blue light reduction for healthy sleep patterns
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const DarkModeShowcase = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [adaptiveBrightness, setAdaptiveBrightness] = useState(75);
  const [blueLight, setBlueLight] = useState(60);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [campusContext, setCampusContext] = useState<'study' | 'social' | 'dorm' | 'library'>('study');

  // Update time every second for realistic demo
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Dark Mode Color System
  const darkTheme = {
    // Core Backgrounds
    'background-primary': '#0A0A0B',      // Pure black for OLED efficiency
    'background-secondary': '#111114',    // Subtle lift for cards
    'background-tertiary': '#1A1A1F',     // Modal and elevated surfaces
    'background-overlay': '#000000CC',    // Semi-transparent overlays
    
    // Content Surfaces
    'surface-elevated': '#1E1E24',        // Prominent cards and panels
    'surface-interactive': '#252529',     // Buttons and interactive elements
    'surface-hover': '#2A2A30',          // Hover states
    'surface-pressed': '#323238',        // Active/pressed states
    
    // Text Hierarchy
    'text-primary': '#FFFFFF',           // Primary content
    'text-secondary': '#B3B3B8',        // Secondary information
    'text-muted': '#7A7A82',             // Tertiary content
    'text-disabled': '#4A4A52',         // Disabled states
    'text-inverse': '#0A0A0B',          // Light text on dark backgrounds
    
    // Interactive States
    'interactive-primary': '#3B82F6',    // Primary actions (kept vibrant)
    'interactive-secondary': '#64748B',   // Secondary actions
    'interactive-success': '#10B981',    // Success states
    'interactive-warning': '#F59E0B',    // Warning states
    'interactive-error': '#EF4444',     // Error states
    
    // Campus Context Colors
    'campus-study': '#8B5CF6',          // Study session contexts
    'campus-social': '#EC4899',         // Social interaction contexts
    'campus-dorm': '#06B6D4',           // Dorm life contexts
    'campus-library': '#84CC16',        // Library and academic contexts
    
    // Borders and Dividers
    'border-primary': '#2A2A30',        // Primary borders
    'border-secondary': '#1E1E24',      // Subtle dividers
    'border-focus': '#3B82F6',          // Focus indicators
    
    // Special Effects
    'glow-primary': '#3B82F6',          // Primary glow effects
    'glow-accent': '#8B5CF6',           // Accent glows
    'shadow-elevation': '#000000'       // Drop shadows
  };

  const lightTheme = {
    'background-primary': '#FFFFFF',
    'background-secondary': '#F8FAFC',
    'background-tertiary': '#F1F5F9',
    'text-primary': '#0F172A',
    'text-secondary': '#475569',
    'text-muted': '#64748B',
    'interactive-primary': '#3B82F6',
    'border-primary': '#E2E8F0'
  };

  const currentTheme = darkMode ? darkTheme : lightTheme;

  // Campus Scenarios for Dark Mode
  const campusScenarios = [
    {
      id: 'study',
      title: 'Late-Night Study Session',
      icon: Book,
      time: '11:30 PM',
      location: 'Lockwood Library',
      description: 'Focused study environment with reduced eye strain',
      characteristics: [
        'Minimized distractions',
        'High contrast for text',
        'Blue light reduction',
        'Battery optimization'
      ],
      darkModeFeatures: {
        brightness: 65,
        contrast: 85,
        blueLight: 30,
        notifications: 'minimal'
      }
    },
    {
      id: 'social',
      title: 'Dorm Social Coordination',
      icon: MessageSquare,
      time: '9:45 PM',
      location: 'Ellicott Complex',
      description: 'Social interactions and event planning in low light',
      characteristics: [
        'Comfortable viewing',
        'Social context awareness',
        'Quick interactions',
        'Energy efficient'
      ],
      darkModeFeatures: {
        brightness: 80,
        contrast: 75,
        blueLight: 50,
        notifications: 'social'
      }
    },
    {
      id: 'dorm',
      title: 'Dorm Room Evening',
      icon: Home,
      time: '10:15 PM',
      location: 'Your Dorm',
      description: 'Personal space usage with ambient lighting',
      characteristics: [
        'Ambient integration',
        'Personal customization',
        'Minimal disruption',
        'Sleep preparation'
      ],
      darkModeFeatures: {
        brightness: 70,
        contrast: 80,
        blueLight: 25,
        notifications: 'quiet'
      }
    },
    {
      id: 'library',
      title: 'Group Study Area',
      icon: Users,
      time: '8:20 PM',
      location: 'Student Union',
      description: 'Collaborative work in shared spaces',
      characteristics: [
        'Screen sharing friendly',
        'Collaboration features',
        'Moderate brightness',
        'Focus enhancement'
      ],
      darkModeFeatures: {
        brightness: 85,
        contrast: 90,
        blueLight: 40,
        notifications: 'collaborative'
      }
    }
  ];

  // Time-Based Theme Adaptation
  const getTimeBasedTheme = () => {
    const hour = currentTime.getHours();
    const isNight = hour >= 21 || hour <= 6;
    const isEvening = hour >= 17 && hour < 21;
    const isMorning = hour >= 6 && hour < 10;
    
    return {
      isNight,
      isEvening,
      isMorning,
      recommendedMode: isNight ? 'dark' : isEvening ? 'auto' : 'light',
      brightness: isNight ? 60 : isEvening ? 75 : 90,
      blueLight: isNight ? 20 : isEvening ? 40 : 80
    };
  };

  const timeTheme = getTimeBasedTheme();

  // Interactive Theme Demo Component
  const ThemeDemo = ({ scenario }: { scenario: any }) => {
    const isActive = campusContext === scenario.id;
    
    return (
      <motion.div
        className="relative rounded-xl overflow-hidden cursor-pointer"
        style={{ 
          backgroundColor: isActive ? currentTheme['surface-elevated'] : currentTheme['background-secondary'],
          border: `1px solid ${isActive ? currentTheme['border-focus'] : currentTheme['border-primary']}`
        }}
        onClick={() => setCampusContext(scenario.id)}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
      >
        {/* Ambient Glow Effect */}
        {isActive && (
          <motion.div
            className="absolute inset-0 opacity-20"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${currentTheme[`campus-${scenario.id}` as keyof typeof currentTheme]} 0%, transparent 70%)`
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.2 }}
            transition={{ duration: 0.3 }}
          />
        )}
        
        <div className="relative p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div
                className="w-10 h-10 rounded-lg flex items-center justify-center"
                style={{ 
                  backgroundColor: currentTheme[`campus-${scenario.id}` as keyof typeof currentTheme],
                  opacity: darkMode ? 0.9 : 1
                }}
              >
                <scenario.icon className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="font-medium" style={{ color: currentTheme['text-primary'] }}>
                  {scenario.title}
                </h4>
                <div className="flex items-center space-x-2 text-sm">
                  <Clock className="w-3 h-3" style={{ color: currentTheme['text-muted'] }} />
                  <span style={{ color: currentTheme['text-muted'] }}>{scenario.time}</span>
                  <span style={{ color: currentTheme['text-disabled'] }}>•</span>
                  <MapPin className="w-3 h-3" style={{ color: currentTheme['text-muted'] }} />
                  <span style={{ color: currentTheme['text-muted'] }}>{scenario.location}</span>
                </div>
              </div>
            </div>
            
            {/* Status Indicator */}
            <motion.div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: isActive ? currentTheme['interactive-success'] : currentTheme['text-disabled'] }}
              animate={{ scale: isActive ? [1, 1.2, 1] : 1 }}
              transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
            />
          </div>
          
          <p className="text-sm mb-4" style={{ color: currentTheme['text-secondary'] }}>
            {scenario.description}
          </p>
          
          {/* Characteristics */}
          <div className="flex flex-wrap gap-2 mb-4">
            {scenario.characteristics.map((char: string, index: number) => (
              <Badge 
                key={index}
                variant="outline" 
                className="text-xs"
                style={{ 
                  borderColor: currentTheme['border-secondary'],
                  color: currentTheme['text-muted'],
                  backgroundColor: darkMode ? currentTheme['background-tertiary'] : 'transparent'
                }}
              >
                {char}
              </Badge>
            ))}
          </div>
          
          {/* Dark Mode Settings Preview */}
          {isActive && (
            <motion.div
              className="mt-4 p-3 rounded-lg"
              style={{ backgroundColor: currentTheme['background-tertiary'] }}
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              transition={{ duration: 0.3 }}
            >
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span style={{ color: currentTheme['text-secondary'] }}>Brightness:</span>
                  <span className="ml-1" style={{ color: currentTheme['text-primary'] }}>
                    {scenario.darkModeFeatures.brightness}%
                  </span>
                </div>
                <div>
                  <span style={{ color: currentTheme['text-secondary'] }}>Contrast:</span>
                  <span className="ml-1" style={{ color: currentTheme['text-primary'] }}>
                    {scenario.darkModeFeatures.contrast}%
                  </span>
                </div>
                <div>
                  <span style={{ color: currentTheme['text-secondary'] }}>Blue Light:</span>
                  <span className="ml-1" style={{ color: currentTheme['text-primary'] }}>
                    {scenario.darkModeFeatures.blueLight}%
                  </span>
                </div>
                <div>
                  <span style={{ color: currentTheme['text-secondary'] }}>Notifications:</span>
                  <span className="ml-1 capitalize" style={{ color: currentTheme['text-primary'] }}>
                    {scenario.darkModeFeatures.notifications}
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    );
  };

  // Interface Preview Component
  const InterfacePreview = () => {
    const mockPosts = [
      {
        user: 'Sarah Chen',
        time: '2m ago',
        content: 'Anyone still in Lockwood? Found a great study spot on the 3rd floor 📚',
        space: 'UB Study Groups',
        likes: 12,
        comments: 3
      },
      {
        user: 'Mike Rodriguez',
        time: '15m ago',
        content: 'Late night coding session in the CS lab. Coffee break anyone? ☕',
        space: 'Engineering Hub',
        likes: 8,
        comments: 5
      }
    ];
    
    return (
      <div 
        className="max-w-md mx-auto rounded-2xl overflow-hidden shadow-2xl"
        style={{ 
          backgroundColor: currentTheme['background-primary'],
          border: `1px solid ${currentTheme['border-primary']}`
        }}
      >
        {/* Mobile Status Bar */}
        <div 
          className="flex justify-between items-center px-4 py-2 text-sm"
          style={{ backgroundColor: currentTheme['background-secondary'] }}
        >
          <div className="flex items-center space-x-1">
            <div className="flex space-x-1">
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: currentTheme['interactive-success'] }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: currentTheme['interactive-success'] }} />
              <div className="w-1 h-1 rounded-full" style={{ backgroundColor: currentTheme['text-disabled'] }} />
            </div>
            <span className="ml-2 text-xs" style={{ color: currentTheme['text-secondary'] }}>
              Campus WiFi
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <Battery className="w-4 h-4" style={{ color: currentTheme['interactive-success'] }} />
            <span className="text-xs" style={{ color: currentTheme['text-secondary'] }}>
              {darkMode ? '87%' : '76%'}
            </span>
            <span className="text-xs" style={{ color: currentTheme['text-secondary'] }}>
              {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
        </div>
        
        {/* App Header */}
        <div className="p-4 border-b" style={{ borderColor: currentTheme['border-primary'] }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div 
                className="w-8 h-8 rounded-lg flex items-center justify-center"
                style={{ backgroundColor: currentTheme['interactive-primary'] }}
              >
                <Zap className="w-4 h-4 text-white" />
              </div>
              <h3 className="font-semibold" style={{ color: currentTheme['text-primary'] }}>
                HIVE
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost" style={{ color: currentTheme['text-secondary'] }}>
                <Search className="w-4 h-4" />
              </Button>
              <Button size="sm" variant="ghost" style={{ color: currentTheme['text-secondary'] }}>
                <Bell className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
        
        {/* Feed Content */}
        <div className="p-4 space-y-4 max-h-96 overflow-y-auto">
          {mockPosts.map((post, index) => (
            <motion.div
              key={index}
              className="p-4 rounded-xl"
              style={{ backgroundColor: currentTheme['background-secondary'] }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center space-x-3 mb-3">
                <div 
                  className="w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: currentTheme['interactive-primary'] }}
                >
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium text-sm" style={{ color: currentTheme['text-primary'] }}>
                      {post.user}
                    </span>
                    <span className="text-xs" style={{ color: currentTheme['text-muted'] }}>
                      {post.time}
                    </span>
                  </div>
                  <Badge variant="outline" className="text-xs mt-1" 
                         style={{ borderColor: currentTheme['border-secondary'], color: currentTheme['text-muted'] }}>
                    {post.space}
                  </Badge>
                </div>
              </div>
              
              <p className="text-sm mb-3" style={{ color: currentTheme['text-secondary'] }}>
                {post.content}
              </p>
              
              <div className="flex items-center space-x-4 text-xs" style={{ color: currentTheme['text-muted'] }}>
                <button className="flex items-center space-x-1 hover:opacity-75 transition-opacity">
                  <span>❤️</span>
                  <span>{post.likes}</span>
                </button>
                <button className="flex items-center space-x-1 hover:opacity-75 transition-opacity">
                  <MessageSquare className="w-3 h-3" />
                  <span>{post.comments}</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Bottom Navigation */}
        <div 
          className="flex justify-around items-center py-3 px-4 border-t"
          style={{ 
            borderColor: currentTheme['border-primary'],
            backgroundColor: currentTheme['background-secondary']
          }}
        >
          {[Home, Search, Calendar, MessageSquare, User].map((Icon, index) => (
            <Button
              key={index}
              size="sm"
              variant="ghost"
              className="p-2"
              style={{ color: index === 0 ? currentTheme['interactive-primary'] : currentTheme['text-muted'] }}
            >
              <Icon className="w-5 h-5" />
            </Button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div 
      className="min-h-screen p-8 transition-all duration-500"
      style={{ 
        background: darkMode
          ? 'linear-gradient(135deg, #0A0A0B 0%, #111114 50%, #1A1A1F 100%)'
          : 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 50%, #F1F5F9 100%)',
        color: currentTheme['text-primary']
      }}
    >
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.23, 1, 0.32, 1] }}
        >
          <div className="flex items-center mb-6">
            <div 
              className="w-12 h-12 rounded-lg flex items-center justify-center mr-4 transition-all duration-300"
              style={{ 
                backgroundColor: currentTheme['background-tertiary'],
                border: `1px solid ${currentTheme['border-focus']}`
              }}
            >
              <Moon className="w-full h-full p-2" style={{ color: currentTheme['interactive-primary'] }} />
            </div>
            <h1 className="text-5xl font-bold bg-gradient-to-r from-[var(--hive-brand-primary)] via-purple-400 to-blue-400 bg-clip-text text-transparent">
              Dark Mode Experience
            </h1>
          </div>
          <p className="text-xl mb-6" style={{ color: currentTheme['text-secondary'] }}>
            Campus-optimized dark theme designed for late-night study sessions, battery conservation, and comfortable social interactions.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge style={{ backgroundColor: currentTheme['campus-study'], color: 'white' }}>Study Optimized</Badge>
            <Badge style={{ backgroundColor: currentTheme['campus-social'], color: 'white' }}>Social Friendly</Badge>
            <Badge style={{ backgroundColor: currentTheme['campus-dorm'], color: 'white' }}>Battery Efficient</Badge>
            <Badge style={{ backgroundColor: currentTheme['campus-library'], color: 'white' }}>Eye Strain Reduction</Badge>
          </div>
        </motion.div>

        {/* Theme Toggle Control */}
        <motion.div
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <Card style={{ backgroundColor: currentTheme['background-secondary'], borderColor: currentTheme['border-primary'] }}>
            <CardHeader>
              <CardTitle className="flex items-center" style={{ color: currentTheme['text-primary'] }}>
                <Settings className="w-5 h-5 mr-2" />
                Theme Configuration
              </CardTitle>
              <p style={{ color: currentTheme['text-muted'] }}>
                Customize your dark mode experience based on campus usage patterns
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Theme Toggle */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Sun className="w-4 h-4" style={{ color: currentTheme['text-secondary'] }} />
                      <span style={{ color: currentTheme['text-secondary'] }}>Light</span>
                    </div>
                    <Switch
                      checked={darkMode}
                      onCheckedChange={setDarkMode}
                    />
                    <div className="flex items-center space-x-2">
                      <span style={{ color: currentTheme['text-secondary'] }}>Dark</span>
                      <Moon className="w-4 h-4" style={{ color: currentTheme['text-secondary'] }} />
                    </div>
                  </div>
                  
                  {/* Time-based Recommendation */}
                  <div 
                    className="p-3 rounded-lg"
                    style={{ backgroundColor: currentTheme['background-tertiary'] }}
                  >
                    <div className="flex items-center space-x-2 mb-2">
                      <Clock className="w-4 h-4" style={{ color: currentTheme['interactive-primary'] }} />
                      <span className="text-sm font-medium" style={{ color: currentTheme['text-primary'] }}>
                        Time-Based Suggestion
                      </span>
                    </div>
                    <p className="text-xs" style={{ color: currentTheme['text-muted'] }}>
                      {timeTheme.isNight ? 'Night mode recommended for comfortable late-night usage' :
                       timeTheme.isEvening ? 'Auto mode suggested for evening transition' :
                       'Light mode optimal for daytime campus activities'}
                    </p>
                  </div>
                </div>

                {/* Brightness Control */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: currentTheme['text-secondary'] }}>
                      Adaptive Brightness: {adaptiveBrightness}%
                    </label>
                    <Slider
                      value={[adaptiveBrightness]}
                      onValueChange={([value]) => setAdaptiveBrightness(value)}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs mt-1" style={{ color: currentTheme['text-disabled'] }}>
                      <span>Battery Saver</span>
                      <span>Comfortable</span>
                      <span>Bright</span>
                    </div>
                  </div>

                  <div 
                    className="p-3 rounded-lg flex items-center space-x-2"
                    style={{ backgroundColor: currentTheme['background-tertiary'] }}
                  >
                    <Battery className="w-4 h-4" style={{ color: currentTheme['interactive-success'] }} />
                    <span className="text-sm" style={{ color: currentTheme['text-secondary'] }}>
                      Battery impact: {adaptiveBrightness > 80 ? 'High' : adaptiveBrightness > 60 ? 'Medium' : 'Low'}
                    </span>
                  </div>
                </div>

                {/* Blue Light Filter */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2" style={{ color: currentTheme['text-secondary'] }}>
                      Blue Light Reduction: {blueLight}%
                    </label>
                    <Slider
                      value={[blueLight]}
                      onValueChange={([value]) => setBlueLight(value)}
                      max={100}
                      step={5}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs mt-1" style={{ color: currentTheme['text-disabled'] }}>
                      <span>Natural</span>
                      <span>Reduced</span>
                      <span>Sleep Mode</span>
                    </div>
                  </div>

                  <div 
                    className="p-3 rounded-lg flex items-center space-x-2"
                    style={{ backgroundColor: currentTheme['background-tertiary'] }}
                  >
                    <Eye className="w-4 h-4" style={{ color: currentTheme['interactive-primary'] }} />
                    <span className="text-sm" style={{ color: currentTheme['text-secondary'] }}>
                      Circadian impact: {blueLight < 30 ? 'Sleep-friendly' : blueLight < 60 ? 'Moderate' : 'Neutral'}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Campus Scenario Showcase */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-3" style={{ color: currentTheme['text-primary'] }}>
              Campus Night Scenarios
            </h2>
            <p style={{ color: currentTheme['text-secondary'] }}>
              Dark mode optimizations tailored for different campus usage contexts
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {campusScenarios.map((scenario, index) => (
              <motion.div
                key={scenario.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 + index * 0.1 }}
              >
                <ThemeDemo scenario={scenario} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interface Preview */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.6 }}
        >
          <Card style={{ backgroundColor: currentTheme['background-secondary'], borderColor: currentTheme['border-primary'] }}>
            <CardHeader>
              <CardTitle style={{ color: currentTheme['text-primary'] }}>
                Live Interface Preview
              </CardTitle>
              <p style={{ color: currentTheme['text-muted'] }}>
                Experience how HIVE looks and feels in {darkMode ? 'dark' : 'light'} mode
              </p>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center">
                <InterfacePreview />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Dark Mode Benefits */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <Card style={{ backgroundColor: currentTheme['background-secondary'], borderColor: currentTheme['border-primary'] }}>
            <CardHeader>
              <CardTitle style={{ color: currentTheme['text-primary'] }}>
                Campus Dark Mode Benefits
              </CardTitle>
              <p style={{ color: currentTheme['text-muted'] }}>
                Why dark mode matters for student experiences
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    icon: Eye,
                    title: 'Reduced Eye Strain',
                    description: 'Comfortable viewing during extended study sessions',
                    benefits: ['Less fatigue', 'Better focus', 'Extended usage comfort'],
                    color: currentTheme['interactive-primary']
                  },
                  {
                    icon: Battery,
                    title: 'Battery Conservation',
                    description: 'OLED-optimized colors extend mobile device battery life',
                    benefits: ['Up to 30% battery savings', 'All-day usage', 'Efficient OLED pixels'],
                    color: currentTheme['interactive-success']
                  },
                  {
                    icon: CloudMoon,
                    title: 'Sleep Health',
                    description: 'Blue light reduction supports healthy circadian rhythms',
                    benefits: ['Better sleep quality', 'Reduced blue light', 'Evening-friendly'],
                    color: currentTheme['campus-study']
                  },
                  {
                    icon: Users,
                    title: 'Social Consideration',
                    description: 'Non-intrusive interface for shared study spaces',
                    benefits: ['Reduced screen glare', 'Library-friendly', 'Respectful brightness'],
                    color: currentTheme['campus-social']
                  },
                  {
                    icon: Contrast,
                    title: 'Enhanced Contrast',
                    description: 'Improved readability for accessibility and focus',
                    benefits: ['Better text clarity', 'Accessibility support', 'Reduced cognitive load'],
                    color: currentTheme['campus-dorm']
                  },
                  {
                    icon: Zap,
                    title: 'Performance Boost',
                    description: 'Efficient rendering improves app responsiveness',
                    benefits: ['Faster animations', 'Smoother scrolling', 'Better performance'],
                    color: currentTheme['campus-library']
                  }
                ].map((benefit, index) => (
                  <motion.div
                    key={index}
                    className="p-4 rounded-lg border"
                    style={{ 
                      backgroundColor: currentTheme['background-tertiary'],
                      borderColor: currentTheme['border-primary']
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <div className="flex items-center mb-3">
                      <div
                        className="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                        style={{ backgroundColor: benefit.color, opacity: 0.9 }}
                      >
                        <benefit.icon className="w-4 h-4 text-white" />
                      </div>
                      <h4 className="font-medium" style={{ color: currentTheme['text-primary'] }}>
                        {benefit.title}
                      </h4>
                    </div>
                    
                    <p className="text-sm mb-3" style={{ color: currentTheme['text-secondary'] }}>
                      {benefit.description}
                    </p>
                    
                    <ul className="space-y-1">
                      {benefit.benefits.map((item, idx) => (
                        <li key={idx} className="flex items-center text-sm">
                          <div 
                            className="w-1.5 h-1.5 rounded-full mr-2"
                            style={{ backgroundColor: benefit.color }}
                          />
                          <span style={{ color: currentTheme['text-muted'] }}>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Implementation Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <Card style={{ backgroundColor: currentTheme['background-secondary'], borderColor: currentTheme['border-primary'] }}>
            <CardHeader>
              <CardTitle style={{ color: currentTheme['text-primary'] }}>
                Dark Mode Implementation
              </CardTitle>
              <p style={{ color: currentTheme['text-muted'] }}>
                Technical guidelines for campus-optimized dark theme implementation
              </p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3" style={{ color: currentTheme['text-primary'] }}>
                      CSS Custom Properties
                    </h4>
                    <div 
                      className="p-4 rounded-lg font-mono text-sm space-y-1 overflow-x-auto"
                      style={{ backgroundColor: currentTheme['background-tertiary'] }}
                    >
                      <div style={{ color: currentTheme['text-muted'] }}>/* Dark Theme Variables */</div>
                      <div style={{ color: currentTheme['text-primary'] }}>:root[data-theme="dark"] &#123;</div>
                      <div className="pl-4" style={{ color: currentTheme['interactive-primary'] }}>--bg-primary: #0A0A0B;</div>
                      <div className="pl-4" style={{ color: currentTheme['interactive-primary'] }}>--bg-secondary: #111114;</div>
                      <div className="pl-4" style={{ color: currentTheme['interactive-primary'] }}>--text-primary: #FFFFFF;</div>
                      <div className="pl-4" style={{ color: currentTheme['interactive-primary'] }}>--text-secondary: #B3B3B8;</div>
                      <div style={{ color: currentTheme['text-primary'] }}>&#125;</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3" style={{ color: currentTheme['text-primary'] }}>
                      Adaptive Brightness
                    </h4>
                    <div 
                      className="p-4 rounded-lg font-mono text-sm space-y-1 overflow-x-auto"
                      style={{ backgroundColor: currentTheme['background-tertiary'] }}
                    >
                      <div style={{ color: currentTheme['text-muted'] }}>// Brightness adaptation</div>
                      <div style={{ color: currentTheme['text-primary'] }}>const adjustBrightness = (level) => &#123;</div>
                      <div className="pl-4" style={{ color: currentTheme['text-primary'] }}>document.documentElement</div>
                      <div className="pl-8" style={{ color: currentTheme['text-primary'] }}>.style.filter = `brightness($&#123;level&#125;%)`;</div>
                      <div style={{ color: currentTheme['text-primary'] }}>&#125;;</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium mb-3" style={{ color: currentTheme['text-primary'] }}>
                      Auto Dark Mode Detection
                    </h4>
                    <div 
                      className="p-4 rounded-lg font-mono text-sm space-y-1 overflow-x-auto"
                      style={{ backgroundColor: currentTheme['background-tertiary'] }}
                    >
                      <div style={{ color: currentTheme['text-muted'] }}>// System preference detection</div>
                      <div style={{ color: currentTheme['text-primary'] }}>const prefersDark = window</div>
                      <div className="pl-4" style={{ color: currentTheme['text-primary'] }}>.matchMedia('(prefers-color-scheme: dark)');</div>
                      <div className="mt-2" style={{ color: currentTheme['text-primary'] }}>prefersDark.addListener(toggleTheme);</div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium mb-3" style={{ color: currentTheme['text-primary'] }}>
                      Campus Context Optimization
                    </h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start" style={{ color: currentTheme['text-muted'] }}>
                        <div 
                          className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                          style={{ backgroundColor: currentTheme['interactive-primary'] }}
                        />
                        Time-based theme suggestions (evening/night modes)
                      </li>
                      <li className="flex items-start" style={{ color: currentTheme['text-muted'] }}>
                        <div 
                          className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                          style={{ backgroundColor: currentTheme['interactive-primary'] }}
                        />
                        Battery level awareness for auto-brightness
                      </li>
                      <li className="flex items-start" style={{ color: currentTheme['text-muted'] }}>
                        <div 
                          className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                          style={{ backgroundColor: currentTheme['interactive-primary'] }}
                        />
                        Campus location context (library vs dorm settings)
                      </li>
                      <li className="flex items-start" style={{ color: currentTheme['text-muted'] }}>
                        <div 
                          className="w-1.5 h-1.5 rounded-full mr-3 mt-2 flex-shrink-0"
                          style={{ backgroundColor: currentTheme['interactive-primary'] }}
                        />
                        Social context awareness (study vs social modes)
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export const DarkModeCampusExperience: Story = {
  render: () => <DarkModeShowcase />,
  parameters: {
    layout: 'fullscreen'
  }
};