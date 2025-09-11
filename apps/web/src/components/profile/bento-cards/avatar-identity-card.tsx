"use client";

import React from 'react';
import { Card, CardContent, Button, Badge } from '@hive/ui';
import { User, Edit, Camera, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export function AvatarIdentityCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full bg-gradient-to-br from-gray-900 to-gray-800 border-gray-700">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Identity</h3>
            <Button size="sm" variant="ghost" className="text-gray-400">
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <Button 
                size="sm" 
                variant="secondary" 
                className="absolute bottom-0 right-0 rounded-full p-1"
              >
                <Camera className="h-3 w-3" />
              </Button>
            </div>
            
            <div className="flex-1">
              <h4 className="text-xl font-bold text-white">Student Name</h4>
              <p className="text-sm text-gray-400">@username</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  CS Major
                </Badge>
                <Badge variant="secondary" className="text-xs">
                  Class of 2026
                </Badge>
              </div>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-700">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-400">Privacy Mode</span>
              <div className="flex items-center gap-1">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-green-400">Public</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}