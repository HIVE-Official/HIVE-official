import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Badge } from '../../../components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../../components/ui/avatar';
import { Progress } from '../../../components/ui/progress';
import { Slider } from '../../../components/ui/slider';
import { Switch } from '../../../components/ui/switch';
import { 
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  Send,
  ThumbsUp,
  Star,
  Zap,
  Sparkles,
  TrendingUp,
  Activity,
  Users,
  Plus,
  Minus,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Bell,
  BellOff,
  Eye,
  EyeOff,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  RotateCcw,
  RefreshCw,
  Download,
  Upload,
  Search,
  Filter,
  Settings,
  X,
  Check,
  AlertCircle,
  CheckCircle,
  Info,
  Loader2,
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  Expand,
  Shrink,
  MousePointer,
  Move,
  CornerUpLeft,
  CornerUpRight,
  CornerDownLeft,
  CornerDownRight,
  Target,
  Crosshair,
  Maximize,
  Minimize
} from 'lucide-react';

/**
 * # HIVE Advanced Animations & Interactions
 * 
 * Sophisticated micro-animations, transitions, and interactive patterns that create
 * a buttery-smooth, engaging experience for UB students. Demonstrates advanced
 * animation techniques while maintaining accessibility and performance.
 * 
 * ## Animation Features:
 * - **Micro-Interactions**: Delightful feedback for every user action
 * - **State Transitions**: Smooth animation between different UI states
 * - **Loading Animations**: Engaging loading states that reduce perceived wait time
 * - **Gesture Feedback**: Visual feedback for touch and swipe interactions
 * - **Social Animations**: Satisfying animations for likes, shares, and reactions
 * - **Campus Themed**: Animations that reflect campus life and student energy
 * - **Performance Optimized**: 60fps animations with motion preference respect
 * - **Accessibility Aware**: Respects reduced motion preferences
 */

const meta: Meta = {
  title: '20-Advanced Systems/Animations & Interactions',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        story: 'Advanced micro-animations and interactive patterns for delightful user experiences'
      }
    }
  }
};

export default meta;
type Story = StoryObj;

// Animation State Management
const useAnimations = () => {
  const [reduceMotion, setReduceMotion] = useState(false);
  const [animationSpeed, setAnimationSpeed] = useState(1);
  const [hapticFeedback, setHapticFeedback] = useState(true);

  // Detect user's motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduceMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setReduceMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  const triggerHaptic = useCallback((type: 'light' | 'medium' | 'heavy' = 'light') => {
    if (!hapticFeedback) return;
    
    if ('vibrate' in navigator) {
      const patterns = {
        light: [10],
        medium: [20],
        heavy: [50]
      };
      navigator.vibrate(patterns[type]);
    }
  }, [hapticFeedback]);

  return {
    reduceMotion,
    animationSpeed,
    hapticFeedback,
    setReduceMotion,
    setAnimationSpeed,
    setHapticFeedback,
    triggerHaptic
  };
};

// Animated Button with Rich Interactions
const AnimatedButton = ({ 
  children, 
  variant = 'default',
  size = 'default',
  loading = false,
  success = false,
  icon: Icon,
  onClick,
  className = '',
  animationType = 'bounce'
}: {
  children: React.ReactNode;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost';
  size?: 'default' | 'sm' | 'lg';
  loading?: boolean;
  success?: boolean;
  icon?: any;
  onClick?: () => void;
  className?: string;
  animationType?: 'bounce' | 'scale' | 'pulse' | 'shake' | 'glow';
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const { reduceMotion, triggerHaptic } = useAnimations();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    if (loading) return;
    
    triggerHaptic('light');
    setIsPressed(true);
    
    // Animate success state if provided
    if (success) {
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 2000);
    }
    
    setTimeout(() => setIsPressed(false), 150);
    onClick?.();
  };

  const animationClasses = {
    bounce: !reduceMotion ? 'active:scale-95 hover:scale-105 transition-transform duration-150' : '',
    scale: !reduceMotion ? 'hover:scale-110 active:scale-90 transition-transform duration-200' : '',
    pulse: !reduceMotion ? 'hover:animate-pulse' : '',
    shake: !reduceMotion && isPressed ? 'animate-bounce' : '',
    glow: !reduceMotion ? 'hover:shadow-lg hover:shadow-yellow-500/25 transition-shadow duration-300' : ''
  };

  return (
    <Button
      ref={buttonRef}
      onClick={handleClick}
      variant={variant}
      size={size}
      disabled={loading}
      className={`
        ${animationClasses[animationType]}
        ${showSuccess ? 'bg-green-600 hover:bg-green-700' : ''}
        ${className}
        relative overflow-hidden
      `}
    >
      <div className="flex items-center space-x-2">
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : showSuccess ? (
          <CheckCircle className="h-4 w-4" />
        ) : Icon ? (
          <Icon className="h-4 w-4" />
        ) : null}
        
        <span className={showSuccess ? 'text-white' : ''}>
          {showSuccess ? 'Success!' : children}
        </span>
      </div>
      
      {/* Ripple Effect */}
      {!reduceMotion && isPressed && (
        <div className="absolute inset-0 bg-white/20 animate-ping rounded" />
      )}
    </Button>
  );
};

