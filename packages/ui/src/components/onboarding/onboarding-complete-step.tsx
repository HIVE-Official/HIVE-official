"use client";

import React from 'react';
import { Button } from '../button';
import { Heading, Text } from '../typography';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react';

interface OnboardingCompleteStepProps {
  onGoToFeed: () => void;
}

export const OnboardingCompleteStep: React.FC<OnboardingCompleteStepProps> = ({ onGoToFeed }) => {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
      <Heading level={1} className="mb-4">
        You're All Set!
      </Heading>
      <Text className="mb-8 text-muted-foreground">
        Welcome to the community. Your profile is complete.
      </Text>
      <Button onClick={onGoToFeed} size="lg">
        Go to Feed
      </Button>
    </motion.div>
  );
}; 