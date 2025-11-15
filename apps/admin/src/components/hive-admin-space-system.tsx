/**
 * HIVE Admin Space System - RUTHLESSLY STRICT ENFORCEMENT
 * Only allows the four valid space categories - NO EXCEPTIONS
 */

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button as Button, HiveCard as Card, CardContent, CardHeader, CardTitle, Badge } from "@hive/ui";
import { useAdminAuth } from "@/lib/auth";
import { 
  GraduationCap,
  Home,
  Users,
  Heart,
  Shield,
  CheckCircle,
  Settings,
  Eye,
  Search,
  RefreshCw,
  Database,
  BookOpen,
  Calendar,
  Building,
  MapPin,
  Star,
  Globe,
  MoreVertical,
  Activity,
  TrendingUp
} from 'lucide-react';

// STRICT TYPE ENFORCEMENT - ONLY THESE FOUR CATEGORIES ALLOWED
type ValidSpaceCategory = 'university_spaces' | 'residential_spaces' | 'greek_life_spaces' | 'student_spaces';

type ValidSpaceSubtype = 
  // University Spaces - ONLY these subtypes allowed
  | 'academic_major'     // CS Major, Biology Major, etc.
  | 'class_year'         // Class of 2026, Class of 2027, etc.
  | 'university_organization' // Student Government, University Honors, etc.
  // Residential Spaces - ONLY these subtypes allowed
  | 'dorm_building'      // Ellicott Complex, Governors Hall, etc.
  | 'off_campus_area'    // North Buffalo, South Campus Area, etc.
  // Greek Life Spaces - ONLY these subtypes allowed  
  | 'greek_chapter'      // Alpha Phi, Beta Theta Pi, etc.
  | 'greek_council'      // IFC, Panhellenic, MGC
  // Student Spaces - ONLY these subtypes allowed
  | 'student_club'       // Photography Club, Gaming Society, etc.
  | 'interest_community'; // International Students, Transfer Students, etc.

interface ValidHiveSpace {
  id: string;
  name: string;
  category: ValidSpaceCategory;
  subtype: ValidSpaceSubtype;
  status: 'active' | 'dormant' | 'system_managed';
  memberCount: number;
  activeMembers: number;
  toolsInstalled: number;
  maxToolSlots: number;
  surfaces: {
    post_board: { enabled: boolean; posts: number; lastActivity: string };
    tools: { enabled: boolean; installed: number; maxSlots: number };
    events: { enabled: boolean; upcoming: number; thisMonth: number };
    members: { enabled: boolean; total: number; active: number };
    resources: { enabled: boolean; files: number; folders: number };
    about: { enabled: boolean; lastUpdated: string };
  };
  isSystemGenerated: boolean;
  canUserRequest: boolean;
  createdAt: string;
  lastActivity: string;
  leadership: {
    primary: { id: string; name: string; handle: string };
    secondary?: { id: string; name: string; handle: string };
  };
  analytics: {
    weeklyActiveUsers: number;
    postsPerWeek: number;
    toolUsage: number;
    engagementScore: number;
  };
}

