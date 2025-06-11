import { z } from 'zod';

const currentYear = new Date().getFullYear();

export const userSchema = z.object({
  email: z.string().email({ message: 'Must be a valid .edu email address' }).refine(
    (email) => email.endsWith('.edu'),
    { message: 'Must be a .edu email address' }
  ),
  fullName: z.string().min(1, 'Full name is required').max(40, 'Full name must be 40 characters or less'),
  preferredName: z.string().max(20, 'Preferred name must be 20 characters or less').optional(),
  
  major: z.string().min(1, 'Major is required'),
  graduationYear: z.number().min(currentYear).max(currentYear + 7, 'Invalid graduation year'),

  handle: z.string()
    .min(4, 'Handle must be at least 4 characters')
    .max(15, 'Handle must be 15 characters or less')
    .regex(/^[a-z0-9]+$/, 'Handle must be lowercase alphanumeric'),

  avatar: z.object({
    url: z.string().url(),
    path: z.string(),
  }).optional(),

  onboardingCompleted: z.boolean().default(false),
  
  isBuilder: z.boolean().default(false),

  legal: z.object({
    termsOfServiceAcceptedVersion: z.string(),
    privacyPolicyAcceptedVersion: z.string(),
    acceptedAt: z.date(),
  }),
  
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export type User = z.infer<typeof userSchema>; 