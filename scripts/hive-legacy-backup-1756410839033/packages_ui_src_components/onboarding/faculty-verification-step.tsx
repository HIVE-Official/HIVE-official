"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../button';
import { Users, CheckCircle, AlertCircle, ArrowLeft } from 'lucide-react';
import { hiveVariants } from '../../lib/motion';

interface FacultyVerificationStepProps {
  onBack: () => void;
  onVerificationComplete: (spaceId: string) => void;
  schoolName: string;
  userEmail: string;
}

// Mock pre-seeded spaces for UB faculty
const UB_FACULTY_SPACES = [
  {
    id: 'ub-engineering',
    name: 'School of Engineering',
    description: 'Faculty and staff from engineering departments',
    memberCount: 24,
  },
  {
    id: 'ub-medicine',
    name: 'School of Medicine',
    description: 'Medical faculty and research staff',
    memberCount: 18,
  },
  {
    id: 'ub-arts-sciences',
    name: 'College of Arts & Sciences',
    description: 'Faculty from humanities and sciences',
    memberCount: 35,
  },
  {
    id: 'ub-business',
    name: 'School of Management',
    description: 'Business faculty and staff',
    memberCount: 16,
  },
];

export const FacultyVerificationStep: React.FC<FacultyVerificationStepProps> = ({
  onBack,
  onVerificationComplete,
  schoolName,
  userEmail,
}) => {
  const [selectedSpace, setSelectedSpace] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<'pending' | 'success' | 'failed'>('pending');

  const handleSpaceSelect = (spaceId: string) => {
    setSelectedSpace(spaceId);
  };

  const handleVerifyAccess = async () => {
    if (!selectedSpace) return;

    setIsVerifying(true);
    
    // Simulate verification process
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // For demo purposes, approve if email contains "buffalo.edu"
    const isAuthorized = userEmail.includes('buffalo.edu') || userEmail.includes('ub.edu');
    
    if (isAuthorized) {
      setVerificationStatus('success');
      setTimeout(() => {
        onVerificationComplete(selectedSpace);
      }, 1000);
    } else {
      setVerificationStatus('failed');
      setIsVerifying(false);
    }
  };

  const getStatusContent = () => {
    switch (verificationStatus) {
      case 'success':
        return (
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-accent" />
            </div>
            <div>
              <h3 className="text-lg font-display font-medium text-foreground mb-2">
                Verification Successful!
              </h3>
              <p className="text-muted font-body">
                Welcome to the faculty community. Setting up your profile...
              </p>
            </div>
          </motion.div>
        );
      
      case 'failed':
        return (
          <motion.div
            className="text-center space-y-4"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <div className="w-16 h-16 bg-surface-02 rounded-full flex items-center justify-center mx-auto">
              <AlertCircle className="w-8 h-8 text-muted" />
            </div>
            <div>
              <h3 className="text-lg font-display font-medium text-foreground mb-2">
                Verification Failed
              </h3>
              <p className="text-muted font-body mb-4">
                We couldn't verify your faculty status with the provided email. Please contact support if you believe this is an error.
              </p>
              <ButtonEnhanced variant="secondary" onClick={onBack}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Go Back
              </ButtonEnhanced>
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  if (verificationStatus !== 'pending') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" />
        </div>
        
        <div className="w-full max-w-lg relative z-10">
          <div className="module-border module-surface module-padding">
            {getStatusContent()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Background gradients */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#111111,transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_100%,#111111,transparent_50%)]" />
      </div>

      <div className="w-full max-w-2xl relative z-10">
        {/* Content card */}
        <div className="module-border module-surface module-padding space-y-8">
          {/* Header */}
          <motion.div 
            className="text-center space-y-3"
            variants={hiveVariants.item}
            initial="hidden"
            animate="visible"
          >
            <div className="w-16 h-16 bg-surface-01 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-8 h-8 text-accent" />
            </div>
            <h1 className="text-2xl font-display font-semibold text-foreground">
              Faculty Verification
            </h1>
            <p className="text-muted font-body">
              Select your department to join the faculty community at {schoolName}
            </p>
          </motion.div>

          {/* Faculty Spaces */}
          <motion.div 
            className="space-y-3"
            variants={hiveVariants.container}
            initial="hidden"
            animate="visible"
          >
            {UB_FACULTY_SPACES.map((space, index) => {
              const isSelected = selectedSpace === space.id;
              
              return (
                <motion.button
                  key={space.id}
                  onClick={() => handleSpaceSelect(space.id)}
                  className={`w-full p-4 rounded-lg border-2 transition-all duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)] text-left ${
                    isSelected
                      ? 'border-accent bg-accent/10'
                      : 'border-border bg-surface-01 hover:border-accent/30 hover:bg-surface-02'
                  }`}
                  variants={hiveVariants.item}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className={`font-medium font-body mb-1 ${
                        isSelected ? 'text-accent' : 'text-foreground'
                      }`}>
                        {space.name}
                      </h3>
                      <p className="text-sm text-muted font-body">
                        {space.description}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted">
                        {space.memberCount} members
                      </p>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </motion.div>

          {/* Action Buttons */}
          <motion.div 
            className="flex gap-3 pt-4"
            variants={hiveVariants.item}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
          >
            <ButtonEnhanced
              variant="secondary"
              onClick={onBack}
              className="flex-1"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </ButtonEnhanced>
            <ButtonEnhanced
              onClick={handleVerifyAccess}
              disabled={!selectedSpace || isVerifying}
              variant="primary"
              className="flex-2"
            >
              {isVerifying ? 'Verifying...' : 'Verify Access'}
            </ButtonEnhanced>
          </motion.div>

          <div className="text-center pt-4 border-t border-border">
            <p className="text-xs text-muted font-body">
              Verification is based on your {userEmail} email address
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};