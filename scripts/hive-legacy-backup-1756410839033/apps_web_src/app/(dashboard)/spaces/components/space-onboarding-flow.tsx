"use client";

import { useState, useEffect } from "react";
import { Card, ButtonEnhanced } from "@hive/ui";
import { 
  Users, 
 
  MessageSquare,
  Calendar,
  Shield,
  CheckCircle,
  ArrowRight,
  Sparkles,
  Clock,
  Target,
  UserPlus,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { type Space } from "@hive/core";

interface OnboardingStep {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType<any>;
  skippable: boolean;
  timeEstimate: number; // seconds
}

interface SpaceOnboardingFlowProps {
  space: Space & {
    welcomeMessage?: string;
    onboardingSteps?: string[];
    moderationLevel?: "open" | "moderated" | "strict";
    expectations?: {
      timeCommitment: string;
      activityLevel: string;
      rules: string[];
    };
  };
  userProfile: {
    isFirstTime: boolean;
    year: "freshman" | "sophomore" | "junior" | "senior";
    joinedSpacesCount: number;
  };
  onComplete: (_preferences: OnboardingPreferences) => void;
  onSkip: () => void;
}

interface OnboardingPreferences {
  notifications: {
    posts: boolean;
    events: boolean;
    mentions: boolean;
    digest: "daily" | "weekly" | "off";
  };
  privacy: {
    showInDirectory: boolean;
    allowDirectMessages: boolean;
  };
  interests: string[];
  availability: {
    preferredMeetingTimes: string[];
    timeZone: string;
  };
}

// Welcome Step Component
function WelcomeStep({ space, userProfile, onNext }: { 
  space: Space; 
  userProfile: any; 
  onNext: () => void;
}) {
  const [showAnimation, setShowAnimation] = useState(false);

  useEffect(() => {
    setShowAnimation(true);
  }, []);

  return (
    <div className="text-center space-y-6">
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: showAnimation ? 1 : 0 }}
        transition={{ type: "spring", delay: 0.2 }}
        className="w-20 h-20 mx-auto bg-gradient-to-br from-hive-gold to-orange-400 rounded-full flex items-center justify-center"
      >
        <Sparkles className="h-10 w-10 text-[var(--hive-text-inverse)]" />
      </motion.div>

      <div>
        <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-2">
          Welcome to {space.name}!
        </h2>
        <p className="text-neutral-300 max-w-md mx-auto">
          {space.description || 
           "You're about to join an amazing community. Let's get you set up for the best experience."}
        </p>
      </div>

      {/* Space Preview Stats */}
      <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto">
        <div className="bg-white/5 rounded-lg p-3">
          <Users className="h-5 w-5 text-blue-400 mx-auto mb-1" />
          <div className="text-sm font-medium text-[var(--hive-text-inverse)]">{space.memberCount}</div>
          <div className="text-xs text-neutral-400">Members</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <MessageSquare className="h-5 w-5 text-green-400 mx-auto mb-1" />
          <div className="text-sm font-medium text-[var(--hive-text-inverse)]">Active</div>
          <div className="text-xs text-neutral-400">Community</div>
        </div>
        <div className="bg-white/5 rounded-lg p-3">
          <Calendar className="h-5 w-5 text-purple-400 mx-auto mb-1" />
          <div className="text-sm font-medium text-[var(--hive-text-inverse)]">Events</div>
          <div className="text-xs text-neutral-400">Weekly</div>
        </div>
      </div>

      {/* Personalized Message */}
      {userProfile.isFirstTime && (
        <Card className="p-4 bg-blue-500/10 border-blue-500/20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <Target className="h-4 w-4 text-blue-400" />
            </div>
            <div className="text-left">
              <p className="text-sm font-medium text-[var(--hive-text-inverse)]">First space on HIVE!</p>
              <p className="text-xs text-neutral-400">
                We'll help you get the most out of your community experience
              </p>
            </div>
          </div>
        </Card>
      )}

      <ButtonEnhanced
        onClick={onNext}
        className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne w-full"
      >
        Let's get started
        <ArrowRight className="h-4 w-4 ml-2" />
      </ButtonEnhanced>
    </div>
  );
}

