"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../button';
import { GraduationCap, Users, BookOpen, ArrowRight } from 'lucide-react';
import { hiveVariants } from '../../lib/motion';

export type UserRole = 'student' | 'faculty' | 'alumni';

interface RoleSelectionStepProps {
  onRoleSelect: (role: UserRole) => void;
  schoolName: string;
}

interface RoleOption {
  value: UserRole;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  available: boolean;
  comingSoon?: boolean;
}

export const RoleSelectionStep: React.FC<RoleSelectionStepProps> = ({
  onRoleSelect,
  schoolName,
}) => {
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const roleOptions: RoleOption[] = [
    {
      value: 'student',
      label: 'Student',
      description: 'Currently enrolled undergraduate or graduate student',
      icon: GraduationCap,
      available: true,
    },
    {
      value: 'faculty',
      label: 'Faculty/Staff',
      description: 'Professor, instructor, or staff member',
      icon: Users,
      available: true,
    },
    {
      value: 'alumni',
      label: 'Alumni',
      description: 'Graduate or former student',
      icon: BookOpen,
      available: false,
      comingSoon: true,
    },
  ];

  const handleRoleSelect = (role: UserRole) => {
    const option = roleOptions.find(opt => opt.value === role);
    if (!option?.available) return;
    
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      onRoleSelect(selectedRole);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Progress indicator */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-2">
            {[1, 2, 3, 4, 5].map((stepNum, index) => (
              <div
                key={stepNum}
                className={`w-2 h-2 rounded-full transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] ${
                  index === 0 ? 'bg-accent' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content card */}
        <div className="module-border module-surface module-padding space-y-8">
          {/* Header */}
          <motion.div 
            className="text-center space-y-3"
            variants={hiveVariants.item}
            initial="hidden"
            animate="visible"
          >
            <h1 className="text-2xl font-display font-semibold text-foreground">
              What's your role at {schoolName}?
            </h1>
            <p className="text-muted font-body">
              Help us personalize your HIVE experience
            </p>
          </motion.div>

          {/* Role Options */}
          <motion.div 
            className="space-y-4"
            variants={hiveVariants.container}
            initial="hidden"
            animate="visible"
          >
            {roleOptions.map((option, index) => {
              const Icon = option.icon;
              const isSelected = selectedRole === option.value;
              const isDisabled = !option.available;
              
              return (
                <motion.button
                  key={option.value}
                  onClick={() => handleRoleSelect(option.value)}
                  disabled={isDisabled}
                  className={`w-full p-6 rounded-lg border-2 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] text-left ${
                    isSelected
                      ? 'border-accent bg-accent/10'
                      : isDisabled
                      ? 'border-border bg-surface-01 opacity-60 cursor-not-allowed'
                      : 'border-border bg-surface-01 hover:border-accent/30 hover:bg-surface-02'
                  }`}
                  variants={hiveVariants.item}
                  whileHover={!isDisabled ? { scale: 1.02 } : undefined}
                  whileTap={!isDisabled ? { scale: 0.98 } : undefined}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg ${
                      isSelected 
                        ? 'bg-accent text-background' 
                        : isDisabled
                        ? 'bg-surface-02 text-muted'
                        : 'bg-surface-02 text-foreground'
                    }`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-medium font-body ${
                          isSelected ? 'text-accent' : 'text-foreground'
                        }`}>
                          {option.label}
                        </h3>
                        {option.comingSoon && (
                          <span className="text-xs px-2 py-1 bg-surface-03 text-muted rounded-full">
                            Coming Soon
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-muted font-body">
                        {option.description}
                      </p>
                    </div>

                    {isSelected && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="text-accent"
                      >
                        <ArrowRight className="w-5 h-5" />
                      </motion.div>
                    )}
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Continue Button */}
          <motion.div
            variants={hiveVariants.item}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <Button
              onClick={handleContinue}
              disabled={!selectedRole}
              variant="ritual"
              size="lg"
              className="w-full"
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>

        {/* Step indicator */}
        <div className="text-center mt-6">
          <p className="text-sm text-muted font-body">
            Step 1 of 5
          </p>
        </div>
      </div>
    </div>
  );
};