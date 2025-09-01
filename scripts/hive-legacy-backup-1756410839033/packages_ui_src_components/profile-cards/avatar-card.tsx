'use client';

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from '../framer-motion-proxy';
import { cn } from '../lib/utils';
import { HiveCard } from '../hive-card';
import { HiveButton } from '../hive-button';
import { HiveBadge } from '../hive-badge';
import { HiveProgressBar } from '../hive-progress';
import { Avatar, AvatarImage, AvatarFallback } from '../../ui/avatar';
import { Camera, Upload, Sparkles, Trophy, Shield, Lock, Plus } from 'lucide-react';

export interface ProfileCompletionStatus {
  overall: number;
  sections: {
    basicInfo: { completed: boolean; label: string };
    academicInfo: { completed: boolean; label: string };
    interests: { completed: boolean; label: string };
    privacy: { completed: boolean; label: string };
  };
}

export interface AvatarCardProps {
  user: {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    isBuilder?: boolean;
    isVerifiedStudent?: boolean;
    campus?: string;
    gradYear?: string;
    major?: string;
    stats?: {
      spacesJoined: number;
      toolsUsed: number;
      connectionsCount: number;
    };
  };
  completionStatus?: ProfileCompletionStatus;
  showOnboarding?: boolean;
  isEditMode?: boolean;
  onPhotoUpload?: (file: File) => void;
  onGenerateAvatar?: () => void;
  onEditProfile?: () => void;
  onPrivacySettings?: () => void;
  className?: string;
}

const badgeVariants = {
  builder: {
    icon: Trophy,
    label: 'Builder',
    color: 'bg-[var(--hive-brand-secondary)]/20 text-[var(--hive-brand-secondary)] border-hive-gold/30',
  },
  verified: {
    icon: Shield,
    label: 'Verified Student',
    color: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  }
};

export const AvatarCard: React.FC<AvatarCardProps> = ({
  user,
  completionStatus,
  showOnboarding = false,
  isEditMode = false,
  onPhotoUpload,
  onGenerateAvatar,
  onEditProfile,
  onPrivacySettings,
  className
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && onPhotoUpload) {
      setIsUploading(true);
      try {
        await onPhotoUpload(file);
      } finally {
        setIsUploading(false);
      }
    }
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <Card 
      variant={user.isBuilder ? "gold-featured" : "elevated"}
      magneticHover={true}
      magneticIntensity="medium"
      interactive={true}
      className={cn('h-full flex flex-col', className)}
    >
      <div className="p-6 flex-1">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-[var(--hive-text-primary)]">Your Profile</h2>
          {isEditMode && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onEditProfile}
              className="text-[var(--hive-brand-secondary)] hover:text-[var(--hive-brand-secondary)]/80"
            >
              Edit
            </Button>
          )}
        </div>

        {/* Avatar Section */}
        <div className="flex flex-col items-center mb-6">
          <motion.div
            className="relative"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
          >
            <Avatar className="h-20 w-20 ring-2 ring-white/10">
              <AvatarImage 
                src={user.avatar} 
                alt={user.name}
                className="object-cover"
              />
              <AvatarFallback className="bg-gradient-to-br from-hive-gold/20 to-hive-gold/5 text-[var(--hive-brand-secondary)] text-xl font-semibold">
                {getInitials(user.name)}
              </AvatarFallback>
            </Avatar>

            {/* Upload Overlay */}
            <AnimatePresence>
              {(isHovered || isEditMode) && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 rounded-full bg-[var(--hive-background-primary)]/60 flex items-center justify-center"
                >
                  {isUploading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Upload className="h-5 w-5 text-[var(--hive-text-primary)]" />
                    </motion.div>
                  ) : (
                    <Camera className="h-5 w-5 text-[var(--hive-text-primary)]" />
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Photo Actions */}
            <AnimatePresence>
              {(isHovered || isEditMode) && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1"
                >
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={triggerFileUpload}
                    className="h-6 px-2 text-xs"
                    disabled={isUploading}
                  >
                    <Upload className="h-3 w-3" />
                  </Button>
                  {onGenerateAvatar && (
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={onGenerateAvatar}
                      className="h-6 px-2 text-xs"
                      disabled={isUploading}
                    >
                      <Sparkles className="h-3 w-3" />
                    </Button>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="hidden"
            />
          </motion.div>

          {/* Name & Basic Info */}
          <div className="text-center mt-4">
            <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-1">{user.name}</h3>
            {user.campus && (
              <p className="text-sm text-gray-400 mb-2">
                {user.major ? `${user.major} • ` : ''}{user.campus}
                {user.gradYear && ` '${user.gradYear.slice(-2)}`}
              </p>
            )}
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2 mt-2">
            {user.isBuilder && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
              >
                <Badge 
                  variant="tools-guru"
                  className={badgeVariants.builder.color}
                >
                  <badgeVariants.builder.icon className="h-3 w-3 mr-1" />
                  {badgeVariants.builder.label}
                </Badge>
              </motion.div>
            )}

            {user.isVerifiedStudent && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.3 }}
              >
                <Badge 
                  variant="deans-list"
                  className={badgeVariants.verified.color}
                >
                  <badgeVariants.verified.icon className="h-3 w-3 mr-1" />
                  {badgeVariants.verified.label}
                </Badge>
              </motion.div>
            )}
          </div>
        </div>

        {/* Profile Completion */}
        {completionStatus && completionStatus.overall < 100 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <div className="mb-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-[var(--hive-text-primary)]">Profile Completion</span>
                <span className="text-sm text-[var(--hive-brand-secondary)] font-medium">
                  {completionStatus.overall}%
                </span>
              </div>
              <HiveProgressBar
                value={completionStatus.overall}
                className="h-2"
              />
            </div>

            {/* Completion Tasks */}
            <div className="space-y-2">
              {completionStatus.sections && Object.entries(completionStatus.sections).map(([key, section]) => (
                !section.completed && (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2 text-xs"
                  >
                    <Plus className="h-3 w-3 text-[var(--hive-brand-secondary)]" />
                    <span className="text-gray-300">Add {section.label}</span>
                  </motion.div>
                )
              ))}
            </div>
          </motion.div>
        )}

        {/* Quick Stats */}
        {user.stats && (
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-lg font-semibold text-[var(--hive-text-primary)]">
                {user.stats.spacesJoined}
              </div>
              <div className="text-xs text-gray-400">Spaces</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-[var(--hive-text-primary)]">
                {user.stats.toolsUsed}
              </div>
              <div className="text-xs text-gray-400">Tools</div>
            </div>
            <div>
              <div className="text-lg font-semibold text-[var(--hive-text-primary)]">
                {user.stats.connectionsCount}
              </div>
              <div className="text-xs text-gray-400 flex items-center justify-center gap-1">
                Connections
                <Lock className="h-3 w-3" />
              </div>
            </div>
          </div>
        )}

        {/* Onboarding Banner */}
        <AnimatePresence>
          {showOnboarding && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 p-3 rounded-lg bg-[var(--hive-brand-secondary)]/10 border border-hive-gold/20"
            >
              <p className="text-xs text-[var(--hive-brand-secondary)] text-center">
                Complete your profile to unlock more HIVE features
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t border-white/10">
        <div className="flex gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={onEditProfile}
            className="flex-1"
          >
            Edit Profile
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={onPrivacySettings}
            className="px-3"
          >
            <Lock className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default AvatarCard;