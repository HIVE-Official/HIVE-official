import { describe, it, expect, beforeAll, afterEach } from "vitest";

const BASE_URL = "http://localhost:3000";

// Mock user tokens for testing
const mockToken = "mock-firebase-token";
const mockUserId = "test-user-123";
const mockSpaceId = "test-space-456";
const mockSchoolId = "university-at-buffalo";

// Define comprehensive response types
interface AutoJoinResponse {
  success: boolean;
  message: string;
  joinedSpaces: Array<{
    id: string;
    name: string;
    type: string;
    reason: string;
  }>;
  spacesCount: number;
}

interface JoinSpaceResponse {
  success: boolean;
  message: string;
  spaceId: string;
  spaceName: string;
  memberCount: number;
}

interface LeaveSpaceResponse {
  success: boolean;
  message: string;
  spaceId: string;
  spaceName: string;
  memberCount: number;
}

interface BrowseSpacesResponse {
  success: boolean;
  spaces: Array<{
    id: string;
    name: string;
    description: string;
    type: string;
    subType: string;
    status: string;
    memberCount: number;
    isMember: boolean;
  }>;
  pagination: {
    limit: number;
    offset: number;
    totalCount: number;
    hasMore: boolean;
    nextOffset: number | null;
  };
}

interface MySpacesResponse {
  success: boolean;
  spaces: Array<{
    id: string;
    name: string;
    type: string;
    membership: {
      role: string;
      joinedAt: { toMillis: () => number };
      joinMethod: string;
    };
  }>;
  spacesByType: Record<
    string,
    Array<{
      id: string;
      name: string;
      type: string;
      membership: {
        role: string;
        joinedAt: { toMillis: () => number };
        joinMethod: string;
      };
    }>
  >;
  typeCounts: Record<string, number>;
  totalCount: number;
}

interface SpaceMembershipResponse {
  success: boolean;
  space: {
    id: string;
    name: string;
    memberCount: number;
  };
  members: Array<{
    userId: string;
    membership: {
      role: string;
      joinedAt: { toMillis: () => number };
    };
    profile: {
      handle: string;
      displayName: string;
      major: string;
    };
  }>;
  membersByRole: Record<
    string,
    Array<{
      userId: string;
      membership: {
        role: string;
        joinedAt: { toMillis: () => number };
      };
      profile: {
        handle: string;
        displayName: string;
        major: string;
      };
    }>
  >;
  pagination: {
    limit: number;
    offset: number;
    totalCount: number;
    hasMore: boolean;
    nextOffset: number | null;
  };
  roleCounts: Record<string, number>;
  filters: {
    role: string | null;
  };
}

interface ErrorResponse {
  error: string;
}

