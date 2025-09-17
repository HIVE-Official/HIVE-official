"use client";

import React, { useState } from 'react';
import { Card, CardContent, Button, Badge } from '@hive/ui';
import { Ghost, Eye, EyeOff, Shield, Settings } from 'lucide-react';
import { motion } from 'framer-motion';

export function GhostModeCard() {
  const [isGhostMode, setIsGhostMode] = useState(false);

  const privacySettings = [
    { name: "Activity Status", enabled: true },
    { name: "Location Sharing", enabled: false },
    { name: "Online Presence", enabled: true }
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
              <Ghost className="h-5 w-5 text-indigo-400" />
              <h3 className="text-lg font-semibold text-white">Privacy</h3>
            </div>
            <Button size="sm" variant="ghost" className="text-gray-400">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="mb-4">
            <Button
              onClick={() => setIsGhostMode(!isGhostMode)}
              className={`w-full ${isGhostMode 
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            >
              {isGhostMode ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
              {isGhostMode ? 'Ghost Mode: ON' : 'Ghost Mode: OFF'}
            </Button>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-300">Current Status</span>
              <Badge variant={isGhostMode ? "destructive" : "secondary"} className="text-xs">
                {isGhostMode ? 'Hidden' : 'Visible'}
              </Badge>
            </div>
            
            {privacySettings.map((setting, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded bg-gray-800/50">
                <span className="text-sm text-gray-300">{setting.name}</span>
                <div className="flex items-center gap-1">
                  <Shield className={`h-3 w-3 ${setting.enabled ? 'text-green-400' : 'text-gray-400'}`} />
                  <span className={`text-xs ${setting.enabled ? 'text-green-400' : 'text-gray-400'}`}>
                    {setting.enabled ? 'ON' : 'OFF'}
                  </span>
                </div>
              </div>
            ))}
          </div>
          
          <p className="text-xs text-gray-500 mt-4 text-center">
            {isGhostMode 
              ? 'You\'re invisible to other users' 
              : 'Your activity is visible to connections'
            }
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}