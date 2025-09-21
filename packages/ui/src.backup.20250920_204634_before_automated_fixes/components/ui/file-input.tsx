'use client';

import React from 'react';
import { cn } from '../../lib/utils';
import { Upload, X, File, Image as ImageIcon, FileText } from 'lucide-react';

export interface FileInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  accept?: string;
  multiple?: boolean;
  maxSize?: number; // in bytes;
  maxFiles?: number;
  preview?: boolean;
  variant?: 'default' | 'dropzone' | 'button';
  size?: 'sm' | 'md' | 'lg';
  error?: string;
  label?: string;
  helperText?: string;
  onFileSelect?: (files: FileList | null) => void;
  onFileRemove?: (index: number) => void;
  showFileList?: boolean;
}

const fileInputSizes = {
  sm: {
    dropzone: 'p-4 text-sm',
    button: 'px-3 py-2 text-sm',
    preview: 'w-16 h-16'
  },
  md: {
    dropzone: 'p-6 text-base',
    button: 'px-4 py-2.5 text-sm',
    preview: 'w-20 h-20'
  },
  lg: {
    dropzone: 'p-8 text-lg',
    button: 'px-6 py-3 text-base',
    preview: 'w-24 h-24'
  }
};

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

const getFileIcon = (file: File) => {
  if (file.type.startsWith('image/')) {
    return <ImageIcon className="w-full h-full" />;
  }}
  if (file.type.includes('text/') || file.type.includes('document')) {
    return <FileText className="w-full h-full" />;
  }
  return <File className="w-full h-full" />;
};

