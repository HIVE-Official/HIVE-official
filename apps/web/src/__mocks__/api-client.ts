// Mock API client for Team 1 development
// This will be replaced with real API integration in Phase 3

import type { Space, SpaceMember, Post, User, School } from "@hive/core";

// Mock data
const mockSpaces: Space[] = [
  {
    id: "space-1",
    name: "Computer Science",
    description: "A space for CS students",
    schoolId: "school-1",
    isPublic: true,
    memberCount: 150,
    tags: ["programming", "algorithms"],
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
  {
    id: "space-2",
    name: "Mathematics",
    description: "Math enthusiasts unite",
    schoolId: "school-1",
    isPublic: true,
    memberCount: 89,
    tags: ["calculus", "statistics"],
    createdAt: new Date("2024-01-02"),
    updatedAt: new Date("2024-01-02"),
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
    likeCount: 5,
    commentCount: 2,
  },
];

const mockUsers: User[] = [
  {
    id: "user-1",
    email: "john@example.com",
    fullName: "John Doe",
    handle: "johndoe",
    schoolId: "school-1",
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
  },
];

const mockSchools: School[] = [
  {
    id: "school-1",
    name: "University of Example",
    domain: "example.edu",
    isActive: true,
    createdAt: new Date("2024-01-01"),
    updatedAt: new Date("2024-01-01"),
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
    getById: async (_spaceId: string) => mockSchools[0],
  },
};

// Export individual modules for easier importing
export const spacesApi = apiClient.spaces;
export const membersApi = apiClient.members;
export const postsApi = apiClient.posts;
export const adminApi = apiClient.admin;
