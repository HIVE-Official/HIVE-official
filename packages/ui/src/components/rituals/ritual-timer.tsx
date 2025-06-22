"use client";

import * as React from "react";
import { cn } from "../../lib/utils";
import { Clock, Users } from "lucide-react";

interface RitualTimerProps {
  ritualId: string;
  title: string;
  description?: string;
  startTime: Date;
  endTime: Date;
  participantCount: number;
  participantGoal?: number;
  onJoinRitual?: () => void;
  className?: string;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  total: number;
}

const calculateTimeRemaining = (targetDate: Date): TimeRemaining => {
  const now = new Date().getTime();
  const target = targetDate.getTime();
  const difference = target - now;

  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, total: 0 };
  }

  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((difference % (1000 * 60)) / 1000),
    total: difference,
  };
};

export const RitualTimer = React.forwardRef<HTMLDivElement, RitualTimerProps>(
  (
    {
      ritualId: _ritualId,
      title,
      description,
      startTime,
      endTime,
      participantCount,
      participantGoal,
      onJoinRitual,
      className,
      ...props
    },
    ref
  ) => {
    const [timeRemaining, setTimeRemaining] = React.useState<TimeRemaining>(
      calculateTimeRemaining(startTime)
    );
    const [isActive, setIsActive] = React.useState(false);

    React.useEffect(() => {
      const timer = setInterval(() => {
        const now = new Date();

        if (now < startTime) {
          // Countdown to start
          setTimeRemaining(calculateTimeRemaining(startTime));
          setIsActive(false);
        } else if (now >= startTime && now <= endTime) {
          // Active ritual - countdown to end
          setTimeRemaining(calculateTimeRemaining(endTime));
          setIsActive(true);
        } else {
          // Ritual ended
          setTimeRemaining({
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            total: 0,
          });
          setIsActive(false);
        }
      }, 1000);

      return () => clearInterval(timer);
    }, [startTime, endTime]);

    const progress = participantGoal
      ? Math.min((participantCount / participantGoal) * 100, 100)
      : 0;

    const isUrgent = timeRemaining.total < 3600000; // Less than 1 hour
    const circumference = 2 * Math.PI * 45; // radius = 45
    const strokeDashoffset = circumference - (progress / 100) * circumference;

    return (
      <div
        ref={ref}
        className={cn(
          "relative p-6 bg-surface-01 border border-border-line rounded-hive",
          "hover:bg-surface-01-hover transition-all duration-200 cursor-pointer",
          isActive && "ring-2 ring-yellow-500 ring-opacity-50",
          isUrgent && isActive && "animate-pulse",
          className
        )}
        onClick={onJoinRitual}
        {...props}
      >
        {/* Progress Ring */}
        <div className="absolute top-4 right-4">
          <div className="relative w-16 h-16">
            <svg
              className="w-16 h-16 transform -rotate-90"
              viewBox="0 0 100 100"
            >
              {/* Background circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                className="text-border-line"
              />
              {/* Progress circle */}
              <circle
                cx="50"
                cy="50"
                r="45"
                stroke="currentColor"
                strokeWidth="6"
                fill="transparent"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className={cn(
                  "transition-all duration-500 ease-out",
                  isActive ? "text-yellow-500" : "text-blue-500"
                )}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Clock
                className={cn(
                  "h-5 w-5",
                  isActive ? "text-yellow-500" : "text-blue-500",
                  isUrgent && isActive && "animate-pulse"
                )}
              />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="pr-20">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-text-primary font-display">
              {title}
            </h3>
            {isActive && (
              <span className="px-2 py-1 bg-yellow-500 text-black text-xs font-medium rounded-full">
                LIVE
              </span>
            )}
          </div>

          {description && (
            <p className="text-sm text-text-secondary mb-3 line-clamp-2">
              {description}
            </p>
          )}

          {/* Timer Display */}
          <div className="flex items-center gap-4 mb-3">
            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-text-secondary" />
              <span className="text-text-secondary">
                {isActive ? "Ends in:" : "Starts in:"}
              </span>
            </div>
            <div className="flex items-center gap-1 font-mono text-sm">
              {timeRemaining.days > 0 && (
                <span className="text-text-primary">
                  {timeRemaining.days}d{" "}
                </span>
              )}
              <span className="text-text-primary">
                {String(timeRemaining.hours).padStart(2, "0")}:
                {String(timeRemaining.minutes).padStart(2, "0")}:
                {String(timeRemaining.seconds).padStart(2, "0")}
              </span>
            </div>
          </div>

          {/* Participation Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-text-secondary">
              <Users className="h-4 w-4" />
              <span>
                {participantCount} participant
                {participantCount !== 1 ? "s" : ""}
                {participantGoal && ` of ${participantGoal}`}
              </span>
            </div>

            {isActive && (
              <span className="text-xs text-yellow-600 font-medium">
                Click to participate
              </span>
            )}
          </div>
        </div>

        {/* Pulse animation for urgent rituals */}
        {isUrgent && isActive && (
          <div className="absolute inset-0 rounded-hive border-2 border-yellow-500 animate-ping opacity-20" />
        )}
      </div>
    );
  }
);

RitualTimer.displayName = "RitualTimer";

export type { RitualTimerProps, TimeRemaining };
