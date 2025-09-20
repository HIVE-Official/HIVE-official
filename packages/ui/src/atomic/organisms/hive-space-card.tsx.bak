'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../lib/utils';
import { 
  Users, 
  Clock, 
  ArrowRight,
  CheckCircle,
  Star,
  Crown,
  Calendar,
  MapPin,
  Trophy,
  Heart,
  Sparkles,
  ChevronRight
} from 'lucide-react';

// Core Space interface that all space types extend
export interface HiveSpace {
  id: string;
  name: string;
  description: string;
  memberCount: number;
  type: 'university' | 'residential' | 'greek' | 'student';
  status: 'active' | 'pending' | 'archived';
  
  // Branding
  logoUrl?: string;
  bannerUrl?: string;
  primaryColor?: string;
  
  // Location
  location?: string;
  building?: string;
  
  // Metadata
  createdAt: string;
  updatedAt: string;
}

// University-specific space data
export interface UniversitySpace extends HiveSpace {
  type: 'university';
  academic: {
    department: string;
    courseCode?: string;
    credits?: number;
    semester?: string;
    professor?: string;
    schedule?: string;
    isOfficial: boolean;
  };
  enrollment: {
    capacity?: number;
    enrolled: number;
    waitlist?: number;
    status: 'open' | 'waitlist' | 'closed' | 'approval_required';
  };
}

// Greek life space data
export interface GreekSpace extends HiveSpace {
  type: 'greek';
  organization: {
    council: string;
    chapter: string;
    founded?: number;
    motto?: string;
    colors: string[];
  };
  rush: {
    isActive: boolean;
    startDate?: string;
    endDate?: string;
    nextEvent?: {
      name: string;
      date: string;
      type: 'social' | 'info' | 'interview';
    };
  };
  community: {
    activeMembers: number;
    pledges?: number;
    averageGPA?: number;
    philanthropy?: {
      cause: string;
      raised?: number;
    };
  };
}

// Residential space data
export interface ResidentialSpace extends HiveSpace {
  type: 'residential';
  housing: {
    buildingName: string;
    floor?: number;
    wing?: string;
    buildingType: 'dorm' | 'apartment' | 'house';
    capacity: number;
  };
  community: {
    residents: number;
    ra?: {
      name: string;
      contact: string;
    };
    amenities: string[];
  };
}

// Student-created space data
export interface StudentSpace extends HiveSpace {
  type: 'student';
  creator: {
    name: string;
    year?: string;
    major?: string;
  };
  category: 'club' | 'study' | 'social' | 'hobby' | 'professional';
  requirements?: string[];
}

// Union type for all space types
export type AnySpace = UniversitySpace | GreekSpace | ResidentialSpace | StudentSpace;

export interface HiveSpaceCardProps {
  space: AnySpace;
  
  // User context
  currentUser?: {
    id: string;
    major?: string;
    year?: string;
    building?: string;
  };
  
  // Social proof
  mutualConnections?: Array<{
    id: string;
    name: string;
    avatar?: string;
    role?: string;
  }>;
  
  // Interaction handlers
  onJoin?: (space: AnySpace) => void;
  onView?: (space: AnySpace) => void;
  
  // Display options
  showSocialProof?: boolean;
  variant?: 'default' | 'compact' | 'featured';
  
  className?: string;
}

