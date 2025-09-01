/**
 * Social Profile Layout - Tinder-Style Social + Student Utility
 * Mobile-first bento grid with portrait avatar and social cards
 */

"use client";

import React, { useState, useEffect } from 'react';
import { Ghost, Settings, Bell, Edit, Customize, Palette } from 'lucide-react';
import { cn } from '../lib/utils';

// HIVE Foundation Systems
import { typographyComposition } from '../../atomic/foundations/typography-composition';
import { colorComposition } from '../../atomic/foundations/color-composition';
import { layoutComposition } from '../../atomic/foundations/layout-composition';
import { motionComposition } from '../../atomic/foundations/motion-composition';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { motion } from '../../lib/motion';
import { butterClasses, getStaggerClass } from '../../lib/motion';
import SocialAvatarCard from './social-avatar-card';
import SocialCalendarCard from './social-calendar-card';
import SocialToolsCard from './social-tools-card';
import SocialSpacesCard from './social-spaces-card';
import '../../styles/social-profile.css';

interface SocialProfileData {
  user: {
    id: string;
    fullName: string;
    handle: string;
    bio?: string;
    avatar?: string;
    photos?: string[];
    major?: string;
    academicYear?: string;
    isBuilder: boolean;
    builderLevel?: string;
    toolsCreated?: number;
    campusImpact?: number;
    onlineStatus: 'online' | 'offline' | 'away' | 'studying';
    lastSeen?: string;
  };
  
  events: Array<{
    id: string;
    title: string;
    time: string;
    endTime?: string;
    type: 'class' | 'study' | 'social' | 'meeting' | 'exam';
    location?: string;
    attendees?: {
      going: number;
      maybe: number;
      spotsLeft?: number;
    };
    canJoin?: boolean;
    userStatus?: 'going' | 'maybe' | 'not-going' | null;
    friends?: string[];
  }>;
  
  tools: Array<{
    id: string;
    name: string;
    icon: string;
    category: 'academic' | 'productivity' | 'social' | 'finance' | 'health';
    rating: number;
    usageCount?: number;
    socialProof?: {
      friendsUsed: string[];
      totalUsers: number;
      trending?: boolean;
    };
    isCreated?: boolean;
    isNew?: boolean;
    isFavorite?: boolean;
    lastUsed?: string;
  }>;
  
  spaces: Array<{
    id: string;
    name: string;
    type: 'academic' | 'housing' | 'club' | 'course' | 'community' | 'social';
    memberCount: number;
    role: 'member' | 'moderator' | 'leader' | 'admin';
    activityLevel: 'quiet' | 'active' | 'busy' | 'very-active';
    unreadCount?: number;
    recentActivity?: {
      type: 'post' | 'event' | 'poll' | 'announcement';
      author: string;
      content: string;
      timestamp: string;
    };
    upcomingEvents?: {
      count: number;
      nextEvent?: string;
    };
    isPrivate: boolean;
    color: string;
    icon?: string;
    lastActivity: string;
  }>;
  
  privacy: {
    ghostMode: boolean;
    isPublic: boolean;
    showActivity: boolean;
  };
  
  availability?: {
    status: 'available' | 'busy' | 'studying' | 'do-not-disturb';
    freeUntil?: string;
  };
  
  recentActivity?: Array<{
    id: string;
    type: 'tool' | 'space' | 'event';
    description: string;
    timestamp: string;
  }>;
  
  notifications?: number;
}

interface SocialProfileLayoutProps {
  data: SocialProfileData;
  socialProof?: {
    mutualConnections: number;
    mutualFriends?: string[];
  };
  isOwn?: boolean;
  onEditProfile?: () => void;
  onPrivacySettings?: () => void;
  onSettings?: () => void;
  onCustomizeLayout?: () => void;
  onPhotoUpload?: (file: File) => void;
  onConnect?: () => void;
  onMessage?: () => void;
  className?: string;
}

