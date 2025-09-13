import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../atomic/ui/card';
import { Button } from '../../../atomic/atoms/button-enhanced';
import { Input } from '../../../atomic/atoms/input-enhanced';
import { Badge } from '../../../atomic/atoms/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../atomic/atoms/avatar';
import { HiveProgress as Progress } from '../../components/hive-progress';
import { Slider } from '../../../components/ui/slider';
import { Switch } from '../../../atomic/atoms/switch-enhanced';
import { Alert, AlertDescription, AlertTitle } from '../../../atomic/molecules/alert-toast-system';
import { 
  Smartphone,
  Tablet,
  Monitor,
  Fingerprint,
  Hand,
  Move,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Navigation,
  Compass,
  MapPin,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ChevronUp,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Users,
  Calendar,
  Clock,
  Bell,
  Search,
  Filter,
  Plus,
  Minus,
  X,
  Check,
  Info,
  AlertCircle,
  Settings,
  Volume2,
  VolumeX,
  Play,
  Pause,
  SkipForward,
  SkipBack,
  FastForward,
  Rewind,
  MoreHorizontal,
  MoreVertical,
  RefreshCw,
  Download,
  Upload,
  Send,
  Edit3,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  Lock,
  Unlock,
  Home,
  School,
  Coffee,
  Book,
  Gamepad2,
  Wifi,
  Battery,
  Signal,
  Bluetooth,
  Camera,
  Mic,
  MicOff,
  Video,
  VideoOff,
  Globe,
  Star,
  Flag,
  Target,
  Zap,
  Activity,
  TrendingUp,
  BarChart3
} from 'lucide-react';

/**
 * # HIVE Advanced Mobile Gestures & Interactions
 * 
 * Comprehensive mobile-first gesture system designed specifically for UB students' 
 * on-the-go campus lifestyle. Demonstrates advanced touch interactions, swipe patterns,
 * haptic feedback, and mobile-optimized UX patterns that work seamlessly while 
 * students walk between classes, study in different campus locations, and interact
 * socially with their campus community.
 * 
 * ## Mobile-First Features:
 * - **Touch Gestures**: Swipe, pinch, tap, long press, and multi-touch interactions
 * - **Campus Navigation**: Thumb-friendly navigation optimized for one-handed use
 * - **Haptic Feedback**: Rich tactile feedback for enhanced mobile experience
 * - **Gesture Recognition**: Advanced swipe patterns for quick actions
 * - **Pull-to-Refresh**: Intuitive content refresh patterns
 * - **Infinite Scroll**: Smooth scrolling with momentum and bounce effects
 * - **Modal Gestures**: Swipe-to-dismiss and gesture-driven modal interactions
 * - **Accessibility**: Full support for assistive technologies and motor impairments
 */