export const HiveSpaceCard: React.FC<HiveSpaceCardProps> = ({
  space,
  currentUser,
  mutualConnections = [],
  onJoin,
  onView,
  showSocialProof = true,
  variant = 'default',
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isJoining, setIsJoining] = useState(false);

  // Calculate perfect match based on space type and user context
  const isPerfectMatch = React.useMemo(() => {
    if (!currentUser) return false;
    
    switch (space.type) {
      case 'university':
        return space.academic.department === currentUser.major;
      case 'residential':
        return space.housing.buildingName === currentUser.building;
      default:
        return false;
    }
  }, [space, currentUser]);

  // Get primary action based on space type
  const getPrimaryAction = () => {
    switch (space.type) {
      case 'university':
        const univSpace = space as UniversitySpace;
        switch (univSpace.enrollment.status) {
          case 'open': return { text: 'Join Class', variant: 'primary' as const };
          case 'waitlist': return { text: 'Join Waitlist', variant: 'secondary' as const };
          case 'approval_required': return { text: 'Request Access', variant: 'secondary' as const };
          case 'closed': return { text: 'View Details', variant: 'ghost' as const };
        }
        break;
      case 'greek':
        const greekSpace = space as GreekSpace;
        return greekSpace.rush.isActive 
          ? { text: 'Show Interest', variant: 'primary' as const }
          : { text: 'Learn More', variant: 'ghost' as const };
      case 'residential':
        return { text: 'Join Floor', variant: 'primary' as const };
      case 'student':
        return { text: 'Join Group', variant: 'primary' as const };
    }
  };

  const primaryAction = getPrimaryAction();

  const handleJoinClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsJoining(true);
    try {
      await onJoin?.(space);
    } finally {
      setIsJoining(false);
    }
  };

  const handleCardClick = () => {
    onView?.(space);
  };

  // Get space-specific icon and metadata
  const getSpaceIcon = () => {
    switch (space.type) {
      case 'university': return '🎓';
      case 'greek': return '👥';
      case 'residential': return '🏠';
      case 'student': return '⭐';
    }
  };

  const getSpaceMetadata = () => {
    switch (space.type) {
      case 'university':
        const univSpace = space as UniversitySpace;
        return [
          univSpace.academic.department,
          univSpace.academic.credits ? `${univSpace.academic.credits} credits` : null,
          univSpace.academic.schedule
        ].filter(Boolean);
      case 'greek':
        const greekSpace = space as GreekSpace;
        return [
          greekSpace.organization.council,
          greekSpace.community.averageGPA ? `${greekSpace.community.averageGPA} GPA` : null,
          greekSpace.organization.founded ? `Est. ${greekSpace.organization.founded}` : null
        ].filter(Boolean);
      case 'residential':
        const resSpace = space as ResidentialSpace;
        return [
          resSpace.housing.buildingName,
          resSpace.housing.floor ? `Floor ${resSpace.housing.floor}` : null,
          resSpace.housing.buildingType
        ].filter(Boolean);
      case 'student':
        const studentSpace = space as StudentSpace;
        return [
          studentSpace.category,
          studentSpace.creator.name,
          studentSpace.creator.major
        ].filter(Boolean);
    }
  };

  const metadata = getSpaceMetadata();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -8, 
        rotateX: 1, 
        rotateY: 1,
        transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={handleCardClick}
      className={cn(
        'relative group cursor-pointer overflow-hidden',
        // HIVE Luxury Foundation
        'bg-gradient-to-br from-[var(--hive-background-secondary)]/95 via-[var(--hive-background-tertiary)]/90 to-[var(--hive-background-interactive)]/95',
        'backdrop-blur-xl border border-[var(--hive-border-primary)]/30',
        'hover:border-[var(--hive-brand-primary)]/40 hover:shadow-2xl hover:shadow-[var(--hive-brand-primary)]/8',
        // HIVE Luxury Radius
        'rounded-3xl',
        'transition-all duration-500 ease-out',
        'transform-gpu perspective-1000',
        // Responsive sizing
        variant === 'compact' ? 'h-72 max-w-72' : 'h-80 max-w-80',
        className
      )}
      style={{
        transformStyle: 'preserve-3d'
      }}
    >
      {/* Perfect Match Indicator */}
      {isPerfectMatch && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: -10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          className="absolute top-5 left-5 z-30"
        >
          <div className="flex items-center gap-2 bg-[var(--hive-brand-primary)]/20 backdrop-blur-xl border border-[var(--hive-brand-primary)]/40 rounded-full px-4 py-2 shadow-lg">
            <Sparkles className="w-4 h-4 text-[var(--hive-brand-primary)]" />
            <span className="text-sm font-bold text-[var(--hive-brand-primary)]">Perfect Match</span>
          </div>
        </motion.div>
      )}

      {/* Status Indicators */}
      <div className="absolute top-5 right-5 z-30 flex gap-2">
        {space.type === 'university' && (space as UniversitySpace).academic.isOfficial && (
          <div className="bg-[var(--hive-status-info)]/20 backdrop-blur-xl border border-[var(--hive-status-info)]/40 rounded-full px-3 py-1">
            <span className="text-xs font-semibold text-[var(--hive-status-info)]">Official</span>
          </div>
        )}
        
        {space.type === 'greek' && (space as GreekSpace).rush.isActive && (
          <div className="bg-[var(--hive-status-success)]/20 backdrop-blur-xl border border-[var(--hive-status-success)]/40 rounded-full px-3 py-1">
            <span className="text-xs font-semibold text-[var(--hive-status-success)]">Rush Open</span>
          </div>
        )}
      </div>

      {/* Header with Logo/Banner */}
      <div className="relative h-28 overflow-hidden rounded-t-3xl">
        {/* Banner */}
        {space.bannerUrl ? (
          <motion.img
            src={space.bannerUrl}
            alt=""
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
          />
        ) : (
          <div 
            className="h-full w-full bg-gradient-to-br"
            style={{
              background: space.primaryColor 
                ? `linear-gradient(135deg, ${space.primaryColor}40, ${space.primaryColor}20)`
                : 'linear-gradient(135deg, var(--hive-status-info)/25, var(--hive-brand-primary)/15)'
            }}
          />
        )}
        
        {/* Luxury Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[var(--hive-background-primary)]/90 via-[var(--hive-background-primary)]/20 to-transparent" />
        
        {/* Logo */}
        <div className="absolute bottom-4 left-5">
          {space.logoUrl ? (
            <motion.div 
              className="w-14 h-14 rounded-2xl overflow-hidden bg-[var(--hive-background-secondary)]/90 backdrop-blur-xl border border-[var(--hive-border-primary)]/50 p-2 shadow-lg"
              whileHover={{ scale: 1.05, rotateY: 5 }}
              transition={{ duration: 0.3 }}
            >
              <img src={space.logoUrl} alt={space.name} className="w-full h-full object-contain" />
            </motion.div>
          ) : (
            <div className="w-14 h-14 rounded-2xl bg-[var(--hive-background-secondary)]/90 backdrop-blur-xl border border-[var(--hive-border-primary)]/50 flex items-center justify-center shadow-lg">
              <span className="text-2xl">{getSpaceIcon()}</span>
            </div>
          )}
        </div>

        {/* Space Type Indicator */}
        <div className="absolute bottom-4 right-5">
          <span className="text-sm font-mono font-bold text-[var(--hive-text-primary)] bg-[var(--hive-background-primary)]/70 backdrop-blur-xl px-3 py-1 rounded-xl border border-[var(--hive-border-primary)]/40">
            {space.type.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        {/* Title and Metadata */}
        <div className="mb-4">
          <motion.h3 
            className="font-bold text-[var(--hive-text-primary)] text-lg leading-tight mb-2 group-hover:text-[var(--hive-brand-primary)] transition-colors duration-300"
            layoutId={`space-title-${space.id}`}
          >
            {space.name}
          </motion.h3>
          
          <div className="flex items-center gap-2 text-sm text-[var(--hive-text-secondary)] mb-2">
            {metadata.slice(0, 2).map((item, index) => (
              <React.Fragment key={index}>
                {index > 0 && <div className="w-1 h-1 rounded-full bg-[var(--hive-text-muted)]" />}
                <span className="font-medium">{item}</span>
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-[var(--hive-text-secondary)] leading-relaxed mb-4 line-clamp-2 flex-1">
          {space.description}
        </p>

        {/* Social Proof */}
        {showSocialProof && mutualConnections.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 text-sm text-[var(--hive-status-success)] mb-4 p-3 bg-[var(--hive-status-success)]/10 rounded-2xl border border-[var(--hive-status-success)]/20"
          >
            <div className="flex -space-x-2">
              {mutualConnections.slice(0, 3).map((connection, index) => (
                <div
                  key={connection.id}
                  className="w-7 h-7 rounded-full bg-[var(--hive-status-success)]/30 border-2 border-[var(--hive-status-success)]/50 flex items-center justify-center text-xs font-bold"
                  title={`${connection.name}${connection.role ? ` (${connection.role})` : ''}`}
                >
                  {connection.name.charAt(0)}
                </div>
              ))}
            </div>
            <span className="font-semibold">
              {mutualConnections.slice(0, 2).map(c => c.name.split(' ')[0]).join(', ')}
              {mutualConnections.length > 2 && ` & ${mutualConnections.length - 2} others`} here
            </span>
          </motion.div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between mt-auto">
          <div className="flex items-center gap-2 text-sm text-[var(--hive-text-muted)]">
            <Users className="w-4 h-4" />
            <span className="font-medium">{(space.memberCount || 0).toLocaleString()}</span>
            
            {space.type === 'university' && (space as UniversitySpace).enrollment.capacity && (
              <span className="text-[var(--hive-text-placeholder)]">
                / {(space as UniversitySpace).enrollment.capacity}
              </span>
            )}
          </div>

          {/* Primary Action */}
          <motion.button
            onClick={handleJoinClick}
            disabled={isJoining}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
              'px-5 py-2.5 rounded-2xl text-sm font-bold border transition-all duration-300 shadow-lg',
              primaryAction.variant === 'primary' && [
                'bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border-[var(--hive-brand-primary)]/40',
                'hover:bg-[var(--hive-brand-primary)]/30 hover:border-[var(--hive-brand-primary)]/60',
                'hover:shadow-[var(--hive-brand-primary)]/25'
              ],
              primaryAction.variant === 'secondary' && [
                'bg-[var(--hive-status-warning)]/20 text-[var(--hive-status-warning)] border-[var(--hive-status-warning)]/40',
                'hover:bg-[var(--hive-status-warning)]/30 hover:border-[var(--hive-status-warning)]/60'
              ],
              primaryAction.variant === 'ghost' && [
                'bg-[var(--hive-text-muted)]/10 text-[var(--hive-text-secondary)] border-[var(--hive-text-muted)]/30',
                'hover:bg-[var(--hive-text-muted)]/20 hover:border-[var(--hive-text-muted)]/50'
              ],
              isJoining && 'opacity-60 cursor-not-allowed'
            )}
          >
            {isJoining ? 'Joining...' : primaryAction.text}
          </motion.button>
        </div>
      </div>

      {/* Hover Interaction */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute bottom-4 right-4 flex items-center gap-1 text-xs text-[var(--hive-brand-primary)] font-bold"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 10 }}
            transition={{ duration: 0.2 }}
          >
            <span>View Details</span>
            <ChevronRight className="w-3 h-3" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Luxury Glow Effect */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute inset-0 bg-gradient-radial from-[var(--hive-brand-primary)]/5 via-transparent to-transparent pointer-events-none rounded-3xl"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.4 }}
          />
        )}
      </AnimatePresence>

      {/* Glass Reflection */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--hive-text-primary)]/3 via-transparent to-transparent pointer-events-none rounded-3xl" />
    </motion.div>
  );
};

export default HiveSpaceCard;