import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { ApiResponseHelper, HttpStatus } from "@/lib/api-response-types";
import { logger } from "@/lib/logger";

/**
 * Standard API Handler Type
 */
export type ApiHandler = (
  request: NextRequest,
  context: any
) => Promise<Response>;

/**
 * Error Handling Middleware - Eliminates duplicate error handling across 133+ routes
 *
 * Before: Each route has identical try-catch blocks with manual error handling
 * After: Single withErrorHandling() wrapper handles all errors consistently
 */
export function withErrorHandling(handler: ApiHandler): ApiHandler {
  return async (request: NextRequest, context: any): Promise<Response> => {
    try {
      return await handler(request, context);
    } catch (error) {
      return handleApiError(error, request);
    }
  };
}

/**
 * Centralized error handling logic
 * Replaces duplicate error handling in 133+ files
 */
export function handleApiError(error: unknown, request: NextRequest): Response {
  const endpoint = new URL(request.url).pathname;

  // Handle Zod validation errors
  if (error instanceof z.ZodError) {
    logger.warn('Validation error', {
      error: error.errors,
      endpoint
    });

    return NextResponse.json(
      {
        error: "Invalid request data",
        details: error.errors
      },
      { status: HttpStatus.BAD_REQUEST }
    );
  }

  // Handle known application errors
  if (error instanceof Error) {
    const message = error.message.toLowerCase();

    // Authentication errors
    if (message.includes('unauthorized') || message.includes('invalid token')) {
      logger.warn('Authentication error', { error: error.message, endpoint });
      return NextResponse.json(
        ApiResponseHelper.error("Authentication failed", "UNAUTHORIZED"),
        { status: HttpStatus.UNAUTHORIZED }
      );
    }

    // Authorization errors
    if (message.includes('forbidden') || message.includes('access denied')) {
      logger.warn('Authorization error', { error: error.message, endpoint });
      return NextResponse.json(
        ApiResponseHelper.error("Access denied", "FORBIDDEN"),
        { status: HttpStatus.FORBIDDEN }
      );
    }

    // Not found errors
    if (message.includes('not found')) {
      logger.info('Resource not found', { error: error.message, endpoint });
      return NextResponse.json(
        ApiResponseHelper.error("Resource not found", "RESOURCE_NOT_FOUND"),
        { status: HttpStatus.NOT_FOUND }
      );
    }

    // Conflict errors (already exists, etc.)
    if (message.includes('already exists') || message.includes('conflict')) {
      logger.warn('Conflict error', { error: error.message, endpoint });
      return NextResponse.json(
        ApiResponseHelper.error(error.message, "CONFLICT"),
        { status: HttpStatus.CONFLICT }
      );
    }

    // Bad request errors
    if (message.includes('invalid') || message.includes('bad request')) {
      logger.warn('Bad request error', { error: error.message, endpoint });
      return NextResponse.json(
        ApiResponseHelper.error(error.message, "INVALID_INPUT"),
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    // Rate limiting errors
    if (message.includes('rate limit') || message.includes('too many requests')) {
      logger.warn('Rate limit error', { error: error.message, endpoint });
      return NextResponse.json(
        ApiResponseHelper.error("Rate limit exceeded", "RATE_LIMITED"),
        { status: HttpStatus.TOO_MANY_REQUESTS }
      );
    }

    // Firebase-specific errors
    if (message.includes('firebase') || message.includes('firestore')) {
      logger.error('Firebase error', { error: error.message, endpoint });
      return NextResponse.json(
        ApiResponseHelper.error("Database operation failed", "INTERNAL_ERROR"),
        { status: HttpStatus.INTERNAL_SERVER_ERROR }
      );
    }

    // Generic application errors
    logger.error('Application error', { error: error.message, endpoint });
    return NextResponse.json(
      ApiResponseHelper.error("Operation failed", "INTERNAL_ERROR"),
      { status: HttpStatus.INTERNAL_SERVER_ERROR }
    );
  }

  // Unknown error types
  logger.error('Unknown error', { error: String(error), endpoint });
  return NextResponse.json(
    ApiResponseHelper.error("Internal server error", "INTERNAL_ERROR"),
    { status: HttpStatus.INTERNAL_SERVER_ERROR }
  );
}

/**
 * JSON parsing middleware with error handling
 * Eliminates duplicate JSON parsing try-catch blocks
 */
export async function parseJsonBody<T = any>(request: NextRequest): Promise<T> {
  try {
    return await request.json();
  } catch (error) {
    throw new Error('Invalid JSON in request body');
  }
}

/**
 * Validation middleware wrapper
 * Combines JSON parsing + Zod validation
 */
export async function validateRequestBody<T>(
  request: NextRequest,
  schema: z.ZodSchema<T>
): Promise<T> {
  const body = await parseJsonBody(request);
  return schema.parse(body);
}

/**
 * Combined auth + error handling wrapper
 * Most common pattern for protected routes
 */
export function withAuthAndErrorHandling<T extends any>(
  handler: (request: any, context: T) => Promise<Response>
): (request: NextRequest, context: T) => Promise<Response> {
  return withErrorHandling(
    // Note: This will be updated to use withAuth once it's migrated
    handler as ApiHandler
  );
}