// STRICT SPACE CATEGORY DEFINITIONS - IMMUTABLE RULES
const SPACE_CATEGORY_RULES: Record<ValidSpaceCategory, {
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  systemGenerated: boolean;
  maxPerUser?: number;
  allowedSubtypes: Array<{
    value: ValidSpaceSubtype;
    label: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    examples: string[];
    autoCreate: boolean;
  }>;
  requiredSurfaces: string[];
  recommendedTools: string[];
}> = {
  university_spaces: {
    label: 'University Spaces',
    description: 'Academic majors, class years, and university organizations ONLY',
    icon: GraduationCap,
    color: 'text-blue-400',
    systemGenerated: true, // ONLY system creates these
    allowedSubtypes: [
      {
        value: 'academic_major',
        label: 'Academic Major',
        description: 'Major-specific community (CS, Biology, etc.)',
        icon: BookOpen,
        examples: ['Computer Science', 'Biology', 'Psychology', 'Business'],
        autoCreate: true // System creates based on university data
      },
      {
        value: 'class_year',
        label: 'Class Year',
        description: 'Graduating class community',
        icon: Calendar,
        examples: ['Class of 2026', 'Class of 2027', 'Class of 2028'],
        autoCreate: true // System creates for each admitted class
      },
      {
        value: 'university_organization',
        label: 'University Organization',
        description: 'Official university organizations',
        icon: Shield,
        examples: ['Student Government', 'University Honors', 'Campus Newspaper'],
        autoCreate: false // Requires admin approval
      }
    ],
    requiredSurfaces: ['post_board', 'tools', 'events', 'members', 'resources', 'about'],
    recommendedTools: ['Study Group Matcher', 'Project Team Builder', 'Course Coordination', 'Career Planning']
  },
  
  residential_spaces: {
    label: 'Residential Spaces',
    description: 'Building-level communities and off-campus areas ONLY',
    icon: Home,
    color: 'text-orange-400',
    systemGenerated: true, // ONLY system creates these
    allowedSubtypes: [
      {
        value: 'dorm_building',
        label: 'Dorm Building',
        description: 'Building-level community',
        icon: Building,
        examples: ['Ellicott Complex', 'Governors Hall', 'Alumni Arena'],
        autoCreate: true // System creates based on housing data
      },
      {
        value: 'off_campus_area',
        label: 'Off-Campus Area',
        description: 'Geographic area community',
        icon: MapPin,
        examples: ['North Buffalo', 'South Campus Area', 'Amherst'],
        autoCreate: true // System creates based on address clustering
      }
    ],
    requiredSurfaces: ['post_board', 'tools', 'events', 'members', 'resources', 'about'],
    recommendedTools: ['Floor Coordination', 'Maintenance Requests', 'Package Tracking', 'Community Guidelines']
  },
  
  greek_life_spaces: {
    label: 'Greek Life Spaces',
    description: 'Individual chapters and Greek councils ONLY',
    icon: Users,
    color: 'text-purple-400',
    systemGenerated: false, // Can be requested
    allowedSubtypes: [
      {
        value: 'greek_chapter',
        label: 'Greek Chapter',
        description: 'Individual fraternity or sorority',
        icon: Star,
        examples: ['Alpha Phi', 'Beta Theta Pi', 'Delta Sigma Theta'],
        autoCreate: false // Requires chapter request + verification
      },
      {
        value: 'greek_council',
        label: 'Greek Council',
        description: 'Governing council',
        icon: Users,
        examples: ['IFC', 'Panhellenic Council', 'MGC'],
        autoCreate: false // Requires admin creation
      }
    ],
    requiredSurfaces: ['post_board', 'tools', 'events', 'members', 'resources', 'about'],
    recommendedTools: ['Recruitment Tools', 'Chapter Management', 'Event RSVP', 'Brotherhood/Sisterhood Tools']
  },
  
  student_spaces: {
    label: 'Student Spaces', 
    description: 'Clubs, organizations, and interest communities ONLY',
    icon: Heart,
    color: 'text-pink-400',
    systemGenerated: false, // Can be requested
    maxPerUser: 5, // Students can request max 5 spaces
    allowedSubtypes: [
      {
        value: 'student_club',
        label: 'Student Club',
        description: 'Official student organization',
        icon: Heart,
        examples: ['Photography Club', 'Mock Trial Club', 'Investment Club'],
        autoCreate: false // Requires student request + approval
      },
      {
        value: 'interest_community', 
        label: 'Interest Community',
        description: 'Identity or interest-based community',
        icon: Globe,
        examples: ['International Students', 'Transfer Students', 'First-Gen Students'],
        autoCreate: false // Requires student request + approval
      }
    ],
    requiredSurfaces: ['post_board', 'tools', 'events', 'members', 'resources', 'about'],
    recommendedTools: ['Member Directory', 'Project Collaboration', 'Meeting Scheduler', 'Interest Matching']
  }
};

interface HiveAdminSpaceSystemProps {
  onCreateSpace?: (category: ValidSpaceCategory, subtype: ValidSpaceSubtype, name: string) => Promise<void>;
  onUpdateSpace?: (spaceId: string, updates: Partial<ValidHiveSpace>) => Promise<void>;
  onDeleteSpace?: (spaceId: string) => Promise<void>;
  onAuditSpace?: (spaceId: string) => Promise<void>;
  enableFeatureFlag?: boolean;
}

