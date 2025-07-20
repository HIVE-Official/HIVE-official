'use client';

import React from 'react';
import { MySpacesFeedProps } from './types';
import { HiveCard } from '../hive-card';
import { HiveButton } from '../hive-button';
import { HiveBadge } from '../hive-badge';
import { Users, MessageSquare, Pin, Heart, Plus, AlertCircle, Loader2 } from 'lucide-react';

export const MySpacesFeed: React.FC<MySpacesFeedProps> = ({
  spaces,
  isLoading = false,
  error,
  onSpaceClick,
  onJoinSpace
}) => {
  if (isLoading) {
    return (
      <HiveCard className="p-6">
        <div className="flex items-center justify-center py-8">
          <Loader2 className="h-6 w-6 animate-spin text-hive-gold" />
        </div>
      </HiveCard>
    );
  }

  if (error) {
    return (
      <HiveCard className="p-6">
        <div className="flex items-center justify-center py-8 text-center">
          <div>
            <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <p className="text-red-400 mb-2">Failed to load spaces</p>
            <p className="text-sm text-gray-400">{error}</p>
          </div>
        </div>
      </HiveCard>
    );
  }

  return (
    <HiveCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <Users className="h-5 w-5 text-hive-gold" />
          My Spaces
        </h2>
        <HiveButton 
          variant="outline" 
          size="sm" 
          onClick={onJoinSpace}
          className="flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          Join Space
        </HiveButton>
      </div>

      {spaces.length === 0 ? (
        <div className="text-center py-8">
          <Users className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 mb-4">No spaces joined yet</p>
          <HiveButton onClick={onJoinSpace}>
            Join Your First Space
          </HiveButton>
        </div>
      ) : (
        <div className="space-y-4">
          {spaces.map((space) => (
            <div 
              key={space.id} 
              className="border border-hive-border-secondary rounded-lg p-4 hover:border-hive-gold/30 transition-colors cursor-pointer"
              onClick={() => onSpaceClick?.(space.id)}
            >
              {/* Space Header */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-hive-gold/20 to-yellow-400/20 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-hive-gold" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{space.name}</h3>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <span>{space.memberCount} members</span>
                      <span>•</span>
                      <span>{space.lastActivity}</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {space.unreadCount > 0 && (
                    <HiveBadge variant="active-tag" className="text-xs">
                      {space.unreadCount}
                    </HiveBadge>
                  )}
                  {space.isPinned && (
                    <Pin className="h-4 w-4 text-hive-gold" />
                  )}
                  {space.isFavorite && (
                    <Heart className="h-4 w-4 text-red-400 fill-current" />
                  )}
                </div>
              </div>

              {/* Recent Posts */}
              <div className="space-y-2">
                {space.recentPosts.slice(0, 2).map((post) => (
                  <div key={post.id} className="bg-gray-800/50 rounded-lg p-3 border border-gray-700/50">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium text-gray-300">{post.author}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">{post.timestamp}</span>
                        <HiveBadge variant="skill-tag" className="text-xs">
                          {post.type}
                        </HiveBadge>
                      </div>
                    </div>
                    <p className="text-sm text-gray-300 mb-2">{post.content}</p>
                    
                    {post.replies && post.replies > 0 && (
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <MessageSquare className="h-3 w-3" />
                        <span>{post.replies} replies</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Show More Link */}
              {space.recentPosts.length > 2 && (
                <div className="mt-3 text-center">
                  <button className="text-sm text-hive-gold hover:text-hive-gold/80 transition-colors">
                    View all activity →
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Footer */}
      {spaces.length > 0 && (
        <div className="mt-6 pt-6 border-t border-hive-border-secondary text-center">
          <HiveButton variant="ghost" size="sm">
            View All Spaces
          </HiveButton>
        </div>
      )}
    </HiveCard>
  );
};

export default MySpacesFeed;