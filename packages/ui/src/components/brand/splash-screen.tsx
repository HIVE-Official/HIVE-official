import React from 'react';
import { motion, Variants, Easing } from 'framer-motion';
import { HiveLogo } from '../HiveLogo';
import { cn } from '../lib/utils';

interface SplashScreenProps {
  tagline?: string;
  className?: string;
}

const SplashScreen = ({
  tagline = 'Finally, Your Campus.',
  className,
}: SplashScreenProps) => {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: [0.33, 0.65, 0, 1] as Easing,
        when: 'beforeChildren',
        staggerChildren: 0.2,
      },
    },
  };

  const logoVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 1.5,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatType: 'mirror',
      },
    },
  };

  const taglineVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.33, 0.65, 0, 1] as Easing,
      },
    },
  };

  return (
    <motion.div
      className={cn(
        'flex h-screen w-screen flex-col items-center justify-center bg-[#0A0A0A] text-white',
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      aria-label="Loading Hive"
      role="status"
    >
      <motion.div variants={logoVariants} className="w-24 h-24">
        <HiveLogo />
      </motion.div>
      <motion.p
        variants={taglineVariants}
        className="mt-4 text-lg font-medium text-muted-foreground"
      >
        {tagline}
      </motion.p>
    </motion.div>
  );
};

export { SplashScreen }; 