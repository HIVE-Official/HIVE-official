/**
 * HIVE Space Surface Manager
 * Admin interface for managing the Six Surfaces of each HIVE space
 */

"use client";

import React, { useState, useCallback } from "react";
import { Button as Button, HiveCard as Card, CardContent, Badge } from "@hive/ui";
import { 
  MessageSquare, 
  Zap, 
  Calendar, 
  Users, 
  FileText, 
  Info,
  Settings,
  Eye,
  Plus,
  Trash2,
  Clock,
  Hash,
  Layers,
  GraduationCap,
  Home,
  Heart
} from 'lucide-react';

interface SpaceSurface {
  id: string;
  name: string;
  type: 'post_board' | 'tools' | 'events' | 'members' | 'resources' | 'about';
  isEnabled: boolean;
  permissions: {
    canView: string[];
    canPost: string[];
    canModerate: string[];
  };
  settings: {
    allowComments: boolean;
    requireApproval: boolean;
    enableNotifications: boolean;
    publiclyVisible: boolean;
  };
  analytics: {
    totalPosts: number;
    activeUsers: number;
    engagementRate: number;
    lastActivity: string;
  };
}

interface ToolSlot {
  id: string;
  position: number;
  tool?: {
    id: string;
    name: string;
    type: string;
    description: string;
    creator: string;
    usageCount: number;
    isActive: boolean;
  };
  isOccupied: boolean;
  category: 'academic_coordination' | 'community_tools' | 'social_features' | 'utility';
}

interface HiveSpace {
  id: string;
  name: string;
  type: 'university_spaces' | 'residential_spaces' | 'greek_life_spaces' | 'student_spaces';
  subType: 'academic_major' | 'class_year' | 'university_organization' | 'dorm_building' | 'off_campus_area' | 'greek_chapter' | 'greek_council' | 'student_club' | 'interest_community';
  surfaces: SpaceSurface[];
  toolSlots: ToolSlot[];
  maxToolSlots: number;
  memberCount: number;
  leadership: {
    id: string;
    name: string;
    role: 'leader' | 'co_leader' | 'moderator';
  }[];
}

interface HiveSpaceSurfaceManagerProps {
  space: HiveSpace;
  onUpdateSurface: (surfaceId: string, updates: Partial<SpaceSurface>) => Promise<void>;
  onRemoveTool: (slotId: string) => Promise<void>;
  enableFeatureFlag?: boolean;
}

