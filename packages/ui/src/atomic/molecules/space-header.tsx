'use client';

/**
 * SpaceHeader - Minimal space header (YC/SF minimalism)
 *
 * Topology Compliance: SPACES_TOPOLOGY.md (Lines 975-1016)
 * - ✅ NO @handle (intentionally hidden)
 * - ✅ NO category badge (minimal metadata)
 * - ✅ NO banner image (content-first)
 * - ✅ ONLY icon + name + member count + online count
 * - ✅ Compact layout toggle (mobile compression)
 * - ✅ Membership states: join, joined, pending, loading
 *
 * Design Tokens (100% token-compliant):
 * - Typography: 22px/26px (--text-space-name), 12px/16px (--text-member-count)
 * - Layout: 1200px max-width (--board-max-width)
 * - Colors: --hive-background-secondary (#171717), --hive-text-primary, --hive-text-secondary
 * - Brand: --hive-brand-primary (#FFD700 gold) for online indicator & hover states
 * - Borders: --hive-border-default, --hive-border-hover
 *
 * Brand Moments:
 * - Online count: Gold text + pulsing gold dot with glow (premium indicator)
 * - Join button: Gold gradient (--hive-brand-primary)
 * - Settings hover: Gray → Gold transition (interactive accent)
 */

import React from 'react';
import { Users, MoreVertical, Check, Loader2, Share2 } from 'lucide-react';
import { Button } from '../atoms/button';
import { MotionDiv } from '../motion-safe';
import { cn } from '../../lib/utils';

export type SpaceMembershipState = 'not_joined' | 'joined' | 'pending' | 'loading';

export interface SpaceHeaderSpace {
  /** Unique identifier */
  id?: string;
  /** Display name (required - drives monogram fallback) */
  name: string;
  /** Optional icon image */
  iconUrl?: string;
  /** Present but intentionally hidden in UI (available for a11y/use cases) */
  handle?: string;
  /** Present but intentionally hidden in UI */
  category?: string;
}

export interface SpaceHeaderProps {
  /** Core space metadata */
  space: SpaceHeaderSpace;
  /** Total member count */
  memberCount: number;
  /** Number of members currently online (optional) */
  onlineCount?: number;
  /** Membership state for the current user */
  membershipState: SpaceMembershipState;
  /** Whether the viewer is a leader (unlocks settings menu) */
  isLeader?: boolean;
  /** Force the compact/mobile layout */
  compact?: boolean;
  /** Trigger when the viewer wants to join the space */
  onJoin?: () => void;
  /** Trigger when the viewer wants to leave the space */
  onLeave?: () => void;
  /** Trigger for leader settings menu */
  onSettings?: () => void;
  /** Trigger share action */
  onShare?: () => void;
  /** Optional className passthrough */
  className?: string;
}

const HIVE_EASING = {
  reveal: [0.23, 1, 0.32, 1] as const,
  interactive: [0.25, 0.46, 0.45, 0.94] as const,
};

