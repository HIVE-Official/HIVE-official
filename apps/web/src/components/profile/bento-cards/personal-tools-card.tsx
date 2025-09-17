"use client";

import React from 'react';
import { Card, CardContent, Button, Badge } from '@hive/ui';
import { Wrench, Plus, Zap, Star } from 'lucide-react';
import { motion } from 'framer-motion';

export function PersonalToolsCard() {
  const myTools = [
    { id: 1, name: "Grade Calculator", uses: 45, rating: 4.8, category: "Academic" },
    { id: 2, name: "Room Finder", uses: 23, rating: 4.5, category: "Campus" },
    { id: 3, name: "Study Timer", uses: 67, rating: 4.9, category: "Productivity" }
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
              <Wrench className="h-5 w-5 text-orange-400" />
              <h3 className="text-lg font-semibold text-white">My Tools</h3>
            </div>
            <Button size="sm" variant="ghost" className="text-gray-400">
              <Plus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {myTools.map((tool) => (
              <div key={tool.id} className="p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-white">{tool.name}</h4>
                  <Badge variant="secondary" className="text-xs">
                    {tool.category}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <div className="flex items-center gap-1">
                    <Zap className="h-3 w-3" />
                    <span>{tool.uses} uses</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400" />
                    <span>{tool.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            variant="ghost" 
            className="w-full mt-4 text-gray-400 hover:text-white"
          >
            Browse Tool Library
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}