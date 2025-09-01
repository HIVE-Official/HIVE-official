'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../atomic/ui/card';
import { Badge } from '../../atomic/atoms/badge';
import { ButtonEnhanced as Button } from '../../atomic/atoms/button-enhanced';
import { Text } from '../../atomic/atoms/text';
import { Icon } from '../../ui/icon';
import { cn } from '../lib/utils';
import { 
  Building2, 
  GraduationCap, 
  Users, 
  Coffee,
  BookOpen,
  Heart,
  Calendar,
  MapPin
} from 'lucide-react';

// =============================================================================
// UB-SPECIFIC SPACE TEMPLATES
// =============================================================================

export interface UBSpaceTemplate {
  id: string;
  name: string;
  category: 'residential' | 'academic' | 'social' | 'athletic' | 'cultural';
  description: string;
  expectedMembers: number;
  icon: React.ComponentType<any>;
  isActive: boolean;
  activationRequest?: {
    requesterName: string;
    requesterEmail: string;
    dateRequested: string;
    leadershipExperience: string;
  };
}

export const UB_SPACE_TEMPLATES: UBSpaceTemplate[] = [
  // Residential Spaces
  {
    id: 'ellicott-complex',
    name: 'Ellicott Complex',
    category: 'residential',
    description: 'North Campus residential community with modern amenities and dining',
    expectedMembers: 1247,
    icon: Building2,
    isActive: false
  },
  {
    id: 'governors-complex',
    name: 'Governors Complex',
    category: 'residential', 
    description: 'South Campus apartment-style living for upperclassmen',
    expectedMembers: 892,
    icon: Building2,
    isActive: true,
    activationRequest: {
      requesterName: 'Sarah Chen',
      requesterEmail: 'schen23@buffalo.edu',
      dateRequested: '2024-08-10',
      leadershipExperience: 'RA in Ellicott, Student Government'
    }
  },
  
  // Academic Spaces
  {
    id: 'cse-department',
    name: 'Computer Science & Engineering',
    category: 'academic',
    description: 'CSE majors, course coordination, research opportunities, tech events',
    expectedMembers: 1456,
    icon: GraduationCap,
    isActive: true,
    activationRequest: {
      requesterName: 'Alex Rodriguez',
      requesterEmail: 'alexr24@buffalo.edu', 
      dateRequested: '2024-08-08',
      leadershipExperience: 'ACM President, CS Teaching Assistant'
    }
  },
  {
    id: 'engineering-school',
    name: 'School of Engineering',
    category: 'academic',
    description: 'All engineering majors, cross-disciplinary projects, career resources',
    expectedMembers: 2341,
    icon: GraduationCap,
    isActive: false
  },
  
  // Social/Cultural Spaces
  {
    id: 'student-union',
    name: 'Student Union Community',
    category: 'social',
    description: 'Campus events, student organizations, dining and social coordination',
    expectedMembers: 3456,
    icon: Users,
    isActive: false
  },
  {
    id: 'international-students',
    name: 'International Student Community',
    category: 'cultural',
    description: 'Support network for international students, cultural events, visa help',
    expectedMembers: 2103,
    icon: Heart,
    isActive: false
  }
];

// =============================================================================
// UB SPACE TEMPLATE CARD COMPONENT
// =============================================================================

interface UBSpaceTemplateCardProps {
  space: UBSpaceTemplate;
  onRequestActivation?: (spaceId: string) => void;
  onViewDetails?: (spaceId: string) => void;
  className?: string;
}

