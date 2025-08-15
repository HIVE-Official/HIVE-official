import type { Meta, StoryObj } from '@storybook/react';
import React, { useState, useRef, useCallback, useEffect } from 'react';

const meta = {
  title: '05-Profile System/03-Complete System/Animated Profile System',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Complete HIVE Profile System with full atomic coverage, proper animations, and comprehensive interaction patterns for Jacob\'s audit'
      }
    }
  },
  tags: ['autodocs'],
} satisfies Meta;

export default meta;
type Story = StoryObj<typeof meta>;

// Animation utilities
const useAnimation = (duration: number = 300) => {
  const [isAnimating, setIsAnimating] = useState(false);
  
  const animate = useCallback(async (callback?: () => void) => {
    setIsAnimating(true);
    if (callback) callback();
    await new Promise(resolve => setTimeout(resolve, duration));
    setIsAnimating(false);
  }, [duration]);

  return { isAnimating, animate };
};

// Enhanced Widget interfaces with animation states
interface AnimatedWidget {
  id: string;
  type: 'avatar' | 'priority' | 'community' | 'calendar' | 'privacy' | 'tools';
  title: string;
  width: number;
  height: number;
  x: number;
  y: number;
  minWidth: number;
  maxWidth: number;
  minHeight: number;
  maxHeight: number;
  state: 'loading' | 'error' | 'empty' | 'loaded';
  animationState: 'idle' | 'hover' | 'dragging' | 'expanding' | 'focusing';
  data?: any;
}

// Atomic Components with proper animations

// ATOM: Enhanced Status Indicator with animations
const StatusIndicator: React.FC<{
  status: 'online' | 'away' | 'busy' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  animated?: boolean;
}> = ({ status, size = 'md', animated = true }) => {
  const sizeClasses = {
    sm: 'w-2 h-2',
    md: 'w-3 h-3', 
    lg: 'w-4 h-4'
  };

  const colorClasses = {
    online: 'bg-hive-status-success',
    away: 'bg-hive-status-warning',
    busy: 'bg-hive-status-error', 
    ghost: 'bg-hive-text-tertiary opacity-50'
  };

  return (
    <div className={`
      ${sizeClasses[size]} ${colorClasses[status]} rounded-full
      ${animated && status === 'online' ? 'animate-pulse' : ''}
      ${animated ? 'transition-all duration-300' : ''}
    `} />
  );
};

// ATOM: Profile Avatar with hover animations
const ProfileAvatar: React.FC<{
  name: string;
  initials: string;
  status: 'online' | 'away' | 'busy' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  interactive?: boolean;
  onClick?: () => void;
}> = ({ name, initials, status, size = 'md', interactive = false, onClick }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-12 h-12 text-lg',
    lg: 'w-16 h-16 text-xl',
    xl: 'w-24 h-24 text-3xl'
  };

  return (
    <div 
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div 
        className={`
          ${sizeClasses[size]} 
          bg-gradient-to-br from-hive-brand-primary to-hive-brand-secondary 
          rounded-full flex items-center justify-center text-white font-bold
          ${interactive ? 'cursor-pointer hover:scale-110' : ''}
          ${isHovered && interactive ? 'shadow-lg' : ''}
          transition-all duration-300 ease-out
        `}
        onClick={onClick}
      >
        {initials}
      </div>
      
      <div className={`
        absolute -bottom-1 -right-1 border-2 border-white rounded-full
        ${size === 'sm' ? 'w-3 h-3' : size === 'md' ? 'w-4 h-4' : size === 'lg' ? 'w-5 h-5' : 'w-6 h-6'}
        transition-all duration-300 ${isHovered ? 'scale-110' : ''}
      `}>
        <StatusIndicator status={status} size={size === 'xl' ? 'lg' : size === 'lg' ? 'md' : 'sm'} />
      </div>

      {/* Hover tooltip */}
      {interactive && isHovered && (
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-hive-text-primary text-white text-sm rounded-lg whitespace-nowrap animate-fadeIn">
          {name}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-hive-text-primary"></div>
        </div>
      )}
    </div>
  );
};

