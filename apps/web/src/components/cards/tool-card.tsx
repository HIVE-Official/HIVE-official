"use client";

import React from 'react';
import { Card, CardContent, CardHeader, Badge, Avatar, AvatarImage, AvatarFallback } from '@hive/ui';
import { 
  Wrench, Download, Star, Users, Eye, Play, Settings, 
  ExternalLink, Heart, Share2, Clock 
} from 'lucide-react';
import { cn } from '@hive/ui';
import Link from 'next/link';
import type { Tool  } from '@/types/core';

interface ToolCardProps {
  tool: Tool;
  showInstallButton?: boolean;
  onInstall?: (toolId: string) => void;
  onUninstall?: (toolId: string) => void;
  isInstalled?: boolean;
  className?: string;
  compact?: boolean;
}

export function ToolCard({ 
  tool, 
  showInstallButton = true, 
  onInstall,
  onUninstall,
  isInstalled = false,
  className,
  compact = false
}: ToolCardProps) {
  const handleInstallClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isInstalled && onUninstall) {
      onUninstall(tool.id);
    } else if (!isInstalled && onInstall) {
      onInstall(tool.id);
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      productivity: 'bg-blue-100 text-blue-800',
      academic: 'bg-green-100 text-green-800', 
      social: 'bg-purple-100 text-purple-800',
      organization: 'bg-orange-100 text-orange-800',
      entertainment: 'bg-pink-100 text-pink-800',
      utility: 'bg-gray-100 text-gray-800',
      analytics: 'bg-indigo-100 text-indigo-800',
      communication: 'bg-teal-100 text-teal-800'
    };
    return colors[category as keyof typeof colors] || colors.utility;
  };

  const getTypeIcon = (type: string) => {
    const icons = {
      form: '📝',
      poll: '🗳️',
      scheduler: '📅',
      resource: '📚',
      automation: '⚡',
      dashboard: '📊',
      game: '🎮',
      calculator: '🧮',
      tracker: '📈',
      custom: '🛠️'
    };
    return icons[type as keyof typeof icons] || icons.custom;
  };

  if (compact) {
    return (
      <Link href={`/tools/${tool.id}`} className={cn("block", className)}>
        <Card className="hover:shadow-md transition-all duration-200 hover:scale-[1.01] cursor-pointer">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              {/* Tool icon */}
              <div className="flex-shrink-0">
                <div className="w-10 h-10 bg-[var(--hive-brand-primary)]/10 rounded-lg flex items-center justify-center">
                  {tool.icon ? (
                    <span className="text-lg">{tool.icon}</span>
                  ) : (
                    <span className="text-lg">{getTypeIcon(tool.type)}</span>
                  )}
                </div>
              </div>

              {/* Tool details */}
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-sm line-clamp-1 mb-1">
                  {tool.name}
                </h3>
                <p className="text-xs text-gray-600 line-clamp-1 mb-2">
                  {tool.description}
                </p>
                
                <div className="flex items-center gap-3 text-xs text-gray-500">
                  <div className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    <span>{tool.analytics?.installCount || 0}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3" />
                    <span>{tool.analytics?.averageRating?.toFixed(1) || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Install status indicator */}
              {isInstalled && (
                <div className="flex-shrink-0 w-2 h-2 rounded-full bg-green-400" />
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Link href={`/tools/${tool.id}`} className={cn("block", className)}>
      <Card className="h-full hover:shadow-lg transition-all duration-200 hover:scale-[1.02] group cursor-pointer border-2 hover:border-[var(--hive-brand-primary)]/20">
        {/* Tool header */}
        <div className="relative h-32 bg-gradient-to-br from-[var(--hive-brand-primary)]/20 to-[var(--hive-brand-secondary)]/20 rounded-t-lg overflow-hidden">
          {tool.metadata?.screenshots?.[0] ? (
            <div 
              className="w-full h-full bg-cover bg-center"
              style={{ backgroundImage: `url(${tool.metadata.screenshots[0]})` }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-4xl">
                {tool.icon || getTypeIcon(tool.type)}
              </div>
            </div>
          )}

          {/* Category badge */}
          <div className="absolute top-3 left-3">
            <Badge 
              variant="secondary" 
              className={cn("text-xs font-medium", getCategoryColor(tool.category))}
            >
              {tool.category}
            </Badge>
          </div>

          {/* Status badges */}
          <div className="absolute top-3 right-3 flex gap-1">
            {tool.status === 'published' && (
              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                Published
              </Badge>
            )}
            {tool.pricing?.type === 'premium' && (
              <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 text-xs">
                Premium
              </Badge>
            )}
          </div>
        </div>

        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-lg group-hover:text-[var(--hive-brand-primary)] transition-colors line-clamp-1">
                {tool.name}
              </h3>
              <p className="text-sm text-gray-600 line-clamp-2 mt-1">
                {tool.description}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {/* Author info */}
          <div className="flex items-center gap-2 mb-3">
            <Avatar className="h-6 w-6">
              <AvatarImage src={tool.author.avatarUrl} alt={tool.author.name} />
              <AvatarFallback className="text-xs">
                {tool.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-gray-600">
              by {tool.author.name}
            </span>
            {tool.author.verified && (
              <Badge variant="outline" className="text-xs px-1.5 py-0.5">
                ✓ Verified
              </Badge>
            )}
          </div>

          {/* Tool stats */}
          <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              <span>{tool.analytics?.installCount || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span>{tool.analytics?.averageRating?.toFixed(1) || 'N/A'}</span>
              <span className="text-gray-400">
                ({tool.analytics?.reviewCount || 0})
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{tool.analytics?.viewCount || 0}</span>
            </div>
          </div>

          {/* Tags */}
          {tool.metadata?.tags && tool.metadata.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {tool.metadata.tags.slice(0, 3).map((tag, index) => (
                <Badge 
                  key={index} 
                  variant="outline" 
                  className="text-xs px-2 py-0.5"
                >
                  {tag}
                </Badge>
              ))}
              {tool.metadata.tags.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-0.5">
                  +{tool.metadata.tags.length - 3}
                </Badge>
              )}
            </div>
          )}

          {/* Pricing */}
          {tool.pricing && (
            <div className="mb-4">
              <div className="text-lg font-bold text-[var(--hive-brand-primary)]">
                {tool.pricing.type === 'free' ? 'Free' : 
                 tool.pricing.type === 'premium' ? `$${tool.pricing.price}/mo` :
                 tool.pricing.type === 'one-time' ? `$${tool.pricing.price}` : 'Contact'}
              </div>
              {tool.pricing.freeTrialDays && (
                <div className="text-xs text-gray-500">
                  {tool.pricing.freeTrialDays} day free trial
                </div>
              )}
            </div>
          )}

          {/* Install/Action buttons */}
          <div className="space-y-2">
            {showInstallButton && (
              <button
                onClick={handleInstallClick}
                className={cn(
                  "w-full py-2 px-4 rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center gap-2",
                  isInstalled
                    ? "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300"
                    : "bg-[var(--hive-brand-primary)] text-white hover:bg-[var(--hive-brand-primary)]/90"
                )}
              >
                {isInstalled ? (
                  <>
                    <Settings className="h-4 w-4" />
                    Manage
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4" />
                    Install
                  </>
                )}
              </button>
            )}

            {/* Quick actions */}
            <div className="flex gap-2">
              <button 
                className="flex-1 py-2 px-3 rounded-md text-sm font-medium bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 transition-all duration-200 flex items-center justify-center gap-1"
                onClick={(e) => e.preventDefault()}
              >
                <Play className="h-3 w-3" />
                Preview
              </button>
              <button 
                className="flex-1 py-2 px-3 rounded-md text-sm font-medium bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200 transition-all duration-200 flex items-center justify-center gap-1"
                onClick={(e) => e.preventDefault()}
              >
                <Share2 className="h-3 w-3" />
                Share
              </button>
            </div>
          </div>

          {/* Last updated */}
          <div className="flex items-center justify-between mt-4 pt-3 border-t border-gray-100 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>Updated {new Date(tool.updatedAt).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>v{tool.version}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

export default ToolCard;