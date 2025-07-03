import React from 'react';
import { Button } from '../button';
import { Heading, Typography } from '../typography';
import { motion } from 'framer-motion';

interface SchoolPledgeStepProps {
  schoolName: string;
  onNext: () => void;
}

export const SchoolPledgeStep: React.FC<SchoolPledgeStepProps> = ({ schoolName, onNext }) => {
  return (
    <motion.div
      className="text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Heading level={1} className="mb-4">
        One Last Step
      </Heading>
      <Typography variant="lead" className="mb-8 text-muted-foreground">
        Confirm your affiliation with <span className="font-semibold text-foreground">{schoolName}</span> to join your campus community.
      </Typography>
      <Button onClick={onNext} size="lg">
        Join Community
      </Button>
    </motion.div>
  );
}; 