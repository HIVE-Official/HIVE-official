'use client';

/**
 * FileUpload - Image/video upload component with drag-drop
 *
 * Features:
 * - Drag-and-drop file upload
 * - Click to upload fallback
 * - Preview thumbnail grid (1-4 files)
 * - File validation (type, size)
 * - Remove uploaded files
 * - Mobile-optimized touch targets
 *
 * Usage:
 * ```tsx
 * import { FileUpload } from '@hive/ui';
 *
 * const [files, setFiles] = useState<File[]>([]);
 *
 * <FileUpload
 *   files={files}
 *   onChange={setFiles}
 *   maxFiles={4}
 *   maxSize={10 * 1024 * 1024} // 10MB
 *   accept="image/*,video/*"
 * />
 * ```
 */

import * as React from 'react';
import { cn } from '../../../lib/utils';
import { UploadIcon, XIcon, ImageIcon, VideoIcon, FileIcon } from '../../00-Global/atoms/icon-library';

const formatFileSizeLimit = (bytes: number) =>
  (bytes / (1024 * 1024)).toFixed(0);

const isImageFile = (file: File) => file.type.startsWith('image/');
const isVideoFile = (file: File) => file.type.startsWith('video/');

const getFileIcon = (file: File) => {
  if (isImageFile(file)) return ImageIcon;
  if (isVideoFile(file)) return VideoIcon;
  return FileIcon;
};

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
}

const FilePreview = ({ file, onRemove }: FilePreviewProps) => {
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!isImageFile(file) && !isVideoFile(file)) {
      setPreviewUrl(null);
      return;
    }

    if (typeof window === 'undefined') {
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);

    return () => {
      URL.revokeObjectURL(url);
    };
  }, [file]);

  const Icon = getFileIcon(file);
  const isImage = isImageFile(file);
  const isVideo = isVideoFile(file);

  return (
    <div className="group relative aspect-square overflow-hidden rounded-lg border border-[var(--hive-border-default)] bg-[var(--hive-background-secondary)]">
      {/* Preview */}
      {isImage && previewUrl && (
        <img
          src={previewUrl}
          alt={file.name}
          className="h-full w-full object-cover"
        />
      )}
      {isVideo && previewUrl && (
        <video
          src={previewUrl}
          className="h-full w-full object-cover"
          muted
        />
      )}
      {!isImage && !isVideo && (
        <div className="flex h-full w-full items-center justify-center">
          <Icon className="h-12 w-12 text-[var(--hive-text-tertiary)]" />
        </div>
      )}

      {/* Remove button */}
      <button
        type="button"
        onClick={onRemove}
        className="absolute top-2 right-2 flex h-11 w-11 min-h-[44px] min-w-[44px] items-center justify-center rounded-full bg-[var(--hive-background-primary)]/90 text-[var(--hive-text-primary)] opacity-0 transition-opacity hover:bg-[var(--hive-status-error)] focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--hive-interactive-focus)] group-hover:opacity-100"
        aria-label={`Remove ${file.name}`}
      >
        <XIcon className="h-4 w-4" />
      </button>

      {/* File name (truncated) */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-2">
        <p className="truncate text-xs text-white">{file.name}</p>
      </div>
    </div>
  );
};

export interface FileUploadProps {
  /**
   * Current uploaded files
   */
  files: File[];

  /**
   * Callback when files change (add or remove)
   */
  onChange: (files: File[]) => void;

  /**
   * Maximum number of files allowed
   * @default 4
   */
  maxFiles?: number;

  /**
   * Maximum file size in bytes
   * @default 10485760 (10MB)
   */
  maxSize?: number;

  /**
   * Accepted file types (MIME types)
   * @default "image/*,video/*"
   */
  accept?: string;

  /**
   * Disabled state
   */
  disabled?: boolean;

  /**
   * Additional class names
   */
  className?: string;

  /**
   * Custom error handler
   */
  onError?: (error: string) => void;
}

