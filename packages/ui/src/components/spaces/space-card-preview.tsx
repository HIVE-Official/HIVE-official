"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../button';
import { Badge } from '../badge';
import { cn } from '../../lib/utils';
import { 
  Users, 
  Calendar, 
  Sparkles, 
  Clock,
  Star,
  Eye,
  Zap
} from 'lucide-react';

export interface SpaceCardPreviewProps {
  id: string;
  name: string;
  description: string;
  type: 'academic' | 'residential' | 'interest' | 'organization' | 'greek';
  potentialMembers: number;
  anticipatedEvents?: number;
  category: string;
  keywords?: string[];
  onRequestActivation?: () => void;
  onLearnMore?: () => void;
  className?: string;
}

const spaceTypeConfig = {
  academic: {
    label: 'Academic',
    icon: Star,
    color: 'accent',
    bgGradient: 'from-surface-02/30 to-transparent',
    borderColor: 'border-border',
  },
  residential: {
    label: 'Residential',
    icon: Users,
    color: 'chip',
    bgGradient: 'from-surface-02/20 to-transparent',
    borderColor: 'border-border',
  },
  interest: {
    label: 'Interest',
    icon: Sparkles,
    color: 'chip',
    bgGradient: 'from-surface-02/20 to-transparent',
    borderColor: 'border-border',
  },
  organization: {
    label: 'Organization',
    icon: Users,
    color: 'chip',
    bgGradient: 'from-surface-02/20 to-transparent',
    borderColor: 'border-border',
  },
  greek: {
    label: 'Greek Life',
    icon: Star,
    color: 'accent',
    bgGradient: 'from-surface-02/30 to-transparent',
    borderColor: 'border-border',
  },
};

export const SpaceCardPreview: React.FC<SpaceCardPreviewProps> = ({
  id: _id,
  name,
  description,
  type,
  potentialMembers,
  anticipatedEvents = 0,
  category,
  keywords = [],
  onRequestActivation,
  onLearnMore,
  className,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const config = spaceTypeConfig[type];

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className={cn(
        "group relative overflow-hidden",
        "bg-gradient-to-br bg-surface border rounded-xl",
        "transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]",
        "hover:shadow-lg hover:border-border-hover hover:-translate-y-1",
        config.borderColor,
        config.bgGradient,
        className
      )}
    >
      {/* Preview Status Banner */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-accent/30 via-accent/10 to-transparent" />
      
      {/* Content */}
      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-10 h-10 rounded-lg flex items-center justify-center",
              "bg-gradient-to-br from-surface-02 to-surface-01 border border-border"
            )}>
              <config.icon className={cn(
                "h-5 w-5",
                config.color === 'accent' ? 'text-accent' : 'text-foreground'
              )} />
            </div>
            
            <div>
              <h3 className="font-display font-semibold text-foreground text-lg leading-tight">
                {name}
              </h3>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant={config.color as 'accent' | 'chip'} className="text-xs">
                  {config.label}
                </Badge>
                <span className="text-xs text-muted">{category}</span>
              </div>
            </div>
          </div>

          {/* Preview Indicator */}
          <div className="flex items-center gap-2 px-3 py-1 bg-surface-01 border border-border rounded-full">
            <Clock className="h-3 w-3 text-accent" />
            <span className="text-xs font-medium text-accent">Preview</span>
          </div>
        </div>

        {/* Description */}
        <p className="text-muted font-body text-sm leading-relaxed mb-4 line-clamp-2">
          {description}
        </p>

        {/* Keywords */}
        {keywords.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {keywords.slice(0, 4).map((keyword) => (
              <span
                key={keyword}
                className="text-xs px-2 py-1 bg-surface-01 border border-border rounded-md text-muted"
              >
                {keyword}
              </span>
            ))}
            {keywords.length > 4 && (
              <span className="text-xs px-2 py-1 text-muted">
                +{keywords.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Preview Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-6 p-4 bg-surface-01/50 border border-border/50 rounded-lg">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Users className="h-4 w-4 text-muted" />
              <span className="text-xs text-muted">Potential Members</span>
            </div>
            <span className="font-display font-semibold text-foreground text-lg">
              {potentialMembers.toLocaleString()}
            </span>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <Calendar className="h-4 w-4 text-muted" />
              <span className="text-xs text-muted">Anticipated Events</span>
            </div>
            <span className="font-display font-semibold text-foreground text-lg">
              {anticipatedEvents}
            </span>
          </div>
        </div>

        {/* Preview Message */}
        <div className="mb-6 p-4 bg-surface-01 border border-border rounded-lg">
          <div className="flex items-start gap-3">
            <Zap className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground mb-1">
                Ready for Activation
              </p>
              <p className="text-xs text-muted leading-relaxed">
                This Space will come alive when a student leader requests access and gets approved.
                Be the first to shape this community!
              </p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="ritual"
            size="lg"
            onClick={onRequestActivation}
            className="flex-1 gap-2 font-semibold"
          >
            <Sparkles className="h-4 w-4" />
            Request to Lead
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            onClick={onLearnMore}
            className="gap-2"
          >
            <Eye className="h-4 w-4" />
            Learn More
          </Button>
        </div>
      </div>

      {/* Hover Effects */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-surface-02/50 via-transparent to-transparent" />
        
        {/* Floating elements */}
        <motion.div
          className="absolute top-6 right-6"
          animate={{ 
            y: isHovered ? [-2, 2, -2] : [0],
            opacity: isHovered ? [0.3, 0.6, 0.3] : [0]
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="h-4 w-4 text-accent" />
        </motion.div>
      </motion.div>

      {/* Activation Pulse */}
      <motion.div
        className="absolute top-4 right-4 w-2 h-2 bg-accent rounded-full"
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.5, 1, 0.5]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
    </motion.article>
  );
};