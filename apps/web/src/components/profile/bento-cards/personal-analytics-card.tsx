"use client";

import React from 'react';
import { Card, CardContent, Button, Badge } from '@hive/ui';
import { motion } from 'framer-motion';
import { BarChart3, TrendingUp, Target } from 'lucide-react';

export function PersonalAnalyticsCard() {
  const stats = [
    { label: "Posts This Week", value: 12, change: "+25%", trend: "up" },
    { label: "Spaces Joined", value: 8, change: "+2", trend: "up" },
    { label: "Tools Used", value: 15, change: "-3", trend: "down" },
    { label: "Study Hours", value: 28, change: "+4h", trend: "up" }
  ];

  const getTrendColor = (trend: string) => {
    return trend === 'up' ? 'text-green-400' : 'text-red-400';
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
              <BarChart3 className="h-5 w-5 text-emerald-400" />
              <h3 className="text-lg font-semibold text-white">Analytics</h3>
            </div>
            <Badge variant="secondary" className="text-xs">
              This Week
            </Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-3 mb-4">
            {stats.map((stat, index) => (
              <div key={index} className="p-3 rounded-lg bg-gray-800/50">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-2xl font-bold text-white">{stat.value}</span>
                  <div className={`flex items-center gap-1 text-xs ${getTrendColor(stat.trend)}`}>
                    <TrendingUp className="h-3 w-3" />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <p className="text-xs text-gray-400">{stat.label}</p>
              </div>
            ))}
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">Weekly Goal Progress</span>
              <Badge variant="secondary" className="text-xs">
                75%
              </Badge>
            </div>
            <div className="w-full bg-gray-700 rounded-full h-2">
              <div className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 rounded-full" style={{ width: '75%' }} />
            </div>
          </div>
          
          <Button 
            variant="ghost" 
            className="w-full mt-4 text-gray-400 hover:text-white"
          >
            <Target className="h-4 w-4 mr-2" />
            View Detailed Reports
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}