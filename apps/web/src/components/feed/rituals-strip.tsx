"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles,
  Clock,
  Users,
  Trophy,
  Flame,
  Calendar,
  Target,
  ChevronLeft,
  ChevronRight,
  Plus,
  Lock,
  Zap,
  TrendingUp,
  Award,
  Coffee,
  Moon,
  Sun,
  BookOpen,
  Heart,
  Star,
  CheckCircle,
  Circle,
  Play
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Ritual status types
type RitualStatus = 'upcoming' | 'active' | 'joined' | 'completed' | 'locked';
type RitualType = 'daily' | 'weekly' | 'seasonal' | 'achievement' | 'community' | 'creative';

interface Ritual {
  id: string;
  name: string;
  title: string;
  description: string;
  type: RitualType;
  status: RitualStatus;
  icon: React.ElementType;
  color: string;
  gradient: string;
  participants: number;
  totalEligible: number;
  progress: number;
  timeRemaining?: string;
  reward?: string;
  milestone?: {
    current: number;
    next: number;
    label: string;
  };
  isNew?: boolean;
  isPinned?: boolean;
}

// Sample rituals data
const sampleRituals: Ritual[] = [
  {
    id: '1',
    name: 'morning_coffee',
    title: 'Morning Coffee Chat',
    description: 'Share your morning thoughts with campus',
    type: 'daily',
    status: 'active',
    icon: Coffee,
    color: 'text-amber-400',
    gradient: 'from-amber-500 to-orange-500',
    participants: 234,
    totalEligible: 1000,
    progress: 65,
    timeRemaining: '3h 42m',
    reward: 'Early Bird Badge',
    isNew: true,
    isPinned: true
  },
  {
    id: '2',
    name: 'study_streak',
    title: 'Study Streak Challenge',
    description: '7-day collaborative study marathon',
    type: 'weekly',
    status: 'joined',
    icon: BookOpen,
    color: 'text-blue-400',
    gradient: 'from-blue-500 to-cyan-500',
    participants: 1847,
    totalEligible: 3000,
    progress: 42,
    timeRemaining: '4 days',
    milestone: {
      current: 3,
      next: 7,
      label: 'days'
    }
  },
  {
    id: '3',
    name: 'night_owls',
    title: 'Night Owls Unite',
    description: 'Late night problem-solving session',
    type: 'daily',
    status: 'upcoming',
    icon: Moon,
    color: 'text-purple-400',
    gradient: 'from-purple-500 to-pink-500',
    participants: 0,
    totalEligible: 500,
    progress: 0,
    timeRemaining: 'Starts at 10 PM'
  },
  {
    id: '4',
    name: 'tool_forge',
    title: 'Tool Forge Friday',
    description: 'Build something amazing together',
    type: 'creative',
    status: 'active',
    icon: Zap,
    color: 'text-yellow-400',
    gradient: 'from-yellow-500 to-amber-500',
    participants: 89,
    totalEligible: 200,
    progress: 78,
    timeRemaining: '1h 15m',
    reward: 'Builder Badge'
  },
  {
    id: '5',
    name: 'finals_crunch',
    title: 'Finals Week Survival',
    description: 'Support each other through finals',
    type: 'seasonal',
    status: 'locked',
    icon: Target,
    color: 'text-gray-400',
    gradient: 'from-gray-500 to-gray-600',
    participants: 0,
    totalEligible: 5000,
    progress: 0,
    timeRemaining: 'Dec 10-17'
  }
];

