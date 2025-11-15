/**
 * HIVE Strict Space Enforcement System
 * RUTHLESS enforcement of the four-category space system - NO EXCEPTIONS
 */

"use client";

import React, { useState, useEffect, useCallback } from "react";
import { Button as Button, HiveCard as Card, CardContent, CardHeader, CardTitle, Badge } from "@hive/ui";
import { useAdminAuth } from "@/lib/auth";
import { 
  AlertTriangle,
  XCircle,
  CheckCircle,
  Shield,
  Lock,
  Trash2,
  Archive,
  Flag,
  Users,
  GraduationCap,
  Home,
  Heart,
  Database,
  RefreshCw,
  Search,
  Ban,
  Zap,
} from 'lucide-react';

// STRICT TYPE DEFINITIONS - NO DEVIATION ALLOWED
type ValidSpaceType = 'university_spaces' | 'residential_spaces' | 'greek_life_spaces' | 'student_spaces';

type ValidSpaceSubType = 
  // University Spaces ONLY
  | 'academic_major' 
  | 'class_year' 
  | 'university_organization'
  // Residential Spaces ONLY  
  | 'dorm_building'
  | 'off_campus_area'
  // Greek Life Spaces ONLY
  | 'greek_chapter'
  | 'greek_council'
  // Student Spaces ONLY
  | 'student_club'
  | 'interest_community';


interface StrictHiveSpace {
  id: string;
  name: string;
  type: ValidSpaceType;
  subType: ValidSpaceSubType;
  status: 'compliant' | 'violation' | 'pending_deletion' | 'quarantined';
  memberCount: number;
  createdAt: string;
  lastAudit: string;
  violations: SpaceViolation[];
  isSystemGenerated: boolean; // Only system can create certain spaces
  complianceScore: number; // 0-100
}

interface SpaceViolation {
  id: string;
  type: 'invalid_space_type' | 'forbidden_functionality' | 'improper_categorization' | 'duplicate_space' | 'missing_required_surfaces';
  severity: 'critical' | 'high' | 'medium' | 'low';
  description: string;
  detectedAt: string;
  autoFixable: boolean;
  requiresAdmin: boolean;
}

interface NonCompliantSpace {
  id: string;
  name: string;
  currentType: string;
  suggestedAction: 'delete' | 'merge' | 'convert_to_tool' | 'quarantine';
  reason: string;
  affectedUsers: number;
  dataToMigrate?: {
    posts: number;
    files: number;
    events: number;
    members: number;
  };
}

// STRICT SPACE DEFINITIONS - THESE ARE THE ONLY ALLOWED SPACES
const ALLOWED_SPACE_CONFIGURATIONS: Record<ValidSpaceType, {
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  allowedSubTypes: ValidSpaceSubType[];
  maxInstances: number | 'unlimited';
  systemGenerated: boolean;
  requiredSurfaces: string[];
}> = {
  university_spaces: {
    label: 'University Spaces',
    description: 'Academic majors, class years, and university organizations ONLY',
    icon: GraduationCap,
    allowedSubTypes: ['academic_major', 'class_year', 'university_organization'],
    maxInstances: 'unlimited',
    systemGenerated: true, // Only system creates these based on university data
    requiredSurfaces: ['post_board', 'tools', 'events', 'members', 'resources', 'about']
  },
  residential_spaces: {
    label: 'Residential Spaces',
    description: 'Building-level communities and off-campus areas ONLY',
    icon: Home,
    allowedSubTypes: ['dorm_building', 'off_campus_area'],
    maxInstances: 'unlimited',
    systemGenerated: true, // Only system creates these based on housing data
    requiredSurfaces: ['post_board', 'tools', 'events', 'members', 'resources', 'about']
  },
  greek_life_spaces: {
    label: 'Greek Life Spaces',
    description: 'Individual chapters and Greek councils ONLY',
    icon: Users,
    allowedSubTypes: ['greek_chapter', 'greek_council'],
    maxInstances: 'unlimited',
    systemGenerated: false, // Can be created by request
    requiredSurfaces: ['post_board', 'tools', 'events', 'members', 'resources', 'about']
  },
  student_spaces: {
    label: 'Student Spaces',
    description: 'Clubs, organizations, and interest communities ONLY',
    icon: Heart,
    allowedSubTypes: ['student_club', 'interest_community'],
    maxInstances: 'unlimited',
    systemGenerated: false, // Can be created by request
    requiredSurfaces: ['post_board', 'tools', 'events', 'members', 'resources', 'about']
  }
};