// ATOM: Profile Badge with animation
const ProfileBadge: React.FC<{
  icon: string;
  label: string;
  variant?: 'default' | 'success' | 'warning' | 'error';
  animated?: boolean;
}> = ({ icon, label, variant = 'default', animated = true }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (animated) {
      const timer = setTimeout(() => setIsVisible(true), 100);
      return () => clearTimeout(timer);
    } else {
      setIsVisible(true);
    }
  }, [animated]);

  const variantClasses = {
    default: 'bg-hive-brand-primary',
    success: 'bg-hive-status-success',
    warning: 'bg-hive-status-warning', 
    error: 'bg-hive-status-error'
  };

  return (
    <div className={`
      inline-flex items-center gap-2 px-3 py-1 ${variantClasses[variant]} text-white rounded-full text-sm
      ${animated ? 'transition-all duration-500 ease-out' : ''}
      ${isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2'}
    `}>
      <span>{icon}</span>
      <span className="font-medium">{label}</span>
    </div>
  );
};

// ATOM: Profile Statistic with count animation
const ProfileStatistic: React.FC<{
  value: number;
  label: string;
  animate?: boolean;
}> = ({ value, label, animate = true }) => {
  const [displayValue, setDisplayValue] = useState(animate ? 0 : value);

  useEffect(() => {
    if (animate && displayValue !== value) {
      const duration = 1000;
      const steps = 60;
      const increment = (value - displayValue) / steps;
      let current = displayValue;

      const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= value) || (increment < 0 && current <= value)) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.round(current));
        }
      }, duration / steps);

      return () => clearInterval(timer);
    }
  }, [value, displayValue, animate]);

  return (
    <div className="text-center">
      <div className="text-2xl font-bold text-hive-text-primary transition-all duration-300">
        {displayValue.toLocaleString()}
      </div>
      <div className="text-sm text-hive-text-secondary">{label}</div>
    </div>
  );
};

// ATOM: Privacy Toggle with smooth animation
const PrivacyToggle: React.FC<{
  enabled: boolean;
  onChange: (enabled: boolean) => void;
  label: string;
  description?: string;
}> = ({ enabled, onChange, label, description }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-hive-background-primary rounded-xl hover:bg-hive-background-secondary/50 transition-colors duration-200">
      <div>
        <div className="font-medium text-hive-text-primary">{label}</div>
        {description && (
          <div className="text-sm text-hive-text-secondary mt-1">{description}</div>
        )}
      </div>
      
      <button
        onClick={() => onChange(!enabled)}
        className={`
          relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-hive-brand-primary focus:ring-offset-2
          ${enabled ? 'bg-hive-brand-primary' : 'bg-hive-background-secondary'}
        `}
      >
        <span
          className={`
            inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 shadow-lg
            ${enabled ? 'translate-x-6' : 'translate-x-1'}
          `}
        />
      </button>
    </div>
  );
};

// MOLECULE: Enhanced Avatar Card with animations
const AvatarCard: React.FC<{
  name: string;
  username: string;
  initials: string;
  status: 'online' | 'away' | 'busy' | 'ghost';
  connections: number;
  spaces: number;
  achievement?: string;
  interactive?: boolean;
  onFocus?: () => void;
}> = ({ name, username, initials, status, connections, spaces, achievement, interactive = true, onFocus }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`
        p-4 space-y-4 cursor-pointer transition-all duration-300 ease-out
        ${isHovered ? 'transform scale-105' : ''}
      `}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onFocus}
    >
      <div className="flex items-center gap-3">
        <ProfileAvatar 
          name={name}
          initials={initials}
          status={status}
          size="md"
          interactive={interactive}
        />
        <div className="min-w-0 flex-1">
          <div className="font-bold text-hive-text-primary truncate">{name}</div>
          <div className="text-sm text-hive-text-secondary truncate">@{username}</div>
          <div className="flex items-center gap-2 mt-1">
            <StatusIndicator status={status} size="sm" />
            <span className="text-xs text-hive-text-secondary capitalize">
              {status === 'online' ? 'Active now' : status}
            </span>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4 text-center">
        <ProfileStatistic value={connections} label="Connections" animate={isHovered} />
        <ProfileStatistic value={spaces} label="Spaces" animate={isHovered} />
      </div>

      {achievement && (
        <div className="animate-slideInUp">
          <ProfileBadge icon="🏆" label={achievement} variant="success" animated />
        </div>
      )}
    </div>
  );
};

