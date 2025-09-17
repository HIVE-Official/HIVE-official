"use client";

import React from 'react';
import { Card, CardContent, Button, Badge } from '@hive/ui';
import { Users, UserPlus, MessageCircle, Coffee } from 'lucide-react';
import { motion } from 'framer-motion';

export function SocialConnectionsCard() {
  const connections = [
    { id: 1, name: "Alex Chen", status: "online", activity: "Studying CS 220", mutual: 3 },
    { id: 2, name: "Sarah Kim", status: "away", activity: "In library", mutual: 8 },
    { id: 3, name: "Mike Johnson", status: "offline", activity: "Last seen 2h ago", mutual: 2 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400';
      case 'away': return 'bg-yellow-400';
      case 'offline': return 'bg-gray-400';
      default: return 'bg-gray-400';
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
              <Users className="h-5 w-5 text-cyan-400" />
              <h3 className="text-lg font-semibold text-white">Connections</h3>
            </div>
            <Button size="sm" variant="ghost" className="text-gray-400">
              <UserPlus className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="space-y-3">
            {connections.map((connection) => (
              <div key={connection.id} className="flex items-center gap-3 p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors cursor-pointer">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center text-white font-medium text-sm">
                    {connection.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full ${getStatusColor(connection.status)} border-2 border-gray-800`} />
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-medium text-white">{connection.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {connection.mutual} mutual
                    </Badge>
                  </div>
                  <p className="text-xs text-gray-400">{connection.activity}</p>
                </div>
                
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <MessageCircle className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                    <Coffee className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          <Button 
            variant="ghost" 
            className="w-full mt-4 text-gray-400 hover:text-white"
          >
            Find More Connections
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}