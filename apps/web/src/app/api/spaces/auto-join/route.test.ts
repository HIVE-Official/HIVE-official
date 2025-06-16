import { describe, it, expect, beforeEach } from "vitest";
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

vi.mock("@/lib/firebase", () => ({
  db: mockFirebaseDb,
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

  it("should return 400 if user missing required fields", async () => {
    // Mock getDoc to return a user document missing required fields
    mockFirebaseDb.getDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({
        id: "test-user-id",
        uid: "test-user-id",
        email: "test@buffalo.edu",
        fullName: "Test User",
        handle: "testuser",
        // missing major and schoolId
      }),
    });

    const request = new Request("http://localhost:3000/api/spaces/auto-join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userId: "test-user-id" }),
    });

    const response = await POST(request as any);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe("User missing required fields (major, schoolId)");
  });
});
