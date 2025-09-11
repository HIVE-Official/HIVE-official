"use client";

import { useState } from "react";
import { Modal, Button, Card, Badge, Input } from "@hive/ui";
import { Alert } from "@/components/temp-stubs";
import { authenticatedFetch } from "@/lib/auth-utils";
import { 
  ArrowRight, 
  ArrowLeft,
  Check,
  Users,
  Lock,
  Globe,
  Shield,
  Settings,
  Mail,
  Plus,
  X,
  AlertCircle,
  BookOpen,
  Home,
  Briefcase,
  Trophy,
  Hammer,
  Loader2
} from "lucide-react";

// State Management
import { useUIStore, useAuthStore } from '@hive/hooks';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface CreateSpaceData {
  type: SpaceType;
  name: string;
  description: string;
  avatar?: string;
  banner?: string;
  visibility: 'public' | 'private' | 'invite_only';
  joinProcess: 'instant' | 'approval' | 'invite_only';
  rules: string[];
  tools: string[];
  foundingMembers: string[];
  customizations: {
    primaryColor?: string;
    category?: string;
    tags?: string[];
  };
}

type SpaceType = 'academic' | 'residential' | 'greek' | 'interest' | 'professional';

const SPACE_TYPES: Array<{
  id: SpaceType;
  name: string;
  description: string;
  icon: React.ElementType;
  color: string;
  examples: string[];
}> = [
  {
    id: 'academic',
    name: 'Academic',
    description: 'Study groups, courses, and academic organizations',
    icon: BookOpen,
    color: 'bg-blue-500',
    examples: ['CS Study Group', 'Pre-Med Society', 'Engineering Club']
  },
  {
    id: 'residential',
    name: 'Residential',
    description: 'Dorm floors, residential communities, and campus living',
    icon: Home,
    color: 'bg-green-500',
    examples: ['Ellicott Floor 3', 'South Campus', 'Commons Residents']
  },
  {
    id: 'greek',
    name: 'Greek Life',
    description: 'Fraternities, sororities, and Greek organizations',
    icon: Shield,
    color: 'bg-[var(--hive-gold)]',
    examples: ['Alpha Beta Gamma', 'Delta Sigma Pi', 'Greek Council']
  },
  {
    id: 'interest',
    name: 'Interest',
    description: 'Hobby groups, clubs, and special interest communities',
    icon: Trophy,
    color: 'bg-[var(--hive-gold)]',
    examples: ['Gaming Club', 'Photography Society', 'Hiking Group']
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Career-focused groups and networking organizations',
    icon: Briefcase,
    color: 'bg-indigo-500',
    examples: ['Business Network', 'Career Services', 'Alumni Connect']
  }
];

interface CreateSpaceModalMigratedProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateSpace?: (space: any) => void;
  isLoading?: boolean;
  error?: string | null;
}

