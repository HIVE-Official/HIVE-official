import { describe, it, expect, vi, beforeEach } from "vitest";
import { joinWaitlist } from "./join-waitlist";

// Mock Firebase Admin
const mockTransaction = {
  get: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
};

vi.mock("firebase-admin/firestore", () => ({
  getFirestore: vi.fn(() => ({
    collection: vi.fn(() => ({
      doc: vi.fn(() => ({
        collection: vi.fn(() => ({
          doc: vi.fn(),
        })),
      })),
    })),
    runTransaction: vi.fn(
      (callback: (transaction: typeof mockTransaction) => Promise<unknown>) =>
        callback(mockTransaction)
    ),
  })),
  FieldValue: {
    serverTimestamp: vi.fn(() => "server-timestamp"),
    increment: vi.fn((value: number) => `increment-${value}`),
  },
}));

describe("joinWaitlist", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should add a user to the waitlist and increment count on success", async () => {
    mockTransaction.get.mockResolvedValueOnce({ exists: true }); // school doc
    mockTransaction.get.mockResolvedValueOnce({ exists: false }); // waitlist doc

    const result = await joinWaitlist("test@buffalo.edu", "school1");

    expect(result.success).toBe(true);
    expect(mockTransaction.create).toHaveBeenCalledOnce();
    expect(mockTransaction.update).toHaveBeenCalledOnce();
  });

  it("should return success if user is already on the waitlist", async () => {
    mockTransaction.get.mockResolvedValueOnce({ exists: true }); // school doc
    mockTransaction.get.mockResolvedValueOnce({ exists: true }); // waitlist doc

    await joinWaitlist("test@buffalo.edu", "school1");

    expect(mockTransaction.create).not.toHaveBeenCalled();
    expect(mockTransaction.update).not.toHaveBeenCalled();
  });

  it("should throw an error if school does not exist", async () => {
    mockTransaction.get.mockResolvedValueOnce({ exists: false }); // school doc
    await expect(
      joinWaitlist("test@buffalo.edu", "nonexistent")
    ).rejects.toThrow("School not found.");
  });

  it("should throw an error if email or schoolId is missing", async () => {
    await expect(joinWaitlist("", "school1")).rejects.toThrow(
      "Email and school ID are required."
    );
    await expect(joinWaitlist("test@test.com", "")).rejects.toThrow(
      "Email and school ID are required."
    );
  });
});
