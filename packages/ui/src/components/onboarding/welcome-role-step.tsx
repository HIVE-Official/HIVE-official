"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../button';
import { GraduationCap, Users, BookOpen, ArrowRight, Sparkles } from 'lucide-react';
import { hiveVariants } from '../../lib/motion';
import { useAdaptiveMotion } from '../../lib/adaptive-motion';
import { AlumniWaitlistModal } from './alumni-waitlist-modal';
import { FacultyModal } from './faculty-modal';

type UserRole = 'student' | 'faculty' | 'alumni';

interface WelcomeRoleStepProps {
  onRoleSelect: (role: UserRole, data?: any) => void;
  schoolName: string;
  userEmail: string;
}

interface RoleOption {
  value: UserRole;
  label: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  available: boolean;
  comingSoon?: boolean;
}

export const WelcomeRoleStep: React.FC<WelcomeRoleStepProps> = ({
  onRoleSelect,
  schoolName,
  userEmail,
}) => {
  useAdaptiveMotion('academic'); // For consistency with motion system
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [showAlumniModal, setShowAlumniModal] = useState(false);
  const [showFacultyModal, setShowFacultyModal] = useState(false);

  const roleOptions: RoleOption[] = [
    {
      value: 'student',
      label: 'Student',
      description: 'Connect with classmates, join communities, and make the most of campus life',
      icon: GraduationCap,
      available: true,
    },
    {
      value: 'faculty',
      label: 'Faculty/Staff',
      description: 'Guide students, build academic communities, and enhance campus connections',
      icon: Users,
      available: true,
    },
    {
      value: 'alumni',
      label: 'Alumni',
      description: 'Stay connected with your campus community and upcoming features',
      icon: BookOpen,
      available: true,
      comingSoon: false,
    },
  ];

  const handleRoleSelect = (role: UserRole) => {
    const option = roleOptions.find(opt => opt.value === role);
    if (!option?.available) return;
    
    setSelectedRole(role);
  };

  const handleContinue = () => {
    if (selectedRole) {
      if (selectedRole === 'alumni') {
        setShowAlumniModal(true);
      } else if (selectedRole === 'faculty') {
        setShowFacultyModal(true);
      } else {
        onRoleSelect(selectedRole);
      }
    }
  };

  const handleFacultyContinue = (data: { firstName: string; lastName: string; role: string; selectedSpaceId: string }) => {
    setShowFacultyModal(false);
    onRoleSelect('faculty', data);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" />
      </div>

      <motion.div 
        className="w-full max-w-2xl relative z-10"
        variants={hiveVariants.container}
        initial="hidden"
        animate="visible"
      >
        {/* Progress indicator */}
        <motion.div 
          className="flex justify-center mb-8"
          variants={hiveVariants.item}
        >
          <div className="flex space-x-2">
            {[1, 2, 3, 4].map((stepNum, index) => (
              <div
                key={stepNum}
                className={`w-2 h-2 rounded-full transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] ${
                  index === 0 ? 'bg-accent' : 'bg-muted'
                }`}
              />
            ))}
          </div>
        </motion.div>

        {/* Content card */}
        <motion.div 
          className="module-border module-surface module-padding space-y-8"
          variants={hiveVariants.item}
        >
          {/* Header */}
          <motion.div 
            className="text-center space-y-4"
            variants={hiveVariants.item}
          >
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <Sparkles className="w-8 h-8 text-accent" />
            </div>
            
            <div className="space-y-2">
              <h1 className="text-2xl font-display font-semibold text-foreground">
                How do you connect with {schoolName}?
              </h1>
              <p className="text-muted font-body">
                Help us create the perfect campus experience for you
              </p>
            </div>
          </motion.div>

          {/* Role Selection */}
          <motion.div className="space-y-4" variants={hiveVariants.container}>
            <div className="space-y-3">
              {roleOptions.map((option, index) => {
                const Icon = option.icon;
                const isSelected = selectedRole === option.value;
                const isDisabled = !option.available;
                
                return (
                  <motion.button
                    key={option.value}
                    onClick={() => handleRoleSelect(option.value)}
                    disabled={isDisabled}
                    className={`w-full p-4 rounded-lg border-2 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] text-left ${
                      isSelected
                        ? 'border-accent bg-accent/10'
                        : isDisabled
                        ? 'border-border bg-surface-01 opacity-60 cursor-not-allowed'
                        : 'border-border bg-surface-01 hover:border-accent/30 hover:bg-surface-02'
                    }`}
                    variants={hiveVariants.item}
                    whileHover={!isDisabled ? { scale: 1.01 } : undefined}
                    whileTap={!isDisabled ? { scale: 0.99 } : undefined}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg flex-shrink-0 ${
                        isSelected 
                          ? 'bg-accent text-background' 
                          : isDisabled
                          ? 'bg-surface-02 text-muted'
                          : 'bg-surface-02 text-foreground'
                      }`}>
                        <Icon className="w-5 h-5" />
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
                          className="text-accent flex-shrink-0"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </motion.div>
                      )}
                    </div>
                  </motion.button>
                );
              })}
            </div>
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
              Continue Setup
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
            
            {selectedRole && (
              <motion.p 
                className="text-center text-xs text-muted font-body mt-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                Next: Create your profile
              </motion.p>
            )}
          </motion.div>
        </motion.div>

        {/* Step indicator */}
        <motion.div 
          className="text-center mt-6"
          variants={hiveVariants.item}
        >
          <p className="text-sm text-muted font-body">
            Step 1 of 4
          </p>
        </motion.div>
      </motion.div>

      {/* Alumni Waitlist Modal */}
      <AlumniWaitlistModal
        isOpen={showAlumniModal}
        onClose={() => setShowAlumniModal(false)}
        schoolName={schoolName}
        userEmail={userEmail}
      />

      {/* Faculty Modal */}
      <FacultyModal
        isOpen={showFacultyModal}
        onClose={() => setShowFacultyModal(false)}
        onContinue={handleFacultyContinue}
        schoolName={schoolName}
        userEmail={userEmail}
      />
    </div>
  );
};