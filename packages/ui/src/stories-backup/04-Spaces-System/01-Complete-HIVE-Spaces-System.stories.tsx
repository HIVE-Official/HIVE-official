import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { 
  Users, Search, Plus, Settings, Bell, BookOpen, 
  Calendar, MapPin, Star, Heart, MessageCircle, Share, 
  ChevronRight, Target, Grid, List, X, ArrowLeft,
  User, Clock, Activity, Eye, Lock, Globe, GraduationCap,
  Home, Building, Sparkles, UserPlus, UserMinus, MoreHorizontal,
  Edit, Trash2, AlertCircle, CheckCircle, TrendingUp, 
  Shield, Crown, Filter, SortDesc, LayoutGrid, Loader2,
  WifiOff, AlertTriangle, Coffee, Gamepad2, Music, Camera
} from 'lucide-react';

// HIVE Spaces System Props Interface
interface SpacesSystemProps {
  viewMode?: 'explore' | 'category' | 'space-preview' | 'space-board' | 'member-directory';
  userRole?: 'student' | 'leader' | 'admin';
  showDebugLabels?: boolean;
  categoryType?: 'university' | 'residential' | 'greek' | 'student';
}

// HIVE Design System - Exact Brand Tokens (matching Profile system)
const HIVE_COLORS = {
  background: {
    primary: 'bg-hive-background-primary',
    secondary: 'bg-hive-background-secondary', 
    tertiary: 'bg-hive-background-tertiary',
    elevated: 'bg-hive-background-elevated',
    interactive: 'bg-hive-background-interactive',
  },
  text: {
    primary: 'text-hive-text-primary',
    secondary: 'text-hive-text-secondary',
    tertiary: 'text-hive-text-tertiary',
    muted: 'text-hive-text-muted',
  },
  border: {
    default: 'border-hive-border-default',
    primary: 'border-hive-border-primary',
    hover: 'border-[#FFD700]/40',
    active: 'border-[#FFD700]/60',
    subtle: 'border-hive-border-subtle',
  },
  brand: {
    primary: 'text-[#FFD700]',
    secondary: 'text-hive-brand-secondary',
    primaryBg: 'bg-[#FFD700]',
    secondaryBg: 'bg-hive-brand-secondary',
    primaryOverlay: 'bg-[#FFD700]/20',
  }
};

// HIVE Space Categories with Proper Icons
const SPACE_CATEGORIES = {
  university: {
    title: 'University Spaces',
    description: 'Academic departments, courses, and official university communities',
    icon: GraduationCap,
    color: 'bg-blue-500/10 border-blue-500/20',
    examples: ['CS Department', 'Engineering Students', 'Pre-Med Society'],
  },
  residential: {
    title: 'Residential Spaces', 
    description: 'Dorm floors, buildings, and housing communities',
    icon: Home,
    color: 'bg-green-500/10 border-green-500/20',
    examples: ['Ellicott 3rd Floor', 'Governors Hall', 'Off-Campus Commons'],
  },
  greek: {
    title: 'Greek Organizations',
    description: 'Fraternities, sororities, and Greek life communities', 
    icon: Building,
    color: 'bg-purple-500/10 border-purple-500/20',
    examples: ['Alpha Beta Gamma', 'Delta Phi Epsilon', 'Theta Chi'],
  },
  student: {
    title: 'Student Organizations',
    description: 'Clubs, societies, and interest-based communities',
    icon: Sparkles,
    color: 'bg-orange-500/10 border-orange-500/20',
    examples: ['Photography Club', 'Debate Society', 'Gaming Community'],
  }
};

// Sample Data
const SAMPLE_SPACES = [
  {
    id: 'cs-dept',
    name: 'CS Department',
    description: 'Official Computer Science Department space',
    category: 'university',
    members: 156,
    posts: 24,
    isActive: true,
    isPrivate: false,
    userIsMember: false,
    lastActivity: '2 hours ago',
    tools: ['Study Sessions', 'Office Hours', 'Resource Library']
  },
  {
    id: 'ellicott-3',
    name: 'Ellicott 3rd Floor',
    description: 'Third floor community space',
    category: 'residential', 
    members: 18,
    posts: 12,
    isActive: true,
    isPrivate: false,
    userIsMember: true,
    lastActivity: '30 minutes ago',
    tools: ['Floor Events', 'Laundry Tracker', 'Study Rooms']
  },
  {
    id: 'photo-club',
    name: 'Photography Club',
    description: 'Campus photography enthusiasts',
    category: 'student',
    members: 45,
    posts: 18,
    isActive: true,
    isPrivate: false,
    userIsMember: false,
    lastActivity: '1 hour ago',
    tools: ['Photo Walks', 'Equipment Share', 'Portfolio Review']
  }
];

