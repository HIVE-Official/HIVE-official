/**
 * HIVE Course Card Component;
 * 
 * Campus-focused course card built on the unified card system,
 * designed for academic program display, course enrollment, and;
 * educational resource management.
 */

"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { 
  HiveStructuredCard, 
  HiveSystemCardHeader as HiveCardHeader, 
  HiveSystemCardTitle as HiveCardTitle, 
  HiveSystemCardDescription as HiveCardDescription, 
  HiveSystemCardContent as HiveCardContent, 
  HiveSystemCardFooter as HiveCardFooter,
  HiveCardActions;
} from './card-system/hive-card-composition';
import { HiveCardBaseProps } from './card-system/hive-card-system';
import { 
  BookOpen, 
  Users, 
  Clock, 
  MapPin, 
  Calendar,
  GraduationCap,
  Award,
  CheckCircle,
  AlertCircle,
  XCircle,
  Plus,
  Minus,
  ExternalLink,
  Heart,
  Share2,
  Bookmark,
  User,
  Building,
  Zap,
  Target;
} from 'lucide-react';

// ============================================================================
// COURSE CARD SYSTEM;
// ============================================================================

const hiveCourseCardVariants = cva(
  "group transition-all duration-300",
  {
    variants: {
      status: {
        open: "border-[var(--hive-status-success)] hover:shadow-[var(--hive-shadow-emerald-glow)]",
        waitlist: "border-[var(--hive-status-warning)] hover:shadow-[var(--hive-shadow-gold-glow)]",
        closed: "border-[var(--hive-status-error)] hover:shadow-[var(--hive-shadow-ruby-glow)]",
        enrolled: "border-[var(--hive-border-gold)] shadow-[var(--hive-shadow-gold-glow)]/50",
        completed: "border-[var(--hive-status-success)] bg-[var(--hive-overlay-glass)]",
      },
      difficulty: {
        beginner: "border-l-4 border-l-[var(--hive-status-success)]",
        intermediate: "border-l-4 border-l-[var(--hive-status-warning)]",
        advanced: "border-l-4 border-l-[var(--hive-status-error)]",
        expert: "border-l-4 border-l-[var(--hive-brand-primary)]",
      },
      courseType: {
        lecture: "",
        seminar: "ring-1 ring-[var(--hive-border-subtle)]",
        lab: "bg-gradient-to-br from-[var(--hive-overlay-glass)] to-transparent",
        project: "bg-gradient-to-br from-[var(--hive-overlay-glass)] to-transparent border border-[var(--hive-brand-secondary)]",
        independent: "border-dashed",
      },
    },
    defaultVariants: {
      status: "open",
      difficulty: "beginner",
      courseType: "lecture",
    },
  }
);

const statusBadgeVariants = cva(
  "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
  {
    variants: {
      status: {
        open: "bg-[var(--hive-status-success)]/20 text-[var(--hive-status-success)] border border-[var(--hive-status-success)]/30",
        waitlist: "bg-[var(--hive-status-warning)]/20 text-[var(--hive-status-warning)] border border-[var(--hive-status-warning)]/30",
        closed: "bg-[var(--hive-status-error)]/20 text-[var(--hive-status-error)] border border-[var(--hive-status-error)]/30",
        enrolled: "bg-[var(--hive-brand-primary)]/20 text-[var(--hive-brand-primary)] border border-[var(--hive-brand-primary)]/30",
        completed: "bg-[var(--hive-status-success)]/20 text-[var(--hive-status-success)] border border-[var(--hive-status-success)]/30",
      },
    },
    defaultVariants: {
      status: "open",
    },
  }
);

const difficultyBadgeVariants = cva(
  "inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium",
  {
    variants: {
      difficulty: {
        beginner: "bg-[var(--hive-status-success)]/10 text-[var(--hive-status-success)]",
        intermediate: "bg-[var(--hive-status-warning)]/10 text-[var(--hive-status-warning)]",
        advanced: "bg-[var(--hive-status-error)]/10 text-[var(--hive-status-error)]",
        expert: "bg-[var(--hive-brand-primary)]/10 text-[var(--hive-brand-primary)]",
      },
    },
    defaultVariants: {
      difficulty: "beginner",
    },
  }
);