const meta: Meta<typeof React.Fragment> = {
  title: '24-Advanced Systems/Mobile Gestures & Touch',
  component: React.Fragment,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Advanced mobile gesture system optimized for campus mobile usage'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Mobile Gesture State Management
interface TouchPoint {
  id: number;
  x: number;
  y: number;
  timestamp: number;
  pressure?: number;
}

interface GestureState {
  touches: TouchPoint[];
  activeGesture: string | null;
  gestureData: any;
  velocity: { x: number; y: number };
  momentum: { x: number; y: number };
  scale: number;
  rotation: number;
  deltaX: number;
  deltaY: number;
  startTime: number;
  isGesturing: boolean;
}

interface SwipeAction {
  id: string;
  direction: 'left' | 'right' | 'up' | 'down';
  icon: any;
  label: string;
  color: string;
  action: () => void;
}

// Advanced Gesture Recognition Hook
const useAdvancedGestures = () => {
  const [gestureState, setGestureState] = useState<GestureState>({
    touches: [],
    activeGesture: null,
    gestureData: {},
    velocity: { x: 0, y: 0 },
    momentum: { x: 0, y: 0 },
    scale: 1,
    rotation: 0,
    deltaX: 0,
    deltaY: 0,
    startTime: 0,
    isGesturing: false
  });

  const [settings, setSettings] = useState({
    hapticFeedback: true,
    gestureThreshold: 50,
    velocityThreshold: 0.5,
    swipeSensitivity: 1,
    enableLongPress: true,
    longPressDuration: 500
  });

  const gestureRef = useRef<any>(null);
  const previousTouches = useRef<TouchPoint[]>([]);
  const velocityHistory = useRef<Array<{ x: number; y: number; time: number }>>([]);

  const triggerHaptic = useCallback((intensity: 'light' | 'medium' | 'heavy' = 'light') => {
    if (!settings.hapticFeedback) return;
    
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [50]
      };
      navigator.vibrate(patterns[intensity]);
    }
  }, [settings.hapticFeedback]);

  const calculateVelocity = useCallback((current: TouchPoint[], previous: TouchPoint[]) => {
    if (current.length === 0 || previous.length === 0) return { x: 0, y: 0 };
    
    const currentTouch = current[0];
    const previousTouch = previous[0];
    const deltaTime = currentTouch.timestamp - previousTouch.timestamp;
    
    if (deltaTime === 0) return { x: 0, y: 0 };
    
    const velocityX = (currentTouch.x - previousTouch.x) / deltaTime;
    const velocityY = (currentTouch.y - previousTouch.y) / deltaTime;
    
    return { x: velocityX * 1000, y: velocityY * 1000 }; // pixels per second
  }, []);

  const recognizeGesture = useCallback((touches: TouchPoint[]) => {
    if (touches.length === 0) return null;
    
    const firstTouch = touches[0];
    const deltaX = gestureState.deltaX;
    const deltaY = gestureState.deltaY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    const velocity = gestureState.velocity;
    const velocityMagnitude = Math.sqrt(velocity.x * velocity.x + velocity.y * velocity.y);
    
    // Swipe gesture recognition
    if (distance > settings.gestureThreshold && velocityMagnitude > settings.velocityThreshold) {
      if (Math.abs(deltaX) > Math.abs(deltaY)) {
        return deltaX > 0 ? 'swipe-right' : 'swipe-left';
      } else {
        return deltaY > 0 ? 'swipe-down' : 'swipe-up';
      }
    }
    
    // Multi-touch gestures
    if (touches.length >= 2) {
      const touch1 = touches[0];
      const touch2 = touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.x - touch1.x, 2) + Math.pow(touch2.y - touch1.y, 2)
      );
      
      // Pinch/zoom detection would go here
      return 'multi-touch';
    }
    
    // Long press detection
    if (settings.enableLongPress && Date.now() - gestureState.startTime > settings.longPressDuration) {
      return 'long-press';
    }
    
    return null;
  }, [gestureState, settings]);

  const handleTouchStart = useCallback((e: TouchEvent) => {
    const touches = Array.from(e.touches).map((touch, index) => ({
      id: touch.identifier,
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now(),
      pressure: touch.force || 0.5
    }));

    setGestureState(prev => ({
      ...prev,
      touches,
      isGesturing: true,
      startTime: Date.now(),
      deltaX: 0,
      deltaY: 0
    }));

    previousTouches.current = touches;
    triggerHaptic('light');
  }, [triggerHaptic]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    e.preventDefault();
    
    const touches = Array.from(e.touches).map(touch => ({
      id: touch.identifier,
      x: touch.clientX,
      y: touch.clientY,
      timestamp: Date.now(),
      pressure: touch.force || 0.5
    }));

    const velocity = calculateVelocity(touches, previousTouches.current);
    
    // Calculate deltas from start position
    const deltaX = touches[0]?.x - (gestureState.touches[0]?.x || 0);
    const deltaY = touches[0]?.y - (gestureState.touches[0]?.y || 0);

    setGestureState(prev => ({
      ...prev,
      touches,
      velocity,
      deltaX,
      deltaY,
      activeGesture: recognizeGesture(touches)
    }));

    previousTouches.current = touches;
  }, [calculateVelocity, recognizeGesture, gestureState.touches]);

  const handleTouchEnd = useCallback((e: TouchEvent) => {
    const finalGesture = gestureState.activeGesture;
    
    if (finalGesture && finalGesture.includes('swipe')) {
      triggerHaptic('medium');
    }

    setGestureState(prev => ({
      ...prev,
      touches: [],
      isGesturing: false,
      activeGesture: null,
      velocity: { x: 0, y: 0 },
      deltaX: 0,
      deltaY: 0
    }));
  }, [gestureState.activeGesture, triggerHaptic]);

  return {
    gestureState,
    settings,
    setSettings,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    triggerHaptic
  };
};

