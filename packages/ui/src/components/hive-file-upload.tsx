"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';
import { liquidMetal, motionDurations, magneticHover, cascadeTiming } from '../motion/hive-motion-system';
import { 
  Upload, 
  X, 
  File, 
  Image, 
  Video, 
  Music, 
  FileText, 
  Archive, 
  Code,
  Check,
  AlertCircle,
  RefreshCw,
  Download,
  Eye
} from 'lucide-react';

// HIVE File Upload - Magnetic Drag & Drop with Liquid Metal Motion
// Sophisticated file upload with drag & drop, progress tracking, and visual feedback

const hiveFileUploadVariants = cva(
  // Base upload styles - matte obsidian glass
  "relative w-full border-2 border-dashed rounded-2xl transition-all",
  {
    variants: {
      variant: {
        default: "border-white/20 bg-[var(--hive-background-primary)]/20 hover:border-white/30 hover:bg-[var(--hive-background-primary)]/30",
        premium: "border-yellow-500/30 bg-yellow-500/5 hover:border-yellow-500/50 hover:bg-yellow-500/10",
        minimal: "border-white/10 bg-transparent hover:border-white/20",
      },
      
      state: {
        idle: "",
        dragOver: "border-yellow-500 bg-yellow-500/10 scale-[1.02]",
        uploading: "border-blue-500/50 bg-blue-500/5",
        success: "border-green-500/50 bg-green-500/5",
        error: "border-red-500/50 bg-red-500/5",
      },
      
      size: {
        sm: "p-6 min-h-32",
        default: "p-8 min-h-48",
        lg: "p-12 min-h-64",
      }
    },
    defaultVariants: {
      variant: "default",
      state: "idle",
      size: "default",
    },
  }
);

// File item animation variants
const fileItemVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: motionDurations.smooth,
      ease: liquidMetal.easing as any,
      type: "spring" as const,
      stiffness: 300,
      damping: 25,
    }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    y: -20,
    transition: {
      duration: motionDurations.quick,
      ease: liquidMetal.easing as any,
    }
  }
};

// Progress animation variants
const progressVariants = {
  initial: { width: "0%" },
  animate: (progress: number) => ({
    width: `${progress}%`,
    transition: {
      duration: 0.3,
      ease: liquidMetal.easing as any,
    }
  })
};

export interface FileUploadItem {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  status: 'pending' | 'uploading' | 'success' | 'error';
  progress: number;
  error?: string;
  url?: string;
  preview?: string
}

export interface HiveFileUploadProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onDrop'>,
    VariantProps<typeof hiveFileUploadVariants> {
  multiple?: boolean;
  accept?: string;
  maxSize?: number; // in bytes
  maxFiles?: number;
  disabled?: boolean;
  showPreview?: boolean;
  showProgress?: boolean;
  dragToReorder?: boolean;
  onFilesSelected?: (files: File[]) => void;
  onFileRemove?: (fileId: string) => void;
  onUpload?: (files: FileUploadItem[]) => Promise<void>;
  customUploadHandler?: (file: File) => Promise<{ url: string; [key: string]: any }>;
  allowedTypes?: string[];
  placeholder?: React.ReactNode;
  dropzoneText?: string;
  uploadText?: string
}