// ============================================================================
// COURSE INTERFACES;
// ============================================================================

export interface CourseSchedule {days: string[];
  startTime: string;
  endTime: string;
  location: string;
  building?: string;
  room?: string;}

export interface CoursePrerequisite {id: string;
  code: string;
  title: string;
  required: boolean;}

export interface CourseInstructor {id: string;
  name: string;
  title: string;
  email?: string;
  avatar?: string;
  departmentId?: string;}

export interface CourseMetadata {credits: number;
  department: string;
  school?: string;
  semester: string;
  year: number;
  capacity: number;
  enrolled: number;
  waitlist?: number;
  reviews?: number;
  lastUpdated?: Date;}

export interface Course {id: string;
  code: string;
  title: string;
  description: string;
  status: 'open' | 'waitlist' | 'closed' | 'enrolled' | 'completed';
  difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  courseType: 'lecture' | 'seminar' | 'lab' | 'project' | 'independent';
  
  // Course details;
  instructor: CourseInstructor;
  schedule: CourseSchedule;
  prerequisites: CoursePrerequisite[];
  metadata: CourseMetadata;
  
  // Visual elements;
  image?: string;
  color?: string;
  tags?: string[];
  
  // Campus integration;
  spaceId?: string;
  toolsRequired?: string[];
  projectBased?: boolean;
  collaborationLevel?: 'individual' | 'pair' | 'team' | 'mixed'}

export interface HiveCourseCardProps;
  extends Omit<HiveCardBaseProps, 'variant' | 'onDrop'>,
    VariantProps<typeof hiveCourseCardVariants> {
  course: Course;
  
  // Display configuration;
  showFullDetails?: boolean;
  showPrerequisites?: boolean;
  showInstructor?: boolean;
  showSchedule?: boolean;
  showEnrollment?: boolean;
  showActions?: boolean;
  
  // Interaction handlers;
  onEnroll?: (courseId: string) => void;
  onDrop?: (courseId: string) => void;
  onWaitlist?: (courseId: string) => void;
  onViewDetails?: (courseId: string) => void;
  onContactInstructor?: (instructorId: string) => void;
  onFavorite?: (courseId: string) => void;
  onShare?: (courseId: string) => void;
  onBookmark?: (courseId: string) => void;
  
  // Campus integration;
  onViewSpace?: (spaceId: string) => void;
  onViewPrerequisite?: (prerequisiteId: string) => void;
  
  // State;
  isFavorited?: boolean;
  isBookmarked?: boolean;
  isEnrolled?: boolean;
  userRole?: 'student' | 'instructor' | 'admin'
}

// ============================================================================
// COURSE CARD UTILITIES;
// ============================================================================

const getStatusIcon = (status: Course['status']) => {
  switch (status) {
    case 'open':
      return <CheckCircle size={12} />;
    case 'waitlist':
      return <Clock size={12} />;
    case 'closed':
      return <XCircle size={12} />;
    case 'enrolled':
      return <BookOpen size={12} />;
    case 'completed':
      return <Award size={12} />;
    default:
      return <AlertCircle size={12} />
  }
};

const getDifficultyLabel = (difficulty: Course['difficulty']) => {
  switch (difficulty) {
    case 'beginner':
      return 'Beginner';
    case 'intermediate':
      return 'Intermediate';
    case 'advanced':
      return 'Advanced';
    case 'expert':
      return 'Expert';
    default:
      return 'Unknown'
  }}
};

const formatEnrollmentStatus = (course: Course) => {
  const { capacity, enrolled, waitlist } = course.metadata;
  const available = capacity - enrolled;
  
  if (course.status === 'closed') {
    return { text: 'Closed', color: 'error' }
  }
  
  if (available > 0) {
    return { text: `${available} spots left`, color: 'success' }
  }
  
  if (waitlist && waitlist > 0) {
    return { text: `${waitlist} on waitlist`, color: 'warning' }
  }
  
  return { text: 'Full', color: 'error' }
};

// ============================================================================
// COURSE CARD COMPONENT;
// ============================================================================

