"use client";

import { useState } from "react";
import { Card } from "@hive/ui";
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

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
      <motion.div
        className="h-full"
        whileHover={{
          scale: 1.02,
          y: -2,
          transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] }
        }}
        whileTap={{
          scale: 0.98,
          transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] }
        }}
      >
        <Card
          className="h-full p-0 bg-hive-background-tertiary border border-hive-border-default hover:border-hive-border-hover focus:border-hive-brand-primary overflow-hidden cursor-pointer group relative font-sans hover:shadow-hive-level3 hover:shadow-hive-gold-glow"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={onEditProfile}
        >
        {/* Main Photo/Avatar Area */}
        <div className="relative h-full">
          {displayPhoto ? (
            // Photo Display
            <div className="relative h-full">
              <Image src={displayPhoto}
                alt={`${profile.fullName}'s profile`}
                fill
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                loading="lazy"
              />
              
              {/* Tinder-style gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-hive-overlay-shadow-void via-hive-overlay-shadow-soft to-transparent" />
            </div>
          ) : (
            // No Photo State
            <div className="w-full h-full bg-gradient-to-br from-hive-overlay-gold-medium to-hive-overlay-gold-subtle flex items-center justify-center relative">
              <div className="text-center px-4">
                {/* Large Initials Circle */}
                <motion.div
                  className="w-24 h-24 rounded-full bg-gradient-to-br from-hive-brand-primary to-hive-background-interactive border-2 border-hive-brand-primary flex items-center justify-center text-3xl font-bold font-sans text-hive-text-primary mx-auto mb-6 shadow-hive-gold-glow"
                  whileHover={{
                    scale: 1.1,
                    boxShadow: "0 0 30px rgba(255, 215, 0, 0.4)",
                    transition: { duration: 0.25, ease: [0.23, 1, 0.32, 1] }
                  }}
                >
                  {initials}
                </motion.div>

                {/* Photo Upload Prompt */}
                <motion.div
                  className="text-base text-hive-brand-primary font-semibold font-sans mb-2"
                  whileHover={{
                    scale: 1.05,
                    transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] }
                  }}
                >📷 Add Photo</motion.div>
                <div className="text-sm text-hive-text-secondary font-sans group-hover:text-hive-text-primary transition-colors duration-300 ease-out">Upload or take photo</div>
              </div>
              
              {/* Subtle background pattern */}
              <div className="absolute inset-0 bg-gradient-to-t from-hive-overlay-white via-transparent to-transparent" />
            </div>
          )}
          
          {/* Bottom Info Overlay - Tinder Style */}
          <motion.div
            className="absolute inset-x-0 bottom-0 p-4"
            initial={{ y: 0 }}
            whileHover={{ y: -2 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
          >
            <div className="flex items-end justify-between">
              <div className="flex-1 min-w-0">
                {/* Name + Age + Builder Badge */}
                <div className="flex items-center gap-2 mb-1">
                  <motion.h3
                    className="text-lg font-bold font-sans text-hive-text-primary truncate"
                    whileHover={{
                      scale: 1.05,
                      transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] }
                    }}
                  >
                    {displayName}
                    {profile.age && <span className="font-normal">, {profile.age}</span>}
                  </motion.h3>

                  {profile.isBuilder && (
                    <motion.div
                      className="flex-shrink-0 px-2 py-1 bg-hive-brand-primary text-hive-brand-onGold rounded-md text-xs font-bold font-sans shadow-hive-gold-glow"
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 0 20px rgba(255, 215, 0, 0.4)",
                        transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] }
                      }}
                    >
                      🔨
                    </motion.div>
                  )}
                </div>

                {/* Academic Info */}
                <p className="text-sm text-hive-text-secondary font-sans capitalize mb-1 truncate">
                  {profile.academicYear} • {profile.major}
                </p>

                {/* Housing Info (smaller) */}
                {profile.housing && (
                  <p className="text-xs text-hive-text-tertiary font-sans truncate">
                    {profile.housing}
                  </p>
                )}
              </div>
            </div>
          </motion.div>
          
          {/* Settings Gear - Top Right (Hover State) */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute top-4 right-4"
                initial={{ opacity: 0, scale: 0.9, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: -8 }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              >
                <motion.div
                  className="w-10 h-10 bg-hive-overlay-shadow-medium hive-glass rounded-full flex items-center justify-center"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "var(--hive-overlay-shadow-deep)",
                    transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] }
                  }}
                >
                  <span className="text-hive-text-primary text-lg">⚙️</span>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Center Photo Action (Hover State) */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              >
                <motion.div
                  className="bg-hive-overlay-shadow-medium hive-glass rounded-2xl px-6 py-3"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "var(--hive-overlay-shadow-deep)",
                    transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] }
                  }}
                >
                  <div className="text-center text-hive-text-primary">
                    {displayPhoto ? (
                      <>
                        <motion.div
                          className="text-2xl mb-2"
                          whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] }
                          }}
                        >📷</motion.div>
                        <div className="text-sm font-medium font-sans">Change Photo</div>
                      </>
                    ) : (
                      <>
                        <motion.div
                          className="text-2xl mb-2"
                          whileHover={{
                            scale: 1.1,
                            transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] }
                          }}
                        >📷</motion.div>
                        <div className="text-sm font-medium font-sans">Add Photo</div>
                        <div className="text-xs text-hive-text-secondary font-sans mt-1">Upload or take photo</div>
                      </>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Click to Edit Hint - Bottom Right */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="absolute bottom-20 right-4"
                initial={{ opacity: 0, x: 16, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 16, scale: 0.95 }}
                transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
              >
                <motion.div
                  className="bg-hive-overlay-shadow-void hive-glass text-hive-text-primary text-xs px-3 py-2 rounded-lg font-medium font-sans"
                  whileHover={{
                    scale: 1.05,
                    backgroundColor: "var(--hive-overlay-shadow-deep)",
                    transition: { duration: 0.15, ease: [0.23, 1, 0.32, 1] }
                  }}
                >
                  {displayPhoto ? 'Edit Profile ↗' : 'Complete Profile ↗'}
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Mobile Touch Indicator */}
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 md:hidden">
            <div className="w-12 h-1 bg-hive-overlay-white rounded-full" />
          </div>
        </div>
        </Card>
      </motion.div>
    </div>
  );
}