export function UBSpaceTemplateCard({ 
  space, 
  onRequestActivation,
  onViewDetails,
  className 
}: UBSpaceTemplateCardProps) {
  const IconComponent = space.icon;
  
  return (
    <Card className={cn(
      "group hover:shadow-lg transition-all duration-200",
      "border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]",
      space.isActive && "ring-2 ring-[var(--hive-brand-secondary)] ring-opacity-20",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              "p-2 rounded-lg",
              space.isActive 
                ? "bg-[var(--hive-brand-secondary)] bg-opacity-10" 
                : "bg-[var(--hive-background-tertiary)]"
            )}>
              <IconComponent className={cn(
                "h-5 w-5",
                space.isActive 
                  ? "text-[var(--hive-brand-secondary)]" 
                  : "text-[var(--hive-text-secondary)]"
              )} />
            </div>
            <div>
              <CardTitle className="text-lg font-semibold text-[var(--hive-text-primary)]">
                {space.name}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <Badge variant="secondary" className="text-xs">
                  {space.category}
                </Badge>
                {space.isActive && (
                  <Badge variant="success" className="text-xs">
                    Active
                  </Badge>
                )}
              </div>
            </div>
          </div>
          
          <div className="text-right">
            <Text variant="body-sm" color="secondary">
              {space.expectedMembers.toLocaleString()} students
            </Text>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="pt-0">
        <Text variant="body-sm" color="secondary" className="mb-4">
          {space.description}
        </Text>
        
        {space.isActive && space.activationRequest && (
          <div className="mb-4 p-3 rounded-lg bg-[var(--hive-background-primary)] border border-[var(--hive-border-default)]">
            <div className="flex items-center gap-2 mb-2">
              <Icon 
                icon={Users} 
                size="sm" 
                color="primary" 
              />
              <Text variant="body-sm" weight="medium">
                Led by {space.activationRequest.requesterName}
              </Text>
            </div>
            <Text variant="body-xs" color="secondary">
              {space.activationRequest.leadershipExperience}
            </Text>
          </div>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon 
              icon={MapPin} 
              size="sm" 
              color="secondary" 
            />
            <Text variant="body-xs" color="secondary">
              University at Buffalo
            </Text>
          </div>
          
          <div className="flex items-center gap-2">
            {space.isActive ? (
              <ButtonEnhanced
                variant="primary"
                size="sm"
                onClick={() => onViewDetails?.(space.id)}
              >
                Join Space
              </ButtonEnhanced>
            ) : (
              <ButtonEnhanced
                variant="secondary"
                size="sm"
                onClick={() => onRequestActivation?.(space.id)}
              >
                Request to Lead
              </ButtonEnhanced>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// =============================================================================
// UB SPACES DIRECTORY COMPONENT
// =============================================================================

interface UBSpacesDirectoryProps {
  spaces?: UBSpaceTemplate[];
  onRequestActivation?: (spaceId: string) => void;
  onViewDetails?: (spaceId: string) => void;
  filterCategory?: string;
  className?: string;
}

export function UBSpacesDirectory({ 
  spaces = UB_SPACE_TEMPLATES,
  onRequestActivation,
  onViewDetails,
  filterCategory,
  className 
}: UBSpacesDirectoryProps) {
  const filteredSpaces = filterCategory 
    ? spaces.filter(space => space.category === filterCategory)
    : spaces;
    
  const activeSpaces = filteredSpaces.filter(space => space.isActive);
  const previewSpaces = filteredSpaces.filter(space => !space.isActive);
  
  return (
    <div className={cn("space-y-6", className)}>
      {/* Active Spaces */}
      {activeSpaces.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Icon 
              icon={Calendar} 
              size="sm" 
              color="primary" 
            />
            <Text variant="h3" weight="semibold">
              Active Communities
            </Text>
            <Badge variant="success">
              {activeSpaces.length}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {activeSpaces.map((space) => (
              <UBSpaceTemplateCard
                key={space.id}
                space={space}
                onRequestActivation={onRequestActivation}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </div>
      )}
      
      {/* Preview Spaces */}
      {previewSpaces.length > 0 && (
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Icon 
              icon={BookOpen} 
              size="sm" 
              color="secondary" 
            />
            <Text variant="h3" weight="semibold">
              Coming Soon
            </Text>
            <Badge variant="secondary">
              {previewSpaces.length}
            </Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {previewSpaces.map((space) => (
              <UBSpaceTemplateCard
                key={space.id}
                space={space}
                onRequestActivation={onRequestActivation}
                onViewDetails={onViewDetails}
              />
            ))}
          </div>
        </div>
      )}
      
      {filteredSpaces.length === 0 && (
        <div className="text-center py-12">
          <Icon 
            icon={Coffee} 
            size="lg" 
            color="secondary" 
            className="mx-auto mb-4" 
          />
          <Text variant="h3" color="secondary" className="mb-2">
            No spaces found
          </Text>
          <Text variant="body-sm" color="secondary">
            Try adjusting your filter or check back later for new communities.
          </Text>
        </div>
      )}
    </div>
  );
}

// =============================================================================
// SPACE ACTIVATION REQUEST MODAL
// =============================================================================

interface SpaceActivationModalProps {
  spaceId: string;
  spaceName: string;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: ActivationRequestData) => void;
}

export interface ActivationRequestData {
  leadershipExperience: string;
  communityVision: string;
  commitmentLevel: string;
  contactInfo: string;
}

export function SpaceActivationModal({ 
  spaceId, 
  spaceName, 
  isOpen, 
  onClose, 
  onSubmit 
}: SpaceActivationModalProps) {
  const [formData, setFormData] = React.useState<ActivationRequestData>({
    leadershipExperience: '',
    communityVision: '',
    commitmentLevel: '',
    contactInfo: ''
  });
  
  if (!isOpen) return null;
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Icon icon={Users} size="sm" color="primary" />
            Request to Lead: {spaceName}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <Text variant="body-sm" color="secondary">
            Help us understand why you'd be a great leader for this UB community.
          </Text>
          
          {/* Form would go here - keeping this as a placeholder for now */}
          <div className="space-y-4">
            <div>
              <Text variant="body-sm" weight="medium" className="mb-2">
                Leadership Experience
              </Text>
              <textarea
                value={formData.leadershipExperience}
                onChange={(e) => setFormData(prev => ({ ...prev, leadershipExperience: e.target.value }))}
                placeholder="Describe your leadership experience at UB or elsewhere..."
                className="w-full p-3 border border-[var(--hive-border-default)] rounded-lg bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]"
                rows={3}
              />
            </div>
            
            <div>
              <Text variant="body-sm" weight="medium" className="mb-2">
                Community Vision
              </Text>
              <textarea
                value={formData.communityVision}
                onChange={(e) => setFormData(prev => ({ ...prev, communityVision: e.target.value }))}
                placeholder="What's your vision for this community? How will you help UB students connect and succeed?"
                className="w-full p-3 border border-[var(--hive-border-default)] rounded-lg bg-[var(--hive-background-secondary)] text-[var(--hive-text-primary)]"
                rows={4}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-3 pt-4">
            <ButtonEnhanced
              variant="secondary"
              onClick={onClose}
            >
              Cancel
            </ButtonEnhanced>
            <ButtonEnhanced
              variant="primary"
              onClick={() => onSubmit(formData)}
            >
              Submit Request
            </ButtonEnhanced>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}