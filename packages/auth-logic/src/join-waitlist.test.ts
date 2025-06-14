import { describe, it, expect, vi, beforeEach } from "vitest";
import { joinWaitlist } from "./join-waitlist";

// Mock the firebase-admin module
const mockTransaction = {
  get: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
};

// Since this is a library, we mock the dependency it uses
vi.mock("@hive/core/firebase-admin", () => ({
  dbAdmin: {
    collection: vi.fn().mockReturnThis(),
    doc: vi.fn().mockReturnThis(),
    runTransaction: vi.fn((callback) => callback(mockTransaction)),
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
    await expect(joinWaitlist("test@buffalo.edu", "nonexistent")).rejects.toThrow("School not found.");
  });
  
  it("should throw an error if email or schoolId is missing", async () => {
    await expect(joinWaitlist("", "school1")).rejects.toThrow("Email and school ID are required.");
    await expect(joinWaitlist("test@test.com", "")).rejects.toThrow("Email and school ID are required.");
  });
}); 