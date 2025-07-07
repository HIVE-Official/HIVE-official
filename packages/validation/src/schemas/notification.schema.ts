import { z } from "zod";

// Notification Type Schema
export const NotificationTypeSchema = z.enum([
  'ritual_available',
  'ritual_reminder',
  'ritual_complete',
  'space_activated',
  'space_invitation',
  'space_post_like',
  'space_post_comment',
  'space_event_reminder',
  'tool_shared',
  'tool_feedback',
  'achievement_unlocked',
  'profile_view',
  'friend_request',
  'system_announcement',
  'welcome_message',
  'onboarding_next_step',
  'feed_highlight',
  'weekly_digest'
]);

// Notification Priority Schema
export const NotificationPrioritySchema = z.enum([
  'low',
  'medium', 
  'high',
  'urgent'
]);

// Notification Action Schema
export const NotificationActionSchema = z.object({
  label: z.string().min(1).max(50),
  action: z.enum(['navigate', 'dismiss', 'external_link', 'modal']),
  target: z.string().optional(), // URL or route
  payload: z.record(z.string(), z.any()).optional()
});

// Base Notification Schema
export const NotificationSchema = z.object({
  id: z.string().min(1),
  userId: z.string().min(1),
  type: NotificationTypeSchema,
  priority: NotificationPrioritySchema,
  
  // Content
  title: z.string().min(1).max(100),
  message: z.string().min(1).max(500),
  iconUrl: z.string().url().optional(),
  imageUrl: z.string().url().optional(),
  
  // Metadata
  data: z.record(z.string(), z.any()).optional(),
  actions: z.array(NotificationActionSchema).max(3).optional(),
  
  // State
  read: z.boolean().default(false),
  dismissed: z.boolean().default(false),
  clicked: z.boolean().default(false),
  
  // Timing
  scheduledFor: z.date().optional(),
  expiresAt: z.date().optional(),
  createdAt: z.date(),
  readAt: z.date().optional(),
  clickedAt: z.date().optional(),
  
  // Grouping
  groupId: z.string().optional(),
  batchId: z.string().optional()
});

// User Notification Preferences Schema
export const NotificationPreferencesSchema = z.object({
  userId: z.string().min(1),
  
  // Channel preferences
  pushNotifications: z.boolean().default(true),
  emailNotifications: z.boolean().default(true),
  inAppNotifications: z.boolean().default(true),
  
  // Category preferences
  rituals: z.boolean().default(true),
  spaces: z.boolean().default(true),
  social: z.boolean().default(true),
  achievements: z.boolean().default(true),
  system: z.boolean().default(true),
  
  // Frequency settings
  digestFrequency: z.enum(['daily', 'weekly', 'never']).default('weekly'),
  quietHours: z.object({
    enabled: z.boolean().default(false),
    start: z.string().regex(/^\d{2}:\d{2}$/), // HH:MM format
    end: z.string().regex(/^\d{2}:\d{2}$/),
    timezone: z.string().optional()
  }).optional(),
  
  // Advanced settings
  soundEnabled: z.boolean().default(true),
  vibrationEnabled: z.boolean().default(true),
  badgeCount: z.boolean().default(true),
  
  updatedAt: z.date()
});

// Notification Template Schema
export const NotificationTemplateSchema = z.object({
  id: z.string().min(1),
  type: NotificationTypeSchema,
  
  // Template content
  titleTemplate: z.string().min(1),
  messageTemplate: z.string().min(1),
  
  // Variables for template
  variables: z.array(z.string()).optional(),
  
  // Default settings
  defaultPriority: NotificationPrioritySchema,
  defaultActions: z.array(NotificationActionSchema).optional(),
  
  // Timing
  scheduleDelay: z.number().min(0).optional(), // seconds
  expiryDuration: z.number().min(0).optional(), // seconds
  
  // Targeting
  targetAudience: z.enum(['all', 'builders', 'leaders', 'new_users', 'inactive']).optional(),
  
  // Metadata
  active: z.boolean().default(true),
  createdAt: z.date(),
  updatedAt: z.date()
});

// Notification Batch Schema (for bulk operations)
export const NotificationBatchSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1).max(100),
  templateId: z.string().min(1),
  
  // Recipients
  userIds: z.array(z.string()).min(1).max(10000), // Reasonable batch limit
  
  // Personalization
  personalizedData: z.record(z.string(), z.record(z.string(), z.any())).optional(),
  
  // Scheduling
  scheduledFor: z.date().optional(),
  
  // Status
  status: z.enum(['draft', 'scheduled', 'sending', 'sent', 'failed']),
  sentCount: z.number().min(0).default(0),
  failedCount: z.number().min(0).default(0),
  
  // Metadata
  createdBy: z.string().min(1),
  createdAt: z.date(),
  sentAt: z.date().optional()
});

// Export types
export type Notification = z.infer<typeof NotificationSchema>;
export type NotificationPreferences = z.infer<typeof NotificationPreferencesSchema>;
export type NotificationTemplate = z.infer<typeof NotificationTemplateSchema>;
export type NotificationBatch = z.infer<typeof NotificationBatchSchema>;
export type NotificationType = z.infer<typeof NotificationTypeSchema>;
export type NotificationPriority = z.infer<typeof NotificationPrioritySchema>;
export type NotificationAction = z.infer<typeof NotificationActionSchema>;