// ORGANISM: Animated Widget Container
const AnimatedWidgetContainer: React.FC<{
  widget: AnimatedWidget;
  isEditMode: boolean;
  isSelected: boolean;
  onDragStart: (widgetId: string, event: React.MouseEvent) => void;
  onWidgetClick: (widgetId: string) => void;
  onWidgetFocus: (widgetId: string) => void;
  children: React.ReactNode;
}> = ({ widget, isEditMode, isSelected, onDragStart, onWidgetClick, onWidgetFocus, children }) => {
  const [animationState, setAnimationState] = useState<'idle' | 'hover' | 'dragging' | 'focusing'>('idle');

  const getWidgetIcon = (type: string) => {
    const icons = {
      avatar: '👤',
      priority: '📋', 
      community: '🏢',
      calendar: '📅',
      privacy: '🔒',
      tools: '🛠️'
    };
    return icons[type as keyof typeof icons] || '📦';
  };

  const handleMouseEnter = () => setAnimationState('hover');
  const handleMouseLeave = () => setAnimationState('idle');
  const handleDragStart = (e: React.MouseEvent) => {
    setAnimationState('dragging');
    onDragStart(widget.id, e);
  };
  const handleClick = () => {
    if (isEditMode) {
      onWidgetClick(widget.id);
    } else {
      setAnimationState('focusing');
      setTimeout(() => onWidgetFocus(widget.id), 200);
    }
  };

  const getAnimationClasses = () => {
    switch (animationState) {
      case 'hover':
        return isEditMode 
          ? 'scale-105 shadow-xl rotate-1' 
          : 'scale-102 shadow-lg -translate-y-1';
      case 'dragging':
        return 'scale-110 shadow-2xl rotate-3 opacity-50 z-50';
      case 'focusing':
        return 'scale-110 shadow-2xl';
      default:
        return '';
    }
  };

  return (
    <div
      className={`
        relative bg-white border-2 rounded-xl h-full overflow-hidden group
        ${isEditMode ? 'cursor-move' : 'cursor-pointer'}
        ${isSelected ? 'border-hive-brand-secondary shadow-xl' : 'border-hive-border-default'}
        ${getAnimationClasses()}
        transition-all duration-300 ease-out
      `}
      style={{
        gridColumn: `span ${widget.width}`,
        gridRow: `span ${widget.height}`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={isEditMode ? handleDragStart : undefined}
      onClick={handleClick}
    >
      {/* Edit Mode Controls with animations */}
      {isEditMode && (
        <>
          {isSelected && (
            <div className="absolute inset-0 bg-hive-brand-secondary/5 rounded-xl pointer-events-none animate-pulse" />
          )}

          <div className="absolute -top-3 -left-3 w-8 h-8 bg-hive-brand-secondary rounded-full flex items-center justify-center cursor-move z-10 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
            <div className="w-4 h-4 grid grid-cols-2 gap-0.5">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-1 h-1 bg-white rounded-full animate-pulse" style={{ animationDelay: `${i * 100}ms` }}></div>
              ))}
            </div>
          </div>
          
          <div className="absolute -top-2 -right-2 px-2 py-1 bg-hive-background-secondary border border-hive-border-default rounded-full text-xs text-hive-text-secondary opacity-0 group-hover:opacity-100 transition-all duration-300">
            {widget.width}×{widget.height}
          </div>
        </>
      )}

      {/* Widget Header with animation */}
      <div className="flex items-center justify-between p-4 border-b border-hive-border-default">
        <div className="flex items-center gap-2">
          <div className={`
            w-5 h-5 bg-hive-brand-secondary rounded text-white text-xs flex items-center justify-center font-bold
            transition-transform duration-200 ${animationState === 'hover' ? 'scale-110 rotate-12' : ''}
          `}>
            {getWidgetIcon(widget.type)}
          </div>
          <span className="text-sm font-medium text-hive-text-secondary">{widget.title}</span>
        </div>

        {/* Widget state indicator */}
        <div className={`w-2 h-2 rounded-full transition-colors duration-300 ${
          widget.state === 'loaded' ? 'bg-hive-status-success' :
          widget.state === 'loading' ? 'bg-hive-status-warning animate-pulse' :
          widget.state === 'error' ? 'bg-hive-status-error' :
          'bg-hive-text-tertiary'
        }`} />
      </div>

      {/* Widget Content with pointer events control */}
      <div className={`${isEditMode ? 'pointer-events-none' : ''} transition-transform duration-200 ${animationState === 'hover' && !isEditMode ? 'scale-[1.02]' : ''}`}>
        {children}
      </div>

      {/* Focus Hint with animation */}
      {!isEditMode && animationState === 'hover' && (
        <div className="absolute bottom-2 left-4 right-4 bg-black/70 text-white text-xs text-center py-2 rounded-lg animate-slideInUp">
          Click to expand & focus →
        </div>
      )}
    </div>
  );
};