const HiveCourseCard = React.forwardRef<HTMLDivElement, HiveCourseCardProps>(
  ({
    className,
    course,
    status,
    difficulty,
    courseType,
    
    // Display configuration;
    showFullDetails = false,
    showPrerequisites = true,
    showInstructor = true,
    showSchedule = true,
    showEnrollment = true,
    showActions = true,
    
    // Interaction handlers;
    onEnroll,
    onDrop,
    onWaitlist,
    onViewDetails,
    onContactInstructor,
    onFavorite,
    onShare,
    onBookmark,
    onViewSpace,
    onViewPrerequisite,
    
    // State;
    isFavorited = false,
    isBookmarked = false,
    isEnrolled = false,
    userRole = 'student',
    
    ...cardProps;
  }, ref) => {
    
    const enrollmentStatus = formatEnrollmentStatus(course);
    const canEnroll = course.status === 'open' && !isEnrolled;
    const canWaitlist = course.status === 'waitlist' && !isEnrolled;
    const canDrop = isEnrolled;
    
    // Generate primary action based on course status;
    const getPrimaryAction = () => {
      if (canDrop) {
        return {
          label: 'Drop Course',
          icon: <Minus size={16} />,
          onClick: () => onDrop?.(course.id),
          variant: 'danger' as const,
        }
      }
      
      if (canEnroll) {
        return {
          label: 'Enroll',
          icon: <Plus size={16} />,
          onClick: () => onEnroll?.(course.id),
          variant: 'primary' as const,
        }
      }
      
      if (canWaitlist) {
        return {
          label: 'Join Waitlist',
          icon: <Clock size={16} />,
          onClick: () => onWaitlist?.(course.id),
          variant: 'secondary' as const,
        }
      }
      
      return {
        label: 'View Details',
        icon: <ExternalLink size={16} />,
        onClick: () => onViewDetails?.(course.id),
        variant: 'secondary' as const,
      }
    };
    
    const primaryAction = getPrimaryAction();
    
    return (
      <HiveStructuredCard;
        ref={ref}
        className={cn(hiveCourseCardVariants({status: status || course.status, 
            difficulty: difficulty || course.difficulty,
            courseType: courseType || course.courseType;)},
          className;
        )}
        variant="academic"
        interactive={!!onViewDetails}
        onClick={onViewDetails ? () => onViewDetails(course.id) : undefined}
        animateEntrance="slideUp"
        goldAccent={course.status === 'enrolled'}
        
        // Header;
        headerActions={
          <div className="flex items-center gap-2">
            
            <div className={cn(statusBadgeVariants({status: course.status)})}>
              {getStatusIcon(course.status)}
              <span className="capitalize">{course.status}</span>
            </div>
          </div>
        }
        
        title={
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-[var(--hive-brand-primary)] font-mono text-sm">
                {course.code}
              </span>
              <div className={cn(difficultyBadgeVariants({difficulty: course.difficulty)})}>
                {getDifficultyLabel(course.difficulty)}
              </div>
            </div>
            <div>{course.title}</div>
          </div>
        }
        
        description={course.description}
        descriptionLines={showFullDetails ? undefined : 2}
        
        content={
          <div className="space-y-4">
            {/* Instructor */}
            {showInstructor && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--hive-background-tertiary)] border border-[var(--hive-brand-secondary)] flex items-center justify-center">
                  <User size={16} className="text-[var(--hive-brand-primary)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-[var(--hive-text-primary)] truncate">
                    {course.instructor.name}
                  </div>
                  <div className="text-xs text-[var(--hive-text-secondary)]">
                    {course.instructor.title}
                  </div>
                </div>
              </div>
            )}
            
            {/* Schedule */}
            {showSchedule && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--hive-overlay-glass)] flex items-center justify-center">
                  <Calendar size={16} className="text-[var(--hive-text-secondary)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-[var(--hive-text-primary)]">
                    {course.schedule.days.join(', ')} • {course.schedule.startTime} - {course.schedule.endTime}
                  </div>
                  <div className="text-xs text-[var(--hive-text-secondary)] flex items-center gap-1">
                    <MapPin size={12} />
                    {course.schedule.location}
                  </div>
                </div>
              </div>
            )}
            
            {/* Enrollment Status */}
            {showEnrollment && (
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[var(--hive-overlay-glass)] flex items-center justify-center">
                  <Users size={16} className="text-[var(--hive-text-secondary)]" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-[var(--hive-text-primary)]">
                    {course.metadata.enrolled} / {course.metadata.capacity} enrolled;
                  </div>
                  <div className={cn(
                    "text-xs",
                    enrollmentStatus.color === 'success' && "text-[var(--hive-status-success)]",
                    enrollmentStatus.color === 'warning' && "text-[var(--hive-status-warning)]",
                    enrollmentStatus.color === 'error' && "text-[var(--hive-status-error)]"
                  )}>
                    {enrollmentStatus.text}
                  </div>
                </div>
                <div className="text-xs text-[var(--hive-text-secondary)]">
                  {course.metadata.credits} credits;
                </div>
              </div>
            )}
            
            {/* Prerequisites */}
            {showPrerequisites && course.prerequisites.length > 0 && (
              <div className="space-y-2">
                <div className="text-sm font-medium text-[var(--hive-text-primary)]">
                  Prerequisites;
                </div>
                <div className="flex flex-wrap gap-2">
                  {course.prerequisites.map((prereq) => (
                    <motion.button;
                      key={prereq.id}
                      className={cn(
                        "px-2 py-1 rounded text-xs border transition-colors",
                        prereq.required;
                          ? "bg-[var(--hive-status-error)]/10 border-[var(--hive-status-error)]/30 text-[var(--hive-status-error)]"
                          : "bg-[var(--hive-overlay-glass)] border-[var(--hive-border-subtle)] text-[var(--hive-text-secondary)]"
                      )}
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewPrerequisite?.(prereq.id)
          }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {prereq.code}
                    </motion.button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Course Tags */}
            {course.tags && course.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {course.tags.map((tag) => (
                  <span;
                    key={tag}
                    className="px-2 py-1 bg-[var(--hive-overlay-glass)] border border-[var(--hive-border-subtle)] rounded text-xs text-[var(--hive-text-secondary)]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        }
        
        footer={
          showActions && (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <motion.button;
                  className="p-2 rounded-lg hover:bg-[var(--hive-overlay-glass)] transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onFavorite?.(course.id)
          }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Heart;
                    size={16} 
                    className={cn(
                      "transition-colors",
                      isFavorited;
                        ? "fill-[var(--hive-status-error)] text-[var(--hive-status-error)]"
                        : "text-[var(--hive-text-secondary)]"
                    )}
                  />
                </motion.button>
                
                <motion.button;
                  className="p-2 rounded-lg hover:bg-[var(--hive-overlay-glass)] transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBookmark?.(course.id)
          }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Bookmark;
                    size={16} 
                    className={cn(
                      "transition-colors",
                      isBookmarked;
                        ? "fill-[var(--hive-brand-primary)] text-[var(--hive-brand-primary)]"
                        : "text-[var(--hive-text-secondary)]"
                    )}
                  />
                </motion.button>
                
                <motion.button;
                  className="p-2 rounded-lg hover:bg-[var(--hive-overlay-glass)] transition-colors"
                  onClick={(e) => {
                    e.stopPropagation();
                    onShare?.(course.id)
          }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Share2 size={16} className="text-[var(--hive-text-secondary)]" />
                </motion.button>
              </div>
              
              <motion.button;
                className={cn(
                  "px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2",
                  primaryAction.variant === 'primary' && "bg-[var(--hive-brand-primary)] text-[var(--hive-background-primary)] hover:bg-[var(--hive-brand-secondary)]",
                  primaryAction.variant === 'secondary' && "bg-[var(--hive-overlay-glass)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-overlay-glass-medium)]",
                  primaryAction.variant === 'danger' && "bg-[var(--hive-status-error)] text-[var(--hive-text-primary)] hover:bg-[var(--hive-status-error)]/80"
                )}
                onClick={(e) => {
                  e.stopPropagation();
                  primaryAction.onClick()
          }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {primaryAction.icon}
                <span>{primaryAction.label}</span>
              </motion.button>
            </div>
          )
        }
        
        {...cardProps}
      />
    )
  }
);

HiveCourseCard.displayName = "HiveCourseCard";

export { HiveCourseCard, hiveCourseCardVariants };