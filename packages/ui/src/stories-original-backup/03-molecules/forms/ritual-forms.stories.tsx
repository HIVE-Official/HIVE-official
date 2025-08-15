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
  Search,
  Users,
  Rocket,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Star,
  MapPin,
  Calendar,
  Clock,
  Target,
  Lightbulb,
  Code,
  Palette,
  Music,
  Camera,
  Book,
  Gamepad2,
  Heart,
  Sparkles,
  Globe,
  Shield,
  Award,
  TrendingUp,
  Building,
  GraduationCap,
  UserPlus,
  MessageCircle,
  Share,
  Eye,
  EyeOff,
  Upload,
  Image,
  FileText,
  Link,
  Tag,
  Coffee,
  Pizza,
  Headphones,
  Dumbbell,
  Brush,
  Calculator
} from 'lucide-react';

// Ritual Form Props
interface RitualFormProps {
  onSubmit?: (data: any) => Promise<void>;
  onBack?: () => void;
  loading?: boolean;
  className?: string;
}

// Initialize Ritual - Student Campus Identity Formation
const InitializeRitualForm: React.FC<RitualFormProps> = ({ onSubmit, loading, className }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    campusGoals: [] as string[],
    interests: [] as string[],
    availability: '',
    personalityType: '',
    campusExperience: '',
    connectionStyle: '',
    profileVisibility: 'campus',
    bio: '',
    pronouns: ''
  });

  const campusGoals = [
    { id: 'academic', label: 'Academic Excellence', icon: GraduationCap },
    { id: 'social', label: 'Social Connections', icon: Users },
    { id: 'leadership', label: 'Leadership Growth', icon: Star },
    { id: 'creativity', label: 'Creative Expression', icon: Palette },
    { id: 'wellness', label: 'Health & Wellness', icon: Heart },
    { id: 'career', label: 'Career Preparation', icon: Rocket }
  ];

  const interests = [
    { id: 'tech', label: 'Technology', icon: Code },
    { id: 'design', label: 'Design', icon: Palette },
    { id: 'music', label: 'Music', icon: Music },
    { id: 'sports', label: 'Sports', icon: Dumbbell },
    { id: 'gaming', label: 'Gaming', icon: Gamepad2 },
    { id: 'food', label: 'Food & Cooking', icon: Coffee },
    { id: 'reading', label: 'Reading', icon: Book },
    { id: 'photography', label: 'Photography', icon: Camera },
    { id: 'art', label: 'Visual Arts', icon: Brush },
    { id: 'math', label: 'Mathematics', icon: Calculator },
    { id: 'fitness', label: 'Fitness', icon: Dumbbell },
    { id: 'podcasts', label: 'Podcasts', icon: Headphones }
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

  return (
    <HiveCard className={`w-125 ${className}`} variant="elevated" size="lg">
      <motion.div
        variants={गति.slideUp}
        initial="initial"
        animate="animate"
        className="p-6 space-y-6"
      >
        {/* Ritual Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto flex items-center justify-center mb-4">
            <Zap className="w-8 h-8 text-[var(--hive-text-primary)]" />
          </div>
          <div>
            <Badge variant="primary" size="sm" className="mb-2">Ritual 1 of 4</Badge>
            <Text variant="heading-lg" className="font-bold">Initialize</Text>
            <Text variant="body-md" color="secondary">
              Define your campus identity and goals
            </Text>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-1">
          {[1, 2, 3, 4].map((num) => (
            <div
              key={num}
              className={`flex-1 h-1 rounded-full transition-colors ${
                num <= step ? 'bg-gradient-to-r from-blue-500 to-cyan-500' : 'bg-gray-800'
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Campus Goals */}
            {step === 1 && (
              <motion.div
                key="goals"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="text-center space-y-2">
                  <Text variant="heading-md" className="font-bold">What are your campus goals?</Text>
                  <Text variant="body-sm" color="secondary">
                    Select all that resonate with your university journey
                  </Text>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {campusGoals.map((goal) => (
                    <button
                      key={goal.id}
                      type="button"
                      onClick={() => toggleSelection(formData.campusGoals, goal.id, 'campusGoals')}
                      className={`p-4 rounded-lg border transition-all ${
                        formData.campusGoals.includes(goal.id)
                          ? 'border-blue-500 bg-blue-500/10 scale-105'
                          : 'border-[var(--hive-border-default)] hover:border-gray-600 hover:bg-gray-800/50'
                      }`}
                    >
                      <goal.icon className="h-6 w-6 mx-auto mb-2" />
                      <Text variant="body-sm" className="font-medium">{goal.label}</Text>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Interests */}
            {step === 2 && (
              <motion.div
                key="interests"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="text-center space-y-2">
                  <Text variant="heading-md" className="font-bold">What interests you?</Text>
                  <Text variant="body-sm" color="secondary">
                    Help us connect you with like-minded peers
                  </Text>
                </div>

                <div className="grid grid-cols-3 gap-3 max-h-80 overflow-y-auto">
                  {interests.map((interest) => (
                    <button
                      key={interest.id}
                      type="button"
                      onClick={() => toggleSelection(formData.interests, interest.id, 'interests')}
                      className={`p-3 rounded-lg border transition-all ${
                        formData.interests.includes(interest.id)
                          ? 'border-blue-500 bg-blue-500/10 scale-105'
                          : 'border-[var(--hive-border-default)] hover:border-gray-600 hover:bg-gray-800/50'
                      }`}
                    >
                      <interest.icon className="h-5 w-5 mx-auto mb-1" />
                      <Text variant="body-xs" className="font-medium">{interest.label}</Text>
                    </button>
                  ))}
                </div>

                <div className="text-center">
                  <Text variant="body-xs" color="secondary">
                    Selected: {formData.interests.length} interests
                  </Text>
                </div>
              </motion.div>
            )}

            {/* Step 3: Campus Preferences */}
            {step === 3 && (
              <motion.div
                key="preferences"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="text-center space-y-2">
                  <Text variant="heading-md" className="font-bold">Campus Preferences</Text>
                  <Text variant="body-sm" color="secondary">
                    Tell us about your availability and style
                  </Text>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">When are you most available?</Text>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: 'morning', label: 'Morning Person' },
                        { value: 'afternoon', label: 'Afternoon' },
                        { value: 'evening', label: 'Evening' },
                        { value: 'night', label: 'Night Owl' }
                      ].map((time) => (
                        <button
                          key={time.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, availability: time.value }))}
                          className={`p-3 rounded-lg border transition-colors ${
                            formData.availability === time.value
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-[var(--hive-border-default)] hover:border-gray-600'
                          }`}
                        >
                          <Text variant="body-sm">{time.label}</Text>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">How do you prefer to connect?</Text>
                    <div className="space-y-2">
                      {[
                        { value: 'groups', label: 'Large Groups & Events', desc: 'Thrive in bigger social settings' },
                        { value: 'small', label: 'Small Groups', desc: 'Prefer intimate gatherings' },
                        { value: 'one-on-one', label: 'One-on-One', desc: 'Best in personal connections' },
                        { value: 'online', label: 'Digital First', desc: 'Online before in-person' }
                      ].map((style) => (
                        <button
                          key={style.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, connectionStyle: style.value }))}
                          className={`w-full p-3 rounded-lg border transition-colors text-left ${
                            formData.connectionStyle === style.value
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-[var(--hive-border-default)] hover:border-gray-600'
                          }`}
                        >
                          <Text variant="body-sm" className="font-medium">{style.label}</Text>
                          <Text variant="body-xs" color="secondary">{style.desc}</Text>
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Profile Setup */}
            {step === 4 && (
              <motion.div
                key="profile"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="text-center space-y-2">
                  <Text variant="heading-md" className="font-bold">Complete Your Profile</Text>
                  <Text variant="body-sm" color="secondary">
                    Help your peers get to know you
                  </Text>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Pronouns (Optional)</Text>
                    <HiveInput
                      placeholder="they/them, she/her, he/him, etc."
                      value={formData.pronouns}
                      onChange={(e) => setFormData(prev => ({ ...prev, pronouns: e.target.value }))}
                      className="w-full"
                    />
                  </div>

                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Bio</Text>
                    <textarea
                      placeholder="Tell your campus community about yourself..."
                      value={formData.bio}
                      onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                      className="w-full p-3 bg-[var(--hive-background-secondary)] border border-[var(--hive-border-primary)] rounded-lg text-[var(--hive-text-primary)] resize-none"
                      rows={4}
                      maxLength={200}
                    />
                    <div className="flex justify-between items-center">
                      <Text variant="body-xs" color="secondary">
                        Share your story, goals, or fun facts
                      </Text>
                      <Text variant="body-xs" color="secondary">
                        {formData.bio.length}/200
                      </Text>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Profile Visibility</Text>
                    <div className="space-y-2">
                      {[
                        { value: 'campus', label: 'Campus Community', desc: 'Visible to verified students & faculty', icon: Building },
                        { value: 'friends', label: 'Friends Only', desc: 'Only people you connect with', icon: Users },
                        { value: 'private', label: 'Private', desc: 'Only you can see your profile', icon: Shield }
                      ].map((visibility) => (
                        <button
                          key={visibility.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, profileVisibility: visibility.value }))}
                          className={`w-full p-3 rounded-lg border transition-colors text-left ${
                            formData.profileVisibility === visibility.value
                              ? 'border-blue-500 bg-blue-500/10'
                              : 'border-[var(--hive-border-default)] hover:border-gray-600'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <visibility.icon className="h-4 w-4" />
                            <div className="flex-1">
                              <Text variant="body-sm" className="font-medium">{visibility.label}</Text>
                              <Text variant="body-xs" color="secondary">{visibility.desc}</Text>
                            </div>
                          </div>
                        </button>
                      ))}
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
              disabled={step === 1 && formData.campusGoals.length === 0}
            >
              {step === 4 ? (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Complete Initialize Ritual
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

        {/* Ritual Progress */}
        <div className="text-center pt-4 border-t border-[var(--hive-border-default)]">
          <Text variant="body-xs" color="secondary">
            Step {step} of 4 • Initialize Ritual
          </Text>
          <div className="flex items-center justify-center gap-1 mt-2">
            <Zap className="h-3 w-3 text-blue-500" />
            <Text variant="body-xs" className="text-blue-400">Building your campus identity...</Text>
          </div>
        </div>
      </motion.div>
    </HiveCard>
  );
};

// Discover Ritual - Campus Community & Space Discovery
const DiscoverRitualForm: React.FC<RitualFormProps> = ({ onSubmit, loading, className }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    explorationStyle: '',
    spaceTypes: [] as string[],
    commitmentLevel: '',
    leadershipInterest: '',
    discoveryPreferences: [] as string[],
    campusAreas: [] as string[]
  });

  const spaceTypes = [
    { id: 'academic', label: 'Study Groups', desc: 'Collaborative learning', icon: Book },
    { id: 'social', label: 'Social Clubs', desc: 'Fun & friendship', icon: Users },
    { id: 'professional', label: 'Career Dev', desc: 'Professional growth', icon: Rocket },
    { id: 'creative', label: 'Creative Arts', desc: 'Artistic expression', icon: Palette },
    { id: 'wellness', label: 'Health & Fitness', desc: 'Physical & mental wellness', icon: Heart },
    { id: 'service', label: 'Community Service', desc: 'Give back together', icon: Star }
  ];

  const campusAreas = [
    { id: 'library', label: 'Library & Study Spaces', icon: Book },
    { id: 'union', label: 'Student Union', icon: Building },
    { id: 'rec', label: 'Recreation Center', icon: Dumbbell },
    { id: 'dining', label: 'Dining Areas', icon: Coffee },
    { id: 'outdoor', label: 'Outdoor Spaces', icon: MapPin },
    { id: 'labs', label: 'Labs & Workshops', icon: Code }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
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

  return (
    <HiveCard className={`w-125 ${className}`} variant="elevated" size="lg">
      <motion.div
        variants={गति.slideUp}
        initial="initial"
        animate="animate"
        className="p-6 space-y-6"
      >
        {/* Ritual Header */}
        <div className="text-center space-y-3">
          <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-[var(--hive-text-primary)]" />
          </div>
          <div>
            <Badge variant="success" size="sm" className="mb-2">Ritual 2 of 4</Badge>
            <Text variant="heading-lg" className="font-bold">Discover</Text>
            <Text variant="body-md" color="secondary">
              Explore campus communities and spaces
            </Text>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center gap-1">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className={`flex-1 h-1 rounded-full transition-colors ${
                num <= step ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gray-800'
              }`}
            />
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <AnimatePresence mode="wait">
            {/* Step 1: Space Types */}
            {step === 1 && (
              <motion.div
                key="spaces"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="text-center space-y-2">
                  <Text variant="heading-md" className="font-bold">What spaces interest you?</Text>
                  <Text variant="body-sm" color="secondary">
                    Select the types of communities you'd like to explore
                  </Text>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {spaceTypes.map((space) => (
                    <button
                      key={space.id}
                      type="button"
                      onClick={() => toggleSelection(formData.spaceTypes, space.id, 'spaceTypes')}
                      className={`p-4 rounded-lg border transition-all text-left ${
                        formData.spaceTypes.includes(space.id)
                          ? 'border-green-500 bg-green-500/10 scale-105'
                          : 'border-[var(--hive-border-default)] hover:border-gray-600 hover:bg-gray-800/50'
                      }`}
                    >
                      <space.icon className="h-6 w-6 mb-2" />
                      <Text variant="body-sm" className="font-medium">{space.label}</Text>
                      <Text variant="body-xs" color="secondary">{space.desc}</Text>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Campus Areas */}
            {step === 2 && (
              <motion.div
                key="areas"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="text-center space-y-2">
                  <Text variant="heading-md" className="font-bold">Where do you spend time?</Text>
                  <Text variant="body-sm" color="secondary">
                    Select your favorite campus areas
                  </Text>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  {campusAreas.map((area) => (
                    <button
                      key={area.id}
                      type="button"
                      onClick={() => toggleSelection(formData.campusAreas, area.id, 'campusAreas')}
                      className={`p-4 rounded-lg border transition-all ${
                        formData.campusAreas.includes(area.id)
                          ? 'border-green-500 bg-green-500/10 scale-105'
                          : 'border-[var(--hive-border-default)] hover:border-gray-600 hover:bg-gray-800/50'
                      }`}
                    >
                      <area.icon className="h-6 w-6 mx-auto mb-2" />
                      <Text variant="body-sm" className="font-medium text-center">{area.label}</Text>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 3: Discovery Preferences */}
            {step === 3 && (
              <motion.div
                key="preferences"
                variants={गति.fadeIn}
                initial="initial"
                animate="animate"
                exit="exit"
                className="space-y-4"
              >
                <div className="text-center space-y-2">
                  <Text variant="heading-md" className="font-bold">Discovery Preferences</Text>
                  <Text variant="body-sm" color="secondary">
                    How would you like to explore communities?
                  </Text>
                </div>

                <div className="space-y-4">
                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Exploration Style</Text>
                    <div className="space-y-2">
                      {[
                        { value: 'browse', label: 'Browse & Explore', desc: 'Look around before joining' },
                        { value: 'recommended', label: 'Get Recommendations', desc: 'Show me suggested spaces' },
                        { value: 'search', label: 'Search Specific', desc: 'I know what I\'m looking for' },
                        { value: 'events', label: 'Event-Based', desc: 'Discover through events' }
                      ].map((style) => (
                        <button
                          key={style.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, explorationStyle: style.value }))}
                          className={`w-full p-3 rounded-lg border transition-colors text-left ${
                            formData.explorationStyle === style.value
                              ? 'border-green-500 bg-green-500/10'
                              : 'border-[var(--hive-border-default)] hover:border-gray-600'
                          }`}
                        >
                          <Text variant="body-sm" className="font-medium">{style.label}</Text>
                          <Text variant="body-xs" color="secondary">{style.desc}</Text>
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Text variant="body-sm" className="font-medium">Commitment Level</Text>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { value: 'casual', label: 'Casual Explorer', desc: 'Drop in when interested' },
                        { value: 'regular', label: 'Regular Member', desc: 'Consistent participation' },
                        { value: 'active', label: 'Active Contributor', desc: 'Help organize & lead' },
                        { value: 'leader', label: 'Future Leader', desc: 'Want to create impact' }
                      ].map((level) => (
                        <button
                          key={level.value}
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, commitmentLevel: level.value }))}
                          className={`p-3 rounded-lg border transition-colors text-left ${
                            formData.commitmentLevel === level.value
                              ? 'border-green-500 bg-green-500/10'
                              : 'border-[var(--hive-border-default)] hover:border-gray-600'
                          }`}
                        >
                          <Text variant="body-sm" className="font-medium">{level.label}</Text>
                          <Text variant="body-xs" color="secondary">{level.desc}</Text>
                        </button>
                      ))}
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
              disabled={step === 1 && formData.spaceTypes.length === 0}
            >
              {step === 3 ? (
                <>
                  <Search className="h-4 w-4 mr-2" />
                  Complete Discover Ritual
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

        {/* Ritual Progress */}
        <div className="text-center pt-4 border-t border-[var(--hive-border-default)]">
          <Text variant="body-xs" color="secondary">
            Step {step} of 3 • Discover Ritual
          </Text>
          <div className="flex items-center justify-center gap-1 mt-2">
            <Search className="h-3 w-3 text-green-500" />
            <Text variant="body-xs" className="text-green-400">Exploring campus communities...</Text>
          </div>
        </div>
      </motion.div>
    </HiveCard>
  );
};

// Stories Configuration
const meta: Meta = {
  title: '03-molecules/Forms/Ritual Forms',
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
**HIVE Ritual Forms** - Student progression through campus social rituals

Core molecular forms for the four HIVE rituals that guide students through intentional campus community formation. Each ritual builds upon the previous to create deep, meaningful connections.

## The Four Rituals
1. **Initialize** - Campus identity formation and goal setting
2. **Discover** - Community exploration and space discovery  
3. **Connect** - Peer relationship building and social integration
4. **Deploy** - Leadership development and community contribution

## Design Philosophy
- **Progressive Revelation**: Each step builds emotional investment
- **Gamified Experience**: Visual progress and achievement unlocks
- **Social Context**: Always emphasizing community over individual
- **Campus-Specific**: Tailored to university life and student needs

## Form Patterns
- **Multi-step Wizards**: Prevent cognitive overload while building engagement
- **Visual Selection**: Icon-based choices for intuitive interaction
- **Progress Tracking**: Clear visual feedback on ritual completion
- **Contextual Help**: Guidance that feels supportive, not instructional

## Technical Features
- **Smooth Transitions**: गति motion system for fluid step progression
- **State Management**: Complex form state with validation
- **Responsive Design**: Mobile-first for campus student usage
- **Accessibility**: Screen reader support and keyboard navigation
        `
      }
    }
  },
  tags: ['autodocs']
};

export default meta;
type Story = StoryObj;

// Initialize Ritual Stories
export const InitializeRitualDefault: Story = {
  name: 'Initialize Ritual - Complete Flow',
  render: () => (
    <InitializeRitualForm 
      onSubmit={async (data) => {
        console.log('Initialize Ritual:', data);
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert('🎉 Initialize Ritual Complete! Welcome to your HIVE journey.');
      }}
    />
  )
};

export const InitializeRitualLoading: Story = {
  name: 'Initialize Ritual - Loading State',
  render: () => (
    <InitializeRitualForm 
      loading={true}
      onSubmit={async (data) => {
        console.log('Initialize Ritual:', data);
      }}
    />
  )
};

// Discover Ritual Stories
export const DiscoverRitualDefault: Story = {
  name: 'Discover Ritual - Complete Flow',
  render: () => (
    <DiscoverRitualForm 
      onSubmit={async (data) => {
        console.log('Discover Ritual:', data);
        await new Promise(resolve => setTimeout(resolve, 2000));
        alert('🌟 Discover Ritual Complete! Ready to explore your campus.');
      }}
    />
  )
};

export const DiscoverRitualLoading: Story = {
  name: 'Discover Ritual - Loading State',
  render: () => (
    <DiscoverRitualForm 
      loading={true}
      onSubmit={async (data) => {
        console.log('Discover Ritual:', data);
      }}
    />
  )
};

// Complete Ritual Journey
export const CompleteRitualJourney: Story = {
  name: 'Complete Ritual Journey',
  render: () => {
    const [currentRitual, setCurrentRitual] = useState<'initialize' | 'discover' | 'complete'>('initialize');
    const [completedRituals, setCompletedRituals] = useState<string[]>([]);

    const handleRitualComplete = async (ritualName: string, data: any) => {
      console.log(`${ritualName} completed:`, data);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setCompletedRituals(prev => [...prev, ritualName]);
      
      if (ritualName === 'initialize') {
        setCurrentRitual('discover');
      } else if (ritualName === 'discover') {
        setCurrentRitual('complete');
      }
    };

    if (currentRitual === 'complete') {
      return (
        <HiveCard className="w-100" variant="elevated" size="lg">
          <motion.div
            variants={गति.fadeIn}
            initial="initial"
            animate="animate"
            className="p-6 text-center space-y-4"
          >
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mx-auto flex items-center justify-center mb-4">
              <Award className="w-8 h-8 text-[var(--hive-text-primary)]" />
            </div>
            <Text variant="heading-lg" className="font-bold">Rituals Complete!</Text>
            <Text variant="body-md" color="secondary">
              You've completed {completedRituals.length} rituals and are ready to Connect and Deploy on your campus.
            </Text>
            <div className="flex flex-wrap gap-2 justify-center">
              {completedRituals.map(ritual => (
                <Badge key={ritual} variant="success" size="sm">
                  ✓ {ritual}
                </Badge>
              ))}
            </div>
          </motion.div>
        </HiveCard>
      );
    }

    return (
      <div className="flex flex-col items-center gap-6">
        {/* Ritual Navigation */}
        <div className="flex gap-2">
          <button
            onClick={() => setCurrentRitual('initialize')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentRitual === 'initialize' 
                ? 'bg-blue-500 text-[var(--hive-text-primary)]' 
                : 'bg-gray-800 text-gray-400 hover:text-[var(--hive-text-primary)]'
            }`}
          >
            Initialize {completedRituals.includes('initialize') && '✓'}
          </button>
          <button
            onClick={() => setCurrentRitual('discover')}
            className={`px-4 py-2 rounded-lg transition-colors ${
              currentRitual === 'discover' 
                ? 'bg-green-500 text-[var(--hive-text-primary)]' 
                : 'bg-gray-800 text-gray-400 hover:text-[var(--hive-text-primary)]'
            }`}
          >
            Discover {completedRituals.includes('discover') && '✓'}
          </button>
        </div>

        {/* Current Ritual Form */}
        <AnimatePresence mode="wait">
          {currentRitual === 'initialize' && (
            <motion.div
              key="initialize"
              variants={गति.slideUp}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <InitializeRitualForm 
                onSubmit={(data) => handleRitualComplete('initialize', data)}
              />
            </motion.div>
          )}
          {currentRitual === 'discover' && (
            <motion.div
              key="discover"
              variants={गति.slideUp}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <DiscoverRitualForm 
                onSubmit={(data) => handleRitualComplete('discover', data)}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  }
};

// Mobile Ritual Experience
export const MobileRitualExperience: Story = {
  name: 'Mobile-First Ritual Experience',
  render: () => (
    <div className="max-w-sm mx-auto">
      <InitializeRitualForm 
        className="w-full max-w-sm"
        onSubmit={async (data) => {
          console.log('Mobile Initialize:', data);
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