// Individual ritual card component
function RitualCard({ ritual, onClick }: { ritual: Ritual; onClick: () => void }) {
  const Icon = ritual.icon;
  const isActive = ritual.status === 'active' || ritual.status === 'joined';
  const isLocked = ritual.status === 'locked';
  
  return (
    <motion.div
      whileHover={{ scale: isLocked ? 1 : 1.02 }}
      whileTap={{ scale: isLocked ? 1 : 0.98 }}
      className={cn(
        "relative flex-shrink-0 w-72 h-32 rounded-xl cursor-pointer overflow-hidden group",
        "bg-gradient-to-br border transition-all duration-300",
        isLocked ? "opacity-50 cursor-not-allowed" : "hover:shadow-lg",
        isActive ? "border-white/20" : "border-white/10"
      )}
      onClick={!isLocked ? onClick : undefined}
      style={{
        background: isLocked ? undefined : `linear-gradient(135deg, ${ritual.gradient})`
      }}
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      {/* Content */}
      <div className="relative h-full p-4 flex flex-col justify-between">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className={cn(
              "p-1.5 rounded-lg bg-white/10 backdrop-blur-sm",
              ritual.color
            )}>
              <Icon className="h-4 w-4" />
            </div>
            <div>
              <h3 className="font-semibold text-white text-sm leading-tight">
                {ritual.title}
              </h3>
              <p className="text-xs text-white/70 mt-0.5">
                {ritual.description}
              </p>
            </div>
          </div>
          
          {/* Status badges */}
          <div className="flex items-center gap-1">
            {ritual.isNew && (
              <span className="px-1.5 py-0.5 text-[10px] font-bold bg-green-400/20 text-green-300 rounded-full">
                NEW
              </span>
            )}
            {ritual.isPinned && (
              <Star className="h-3 w-3 text-yellow-300 fill-current" />
            )}
            {isLocked && (
              <Lock className="h-3 w-3 text-white/50" />
            )}
          </div>
        </div>

        {/* Progress section */}
        <div className="space-y-2">
          {/* Participants or milestone */}
          <div className="flex items-center justify-between text-xs">
            {ritual.milestone ? (
              <div className="flex items-center gap-1 text-white/80">
                <Trophy className="h-3 w-3" />
                <span className="font-medium">
                  {ritual.milestone.current}/{ritual.milestone.next} {ritual.milestone.label}
                </span>
              </div>
            ) : (
              <div className="flex items-center gap-1 text-white/80">
                <Users className="h-3 w-3" />
                <span>{ritual.participants} participating</span>
              </div>
            )}
            
            {/* Time remaining */}
            {ritual.timeRemaining && (
              <div className="flex items-center gap-1 text-white/60">
                <Clock className="h-3 w-3" />
                <span className="text-[11px]">{ritual.timeRemaining}</span>
              </div>
            )}
          </div>

          {/* Progress bar */}
          {ritual.status !== 'upcoming' && ritual.status !== 'locked' && (
            <div className="relative">
              <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-white/80 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${ritual.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
              {ritual.status === 'joined' && (
                <CheckCircle className="absolute -top-0.5 h-2.5 w-2.5 text-green-300 fill-current"
                  style={{ left: `${Math.min(ritual.progress, 95)}%` }}
                />
              )}
            </div>
          )}

          {/* Reward */}
          {ritual.reward && (
            <div className="flex items-center gap-1 text-[11px] text-white/60">
              <Award className="h-3 w-3" />
              <span>Unlocks: {ritual.reward}</span>
            </div>
          )}
        </div>
      </div>

      {/* Hover effect */}
      {!isLocked && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
      )}

      {/* Active/Joined indicator */}
      {ritual.status === 'joined' && (
        <div className="absolute top-2 right-2">
          <div className="flex items-center gap-1 px-2 py-1 bg-green-400/20 backdrop-blur-sm rounded-full">
            <div className="h-1.5 w-1.5 bg-green-400 rounded-full animate-pulse" />
            <span className="text-[10px] text-green-300 font-medium">JOINED</span>
          </div>
        </div>
      )}
    </motion.div>
  );
}

