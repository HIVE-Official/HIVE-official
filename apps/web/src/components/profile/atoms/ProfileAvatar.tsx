"use client";

import React, { useState } from 'react';
import { Camera, User } from 'lucide-react';

interface ProfileAvatarProps {
  user: {
    name: string;
    avatar?: string;
  };
  size?: 'sm' | 'md' | 'lg' | 'xl';
  isEditable?: boolean;
  onAvatarChange?: (file: File) => void;
  className?: string;
}

const sizeClasses = {
  sm: 'w-8 h-8 text-xs',
  md: 'w-12 h-12 text-sm', 
  lg: 'w-16 h-16 text-base',
  xl: 'w-24 h-24 text-lg'
};

const iconSizeClasses = {
  sm: 'w-3 h-3',
  md: 'w-4 h-4',
  lg: 'w-5 h-5', 
  xl: 'w-6 h-6'
};

export function ProfileAvatar({ 
  user, 
  size = 'md', 
  isEditable = false, 
  onAvatarChange,
  className = '' 
}: ProfileAvatarProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !onAvatarChange) return;

    setIsLoading(true);
    setHasError(false);

    try {
      await onAvatarChange(file);
    } catch {
      setHasError(true);
    } finally {
      setIsLoading(false);
    }
  };

  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className={`relative ${className}`}>
      <div className={`
        ${sizeClasses[size]} 
        rounded-full 
        flex items-center justify-center
        overflow-hidden
        ${isEditable ? 'cursor-pointer hover:opacity-80 transition-opacity touch-manipulation' : ''}
        ${hasError ? 'ring-2 ring-red-400' : ''}
        ${isLoading ? 'animate-pulse' : ''}
      `}>
        {user.avatar && !hasError ? (
          <img
            src={user.avatar}
            alt={`${user.name}'s avatar`}
            className="w-full h-full object-cover"
            onError={() => setHasError(true)}
          />
        ) : (
          <div className="w-full h-full bg-hive-brand-secondary flex items-center justify-center text-hive-text-primary font-medium">
            {initials || <User className={iconSizeClasses[size]} />}
          </div>
        )}
      </div>

      {isEditable && (
        <>
          <button
            className={`
              absolute -bottom-1 -right-1 
              w-8 h-8 sm:w-6 sm:h-6 bg-hive-gold text-hive-background-primary 
              rounded-full flex items-center justify-center
              hover:bg-hive-gold/90 transition-colors touch-manipulation
              ${isLoading ? 'animate-spin' : ''}
            `}
            onClick={() => document.getElementById('avatar-upload')?.click()}
            disabled={isLoading}
          >
            <Camera className="w-4 h-4 sm:w-3 sm:h-3" />
          </button>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={isLoading}
          />
        </>
      )}
    </div>
  );
}