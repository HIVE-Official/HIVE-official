"use client";

import React from 'react';
import { Card, CardContent, Button } from '@hive/ui';
import { Zap, Plus, MessageSquare, Calendar, Search, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

export function QuickActionsCard() {
  const quickActions = [
    { id: 1, label: "Create Post", icon: Plus, color: "bg-blue-500 hover:bg-blue-600" },
    { id: 2, label: "Start Chat", icon: MessageSquare, color: "bg-green-500 hover:bg-green-600" },
    { id: 3, label: "Plan Event", icon: Calendar, color: "bg-purple-500 hover:bg-purple-600" },
    { id: 4, label: "Find Study", icon: Search, color: "bg-orange-500 hover:bg-orange-600" },
    { id: 5, label: "Grab Coffee", icon: Coffee, color: "bg-amber-500 hover:bg-amber-600" },
    { id: 6, label: "Quick Join", icon: Zap, color: "bg-pink-500 hover:bg-pink-600" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Quick Actions</h3>
          </div>
          
          <div className="grid grid-cols-2 gap-3">
            {quickActions.map((action: any) => {
              const IconComponent = action.icon;
              return (
                <Button
                  key={action.id}
                  className={`h-16 flex flex-col items-center justify-center gap-1 ${action.color} text-white border-0`}
                  variant="secondary"
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="text-xs font-medium">{action.label}</span>
                </Button>
              );
            })}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Most Used</span>
              <div className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4 text-green-400" />
                <span className="text-green-400">Start Chat</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}