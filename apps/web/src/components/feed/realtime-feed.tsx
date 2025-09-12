"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { 
  collection, 
  query, 
  where, 
  orderBy, 
  limit, 
  onSnapshot,
  getDocs,
  Timestamp,
  QueryConstraint,
  or
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useAuth } from '@/hooks/use-auth';
import { Card, Button, Badge, Tabs, TabsList, TabsTrigger, TabsContent } from '@hive/ui';
import { 
  TrendingUp, 
  Clock, 
  Users, 
  Calendar,
  MapPin,
  Coffee,
  Car,
  BookOpen,
  Heart,
  MessageCircle,
  Share2,
  RefreshCw,
  Loader2,
  Sparkles,
  Filter,
  Bell,
  PartyPopper,
  AlertCircle
} from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import Image from 'next/image';

interface FeedPost {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorAvatar?: string;
  spaceId: string;
  spaceName: string;
  type: string;
  images?: string[];
  createdAt: Date;
  likes: number;
  comments: number;
  tags?: string[];
  location?: string;
  priority: number; // For ranking
}

interface FeedFilters {
  type: 'all' | 'coordination' | 'social' | 'academic';
  timeRange: 'today' | 'week' | 'month' | 'all';
  spaces: string[];
}

export function RealtimeFeed() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<FeedPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [userSpaces, setUserSpaces] = useState<string[]>([]);
  const [filters, setFilters] = useState<FeedFilters>({
    type: 'all',
    timeRange: 'week',
    spaces: []
  });
  const [activeTab, setActiveTab] = useState<'for-you' | 'following' | 'trending'>('for-you');

  // Fetch user's spaces
  useEffect(() => {
    if (!user) return;

    const fetchUserSpaces = async () => {
      try {
        const membershipQuery = query(
          collection(db, 'spaceMemberships'),
          where('userId', '==', user.uid)
        );
        
        const snapshot = await getDocs(membershipQuery);
        const spaceIds = snapshot.docs.map(doc => doc.data().spaceId);
        setUserSpaces(spaceIds);
      } catch (error) {
        console.error('Error fetching user spaces:', error);
      }
    };

    fetchUserSpaces();
  }, [user]);

  // Subscribe to feed posts
  useEffect(() => {
    if (!user || userSpaces.length === 0) {
      setLoading(false);
      return;
    }

    // Build query based on active tab and filters
    const constraints: QueryConstraint[] = [
      orderBy('createdAt', 'desc'),
      limit(50)
    ];

    // Filter by user's spaces
    if (activeTab === 'following') {
      constraints.unshift(where('spaceId', 'in', userSpaces.slice(0, 10))); // Firestore limit
    }

    // Filter by time range
    if (filters.timeRange !== 'all') {
      const now = new Date();
      const startDate = new Date();
      
      switch (filters.timeRange) {
        case 'today':
          startDate.setHours(0, 0, 0, 0);
          break;
        case 'week':
          startDate.setDate(now.getDate() - 7);
          break;
        case 'month':
          startDate.setMonth(now.getMonth() - 1);
          break;
      }
      
      constraints.unshift(where('createdAt', '>=', Timestamp.fromDate(startDate)));
    }

    // Filter by type
    if (filters.type !== 'all') {
      const typeMap = {
        coordination: ['food_run', 'ride_share', 'study_session'],
        social: ['party', 'general', 'meetup'],
        academic: ['study_session', 'question', 'announcement']
      };
      
      const types = typeMap[filters.type];
      if (types) {
        // Note: Firestore doesn't support 'in' with more than 10 values
        constraints.unshift(where('type', 'in', types));
      }
    }

    const q = query(collection(db, 'posts'), ...constraints);

    const unsubscribe = onSnapshot(
      q,
      async (snapshot: any) => {
        const feedPosts: FeedPost[] = [];
        
        // Process posts and fetch space names
        for (const doc of snapshot.docs) {
          const data = doc.data();
          
          // Skip if not in user's spaces for "for-you" tab
          if (activeTab === 'for-you' && !userSpaces.includes(data.spaceId)) {
            continue;
          }
          
          // Fetch space name (in production, denormalize this)
          let spaceName = 'Unknown Space';
          try {
            const spaceDoc = await getDocs(
              query(collection(db, 'spaces'), where('__name__', '==', data.spaceId))
            );
            if (!spaceDoc.empty) {
              spaceName = spaceDoc.docs[0].data().name;
            }
          } catch (error) {
            console.error('Error fetching space name:', error);
          }
          
          feedPosts.push({
            id: doc.id,
            content: data.content || '',
            authorId: data.authorId || '',
            authorName: data.authorName || 'Anonymous',
            authorAvatar: data.authorAvatar,
            spaceId: data.spaceId || '',
            spaceName,
            type: data.type || 'general',
            images: data.images || [],
            createdAt: data.createdAt?.toDate() || new Date(),
            likes: data.likes || 0,
            comments: data.comments || 0,
            tags: data.tags || [],
            location: data.location,
            priority: calculatePriority(data, activeTab)
          });
        }
        
        // Sort by priority and time
        feedPosts.sort((a, b) => {
          if (activeTab === 'trending') {
            return b.priority - a.priority;
          }
          return b.createdAt.getTime() - a.createdAt.getTime();
        });
        
        setPosts(feedPosts);
        setLoading(false);
      },
      (error: any) => {
        console.error('Error fetching feed:', error);
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, [user, userSpaces, activeTab, filters]);

  // Calculate post priority for ranking
  const calculatePriority = (post: any, tab: string): number => {
    let priority = 0;
    
    // Engagement score
    priority += (post.likes || 0) * 2;
    priority += (post.comments || 0) * 3;
    
    // Recency bonus
    const hoursAgo = (Date.now() - post.createdAt?.toMillis()) / (1000 * 60 * 60);
    if (hoursAgo < 1) priority += 20;
    else if (hoursAgo < 6) priority += 10;
    else if (hoursAgo < 24) priority += 5;
    
    // Type bonus for coordination
    if (['food_run', 'ride_share', 'study_session', 'emergency'].includes(post.type)) {
      priority += 15;
    }
    
    // Image bonus
    if (post.images?.length > 0) priority += 5;
    
    return priority;
  };

  // Render individual feed item
  const renderFeedItem = (post: FeedPost) => {
    const typeIcons: Record<string, any> = {
      food_run: Coffee,
      ride_share: Car,
      study_session: BookOpen,
      party: PartyPopper,
      emergency: AlertCircle
    };
    
    const TypeIcon = typeIcons[post.type] || Users;
    
    return (
      <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
        <div className="p-4">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center gap-3">
              {post.authorAvatar ? (
                <Image
                  src={post.authorAvatar}
                  alt={post.authorName}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {post.authorName[0]?.toUpperCase()}
                  </span>
                </div>
              )}
              
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">{post.authorName}</span>
                  <span className="text-gray-500">in</span>
                  <span className="font-medium text-blue-600 dark:text-blue-400">
                    {post.spaceName}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <TypeIcon className="h-3 w-3" />
                  <span>{formatDistanceToNow(post.createdAt, { addSuffix: true })}</span>
                </div>
              </div>
            </div>
            
            {post.priority > 30 && (
              <Badge variant="secondary" className="text-xs">
                <TrendingUp className="h-3 w-3 mr-1" />
                Trending
              </Badge>
            )}
          </div>
          
          {/* Content */}
          <div className="mb-3">
            <p className="text-sm whitespace-pre-wrap line-clamp-3">{post.content}</p>
            
            {/* Images */}
            {post.images && post.images.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {post.images.slice(0, 4).map((image, idx) => (
                  <div key={idx} className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                    <Image
                      src={image}
                      alt={`Post image ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                    {idx === 3 && post.images!.length > 4 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white font-semibold">
                          +{post.images!.length - 4}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            
            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {post.tags.slice(0, 3).map(tag => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    #{tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
          
          {/* Actions */}
          <div className="flex items-center gap-4 text-gray-500">
            <button className="flex items-center gap-1 hover:text-red-500 transition-colors">
              <Heart className="h-4 w-4" />
              <span className="text-xs">{post.likes}</span>
            </button>
            <button className="flex items-center gap-1 hover:text-blue-500 transition-colors">
              <MessageCircle className="h-4 w-4" />
              <span className="text-xs">{post.comments}</span>
            </button>
            <button className="hover:text-green-500 transition-colors">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="realtime-feed">
      {/* Feed Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">Your Feed</h1>
        
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={(v: any) => setActiveTab(v as any)}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="for-you">
              <Sparkles className="h-4 w-4 mr-2" />
              For You
            </TabsTrigger>
            <TabsTrigger value="following">
              <Users className="h-4 w-4 mr-2" />
              Following
            </TabsTrigger>
            <TabsTrigger value="trending">
              <TrendingUp className="h-4 w-4 mr-2" />
              Trending
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Filters */}
        <div className="flex gap-2 mt-4">
          <select
            value={filters.type}
            onChange={(e: any) => setFilters({ ...filters, type: e.target.value as any })}
            className="px-3 py-1 text-sm border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="all">All Types</option>
            <option value="coordination">Coordination</option>
            <option value="social">Social</option>
            <option value="academic">Academic</option>
          </select>
          
          <select
            value={filters.timeRange}
            onChange={(e: any) => setFilters({ ...filters, timeRange: e.target.value as any })}
            className="px-3 py-1 text-sm border rounded-lg dark:bg-gray-800 dark:border-gray-700"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>
      
      {/* Feed Content */}
      {loading ? (
        <div className="text-center py-12">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-gray-400" />
          <p className="text-gray-500">Loading your feed...</p>
        </div>
      ) : posts.length === 0 ? (
        <Card className="p-12 text-center">
          <Calendar className="h-12 w-12 mx-auto mb-4 text-gray-400" />
          <h3 className="text-lg font-semibold mb-2">No posts to show</h3>
          <p className="text-gray-500 mb-4">
            {userSpaces.length === 0 
              ? "Join some spaces to see posts in your feed"
              : "Check back later for new posts from your spaces"}
          </p>
          <Button onClick={() => window.location.href = '/spaces'}>
            Explore Spaces
          </Button>
        </Card>
      ) : (
        <div className="space-y-4">
          {posts.map(renderFeedItem)}
        </div>
      )}
      
      {/* Load More */}
      {posts.length >= 50 && (
        <div className="text-center py-4">
          <Button variant="outline">
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}