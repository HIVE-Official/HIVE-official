/**
 * ToolCard - Purpose-built for UB student tools
 * 
 * Shows what students want to know about tools:
 * 1. What does this tool do? (name, purpose)
 * 2. Who built it and where? (creator, space context)  
 * 3. How do I use/get it? (install, run, share)
 */

'use client';

import React from 'react';
import { Play, Download, Share, Star, User, Users, Eye, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

export interface Tool {
  id: string;
  name: string;
  description: string;
  category: 'academic' | 'productivity' | 'social' | 'utility';
  creator: {
    id: string;
    name: string;
    avatar?: string;
  };
  space?: {
    id: string;
    name: string;
  };
  usageCount: number;
  isInstalled?: boolean;
  isFavorite?: boolean;
  createdAt: string;
  lastUsed?: string;
}

export interface ToolCardProps {
  tool: Tool;
  currentUserId?: string;
  showCreator?: boolean;
  showSpace?: boolean;
  showUsage?: boolean;
  onInstall?: (toolId: string) => void;
  onRun?: (toolId: string) => void;
  onShare?: (toolId: string) => void;
  onFavorite?: (toolId: string) => void;
  onView?: (toolId: string) => void;
  className?: string;
}

export function ToolCard({
  tool,
  currentUserId,
  showCreator = true,
  showSpace = true, 
  showUsage = true,
  onInstall,
  onRun,
  onShare,
  onFavorite,
  onView,
  className
}: ToolCardProps) {
  const isOwn = currentUserId === tool.creator.id;
  const categoryColors = {
    academic: 'bg-blue-500/10 text-blue-400',
    productivity: 'bg-green-500/10 text-green-400',
    social: 'bg-purple-500/10 text-purple-400', 
    utility: 'bg-amber-500/10 text-amber-400'
  };

  const handlePrimaryAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (tool.isInstalled) {
      onRun?.(tool.id);
    } else {
      onInstall?.(tool.id);
    }
  };

  const handleCardClick = () => {
    onView?.(tool.id);
  };

  return (
    <Card
      className={cn(
        "cursor-pointer border border-gray-700 bg-gray-900 hover:border-gray-600 hover:bg-gray-850",
        className
      )}
      onClick={handleCardClick}
    >
      <div className="p-4 space-y-4">
        {/* Core tool info */}
        <div className="space-y-2">
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-semibold text-white text-base leading-tight line-clamp-2">
              {tool.name}
            </h3>
            <div className="flex items-center gap-1">
              <Badge 
                variant="secondary"
                className={cn("text-xs px-2 py-0.5", categoryColors[tool.category])}
              >
                {tool.category}
              </Badge>
            </div>
          </div>
          
          <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
            {tool.description}
          </p>
        </div>

        {/* Creator and context info */}
        {(showCreator || showSpace) && (
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center gap-3">
              {showCreator && (
                <div className="flex items-center gap-1.5">
                  <Avatar className="h-4 w-4">
                    <AvatarImage src={tool.creator.avatar} alt={tool.creator.name} />
                    <AvatarFallback className="bg-gray-800 text-white text-xs">
                      {tool.creator.name[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>
                    {isOwn ? 'Your tool' : `by ${tool.creator.name}`}
                  </span>
                </div>
              )}
              
              {showSpace && tool.space && (
                <div className="flex items-center gap-1">
                  <Users className="h-3 w-3" />
                  <span>{tool.space.name}</span>
                </div>
              )}
            </div>
            
            {showUsage && (
              <div className="flex items-center gap-1">
                <Eye className="h-3 w-3" />
                <span>{tool.usageCount} uses</span>
              </div>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            {tool.isFavorite && (
              <Star className="h-3 w-3 text-amber-400 fill-amber-400" />
            )}
            {tool.lastUsed && (
              <span className="text-xs text-gray-500">
                Used {tool.lastUsed}
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            {onFavorite && (
              <Button
                size="sm" 
                variant="ghost"
                onClick={(e) => {
                  e.stopPropagation();
                  onFavorite(tool.id);
                }}
                className="p-1 h-auto"
              >
                <Star className={cn(
                  "h-3 w-3",
                  tool.isFavorite ? "text-amber-400 fill-amber-400" : "text-gray-500"
                )} />
              </Button>
            )}
            
            {onShare && (
              <Button
                size="sm"
                variant="ghost" 
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(tool.id);
                }}
                className="p-1 h-auto"
              >
                <Share className="h-3 w-3 text-gray-500" />
              </Button>
            )}
            
            <Button
              size="sm"
              variant={tool.isInstalled ? "secondary" : "primary"}
              onClick={handlePrimaryAction}
              className="text-xs px-3 py-1.5 h-auto"
            >
              {tool.isInstalled ? (
                <>
                  <Play className="h-3 w-3 mr-1" />
                  Run
                </>
              ) : (
                <>
                  <Download className="h-3 w-3 mr-1" />
                  Install
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}

// Compact version for lists and smaller spaces
export function ToolCardCompact({ tool, onInstall, onRun, className }: ToolCardProps) {
  const isInstalled = tool.isInstalled;
  
  return (
    <div 
      className={cn(
        "flex items-center justify-between p-3 border-b border-gray-700 hover:bg-gray-800/50",
        className
      )}
    >
      <div className="flex items-center gap-3 flex-1 min-w-0">
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-white text-sm truncate">{tool.name}</h4>
          <div className="flex items-center gap-2 text-xs text-gray-500">
            <span>by {tool.creator.name}</span>
            <div className="h-1 w-1 bg-gray-500 rounded-full" />
            <span>{tool.usageCount} uses</span>
          </div>
        </div>
      </div>

      <Button
        size="sm"
        variant={isInstalled ? "secondary" : "primary"}
        onClick={(e) => {
          e.stopPropagation();
          if (isInstalled) {
            onRun?.(tool.id);
          } else {
            onInstall?.(tool.id);
          }
        }}
        className="text-xs px-3 py-1.5 h-auto flex-shrink-0"
      >
        {isInstalled ? (
          <>
            <Play className="h-3 w-3 mr-1" />
            Run
          </>
        ) : (
          <>
            <Download className="h-3 w-3 mr-1" />
            Get
          </>
        )}
      </Button>
    </div>
  );
}

// Loading skeleton
export function ToolCardSkeleton() {
  return (
    <Card className="border border-gray-700 bg-gray-900">
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="h-5 bg-gray-800 rounded animate-pulse" />
          <div className="h-4 bg-gray-800 rounded animate-pulse w-3/4" />
        </div>
        <div className="flex justify-between items-center">
          <div className="h-3 bg-gray-800 rounded animate-pulse w-1/3" />
          <div className="h-8 bg-gray-800 rounded animate-pulse w-16" />
        </div>
      </div>
    </Card>
  );
}