const HiveFileUpload = React.forwardRef<HTMLDivElement, HiveFileUploadProps>(
  ({ 
    className,
    variant,
    size,
    multiple = true,
    accept,
    maxSize = 10 * 1024 * 1024, // 10MB default
    maxFiles = 10,
    disabled = false,
    showPreview = true,
    showProgress = true,
    dragToReorder = false,
    onFilesSelected,
    onFileRemove,
    onUpload,
    customUploadHandler,
    allowedTypes,
    placeholder,
    dropzoneText = "Drop files here or click to browse",
    uploadText = "Upload Files",
    ...props 
  }, ref) => {
    
    const [files, setFiles] = useState<FileUploadItem[]>([]);
    const [dragOver, setDragOver] = useState(false);
    const [uploading, setUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    // Determine upload area state
    const uploadState = dragOver ? 'dragOver' : uploading ? 'uploading' : 'idle';
    
    // File type detection
    const getFileIcon = (type: string) => {
      if (type.startsWith('image/')) return <Image size={20} />;
      if (type.startsWith('video/')) return <Video size={20} />;
      if (type.startsWith('audio/')) return <Music size={20} />;
      if (type.includes('text/') || type.includes('document')) return <FileText size={20} />;
      if (type.includes('zip') || type.includes('rar') || type.includes('tar')) return <Archive size={20} />;
      if (type.includes('javascript') || type.includes('json') || type.includes('css')) return <Code size={20} />;
      return <File size={20} />
    };
    
    // File size formatting
    const formatFileSize = (bytes: number) => {
      if (bytes === 0) return '0 Bytes';
      const k = 1024;
      const sizes = ['Bytes', 'KB', 'MB', 'GB'];
      const i = Math.floor(Math.log(bytes) / Math.log(k));
      return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    };
    
    // File validation
    const validateFile = (file: File): string | null => {
      if (maxSize && file.size > maxSize) {
        return `File size exceeds ${formatFileSize(maxSize)}`
      }
      
      if (allowedTypes && !allowedTypes.some(type => file.type.startsWith(type))) {
        return `File type not allowed. Accepted types: ${allowedTypes.join(', ')}`
      }
      
      return null
    };
    
    // Generate file preview
    const generatePreview = useCallback((file: File): Promise<string | null> => {
      return new Promise((resolve) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => resolve(e.target?.result as string);
          reader.onerror = () => resolve(null);
          reader.readAsDataURL(file)
        } else {
          resolve(null)
        }
      })
    }, []);
    
    // Process selected files
    const processFiles = useCallback(async (fileList: FileList | File[]) => {
      const newFiles: FileUploadItem[] = [];
      const fileArray = Array.from(fileList);
      
      // Check file count limit
      if (files.length + fileArray.length > maxFiles) {
        console.warn(`Maximum ${maxFiles} files allowed`);
        return
      }
      
      for (const file of fileArray) {
        const error = validateFile(file);
        const preview = showPreview ? await generatePreview(file) : undefined;
        
        newFiles.push({
          id: `${Date.now()}-${Math.random()}`,
          file,
          name: file.name,
          size: file.size,
          type: file.type,
          status: error ? 'error' : 'pending',
          progress: 0,
          error,
          preview,
        })
      }
      
      setFiles(prev => [...prev, ...newFiles]);
      onFilesSelected?.(fileArray)
    }, [files.length, maxFiles, maxSize, allowedTypes, showPreview, onFilesSelected, generatePreview, validateFile]);
    
    // Drag and drop handlers
    const handleDragEnter = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!disabled) {
        setDragOver(true)
      }
    }, [disabled]);
    
    const handleDragLeave = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragOver(false)
    }, []);
    
    const handleDragOver = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation()
    }, []);
    
    const handleDrop = useCallback((e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setDragOver(false);
      
      if (!disabled) {
        const droppedFiles = e.dataTransfer.files;
        processFiles(droppedFiles)
      }
    }, [disabled, processFiles]);
    
    // File input change handler
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        processFiles(e.target.files);
        // Reset input value
        e.target.value = ''
      }
    }, [processFiles]);
    
    // Remove file
    const removeFile = useCallback((fileId: string) => {
      setFiles(prev => prev.filter(f => f.id !== fileId));
      onFileRemove?.(fileId)
    }, [onFileRemove]);
    
    // Upload files
    const uploadFiles = useCallback(async () => {
      const pendingFiles = files.filter(f => f.status === 'pending' || f.status === 'error');
      if (pendingFiles.length === 0) return;
      
      setUploading(true);
      
      try {
        if (customUploadHandler) {
          // Use custom upload handler
          for (const fileItem of pendingFiles) {
            setFiles(prev => prev.map(f => 
              f.id === fileItem.id 
                ? { ...f, status: 'uploading' as const, progress: 0 }
                : f
            ));
            
            try {
              const result = await customUploadHandler(fileItem.file);
              setFiles(prev => prev.map(f => 
                f.id === fileItem.id 
                  ? { ...f, status: 'success' as const, progress: 100, url: result.url }
                  : f
              ))
            } catch (error) {
              setFiles(prev => prev.map(f => 
                f.id === fileItem.id 
                  ? { ...f, status: 'error' as const, error: error instanceof Error ? error.message : 'Upload failed' }
                  : f
              ))
            }
          }
        } else if (onUpload) {
          // Use provided upload handler
          await onUpload(pendingFiles)
        } else {
          // Simulate upload with progress
          for (const fileItem of pendingFiles) {
            setFiles(prev => prev.map(f => 
              f.id === fileItem.id 
                ? { ...f, status: 'uploading' as const }
                : f
            ));
            
            // Simulate progress
            for (let progress = 0; progress <= 100; progress += 10) {
              await new Promise(resolve => setTimeout(resolve, 100));
              setFiles(prev => prev.map(f => 
                f.id === fileItem.id 
                  ? { ...f, progress }
                  : f
              ))
            }
            
            setFiles(prev => prev.map(f => 
              f.id === fileItem.id 
                ? { ...f, status: 'success' as const }
                : f
            ))
          }
        }
      } catch (error) {
        console.error('Upload error:', error)
      } finally {
        setUploading(false)
      }
    }, [files, customUploadHandler, onUpload]);
    
    // Open file browser
    const openFileBrowser = () => {
      if (!disabled) {
        fileInputRef.current?.click()
      }
    };
    
    const hasFiles = files.length > 0;
    const hasPendingFiles = files.some(f => f.status === 'pending' || f.status === 'error');
    
    return (
      <div
        ref={ref}
        className={cn(hiveFileUploadVariants({ variant, state: uploadState, size, className }))}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        {...props}
      >
        {/* Hidden file input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          accept={accept}
          onChange={handleInputChange}
          className="hidden"
          disabled={disabled}
        />
        
        {/* Upload Area */}
        {!hasFiles && (
          <motion.div
            className="text-center cursor-pointer"
            onClick={openFileBrowser}
            whileHover={!disabled ? { scale: 1.02 } : {}}
            whileTap={!disabled ? { scale: 0.98 } : {}}
          >
            <motion.div
              animate={dragOver ? { scale: 1.2, rotate: 10 } : { scale: 1, rotate: 0 }}
              transition={{ duration: motionDurations.quick }}
            >
              <Upload 
                size={48} 
                className={cn(
                  "mx-auto mb-4",
                  dragOver ? "text-yellow-400" : "text-[var(--hive-text-primary)]/60"
                )} 
              />
            </motion.div>
            
            <h3 className="text-xl font-semibold text-[var(--hive-text-primary)] mb-2">
              {dragOver ? "Drop files here" : "Upload Files"}
            </h3>
            
            <p className="text-[var(--hive-text-primary)]/60 mb-4">
              {dropzoneText}
            </p>
            
            {maxSize && (
              <p className="text-sm text-[var(--hive-text-primary)]/40">
                Maximum file size: {formatFileSize(maxSize)}
              </p>
            )}
            
            {allowedTypes && (
              <p className="text-sm text-[var(--hive-text-primary)]/40 mt-1">
                Accepted types: {allowedTypes.join(', ')}
              </p>
            )}
            
            {placeholder}
          </motion.div>
        )}
        
        {/* File List */}
        {hasFiles && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold text-[var(--hive-text-primary)]">
                Files ({files.length})
              </h4>
              
              <div className="flex space-x-2">
                <motion.button
                  className="px-4 py-2 bg-[var(--hive-text-primary)]/10 hover:bg-[var(--hive-text-primary)]/20 text-[var(--hive-text-primary)] rounded-xl transition-colors"
                  onClick={openFileBrowser}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Add More
                </motion.button>
                
                {hasPendingFiles && (
                  <motion.button
                    className="px-4 py-2 bg-yellow-500/20 hover:bg-yellow-500/30 text-yellow-400 rounded-xl transition-colors"
                    onClick={uploadFiles}
                    disabled={uploading}
                    whileHover={{ scale: uploading ? 1 : 1.02 }}
                    whileTap={{ scale: uploading ? 1 : 0.98 }}
                  >
                    {uploading ? (
                      <div className="flex items-center space-x-2">
                        <RefreshCw size={16} className="animate-spin" />
                        <span>Uploading...</span>
                      </div>
                    ) : (
                      uploadText
                    )}
                  </motion.button>
                )}
              </div>
            </div>
            
            <AnimatePresence mode="popLayout">
              {files.map((fileItem) => (
                <motion.div
                  key={fileItem.id}
                  className="bg-[var(--hive-background-primary)]/20 backdrop-blur-sm border border-white/10 rounded-xl p-4"
                  variants={fileItemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  layout
                >
                  <div className="flex items-start space-x-4">
                    {/* File Icon/Preview */}
                    <div className="shrink-0">
                      {fileItem.preview ? (
                        <img
                          src={fileItem.preview}
                          alt={fileItem.name}
                          className="w-12 h-12 object-cover rounded-lg border border-white/10"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-[var(--hive-text-primary)]/10 rounded-lg border border-white/10 flex items-center justify-center text-[var(--hive-text-primary)]/60">
                          {getFileIcon(fileItem.type)}
                        </div>
                      )}
                    </div>
                    
                    {/* File Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <h5 className="font-medium text-[var(--hive-text-primary)] truncate">
                          {fileItem.name}
                        </h5>
                        
                        <div className="flex items-center space-x-2 shrink-0 ml-2">
                          {/* Status Icon */}
                          {fileItem.status === 'success' && (
                            <Check size={16} className="text-green-400" />
                          )}
                          {fileItem.status === 'error' && (
                            <AlertCircle size={16} className="text-red-400" />
                          )}
                          {fileItem.status === 'uploading' && (
                            <RefreshCw size={16} className="text-blue-400 animate-spin" />
                          )}
                          
                          {/* Actions */}
                          {fileItem.url && (
                            <motion.button
                              className="text-[var(--hive-text-primary)]/60 hover:text-[var(--hive-text-primary)]/80 p-1"
                              onClick={() => window.open(fileItem.url, '_blank')}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Eye size={14} />
                            </motion.button>
                          )}
                          
                          <motion.button
                            className="text-[var(--hive-text-primary)]/60 hover:text-red-400 p-1"
                            onClick={() => removeFile(fileItem.id)}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                          >
                            <X size={14} />
                          </motion.button>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between text-sm text-[var(--hive-text-primary)]/60">
                        <span>{formatFileSize(fileItem.size)}</span>
                        <span className="capitalize">{fileItem.status}</span>
                      </div>
                      
                      {/* Error Message */}
                      {fileItem.error && (
                        <p className="text-sm text-red-400 mt-1">
                          {fileItem.error}
                        </p>
                      )}
                      
                      {/* Progress Bar */}
                      {showProgress && fileItem.status === 'uploading' && (
                        <div className="mt-2">
                          <div className="bg-[var(--hive-text-primary)]/10 rounded-full h-2 overflow-hidden">
                            <motion.div
                              className="bg-yellow-400 h-full rounded-full"
                              variants={progressVariants}
                              initial="initial"
                              animate="animate"
                              custom={fileItem.progress}
                            />
                          </div>
                          <div className="text-xs text-[var(--hive-text-primary)]/60 mt-1">
                            {fileItem.progress}%
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}
      </div>
    )
  }
);

HiveFileUpload.displayName = "HiveFileUpload";

// Hook for file upload management
export function useHiveFileUpload() {
  const [files, setFiles] = useState<FileUploadItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  
  const addFiles = useCallback((newFiles: File[]) => {
    const fileItems: FileUploadItem[] = newFiles.map(file => ({
      id: `${Date.now()}-${Math.random()}`,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      status: 'pending',
      progress: 0,
    }));
    
    setFiles(prev => [...prev, ...fileItems]);
    return fileItems
  }, []);
  
  const removeFile = useCallback((fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId))
  }, []);
  
  const updateFileStatus = useCallback((fileId: string, updates: Partial<FileUploadItem>) => {
    setFiles(prev => prev.map(f => 
      f.id === fileId ? { ...f, ...updates } : f
    ))
  }, []);
  
  const clearFiles = useCallback(() => {
    setFiles([])
  }, []);
  
  return {
    files,
    isUploading,
    setIsUploading,
    addFiles,
    removeFile,
    updateFileStatus,
    clearFiles,
  }
}

export { 
  HiveFileUpload,
  hiveFileUploadVariants
};