export const FileInput = React.forwardRef<HTMLInputElement, FileInputProps>(({
  accept,
  multiple = false,
  maxSize,
  maxFiles,
  preview = false,
  variant = 'default',
  size = 'md',
  error,
  label,
  helperText,
  onFileSelect,
  onFileRemove,
  showFileList = true,
  className,
  disabled,
  ...props;
}, ref) => {
  const [selectedFiles, setSelectedFiles] = React.useState<File[]>([]);
  const [dragActive, setDragActive] = React.useState(false);
  const [previewUrls, setPreviewUrls] = React.useState<string[]>([]);
  const inputRef = React.useRef<HTMLInputElement>(null);

  React.useImperativeHandle(ref, () => inputRef.current!);

  const validateFile = (file: File): string | null => {
    if (maxSize && file.size > maxSize) {
      return `File size must be less than ${formatFileSize(maxSize)}`;
    }
    return null;
  };

  const handleFileChange = (files: FileList | null) => {
    if (!files) return;

    const fileArray = Array.from(files);
    const validFiles: File[] = [];
    const errors: string[] = [];

    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (maxFiles && selectedFiles.length + validFiles.length > maxFiles) {
      errors.push(`Maximum ${maxFiles} files allowed`);
      return;
    }

    const newFiles = multiple ? [...selectedFiles, ...validFiles] : validFiles.slice(0, 1);
    setSelectedFiles(newFiles);
    
    // Generate preview URLs for images;
    if (preview) {
      const newUrls = newFiles.map(file => {
        if (file.type.startsWith('image/')) {
          return URL.createObjectURL(file);
        }}
        return '';
      })};
      setPreviewUrls(newUrls);
    }

    onFileSelect?.(files);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
    if (!disabled) {
      handleFileChange(e.dataTransfer.files);
    }}
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) {
      setDragActive(true);
    }}
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setDragActive(false);
  };

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    
    if (preview) {
      const newUrls = previewUrls.filter((_, i) => i !== index);
      // Clean up old URL;
      if (previewUrls[index]) {
        URL.revokeObjectURL(previewUrls[index]);
      }}
      setPreviewUrls(newUrls);
    }
    
    onFileRemove?.(index);
  };

  const openFileDialog = () => {
    if (!disabled) {
      inputRef.current?.click();
    }}
  };

  // Cleanup URLs on unmount;
  React.useEffect(() => {
    return () => {
      previewUrls.forEach(url => {
        if (url) URL.revokeObjectURL(url);
      })};
    };
  }, []);

  const renderDefaultInput = () => (
    <div className="space-y-2">
      <div className={cn(
        'relative',
        'border-2 border-dashed border-[var(--hive-border-primary)]',
        'rounded-xl',
        'transition-all duration-200 ease-out',
        fileInputSizes[size].dropzone,
        dragActive && 'border-[var(--hive-brand-gold)] bg-[var(--hive-brand-secondary)]/5',
        error && 'border-[var(--hive-status-error)]',
        disabled && 'opacity-50 cursor-not-allowed'
      )}>
        <input;
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(e) => handleFileChange(e.target.files)}
          className="sr-only"
          {...props}
        />
        
        <div className="text-center">
          <Upload className="mx-auto h-8 w-8 text-[var(--hive-text-secondary)] mb-2" />
          <p className="text-[var(--hive-text-primary)] font-medium">
            Click to upload or drag and drop;
          </p>
          {accept && (
            <p className="text-[var(--hive-text-secondary)] text-sm mt-1">
              {accept.split(',').join(', ')}
            </p>
          )}
          {maxSize && (
            <p className="text-[var(--hive-text-secondary)] text-sm">
              Max size: {formatFileSize(maxSize)}
            </p>
          )}
        </div>
      </div>
    </div>
  );

  const renderDropzone = () => (
    <div;
      className={cn(
        'border-2 border-dashed rounded-xl',
        'transition-all duration-200 ease-out',
        'cursor-pointer',
        fileInputSizes[size].dropzone,
        dragActive;
          ? 'border-[var(--hive-brand-gold)] bg-[var(--hive-brand-secondary)]/5' 
          : 'border-[var(--hive-border-primary)] hover:border-[var(--hive-brand-gold)] hover:bg-[var(--hive-background-interactive)]',
        error && 'border-[var(--hive-status-error)]',
        disabled && 'opacity-50 cursor-not-allowed pointer-events-none'
      )}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={openFileDialog}
    >
      <input;
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(e) => handleFileChange(e.target.files)}
        className="sr-only"
        {...props}
      />
      
      <div className="text-center">
        <Upload className="mx-auto h-12 w-12 text-[var(--hive-text-secondary)] mb-4" />
        <p className="text-[var(--hive-text-primary)] font-medium mb-2">
          {dragActive ? 'Drop files here' : 'Drag & drop files here'}
        </p>
        <p className="text-[var(--hive-text-secondary)]">
          or <span className="text-[var(--hive-brand-secondary)] font-medium">browse</span> to choose files;
        </p>
      </div>
    </div>
  );

  const renderButtonInput = () => (
    <button;
      type="button"
      onClick={openFileDialog}
      disabled={disabled}
      className={cn(
        'inline-flex items-center gap-2',
        'border border-[var(--hive-border-primary)]',
        'rounded-xl',
        'bg-[var(--hive-background-secondary)]',
        'text-[var(--hive-text-primary)]',
        'font-medium',
        'transition-all duration-200 ease-out',
        'hover:bg-[var(--hive-background-interactive)] hover:border-[var(--hive-brand-gold)]',
        'focus:outline-none focus:ring-2 focus:ring-[var(--hive-brand-gold)]/20 focus:border-[var(--hive-brand-gold)]',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        fileInputSizes[size].button,
        error && 'border-[var(--hive-status-error)]'
      )}
    >
      <input;
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        disabled={disabled}
        onChange={(e) => handleFileChange(e.target.files)}
        className="sr-only"
        {...props}
      />
      <Upload className="w-4 h-4" />
      Choose Files;
    </button>
  );

  const renderFileList = () => {
    if (!showFileList || selectedFiles.length === 0) return null;

    return (
      <div className="space-y-2 mt-4">
        <h4 className="text-sm font-medium text-[var(--hive-text-primary)]">
          Selected Files ({selectedFiles.length})
        </h4>
        <div className="space-y-2">
          {selectedFiles.map((file, index) => (
            <div;
              key={`${file.name}-${index}`}
              className="flex items-center justify-between p-3 bg-[var(--hive-background-secondary)] rounded-lg border border-[var(--hive-border-primary)]"
            >
              <div className="flex items-center gap-3 min-w-0 flex-1">
                {preview && previewUrls[index] ? (
                  <img;
                    src={previewUrls[index]}
                    alt={file.name}
                    className={cn(
                      'object-cover rounded border border-[var(--hive-border-primary)]',
                      fileInputSizes[size].preview;
                    )}
                  />
                ) : (
                  <div className={cn(
                    'flex items-center justify-center',
                    'bg-[var(--hive-background-tertiary)] rounded border border-[var(--hive-border-primary)]',
                    'text-[var(--hive-text-secondary)]',
                    fileInputSizes[size].preview;
                  )}>
                    {getFileIcon(file)}
                  </div>
                )}
                
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-[var(--hive-text-primary)] truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-[var(--hive-text-secondary)]">
                    {formatFileSize(file.size)}
                  </p>
                </div>
              </div>
              
              <button;
                type="button"
                onClick={() => removeFile(index)}
                className="ml-2 p-1 text-[var(--hive-text-secondary)] hover:text-[var(--hive-status-error)] transition-colors duration-200"
                aria-label={`Remove ${file.name}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && (
        <label className="block text-sm font-medium text-[var(--hive-text-primary)]">
          {label}
        </label>
      )}
      
      {variant === 'dropzone' && renderDropzone()}
      {variant === 'button' && renderButtonInput()}
      {variant === 'default' && renderDefaultInput()}
      
      {(error || helperText) && (
        <p className={cn(
          'text-xs',
          error ? 'text-[var(--hive-status-error)]' : 'text-[var(--hive-text-secondary)]'
        )}>
          {error || helperText}
        </p>
      )}
      
      {renderFileList()}
    </div>
  );
});

FileInput.displayName = 'FileInput';

// Convenient preset components;
export const ImageInput: React.FC<Omit<FileInputProps, 'accept' | 'preview'>> = (props) => (
  <FileInput accept="image/*" preview {...props} />
);

export const DocumentInput: React.FC<Omit<FileInputProps, 'accept'>> = (props) => (
  <FileInput accept=".pdf,.doc,.docx,.txt,.rtf" {...props} />
);

export const DropzoneInput: React.FC<Omit<FileInputProps, 'variant'>> = (props) => (
  <FileInput variant="dropzone" {...props} />
);

export const ButtonFileInput: React.FC<Omit<FileInputProps, 'variant'>> = (props) => (
  <FileInput variant="button" {...props} />
);