export function SocialProfileLayout({
  data,
  socialProof,
  isOwn = false,
  onEditProfile,
  onPrivacySettings,
  onSettings,
  onCustomizeLayout,
  onPhotoUpload,
  onConnect,
  onMessage,
  className
}: SocialProfileLayoutProps) {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [notifications, setNotifications] = useState(data.notifications || 0);
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  const handleToggleGhostMode = () => {
    // TODO: Implement ghost mode toggle
    console.log('Toggle ghost mode');
  };

  return (
    <motion.div 
      className={cn("social-profile-container", className)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Profile Header */}
      <motion.header 
        className="flex items-center justify-between mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="profile-display text-primary">
            {isOwn ? 'Your Profile' : `${data.user.fullName}'s Profile`}
          </h1>
          <div className="flex items-center gap-2 mt-1">
            <span className="profile-body text-secondary">
              {isOwn ? data.user.handle : `@${data.user.handle}`}
            </span>
            {data.user.onlineStatus === 'online' && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <Badge variant="secondary" className="text-xs border-social-green text-social-green">
                  Online now
                </Badge>
              </motion.div>
            )}
          </div>
        </motion.div>
        
        <motion.div 
          className="flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          {isOwn && (
            <motion.div
              className="flex items-center gap-2"
              initial="hidden"
              animate="visible"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
              }}
            >
              {/* Customize Layout */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ButtonEnhanced
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setIsCustomizing(!isCustomizing);
                    onCustomizeLayout?.();
                  }}
                  className={cn("social-action-button secondary hidden md:flex", butterClasses.button)}
                >
                  <Palette size={16} />
                  Customize Layout
                </ButtonEnhanced>
              </motion.div>
              
              {/* Ghost Mode Toggle */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ButtonEnhanced
                  variant="secondary"
                  size="sm"
                  onClick={handleToggleGhostMode}
                  className={cn(
                    "social-action-button",
                    data.privacy.ghostMode ? "bg-gray-600 text-[var(--hive-text-inverse)]" : "secondary",
                    butterClasses.button
                  )}
                >
                  <Ghost size={16} />
                  {isMobile ? '' : `Ghost: ${data.privacy.ghostMode ? 'On' : 'Off'}`}
                </ButtonEnhanced>
              </motion.div>
              
              {/* Notifications */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <ButtonEnhanced
                  variant="secondary"
                  size="sm"
                  className={cn("social-action-button secondary", butterClasses.button)}
                >
                  <Bell size={16} />
                  {notifications > 0 && (
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.6, type: "spring", stiffness: 500, damping: 25 }}
                    >
                      <Badge className="absolute -top-1 -right-1 bg-blue-500 text-[var(--hive-text-inverse)] text-xs px-1 py-0 min-w-[18px] h-5 flex items-center justify-center">
                        {notifications}
                      </Badge>
                    </motion.div>
                  )}
                </ButtonEnhanced>
              </motion.div>
              
              {/* Settings */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 }
                }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <ButtonEnhanced
                  variant="secondary"
                  size="sm"
                  onClick={onSettings}
                  className={cn("social-action-button secondary", butterClasses.button)}
                >
                  <Settings size={16} />
                </ButtonEnhanced>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </motion.header>
      
      {/* Customization Mode Indicator */}
      {isCustomizing && (
        <motion.div 
          className="flex items-center justify-between p-4 mb-6 rounded-lg bg-blue-500/10 border border-blue-500/20"
          initial={{ opacity: 0, y: -20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -20, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <Edit size={16} className="text-blue-400" />
            <span className="profile-body text-blue-400 font-medium">
              🎨 Customize Your Profile
            </span>
          </motion.div>
          <motion.div 
            className="flex gap-2"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ButtonEnhanced size="sm" className="bg-blue-500 text-[var(--hive-text-inverse)] hover:bg-blue-600">
                ✓ Done
              </ButtonEnhanced>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <ButtonEnhanced 
                size="sm" 
                variant="secondary" 
                onClick={() => setIsCustomizing(false)}
                className="border-blue-400/30 text-blue-400"
              >
                ✕ Cancel
              </ButtonEnhanced>
            </motion.div>
          </motion.div>
        </motion.div>
      )}
      
      {/* Bento Grid Layout */}
      <motion.div 
        className="profile-bento-grid"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { 
            opacity: 1, 
            transition: { 
              staggerChildren: 0.15,
              delayChildren: 0.3
            }
          }
        }}
      >
        {/* Avatar Card */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20, scale: 0.95 },
            visible: { opacity: 1, y: 0, scale: 1 }
          }}
        >
          <SocialAvatarCard
            user={data.user}
            socialProof={socialProof}
            isOwn={isOwn}
            onEditProfile={onEditProfile}
            onPrivacySettings={onPrivacySettings}
            onPhotoUpload={onPhotoUpload}
            onConnect={onConnect}
            onMessage={onMessage}
            className="social-card-area-avatar"
          />
        </motion.div>
        
        {/* Calendar Card */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20, scale: 0.95 },
            visible: { opacity: 1, y: 0, scale: 1 }
          }}
        >
          <SocialCalendarCard
            events={data.events}
            freeUntil={data.availability?.freeUntil}
            availabilityStatus={data.availability?.status || 'available'}
            onEventAction={(eventId, action) => {
              console.log('Event action:', eventId, action);
            }}
            onAddEvent={() => console.log('Add event')}
            onConnectCalendar={() => console.log('Connect calendar')}
            className="social-card-area-calendar"
          />
        </motion.div>
        
        {/* Tools Card */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20, scale: 0.95 },
            visible: { opacity: 1, y: 0, scale: 1 }
          }}
        >
          <SocialToolsCard
            tools={data.tools}
            createdTools={data.tools.filter(tool => tool.isCreated)}
            totalCreated={data.user.toolsCreated || 0}
            campusImpact={data.user.campusImpact || 0}
            averageRating={data.tools.length > 0 ? data.tools.reduce((sum, tool) => sum + tool.rating, 0) / data.tools.length : undefined}
            isBuilder={data.user.isBuilder}
            onToolClick={(toolId) => console.log('Tool clicked:', toolId)}
            onCreateTool={() => console.log('Create tool')}
            onBrowseTools={() => console.log('Browse tools')}
            onShareTools={() => console.log('Share tools')}
            className="social-card-area-tools"
          />
        </motion.div>
        
        {/* Spaces Card */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: 20, scale: 0.95 },
            visible: { opacity: 1, y: 0, scale: 1 }
          }}
        >
          <SocialSpacesCard
            spaces={data.spaces}
            recommendations={[]}
            onSpaceClick={(spaceId) => console.log('Space clicked:', spaceId)}
            onJoinSpace={(spaceId) => console.log('Join space:', spaceId)}
            onCreateSpace={() => console.log('Create space')}
            onExploreSpaces={() => console.log('Explore spaces')}
            className="social-card-area-spaces"
          />
        </motion.div>
        
        {/* Activity Card - Simple for now */}
        <motion.div 
          className={cn("social-profile-card", butterClasses.card)} 
          style={{ gridArea: 'activity' }}
          variants={{
            hidden: { opacity: 0, y: 20, scale: 0.95 },
            visible: { opacity: 1, y: 0, scale: 1 }
          }}
        >
          <motion.div 
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
              📊
            </div>
            <div>
              <h3 className="profile-heading text-primary">YOUR ACTIVITY</h3>
              <div className="profile-caption text-secondary">Private by default</div>
            </div>
          </motion.div>
          
          <motion.div 
            className="space-y-3"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
            }}
          >
            {data.recentActivity && data.recentActivity.length > 0 ? (
              data.recentActivity.slice(0, 3).map((activity, index) => {
                const getActivityColor = (type: string) => {
                  switch (type) {
                    case 'tool': return 'bg-green-400';
                    case 'space': return 'bg-blue-400';
                    case 'event': return 'bg-orange-400';
                    default: return 'bg-gray-400';
                  }
                };
                
                return (
                  <motion.div 
                    key={activity.id}
                    className="flex items-center gap-2 text-sm text-secondary"
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      visible: { opacity: 1, x: 0 }
                    }}
                  >
                    <motion.div 
                      className={`w-2 h-2 rounded-full ${getActivityColor(activity.type)}`}
                      whileHover={{ scale: 1.5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                    <span>{activity.description}</span>
                  </motion.div>
                );
              })
            ) : (
              // Default examples when no activity data is provided
              <>
                <motion.div 
                  className="flex items-center gap-2 text-sm text-secondary"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-green-400"
                    whileHover={{ scale: 1.5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                  <span>Used GPA Calculator</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2 text-sm text-secondary"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-blue-400"
                    whileHover={{ scale: 1.5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                  <span>Joined CS study group</span>
                </motion.div>
                <motion.div 
                  className="flex items-center gap-2 text-sm text-secondary"
                  variants={{
                    hidden: { opacity: 0, x: -20 },
                    visible: { opacity: 1, x: 0 }
                  }}
                >
                  <motion.div 
                    className="w-2 h-2 rounded-full bg-orange-400"
                    whileHover={{ scale: 1.5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                  />
                  <span>RSVP'd to mixer</span>
                </motion.div>
              </>
            )}
          </motion.div>
          
          <motion.div 
            className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.08)' }}
          >
            <div className="profile-fine text-tertiary mb-2">
              👁️ Private by default
            </div>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <ButtonEnhanced size="sm" variant="secondary" className={cn("w-full", butterClasses.button)}>
                Privacy Settings
              </ButtonEnhanced>
            </motion.div>
          </motion.div>
        </motion.div>
        
        {/* Ghost Mode Card */}
        <motion.div 
          className={cn("social-profile-card", butterClasses.card)} 
          style={{ gridArea: 'ghost' }}
          variants={{
            hidden: { opacity: 0, y: 20, scale: 0.95 },
            visible: { opacity: 1, y: 0, scale: 1 }
          }}
        >
          <motion.div 
            className="flex items-center gap-3 mb-4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            <motion.div 
              className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-500 to-gray-600 flex items-center justify-center"
              whileHover={{ scale: 1.1, rotate: [0, -10, 10, 0] }}
              transition={{ duration: 0.3 }}
            >
              👻
            </motion.div>
            <div>
              <h3 className="profile-heading text-primary">PRIVACY MODE</h3>
              <motion.div 
                className="profile-caption text-secondary"
                animate={{ 
                  color: data.privacy.ghostMode ? '#9CA3AF' : '#10B981' 
                }}
                transition={{ duration: 0.3 }}
              >
                Status: {data.privacy.ghostMode ? 'Invisible' : 'Visible'}
              </motion.div>
            </div>
          </motion.div>
          
          <motion.div 
            className="space-y-3 text-sm"
            initial="hidden"
            animate="visible"
            variants={{
              hidden: { opacity: 0 },
              visible: { opacity: 1, transition: { staggerChildren: 0.1, delayChildren: 0.2 } }
            }}
          >
            <motion.div 
              className="flex justify-between"
              variants={{
                hidden: { opacity: 0, y: 10 },
                visible: { opacity: 1, y: 0 }
              }}
            >
              <span className="text-secondary">WHO CAN SEE YOU:</span>
            </motion.div>
            <motion.div 
              className="space-y-2 text-secondary"
              variants={{
                hidden: { opacity: 0 },
                visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
              }}
            >
              <motion.div 
                className="flex items-center gap-2"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  animate={{ scale: data.privacy.isPublic ? 1.2 : 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {data.privacy.isPublic ? '✅' : '🚫'}
                </motion.span>
                <span>Space members</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  animate={{ scale: data.privacy.showActivity ? 1.2 : 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  {data.privacy.showActivity ? '✅' : '🚫'}
                </motion.span>
                <span>Study groups</span>
              </motion.div>
              <motion.div 
                className="flex items-center gap-2"
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <motion.span
                  whileHover={{ scale: 1.2 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  ✅
                </motion.span>
                <span>Event organizers</span>
              </motion.div>
            </motion.div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <ButtonEnhanced
              onClick={handleToggleGhostMode}
              className={cn(
                "w-full mt-4",
                data.privacy.ghostMode 
                  ? "bg-gray-600 hover:bg-gray-700 text-[var(--hive-text-inverse)]" 
                  : "social-action-button",
                butterClasses.button
              )}
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, 0] }}
                transition={{ duration: 0.3 }}
              >
                <Ghost size={16} />
              </motion.div>
              {data.privacy.ghostMode ? 'BECOME VISIBLE' : 'GO INVISIBLE'}
            </ButtonEnhanced>
          </motion.div>
          
          <motion.div 
            className="mt-3 text-xs text-tertiary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            When invisible: Removed from lists, no search results, tools still work
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default SocialProfileLayout;