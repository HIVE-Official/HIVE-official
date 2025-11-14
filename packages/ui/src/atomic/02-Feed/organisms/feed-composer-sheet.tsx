'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  Button,
  Textarea,
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  ImageIcon,
  XIcon,
  LoaderIcon,
} from '../../00-Global/atoms';

export interface ComposerSpace {
  id: string;
  name: string;
  icon?: string;
  color?: string;
}

export interface MediaFile {
  id: string;
  url: string;
  type: 'image' | 'video';
  name: string;
}

export interface FeedComposerSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  spaces: ComposerSpace[];
  selectedSpaceId?: string;
  onSpaceChange?: (spaceId: string) => void;
  onSubmit?: (data: { content: string; spaceId: string; media: MediaFile[] }) => void;
  isSubmitting?: boolean;
  maxLength?: number;
  allowMedia?: boolean;
  className?: string;
  /** Optional custom footer content area (e.g., anonymous toggle) */
  customFooter?: React.ReactNode;
}

export const FeedComposerSheet = React.forwardRef<HTMLDivElement, FeedComposerSheetProps>(
  (
    {
      open,
      onOpenChange,
      spaces,
      selectedSpaceId,
      onSpaceChange,
      onSubmit,
      isSubmitting = false,
      maxLength = 5000,
      allowMedia = true,
      className,
      customFooter,
    },
    ref
  ) => {
    const [content, setContent] = React.useState('');
    const [selectedSpace, setSelectedSpace] = React.useState(selectedSpaceId || '');
    const [mediaFiles, setMediaFiles] = React.useState<MediaFile[]>([]);
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const remainingChars = maxLength - content.length;
    const isValid = content.trim().length > 0 && selectedSpace && remainingChars >= 0;

    React.useEffect(() => {
      if (selectedSpaceId) {
        setSelectedSpace(selectedSpaceId);
      }
    }, [selectedSpaceId]);

    const handleSpaceChange = (value: string) => {
      setSelectedSpace(value);
      onSpaceChange?.(value);
    };

    const handleSubmit = () => {
      if (!isValid || isSubmitting) return;

      onSubmit?.({
        content: content.trim(),
        spaceId: selectedSpace,
        media: mediaFiles,
      });

      // Reset form
      setContent('');
      setMediaFiles([]);
    };

    const handleMediaUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
      const files = event.target.files;
      if (!files) return;

      const newFiles: MediaFile[] = Array.from(files).map((file, index) => ({
        id: `${Date.now()}-${index}`,
        url: URL.createObjectURL(file),
        type: file.type.startsWith('video/') ? 'video' : 'image',
        name: file.name,
      }));

      setMediaFiles((prev) => [...prev, ...newFiles].slice(0, 4)); // Max 4 files
    };

    const removeMedia = (id: string) => {
      setMediaFiles((prev) => prev.filter((file) => file.id !== id));
    };

    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent side="bottom" className={cn('max-h-[90vh] sm:max-w-2xl sm:mx-auto', className)} ref={ref}>
          <SheetHeader>
            <SheetTitle>Create Post</SheetTitle>
            <SheetDescription>
              Share your thoughts, photos, or updates with your spaces.
            </SheetDescription>
          </SheetHeader>

          <div className="flex flex-col gap-4 py-6">
            {/* Space Selector */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--hive-text-tertiary)]">
                Post to
              </label>
              <Select value={selectedSpace} onValueChange={handleSpaceChange}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select a space" />
                </SelectTrigger>
                <SelectContent>
                  {spaces.map((space) => (
                    <SelectItem key={space.id} value={space.id}>
                      <div className="flex items-center gap-2">
                        {space.icon && <span>{space.icon}</span>}
                        <span>{space.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Content Textarea */}
            <div className="flex flex-col gap-2">
              <label className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--hive-text-tertiary)]">
                What's on your mind?
              </label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Share something with your space..."
                className="min-h-[120px] resize-none"
                maxLength={maxLength}
                disabled={isSubmitting}
              />
              <div className="flex items-center justify-between">
                <span
                  className={cn(
                    'text-xs text-[var(--hive-text-tertiary)]',
                    remainingChars < 100 && 'text-yellow-400',
                    remainingChars < 0 && 'text-red-400'
                  )}
                >
                  {remainingChars} characters remaining
                </span>
              </div>
            </div>

            {/* Media Preview */}
            {mediaFiles.length > 0 && (
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {mediaFiles.map((file) => (
                  <div key={file.id} className="group relative aspect-square overflow-hidden rounded-lg border border-[var(--hive-border-default)]">
                    {file.type === 'image' ? (
                      <img
                        src={file.url}
                        alt={file.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <video
                        src={file.url}
                        className="h-full w-full object-cover"
                      />
                    )}
                    <button
                      onClick={() => removeMedia(file.id)}
                      className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white opacity-0 transition-opacity hover:bg-black/80 group-hover:opacity-100"
                    >
                      <XIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Media Upload Button */}
            {allowMedia && mediaFiles.length < 4 && (
              <div>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,video/*"
                  multiple
                  onChange={handleMediaUpload}
                  className="hidden"
                  disabled={isSubmitting}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isSubmitting}
                  className="w-full border border-dashed border-[var(--hive-border-default)] hover:border-[var(--hive-brand-primary)]/40"
                >
                  <ImageIcon className="mr-2 h-4 w-4" />
                  Add photos or videos ({4 - mediaFiles.length} remaining)
                </Button>
              </div>
            )}
          </div>

          {customFooter}
          <SheetFooter>
            <div className="flex w-full items-center justify-between gap-3">
              <Button
                variant="ghost"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                variant="brand"
                onClick={handleSubmit}
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <LoaderIcon className="mr-2 h-4 w-4 animate-spin" />
                    Posting...
                  </>
                ) : (
                  'Post'
                )}
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  }
);

FeedComposerSheet.displayName = 'FeedComposerSheet';
