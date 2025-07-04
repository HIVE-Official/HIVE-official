"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface CountdownProps {
  targetDate: string;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const calculateTimeLeft = (targetDate: string): TimeLeft | null => {
  const difference = +new Date(targetDate) - +new Date();
  if (difference <= 0) {
    return null;
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
};

const NumberBox = ({ value, label }: { value: number; label: string }) => (
  <motion.div 
    className="flex flex-col items-center"
    initial={{ opacity: 0, scale: 0.8, y: 20 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ 
      duration: 0.18, 
      ease: [0.33, 0.65, 0, 1] 
    }}
  >
    <div className="relative bg-transparent rounded-lg border border-[#FFD700]/30 p-3 sm:p-4 w-[60px] sm:w-[80px] md:w-[100px] overflow-hidden">
      <div className="relative h-[30px] sm:h-[36px] md:h-[44px] flex items-center justify-center">
        <motion.span 
          className="font-mono text-2xl sm:text-3xl md:text-4xl font-normal text-[#FFD700]/90"
          key={value}
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.24, 
            ease: [0.33, 0.65, 0, 1] 
          }}
        >
          {value.toString().padStart(2, '0')}
        </motion.span>
      </div>
    </div>
    <span className="mt-2 text-xs sm:text-sm font-sans text-[#FFD700]/60 uppercase tracking-wider">
      {label}
    </span>
  </motion.div>
);

export const Countdown = ({ targetDate }: CountdownProps) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft | null>(calculateTimeLeft(targetDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate]);

  if (!timeLeft) {
    return (
      <div className="text-center font-display text-2xl text-foreground">
        Launch time!
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-8">
      <NumberBox value={timeLeft.days} label="Days" />
      <NumberBox value={timeLeft.hours} label="Hours" />
      <NumberBox value={timeLeft.minutes} label="Minutes" />
      <NumberBox value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}; 