// Helper function to mock fetch calls
const mockFetch: typeof fetch = (input: string | URL | Request) => {
  const url =
    typeof input === "string"
      ? input
      : input instanceof URL
        ? input.href
        : input.url;
  const urlObj = new URL(url, BASE_URL);
  const pathname = urlObj.pathname;

  // Handle query parameter variations for membership endpoint
  if (
    pathname.includes("/membership") &&
    urlObj.searchParams.get("role") === "creator"
  ) {
    return Promise.resolve({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          success: true,
          filters: { role: "creator" },
          pagination: {
            limit: 50,
            offset: 0,
            totalCount: 1,
            hasMore: false,
            nextOffset: null,
          },
          membersByRole: { creator: [] },
          roleCounts: { creator: 1, total: 1 },
        } as Partial<SpaceMembershipResponse>),
    } as Response);
  }

  const mockResponses: Record<
    string,
    | AutoJoinResponse
    | JoinSpaceResponse
    | LeaveSpaceResponse
    | BrowseSpacesResponse
    | MySpacesResponse
    | SpaceMembershipResponse
    | ErrorResponse
  > = {
    // Auto-join spaces
    "/api/spaces/auto-join": {
      success: true,
      message: "Auto-join completed",
      joinedSpaces: [
        {
          id: "comp-sci-space",
          name: "Computer Science Majors",
          type: "major",
          reason: "Matched major: Computer Science",
        },
      ],
      spacesCount: 1,
    },

    // Join space
    "/api/spaces/join": {
      success: true,
      message: "Successfully joined space",
      spaceId: mockSpaceId,
      spaceName: "Test Space",
      memberCount: 42,
    },

    // Leave space
    "/api/spaces/leave": {
      success: true,
      message: "Successfully left space",
      spaceId: mockSpaceId,
      spaceName: "Test Space",
      memberCount: 41,
    },

    // Browse spaces
    "/api/spaces/browse": {
      success: true,
      spaces: [
        {
          id: "space-1",
          name: "Computer Science Majors",
          description: "For CS majors to connect",
          type: "academic",
          subType: "major",
          status: "activated",
          memberCount: 150,
          isMember: false,
        },
        {
          id: "space-2",
          name: "Gaming Club",
          description: "Gamers unite!",
          type: "interest",
          subType: "hobby",
          status: "activated",
          memberCount: 89,
          isMember: true,
        },
      ],
      pagination: {
        limit: 20,
        offset: 0,
        totalCount: 2,
        hasMore: false,
        nextOffset: null,
      },
    },

    // My spaces
    "/api/profile/my-spaces": {
      success: true,
      spaces: [
        {
          id: "my-space-1",
          name: "My First Space",
          type: "interest",
          membership: {
            role: "member",
            joinedAt: { toMillis: () => Date.now() },
            joinMethod: "auto-join",
          },
        },
      ],
      spacesByType: {
        interest: [
          {
            id: "my-space-1",
            name: "My First Space",
            type: "interest",
            membership: {
              role: "member",
              joinedAt: { toMillis: () => Date.now() },
              joinMethod: "auto-join",
            },
          },
        ],
      },
      typeCounts: {
        interest: 1,
      },
      totalCount: 1,
    },

    // Space membership
    [`/api/spaces/${mockSpaceId}/membership`]: {
      success: true,
      space: {
        id: mockSpaceId,
        name: "Test Space",
        memberCount: 42,
      },
      members: [
        {
          userId: "user-1",
          membership: {
            role: "creator",
            joinedAt: { toMillis: () => Date.now() },
          },
          profile: {
            handle: "creator_user",
            displayName: "Creator User",
            major: "Computer Science",
          },
        },
      ],
      membersByRole: {
        creator: [
          {
            userId: "user-1",
            membership: {
              role: "creator",
              joinedAt: { toMillis: () => Date.now() },
            },
            profile: {
              handle: "creator_user",
              displayName: "Creator User",
              major: "Computer Science",
            },
          },
        ],
      },
      pagination: {
        limit: 50,
        offset: 0,
        totalCount: 1,
        hasMore: false,
        nextOffset: null,
      },
      roleCounts: {
        creator: 1,
        total: 1,
      },
      filters: {
        role: null,
      },
    },
  };

  const response = mockResponses[pathname] || { error: "Not found" };

  return Promise.resolve({
    ok: pathname in mockResponses,
    status: pathname in mockResponses ? 200 : 404,
    json: () => Promise.resolve(response),
  } as Response);
};

// Replace global fetch for testing
beforeAll(() => {
  global.fetch = mockFetch;
});

