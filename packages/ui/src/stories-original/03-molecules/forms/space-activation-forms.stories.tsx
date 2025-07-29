import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { HiveCard } from '../../../components/hive-card';
import { HiveButton } from '../../../components/hive-button';
import { HiveInput } from '../../../components/hive-input';
import { Text } from '../../../atomic/atoms/text';
import { Badge } from '../../../atomic/atoms/badge';
import { motion, AnimatePresence } from '../../../components/framer-motion-proxy';
import { गति } from '../../../lib/motion-utils';
import { 
  Zap,
  Users,
  Shield,
  Crown,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Star,
  Target,
  Lightbulb,
  MessageCircle,
  UserPlus,
  Settings,
  Globe,
  Lock,
  Eye,
  Upload,
  Image,
  Link,
  Tag,
  Heart,
  Code,
  Palette,
  Music,
  Book,
  Coffee,
  Gamepad2,
  Dumbbell,
  Camera,
  Mic,
  Film,
  GraduationCap,
  Building,
  MapPin,
  Calendar,
  Clock,
  Bell,
  Share,
  Award,
  TrendingUp,
  Activity,
  AlertCircle,
  Info,
  HelpCircle,
  Sparkles,
  Rocket
} from 'lucide-react';

// Space Activation Form Props
interface SpaceActivationFormProps {
  onSubmit?: (data: any) => Promise<void>;
  onBack?: () => void;
  loading?: boolean;
  className?: string;
  spaceType?: 'create' | 'join' | 'request';
}

