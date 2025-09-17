"use client";

import React from 'react';
import { Card, CardContent, Button, Badge } from '@hive/ui';
import { Compass, MapPin, Star, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function CampusDiscoveryCard() {
  const discoveries = [
    { id: 1, title: "New Study Spots", type: "location", rating: 4.8, badge: "Popular" },
    { id: 2, title: "UB Food Tours", type: "event", rating: 4.6, badge: "New" },
    { id: 3, title: "Photography Club", type: "space", rating: 4.9, badge: "Trending" }
  ];

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'Popular': return 'bg-orange-500';
      case 'New': return 'bg-green-500';
      case 'Trending': return 'bg-purple-500';
      default: return 'bg-gray-500';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'location': return MapPin;
      case 'event': return Star;
      case 'space': return Compass;
      default: return Compass;
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
              <Compass className="h-5 w-5 text-amber-400" />
              <h3 className="text-lg font-semibold text-white">Discover</h3>
            </div>
            <Badge variant="secondary" className="text-xs">
              For You
            </Badge>
          </div>
          
          <div className="space-y-3">
            {discoveries.map((item: any) => {
              const IconComponent = getTypeIcon(item.type);
              return (
                <div key={item.id} className="p-3 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors cursor-pointer">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <IconComponent className="h-4 w-4 text-amber-400" />
                      <h4 className="text-sm font-medium text-white">{item.title}</h4>
                    </div>
                    <Badge className={`text-xs ${getBadgeColor(item.badge)}`}>
                      {item.badge}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Star className="h-3 w-3 text-yellow-400" />
                      <span>{item.rating}</span>
                    </div>
                    <Badge variant="outline" className="text-xs capitalize">
                      {item.type}
                    </Badge>
                  </div>
                </div>
              );
            })}
          </div>
          
          <Button 
            variant="ghost" 
            className="w-full mt-4 text-gray-400 hover:text-white"
          >
            Explore Campus
            <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}