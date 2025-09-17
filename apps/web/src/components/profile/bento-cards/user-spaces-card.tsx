"use client";

import React from 'react';
import { Card, CardContent, Button, Badge } from '@hive/ui';
import { Hash, Users, TrendingUp, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function UserSpacesCard() {
  const userSpaces = [
    { id: 1, name: "CS 220", members: 234, activity: "high", type: "class" },
    { id: 2, name: "UB Gaming", members: 1200, activity: "medium", type: "interest" },
    { id: 3, name: "Ellicott Hall", members: 456, activity: "high", type: "dorm" }
  ];

  const getActivityColor = (activity: string) => {
    switch (activity) {
      case 'high': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-gray-400';
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
              <Hash className="h-5 w-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">My Spaces</h3>
            </div>
            <Badge variant="secondary" className="text-xs">
              {userSpaces.length}
            </Badge>
          </div>
          
          <div className="space-y-3">
            {userSpaces.map((space) => (
              <div key={space.id} className="p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-white">{space.name}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {space.type}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-1 text-gray-400">
                    <Users className="h-3 w-3" />
                    <span>{space.members.toLocaleString()} members</span>
                  </div>
                  <div className={`flex items-center gap-1 ${getActivityColor(space.activity)}`}>
                    <TrendingUp className="h-3 w-3" />
                    <span>{space.activity} activity</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            variant="ghost" 
            className="w-full mt-4 text-gray-400 hover:text-white"
          >
            Explore More Spaces
            <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}