// API function for creating spaces
const createSpace = async (spaceData: Partial<CreateSpaceData>) => {
  // Transform data to match API schema
  const apiData = {
    name: spaceData.name,
    description: spaceData.description,
    type: spaceData.type,
    visibility: spaceData.visibility,
    joinProcess: spaceData.joinProcess,
    rules: spaceData.rules || [],
    avatar: spaceData.avatar,
    bannerUrl: spaceData.banner,
    primaryColor: spaceData.customizations?.primaryColor,
    category: spaceData.customizations?.category,
    tags: spaceData.customizations?.tags?.map(tag => ({
      type: 'general',
      sub_type: tag
    })) || [],
    coordinationTypes: ['study_session', 'meetup'], // Default coordination types
    foundingMembers: spaceData.foundingMembers || []
  };

  const response = await authenticatedFetch('/api/spaces/create', {
    method: 'POST',
    headers: { 
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(apiData),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || 'Failed to create space');
  }
  
  return data.data || data;
};

export function CreateSpaceModal({ isOpen, onClose, onCreateSpace, error: externalError }: CreateSpaceModalMigratedProps) {
  // Global state
  const { addToast } = useUIStore();
  const { profile } = useAuthStore();
  const queryClient = useQueryClient();
  
  // Local form state
  const [currentStep, setCurrentStep] = useState(1);
  const [spaceData, setSpaceData] = useState<CreateSpaceData>({
    type: 'academic',
    name: '',
    description: '',
    visibility: 'public',
    joinProcess: 'instant',
    rules: [],
    tools: [],
    foundingMembers: [],
    customizations: {}
  });

  // React Query mutation for creating space
  const createSpaceMutation = useMutation({
    mutationFn: createSpace,
    onSuccess: (newSpace: any) => {
      // Optimistically update spaces cache
      queryClient.setQueryData(['spaces'], (old: any) => {
        return old ? [...old, { ...newSpace, isMember: true }] : [newSpace];
      });
      
      // Invalidate and refetch spaces
      queryClient.invalidateQueries({ queryKey: ['spaces'] });
      
      addToast({
        title: 'Space Created!',
        description: `${newSpace.name} is now ready for members`,
        type: 'success',
      });
      
      // Call the parent callback if provided
      if (onCreateSpace) {
        onCreateSpace(newSpace);
      }
      
      handleClose();
      
      // Redirect to the new space
      setTimeout(() => {
        window.location.href = `/spaces/${newSpace.id}`;
      }, 500);
    },
    onError: (error: any) => {
      addToast({
        title: 'Failed to create space',
        description: error.message || 'Something went wrong',
        type: 'error',
      });
    },
  });

  const handleClose = () => {
    setCurrentStep(1);
    setSpaceData({
      type: 'academic',
      name: '',
      description: '',
      visibility: 'public',
      joinProcess: 'instant',
      rules: [],
      tools: [],
      foundingMembers: [],
      customizations: {}
    });
    onClose();
  };

  const handleSubmit = () => {
    createSpaceMutation.mutate(spaceData);
  };

  const isLoading = createSpaceMutation.isPending;

  // Step components
  const SpaceTypeStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Choose Space Type</h2>
        <p className="text-muted-foreground">What kind of community are you creating?</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {SPACE_TYPES.map((type: any) => {
          const Icon = type.icon;
          return (
            <Card
              key={type.id}
              className={`cursor-pointer transition-all hover:shadow-md ${
                spaceData.type === type.id ? 'ring-2 ring-accent' : ''
              }`}
              onClick={() => setSpaceData({ ...spaceData, type: type.id })}
            >
              <div className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2 rounded-lg ${type.color} text-[var(--hive-text-primary)]`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">{type.name}</h3>
                    <p className="text-sm text-muted-foreground">{type.description}</p>
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-medium text-muted-foreground">Examples:</p>
                  {type.examples.map((example, index) => (
                    <Badge key={index} variant="outline" className="text-xs mr-1">
                      {example}
                    </Badge>
                  ))}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const BasicInfoStep = () => {
    // Validation state
    const [nameError, setNameError] = useState('');
    const [descError, setDescError] = useState('');
    
    const validateName = (name: string) => {
      if (name.length < 3) {
        setNameError('Space name must be at least 3 characters');
        return false;
      }
      if (name.length > 50) {
        setNameError('Space name must be less than 50 characters');
        return false;
      }
      if (!/^[a-zA-Z0-9\s\-_]+$/.test(name)) {
        setNameError('Only letters, numbers, spaces, hyphens, and underscores allowed');
        return false;
      }
      setNameError('');
      return true;
    };
    
    const validateDescription = (desc: string) => {
      if (desc.length < 10) {
        setDescError('Description must be at least 10 characters');
        return false;
      }
      if (desc.length > 500) {
        setDescError('Description must be less than 500 characters');
        return false;
      }
      setDescError('');
      return true;
    };
    
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Basic Information</h2>
          <p className="text-muted-foreground">Tell us about your space</p>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Space Name* 
              <span className="text-xs text-muted-foreground ml-2">
                ({spaceData.name.length}/50)
              </span>
            </label>
            <Input
              placeholder="e.g., CS Study Group"
              value={spaceData.name}
              onChange={(e: any) => {
                const value = e.target.value;
                setSpaceData({ ...spaceData, name: value });
                if (value) validateName(value);
              }}
              className={nameError ? 'border-red-500' : ''}
            />
            {nameError && (
              <p className="text-xs text-red-500 mt-1">{nameError}</p>
            )}
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">
              Description* 
              <span className="text-xs text-muted-foreground ml-2">
                ({spaceData.description.length}/500)
              </span>
            </label>
            <textarea
              className={`w-full p-3 border rounded-lg resize-none ${
                descError ? 'border-red-500' : ''
              }`}
              rows={4}
              placeholder="Describe what your space is about and what members can expect..."
              value={spaceData.description}
              onChange={(e: any) => {
                const value = e.target.value;
                setSpaceData({ ...spaceData, description: value });
                if (value) validateDescription(value);
              }}
            />
            {descError && (
              <p className="text-xs text-red-500 mt-1">{descError}</p>
            )}
          </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Visibility</label>
            <select
              className="w-full p-2 border rounded-lg"
              value={spaceData.visibility}
              onChange={(e: any) => setSpaceData({ 
                ...spaceData, 
                visibility: e.target.value as 'public' | 'private' | 'invite_only'
              })}
            >
              <option value="public">Public</option>
              <option value="private">Private</option>
              <option value="invite_only">Invite Only</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Join Process</label>
            <select
              className="w-full p-2 border rounded-lg"
              value={spaceData.joinProcess}
              onChange={(e: any) => setSpaceData({ 
                ...spaceData, 
                joinProcess: e.target.value as 'instant' | 'approval' | 'invite_only'
              })}
            >
              <option value="instant">Instant</option>
              <option value="approval">Requires Approval</option>
              <option value="invite_only">Invite Only</option>
            </select>
          </div>
          </div>
        </div>
      </div>
    );
  };

  const ReviewStep = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Review & Create</h2>
        <p className="text-muted-foreground">Double-check your space details</p>
      </div>
      
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            {(() => {
              const typeConfig = SPACE_TYPES.find(t => t.id === spaceData.type);
              const Icon = typeConfig?.icon || BookOpen;
              return (
                <div className={`p-2 rounded-lg ${typeConfig?.color || 'bg-gray-500'} text-[var(--hive-text-primary)]`}>
                  <Icon className="h-5 w-5" />
                </div>
              );
            })()}
            <div>
              <h3 className="font-semibold">{spaceData.name}</h3>
              <p className="text-sm capitalize text-muted-foreground">
                {spaceData.type.replace('_', ' ')} Space
              </p>
            </div>
          </div>
          
          <p className="text-sm">{spaceData.description}</p>
          
          <div className="flex gap-4 text-sm">
            <div className="flex items-center gap-1">
              {spaceData.visibility === 'public' ? (
                <Globe className="h-4 w-4" />
              ) : (
                <Lock className="h-4 w-4" />
              )}
              <span className="capitalize">{spaceData.visibility}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span className="capitalize">{spaceData.joinProcess.replace('_', ' ')}</span>
            </div>
          </div>
        </div>
      </Card>
      
      {createSpaceMutation.error && (
        <Alert>
          <AlertCircle className="h-4 w-4" />
          <div>
            <h4 className="font-medium">Error creating space</h4>
            <p className="text-sm">{createSpaceMutation.error.message}</p>
          </div>
        </Alert>
      )}
    </div>
  );

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return spaceData.type;
      case 2:
        return spaceData.name.trim() && spaceData.description.trim();
      case 3:
        return true;
      default:
        return false;
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <div className="p-6 w-full max-w-2xl">
        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((step: any) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step === currentStep
                    ? 'bg-accent text-[var(--hive-text-primary)]'
                    : step < currentStep
                    ? 'bg-green-500 text-[var(--hive-text-primary)]'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {step < currentStep ? <Check className="h-4 w-4" /> : step}
              </div>
              {step < 3 && (
                <div
                  className={`w-16 h-0.5 mx-2 ${
                    step < currentStep ? 'bg-green-500' : 'bg-muted'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[400px]">
          {currentStep === 1 && <SpaceTypeStep />}
          {currentStep === 2 && <BasicInfoStep />}
          {currentStep === 3 && <ReviewStep />}
        </div>

        {/* Navigation */}
        <div className="flex justify-between mt-8">
          <Button
            variant="outline"
            onClick={currentStep === 1 ? handleClose : () => setCurrentStep(currentStep - 1)}
            disabled={isLoading}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            {currentStep === 1 ? 'Cancel' : 'Back'}
          </Button>
          
          <Button
            onClick={currentStep === 3 ? handleSubmit : () => setCurrentStep(currentStep + 1)}
            disabled={!canProceed() || isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : currentStep === 3 ? (
              <>
                <Plus className="mr-2 h-4 w-4" />
                Create Space
              </>
            ) : (
              <>
                Next
                <ArrowRight className="ml-2 h-4 w-4" />
              </>
            )}
          </Button>
        </div>
      </div>
    </Modal>
  );
}

// Export with old name for backwards compatibility
export const CreateSpaceModalMigrated = CreateSpaceModal;