export const FileUpload = React.forwardRef<HTMLDivElement, FileUploadProps>(
  (
    {
      files,
      onChange,
      maxFiles = 4,
      maxSize = 10 * 1024 * 1024, // 10MB
      accept = 'image/*,video/*',
      disabled = false,
      className,
      onError,
    },
    ref
  ) => {
    const [isDragging, setIsDragging] = React.useState(false);
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Handle file selection
    const handleFiles = React.useCallback(
      (newFiles: FileList | null) => {
        if (!newFiles || disabled) return;

        const filesArray = Array.from(newFiles);

        // Validate file count
        if (files.length + filesArray.length > maxFiles) {
          onError?.(
            `Maximum ${maxFiles} file${maxFiles === 1 ? '' : 's'} allowed`
          );
          return;
        }

        // Validate file sizes
        const oversizedFiles = filesArray.filter((file) => file.size > maxSize);
        if (oversizedFiles.length > 0) {
          const sizeMB = formatFileSizeLimit(maxSize);
          onError?.(`Files must be smaller than ${sizeMB}MB`);
          return;
        }

        // Add new files
        onChange([...files, ...filesArray]);
      },
      [files, maxFiles, maxSize, disabled, onChange, onError]
    );

    // Handle drag events
    const handleDragEnter = React.useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (!disabled) setIsDragging(true);
      },
      [disabled]
    );

    const handleDragLeave = React.useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
      },
      []
    );

    const handleDragOver = React.useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    }, []);

    const handleDrop = React.useCallback(
      (e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);

        if (!disabled) {
          handleFiles(e.dataTransfer.files);
        }
      },
      [disabled, handleFiles]
    );

    // Handle click to upload
    const handleClick = () => {
      if (!disabled) {
        inputRef.current?.click();
      }
    };

    // Handle file input change
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(e.target.files);
      // Reset input value so same file can be selected again
      e.target.value = '';
    };

    // Remove a file
    const removeFile = (index: number) => {
      if (disabled) return;
      onChange(files.filter((_, i) => i !== index));
    };

    return (
      <div ref={ref} className={cn('space-y-3', className)}>
        {/* Upload area */}
        <div
          className={cn(
            'relative flex min-h-[160px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors',
            isDragging
              ? 'border-[var(--hive-brand-primary)] bg-[var(--hive-brand-primary)]/5'
              : 'border-[var(--hive-border-default)] hover:border-[var(--hive-brand-primary)]/50',
            disabled && 'cursor-not-allowed opacity-50',
            files.length >= maxFiles && 'hidden' // Hide when max files reached
          )}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          onClick={handleClick}
        >
          <input
            ref={inputRef}
            type="file"
            multiple
            accept={accept}
            onChange={handleInputChange}
            disabled={disabled}
            className="hidden"
            aria-label="Upload files"
          />

          <UploadIcon className="h-10 w-10 mb-3 text-[var(--hive-text-tertiary)]" />

          <p className="text-sm font-medium text-[var(--hive-text-primary)]">
            {isDragging ? 'Drop files here' : 'Drag & drop or click to upload'}
          </p>

          <p className="mt-1 text-xs text-[var(--hive-text-tertiary)]">
            {accept.includes('image') && 'Images'}
            {accept.includes('image') && accept.includes('video') && ' & '}
            {accept.includes('video') && 'Videos'} • Max {maxFiles} files • Up to{' '}
            {formatFileSizeLimit(maxSize)}MB each
          </p>
        </div>

        {/* Preview grid */}
        {files.length > 0 && (
          <div
            className={cn(
              'grid gap-3',
              files.length === 1 && 'grid-cols-1',
              files.length === 2 && 'grid-cols-2',
              files.length >= 3 && 'grid-cols-2 sm:grid-cols-3 md:grid-cols-4'
            )}
          >
            {files.map((file, index) => (
              <FilePreview
                key={`${file.name}-${index}`}
                file={file}
                onRemove={() => removeFile(index)}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
);

FileUpload.displayName = 'FileUpload';
