"use client";

import { useState } from "react";
import { HiveCard } from "@hive/ui";
import Image from 'next/image';

interface CampusProfile {
  fullName: string;
  preferredName?: string;
  profilePhoto?: string;
  avatarUrl?: string;
  academicYear: 'freshman' | 'sophomore' | 'junior' | 'senior' | 'graduate' | 'other';
  major: string;
  housing: string;
  pronouns?: string;
  statusMessage?: string;
  isBuilder?: boolean;
  age?: number;
}

interface HiveAvatarCardProps {
  profile: CampusProfile;
  onEditProfile: () => void;
  className?: string;
}

export function HiveAvatarCard({ profile, onEditProfile, className = "" }: HiveAvatarCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  const displayPhoto = profile.profilePhoto || profile.avatarUrl;
  const initials = profile.fullName?.split(' ').map(n => n[0]).join('').toUpperCase() || 'U';
  const displayName = profile.preferredName || profile.fullName?.split(' ')[0] || profile.fullName;
  
  
  return (
    <div className={`h-full ${className}`}>
      <HiveCard 
        className="h-full p-0 bg-hive-background-tertiary border border-hive-brand-primary/20 overflow-hidden cursor-pointer hover:border-hive-brand-primary/40 hover:shadow-lg hover:shadow-hive-brand-primary/10 transition-all duration-300 ease-out group relative transform hover:scale-[1.02]"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={onEditProfile}
      >
        {/* Main Photo/Avatar Area */}
        <div className="relative h-full">
          {displayPhoto ? (
            // Photo Display
            <div className="relative h-full">
              <Image 
                src={displayPhoto} 
                alt={`${profile.fullName}'s profile`}
                fill
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Tinder-style gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            </div>
          ) : (
            // No Photo State
            <div className="w-full h-full bg-gradient-to-br from-hive-brand-primary/20 to-hive-brand-primary/10 flex items-center justify-center relative">
              <div className="text-center px-4">
                {/* Large Initials Circle */}
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-hive-brand-primary/30 to-hive-brand-primary/20 border-2 border-hive-brand-primary/40 flex items-center justify-center text-3xl font-bold text-hive-text-primary mx-auto mb-6 transition-all duration-300 ease-out group-hover:scale-110 group-hover:border-hive-brand-primary/60 group-hover:shadow-lg group-hover:shadow-hive-brand-primary/20">
                  {initials}
                </div>
                
                {/* Photo Upload Prompt */}
                <div className="text-base text-hive-brand-primary font-semibold mb-2 transition-all duration-300 group-hover:text-hive-brand-primary group-hover:scale-105">📷 Add Photo</div>
                <div className="text-sm text-hive-text-secondary transition-colors duration-300 group-hover:text-hive-text-primary">Upload or take photo</div>
              </div>
              
              {/* Subtle background pattern */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
            </div>
          )}
          
          {/* Bottom Info Overlay - Tinder Style */}
          <div className="absolute inset-x-0 bottom-0 p-4 transition-all duration-300 group-hover:translate-y-0">
            <div className="flex items-end justify-between">
              <div className="flex-1 min-w-0">
                {/* Name + Age + Builder Badge */}
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="text-lg font-bold text-white truncate transition-all duration-300 group-hover:text-white group-hover:scale-105">
                    {displayName}
                    {profile.age && <span className="font-normal">, {profile.age}</span>}
                  </h3>
                  
                  {profile.isBuilder && (
                    <div className="flex-shrink-0 px-2 py-1 bg-hive-brand-primary text-hive-background-primary rounded-md text-xs font-bold transition-all duration-300 group-hover:bg-hive-brand-primary group-hover:shadow-lg group-hover:scale-110">
                      🔨
                    </div>
                  )}
                </div>
                
                {/* Academic Info */}
                <p className="text-sm text-white/90 capitalize mb-1 truncate">
                  {profile.academicYear} • {profile.major}
                </p>
                
                {/* Housing Info (smaller) */}
                {profile.housing && (
                  <p className="text-xs text-white/70 truncate">
                    {profile.housing}
                  </p>
                )}
              </div>
            </div>
          </div>
          
          {/* Settings Gear - Top Right (Hover State) */}
          <div className={`absolute top-4 right-4 transition-all duration-300 ease-out ${isHovered ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 -translate-y-2'}`}>
            <div className="w-10 h-10 bg-black/50 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-black/60 hover:scale-110 transition-all duration-200">
              <span className="text-white text-lg">⚙️</span>
            </div>
          </div>
          
          {/* Center Photo Action (Hover State) */}
          <div className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ease-out ${isHovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
            <div className="bg-black/40 backdrop-blur-md rounded-2xl px-6 py-3 transition-all duration-300 hover:bg-black/50 hover:scale-105">
              <div className="text-center text-white">
                {displayPhoto ? (
                  <>
                    <div className="text-2xl mb-2 transition-transform duration-200 hover:scale-110">📷</div>
                    <div className="text-sm font-medium">Change Photo</div>
                  </>
                ) : (
                  <>
                    <div className="text-2xl mb-2 transition-transform duration-200 hover:scale-110">📷</div>
                    <div className="text-sm font-medium">Add Photo</div>
                    <div className="text-xs opacity-80 mt-1">Upload or take photo</div>
                  </>
                )}
              </div>
            </div>
          </div>
          
          {/* Click to Edit Hint - Bottom Right */}
          <div className={`absolute bottom-20 right-4 transition-all duration-300 ease-out ${isHovered ? 'opacity-100 translate-x-0 scale-100' : 'opacity-0 translate-x-4 scale-95'}`}>
            <div className="bg-black/70 backdrop-blur-md text-white text-xs px-3 py-2 rounded-lg font-medium transition-all duration-200 hover:bg-black/80 hover:scale-105">
              {displayPhoto ? 'Edit Profile ↗' : 'Complete Profile ↗'}
            </div>
          </div>
          
          {/* Mobile Touch Indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 md:hidden">
            <div className="w-12 h-1 bg-white/30 rounded-full" />
          </div>
        </div>
      </HiveCard>
    </div>
  );
}