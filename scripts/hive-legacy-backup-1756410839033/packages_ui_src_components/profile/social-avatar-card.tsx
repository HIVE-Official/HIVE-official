/**
 * Social Avatar Card - Tinder-Style Profile Identity
 * Portrait design with swipe gestures and social context
 */

"use client";

import React, { useState, useRef } from 'react';
import { User, Settings, Edit3, Shield, Camera, ChevronLeft, ChevronRight, Calendar, MapPin, MessageCircle, Users, Trophy, Zap } from 'lucide-react';
import { cn } from '../lib/utils';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { motion } from '../../lib/motion';
import { butterClasses, getStaggerClass } from '../../lib/motion';
import '../../styles/social-profile.css';

interface SocialAvatarCardProps {
  user: {
    id: string;
    fullName: string;
    handle: string;
    bio?: string;
    avatar?: string;
    photos?: string[];
    major?: string;
    academicYear?: string;
    isBuilder: boolean;
    builderLevel?: string;
    toolsCreated?: number;
    campusImpact?: number;
    onlineStatus: 'online' | 'offline' | 'away' | 'studying';
    lastSeen?: string;
  };
  socialProof?: {
    mutualConnections: number;
    mutualFriends?: string[];
  };
  isOwn?: boolean;
  onEditProfile?: () => void;
  onPrivacySettings?: () => void;
  onPhotoUpload?: (file: File) => void;
  onConnect?: () => void;
  onMessage?: () => void;
  className?: string;
}

