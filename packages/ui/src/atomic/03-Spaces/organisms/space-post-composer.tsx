'use client';

import * as React from 'react';
import { cn } from '../../../lib/utils';
import { FeedComposerSheet, type MediaFile } from './feed-composer-sheet';
import { Switch } from '../../00-Global/atoms/switch';
import { Label } from '../../00-Global/atoms/label';

export interface SpacePostComposerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSubmit"> {
  spaceId: string;
  spaceName: string;
  spaceIcon?: string;
  spaceColor?: string;

  // Composer state
  open: boolean;
  onOpenChange: (open: boolean) => void;

  // Anonymous posting
  allowAnonymous?: boolean;
  defaultAnonymous?: boolean;

  // Submission
  onSubmit?: (data: {
    content: string;
    spaceId: string;
    media: MediaFile[];
    anonymous: boolean;
  }) => void;
  isSubmitting?: boolean;

  // Settings
  maxLength?: number;
  allowMedia?: boolean;
}

/**
 * SpacePostComposer
 *
 * Pre-configured post composer for a specific space.
 * - Space is pre-selected (not changeable)
 * - Optional anonymous posting toggle
 * - Wraps FeedComposerSheet with space context
 */
export const SpacePostComposer = React.forwardRef<HTMLDivElement, SpacePostComposerProps>(
  (
    {
      spaceId,
      spaceName,
      spaceIcon,
      spaceColor,
      open,
      onOpenChange,
      allowAnonymous = false,
      defaultAnonymous = false,
      onSubmit,
      isSubmitting = false,
      maxLength = 2000,
      allowMedia = true,
      className,
      ...props
    },
    ref
  ) => {
    const [isAnonymous, setIsAnonymous] = React.useState(defaultAnonymous);

    const handleSubmit = React.useCallback((data: {
      content: string;
      spaceId: string;
      media: MediaFile[];
    }) => {
      onSubmit?.({
        ...data,
        anonymous: isAnonymous,
      });
    }, [onSubmit, isAnonymous]);

    // Reset anonymous state when modal closes
    React.useEffect(() => {
      if (!open) {
        setIsAnonymous(defaultAnonymous);
      }
    }, [open, defaultAnonymous]);

    return (
      <div ref={ref} className={cn('', className)} {...props}>
        <FeedComposerSheet
          open={open}
          onOpenChange={onOpenChange}
          spaces={[
            {
              id: spaceId,
              name: spaceName,
              icon: spaceIcon,
              color: spaceColor,
            },
          ]}
          selectedSpaceId={spaceId}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          maxLength={maxLength}
          allowMedia={allowMedia}
          customFooter={
            allowAnonymous ? (
              <div className="flex items-center gap-3 rounded-lg border border-[var(--hive-border-primary)] bg-[var(--hive-background-secondary)] p-3">
                <div className="flex flex-1 items-center gap-2">
                  <Label
                    htmlFor="anonymous-toggle"
                    className="text-sm text-[var(--hive-text-secondary)] cursor-pointer"
                  >
                    Post anonymously
                  </Label>
                  <span className="text-xs text-[var(--hive-text-tertiary)]">
                    (only leaders can see your identity)
                  </span>
                </div>
                <Switch
                  id="anonymous-toggle"
                  checked={isAnonymous}
                  onCheckedChange={setIsAnonymous}
                />
              </div>
            ) : null
          }
        />
      </div>
    );
  }
);

SpacePostComposer.displayName = 'SpacePostComposer';
