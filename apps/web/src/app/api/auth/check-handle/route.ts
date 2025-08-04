import { z } from "zod";
import { checkHandleAvailability } from "@/lib/handle-service";
import { createCrudHandler } from "@/lib/api-wrapper";
import { ApiResponseHelper, HttpStatus, ErrorCodes } from "@/lib/api-response-types";

// Validation schemas
const checkHandleBodySchema = z.object({
  handle: z.string().min(1, "Handle is required")
});

const checkHandleQuerySchema = z.object({
  handle: z.string().min(1, "Handle parameter is required")
});

interface CheckHandleResponse {
  available: boolean;
  reason?: string;
  handle?: string;
}

// Modern API handler using the new wrapper
export const { GET, POST } = createCrudHandler({
  // Handle POST requests with body validation
  post: async (context) => {
    const { handle } = context.body;
    
    // Use centralized handle validation service
    const result = await checkHandleAvailability(handle);

    const response: CheckHandleResponse = {
      available: result.isAvailable,
      reason: result.error,
      handle: result.normalizedHandle,
    };

    return response;
  },

  // Handle GET requests with query validation
  get: async (context) => {
    const { handle } = context.query;
    
    // Use centralized handle validation service
    const result = await checkHandleAvailability(handle);

    const response: CheckHandleResponse = {
      available: result.isAvailable,
      reason: result.error,
      handle: result.normalizedHandle,
    };

    return response;
  }
}, {
  // Configuration
  public: true, // No authentication required for handle checking
  rateLimit: 'auth', // Apply authentication-level rate limiting
  validation: {
    body: checkHandleBodySchema,
    query: checkHandleQuerySchema
  }
}) as any;