// Main Space Activation Form - Campus Community Creation
const SpaceActivationForm: React.FC<SpaceActivationFormProps> = ({ 
  onSubmit, 
  loading, 
  className, 
  spaceType = 'create' 
}) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    spaceName: '',
    spaceDescription: '',
    spaceCategory: '',
    spaceTags: [] as string[],
    
    // Purpose & Goals
    spacePurpose: '',
    primaryGoals: [] as string[],
    targetAudience: '',
    meetingFrequency: '',
    
    // Leadership & Structure
    leadershipStyle: '',
    memberCapacity: '',
    membershipRequirements: '',
    onboardingProcess: '',
    
    // Campus Integration
    campusAffiliation: '',
    facultyAdvisor: '',
    departmentSponsorship: '',
    officialRecognition: false,
    
    // Verification & Contact
    leadershipExperience: '',
    previousRoles: [],
    contactMethods: [] as string[],
    socialLinks: '',
    
    // Space Settings
    visibility: 'campus',
    joinProcess: 'application',
    contentModeration: 'community',
    eventPermissions: 'members'
  });

  const spaceCategories = [
    { id: 'academic', label: 'Academic', desc: 'Study groups, research, coursework', icon: GraduationCap, color: 'blue' },
    { id: 'professional', label: 'Professional', desc: 'Career development, networking', icon: Target, color: 'green' },
    { id: 'social', label: 'Social', desc: 'Friendship, community, hangouts', icon: Users, color: 'purple' },
    { id: 'creative', label: 'Creative', desc: 'Arts, music, design, writing', icon: Palette, color: 'pink' },
    { id: 'sports', label: 'Sports & Fitness', desc: 'Athletics, wellness, outdoor', icon: Dumbbell, color: 'emerald' },
    { id: 'tech', label: 'Technology', desc: 'Coding, innovation, startups', icon: Code, color: 'cyan' },
    { id: 'service', label: 'Service', desc: 'Volunteering, community impact', icon: Heart, color: 'red' },
    { id: 'cultural', label: 'Cultural', desc: 'Heritage, diversity, identity', icon: Globe, color: 'orange' },
    { id: 'gaming', label: 'Gaming', desc: 'Video games, board games, esports', icon: Gamepad2, color: 'indigo' },
    { id: 'media', label: 'Media & Content', desc: 'Photography, film, podcasts', icon: Camera, color: 'amber' }
  ];

  const primaryGoals = [
    { id: 'learning', label: 'Collaborative Learning', icon: Book },
    { id: 'networking', label: 'Professional Networking', icon: UserPlus },
    { id: 'friendship', label: 'Building Friendships', icon: Heart },
    { id: 'projects', label: 'Group Projects', icon: Target },
    { id: 'events', label: 'Event Organization', icon: Calendar },
    { id: 'mentorship', label: 'Peer Mentorship', icon: Star },
    { id: 'advocacy', label: 'Campus Advocacy', icon: Mic },
    { id: 'competition', label: 'Competitions', icon: Award },
    { id: 'wellness', label: 'Wellness & Support', icon: Shield },
    { id: 'innovation', label: 'Innovation & Creation', icon: Lightbulb }
  ];

  const spaceTags = [
    'beginner-friendly', 'advanced', 'collaborative', 'competitive', 'casual',
    'intensive', 'weekly-meetings', 'project-based', 'discussion-focused',
    'hands-on', 'mentorship', 'peer-support', 'innovation', 'traditional',
    'experimental', 'interdisciplinary', 'focused', 'diverse', 'inclusive'
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      onSubmit?.(formData);
    }
  };

  const toggleSelection = (array: string[], item: string, key: keyof typeof formData) => {
    const newArray = array.includes(item) 
      ? array.filter(i => i !== item)
      : [...array, item];
    setFormData(prev => ({ ...prev, [key]: newArray }));
  };

  const addTag = (tag: string) => {
    if (!formData.spaceTags.includes(tag)) {
      setFormData(prev => ({ ...prev, spaceTags: [...prev.spaceTags, tag] }));
    }
  };

  const removeTag = (tag: string) => {
    setFormData(prev => ({ ...prev, spaceTags: prev.spaceTags.filter(t => t !== tag) }));
  };

  const getFormTitle = () => {
    switch (spaceType) {
      case 'create': return 'Create New Space';
      case 'join': return 'Join Space Request';
      case 'request': return 'Request Space Activation';
      default: return 'Space Activation';
    }
  };

  const getFormDescription = () => {
    switch (spaceType) {
      case 'create': return 'Build a new campus community';
      case 'join': return 'Request to join an existing space';
      case 'request': return 'Request leadership verification';
      default: return 'Campus community management';
    }
  };

  const getFormIcon = () => {
    switch (spaceType) {
      case 'create': return Rocket;
      case 'join': return UserPlus;
      case 'request': return Crown;
      default: return Users;
    }
  };

  const FormIcon = getFormIcon();

  return (
    <HiveCard className={`w-[550px] ${className}`} variant="elevated" size="lg">
      <motion.div
        variants={गति.slideUp}
        initial="initial"
        animate="animate"
        className="p-6 space-y-6"
      >
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mx-auto flex items-center justify-center mb-4">
            <FormIcon className="w-8 h-8 text-[var(--hive-text-primary)]" />
          </div>
          <div>
            <Badge variant="primary" size="sm" className="mb-2">Space Management</Badge>
            <Text variant="heading-lg" className="font-bold">{getFormTitle()}</Text>
            <Text variant="body-md" color="secondary">
              {getFormDescription()}
            </Text>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`flex-1 h-1 rounded-full transition-colors ${
                num <= step ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-gray-800'
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Basic Information */}
            {step === 1 && (
              <motion.div
                key="basic"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="text-center space-y-2">
                  <Text variant="heading-md" className="font-bold">Space Identity</Text>
                  <Text variant="body-sm" color="secondary">
                    Define your community's core identity
                  </Text>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Space Name</Text>
                    <HiveInput
                      placeholder="Stanford AI Research Collective"
                      value={formData.spaceName}
                      onChange={(e) => setFormData(prev => ({ ...prev, spaceName: e.target.value }))}
                      disabled={loading}
                      className="w-full"
                      maxLength={60}
                    />
                    <div className="flex justify-between">
                      <Text variant="body-xs" color="secondary">
                        Choose a clear, memorable name
                      </Text>
                      <Text variant="body-xs" color="secondary">
                        {formData.spaceName.length}/60
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Space Description</Text>
                    <textarea
                      placeholder="Describe your space's mission, activities, and what makes it unique..."
                      value={formData.spaceDescription}
                      onChange={(e) => setFormData(prev => ({ ...prev, spaceDescription: e.target.value }))}
                      className="w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)] resize-none"
                      rows={4}
                      maxLength={400}
                    />
                    <div className="flex justify-between">
                      <Text variant="body-xs" color="secondary">
                        Explain your purpose and what members can expect
                      </Text>
                      <Text variant="body-xs" color="secondary">
                        {formData.spaceDescription.length}/400
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Category</Text>
                    <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto">
                      {spaceCategories.map((category) => (
                        <button
                          key={category.id}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, spaceCategory: category.id }))}
                          className={`p-3 rounded-lg border transition-all text-left ${
                            formData.spaceCategory === category.id
                              ? 'border-indigo-500 bg-indigo-500/10 scale-105'
                              : 'border-[var(--hive-border-default)] hover:border-gray-600 hover:bg-gray-800/50'
                          }`}
                        >
                          <category.icon className="h-5 w-5 mb-2" />
                          <Text variant="body-sm" className="font-medium">{category.label}</Text>
                          <Text variant="body-xs" color="secondary">{category.desc}</Text>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Space Tags</Text>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.spaceTags.map((tag, index) => (
                        <Badge
                          key={index}
                          variant="secondary"
                          size="sm"
                          className="flex items-center gap-1"
                        >
                          {tag}
                          <button
                            type="button"
                            onClick={() => removeTag(tag)}
                            className="ml-1 hover:text-red-400"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {spaceTags.filter(tag => !formData.spaceTags.includes(tag)).slice(0, 8).map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          onClick={() => addTag(tag)}
                          className="px-2 py-1 text-xs bg-gray-800 hover:bg-gray-700 rounded-full border border-[var(--hive-border-default)] transition-colors"
                        >
                          + {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 2: Purpose & Goals */}
            {step === 2 && (
              <motion.div
                key="purpose"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="text-center space-y-2">
                  <Text variant="heading-md" className="font-bold">Purpose & Goals</Text>
                  <Text variant="body-sm" color="secondary">
                    Define what your space aims to achieve
                  </Text>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Primary Goals</Text>
                    <div className="grid grid-cols-2 gap-2">
                      {primaryGoals.map((goal) => (
                        <button
                          key={goal.id}
                          type="button"
                          onClick={() => toggleSelection(formData.primaryGoals, goal.id, 'primaryGoals')}
                          className={`p-3 rounded-lg border transition-all text-left ${
                            formData.primaryGoals.includes(goal.id)
                              ? 'border-indigo-500 bg-indigo-500/10 scale-105'
                              : 'border-[var(--hive-border-default)] hover:border-gray-600 hover:bg-gray-800/50'
                          }`}
                        >
                          <goal.icon className="h-5 w-5 mb-2" />
                          <Text variant="body-sm" className="font-medium">{goal.label}</Text>
                        </button>
                      ))}
                    </div>
                    <Text variant="body-xs" color="secondary">
                      Selected: {formData.primaryGoals.length} goals
                    </Text>
                  </div>

                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Target Audience</Text>
                    <div className="space-y-2">
                      {[
                        { value: 'all-students', label: 'All Students', desc: 'Open to entire campus community' },
                        { value: 'undergrad', label: 'Undergraduates', desc: 'Undergraduate students only' },
                        { value: 'grad', label: 'Graduate Students', desc: 'Graduate and PhD students' },
                        { value: 'major-specific', label: 'Major/Department', desc: 'Students in specific academic areas' },
                        { value: 'year-specific', label: 'Class Year', desc: 'Specific graduation years' },
                        { value: 'skill-based', label: 'Skill Level', desc: 'Based on experience or skill level' }
                      ].map((audience) => (
                        <button
                          key={audience.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, targetAudience: audience.value }))}
                          className={`w-full p-3 rounded-lg border transition-colors text-left ${
                            formData.targetAudience === audience.value
                              ? 'border-indigo-500 bg-indigo-500/10'
                              : 'border-[var(--hive-border-default)] hover:border-gray-600'
                          }`}
                        >
                          <Text variant="body-sm" className="font-medium">{audience.label}</Text>
                          <Text variant="body-xs" color="secondary">{audience.desc}</Text>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Meeting Frequency</Text>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: 'weekly', label: 'Weekly' },
                        { value: 'biweekly', label: 'Bi-weekly' },
                        { value: 'monthly', label: 'Monthly' },
                        { value: 'irregular', label: 'Irregular' },
                        { value: 'event-based', label: 'Event-based' },
                        { value: 'continuous', label: 'Continuous' }
                      ].map((frequency) => (
                        <button
                          key={frequency.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, meetingFrequency: frequency.value }))}
                          className={`p-3 rounded-lg border transition-colors ${
                            formData.meetingFrequency === frequency.value
                              ? 'border-indigo-500 bg-indigo-500/10'
                              : 'border-[var(--hive-border-default)] hover:border-gray-600'
                          }`}
                        >
                          <Text variant="body-sm" className="font-medium">{frequency.label}</Text>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Leadership & Structure */}
            {step === 3 && (
              <motion.div
                key="leadership"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="text-center space-y-2">
                  <Text variant="heading-md" className="font-bold">Leadership & Structure</Text>
                  <Text variant="body-sm" color="secondary">
                    How will your space be organized and led?
                  </Text>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Leadership Style</Text>
                    <div className="space-y-2">
                      {[
                        { value: 'single-leader', label: 'Single Leader', desc: 'One primary organizer/president', icon: Crown },
                        { value: 'co-leadership', label: 'Co-Leadership', desc: 'Shared leadership model', icon: Users },
                        { value: 'rotating', label: 'Rotating Leadership', desc: 'Leadership rotates among members', icon: Activity },
                        { value: 'democratic', label: 'Democratic', desc: 'Group decisions and consensus', icon: Users },
                        { value: 'hierarchical', label: 'Hierarchical', desc: 'Traditional officer structure', icon: Building }
                      ].map((style) => (
                        <button
                          key={style.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, leadershipStyle: style.value }))}
                          className={`w-full p-3 rounded-lg border transition-colors text-left ${
                            formData.leadershipStyle === style.value
                              ? 'border-indigo-500 bg-indigo-500/10'
                              : 'border-[var(--hive-border-default)] hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <style.icon className="h-4 w-4" />
                            <div className="flex-1">
                              <Text variant="body-sm" className="font-medium">{style.label}</Text>
                              <Text variant="body-xs" color="secondary">{style.desc}</Text>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Text variant="body-sm" className="font-medium">Member Capacity</Text>
                      <HiveInput
                        type="number"
                        placeholder="25"
                        value={formData.memberCapacity}
                        onChange={(e) => setFormData(prev => ({ ...prev, memberCapacity: e.target.value }))}
                        disabled={loading}
                        className="w-full"
                        icon={<Users className="h-4 w-4" />}
                      />
                      <Text variant="body-xs" color="secondary">
                        Leave empty for unlimited
                      </Text>
                    </div>
                    <div className="space-y-2">
                      <Text variant="body-sm" className="font-medium">Join Process</Text>
                      <select 
                        value={formData.joinProcess}
                        onChange={(e) => setFormData(prev => ({ ...prev, joinProcess: e.target.value }))}
                        className="w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)]"
                      >
                        <option value="open">Open Join</option>
                        <option value="application">Application Required</option>
                        <option value="invitation">Invitation Only</option>
                        <option value="interview">Interview Process</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Membership Requirements</Text>
                    <textarea
                      placeholder="What requirements or expectations do you have for members? (e.g., skill level, time commitment, prerequisites)"
                      value={formData.membershipRequirements}
                      onChange={(e) => setFormData(prev => ({ ...prev, membershipRequirements: e.target.value }))}
                      className="w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)] resize-none"
                      rows={3}
                      maxLength={200}
                    />
                    <div className="flex justify-between">
                      <Text variant="body-xs" color="secondary">
                        Be clear about expectations and prerequisites
                      </Text>
                      <Text variant="body-xs" color="secondary">
                        {formData.membershipRequirements.length}/200
                      </Text>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Verification & Final Details */}
            {step === 4 && (
              <motion.div
                key="verification"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="text-center space-y-2">
                  <Text variant="heading-md" className="font-bold">Leadership Verification</Text>
                  <Text variant="body-sm" color="secondary">
                    Verify your ability to lead this campus community
                  </Text>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Leadership Experience</Text>
                    <textarea
                      placeholder="Describe your leadership experience, relevant skills, and why you're the right person to create this space..."
                      value={formData.leadershipExperience}
                      onChange={(e) => setFormData(prev => ({ ...prev, leadershipExperience: e.target.value }))}
                      className="w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)] resize-none"
                      rows={4}
                      maxLength={300}
                    />
                    <div className="flex justify-between">
                      <Text variant="body-xs" color="secondary">
                        Include relevant experience, even if informal
                      </Text>
                      <Text variant="body-xs" color="secondary">
                        {formData.leadershipExperience.length}/300
                      </Text>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Text variant="body-sm" className="font-medium">Campus Affiliation</Text>
                      <HiveInput
                        placeholder="Computer Science Department"
                        value={formData.campusAffiliation}
                        onChange={(e) => setFormData(prev => ({ ...prev, campusAffiliation: e.target.value }))}
                        disabled={loading}
                        className="w-full"
                        icon={<Building className="h-4 w-4" />}
                      />
                      <Text variant="body-xs" color="secondary">
                        Department, college, or organization
                      </Text>
                    </div>
                    <div className="space-y-2">
                      <Text variant="body-sm" className="font-medium">Faculty Advisor (Optional)</Text>
                      <HiveInput
                        placeholder="Prof. Jane Smith"
                        value={formData.facultyAdvisor}
                        onChange={(e) => setFormData(prev => ({ ...prev, facultyAdvisor: e.target.value }))}
                        disabled={loading}
                        className="w-full"
                        icon={<GraduationCap className="h-4 w-4" />}
                      />
                      <Text variant="body-xs" color="secondary">
                        Faculty support strengthens applications
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={formData.officialRecognition}
                        onChange={(e) => setFormData(prev => ({ ...prev, officialRecognition: e.target.checked }))}
                        className="rounded border-gray-600 bg-gray-800"
                      />
                      <div>
                        <Text variant="body-sm" className="font-medium">Seek Official Recognition</Text>
                        <Text variant="body-xs" color="secondary">Apply for official student organization status</Text>
                      </div>
                    </label>
                  </div>

                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Contact Methods</Text>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: 'email', label: 'Email', icon: MessageCircle },
                        { value: 'discord', label: 'Discord', icon: MessageCircle },
                        { value: 'slack', label: 'Slack', icon: MessageCircle },
                        { value: 'instagram', label: 'Instagram', icon: Camera },
                        { value: 'linkedin', label: 'LinkedIn', icon: Users },
                        { value: 'website', label: 'Website', icon: Globe }
                      ].map((method) => (
                        <button
                          key={method.value}
                          type="button"
                          onClick={() => toggleSelection(formData.contactMethods, method.value, 'contactMethods')}
                          className={`p-3 rounded-lg border transition-colors ${
                            formData.contactMethods.includes(method.value)
                              ? 'border-indigo-500 bg-indigo-500/10'
                              : 'border-[var(--hive-border-default)] hover:border-gray-600'
                          }`}
                        >
                          <method.icon className="h-4 w-4 mx-auto mb-1" />
                          <Text variant="body-xs" className="font-medium">{method.label}</Text>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Space Preview */}
                  <div className="p-4 bg-gradient-to-r from-indigo-500/10 to-purple-500/10 rounded-lg border border-indigo-500/20">
                    <Text variant="body-sm" className="font-medium mb-3">Space Preview</Text>
                    <div className="space-y-2">
                      <Text variant="heading-sm" className="font-bold">{formData.spaceName || 'Your Space Name'}</Text>
                      <div className="flex items-center gap-2">
                        {formData.spaceCategory && (
                          <Badge variant="primary" size="sm">
                            {spaceCategories.find(c => c.id === formData.spaceCategory)?.label}
                          </Badge>
                        )}
                        <Badge variant="secondary" size="sm">
                          {formData.memberCapacity ? `Max ${formData.memberCapacity} members` : 'Unlimited'}
                        </Badge>
                      </div>
                      <Text variant="body-sm" color="secondary" className="line-clamp-2">
                        {formData.spaceDescription || 'Space description will appear here...'}
                      </Text>
                      {formData.spaceTags.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {formData.spaceTags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="secondary" size="sm">
                              {tag}
                            </Badge>
                          ))}
                          {formData.spaceTags.length > 3 && (
                            <Badge variant="secondary" size="sm">
                              +{formData.spaceTags.length - 3}
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-between pt-4">
            {step > 1 && (
              <HiveButton
                type="button"
                variant="outline"
                onClick={() => setStep(step - 1)}
                disabled={loading}
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </HiveButton>
            )}
            <HiveButton
              type="submit"
              className={step === 1 ? 'w-full' : 'ml-auto'}
              loading={loading}
              variant="premium"
              size="lg"
              disabled={!formData.spaceName || !formData.spaceCategory}
            >
              {step === 4 ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  {spaceType === 'create' ? 'Create Space' : 'Submit Request'}
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </HiveButton>
          </div>
        </form>

        {/* Step Indicator */}
        <div className="text-center pt-4 border-t border-[var(--hive-border-default)]">
          <Text variant="body-xs" color="secondary">
            Step {step} of 4 • Space {spaceType === 'create' ? 'Creation' : 'Request'}
          </Text>
          <div className="flex items-center justify-center gap-1 mt-2">
            <FormIcon className="h-3 w-3 text-indigo-500" />
            <Text variant="body-xs" className="text-indigo-400">
              {step === 1 && 'Defining space identity...'}
              {step === 2 && 'Setting goals and purpose...'}
              {step === 3 && 'Organizing leadership...'}
              {step === 4 && 'Verifying qualifications...'}
            </Text>
          </div>
        </div>
      </motion.div>
    </HiveCard>
  );
};

// Quick Space Join Form
const QuickSpaceJoinForm: React.FC<SpaceActivationFormProps> = ({ onSubmit, loading, className }) => {
  const [formData, setFormData] = useState({
    reason: '',
    experience: '',
    contribution: '',
    availability: '',
    contactPreference: 'hive-dm'
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
  };

  return (
    <HiveCard className={`w-100 ${className}`} variant="elevated" size="lg">
      <motion.div
        variants={गति.slideUp}
        initial="initial"
        animate="animate"
        className="p-6 space-y-6"
      >
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto flex items-center justify-center">
            <UserPlus className="w-6 h-6 text-[var(--hive-text-primary)]" />
          </div>
          <div>
            <Text variant="heading-lg" className="font-bold">Join Space Request</Text>
            <Text variant="body-md" color="secondary">
              Express interest in joining this community
            </Text>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Text variant="body-sm" className="font-medium">Why do you want to join?</Text>
            <textarea
              placeholder="Share what interests you about this space and what you hope to gain..."
              value={formData.reason}
              onChange={(e) => setFormData(prev => ({ ...prev, reason: e.target.value }))}
              className="w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)] resize-none"
              rows={3}
              required
            />
          </div>

          <div className="space-y-2">
            <Text variant="body-sm" className="font-medium">Relevant Experience</Text>
            <HiveInput
              placeholder="Any relevant background or experience..."
              value={formData.experience}
              onChange={(e) => setFormData(prev => ({ ...prev, experience: e.target.value }))}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Text variant="body-sm" className="font-medium">How can you contribute?</Text>
            <textarea
              placeholder="What unique skills, perspectives, or energy would you bring to this space?"
              value={formData.contribution}
              onChange={(e) => setFormData(prev => ({ ...prev, contribution: e.target.value }))}
              className="w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)] resize-none"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Text variant="body-sm" className="font-medium">Availability</Text>
            <select 
              value={formData.availability}
              onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
              className="w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)]"
            >
              <option value="">Select your availability</option>
              <option value="very-active">Very Active (Daily participation)</option>
              <option value="regular">Regular (Few times per week)</option>
              <option value="moderate">Moderate (Weekly participation)</option>
              <option value="casual">Casual (When possible)</option>
            </select>
          </div>

          <HiveButton
            type="submit"
            className="w-full"
            loading={loading}
            variant="premium"
            size="lg"
          >
            <UserPlus className="h-4 w-4 mr-2" />
            Send Join Request
          </HiveButton>
        </form>

        <div className="text-center">
          <Text variant="body-xs" color="secondary">
            Space leaders will review your request
          </Text>
        </div>
      </motion.div>
    </HiveCard>
  );
};

// Stories Configuration
const meta: Meta = {
  title: '03-molecules/Forms/Space Activation Forms',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Space Activation Forms** - Campus community creation and management

Molecular forms for creating and managing campus Spaces - the community layer of HIVE that brings students together around shared interests, goals, and activities.

## Space Management Philosophy
- **Leadership Verification**: Ensuring quality community leadership through structured validation
- **Campus Integration**: Seamless connection with university departments and official recognition
- **Community Building**: Focus on sustainable, meaningful student communities
- **Inclusive Access**: Multiple pathways for community participation and leadership

## Form Types
- **Space Creation Form**: Complete 4-step community creation process
- **Space Join Request**: Quick application to join existing communities
- **Leadership Verification**: Validation process for space leadership capabilities

## Key Features
- **Multi-step Creation**: Identity → Purpose → Leadership → Verification
- **Category System**: Organized taxonomy for campus community types
- **Leadership Models**: Multiple governance structures for different community types
- **Campus Affiliation**: Integration with departments and official recognition
- **Membership Management**: Capacity, requirements, and join processes

## Design Patterns
- **Progressive Disclosure**: Complex community setup broken into logical steps
- **Leadership Validation**: Structured verification of community leadership capability
- **Campus Context**: University-specific terminology and integration points
- **Community Preview**: Real-time preview of space appearance and settings
        `
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

// Space Creation Stories
export const SpaceCreationDefault: Story = {
  name: 'Space Creation - Complete Flow',
  render: () => (
    <SpaceActivationForm 
      spaceType="create"
      onSubmit={async (data) => {
        console.log('Space Created:', data);
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert('🎉 Space created successfully! Your campus community is now live.');
      }}
    />
  )
};

export const SpaceCreationLoading: Story = {
  name: 'Space Creation - Loading State',
  render: () => (
    <SpaceActivationForm 
      spaceType="create"
      loading={true}
      onSubmit={async (data) => {
        console.log('Space Created:', data);
      }}
    />
  )
};

// Space Join Request Stories
export const SpaceJoinRequest: Story = {
  name: 'Space Join - Quick Request',
  render: () => (
    <QuickSpaceJoinForm 
      onSubmit={async (data) => {
        console.log('Join Request:', data);
        await new Promise(resolve => setTimeout(resolve, 1500));
        alert('✅ Join request sent! Space leaders will review your application.');
      }}
    />
  )
};

export const SpaceJoinRequestLoading: Story = {
  name: 'Space Join - Loading State',
  render: () => (
    <QuickSpaceJoinForm 
      loading={true}
      onSubmit={async (data) => {
        console.log('Join Request:', data);
      }}
    />
  )
};

// Leadership Verification Stories
export const LeadershipVerification: Story = {
  name: 'Leadership Verification Request',
  render: () => (
    <SpaceActivationForm 
      spaceType="request"
      onSubmit={async (data) => {
        console.log('Leadership Request:', data);
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert('📋 Leadership verification submitted! Campus admin will review your qualifications.');
      }}
    />
  )
};

// Complete Space Management Flow
export const CompleteSpaceFlow: Story = {
  name: 'Complete Space Management Flow',
  render: () => {
    const [currentForm, setCurrentForm] = useState<'create' | 'join' | 'request'>('create');

    return (
      <div className="flex flex-col items-center gap-6">
        {/* Form Navigation */}
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentForm('create')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentForm === 'create' 
                ? 'bg-indigo-500 text-[var(--hive-text-primary)]' 
                : 'bg-gray-800 text-gray-400 hover:text-[var(--hive-text-primary)]'
            }`}
          >
            Create Space
          </button>
          <button
            onClick={() => setCurrentForm('join')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentForm === 'join' 
                ? 'bg-green-500 text-[var(--hive-text-primary)]' 
                : 'bg-gray-800 text-gray-400 hover:text-[var(--hive-text-primary)]'
            }`}
          >
            Join Request
          </button>
          <button
            onClick={() => setCurrentForm('request')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentForm === 'request' 
                ? 'bg-purple-500 text-[var(--hive-text-primary)]' 
                : 'bg-gray-800 text-gray-400 hover:text-[var(--hive-text-primary)]'
            }`}
          >
            Leadership Verification
          </button>
        </div>

        {/* Current Form */}
        <AnimatePresence mode="wait">
          {currentForm === 'create' && (
            <motion.div
              key="create"
              variants={गति.slideUp}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <SpaceActivationForm 
                spaceType="create"
                onSubmit={async (data) => {
                  console.log('Space Created:', data);
                  await new Promise(resolve => setTimeout(resolve, 1500));
                }}
              />
            </motion.div>
          )}
          {currentForm === 'join' && (
            <motion.div
              key="join"
              variants={गति.slideUp}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <QuickSpaceJoinForm 
                onSubmit={async (data) => {
                  console.log('Join Request:', data);
                  await new Promise(resolve => setTimeout(resolve, 1500));
                }}
              />
            </motion.div>
          )}
          {currentForm === 'request' && (
            <motion.div
              key="request"
              variants={गति.slideUp}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <SpaceActivationForm 
                spaceType="request"
                onSubmit={async (data) => {
                  console.log('Leadership Request:', data);
                  await new Promise(resolve => setTimeout(resolve, 1500));
                }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
};

// Mobile Space Management
export const MobileSpaceManagement: Story = {
  name: 'Mobile-First Space Management',
  render: () => (
    <div className="max-w-sm mx-auto">
      <SpaceActivationForm 
        spaceType="create"
        className="w-full max-w-sm"
        onSubmit={async (data) => {
          console.log('Mobile Space:', data);
          await new Promise(resolve => setTimeout(resolve, 1500));
        }}
      />
    </div>
  ),
  parameters: {
    viewport: {
      defaultViewport: 'mobile1'
    }
  }
};