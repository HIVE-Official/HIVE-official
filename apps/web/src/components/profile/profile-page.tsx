"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, Users, TrendingUp, Eye } from 'lucide-react';
import { Button } from '@hive/ui';
import { cn } from '@/lib/utils';
import { useProfileModern } from '@hive/hooks';

// Import components
import { IdentityModule } from './identity-module';
import { ProfileBentoGrid } from './profile-bento-grid';

export function ProfilePage() {
  const [isEditMode, setIsEditMode] = useState(false);
  const [showProfileViewer, setShowProfileViewer] = useState(false);
  const { profile, loading } = useProfileModern();

  if (loading) {
    return <ProfileSkeleton />;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Layout */}
      <div className="md:hidden">
        {/* Fixed Identity Module - 140px height */}
        <div className="sticky top-0 z-10 bg-background border-b border-border">
          <IdentityModule 
            editable={true}
            onEdit={() => setIsEditMode(true)}
          />
        </div>

        {/* Bento Grid */}
        <div className="py-4">
          <ProfileBentoGrid isEditMode={isEditMode} />
        </div>

        {/* Mobile Bottom Actions */}
        <div className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border p-4">
          <div className="flex items-center justify-around">
            <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-accent transition-colors">
              <Users className="h-5 w-5" />
              <span className="text-xs">People</span>
            </button>
            <button 
              onClick={() => setShowProfileViewer(true)}
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-accent transition-colors"
            >
              <Eye className="h-5 w-5" />
              <span className="text-xs">Browse</span>
            </button>
            <button className="flex flex-col items-center gap-1 text-muted-foreground hover:text-accent transition-colors">
              <TrendingUp className="h-5 w-5" />
              <span className="text-xs">Activity</span>
            </button>
            <button 
              onClick={() => setIsEditMode(!isEditMode)}
              className="flex flex-col items-center gap-1 text-muted-foreground hover:text-accent transition-colors"
            >
              <Settings className="h-5 w-5" />
              <span className="text-xs">Edit</span>
            </button>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div className="max-w-7xl mx-auto px-6 py-6">
          {/* Fixed Identity Module - 160px height */}
          <div className="mb-6">
            <IdentityModule 
              editable={true}
              onEdit={() => setIsEditMode(true)}
            />
          </div>

          {/* Two Column Layout */}
          <div className="grid grid-cols-[1fr_400px] gap-6">
            {/* Left: Bento Grid (720px) */}
            <div>
              <ProfileBentoGrid isEditMode={isEditMode} />
            </div>

            {/* Right: Activity Sidebar (400px) */}
            <div className="space-y-4">
              {/* Profile Views */}
              <ProfileViewsCard />
              
              {/* Friend Activity */}
              <FriendActivityCard />
              
              {/* Quick Actions */}
              <QuickActionsCard onBrowseProfiles={() => setShowProfileViewer(true)} />
            </div>
          </div>
        </div>
      </div>

      {/* Profile Viewer Modal */}
      {showProfileViewer && (
        <ProfileViewerModal onClose={() => setShowProfileViewer(false)} />
      )}
    </div>
  );
}

// Profile Views Card
function ProfileViewsCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-card border border-border rounded-lg p-4"
    >
      <h3 className="font-semibold mb-3">Profile Views</h3>
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">This week</span>
          <span className="text-lg font-bold text-accent">23</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">New connections</span>
          <span className="text-lg font-bold text-green-400">5</span>
        </div>
      </div>
    </motion.div>
  );
}

// Friend Activity Card
function FriendActivityCard() {
  const activities = [
    { name: 'Sarah Chen', action: 'joined CS 220 Study Group', time: '2m ago' },
    { name: 'Mike Johnson', action: 'is looking for a ride to North Campus', time: '15m ago' },
    { name: 'Emily Davis', action: 'created a new study tool', time: '1h ago' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.1 }}
      className="bg-card border border-border rounded-lg p-4"
    >
      <h3 className="font-semibold mb-3">Friend Activity</h3>
      <div className="space-y-3">
        {activities.map((activity, idx) => (
          <div key={idx} className="flex items-start gap-2">
            <div className="w-8 h-8 rounded-full bg-accent/20 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm">
                <span className="font-medium">{activity.name}</span>{' '}
                <span className="text-muted-foreground">{activity.action}</span>
              </p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

// Quick Actions Card
function QuickActionsCard({ onBrowseProfiles }: { onBrowseProfiles: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.2 }}
      className="bg-card border border-border rounded-lg p-4"
    >
      <h3 className="font-semibold mb-3">Quick Actions</h3>
      <div className="space-y-2">
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={onBrowseProfiles}
        >
          <Eye className="h-4 w-4 mr-2" />
          Browse Profiles
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <Users className="h-4 w-4 mr-2" />
          Find Study Partners
        </Button>
        <Button variant="outline" className="w-full justify-start">
          <TrendingUp className="h-4 w-4 mr-2" />
          View Analytics
        </Button>
      </div>
    </motion.div>
  );
}

// Profile Viewer Modal (Tinder-style)
function ProfileViewerModal({ onClose }: { onClose: () => void }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Mock profiles for demonstration
  const profiles = [
    {
      id: '1',
      name: 'Jessica Liu',
      year: 'Junior',
      major: 'Computer Science',
      photo: '/default-avatar.png',
      status: '📚 Studying for finals',
      availability: 'Available 1hr',
      mutualSpaces: 3,
      mutualFriends: 5
    }
  ];

  return (
    <div className="fixed inset-0 bg-background z-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h2 className="text-lg font-semibold">Discover People</h2>
        <button
          onClick={onClose}
          className="text-muted-foreground hover:text-foreground"
        >
          ✕
        </button>
      </div>

      {/* Profile Display */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="max-w-md w-full">
          <div className="bg-card border border-border rounded-lg overflow-hidden">
            {/* Large Photo */}
            <div className="aspect-square bg-muted relative">
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-background/80 to-transparent p-6">
                <h3 className="text-2xl font-bold text-white mb-1">
                  {profiles[currentIndex].name}
                </h3>
                <p className="text-white/80">
                  {profiles[currentIndex].year} • {profiles[currentIndex].major}
                </p>
              </div>
            </div>

            {/* Info */}
            <div className="p-4 space-y-3">
              <div className="flex items-center gap-2">
                <span className="text-lg">{profiles[currentIndex].status}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">
                  {profiles[currentIndex].mutualSpaces} mutual spaces
                </span>
                <span className="text-green-400">
                  {profiles[currentIndex].availability}
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 p-4 pt-0">
              <Button variant="outline" className="flex-1">
                Skip
              </Button>
              <Button className="flex-1 bg-accent">
                Connect
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Loading Skeleton
function ProfileSkeleton() {
  return (
    <div className="min-h-screen bg-background p-4">
      <div className="max-w-7xl mx-auto">
        <div className="h-40 bg-muted rounded-lg animate-pulse mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-64 bg-muted rounded-lg animate-pulse" />
          <div className="h-64 bg-muted rounded-lg animate-pulse" />
          <div className="h-64 bg-muted rounded-lg animate-pulse" />
        </div>
      </div>
    </div>
  );
}