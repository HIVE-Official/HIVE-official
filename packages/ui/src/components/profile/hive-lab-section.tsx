'use client';

import React from 'react';
import { HiveLabSectionProps } from './types';
import { HiveCard } from '../hive-card';
import { HiveButton } from '../hive-button';
import { HiveBadge } from '../hive-badge';
import { Wrench, Lock, Plus, Calendar, Calculator, BookOpen, Zap, Star, AlertCircle, Loader2 } from 'lucide-react';

export const HiveLabSection: React.FC<HiveLabSectionProps> = ({
  hiveLab,
  isLoading = false,
  onCreateTool,
  onViewTool
}) => {
  if (isLoading) {
    return (
      <HiveCard className="p-6">
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-[var(--hive-brand-secondary)]" />
        </div>
      </HiveCard>
    )
  }

  const getToolIcon = (toolName: string) => {
    switch (toolName.toLowerCase()) {
      case 'calendar':
        return <Calendar className="h-4 w-4" />;
      case 'gpa calculator':
        return <Calculator className="h-4 w-4" />;
      case 'study planner':
        return <BookOpen className="h-4 w-4" />;
      default:
        return <Wrench className="h-4 w-4" />
    }
  };

  return (
    <HiveCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] flex items-center gap-2">
          <Wrench className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
          HiveLAB
          {hiveLab.isLocked && <Lock className="h-4 w-4 text-gray-400" />}
        </h2>
        
        {!hiveLab.isLocked && (
          <HiveButton 
            variant="ghost-gold" 
            size="sm" 
            onClick={onCreateTool}
            className="flex items-center gap-2"
          >
            <Plus className="h-4 w-4" />
            Create Tool
          </HiveButton>
        )}
      </div>

      {hiveLab.isLocked ? (
        <div className="text-center py-4">
          <div className="w-16 h-16 bg-gradient-to-br from-hive-gold/20 to-yellow-400/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Lock className="h-8 w-8 text-[var(--hive-brand-secondary)]" />
          </div>
          <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-2">HiveLAB Coming Soon</h3>
          <p className="text-gray-400 mb-4">
            Personal tool creation will be available soon. For now, enjoy our calendar tool!
          </p>
          
          {/* Available Tools */}
          {hiveLab.availableTools.length > 0 && (
            <div className="space-y-3">
              <p className="text-sm text-gray-300 mb-3">Available Tools:</p>
              {hiveLab.availableTools.map((tool) => (
                <div 
                  key={tool} 
                  className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-hive-gold/30"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[var(--hive-brand-secondary)]/20 rounded-lg flex items-center justify-center">
                      {getToolIcon(tool)}
                    </div>
                    <span className="text-[var(--hive-text-primary)] font-medium">{tool}</span>
                  </div>
                  <HiveButton 
                    variant="outline" 
                    size="sm"
                    onClick={() => onViewTool?.(tool)}
                  >
                    Use Tool
                  </HiveButton>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-6">
          {/* Available Tools */}
          {hiveLab.availableTools.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-3 flex items-center gap-2">
                <Star className="h-4 w-4 text-[var(--hive-brand-secondary)]" />
                Available Tools
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {hiveLab.availableTools.map((tool) => (
                  <div 
                    key={tool} 
                    className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg border border-[var(--hive-border-default)]/50 hover:border-hive-gold/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-[var(--hive-brand-secondary)]/20 rounded-lg flex items-center justify-center">
                        {getToolIcon(tool)}
                      </div>
                      <span className="text-[var(--hive-text-primary)] font-medium">{tool}</span>
                    </div>
                    <HiveButton 
                      variant="outline" 
                      size="sm"
                      onClick={() => onViewTool?.(tool)}
                    >
                      Use
                    </HiveButton>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Created Tools */}
          {hiveLab.createdTools.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-3 flex items-center gap-2">
                <Zap className="h-4 w-4 text-purple-400" />
                Your Tools
              </h3>
              <div className="space-y-3">
                {hiveLab.createdTools.map((tool) => (
                  <div 
                    key={tool} 
                    className="flex items-center justify-between p-3 bg-gradient-to-r from-purple-500/20 to-purple-600/20 rounded-lg border border-purple-500/30"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-purple-500/30 rounded-lg flex items-center justify-center">
                        {getToolIcon(tool)}
                      </div>
                      <div>
                        <span className="text-[var(--hive-text-primary)] font-medium">{tool}</span>
                        <div className="flex items-center gap-2 mt-1">
                          <HiveBadge variant="skill-tag" className="text-xs">
                            Created by you
                          </HiveBadge>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <HiveButton 
                        variant="outline" 
                        size="sm"
                        onClick={() => onViewTool?.(tool)}
                      >
                        Edit
                      </HiveButton>
                      <HiveButton 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onViewTool?.(tool)}
                      >
                        View
                      </HiveButton>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Coming Soon */}
          {hiveLab.comingSoon.length > 0 && (
            <div>
              <h3 className="text-lg font-medium text-[var(--hive-text-primary)] mb-3 flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-blue-400" />
                Coming Soon
              </h3>
              <div className="space-y-2">
                {hiveLab.comingSoon.map((tool) => (
                  <div 
                    key={tool} 
                    className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg border border-[var(--hive-border-default)]/30"
                  >
                    <div className="w-8 h-8 bg-gray-600/30 rounded-lg flex items-center justify-center">
                      {getToolIcon(tool)}
                    </div>
                    <span className="text-gray-400">{tool}</span>
                    <HiveBadge variant="skill-tag" className="text-xs ml-auto">
                      Coming Soon
                    </HiveBadge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Builder Program CTA */}
      {hiveLab.isLocked && (
        <div className="mt-6 p-4 bg-gradient-to-r from-hive-gold/10 to-yellow-400/10 rounded-lg border border-hive-gold/20">
          <div className="flex items-center gap-2 mb-2">
            <Wrench className="h-4 w-4 text-[var(--hive-brand-secondary)]" />
            <span className="text-sm font-medium text-[var(--hive-text-primary)]">Unlock HiveLAB</span>
          </div>
          <p className="text-xs text-gray-300 mb-3">
            Join the HIVE Builder Program to create custom tools for your student workflow.
          </p>
          <HiveButton variant="ghost-gold" size="sm">
            Apply for Builder Program
          </HiveButton>
        </div>
      )}
    </HiveCard>
  )
};

export default HiveLabSection;