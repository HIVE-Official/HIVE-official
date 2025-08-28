/**
 * Social Tools Card - Utility + Social Discovery
 * Grid of tools with social context and usage sharing
 */

"use client";

import React, { useState } from 'react';
import { 
  Wrench, 
  TrendingUp, 
  Star, 
  Users, 
  Plus, 
  ExternalLink,
  Zap,
  BookOpen,
  Target,
  Clock,
  BarChart3,
  PieChart,
  Calculator,
  FileText,
  Share2
} from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { motion } from '../../lib/motion';
import { butterClasses, getStaggerClass } from '../../lib/motion';
import '../../styles/social-profile.css';

interface Tool {
  id: string;
  name: string;
  icon: string;
  category: 'academic' | 'productivity' | 'social' | 'finance' | 'health';
  rating: number;
  usageCount?: number;
  socialProof?: {
    friendsUsed: string[];
    totalUsers: number;
    trending?: boolean;
  };
  isCreated?: boolean;
  isNew?: boolean;
  isFavorite?: boolean;
  lastUsed?: string;
  creator?: string;
}

interface SocialToolsCardProps {
  tools: Tool[];
  createdTools?: Tool[];
  totalCreated?: number;
  campusImpact?: number;
  averageRating?: number;
  isBuilder?: boolean;
  onToolClick?: (toolId: string) => void;
  onCreateTool?: () => void;
  onBrowseTools?: () => void;
  onShareTools?: () => void;
  className?: string;
}

