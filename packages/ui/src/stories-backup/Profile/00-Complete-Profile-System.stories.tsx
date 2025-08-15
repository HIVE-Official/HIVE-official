import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { User, Users, Calendar, Shield, Settings, X, ArrowLeft, MapPin, Star, Hammer, Activity, Clock, Zap, UserPlus, Beaker, ChevronDown, ChevronLeft, ChevronRight, Plus, AlertTriangle, Camera, Edit, Eye, EyeOff, Upload, Download, Copy, Link, Globe, Lock, Save, Trash2, GraduationCap, Target, RotateCw, Search, Calculator, FileText, BookOpen, CheckCircle } from 'lucide-react';

// Profile System Props Interface
interface ProfileSystemProps {
  editMode?: boolean;
  showWidgetLabels?: boolean;
  simulateLoading?: boolean;
}

// HIVE Profile Widget System - vBETA Implementation  
const CompleteProfileSystem = ({ 
  editMode: initialEditMode = false,
  showWidgetLabels = false,
  simulateLoading = false 
}: ProfileSystemProps = {}) => {
  const [editMode, setEditMode] = React.useState(initialEditMode);
  const [focusWidget, setFocusWidget] = React.useState<string | null>(null);
  const [profileData, setProfileData] = React.useState({
    name: 'Jacob Chen',
    handle: '@jacob.ub',
    bio: 'CS Major @ UB | Building tools that make campus life better | HIVE early adopter passionate about creating utility-first social experiences',
    school: 'University at Buffalo',
    major: 'Computer Science',
    year: 'Junior',
    joinedDate: 'September 2023',
    hasLeaderStatus: true,
    hasBuilderStatus: true,
    interests: ['Startups', 'Gaming', 'Open Source', 'AI/ML', 'Basketball', 'Coffee', 'Hackathons', 'Design Systems'],
    stats: {
      spacesLed: 3,
      spacesJoined: 12,
      toolsBuilt: 8,
      connectionsCount: 127,
      eventsCreated: 15,
      ritualsCompleted: 24,
      streakDays: 12,
      totalPoints: 2847
    },
    badges: [
      { name: 'Leader', description: 'Leads 3+ active spaces', icon: 'shield', earnedDate: '2023-10-15' },
      { name: 'Builder', description: 'Created 5+ community tools', icon: 'hammer', earnedDate: '2023-11-20' },
      { name: 'Connector', description: '100+ meaningful connections', icon: 'users', earnedDate: '2023-12-05' },
      { name: 'Ritual Master', description: '20+ rituals completed', icon: 'zap', earnedDate: '2024-01-10' }
    ],
    photos: [
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1566492031773-4f4e44671d66?w=400&h=400&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face'
    ],
    currentPhotoIndex: 0,
    totalPhotos: 3
  });

  // Mock data for widgets
  const spaces = [
    { id: 1, name: 'CS Study Group', role: 'Leader', members: 47, notifications: 3 },
    { id: 2, name: 'UB Athletics', role: 'Member', members: 234, notifications: 0 },
    { id: 3, name: 'Hackathon Team', role: 'Builder', members: 8, notifications: 5 }
  ];

  const connections = [
    { id: 1, name: 'Sarah Kim', title: 'CS Major', mutualSpaces: 3, isOnline: true },
    { id: 2, name: 'Mike Johnson', title: 'Engineering', mutualSpaces: 1, isOnline: false },
    { id: 3, name: 'Emma Wilson', title: 'Business', mutualSpaces: 2, isOnline: true },
    { id: 4, name: 'Alex Chen', title: 'Design', mutualSpaces: 4, isOnline: true }
  ];

  // Helper functions
  const uploadPhoto = () => {
    console.log('📸 Photo upload triggered');
  };

  const WidgetLabel = ({ type, size }: { type: string; size: string }) => (
    showWidgetLabels ? (
      <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-black/80 text-white text-xs rounded border border-white/20">
        {type} ({size})
      </div>
    ) : null
  );

  const LoadingState = () => (
    <div className="h-full p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl animate-pulse">
      <div className="space-y-4">
        <div className="h-4 bg-white/20 rounded"></div>
        <div className="h-4 bg-white/20 rounded w-3/4"></div>
        <div className="h-8 bg-white/20 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Global Header */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => window.history.back()}
                className="w-12 h-12 bg-white/5 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all duration-200 border border-white/10"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <div>
                <h1 className="text-2xl font-bold">Profile System</h1>
                <p className="text-gray-400">Complete vBETA widget experience</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {!editMode ? (
                <>
                  <div className="text-right">
                    <div className="text-sm text-gray-400">System Status</div>
                    <div className="text-white font-medium">vBETA Active</div>
                  </div>
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-6 py-3 bg-white text-black hover:bg-gray-100 border border-white/20 hover:border-yellow-500 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Customize
                  </button>
                </>
              ) : (
                <div className="flex items-center gap-4">
                  <div className="px-4 py-3 bg-white/10 text-white rounded-xl border border-white/20 backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
                      <span className="font-medium">Edit Mode Active</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setEditMode(false)}
                    className="px-6 py-3 bg-white text-black hover:bg-gray-100 border border-white/20 hover:border-yellow-500 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Save Changes
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Profile Container */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-4 grid-rows-3 gap-6 h-[800px]">
          
          {/* 1. Avatar Widget (1x2) */}
          <div className="col-span-1 row-span-2 relative">
            <WidgetLabel type="Avatar" size="1x2" />
            {simulateLoading ? (
              <LoadingState />
            ) : (
              <div 
                className="h-full p-6 bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl cursor-pointer hover:bg-white/10 transition-all duration-300 hover:scale-[1.02] shadow-lg group"
                onClick={() => setFocusWidget('avatar')}
              >
              <div className="h-full flex flex-col items-center">
                {/* Main Profile Photo */}
                <div className="relative mb-6">
                  <div 
                    className="w-32 h-32 rounded-full bg-gray-800 p-1 shadow-2xl border border-white/20 group-hover:border-yellow-500/40 transition-all duration-300"
                  >
                    <img 
                      src={profileData.photos[profileData.currentPhotoIndex]}
                      alt={profileData.name}
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  
                  {/* Photo navigation dots */}
                  <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1.5">
                    {profileData.photos.map((_, index) => (
                      <div
                        key={index}
                        className={`w-2 h-2 rounded-full transition-all duration-200 ${
                          index === profileData.currentPhotoIndex ? 'bg-white' : 'bg-white/30'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Profile Info */}
                <div className="text-center mb-6">
                  <h2 className="text-xl font-bold mb-1">{profileData.name}</h2>
                  <p className="text-gray-400 text-sm mb-3">{profileData.handle}</p>
                  
                  {/* Status Badges */}
                  <div className="flex justify-center gap-2 mb-4">
                    {profileData.hasLeaderStatus && (
                      <span className="px-3 py-1 bg-white/10 text-white border border-white/20 rounded-full text-xs font-medium">
                        Leader
                      </span>
                    )}
                    {profileData.hasBuilderStatus && (
                      <span className="px-3 py-1 bg-white/10 text-white border border-white/20 rounded-full text-xs font-medium">
                        Builder
                      </span>
                    )}
                  </div>
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3 text-center">
                    <div className="p-2 bg-white/5 rounded-lg">
                      <div className="text-sm font-bold">{profileData.stats.connectionsCount}</div>
                      <div className="text-xs text-gray-400">Connections</div>
                    </div>
                    <div className="p-2 bg-white/5 rounded-lg">
                      <div className="text-sm font-bold">{profileData.stats.spacesJoined}</div>
                      <div className="text-xs text-gray-400">Spaces</div>
                    </div>
                  </div>
                </div>

                {/* Action Hint */}
                <div className="mt-auto text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-xs text-gray-400 mb-2">Click to view full profile</p>
                  <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center mx-auto border border-white/20">
                    <User className="w-4 h-4" />
                  </div>
                </div>
              </div>
              </div>
            )}
          </div>

          {/* 2. Spaces Widget (1x1) */}
          <div className="col-span-1 row-span-1 relative">
            <WidgetLabel type="Spaces" size="1x1" />
            {simulateLoading ? (
              <LoadingState />
            ) : (
              <div 
                className="h-full p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl cursor-pointer hover:bg-white/8 transition-all duration-200 hover:scale-[1.02] relative overflow-hidden"
                onClick={() => setFocusWidget('spaces')}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-lg">My Spaces</h3>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-400">{spaces.length} Active</span>
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  {spaces.slice(0, 2).map((space) => (
                    <div key={space.id} className="flex items-center justify-between p-2 bg-white/10 rounded-lg">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-white/20 rounded-md flex items-center justify-center">
                          <Users className="w-3 h-3" />
                        </div>
                        <span className="text-sm font-medium truncate">{space.name}</span>
                      </div>
                      {space.notifications > 0 && (
                        <div className="w-4 h-4 bg-yellow-500 text-black rounded-full flex items-center justify-center text-xs font-bold">
                          {space.notifications}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="text-center text-xs text-gray-400">
                  Click to manage all spaces
                </div>
              </div>
            )}
          </div>

          {/* 3. Calendar Widget (2x1) */}
          <div className="col-span-2 row-span-1 relative">
            <WidgetLabel type="Calendar" size="2x1" />
            {simulateLoading ? (
              <LoadingState />
            ) : (
              <div 
                className="h-full p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl cursor-pointer hover:bg-white/8 transition-all duration-200 hover:scale-[1.02] relative overflow-hidden"
                onClick={() => setFocusWidget('calendar')}
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">This Week</h3>
                  <div className="text-xs text-gray-400">Nov 11-17, 2024</div>
                </div>
                
                <div className="grid grid-cols-7 gap-1 h-16">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                    <div key={day} className="text-center">
                      <div className="text-xs text-gray-400 mb-1">{day}</div>
                      <div className={`w-full h-8 rounded flex items-center justify-center text-xs ${
                        index === 2 ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' : 'bg-white/10'
                      }`}>
                        {11 + index}
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="text-center text-xs text-gray-400 mt-2">
                  Click for full calendar view
                </div>
              </div>
            )}
          </div>

          {/* 4. Ritual Widget (1x1) */}
          <div className="col-span-1 row-span-1 relative">
            <WidgetLabel type="Ritual" size="1x1" />
            {simulateLoading ? (
              <LoadingState />
            ) : (
              <div 
                className="h-full p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl cursor-pointer hover:bg-white/8 transition-all duration-200 hover:scale-[1.02] relative overflow-hidden"
                onClick={() => setFocusWidget('ritual')}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Daily Ritual</h3>
                  <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                    <RotateCw className="w-3 h-3" />
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Current Streak</span>
                    <span className="text-yellow-500 font-bold">{profileData.stats.streakDays} days</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-2">
                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
                
                <div className="text-center text-xs text-gray-400">
                  Click to view ritual journey
                </div>
              </div>
            )}
          </div>

          {/* 5. Connections Widget (1x1) */}
          <div className="col-span-1 row-span-1 relative">
            <WidgetLabel type="Connections" size="1x1" />
            {simulateLoading ? (
              <LoadingState />
            ) : (
              <div 
                className="h-full p-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl cursor-pointer hover:bg-white/8 transition-all duration-200 hover:scale-[1.02] relative overflow-hidden"
                onClick={() => setFocusWidget('connections')}
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">Connections</h3>
                  <span className="text-xs text-gray-400">{profileData.stats.connectionsCount}</span>
                </div>
                
                <div className="flex -space-x-2 mb-4">
                  {connections.slice(0, 4).map((connection, index) => (
                    <div 
                      key={connection.id} 
                      className="w-8 h-8 bg-gray-700 rounded-full border-2 border-black flex items-center justify-center"
                      style={{ zIndex: 4 - index }}
                    >
                      <User className="w-4 h-4 text-white" />
                    </div>
                  ))}
                  <div className="w-8 h-8 bg-white/20 rounded-full border-2 border-black flex items-center justify-center text-xs font-bold">
                    +{Math.max(0, profileData.stats.connectionsCount - 4)}
                  </div>
                </div>
                
                <div className="text-center text-xs text-gray-400">
                  Click to manage connections
                </div>
              </div>
            )}
          </div>

          {/* 6. HiveLAB Widget (1x1) - Enhanced for Leaders/Builders */}
          {(profileData.hasLeaderStatus || profileData.hasBuilderStatus) && (
            <div className="col-span-1 row-span-1 relative">
              <WidgetLabel type="HiveLAB" size="1x1" />
              {simulateLoading ? (
                <LoadingState />
              ) : (
                <div 
                  className="h-full p-4 bg-white/5 backdrop-blur-sm border border-white/20 rounded-2xl cursor-pointer hover:bg-white/8 transition-all duration-200 hover:scale-[1.02] relative overflow-hidden hover:border-yellow-500/40"
                  onClick={() => {
                    // Navigate to HiveLAB section instead of opening modal
                    console.log('🚀 Navigating to HiveLAB section');
                    // In a real app, this would use router.push('/hivelab') or similar
                  }}
                >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold">HiveLAB</h3>
                  <div className="w-6 h-6 bg-yellow-500/20 rounded-lg flex items-center justify-center border border-yellow-500/30">
                    <Zap className="w-3 h-3 text-yellow-500" />
                  </div>
                </div>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Tools Built</span>
                    <span className="text-yellow-500 font-bold">{profileData.stats.toolsBuilt}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Active Projects</span>
                    <span className="text-white font-medium">3</span>
                  </div>
                </div>
                
                <div className="text-center text-xs text-gray-400">
                  Click to open workspace
                </div>
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      {/* Modal Overlays */}
      
      {/* Avatar Widget Modal - Enhanced with Interests, Badges & Stats */}
      {focusWidget === 'avatar' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setFocusWidget(null)}>
          <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-4xl h-[85vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/20">
              <div className="flex items-center gap-3">
                <User className="w-6 h-6 text-white" />
                <div>
                  <h2 className="text-xl font-bold">Profile Card</h2>
                  <p className="text-sm text-gray-400">Full profile view with interests, badges, and stats</p>
                </div>
              </div>
              <button onClick={() => setFocusWidget(null)} className="w-10 h-10 bg-black/80 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-yellow-500">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex h-[calc(85vh-80px)]">
              {/* Left Panel - Photo Carousel & Identity */}
              <div className="w-1/2 p-6 border-r border-white/10 overflow-y-auto">
                <div className="space-y-6">
                  
                  {/* Full Photo Carousel */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Photo Carousel</h3>
                    
                    {/* Main Large Photo */}
                    <div className="relative h-80 rounded-xl overflow-hidden bg-gray-800 border border-white/20">
                      <img 
                        src={profileData.photos[profileData.currentPhotoIndex]}
                        alt={profileData.name}
                        className="w-full h-full object-cover"
                      />
                      
                      {/* Photo Navigation */}
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                        {profileData.photos.map((_, index) => (
                          <button
                            key={index}
                            onClick={() => setProfileData(prev => ({ ...prev, currentPhotoIndex: index }))}
                            className={`w-3 h-3 rounded-full transition-all duration-200 ${
                              index === profileData.currentPhotoIndex ? 'bg-white scale-125' : 'bg-white/50 hover:bg-white/80'
                            }`}
                          />
                        ))}
                      </div>
                      
                      {/* Navigation Arrows */}
                      <button 
                        onClick={() => setProfileData(prev => ({ 
                          ...prev, 
                          currentPhotoIndex: prev.currentPhotoIndex > 0 ? prev.currentPhotoIndex - 1 : prev.photos.length - 1 
                        }))}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-200"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => setProfileData(prev => ({ 
                          ...prev, 
                          currentPhotoIndex: prev.currentPhotoIndex < prev.photos.length - 1 ? prev.currentPhotoIndex + 1 : 0 
                        }))}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-200"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                    
                    {/* Photo Thumbnails */}
                    <div className="grid grid-cols-4 gap-3">
                      {profileData.photos.map((photo, index) => (
                        <button
                          key={index}
                          onClick={() => setProfileData(prev => ({ ...prev, currentPhotoIndex: index }))}
                          className={`aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                            index === profileData.currentPhotoIndex ? 'border-white ring-2 ring-white/30' : 'border-white/20 hover:border-white/40'
                          }`}
                        >
                          <img src={photo} alt="" className="w-full h-full object-cover" />
                        </button>
                      ))}
                      
                      {/* Add Photo Button */}
                      <button 
                        onClick={uploadPhoto}
                        className="aspect-square border-2 border-dashed border-white/30 hover:border-yellow-500/50 rounded-lg flex items-center justify-center transition-all duration-200 group"
                      >
                        <Plus className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors duration-200" />
                      </button>
                    </div>
                  </div>
                  
                  {/* Identity Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Identity</h3>
                    <div className="text-center">
                      <h4 className="text-2xl font-bold text-white mb-2">{profileData.name}</h4>
                      <p className="text-gray-400 mb-4">{profileData.handle}</p>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        {profileData.hasLeaderStatus && (
                          <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 rounded-full text-sm font-medium">
                            Leader
                          </span>
                        )}
                        {profileData.hasBuilderStatus && (
                          <span className="px-3 py-1 bg-white/20 text-white border border-white/30 rounded-full text-sm font-medium">
                            Builder
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Interests Section */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Interests</h3>
                    <div className="flex flex-wrap gap-2">
                      {profileData.interests.map((interest) => (
                        <span key={interest} className="px-3 py-2 bg-white/10 text-white border border-white/20 rounded-full text-sm font-medium hover:bg-white/20 transition-all duration-200">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Panel - Badges & Stats */}
              <div className="w-1/2 p-6 overflow-y-auto">
                <div className="space-y-6">
                  
                  {/* Achievement Badges */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Achievement Badges</h3>
                    <div className="space-y-3">
                      {profileData.badges.map((badge) => {
                        const getIcon = (iconName: string) => {
                          switch (iconName) {
                            case 'shield': return <Shield className="w-5 h-5 text-yellow-500" />;
                            case 'hammer': return <Hammer className="w-5 h-5 text-white" />;
                            case 'users': return <Users className="w-5 h-5 text-white" />;
                            case 'zap': return <Zap className="w-5 h-5 text-white" />;
                            default: return <Star className="w-5 h-5 text-white" />;
                          }
                        };
                        
                        const getBadgeColor = (name: string) => {
                          if (name === 'Leader') return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/30';
                          return 'bg-white/20 text-white border-white/30';
                        };
                        
                        const getIconBg = (name: string) => {
                          if (name === 'Leader') return 'bg-yellow-500/20 border border-yellow-500/30';
                          return 'bg-white/20';
                        };
                        
                        return (
                          <div key={badge.name} className="p-4 bg-white/10 rounded-xl border border-white/20">
                            <div className="flex items-center gap-3 mb-2">
                              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getIconBg(badge.name)}`}>
                                {getIcon(badge.icon)}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getBadgeColor(badge.name)}`}>
                                    {badge.name}
                                  </span>
                                  <span className="text-sm text-white">✓ Earned</span>
                                </div>
                                <div className="text-xs text-gray-400">{badge.description}</div>
                                <div className="text-xs text-gray-500 mt-1">Earned {new Date(badge.earnedDate).toLocaleDateString()}</div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    
                    {/* Comprehensive Stats Grid */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-center">
                        <div className="text-lg font-bold text-white">{profileData.stats.connectionsCount}</div>
                        <div className="text-xs text-gray-400">Connections</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-center">
                        <div className="text-lg font-bold text-white">{profileData.stats.spacesJoined}</div>
                        <div className="text-xs text-gray-400">Spaces Joined</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-center">
                        <div className="text-lg font-bold text-white">{profileData.stats.toolsBuilt}</div>
                        <div className="text-xs text-gray-400">Tools Built</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-center">
                        <div className="text-lg font-bold text-white">{profileData.stats.totalPoints}</div>
                        <div className="text-xs text-gray-400">Total Points</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-center">
                        <div className="text-lg font-bold text-white">{profileData.stats.spacesLed}</div>
                        <div className="text-xs text-gray-400">Spaces Led</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-center">
                        <div className="text-lg font-bold text-white">{profileData.stats.streakDays}</div>
                        <div className="text-xs text-gray-400">Day Streak</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-center">
                        <div className="text-lg font-bold text-white">{profileData.stats.eventsCreated}</div>
                        <div className="text-xs text-gray-400">Events Created</div>
                      </div>
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-center">
                        <div className="text-lg font-bold text-white">{profileData.stats.ritualsCompleted}</div>
                        <div className="text-xs text-gray-400">Rituals Completed</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="flex gap-3">
                    <button className="flex-1 px-4 py-3 bg-white text-black hover:bg-gray-100 border border-white/20 hover:border-yellow-500 rounded-xl font-medium transition-all duration-200">
                      Edit Profile
                    </button>
                    <button className="px-4 py-3 bg-white/10 border border-white/20 hover:border-yellow-500 rounded-xl font-medium transition-all duration-200">
                      Share
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Spaces Widget Modal - Enhanced with Batch Management and Health Metrics */}
      {focusWidget === 'spaces' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setFocusWidget(null)}>
          <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-6xl h-[80vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-white" />
                  <div>
                    <h2 className="text-xl font-bold">Community Dashboard</h2>
                    <p className="text-sm text-gray-400">Full community management and leadership tools</p>
                  </div>
                </div>
                <button onClick={() => setFocusWidget(null)} className="w-10 h-10 bg-black/80 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-yellow-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex h-[calc(80vh-80px)]">
              {/* Left Panel - All Communities */}
              <div className="flex-1 p-6 overflow-y-auto">
                <div className="space-y-6">
                  
                  {/* Leadership Actions */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold">Leadership Actions</h3>
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-yellow-500/20 text-yellow-500 border border-yellow-500/30 rounded-full text-sm font-medium">3 Led Spaces</span>
                      </div>
                    </div>
                    
                    {/* Batch Management */}
                    <div className="p-4 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-yellow-500/20 rounded-lg flex items-center justify-center border border-yellow-500/30">
                            <Star className="w-4 h-4 text-yellow-500" />
                          </div>
                          <h4 className="font-semibold">Pending Actions</h4>
                        </div>
                        <span className="text-sm text-yellow-500">3 items</span>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div>
                            <div className="text-sm font-medium">CS Study Group - Join Requests</div>
                            <div className="text-xs text-gray-400">3 pending requests</div>
                          </div>
                          <button className="px-3 py-1 bg-yellow-500 text-black rounded-lg text-xs font-medium hover:bg-yellow-400 transition-all duration-200">
                            Approve All
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
                          <div>
                            <div className="text-sm font-medium">Mock Trial - Event Review</div>
                            <div className="text-xs text-gray-400">Weekly session scheduling</div>
                          </div>
                          <button className="px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-xs font-medium hover:border-yellow-500 transition-all duration-200">
                            Review
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* All Communities - Scrollable List */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">All Communities</h3>
                    
                    <div className="space-y-3">
                      {spaces.map((space) => (
                        <div key={space.id} className={`p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-200 ${space.role === 'Leader' ? 'ring-2 ring-yellow-500/30' : ''}`}>
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-3 flex-1">
                              <div className={`w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center ${space.role === 'Leader' ? 'ring-2 ring-yellow-500' : ''}`}>
                                <Users className="w-6 h-6 text-white" />
                              </div>
                              
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold text-white">{space.name}</h4>
                                  {space.role === 'Leader' && (
                                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                                  )}
                                </div>
                                
                                <div className="flex items-center gap-2 mb-2">
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                    space.role === 'Leader' 
                                      ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' 
                                      : 'bg-white/10 text-white border border-white/20'
                                  }`}>
                                    {space.role}
                                  </span>
                                  <span className="text-xs text-gray-400">•</span>
                                  <span className="text-xs text-gray-400">{space.members} members</span>
                                </div>
                                
                                {space.role === 'Leader' && (
                                  <div className="grid grid-cols-3 gap-2 text-center">
                                    <div className="text-center p-2 bg-white/10 rounded">
                                      <div className="text-sm font-bold text-white">85%</div>
                                      <div className="text-xs text-gray-400">Activity</div>
                                    </div>
                                    <div className="text-center p-2 bg-white/10 rounded">
                                      <div className="text-sm font-bold text-white">12</div>
                                      <div className="text-xs text-gray-400">Events</div>
                                    </div>
                                    <div className="text-center p-2 bg-white/10 rounded">
                                      <div className="text-sm font-bold text-white">4.8</div>
                                      <div className="text-xs text-gray-400">Rating</div>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              {space.notifications > 0 && (
                                <div className="px-2 py-1 bg-white/20 text-white rounded-full text-xs font-medium">
                                  {space.notifications}
                                </div>
                              )}
                              <div className="flex gap-1">
                                <button className="p-2 bg-white/10 rounded-lg border border-white/20 hover:border-yellow-500 transition-all duration-200" title="Open Space">
                                  <Globe className="w-4 h-4 text-white" />
                                </button>
                                {space.role === 'Leader' && (
                                  <button className="p-2 bg-white/10 rounded-lg border border-white/20 hover:border-yellow-500 transition-all duration-200" title="Manage">
                                    <Settings className="w-4 h-4 text-white" />
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Panel - Management Tools */}
              <div className="w-80 p-6 border-l border-white/10 overflow-y-auto">
                <div className="space-y-6">
                  
                  {/* Quick Stats */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3 bg-white/5 rounded-lg border border-white/10 text-center">
                      <div className="text-lg font-bold text-white">12</div>
                      <div className="text-xs text-gray-400">Total Joined</div>
                    </div>
                    <div className="p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20 text-center">
                      <div className="text-lg font-bold text-yellow-500">3</div>
                      <div className="text-xs text-gray-400">Leading</div>
                    </div>
                  </div>
                  
                  {/* Leader Tools */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Leader Tools</h4>
                    <div className="space-y-2">
                      <button className="w-full p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20 hover:border-yellow-500 transition-all duration-200 text-left">
                        <div className="flex items-center gap-3">
                          <Users className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm font-medium text-yellow-500">Batch Approve Members</span>
                        </div>
                      </button>
                      
                      <button className="w-full p-3 bg-white/5 rounded-lg border border-white/10 hover:border-yellow-500 transition-all duration-200 text-left">
                        <div className="flex items-center gap-3">
                          <Activity className="w-4 h-4 text-white" />
                          <span className="text-sm font-medium">Space Health Report</span>
                        </div>
                      </button>
                      
                      <button className="w-full p-3 bg-white/5 rounded-lg border border-white/10 hover:border-yellow-500 transition-all duration-200 text-left">
                        <div className="flex items-center gap-3">
                          <Calendar className="w-4 h-4 text-white" />
                          <span className="text-sm font-medium">Schedule Events</span>
                        </div>
                      </button>
                    </div>
                  </div>
                  
                  {/* Recent Activity */}
                  <div className="space-y-4">
                    <h4 className="text-lg font-semibold">Recent Activity</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                          <div className="text-sm font-medium">CS Study Group</div>
                        </div>
                        <div className="text-xs text-gray-400">3 new join requests</div>
                        <div className="text-xs text-gray-500 mt-1">2 hours ago</div>
                      </div>
                      
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                          <div className="text-sm font-medium">Mock Trial</div>
                        </div>
                        <div className="text-xs text-gray-400">Event completed successfully</div>
                        <div className="text-xs text-gray-500 mt-1">1 day ago</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Calendar Widget Modal - Enhanced with Interactive Monthly Calendar */}
      {focusWidget === 'calendar' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setFocusWidget(null)}>
          <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-4xl h-[75vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Calendar className="w-6 h-6 text-white" />
                  <div>
                    <h2 className="text-xl font-bold">My Schedule</h2>
                    <p className="text-sm text-gray-400">Interactive monthly calendar with drag-and-drop events</p>
                  </div>
                </div>
                <button onClick={() => setFocusWidget(null)} className="w-10 h-10 bg-black/80 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-yellow-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex h-[calc(75vh-100px)]">
              {/* Left Panel - Calendar View */}
              <div className="w-2/3 p-6 border-r border-white/10 overflow-y-auto">
                <div className="space-y-6">
                  
                  {/* Month Navigation */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <h3 className="text-lg font-semibold">November 2024</h3>
                      <div className="flex items-center gap-2">
                        <button className="p-2 bg-white/10 rounded-lg border border-white/20 hover:border-yellow-500 transition-all duration-200">
                          <ChevronLeft className="w-4 h-4 text-white" />
                        </button>
                        <button className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 hover:border-yellow-500 transition-all duration-200 text-sm">
                          Today
                        </button>
                        <button className="p-2 bg-white/10 rounded-lg border border-white/20 hover:border-yellow-500 transition-all duration-200">
                          <ChevronRight className="w-4 h-4 text-white" />
                        </button>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button className="px-3 py-2 bg-white/5 rounded-lg border border-white/10 hover:border-yellow-500 transition-all duration-200 text-sm">
                        Week
                      </button>
                      <button className="px-3 py-2 bg-white/10 rounded-lg border border-white/20 text-sm font-medium">
                        Month
                      </button>
                      <button className="px-4 py-2 bg-white text-black hover:bg-gray-100 border border-white/20 hover:border-yellow-500 rounded-lg text-sm font-medium transition-all duration-200">
                        + New Event
                      </button>
                    </div>
                  </div>
                  
                  {/* Interactive Monthly Calendar */}
                  <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                    {/* Calendar Headers */}
                    <div className="grid grid-cols-7 border-b border-white/10">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} className="p-3 text-center text-sm font-medium text-gray-400 border-r border-white/10 last:border-r-0">
                          {day}
                        </div>
                      ))}
                    </div>
                    
                    {/* Calendar Days */}
                    <div className="grid grid-cols-7">
                      {Array.from({ length: 42 }, (_, i) => {
                        const dayNumber = i - 2; // Start from Oct 30, 31, then Nov 1-30
                        const isCurrentMonth = dayNumber >= 1 && dayNumber <= 30;
                        const isToday = dayNumber === 15; // Nov 15 as today
                        const hasEvents = [3, 8, 15, 18, 22, 25].includes(dayNumber);
                        const displayDay = dayNumber <= 0 ? 30 + dayNumber : dayNumber > 30 ? dayNumber - 30 : dayNumber;
                        
                        return (
                          <div key={i} className="aspect-square border-r border-b border-white/10 last:border-r-0 last:border-b-0">
                            <div 
                              className={`w-full h-full p-2 flex flex-col items-center justify-start hover:bg-white/10 transition-all duration-200 cursor-pointer group relative ${
                                isToday ? 'bg-white/20 ring-2 ring-yellow-500/50' : ''
                              } ${!isCurrentMonth ? 'text-gray-600' : 'text-white'}`}
                              draggable={hasEvents}
                              onDragOver={(e) => e.preventDefault()}
                              onDrop={(e) => {
                                e.preventDefault();
                                console.log(`Event moved to ${displayDay}`);
                              }}
                            >
                              <span className="text-sm font-medium mb-1">{displayDay}</span>
                              {hasEvents && (
                                <div className="w-2 h-2 bg-yellow-500 rounded-full group-hover:scale-125 transition-transform duration-200"></div>
                              )}
                              {isToday && (
                                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
                                  <div className="w-1 h-1 bg-yellow-500 rounded-full"></div>
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Right Panel - Event Details */}
              <div className="w-1/3 p-6 overflow-y-auto">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Today's Events</h4>
                    <div className="space-y-3">
                      <div className="p-3 bg-white/10 rounded-lg border border-white/20">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                          <span className="text-sm font-medium">CS Study Session</span>
                        </div>
                        <div className="text-xs text-gray-400 mb-1">2:00 PM - 4:00 PM</div>
                        <div className="text-xs text-gray-500">Library Room 304</div>
                      </div>
                      
                      <div className="p-3 bg-white/10 rounded-lg border border-white/20">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                          <span className="text-sm font-medium">Mock Trial Practice</span>
                        </div>
                        <div className="text-xs text-gray-400 mb-1">6:00 PM - 8:00 PM</div>
                        <div className="text-xs text-gray-500">Law Building</div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-semibold mb-4">Upcoming</h4>
                    <div className="space-y-2">
                      <div className="p-2 bg-white/5 rounded text-sm">
                        <div className="font-medium">Team Meeting</div>
                        <div className="text-xs text-gray-400">Tomorrow, 10:00 AM</div>
                      </div>
                      <div className="p-2 bg-white/5 rounded text-sm">
                        <div className="font-medium">Hackathon Prep</div>
                        <div className="text-xs text-gray-400">Friday, 3:00 PM</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Ritual Widget Modal - Enhanced with Visual Timeline and Ritual Lore */}
      {focusWidget === 'ritual' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setFocusWidget(null)}>
          <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-3xl h-[75vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <RotateCw className="w-6 h-6 text-white" />
                  <div>
                    <h2 className="text-xl font-bold">HIVE Ritual System</h2>
                    <p className="text-sm text-gray-400">Your daily success framework and habit building journey</p>
                  </div>
                </div>
                <button onClick={() => setFocusWidget(null)} className="w-10 h-10 bg-black/80 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-yellow-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="p-6 overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
              <div className="space-y-6">
                
                {/* Visual Timeline - 4 Week Journey */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Ritual Journey Timeline</h3>
                  
                  <div className="relative">
                    {/* Timeline Line */}
                    <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-white/20"></div>
                    
                    <div className="space-y-6">
                      {[
                        { 
                          week: 1, 
                          title: 'Foundation Week', 
                          status: 'completed', 
                          description: 'Building basic habits and establishing your daily rhythm',
                          lore: 'Every great journey begins with a single step. This week, you lay the groundwork for transformation.'
                        },
                        { 
                          week: 2, 
                          title: 'Growth Week', 
                          status: 'completed', 
                          description: 'Expanding your capabilities and pushing beyond comfort zones',
                          lore: 'As seeds break through soil, you break through limitations. Growth requires both patience and persistence.'
                        },
                        { 
                          week: 3, 
                          title: 'Mastery Week', 
                          status: 'current', 
                          description: 'Refining your practice and achieving consistent excellence',
                          lore: 'True mastery is not perfection, but the relentless pursuit of improvement. You are becoming who you are meant to be.'
                        },
                        { 
                          week: 4, 
                          title: 'Integration Week', 
                          status: 'upcoming', 
                          description: 'Weaving new habits into your permanent lifestyle',
                          lore: 'The final week transforms practice into nature. What once required effort now flows effortlessly.'
                        }
                      ].map((phase) => (
                        <div key={phase.week} className="flex items-start gap-4 relative">
                          {/* Timeline Dot */}
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 relative z-10 ${
                            phase.status === 'completed' 
                              ? 'bg-white/20 border-white text-white' 
                              : phase.status === 'current'
                              ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500 ring-4 ring-yellow-500/20'
                              : 'bg-white/5 border-white/30 text-gray-400'
                          }`}>
                            {phase.status === 'completed' ? (
                              <CheckCircle className="w-6 h-6" />
                            ) : phase.status === 'current' ? (
                              <RotateCw className="w-6 h-6" />
                            ) : (
                              <span className="font-bold">{phase.week}</span>
                            )}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 pb-4">
                            <div className={`p-4 rounded-xl border transition-all duration-200 ${
                              phase.status === 'current' 
                                ? 'bg-yellow-500/10 border-yellow-500/30' 
                                : 'bg-white/5 border-white/10'
                            }`}>
                              <div className="flex items-center gap-2 mb-2">
                                <h4 className={`font-semibold ${
                                  phase.status === 'current' ? 'text-yellow-500' : 'text-white'
                                }`}>
                                  Week {phase.week}: {phase.title}
                                </h4>
                                {phase.status === 'current' && (
                                  <div className="px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded-full text-xs font-medium">
                                    Current
                                  </div>
                                )}
                              </div>
                              <p className="text-sm text-gray-400 mb-3">{phase.description}</p>
                              <div className="p-3 bg-black/20 rounded-lg border-l-2 border-yellow-500/50">
                                <p className="text-sm italic text-gray-300">{phase.lore}</p>
                              </div>
                              
                              {/* Progress indicator for current week */}
                              {phase.status === 'current' && (
                                <div className="mt-3">
                                  <div className="flex justify-between text-xs mb-1">
                                    <span>Week Progress</span>
                                    <span>85%</span>
                                  </div>
                                  <div className="w-full bg-white/10 rounded-full h-2">
                                    <div className="bg-yellow-500 h-2 rounded-full" style={{ width: '85%' }}></div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Current Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="p-4 bg-white/10 rounded-xl border border-white/20 text-center">
                    <div className="text-2xl font-bold text-yellow-500">{profileData.stats.streakDays}</div>
                    <div className="text-sm text-gray-400">Day Streak</div>
                  </div>
                  <div className="p-4 bg-white/10 rounded-xl border border-white/20 text-center">
                    <div className="text-2xl font-bold text-white">{profileData.stats.ritualsCompleted}</div>
                    <div className="text-sm text-gray-400">Completed</div>
                  </div>
                  <div className="p-4 bg-white/10 rounded-xl border border-white/20 text-center">
                    <div className="text-2xl font-bold text-white">3</div>
                    <div className="text-sm text-gray-400">Week</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Connections Widget Modal - Enhanced with Tabs and Request Management */}
      {focusWidget === 'connections' && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setFocusWidget(null)}>
          <div className="bg-gray-900/95 backdrop-blur-xl border border-white/20 rounded-2xl w-full max-w-4xl h-[75vh] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            
            {/* Modal Header */}
            <div className="p-6 border-b border-white/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Users className="w-6 h-6 text-white" />
                  <div>
                    <h2 className="text-xl font-bold">Connection Hub</h2>
                    <p className="text-sm text-gray-400">Your campus network and community connections</p>
                  </div>
                </div>
                <button onClick={() => setFocusWidget(null)} className="w-10 h-10 bg-black/80 hover:bg-white/10 rounded-xl flex items-center justify-center transition-all duration-200 border border-white/10 hover:border-yellow-500">
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            <div className="flex h-[calc(75vh-100px)]">
              {/* Left Panel - Connections List */}
              <div className="w-2/3 p-6 border-r border-white/10 overflow-y-auto">
                <div className="space-y-6">
                  
                  {/* Tab Navigation */}
                  <div className="space-y-4">
                    <div className="flex gap-2 p-1 bg-white/5 rounded-lg border border-white/10">
                      {[
                        { id: 'connections', label: 'My Connections', count: 127 },
                        { id: 'recommendations', label: 'Recommendations', count: 15 },
                        { id: 'requests', label: 'Requests', count: 4 }
                      ].map((tab) => (
                        <button 
                          key={tab.id}
                          className={`flex-1 p-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                            tab.id === 'connections' 
                              ? 'bg-white/20 text-white border border-white/20' 
                              : 'text-gray-400 hover:text-white hover:bg-white/10'
                          }`}
                        >
                          {tab.label}
                          <span className="ml-2 px-1.5 py-0.5 bg-white/20 rounded-full text-xs">
                            {tab.count}
                          </span>
                        </button>
                      ))}
                    </div>
                    
                    {/* Search and Context Filters */}
                    <div className="space-y-3">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input 
                          type="text" 
                          placeholder="Search connections..."
                          className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:border-yellow-500 focus:outline-none text-white placeholder-gray-400 transition-all duration-200"
                        />
                      </div>
                      
                      <div className="flex gap-2 flex-wrap">
                        {['All Contexts', 'Same Dorm', 'Same Major', 'Shared Spaces', 'Study Partners'].map((filter) => (
                          <button key={filter} className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-200 ${
                            filter === 'All Contexts' 
                              ? 'bg-white/20 text-white border border-white/20' 
                              : 'bg-white/5 text-gray-400 border border-white/10 hover:border-yellow-500/50'
                          }`}>
                            {filter}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Connections Grid */}
                  <div className="grid grid-cols-2 gap-4">
                    {connections.map((connection) => (
                      <div key={connection.id} className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-200">
                        <div className="flex items-start gap-3">
                          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0 relative">
                            <User className="w-6 h-6 text-white" />
                            {connection.isOnline && (
                              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-black"></div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-white truncate">{connection.name}</h4>
                              {connection.isOnline && (
                                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                              )}
                            </div>
                            <p className="text-sm text-gray-400 truncate">{connection.title}</p>
                            <div className="flex items-center gap-1 mt-2">
                              <span className="text-xs text-gray-500">{connection.mutualSpaces} mutual spaces</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex gap-2 mt-3">
                          <button className="flex-1 px-3 py-1 bg-white/10 border border-white/20 hover:border-yellow-500 rounded-lg text-xs font-medium transition-all duration-200">
                            Message
                          </button>
                          <button className="px-3 py-1 bg-white/5 border border-white/10 hover:border-yellow-500 rounded-lg text-xs transition-all duration-200">
                            <User className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Right Panel - Connection Insights */}
              <div className="w-1/3 p-6 overflow-y-auto">
                <div className="space-y-6">
                  
                  {/* Quick Stats */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold">Network Overview</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="p-3 bg-white/10 rounded-lg border border-white/20 text-center">
                        <div className="text-xl font-bold text-white">{profileData.stats.connectionsCount}</div>
                        <div className="text-xs text-gray-400">Total Connections</div>
                      </div>
                      <div className="p-3 bg-white/10 rounded-lg border border-white/20 text-center">
                        <div className="text-xl font-bold text-green-500">24</div>
                        <div className="text-xs text-gray-400">Online Now</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Pending Requests */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold">Pending Requests</h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">Alex Rivera</div>
                            <div className="text-xs text-gray-400">CS Major</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 px-2 py-1 bg-white text-black rounded text-xs font-medium hover:bg-gray-100 transition-all duration-200">
                            Accept
                          </button>
                          <button className="flex-1 px-2 py-1 bg-white/10 border border-white/20 rounded text-xs font-medium hover:border-yellow-500 transition-all duration-200">
                            Decline
                          </button>
                        </div>
                      </div>
                      
                      <div className="p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center gap-2 mb-2">
                          <div className="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center">
                            <User className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium">Jordan Kim</div>
                            <div className="text-xs text-gray-400">Business</div>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <button className="flex-1 px-2 py-1 bg-white text-black rounded text-xs font-medium hover:bg-gray-100 transition-all duration-200">
                            Accept
                          </button>
                          <button className="flex-1 px-2 py-1 bg-white/10 border border-white/20 rounded text-xs font-medium hover:border-yellow-500 transition-all duration-200">
                            Decline
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <h4 className="text-lg font-semibold">Quick Actions</h4>
                    <div className="space-y-2">
                      <button className="w-full p-3 bg-white text-black hover:bg-gray-100 border border-white/20 hover:border-yellow-500 rounded-lg text-sm font-medium transition-all duration-200">
                        Find Study Partners
                      </button>
                      <button className="w-full p-3 bg-white/10 border border-white/20 hover:border-yellow-500 rounded-lg text-sm font-medium transition-all duration-200">
                        Browse Campus Network
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

const meta = {
  title: 'Profile/vBETA Profile System',
  component: CompleteProfileSystem,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      defaultViewport: 'desktop',
    },
    backgrounds: {
      default: 'hive-dark',
      values: [
        {
          name: 'hive-dark',
          value: '#000000',
        },
      ],
    },
    docs: {
      description: {
        component: `
# 🏠 HIVE Profile System vBETA

The complete HIVE Profile System featuring 6 core widgets in a responsive grid layout with monochrome design principles.

## 🎯 Enhanced Widget Layout (vBETA Specification)
- **Avatar Widget** (1x2): Full Profile Card with photo carousel, interests tags, detailed badges & stats
- **Spaces Widget** (1x1): Community Dashboard with leader tools and management  
- **Calendar Widget** (2x1): Weekly calendar view with event highlights
- **Ritual Widget** (1x1): Daily ritual tracking with streak counter
- **Connections Widget** (1x1): Connection hub with avatars
- **HiveLAB Widget** (1x1): Navigation to HiveLAB section (no modal)

## 🔒 Security Features
- **Username**: Non-editable (fixed after account creation)
- **School**: Non-editable (verified through login credentials)
- **Achievement Badges**: Earned through platform engagement

## 🎨 Design System
- **Colors**: Strict black/white/gold palette
- **Gold Usage**: Only for interactive outlines (hover/focus/active)
- **Typography**: Clean hierarchy with proper contrast
- **Spacing**: Consistent 4px base unit system

## ✨ Enhanced Modal Features
- **Avatar Modal**: Dynamic interests (8 categories), 4 achievement badges, comprehensive stats (8 metrics), photo management

## 📱 Responsive Design
- **Desktop**: 3-column grid layout optimized for 1440px+
- **Mobile**: Stacked layout with touch-friendly interactions
- **Accessibility**: WCAG AA compliant with proper focus management
        `
      },
      story: {
        inline: false,
        iframeHeight: '100vh',
      }
    },
  },
  argTypes: {
    editMode: {
      control: 'boolean',
      description: 'Toggle edit mode for profile management',
      defaultValue: false,
    },
    showWidgetLabels: {
      control: 'boolean', 
      description: 'Show widget type labels for debugging',
      defaultValue: false,
    },
    simulateLoading: {
      control: 'boolean',
      description: 'Simulate loading states for widgets',
      defaultValue: false,
    },
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CompleteProfileSystem>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story exports
export const DefaultView: Story = {
  render: (args) => <CompleteProfileSystem {...args} />,
  args: {
    editMode: false,
    showWidgetLabels: false,
    simulateLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Default profile system view with enhanced Avatar modal featuring interests, badges, and comprehensive stats.',
      },
    },
  },
};

export const EditMode: Story = {
  render: (args) => <CompleteProfileSystem {...args} />,
  args: {
    editMode: true,
    showWidgetLabels: false,
    simulateLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Edit mode allowing profile customization and widget configuration.',
      },
    },
  },
};

export const WithLabels: Story = {
  render: (args) => <CompleteProfileSystem {...args} />,
  args: {
    editMode: false,
    showWidgetLabels: true,
    simulateLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Development view with widget labels for identification during development.',
      },
    },
  },
};

export const LoadingState: Story = {
  render: (args) => <CompleteProfileSystem {...args} />,
  args: {
    editMode: false,
    showWidgetLabels: false,
    simulateLoading: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Loading state showing skeleton placeholders while data loads.',
      },
    },
  },
};

export const EditModeWithLabels: Story = {
  render: (args) => <CompleteProfileSystem {...args} />,
  args: {
    editMode: true,
    showWidgetLabels: true,
    simulateLoading: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Development view combining edit mode with widget labels for comprehensive testing.',
      },
    },
  },
};