"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  ArrowRight, 
  Check, 
  Upload, 
  Users, 
  Hash, 
  Lock, 
  Globe, 
  Sparkles,
  Building,
  GraduationCap,
  Home,
  Briefcase,
  Heart,
  Code,
  Music,
  Gamepad2,
  Camera,
  Loader2,
  AlertCircle,
  X
} from 'lucide-react';
import { Button, Input, Textarea, Badge, Alert, AlertDescription } from '@hive/ui';
import { useUnifiedAuth } from '@hive/ui';
import { authenticatedFetch } from '@/lib/auth-utils';
import { cn } from '@/lib/utils';
import Image from 'next/image';

// Space type configurations
const SPACE_TYPES = [
  {
    id: 'dorm',
    name: 'Dorm',
    description: 'Living space community',
    icon: Home,
    color: 'from-blue-500 to-blue-600',
    features: ['Room assignments', 'Floor events', 'Maintenance requests', 'Community rules']
  },
  {
    id: 'organization',
    name: 'Organization',
    description: 'Student group or club',
    icon: Users,
    color: 'from-purple-500 to-purple-600',
    features: ['Member directory', 'Event planning', 'Announcements', 'Resource sharing']
  },
  {
    id: 'major',
    name: 'Major',
    description: 'Academic program',
    icon: GraduationCap,
    color: 'from-green-500 to-green-600',
    features: ['Study groups', 'Course resources', 'Career guidance', 'Alumni network']
  },
  {
    id: 'interest',
    name: 'Interest',
    description: 'Shared hobby or passion',
    icon: Heart,
    color: 'from-pink-500 to-pink-600',
    features: ['Discussions', 'Meetups', 'Resource library', 'Skill sharing']
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Career development',
    icon: Briefcase,
    color: 'from-orange-500 to-orange-600',
    features: ['Job board', 'Mentorship', 'Workshops', 'Networking']
  }
];

// Category tags for interests
const INTEREST_TAGS = [
  { id: 'tech', name: 'Technology', icon: Code },
  { id: 'arts', name: 'Arts & Culture', icon: Camera },
  { id: 'music', name: 'Music', icon: Music },
  { id: 'gaming', name: 'Gaming', icon: Gamepad2 },
  { id: 'sports', name: 'Sports & Fitness', icon: Heart },
  { id: 'academic', name: 'Academic', icon: GraduationCap },
  { id: 'social', name: 'Social', icon: Users },
  { id: 'professional', name: 'Professional', icon: Briefcase }
];

interface SpaceFormData {
  name: string;
  description: string;
  type: string;
  visibility: 'public' | 'private' | 'unlisted';
  tags: string[];
  bannerImage?: File;
  rules?: string;
  joinApproval: boolean;
  initialMembers?: string[];
}

