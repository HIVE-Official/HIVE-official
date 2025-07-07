"use client";

import React from "react";
import { cn } from "../../lib/utils";

interface ProfileHeaderCardProps {
  fullName: string;
  handle?: string;
  avatarUrl?: string;
  major?: string;
  graduationYear?: number;
  isBuilder?: boolean;
  profileViews?: number;
  className?: string;
}

export function ProfileHeaderCard({
  fullName,
  handle,
  avatarUrl,
  major,
  graduationYear,
  isBuilder = false,
  profileViews = 0,
  className
}: ProfileHeaderCardProps) {
  return (
    <div className={cn("flex flex-col h-full", className)}>
      {/* Instagram-style Header Layout */}
      <div className="flex items-center gap-6 mb-6">
        {/* Large Avatar */}
        <div className="relative">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] overflow-hidden ring-2 ring-[#2A2A2A] ring-offset-2 ring-offset-[#111111]">
            {avatarUrl ? (
              <img 
                src={avatarUrl} 
                alt={fullName} 
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-[#FFD700] font-bold text-2xl">
                {fullName.charAt(0)}
              </div>
            )}
          </div>
          {isBuilder && (
            <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#FFD700] rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 text-black" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12L8 10L10 8L12 10L10 12Z M10 2L13 5L11 7L13 9L10 12L7 9L9 7L7 5L10 2Z"/>
              </svg>
            </div>
          )}
        </div>

        {/* Stats Preview */}
        <div className="flex-1 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">12</div>
            <div className="text-xs text-muted">tools</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">2.4k</div>
            <div className="text-xs text-muted">impact</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-foreground">85</div>
            <div className="text-xs text-muted">connections</div>
          </div>
        </div>
      </div>

      {/* Name and Bio */}
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-foreground font-display mb-1">
          {fullName}
        </h1>
        {handle && (
          <p className="text-muted text-sm font-mono mb-2">@{handle}</p>
        )}
        
        {/* Academic Info as Bio */}
        <div className="space-y-1">
          {major && (
            <p className="text-foreground text-sm leading-relaxed">
              📚 {major}
              {graduationYear && ` • Class of ${graduationYear}`}
            </p>
          )}
          {isBuilder && (
            <div className="flex items-center gap-2">
              <div className="inline-flex items-center gap-1 px-2 py-1 bg-[#FFD700]/10 border border-[#FFD700]/30 rounded-full text-[#FFD700] text-xs font-medium">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M10 12L8 10L10 8L12 10L10 12Z M10 2L13 5L11 7L13 9L10 12L7 9L9 7L7 5L10 2Z"/>
                </svg>
                HIVE Builder
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-auto grid grid-cols-2 gap-3">
        <button className="px-4 py-2 bg-[#FFD700] text-black rounded-lg font-medium text-sm hover:bg-[#FFD700]/90 transition-colors duration-[180ms]">
          Edit Profile
        </button>
        <button className="px-4 py-2 bg-[#2A2A2A] text-foreground rounded-lg font-medium text-sm hover:bg-[#2A2A2A]/80 transition-colors duration-[180ms]">
          Share
        </button>
      </div>

      {/* Privacy Status */}
      <div className="mt-3 flex items-center justify-center gap-2 text-xs text-muted">
        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        Profile is private • Social features coming soon
      </div>
    </div>
  );
}