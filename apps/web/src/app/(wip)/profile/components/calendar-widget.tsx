"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@hive/ui";
import { ChevronLeft, ChevronRight, Calendar, Clock } from "lucide-react";

const events = [
  { id: '1', date: '2024-01-15', title: 'CS 101 Study Group', time: '2:00 PM' },
  { id: '2', date: '2024-01-16', title: 'Engineering Club Meeting', time: '4:00 PM' },
  { id: '3', date: '2024-01-17', title: 'Career Fair', time: '10:00 AM' },
  { id: '4', date: '2024-01-18', title: 'Math Tutoring', time: '3:00 PM' },
];

export const CalendarWidget = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const renderCalendarDays = () => {
    const days = [];
    
    // Empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(
        <div key={`empty-${i}`} className="h-8 w-8"></div>
      );
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dayKey = `day-${currentDate.getFullYear()}-${currentDate.getMonth()}-${day}`;
      days.push(
        <div
          key={dayKey}
          className="h-8 w-8 flex items-center justify-center text-sm hover:bg-accent rounded cursor-pointer"
        >
          {day}
        </div>
      );
    }
    
    return days;
  };

  return (
    <Card className="bg-card">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Calendar</CardTitle>
          <div className="flex items-center space-x-2">
            <button onClick={previousMonth} className="p-1 hover:bg-accent rounded">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <span className="text-sm font-medium">
              {currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </span>
            <button onClick={nextMonth} className="p-1 hover:bg-accent rounded">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-1 text-center">
          {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
            <div key={`weekday-${day}-${index}`} className="h-8 w-8 flex items-center justify-center text-xs font-medium text-muted-foreground">
              {day}
            </div>
          ))}
          {renderCalendarDays()}
        </div>
        
        {/* Upcoming Events */}
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Upcoming Events</h4>
          {events.slice(0, 3).map((event) => (
            <div key={event.id} className="flex items-center space-x-2 text-sm">
              <Calendar className="h-3 w-3 text-muted-foreground" />
              <span className="flex-1">{event.title}</span>
              <div className="flex items-center text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {event.time}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
