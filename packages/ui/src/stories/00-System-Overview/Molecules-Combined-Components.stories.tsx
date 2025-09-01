/**
 * HIVE Molecules: Combined Components
 * Molecules are combinations of atoms that form functional units
 */

import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { motion, AnimatePresence } from '../../components/framer-motion-proxy';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Avatar, AvatarFallback } from '../../components/ui/avatar';
import { Input } from '../../components/ui/input';
import { Separator } from '../../components/ui/separator';
import { hiveVariants, hiveEasing, hiveDuration } from '../../motion/hive-motion';
import '../../hive-tokens.css';
import { 
  User, 
  Users, 
  Calendar, 
  MapPin, 
  Heart, 
  MessageSquare, 
  Share,
  Search,
  Filter,
  Star,
  Clock,
  BookOpen,
  Home,
  Zap,
  Settings,
  Bell,
  ChevronRight,
  MoreVertical
} from 'lucide-react';

const meta = {
  component: MoleculeShowcase,
  title: '03-Molecules/Combined Components',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
# HIVE Molecules: Combined Components

Molecules combine atoms to create functional components that serve specific purposes in campus social interactions.

## Campus-First Design
- **Space Cards**: Essential for space discovery and engagement
- **User Cards**: Profile representation in social contexts  
- **Form Fields**: Optimized for campus data entry
- **Navigation Items**: Thumb-friendly mobile navigation
        `
      }
    }
  }
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

const MoleculeShowcase = () => {
  const [hoveredMolecule, setHoveredMolecule] = useState<string | null>(null);

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
          <h1 className="text-4xl font-bold mb-4" style={{ color: 'var(--hive-brand-primary)' }}>HIVE Molecular Components</h1>
          <p className="text-xl mb-6" style={{ color: 'var(--hive-text-secondary)' }}>
            Functional combinations of atoms that power campus social interactions and utility features.
          </p>
          <div className="flex flex-wrap gap-2">
            <Badge style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)', borderColor: 'var(--hive-border-primary)' }}>Molecular Design</Badge>
            <Badge style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)', borderColor: 'var(--hive-border-primary)' }}>Campus Context</Badge>
            <Badge style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)', borderColor: 'var(--hive-border-primary)' }}>Social Utility</Badge>
            <Badge style={{ backgroundColor: 'var(--hive-background-tertiary)', color: 'var(--hive-text-primary)', borderColor: 'var(--hive-border-primary)' }}>Mobile Native</Badge>
          </div>
        </motion.div>

        <motion.div 
          className="space-y-12"
          variants={hiveVariants.feedCascade}
          initial="hidden"
          animate="visible"
        >
          
          {/* Space Cards */}
          <motion.div
            variants={hiveVariants.feedCascade}
            custom={0}
            onHoverStart={() => setHoveredMolecule('space-cards')}
            onHoverEnd={() => setHoveredMolecule(null)}
          >
            <Card className="hive-interactive cursor-pointer" style={{ backgroundColor: 'var(--hive-background-secondary)', borderColor: 'var(--hive-border-primary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
                  e.currentTarget.style.boxShadow = 'var(--hive-shadow-gold-glow)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--hive-border-primary)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
            <CardHeader>
              <CardTitle className="flex items-center" style={{ color: 'var(--hive-brand-primary)' }}>
                <Users className="w-5 h-5 mr-2" />
                Space Cards
              </CardTitle>
              <p style={{ color: 'var(--hive-text-muted)' }}>Campus community representation and engagement</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Academic Space */}
                <div className="rounded-lg p-4 hive-interactive transition-colors cursor-pointer" style={{ backgroundColor: 'var(--hive-background-primary)', borderColor: 'var(--hive-border-primary)' }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
                       e.currentTarget.style.boxShadow = 'var(--hive-shadow-gold-glow)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.borderColor = 'var(--hive-border-primary)';
                       e.currentTarget.style.boxShadow = 'none';
                     }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">CS 101 Study Group</h4>
                        <p className="text-gray-400 text-sm">Computer Science</p>
                      </div>
                    </div>
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">
                    Weekly study sessions for intro programming. Collaborative coding and exam prep.
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        24 members
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Active
                      </span>
                    </div>
                    <Badge style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>Academic</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button size="icon" variant="ghost" className="w-8 h-8 text-gray-400 hover:text-red-400">
                        <Heart className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="w-8 h-8 text-gray-400 hover:text-white">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="w-8 h-8 text-gray-400 hover:text-white">
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button size="sm" className="hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                      Join
                    </Button>
                  </div>
                </div>

                {/* Housing Space */}
                <div className="rounded-lg p-4 hive-interactive transition-colors cursor-pointer" style={{ backgroundColor: 'var(--hive-background-primary)', borderColor: 'var(--hive-border-primary)' }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
                       e.currentTarget.style.boxShadow = 'var(--hive-shadow-gold-glow)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.borderColor = 'var(--hive-border-primary)';
                       e.currentTarget.style.boxShadow = 'none';
                     }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center mr-3">
                        <Home className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">Ellicott 3rd Floor</h4>
                        <p className="text-gray-400 text-sm">Housing • Dorm</p>
                      </div>
                    </div>
                    <Badge className="bg-green-500 text-white">17 Active</Badge>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">
                    Third floor community space. Coordinating laundry, food orders, and floor events.
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <MapPin className="w-4 h-4 mr-1" />
                        Ellicott Complex
                      </span>
                      <span className="flex items-center">
                        <Zap className="w-4 h-4 mr-1" />
                        Very Active
                      </span>
                    </div>
                    <Badge variant="secondary" style={{ backgroundColor: 'var(--hive-background-tertiary)' }}>Housing</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                      {[1, 2, 3, 4].map((i) => (
                        <Avatar key={i} className="w-6 h-6 border-2" style={{ borderColor: 'var(--hive-border-primary)' }}>
                          <AvatarFallback className="bg-gradient-to-r from-pink-500 to-purple-500 text-white text-xs">
                            {String.fromCharCode(65 + i)}
                          </AvatarFallback>
                        </Avatar>
                      ))}
                    </div>
                    <Button size="sm" variant="secondary" className="text-white" style={{ borderColor: 'var(--hive-border-primary)' }}>
                      Member
                    </Button>
                  </div>
                </div>

                {/* Social Space */}
                <div className="rounded-lg p-4 hive-interactive transition-colors cursor-pointer" style={{ backgroundColor: 'var(--hive-background-primary)', borderColor: 'var(--hive-border-primary)' }}
                     onMouseEnter={(e) => {
                       e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
                       e.currentTarget.style.boxShadow = 'var(--hive-shadow-gold-glow)';
                     }}
                     onMouseLeave={(e) => {
                       e.currentTarget.style.borderColor = 'var(--hive-border-primary)';
                       e.currentTarget.style.boxShadow = 'none';
                     }}>
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg flex items-center justify-center mr-3">
                        <Calendar className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="text-white font-semibold">Weekend Campus Events</h4>
                        <p className="text-gray-400 text-sm">Social • Events</p>
                      </div>
                    </div>
                    <MoreVertical className="w-4 h-4 text-gray-500" />
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">
                    Discover and coordinate weekend activities. From parties to study sessions.
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        156 members
                      </span>
                      <span className="flex items-center">
                        <Star className="w-4 h-4 mr-1" />
                        Hot
                      </span>
                    </div>
                    <Badge className="bg-orange-500 text-white">Popular</Badge>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Button size="icon" variant="ghost" className="w-8 h-8 text-red-400">
                        <Heart className="w-4 h-4 fill-current" />
                      </Button>
                      <Button size="icon" variant="ghost" className="w-8 h-8 text-gray-400 hover:text-white">
                        <MessageSquare className="w-4 h-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="w-8 h-8 text-gray-400 hover:text-white">
                        <Share className="w-4 h-4" />
                      </Button>
                    </div>
                    <Button size="sm" className="hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                      Join
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            </Card>
          </motion.div>

          {/* User Profile Cards */}
          <motion.div
            variants={hiveVariants.feedCascade}
            custom={1}
            onHoverStart={() => setHoveredMolecule('user-cards')}
            onHoverEnd={() => setHoveredMolecule(null)}
          >
            <Card className="hive-interactive cursor-pointer" style={{ backgroundColor: 'var(--hive-background-secondary)', borderColor: 'var(--hive-border-primary)' }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
                  e.currentTarget.style.boxShadow = 'var(--hive-shadow-gold-glow)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--hive-border-primary)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
            <CardHeader>
              <CardTitle className="flex items-center" style={{ color: 'var(--hive-brand-primary)' }}>
                <User className="w-5 h-5 mr-2" />
                User Profile Cards
              </CardTitle>
              <p style={{ color: 'var(--hive-text-muted)' }}>Student identity representation in social contexts</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Builder Profile */}
                <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--hive-background-primary)', borderColor: 'var(--hive-border-primary)' }}>
                  <div className="flex items-center mb-4">
                    <Avatar className="w-12 h-12 mr-3">
                      <AvatarFallback className="font-semibold" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>SC</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">Sarah Chen</h4>
                      <p className="text-gray-400 text-sm">@sarahc</p>
                    </div>
                    <Badge style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>Builder</Badge>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">
                    CS Major • Creating tools for better campus life. Love building things that help people connect.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold" style={{ color: 'var(--hive-brand-primary)' }}>12</div>
                      <div className="text-xs text-gray-400">Spaces Joined</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold" style={{ color: 'var(--hive-brand-primary)' }}>5</div>
                      <div className="text-xs text-gray-400">Tools Built</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 hive-interactive" style={{ backgroundColor: 'var(--hive-brand-primary)', color: 'var(--hive-text-inverse)' }}>
                      Connect
                    </Button>
                    <Button size="sm" variant="secondary" className="text-white" style={{ borderColor: 'var(--hive-border-primary)' }}>
                      View Profile
                    </Button>
                  </div>
                </div>

                {/* Student Leader */}
                <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--hive-background-primary)', borderColor: 'var(--hive-border-primary)' }}>
                  <div className="flex items-center mb-4">
                    <Avatar className="w-12 h-12 mr-3">
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold">MJ</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">Marcus Johnson</h4>
                      <p className="text-gray-400 text-sm">@mjohnson</p>
                    </div>
                    <Badge style={{ backgroundColor: 'var(--hive-status-info)', color: 'var(--hive-text-inverse)' }}>RA</Badge>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">
                    Business Major • RA for Governors Complex. Organizing floor events and campus connections.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold" style={{ color: 'var(--hive-status-info)' }}>8</div>
                      <div className="text-xs text-gray-400">Spaces Leading</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold" style={{ color: 'var(--hive-status-info)' }}>45</div>
                      <div className="text-xs text-gray-400">Events Created</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1" style={{ backgroundColor: 'var(--hive-status-info)', color: 'var(--hive-text-inverse)' }}>
                      Follow
                    </Button>
                    <Button size="sm" variant="secondary" className="text-white" style={{ borderColor: 'var(--hive-border-primary)' }}>
                      Message
                    </Button>
                  </div>
                </div>

                {/* Regular Student */}
                <div className="rounded-lg p-4" style={{ backgroundColor: 'var(--hive-background-primary)', borderColor: 'var(--hive-border-primary)' }}>
                  <div className="flex items-center mb-4">
                    <Avatar className="w-12 h-12 mr-3">
                      <AvatarFallback className="bg-gradient-to-r from-green-500 to-teal-500 text-white font-semibold">AL</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h4 className="text-white font-semibold">Alex Liu</h4>
                      <p className="text-gray-400 text-sm">@alexl</p>
                    </div>
                    <Badge variant="secondary" style={{ borderColor: 'var(--hive-border-primary)', color: 'var(--hive-text-secondary)' }}>Freshman</Badge>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-4">
                    Engineering Major • New to campus and looking to connect with study groups and social activities.
                  </p>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-400">6</div>
                      <div className="text-xs text-gray-400">Spaces Joined</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-green-400">New</div>
                      <div className="text-xs text-gray-400">Member</div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" className="flex-1 bg-green-500 text-white hover:bg-green-600">
                      Connect
                    </Button>
                    <Button size="sm" variant="secondary" className="text-white" style={{ borderColor: 'var(--hive-border-primary)' }}>
                      View Profile
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            </Card>
          </motion.div>

          {/* Form Fields & Search */}
          <motion.div 
            className="grid grid-cols-1 lg:grid-cols-2 gap-8"
            variants={hiveVariants.feedCascade}
            custom={2}
          >
            
            {/* Enhanced Form Fields */}
            <Card className="hive-glass border hive-interactive cursor-pointer"
                style={{
                  background: 'var(--hive-overlay-glass)',
                  borderColor: 'var(--hive-border-subtle)',
                  transition: 'all var(--hive-duration-smooth) var(--hive-easing-liquid)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
                  e.currentTarget.style.boxShadow = 'var(--hive-shadow-gold-glow)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--hive-border-subtle)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
              <CardHeader>
                <CardTitle className="flex items-center" style={{ color: 'var(--hive-brand-primary)' }}>
                  <Search className="w-5 h-5 mr-2" />
                  Enhanced Form Fields
                </CardTitle>
                <p style={{ color: 'var(--hive-text-muted)' }}>Campus-optimized data entry components</p>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Search with Filters */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Find Spaces</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input 
                      type="text" 
                      placeholder="Search by name, topic, or major..." 
                      className="pl-10 pr-12"
                      style={{ 
                        backgroundColor: 'var(--hive-background-tertiary)',
                        borderColor: 'var(--hive-border-primary)',
                        color: 'var(--hive-text-primary)'
                      }}
                    />
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="absolute right-1 top-1/2 transform -translate-y-1/2 w-8 h-8"
                    >
                      <Filter className="w-4 h-4 text-gray-400" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge variant="secondary" className="cursor-pointer hive-interactive" style={{ borderColor: 'var(--hive-border-primary)', color: 'var(--hive-text-secondary)' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--hive-brand-primary)'; e.currentTarget.style.color = 'var(--hive-brand-primary)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--hive-border-primary)'; e.currentTarget.style.color = 'var(--hive-text-muted)'; }}>Academic</Badge>
                    <Badge variant="secondary" className="cursor-pointer hive-interactive" style={{ borderColor: 'var(--hive-border-primary)', color: 'var(--hive-text-secondary)' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--hive-brand-primary)'; e.currentTarget.style.color = 'var(--hive-brand-primary)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--hive-border-primary)'; e.currentTarget.style.color = 'var(--hive-text-muted)'; }}>Social</Badge>
                    <Badge variant="secondary" className="cursor-pointer hive-interactive" style={{ borderColor: 'var(--hive-border-primary)', color: 'var(--hive-text-secondary)' }} onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--hive-brand-primary)'; e.currentTarget.style.color = 'var(--hive-brand-primary)'; }} onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--hive-border-primary)'; e.currentTarget.style.color = 'var(--hive-text-muted)'; }}>Housing</Badge>
                  </div>
                </div>

                {/* Email Verification Field */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">University Email</label>
                  <div className="relative">
                    <Input 
                      type="email" 
                      placeholder="your.email@buffalo.edu" 
                      style={{ 
                        backgroundColor: 'var(--hive-background-tertiary)',
                        borderColor: 'var(--hive-border-primary)',
                        color: 'var(--hive-text-primary)'
                      }}
                    />
                    <Badge className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-green-500 text-white text-xs">
                      Verified
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400">Only UB students can join HIVE</p>
                </div>

                {/* Handle Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-300">Your Handle</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">@</span>
                    <Input 
                      type="text" 
                      placeholder="your-unique-handle" 
                      className="pl-8"
                      style={{ 
                        backgroundColor: 'var(--hive-background-tertiary)',
                        borderColor: 'var(--hive-border-primary)',
                        color: 'var(--hive-text-primary)'
                      }}
                    />
                  </div>
                  <p className="text-xs text-green-400">✓ Available</p>
                </div>
              </CardContent>
            </Card>

            {/* Navigation Items */}
            <Card className="hive-glass border hive-interactive cursor-pointer"
                style={{
                  background: 'var(--hive-overlay-glass)',
                  borderColor: 'var(--hive-border-subtle)',
                  transition: 'all var(--hive-duration-smooth) var(--hive-easing-liquid)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = 'var(--hive-border-gold)';
                  e.currentTarget.style.boxShadow = 'var(--hive-shadow-gold-glow)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'var(--hive-border-subtle)';
                  e.currentTarget.style.boxShadow = 'none';
                }}>
              <CardHeader>
                <CardTitle className="flex items-center" style={{ color: 'var(--hive-brand-primary)' }}>
                  <Settings className="w-5 h-5 mr-2" />
                  Navigation Components
                </CardTitle>
                <p style={{ color: 'var(--hive-text-muted)' }}>Mobile-optimized navigation patterns</p>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Main Navigation Items */}
                <div className="space-y-2">
                  <h4 className="text-white font-medium mb-3">Main Navigation</h4>
                  <div className="space-y-1">
                    {[
                      { icon: Home, label: 'Feed', active: true, badge: null },
                      { icon: Users, label: 'Spaces', active: false, badge: '3 New' },
                      { icon: User, label: 'Profile', active: false, badge: null },
                      { icon: Calendar, label: 'Calendar', active: false, badge: '2' },
                      { icon: Zap, label: 'Tools', active: false, badge: null },
                    ].map(({ icon: Icon, label, active, badge }) => (
                      <div 
                        key={label}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors hive-interactive ${
                          active 
                            ? 'text-white border'
                            : 'hover:bg-gray-800 text-gray-300 hover:text-white'
                        }`}
                        style={active ? {
                          backgroundColor: 'var(--hive-overlay-gold-subtle)',
                          color: 'var(--hive-brand-primary)',
                          borderColor: 'var(--hive-border-gold)'
                        } : {}}
                      >
                        <div className="flex items-center">
                          <Icon className="w-5 h-5 mr-3" />
                          <span className="font-medium">{label}</span>
                        </div>
                        <div className="flex items-center">
                          {badge && (
                            <Badge className="bg-red-500 text-white mr-2">{badge}</Badge>
                          )}
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator style={{ backgroundColor: 'var(--hive-border-primary)' }} />

                {/* Settings Navigation */}
                <div className="space-y-2">
                  <h4 className="text-white font-medium mb-3">Settings</h4>
                  <div className="space-y-1">
                    {[
                      { icon: Bell, label: 'Notifications', active: false },
                      { icon: Settings, label: 'Privacy', active: false },
                      { icon: User, label: 'Account', active: false },
                    ].map(({ icon: Icon, label, active }) => (
                      <div 
                        key={label}
                        className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors hive-interactive ${
                          active 
                            ? 'text-white border'
                            : 'hover:bg-gray-800 text-gray-300 hover:text-white'
                        }`}
                        style={active ? {
                          backgroundColor: 'var(--hive-overlay-gold-subtle)',
                          color: 'var(--hive-brand-primary)',
                          borderColor: 'var(--hive-border-gold)'
                        } : {}}
                      >
                        <div className="flex items-center">
                          <Icon className="w-5 h-5 mr-3" />
                          <span className="font-medium">{label}</span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-gray-500" />
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Molecular Design Guidelines */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        >
          <Card className="bg-gray-800/50 border-gray-700 mt-12">
          <CardHeader>
            <CardTitle style={{ color: 'var(--hive-brand-primary)' }}>Molecular Component Guidelines</CardTitle>
            <p className="text-gray-400">How molecules create meaningful campus social interactions</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h4 className="text-white font-medium mb-2">Campus Context</h4>
                <p className="text-gray-400 text-sm">
                  Every molecule reflects real university social dynamics and student needs.
                </p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Social Utility</h4>
                <p className="text-gray-400 text-sm">
                  Components serve both social connection and practical utility functions.
                </p>
              </div>
              <div>
                <h4 className="text-white font-medium mb-2">Viral Growth</h4>
                <p className="text-gray-400 text-sm">
                  Built-in sharing and invitation mechanics encourage organic platform growth.
                </p>
              </div>
            </div>
          </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export const MolecularComponents: Story = {
  render: () => <MoleculeShowcase />,
  parameters: {
    layout: 'fullscreen'
  }
};