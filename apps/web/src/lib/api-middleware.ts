import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { headers } from "next/headers";
// Standard error response format
export interface ApiError {
  error: string;
  code?: string;
  details?: unknown;
  timestamp: string;
}
// Standard success response format
export interface ApiSuccess<T = unknown> {
  success: true;
  data?: T;
  timestamp: string;
}
export type ApiResponse<T = unknown> = ApiSuccess<T> | ApiError;
/**
 * Creates a standardized error response
 */
export function errorResponse(
  message: string,
  status: number = 500,
  code?: string,
  details?: unknown
): NextResponse<ApiError> {
  return NextResponse.json(
    {
      error: message,
      code: code || `ERROR_${status}`,
      details,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}
/**
 * Creates a standardized success response
 */
export function successResponse<T = unknown>(
  data?: T,
  status: number = 200
): NextResponse<ApiSuccess<T>> {
  return NextResponse.json(
    {
      success: true,
      data,
      timestamp: new Date().toISOString(),
    },
    { status }
  );
}
/**
 * Authentication middleware - checks if user is authenticated
 * Returns user session or throws error response
 */
export async function requireAuth(req?: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      throw errorResponse("Unauthorized - Please sign in", 401, "UNAUTHORIZED");
    }
    return session;
  } catch (error) {
    if (error instanceof NextResponse) {
      throw error;
    }
    throw errorResponse("Authentication failed", 401, "AUTH_FAILED");
  }
}
/**
 * Admin authentication middleware - checks if user is admin
 */
export async function requireAdmin(req?: NextRequest) {
  const session = await requireAuth(req);
  if (session.user.role !== "admin") {
    throw errorResponse("Forbidden - Admin access required", 403, "FORBIDDEN");
  }
  return session;
}
/**
 * Rate limiting middleware
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
export async function rateLimit(
  identifier: string,
  limit: number = 10,
  windowMs: number = 60000
): Promise<void> {
  const now = Date.now();
  const userLimit = rateLimitMap.get(identifier);
  if (!userLimit || now > userLimit.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return;
  }
  if (userLimit.count >= limit) {
    throw errorResponse(
      "Too many requests - Please try again later",
      429,
      "RATE_LIMIT_EXCEEDED"
    );
  }
  userLimit.count++;
}
/**
 * CORS middleware
 */
export function corsHeaders(origin?: string): HeadersInit {
  return {
    "Access-Control-Allow-Origin": origin || "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
    "Access-Control-Max-Age": "86400",
  };
}
/**
 * Request validation middleware
 */
export async function validateBody<T>(
  req: NextRequest,
  schema: {
    parse: (data: unknown) => T;
  }
): Promise<T> {
  try {
    const body = await req.json();
    return schema.parse(body);
  } catch (error) {
    throw errorResponse(
      "Invalid request body",
      400,
      "VALIDATION_ERROR",
      error
    );
  }
}
/**
 * Logging middleware
 */
export async function logRequest(
  req: NextRequest,
  handler: () => Promise<NextResponse>
): Promise<NextResponse> {
  const start = Date.now();
  const method = req.method;
  const url = req.url;
  try {
    const response = await handler();
    const duration = Date.now() - start;
    // Log successful request
    return response;
  } catch (error) {
    const duration = Date.now() - start;
    // Log error
    if (error instanceof NextResponse) {
      return error;
    }
    return errorResponse("Internal server error", 500, "INTERNAL_ERROR");
  }
}
/**
 * Wrapper for protected API routes
 */
export function withAuth(
  handler: (
    req: NextRequest,
    context: { params: Record<string, string>; session: { user?: { id: string; email: string }; [key: string]: unknown } }
  ) => Promise<NextResponse>
) {
  return async (req: NextRequest, context: { params: Record<string, string> }) => {
    return logRequest(_req, async () => {
      try {
        const session = await requireAuth(req);
        return await handler(req, { ...context, session });
      } catch (error) {
        if (error instanceof NextResponse) {
          return error;
        }
        return errorResponse("Internal server error", 500);
      }
    });
  };
}
/**
 * Wrapper for admin API routes
 */
export function withAdmin(
  handler: (
    req: NextRequest,
    context: { params: Record<string, string>; session: { user?: { id: string; email: string }; [key: string]: unknown } }
  ) => Promise<NextResponse>
) {
  return async (req: NextRequest, context: { params: Record<string, string> }) => {
    return logRequest(_req, async () => {
      try {
        const session = await requireAdmin(req);
        return await handler(req, { ...context, session });
      } catch (error) {
        if (error instanceof NextResponse) {
          return error;
        }
        return errorResponse("Internal server error", 500);
      }
    });
  };
}
/**
 * Wrapper for public API routes with logging
 */
export function withLogging(
  handler: (
    req: NextRequest,
    context: { params: Record<string, string> }
  ) => Promise<NextResponse>
) {
  return async (req: NextRequest, context: { params: Record<string, string> }) => {
    return logRequest(_req, async () => {
      try {
        return await handler(req, context);
      } catch (error) {
        if (error instanceof NextResponse) {
          return error;
        }
        return errorResponse("Internal server error", 500);
      }
    });
  };
}