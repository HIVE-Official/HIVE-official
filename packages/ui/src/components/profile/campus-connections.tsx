'use client';

import React from 'react';
import { CampusConnectionsProps } from './types';
import { HiveCard } from '../hive-card';
import { HiveButton } from '../hive-button';
import { HiveBadge } from '../hive-badge';
import { Users, UserPlus, MapPin, Lightbulb, GraduationCap, Coffee, AlertCircle, Loader2 } from 'lucide-react';

export const CampusConnections: React.FC<CampusConnectionsProps> = ({
  connections,
  isLoading = false,
  error,
  onConnectionClick
}) => {
  if (isLoading) {
    return (
      <HiveCard className="p-6">
        <div className="flex items-center justify-center py-4">
          <Loader2 className="h-6 w-6 animate-spin text-[var(--hive-brand-secondary)]" />
        </div>
      </HiveCard>
    );
  }

  if (error) {
    return (
      <HiveCard className="p-6">
        <div className="flex items-center justify-center py-4 text-center">
          <div>
            <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <p className="text-red-400 mb-2">Failed to load connections</p>
            <p className="text-sm text-gray-400">{error}</p>
          </div>
        </div>
      </HiveCard>
    );
  }

  const getConnectionIcon = (type: string) => {
    switch (type) {
      case 'dorm_classmate':
        return <MapPin className="h-4 w-4" />;
      case 'tool_usage':
        return <Lightbulb className="h-4 w-4" />;
      case 'multi_overlap':
        return <Users className="h-4 w-4" />;
      case 'tool_collaboration':
        return <Lightbulb className="h-4 w-4" />;
      case 'cultural_connection':
        return <Coffee className="h-4 w-4" />;
      case 'mentorship':
        return <GraduationCap className="h-4 w-4" />;
      case 'alumni_network':
        return <Users className="h-4 w-4" />;
      default:
        return <UserPlus className="h-4 w-4" />;
    }
  };

  const getConnectionColor = (type: string) => {
    switch (type) {
      case 'dorm_classmate':
        return 'from-blue-500/20 to-blue-600/20 border-blue-500/30';
      case 'tool_usage':
        return 'from-purple-500/20 to-purple-600/20 border-purple-500/30';
      case 'multi_overlap':
        return 'from-green-500/20 to-green-600/20 border-green-500/30';
      case 'tool_collaboration':
        return 'from-hive-gold/20 to-yellow-400/20 border-hive-gold/30';
      case 'cultural_connection':
        return 'from-orange-500/20 to-orange-600/20 border-orange-500/30';
      case 'mentorship':
        return 'from-indigo-500/20 to-indigo-600/20 border-indigo-500/30';
      case 'alumni_network':
        return 'from-emerald-500/20 to-emerald-600/20 border-emerald-500/30';
      default:
        return 'from-gray-500/20 to-gray-600/20 border-gray-500/30';
    }
  };

  const getConnectionPriority = (type: string) => {
    switch (type) {
      case 'dorm_classmate':
        return 'High';
      case 'tool_collaboration':
        return 'High';
      case 'multi_overlap':
        return 'Medium';
      case 'mentorship':
        return 'High';
      default:
        return 'Medium';
    }
  };

  return (
    <HiveCard className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-[var(--hive-text-primary)] flex items-center gap-2">
          <Users className="h-5 w-5 text-[var(--hive-brand-secondary)]" />
          Campus Connections
        </h2>
        <HiveBadge variant="skill-tag" className="text-xs">
          Smart Discovery
        </HiveBadge>
      </div>

      {connections.length === 0 ? (
        <div className="text-center py-4">
          <Users className="h-12 w-12 text-gray-500 mx-auto mb-4" />
          <p className="text-gray-400 mb-2">No connections found</p>
          <p className="text-sm text-gray-500">Join more spaces to discover connections</p>
        </div>
      ) : (
        <div className="space-y-4">
          {connections.map((connection) => (
            <div 
              key={connection.id} 
              className={`bg-gradient-to-r ${getConnectionColor(connection.type)} border rounded-lg p-4 hover:border-opacity-60 transition-all cursor-pointer`}
              onClick={() => onConnectionClick?.(connection.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-[var(--hive-text-primary)]/10 rounded-lg flex items-center justify-center">
                    {getConnectionIcon(connection.type)}
                  </div>
                  
                  <div className="flex-1">
                    <p className="text-[var(--hive-text-primary)] mb-2">{connection.message}</p>
                    
                    {connection.people.length > 0 && (
                      <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                        <Users className="h-3 w-3" />
                        <span>{connection.people.slice(0, 3).join(', ')}</span>
                        {connection.people.length > 3 && (
                          <span className="text-[var(--hive-brand-secondary)]">+{connection.people.length - 3} others</span>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-2">
                      <HiveBadge 
                        variant={getConnectionPriority(connection.type) === 'High' ? 'active-tag' : 'skill-tag'} 
                        className="text-xs"
                      >
                        {getConnectionPriority(connection.type)} Priority
                      </HiveBadge>
                      
                      <HiveButton 
                        variant="ghost" 
                        size="sm"
                        className="text-xs h-6 px-2"
                        onClick={(e) => {
                          e.stopPropagation();
                          onConnectionClick?.(connection.id);
                        }}
                      >
                        {connection.action}
                      </HiveButton>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Discovery Insights */}
      {connections.length > 0 && (
        <div className="mt-6 pt-6 border-t border-hive-border-secondary">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">
              {connections.length} connection opportunities found
            </span>
            <HiveButton variant="ghost" size="sm">
              View All Connections
            </HiveButton>
          </div>
        </div>
      )}

      {/* Pro Tip */}
      <div className="mt-4 p-3 bg-[var(--hive-brand-secondary)]/10 rounded-lg border border-hive-gold/20">
        <div className="flex items-center gap-2 mb-1">
          <Lightbulb className="h-4 w-4 text-[var(--hive-brand-secondary)]" />
          <span className="text-sm font-medium text-[var(--hive-text-primary)]">Pro Tip</span>
        </div>
        <p className="text-xs text-gray-300">
          Join more spaces and use tools to discover better connections with your classmates!
        </p>
      </div>
    </HiveCard>
  );
};

export default CampusConnections;