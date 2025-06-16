import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase-admin";
import { authRateLimit } from "@/lib/rate-limit";

// Handle validation schema
const HANDLE_REGEX = /^[a-zA-Z0-9_]{3,20}$/;
const RESERVED_HANDLES = [
  "admin",
  "api",
  "www",
  "mail",
  "ftp",
  "localhost",
  "root",
  "support",
  "help",
  "about",
  "contact",
  "team",
  "privacy",
  "terms",
  "legal",
  "hive",
  "space",
  "spaces",
  "user",
  "users",
  "profile",
  "profiles",
  "settings",
  "account",
  "login",
  "logout",
  "signup",
  "register",
  "auth",
  "oauth",
  "callback",
  "verify",
  "reset",
  "forgot",
  "dashboard",
  "home",
  "welcome",
  "onboarding",
  "feed",
  "search",
  "explore",
  "discover",
  "trending",
  "popular",
  "featured",
];

interface CheckHandleRequest {
  handle: string;
}

interface CheckHandleResponse {
  available: boolean;
  reason?: string;
}

function validateHandle(handle: string): { valid: boolean; reason?: string } {
  // Check length and format
  if (!handle || handle.length < 3) {
    return {
      valid: false,
      reason: "Handle must be at least 3 characters long",
    };
  }

  if (handle.length > 20) {
    return {
      valid: false,
      reason: "Handle must be no more than 20 characters long",
    };
  }

  if (!HANDLE_REGEX.test(handle)) {
    return {
      valid: false,
      reason: "Handle can only contain letters, numbers, and underscores",
    };
  }

  // Check for reserved handles
  if (RESERVED_HANDLES.includes(handle.toLowerCase())) {
    return {
      valid: false,
      reason: "This handle is reserved and cannot be used",
    };
  }

  // Check for patterns that might be confusing
  if (handle.startsWith("_") || handle.endsWith("_")) {
    return {
      valid: false,
      reason: "Handle cannot start or end with underscore",
    };
  }

  if (handle.includes("__")) {
    return {
      valid: false,
      reason: "Handle cannot contain consecutive underscores",
    };
  }

  return { valid: true };
}

async function checkHandleInDatabase(handle: string): Promise<boolean> {
  try {
    // Check if handle exists in users collection
    const userQuery = await db
      .collection("users")
      .where("handle", "==", handle)
      .limit(1)
      .get();

    return userQuery.empty;
  } catch (error) {
    console.error("Database error checking handle:", error);
    // In case of database error, return false to be safe
    return false;
  }
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse request body
    const body = (await request.json()) as CheckHandleRequest;
    const { handle } = body;

    if (!handle) {
      return NextResponse.json(
        {
          available: false,
          reason: "Handle is required",
        } as CheckHandleResponse,
        { status: 400 }
      );
    }

    // Normalize handle
    const normalizedHandle = handle.trim().toLowerCase();

    // Rate limiting - get IP address for rate limiting
    const ip =
      request.headers.get("x-forwarded-for") ||
      request.headers.get("x-real-ip") ||
      "unknown";

    const rateLimitResult = authRateLimit(`handle-check:${ip}`);

    if (!rateLimitResult.success) {
      return NextResponse.json(
        {
          available: false,
          reason: "Too many requests. Please try again later.",
        } as CheckHandleResponse,
        {
          status: 429,
          headers: {
            "X-RateLimit-Limit": rateLimitResult.limit.toString(),
            "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
            "X-RateLimit-Reset": new Date(
              rateLimitResult.resetTime
            ).toISOString(),
          },
        }
      );
    }

    // Validate handle format
    const validation = validateHandle(normalizedHandle);
    if (!validation.valid) {
      return NextResponse.json(
        { available: false, reason: validation.reason } as CheckHandleResponse,
        { status: 200 }
      );
    }

    // Check database availability
    const isAvailable = await checkHandleInDatabase(normalizedHandle);

    if (!isAvailable) {
      return NextResponse.json(
        {
          available: false,
          reason: "This handle is already taken",
        } as CheckHandleResponse,
        { status: 200 }
      );
    }

    // Handle is available
    return NextResponse.json({ available: true } as CheckHandleResponse, {
      status: 200,
      headers: {
        "X-RateLimit-Limit": rateLimitResult.limit.toString(),
        "X-RateLimit-Remaining": rateLimitResult.remaining.toString(),
        "X-RateLimit-Reset": new Date(rateLimitResult.resetTime).toISOString(),
      },
    });
  } catch (error) {
    console.error("Error checking handle:", error);
    return NextResponse.json(
      {
        available: false,
        reason: "Unable to check handle availability",
      } as CheckHandleResponse,
      { status: 500 }
    );
  }
}

// Also support GET requests for simple queries
export async function GET(request: NextRequest): Promise<NextResponse> {
  try {
    const { searchParams } = new URL(request.url);
    const handle = searchParams.get("handle");

    if (!handle) {
      return NextResponse.json(
        {
          available: false,
          reason: "Handle parameter is required",
        } as CheckHandleResponse,
        { status: 400 }
      );
    }

    // For GET requests, create a mock POST request body and reuse POST logic
    const mockRequest = new Request(request.url, {
      method: "POST",
      headers: request.headers,
      body: JSON.stringify({ handle }),
    });

    return POST(mockRequest as NextRequest);
  } catch (error) {
    console.error("Error checking handle:", error);
    return NextResponse.json(
      {
        available: false,
        reason: "Unable to check handle availability",
      } as CheckHandleResponse,
      { status: 500 }
    );
  }
}