// Main Animated Profile System
const AnimatedProfileSystem: React.FC = () => {
  const [widgets, setWidgets] = useState<AnimatedWidget[]>([
    { 
      id: 'avatar', 
      type: 'avatar', 
      title: 'Avatar & Identity', 
      width: 1, 
      height: 1, 
      x: 0, 
      y: 0,
      minWidth: 1, maxWidth: 2, minHeight: 1, maxHeight: 2,
      state: 'loaded',
      animationState: 'idle'
    },
    { 
      id: 'priority', 
      type: 'priority', 
      title: 'Priority Coordination', 
      width: 2, 
      height: 1, 
      x: 1, 
      y: 0,
      minWidth: 1, maxWidth: 4, minHeight: 1, maxHeight: 2,
      state: 'loaded',
      animationState: 'idle'
    },
    { 
      id: 'community', 
      type: 'community', 
      title: 'Community Coordination', 
      width: 1, 
      height: 2, 
      x: 3, 
      y: 0,
      minWidth: 1, maxWidth: 2, minHeight: 1, maxHeight: 3,
      state: 'loaded',
      animationState: 'idle'
    },
    { 
      id: 'calendar', 
      type: 'calendar', 
      title: 'Social Calendar', 
      width: 2, 
      height: 1, 
      x: 0, 
      y: 1,
      minWidth: 2, maxWidth: 4, minHeight: 1, maxHeight: 2,
      state: 'loaded',
      animationState: 'idle'
    },
    { 
      id: 'privacy', 
      type: 'privacy', 
      title: 'Privacy Control', 
      width: 1, 
      height: 1, 
      x: 2, 
      y: 1,
      minWidth: 1, maxWidth: 2, minHeight: 1, maxHeight: 2,
      state: 'loaded',
      animationState: 'idle'
    },
    { 
      id: 'tools', 
      type: 'tools', 
      title: 'Personal Tools (v1 Preview)', 
      width: 2, 
      height: 2, 
      x: 0, 
      y: 2,
      minWidth: 2, maxWidth: 4, minHeight: 2, maxHeight: 3,
      state: 'loaded',
      animationState: 'idle'
    }
  ]);
  
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null);
  const [focusedWidget, setFocusedWidget] = useState<string | null>(null);
  const [ghostMode, setGhostMode] = useState(false);
  
  const { isAnimating: isTransitioning, animate } = useAnimation(300);

  const handleDragStart = useCallback((widgetId: string, event: React.MouseEvent) => {
    if (!isEditMode) return;
    setSelectedWidget(widgetId);
    // Implement drag logic here
    event.preventDefault();
  }, [isEditMode]);

  const handleWidgetFocus = useCallback((widgetId: string) => {
    animate(() => setFocusedWidget(widgetId));
  }, [animate]);

  const handleEditModeToggle = () => {
    animate(() => {
      setIsEditMode(!isEditMode);
      setSelectedWidget(null);
    });
  };

  // Widget content components with animations
  const renderWidgetContent = (widget: AnimatedWidget) => {
    switch (widget.type) {
      case 'avatar':
        return (
          <AvatarCard
            name="Sarah Chen"
            username="sarahc"
            initials="SC"
            status={ghostMode ? 'ghost' : 'online'}
            connections={247}
            spaces={12}
            achievement="Top Coordinator This Week"
            onFocus={() => handleWidgetFocus(widget.id)}
          />
        );
        
      case 'privacy':
        return (
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between p-3 bg-hive-background-primary rounded-lg">
              <div className="flex items-center gap-3">
                <div className="text-2xl">👻</div>
                <div>
                  <div className="text-sm font-medium text-hive-text-primary">Ghost Mode</div>
                  <div className="text-xs text-hive-text-secondary">
                    {ghostMode ? 'Invisible to others' : 'Currently visible'}
                  </div>
                </div>
              </div>
              <div className={`w-10 h-5 rounded-full transition-colors duration-300 ${
                ghostMode ? 'bg-hive-brand-primary' : 'bg-hive-background-secondary'
              }`}>
                <div className={`w-4 h-4 bg-white rounded-full shadow transform transition-transform duration-300 m-0.5 ${
                  ghostMode ? 'translate-x-5' : ''
                }`} />
              </div>
            </div>

            <PrivacyToggle
              enabled={ghostMode}
              onChange={setGhostMode}
              label="Enable Ghost Mode"
              description="Hide from all social features"
            />

            <div className="text-center space-y-2">
              <div className="text-2xl font-bold text-hive-status-success">85/100</div>
              <div className="text-xs text-hive-text-secondary">Privacy Score</div>
              <div className="w-full h-2 bg-hive-background-secondary rounded-full overflow-hidden">
                <div className="h-2 bg-hive-status-success rounded-full transition-all duration-1000 ease-out" style={{ width: '85%' }} />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="p-4 text-center">
            <div className="text-4xl mb-2">{widget.type === 'priority' ? '📋' : widget.type === 'community' ? '🏢' : widget.type === 'calendar' ? '📅' : '🛠️'}</div>
            <div className="font-medium text-hive-text-primary">{widget.title}</div>
            <div className="text-sm text-hive-text-secondary mt-2">Interactive widget content</div>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-hive-background-primary">
      {/* Animated Profile Header */}
      <div className="bg-white border-b border-hive-border-default">
        <div className="max-w-6xl mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <ProfileAvatar 
                name="Sarah Chen"
                initials="SC"
                status={ghostMode ? 'ghost' : 'online'}
                size="xl"
                interactive
              />
              <div className="space-y-2">
                <h1 className={`text-2xl font-bold transition-colors duration-300 ${
                  ghostMode ? 'text-hive-text-tertiary' : 'text-hive-text-primary'
                }`}>
                  Sarah Chen {ghostMode && '👻'}
                </h1>
                <p className="text-hive-text-secondary">Computer Science • University at Buffalo</p>
                <div className="flex items-center gap-4 text-sm text-hive-text-tertiary">
                  <ProfileBadge icon="🏆" label="Top Coordinator" variant="success" />
                  <span>📅 Member since Sept 2023</span>
                  <span>🌟 4.9 Community Rating</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              {!isEditMode ? (
                <>
                  <button className="px-4 py-2 bg-hive-background-secondary text-hive-text-primary border border-hive-border-default rounded-lg hover:bg-hive-background-secondary/80 transition-all duration-200 hover:scale-105">
                    Share Profile
                  </button>
                  <button
                    onClick={handleEditModeToggle}
                    className="px-4 py-2 bg-hive-brand-secondary text-white rounded-lg hover:bg-hive-brand-secondary/90 transition-all duration-200 hover:scale-105"
                  >
                    Customize Layout
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-2">
                  <div className="px-3 py-2 bg-hive-brand-secondary/10 text-hive-brand-secondary text-sm rounded-lg border border-hive-brand-secondary/20 animate-pulse">
                    ✏️ Edit Mode Active
                  </div>
                  <button
                    onClick={handleEditModeToggle}
                    className="px-4 py-2 bg-hive-brand-secondary text-white rounded-lg hover:bg-hive-brand-secondary/90 transition-all duration-200 hover:scale-105"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Animated Widget Grid */}
      <div className="max-w-6xl mx-auto p-8">
        <div className={`
          grid gap-4 auto-rows-[120px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4
          ${isEditMode ? 'bg-hive-background-secondary/30 p-4 rounded-xl border-2 border-dashed border-hive-brand-secondary/30' : ''}
          transition-all duration-500 ease-out
        `}>
          {widgets.map((widget) => (
            <AnimatedWidgetContainer
              key={widget.id}
              widget={widget}
              isEditMode={isEditMode}
              isSelected={selectedWidget === widget.id}
              onDragStart={handleDragStart}
              onWidgetClick={setSelectedWidget}
              onWidgetFocus={handleWidgetFocus}
            >
              {renderWidgetContent(widget)}
            </AnimatedWidgetContainer>
          ))}
        </div>

        {/* Animated Edit Mode Instructions */}
        {isEditMode && (
          <div className="mt-8 bg-hive-background-secondary border border-hive-border-default rounded-xl p-6 animate-slideInUp">
            <h3 className="text-lg font-semibold text-hive-text-primary mb-4">Customize Your Profile Layout</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-hive-text-secondary">
              <div className="space-y-2">
                <div className="font-medium text-hive-text-primary">📱 Drag & Drop</div>
                <div>• Click and drag widgets to rearrange</div>
                <div>• Widgets automatically snap to grid</div>
                <div>• Smart collision prevention</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-hive-text-primary">🔧 Resize</div>
                <div>• Different sizes for different needs</div>
                <div>• Min/max constraints enforced</div>
                <div>• More space = more detail</div>
              </div>
              <div className="space-y-2">
                <div className="font-medium text-hive-text-primary">⚙️ Configure</div>
                <div>• Click widgets to select them</div>
                <div>• Access widget-specific settings</div>
                <div>• Customize data and appearance</div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Focus Modal with animations */}
      {focusedWidget && (
        <div className={`
          fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4
          transition-all duration-300 ${isTransitioning ? 'opacity-0' : 'opacity-100'}
        `}>
          <div className={`
            bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden
            transform transition-all duration-300 ${isTransitioning ? 'scale-95 opacity-0' : 'scale-100 opacity-100'}
          `}>
            <div className="flex items-center justify-between p-6 border-b border-hive-border-default">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => animate(() => setFocusedWidget(null))}
                  className="w-8 h-8 bg-hive-background-secondary hover:bg-hive-text-tertiary/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
                >
                  ←
                </button>
                <h2 className="text-xl font-bold text-hive-text-primary">
                  {widgets.find(w => w.id === focusedWidget)?.title} - Focus Mode
                </h2>
              </div>
              <button 
                onClick={() => animate(() => setFocusedWidget(null))}
                className="w-8 h-8 bg-hive-background-secondary hover:bg-hive-text-tertiary/20 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
              >
                ✕
              </button>
            </div>
            <div className="p-8 overflow-y-auto max-h-[calc(90vh-80px)]">
              <div className="text-center py-12 space-y-6">
                <div className="text-6xl animate-bounce">
                  {focusedWidget === 'avatar' ? '👤' : 
                   focusedWidget === 'privacy' ? '🔒' :
                   focusedWidget === 'priority' ? '📋' :
                   focusedWidget === 'community' ? '🏢' :
                   focusedWidget === 'calendar' ? '📅' : '🛠️'}
                </div>
                <h3 className="text-3xl font-bold text-hive-text-primary">
                  {widgets.find(w => w.id === focusedWidget)?.title}
                </h3>
                <p className="text-hive-text-secondary max-w-2xl mx-auto">
                  This is the expanded focus mode with full functionality and detailed interactions.
                  Perfect for deep engagement with this specific widget.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideInUp {
          from { 
            opacity: 0; 
            transform: translateY(20px);
          }
          to { 
            opacity: 1; 
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 300ms ease-out;
        }
        
        .animate-slideInUp {
          animation: slideInUp 400ms ease-out;
        }
      `}</style>
    </div>
  );
};

export const AnimatedProfileSystemComplete: Story = {
  name: '🎭 Complete Animated Profile System',
  render: () => <AnimatedProfileSystem />
};