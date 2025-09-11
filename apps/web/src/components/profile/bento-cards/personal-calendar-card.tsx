"use client";

import React from 'react';
import { Card, CardContent, Button, Badge } from '@hive/ui';
import { Calendar, Plus, Clock, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function PersonalCalendarCard() {
  const upcomingEvents = [
    { id: 1, title: "CS 220 Lecture", time: "10:00 AM", type: "class" },
    { id: 2, title: "Study Group", time: "2:00 PM", type: "study" },
    { id: 3, title: "Gym Session", time: "6:00 PM", type: "personal" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Calendar</h3>
            </div>
            <Button size="sm" variant="ghost" className="text-gray-400">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {upcomingEvents.map((event: any) => (
              <div key={event.id} className="flex items-center justify-between p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <Clock className="h-4 w-4 text-gray-400" />
                  <div>
                    <p className="text-sm font-medium text-white">{event.title}</p>
                    <p className="text-xs text-gray-400">{event.time}</p>
                  </div>
                </div>
                <Badge variant="secondary" className="text-xs">
                  {event.type}
                </Badge>
              </div>
            ))}
          </div>
          
          <Button 
            variant="ghost" 
            className="w-full mt-4 text-gray-400 hover:text-white"
          >
            View Full Calendar
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}