"use client";

import React from "react";

export const CalendarWidget = () => {
  // April 2024 calendar data
  const currentMonth = "April 2024";
  const daysOfWeek = ["S", "M", "T", "W", "T", "F", "S"];

  // Generate April 2024 calendar
  const generateCalendarDays = () => {
    const firstDay = new Date(2024, 3, 1).getDay(); // April 1, 2024 (0 = Sunday)
    const daysInMonth = new Date(2024, 3, 0).getDate(); // Days in March (31)
    const daysInApril = new Date(2024, 4, 0).getDate(); // Days in April (30)

    const days = [];

    // Add empty cells for days before the first day of April
    for (let i = 0; i < firstDay; i++) {
      const prevMonthDay = daysInMonth - firstDay + i + 1;
      days.push({
        day: prevMonthDay,
        isCurrentMonth: false,
        isHighlighted: false,
      });
    }

    // Add all days of April
    for (let day = 1; day <= daysInApril; day++) {
      days.push({
        day,
        isCurrentMonth: true,
        isHighlighted: day === 16, // Highlight the 16th as shown in mockup
      });
    }

    // Fill remaining cells with next month days
    const totalCells = 42; // 6 rows × 7 days
    const remainingCells = totalCells - days.length;
    for (let day = 1; day <= remainingCells; day++) {
      days.push({
        day,
        isCurrentMonth: false,
        isHighlighted: false,
      });
    }

    return days;
  };

  const calendarDays = generateCalendarDays();

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm border border-zinc-800 rounded-lg p-6">
      {/* Calendar Header */}
      <div className="text-center mb-6">
        <h2 className="font-display text-2xl font-semibold text-white">
          {currentMonth}
        </h2>
      </div>

      {/* Days of Week Header */}
      <div className="grid grid-cols-7 gap-2 mb-4">
        {daysOfWeek.map((day, index) => (
          <div
            key={index}
            className="text-center text-sm font-medium text-zinc-400 py-2"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-2">
        {calendarDays.map((dayData, index) => (
          <div
            key={index}
            className={`
              aspect-square flex items-center justify-center text-sm font-medium rounded-lg transition-colors duration-200
              ${
                dayData.isCurrentMonth
                  ? dayData.isHighlighted
                    ? "bg-accent text-background font-semibold"
                    : "text-white hover:bg-zinc-800"
                  : "text-zinc-600"
              }
            `}
          >
            {dayData.day}
          </div>
        ))}
      </div>
    </div>
  );
};
