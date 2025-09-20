/**
 * HIVE Platform Middleware
 *
 * Consolidated middleware system that eliminates duplication across 200+ API routes
 *
 * Usage Examples:
 *
 * // Basic auth + error handling (most common)
 * export const POST = withAuthAndErrors(async (request, context) => {
 *   const userId = getUserId(request);
 *   // ... handler logic
 *   return respond.success({ userId });
 * });
 *
 * // Admin-only route
 * export const DELETE = withAdminAuthAndErrors(async (request, context) => {
 *   // ... admin logic
 *   return respond.noContent();
 * });
 *
 * // Public route with error handling
 * export const GET = withErrors(async (request, context) => {
 *   // ... public logic
 *   return respond.success(data);
 * });
 */

// Core middleware
export {
  withAuth,
  withAdminAuth,
  getUserId,
  getUserEmail,
  type AuthenticatedRequest,
  type AuthenticatedHandler,
  type NextRouteHandler
} from './auth';

export {
  withErrorHandling,
  handleApiError,
  parseJsonBody,
  validateRequestBody
} from './error-handler';

export {
  ResponseFormatter,
  withResponse,
  respond,
  isSuccessResponse,
  isErrorResponse,
  type ApiSuccessResponse,
  type ApiErrorResponse,
  type ApiResponse
} from './response';

// Combined middleware wrappers
import { withAuth, withAdminAuth, type AuthenticatedHandler } from './auth';
import { withErrorHandling, type ApiHandler } from './error-handler';
import { withResponse, type ResponseFormatter } from './response';

/**
 * Most common pattern: Auth + Error Handling + Response Formatting
 * Replaces 15+ lines of boilerplate in most protected routes
 */
export function withAuthAndErrors<T extends any>(
  handler: (
    request: any,
    context: T,
    respond: typeof ResponseFormatter
  ) => Promise<Response>
): ApiHandler {
  return withErrorHandling(
    withAuth(
      withResponse(handler)
    )
  );
}

/**
 * Admin routes pattern: Admin Auth + Error Handling + Response Formatting
 */
export function withAdminAuthAndErrors<T extends any>(
  handler: (
    request: any,
    context: T,
    respond: typeof ResponseFormatter
  ) => Promise<Response>
): ApiHandler {
  return withErrorHandling(
    withAdminAuth(
      withResponse(handler)
    )
  );
}

/**
 * Public routes pattern: Error Handling + Response Formatting only
 */
export function withErrors<T extends any>(
  handler: (
    request: any,
    context: T,
    respond: typeof ResponseFormatter
  ) => Promise<Response>
): ApiHandler {
  return withErrorHandling(
    withResponse(handler)
  );
}

/**
 * Validation middleware for POST/PUT routes
 * Combines JSON parsing + Zod validation + error handling
 */
export function withValidation<TSchema, TContext extends any>(
  schema: any,
  handler: (
    request: any,
    context: TContext,
    body: TSchema,
    respond: typeof ResponseFormatter
  ) => Promise<Response>
): ApiHandler {
  return withErrorHandling(async (request, context) => {
    const { validateRequestBody } = await import('./error-handler');
    const body = await validateRequestBody(request, schema);
    return withResponse(
      async (req, ctx, respond) => handler(req, ctx, body, respond)
    )(request, context);
  });
}

/**
 * Full stack middleware: Auth + Validation + Error Handling + Response
 * For protected routes that need request validation
 */
export function withAuthValidationAndErrors<TSchema, TContext extends any>(
  schema: any,
  handler: (
    request: any,
    context: TContext,
    body: TSchema,
    respond: typeof ResponseFormatter
  ) => Promise<Response>
): ApiHandler {
  return withAuthAndErrors(async (request, context, respond) => {
    const { validateRequestBody } = await import('./error-handler');
    const body = await validateRequestBody(request, schema);
    return handler(request, context, body, respond);
  });
}