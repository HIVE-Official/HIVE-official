"use client";

import React from "react";

export const CalendarWidget = () => {
  // April 2024 calendar data
  const currentMonth = "April 2024";
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  // Generate April 2024 calendar
  const generateCalendarDays = () => {
    // April 1, 2024 is a Monday (1)
    const firstDayOfWeek = 1;
    const daysInApril = 30;

    const days = [];

    // Add empty cells for days before April 1st
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push({ day: "", isCurrentMonth: false, isHighlighted: false });
    }

    // Add April days
    for (let day = 1; day <= daysInApril; day++) {
      days.push({
        day: day.toString(),
        isCurrentMonth: true,
        isHighlighted: day === 16, // Highlight the 16th as shown in mockup
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-6">
      <h3 className="font-display text-lg font-semibold text-white mb-4">
        {currentMonth}
      </h3>

      {/* Days of week header */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className="text-center text-xs font-medium text-zinc-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <div
            key={index}
            className={`
              text-center py-2 text-sm rounded
              ${
                day.isCurrentMonth
                  ? day.isHighlighted
                    ? "bg-[#FFD700] text-black font-semibold"
                    : "text-white hover:bg-zinc-800"
                  : "text-zinc-600"
              }
              ${day.day ? "cursor-pointer" : ""}
            `}
          >
            {day.day}
          </div>
        ))}
      </div>
    </div>
  );
};