const SpaceCard: React.FC<{
  space: ValidHiveSpace;
  onViewDetails: () => void;
  onEdit: () => void;
  onAudit: () => void;
}> = ({ space, onViewDetails, onEdit, onAudit }) => {
  const [showMenu, setShowMenu] = useState(false);
  const categoryRule = SPACE_CATEGORY_RULES[space.category];
  const subtypeRule = categoryRule.allowedSubtypes.find(s => s.value === space.subtype);
  
  // const CategoryIcon = categoryRule.icon;
  const SubtypeIcon = subtypeRule?.icon || categoryRule.icon;

  const getStatusColor = (status: ValidHiveSpace['status']) => {
    switch (status) {
      case 'active': return 'bg-green-500';
      case 'dormant': return 'bg-yellow-500'; 
      case 'system_managed': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getSurfaceEnabledCount = () => {
    return Object.values(space.surfaces).filter(surface => surface.enabled).length;
  };

  const getEngagementColor = (score: number) => {
    if (score >= 80) return 'text-green-400';
    if (score >= 60) return 'text-yellow-400';
    if (score >= 40) return 'text-orange-400';
    return 'text-red-400';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 bg-gray-900/50 border border-gray-700 rounded-xl hover:bg-gray-800/50 transition-all cursor-pointer group"
      onClick={onViewDetails}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start space-x-3 flex-1">
          <div className={`p-2 rounded-lg bg-gray-800 ${categoryRule.color}`}>
            <SubtypeIcon className="w-5 h-5" />
          </div>
          <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className="font-semibold text-white truncate">{space.name}</h3>
                <div className={`w-2 h-2 rounded-full ${getStatusColor(space.status)}`} />
                {space.isSystemGenerated && (
                  <Shield
                    className="w-4 h-4 text-blue-400"
                    aria-label="System Generated"
                  />
                )}
              </div>
            <div className="flex items-center space-x-2 text-sm text-gray-400">
              <span className="capitalize">{space.subtype.replace('_', ' ')}</span>
              <span>•</span>
              <span className={categoryRule.color}>{categoryRule.label}</span>
            </div>
          </div>
        </div>

        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              setShowMenu(!showMenu);
            }}
            className="opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="w-4 h-4" />
          </Button>

          <AnimatePresence>
            {showMenu && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                className="absolute top-full right-0 mt-1 bg-gray-800 border border-gray-600 rounded-lg shadow-lg py-1 z-20 min-w-[140px]"
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onViewDetails();
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View Details
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onEdit();
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Manage Surfaces
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onAudit();
                    setShowMenu(false);
                  }}
                  className="w-full px-3 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Audit Space
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
        <div className="text-center p-2 bg-gray-800/50 rounded">
          <div className="text-sm font-semibold text-white">{space.memberCount}</div>
          <div className="text-xs text-gray-400">Members</div>
        </div>
        <div className="text-center p-2 bg-gray-800/50 rounded">
          <div className="text-sm font-semibold text-green-400">{space.activeMembers}</div>
          <div className="text-xs text-gray-400">Active</div>
        </div>
        <div className="text-center p-2 bg-gray-800/50 rounded">
          <div className="text-sm font-semibold text-amber-400">{space.toolsInstalled}/{space.maxToolSlots}</div>
          <div className="text-xs text-gray-400">Tools</div>
        </div>
        <div className="text-center p-2 bg-gray-800/50 rounded">
          <div className="text-sm font-semibold text-blue-400">{getSurfaceEnabledCount()}/6</div>
          <div className="text-xs text-gray-400">Surfaces</div>
        </div>
      </div>

      {/* Six Surfaces Status */}
      <div className="mb-3">
        <div className="flex items-center justify-between text-xs text-gray-400 mb-1">
          <span>Six Surfaces Status</span>
          <span>{getSurfaceEnabledCount()}/6 enabled</span>
        </div>
        <div className="grid grid-cols-6 gap-1">
          {Object.entries(space.surfaces).map(([surface, data]) => (
            <div
              key={surface}
              className={`h-2 rounded-full ${data.enabled ? 'bg-green-500' : 'bg-gray-600'}`}
              title={`${surface.replace('_', ' ')}: ${data.enabled ? 'enabled' : 'disabled'}`}
            />
          ))}
        </div>
      </div>

      {/* Analytics */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1">
            <Activity className="w-3 h-3 text-gray-400" />
            <span className={getEngagementColor(space.analytics.engagementScore)}>
              {space.analytics.engagementScore}% engagement
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <TrendingUp className="w-3 h-3 text-gray-400" />
            <span className="text-gray-300">{space.analytics.weeklyActiveUsers} weekly</span>
          </div>
        </div>
        <div className="text-gray-400">
          {new Date(space.lastActivity).toLocaleDateString()}
        </div>
      </div>

      {/* Leadership */}
      <div className="mt-3 pt-3 border-t border-gray-700">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-2">
            <span className="text-gray-400">Leader:</span>
            <span className="text-white">{space.leadership.primary.name}</span>
          </div>
          {space.leadership.secondary && (
            <div className="flex items-center space-x-2">
              <span className="text-gray-400">Co-Leader:</span>
              <span className="text-white">{space.leadership.secondary.name}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const HiveAdminSpaceSystem: React.FC<HiveAdminSpaceSystemProps> = ({
  // onCreateSpace,
  // onUpdateSpace,
  // onDeleteSpace,
  onAuditSpace,
  enableFeatureFlag = true
}) => {
  const { admin } = useAdminAuth();
  const [spaces, setSpaces] = useState<ValidHiveSpace[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ValidSpaceCategory | 'all'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  // const [showCreateModal, setShowCreateModal] = useState(false);

  // Feature flag check
  if (!enableFeatureFlag) {
    return (
      <div className="text-center py-8">
        <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400">Space system management is not available</p>
      </div>
    );
  }

  const loadSpaces = useCallback(async () => {
    if (!admin) return;

    setLoading(true);
    try {
      const response = await fetch('/api/admin/spaces/valid', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${admin.id}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to load spaces');
      }

      const data = await response.json();
      setSpaces(data.spaces || []);
    } catch (error) {
      console.error('Failed to load spaces:', error);
    } finally {
      setLoading(false);
    }
  }, [admin]);

  useEffect(() => {
    loadSpaces();
  }, [loadSpaces]);

  const filteredSpaces = spaces.filter(space => {
    const matchesCategory = selectedCategory === 'all' || space.category === selectedCategory;
    const matchesSearch = searchTerm === '' || 
      space.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      space.subtype.includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getSpaceStats = () => {
    const stats = {
      total: spaces.length,
      active: spaces.filter(s => s.status === 'active').length,
      dormant: spaces.filter(s => s.status === 'dormant').length,
      systemManaged: spaces.filter(s => s.isSystemGenerated).length,
    };

    const byCategory = Object.keys(SPACE_CATEGORY_RULES).reduce((acc, category) => {
      acc[category as ValidSpaceCategory] = spaces.filter(s => s.category === category).length;
      return acc;
    }, {} as Record<ValidSpaceCategory, number>);

    return { ...stats, byCategory };
  };

  const stats = getSpaceStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">HIVE Space System</h2>
          <p className="text-gray-400 mt-1">
            Strict four-category space management - Community containers only
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            onClick={loadSpaces}
            disabled={loading}
            variant="outline"
            className="border-gray-600 text-gray-300"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            Refresh
          </Button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-gray-700 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Total Spaces</p>
                <p className="text-2xl font-bold text-white">{stats.total}</p>
              </div>
              <Database className="w-8 h-8 text-gray-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-gray-700 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Active</p>
                <p className="text-2xl font-bold text-green-400">{stats.active}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">System Managed</p>
                <p className="text-2xl font-bold text-blue-400">{stats.systemManaged}</p>
              </div>
              <Shield className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-700 bg-gray-900/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-400">Categories</p>
                <p className="text-2xl font-bold text-purple-400">4</p>
              </div>
              <Settings className="w-8 h-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Category Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {Object.entries(SPACE_CATEGORY_RULES).map(([category, rule]) => {
          const IconComponent = rule.icon;
          const count = stats.byCategory[category as ValidSpaceCategory] || 0;
          
          return (
            <Card 
              key={category}
              className={`border transition-all cursor-pointer ${
                selectedCategory === category 
                  ? 'border-amber-500 bg-amber-500/5' 
                  : 'border-gray-700 bg-gray-900/50 hover:bg-gray-800/50'
              }`}
              onClick={() => setSelectedCategory(selectedCategory === category ? 'all' : category as ValidSpaceCategory)}
            >
              <CardContent className="p-4">
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`p-2 rounded-lg bg-gray-800 ${rule.color}`}>
                    <IconComponent className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white">{rule.label}</h3>
                    <p className="text-sm text-gray-400">{count} spaces</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500">{rule.description}</p>
                
                <div className="mt-2 flex flex-wrap gap-1">
                  {rule.allowedSubtypes.slice(0, 2).map((subtype) => (
                    <Badge key={subtype.value} size="xs" variant="outline" className="text-xs">
                      {subtype.label}
                    </Badge>
                  ))}
                  {rule.allowedSubtypes.length > 2 && (
                    <Badge size="xs" variant="outline" className="text-xs">
                      +{rule.allowedSubtypes.length - 2}
                    </Badge>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Search and Filters */}
      <Card className="border-gray-700 bg-gray-900/50">
        <CardContent className="p-4">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search spaces by name or type..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
              />
            </div>
            
            <Button
              onClick={() => setSelectedCategory('all')}
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              className={selectedCategory === 'all' ? 'bg-amber-500 text-black' : 'border-gray-600 text-gray-300'}
            >
              All Categories ({stats.total})
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Spaces List */}
      <Card className="border-gray-700 bg-gray-900/50">
        <CardHeader>
          <CardTitle className="text-white">
            {selectedCategory === 'all' 
              ? `All Spaces (${filteredSpaces.length})`
              : `${SPACE_CATEGORY_RULES[selectedCategory]?.label} (${filteredSpaces.length})`
            }
          </CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">
              <RefreshCw className="w-8 h-8 text-amber-500 mx-auto mb-4 animate-spin" />
              <p className="text-gray-400">Loading spaces...</p>
            </div>
          ) : filteredSpaces.length === 0 ? (
            <div className="text-center py-12">
              <Database className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-white mb-2">No spaces found</h3>
              <p className="text-gray-400">
                {searchTerm ? 'Try adjusting your search' : 'No spaces in this category'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredSpaces.map((space) => (
                <SpaceCard
                  key={space.id}
                  space={space}
                  onViewDetails={() => console.log('View details:', space.id)}
                  onEdit={() => console.log('Edit space:', space.id)}
                  onAudit={() => onAuditSpace?.(space.id)}
                />
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* STRICT RULES REFERENCE */}
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center space-x-2">
            <Shield className="w-5 h-5" />
            <span>STRICT SPACE SYSTEM RULES</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
              <h4 className="font-semibold text-green-400 mb-2">✅ SPACES ARE COMMUNITY CONTAINERS</h4>
              <p className="text-sm text-gray-300">
                Spaces exist only to contain communities. All functionality happens through tools within spaces.
              </p>
            </div>
            
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <h4 className="font-semibold text-red-400 mb-2">❌ FORBIDDEN AS SPACES</h4>
              <p className="text-sm text-gray-300 mb-2">
                These must be tools within proper community spaces, NOT separate spaces:
              </p>
              <div className="grid grid-cols-2 gap-1 text-xs text-gray-400">
                <span>• Study Groups → Study Group Matcher Tool</span>
                <span>• Project Teams → Project Coordinator Tool</span>
                <span>• Floor Communities → Floor Coordination Tool</span>
                <span>• Course Sections → Course Coordination Tool</span>
                <span>• Event Groups → Event Planning Tool</span>
                <span>• Special Interest Meetings → Group Formation Tool</span>
              </div>
            </div>

            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
              <h4 className="font-semibold text-blue-400 mb-2">🔧 SIX SURFACES CONSISTENCY</h4>
              <p className="text-sm text-gray-300 mb-2">
                Every space has exactly six surfaces:
              </p>
              <div className="grid grid-cols-3 gap-2 text-xs text-gray-400">
                <span>• Post Board (social layer)</span>
                <span>• Tools (functionality)</span>
                <span>• Events (calendar view)</span>
                <span>• Members (directory)</span>
                <span>• Resources (file sharing)</span>
                <span>• About (information)</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
