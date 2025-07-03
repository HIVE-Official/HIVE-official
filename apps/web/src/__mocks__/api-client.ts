// Mock API client for Team 1 development
// This will be replaced with real API integration in Phase 3

import { Timestamp } from "firebase/firestore";
import type {
  Space,
  SpaceMember,
  Post,
  User,
  School,
} from "@hive/core";

// Mock data
const mockSpaces: Space[] = [
  {
    id: "space-1",
    name: "Computer Science",
    name_lowercase: "computer science",
    description: "A space for CS students",
    schoolId: "school-1",
    memberCount: 150,
    type: "major",
    status: "activated",
    tags: [
      { type: "major", sub_type: "programming" },
      { type: "major", sub_type: "algorithms" },
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
    type: "major",
    status: "activated",
    tags: [
      { type: "major", sub_type: "calculus" },
      { type: "major", sub_type: "statistics" },
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
    createdAt: Timestamp.fromDate(new Date("2024-01-01")),
    updatedAt: Timestamp.fromDate(new Date("2024-01-01")),
    interestTags: ["webdev", "ai"],
    majorId: "cs",
    isFirstYear: true,
    isLeaderCandidate: false,
    organizations: [],
    clubs: [],
    academicInterests: [],
    isPublic: true,
    consentGiven: true,
    showDormitory: true,
    showOrganizations: true,
    builderOptIn: false,
    isBuilder: false,
    builderAchievements: {
      toolsCreated: 0,
      totalEngagement: 0,
      invitesSent: 0,
    },
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
    status: "open",
    waitlistCount: 0,
    studentsUntilOpen: 0
  },
  {
    id: "ub",
    name: "University at Buffalo",
    domain: "buffalo.edu",
    status: "open",
    waitlistCount: 0,
    studentsUntilOpen: 0
  },
  {
    id: "binghamton",
    name: "Binghamton University",
    domain: "binghamton.edu",
    status: "open",
    waitlistCount: 0,
    studentsUntilOpen: 0
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
