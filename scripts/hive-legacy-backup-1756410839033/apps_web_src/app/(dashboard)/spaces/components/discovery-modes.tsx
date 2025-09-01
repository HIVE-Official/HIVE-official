"use client";

import { useState, useEffect } from "react";
import { Card, ButtonEnhanced } from "@hive/ui";
import { 
  Compass, 
  Search, 
  Users, 
  TrendingUp as _TrendingUp, 
  Heart as _Heart,
  Zap,
  Filter as _Filter,
  ArrowRight,
  Clock as _Clock,
  Star as _Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface DiscoveryMode {
  id: "explore" | "search" | "social" | "quick";
  title: string;
  subtitle: string;
  icon: React.ComponentType<any>;
  color: string;
  gradient: string;
  description: string;
  actionText: string;
}

const discoveryModes: DiscoveryMode[] = [
  {
    id: "quick",
    title: "Quick Start",
    subtitle: "For new students",
    icon: Zap,
    color: "text-hive-gold",
    gradient: "from-hive-gold/10 to-hive-gold/5",
    description: "Answer 3 quick questions and get personalized space recommendations",
    actionText: "Get Started"
  },
  {
    id: "explore",
    title: "Explore by Interest",
    subtitle: "Browse categories",
    icon: Compass,
    color: "text-blue-400", 
    gradient: "from-blue-400/10 to-blue-400/5",
    description: "Visual category exploration with trending and popular spaces",
    actionText: "Start Exploring"
  },
  {
    id: "search",
    title: "Search with Intent", 
    subtitle: "Find specific communities",
    icon: Search,
    color: "text-green-400",
    gradient: "from-green-400/10 to-green-400/5", 
    description: "Advanced filters and keyword search for targeted discovery",
    actionText: "Search Now"
  },
  {
    id: "social",
    title: "Social Discovery",
    subtitle: "Follow friends",
    icon: Users,
    color: "text-purple-400",
    gradient: "from-purple-400/10 to-purple-400/5",
    description: "Discover spaces your friends have joined and are active in",
    actionText: "See Friends"
  }
];

interface DiscoveryModesProps {
  onModeSelect: (_mode: DiscoveryMode["id"]) => void;
  userProfile?: {
    isFirstTime: boolean;
    hasJoinedSpaces: boolean;
    friendsCount: number;
  };
}

export function DiscoveryModes({ onModeSelect, userProfile }: DiscoveryModesProps) {
  const [selectedMode, setSelectedMode] = useState<DiscoveryMode["id"] | null>(null);
  const [recommendedMode, setRecommendedMode] = useState<DiscoveryMode["id"]>("explore");

  useEffect(() => {
    // Recommend mode based on user profile
    if (userProfile?.isFirstTime) {
      setRecommendedMode("quick");
    } else if ((userProfile?.friendsCount ?? 0) > 5) {
      setRecommendedMode("social");
    } else if (userProfile?.hasJoinedSpaces) {
      setRecommendedMode("search");
    } else {
      setRecommendedMode("explore");
    }
  }, [userProfile]);

  const handleModeSelect = (modeId: DiscoveryMode["id"]) => {
    setSelectedMode(modeId);
    setTimeout(() => onModeSelect(modeId), 300);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-2">
          How would you like to discover spaces?
        </h2>
        <p className="text-neutral-400">
          Choose your preferred way to find communities at your university
        </p>
      </div>

      {/* Mode Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {discoveryModes.map((mode) => {
          const Icon = mode.icon;
          const isRecommended = mode.id === recommendedMode;
          const isSelected = selectedMode === mode.id;
          
          return (
            <motion.div
              key={mode.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * discoveryModes.indexOf(mode) }}
            >
              <Card
                className={`
                  relative p-6 cursor-pointer transition-all duration-300 
                  bg-gradient-to-br ${mode.gradient}
                  border-2 hover:scale-[1.02] hover:shadow-lg
                  ${isSelected ? 'border-hive-gold shadow-lg' : 'border-white/10'}
                  ${isRecommended ? 'ring-2 ring-yellow-400/30' : ''}
                `}
                onClick={() => handleModeSelect(mode.id)}
              >
                {/* Recommended Badge */}
                {isRecommended && !isSelected && (
                  <div className="absolute -top-2 -right-2 bg-hive-gold text-hive-obsidian px-2 py-1 rounded-full text-xs font-semibold">
                    Recommended
                  </div>
                )}

                {/* Selected State */}
                <AnimatePresence>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute top-4 right-4 w-6 h-6 bg-hive-gold rounded-full flex items-center justify-center"
                    >
                      <ArrowRight className="h-3 w-3 text-hive-obsidian" />
                    </motion.div>
                  )}
                </AnimatePresence>

                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className={`p-3 rounded-xl bg-white/5 ${mode.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-lg font-semibold text-[var(--hive-text-inverse)]">
                        {mode.title}
                      </h3>
                      <span className="text-sm text-neutral-400">
                        {mode.subtitle}
                      </span>
                    </div>
                    
                    <p className="text-sm text-neutral-300 mb-4">
                      {mode.description}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className={`text-sm font-medium ${mode.color}`}>
                        {mode.actionText}
                      </span>
                      <ArrowRight className={`h-4 w-4 ${mode.color} transition-transform ${isSelected ? 'translate-x-1' : ''}`} />
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-white/10">
        <div className="text-center">
          <div className="text-xl font-bold text-[var(--hive-text-inverse)]">200+</div>
          <div className="text-xs text-neutral-400">Active Spaces</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-[var(--hive-text-inverse)]">15K+</div>
          <div className="text-xs text-neutral-400">Students</div>
        </div>
        <div className="text-center">
          <div className="text-xl font-bold text-[var(--hive-text-inverse)]">95%</div>
          <div className="text-xs text-neutral-400">Find Match</div>
        </div>
      </div>
    </div>
  );
}

// Quick Start Survey Component
interface QuickStartSurveyProps {
  onComplete: (_preferences: {
    interests: string[];
    timeCommitment: string;
    socialStyle: string;
  }) => void;
  onSkip: () => void;
}

export function QuickStartSurvey({ onComplete, onSkip }: QuickStartSurveyProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState({
    interests: [] as string[],
    timeCommitment: "",
    socialStyle: ""
  });

  const questions = [
    {
      id: "interests",
      title: "What are you interested in?",
      subtitle: "Select all that apply",
      type: "multi-select" as const,
      options: [
        { id: "academic", label: "Academic Study Groups", emoji: "📚" },
        { id: "sports", label: "Sports & Recreation", emoji: "⚽" },
        { id: "arts", label: "Arts & Creativity", emoji: "🎭" },
        { id: "tech", label: "Technology & Gaming", emoji: "💻" },
        { id: "service", label: "Community Service", emoji: "🤝" },
        { id: "career", label: "Career Development", emoji: "💼" },
        { id: "culture", label: "Cultural Communities", emoji: "🌍" },
        { id: "greek", label: "Greek Life", emoji: "🏛️" }
      ]
    },
    {
      id: "timeCommitment",
      title: "How much time can you commit?",
      subtitle: "Be honest - you can always adjust later",
      type: "single-select" as const,
      options: [
        { id: "low", label: "Just browsing (1-2 hours/week)", emoji: "👀" },
        { id: "medium", label: "Moderately active (3-5 hours/week)", emoji: "⚖️" },
        { id: "high", label: "Very involved (6+ hours/week)", emoji: "🔥" }
      ]
    },
    {
      id: "socialStyle", 
      title: "What's your social style?",
      subtitle: "This helps us find the right community size",
      type: "single-select" as const,
      options: [
        { id: "intimate", label: "Small, close-knit groups (5-20 people)", emoji: "👥" },
        { id: "medium", label: "Medium communities (20-100 people)", emoji: "👫" },
        { id: "large", label: "Large, active communities (100+ people)", emoji: "🎪" }
      ]
    }
  ];

  const currentQuestion = questions[currentStep];
  
  const handleAnswer = (value: string) => {
    if (currentQuestion.type === "multi-select") {
      const interests = answers.interests.includes(value)
        ? answers.interests.filter(i => i !== value)
        : [...answers.interests, value];
      setAnswers({ ...answers, interests });
    } else {
      setAnswers({ ...answers, [currentQuestion.id]: value });
    }
  };

  const canProceed = () => {
    if (currentQuestion.type === "multi-select") {
      return answers.interests.length > 0;
    }
    return answers[currentQuestion.id as keyof typeof answers];
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(answers);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-neutral-400">
            Question {currentStep + 1} of {questions.length}
          </span>
          <button
            onClick={onSkip}
            className="text-sm text-neutral-400 hover:text-[var(--hive-text-inverse)]"
          >
            Skip survey
          </button>
        </div>
        <div className="w-full bg-white/10 rounded-full h-2">
          <div 
            className="bg-hive-gold h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Question */}
      <Card className="p-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-[var(--hive-text-inverse)] mb-2">
            {currentQuestion.title}
          </h2>
          <p className="text-neutral-400">
            {currentQuestion.subtitle}
          </p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-1 gap-3 mb-8">
          {currentQuestion.options.map((option) => {
            const isSelected = currentQuestion.type === "multi-select"
              ? answers.interests.includes(option.id)
              : answers[currentQuestion.id as keyof typeof answers] === option.id;

            return (
              <button
                key={option.id}
                onClick={() => handleAnswer(option.id)}
                className={`
                  p-4 rounded-xl text-left transition-all
                  flex items-center gap-3
                  ${isSelected 
                    ? 'bg-hive-gold/20 border-hive-gold text-hive-gold' 
                    : 'bg-white/5 border-white/10 text-[var(--hive-text-inverse)] hover:bg-white/10'
                  }
                  border-2
                `}
              >
                <span className="text-2xl">{option.emoji}</span>
                <span className="font-medium">{option.label}</span>
              </button>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex justify-between">
          <ButtonEnhanced
            variant="ghost"
            onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
            disabled={currentStep === 0}
            className="text-neutral-400"
          >
            Back
          </ButtonEnhanced>
          <ButtonEnhanced
            onClick={handleNext}
            disabled={!canProceed()}
            className="bg-hive-gold text-hive-obsidian hover:bg-hive-champagne"
          >
            {currentStep === questions.length - 1 ? "Get My Recommendations" : "Next"}
          </ButtonEnhanced>
        </div>
      </Card>
    </div>
  );
}