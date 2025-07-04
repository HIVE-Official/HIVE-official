"use client";

import React from 'react';
import { Button } from '../button';
import { Heading, Typography } from '../typography';
import { motion } from 'framer-motion';

interface WelcomeStepProps {
  onNext: () => void;
}

export const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Heading level={1} className="mb-4">
        Welcome to HIVE
      </Heading>
      <Typography variant="lead" className="mb-8 text-muted-foreground">
        The social platform for your school. Let's get your profile set up in a few simple steps.
      </Typography>
      <Button onClick={onNext} size="lg">
        Let's Go
      </Button>
    </motion.div>
  );
}; 