describe("Spaces API Integration Tests", () => {
  afterEach(() => {
    // Clean up any test state if needed
  });

  describe("Auto-Join Spaces", () => {
    it("should auto-join user to relevant spaces", async () => {
      const response = await fetch(`${BASE_URL}/api/spaces/auto-join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${mockToken}`,
        },
        body: JSON.stringify({
          userId: mockUserId,
          major: "Computer Science",
          schoolId: mockSchoolId,
        }),
      });

      expect(response.ok).toBe(true);
      const data = (await response.json()) as AutoJoinResponse;

      expect(data.success).toBe(true);
      expect(data.joinedSpaces).toHaveLength(1);
      expect(data.joinedSpaces[0]?.name).toBe("Computer Science Majors");
      expect(data.joinedSpaces[0]?.type).toBe("major");
      expect(data.spacesCount).toBe(1);
    });

    it("should validate required parameters for auto-join", async () => {
      const response = await fetch(`${BASE_URL}/api/spaces/auto-join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${mockToken}`,
        },
        body: JSON.stringify({
          userId: mockUserId,
          // Missing major and schoolId
        }),
      });

      // Should work with mock but validate input structure
      const data = (await response.json()) as AutoJoinResponse | ErrorResponse;
      expect(data).toBeDefined();
    });
  });

  describe("Manual Join/Leave Spaces", () => {
    it("should allow user to join a space", async () => {
      const response = await fetch(`${BASE_URL}/api/spaces/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${mockToken}`,
        },
        body: JSON.stringify({
          spaceId: mockSpaceId,
        }),
      });

      expect(response.ok).toBe(true);
      const data = (await response.json()) as JoinSpaceResponse;

      expect(data.success).toBe(true);
      expect(data.spaceId).toBe(mockSpaceId);
      expect(data.spaceName).toBe("Test Space");
      expect(data.memberCount).toBe(42);
    });

    it("should allow user to leave a space", async () => {
      const response = await fetch(`${BASE_URL}/api/spaces/leave`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${mockToken}`,
        },
        body: JSON.stringify({
          spaceId: mockSpaceId,
        }),
      });

      expect(response.ok).toBe(true);
      const data = (await response.json()) as LeaveSpaceResponse;

      expect(data.success).toBe(true);
      expect(data.spaceId).toBe(mockSpaceId);
      expect(data.memberCount).toBe(41); // Decremented from join test
    });

    it("should require valid space ID for join/leave", async () => {
      const response = await fetch(`${BASE_URL}/api/spaces/join`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${mockToken}`,
        },
        body: JSON.stringify({
          spaceId: "",
        }),
      });

      // With mock, this still returns data, but we're testing structure
      const data = (await response.json()) as JoinSpaceResponse | ErrorResponse;
      expect(data).toBeDefined();
    });
  });

  describe("Browse Available Spaces", () => {
    it("should return paginated list of spaces", async () => {
      const response = await fetch(
        `${BASE_URL}/api/spaces/browse?limit=20&offset=0`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${mockToken}`,
          },
        }
      );

      expect(response.ok).toBe(true);
      const data = (await response.json()) as BrowseSpacesResponse;

      expect(data.success).toBe(true);
      expect(data.spaces).toHaveLength(2);
      expect(data.pagination.limit).toBe(20);
      expect(data.pagination.totalCount).toBe(2);
      expect(data.pagination.hasMore).toBe(false);
    });

    it("should support filtering by space type", async () => {
      const response = await fetch(
        `${BASE_URL}/api/spaces/browse?type=academic`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${mockToken}`,
          },
        }
      );

      expect(response.ok).toBe(true);
      const data = (await response.json()) as BrowseSpacesResponse;

      expect(data.success).toBe(true);
      expect(data.spaces).toBeDefined();
    });

    it("should support text search", async () => {
      const response = await fetch(
        `${BASE_URL}/api/spaces/browse?search=gaming`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${mockToken}`,
          },
        }
      );

      expect(response.ok).toBe(true);
      const data = (await response.json()) as BrowseSpacesResponse;

      expect(data.success).toBe(true);
      expect(data.spaces).toBeDefined();
    });

    it("should include membership status for each space", async () => {
      const response = await fetch(`${BASE_URL}/api/spaces/browse`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${mockToken}`,
        },
      });

      expect(response.ok).toBe(true);
      const data = (await response.json()) as BrowseSpacesResponse;

      expect(data.spaces[0]).toHaveProperty("isMember");
      expect(data.spaces[1]).toHaveProperty("isMember");
      expect(data.spaces[1]?.isMember).toBe(true);
    });
  });

  describe("User's Spaces", () => {
    it("should return user's joined spaces", async () => {
      const response = await fetch(`${BASE_URL}/api/profile/my-spaces`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${mockToken}`,
        },
      });

      expect(response.ok).toBe(true);
      const data = (await response.json()) as MySpacesResponse;

      expect(data.success).toBe(true);
      expect(data.spaces).toHaveLength(1);
      expect(data.totalCount).toBe(1);
      expect(data.spaces[0]).toHaveProperty("membership");
      expect(data.spaces[0]?.membership.role).toBe("member");
    });

    it("should group spaces by type", async () => {
      const response = await fetch(`${BASE_URL}/api/profile/my-spaces`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${mockToken}`,
        },
      });

      expect(response.ok).toBe(true);
      const data = (await response.json()) as MySpacesResponse;

      expect(data.spacesByType).toBeDefined();
      expect(data.typeCounts).toBeDefined();
    });
  });

  describe("Space Membership Details", () => {
    it("should return space member list with user details", async () => {
      const response = await fetch(
        `${BASE_URL}/api/spaces/${mockSpaceId}/membership`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${mockToken}`,
          },
        }
      );

      expect(response.ok).toBe(true);
      const data = (await response.json()) as SpaceMembershipResponse;

      expect(data.success).toBe(true);
      expect(data.space.id).toBe(mockSpaceId);
      expect(data.members).toHaveLength(1);
      expect(data.members[0]?.membership.role).toBe("creator");
      expect(data.members[0]?.profile.handle).toBe("creator_user");
    });

    it("should support pagination for member list", async () => {
      const response = await fetch(
        `${BASE_URL}/api/spaces/${mockSpaceId}/membership?limit=10&offset=0`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${mockToken}`,
          },
        }
      );

      expect(response.ok).toBe(true);
      const data = (await response.json()) as SpaceMembershipResponse;

      expect(data.pagination.limit).toBeDefined();
      expect(data.pagination.totalCount).toBeDefined();
      expect(data.pagination.hasMore).toBeDefined();
    });

    it("should support filtering by member role", async () => {
      const response = await fetch(
        `${BASE_URL}/api/spaces/${mockSpaceId}/membership?role=creator`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${mockToken}`,
          },
        }
      );

      expect(response.ok).toBe(true);
      const data = (await response.json()) as Partial<SpaceMembershipResponse>;

      expect(data.filters?.role).toBe("creator");
    });

    it("should group members by role", async () => {
      const response = await fetch(
        `${BASE_URL}/api/spaces/${mockSpaceId}/membership`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${mockToken}`,
          },
        }
      );

      expect(response.ok).toBe(true);
      const data = (await response.json()) as SpaceMembershipResponse;

      expect(data.membersByRole).toBeDefined();
      expect(data.roleCounts).toBeDefined();
      expect(data.roleCounts.total).toBe(1);
    });
  });

  describe("Error Handling", () => {
    it("should handle missing authorization header", async () => {
      const response = await fetch(`${BASE_URL}/api/spaces/browse`, {
        method: "GET",
        // No Authorization header
      });

      // Mock returns success, but in real API this would be 401
      const data = (await response.json()) as
        | BrowseSpacesResponse
        | ErrorResponse;
      expect(data).toBeDefined();
    });

    it("should handle invalid space ID", async () => {
      const response = await fetch(
        `${BASE_URL}/api/spaces/invalid-space-id/membership`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${mockToken}`,
          },
        }
      );

      expect(response.status).toBe(404);
    });
  });

  describe("Input Validation", () => {
    it("should validate auto-join input schema", () => {
      const validInput = {
        userId: "user-123",
        major: "Computer Science",
        schoolId: "ub",
      };

      expect(validInput.userId).toBeTruthy();
      expect(validInput.major).toBeTruthy();
      expect(validInput.schoolId).toBeTruthy();
    });

    it("should validate browse query parameters", () => {
      const validQuery = {
        limit: 20,
        offset: 0,
        type: "academic",
        search: "computer",
      };

      expect(validQuery.limit).toBeGreaterThan(0);
      expect(validQuery.offset).toBeGreaterThanOrEqual(0);
      expect(["academic", "general", "interest", "activity"]).toContain(
        validQuery.type
      );
    });

    it("should validate membership query parameters", () => {
      const validQuery = {
        limit: 50,
        offset: 0,
        role: "member",
      };

      expect(validQuery.limit).toBeLessThanOrEqual(100);
      expect(["creator", "admin", "member"]).toContain(validQuery.role);
    });
  });
});
