import { NextResponse } from "next/server";
import { ApiResponseHelper } from "@/lib/api-response-types";

/**
 * Standard API Response Types
 */
export interface ApiSuccessResponse<T = any> {
  success: true;
  data: T;
  message?: string;
  meta?: {
    total?: number;
    page?: number;
    limit?: number;
    timestamp: string;
  };
}

export interface ApiErrorResponse {
  success: false;
  error: string;
  code: string;
  details?: any;
  meta?: {
    timestamp: string;
  };
}

export type ApiResponse<T = any> = ApiSuccessResponse<T> | ApiErrorResponse;

/**
 * Response Formatting Middleware
 * Ensures consistent response format across all API routes
 */
export class ResponseFormatter {
  /**
   * Format successful response
   */
  static success<T>(
    data: T,
    options?: {
      message?: string;
      status?: number;
      meta?: Partial<ApiSuccessResponse<T>['meta']>;
    }
  ): Response {
    const response: ApiSuccessResponse<T> = {
      success: true,
      data,
      ...(options?.message && { message: options.message }),
      meta: {
        timestamp: new Date().toISOString(),
        ...options?.meta
      }
    };

    return NextResponse.json(response, {
      status: options?.status || 200
    });
  }

  /**
   * Format error response (delegates to existing ApiResponseHelper)
   */
  static error(
    message: string,
    code: string,
    options?: {
      status?: number;
      details?: any;
    }
  ): Response {
    return NextResponse.json(
      ApiResponseHelper.error(message, code as any, options?.details),
      { status: options?.status || 500 }
    );
  }

  /**
   * Format paginated response
   */
  static paginated<T>(
    data: T[],
    pagination: {
      total: number;
      page: number;
      limit: number;
      hasMore?: boolean;
    },
    options?: {
      message?: string;
      status?: number;
    }
  ): Response {
    return ResponseFormatter.success(data, {
      ...options,
      meta: {
        timestamp: new Date().toISOString(),
        total: pagination.total,
        page: pagination.page,
        limit: pagination.limit,
        // hasMore is calculated but not part of the meta type
      }
    });
  }

  /**
   * Format empty/no content response
   */
  static noContent(message = "Operation completed successfully"): Response {
    return ResponseFormatter.success(null, {
      message,
      status: 204
    });
  }

  /**
   * Format created response
   */
  static created<T>(
    data: T,
    options?: {
      message?: string;
      location?: string;
    }
  ): Response {
    const headers: Record<string, string> = {};
    if (options?.location) {
      headers.Location = options.location;
    }

    return NextResponse.json(
      {
        success: true,
        data,
        message: options?.message || "Resource created successfully",
        meta: {
          timestamp: new Date().toISOString()
        }
      } as ApiSuccessResponse<T>,
      {
        status: 201,
        headers
      }
    );
  }
}

/**
 * Response middleware wrapper
 * Provides response formatting utilities to handlers
 */
export function withResponse<TContext, TRequest = unknown>(
  handler: (
    request: TRequest,
    context: TContext,
    respond: typeof ResponseFormatter
  ) => Promise<Response>
): (request: TRequest, context: TContext) => Promise<Response> {
  return async (request: TRequest, context: TContext): Promise<Response> => {
    return await handler(request, context, ResponseFormatter);
  };
}

/**
 * Utility functions for common response patterns
 */
export const respond = {
  success: ResponseFormatter.success,
  error: ResponseFormatter.error,
  paginated: ResponseFormatter.paginated,
  noContent: ResponseFormatter.noContent,
  created: ResponseFormatter.created
};

/**
 * Type guard to check if response is successful
 */
export function isSuccessResponse<T>(
  response: ApiResponse<T>
): response is ApiSuccessResponse<T> {
  return response.success === true;
}

/**
 * Type guard to check if response is an error
 */
export function isErrorResponse(
  response: ApiResponse
): response is ApiErrorResponse {
  return response.success === false;
}