export function SocialToolsCard({
  tools = [],
  createdTools = [],
  totalCreated = 0,
  campusImpact = 0,
  averageRating,
  isBuilder = false,
  onToolClick,
  onCreateTool,
  onBrowseTools,
  onShareTools,
  className
}: SocialToolsCardProps) {
  const [activeTab, setActiveTab] = useState<'trending' | 'yours' | 'created'>('trending');
  
  const trendingTools = tools
    .filter(tool => tool.socialProof?.trending)
    .slice(0, 4);
  
  const yourTools = tools
    .filter(tool => !tool.isCreated)
    .sort((a, b) => new Date(b.lastUsed || 0).getTime() - new Date(a.lastUsed || 0).getTime())
    .slice(0, 4);
  
  const getToolIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      '🧮': <Calculator size={20} />,
      '📊': <BarChart3 size={20} />,
      '⏰': <Clock size={20} />,
      '🤝': <Users size={20} />,
      '📝': <FileText size={20} />,
      '📎': <ExternalLink size={20} />,
      '🎯': <Target size={20} />,
      '📚': <BookOpen size={20} />,
    };
    
    return iconMap[iconName] || <Wrench size={20} />;
  };
  
  const getCategoryColor = (category: Tool['category']) => {
    switch (category) {
      case 'academic': return 'var(--campus-blue)';
      case 'productivity': return 'var(--social-green)';
      case 'social': return 'var(--campus-blue)';
      case 'finance': return '#10B981';
      case 'health': return '#EF4444';
      default: return 'var(--text-tertiary)';
    }
  };
  
  const formatUsageCount = (count: number) => {
    if (count > 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };
  
  const ToolButton: React.FC<{ tool: Tool }> = ({ tool }) => (
    <motion.button
      onClick={() => onToolClick?.(tool.id)}
      className={cn("group relative p-3 rounded-xl border border-white/10 hover:border-white/20 bg-gradient-to-br from-transparent to-white/5 hover:to-white/10", butterClasses.button)}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* New/Trending Badges */}
      {tool.isNew && (
        <Badge className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs px-1 py-0">
          NEW
        </Badge>
      )}
      {tool.socialProof?.trending && (
        <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-orange-500" />
      )}
      
      <div className="flex flex-col items-center gap-2">
        {/* Tool Icon */}
        <div 
          className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
          style={{ background: getCategoryColor(tool.category) }}
        >
          {tool.icon ? (
            <span className="text-lg">{tool.icon}</span>
          ) : (
            getToolIcon(tool.name)
          )}
        </div>
        
        {/* Tool Name */}
        <div className="text-center">
          <div className="profile-caption font-medium text-primary group-hover:text-blue-400 transition-colors">
            {tool.name}
          </div>
          
          {/* Rating */}
          <div className="flex items-center justify-center gap-1 mt-1">
            <Star size={10} className="text-blue-400 fill-current" />
            <span className="profile-fine text-secondary">
              {tool.rating.toFixed(1)}
            </span>
          </div>
          
          {/* Social Proof */}
          {tool.socialProof && (
            <div className="profile-fine text-tertiary mt-1">
              {tool.socialProof.friendsUsed.length > 0 ? (
                <span>{tool.socialProof.friendsUsed[0]} +{tool.socialProof.totalUsers - 1} used</span>
              ) : (
                <span>{formatUsageCount(tool.socialProof.totalUsers)} users</span>
              )}
            </div>
          )}
          
          {/* Created By You */}
          {tool.isCreated && (
            <Badge variant="secondary" className="mt-1 text-xs border-blue-400/30 text-blue-400">
              Your Tool
            </Badge>
          )}
        </div>
      </div>
    </motion.button>
  );

  return (
    <motion.div 
      className={cn("social-profile-card", butterClasses.card, className)} 
      style={{ gridArea: 'tools' }}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-orange-600 flex items-center justify-center">
            <Wrench size={20} className="text-white" />
          </div>
          <div>
            <h3 className="profile-heading text-primary">
              🛠️ YOUR TOOLS
            </h3>
            <div className="profile-caption text-secondary">
              {tools.length}/20 tools
            </div>
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onShareTools}
          className="text-tertiary hover:text-primary"
        >
          <Share2 size={16} />
        </Button>
      </div>
      
      {/* Builder Status */}
      {isBuilder && (totalCreated > 0 || campusImpact > 0) && (
        <div className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-500/20 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-500 text-white flex items-center justify-center">
              <Zap size={16} />
            </div>
            <div>
              <div className="profile-caption font-semibold text-blue-400">
                🏗️ Builder Impact
              </div>
              <div className="profile-fine text-secondary">
                {totalCreated} tools • {campusImpact} campus uses this week
              </div>
            </div>
          </div>
          <Badge className="bg-blue-500 text-white">
            Top 5%
          </Badge>
        </div>
      )}
      
      {/* Tab Navigation */}
      <div className="flex gap-1 mb-4 p-1 bg-white/5 rounded-lg">
        <button
          onClick={() => setActiveTab('trending')}
          className={cn(
            "flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all",
            activeTab === 'trending'
              ? "bg-blue-500 text-white"
              : "text-secondary hover:text-primary"
          )}
        >
          🔥 Trending
        </button>
        <button
          onClick={() => setActiveTab('yours')}
          className={cn(
            "flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all",
            activeTab === 'yours'
              ? "bg-blue-500 text-white"
              : "text-secondary hover:text-primary"
          )}
        >
          📚 Your Tools
        </button>
        {isBuilder && createdTools.length > 0 && (
          <button
            onClick={() => setActiveTab('created')}
            className={cn(
              "flex-1 px-3 py-2 rounded-md text-sm font-medium transition-all",
              activeTab === 'created'
                ? "bg-blue-500 text-white"
                : "text-secondary hover:text-primary"
            )}
          >
            🏗️ Created
          </button>
        )}
      </div>
      
      {/* Tools Grid */}
      <motion.div 
        className="grid grid-cols-2 gap-3 mb-6"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { staggerChildren: 0.05 } }
        }}
        key={activeTab}
      >
        {activeTab === 'trending' && trendingTools.map((tool, index) => (
          <motion.div
            key={tool.id}
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            className={getStaggerClass(index)}
          >
            <ToolButton tool={tool} />
          </motion.div>
        ))}
        
        {activeTab === 'yours' && yourTools.map((tool, index) => (
          <motion.div
            key={tool.id}
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            className={getStaggerClass(index)}
          >
            <ToolButton tool={tool} />
          </motion.div>
        ))}
        
        {activeTab === 'created' && createdTools.map((tool, index) => (
          <motion.div
            key={tool.id}
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
            className={getStaggerClass(index)}
          >
            <ToolButton tool={tool} />
          </motion.div>
        ))}
        
        {/* Add Tool Button */}
        {(activeTab === 'yours' || activeTab === 'created') && (
          <motion.button
            onClick={onCreateTool}
            className={cn("group p-3 rounded-xl border border-dashed border-white/20 hover:border-blue-400/50 bg-transparent hover:bg-blue-400/10", butterClasses.button)}
            whileHover={{ scale: 1.02, borderColor: 'rgba(255, 215, 0, 0.5)' }}
            whileTap={{ scale: 0.98 }}
            variants={{
              hidden: { opacity: 0, y: 20, scale: 0.95 },
              visible: { opacity: 1, y: 0, scale: 1 }
            }}
          >
            <div className="flex flex-col items-center justify-center gap-2 h-full">
              <div className="w-10 h-10 rounded-lg border border-dashed border-white/30 group-hover:border-blue-400 flex items-center justify-center">
                <Plus size={20} className="text-tertiary group-hover:text-blue-400" />
              </div>
              <div className="profile-caption text-tertiary group-hover:text-blue-400">
                {activeTab === 'created' ? 'Create New' : 'Add Tool'}
              </div>
            </div>
          </motion.button>
        )}
      </motion.div>
      
      {/* Social Proof Section */}
      {campusImpact > 0 && (
        <div className="social-proof mb-4">
          <span className="social-count">{campusImpact}</span>
          <span> students used your tools this week</span>
        </div>
      )}
      
      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button
          onClick={onBrowseTools}
          className="social-action-button flex-1"
        >
          <ExternalLink size={16} />
          Browse Tools
        </Button>
        <Button
          onClick={onCreateTool}
          className="social-action-button secondary"
          variant="secondary"
        >
          <Plus size={16} />
          Create New
        </Button>
      </div>
      
      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/10">
        <div className="text-center">
          <div className="profile-caption font-semibold text-primary">
            {tools.length}
          </div>
          <div className="profile-fine text-tertiary">
            Tools Used
          </div>
        </div>
        <div className="text-center">
          <div className="profile-caption font-semibold text-primary">
            {totalCreated}
          </div>
          <div className="profile-fine text-tertiary">
            Created
          </div>
        </div>
        <div className="text-center">
          <div className="profile-caption font-semibold text-primary">
            {averageRating ? averageRating.toFixed(1) : '—'}
          </div>
          <div className="profile-fine text-tertiary">
            Avg Rating
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default SocialToolsCard;