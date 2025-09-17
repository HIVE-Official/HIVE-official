import { z } from "zod";

// File Type Schema
export const FileTypeSchema = z.enum([
  'image',
  'video',
  'audio',
  'document',
  'archive',
  'code',
  'other'
]);

// File Purpose Schema
export const FilePurposeSchema = z.enum([
  'avatar',
  'cover_photo',
  'post_attachment',
  'tool_asset',
  'space_banner',
  'event_image',
  'ritual_attachment',
  'profile_media',
  'general_upload'
]);

// Upload Status Schema
export const UploadStatusSchema = z.enum([
  'pending',
  'uploading',
  'processing',
  'completed',
  'failed',
  'cancelled'
]);

// File Metadata Schema
export const FileMetadataSchema = z.object({
  // Basic properties
  filename: z.string().min(1).max(255),
  originalName: z.string().min(1).max(255),
  mimeType: z.string().min(1),
  size: z.number().min(0).max(100 * 1024 * 1024), // 100MB max
  
  // Content analysis
  dimensions: z.object({
    width: z.number().min(0),
    height: z.number().min(0)
  }).optional(), // For images/videos
  
  duration: z.number().min(0).optional(), // For audio/video in seconds
  
  // Hash and validation
  checksum: z.string().optional(),
  verified: z.boolean().default(false),
  
  // Processing info
  processedVersions: z.array(z.object({
    version: z.string(), // e.g., 'thumbnail', 'medium', 'compressed'
    url: z.string().url(),
    size: z.number().min(0),
    dimensions: z.object({
      width: z.number().min(0),
      height: z.number().min(0)
    }).optional()
  })).default([]),
  
  // Content safety
  safetyCheck: z.object({
    status: z.enum(['pending', 'safe', 'flagged', 'rejected']),
    confidence: z.number().min(0).max(1).optional(),
    flags: z.array(z.string()).default([]),
    reviewedAt: z.date().optional(),
    reviewedBy: z.string().optional()
  }).optional()
});

// File Upload Schema
export const FileUploadSchema = z.object({
  id: z.string().min(1),
  
  // Upload details
  uploadId: z.string().min(1), // Unique upload session ID
  status: UploadStatusSchema,
  
  // File info
  metadata: FileMetadataSchema,
  type: FileTypeSchema,
  purpose: FilePurposeSchema,
  
  // Storage
  url: z.string().url().optional(), // Final public URL
  storageLocation: z.string().optional(), // Internal storage path
  cdnUrl: z.string().url().optional(), // CDN URL if different
  
  // Access control
  uploadedBy: z.string().min(1),
  visibility: z.enum(['public', 'authenticated', 'private']),
  accessToken: z.string().optional(), // For private files
  
  // Usage tracking
  downloads: z.number().min(0).default(0),
  lastAccessed: z.date().optional(),
  
  // Lifecycle
  expiresAt: z.date().optional(),
  deletedAt: z.date().optional(),
  
  // Error handling
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.record(z.string(), z.any()).optional()
  }).optional(),
  
  // Processing
  processingStarted: z.date().optional(),
  processingCompleted: z.date().optional(),
  
  // Tags and organization
  tags: z.array(z.string()).max(10).default([]),
  description: z.string().max(500).optional(),
  
  // Context
  associatedWith: z.object({
    type: z.enum(['post', 'space', 'user', 'tool', 'event', 'ritual']),
    id: z.string().min(1)
  }).optional(),
  
  createdAt: z.date(),
  updatedAt: z.date()
});

// Upload Configuration Schema
export const UploadConfigSchema = z.object({
  // File restrictions
  maxFileSize: z.number().min(0).max(100 * 1024 * 1024).default(10 * 1024 * 1024), // 10MB default
  allowedTypes: z.array(z.string()).min(1), // MIME types
  allowedExtensions: z.array(z.string()).min(1),
  
  // Image-specific restrictions
  maxImageDimensions: z.object({
    width: z.number().min(0).default(4096),
    height: z.number().min(0).default(4096)
  }).optional(),
  
  // Processing options
  autoResize: z.boolean().default(false),
  generateThumbnails: z.boolean().default(false),
  compressImages: z.boolean().default(true),
  
  // Security options
  requireSafetyCheck: z.boolean().default(true),
  virusScan: z.boolean().default(true),
  
  // Storage options
  storageClass: z.enum(['standard', 'cold', 'archive']).default('standard'),
  enableCDN: z.boolean().default(true),
  
  // Access options
  defaultVisibility: z.enum(['public', 'authenticated', 'private']).default('authenticated'),
  signedUrlExpiry: z.number().min(60).max(7 * 24 * 60 * 60).default(3600) // 1 hour default
});

// Upload Session Schema
export const UploadSessionSchema = z.object({
  id: z.string().min(1),
  
  // Session details
  userId: z.string().min(1),
  purpose: FilePurposeSchema,
  
  // Configuration
  config: UploadConfigSchema,
  
  // Progress tracking
  totalFiles: z.number().min(0).default(0),
  completedFiles: z.number().min(0).default(0),
  failedFiles: z.number().min(0).default(0),
  
  // Upload tracking
  uploadedBytes: z.number().min(0).default(0),
  totalBytes: z.number().min(0).default(0),
  
  // Status
  status: z.enum(['active', 'completed', 'failed', 'cancelled']),
  
  // Files in session
  files: z.array(z.string()).default([]), // File IDs
  
  // Error handling
  errors: z.array(z.object({
    fileId: z.string().optional(),
    error: z.string(),
    timestamp: z.date()
  })).default([]),
  
  // Metadata
  userAgent: z.string().optional(),
  ipAddress: z.string().optional(),
  
  createdAt: z.date(),
  completedAt: z.date().optional()
});

// File Access Log Schema
export const FileAccessLogSchema = z.object({
  fileId: z.string().min(1),
  
  // Access details
  accessedBy: z.string().optional(), // User ID, or null for anonymous
  accessType: z.enum(['view', 'download', 'thumbnail', 'metadata']),
  
  // Context
  referrer: z.string().optional(),
  userAgent: z.string().optional(),
  ipAddress: z.string().optional(),
  
  // Response
  responseCode: z.number().min(100).max(599),
  bytesTransferred: z.number().min(0).default(0),
  
  createdAt: z.date()
});

// File Quota Schema
export const FileQuotaSchema = z.object({
  userId: z.string().min(1),
  
  // Quota limits
  maxStorage: z.number().min(0), // bytes
  maxFiles: z.number().min(0),
  maxDailyUploads: z.number().min(0),
  
  // Current usage
  usedStorage: z.number().min(0).default(0),
  usedFiles: z.number().min(0).default(0),
  dailyUploads: z.number().min(0).default(0),
  
  // Quota period
  dailyResetAt: z.date(),
  
  // Tracking
  lastUpload: z.date().optional(),
  quotaExceeded: z.boolean().default(false),
  
  updatedAt: z.date()
});

// Export types
export type FileUpload = z.infer<typeof FileUploadSchema>;
export type FileMetadata = z.infer<typeof FileMetadataSchema>;
export type UploadConfig = z.infer<typeof UploadConfigSchema>;
export type UploadSession = z.infer<typeof UploadSessionSchema>;
export type FileAccessLog = z.infer<typeof FileAccessLogSchema>;
export type FileQuota = z.infer<typeof FileQuotaSchema>;
export type FileType = z.infer<typeof FileTypeSchema>;
export type FilePurpose = z.infer<typeof FilePurposeSchema>;
export type UploadStatus = z.infer<typeof UploadStatusSchema>;