"use client";

import React from "react";
import { cn } from "../../lib/utils";

interface CalendarEvent {
  id: string;
  title: string;
  date: Date;
  type: "personal" | "space" | "academic";
  spaceId?: string;
}

interface CalendarCardProps {
  events?: CalendarEvent[];
  className?: string;
}

export function CalendarCard({ events = [], className }: CalendarCardProps) {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  
  // Get current month data
  const today = new Date();
  const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startingDayOfWeek = firstDay.getDay();

  // Generate calendar days
  const calendarDays = [];
  
  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    calendarDays.push(null);
  }
  
  // Add days of the month
  for (let day = 1; day <= daysInMonth; day++) {
    calendarDays.push(day);
  }

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const isToday = (day: number) => {
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const hasEvent = (day: number) => {
    return events.some(event => {
      const eventDate = new Date(event.date);
      return (
        eventDate.getDate() === day &&
        eventDate.getMonth() === currentDate.getMonth() &&
        eventDate.getFullYear() === currentDate.getFullYear()
      );
    });
  };

  return (
    <div className={cn("h-full flex flex-col", className)}>
      {/* Header */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-foreground font-display">Calendar</h3>
          
          {/* Month navigation */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}
              className="p-1 hover:text-[#FFD700] transition-colors duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}
              className="p-1 hover:text-[#FFD700] transition-colors duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="text-sm text-muted">
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="flex-1 mb-4">
        {/* Weekday headers */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {["S", "M", "T", "W", "T", "F", "S"].map((day, index) => (
            <div key={`weekday-${day}-${index}`} className="text-center text-xs text-muted font-medium py-1">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar days */}
        <div className="grid grid-cols-7 gap-1">
          {calendarDays.map((day, index) => (
            <div
              key={day ? `day-${day}` : `empty-${index}`}
              className={cn(
                "aspect-square flex items-center justify-center text-xs relative",
                day && "cursor-pointer hover:bg-[#2A2A2A] rounded transition-colors duration-[180ms] ease-[cubic-bezier(0.33,0.65,0,1)]",
                day && isToday(day) && "bg-[#FFD700] text-black rounded font-semibold",
                day && hasEvent(day) && !isToday(day) && "bg-[#2A2A2A] rounded"
              )}
            >
              {day && (
                <>
                  <span>{day}</span>
                  {hasEvent(day) && !isToday(day) && (
                    <div className="absolute bottom-0 right-0 w-1 h-1 bg-[#FFD700] rounded-full" />
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Locked features */}
      <div className="mt-auto space-y-2">
        <div className="flex items-center justify-between p-2 bg-[#2A2A2A]/30 rounded border border-[#2A2A2A] opacity-60">
          <div className="flex items-center gap-2">
            <svg className="w-3 h-3 text-muted" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="text-muted text-xs">Share Availability</span>
          </div>
          <span className="text-xs text-muted/50">Soon</span>
        </div>
        
        <div className="flex items-center justify-between p-2 bg-[#2A2A2A]/30 rounded border border-[#2A2A2A] opacity-60">
          <div className="flex items-center gap-2">
            <svg className="w-3 h-3 text-muted" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
            </svg>
            <span className="text-muted text-xs">Space Events</span>
          </div>
          <span className="text-xs text-muted/50">Soon</span>
        </div>
      </div>
    </div>
  );
}