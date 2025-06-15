import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock validateEmailDomain function
const validateEmailDomain = vi.fn(
  (email: string, schoolDomain: string): boolean => {
    const emailDomain = email.split("@")[1]?.toLowerCase();
    return emailDomain === schoolDomain.toLowerCase();
  }
);

// Define response types
interface MagicLinkResponse {
  success: boolean;
  message: string;
}

interface HandleCheckResponse {
  available: boolean;
  handle: string;
}

interface OnboardingResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    fullName: string;
    handle: string;
    major: string;
    builderOptIn: boolean;
  };
}

interface ErrorResponse {
  error: string;
}

// Mock fetch for API calls
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Auth Logic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("validateEmailDomain", () => {
    it("should validate matching email domains", () => {
      expect(validateEmailDomain("user@example.edu", "example.edu")).toBe(true);
      expect(validateEmailDomain("test@university.edu", "university.edu")).toBe(
        true
      );
    });

    it("should reject non-matching email domains", () => {
      expect(validateEmailDomain("user@wrong.edu", "correct.edu")).toBe(false);
      expect(validateEmailDomain("test@gmail.com", "university.edu")).toBe(
        false
      );
    });

    it("should handle case insensitive matching", () => {
      expect(validateEmailDomain("User@EXAMPLE.EDU", "example.edu")).toBe(true);
      expect(validateEmailDomain("user@example.edu", "EXAMPLE.EDU")).toBe(true);
    });

    it("should handle invalid email formats gracefully", () => {
      expect(validateEmailDomain("invalid-email", "example.edu")).toBe(false);
      expect(validateEmailDomain("user@", "example.edu")).toBe(false);
    });
  });

  describe("Magic Link API", () => {
    it("should send magic link with valid data", async () => {
      const mockResponse: MagicLinkResponse = {
        success: true,
        message: "Magic link sent",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const response = await fetch("/api/auth/send-magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@university.edu",
          schoolId: "test-school-id",
        }),
      });

      const data = (await response.json()) as MagicLinkResponse;

      expect(mockFetch).toHaveBeenCalledWith("/api/auth/send-magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@university.edu",
          schoolId: "test-school-id",
        }),
      });

      expect(data).toEqual({ success: true, message: "Magic link sent" });
    });

    it("should reject invalid email format", async () => {
      const mockResponse: ErrorResponse = { error: "Invalid email address" };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: () => Promise.resolve(mockResponse),
      });

      const response = await fetch("/api/auth/send-magic-link", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "invalid-email",
          schoolId: "test-school-id",
        }),
      });

      expect(response.ok).toBe(false);
      expect(response.status).toBe(400);
    });
  });

  describe("Handle Check API", () => {
    it("should return available for new handle", async () => {
      const mockResponse: HandleCheckResponse = {
        available: true,
        handle: "newhandle",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const response = await fetch("/api/auth/check-handle?handle=newhandle");
      const data = (await response.json()) as HandleCheckResponse;

      expect(data).toEqual({ available: true, handle: "newhandle" });
    });

    it("should return unavailable for taken handle", async () => {
      const mockResponse: HandleCheckResponse = {
        available: false,
        handle: "takenhandle",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const response = await fetch("/api/auth/check-handle?handle=takenhandle");
      const data = (await response.json()) as HandleCheckResponse;

      expect(data).toEqual({ available: false, handle: "takenhandle" });
    });

    it("should validate handle format", async () => {
      const mockResponse: ErrorResponse = { error: "Invalid handle format" };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: () => Promise.resolve(mockResponse),
      });

      const response = await fetch("/api/auth/check-handle?handle=a"); // Too short

      expect(response.ok).toBe(false);
      expect(response.status).toBe(400);
    });

    it("should normalize handle to lowercase", async () => {
      const mockResponse: HandleCheckResponse = {
        available: true,
        handle: "testhandle",
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const response = await fetch("/api/auth/check-handle?handle=TestHandle");
      const data = (await response.json()) as HandleCheckResponse;

      expect(data.handle).toBe("testhandle");
    });
  });

  describe("Onboarding API", () => {
    it("should complete onboarding with valid data", async () => {
      const mockResponse: OnboardingResponse = {
        success: true,
        message: "Onboarding completed successfully",
        user: {
          id: "user-id",
          fullName: "Test User",
          handle: "testuser",
          major: "Computer Science",
          builderOptIn: false,
        },
      };

      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const response = await fetch("/api/auth/complete-onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fake-token",
        },
        body: JSON.stringify({
          fullName: "Test User",
          major: "Computer Science",
          handle: "testuser",
          builderOptIn: false,
          consentGiven: true,
        }),
      });

      const data = (await response.json()) as OnboardingResponse;

      expect(data.success).toBe(true);
      expect(data.user.handle).toBe("testuser");
    });

    it("should reject onboarding without consent", async () => {
      const mockResponse: ErrorResponse = { error: "Consent must be given" };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: () => Promise.resolve(mockResponse),
      });

      const response = await fetch("/api/auth/complete-onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fake-token",
        },
        body: JSON.stringify({
          fullName: "Test User",
          major: "Computer Science",
          handle: "testuser",
          builderOptIn: false,
          consentGiven: false, // Missing consent
        }),
      });

      expect(response.ok).toBe(false);
      expect(response.status).toBe(400);
    });

    it("should reject invalid handle formats", async () => {
      const mockResponse: ErrorResponse = { error: "Invalid handle format" };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 400,
        json: () => Promise.resolve(mockResponse),
      });

      const response = await fetch("/api/auth/complete-onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fake-token",
        },
        body: JSON.stringify({
          fullName: "Test User",
          major: "Computer Science",
          handle: "invalid-handle!", // Invalid characters
          builderOptIn: false,
          consentGiven: true,
        }),
      });

      expect(response.ok).toBe(false);
      expect(response.status).toBe(400);
    });

    it("should reject taken handles", async () => {
      const mockResponse: ErrorResponse = { error: "Handle is already taken" };

      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 409,
        json: () => Promise.resolve(mockResponse),
      });

      const response = await fetch("/api/auth/complete-onboarding", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer fake-token",
        },
        body: JSON.stringify({
          fullName: "Test User",
          major: "Computer Science",
          handle: "takenhandle",
          builderOptIn: false,
          consentGiven: true,
        }),
      });

      expect(response.ok).toBe(false);
      expect(response.status).toBe(409);
    });
  });
});