// Complete HIVE Spaces System Component
const CompleteHIVESpacesSystem = ({ 
  viewMode = 'explore',
  userRole = 'student',
  showDebugLabels = false,
  categoryType = 'university'
}: SpacesSystemProps = {}) => {
  
  // Core State Management
  const [currentView, setCurrentView] = React.useState(viewMode);
  const [currentCategory, setCurrentCategory] = React.useState(categoryType);
  const [navigationHistory, setNavigationHistory] = React.useState<string[]>([]);
  const [selectedSpace, setSelectedSpace] = React.useState(SAMPLE_SPACES[0]);
  
  // Modal States
  const [showJoinModal, setShowJoinModal] = React.useState(false);
  const [showCreateModal, setShowCreateModal] = React.useState(false);
  const [showSettingsModal, setShowSettingsModal] = React.useState(false);
  const [showLeadershipPanel, setShowLeadershipPanel] = React.useState(false);
  const [showToolLibrary, setShowToolLibrary] = React.useState(false);
  const [showMemberDirectory, setShowMemberDirectory] = React.useState(false);
  
  // UI State
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [viewLayout, setViewLayout] = React.useState<'grid' | 'list'>('grid');
  const [sortBy, setSortBy] = React.useState('trending');

  // Navigation Functions
  const navigateTo = (view: string, data?: any) => {
    setNavigationHistory(prev => [...prev, currentView]);
    setCurrentView(view);
    if (data) {
      if (view === 'space-preview') setSelectedSpace(data);
      if (view === 'category') setCurrentCategory(data);
    }
  };

  const goBack = () => {
    if (navigationHistory.length > 0) {
      const previousView = navigationHistory[navigationHistory.length - 1];
      setNavigationHistory(prev => prev.slice(0, -1));
      setCurrentView(previousView);
    }
  };

  // HIVE Button Component (Exact Profile System Patterns)
  const HIVEButton = ({ 
    variant = 'primary', 
    size = 'md', 
    children, 
    onClick, 
    disabled = false,
    loading = false,
    className = '',
    ...props 
  }: any) => {
    const baseClasses = 'inline-flex items-center justify-center gap-2 rounded-2xl font-medium transition-all duration-300 ease-out transform hover:scale-[1.02] active:scale-[0.98] disabled:cursor-not-allowed disabled:transform-none focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FFD700] focus-visible:ring-offset-1';
    
    const variants = {
      primary: `${HIVE_COLORS.brand.primaryBg} text-hive-text-inverse hover:bg-hive-brand-secondary shadow-lg hover:shadow-xl hover:shadow-hive-brand-primary/20 border border-hive-brand-primary/20 hover:border-hive-brand-primary/40`,
      secondary: `${HIVE_COLORS.background.secondary} ${HIVE_COLORS.text.primary} border ${HIVE_COLORS.border.primary} hover:${HIVE_COLORS.border.hover} hover:${HIVE_COLORS.background.tertiary} hover:shadow-lg hover:shadow-hive-brand-primary/10`,
      ghost: `${HIVE_COLORS.text.secondary} hover:${HIVE_COLORS.text.primary} hover:${HIVE_COLORS.background.interactive}`,
      danger: 'bg-hive-status-error text-hive-text-primary hover:bg-red-600'
    };
    
    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4 text-sm', 
      lg: 'h-12 px-6 text-base'
    };

    return (
      <button
        className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${disabled ? 'opacity-50' : ''} ${className}`}
        onClick={onClick}
        disabled={disabled || loading}
        {...props}
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {children}
      </button>
    );
  };

  // HIVE Card Component (Exact Profile System Patterns)
  const HIVECard = ({ children, className = '', variant = 'default', onClick, ...props }: any) => {
    const baseClasses = 'rounded-2xl overflow-hidden backdrop-blur-md';
    
    const variants = {
      default: `bg-hive-background-tertiary border border-[#FFD700]/20`,
      elevated: `bg-hive-background-tertiary border border-[#FFD700]/20 shadow-lg shadow-[#FFD700]/10`,
      interactive: `bg-hive-background-tertiary border border-[#FFD700]/20 hover:border-[#FFD700]/40 hover:shadow-lg hover:shadow-[#FFD700]/10 transition-all duration-300 ease-out cursor-pointer transform hover:scale-[1.02] hive-interactive`
    };
    
    return (
      <div 
        className={`${baseClasses} ${variants[variant]} ${className}`} 
        onClick={onClick}
        {...props}
      >
        {children}
      </div>
    );
  };

  // HIVE Space Category Icon
  const SpaceCategoryIcon = ({ category, size = 'md' }: { category: string, size?: 'sm' | 'md' | 'lg' }) => {
    const IconComponent = SPACE_CATEGORIES[category]?.icon || Users;
    const sizes = { sm: 'w-4 h-4', md: 'w-5 h-5', lg: 'w-6 h-6' };
    return <IconComponent className={`${sizes[size]} ${HIVE_COLORS.text.secondary}`} />;
  };

  // Loading State Component
  const LoadingState = ({ message = 'Loading...' }: { message?: string }) => (
    <div className="flex flex-col items-center justify-center py-16">
      <Loader2 className="w-8 h-8 animate-spin text-hive-brand-secondary mb-4" />
      <div className={HIVE_COLORS.text.secondary}>{message}</div>
    </div>
  );

  // Empty State Component
  const EmptyState = ({ 
    icon: Icon = Search,
    title, 
    description, 
    actionLabel,
    onAction
  }: any) => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className={`p-4 rounded-full ${HIVE_COLORS.background.tertiary} mb-4`}>
        <Icon className="w-8 h-8 text-white/50" />
      </div>
      <h3 className={`text-xl font-bold ${HIVE_COLORS.text.primary} mb-2`}>{title}</h3>
      <p className={`${HIVE_COLORS.text.secondary} mb-6 max-w-md`}>{description}</p>
      {actionLabel && (
        <HIVEButton onClick={onAction}>
          <Plus className="w-4 h-4" />
          {actionLabel}
        </HIVEButton>
      )}
    </div>
  );

  // Error State Component
  const ErrorState = ({ error, onRetry }: { error: string, onRetry?: () => void }) => (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <div className={`p-4 rounded-full bg-red-500/10 mb-4`}>
        <AlertTriangle className="w-8 h-8 text-red-400" />
      </div>
      <h3 className={`text-xl font-bold ${HIVE_COLORS.text.primary} mb-2`}>Something went wrong</h3>
      <p className={`${HIVE_COLORS.text.secondary} mb-6 max-w-md`}>{error}</p>
      {onRetry && (
        <HIVEButton variant="secondary" onClick={onRetry}>
          Try Again
        </HIVEButton>
      )}
    </div>
  );

  // Join Space Modal
  const JoinSpaceModal = () => {
    const [isJoining, setIsJoining] = React.useState(false);
    const [joinStep, setJoinStep] = React.useState<'confirm' | 'success' | 'error'>('confirm');

    const handleJoin = async () => {
      setIsJoining(true);
      // Simulate API call
      setTimeout(() => {
        setIsJoining(false);
        setJoinStep('success');
      }, 2000);
    };

    if (!showJoinModal) return null;

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <HIVECard className="max-w-md w-full p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${HIVE_COLORS.text.primary}`}>
              {joinStep === 'confirm' && 'Join Space'}
              {joinStep === 'success' && 'Welcome!'}
              {joinStep === 'error' && 'Join Failed'}
            </h2>
            <button 
              onClick={() => setShowJoinModal(false)}
              className={`p-2 hover:${HIVE_COLORS.background.tertiary} rounded-lg transition-all duration-200`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {joinStep === 'confirm' && (
            <>
              <div className="text-center mb-6">
                <div className={`w-16 h-16 rounded-full ${SPACE_CATEGORIES[selectedSpace.category]?.color} flex items-center justify-center mx-auto mb-4`}>
                  <SpaceCategoryIcon category={selectedSpace.category} size="lg" />
                </div>
                <h3 className={`font-bold ${HIVE_COLORS.text.primary} mb-2`}>{selectedSpace.name}</h3>
                <p className={HIVE_COLORS.text.secondary}>Join this space to participate in discussions and access community tools.</p>
              </div>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm">
                  <Users className="w-4 h-4 text-green-400" />
                  <span className={HIVE_COLORS.text.secondary}>Access to {selectedSpace.members} members</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <MessageCircle className="w-4 h-4 text-blue-400" />
                  <span className={HIVE_COLORS.text.secondary}>Participate in discussions</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Star className="w-4 h-4 text-yellow-400" />
                  <span className={HIVE_COLORS.text.secondary}>Access community tools</span>
                </div>
              </div>

              <div className="flex gap-3">
                <HIVEButton variant="secondary" onClick={() => setShowJoinModal(false)} className="flex-1">
                  Cancel
                </HIVEButton>
                <HIVEButton onClick={handleJoin} loading={isJoining} className="flex-1">
                  Join Space
                </HIVEButton>
              </div>
            </>
          )}

          {joinStep === 'success' && (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <p className={HIVE_COLORS.text.secondary}>You've successfully joined {selectedSpace.name}!</p>
              </div>
              
              <HIVEButton 
                onClick={() => {
                  setShowJoinModal(false);
                  navigateTo('space-board', selectedSpace);
                }} 
                className="w-full"
              >
                Enter Space
              </HIVEButton>
            </>
          )}
        </HIVECard>
      </div>
    );
  };

  // Create Space Modal
  const CreateSpaceModal = () => {
    const [createStep, setCreateStep] = React.useState<'type' | 'details' | 'settings' | 'success'>('type');
    const [spaceType, setSpaceType] = React.useState('');
    const [spaceName, setSpaceName] = React.useState('');
    const [spaceDescription, setSpaceDescription] = React.useState('');
    const [isPrivate, setIsPrivate] = React.useState(false);

    if (!showCreateModal) return null;

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <HIVECard className="max-w-2xl w-full p-6 max-h-[80vh] overflow-auto">
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-xl font-bold ${HIVE_COLORS.text.primary}`}>Create New Space</h2>
            <button 
              onClick={() => setShowCreateModal(false)}
              className={`p-2 hover:${HIVE_COLORS.background.tertiary} rounded-lg transition-all duration-200`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Step Indicator */}
          <div className="flex items-center gap-2 mb-8">
            {['type', 'details', 'settings', 'success'].map((step, index) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  createStep === step ? 'bg-hive-brand-secondary text-black' :
                  ['type', 'details', 'settings', 'success'].indexOf(createStep) > index ? 'bg-green-500 text-white' :
                  'bg-white/10 text-white/50'
                }`}>
                  {index + 1}
                </div>
                {index < 3 && <div className={`h-0.5 w-8 ${
                  ['type', 'details', 'settings', 'success'].indexOf(createStep) > index ? 'bg-green-500' : 'bg-white/10'
                }`} />}
              </div>
            ))}
          </div>

          {createStep === 'type' && (
            <>
              <h3 className={`text-lg font-bold ${HIVE_COLORS.text.primary} mb-4`}>Choose Space Type</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                {Object.entries(SPACE_CATEGORIES).map(([key, category]) => (
                  <HIVECard 
                    key={key}
                    variant="interactive"
                    className={`p-4 ${spaceType === key ? 'border-hive-brand-secondary bg-hive-brand-secondary/5' : ''}`}
                    onClick={() => setSpaceType(key)}
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <category.icon className="w-6 h-6 text-hive-brand-secondary" />
                      <h4 className={`font-bold ${HIVE_COLORS.text.primary}`}>{category.title}</h4>
                    </div>
                    <p className={`text-sm ${HIVE_COLORS.text.secondary}`}>{category.description}</p>
                  </HIVECard>
                ))}
              </div>
              <div className="flex justify-end">
                <HIVEButton 
                  onClick={() => setCreateStep('details')} 
                  disabled={!spaceType}
                >
                  Continue
                </HIVEButton>
              </div>
            </>
          )}

          {createStep === 'details' && (
            <>
              <h3 className={`text-lg font-bold ${HIVE_COLORS.text.primary} mb-4`}>Space Details</h3>
              <div className="space-y-4 mb-6">
                <div>
                  <label className={`block text-sm font-medium ${HIVE_COLORS.text.primary} mb-2`}>
                    Space Name
                  </label>
                  <input
                    type="text"
                    value={spaceName}
                    onChange={(e) => setSpaceName(e.target.value)}
                    className={`w-full px-4 py-3 ${HIVE_COLORS.background.tertiary} border ${HIVE_COLORS.border.primary} rounded-2xl ${HIVE_COLORS.text.primary} placeholder-hive-text-placeholder focus:border-[#FFD700] focus:outline-none transition-all duration-300`}
                    placeholder="Enter space name..."
                  />
                </div>
                <div>
                  <label className={`block text-sm font-medium ${HIVE_COLORS.text.primary} mb-2`}>
                    Description
                  </label>
                  <textarea
                    value={spaceDescription}
                    onChange={(e) => setSpaceDescription(e.target.value)}
                    rows={3}
                    className={`w-full px-4 py-3 ${HIVE_COLORS.background.tertiary} border ${HIVE_COLORS.border.primary} rounded-2xl ${HIVE_COLORS.text.primary} placeholder-hive-text-placeholder focus:border-[#FFD700] focus:outline-none resize-none transition-all duration-300`}
                    placeholder="Describe your space..."
                  />
                </div>
              </div>
              <div className="flex gap-3">
                <HIVEButton variant="secondary" onClick={() => setCreateStep('type')}>
                  Back
                </HIVEButton>
                <HIVEButton 
                  onClick={() => setCreateStep('settings')} 
                  disabled={!spaceName || !spaceDescription}
                >
                  Continue
                </HIVEButton>
              </div>
            </>
          )}

          {createStep === 'settings' && (
            <>
              <h3 className={`text-lg font-bold ${HIVE_COLORS.text.primary} mb-4`}>Space Settings</h3>
              <div className="space-y-4 mb-6">
                <HIVECard className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className={`font-medium ${HIVE_COLORS.text.primary} mb-1`}>Privacy</h4>
                      <p className={`text-sm ${HIVE_COLORS.text.secondary}`}>
                        {isPrivate ? 'Only invited members can join' : 'Anyone can discover and join'}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${isPrivate ? HIVE_COLORS.text.secondary : HIVE_COLORS.text.primary}`}>
                        Public
                      </span>
                      <button
                        onClick={() => setIsPrivate(!isPrivate)}
                        className={`relative w-12 h-6 rounded-full transition-all duration-200 ${
                          isPrivate ? 'bg-hive-brand-secondary' : 'bg-white/20'
                        }`}
                      >
                        <div className={`absolute w-5 h-5 bg-white rounded-full top-0.5 transition-all duration-200 ${
                          isPrivate ? 'left-6' : 'left-0.5'
                        }`} />
                      </button>
                      <span className={`text-sm ${isPrivate ? HIVE_COLORS.text.primary : HIVE_COLORS.text.secondary}`}>
                        Private
                      </span>
                    </div>
                  </div>
                </HIVECard>
              </div>
              <div className="flex gap-3">
                <HIVEButton variant="secondary" onClick={() => setCreateStep('details')}>
                  Back
                </HIVEButton>
                <HIVEButton onClick={() => setCreateStep('success')}>
                  Create Space
                </HIVEButton>
              </div>
            </>
          )}

          {createStep === 'success' && (
            <>
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                </div>
                <h3 className={`text-lg font-bold ${HIVE_COLORS.text.primary} mb-2`}>Space Created!</h3>
                <p className={HIVE_COLORS.text.secondary}>
                  {spaceName} has been created successfully. You can now start inviting members and setting up your community.
                </p>
              </div>
              <HIVEButton 
                onClick={() => {
                  setShowCreateModal(false);
                  // Reset form
                  setCreateStep('type');
                  setSpaceType('');
                  setSpaceName('');
                  setSpaceDescription('');
                  setIsPrivate(false);
                }} 
                className="w-full"
              >
                Get Started
              </HIVEButton>
            </>
          )}
        </HIVECard>
      </div>
    );
  };

  // Leadership Panel Modal
  const LeadershipPanelModal = () => {
    const [activeTab, setActiveTab] = React.useState<'members' | 'settings' | 'analytics' | 'tools'>('members');
    
    if (!showLeadershipPanel) return null;

    const tabs = [
      { id: 'members', label: 'Members', icon: Users },
      { id: 'settings', label: 'Settings', icon: Settings },
      { id: 'analytics', label: 'Analytics', icon: TrendingUp },
      { id: 'tools', label: 'Tools', icon: Star }
    ];

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <HIVECard className="max-w-4xl w-full h-[80vh] flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div>
              <h2 className={`text-xl font-bold ${HIVE_COLORS.text.primary}`}>Space Leadership</h2>
              <p className={HIVE_COLORS.text.secondary}>{selectedSpace.name}</p>
            </div>
            <button 
              onClick={() => setShowLeadershipPanel(false)}
              className={`p-2 hover:${HIVE_COLORS.background.tertiary} rounded-lg transition-all duration-200`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-white/10">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 px-6 py-4 font-medium transition-all duration-200 ${
                  activeTab === tab.id 
                    ? `${HIVE_COLORS.text.primary} border-b-2 border-hive-brand-secondary` 
                    : `${HIVE_COLORS.text.secondary} hover:${HIVE_COLORS.text.primary}`
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-6 overflow-auto">
            {activeTab === 'members' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-lg font-bold ${HIVE_COLORS.text.primary}`}>
                    Manage Members ({selectedSpace.members})
                  </h3>
                  <HIVEButton size="sm">
                    <UserPlus className="w-4 h-4" />
                    Invite Members
                  </HIVEButton>
                </div>
                
                {/* Member List */}
                <div className="space-y-3">
                  {[
                    { name: 'Sarah Chen', role: 'Leader', joinedDate: '6 months ago', isOnline: true },
                    { name: 'Mike Rodriguez', role: 'Member', joinedDate: '3 months ago', isOnline: false },
                    { name: 'Prof. Johnson', role: 'Admin', joinedDate: '1 year ago', isOnline: true },
                  ].map((member) => (
                    <HIVECard key={member.name} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                              <User className="w-5 h-5" />
                            </div>
                            {member.isOnline && (
                              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-black rounded-full" />
                            )}
                          </div>
                          <div>
                            <div className={`font-medium ${HIVE_COLORS.text.primary}`}>{member.name}</div>
                            <div className={`text-sm ${HIVE_COLORS.text.secondary}`}>
                              {member.role} • Joined {member.joinedDate}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {member.role === 'Leader' && (
                            <Crown className="w-4 h-4 text-yellow-400" />
                          )}
                          <button className={`p-2 hover:${HIVE_COLORS.background.tertiary} rounded-lg`}>
                            <MoreHorizontal className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </HIVECard>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="space-y-6">
                <h3 className={`text-lg font-bold ${HIVE_COLORS.text.primary} mb-6`}>Space Analytics</h3>
                
                {/* Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  {[
                    { label: 'Total Members', value: '156', change: '+12 this week', color: 'text-green-400' },
                    { label: 'Active Today', value: '23', change: '+5 from yesterday', color: 'text-blue-400' },
                    { label: 'Posts This Week', value: '47', change: '+18 from last week', color: 'text-yellow-400' }
                  ].map((metric) => (
                    <HIVECard key={metric.label} className="p-4">
                      <div className={`text-2xl font-bold ${HIVE_COLORS.text.primary} mb-1`}>{metric.value}</div>
                      <div className={`text-sm ${HIVE_COLORS.text.secondary} mb-2`}>{metric.label}</div>
                      <div className={`text-xs ${metric.color}`}>{metric.change}</div>
                    </HIVECard>
                  ))}
                </div>

                {/* Activity Chart Placeholder */}
                <HIVECard className="p-6">
                  <h4 className={`font-bold ${HIVE_COLORS.text.primary} mb-4`}>Activity Over Time</h4>
                  <div className="h-32 bg-white/5 rounded-lg flex items-center justify-center">
                    <div className={HIVE_COLORS.text.secondary}>Chart visualization would go here</div>
                  </div>
                </HIVECard>
              </div>
            )}

            {activeTab === 'tools' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`text-lg font-bold ${HIVE_COLORS.text.primary}`}>Space Tools</h3>
                  <HIVEButton size="sm" onClick={() => setShowToolLibrary(true)}>
                    <Plus className="w-4 h-4" />
                    Add Tool
                  </HIVEButton>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedSpace.tools.map((tool) => (
                    <HIVECard key={tool} variant="interactive" className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-hive-brand-secondary/20 rounded-lg">
                            <Star className="w-5 h-5 text-hive-brand-secondary" />
                          </div>
                          <div>
                            <div className={`font-medium ${HIVE_COLORS.text.primary}`}>{tool}</div>
                            <div className={`text-sm ${HIVE_COLORS.text.secondary}`}>Active</div>
                          </div>
                        </div>
                        <button className={`p-2 hover:${HIVE_COLORS.background.tertiary} rounded-lg`}>
                          <Settings className="w-4 h-4" />
                        </button>
                      </div>
                    </HIVECard>
                  ))}
                </div>
              </div>
            )}
          </div>
        </HIVECard>
      </div>
    );
  };

  // Tool Library Modal (App Store for Space Tools)
  const ToolLibraryModal = () => {
    if (!showToolLibrary) return null;

    const toolCategories = [
      {
        name: 'Communication',
        tools: [
          { name: 'Discussion Forum', description: 'Threaded discussions and Q&A', icon: MessageCircle },
          { name: 'Announcements', description: 'Important updates and news', icon: Bell },
          { name: 'Live Chat', description: 'Real-time messaging', icon: MessageCircle }
        ]
      },
      {
        name: 'Organization',
        tools: [
          { name: 'Event Calendar', description: 'Schedule and manage events', icon: Calendar },
          { name: 'Task Board', description: 'Collaborative task management', icon: CheckCircle },
          { name: 'Resource Library', description: 'Shared files and documents', icon: BookOpen }
        ]
      },
      {
        name: 'Social',
        tools: [
          { name: 'Member Directory', description: 'Browse and connect with members', icon: Users },
          { name: 'Photo Gallery', description: 'Share community photos', icon: Camera },
          { name: 'Polls & Surveys', description: 'Gather community feedback', icon: TrendingUp }
        ]
      }
    ];

    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <HIVECard className="max-w-4xl w-full h-[80vh] flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-white/10">
            <div>
              <h2 className={`text-xl font-bold ${HIVE_COLORS.text.primary}`}>Tool Library</h2>
              <p className={HIVE_COLORS.text.secondary}>Add tools to enhance your space</p>
            </div>
            <button 
              onClick={() => setShowToolLibrary(false)}
              className={`p-2 hover:${HIVE_COLORS.background.tertiary} rounded-lg transition-all duration-200`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 p-6 overflow-auto">
            <div className="space-y-8">
              {toolCategories.map((category) => (
                <div key={category.name}>
                  <h3 className={`text-lg font-bold ${HIVE_COLORS.text.primary} mb-4`}>{category.name}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {category.tools.map((tool) => (
                      <HIVECard key={tool.name} variant="interactive" className="p-4">
                        <div className="flex items-start gap-3 mb-4">
                          <div className="p-2 bg-hive-brand-secondary/20 rounded-lg">
                            <tool.icon className="w-5 h-5 text-hive-brand-secondary" />
                          </div>
                          <div className="flex-1">
                            <h4 className={`font-medium ${HIVE_COLORS.text.primary} mb-1`}>{tool.name}</h4>
                            <p className={`text-sm ${HIVE_COLORS.text.secondary}`}>{tool.description}</p>
                          </div>
                        </div>
                        <HIVEButton size="sm" className="w-full">
                          Add Tool
                        </HIVEButton>
                      </HIVECard>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </HIVECard>
      </div>
    );
  };

  // Member Directory Page
  const MemberDirectoryPage = () => (
    <div className={`min-h-screen ${HIVE_COLORS.background.primary} ${HIVE_COLORS.text.primary}`}>
      {/* Header */}
      <div className={`border-b ${HIVE_COLORS.border.default} bg-black/90 backdrop-blur-sm sticky top-0 z-40`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={goBack}
                className={`p-2 hover:${HIVE_COLORS.background.tertiary} rounded-lg transition-all duration-200`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className={`text-xl font-bold ${HIVE_COLORS.text.primary}`}>Members</h1>
                <p className={`text-sm ${HIVE_COLORS.text.secondary}`}>{selectedSpace.name} • {selectedSpace.members} members</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${HIVE_COLORS.text.secondary}`} />
                <input
                  type="text"
                  placeholder="Search members..."
                  className={`pl-10 pr-4 py-2 ${HIVE_COLORS.background.tertiary} border ${HIVE_COLORS.border.primary} rounded-2xl ${HIVE_COLORS.text.primary} placeholder-hive-text-placeholder focus:border-[#FFD700] focus:outline-none transition-all duration-300`}
                />
              </div>
              {userRole === 'leader' && (
                <HIVEButton size="sm">
                  <UserPlus className="w-4 h-4" />
                  Invite
                </HIVEButton>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Member Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 12 }, (_, i) => ({
            name: ['Sarah Chen', 'Mike Rodriguez', 'Prof. Johnson', 'Emily Davis', 'James Wilson', 'Lisa Zhang'][i % 6],
            role: ['Member', 'Leader', 'Admin'][i % 3],
            joinedDate: ['6 months ago', '3 months ago', '1 year ago'][i % 3],
            isOnline: i % 3 === 0,
            posts: Math.floor(Math.random() * 50) + 1
          })).map((member, index) => (
            <HIVECard key={index} variant="interactive" className="p-4">
              <div className="text-center">
                <div className="relative mx-auto mb-3">
                  <div className="w-16 h-16 bg-gray-600 rounded-full flex items-center justify-center mx-auto">
                    <User className="w-8 h-8" />
                  </div>
                  {member.isOnline && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 border-2 border-black rounded-full" />
                  )}
                  {member.role === 'Leader' && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                      <Crown className="w-3 h-3 text-black" />
                    </div>
                  )}
                </div>
                <h3 className={`font-medium ${HIVE_COLORS.text.primary} mb-1`}>{member.name}</h3>
                <p className={`text-sm ${HIVE_COLORS.text.secondary} mb-2`}>{member.role}</p>
                <div className={`text-xs ${HIVE_COLORS.text.secondary} space-y-1`}>
                  <div>{member.posts} posts</div>
                  <div>Joined {member.joinedDate}</div>
                </div>
              </div>
            </HIVECard>
          ))}
        </div>
      </div>
    </div>
  );

  // Main Explore Page
  const MainExplorePage = () => (
    <div className={`min-h-screen ${HIVE_COLORS.background.primary} ${HIVE_COLORS.text.primary}`}>
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-hive-brand-secondary/5 to-transparent" />
        <div className="relative max-w-6xl mx-auto px-6 py-16 text-center">
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            Discover Your <span className="text-hive-brand-secondary">Community</span>
          </h1>
          <p className={`text-xl ${HIVE_COLORS.text.secondary} max-w-3xl mx-auto mb-8`}>
            Find spaces where you belong and collaborate with peers who share your interests, goals, and campus experiences.
          </p>
          
          {/* Quick Actions */}
          <div className="flex items-center justify-center gap-4 mb-12">
            <HIVEButton onClick={() => setShowCreateModal(true)}>
              <Plus className="w-4 h-4" />
              Create Space
            </HIVEButton>
            <HIVEButton variant="secondary">
              <Search className="w-4 h-4" />
              Browse All
            </HIVEButton>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-16">
        {/* Four Core Categories */}
        <div className="mb-16">
          <h2 className={`text-2xl font-bold ${HIVE_COLORS.text.primary} mb-8 text-center`}>Explore by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(SPACE_CATEGORIES).map(([key, category]) => (
              <HIVECard 
                key={key}
                variant="interactive"
                className={`p-8 ${category.color} hover:scale-105 transition-transform duration-200`}
                onClick={() => navigateTo('category', key)}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-white/10 rounded-xl">
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${HIVE_COLORS.text.primary}`}>{category.title}</h3>
                    <p className={`${HIVE_COLORS.text.secondary}`}>{category.description}</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className={`text-sm ${HIVE_COLORS.text.secondary} mb-3`}>Popular spaces:</div>
                  <div className="space-y-2">
                    {category.examples.map((example) => (
                      <div key={example} className={`flex items-center gap-2 text-sm ${HIVE_COLORS.text.secondary}`}>
                        <div className="w-1.5 h-1.5 bg-hive-brand-secondary rounded-full" />
                        {example}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className={`text-sm ${HIVE_COLORS.text.secondary}`}>
                    12+ active spaces
                  </div>
                  <ChevronRight className={`w-5 h-5 ${HIVE_COLORS.text.secondary}`} />
                </div>
              </HIVECard>
            ))}
          </div>
        </div>

        {/* Recommended Spaces */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className={`text-2xl font-bold ${HIVE_COLORS.text.primary}`}>Recommended for You</h2>
            <button className={`text-sm ${HIVE_COLORS.text.secondary} hover:${HIVE_COLORS.text.primary} transition-colors duration-200`}>
              View All
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {SAMPLE_SPACES.map((space) => (
              <HIVECard 
                key={space.id} 
                variant="interactive"
                className="p-6"
                onClick={() => navigateTo('space-preview', space)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${SPACE_CATEGORIES[space.category]?.color}`}>
                      <SpaceCategoryIcon category={space.category} />
                    </div>
                    <div>
                      <h3 className={`font-bold ${HIVE_COLORS.text.primary}`}>{space.name}</h3>
                      <p className={`text-sm ${HIVE_COLORS.text.secondary}`}>{space.description}</p>
                    </div>
                  </div>
                  {space.userIsMember && (
                    <div className="w-2 h-2 bg-green-400 rounded-full" />
                  )}
                </div>
                
                <div className="flex items-center justify-between text-sm mb-4">
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center gap-1 ${HIVE_COLORS.text.secondary}`}>
                      <Users className="w-3 h-3" />
                      {space.members}
                    </div>
                    <div className={`flex items-center gap-1 ${HIVE_COLORS.text.secondary}`}>
                      <MessageCircle className="w-3 h-3" />
                      {space.posts}
                    </div>
                    <div className={`flex items-center gap-1 ${HIVE_COLORS.text.secondary}`}>
                      <Activity className="w-3 h-3" />
                      {space.lastActivity}
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${SPACE_CATEGORIES[space.category]?.color}`}>
                    {SPACE_CATEGORIES[space.category]?.title}
                  </span>
                  {!space.userIsMember && (
                    <HIVEButton 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSpace(space);
                        setShowJoinModal(true);
                      }}
                    >
                      Join
                    </HIVEButton>
                  )}
                </div>
              </HIVECard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Category Browse Page
  const CategoryBrowsePage = () => {
    const category = SPACE_CATEGORIES[currentCategory];
    const filteredSpaces = SAMPLE_SPACES.filter(space => space.category === currentCategory);

    return (
      <div className={`min-h-screen ${HIVE_COLORS.background.primary} ${HIVE_COLORS.text.primary}`}>
        {/* Header */}
        <div className={`border-b ${HIVE_COLORS.border.default} bg-black/90 backdrop-blur-sm sticky top-0 z-40`}>
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex items-center gap-4 mb-4">
              <button 
                onClick={goBack}
                className={`p-2 hover:${HIVE_COLORS.background.tertiary} rounded-lg transition-all duration-200`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${category?.color}`}>
                  {category?.icon && <category.icon className="w-6 h-6" />}
                </div>
                <div>
                  <h1 className={`text-2xl font-bold ${HIVE_COLORS.text.primary}`}>{category?.title}</h1>
                  <p className={HIVE_COLORS.text.secondary}>{category?.description}</p>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex items-center gap-4">
              <div className="relative flex-1 max-w-md">
                <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 ${HIVE_COLORS.text.secondary}`} />
                <input
                  type="text"
                  placeholder="Search spaces..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 ${HIVE_COLORS.background.tertiary} border ${HIVE_COLORS.border.primary} rounded-2xl ${HIVE_COLORS.text.primary} placeholder-hive-text-placeholder focus:border-[#FFD700] focus:outline-none transition-all duration-300`}
                />
              </div>
              
              <div className="flex items-center gap-2">
                <select 
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`px-3 py-3 ${HIVE_COLORS.background.tertiary} border ${HIVE_COLORS.border.primary} rounded-2xl ${HIVE_COLORS.text.primary} focus:border-[#FFD700] focus:outline-none transition-all duration-300`}
                >
                  <option value="trending">Trending</option>
                  <option value="members">Most Members</option>
                  <option value="activity">Most Active</option>
                  <option value="newest">Newest</option>
                </select>
                
                <div className={`flex items-center gap-1 ${HIVE_COLORS.background.tertiary} p-1 rounded-lg`}>
                  <button
                    onClick={() => setViewLayout('grid')}
                    className={`p-2 rounded transition-all duration-200 ${
                      viewLayout === 'grid' 
                        ? `${HIVE_COLORS.background.tertiary} ${HIVE_COLORS.text.primary}` 
                        : `${HIVE_COLORS.text.secondary} hover:${HIVE_COLORS.text.primary}`
                    }`}
                  >
                    <LayoutGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setViewLayout('list')}
                    className={`p-2 rounded transition-all duration-200 ${
                      viewLayout === 'list' 
                        ? `${HIVE_COLORS.background.tertiary} ${HIVE_COLORS.text.primary}` 
                        : `${HIVE_COLORS.text.secondary} hover:${HIVE_COLORS.text.primary}`
                    }`}
                  >
                    <List className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto p-6">
          {loading ? (
            <LoadingState message="Loading spaces..." />
          ) : error ? (
            <ErrorState error={error} onRetry={() => setError(null)} />
          ) : filteredSpaces.length === 0 ? (
            <EmptyState
              icon={Search}
              title="No spaces found"
              description={`No ${category?.title.toLowerCase()} match your search criteria. Try adjusting your filters or create a new space.`}
              actionLabel="Create Space"
              onAction={() => setShowCreateModal(true)}
            />
          ) : (
            <div className={viewLayout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
              {filteredSpaces.map((space) => (
                <HIVECard 
                  key={space.id} 
                  variant="interactive"
                  className={`p-6 ${viewLayout === 'list' ? 'flex items-center gap-6' : ''}`}
                  onClick={() => navigateTo('space-preview', space)}
                >
                  <div className={`${viewLayout === 'list' ? 'flex items-center gap-4 flex-1' : ''}`}>
                    <div className={`${viewLayout === 'list' ? 'flex items-center gap-3' : 'flex items-start justify-between mb-4'}`}>
                      <div className={`${viewLayout === 'list' ? 'flex items-center gap-3' : ''}`}>
                        <div className={`p-2 rounded-lg ${SPACE_CATEGORIES[space.category]?.color}`}>
                          <SpaceCategoryIcon category={space.category} />
                        </div>
                        <div>
                          <h3 className={`font-bold ${HIVE_COLORS.text.primary}`}>{space.name}</h3>
                          <p className={`text-sm ${HIVE_COLORS.text.secondary}`}>{space.description}</p>
                        </div>
                      </div>
                      {viewLayout === 'grid' && space.userIsMember && (
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                      )}
                    </div>
                    
                    <div className={`${viewLayout === 'list' ? 'flex items-center gap-6 ml-auto' : 'flex items-center justify-between text-sm mb-4'}`}>
                      <div className={`flex items-center gap-4 text-sm ${HIVE_COLORS.text.secondary}`}>
                        <div className="flex items-center gap-1">
                          <Users className="w-3 h-3" />
                          {space.members}
                        </div>
                        <div className="flex items-center gap-1">
                          <MessageCircle className="w-3 h-3" />
                          {space.posts}
                        </div>
                        <div className="flex items-center gap-1">
                          <Activity className="w-3 h-3" />
                          {space.lastActivity}
                        </div>
                      </div>
                      {viewLayout === 'list' && space.userIsMember && (
                        <div className="w-2 h-2 bg-green-400 rounded-full" />
                      )}
                    </div>

                    {viewLayout === 'grid' && (
                      <div className="flex items-center justify-between">
                        <span className={`text-xs px-2 py-1 rounded-full ${SPACE_CATEGORIES[space.category]?.color}`}>
                          {SPACE_CATEGORIES[space.category]?.title}
                        </span>
                        {!space.userIsMember && (
                          <HIVEButton 
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedSpace(space);
                              setShowJoinModal(true);
                            }}
                          >
                            Join
                          </HIVEButton>
                        )}
                      </div>
                    )}
                  </div>
                  
                  {viewLayout === 'list' && !space.userIsMember && (
                    <HIVEButton 
                      size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedSpace(space);
                        setShowJoinModal(true);
                      }}
                    >
                      Join
                    </HIVEButton>
                  )}
                </HIVECard>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Space Preview Page
  const SpacePreviewPage = () => (
    <div className={`min-h-screen ${HIVE_COLORS.background.primary} ${HIVE_COLORS.text.primary}`}>
      {/* Header */}
      <div className={`border-b ${HIVE_COLORS.border.default} bg-black/90 backdrop-blur-sm sticky top-0 z-40`}>
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button 
                onClick={goBack}
                className={`p-2 hover:${HIVE_COLORS.background.tertiary} rounded-lg transition-all duration-200`}
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
              <div>
                <h1 className={`text-xl font-bold ${HIVE_COLORS.text.primary}`}>{selectedSpace.name}</h1>
                <p className={`text-sm ${HIVE_COLORS.text.secondary}`}>Preview • {selectedSpace.category} space</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <HIVEButton variant="secondary" size="sm">
                <Share className="w-4 h-4" />
                Share
              </HIVEButton>
              {selectedSpace.userIsMember ? (
                <HIVEButton onClick={() => navigateTo('space-board', selectedSpace)}>
                  Enter Space
                </HIVEButton>
              ) : (
                <HIVEButton onClick={() => setShowJoinModal(true)}>
                  <UserPlus className="w-4 h-4" />
                  Join Space
                </HIVEButton>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Space Hero */}
            <HIVECard className="p-8 text-center">
              <div className={`w-24 h-24 rounded-full ${SPACE_CATEGORIES[selectedSpace.category]?.color} flex items-center justify-center mx-auto mb-6`}>
                <SpaceCategoryIcon category={selectedSpace.category} size="lg" />
              </div>
              <h2 className={`text-3xl font-bold ${HIVE_COLORS.text.primary} mb-3`}>{selectedSpace.name}</h2>
              <p className={`text-lg ${HIVE_COLORS.text.secondary} mb-6`}>{selectedSpace.description}</p>
              
              <div className="flex items-center justify-center gap-8 mb-6">
                <div className="text-center">
                  <div className={`text-2xl font-bold ${HIVE_COLORS.text.primary}`}>{selectedSpace.members}</div>
                  <div className={`text-sm ${HIVE_COLORS.text.secondary}`}>Members</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${HIVE_COLORS.text.primary}`}>{selectedSpace.posts}</div>
                  <div className={`text-sm ${HIVE_COLORS.text.secondary}`}>Posts</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold text-green-400`}>Active</div>
                  <div className={`text-sm ${HIVE_COLORS.text.secondary}`}>Status</div>
                </div>
              </div>

              {!selectedSpace.userIsMember && (
                <HIVEButton onClick={() => setShowJoinModal(true)} size="lg">
                  <UserPlus className="w-5 h-5" />
                  Join {selectedSpace.name}
                </HIVEButton>
              )}
            </HIVECard>

            {/* Recent Activity */}
            <div>
              <h3 className={`text-xl font-bold ${HIVE_COLORS.text.primary} mb-6`}>Recent Activity</h3>
              <div className="space-y-4">
                {[
                  { 
                    user: 'Prof. Johnson', 
                    action: 'posted an announcement about office hours',
                    time: '2 hours ago',
                    type: 'announcement'
                  },
                  { 
                    user: 'Sarah Chen', 
                    action: 'shared study resources for the upcoming exam',
                    time: '4 hours ago',
                    type: 'resource'
                  },
                  { 
                    user: 'Mike Rodriguez', 
                    action: 'asked a question about the final project',
                    time: '6 hours ago',
                    type: 'question'
                  }
                ].map((activity, index) => (
                  <HIVECard key={index} className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center">
                        <User className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`font-medium ${HIVE_COLORS.text.primary}`}>{activity.user}</span>
                          <span className={`text-sm ${HIVE_COLORS.text.secondary}`}>{activity.time}</span>
                        </div>
                        <p className={HIVE_COLORS.text.secondary}>{activity.action}</p>
                      </div>
                      <div className={`p-1 rounded ${
                        activity.type === 'announcement' ? 'bg-blue-500/20' :
                        activity.type === 'resource' ? 'bg-green-500/20' :
                        'bg-yellow-500/20'
                      }`}>
                        {activity.type === 'announcement' && <Bell className="w-3 h-3 text-blue-400" />}
                        {activity.type === 'resource' && <BookOpen className="w-3 h-3 text-green-400" />}
                        {activity.type === 'question' && <MessageCircle className="w-3 h-3 text-yellow-400" />}
                      </div>
                    </div>
                  </HIVECard>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Space Info */}
            <HIVECard className="p-6">
              <h3 className={`font-bold ${HIVE_COLORS.text.primary} mb-4`}>Space Details</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className={HIVE_COLORS.text.secondary}>Category</span>
                  <span className={`text-xs px-2 py-1 rounded-full ${SPACE_CATEGORIES[selectedSpace.category]?.color}`}>
                    {SPACE_CATEGORIES[selectedSpace.category]?.title}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className={HIVE_COLORS.text.secondary}>Privacy</span>
                  <div className="flex items-center gap-1">
                    {selectedSpace.isPrivate ? (
                      <>
                        <Lock className="w-3 h-3 text-yellow-400" />
                        <span className={`text-sm ${HIVE_COLORS.text.primary}`}>Private</span>
                      </>
                    ) : (
                      <>
                        <Globe className="w-3 h-3 text-green-400" />
                        <span className={`text-sm ${HIVE_COLORS.text.primary}`}>Public</span>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className={HIVE_COLORS.text.secondary}>Last Activity</span>
                  <span className={`text-sm ${HIVE_COLORS.text.primary}`}>{selectedSpace.lastActivity}</span>
                </div>
              </div>
            </HIVECard>

            {/* Available Tools */}
            <HIVECard className="p-6">
              <h3 className={`font-bold ${HIVE_COLORS.text.primary} mb-4`}>Available Tools</h3>
              <div className="space-y-3">
                {selectedSpace.tools.map((tool) => (
                  <div key={tool} className="flex items-center gap-3">
                    <div className="p-1 bg-hive-brand-secondary/20 rounded">
                      <Star className="w-3 h-3 text-hive-brand-secondary" />
                    </div>
                    <span className={`text-sm ${HIVE_COLORS.text.secondary}`}>{tool}</span>
                  </div>
                ))}
              </div>
            </HIVECard>

            {/* Recent Members */}
            <HIVECard className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className={`font-bold ${HIVE_COLORS.text.primary}`}>Recent Members</h3>
                <button 
                  onClick={() => navigateTo('member-directory')}
                  className={`text-sm ${HIVE_COLORS.text.secondary} hover:${HIVE_COLORS.text.primary} transition-colors duration-200`}
                >
                  View All
                </button>
              </div>
              <div className="space-y-3">
                {['Sarah Chen', 'Mike Rodriguez', 'Prof. Johnson'].map((member) => (
                  <div key={member} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <div className={`text-sm font-medium ${HIVE_COLORS.text.primary}`}>{member}</div>
                      <div className={`text-xs ${HIVE_COLORS.text.secondary}`}>Active now</div>
                    </div>
                  </div>
                ))}
              </div>
            </HIVECard>
          </div>
        </div>
      </div>
    </div>
  );

  // Events Widget Component
  const EventsWidget = () => {
    const [showEventCreator, setShowEventCreator] = React.useState(false);
    
    return (
      <HIVECard variant="interactive" className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#FFD700]/10 rounded-xl border border-[#FFD700]/30">
              <Calendar className="w-6 h-6 text-[#FFD700]" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-hive-text-primary hive-font-display">Events</h3>
              <p className="text-sm text-[#FFD700]/80">Community calendar and events</p>
            </div>
          </div>
          {userRole === 'leader' && (
            <HIVEButton onClick={() => setShowEventCreator(true)}>
              <Plus className="w-4 h-4" />
              Create Event
            </HIVEButton>
          )}
        </div>
        
        {/* Interactive Calendar View */}
        <div className="bg-hive-background-primary rounded-2xl p-4 border border-[#FFD700]/20">
          <div className="grid grid-cols-7 gap-1 mb-4">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="p-2 text-center text-xs font-medium text-[#FFD700]">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {Array.from({ length: 35 }, (_, i) => {
              const dayNumber = i - 6; // Start from previous month
              const isCurrentMonth = dayNumber > 0 && dayNumber <= 31;
              const hasEvent = [5, 12, 18, 25].includes(dayNumber);
              
              return (
                <div 
                  key={i}
                  className={`aspect-square p-1 text-center text-xs rounded-lg transition-all duration-200 ${
                    isCurrentMonth 
                      ? 'text-hive-text-primary hover:bg-hive-background-tertiary cursor-pointer hover:text-[#FFD700]' 
                      : 'text-hive-text-muted'
                  }`}
                >
                  <div className={`w-full h-full flex items-center justify-center rounded-lg ${
                    hasEvent ? 'bg-[#FFD700]/10 border border-[#FFD700]/30 text-[#FFD700] font-medium' : ''
                  }`}>
                    {dayNumber > 0 ? dayNumber : ''}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Upcoming Events */}
        <div className="mt-4">
          <h4 className="text-sm font-medium text-hive-text-primary mb-3">Upcoming Events</h4>
          <div className="space-y-2">
            {[
              { title: 'Algorithm Study Session', date: 'Tomorrow, 2:00 PM', attendees: 8 },
              { title: 'Guest Lecture: AI Ethics', date: 'Friday, 10:00 AM', attendees: 24 },
              { title: 'Final Project Presentations', date: 'Next Monday, 9:00 AM', attendees: 45 }
            ].map((event, index) => (
              <div key={index} className="flex items-center justify-between p-2 rounded-xl bg-hive-background-primary border border-[#FFD700]/10 hover:border-[#FFD700]/20 transition-all duration-200">
                <div className="flex-1">
                  <div className="text-sm font-medium text-hive-text-primary">{event.title}</div>
                  <div className="text-xs text-[#FFD700]">{event.date}</div>
                </div>
                <div className="text-xs text-hive-text-muted">{event.attendees} attending</div>
              </div>
            ))}
          </div>
        </div>

        {/* Event Creator Modal */}
        {showEventCreator && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <HIVECard className="max-w-2xl w-full p-6 max-h-[80vh] overflow-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-hive-text-primary hive-font-display">Create Event</h2>
                <HIVEButton variant="ghost" size="sm" onClick={() => setShowEventCreator(false)}>
                  <X className="w-5 h-5" />
                </HIVEButton>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-hive-text-primary mb-2">Event Title</label>
                  <input
                    type="text"
                    placeholder="Enter event title..."
                    className="w-full px-4 py-3 bg-hive-background-tertiary border border-[#FFD700]/20 rounded-2xl text-hive-text-primary placeholder-hive-text-placeholder focus:border-[#FFD700] focus:outline-none transition-all duration-300"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-hive-text-primary mb-2">Description</label>
                  <textarea
                    rows={3}
                    placeholder="Describe your event..."
                    className="w-full px-4 py-3 bg-hive-background-tertiary border border-[#FFD700]/20 rounded-2xl text-hive-text-primary placeholder-hive-text-placeholder focus:border-[#FFD700] focus:outline-none resize-none transition-all duration-300"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-hive-text-primary mb-2">Date</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 bg-hive-background-tertiary border border-[#FFD700]/20 rounded-2xl text-hive-text-primary focus:border-[#FFD700] focus:outline-none transition-all duration-300"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-hive-text-primary mb-2">Time</label>
                    <input
                      type="time"
                      className="w-full px-4 py-3 bg-hive-background-tertiary border border-[#FFD700]/20 rounded-2xl text-hive-text-primary focus:border-[#FFD700] focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <HIVEButton variant="secondary" onClick={() => setShowEventCreator(false)} className="flex-1">
                  Cancel
                </HIVEButton>
                <HIVEButton onClick={() => setShowEventCreator(false)} className="flex-1">
                  Create Event
                </HIVEButton>
              </div>
            </HIVECard>
          </div>
        )}
      </HIVECard>
    );
  };

  // Add Functionality Card
  const AddFunctionalityCard = () => (
    <HIVECard variant="interactive" className="p-6 border-2 border-dashed border-[#FFD700]/20">
      <div className="text-center">
        <div className="w-16 h-16 bg-[#FFD700]/10 rounded-2xl flex items-center justify-center mx-auto mb-4 border border-[#FFD700]/30">
          <Plus className="w-8 h-8 text-[#FFD700]" />
        </div>
        <h3 className="text-lg font-bold text-hive-text-primary hive-font-display mb-2">Add Functionality</h3>
        <p className="text-sm text-hive-text-secondary mb-4">
          Enhance your space with custom tools and systems designed for your community's needs.
        </p>
        <div className="bg-hive-background-primary rounded-xl p-3 border border-[#FFD700]/20">
          <div className="text-xs font-medium text-[#FFD700] mb-1">Coming in Future Updates</div>
          <div className="text-xs text-hive-text-muted">
            Custom tools, integrations, and advanced community features
          </div>
        </div>
      </div>
    </HIVECard>
  );

  // Individual Space Board Page (Board Template Architecture)
  const SpaceBoardPage = () => (
    <div className="min-h-screen bg-hive-background-primary text-hive-text-primary hive-font-sans">
      {/* Header - HIVE Branded */}
      <div className="border-b border-[#FFD700]/20 bg-hive-background-primary/90 hive-glass sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <HIVEButton variant="ghost" size="sm" onClick={goBack}>
                <ArrowLeft className="w-5 h-5" />
              </HIVEButton>
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-2xl bg-[#FFD700]/10 border border-[#FFD700]/30">
                  <SpaceCategoryIcon category={selectedSpace.category} />
                </div>
                <div>
                  <h1 className="text-xl font-bold text-hive-text-primary hive-font-display">{selectedSpace.name}</h1>
                  <p className="text-sm text-hive-text-secondary">{selectedSpace.members} members • {selectedSpace.isActive ? 'Active' : 'Inactive'}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <HIVEButton variant="ghost" size="sm" onClick={() => setShowMemberDirectory(true)}>
                <Users className="w-5 h-5" />
              </HIVEButton>
              <HIVEButton variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </HIVEButton>
              {userRole === 'leader' && (
                <HIVEButton variant="ghost" size="sm" onClick={() => setShowLeadershipPanel(true)}>
                  <Settings className="w-5 h-5" />
                </HIVEButton>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Board Template: 60/40 split */}
      <div className="flex h-[calc(100vh-73px)]">
        {/* Post Board (60%) - The Social "Surface" */}
        <div className="flex-[3] flex flex-col">
          <div className="p-6 border-b border-hive-border-primary">
            <h2 className="text-xl font-bold text-hive-text-primary hive-font-display mb-4">Community Feed</h2>
            
            {/* Post Creation */}
            <HIVECard className="p-4 mb-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-[#FFD700] rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-black" />
                </div>
                <input 
                  type="text" 
                  placeholder={`Share an update with ${selectedSpace.name}...`}
                  className="flex-1 bg-hive-background-tertiary border border-[#FFD700]/20 rounded-2xl px-4 py-3 text-hive-text-primary placeholder-hive-text-placeholder focus:border-[#FFD700] focus:outline-none transition-all duration-300 hive-interactive"
                />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <HIVEButton variant="ghost" size="sm">
                    <Calendar className="w-4 h-4" />
                    Event
                  </HIVEButton>
                  <HIVEButton variant="ghost" size="sm">
                    <BookOpen className="w-4 h-4" />
                    Resource
                  </HIVEButton>
                  <HIVEButton variant="ghost" size="sm">
                    <Camera className="w-4 h-4" />
                    Photo
                  </HIVEButton>
                </div>
                <HIVEButton size="sm">
                  Post
                </HIVEButton>
              </div>
            </HIVECard>
          </div>

          {/* Feed Content */}
          <div className="flex-1 overflow-auto p-6">
            <div className="space-y-6 max-w-2xl">
              {/* Pinned Post for Leader Announcements */}
              <HIVECard className="p-6 border-2 border-[#FFD700]/40 bg-[#FFD700]/5">
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-12 h-12 bg-[#FFD700] rounded-full flex items-center justify-center">
                    <Crown className="w-6 h-6 text-black" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-hive-text-primary hive-font-medium">Prof. Johnson</span>
                      <div className="px-2 py-0.5 bg-[#FFD700]/20 text-[#FFD700] text-xs rounded-full border border-[#FFD700]/40">
                        Pinned
                      </div>
                      <span className="text-sm text-hive-text-secondary">3 days ago</span>
                    </div>
                    <h3 className="font-medium text-hive-text-primary mb-2 hive-font-medium">Welcome to CS Department Space</h3>
                    <p className="text-hive-text-secondary">Welcome everyone! This is our community headquarters for announcements, discussions, and collaboration. Please check the Events calendar for upcoming deadlines and office hours.</p>
                  </div>
                </div>
              </HIVECard>

              {/* Activity Cards - Social Output from Tools */}
              {[
                {
                  id: 1,
                  type: 'event',
                  user: 'Prof. Johnson',
                  role: 'Admin',
                  title: 'New Event: Algorithm Study Session',
                  content: 'Join us tomorrow at 2:00 PM for a collaborative study session covering binary trees and graph algorithms.',
                  time: '2 hours ago',
                  likes: 12,
                  comments: 3,
                  attending: 8,
                  icon: Calendar
                },
                {
                  id: 2,
                  type: 'poll',
                  user: 'Sarah Chen',
                  role: 'Member',
                  title: 'Poll: Best Time for Weekend Study Group?',
                  content: 'What time works best for everyone this Saturday? Vote below!',
                  time: '4 hours ago',
                  likes: 8,
                  comments: 5,
                  votes: 15,
                  icon: Target
                },
                {
                  id: 3,
                  type: 'announcement',
                  user: 'Teaching Assistant',
                  role: 'TA',
                  title: 'Office Hours Moved',
                  content: 'Office hours for this week will be moved to Wednesday 2-4 PM due to the department meeting.',
                  time: '6 hours ago',
                  likes: 24,
                  comments: 2,
                  icon: Bell
                }
              ].map((post) => (
                <HIVECard key={post.id} className="p-6">
                  <div className="flex items-start gap-3 mb-4">
                    <div className="w-12 h-12 bg-[#FFD700]/10 rounded-full flex items-center justify-center border border-[#FFD700]/30">
                      <post.icon className="w-6 h-6 text-[#FFD700]" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-hive-text-primary hive-font-medium">{post.user}</span>
                        {post.role === 'Admin' && (
                          <div className="px-2 py-0.5 bg-[#FFD700]/20 text-[#FFD700] text-xs rounded-full border border-[#FFD700]/40">
                            {post.role}
                          </div>
                        )}
                        <span className="text-sm text-hive-text-secondary">{post.time}</span>
                      </div>
                      <h3 className="font-medium text-hive-text-primary mb-2 hive-font-medium">{post.title}</h3>
                      <p className="text-hive-text-secondary">{post.content}</p>
                      
                      {/* Activity-specific metadata */}
                      {post.type === 'event' && post.attending && (
                        <div className="mt-3 p-3 bg-hive-background-primary rounded-xl border border-[#FFD700]/20">
                          <div className="text-sm text-[#FFD700]">{post.attending} people attending</div>
                        </div>
                      )}
                      {post.type === 'poll' && post.votes && (
                        <div className="mt-3 p-3 bg-hive-background-primary rounded-xl border border-[#FFD700]/20">
                          <div className="text-sm text-[#FFD700]">{post.votes} votes cast</div>
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6 pt-4 border-t border-hive-border-primary">
                    <HIVEButton variant="ghost" size="sm">
                      <Heart className="w-4 h-4" />
                      {post.likes}
                    </HIVEButton>
                    <HIVEButton variant="ghost" size="sm">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </HIVEButton>
                    <HIVEButton variant="ghost" size="sm">
                      <Share className="w-4 h-4" />
                      Share
                    </HIVEButton>
                  </div>
                </HIVECard>
              ))}
            </div>
          </div>
        </div>

        {/* Functionality Board (40%) - The "Interface" */}
        <div className="flex-[2] border-l border-hive-border-primary bg-hive-background-secondary flex flex-col">
          <div className="p-6 border-b border-hive-border-primary">
            <h2 className="text-xl font-bold text-hive-text-primary hive-font-display">Functionality</h2>
            <p className="text-sm text-hive-text-secondary">Community tools and capabilities</p>
          </div>
          
          <div className="flex-1 overflow-auto p-6 space-y-6">
            {/* Events Widget - Pre-installed Main Surface */}
            <EventsWidget />
            
            {/* Add Functionality Card - vBETA Teaser */}
            <AddFunctionalityCard />
          </div>
        </div>
      </div>
    </div>
  );

  // Main Render - Route between views
  return (
    <div className="min-h-screen bg-hive-background-primary hive-font-sans">
      {/* Route between different views */}
      {currentView === 'explore' && <MainExplorePage />}
      {currentView === 'category' && <CategoryBrowsePage />}
      {currentView === 'space-preview' && <SpacePreviewPage />}
      {currentView === 'space-board' && <SpaceBoardPage />}
      {currentView === 'member-directory' && <MemberDirectoryPage />}

      {/* Global Modals */}
      <JoinSpaceModal />
      <CreateSpaceModal />
      <LeadershipPanelModal />
      <ToolLibraryModal />

      {/* Debug Panel */}
      {showDebugLabels && (
        <div className="fixed bottom-4 right-4 p-4 bg-black/90 text-white rounded-lg border border-white/20 text-sm z-50">
          <div>View: {currentView}</div>
          <div>User Role: {userRole}</div>
          <div>Category: {currentCategory}</div>
          <div>Space: {selectedSpace.name}</div>
          <div>History: {navigationHistory.length} steps</div>
        </div>
      )}
    </div>
  );
};

// Storybook Configuration
const meta = {
  title: '04-Spaces System/Complete HIVE Spaces System (Production)',
  component: CompleteHIVESpacesSystem,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: '🏠 **Complete HIVE Spaces System** - Production-ready, brand-compliant implementation with full page navigation, comprehensive modals, proper state management, and all critical user flows. Built following HIVE design system principles with monochrome aesthetic and atomic design patterns.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    viewMode: {
      control: { type: 'select' },
      options: ['explore', 'category', 'space-preview', 'space-board', 'member-directory'],
      description: 'Starting view for the spaces system',
    },
    userRole: {
      control: { type: 'select' },
      options: ['student', 'leader', 'admin'],
      description: 'User role affecting permissions and available actions',
    },
    categoryType: {
      control: { type: 'select' },
      options: ['university', 'residential', 'greek', 'student'],
      description: 'Category type for category browse view',
    },
    showDebugLabels: {
      control: { type: 'boolean' },
      description: 'Show debug overlay with navigation state',
    },
  },
} satisfies Meta<typeof CompleteHIVESpacesSystem>;

export default meta;
type Story = StoryObj<typeof meta>;

// Production-Ready Stories

export const MainExplorePage: Story = {
  render: (args) => <CompleteHIVESpacesSystem {...args} />,
  args: {
    viewMode: 'explore',
    userRole: 'student',
    showDebugLabels: false,
  },
  parameters: {
    docs: {
      description: {
        story: '🏠 **Main Explore Page** - Primary discovery interface with 4 core categories, personalized recommendations, and hero section. Features brand-compliant design with proper HIVE semantic tokens.',
      },
    },
  },
};

export const UniversitySpacesCategory: Story = {
  render: (args) => <CompleteHIVESpacesSystem {...args} />,
  args: {
    viewMode: 'category',
    categoryType: 'university',
    userRole: 'student',
    showDebugLabels: false,
  },
  parameters: {
    docs: {
      description: {
        story: '🎓 **University Category Browse** - Academic spaces with search, filtering, and grid/list view toggles. Demonstrates proper loading states and empty state handling.',
      },
    },
  },
};

export const ResidentialSpacesCategory: Story = {
  render: (args) => <CompleteHIVESpacesSystem {...args} />,
  args: {
    viewMode: 'category',
    categoryType: 'residential',
    userRole: 'student',
    showDebugLabels: false,
  },
  parameters: {
    docs: {
      description: {
        story: '🏠 **Residential Category Browse** - Dorm and housing community spaces with location-based discovery patterns.',
      },
    },
  },
};

export const SpacePreviewFlow: Story = {
  render: (args) => <CompleteHIVESpacesSystem {...args} />,
  args: {
    viewMode: 'space-preview',
    userRole: 'student',
    showDebugLabels: false,
  },
  parameters: {
    docs: {
      description: {
        story: '👁️ **Space Preview Flow** - Comprehensive space preview with activity feed, member directory, tools overview, and join functionality. Includes detailed sidebar with space metadata.',
      },
    },
  },
};

export const IndividualSpaceBoard: Story = {
  render: (args) => <CompleteHIVESpacesSystem {...args} />,
  args: {
    viewMode: 'space-board',
    userRole: 'leader',
    showDebugLabels: false,
  },
  parameters: {
    docs: {
      description: {
        story: '🏗️ **Individual Space Board** - 60/40 split layout with Post Board (activity feed) and Tool Grid (community tools). Features post creation, real-time activity, and comprehensive tool ecosystem.',
      },
    },
  },
};

export const MemberDirectoryView: Story = {
  render: (args) => <CompleteHIVESpacesSystem {...args} />,
  args: {
    viewMode: 'member-directory',
    userRole: 'student',
    showDebugLabels: false,
  },
  parameters: {
    docs: {
      description: {
        story: '👥 **Member Directory** - Complete member management interface with search, role indicators, online status, and leadership tools.',
      },
    },
  },
};

export const LeadershipExperience: Story = {
  render: (args) => <CompleteHIVESpacesSystem {...args} />,
  args: {
    viewMode: 'space-board',
    userRole: 'leader',
    showDebugLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: '👑 **Leadership Experience** - Full leadership interface with space management, member administration, analytics dashboard, and tool library access.',
      },
    },
  },
};

export const KitchenSinkDemo: Story = {
  render: (args) => <CompleteHIVESpacesSystem {...args} />,
  args: {
    viewMode: 'explore',
    userRole: 'admin',
    showDebugLabels: true,
  },
  parameters: {
    docs: {
      description: {
        story: '🔧 **Kitchen Sink Demo** - Complete system demonstration with debug overlay, admin permissions, and access to all modals and flows. Perfect for testing and development.',
      },
    },
  },
};