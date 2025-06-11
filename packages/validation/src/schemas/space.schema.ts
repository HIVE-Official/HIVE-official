import { z } from 'zod';

export const spaceSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters').max(50, 'Name must be 50 characters or less'),
  description: z.string().min(10, 'Description must be at least 10 characters').max(500, 'Description must be 500 characters or less'),
  imageUrl: z.string().url('Invalid URL format'),
  category: z.enum(['Major', 'Residential', 'Student Life', 'Club', 'General']),
  memberCount: z.number().int().positive().default(0),
  isPublic: z.boolean().default(true),
  createdBy: z.string(),
  lastActivityAt: z.date().optional(),
  
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().optional(),
});

export const memberSchema = z.object({
  userId: z.string(),
  role: z.enum(['admin', 'member']).default('member'),
  joinedAt: z.date().default(() => new Date()),
});

export type Space = z.infer<typeof spaceSchema>;
export type Member = z.infer<typeof memberSchema>; 