export function SocialAvatarCard({ 
  user, 
  socialProof,
  isOwn = false,
  onEditProfile,
  onPrivacySettings,
  onPhotoUpload,
  onConnect,
  onMessage,
  className 
}: SocialAvatarCardProps) {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isPhotoExpanded, setIsPhotoExpanded] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  
  const photos = user.photos || (user.avatar ? [user.avatar] : []);
  const hasMultiplePhotos = photos.length > 1;
  
  const handlePhotoNavigation = (direction: 'prev' | 'next') => {
    if (!hasMultiplePhotos) return;
    
    setCurrentPhotoIndex(prev => {
      if (direction === 'next') {
        return prev === photos.length - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? photos.length - 1 : prev - 1;
      }
    });
  };
  
  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onPhotoUpload) {
      onPhotoUpload(file);
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'var(--social-green)';
      case 'away': return 'var(--alert-orange)';
      case 'studying': return 'var(--campus-blue)';
      default: return 'var(--text-inactive)';
    }
  };
  
  const getStatusText = (status: string) => {
    switch (status) {
      case 'online': return 'Online now';
      case 'away': return 'Away';
      case 'studying': return 'Studying';
      case 'offline': return user.lastSeen ? `Last seen ${user.lastSeen}` : 'Offline';
      default: return '';
    }
  };


  return (
    <motion.div 
      className={cn(
        "portrait-avatar-card social-profile-card",
        butterClasses.card,
        className
      )}
      style={{ gridArea: 'avatar' }}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      whileHover={{ y: -4, scale: 1.01, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } }}
    >
        {/* Photo Container */}
        <motion.div 
          className="portrait-photo-container group photo-butter-hover"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        >
        {/* Photo Indicators */}
        {hasMultiplePhotos && (
          <motion.div 
            className="photo-indicators"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {photos.map((_, index) => (
              <motion.div
                key={index}
                className={cn("photo-indicator", {
                  active: index === currentPhotoIndex
                })}
                whileHover={{ scale: 1.2 }}
                animate={{ 
                  scale: index === currentPhotoIndex ? 1.1 : 1,
                  opacity: index === currentPhotoIndex ? 1 : 0.6
                }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              />
            ))}
          </motion.div>
        )}
        
        {/* Online Status Indicator */}
        <motion.div 
          className={cn("online-status status-butter", user.onlineStatus)}
          style={{ background: getStatusColor(user.onlineStatus) }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4, type: "spring", stiffness: 200, damping: 20 }}
          whileHover={{ scale: 1.1, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } }}
        />
        
        {/* Main Photo */}
        {photos[currentPhotoIndex] ? (
          <motion.img
            src={photos[currentPhotoIndex]}
            alt={`${user.fullName}`}
            className={cn("portrait-photo", butterClasses.image)}
            onClick={() => setIsPhotoExpanded(true)}
            whileHover={{ scale: 1.02, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }}
            whileTap={{ scale: 0.99, transition: { duration: 0.2 } }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
          />
        ) : (
          <motion.div 
            className="portrait-photo bg-gray-800 flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
            whileHover={{ scale: 1.02, transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] } }}
          >
            <User size={48} className="text-[var(--hive-text-muted)]" />
          </motion.div>
        )}
        
        {/* Photo Navigation */}
        {hasMultiplePhotos && (
          <>
            <motion.button
              onClick={() => handlePhotoNavigation('prev')}
              className={cn(
                "absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                butterClasses.button
              )}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 0, 0, 0.7)', transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <ChevronLeft size={16} className="text-[var(--hive-text-inverse)]" />
            </motion.button>
            <motion.button
              onClick={() => handlePhotoNavigation('next')}
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity",
                butterClasses.button
              )}
              whileHover={{ scale: 1.05, backgroundColor: 'rgba(0, 0, 0, 0.7)', transition: { duration: 0.3 } }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <ChevronRight size={16} className="text-[var(--hive-text-inverse)]" />
            </motion.button>
          </>
        )}
        
        {/* Photo Upload Overlay (Own Profile) */}
        {isOwn && (
          <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
            <ButtonEnhanced
              variant="secondary"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="bg-white/20 backdrop-blur-sm border-white/30"
            >
              <Camera size={16} className="mr-2" />
              Change Photo
            </ButtonEnhanced>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </div>
        )}
        
        {/* Swipe Hint */}
        {hasMultiplePhotos && (
          <motion.div 
            className="swipe-hint"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            Swipe for more photos
          </motion.div>
        )}
        </motion.div>
      
      {/* Profile Content */}
      <motion.div 
        className="portrait-content"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Name and Age */}
        <motion.div 
          className="flex items-baseline gap-3 mb-2"
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <h2 className="portrait-name">
            {user.fullName}
          </h2>
          {user.isBuilder && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.3, type: "spring", stiffness: 400, damping: 25 }}
              whileHover={{ scale: 1.1 }}
            >
              <Badge className="builder-badge badge-butter-enter">
                🏗️ Builder
              </Badge>
            </motion.div>
          )}
        </motion.div>
        
        {/* Academic Info */}
        <motion.div 
          className="portrait-details mb-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.3 }}
        >
          {user.academicYear && user.major ? (
            `${user.academicYear} • ${user.major}`
          ) : user.major ? (
            user.major
          ) : user.academicYear ? (
            user.academicYear
          ) : (
            `@${user.handle}`
          )}
        </motion.div>
        
        {/* Online Status */}
        <motion.div 
          className="flex items-center gap-2 mb-4"
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.3 }}
        >
          <motion.div 
            className="w-2 h-2 rounded-full"
            style={{ background: getStatusColor(user.onlineStatus) }}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.7, duration: 0.2, type: "spring", stiffness: 400, damping: 25 }}
            whileHover={{ scale: 1.5 }}
          />
          <span className="profile-caption text-tertiary">
            {getStatusText(user.onlineStatus)}
          </span>
        </motion.div>
        
        {/* Builder Stats */}
        {user.isBuilder && (user.toolsCreated || user.campusImpact) && (
          <motion.div 
            className="flex gap-6 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.3 }}
          >
            {user.toolsCreated && (
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="profile-caption font-semibold text-primary">
                  {user.toolsCreated}
                </div>
                <div className="profile-fine text-tertiary">
                  Tools Created
                </div>
              </motion.div>
            )}
            {user.campusImpact && (
              <motion.div 
                className="text-center"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="profile-caption font-semibold text-primary">
                  {user.campusImpact}
                </div>
                <div className="profile-fine text-tertiary">
                  Campus Impact
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
        
        {/* Bio */}
        {user.bio && (
          <motion.p 
            className="portrait-bio mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.3 }}
          >
            "{user.bio}"
          </motion.p>
        )}
        
        {/* Action Buttons */}
        <motion.div 
          className="flex gap-3 mt-2"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.3 }}
        >
          {isOwn ? (
            <>
              <motion.div 
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ButtonEnhanced 
                  onClick={onEditProfile}
                  className={cn("social-action-button flex-1", butterClasses.button)}
                >
                  <Edit3 size={16} />
                  Edit Profile
                </ButtonEnhanced>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ButtonEnhanced 
                  onClick={onPrivacySettings}
                  className={cn("social-action-button secondary", butterClasses.button)}
                  variant="secondary"
                >
                  <Shield size={16} />
                </ButtonEnhanced>
              </motion.div>
            </>
          ) : (
            <>
              <motion.div 
                className="flex-1"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ButtonEnhanced 
                  onClick={onConnect}
                  className={cn("social-action-button flex-1", butterClasses.button)}
                >
                  Connect
                </ButtonEnhanced>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <ButtonEnhanced 
                  onClick={onMessage}
                  className={cn("social-action-button secondary", butterClasses.button)} 
                  variant="secondary"
                >
                  Message
                </ButtonEnhanced>
              </motion.div>
            </>
          )}
        </motion.div>
        
        {/* Social Proof (for other profiles) */}
        {!isOwn && (
          <motion.div 
            className="social-proof mt-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.3 }}
          >
            <span className="social-count">{socialProof?.mutualConnections || 0}</span>
            <span> mutual connection{(socialProof?.mutualConnections || 0) === 1 ? '' : 's'}</span>
          </motion.div>
        )}
      </motion.div>
      
      {/* Expanded Photo Modal */}
      {isPhotoExpanded && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setIsPhotoExpanded(false)}
        >
          <img
            src={photos[currentPhotoIndex]}
            alt={`${user.fullName} - Photo ${currentPhotoIndex + 1}`}
            className="max-w-full max-h-full object-contain"
          />
          <button
            onClick={() => setIsPhotoExpanded(false)}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-[var(--hive-text-inverse)] hover:bg-white/30 transition-colors"
          >
            ×
          </button>
        </div>
      )}
    </motion.div>
  );
}

export default SocialAvatarCard;