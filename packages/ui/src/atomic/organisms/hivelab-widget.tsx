"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Beaker,
  Lock,
  Unlock,
  Sparkles,
  Zap,
  Code,
  Layers,
  Box,
  Rocket,
  Crown,
  ChevronRight,
  Star,
  TrendingUp,
  Users,
  Play,
  Plus,
  ArrowRight
} from 'lucide-react';
import { cn } from '../../lib/utils';
import { Card } from '../atoms/card';
import { Button } from '../atoms/button';
import { Badge } from '../atoms/badge';

/**
 * SPEC-Compliant HiveLab Widget
 * Per SPEC.md:
 * - Space Leaders ONLY get build access
 * - Locked with teaser for non-leaders
 * - Shows tools created and used
 * - Part of profile display
 */

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon?: string;
  usageCount: number;
  spaceId: string;
  spaceName: string;
  category?: 'utility' | 'social' | 'coordination' | 'fun';
}

export interface HiveLabWidgetProps {
  isSpaceLeader: boolean;
  hasAccess: boolean;
  toolsCreated: number;
  toolsUsed: Tool[];
  leadingSpaces?: Array<{
    id: string;
    name: string;
    memberCount: number;
  }>;
  onRequestAccess?: () => void;
  onOpenStudio?: () => void;
  className?: string;
}

/**
 * HiveLab Widget - Build Anything
 *
 * SPEC Requirements:
 * - Space leaders get full access
 * - Non-leaders see teaser with examples
 * - Shows what weird things students actually build
 * - Creates FOMO for becoming a space leader
 */
