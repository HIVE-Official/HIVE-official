"use client";

import { Card } from "@hive/ui";
import { motion } from "framer-motion";

interface SpaceLoadingSkeletonProps {
  variant?: 'card' | 'list' | 'detail' | 'grid';
  count?: number;
}

const shimmer = {
  animate: {
    backgroundPosition: ["200% 0", "-200% 0"],
  },
  transition: {
    duration: 2,
    ease: "linear",
    repeat: Infinity,
  },
};

function SkeletonBox({ 
  className = "", 
  rounded = "rounded-lg" 
}: { 
  className?: string; 
  rounded?: string;
}) {
  return (
    <motion.div
      className={`bg-gradient-to-r from-white/[0.02] via-white/[0.05] to-white/[0.02] bg-[length:200%_100%] ${rounded} ${className}`}
      {...shimmer}
    />
  );
}

function SpaceCardSkeleton() {
  return (
    <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <SkeletonBox className="w-12 h-12" rounded="rounded-lg" />
        <div className="flex items-center gap-2">
          <SkeletonBox className="w-16 h-6" rounded="rounded-full" />
          <SkeletonBox className="w-12 h-6" rounded="rounded-full" />
        </div>
      </div>
      
      {/* Title */}
      <SkeletonBox className="w-3/4 h-6 mb-2" />
      
      {/* Description */}
      <div className="space-y-2 mb-4">
        <SkeletonBox className="w-full h-4" />
        <SkeletonBox className="w-2/3 h-4" />
      </div>
      
      {/* Stats */}
      <div className="flex justify-between items-center mb-4">
        <SkeletonBox className="w-20 h-4" />
        <SkeletonBox className="w-16 h-4" />
      </div>
      
      {/* Actions */}
      <div className="flex gap-2">
        <SkeletonBox className="flex-1 h-10" rounded="rounded-lg" />
        <SkeletonBox className="w-10 h-10" rounded="rounded-lg" />
      </div>
    </Card>
  );
}

function SpaceListSkeleton() {
  return (
    <Card className="p-4 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 flex-1">
          <SkeletonBox className="w-12 h-12" rounded="rounded-lg" />
          <div className="flex-1 space-y-2">
            <SkeletonBox className="w-1/3 h-5" />
            <SkeletonBox className="w-full h-4" />
            <SkeletonBox className="w-1/2 h-3" />
          </div>
        </div>
        <SkeletonBox className="w-20 h-8" rounded="rounded-lg" />
      </div>
    </Card>
  );
}

function SpaceDetailSkeleton() {
  return (
    <div className="space-y-8">
      {/* Banner */}
      <SkeletonBox className="w-full h-64 -mt-16 -mx-6" rounded="rounded-none" />
      
      <div className="space-y-6 -mt-16 relative z-10">  
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6">
          <div className="flex-1 space-y-3">
            <SkeletonBox className="w-1/2 h-10" />
            <div className="flex items-center gap-4">
              <SkeletonBox className="w-24 h-5" />
              <SkeletonBox className="w-20 h-5" />
              <SkeletonBox className="w-16 h-5" />
            </div>
          </div>
          <SkeletonBox className="w-32 h-10" rounded="rounded-lg" />
        </div>
        
        {/* Controls */}
        <div className="flex items-center justify-between">
          <SkeletonBox className="w-40 h-6" />
          <SkeletonBox className="w-32 h-8" rounded="rounded-lg" />
        </div>
        
        {/* Widget Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Widget */}
          <div className="lg:col-span-2">
            <Card className="p-6 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
              <div className="flex items-center justify-between mb-4">
                <SkeletonBox className="w-32 h-6" />
                <SkeletonBox className="w-24 h-5" />
              </div>
              <div className="space-y-4">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="space-y-3">
                    <SkeletonBox className="w-3/4 h-5" />
                    <SkeletonBox className="w-full h-4" />
                    <SkeletonBox className="w-1/2 h-4" />
                  </div>
                ))}
              </div>
            </Card>
          </div>
          
          {/* Side Widgets */}
          <div className="space-y-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Card key={i} className="p-4 bg-[rgba(255,255,255,0.02)] border-[rgba(255,255,255,0.06)]">
                <div className="flex items-center justify-between mb-3">
                  <SkeletonBox className="w-20 h-5" />
                  <SkeletonBox className="w-4 h-4" />
                </div>
                <div className="space-y-2">
                  <SkeletonBox className="w-full h-4" />
                  <SkeletonBox className="w-2/3 h-4" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SpaceLoadingSkeleton({ 
  variant = 'card', 
  count = 1 
}: SpaceLoadingSkeletonProps) {
  const renderSkeleton = () => {
    switch (variant) {
      case 'list':
        return <SpaceListSkeleton />;
      case 'detail':
        return <SpaceDetailSkeleton />;
      case 'grid':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: count }).map((_, i) => (
              <SpaceCardSkeleton key={i} />
            ))}
          </div>
        );
      case 'card':
      default:
        if (count === 1) {
          return <SpaceCardSkeleton />;
        }
        return (
          <div className="space-y-4">
            {Array.from({ length: count }).map((_, i) => (
              <SpaceCardSkeleton key={i} />
            ))}
          </div>
        );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {renderSkeleton()}
    </motion.div>
  );
}