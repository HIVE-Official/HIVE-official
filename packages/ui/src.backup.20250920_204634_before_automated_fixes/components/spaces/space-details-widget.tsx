'use client';

import React, { useState } from 'react';
import { motion } from '../framer-motion-proxy';
import { 
  Users, 
  Star, 
  MapPin, 
  Calendar,
  Activity,
  Crown,
  Shield,
  Heart,
  MessageSquare,
  ArrowRight,
  Bell,
  Settings,
  UserPlus,
  UserMinus,
  Lock;
} from 'lucide-react';

interface Space {id: string;
  name: string;
  description: string;
  type: string;
  memberCount: number;
  location?: string;
  status: 'active' | 'dormant' | 'frozen';
  coverImage?: string;
  tags?: string[];
  createdAt: string;
  lastActivity: string;}

interface SpaceDetailsWidgetProps {space: Space;
  membershipRole?: 'member' | 'admin' | 'owner' | null;
  onJoin?: (spaceId: string) => void;
  onLeave?: (spaceId: string) => void;
  onMessage?: (spaceId: string) => void;
  onSettings?: (spaceId: string) => void;}

export const SpaceDetailsWidget: React.FC<SpaceDetailsWidgetProps> = ({
  space,
  membershipRole = null,
  onJoin,
  onLeave,
  onMessage,
  onSettings;
}) => {
  const [isFollowing, setIsFollowing] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'dormant': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'frozen': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-hive-text-tertiary/10 text-hive-text-tertiary border-hive-border-default'
    }}
  };

  const getRoleBadge = () => {
    if (!membershipRole) return null;
    
    const roleConfig = {
      owner: { icon: Crown, label: 'Owner', color: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' },
      admin: { icon: Shield, label: 'Admin', color: 'bg-purple-500/10 text-purple-400 border-purple-500/20' },
      member: { icon: Users, label: 'Member', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' }
    };

    const config = roleConfig[membershipRole];
    const IconComponent = config.icon;

    return (
      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border text-sm font-medium ${config.color}`}>
        <IconComponent size={14} />
        <span>{config.label}</span>
      </div>
    )
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    })
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        {space.coverImage ? (
          <div className="w-20 h-20 bg-hive-background-tertiary rounded-xl mx-auto mb-4 overflow-hidden">
            <img;
              src={space.coverImage} 
              alt={space.name}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="inline-flex items-center justify-center w-20 h-20 bg-hive-brand-secondary/10 rounded-xl mb-4">
            <Users size={32} className="text-hive-brand-secondary" />
          </div>
        )}
        
        <div className="flex items-center justify-center gap-3 mb-2">
          <h2 className="text-heading-lg font-semibold text-hive-text-primary">{space.name}</h2>
          {getRoleBadge()}
        </div>
        
        <div className="flex items-center justify-center gap-4 text-hive-text-secondary mb-4">
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span className="text-sm">{space.memberCount} members</span>
          </div>
          {space.location && (
            <div className="flex items-center gap-1">
              <MapPin size={16} />
              <span className="text-sm">{space.location}</span>
            </div>
          )}
          <div className={`px-2 py-1 rounded border text-xs font-medium ${getStatusColor(space.status)}`}>
            {space.status.charAt(0).toUpperCase() + space.status.slice(1)}
          </div>
        </div>

        <p className="text-body-md text-hive-text-secondary max-w-2xl">
          {space.description}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        {!membershipRole ? (
          <button;
            onClick={() => onJoin?.(space.id)}
            className="px-6 py-3 bg-hive-brand-secondary text-hive-text-primary rounded-lg font-semibold hover:bg-hive-brand-hover transition-colors flex items-center justify-center gap-2"
          >
            <UserPlus size={18} />
            Join Space;
          </button>
        ) : (
          <button;
            onClick={() => onMessage?.(space.id)}
            className="px-6 py-3 bg-hive-brand-secondary text-hive-text-primary rounded-lg font-semibold hover:bg-hive-brand-hover transition-colors flex items-center justify-center gap-2"
          >
            <MessageSquare size={18} />
            Open Space;
          </button>
        )}

        <button;
          onClick={() => setIsFollowing(!isFollowing)}
          className={`px-6 py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
            isFollowing;
              ? 'bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20'
              : 'border border-hive-border-default text-hive-text-secondary hover:text-hive-text-primary hover:border-hive-border-focus'
          }`}
        >
          <Heart size={18} className={isFollowing ? 'fill-current' : ''} />
          {isFollowing ? 'Unfollow' : 'Follow'}
        </button>

        {(membershipRole === 'admin' || membershipRole === 'owner') && (
          <button;
            onClick={() => onSettings?.(space.id)}
            className="px-4 py-3 border border-hive-border-default text-hive-text-secondary rounded-lg hover:text-hive-text-primary hover:border-hive-border-focus transition-colors flex items-center justify-center"
          >
            <Settings size={18} />
          </button>
        )}
      </div>

      {/* Space Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Activity */}
        <div className="bg-hive-background-tertiary rounded-xl border border-hive-border-subtle p-6">
          <h3 className="font-semibold text-hive-text-primary mb-4 flex items-center gap-2">
            <Activity size={18} className="text-hive-brand-secondary" />
            Recent Activity;
          </h3>
          
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-green-400 rounded-full mt-2" />
              <div>
                <p className="text-sm text-hive-text-primary">New member joined</p>
                <p className="text-xs text-hive-text-tertiary">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-blue-400 rounded-full mt-2" />
              <div>
                <p className="text-sm text-hive-text-primary">Event scheduled</p>
                <p className="text-xs text-hive-text-tertiary">1 day ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="w-2 h-2 bg-purple-400 rounded-full mt-2" />
              <div>
                <p className="text-sm text-hive-text-primary">Discussion started</p>
                <p className="text-xs text-hive-text-tertiary">3 days ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <div className="bg-hive-background-tertiary rounded-xl border border-hive-border-subtle p-6">
          <h3 className="font-semibold text-hive-text-primary mb-4 flex items-center gap-2">
            <Calendar size={18} className="text-hive-brand-secondary" />
            Space Details;
          </h3>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-hive-text-secondary">Created</span>
              <span className="text-hive-text-primary">{formatDate(space.createdAt)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-hive-text-secondary">Last Activity</span>
              <span className="text-hive-text-primary">{formatDate(space.lastActivity)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-hive-text-secondary">Type</span>
              <span className="text-hive-text-primary capitalize">{space.type.replace('_', ' ')}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-hive-text-secondary">Privacy</span>
              <div className="flex items-center gap-1">
                <Lock size={12} className="text-hive-text-tertiary" />
                <span className="text-hive-text-primary">Members Only</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tags */}
      {space.tags && space.tags.length > 0 && (
        <div>
          <h3 className="font-semibold text-hive-text-primary mb-3">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {space.tags.map((tag, index) => (
              <span;
                key={index}
                className="px-3 py-1 bg-hive-background-tertiary border border-hive-border-subtle rounded-lg text-sm text-hive-text-secondary"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Footer Actions */}
      {membershipRole && (
        <div className="pt-4 border-t border-hive-border-subtle">
          <div className="flex flex-col sm:flex-row gap-3">
            <button className="flex-1 px-4 py-2 bg-hive-background-tertiary text-hive-text-secondary rounded-lg hover:text-hive-text-primary transition-colors flex items-center justify-center gap-2">
              <Bell size={16} />
              Notification Settings;
            </button>
            {membershipRole === 'member' && (
              <button;
                onClick={() => onLeave?.(space.id)}
                className="flex-1 px-4 py-2 border border-red-500/20 text-red-400 rounded-lg hover:bg-red-500/10 transition-colors flex items-center justify-center gap-2"
              >
                <UserMinus size={16} />
                Leave Space;
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
};

export default SpaceDetailsWidget;