export const HiveLabWidget: React.FC<HiveLabWidgetProps> = ({
  isSpaceLeader,
  hasAccess,
  toolsCreated = 0,
  toolsUsed = [],
  leadingSpaces = [],
  onRequestAccess,
  onOpenStudio,
  className = ''
}) => {
  const [showExamples, setShowExamples] = useState(false);

  // SPEC: Examples of unexpected tools students build
  const teaserExamples = [
    { name: "Hot or Not: Dining Hall Edition", icon: "🍕", users: 342 },
    { name: "Professor Bingo", icon: "🎯", users: 189 },
    { name: "Dorm Dash Delivery", icon: "🏃", users: 267 },
    { name: "Confession Booth", icon: "🤫", users: 523 },
    { name: "Wingman AI", icon: "💘", users: 145 },
    { name: "Walk of Shame Tracker", icon: "🌅", users: 98 }
  ];

  // Leader access view
  if (hasAccess && isSpaceLeader) {
    return (
      <Card className={cn(
        'p-6 bg-gradient-to-br from-hive-background to-hive-background-secondary',
        'border-2 border-hive-brand-gold/20',
        className
      )}>
        {/* Header with golden glow */}
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-hive-brand-gold to-hive-brand-gold-light flex items-center justify-center shadow-lg">
              <Beaker className="w-6 h-6 text-black" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-hive-foreground flex items-center gap-2">
                HiveLab Studio
                <Badge className="bg-hive-brand-gold text-black text-xs">
                  <Crown className="w-3 h-3 mr-1" />
                  Leader Access
                </Badge>
              </h3>
              <p className="text-sm text-hive-text-secondary">Build anything for your spaces</p>
            </div>
          </div>
          <Button
            onClick={onOpenStudio}
            size="sm"
            className="bg-gradient-to-r from-hive-brand-gold to-hive-brand-gold-light text-black hover:shadow-lg"
          >
            <Rocket className="w-4 h-4 mr-1" />
            Open Studio
          </Button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-hive-background-secondary rounded-lg p-4 border border-hive-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-hive-text-secondary">Tools Created</span>
              <Code className="w-4 h-4 text-hive-brand-gold" />
            </div>
            <div className="text-2xl font-bold text-hive-foreground">{toolsCreated}</div>
            <div className="text-xs text-hive-text-tertiary mt-1">Across all your spaces</div>
          </div>

          <div className="bg-hive-background-secondary rounded-lg p-4 border border-hive-border">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-hive-text-secondary">Total Usage</span>
              <TrendingUp className="w-4 h-4 text-green-500" />
            </div>
            <div className="text-2xl font-bold text-hive-foreground">
              {toolsUsed.reduce((sum, tool) => sum + tool.usageCount, 0)}
            </div>
            <div className="text-xs text-hive-text-tertiary mt-1">Members using your tools</div>
          </div>
        </div>

        {/* Leading Spaces */}
        {leadingSpaces.length > 0 && (
          <div className="mb-6">
            <h4 className="text-sm font-medium text-hive-text-secondary mb-3">Your Spaces</h4>
            <div className="space-y-2">
              {leadingSpaces.map(space => (
                <div
                  key={space.id}
                  className="flex items-center justify-between p-3 bg-hive-background-secondary rounded-lg border border-hive-border hover:border-hive-brand-gold/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-hive-brand-gold/10 flex items-center justify-center">
                      <Users className="w-4 h-4 text-hive-brand-gold" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-hive-foreground">{space.name}</p>
                      <p className="text-xs text-hive-text-tertiary">{space.memberCount} members</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-hive-text-tertiary" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Tools */}
        {toolsUsed.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-hive-text-secondary mb-3">Active Tools</h4>
            <div className="grid grid-cols-2 gap-2">
              {toolsUsed.slice(0, 4).map(tool => (
                <div
                  key={tool.id}
                  className="p-3 bg-hive-background-secondary rounded-lg border border-hive-border hover:border-hive-brand-gold/30 transition-all hover:scale-[1.02] cursor-pointer"
                >
                  <div className="flex items-center gap-2 mb-1">
                    <Box className="w-4 h-4 text-hive-brand-gold" />
                    <span className="text-sm font-medium text-hive-foreground truncate">{tool.name}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-hive-text-tertiary">
                    <Users className="w-3 h-3" />
                    <span>{tool.usageCount} uses</span>
                    <span className="text-hive-text-tertiary/50">•</span>
                    <span className="truncate">{tool.spaceName}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Call to action */}
        <div className="mt-6 p-4 bg-gradient-to-r from-hive-brand-gold/10 to-transparent rounded-lg border border-hive-brand-gold/20">
          <p className="text-sm text-hive-foreground flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-hive-brand-gold" />
            Build tools that solve your space's unique problems
          </p>
        </div>
      </Card>
    );
  }

  // Non-leader teaser view
  return (
    <Card className={cn(
      'p-6 relative overflow-hidden',
      'bg-gradient-to-br from-hive-background-secondary/50 to-hive-background',
      'border border-hive-border',
      className
    )}>
      {/* Locked overlay effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />

      {/* Header */}
      <div className="flex items-start justify-between mb-6 relative">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-hive-background-secondary flex items-center justify-center border border-hive-border">
            <Lock className="w-6 h-6 text-hive-text-tertiary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-hive-foreground flex items-center gap-2">
              HiveLab Studio
              <Badge variant="secondary" className="text-xs">
                <Lock className="w-3 h-3 mr-1" />
                Leaders Only
              </Badge>
            </h3>
            <p className="text-sm text-hive-text-secondary">Build anything for your space</p>
          </div>
        </div>
      </div>

      {/* Teaser Content */}
      <div className="space-y-4 relative">
        {/* What leaders are building */}
        <div className="p-4 bg-hive-background-secondary/50 rounded-lg border border-hive-border">
          <p className="text-sm font-medium text-hive-text-secondary mb-3">
            What space leaders are building:
          </p>

          <AnimatePresence>
            {showExamples ? (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-2"
              >
                {teaserExamples.map((example, index) => (
                  <motion.div
                    key={example.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="flex items-center justify-between p-2 bg-hive-background/50 rounded-lg"
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{example.icon}</span>
                      <span className="text-sm text-hive-foreground">{example.name}</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-hive-text-tertiary">
                      <Users className="w-3 h-3" />
                      <span>{example.users}</span>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {teaserExamples.slice(0, 3).map(example => (
                  <div
                    key={example.name}
                    className="flex flex-col items-center p-3 bg-hive-background/30 rounded-lg opacity-60"
                  >
                    <span className="text-2xl mb-1">{example.icon}</span>
                    <span className="text-xs text-hive-text-tertiary text-center line-clamp-1">
                      {example.users} using
                    </span>
                  </div>
                ))}
              </div>
            )}
          </AnimatePresence>

          {!showExamples && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowExamples(true)}
              className="w-full mt-3 text-hive-text-secondary hover:text-hive-foreground"
            >
              <ChevronRight className="w-4 h-4 mr-1" />
              See what students are building
            </Button>
          )}
        </div>

        {/* The pitch */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <Zap className="w-5 h-5 text-hive-brand-gold mt-0.5" />
            <div>
              <p className="text-sm font-medium text-hive-foreground">Build custom tools</p>
              <p className="text-xs text-hive-text-secondary">
                Solve your space's unique coordination problems
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Layers className="w-5 h-5 text-hive-brand-gold mt-0.5" />
            <div>
              <p className="text-sm font-medium text-hive-foreground">No coding required</p>
              <p className="text-xs text-hive-text-secondary">
                Drag and drop elements to create anything
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <Star className="w-5 h-5 text-hive-brand-gold mt-0.5" />
            <div>
              <p className="text-sm font-medium text-hive-foreground">Members love it</p>
              <p className="text-xs text-hive-text-secondary">
                Make your space more organized and fun
              </p>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className="mt-6 p-4 bg-gradient-to-r from-hive-brand-gold/10 to-transparent rounded-lg border border-hive-brand-gold/20">
          <p className="text-sm font-medium text-hive-foreground mb-2">
            🚀 Unlock HiveLab by becoming a space leader
          </p>
          <p className="text-xs text-hive-text-secondary mb-3">
            Create or lead a space to get instant access to the tool builder
          </p>
          <Button
            onClick={onRequestAccess}
            size="sm"
            className="w-full bg-gradient-to-r from-hive-brand-gold to-hive-brand-gold-light text-black hover:shadow-lg"
          >
            <Plus className="w-4 h-4 mr-1" />
            Create a Space
          </Button>
        </div>
      </div>
    </Card>
  );
};