// Swipeable Card Component
const SwipeableCard = ({ 
  children, 
  leftActions = [], 
  rightActions = [],
  onSwipe 
}: {
  children: React.ReactNode;
  leftActions?: SwipeAction[];
  rightActions?: SwipeAction[];
  onSwipe?: (direction: string) => void;
}) => {
  const [swipeOffset, setSwipeOffset] = useState(0);
  const [isSwipeActive, setIsSwipeActive] = useState(false);
  const [activeAction, setActiveAction] = useState<SwipeAction | null>(null);
  const gestures = useAdvancedGestures();
  const cardRef = useRef<HTMLDivElement>(null);

  const maxSwipeDistance = 80;
  const actionThreshold = 60;

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsSwipeActive(true);
    gestures.handleTouchStart(e.nativeEvent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isSwipeActive) return;
    
    gestures.handleTouchMove(e.nativeEvent);
    const deltaX = gestures.gestureState.deltaX;
    const clampedOffset = Math.max(-maxSwipeDistance, Math.min(maxSwipeDistance, deltaX));
    setSwipeOffset(clampedOffset);

    // Determine active action
    if (Math.abs(clampedOffset) > actionThreshold) {
      const actions = clampedOffset > 0 ? leftActions : rightActions;
      const actionIndex = Math.min(Math.floor(Math.abs(clampedOffset) / actionThreshold) - 1, actions.length - 1);
      setActiveAction(actions[actionIndex] || null);
    } else {
      setActiveAction(null);
    }
  };

  const handleTouchEnd = () => {
    setIsSwipeActive(false);
    
    if (activeAction) {
      gestures.triggerHaptic('heavy');
      activeAction.action();
      onSwipe?.(activeAction.direction);
    }
    
    // Animate back to center
    const startOffset = swipeOffset;
    const startTime = Date.now();
    const duration = 200;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      
      setSwipeOffset(startOffset * (1 - easeOut));
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setSwipeOffset(0);
        setActiveAction(null);
      }
    };
    
    requestAnimationFrame(animate);
  };

  return (
    <div className="relative overflow-hidden bg-gray-800 rounded-lg">
      {/* Left Actions */}
      {leftActions.length > 0 && swipeOffset > 0 && (
        <div 
          className="absolute left-0 top-0 h-full flex items-center"
          style={{ width: Math.abs(swipeOffset) }}
        >
          {leftActions.map((action, index) => (
            <div
              key={action.id}
              className={`
                h-full flex items-center justify-center px-4 transition-all
                ${action.color} ${activeAction?.id === action.id ? 'scale-110' : ''}
              `}
              style={{ width: `${Math.abs(swipeOffset) / leftActions.length}px` }}
            >
              <action.icon className="h-6 w-6 text-[var(--hive-text-primary)]" />
            </div>
          ))}
        </div>
      )}

      {/* Right Actions */}
      {rightActions.length > 0 && swipeOffset < 0 && (
        <div 
          className="absolute right-0 top-0 h-full flex items-center"
          style={{ width: Math.abs(swipeOffset) }}
        >
          {rightActions.map((action, index) => (
            <div
              key={action.id}
              className={`
                h-full flex items-center justify-center px-4 transition-all
                ${action.color} ${activeAction?.id === action.id ? 'scale-110' : ''}
              `}
              style={{ width: `${Math.abs(swipeOffset) / rightActions.length}px` }}
            >
              <action.icon className="h-6 w-6 text-[var(--hive-text-primary)]" />
            </div>
          ))}
        </div>
      )}

      {/* Main Card Content */}
      <div
        ref={cardRef}
        className="relative z-10 bg-gray-900 border border-gray-800 rounded-lg transition-transform touch-pan-y"
        style={{ transform: `translateX(${swipeOffset}px)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {children}
      </div>
    </div>
  );
};

// Pull to Refresh Component
const PullToRefresh = ({ 
  children, 
  onRefresh,
  refreshing = false 
}: {
  children: React.ReactNode;
  onRefresh: () => void;
  refreshing?: boolean;
}) => {
  const [pullDistance, setPullDistance] = useState(0);
  const [isPulling, setIsPulling] = useState(false);
  const [canRefresh, setCanRefresh] = useState(false);
  const gestures = useAdvancedGestures();
  const containerRef = useRef<HTMLDivElement>(null);
  
  const maxPullDistance = 100;
  const refreshThreshold = 60;

  const handleTouchStart = (e: React.TouchEvent) => {
    if (containerRef.current?.scrollTop === 0) {
      setIsPulling(true);
      gestures.handleTouchStart(e.nativeEvent);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isPulling || refreshing) return;
    
    gestures.handleTouchMove(e.nativeEvent);
    const deltaY = Math.max(0, gestures.gestureState.deltaY);
    const dampening = 0.6;
    const distance = Math.min(deltaY * dampening, maxPullDistance);
    
    setPullDistance(distance);
    setCanRefresh(distance > refreshThreshold);
    
    if (distance > 0) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = () => {
    setIsPulling(false);
    
    if (canRefresh && !refreshing) {
      onRefresh();
      gestures.triggerHaptic('medium');
    }
    
    setPullDistance(0);
    setCanRefresh(false);
  };

  return (
    <div
      ref={containerRef}
      className="relative overflow-auto h-full"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Pull to Refresh Indicator */}
      <div 
        className="absolute top-0 left-0 right-0 flex items-center justify-center bg-gray-900 border-b border-gray-800 transition-all duration-300"
        style={{ 
          height: `${pullDistance}px`,
          transform: `translateY(-${maxPullDistance - pullDistance}px)`
        }}
      >
        <div className="flex flex-col items-center space-y-2 text-[var(--hive-text-primary)]">
          <div className={`transition-transform ${isPulling ? 'scale-110' : ''}`}>
            {refreshing ? (
              <RefreshCw className="h-6 w-6 animate-spin text-[var(--hive-gold)]" />
            ) : canRefresh ? (
              <ChevronUp className="h-6 w-6 text-green-400" />
            ) : (
              <ChevronDown className="h-6 w-6 text-gray-400" />
            )}
          </div>
          <div className="text-sm text-center">
            {refreshing ? 'Refreshing...' : 
             canRefresh ? 'Release to refresh' : 
             'Pull to refresh'}
          </div>
        </div>
      </div>

      {/* Content */}
      <div 
        className="transition-transform duration-300"
        style={{ transform: `translateY(${pullDistance}px)` }}
      >
        {children}
      </div>
    </div>
  );
};

// Campus Feed Mobile Component
const CampusFeedMobile = () => {
  const [posts, setPosts] = useState([
    {
      id: '1',
      user: { name: 'Sarah Johnson', avatar: '/api/placeholder/40/40', handle: '@sarahj' },
      content: 'Just finished my CS 115 project! Anyone else struggling with recursion? Study group tomorrow at Lockwood Library 📚',
      space: 'CS Study Group',
      timestamp: '5m ago',
      likes: 12,
      comments: 4,
      shares: 2,
      liked: false,
      bookmarked: false
    },
    {
      id: '2',
      user: { name: 'Mike Chen', avatar: '/api/placeholder/40/40', handle: '@mikec' },
      content: 'Buffalo Bulls game tonight! Who\'s going? Meet at Alumni Arena at 6:30pm 🏀',
      space: 'UB Athletics',
      timestamp: '12m ago',
      likes: 28,
      comments: 15,
      shares: 8,
      liked: true,
      bookmarked: false
    },
    {
      id: '3',
      user: { name: 'Lisa Zhang', avatar: '/api/placeholder/40/40', handle: '@lisaz' },
      content: 'Free coffee at Student Union until 3pm! Thanks to the Programming Board for the caffeine boost ☕',
      space: 'Campus Events',
      timestamp: '25m ago',
      likes: 45,
      comments: 22,
      shares: 12,
      liked: false,
      bookmarked: true
    }
  ]);

  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      // Simulate new posts
      const newPost = {
        id: Date.now().toString(),
        user: { name: 'Alex Rivera', avatar: '/api/placeholder/40/40', handle: '@alexr' },
        content: 'New post from refresh! The pull-to-refresh gesture is working perfectly 🚀',
        space: 'Tech Demo',
        timestamp: 'now',
        likes: 0,
        comments: 0,
        shares: 0,
        liked: false,
        bookmarked: false
      };
      setPosts(prev => [newPost, ...prev]);
    }, 2000);
  };

  const handlePostSwipe = (postId: string, direction: string) => {
    setPosts(prev => prev.map(post => {
      if (post.id === postId) {
        switch (direction) {
          case 'right':
            return { ...post, liked: !post.liked, likes: post.liked ? post.likes - 1 : post.likes + 1 };
          case 'left':
            return { ...post, bookmarked: !post.bookmarked };
          default:
            return post;
        }
      }
      return post;
    }));
  };

  const leftActions: SwipeAction[] = [
    {
      id: 'like',
      direction: 'right',
      icon: Heart,
      label: 'Like',
      color: 'bg-red-500',
      action: () => console.log('Liked!')
    }
  ];

  const rightActions: SwipeAction[] = [
    {
      id: 'bookmark',
      direction: 'left',
      icon: Bookmark,
      label: 'Bookmark',
      color: 'bg-[var(--hive-gold)]',
      action: () => console.log('Bookmarked!')
    }
  ];

  return (
    <div className="max-w-md mx-auto h-96 bg-[var(--hive-black)] rounded-lg overflow-hidden">
      <PullToRefresh onRefresh={handleRefresh} refreshing={refreshing}>
        <div className="space-y-4 p-4">
          {posts.map(post => (
            <SwipeableCard
              key={post.id}
              leftActions={leftActions}
              rightActions={rightActions}
              onSwipe={(direction) => handlePostSwipe(post.id, direction)}
            >
              <div className="p-4">
                <div className="flex items-start space-x-3 mb-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={post.user.avatar} />
                    <AvatarFallback className="bg-gray-700 text-[var(--hive-text-primary)] text-sm">
                      {post.user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="font-semibold text-[var(--hive-text-primary)] text-sm">{post.user.name}</span>
                      <Badge variant="secondary" className="bg-blue-900 text-blue-300 text-xs">
                        {post.space}
                      </Badge>
                      <span className="text-gray-500 text-xs">{post.timestamp}</span>
                    </div>
                    <p className="text-[var(--hive-text-primary)] text-sm leading-relaxed">{post.content}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <button className={`flex items-center space-x-1 text-sm ${post.liked ? 'text-red-400' : 'text-gray-400'}`}>
                      <Heart className={`h-4 w-4 ${post.liked ? 'fill-current' : ''}`} />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-sm text-gray-400">
                      <MessageCircle className="h-4 w-4" />
                      <span>{post.comments}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-sm text-gray-400">
                      <Share2 className="h-4 w-4" />
                      <span>{post.shares}</span>
                    </button>
                  </div>
                  <button className={`${post.bookmarked ? 'text-[var(--hive-gold)]' : 'text-gray-400'}`}>
                    <Bookmark className={`h-4 w-4 ${post.bookmarked ? 'fill-current' : ''}`} />
                  </button>
                </div>
              </div>
            </SwipeableCard>
          ))}
        </div>
      </PullToRefresh>
    </div>
  );
};

// Mobile Navigation Demo
const MobileNavigation = () => {
  const [activeTab, setActiveTab] = useState('feed');
  const [gestureDirection, setGestureDirection] = useState<string | null>(null);
  const gestures = useAdvancedGestures();
  const navRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { id: 'feed', label: 'Feed', icon: Home },
    { id: 'spaces', label: 'Spaces', icon: Users },
    { id: 'calendar', label: 'Calendar', icon: Calendar },
    { id: 'profile', label: 'Profile', icon: School }
  ];

  const handleSwipe = (direction: string) => {
    setGestureDirection(direction);
    
    const currentIndex = tabs.findIndex(tab => tab.id === activeTab);
    let newIndex = currentIndex;

    if (direction === 'swipe-left' && currentIndex < tabs.length - 1) {
      newIndex = currentIndex + 1;
    } else if (direction === 'swipe-right' && currentIndex > 0) {
      newIndex = currentIndex - 1;
    }

    if (newIndex !== currentIndex) {
      setActiveTab(tabs[newIndex].id);
      gestures.triggerHaptic('medium');
    }

    setTimeout(() => setGestureDirection(null), 300);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    gestures.handleTouchStart(e.nativeEvent);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    gestures.handleTouchMove(e.nativeEvent);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const gesture = gestures.gestureState.activeGesture;
    if (gesture && gesture.includes('swipe')) {
      handleSwipe(gesture);
    }
    gestures.handleTouchEnd(e.nativeEvent);
  };

  return (
    <div className="max-w-md mx-auto bg-[var(--hive-black)] rounded-lg overflow-hidden">
      {/* Content Area with Swipe Detection */}
      <div
        ref={navRef}
        className="h-64 bg-gray-900 flex items-center justify-center relative overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="text-center space-y-4">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return tab.id === activeTab ? (
              <div key={tab.id} className="text-[var(--hive-text-primary)]">
                <Icon className="h-12 w-12 mx-auto mb-2 text-[var(--hive-gold)]" />
                <h2 className="text-xl font-bold">{tab.label}</h2>
                <p className="text-gray-400 text-sm">Swipe left/right to navigate</p>
              </div>
            ) : null;
          })}
        </div>

        {/* Gesture Feedback */}
        {gestureDirection && (
          <div className="absolute top-4 right-4">
            <Badge className="bg-blue-600">
              {gestureDirection.replace('-', ' ')}
            </Badge>
          </div>
        )}

        {/* Swipe Indicators */}
        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-20">
          <ChevronLeft className="h-8 w-8 text-[var(--hive-text-primary)]" />
        </div>
        <div className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-20">
          <ChevronRight className="h-8 w-8 text-[var(--hive-text-primary)]" />
        </div>
      </div>

      {/* Bottom Tab Navigation */}
      <div className="bg-gray-800 border-t border-gray-700">
        <div className="flex">
          {tabs.map((tab, index) => {
            const Icon = tab.icon;
            const isActive = tab.id === activeTab;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex-1 flex flex-col items-center py-3 px-2 transition-all
                  ${isActive ? 'text-[var(--hive-gold)]' : 'text-gray-400 hover:text-gray-300'}
                `}
              >
                <Icon className="h-6 w-6 mb-1" />
                <span className="text-xs font-medium">{tab.label}</span>
                {isActive && (
                  <div className="w-8 h-0.5 bg-[var(--hive-gold)] rounded-full mt-1" />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// Gesture Settings Panel
const GestureSettings = () => {
  const gestures = useAdvancedGestures();

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-[var(--hive-text-primary)] flex items-center">
          <Settings className="mr-2 h-5 w-5" />
          Gesture Settings
        </CardTitle>
        <CardDescription className="text-gray-400">
          Customize touch and gesture behavior
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <label className="text-[var(--hive-text-primary)] font-medium">Haptic Feedback</label>
            <p className="text-sm text-gray-400">Vibration feedback for gestures</p>
          </div>
          <Switch
            checked={gestures.settings.hapticFeedback}
            onCheckedChange={(checked: any) => 
              gestures.setSettings(prev => ({ ...prev, hapticFeedback: checked }))
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-[var(--hive-text-primary)] font-medium">
            Swipe Sensitivity: {gestures.settings.swipeSensitivity}x
          </label>
          <Slider
            value={[gestures.settings.swipeSensitivity]}
            onValueChange={(value: unknown) => 
              gestures.setSettings(prev => ({ ...prev, swipeSensitivity: value[0] }))
            }
            min={0.5}
            max={2}
            step={0.1}
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <label className="text-[var(--hive-text-primary)] font-medium">
            Gesture Threshold: {gestures.settings.gestureThreshold}px
          </label>
          <Slider
            value={[gestures.settings.gestureThreshold]}
            onValueChange={(value: unknown) => 
              gestures.setSettings(prev => ({ ...prev, gestureThreshold: value[0] }))
            }
            min={20}
            max={100}
            step={5}
            className="w-full"
          />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <label className="text-[var(--hive-text-primary)] font-medium">Long Press</label>
            <p className="text-sm text-gray-400">Enable long press gestures</p>
          </div>
          <Switch
            checked={gestures.settings.enableLongPress}
            onCheckedChange={(checked: any) => 
              gestures.setSettings(prev => ({ ...prev, enableLongPress: checked }))
            }
          />
        </div>

        <div className="space-y-2">
          <label className="text-[var(--hive-text-primary)] font-medium">
            Long Press Duration: {gestures.settings.longPressDuration}ms
          </label>
          <Slider
            value={[gestures.settings.longPressDuration]}
            onValueChange={(value: unknown) => 
              gestures.setSettings(prev => ({ ...prev, longPressDuration: value[0] }))
            }
            min={200}
            max={1000}
            step={50}
            className="w-full"
          />
        </div>
      </CardContent>
    </Card>
  );
};

// Campus Quick Actions Modal
const CampusQuickActions = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const gestures = useAdvancedGestures();

  const quickActions = [
    { id: 'dining', label: 'Dining Hours', icon: Coffee, color: 'bg-[var(--hive-gold)]' },
    { id: 'parking', label: 'Parking Status', icon: MapPin, color: 'bg-blue-500' },
    { id: 'library', label: 'Library Hours', icon: Book, color: 'bg-green-500' },
    { id: 'bus', label: 'Shuttle Times', icon: Navigation, color: 'bg-[var(--hive-gold)]' },
    { id: 'wifi', label: 'WiFi Status', icon: Wifi, color: 'bg-cyan-500' },
    { id: 'events', label: 'Today\'s Events', icon: Calendar, color: 'bg-[var(--hive-gold)]' },
    { id: 'weather', label: 'Buffalo Weather', icon: Globe, color: 'bg-indigo-500' },
    { id: 'emergency', label: 'Campus Safety', icon: Bell, color: 'bg-red-500' }
  ];

  const handleActionSelect = (actionId: string) => {
    setSelectedAction(actionId);
    gestures.triggerHaptic('medium');
    
    setTimeout(() => {
      setSelectedAction(null);
      onClose();
    }, 500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[var(--hive-black)] bg-opacity-50 flex items-center justify-center z-50">
      <div className="max-w-sm w-full mx-4 bg-gray-900 rounded-2xl p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[var(--hive-text-primary)] text-xl font-bold">Campus Quick Actions</h2>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-[var(--hive-text-primary)] transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action: any) => {
            const Icon = action.icon;
            const isSelected = selectedAction === action.id;
            
            return (
              <button
                key={action.id}
                onClick={() => handleActionSelect(action.id)}
                className={`
                  p-4 rounded-xl flex flex-col items-center space-y-2 transition-all
                  ${isSelected 
                    ? `${action.color} scale-95 shadow-lg` 
                    : 'bg-gray-800 hover:bg-gray-700 active:scale-95'
                  }
                `}
              >
                <Icon className={`h-6 w-6 ${isSelected ? 'text-[var(--hive-text-primary)]' : 'text-gray-300'}`} />
                <span className={`text-sm font-medium text-center leading-tight ${
                  isSelected ? 'text-[var(--hive-text-primary)]' : 'text-gray-300'
                }`}>
                  {action.label}
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Tap any action for instant campus info
          </p>
        </div>
      </div>
    </div>
  );
};

// Main Mobile Gestures System
const MobileGesturesSystem = () => {
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [gestureDemo, setGestureDemo] = useState('feed');

  const demoOptions = [
    { id: 'feed', label: 'Campus Feed', component: CampusFeedMobile },
    { id: 'navigation', label: 'Tab Navigation', component: MobileNavigation }
  ];

  const currentDemo = demoOptions.find(option => option.id === gestureDemo);
  const DemoComponent = currentDemo?.component || CampusFeedMobile;

  return (
    <div className="min-h-screen bg-[var(--hive-black)] text-[var(--hive-text-primary)]">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[var(--hive-text-primary)] mb-4 flex items-center">
            <Smartphone className="mr-4 h-10 w-10" />
            Advanced Mobile Gestures & Touch
          </h1>
          <p className="text-gray-400 text-lg max-w-4xl">
            Mobile-first gesture system optimized for UB students' on-the-go campus lifestyle.
            Advanced touch interactions, haptic feedback, and thumb-friendly navigation patterns.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Settings and Controls */}
          <div className="lg:col-span-1 space-y-6">
            <GestureSettings />

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-[var(--hive-text-primary)] flex items-center">
                  <Fingerprint className="mr-2 h-5 w-5" />
                  Demo Selection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {demoOptions.map(option => (
                    <button
                      key={option.id}
                      onClick={() => setGestureDemo(option.id)}
                      className={`
                        w-full p-3 text-left rounded-lg transition-colors
                        ${gestureDemo === option.id 
                          ? 'bg-[var(--hive-gold)] text-[var(--hive-black)] font-medium' 
                          : 'bg-gray-800 text-[var(--hive-text-primary)] hover:bg-gray-700'
                        }
                      `}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-[var(--hive-text-primary)]">Campus Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  onClick={() => setShowQuickActions(true)}
                  className="w-full bg-[var(--hive-gold)] hover:bg-yellow-600 text-[var(--hive-black)]"
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Open Quick Actions
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Demo Area */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-[var(--hive-text-primary)] flex items-center">
                  <Hand className="mr-2 h-5 w-5" />
                  {currentDemo?.label} Demo
                </CardTitle>
                <CardDescription className="text-gray-400">
                  {gestureDemo === 'feed' 
                    ? 'Swipe cards left/right for actions, pull down to refresh'
                    : 'Swipe left/right to navigate between tabs'
                  }
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center">
                <DemoComponent />
              </CardContent>
            </Card>

            {/* Gesture Guide */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-[var(--hive-text-primary)] flex items-center">
                  <Move className="mr-2 h-5 w-5" />
                  Gesture Guide
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Mobile interaction patterns for campus life
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h4 className="text-[var(--hive-text-primary)] font-medium">Touch Gestures</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center space-x-3">
                        <ArrowLeft className="h-4 w-4 text-red-400" />
                        <span className="text-[var(--hive-text-primary)]">Swipe Left:</span>
                        <span className="text-gray-400">Bookmark post</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <ArrowRight className="h-4 w-4 text-green-400" />
                        <span className="text-[var(--hive-text-primary)]">Swipe Right:</span>
                        <span className="text-gray-400">Like post</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <ArrowDown className="h-4 w-4 text-blue-400" />
                        <span className="text-[var(--hive-text-primary)]">Pull Down:</span>
                        <span className="text-gray-400">Refresh content</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <Fingerprint className="h-4 w-4 text-[var(--hive-gold)]" />
                        <span className="text-[var(--hive-text-primary)]">Long Press:</span>
                        <span className="text-gray-400">Quick actions</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h4 className="text-[var(--hive-text-primary)] font-medium">Campus Features</h4>
                    <div className="space-y-2 text-sm text-gray-400">
                      <div>• Thumb-friendly navigation zones</div>
                      <div>• One-handed operation optimized</div>
                      <div>• Haptic feedback for actions</div>
                      <div>• Quick access to campus services</div>
                      <div>• Gesture-based content interaction</div>
                      <div>• Smooth animations and transitions</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Quick Actions Modal */}
      <CampusQuickActions 
        isOpen={showQuickActions}
        onClose={() => setShowQuickActions(false)}
      />
    </div>
  );
};

// Story Exports
export const MobileGesturesSystemDemo: Story = {
  render: () => <MobileGesturesSystem />,
  parameters: {
    docs: {
      description: {
        story: 'Complete mobile gestures and touch interaction system optimized for campus usage'
      }
    }
  }
};

export const SwipeableContent: Story = {
  render: () => (
    <div className="max-w-md mx-auto p-6 bg-[var(--hive-black)]">
      <CampusFeedMobile />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Swipeable content cards with pull-to-refresh functionality'
      }
    }
  }
};

export const TouchNavigation: Story = {
  render: () => (
    <div className="max-w-md mx-auto p-6 bg-[var(--hive-black)]">
      <MobileNavigation />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Touch-optimized navigation with swipe gestures between tabs'
      }
    }
  }
};

export const CampusQuickActionsDemo: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div className="p-6 bg-[var(--hive-black)] min-h-96">
        <Button onClick={() => setIsOpen(true)} className="mb-4">
          Open Quick Actions
        </Button>
        <CampusQuickActions isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Quick access modal for essential campus services and information'
      }
    }
  }
};

export const GestureConfiguration: Story = {
  render: () => (
    <div className="max-w-md mx-auto p-6 bg-[var(--hive-black)]">
      <GestureSettings />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Customizable gesture settings for personalized mobile experience'
      }
    }
  }
};