'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HiveButton, HiveCard, HiveInput, Badge } from '@hive/ui';
import {
  ArrowLeft,
  Shield,
  Users,
  Home,
  Building,
  Lock,
  Globe,
  UserCheck,
  AlertCircle,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '@hive/auth-logic';
import { api } from '@/lib/api-client';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

// SPEC.md categories with LOCKS
const SPACE_CATEGORIES = {
  university_org: {
    label: 'University Organization',
    description: 'Official university groups and departments',
    icon: Shield,
    color: 'bg-blue-500',
    requiresVerification: true,
    locked: true, // LOCKED - requires admin
    lockMessage: 'Contact admin@hive.college for verification'
  },
  student_org: {
    label: 'Student Organization',
    description: 'Student-run clubs and organizations',
    icon: Users,
    color: 'bg-green-500',
    requiresVerification: false,
    locked: false // OPEN for students
  },
  residential: {
    label: 'Residential',
    description: 'Dorm floors and residential communities',
    icon: Home,
    color: 'bg-yellow-500',
    requiresVerification: false,
    locked: false // OPEN for students
  },
  greek_life: {
    label: 'Greek Life',
    description: 'Fraternities and sororities',
    icon: Building,
    color: 'bg-purple-500',
    requiresVerification: true,
    locked: true, // LOCKED - requires verification
    lockMessage: 'Requires Greek Life council approval'
  }
};

// Form schema with validation
const createSpaceSchema = z.object({
  name: z.string()
    .min(3, 'Space name must be at least 3 characters')
    .max(50, 'Space name must be less than 50 characters')
    .regex(/^[a-zA-Z0-9\s\-_]+$/, 'Only letters, numbers, spaces, hyphens and underscores'),

  description: z.string()
    .min(10, 'Description must be at least 10 characters')
    .max(280, 'Description must be less than 280 characters'),

  category: z.enum(['student_org', 'residential']), // Only unlocked categories

  joinPolicy: z.enum(['open', 'approval', 'invite_only']),

  tags: z.array(z.string()).min(1, 'Add at least one tag').max(5, 'Maximum 5 tags'),

  agreedToGuidelines: z.boolean().refine(val => val === true, {
    message: 'You must agree to the community guidelines'
  })
});

type CreateSpaceForm = z.infer<typeof createSpaceSchema>;

export default function CreateSpacePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState('');

  // LOCKS
  const [globalLock, setGlobalLock] = useState(false);
  const [lockReason, setLockReason] = useState('');
  const [userPermissions, setUserPermissions] = useState({
    canCreate: false,
    spacesCreatedToday: 0,
    maxSpacesPerDay: 3,
    accountAge: 0,
    minAccountAge: 7,
    emailVerified: false,
    isAdmin: false
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset
  } = useForm<CreateSpaceForm>({
    resolver: zodResolver(createSpaceSchema),
    defaultValues: {
      joinPolicy: 'open',
      tags: [],
      agreedToGuidelines: false
    }
  });

  const tags = watch('tags') || [];

  // Check permissions on mount
  useEffect(() => {
    checkCreationPermission();
  }, [user]);

  const checkCreationPermission = async () => {
    if (!user) {
      setGlobalLock(true);
      setLockReason('You must be logged in to create spaces');
      return;
    }

    try {
      const response = await api.get('/api/spaces/check-create-permission');
      setUserPermissions(response);

      // Apply locks based on permissions
      if (!response.canCreate) {
        setGlobalLock(true);
        setLockReason(response.reason || 'Space creation is currently restricted');
      } else if (response.spacesCreatedToday >= response.maxSpacesPerDay) {
        setGlobalLock(true);
        setLockReason(`Daily limit reached (${response.maxSpacesPerDay} spaces per day)`);
      } else if (response.accountAge < response.minAccountAge) {
        setGlobalLock(true);
        setLockReason(`Account must be at least ${response.minAccountAge} days old`);
      } else if (!response.emailVerified) {
        setGlobalLock(true);
        setLockReason('Please verify your email address first');
      }
    } catch (error) {
      console.error('Failed to check permissions:', error);
      setGlobalLock(true);
      setLockReason('Unable to verify creation permissions');
    }
  };

  const handleCategorySelect = (category: string) => {
    const cat = SPACE_CATEGORIES[category as keyof typeof SPACE_CATEGORIES];

    if (cat.locked) {
      alert(cat.lockMessage || 'This category requires special permission');
      return;
    }

    setSelectedCategory(category);
    setValue('category', category as any);
    setCurrentStep(2);
  };

  const handleAddTag = () => {
    if (tagInput && tags.length < 5) {
      const cleanTag = tagInput.toLowerCase().replace(/[^a-z0-9]/g, '');
      if (cleanTag && !tags.includes(cleanTag)) {
        setValue('tags', [...tags, cleanTag]);
      }
      setTagInput('');
    }
  };

  const onSubmit = async (data: CreateSpaceForm) => {
    if (globalLock) {
      alert(lockReason);
      return;
    }

    try {
      setLoading(true);

      const response = await api.post('/api/spaces', {
        ...data,
        campusId: 'ub-buffalo',
        visibility: 'public', // Default for now
        settings: {
          maxPinnedPosts: 3,
          autoArchiveDays: 7
        }
      });

      if (response.space) {
        // Track creation
        await api.post('/api/analytics/track', {
          event: 'space_created',
          properties: {
            spaceId: response.space.id,
            category: data.category
          }
        });

        router.push(`/spaces/${response.space.id}`);
      }
    } catch (error: any) {
      console.error('Failed to create space:', error);

      if (error.response?.status === 403) {
        setGlobalLock(true);
        setLockReason('You do not have permission to create spaces');
      } else if (error.response?.status === 429) {
        setGlobalLock(true);
        setLockReason('Too many spaces created. Try again tomorrow.');
      } else if (error.response?.data?.message?.includes('exists')) {
        alert('A space with this name already exists');
      } else {
        alert('Failed to create space. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  // GLOBAL LOCK SCREEN
  if (globalLock) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center p-4">
        <HiveCard className="bg-gray-900/50 border-red-500/30 max-w-md w-full p-8 text-center">
          <Lock className="w-20 h-20 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white mb-2">Space Creation Locked</h1>
          <p className="text-gray-400 mb-6">{lockReason}</p>

          {/* Show unlock requirements */}
          <div className="bg-gray-800/50 rounded-lg p-4 mb-6 text-left">
            <h3 className="text-sm font-semibold text-gray-300 mb-2">Requirements:</h3>
            <ul className="space-y-1 text-xs text-gray-400">
              <li className={userPermissions.emailVerified ? 'text-green-400' : ''}>
                ✓ Verified email address
              </li>
              <li className={userPermissions.accountAge >= 7 ? 'text-green-400' : ''}>
                ✓ Account age: {userPermissions.accountAge}/7 days
              </li>
              <li className={userPermissions.spacesCreatedToday < 3 ? 'text-green-400' : ''}>
                ✓ Daily limit: {userPermissions.spacesCreatedToday}/3 spaces
              </li>
            </ul>
          </div>

          <HiveButton
            onClick={() => router.push('/spaces')}
            variant="outline"
            className="border-gray-700 w-full"
          >
            Browse Existing Spaces
          </HiveButton>
        </HiveCard>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="bg-gray-900 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <HiveButton
            onClick={() => router.back()}
            variant="ghost"
            size="sm"
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </HiveButton>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Create a Space</h1>
              <p className="text-gray-400 mt-1">
                {userPermissions.spacesCreatedToday}/{userPermissions.maxSpacesPerDay} spaces created today
              </p>
            </div>

            {/* Steps */}
            <div className="flex gap-2">
              {[1, 2, 3].map(step => (
                <div
                  key={step}
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                    currentStep >= step
                      ? 'bg-hive-gold text-black'
                      : 'bg-gray-800 text-gray-500'
                  }`}
                >
                  {step}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Step 1: Category Selection */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-bold text-white mb-2">Choose Category</h2>
            <p className="text-gray-400 mb-6">Some categories require special permission</p>

            <div className="grid gap-4">
              {Object.entries(SPACE_CATEGORIES).map(([key, cat]) => (
                <HiveCard
                  key={key}
                  className={`p-4 cursor-pointer transition-all ${
                    cat.locked
                      ? 'border-red-500/30 bg-red-500/5 opacity-75'
                      : 'border-gray-800 hover:border-hive-gold bg-gray-900/50'
                  }`}
                  onClick={() => handleCategorySelect(key)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-lg ${cat.color} flex items-center justify-center`}>
                        <cat.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-white flex items-center gap-2">
                          {cat.label}
                          {cat.locked && <Lock className="w-4 h-4 text-red-400" />}
                        </h3>
                        <p className="text-sm text-gray-400">{cat.description}</p>
                        {cat.locked && (
                          <p className="text-xs text-red-400 mt-1">{cat.lockMessage}</p>
                        )}
                      </div>
                    </div>
                    {!cat.locked && <ChevronRight className="w-5 h-5 text-gray-400" />}
                  </div>
                </HiveCard>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Details */}
        {currentStep === 2 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-xl font-bold text-white mb-6">Space Details</h2>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Space Name</label>
                <HiveInput
                  {...register('name')}
                  placeholder="e.g., CS Study Group"
                  className="bg-gray-900 border-gray-700"
                />
                {errors.name && (
                  <p className="text-xs text-red-400 mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Description */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Description</label>
                <textarea
                  {...register('description')}
                  placeholder="What is this space about?"
                  rows={3}
                  className="w-full bg-gray-900 border border-gray-700 rounded px-3 py-2 text-white"
                />
                {errors.description && (
                  <p className="text-xs text-red-400 mt-1">{errors.description.message}</p>
                )}
              </div>

              {/* Tags */}
              <div>
                <label className="text-sm text-gray-400 mb-1 block">Tags</label>
                <div className="flex gap-2 mb-2">
                  <HiveInput
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                    placeholder="Add tag"
                    className="bg-gray-900 border-gray-700"
                  />
                  <HiveButton type="button" onClick={handleAddTag} variant="outline">
                    Add
                  </HiveButton>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {tags.map(tag => (
                    <Badge
                      key={tag}
                      className="bg-gray-800 cursor-pointer"
                      onClick={() => setValue('tags', tags.filter(t => t !== tag))}
                    >
                      #{tag} ×
                    </Badge>
                  ))}
                </div>
                {errors.tags && (
                  <p className="text-xs text-red-400 mt-1">{errors.tags.message}</p>
                )}
              </div>

              <HiveButton type="button" onClick={() => setCurrentStep(3)}>
                Continue
              </HiveButton>
            </div>
          </form>
        )}

        {/* Step 3: Settings & Agreement */}
        {currentStep === 3 && (
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2 className="text-xl font-bold text-white mb-6">Final Settings</h2>

            {/* Join Policy */}
            <div className="mb-6">
              <label className="text-sm text-gray-400 mb-3 block">Join Policy</label>
              <div className="space-y-2">
                {[
                  { value: 'open', label: 'Open', desc: 'Anyone can join' },
                  { value: 'approval', label: 'Approval', desc: 'Leaders approve' },
                  { value: 'invite_only', label: 'Invite Only', desc: 'Invitation required' }
                ].map(policy => (
                  <label key={policy.value} className="flex items-center gap-3 p-3 bg-gray-900/50 border border-gray-800 rounded cursor-pointer hover:border-gray-700">
                    <input
                      type="radio"
                      {...register('joinPolicy')}
                      value={policy.value}
                      className="text-hive-gold"
                    />
                    <div>
                      <div className="font-semibold text-white">{policy.label}</div>
                      <div className="text-xs text-gray-400">{policy.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Guidelines Agreement */}
            <HiveCard className="bg-yellow-500/10 border-yellow-500/30 p-4 mb-6">
              <div className="flex gap-3">
                <AlertCircle className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-1" />
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-2">Community Guidelines</h3>
                  <ul className="text-sm text-gray-300 space-y-1 mb-3">
                    <li>• No harassment or hate speech</li>
                    <li>• Keep content relevant to space purpose</li>
                    <li>• Follow university policies</li>
                    <li>• Report inappropriate content</li>
                  </ul>
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      {...register('agreedToGuidelines')}
                      className="text-hive-gold"
                    />
                    <span className="text-sm text-white">
                      I agree to enforce these guidelines
                    </span>
                  </label>
                  {errors.agreedToGuidelines && (
                    <p className="text-xs text-red-400 mt-1">
                      {errors.agreedToGuidelines.message}
                    </p>
                  )}
                </div>
              </div>
            </HiveCard>

            {/* Actions */}
            <div className="flex gap-3">
              <HiveButton
                type="button"
                onClick={() => setCurrentStep(2)}
                variant="outline"
                className="border-gray-700"
              >
                Back
              </HiveButton>
              <HiveButton
                type="submit"
                disabled={loading}
                className="bg-hive-gold text-black hover:bg-yellow-400 flex-1"
              >
                {loading ? 'Creating...' : 'Create Space'}
              </HiveButton>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}