// Main rituals strip component
export function RitualsStrip() {
  const [rituals] = useState<Ritual[]>(sampleRituals);
  const [selectedRitual, setSelectedRitual] = useState<Ritual | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  // Check scroll position
  const checkScrollPosition = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollPosition();
    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener('scroll', checkScrollPosition);
      return () => container.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  // Scroll functions
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      <div className="relative w-full bg-black/40 backdrop-blur-sm border-b border-white/10">
        {/* Header */}
        <div className="px-4 lg:px-6 pt-4 pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-[#FFD700]" />
                <h2 className="text-lg font-bold text-white">Campus Rituals</h2>
              </div>
              <span className="text-xs text-gray-400">
                Shared moments that build our community
              </span>
            </div>
            
            <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FFD700]/10 hover:bg-[#FFD700]/20 border border-[#FFD700]/30 rounded-lg transition-all group">
              <Plus className="h-3.5 w-3.5 text-[#FFD700] group-hover:rotate-90 transition-transform" />
              <span className="text-xs text-[#FFD700] font-medium">Create Ritual</span>
            </button>
          </div>
        </div>

        {/* Scrollable ritual cards */}
        <div className="relative">
          {/* Scroll buttons */}
          <AnimatePresence>
            {canScrollLeft && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => scroll('left')}
                className="absolute left-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-black/80 transition-all"
              >
                <ChevronLeft className="h-4 w-4 text-white" />
              </motion.button>
            )}
            
            {canScrollRight && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => scroll('right')}
                className="absolute right-2 top-1/2 -translate-y-1/2 z-10 p-2 bg-black/60 backdrop-blur-sm border border-white/10 rounded-lg hover:bg-black/80 transition-all"
              >
                <ChevronRight className="h-4 w-4 text-white" />
              </motion.button>
            )}
          </AnimatePresence>

          {/* Ritual cards container */}
          <div
            ref={scrollContainerRef}
            className="flex gap-4 overflow-x-auto scrollbar-hide px-4 lg:px-6 pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {rituals.map((ritual, idx) => (
              <motion.div
                key={ritual.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <RitualCard
                  ritual={ritual}
                  onClick={() => setSelectedRitual(ritual)}
                />
              </motion.div>
            ))}
            
            {/* View all card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: rituals.length * 0.05 }}
              className="flex-shrink-0 w-48 h-32 rounded-xl border border-white/10 bg-white/[0.02] hover:bg-white/[0.05] transition-all cursor-pointer group"
              onClick={() => console.log('View all rituals')}
            >
              <div className="h-full flex flex-col items-center justify-center gap-2">
                <div className="p-3 rounded-full bg-white/[0.05] group-hover:bg-white/[0.08] transition-all">
                  <TrendingUp className="h-5 w-5 text-gray-400 group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm text-gray-400 group-hover:text-white transition-colors">
                  Discover More
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Ritual detail modal */}
      <AnimatePresence>
        {selectedRitual && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedRitual(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-[#0D0D0E] border border-white/10 rounded-xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "p-2 rounded-lg",
                    selectedRitual.color,
                    "bg-gradient-to-br",
                    selectedRitual.gradient
                  )}>
                    <selectedRitual.icon className="h-5 w-5 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">{selectedRitual.title}</h3>
                    <p className="text-sm text-gray-400">{selectedRitual.description}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-white/[0.03] rounded-lg">
                    <div className="text-2xl font-bold text-white">{selectedRitual.participants}</div>
                    <div className="text-xs text-gray-400">Participants</div>
                  </div>
                  <div className="p-3 bg-white/[0.03] rounded-lg">
                    <div className="text-2xl font-bold text-white">{selectedRitual.progress}%</div>
                    <div className="text-xs text-gray-400">Progress</div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2">
                  {selectedRitual.status === 'active' && (
                    <button className="flex-1 px-4 py-2 bg-[#FFD700] text-black font-medium rounded-lg hover:bg-[#FFD700]/90 transition-all flex items-center justify-center gap-2">
                      <Play className="h-4 w-4" />
                      Join Ritual
                    </button>
                  )}
                  {selectedRitual.status === 'joined' && (
                    <button className="flex-1 px-4 py-2 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-all flex items-center justify-center gap-2">
                      <CheckCircle className="h-4 w-4" />
                      Continue
                    </button>
                  )}
                  {selectedRitual.status === 'upcoming' && (
                    <button className="flex-1 px-4 py-2 bg-white/10 text-white font-medium rounded-lg hover:bg-white/20 transition-all flex items-center justify-center gap-2">
                      <Clock className="h-4 w-4" />
                      Set Reminder
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}