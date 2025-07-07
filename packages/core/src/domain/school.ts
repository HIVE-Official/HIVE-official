import { type Timestamp } from "firebase/firestore";
import { z } from "zod";

export interface School {
  id: string;
  name: string;
  shortName?: string; // e.g., "NYU" for "New York University"
  domain: string;
  status: 'open' | 'waitlist' | 'coming-soon';
  studentsUntilOpen: number;
  waitlistCount: number;
  
  // Location & Contact
  city: string;
  state: string;
  country: string;
  timezone: string;
  website?: string;
  
  // Academic structure
  majors: SchoolMajor[];
  academicCalendar: 'semester' | 'quarter' | 'trimester';
  
  // Settings
  allowsAutoJoin: boolean; // Can students auto-join based on email domain
  requiresVerification: boolean; // Requires manual verification
  autoSpacesEnabled: boolean; // Automatically creates default spaces
  
  // Campus features
  hasDormitories: boolean;
  dormitoryList: string[]; // List of dormitory names
  
  // Timestamps
  createdAt: Timestamp;
  updatedAt: Timestamp;
  launchedAt?: Timestamp; // When school went live
}

export interface SchoolMajor {
  id: string;
  name: string;
  department: string;
  level: 'undergraduate' | 'graduate' | 'doctoral';
  isActive: boolean;
}

export interface SchoolMetrics {
  schoolId: string;
  totalUsers: number;
  activeUsers: number; // Active in last 30 days
  totalSpaces: number;
  activeSpaces: number;
  lastUpdated: Timestamp;
}

// Zod validation schemas
export const SchoolMajorSchema = z.object({
  id: z.string(),
  name: z.string(),
  department: z.string(),
  level: z.enum(['undergraduate', 'graduate', 'doctoral']),
  isActive: z.boolean().default(true),
});

export const SchoolSchema = z.object({
  id: z.string(),
  name: z.string(),
  shortName: z.string().optional(),
  domain: z.string(),
  status: z.enum(['open', 'waitlist', 'coming-soon']),
  studentsUntilOpen: z.number().default(0),
  waitlistCount: z.number().default(0),
  city: z.string(),
  state: z.string(),
  country: z.string().default('US'),
  timezone: z.string(),
  website: z.string().url().optional(),
  majors: z.array(SchoolMajorSchema).default([]),
  academicCalendar: z.enum(['semester', 'quarter', 'trimester']).default('semester'),
  allowsAutoJoin: z.boolean().default(true),
  requiresVerification: z.boolean().default(false),
  autoSpacesEnabled: z.boolean().default(true),
  hasDormitories: z.boolean().default(true),
  dormitoryList: z.array(z.string()).default([]),
  createdAt: z.union([z.date(), z.number()]),
  updatedAt: z.union([z.date(), z.number()]),
  launchedAt: z.union([z.date(), z.number()]).optional(),
});

export const CreateSchoolSchema = SchoolSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const UpdateSchoolSchema = SchoolSchema.partial().omit({
  id: true,
  createdAt: true,
});

export type CreateSchoolData = z.infer<typeof CreateSchoolSchema>;
export type UpdateSchoolData = z.infer<typeof UpdateSchoolSchema>; 