// Expectations Step
function ExpectationsStep({ space, onNext }: { 
  space: Space & { expectations?: any }; 
  onNext: () => void;
}) {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-[var(--hive-text-inverse)] mb-2">
          What to expect in {space.name}
        </h2>
        <p className="text-neutral-400">
          Here's what members typically experience in this community
        </p>
      </div>

      <div className="space-y-4">
        {/* Time Commitment */}
        <Card className="p-4 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <Clock className="h-5 w-5 text-orange-400" />
            </div>
            <div>
              <h3 className="font-medium text-[var(--hive-text-inverse)]">Time Commitment</h3>
              <p className="text-sm text-neutral-400">
                {space.expectations?.timeCommitment || "2-3 hours per week"}
              </p>
            </div>
          </div>
        </Card>

        {/* Activity Level */}
        <Card className="p-4 bg-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <MessageSquare className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <h3 className="font-medium text-[var(--hive-text-inverse)]">Activity Level</h3>
              <p className="text-sm text-neutral-400">
                {space.expectations?.activityLevel || "Regular posts and events"}
              </p>
            </div>
          </div>
        </Card>

        {/* Community Guidelines */}
        {space.expectations?.rules && (
          <Card className="p-4 bg-white/5">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                <Shield className="h-5 w-5 text-purple-400" />
              </div>
              <div>
                <h3 className="font-medium text-[var(--hive-text-inverse)] mb-2">Community Guidelines</h3>
                <ul className="space-y-1 text-sm text-neutral-400">
                  {space.expectations.rules.slice(0, 3).map((rule: string, index: number) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="h-3 w-3 text-green-400 mt-0.5 flex-shrink-0" />
                      {rule}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Card>
        )}
      </div>

      <div className="flex gap-3">
        <ButtonEnhanced
          variant="outline"
          onClick={onNext}
          className="flex-1 border-white/20 text-[var(--hive-text-inverse)]"
        >
          I understand
        </ButtonEnhanced>
      </div>
    </div>
  );
}

// Notification Preferences Step
function NotificationStep({ onNext, onUpdatePreferences }: { 
  onNext: () => void;
  onUpdatePreferences: (_prefs: Partial<OnboardingPreferences>) => void;
}) {
  const [notifications, setNotifications] = useState<{
    posts: boolean;
    events: boolean;
    mentions: boolean;
    digest: "daily" | "weekly" | "off";
  }>({
    posts: true,
    events: true,
    mentions: true,
    digest: "weekly"
  });

  const handleToggle = (key: keyof typeof notifications) => {
    const updated = { ...notifications, [key]: !notifications[key] };
    setNotifications(updated);
    onUpdatePreferences({ notifications: updated });
  };

  const handleDigestChange = (digest: "daily" | "weekly" | "off") => {
    const updated = { ...notifications, digest };
    setNotifications(updated);
    onUpdatePreferences({ notifications: updated });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-[var(--hive-text-inverse)] mb-2">
          Stay in the loop
        </h2>
        <p className="text-neutral-400">
          Choose how you'd like to be notified about community activity
        </p>
      </div>

      <div className="space-y-4">
        {/* Individual Notifications */}
        {[
          { key: "posts", label: "New Posts", description: "When someone shares something new" },
          { key: "events", label: "Upcoming Events", description: "Event reminders and updates" },
          { key: "mentions", label: "Mentions & Replies", description: "When someone mentions or replies to you" }
        ].map((item) => (
          <Card key={item.key} className="p-4 bg-white/5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium text-[var(--hive-text-inverse)]">{item.label}</h3>
                <p className="text-sm text-neutral-400">{item.description}</p>
              </div>
              <button
                onClick={() => handleToggle(item.key as keyof typeof notifications)}
                className={`
                  w-12 h-6 rounded-full transition-colors relative
                  ${notifications[item.key as keyof typeof notifications] 
                    ? "bg-hive-gold" 
                    : "bg-neutral-600"
                  }
                `}
              >
                <div className={`
                  w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5
                  ${notifications[item.key as keyof typeof notifications] 
                    ? "translate-x-6" 
                    : "translate-x-0.5"
                  }
                `} />
              </button>
            </div>
          </Card>
        ))}

        {/* Digest Frequency */}
        <Card className="p-4 bg-white/5">
          <div className="mb-3">
            <h3 className="font-medium text-[var(--hive-text-inverse)]">Daily Digest</h3>
            <p className="text-sm text-neutral-400">Summary of community activity</p>
          </div>
          
          <div className="grid grid-cols-3 gap-2">
            {[
              { value: "daily", label: "Daily" },
              { value: "weekly", label: "Weekly" },
              { value: "off", label: "Off" }
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => handleDigestChange(option.value as any)}
                className={`
                  p-2 rounded-lg text-sm transition-colors
                  ${notifications.digest === option.value
                    ? "bg-hive-gold text-hive-obsidian"
                    : "bg-white/10 text-neutral-300 hover:bg-white/20"
                  }
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </Card>
      </div>

      <ButtonEnhanced
        onClick={onNext}
        className="w-full bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
      >
        Continue
      </ButtonEnhanced>
    </div>
  );
}

// Main Onboarding Flow Component
export function SpaceOnboardingFlow({ 
  space, 
  userProfile, 
  onComplete, 
  onSkip 
}: SpaceOnboardingFlowProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [preferences, setPreferences] = useState<OnboardingPreferences>({
    notifications: {
      posts: true,
      events: true,
      mentions: true,
      digest: "weekly"
    },
    privacy: {
      showInDirectory: true,
      allowDirectMessages: true
    },
    interests: [],
    availability: {
      preferredMeetingTimes: [],
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    }
  });

  const steps: OnboardingStep[] = [
    {
      id: "welcome",
      title: "Welcome",
      description: "Introduction to the space",
      component: WelcomeStep,
      skippable: false,
      timeEstimate: 30
    },
    {
      id: "expectations",
      title: "Expectations", 
      description: "What to expect",
      component: ExpectationsStep,
      skippable: true,
      timeEstimate: 45
    },
    {
      id: "notifications",
      title: "Notifications",
      description: "Stay updated",
      component: NotificationStep,
      skippable: true,
      timeEstimate: 60
    }
  ];

  const currentStepData = steps[currentStep];
  const StepComponent = currentStepData.component;

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(preferences);
    }
  };

  const handleSkipStep = () => {
    if (currentStepData.skippable) {
      handleNext();
    }
  };

  const updatePreferences = (partial: Partial<OnboardingPreferences>) => {
    setPreferences(prev => ({ ...prev, ...partial }));
  };

  const totalTimeEstimate = steps.reduce((sum, step) => sum + step.timeEstimate, 0);

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-lg font-semibold text-[var(--hive-text-inverse)]">
              Join {space.name}
            </h1>
            <p className="text-sm text-neutral-400">
              Step {currentStep + 1} of {steps.length} • ~{Math.round(totalTimeEstimate/60)} min
            </p>
          </div>
          
          <ButtonEnhanced
            variant="ghost"
            onClick={onSkip}
            className="text-neutral-400 hover:text-[var(--hive-text-inverse)] p-2"
          >
            <X className="h-4 w-4" />
          </ButtonEnhanced>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-hive-gold h-2 rounded-full transition-all duration-500"
            style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
          />
        </div>

        {/* Step Indicators */}
        <div className="flex justify-between mt-2">
          {steps.map((step, index) => (
            <div 
              key={step.id}
              className={`text-xs ${
                index <= currentStep ? "text-hive-gold" : "text-neutral-400"
              }`}
            >
              {step.title}
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="p-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            <StepComponent
              space={space}
              userProfile={userProfile}
              onNext={handleNext}
              onUpdatePreferences={updatePreferences}
              preferences={preferences}
            />
          </motion.div>
        </AnimatePresence>

        {/* Step Actions */}
        {currentStepData.skippable && (
          <div className="mt-6 pt-4 border-t border-white/10">
            <ButtonEnhanced
              variant="ghost"
              onClick={handleSkipStep}
              className="text-neutral-400 hover:text-[var(--hive-text-inverse)] text-sm"
            >
              Skip this step
            </ButtonEnhanced>
          </div>
        )}
      </Card>
    </div>
  );
}

// Post-Join Activation Component
interface PostJoinActivationProps {
  space: Space;
  onComplete: () => void;
}

export function PostJoinActivation({ space, onComplete }: PostJoinActivationProps) {
  const [currentTask, setCurrentTask] = useState(0);
  const [completedTasks, setCompletedTasks] = useState<Set<number>>(new Set());

  const activationTasks = [
    {
      title: "Introduce yourself",
      description: "Share a bit about yourself with the community",
      action: "Write intro post",
      icon: UserPlus,
      color: "text-blue-400"
    },
    {
      title: "Explore recent posts",
      description: "See what the community has been discussing",
      action: "View posts",
      icon: MessageSquare,
      color: "text-green-400"
    },
    {
      title: "Check upcoming events",
      description: "See what's happening in the community",
      action: "View events",
      icon: Calendar,
      color: "text-purple-400"
    }
  ];

  const handleTaskComplete = (taskIndex: number) => {
    setCompletedTasks(prev => new Set([...prev, taskIndex]));
    
    if (taskIndex === currentTask && currentTask < activationTasks.length - 1) {
      setCurrentTask(currentTask + 1);
    }
    
    // Complete activation when all tasks are done
    if (completedTasks.size + 1 === activationTasks.length) {
      setTimeout(onComplete, 1000);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle className="h-8 w-8 text-green-400" />
        </div>
        <h2 className="text-xl font-bold text-[var(--hive-text-inverse)] mb-2">
          Welcome to {space.name}!
        </h2>
        <p className="text-neutral-400">
          Complete these quick tasks to get the most out of your new community
        </p>
      </div>

      <div className="space-y-3">
        {activationTasks.map((task, index) => {
          const Icon = task.icon;
          const isCompleted = completedTasks.has(index);
          const isCurrent = index === currentTask && !isCompleted;
          
          return (
            <Card key={index} className={`
              p-4 transition-all
              ${isCompleted ? "bg-green-500/10 border-green-500/20" : 
                isCurrent ? "bg-hive-gold/10 border-hive-gold/20" : 
                "bg-white/5 border-white/10"}
            `}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`
                    w-8 h-8 rounded-lg flex items-center justify-center
                    ${isCompleted ? "bg-green-500/20" : 
                      isCurrent ? "bg-hive-gold/20" : "bg-white/10"}
                  `}>
                    {isCompleted ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <Icon className={`h-4 w-4 ${isCurrent ? "text-hive-gold" : task.color}`} />
                    )}
                  </div>
                  <div>
                    <h3 className={`font-medium ${
                      isCompleted ? "text-green-400 line-through" : "text-[var(--hive-text-inverse)]"
                    }`}>
                      {task.title}
                    </h3>
                    <p className="text-sm text-neutral-400">{task.description}</p>
                  </div>
                </div>
                
                {!isCompleted && (
                  <ButtonEnhanced
                    size="sm"
                    onClick={() => handleTaskComplete(index)}
                    className={`
                      ${isCurrent 
                        ? "bg-hive-gold text-hive-obsidian hover:bg-hive-champagne" 
                        : "bg-white/10 text-[var(--hive-text-inverse)] hover:bg-white/20"
                      }
                    `}
                  >
                    {task.action}
                  </ButtonEnhanced>
                )}
              </div>
            </Card>
          );
        })}
      </div>

      <div className="mt-6 text-center">
        <p className="text-sm text-neutral-400">
          {completedTasks.size} of {activationTasks.length} tasks completed
        </p>
        <div className="w-full bg-white/10 rounded-full h-2 mt-2">
          <div 
            className="bg-green-400 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(completedTasks.size / activationTasks.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}