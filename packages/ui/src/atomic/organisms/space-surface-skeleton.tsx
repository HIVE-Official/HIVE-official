'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../../lib/utils';

interface SpaceSurfaceSkeletonProps {
  variant?: 'posts' | 'members' | 'events' | 'pinned' | 'tools' | 'compact';
  itemCount?: number;
  className?: string;
}

const SkeletonBox: React.FC<{ className?: string }> = ({ className }) => (
  <motion.div
    className={cn("bg-white/5 rounded animate-pulse", className)}
    initial={{ opacity: 0.6 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
  />
);

export const SpaceSurfaceSkeleton: React.FC<SpaceSurfaceSkeletonProps> = ({
  variant = 'posts',
  itemCount = 3,
  className
}) => {
  const renderPostsSkeleton = () => (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <SkeletonBox className="w-5 h-5" />
          <SkeletonBox className="w-24 h-5" />
          <SkeletonBox className="w-12 h-5" />
        </div>
        <SkeletonBox className="w-28 h-9" />
      </div>

      {/* Filter tabs */}
      <div className="flex items-center gap-2 mb-6">
        <SkeletonBox className="w-20 h-7" />
        <SkeletonBox className="w-24 h-7" />
        <SkeletonBox className="w-20 h-7" />
      </div>

      {/* Posts */}
      {Array.from({ length: itemCount }, (_, i) => (
        <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-xl p-4">
          {/* Post header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              <SkeletonBox className="w-10 h-10 rounded-lg" />
              <div className="space-y-2">
                <SkeletonBox className="w-32 h-4" />
                <div className="flex items-center gap-2">
                  <SkeletonBox className="w-4 h-4" />
                  <SkeletonBox className="w-16 h-3" />
                  <SkeletonBox className="w-12 h-3" />
                </div>
              </div>
            </div>
            <SkeletonBox className="w-6 h-6" />
          </div>

          {/* Post content */}
          <div className="space-y-2 mb-4">
            <SkeletonBox className="w-full h-4" />
            <SkeletonBox className="w-3/4 h-4" />
            <SkeletonBox className="w-1/2 h-4" />
          </div>

          {/* Post actions */}
          <div className="flex items-center justify-between pt-3 border-t border-white/10">
            <div className="flex items-center gap-4">
              <SkeletonBox className="w-12 h-6" />
              <SkeletonBox className="w-12 h-6" />
            </div>
            <div className="flex items-center gap-3">
              <SkeletonBox className="w-4 h-4" />
              <SkeletonBox className="w-4 h-4" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderMembersSkeleton = () => (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <SkeletonBox className="w-5 h-5" />
          <SkeletonBox className="w-20 h-5" />
          <SkeletonBox className="w-8 h-5" />
        </div>
        <SkeletonBox className="w-20 h-9" />
      </div>

      {/* Search and filters */}
      <div className="flex flex-col sm:flex-row gap-3 mb-6">
        <SkeletonBox className="flex-1 h-10" />
        <div className="flex items-center gap-2">
          <SkeletonBox className="w-24 h-10" />
          <SkeletonBox className="w-24 h-10" />
        </div>
      </div>

      {/* Members */}
      {Array.from({ length: itemCount }, (_, i) => (
        <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <div className="relative">
                <SkeletonBox className="w-10 h-10 rounded-lg" />
                <SkeletonBox className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full" />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                  <SkeletonBox className="w-32 h-4" />
                  <SkeletonBox className="w-4 h-4" />
                  <SkeletonBox className="w-16 h-5 rounded-full" />
                </div>
                <div className="flex items-center gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <SkeletonBox className="w-3 h-3" />
                    <SkeletonBox className="w-12 h-3" />
                  </div>
                  <div className="flex items-center gap-1">
                    <SkeletonBox className="w-3 h-3" />
                    <SkeletonBox className="w-20 h-3" />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SkeletonBox className="w-8 h-8" />
              <SkeletonBox className="w-8 h-8" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderEventsSkeleton = () => (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <SkeletonBox className="w-5 h-5" />
          <SkeletonBox className="w-16 h-5" />
          <SkeletonBox className="w-20 h-5" />
        </div>
        <SkeletonBox className="w-28 h-9" />
      </div>

      {/* Events */}
      {Array.from({ length: itemCount }, (_, i) => (
        <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <SkeletonBox className="w-40 h-5" />
                <SkeletonBox className="w-16 h-5 rounded-full" />
                <SkeletonBox className="w-12 h-5 rounded-full" />
              </div>
              <SkeletonBox className="w-full h-4 mb-2" />
              <SkeletonBox className="w-2/3 h-4 mb-3" />
              
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <SkeletonBox className="w-3 h-3" />
                  <SkeletonBox className="w-32 h-3" />
                </div>
                <div className="flex items-center gap-2">
                  <SkeletonBox className="w-3 h-3" />
                  <SkeletonBox className="w-24 h-3" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 ml-4">
              <SkeletonBox className="w-8 h-8" />
              <SkeletonBox className="w-8 h-8" />
            </div>
          </div>

          {/* RSVP section */}
          <div className="pt-3 border-t border-white/10">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <SkeletonBox className="w-12 h-3" />
                <SkeletonBox className="w-12 h-3" />
                <SkeletonBox className="w-16 h-3" />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SkeletonBox className="w-16 h-6" />
              <SkeletonBox className="w-16 h-6" />
              <SkeletonBox className="w-20 h-6" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderCompactSkeleton = () => (
    <div className="space-y-3">
      {Array.from({ length: itemCount }, (_, i) => (
        <div key={i} className="bg-white/[0.02] border border-white/[0.06] rounded-lg p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 flex-1">
              <SkeletonBox className="w-8 h-8 rounded-lg" />
              <div className="space-y-1 flex-1">
                <SkeletonBox className="w-3/4 h-4" />
                <SkeletonBox className="w-1/2 h-3" />
              </div>
            </div>
            <SkeletonBox className="w-6 h-6" />
          </div>
        </div>
      ))}
    </div>
  );

  const renderSkeletonByVariant = () => {
    switch (variant) {
      case 'posts':
        return renderPostsSkeleton();
      case 'members':
        return renderMembersSkeleton();
      case 'events':
        return renderEventsSkeleton();
      case 'compact':
        return renderCompactSkeleton();
      default:
        return renderPostsSkeleton();
    }
  };

  return (
    <div className={cn("animate-pulse", className)}>
      {renderSkeletonByVariant()}
    </div>
  );
};

export default SpaceSurfaceSkeleton;