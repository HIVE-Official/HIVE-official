'use client';

import React, { useState } from 'react';
import { motion } from '../framer-motion-proxy';
import { 
  Users, 
  Star, 
  Calendar,
  Activity,
  Play,
  Settings,
  Share,
  Download,
  Heart,
  Code,
  BarChart3,
  Eye,
  Clock,
  Tag,
  Globe,
  Lock,
  Bookmark,
  ArrowRight,
  Zap,
  TrendingUp
} from 'lucide-react';

interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  status: 'draft' | 'published' | 'featured' | 'deprecated';
  usageCount?: number;
  likes?: number;
  createdAt: string;
  updatedAt?: string;
  author?: {
    name: string;
    handle: string;
    avatar?: string;
  };
  tags?: string[];
  isPublic?: boolean;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  timeToComplete?: string;
  version?: string;
}

interface ToolDetailsWidgetProps {
  tool: Tool;
  isOwnTool?: boolean;
  onRun?: (toolId: string) => void;
  onEdit?: (toolId: string) => void;
  onShare?: (toolId: string) => void;
  onFavorite?: (toolId: string) => void;
  onViewAnalytics?: (toolId: string) => void;
  onDownload?: (toolId: string) => void;
}

export const ToolDetailsWidget: React.FC<ToolDetailsWidgetProps> = ({
  tool,
  isOwnTool = false,
  onRun,
  onEdit,
  onShare,
  onFavorite,
  onViewAnalytics,
  onDownload
}) => {
  const [isFavorited, setIsFavorited] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'featured':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'published':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'draft':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'deprecated':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-hive-text-tertiary/10 text-hive-text-tertiary border-hive-border-default';
    }
  };

  const getDifficultyBadge = () => {
    if (!tool.difficulty) return null;
    
    const difficultyConfig = {
      beginner: { icon: Zap, label: 'Beginner', color: 'bg-green-500/10 text-green-400 border-green-500/20' },
      intermediate: { icon: Star, label: 'Intermediate', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
      advanced: { icon: TrendingUp, label: 'Advanced', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' }
    };

    const config = difficultyConfig[tool.difficulty];
    const IconComponent = config.icon;

    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-sm font-medium ${config.color}`}>
        <IconComponent size={14} />
        <span>{config.label}</span>
      </div>
    );
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-hive-brand-secondary/10 rounded-xl mb-4 text-4xl">
          {tool.icon}
        </div>
        
        <div className="flex items-center justify-center gap-3 mb-2">
          <h2 className="text-heading-lg font-semibold text-hive-text-primary">{tool.name}</h2>
          <div className={`px-2 py-1 rounded border text-xs font-medium ${getStatusColor(tool.status)}`}>
            {tool.status.charAt(0).toUpperCase() + tool.status.slice(1)}
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-4 text-hive-text-secondary mb-4">
          <div className="flex items-center gap-1">
            <Eye size={16} />
            <span className="text-sm">{tool.usageCount || 0} uses</span>
          </div>
          <div className="flex items-center gap-1">
            <Heart size={16} />
            <span className="text-sm">{tool.likes || 0} likes</span>
          </div>
          {tool.timeToComplete && (
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span className="text-sm">{tool.timeToComplete}</span>
            </div>
          )}
          {getDifficultyBadge()}
        </div>

        <p className="text-body-md text-hive-text-secondary max-w-2xl">
          {tool.description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <button
          onClick={() => onRun?.(tool.id)}
          className="px-6 py-3 bg-hive-brand-secondary text-hive-text-primary rounded-lg font-semibold hover:bg-hive-brand-hover transition-colors flex items-center justify-center gap-2"
        >
          <Play size={18} />
          Run Tool
        </button>

        <button
          onClick={() => {
            setIsFavorited(!isFavorited);
            onFavorite?.(tool.id);
          }}
          className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
            isFavorited 
              ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
              : 'border border-hive-border-default text-hive-text-secondary hover:text-hive-text-primary hover:border-hive-border-focus'
          }`}
        >
          <Heart size={18} className={isFavorited ? 'fill-current' : ''} />
          {isFavorited ? 'Unfavorite' : 'Favorite'}
        </button>

        <button
          onClick={() => onShare?.(tool.id)}
          className="px-4 py-3 border border-hive-border-default text-hive-text-secondary rounded-lg hover:text-hive-text-primary hover:border-hive-border-focus transition-colors flex items-center justify-center gap-2"
        >
          <Share size={18} />
          Share
        </button>

        {isOwnTool && (
          <button
            onClick={() => onEdit?.(tool.id)}
            className="px-4 py-3 border border-hive-border-default text-hive-text-secondary rounded-lg hover:text-hive-text-primary hover:border-hive-border-focus transition-colors flex items-center justify-center"
          >
            <Settings size={18} />
          </button>
        )}
      </div>

      {/* Tool Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Usage Stats */}
        <div className="bg-hive-background-tertiary rounded-xl border border-hive-border-subtle p-6">
          <h3 className="font-semibold text-hive-text-primary mb-4 flex items-center gap-2">
            <BarChart3 size={18} className="text-hive-brand-secondary" />
            Usage Stats
          </h3>
          
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-hive-text-secondary">Total Uses</span>
              <span className="text-hive-text-primary font-medium">{tool.usageCount || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-hive-text-secondary">Likes</span>
              <span className="text-hive-text-primary font-medium">{tool.likes || 0}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-hive-text-secondary">Category</span>
              <span className="text-hive-text-primary font-medium capitalize">{tool.category}</span>
            </div>
            {tool.version && (
              <div className="flex justify-between">
                <span className="text-hive-text-secondary">Version</span>
                <span className="text-hive-text-primary font-medium">v{tool.version}</span>
              </div>
            )}
          </div>
        </div>

        {/* Tool Details */}
        <div className="bg-hive-background-tertiary rounded-xl border border-hive-border-subtle p-6">
          <h3 className="font-semibold text-hive-text-primary mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-hive-brand-secondary" />
            Tool Details
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-hive-text-secondary">Created</span>
              <span className="text-hive-text-primary">{formatDate(tool.createdAt)}</span>
            </div>
            {tool.updatedAt && (
              <div className="flex justify-between">
                <span className="text-hive-text-secondary">Last Updated</span>
                <span className="text-hive-text-primary">{formatDate(tool.updatedAt)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-hive-text-secondary">Visibility</span>
              <div className="flex items-center gap-1">
                {tool.isPublic ? <Globe size={12} /> : <Lock size={12} />}
                <span className="text-hive-text-primary">{tool.isPublic ? 'Public' : 'Private'}</span>
              </div>
            </div>
            {tool.author && (
              <div className="flex justify-between">
                <span className="text-hive-text-secondary">Created by</span>
                <span className="text-hive-text-primary">{tool.author.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tags */}
      {tool.tags && tool.tags.length > 0 && (
        <div>
          <h3 className="font-semibold text-hive-text-primary mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {tool.tags.map((tag, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-hive-background-tertiary border border-hive-border-subtle rounded-lg text-sm text-hive-text-secondary flex items-center gap-1"
              >
                <Tag size={12} />
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer Actions */}
      {isOwnTool && (
        <div className="pt-4 border-t border-hive-border-subtle">
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => onViewAnalytics?.(tool.id)}
              className="flex-1 px-4 py-2 bg-hive-background-tertiary text-hive-text-secondary rounded-lg hover:text-hive-text-primary transition-colors flex items-center justify-center gap-2"
            >
              <BarChart3 size={16} />
              View Analytics
            </button>
            <button 
              onClick={() => onDownload?.(tool.id)}
              className="flex-1 px-4 py-2 bg-hive-background-tertiary text-hive-text-secondary rounded-lg hover:text-hive-text-primary transition-colors flex items-center justify-center gap-2"
            >
              <Download size={16} />
              Export Tool
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ToolDetailsWidget;