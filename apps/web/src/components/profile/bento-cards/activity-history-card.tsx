"use client";

import React from 'react';
import { Card, CardContent, Button, Badge } from '@hive/ui';
import { Activity, MessageCircle, Heart, Share, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

export function ActivityHistoryCard() {
  const recentActivity = [
    { id: 1, type: "post", action: "Posted in CS 220", time: "2h ago", icon: MessageCircle },
    { id: 2, type: "like", action: "Liked study session", time: "4h ago", icon: Heart },
    { id: 3, type: "join", action: "Joined Gaming Space", time: "1d ago", icon: Share },
    { id: 4, type: "event", action: "Created study group", time: "2d ago", icon: Calendar }
  ];

  const getIconColor = (type: string) => {
    switch (type) {
      case 'post': return 'text-blue-400';
      case 'like': return 'text-red-400';
      case 'join': return 'text-green-400';
      case 'event': return 'text-purple-400';
      default: return 'text-gray-400';
    }
  };

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
              <Activity className="h-5 w-5 text-green-400" />
              <h3 className="text-lg font-semibold text-white">Activity</h3>
            </div>
            <Badge variant="secondary" className="text-xs">
              Recent
            </Badge>
          </div>
          
          <div className="space-y-3">
            {recentActivity.map((activity: any) => {
              const IconComponent = activity.icon;
              return (
                <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors cursor-pointer">
                  <IconComponent className={`h-4 w-4 ${getIconColor(activity.type)}`} />
                  <div className="flex-1">
                    <p className="text-sm text-white">{activity.action}</p>
                    <p className="text-xs text-gray-400">{activity.time}</p>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {activity.type}
                  </Badge>
                </div>
              );
            })}
          </div>
          
          <Button 
            variant="ghost" 
            className="w-full mt-4 text-gray-400 hover:text-white"
          >
            View Full History
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}