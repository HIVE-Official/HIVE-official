'use client';

import React from 'react';
import { motion } from '../../components/framer-motion-proxy';
import { cn } from '../../lib/utils';
import { ArrowRight, GraduationCap, Home, Users, Star } from 'lucide-react';

export type SpaceCategoryType = 'university' | 'residential' | 'greek' | 'student';

export interface SpaceCategoryData {
  type: SpaceCategoryType;
  title: string;
  description: string;
  icon: React.ReactNode;
  count: number;
  gradient: string;
  accentColor: string;
  examples: string[]
}

export interface SpaceCategoryCardProps {
  category: SpaceCategoryData;
  onClick?: (type: SpaceCategoryType) => void;
  variant?: 'default' | 'featured';
  className?: string
}

// Default category configurations
export const SPACE_CATEGORIES: Record<SpaceCategoryType, Omit<SpaceCategoryData, 'count'>> = {
  university: {
    type: 'university',
    title: 'University Spaces',
    description: 'Official academic spaces for courses, departments, and university programs',
    icon: <GraduationCap className="w-6 h-6" />,
    gradient: 'from-[var(--hive-brand-primary)]/20 via-[var(--hive-brand-secondary)]/15 to-[var(--hive-brand-primary)]/20',
    accentColor: 'text-[var(--hive-brand-primary)]',
    examples: ['CS 101', 'Computer Science Dept', 'Engineering College']
  },
  residential: {
    type: 'residential',
    title: 'Residential Life',
    description: 'Connect with your dorm, floor, building, and residential community',
    icon: <Home className="w-6 h-6" />,
    gradient: 'from-[var(--hive-status-success)]/20 via-[var(--hive-status-success)]/15 to-[var(--hive-status-success)]/20',
    accentColor: 'text-[var(--hive-status-success)]',
    examples: ['Ellicott Complex', 'Governors Floor 3', 'South Campus']
  },
  greek: {
    type: 'greek',
    title: 'Greek Life',
    description: 'Fraternities, sororities, and Greek organizations on campus',
    icon: <Users className="w-6 h-6" />,
    gradient: 'from-[var(--hive-brand-secondary)]/20 via-[var(--hive-brand-secondary)]/15 to-[var(--hive-brand-secondary)]/20',
    accentColor: 'text-[var(--hive-brand-secondary)]',
    examples: ['Alpha Phi Alpha', 'Panhellenic Council', 'IFC']
  },
  student: {
    type: 'student',
    title: 'Student Groups',
    description: 'Student-created spaces for clubs, organizations, and special interests',
    icon: <Star className="w-6 h-6" />,
    gradient: 'from-[var(--hive-brand-gold)]/20 via-[var(--hive-brand-gold)]/15 to-[var(--hive-brand-gold)]/20',
    accentColor: 'text-[var(--hive-brand-gold)]',
    examples: ['Study Groups', 'Intramural Teams', 'Student Clubs']
  }
};

export const SpaceCategoryCard: React.FC<SpaceCategoryCardProps> = ({
  category,
  onClick,
  variant = 'default',
  className
}) => {
  const handleClick = () => {
    onClick?.(category.type)
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        y: -4,
        transition: { duration: 0.3, ease: [0.23, 1, 0.32, 1] }
          }}
      whileTap={{ scale: 0.98 }}
      onClick={handleClick}
      className={cn(
        'relative group cursor-pointer overflow-hidden',
        // HIVE Luxury Foundation
        'bg-gradient-to-br from-[var(--hive-background-secondary)]/90 via-[var(--hive-background-tertiary)]/80 to-[var(--hive-background-interactive)]/90',
        'backdrop-blur-xl border border-[var(--hive-border-primary)]/20',
        'hover:border-[var(--hive-border-primary)]/40',
        // HIVE Luxury Radius
        'rounded-2xl',
        'transition-all duration-500 ease-out',
        // Responsive sizing
        variant === 'featured' ? 'h-48 p-8' : 'h-40 p-6',
        className
      )}
    >
      {/* Category Gradient Overlay */}
      <div 
        className={cn(
          'absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500',
          `bg-gradient-to-br ${category.gradient}`
        )}
      />

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-[var(--hive-brand-primary)]/10 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-radial from-[var(--hive-brand-primary)]/20 to-transparent rounded-full blur-xl" />
      </div>

      {/* Main Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          {/* Icon */}
          <div className={cn(
            'w-12 h-12 rounded-xl flex items-center justify-center border transition-colors duration-300',
            'bg-gradient-to-br from-[var(--hive-background-secondary)]/60 to-[var(--hive-background-tertiary)]/60',
            'border-[var(--hive-border-primary)]/30 group-hover:border-[var(--hive-border-primary)]/50',
            category.accentColor
          )}>
            {category.icon}
          </div>

          {/* Count Badge */}
          <div className="px-3 py-1 bg-[var(--hive-background-primary)]/80 backdrop-blur-sm border border-[var(--hive-border-primary)]/30 rounded-full">
            <span className="text-xs font-bold text-[var(--hive-text-secondary)]">
              {category.count.toLocaleString()} spaces
            </span>
          </div>
        </div>

        {/* Title & Description */}
        <div className="flex-1">
          <h3 className={cn(
            'font-bold text-lg leading-tight mb-2 transition-colors duration-300',
            'text-[var(--hive-text-primary)] group-hover:text-[var(--hive-brand-primary)]'
          )}>
            {category.title}
          </h3>
          
          <p className="text-sm text-[var(--hive-text-secondary)] leading-relaxed line-clamp-2">
            {category.description}
          </p>
        </div>

        {/* Examples */}
        <div className="mt-4">
          <div className="flex flex-wrap gap-1.5">
            {category.examples.slice(0, 3).map((example, index) => (
              <span
                key={index}
                className="px-2 py-1 text-xs font-medium text-[var(--hive-text-placeholder)] bg-[var(--hive-background-primary)]/40 border border-[var(--hive-border-primary)]/20 rounded-lg"
              >
                {example}
              </span>
            ))}
          </div>
        </div>

        {/* Hover Arrow */}
        <motion.div
          className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={{ x: -10 }}
          animate={{ x: 0 }}
        >
          <div className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center border transition-colors duration-300',
            'bg-[var(--hive-background-secondary)]/80 border-[var(--hive-border-primary)]/40',
            category.accentColor
          )}>
            <ArrowRight className="w-4 h-4" />
          </div>
        </motion.div>
      </div>

      {/* Luxury Glow Effect */}
      <div className="absolute inset-0 bg-gradient-radial from-[var(--hive-brand-primary)]/2 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl" />
    </motion.div>
  )
};

export default SpaceCategoryCard;