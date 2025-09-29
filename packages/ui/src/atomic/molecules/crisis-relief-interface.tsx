'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Heart, Users, MessageCircle, Clock, Shield } from 'lucide-react';
import { cn } from '../../lib/utils';
import { HiveCard } from '../atoms/hive-card';
import { HiveButton } from '../atoms/hive-button';

interface CrisisReliefInterfaceProps {
  className?: string;
  onReliefFound?: () => void;
  timeOfDay?: 'morning' | 'afternoon' | 'evening' | 'late_night';
  stressLevel?: 'mild' | 'moderate' | 'high';
}

interface ReliefOption {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  activeCount: number;
  responseTime: string;
  relief_type: 'immediate' | 'supportive' | 'social';
}

const getReliefOptions = (timeOfDay: string, stressLevel: string): ReliefOption[] => {
  const baseOptions = [
    {
      id: 'study-help',
      title: 'Study Crisis Support',
      description: 'Get immediate help with assignments and exams',
      icon: <Users className="w-5 h-5" />,
      activeCount: 12,
      responseTime: '< 2 min',
      relief_type: 'immediate' as const
    },
    {
      id: 'mental-health',
      title: 'Emotional Support',
      description: 'Talk to peers who understand what you\'re going through',
      icon: <Heart className="w-5 h-5" />,
      activeCount: 8,
      responseTime: '< 5 min',
      relief_type: 'supportive' as const
    },
    {
      id: 'social-connection',
      title: 'Social Relief',
      description: 'Connect with students who are also awake right now',
      icon: <MessageCircle className="w-5 h-5" />,
      activeCount: 15,
      responseTime: 'instant',
      relief_type: 'social' as const
    }
  ];

  // Prioritize based on time and stress level
  if (timeOfDay === 'late_night' && stressLevel === 'high') {
    return baseOptions.sort((a, b) =>
      a.relief_type === 'supportive' ? -1 : 1
    );
  }

  if (stressLevel === 'high') {
    return baseOptions.sort((a, b) =>
      a.relief_type === 'immediate' ? -1 : 1
    );
  }

  return baseOptions;
};

export const CrisisReliefInterface: React.FC<CrisisReliefInterfaceProps> = ({
  className,
  onReliefFound,
  timeOfDay = 'evening',
  stressLevel = 'moderate'
}) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);
  const [reliefOptions] = useState(() => getReliefOptions(timeOfDay, stressLevel));

  const handleOptionSelect = async (optionId: string) => {
    setSelectedOption(optionId);
    setIsConnecting(true);

    // Simulate connection (replace with real logic)
    setTimeout(() => {
      setIsConnecting(false);
      onReliefFound?.();
    }, 1500);
  };

  const getEmergencyMessage = () => {
    if (timeOfDay === 'late_night') {
      return "You're not alone - other UB students are awake right now";
    }
    if (stressLevel === 'high') {
      return "Take a breath. Help is available immediately.";
    }
    return "Find your people. Get the support you need.";
  };

  const getUrgencyColor = () => {
    if (stressLevel === 'high') return 'text-red-400';
    if (timeOfDay === 'late_night') return 'text-blue-400';
    return 'text-[var(--hive-brand-primary)]';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'crisis-relief-interface w-full max-w-md mx-auto space-y-4',
        className
      )}
    >
      {/* Emergency Reassurance Header */}
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className="text-center space-y-2 p-4"
      >
        <div className="flex items-center justify-center gap-2">
          <Shield className={cn("w-6 h-6", getUrgencyColor())} />
          <h2 className="text-xl font-semibold text-[var(--hive-text-primary)]">
            Immediate Support
          </h2>
        </div>

        <p className={cn("text-sm font-medium", getUrgencyColor())}>
          {getEmergencyMessage()}
        </p>

        <div className="flex items-center justify-center gap-2 text-xs text-[var(--hive-text-muted)]">
          <Clock className="w-3 h-3" />
          <span>Response guaranteed in under 5 minutes</span>
        </div>
      </motion.div>

      {/* Relief Options */}
      <div className="space-y-3">
        {reliefOptions.map((option, index) => (
          <motion.div
            key={option.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <HiveCard
              variant={selectedOption === option.id ? "brand" : "default"}
              className={cn(
                "p-4 cursor-pointer transition-all duration-200 hover:scale-[1.02]",
                selectedOption === option.id && "ring-2 ring-[var(--hive-brand-primary)]",
                isConnecting && selectedOption === option.id && "animate-pulse"
              )}
              onClick={() => !isConnecting && handleOptionSelect(option.id)}
            >
              <div className="flex items-start gap-3">
                <div className={cn(
                  "p-2 rounded-lg bg-[var(--hive-brand-primary)]/10",
                  selectedOption === option.id && "bg-[var(--hive-brand-primary)] text-black"
                )}>
                  {option.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-medium text-[var(--hive-text-primary)] truncate">
                      {option.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-[var(--hive-status-success)]">
                        {option.activeCount} online
                      </span>
                      <span className="text-[var(--hive-text-muted)]">
                        {option.responseTime}
                      </span>
                    </div>
                  </div>

                  <p className="text-sm text-[var(--hive-text-secondary)] line-clamp-2">
                    {option.description}
                  </p>
                </div>
              </div>
            </HiveCard>
          </motion.div>
        ))}
      </div>

      {/* Connection Status */}
      {isConnecting && selectedOption && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center p-4"
        >
          <div className="inline-flex items-center gap-2 text-[var(--hive-brand-primary)]">
            <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
            <span className="text-sm font-medium">
              Connecting you to support...
            </span>
          </div>
        </motion.div>
      )}

      {/* Emergency Resources */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-center text-xs text-[var(--hive-text-muted)] space-y-1 p-4 border-t border-[var(--hive-border-primary)]"
      >
        <p>For urgent mental health support:</p>
        <p>
          <span className="text-[var(--hive-text-primary)] font-medium">
            UB Counseling: (716) 645-2720
          </span>
          {' '}•{' '}
          <span className="text-[var(--hive-text-primary)] font-medium">
            Crisis Text Line: Text HOME to 741741
          </span>
        </p>
      </motion.div>
    </motion.div>
  );
};