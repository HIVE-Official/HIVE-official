'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Mail,
  School,
  Users,
  Settings,
  Shield,
  Check,
  ChevronRight,
  ChevronLeft,
  Sparkles,
  Home,
  Calendar,
  Heart,
  Target,
  Zap,
  Award,
  Flag,
  Loader2,
  Camera,
  MapPin,
  Book,
  Briefcase,
  Music,
  Palette,
  Globe
} from 'lucide-react';
import { Button, Badge, Progress } from '@hive/ui';
import { cn } from '../../lib/utils';
import { authenticatedFetch } from '../../lib/auth-utils';
import { useRouter } from 'next/navigation';

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  icon: React.ElementType;
  required: boolean;
  completed: boolean;
  fields?: OnboardingField[];
}

interface OnboardingField {
  id: string;
  label: string;
  type: 'text' | 'email' | 'select' | 'multiselect' | 'textarea' | 'radio' | 'checkbox' | 'date';
  placeholder?: string;
  options?: { value: string; label: string; icon?: React.ElementType | string }[];
  validation?: {
    required?: boolean;
    pattern?: string;
    minLength?: number;
    maxLength?: number;
  };
  value?: any;
}

interface OnboardingProgressProps {
  userId: string;
  className?: string;
  onComplete?: () => void;
}

const ONBOARDING_STEPS: OnboardingStep[] = [
  {
    id: 'profile',
    title: 'Complete Your Profile',
    description: 'Tell us about yourself',
    icon: User,
    required: true,
    completed: false,
    fields: [
      {
        id: 'displayName',
        label: 'Display Name',
        type: 'text',
        placeholder: 'How should we call you?',
        validation: { required: true, minLength: 2, maxLength: 50 }
      },
      {
        id: 'bio',
        label: 'Bio',
        type: 'textarea',
        placeholder: 'Tell us a bit about yourself...',
        validation: { maxLength: 200 }
      },
      {
        id: 'profilePicture',
        label: 'Profile Picture',
        type: 'text',
        placeholder: 'Upload or paste image URL'
      }
    ]
  },
  {
    id: 'academic',
    title: 'Academic Information',
    description: 'Connect with your academic community',
    icon: School,
    required: true,
    completed: false,
    fields: [
      {
        id: 'school',
        label: 'School',
        type: 'select',
        placeholder: 'Select your school',
        options: [
          { value: 'ub', label: 'University at Buffalo' },
          { value: 'cornell', label: 'Cornell University' },
          { value: 'syracuse', label: 'Syracuse University' },
          { value: 'rit', label: 'Rochester Institute of Technology' }
        ],
        validation: { required: true }
      },
      {
        id: 'major',
        label: 'Major',
        type: 'select',
        placeholder: 'What are you studying?',
        options: [
          { value: 'cs', label: 'Computer Science', icon: '💻' },
          { value: 'engineering', label: 'Engineering', icon: '⚙️' },
          { value: 'business', label: 'Business', icon: '📊' },
          { value: 'biology', label: 'Biology', icon: '🧬' },
          { value: 'psychology', label: 'Psychology', icon: '🧠' },
          { value: 'arts', label: 'Arts & Design', icon: '🎨' }
        ],
        validation: { required: true }
      },
      {
        id: 'year',
        label: 'Year',
        type: 'select',
        placeholder: 'Academic year',
        options: [
          { value: 'freshman', label: 'Freshman' },
          { value: 'sophomore', label: 'Sophomore' },
          { value: 'junior', label: 'Junior' },
          { value: 'senior', label: 'Senior' },
          { value: 'graduate', label: 'Graduate' }
        ],
        validation: { required: true }
      },
      {
        id: 'housing',
        label: 'Housing',
        type: 'select',
        placeholder: 'Where do you live?',
        options: [
          { value: 'ellicott', label: 'Ellicott Complex' },
          { value: 'governors', label: 'Governors Complex' },
          { value: 'south', label: 'South Campus' },
          { value: 'offcampus', label: 'Off Campus' }
        ]
      }
    ]
  },
  {
    id: 'interests',
    title: 'Your Interests',
    description: 'Help us personalize your experience',
    icon: Heart,
    required: false,
    completed: false,
    fields: [
      {
        id: 'academicInterests',
        label: 'Academic Interests',
        type: 'multiselect',
        options: [
          { value: 'research', label: 'Research', icon: '🔬' },
          { value: 'studygroups', label: 'Study Groups', icon: '📚' },
          { value: 'tutoring', label: 'Tutoring', icon: '👨‍🏫' },
          { value: 'projects', label: 'Projects', icon: '🚀' },
          { value: 'competitions', label: 'Competitions', icon: '🏆' }
        ]
      },
      {
        id: 'socialInterests',
        label: 'Social Activities',
        type: 'multiselect',
        options: [
          { value: 'parties', label: 'Parties', icon: '🎉' },
          { value: 'sports', label: 'Sports', icon: '⚽' },
          { value: 'gaming', label: 'Gaming', icon: '🎮' },
          { value: 'music', label: 'Music', icon: '🎵' },
          { value: 'food', label: 'Food & Dining', icon: '🍕' },
          { value: 'outdoors', label: 'Outdoors', icon: '🏞️' }
        ]
      },
      {
        id: 'goals',
        label: 'Campus Goals',
        type: 'multiselect',
        options: [
          { value: 'network', label: 'Build Network', icon: Users },
          { value: 'skills', label: 'Learn Skills', icon: Zap },
          { value: 'leadership', label: 'Leadership', icon: Award },
          { value: 'fun', label: 'Have Fun', icon: Sparkles }
        ]
      }
    ]
  },
  {
    id: 'spaces',
    title: 'Join Spaces',
    description: 'Connect with your communities',
    icon: Users,
    required: false,
    completed: false,
    fields: [
      {
        id: 'autoJoinSpaces',
        label: 'Auto-join recommended spaces',
        type: 'checkbox',
        value: true
      },
      {
        id: 'spaceCategories',
        label: 'Space Categories',
        type: 'multiselect',
        options: [
          { value: 'dorm', label: 'Your Dorm', icon: Home },
          { value: 'major', label: 'Your Major', icon: School },
          { value: 'clubs', label: 'Clubs & Orgs', icon: Users },
          { value: 'events', label: 'Campus Events', icon: Calendar },
          { value: 'study', label: 'Study Groups', icon: Book }
        ]
      }
    ]
  },
  {
    id: 'privacy',
    title: 'Privacy Settings',
    description: 'Control your data and visibility',
    icon: Shield,
    required: true,
    completed: false,
    fields: [
      {
        id: 'profileVisibility',
        label: 'Profile Visibility',
        type: 'radio',
        options: [
          { value: 'public', label: 'Public - Anyone can see' },
          { value: 'campus', label: 'Campus - Only verified students' },
          { value: 'friends', label: 'Friends - Only connections' }
        ],
        validation: { required: true },
        value: 'campus'
      },
      {
        id: 'activityVisibility',
        label: 'Activity Visibility',
        type: 'radio',
        options: [
          { value: 'all', label: 'Show all activity' },
          { value: 'limited', label: 'Limited activity' },
          { value: 'none', label: 'Hide activity' }
        ],
        value: 'limited'
      },
      {
        id: 'dataSharing',
        label: 'Data Preferences',
        type: 'multiselect',
        options: [
          { value: 'analytics', label: 'Help improve HIVE with analytics' },
          { value: 'recommendations', label: 'Personalized recommendations' },
          { value: 'notifications', label: 'Email notifications' }
        ],
        value: ['analytics', 'recommendations']
      }
    ]
  }
];

