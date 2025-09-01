import React from 'react';
import { motion, AnimatePresence } from './framer-motion-proxy';

export interface HiveMotionWrapperProps {
  children: React.ReactNode;
  animate?: boolean;
  initial?: any;
  exit?: any;
  transition?: any;
}

export const HiveMotionWrapper: React.FC<HiveMotionWrapperProps> = ({
  children,
  animate = true,
  initial = { opacity: 0 },
  exit = { opacity: 0 },
  transition = { duration: 0.3 },
}) => {
  if (!animate) {
    return <>{children}</>;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={initial}
        animate={{ opacity: 1 }}
        exit={exit}
        transition={transition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

// Magnetic hover effect component
export const HiveMagneticHover: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      {children}
    </motion.div>
  );
};

// Cascade animation component
export const HiveCascade: React.FC<{ 
  children: React.ReactNode;
  delay?: number;
}> = ({ children, delay = 0 }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
};