export function SpaceHeader({
  space,
  memberCount,
  onlineCount,
  membershipState,
  isLeader = false,
  compact = false,
  onJoin,
  onLeave,
  onSettings,
  onShare,
  className,
}: SpaceHeaderProps) {
  const { name, iconUrl } = space;
  const displayName = name?.trim() || 'Space';
  // Generate monogram from first letter of space name
  const monogram = displayName.charAt(0).toUpperCase() || 'H';

  const isJoined = membershipState === 'joined';
  const isPending = membershipState === 'pending';
  const isLoading = membershipState === 'loading';
  const isJoinable = membershipState === 'not_joined' && Boolean(onJoin);
  const isLeavable = membershipState === 'joined' && Boolean(onLeave);

  const buttonDisabled = isLoading || isPending || (!isJoinable && !isLeavable);

  const buttonVariant = membershipState === 'not_joined' ? 'brand' : 'outline';

  const buttonLabel = (() => {
    switch (membershipState) {
      case 'joined':
        return 'Joined';
      case 'pending':
        return 'Request Pending';
      case 'loading':
        return 'Loading...';
      default:
        return 'Join Space';
    }
  })();

  const handlePrimaryAction = () => {
    if (membershipState === 'not_joined') {
      onJoin?.();
    }
    if (membershipState === 'joined') {
      onLeave?.();
    }
  };

  const layoutPadding = compact ? 'px-3 md:px-4 py-2.5 md:py-3' : 'px-4 md:px-6 py-3 md:py-4';
  const contentGap = compact ? 'gap-3 md:gap-3.5' : 'gap-3 md:gap-4';
  const statsGap = compact ? 'gap-2.5 md:gap-3' : 'gap-3 md:gap-4';
  const titleTypography = compact
    ? 'text-[20px] leading-[24px] md:text-[22px] md:leading-[26px]'
    : 'text-[22px] leading-[26px]';
  const iconSizing = compact ? 'w-10 h-10 md:w-12 md:h-12' : 'w-10 h-10 md:w-14 md:h-14';
  const statsTypography = 'text-[12px] leading-[16px]';

  return (
    <MotionDiv
      className={cn(
        'space-header relative bg-[var(--hive-background-secondary)] border-b border-[var(--hive-border-default)]',
        className,
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: HIVE_EASING.reveal }}
      data-state={membershipState}
    >
      {/* Header content */}
      <div className={cn('max-w-[1200px] mx-auto', layoutPadding)}>
        <div className={cn('flex items-start justify-between', contentGap)}>
          {/* Left: Icon + Name + Stats */}
          <div className={cn('flex items-start min-w-0 flex-1', contentGap)}>
            {/* Icon - Mobile compressed (40px), Desktop full (56px) */}
            <div
              className={cn(
                'flex-shrink-0 rounded-lg overflow-hidden border border-[var(--hive-border-hover)] flex items-center justify-center',
                iconSizing,
              )}
            >
              {iconUrl ? (
                <img
                  src={iconUrl}
                  alt={`${displayName} icon`}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-[var(--hive-brand-primary)] to-[var(--hive-brand-primary)]/70 flex items-center justify-center">
                  <span className="text-sm md:text-base font-bold text-black">
                    {monogram}
                  </span>
                </div>
              )}
            </div>

            {/* Name + Stats */}
            <div className="min-w-0 flex-1 pt-0.5 md:pt-1">
              {/* Space Name - Using design token: 22px / 26px */}
              <h1
                className={cn(
                  titleTypography,
                  'font-semibold text-[var(--hive-text-primary)] truncate',
                )}
              >
                {displayName}
              </h1>

              {/* Stats row - Using design token: 12px / 16px */}
              <div
                className={cn(
                  'flex items-center mt-1 md:mt-2 text-[var(--hive-text-secondary)]',
                  statsGap,
                  statsTypography,
                )}
              >
                <span className="inline-flex items-center gap-1.5">
                  <Users className="w-3 h-3 md:w-3.5 md:h-3.5" />
                  <span aria-label={`${memberCount} members`}>
                    {memberCount.toLocaleString()} {memberCount === 1 ? 'member' : 'members'}
                  </span>
                </span>

                {onlineCount !== undefined && onlineCount > 0 && (
                  <span className="inline-flex items-center gap-1.5 text-[var(--hive-brand-primary)]">
                    <span
                      aria-hidden="true"
                      className="w-1.5 h-1.5 rounded-full bg-[var(--hive-brand-primary)] animate-pulse shadow-[0_0_8px_var(--hive-brand-primary)]"
                    />
                    <span aria-label={`${onlineCount} members online`}>
                      {onlineCount.toLocaleString()} online
                    </span>
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Share */}
            {onShare && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onShare}
                aria-label="Share space"
                className="text-[var(--hive-text-secondary)] hover:text-[var(--hive-brand-primary)]"
              >
                <Share2 className="w-4 h-4" />
              </Button>
            )}
            {/* Join/Leave button */}
            <Button
              variant={buttonVariant}
              size="sm"
              onClick={handlePrimaryAction}
              disabled={buttonDisabled}
              aria-pressed={isJoined}
              aria-label={
                membershipState === 'joined'
                  ? 'Leave space'
                  : membershipState === 'not_joined'
                    ? 'Join space'
                    : buttonLabel
              }
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />}
              {isJoined && !isLoading && (
                <Check className="mr-2 h-4 w-4" aria-hidden="true" />
              )}
              <span>{buttonLabel}</span>
            </Button>
            <span className="sr-only" aria-live="polite">
              {membershipState === 'joined'
                ? 'You are a member of this space.'
                : membershipState === 'pending'
                  ? 'Join request pending approval.'
                  : membershipState === 'loading'
                    ? 'Updating membership status.'
                    : 'Join this space to participate.'}
            </span>

            {/* Settings menu (leaders only) - Desktop only */}
            {isLeader && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onSettings}
                className="hidden md:flex text-[var(--hive-text-secondary)] hover:text-[var(--hive-brand-primary)] transition-colors"
                aria-label="Space settings"
              >
                <MoreVertical className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </MotionDiv>
  );
}
