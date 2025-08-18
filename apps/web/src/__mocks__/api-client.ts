// DEPRECATED: Mock API client - ONLY FOR TESTING
// This file is excluded from production builds
// All production code uses real Firebase API routes

import { Timestamp } from "firebase/firestore";
import type {
  Space,
  SpaceMember,
  Post,
  User,
  School,
} from "@hive/core";

// Production safety check
if (process.env.NODE_ENV === 'production') {
  throw new Error('Mock API client should never be imported in production builds');
}

// Mock data
const mockSpaces: Space[] = [
  {
    id: "space-1",
    name: "Computer Science",
    name_lowercase: "computer science",
    description: "A space for CS students",
    schoolId: "school-1",
    memberCount: 150,
    type: "campus_living",
    status: "activated",
    tags: [
      { type: "campus_living", sub_type: "programming" },
      { type: "campus_living", sub_type: "algorithms" },
    ],
    createdAt: Timestamp.fromDate(new Date("2024-01-01")),
    updatedAt: Timestamp.fromDate(new Date("2024-01-01")),
  },
  {
    id: "space-2",
    name: "Mathematics",
    name_lowercase: "mathematics",
    description: "Math enthusiasts unite",
    schoolId: "school-1",
    memberCount: 89,
    type: "campus_living",
    status: "activated",
    tags: [
      { type: "campus_living", sub_type: "calculus" },
      { type: "campus_living", sub_type: "statistics" },
    ],
    createdAt: Timestamp.fromDate(new Date("2024-01-02")),
    updatedAt: Timestamp.fromDate(new Date("2024-01-02")),
  },
];

const mockPosts: Post[] = [
  {
    id: "post-1",
    spaceId: "space-1",
    authorId: "user-1",
    content: "Welcome to the CS space!",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
    reactions: { heart: 5 },
    reactedUsers: { heart: [] },
    type: "text",
    isEdited: false,
    isDeleted: false,
    isFlagged: false,
    isPinned: false,
  },
];

const mockUsers: User[] = [
  {
    id: "user-1",
    uid: "user-1",
    email: "john@example.com",
    fullName: "John Doe",
    handle: "johndoe",
    schoolId: "school-1",
    major: "Computer Science",
    graduationYear: 2025,
    createdAt: Timestamp.fromDate(new Date("2024-01-01")),
    updatedAt: Timestamp.fromDate(new Date("2024-01-01")),
    isPublic: true,
    consentGiven: true,
    builderOptIn: false,
    isBuilder: false,
    builderAnalyticsEnabled: true,
    onboardingCompleted: true,
    isVerified: true,
    status: "active",
  },
];

const mockSchools: School[] = [
  {
    id: "school-1",
    name: "University of Example",
    domain: "example.edu",
    status: "active",
    waitlistCount: 0,
    studentsUntilOpen: 0,
    city: "Example City",
    state: "New York",
    country: "US",
    timezone: "America/New_York",
    majors: [],
    academicCalendar: "semester",
    allowsAutoJoin: true,
    requiresVerification: false,
    autoSpacesEnabled: true,
    hasDormitories: true,
    dormitoryList: [],
    createdAt: Timestamp.fromDate(new Date('2024-01-01')),
    updatedAt: Timestamp.fromDate(new Date('2024-01-01'))
  },
  {
    id: "ub",
    name: "University at Buffalo",
    domain: "buffalo.edu",
    status: "active",
    waitlistCount: 0,
    studentsUntilOpen: 0,
    city: "Buffalo",
    state: "New York",
    country: "US",
    timezone: "America/New_York",
    majors: [],
    academicCalendar: "semester",
    allowsAutoJoin: true,
    requiresVerification: false,
    autoSpacesEnabled: true,
    hasDormitories: true,
    dormitoryList: [],
    createdAt: Timestamp.fromDate(new Date('2024-01-01')),
    updatedAt: Timestamp.fromDate(new Date('2024-01-01'))
  },
  {
    id: "binghamton",
    name: "Binghamton University",
    domain: "binghamton.edu",
    status: "active",
    waitlistCount: 0,
    studentsUntilOpen: 0,
    city: "Binghamton",
    state: "New York",
    country: "US",
    timezone: "America/New_York",
    majors: [],
    academicCalendar: "semester",
    allowsAutoJoin: true,
    requiresVerification: false,
    autoSpacesEnabled: true,
    hasDormitories: true,
    dormitoryList: [],
    createdAt: Timestamp.fromDate(new Date('2024-01-01')),
    updatedAt: Timestamp.fromDate(new Date('2024-01-01'))
  },
];

// Mock API client
export const apiClient = {
  spaces: {
    getAll: async () => mockSpaces,
    getById: async (_spaceId: string) => mockSpaces[0],
    getMembers: async (_spaceId: string): Promise<SpaceMember[]> => [],
    join: async (_spaceId: string) => ({ success: true }),
    leave: async (_spaceId: string) => ({ success: true }),
    getPosts: async (_spaceId: string) => mockPosts,
    createPost: async (_spaceId: string, _content: string) => mockPosts[0],
  },
  posts: {
    // Add mock post methods if needed
  },
  users: {
    getCurrent: async () => mockUsers[0],
    updateMembership: async (
      _spaceId: string,
      _userId: string,
      _role: string
    ) => ({ success: true }),
  },
  schools: {
    getAll: async () => mockSchools,
    getById: async (_schoolId: string) => mockSchools[0],
  },
  admin: {
    // Add mock admin methods if needed
  },
};

// Export individual modules for easier importing
export const spacesApi = apiClient.spaces;
export const postsApi = apiClient.posts;
export const adminApi = apiClient.admin;
