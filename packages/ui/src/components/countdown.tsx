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
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ duration: 0.5 }}
  >
    <div className="relative bg-[#111111] rounded-lg border border-[#FFD700]/20 p-4 w-[80px] md:w-[100px] overflow-hidden">
      <div className="relative h-[36px] md:h-[44px] flex items-center justify-center">
        <span className="font-mono text-3xl md:text-4xl font-medium text-[#FFD700]">
          {value.toString().padStart(2, '0')}
        </span>
      </div>
    </div>
    <span className="mt-2 text-sm font-sans text-[#FFD700]/80 uppercase tracking-wider">
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
      <div className="text-center font-display text-2xl text-white">
        Launch time!
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 md:gap-8">
      <NumberBox value={timeLeft.days} label="Days" />
      <NumberBox value={timeLeft.hours} label="Hours" />
      <NumberBox value={timeLeft.minutes} label="Minutes" />
      <NumberBox value={timeLeft.seconds} label="Seconds" />
    </div>
  );
}; 