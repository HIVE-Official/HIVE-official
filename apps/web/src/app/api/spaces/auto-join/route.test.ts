import { describe, it, expect, beforeEach, vi } from "vitest";
import { POST } from "./route";

// Mock Firebase
const mockFirebaseDb = {
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  writeBatch: vi.fn(),
  serverTimestamp: vi.fn(),
  limit: vi.fn(),
  increment: vi.fn(),
};

vi.mock("@/lib/firebase-admin", () => ({
  dbAdmin: mockFirebaseDb,
}));

vi.mock("firebase/firestore", () => ({
  collection: vi.fn(),
  doc: vi.fn(),
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  query: vi.fn(),
  where: vi.fn(),
  writeBatch: vi.fn(),
  serverTimestamp: vi.fn(),
  limit: vi.fn(),
  increment: vi.fn(),
}));

vi.mock("@hive/core", () => ({
  getCohortSpaceId: vi.fn((major, year) => {
    if (major && year) return `cs-${year}`;
    if (major) return `cs-major`;
    if (year) return `class-${year}`;
    return "default";
  }),
  generateCohortSpaces: vi.fn(() => [
    {
      id: "cs-2025",
      name: "UB Computer Science '25",
      type: "cohort",
      description: "Computer Science Class of 2025",
    },
  ]),
}));

describe("/api/spaces/auto-join", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should return 400 if userId is missing", async () => {
    const request = new Request("http://localhost:3000/api/spaces/auto-join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    });

    const response = await POST(request as any);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("User ID is required");
  });

  it("should return 404 if user not found", async () => {
    // Mock getDoc to return a non-existent document
    mockFirebaseDb.getDoc.mockResolvedValue({
      exists: () => false,
    });

    const request = new Request("http://localhost:3000/api/spaces/auto-join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "test-user-id" }),
    });

    const response = await POST(request as any);
    const data = await response.json();

    expect(response.status).toBe(404);
    expect(data.error).toBe("User not found");
  });

  it("should return 200 and auto-join spaces for valid user", async () => {
    // Mock user document with complete data
    const mockUserDoc = {
      exists: true,
      data: () => ({
        id: "test-user-id",
        uid: "test-user-id",
        email: "test@buffalo.edu",
        fullName: "Test User",
        handle: "testuser",
        major: "Computer Science",
        graduationYear: 2025,
        schoolId: "university-at-buffalo",
      }),
    };

    // Mock Firebase operations
    mockFirebaseDb.collection.mockReturnValue({
      doc: vi.fn().mockReturnValue({
        get: vi.fn().mockResolvedValue(mockUserDoc),
        collection: vi.fn().mockReturnValue({
          doc: vi.fn().mockReturnValue({
            get: vi.fn().mockResolvedValue({ exists: false }),
            set: vi.fn().mockResolvedValue(undefined),
          }),
        }),
        set: vi.fn().mockResolvedValue(undefined),
        update: vi.fn().mockResolvedValue(undefined),
      }),
    });

    mockFirebaseDb.doc.mockReturnValue({
      get: vi.fn().mockResolvedValue(mockUserDoc),
    });

    // Mock batch operations
    const mockBatch = {
      set: vi.fn(),
      update: vi.fn(),
      commit: vi.fn().mockResolvedValue(undefined),
    };
    mockFirebaseDb.writeBatch.mockReturnValue(mockBatch);

    const request = new Request("http://localhost:3000/api/spaces/auto-join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "test-user-id" }),
    });

    const response = await POST(request as any);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.success).toBe(true);
    expect(data.userId).toBe("test-user-id");
  });
});