export default function CreateSpacePage() {
  const router = useRouter();
  const { user } = useUnifiedAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<SpaceFormData>({
    name: '',
    description: '',
    type: '',
    visibility: 'public',
    tags: [],
    joinApproval: false,
    initialMembers: []
  });

  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const totalSteps = 4;

  const handleTypeSelect = (typeId: string) => {
    setFormData({ ...formData, type: typeId });
  };

  const handleTagToggle = (tagId: string) => {
    const newTags = formData.tags.includes(tagId)
      ? formData.tags.filter(t => t !== tagId)
      : [...formData.tags, tagId];
    setFormData({ ...formData, tags: newTags });
  };

  const handleBannerUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, bannerImage: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setBannerPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!formData.type;
      case 2:
        return formData.name.length >= 3 && formData.description.length >= 10;
      case 3:
        return formData.tags.length > 0;
      case 4:
        return true; // Settings are optional
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
      setError(null);
    } else {
      setError('Please complete all required fields');
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
    setError(null);
  };

  const handleCreate = async () => {
    if (!user) {
      setError('You must be logged in to create a space');
      return;
    }

    setIsCreating(true);
    setError(null);

    try {
      // Upload banner image if provided
      let bannerUrl = null;
      if (formData.bannerImage) {
        const formDataUpload = new FormData();
        formDataUpload.append('file', formData.bannerImage);
        formDataUpload.append('type', 'space-banner');
        
        const uploadResponse = await authenticatedFetch('/api/upload', {
          method: 'POST',
          body: formDataUpload
        });

        if (uploadResponse.ok) {
          const { url } = await uploadResponse.json();
          bannerUrl = url;
        }
      }

      // Create the space
      const response = await authenticatedFetch('/api/spaces', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          type: formData.type,
          visibility: formData.visibility,
          tags: formData.tags,
          bannerUrl,
          rules: formData.rules,
          settings: {
            joinApproval: formData.joinApproval,
            allowPosts: true,
            allowEvents: true,
            allowTools: formData.type === 'organization' || formData.type === 'professional'
          },
          initialMembers: formData.initialMembers
        })
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create space');
      }

      const { space } = await response.json();
      
      // Redirect to the new space
      router.push(`/spaces/${space.id}`);
    } catch (err) {
      console.error('Error creating space:', err);
      setError(err instanceof Error ? err.message : 'Failed to create space');
      setIsCreating(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-2">
                What type of space are you creating?
              </h2>
              <p className="text-neutral-400">
                Choose the category that best describes your community
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SPACE_TYPES.map((type: any) => {
                const Icon = type.icon;
                const isSelected = formData.type === type.id;
                
                return (
                  <motion.button
                    key={type.id}
                    onClick={() => handleTypeSelect(type.id)}
                    className={cn(
                      "relative p-6 rounded-xl border-2 transition-all text-left",
                      isSelected
                        ? "border-[var(--hive-gold)] bg-[var(--hive-gold)]/10"
                        : "border-[var(--hive-white)]/[0.1] bg-[var(--hive-white)]/[0.02] hover:bg-[var(--hive-white)]/[0.05]"
                    )}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSelected && (
                      <div className="absolute top-4 right-4">
                        <Check className="h-5 w-5 text-[var(--hive-gold)]" />
                      </div>
                    )}
                    
                    <div className={`inline-flex p-3 rounded-lg bg-gradient-to-br ${type.color} mb-4`}>
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                    
                    <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)] mb-1">
                      {type.name}
                    </h3>
                    <p className="text-sm text-neutral-400 mb-3">
                      {type.description}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {type.features.slice(0, 2).map((feature: any) => (
                        <Badge
                          key={feature}
                          variant="secondary"
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </motion.button>
                );
              })}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-2">
                Basic Information
              </h2>
              <p className="text-neutral-400">
                Give your space a name and description
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                  Space Name *
                </label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g., CS 220 Study Group"
                  className="bg-[var(--hive-white)]/[0.05] border-[var(--hive-white)]/[0.1]"
                  maxLength={50}
                />
                <p className="text-xs text-neutral-400 mt-1">
                  {formData.name.length}/50 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                  Description *
                </label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="What's this space about? What will members do here?"
                  className="bg-[var(--hive-white)]/[0.05] border-[var(--hive-white)]/[0.1] min-h-[120px]"
                  maxLength={500}
                />
                <p className="text-xs text-neutral-400 mt-1">
                  {formData.description.length}/500 characters
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                  Banner Image (Optional)
                </label>
                <div className="relative">
                  {bannerPreview ? (
                    <div className="relative h-48 rounded-lg overflow-hidden mb-4">
                      <Image
                        src={bannerPreview}
                        alt="Banner preview"
                        fill
                        className="object-cover"
                      />
                      <button
                        onClick={() => {
                          setBannerPreview(null);
                          setFormData({ ...formData, bannerImage: undefined });
                        }}
                        className="absolute top-2 right-2 p-2 bg-black/50 rounded-lg hover:bg-black/70 transition-colors"
                      >
                        <X className="h-4 w-4 text-white" />
                      </button>
                    </div>
                  ) : (
                    <label className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-[var(--hive-white)]/[0.2] rounded-lg cursor-pointer hover:border-[var(--hive-gold)]/50 transition-colors">
                      <Upload className="h-8 w-8 text-neutral-400 mb-2" />
                      <span className="text-sm text-neutral-400">Click to upload banner</span>
                      <span className="text-xs text-neutral-500 mt-1">Recommended: 1920x480px</span>
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleBannerUpload}
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-2">
                Categories & Tags
              </h2>
              <p className="text-neutral-400">
                Help people discover your space
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-4">
                Select relevant tags (choose at least 1)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {INTEREST_TAGS.map((tag: any) => {
                  const Icon = tag.icon;
                  const isSelected = formData.tags.includes(tag.id);
                  
                  return (
                    <motion.button
                      key={tag.id}
                      onClick={() => handleTagToggle(tag.id)}
                      className={cn(
                        "flex items-center gap-2 p-3 rounded-lg border transition-all",
                        isSelected
                          ? "border-[var(--hive-gold)] bg-[var(--hive-gold)]/20 text-[var(--hive-gold)]"
                          : "border-[var(--hive-white)]/[0.1] bg-[var(--hive-white)]/[0.02] text-neutral-400 hover:text-[var(--hive-text-inverse)]"
                      )}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{tag.name}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        );

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-6"
          >
            <div>
              <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-2">
                Privacy & Settings
              </h2>
              <p className="text-neutral-400">
                Configure how your space operates
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-3">
                  Space Visibility
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {[
                    { id: 'public', name: 'Public', icon: Globe, description: 'Anyone can find and join' },
                    { id: 'unlisted', name: 'Unlisted', icon: Hash, description: 'Only with invite link' },
                    { id: 'private', name: 'Private', icon: Lock, description: 'Invite only' }
                  ].map((option: any) => {
                    const Icon = option.icon;
                    const isSelected = formData.visibility === option.id;
                    
                    return (
                      <button
                        key={option.id}
                        onClick={() => setFormData({ ...formData, visibility: option.id as any })}
                        className={cn(
                          "p-4 rounded-lg border text-left transition-all",
                          isSelected
                            ? "border-[var(--hive-gold)] bg-[var(--hive-gold)]/10"
                            : "border-[var(--hive-white)]/[0.1] bg-[var(--hive-white)]/[0.02] hover:bg-[var(--hive-white)]/[0.05]"
                        )}
                      >
                        <Icon className={cn(
                          "h-5 w-5 mb-2",
                          isSelected ? "text-[var(--hive-gold)]" : "text-neutral-400"
                        )} />
                        <div className="font-medium text-[var(--hive-text-inverse)]">
                          {option.name}
                        </div>
                        <div className="text-xs text-neutral-400 mt-1">
                          {option.description}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.joinApproval}
                    onChange={(e) => setFormData({ ...formData, joinApproval: e.target.checked })}
                    className="w-5 h-5 rounded border-[var(--hive-white)]/[0.2] bg-[var(--hive-white)]/[0.05] text-[var(--hive-gold)] focus:ring-[var(--hive-gold)] focus:ring-offset-0"
                  />
                  <div>
                    <div className="font-medium text-[var(--hive-text-inverse)]">
                      Require approval to join
                    </div>
                    <div className="text-xs text-neutral-400">
                      You'll need to approve new members before they can participate
                    </div>
                  </div>
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--hive-text-inverse)] mb-2">
                  Community Rules (Optional)
                </label>
                <Textarea
                  value={formData.rules}
                  onChange={(e) => setFormData({ ...formData, rules: e.target.value })}
                  placeholder="Set expectations for your community..."
                  className="bg-[var(--hive-white)]/[0.05] border-[var(--hive-white)]/[0.1] min-h-[100px]"
                />
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-neutral-400 hover:text-[var(--hive-text-inverse)] transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back</span>
        </button>

        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-[var(--hive-gold)]" />
          <span className="text-sm font-medium text-[var(--hive-text-inverse)]">
            Create New Space
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          {Array.from({ length: totalSteps }, (_, i) => i + 1).map((step) => (
            <div
              key={step}
              className={cn(
                "flex items-center",
                step < totalSteps && "flex-1"
              )}
            >
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center font-medium transition-all",
                  step < currentStep
                    ? "bg-[var(--hive-gold)] text-black"
                    : step === currentStep
                    ? "bg-[var(--hive-gold)]/20 text-[var(--hive-gold)] border-2 border-[var(--hive-gold)]"
                    : "bg-[var(--hive-white)]/[0.05] text-neutral-500 border border-[var(--hive-white)]/[0.1]"
                )}
              >
                {step < currentStep ? (
                  <Check className="h-5 w-5" />
                ) : (
                  step
                )}
              </div>
              {step < totalSteps && (
                <div
                  className={cn(
                    "flex-1 h-[2px] mx-2",
                    step < currentStep
                      ? "bg-[var(--hive-gold)]"
                      : "bg-[var(--hive-white)]/[0.1]"
                  )}
                />
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs text-neutral-400">
          <span>Type</span>
          <span>Details</span>
          <span>Tags</span>
          <span>Settings</span>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert className="mb-6 bg-red-500/10 border-red-500/20">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-400">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {/* Content */}
      <div className="min-h-[400px]">
        <AnimatePresence mode="wait">
          {renderStepContent()}
        </AnimatePresence>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between mt-8 pt-8 border-t border-[var(--hive-white)]/[0.1]">
        <Button
          variant="outline"
          onClick={handleBack}
          disabled={currentStep === 1}
          className="border-[var(--hive-white)]/[0.2]"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        {currentStep < totalSteps ? (
          <Button
            onClick={handleNext}
            disabled={!validateStep(currentStep)}
            className="bg-[var(--hive-gold)] text-black hover:bg-[var(--hive-gold)]/90"
          >
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button
            onClick={handleCreate}
            disabled={isCreating || !validateStep(currentStep)}
            className="bg-gradient-to-r from-[var(--hive-gold)] to-orange-500 text-black hover:opacity-90"
          >
            {isCreating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Creating Space...
              </>
            ) : (
              <>
                <Sparkles className="h-4 w-4 mr-2" />
                Create Space
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}