// FORBIDDEN FUNCTIONALITY - THESE MUST BE TOOLS, NOT SPACES
const FORBIDDEN_AS_SPACES = [
  'Study Groups → Study Group Matcher Tool',
  'Project Teams → Project Coordinator Tool',
  'Floor Communities → Floor Coordination Tool',
  'Course Sections → Course Coordination Tool',
  'Event Groups → Event Planning Tool',
  'Special Interest Meetings → Group Formation Tool',
  'Tutoring Groups → Tutoring Matcher Tool',
  'Research Groups → Research Collaboration Tool',
  'Career Prep → Career Planning Tool',
  'Interview Practice → Interview Coordinator Tool'
];

interface HiveStrictSpaceEnforcerProps {
  onForceCompliance: (spaceId: string, action: 'delete' | 'convert' | 'merge') => Promise<void>;
  onAuditAllSpaces: () => Promise<void>;
  enableFeatureFlag?: boolean;
}

const SpaceViolationCard: React.FC<{
  space: NonCompliantSpace;
  onResolve: (spaceId: string, action: string) => void;
}> = ({ space, onResolve }) => {
  const getSeverityColor = (action: NonCompliantSpace['suggestedAction']) => {
    switch (action) {
      case 'delete': return 'border-red-500 bg-red-500/10';
      case 'quarantine': return 'border-orange-500 bg-orange-500/10';
      case 'convert_to_tool': return 'border-yellow-500 bg-yellow-500/10';
      case 'merge': return 'border-blue-500 bg-blue-500/10';
      default: return 'border-gray-500 bg-gray-500/10';
    }
  };

  const getActionIcon = (action: NonCompliantSpace['suggestedAction']) => {
    switch (action) {
      case 'delete': return <Trash2 className="w-4 h-4 text-red-400" />;
      case 'quarantine': return <Lock className="w-4 h-4 text-orange-400" />;
      case 'convert_to_tool': return <Zap className="w-4 h-4 text-yellow-400" />;
      case 'merge': return <Archive className="w-4 h-4 text-blue-400" />;
      default: return <Flag className="w-4 h-4" />;
    }
  };

  const getActionLabel = (action: NonCompliantSpace['suggestedAction']) => {
    switch (action) {
      case 'delete': return 'DELETE SPACE';
      case 'quarantine': return 'QUARANTINE';
      case 'convert_to_tool': return 'CONVERT TO TOOL';
      case 'merge': return 'MERGE INTO VALID SPACE';
      default: return 'RESOLVE';
    }
  };

  return (
    <Card className={`border-2 ${getSeverityColor(space.suggestedAction)}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <AlertTriangle className="w-5 h-5 text-red-400" />
              <h3 className="font-semibold text-white">{space.name}</h3>
            </div>
            <p className="text-sm text-gray-400 mb-2">Current Type: <span className="text-red-400">{space.currentType}</span></p>
            <p className="text-sm text-gray-300">{space.reason}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            {getActionIcon(space.suggestedAction)}
          </div>
        </div>

        {space.dataToMigrate && (
          <div className="mb-3 p-2 bg-gray-800/50 rounded">
            <p className="text-xs text-gray-400 mb-1">Data to migrate:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <span>{space.dataToMigrate.posts} posts</span>
              <span>{space.dataToMigrate.files} files</span>
              <span>{space.dataToMigrate.events} events</span>
              <span>{space.dataToMigrate.members} members</span>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400">
            {space.affectedUsers} users affected
          </div>
          
          <Button
            size="sm"
            onClick={() => onResolve(space.id, space.suggestedAction)}
            className={`${
              space.suggestedAction === 'delete' 
                ? 'bg-red-600 hover:bg-red-700 text-white' 
                : 'bg-amber-500 hover:bg-amber-600 text-black'
            }`}
          >
            {getActionLabel(space.suggestedAction)}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

const CompliantSpaceCard: React.FC<{
  space: StrictHiveSpace;
}> = ({ space }) => {
  const config = ALLOWED_SPACE_CONFIGURATIONS[space.type];
  const IconComponent = config.icon;

  return (
    <Card className="border-green-500/30 bg-green-500/5">
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-green-500/20">
              <IconComponent className="w-5 h-5 text-green-400" />
            </div>
            <div>
              <h3 className="font-semibold text-white">{space.name}</h3>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <span className="capitalize">{space.subType.replace('_', ' ')}</span>
                <span>•</span>
                <span>{space.memberCount} members</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <CheckCircle className="w-5 h-5 text-green-400" />
            <Badge size="sm" className="bg-green-500/20 text-green-400">
              {space.complianceScore}% compliant
            </Badge>
          </div>
        </div>

        <div className="text-xs text-gray-400">
          Last audit: {new Date(space.lastAudit).toLocaleDateString()}
        </div>
      </CardContent>
    </Card>
  );
};

export const HiveStrictSpaceEnforcer: React.FC<HiveStrictSpaceEnforcerProps> = ({
  onForceCompliance,
  onAuditAllSpaces,
  enableFeatureFlag = true
}) => {
  const { admin } = useAdminAuth();
  const [compliantSpaces, setCompliantSpaces] = useState<StrictHiveSpace[]>([]);
  const [violatingSpaces, setViolatingSpaces] = useState<NonCompliantSpace[]>([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'violations' | 'compliant' | 'forbidden'>('violations');

  // Feature flag check
  if (!enableFeatureFlag) {
    return (
      <div className="text-center py-8">
        <Shield className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-400">Space enforcement system is not available</p>
      </div>
    );
  }

  const runSpaceAudit = useCallback(async () => {
    if (!admin) return;

    setLoading(true);
    try {
      // This would run a comprehensive audit of all spaces
      const response = await fetch('/api/admin/spaces/audit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${admin.id}`,
        },
        body: JSON.stringify({
          action: 'full_audit',
          enforceStrict: true
        }),
      });

      if (!response.ok) {
        throw new Error('Audit failed');
      }

      const data = await response.json();
      setCompliantSpaces(data.compliant || []);
      setViolatingSpaces(data.violations || []);
      
      await onAuditAllSpaces();
    } catch (error) {
      console.error('Space audit failed:', error);
    } finally {
      setLoading(false);
    }
  }, [admin, onAuditAllSpaces]);

  const handleResolveViolation = useCallback(async (spaceId: string, action: string) => {
    await onForceCompliance(spaceId, action as 'delete' | 'convert' | 'merge');
    await runSpaceAudit(); // Re-audit after resolution
  }, [onForceCompliance, runSpaceAudit]);

  useEffect(() => {
    runSpaceAudit();
  }, [runSpaceAudit]);

  const getTabCounts = () => {
    return {
      violations: violatingSpaces.length,
      compliant: compliantSpaces.length,
      forbidden: FORBIDDEN_AS_SPACES.length
    };
  };

  const tabCounts = getTabCounts();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white flex items-center space-x-2">
            <Shield className="w-6 h-6 text-red-400" />
            <span>HIVE Space Enforcement</span>
          </h2>
          <p className="text-gray-400 mt-1">
            Ruthless enforcement of the four-category space system
          </p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            onClick={runSpaceAudit}
            disabled={loading}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {loading ? (
              <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Search className="w-4 h-4 mr-2" />
            )}
            {loading ? 'Auditing...' : 'Run Full Audit'}
          </Button>
        </div>
      </div>

      {/* Critical Alert */}
      {violatingSpaces.length > 0 && (
        <Card className="border-red-500 bg-red-500/10">
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <AlertTriangle className="w-8 h-8 text-red-400" />
              <div>
                <h3 className="font-semibold text-red-400">CRITICAL: Space System Violations Detected</h3>
                <p className="text-sm text-gray-300 mt-1">
                  {violatingSpaces.length} spaces violate HIVE's strict four-category system and must be resolved immediately.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-red-700 bg-red-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-400">Violations</p>
                <p className="text-2xl font-bold text-red-300">{tabCounts.violations}</p>
              </div>
              <XCircle className="w-8 h-8 text-red-400" />
            </div>
          </CardContent>
        </Card>
        
        <Card className="border-green-700 bg-green-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-400">Compliant</p>
                <p className="text-2xl font-bold text-green-300">{tabCounts.compliant}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-700 bg-blue-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-400">Valid Types</p>
                <p className="text-2xl font-bold text-blue-300">4</p>
              </div>
              <Database className="w-8 h-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-700 bg-orange-900/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-400">Forbidden</p>
                <p className="text-2xl font-bold text-orange-300">{tabCounts.forbidden}</p>
              </div>
              <Ban className="w-8 h-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center bg-gray-800/50 rounded-lg p-1">
        <button
          onClick={() => setActiveTab('violations')}
          className={`flex-1 px-4 py-2 text-sm rounded-md transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'violations'
              ? 'bg-red-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <XCircle className="w-4 h-4" />
          <span>Violations</span>
          <Badge size="xs" className={activeTab === 'violations' ? 'bg-white/20' : 'bg-red-500/20 text-red-400'}>
            {tabCounts.violations}
          </Badge>
        </button>
        
        <button
          onClick={() => setActiveTab('compliant')}
          className={`flex-1 px-4 py-2 text-sm rounded-md transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'compliant'
              ? 'bg-green-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <CheckCircle className="w-4 h-4" />
          <span>Compliant Spaces</span>
          <Badge size="xs" className={activeTab === 'compliant' ? 'bg-white/20' : 'bg-green-500/20 text-green-400'}>
            {tabCounts.compliant}
          </Badge>
        </button>

        <button
          onClick={() => setActiveTab('forbidden')}
          className={`flex-1 px-4 py-2 text-sm rounded-md transition-colors flex items-center justify-center gap-2 ${
            activeTab === 'forbidden'
              ? 'bg-orange-600 text-white'
              : 'text-gray-400 hover:text-white'
          }`}
        >
          <Ban className="w-4 h-4" />
          <span>Forbidden as Spaces</span>
        </button>
      </div>

      {/* Content */}
      <div>
        {activeTab === 'violations' && (
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-red-400 mb-2">Space Violations</h3>
              <p className="text-gray-400 text-sm">
                These spaces violate HIVE's strict four-category system and must be resolved.
              </p>
            </div>
            
            {violatingSpaces.length === 0 ? (
              <Card className="border-green-500/30 bg-green-500/5">
                <CardContent className="p-8 text-center">
                  <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-green-400 mb-2">No Violations Found</h3>
                  <p className="text-gray-400">All spaces comply with HIVE's strict four-category system.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {violatingSpaces.map((space) => (
                  <SpaceViolationCard
                    key={space.id}
                    space={space}
                    onResolve={handleResolveViolation}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'compliant' && (
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-green-400 mb-2">Compliant Spaces</h3>
              <p className="text-gray-400 text-sm">
                These spaces properly follow HIVE's four-category system.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {compliantSpaces.map((space) => (
                <CompliantSpaceCard
                  key={space.id}
                  space={space}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'forbidden' && (
          <div>
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-orange-400 mb-2">Forbidden as Spaces</h3>
              <p className="text-gray-400 text-sm">
                These functionalities must be tools within proper community spaces, NOT separate spaces.
              </p>
            </div>
            
            <Card className="border-orange-500/30 bg-orange-500/5">
              <CardContent className="p-6">
                <div className="space-y-3">
                  {FORBIDDEN_AS_SPACES.map((forbidden, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Ban className="w-5 h-5 text-orange-400" />
                        <span className="text-white">{forbidden}</span>
                      </div>
                      <Badge size="sm" className="bg-orange-500/20 text-orange-400">
                        Must be Tool
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      {/* Allowed Space Types Reference */}
      <Card className="border-blue-500/30 bg-blue-500/5">
        <CardHeader>
          <CardTitle className="text-blue-400">ALLOWED SPACE TYPES - REFERENCE</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(ALLOWED_SPACE_CONFIGURATIONS).map(([type, config]) => {
              const IconComponent = config.icon;
              return (
                <div key={type} className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex items-center space-x-3 mb-2">
                    <IconComponent className="w-5 h-5 text-blue-400" />
                    <h4 className="font-semibold text-white">{config.label}</h4>
                  </div>
                  <p className="text-sm text-gray-400 mb-2">{config.description}</p>
                  <div className="flex flex-wrap gap-1">
                    {config.allowedSubTypes.map((subType) => (
                      <Badge key={subType} size="xs" variant="outline" className="text-xs">
                        {subType.replace('_', ' ')}
                      </Badge>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