const SurfaceCard: React.FC<{
  surface: SpaceSurface;
  onToggle: () => void;
  onEdit: () => void;
}> = ({ surface, onToggle, onEdit }) => {
  const getSurfaceIcon = (type: SpaceSurface['type']) => {
    switch (type) {
      case 'post_board': return <MessageSquare className="w-5 h-5" />;
      case 'tools': return <Zap className="w-5 h-5" />;
      case 'events': return <Calendar className="w-5 h-5" />;
      case 'members': return <Users className="w-5 h-5" />;
      case 'resources': return <FileText className="w-5 h-5" />;
      case 'about': return <Info className="w-5 h-5" />;
      default: return <Hash className="w-5 h-5" />;
    }
  };

  const getSurfaceColor = (type: SpaceSurface['type']) => {
    switch (type) {
      case 'post_board': return 'text-blue-400';
      case 'tools': return 'text-amber-400';
      case 'events': return 'text-green-400';
      case 'members': return 'text-purple-400';
      case 'resources': return 'text-orange-400';
      case 'about': return 'text-gray-400';
      default: return 'text-gray-400';
    }
  };

  const getSurfaceDescription = (type: SpaceSurface['type']) => {
    switch (type) {
      case 'post_board': return 'Community communication and discussions';
      case 'tools': return 'Functional capabilities and coordination tools';
      case 'events': return 'Calendar view of community events';
      case 'members': return 'Directory and membership management';
      case 'resources': return 'File sharing and resource repository';
      case 'about': return 'Static community information and guidelines';
      default: return 'Space surface';
    }
  };

  return (
    <Card className={`border transition-all ${surface.isEnabled ? 'border-green-500/30 bg-green-500/5' : 'border-gray-600 bg-gray-800/50'}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-lg bg-gray-800 ${getSurfaceColor(surface.type)}`}>
              {getSurfaceIcon(surface.type)}
            </div>
            <div>
              <h3 className="font-semibold text-white capitalize">{surface.name.replace('_', ' ')}</h3>
              <p className="text-sm text-gray-400">{getSurfaceDescription(surface.type)}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              size="sm"
              variant="ghost"
              onClick={onEdit}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Settings className="w-4 h-4" />
            </Button>
            <div className="flex items-center">
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={surface.isEnabled}
                  onChange={onToggle}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>
        </div>

        {surface.isEnabled && (
          <div className="space-y-3">
            {/* Analytics */}
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center p-2 bg-gray-800/50 rounded">
                <div className="text-sm font-semibold text-white">{surface.analytics.totalPosts}</div>
                <div className="text-xs text-gray-400">
                  {surface.type === 'tools' ? 'Tools' : surface.type === 'events' ? 'Events' : 'Posts'}
                </div>
              </div>
              <div className="text-center p-2 bg-gray-800/50 rounded">
                <div className="text-sm font-semibold text-green-400">{surface.analytics.activeUsers}</div>
                <div className="text-xs text-gray-400">Active Users</div>
              </div>
            </div>

            {/* Settings Summary */}
            <div className="flex flex-wrap gap-1">
              {surface.settings.allowComments && (
                <Badge size="xs" className="bg-blue-500/10 text-blue-400">Comments</Badge>
              )}
              {surface.settings.requireApproval && (
                <Badge size="xs" className="bg-yellow-500/10 text-yellow-400">Approval</Badge>
              )}
              {surface.settings.enableNotifications && (
                <Badge size="xs" className="bg-green-500/10 text-green-400">Notifications</Badge>
              )}
              {surface.settings.publiclyVisible && (
                <Badge size="xs" className="bg-purple-500/10 text-purple-400">Public</Badge>
              )}
            </div>

            {/* Last Activity */}
            <div className="text-xs text-gray-400 flex items-center space-x-1">
              <Clock className="w-3 h-3" />
              <span>Last activity: {new Date(surface.analytics.lastActivity).toLocaleDateString()}</span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

const ToolSlotCard: React.FC<{
  slot: ToolSlot;
  spaceType: HiveSpace['type'];
  spaceSubType: HiveSpace['subType'];
  onInstall: () => void;
  onRemove: () => void;
  onEdit: () => void;
}> = ({ slot, spaceType, spaceSubType, onInstall, onRemove, onEdit }) => {
  const getCategoryColor = (category: ToolSlot['category']) => {
    switch (category) {
      case 'academic_coordination': return 'text-blue-400';
      case 'community_tools': return 'text-green-400';
      case 'social_features': return 'text-purple-400';
      case 'utility': return 'text-orange-400';
      default: return 'text-gray-400';
    }
  };

  const getRecommendedTools = (spaceType: HiveSpace['type'], spaceSubType: HiveSpace['subType']) => {
    const baseTools = ['Event Planner', 'Quick Poll', 'Resource Sharing', 'Announcement System'];
    
    if (spaceType === 'university_spaces' && spaceSubType === 'academic_major') {
      return [...baseTools, 'Study Group Matcher', 'Project Team Builder', 'Course Coordination', 'Career Planning'];
    }
    
    if (spaceType === 'residential_spaces') {
      return [...baseTools, 'Floor Coordination', 'Maintenance Requests', 'Package Tracking', 'Community Guidelines'];
    }
    
    if (spaceType === 'greek_life_spaces') {
      return [...baseTools, 'Recruitment Tools', 'Chapter Management', 'Event RSVP', 'Brotherhood/Sisterhood'];
    }
    
    if (spaceType === 'student_spaces') {
      return [...baseTools, 'Member Directory', 'Project Collaboration', 'Meeting Scheduler', 'Interest Matching'];
    }
    
    return baseTools;
  };

  const recommendedTools = getRecommendedTools(spaceType, spaceSubType);

  return (
    <Card className={`border transition-all ${slot.isOccupied ? 'border-amber-500/30 bg-amber-500/5' : 'border-dashed border-gray-600 bg-gray-800/30'}`}>
      <CardContent className="p-4">
        {slot.isOccupied && slot.tool ? (
          // Occupied Slot
          <div>
            <div className="flex items-start justify-between mb-3">
              <div>
                <h3 className="font-semibold text-white">{slot.tool.name}</h3>
                <p className="text-sm text-gray-400">{slot.tool.description}</p>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge size="xs" className={getCategoryColor(slot.category)}>
                    {slot.category.replace('_', ' ')}
                  </Badge>
                  <span className="text-xs text-gray-500">by {slot.tool.creator}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-1">
                <Button size="sm" variant="ghost" onClick={onEdit}>
                  <Settings className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" onClick={onRemove} className="text-red-400 hover:text-red-300">
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="text-center p-2 bg-gray-800/50 rounded">
                <div className="text-sm font-semibold text-white">{slot.tool.usageCount}</div>
                <div className="text-xs text-gray-400">Uses</div>
              </div>
              <div className="text-center p-2 bg-gray-800/50 rounded">
                <div className={`text-sm font-semibold ${slot.tool.isActive ? 'text-green-400' : 'text-gray-400'}`}>
                  {slot.tool.isActive ? 'Active' : 'Inactive'}
                </div>
                <div className="text-xs text-gray-400">Status</div>
              </div>
            </div>
          </div>
        ) : (
          // Empty Slot
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 border-2 border-dashed border-gray-600 rounded-lg flex items-center justify-center">
              <Plus className="w-6 h-6 text-gray-600" />
            </div>
            <h3 className="font-medium text-gray-400 mb-2">Tool Slot {slot.position}</h3>
            <p className="text-sm text-gray-500 mb-3">Install a tool for your community</p>
            
            <Button size="sm" onClick={onInstall} className="bg-amber-500 hover:bg-amber-600 text-black">
              <Plus className="w-4 h-4 mr-1" />
              Install Tool
            </Button>
            
            {/* Recommended Tools */}
            <div className="mt-3 pt-3 border-t border-gray-700">
              <p className="text-xs text-gray-500 mb-2">Recommended for {spaceSubType.replace('_', ' ')}:</p>
              <div className="flex flex-wrap gap-1">
                {recommendedTools.slice(0, 3).map((tool) => (
                  <Badge key={tool} size="xs" variant="outline" className="text-xs">
                    {tool}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const HiveSpaceSurfaceManager: React.FC<HiveSpaceSurfaceManagerProps> = ({
  space,
  onUpdateSurface,
  onRemoveTool,
  enableFeatureFlag = true
}) => {
  const [activeTab, setActiveTab] = useState<'surfaces' | 'tools'>('surfaces');

  // Feature flag check
  if (!enableFeatureFlag) {
    return (
      <div className="text-center py-8">
        <Settings className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400">Space surface management is not available</p>
      </div>
    );
  }

  const handleSurfaceToggle = useCallback(async (surface: SpaceSurface) => {
    await onUpdateSurface(surface.id, { isEnabled: !surface.isEnabled });
  }, [onUpdateSurface]);

  const handleToolInstall = useCallback(async (slot: ToolSlot) => {
    // This would open a tool marketplace modal
    // setSelectedSlot(slot);
    // For now, just log the action
    console.log('Install tool in slot:', slot.id);
  }, []);

  const handleToolRemove = useCallback(async (slot: ToolSlot) => {
    await onRemoveTool(slot.id);
  }, [onRemoveTool]);

  const getSpaceTypeInfo = () => {
    const typeColors = {
      university_spaces: 'text-blue-400',
      residential_spaces: 'text-orange-400',
      greek_life_spaces: 'text-purple-400',
      student_spaces: 'text-pink-400',
    };

    const typeIcons = {
      university_spaces: GraduationCap,
      residential_spaces: Home,
      greek_life_spaces: Users,
      student_spaces: Heart,
    };

    const TypeIcon = typeIcons[space.type];

    return {
      color: typeColors[space.type],
      icon: <TypeIcon className="w-5 h-5" />,
      label: space.type.replace('_', ' '),
      subLabel: space.subType.replace('_', ' ')
    };
  };

  const typeInfo = getSpaceTypeInfo();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className={`p-2 rounded-lg bg-gray-800 ${typeInfo.color}`}>
              {typeInfo.icon}
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{space.name}</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span className="capitalize">{typeInfo.subLabel}</span>
                <span>•</span>
                <span>{space.memberCount} members</span>
                <span>•</span>
                <span>{space.toolSlots.filter(s => s.isOccupied).length}/{space.maxToolSlots} tools</span>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            className="border-gray-600 text-gray-300"
          >
            <Eye className="w-4 h-4 mr-2" />
            Preview Space
          </Button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center bg-gray-800/50 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('surfaces')}
          className={`flex-1 px-4 py-2 text-sm rounded-md transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'surfaces'
              ? 'bg-blue-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" />
          <span>Six Surfaces</span>
          <Badge size="xs" className={activeTab === 'surfaces' ? 'bg-white/20' : 'bg-gray-700'}>
            {space.surfaces.filter(s => s.isEnabled).length}/6
          </Badge>
        </button>
        <button
          onClick={() => setActiveTab('tools')}
          className={`flex-1 px-4 py-2 text-sm rounded-md transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'tools'
              ? 'bg-amber-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>Tool Slots</span>
          <Badge size="xs" className={activeTab === 'tools' ? 'bg-white/20' : 'bg-gray-700'}>
            {space.toolSlots.filter(s => s.isOccupied).length}/{space.maxToolSlots}
          </Badge>
        </button>
      </div>

      {/* Content */}
      {activeTab === 'surfaces' ? (
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">The Six Surfaces</h3>
            <p className="text-gray-400 text-sm">
              Every HIVE space has six consistent surfaces. Enable and configure each surface for your community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {space.surfaces.map((surface) => (
              <SurfaceCard
                key={surface.id}
                surface={surface}
                onToggle={() => handleSurfaceToggle(surface)}
                onEdit={() => {/* setSelectedSurface(surface) */}}
              />
            ))}
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-white mb-2">Tool Slots ({space.toolSlots.filter(s => s.isOccupied).length}/{space.maxToolSlots})</h3>
            <p className="text-gray-400 text-sm">
              Tools provide all functional capabilities within your space. Install tools that help your community coordinate and collaborate.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {space.toolSlots.map((slot) => (
              <ToolSlotCard
                key={slot.id}
                slot={slot}
                spaceType={space.type}
                spaceSubType={space.subType}
                onInstall={() => handleToolInstall(slot)}
                onRemove={() => handleToolRemove(slot)}
                onEdit={() => {/* setSelectedSlot(slot) */}}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
