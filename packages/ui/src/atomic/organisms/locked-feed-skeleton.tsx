"use client";

import React, { useState, useEffect } from 'react';
import { Button, Progress } from '../atoms';
import { Card } from '../molecules';
import { 
  Lock, 
  Calendar,
  Heart,
  MessageCircle,
  Share,
  Bookmark,
  User,
  Hash,
  Clock,
  Sparkles,
  Target,
  ArrowRight
} from 'lucide-react';

export interface LockedFeedSkeletonProps {
  activationDate?: Date;
  currentRitualProgress?: number;
  className?: string
}

export function LockedFeedSkeleton({ 
  activationDate = new Date('2024-08-15'), // Default fall semester start
  currentRitualProgress = 45,
  className = '' 
}: LockedFeedSkeletonProps) {
  const [timeRemaining, setTimeRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const targetTime = activationDate.getTime();
      const difference = targetTime - now;

      if (difference > 0) {
        setTimeRemaining({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        })
      }
    }, 1000);

    return () => clearInterval(timer)
  }, [activationDate]);

  const mockPosts = [
    {
      id: '1',
      type: 'space_event',
      title: 'CS Study Group',
      preview: 'Join us for our weekly algorithms review session. We\'ll be covering dynamic programming and graph theory...',
      author: 'Sarah Chen',
      space: 'Computer Science',
      timeAgo: '2h ago',
      engagement: { likes: 24, comments: 8, shares: 3 }
    },
    {
      id: '2',
      type: 'tool_success',
      title: 'New Tool: Campus Food Tracker',
      preview: 'Just launched a tool that tracks dining hall wait times and menu updates in real-time...',
      author: 'Alex Rodriguez',
      space: 'HIVE Tools',
      timeAgo: '4h ago',
      engagement: { likes: 67, comments: 15, shares: 12 }
    },
    {
      id: '3',
      type: 'community_post',
      title: 'Looking for Study Partners',
      preview: 'Anyone else taking Organic Chemistry this fall? Would love to form a study group...',
      author: 'Jordan Kim',
      space: 'Pre-Med',
      timeAgo: '6h ago',
      engagement: { likes: 12, comments: 23, shares: 1 }
    }
  ];

  const getPostIcon = (type: string) => {
    switch (type) {
      case 'space_event': return Calendar;
      case 'tool_success': return Target;
      case 'community_post': return MessageCircle;
      default: return Hash
    }
  };

  return (
    <div className={`space-y-8 ${className}`}>
      {/* Lock Header with Countdown */}
      <Card className="p-8 text-center bg-gradient-to-br from-hive-gold/10 to-hive-brand-secondary/10 border-hive-gold/30">
        <div className="w-20 h-20 mx-auto mb-6 bg-hive-gold/20 rounded-full flex items-center justify-center">
          <Lock className="h-10 w-10 text-hive-gold" />
        </div>
        
        <h1 className="text-3xl font-bold text-hive-text-primary mb-3">
          Activity Feed Launching Soon
        </h1>
        
        <p className="text-hive-text-secondary text-lg mb-6 max-w-2xl mx-auto">
          Your personalized campus activity feed will activate when the semester begins. 
          Complete your summer rituals to unlock the full experience.
        </p>

        {/* Countdown Display */}
        <div className="grid grid-cols-4 gap-4 max-w-md mx-auto mb-6">
          {Object.entries(timeRemaining).map(([unit, value]) => (
            <div key={unit} className="text-center">
              <div className="text-3xl font-bold text-hive-gold mb-1">
                {value.toString().padStart(2, '0')}
              </div>
              <div className="text-xs text-hive-text-secondary uppercase tracking-wide">
                {unit}
              </div>
            </div>
          ))}
        </div>

        <div className="text-sm text-hive-text-secondary mb-6">
          Activates on {activationDate.toLocaleDateString('en-US', { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>

        {/* Progress Indicator */}
        <div className="bg-hive-surface-elevated rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <Sparkles className="h-5 w-5 text-hive-gold" />
              <span className="font-semibold text-hive-text-primary">
                Summer Ritual Progress
              </span>
            </div>
            <span className="text-sm text-hive-text-secondary">
              {currentRitualProgress}% complete
            </span>
          </div>
          <Progress value={currentRitualProgress} className="h-2 mb-3" />
          <p className="text-xs text-hive-text-secondary">
            Complete your rituals to unlock personalized feed content
          </p>
        </div>
      </Card>

      {/* Feed Preview Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-hive-text-primary">
            Feed Preview
          </h2>
          <span className="text-sm text-hive-text-secondary">
            What you'll see when activated
          </span>
        </div>

        {/* Mock Feed Posts */}
        <div className="space-y-4">
          {mockPosts.map((post, index) => {
            const IconComponent = getPostIcon(post.type);
            
            return (
              <Card 
                key={post.id} 
                className="p-6 relative overflow-hidden opacity-60 hover:opacity-80 transition-opacity"
              >
                {/* Overlay to indicate it's locked */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-hive-surface-base/50 to-transparent pointer-events-none" />
                
                <div className="relative">
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-hive-gold to-hive-brand-secondary rounded-full flex items-center justify-center">
                        <span className="text-sm font-bold text-hive-obsidian">
                          {post.author.charAt(0)}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2">
                          <h3 className="font-semibold text-hive-text-primary">
                            {post.author}
                          </h3>
                          <IconComponent className="h-4 w-4 text-hive-brand-secondary" />
                        </div>
                        <p className="text-sm text-hive-text-secondary">
                          {post.space} • {post.timeAgo}
                        </p>
                      </div>
                    </div>
                    <Clock className="h-4 w-4 text-hive-text-secondary" />
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-hive-text-primary mb-2">
                      {post.title}
                    </h4>
                    <p className="text-hive-text-secondary">
                      {post.preview}
                    </p>
                  </div>

                  {/* Engagement Preview */}
                  <div className="flex items-center justify-between pt-4 border-t border-hive-border-subtle">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2 text-hive-text-secondary">
                        <Heart className="h-4 w-4" />
                        <span className="text-sm">{post.engagement.likes}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-hive-text-secondary">
                        <MessageCircle className="h-4 w-4" />
                        <span className="text-sm">{post.engagement.comments}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-hive-text-secondary">
                        <Share className="h-4 w-4" />
                        <span className="text-sm">{post.engagement.shares}</span>
                      </div>
                    </div>
                    <Bookmark className="h-4 w-4 text-hive-text-secondary" />
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Call to Action */}
        <Card className="p-6 text-center bg-hive-surface-elevated border-hive-brand-secondary/30">
          <Target className="w-12 h-12 mx-auto mb-4 text-hive-brand-secondary" />
          <h3 className="text-lg font-semibold text-hive-text-primary mb-2">
            Complete Your Summer Rituals
          </h3>
          <p className="text-hive-text-secondary mb-4">
            Build your profile, discover spaces, and connect with peers to unlock 
            personalized feed content tailored to your campus experience.
          </p>
          <Button className="bg-hive-gold text-hive-obsidian hover:bg-hive-gold/90">
            Continue Rituals
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        </Card>
      </div>

      {/* Feature Explanation */}
      <Card className="p-6 bg-hive-surface-elevated">
        <h3 className="text-lg font-semibold text-hive-text-primary mb-4">
          What to Expect in Your Activity Feed
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-hive-gold/20 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-hive-gold" />
            </div>
            <h4 className="font-semibold text-hive-text-primary mb-2">Space Events</h4>
            <p className="text-sm text-hive-text-secondary">
              Study sessions, meetings, and activities from your joined spaces
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-hive-brand-secondary/20 rounded-lg flex items-center justify-center">
              <Target className="h-6 w-6 text-hive-brand-secondary" />
            </div>
            <h4 className="font-semibold text-hive-text-primary mb-2">Tool Successes</h4>
            <p className="text-sm text-hive-text-secondary">
              New tools, achievements, and collaborative projects from the community
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-12 h-12 mx-auto mb-3 bg-purple-400/20 rounded-lg flex items-center justify-center">
              <User className="h-6 w-6 text-purple-400" />
            </div>
            <h4 className="font-semibold text-hive-text-primary mb-2">Campus Updates</h4>
            <p className="text-sm text-hive-text-secondary">
              Relevant posts and discussions from your campus community
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}