export function OnboardingProgress({ userId, className = '', onComplete }: OnboardingProgressProps) {
  const router = useRouter();
  const [steps, setSteps] = useState<OnboardingStep[]>(ONBOARDING_STEPS);
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [skipping, setSkipping] = useState(false);

  useEffect(() => {
    fetchOnboardingProgress();
  }, [userId]);

  const fetchOnboardingProgress = async () => {
    try {
      const response = await authenticatedFetch(`/api/users/${userId}/onboarding`);
      if (response.ok) {
        const data = await response.json();
        updateStepsFromProgress(data);
        setFormData(data.formData || {});
        
        // Find first incomplete step
        const firstIncomplete = steps.findIndex(s => !s.completed);
        if (firstIncomplete !== -1) {
          setCurrentStep(firstIncomplete);
        }
      }
    } catch (error) {
      console.error('Error fetching onboarding progress:', error);
    }
  };

  const updateStepsFromProgress = (progress: any) => {
    setSteps(prev => prev.map(step => ({
      ...step,
      completed: progress.completedSteps?.includes(step.id) || false
    })));
  };

  const validateField = (field: OnboardingField, value: any): string | null => {
    if (!field.validation) return null;

    if (field.validation.required && !value) {
      return `${field.label} is required`;
    }

    if (field.validation.minLength && value.length < field.validation.minLength) {
      return `${field.label} must be at least ${field.validation.minLength} characters`;
    }

    if (field.validation.maxLength && value.length > field.validation.maxLength) {
      return `${field.label} must be less than ${field.validation.maxLength} characters`;
    }

    if (field.validation.pattern) {
      const regex = new RegExp(field.validation.pattern);
      if (!regex.test(value)) {
        return `${field.label} format is invalid`;
      }
    }

    return null;
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [fieldId]: value
    }));
    
    // Clear error for this field
    setErrors(prev => {
      const next = { ...prev };
      delete next[fieldId];
      return next;
    });
  };

  const saveStepProgress = async () => {
    const step = steps[currentStep];
    
    // Validate required fields
    const newErrors: Record<string, string> = {};
    step.fields?.forEach(field => {
      const error = validateField(field, formData[field.id]);
      if (error) {
        newErrors[field.id] = error;
      }
    });

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return false;
    }

    setSaving(true);
    try {
      const response = await authenticatedFetch('/api/onboarding/save-step', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          stepId: step.id,
          data: formData,
          completed: true
        })
      });

      if (response.ok) {
        // Mark step as completed
        setSteps(prev => prev.map((s, i) => 
          i === currentStep ? { ...s, completed: true } : s
        ));
        
        return true;
      }
    } catch (error) {
      console.error('Error saving step:', error);
      return false;
    } finally {
      setSaving(false);
    }
  };

  const handleNext = async () => {
    const saved = await saveStepProgress();
    if (saved) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        completeOnboarding();
      }
    }
  };

  const handleSkip = () => {
    const step = steps[currentStep];
    if (!step.required) {
      if (currentStep < steps.length - 1) {
        setCurrentStep(currentStep + 1);
      } else {
        completeOnboarding();
      }
    }
  };

  const completeOnboarding = async () => {
    try {
      await authenticatedFetch('/api/onboarding/complete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId })
      });
      
      onComplete?.();
      router.push('/dashboard');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const progress = ((steps.filter(s => s.completed).length / steps.length) * 100);
  const step = steps[currentStep];

  return (
    <div className={cn('max-w-2xl mx-auto space-y-6', className)}>
      {/* Progress Header */}
      <div className="bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-xl border border-white/10 p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-1">
              Welcome to HIVE!
            </h1>
            <p className="text-sm text-neutral-400">
              Let's get you set up in just a few steps
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-[var(--hive-brand-secondary)]">
              {Math.round(progress)}%
            </div>
            <div className="text-xs text-neutral-400">Complete</div>
          </div>
        </div>

        {/* Progress Bar */}
        <Progress value={progress} className="h-2 mb-4" />

        {/* Step Indicators */}
        <div className="flex items-center justify-between">
          {steps.map((s, index) => {
            const Icon = s.icon;
            const isActive = index === currentStep;
            const isCompleted = s.completed;
            
            return (
              <button
                key={s.id}
                onClick={() => setCurrentStep(index)}
                disabled={!isCompleted && index > currentStep}
                className={cn(
                  'flex flex-col items-center gap-1 transition-all',
                  isActive && 'scale-110',
                  !isCompleted && index > currentStep && 'opacity-30 cursor-not-allowed'
                )}
              >
                <div className={cn(
                  'w-10 h-10 rounded-full flex items-center justify-center transition-all',
                  isCompleted ? 'bg-green-500/20 border-2 border-green-400' :
                  isActive ? 'bg-[var(--hive-brand-secondary)]/20 border-2 border-[var(--hive-brand-secondary)]' :
                  'bg-white/5 border-2 border-white/10'
                )}>
                  {isCompleted ? (
                    <Check className="h-5 w-5 text-green-400" />
                  ) : (
                    <Icon className={cn(
                      'h-5 w-5',
                      isActive ? 'text-[var(--hive-brand-secondary)]' : 'text-neutral-400'
                    )} />
                  )}
                </div>
                <span className={cn(
                  'text-xs hidden sm:block',
                  isActive ? 'text-[var(--hive-text-inverse)]' : 'text-neutral-400'
                )}>
                  {s.title.split(' ')[0]}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Current Step */}
      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="bg-white/5 rounded-xl border border-white/10 p-6"
      >
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-[var(--hive-brand-secondary)]/20 rounded-lg">
            <step.icon className="h-6 w-6 text-[var(--hive-brand-secondary)]" />
          </div>
          
          <div className="flex-1">
            <h2 className="text-xl font-semibold text-[var(--hive-text-inverse)] mb-1">
              {step.title}
            </h2>
            <p className="text-sm text-neutral-400">
              {step.description}
            </p>
            {step.required && (
              <Badge className="mt-2 bg-red-500/20 text-red-400 text-xs">
                Required
              </Badge>
            )}
          </div>
        </div>

        {/* Fields */}
        <div className="space-y-4">
          {step.fields?.map(field => (
            <div key={field.id}>
              <label className="block text-sm text-neutral-300 mb-2">
                {field.label}
                {field.validation?.required && (
                  <span className="text-red-400 ml-1">*</span>
                )}
              </label>
              
              {field.type === 'text' || field.type === 'email' ? (
                <input
                  type={field.type}
                  value={formData[field.id] || ''}
                  onChange={(e: any) => handleFieldChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-[var(--hive-text-inverse)] placeholder-neutral-500 focus:outline-none focus:border-white/20"
                />
              ) : field.type === 'textarea' ? (
                <textarea
                  value={formData[field.id] || ''}
                  onChange={(e: any) => handleFieldChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  rows={3}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-[var(--hive-text-inverse)] placeholder-neutral-500 focus:outline-none focus:border-white/20 resize-none"
                />
              ) : field.type === 'select' ? (
                <select
                  value={formData[field.id] || ''}
                  onChange={(e: any) => handleFieldChange(field.id, e.target.value)}
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-[var(--hive-text-inverse)] focus:outline-none focus:border-white/20"
                >
                  <option value="">{field.placeholder}</option>
                  {field.options?.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : field.type === 'multiselect' ? (
                <div className="grid grid-cols-2 gap-2">
                  {field.options?.map(option => {
                    const isSelected = (formData[field.id] || []).includes(option.value);
                    const Icon = typeof option.icon === 'string' ? null : option.icon;
                    
                    return (
                      <button
                        key={option.value}
                        onClick={() => {
                          const current = formData[field.id] || [];
                          const updated = isSelected
                            ? current.filter((v: string) => v !== option.value)
                            : [...current, option.value];
                          handleFieldChange(field.id, updated);
                        }}
                        className={cn(
                          'p-3 rounded-lg border text-sm transition-all text-left flex items-center gap-2',
                          isSelected
                            ? 'bg-[var(--hive-brand-secondary)]/20 border-[var(--hive-brand-secondary)]/30 text-[var(--hive-brand-secondary)]'
                            : 'bg-white/5 border-white/10 text-neutral-300 hover:bg-white/10'
                        )}
                      >
                        {Icon ? <Icon className="h-4 w-4" /> : <span>{option.icon}</span>}
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              ) : field.type === 'radio' ? (
                <div className="space-y-2">
                  {field.options?.map(option => (
                    <label
                      key={option.value}
                      className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/[0.07] transition-all cursor-pointer"
                    >
                      <input
                        type="radio"
                        name={field.id}
                        value={option.value}
                        checked={formData[field.id] === option.value}
                        onChange={(e: any) => handleFieldChange(field.id, e.target.value)}
                        className="text-[var(--hive-brand-secondary)]"
                      />
                      <span className="text-sm text-neutral-300">{option.label}</span>
                    </label>
                  ))}
                </div>
              ) : field.type === 'checkbox' ? (
                <label className="flex items-center gap-3 p-3 bg-white/5 rounded-lg hover:bg-white/[0.07] transition-all cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData[field.id] || false}
                    onChange={(e: any) => handleFieldChange(field.id, e.target.checked)}
                    className="text-[var(--hive-brand-secondary)]"
                  />
                  <span className="text-sm text-neutral-300">{field.label}</span>
                </label>
              ) : null}
              
              {errors[field.id] && (
                <p className="text-xs text-red-400 mt-1">{errors[field.id]}</p>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          className="text-neutral-400"
        >
          <ChevronLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>

        <div className="flex gap-2">
          {!step.required && (
            <Button
              variant="outline"
              onClick={handleSkip}
              className="border-white/20"
            >
              Skip
            </Button>
          )}
          
          <Button
            onClick={handleNext}
            disabled={saving}
            className="bg-[var(--hive-brand-secondary)] hover:bg-[var(--hive-brand-secondary)]/80"
          >
            {saving ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Saving...
              </>
            ) : currentStep === steps.length - 1 ? (
              <>
                Complete Setup
                <Check className="h-4 w-4 ml-2" />
              </>
            ) : (
              <>
                Next
                <ChevronRight className="h-4 w-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}