// Animated Social Interaction Button
const SocialButton = ({ 
  icon: Icon, 
  count, 
  active, 
  onClick,
  color,
  label
}: {
  icon: any;
  count: number;
  active: boolean;
  onClick: () => void;
  color: string;
  label: string;
}) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const [currentCount, setCurrentCount] = useState(count);
  const { reduceMotion, triggerHaptic } = useAnimations();

  const handleClick = () => {
    triggerHaptic('medium');
    setIsAnimating(true);
    
    // Update count with animation
    if (!active) {
      setCurrentCount(prev => prev + 1);
    } else {
      setCurrentCount(prev => prev - 1);
    }
    
    setTimeout(() => setIsAnimating(false), 300);
    onClick();
  };

  return (
    <button
      onClick={handleClick}
      className={`
        group flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200
        hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-yellow-500
        ${active ? `text-${color}-400` : 'text-gray-400'}
        ${!reduceMotion ? 'hover:scale-105 active:scale-95' : ''}
      `}
      aria-label={`${label} this post. Currently ${currentCount} ${label.toLowerCase()}s.`}
    >
      <div className="relative">
        <Icon 
          className={`
            h-5 w-5 transition-all duration-200
            ${isAnimating && !reduceMotion ? 'animate-bounce' : ''}
            ${active ? 'fill-current' : ''}
          `} 
        />
        
        {/* Burst Animation */}
        {isAnimating && !reduceMotion && !active && (
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-1 h-1 bg-${color}-400 rounded-full animate-ping`}
                style={{
                  left: '50%',
                  top: '50%',
                  transform: `translate(-50%, -50%) rotate(${i * 60}deg) translateY(-15px)`,
                  animationDelay: `${i * 50}ms`,
                  animationDuration: '600ms'
                }}
              />
            ))}
          </div>
        )}
      </div>
      
      <span 
        className={`
          text-sm font-medium transition-all duration-200
          ${isAnimating && !reduceMotion ? 'animate-pulse' : ''}
        `}
      >
        {currentCount}
      </span>
    </button>
  );
};

// Animated Progress Indicator
const AnimatedProgress = ({ 
  value, 
  label, 
  color = 'yellow',
  showPercentage = true,
  animated = true
}: {
  value: number;
  label?: string;
  color?: string;
  showPercentage?: boolean;
  animated?: boolean;
}) => {
  const [displayValue, setDisplayValue] = useState(0);
  const { reduceMotion } = useAnimations();

  useEffect(() => {
    if (!animated || reduceMotion) {
      setDisplayValue(value);
      return;
    }

    const increment = value / 60; // 60fps animation
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(current);
      }
    }, 16.67); // ~60fps

    return () => clearInterval(timer);
  }, [value, animated, reduceMotion]);

  return (
    <div className="space-y-2">
      {label && (
        <div className="flex items-center justify-between text-sm">
          <span className="text-white">{label}</span>
          {showPercentage && (
            <span className="text-gray-400">{Math.round(displayValue)}%</span>
          )}
        </div>
      )}
      
      <div className="relative">
        <Progress 
          value={displayValue} 
          className={`
            h-3 bg-gray-800
            ${!reduceMotion ? 'transition-all duration-300' : ''}
          `}
        />
        
        {/* Shimmer effect */}
        {!reduceMotion && displayValue < 100 && (
          <div 
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"
            style={{ width: `${displayValue}%` }}
          />
        )}
      </div>
    </div>
  );
};

// Animated Loading States
const LoadingStates = () => {
  const { reduceMotion } = useAnimations();
  
  const loadingVariants = [
    {
      name: 'Spinning Dots',
      component: (
        <div className="flex space-x-1">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-2 bg-yellow-500 rounded-full"
              style={{
                animation: !reduceMotion ? `bounce 1.4s ease-in-out infinite ${i * 0.16}s` : undefined
              }}
            />
          ))}
        </div>
      )
    },
    {
      name: 'Pulsing Circle',
      component: (
        <div className={`w-8 h-8 bg-yellow-500 rounded-full ${!reduceMotion ? 'animate-pulse' : ''}`} />
      )
    },
    {
      name: 'Growing Bars',
      component: (
        <div className="flex items-end space-x-1">
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-yellow-500 rounded-full"
              style={{
                height: '8px',
                animation: !reduceMotion ? `growBar 1s ease-in-out infinite ${i * 0.15}s` : undefined
              }}
            />
          ))}
        </div>
      )
    },
    {
      name: 'Campus Spinner',
      component: (
        <div className="relative">
          <div className={`w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full ${!reduceMotion ? 'animate-spin' : ''}`} />
          <div className="absolute inset-2 w-4 h-4 bg-yellow-500 rounded-full" />
        </div>
      )
    }
  ];

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Loader2 className="mr-2 h-5 w-5" />
          Loading Animations
        </CardTitle>
        <CardDescription className="text-gray-400">
          Engaging loading states that make waiting enjoyable
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-6">
          {loadingVariants.map((variant, index) => (
            <div key={index} className="flex flex-col items-center space-y-3">
              <div className="flex items-center justify-center w-16 h-16 bg-gray-800 rounded-lg">
                {variant.component}
              </div>
              <span className="text-sm text-gray-400">{variant.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Gesture Interaction Demo
const GestureDemo = () => {
  const [swipeDirection, setSwipeDirection] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragPosition, setDragPosition] = useState({ x: 0, y: 0 });
  const { reduceMotion, triggerHaptic } = useAnimations();
  const gestureRef = useRef<HTMLDivElement>(null);
  const startPos = useRef({ x: 0, y: 0 });

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    startPos.current = { x: touch.clientX, y: touch.clientY };
    setIsDragging(true);
    triggerHaptic('light');
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    const deltaX = touch.clientX - startPos.current.x;
    const deltaY = touch.clientY - startPos.current.y;
    
    setDragPosition({ x: deltaX, y: deltaY });
  };

  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    const { x, y } = dragPosition;
    const threshold = 50;
    
    if (Math.abs(x) > threshold || Math.abs(y) > threshold) {
      if (Math.abs(x) > Math.abs(y)) {
        setSwipeDirection(x > 0 ? 'right' : 'left');
      } else {
        setSwipeDirection(y > 0 ? 'down' : 'up');
      }
      triggerHaptic('medium');
    }
    
    setIsDragging(false);
    setDragPosition({ x: 0, y: 0 });
    
    setTimeout(() => setSwipeDirection(null), 1000);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    startPos.current = { x: e.clientX, y: e.clientY };
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    
    const deltaX = e.clientX - startPos.current.x;
    const deltaY = e.clientY - startPos.current.y;
    
    setDragPosition({ x: deltaX, y: deltaY });
  };

  const handleMouseUp = handleTouchEnd;

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Move className="mr-2 h-5 w-5" />
          Gesture Interactions
        </CardTitle>
        <CardDescription className="text-gray-400">
          Swipe and drag to interact (works with touch and mouse)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div
          ref={gestureRef}
          className={`
            relative w-full h-40 bg-gray-800 rounded-lg border-2 border-dashed border-gray-600
            flex items-center justify-center cursor-grab
            ${isDragging ? 'cursor-grabbing' : ''}
            ${!reduceMotion ? 'transition-all duration-200' : ''}
          `}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <div
            className={`
              w-16 h-16 bg-yellow-500 rounded-lg flex items-center justify-center
              ${!reduceMotion ? 'transition-transform duration-150' : ''}
              ${isDragging ? 'scale-110' : ''}
            `}
            style={{
              transform: `translate(${dragPosition.x}px, ${dragPosition.y}px)`
            }}
          >
            <MousePointer className="h-8 w-8 text-black" />
          </div>
          
          {swipeDirection && (
            <div className="absolute top-2 right-2">
              <Badge className="bg-green-600">
                Swiped {swipeDirection}!
              </Badge>
            </div>
          )}
          
          <div className="absolute bottom-2 left-2 text-gray-400 text-sm">
            {isDragging ? 'Dragging...' : 'Drag me around!'}
          </div>
        </div>
        
        <div className="mt-4 grid grid-cols-4 gap-2">
          {[
            { direction: 'up', icon: ArrowUp },
            { direction: 'down', icon: ArrowDown },
            { direction: 'left', icon: ArrowLeft },
            { direction: 'right', icon: ArrowRight }
          ].map(({ direction, icon: Icon }) => (
            <div
              key={direction}
              className={`
                flex items-center justify-center p-3 rounded-lg border transition-all
                ${swipeDirection === direction ? 'border-green-500 bg-green-500/10' : 'border-gray-700'}
              `}
            >
              <Icon className={`h-5 w-5 ${swipeDirection === direction ? 'text-green-400' : 'text-gray-500'}`} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

// Animated Post Card with Rich Interactions
const AnimatedPostCard = () => {
  const [interactions, setInteractions] = useState({
    liked: false,
    bookmarked: false,
    shared: false,
    commented: false
  });
  const [counts, setCounts] = useState({
    likes: 24,
    comments: 8,
    shares: 3,
    bookmarks: 12
  });

  const handleInteraction = (type: keyof typeof interactions) => {
    const newState = !interactions[type];
    
    setInteractions(prev => ({
      ...prev,
      [type]: newState
    }));
    
    setCounts(prev => ({
      ...prev,
      [type === 'liked' ? 'likes' : type === 'bookmarked' ? 'bookmarks' : type === 'shared' ? 'shares' : 'comments']: 
        prev[type === 'liked' ? 'likes' : type === 'bookmarked' ? 'bookmarks' : type === 'shared' ? 'shares' : 'comments'] + (newState ? 1 : -1)
    }));
  };

  return (
    <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition-colors duration-200">
      <CardContent className="p-6">
        <div className="flex items-start space-x-3 mb-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src="/api/placeholder/48/48" />
            <AvatarFallback className="bg-gray-700 text-white">SJ</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <span className="font-semibold text-white">Sarah Johnson</span>
              <Badge variant="secondary" className="bg-blue-900 text-blue-300 text-xs">
                CS Study Group
              </Badge>
              <span className="text-gray-500 text-sm">2m ago</span>
            </div>
            <p className="text-white">
              Just aced my algorithms exam! 🎉 Thanks to everyone in the study group - 
              collaborative learning really works. Who's up for celebrating at South Campus?
            </p>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <SocialButton
              icon={Heart}
              count={counts.likes}
              active={interactions.liked}
              onClick={() => handleInteraction('liked')}
              color="red"
              label="Like"
            />
            
            <SocialButton
              icon={MessageCircle}
              count={counts.comments}
              active={interactions.commented}
              onClick={() => handleInteraction('commented')}
              color="blue"
              label="Comment"
            />
            
            <SocialButton
              icon={Share2}
              count={counts.shares}
              active={interactions.shared}
              onClick={() => handleInteraction('shared')}
              color="green"
              label="Share"
            />
            
            <SocialButton
              icon={Bookmark}
              count={counts.bookmarks}
              active={interactions.bookmarked}
              onClick={() => handleInteraction('bookmarked')}
              color="yellow"
              label="Bookmark"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Animation Controls Panel
const AnimationControls = () => {
  const { 
    reduceMotion, 
    animationSpeed, 
    hapticFeedback,
    setReduceMotion,
    setAnimationSpeed,
    setHapticFeedback
  } = useAnimations();

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader>
        <CardTitle className="text-white flex items-center">
          <Settings className="mr-2 h-5 w-5" />
          Animation Controls
        </CardTitle>
        <CardDescription className="text-gray-400">
          Customize animation behavior and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-white">Reduce Motion</Label>
            <p className="text-sm text-gray-400">Minimize animations and transitions</p>
          </div>
          <Switch
            checked={reduceMotion}
            onCheckedChange={setReduceMotion}
          />
        </div>
        
        <div className="space-y-2">
          <Label className="text-white">Animation Speed: {animationSpeed}x</Label>
          <Slider
            value={[animationSpeed]}
            onValueChange={(value) => setAnimationSpeed(value[0])}
            min={0.5}
            max={2}
            step={0.1}
            className="w-full"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-white">Haptic Feedback</Label>
            <p className="text-sm text-gray-400">Vibration on mobile devices</p>
          </div>
          <Switch
            checked={hapticFeedback}
            onCheckedChange={setHapticFeedback}
          />
        </div>

        <div className="pt-4 border-t border-gray-700">
          <h4 className="text-white font-medium mb-3">Test Animations</h4>
          <div className="grid grid-cols-2 gap-2">
            <AnimatedButton animationType="bounce" icon={Zap}>
              Bounce
            </AnimatedButton>
            <AnimatedButton animationType="scale" icon={Target}>
              Scale
            </AnimatedButton>
            <AnimatedButton animationType="pulse" icon={Activity}>
              Pulse
            </AnimatedButton>
            <AnimatedButton animationType="glow" icon={Sparkles}>
              Glow
            </AnimatedButton>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

// Main Animations System
const AnimationsSystem = () => {
  const [progressValue, setProgressValue] = useState(0);

  // Simulate progress changes
  useEffect(() => {
    const interval = setInterval(() => {
      setProgressValue(prev => (prev + 10) % 100);
    }, 2000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-4 flex items-center">
            <Sparkles className="mr-4 h-10 w-10" />
            Advanced Animations & Interactions
          </h1>
          <p className="text-gray-400 text-lg max-w-4xl">
            Sophisticated micro-animations and interactive patterns that create a buttery-smooth,
            engaging experience for UB students while respecting accessibility preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Controls */}
          <div className="lg:col-span-1 space-y-6">
            <AnimationControls />
            <LoadingStates />
          </div>

          {/* Demo Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Animated Post */}
            <AnimatedPostCard />
            
            {/* Gesture Demo */}
            <GestureDemo />
            
            {/* Progress Animations */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Progress Animations
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Smooth animated progress indicators
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <AnimatedProgress 
                  value={progressValue} 
                  label="Campus Engagement Level"
                  color="yellow"
                />
                <AnimatedProgress 
                  value={85} 
                  label="Profile Completion"
                  color="green"
                />
                <AnimatedProgress 
                  value={67} 
                  label="Weekly Activity"
                  color="blue"
                />
              </CardContent>
            </Card>

            {/* Button Variations */}
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MousePointer className="mr-2 h-5 w-5" />
                  Interactive Buttons
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Buttons with various animation and feedback styles
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <AnimatedButton 
                    animationType="bounce"
                    icon={Heart}
                    loading={false}
                  >
                    Like Post
                  </AnimatedButton>
                  
                  <AnimatedButton 
                    animationType="scale"
                    icon={Share2}
                    variant="secondary"
                  >
                    Share
                  </AnimatedButton>
                  
                  <AnimatedButton 
                    animationType="glow"
                    icon={Plus}
                    variant="secondary"
                  >
                    Join Space
                  </AnimatedButton>
                  
                  <AnimatedButton 
                    animationType="pulse"
                    icon={Send}
                    success={true}
                  >
                    Send Message
                  </AnimatedButton>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Global Animation Styles */}
      <style jsx global>{`
        @keyframes growBar {
          0%, 40%, 100% { 
            transform: scaleY(0.4);
            height: 8px;
          }
          20% { 
            transform: scaleY(1);
            height: 20px;
          }
        }
        
        .motion-reduce {
          animation-duration: 0.01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: 0.01ms !important;
        }
      `}</style>
    </div>
  );
};

// Story Exports
export const AdvancedAnimationsSystem: Story = {
  render: () => <AnimationsSystem />,
  parameters: {
    docs: {
      description: {
        story: 'Complete advanced animations and interactions system with micro-interactions and gesture support'
      }
    }
  }
};

export const MicroInteractions: Story = {
  render: () => <AnimatedPostCard />,
  parameters: {
    docs: {
      description: {
        story: 'Micro-interactions for social features with satisfying animation feedback'
      }
    }
  }
};

export const GestureInteractions: Story = {
  render: () => <GestureDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Touch and mouse gesture interactions with haptic feedback'
      }
    }
  }
};

export const LoadingAnimations: Story = {
  render: () => <LoadingStates />,
  parameters: {
    docs: {
      description: {
        story: 'Various loading animation patterns that engage users during wait times'
      }
    }
  }
};

export const AccessibleAnimations: Story = {
  render: () => <AnimationsSystem />,
  parameters: {
    docs: {
      description: {
        story: 'Animations that respect reduced motion preferences and accessibility needs'
      }
    }
  }
};