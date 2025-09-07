import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { getAuth } from "firebase-admin/auth";
import { type Timestamp } from "firebase-admin/firestore";
import { validateHandleFormat } from "@/lib/handle-service";
import { 
  executeOnboardingTransaction, 
  executeBuilderRequestCreation,
  TransactionError
} from "@/lib/transaction-manager";
import { createRequestLogger } from "@/lib/structured-logger";
import { logger } from "@/lib/logger";
import { ApiResponseHelper, HttpStatus } from "@/lib/api-response-types";
import { authRateLimiter, RATE_LIMITS } from "@/lib/auth-rate-limiter";
import { validateCSRFToken } from "@/lib/csrf-protection";
import { auditLogger, AuditEventType, AuditSeverity } from "@/lib/audit-logger";


const completeOnboardingSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name too long"),
  userType: z.enum(["student", "alumni", "faculty"]),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  major: z.string().min(1, "Major is required"), // Single major field for now
  majors: z.array(z.string()).optional(), // Optional array for future expansion
  academicLevel: z.string().optional(),
  graduationYear: z.number().int().min(1900).max(2040),
  handle: z
    .string()
    .min(3, "Handle must be at least 3 characters")
    .max(20, "Handle must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9._-]+$/,
      "Handle can only contain letters, numbers, periods, underscores, and hyphens"
    ),
  avatarUrl: z.string().url().optional().or(z.literal("")),
  builderRequestSpaces: z.array(z.string()).default([]),
  interests: z.array(z.string()).default([]), // Added interests array
  consentGiven: z
    .boolean()
    .refine((val) => val === true, "Consent must be given") });

interface _UserData {
  handle?: string;
  fullName?: string;
  userType?: "student" | "alumni" | "faculty";
  firstName?: string;
  lastName?: string;
  majors?: string[]; // Changed from major?: string
  academicLevel?: string;
  graduationYear?: number;
  avatarUrl?: string;
  builderRequestSpaces?: string[];
  interests?: string[]; // Added interests array
  consentGiven?: boolean;
  consentGivenAt?: Timestamp;
  onboardingCompletedAt?: Timestamp;
  updatedAt?: Timestamp;
}

export async function POST(request: NextRequest) {
  try {
    // CSRF Protection - prevent cross-site request forgery
    const csrfValidation = validateCSRFToken(request);
    if (!csrfValidation.valid) {
      console.warn('🚨 CSRF validation failed for complete onboarding:', {
        error: csrfValidation.error,
        userAgent: request.headers.get('user-agent'),
        origin: request.headers.get('origin')
      });
      
      return NextResponse.json(
        { error: "Invalid request - CSRF validation failed" },
        { status: 403 }
      );
    }

    // Rate limiting - prevent onboarding spam
    const clientKey = authRateLimiter.getClientKey(request);
    const rateLimit = authRateLimiter.checkLimit(
      `complete-onboarding:${clientKey}`,
      RATE_LIMITS.ONBOARDING_COMPLETE.maxRequests,
      RATE_LIMITS.ONBOARDING_COMPLETE.windowMs
    );

    if (!rateLimit.allowed) {
      return NextResponse.json(
        { 
          error: "Too many onboarding attempts. Please try again later.",
          retryAfter: rateLimit.retryAfter 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': rateLimit.retryAfter?.toString() || '600',
            'X-RateLimit-Remaining': '0',
            'X-RateLimit-Reset': rateLimit.resetTime?.toString() || ''
          }
        }
      );
    }

    // Get the authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(ApiResponseHelper.error("Missing or invalid authorization header", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const idToken = authHeader.substring(7);
    
    // SECURITY: Development token bypass removed for production safety
    // All tokens must be validated through Firebase Auth
    
    const auth = getAuth();

    // Verify the ID token
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(idToken);
    } catch (error) {
      logger.error('Invalid ID token', { error: error, endpoint: '/api/auth/complete-onboarding' });
      return NextResponse.json(ApiResponseHelper.error("Invalid or expired token", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    if (!decodedToken?.uid || !decodedToken?.email) {
      return NextResponse.json(ApiResponseHelper.error("Invalid token data", "UNAUTHORIZED"), { status: HttpStatus.UNAUTHORIZED });
    }

    const userId = decodedToken.uid;
    const userEmail = decodedToken.email;

    // Parse and validate the request body
    let body: unknown;
    try {
      body = await request.json();
    } catch (jsonError) {
      return NextResponse.json(ApiResponseHelper.error("Invalid JSON in request body", "INVALID_INPUT"), { status: HttpStatus.BAD_REQUEST });
    }

    let onboardingData;
    try {
      onboardingData = completeOnboardingSchema.parse(body);
    } catch (validationError) {
      if (validationError instanceof z.ZodError) {
        return NextResponse.json(
          { error: "Invalid request data", details: validationError.errors },
          { status: HttpStatus.BAD_REQUEST }
        );
      }
      throw validationError;
    }

    // Validate handle format first (outside transaction)
    const formatValidation = validateHandleFormat(onboardingData.handle);
    if (!formatValidation.isAvailable) {
      return NextResponse.json(
        { error: formatValidation.error },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    const normalizedHandle = formatValidation.normalizedHandle!;

    // Get request ID for tracking
    const requestId = request.headers.get('x-request-id') || `req_${Date.now()}`;
    const requestLogger = createRequestLogger(requestId, userId);

    await requestLogger.info('Starting onboarding completion', {
      operation: 'complete_onboarding',
      handle: normalizedHandle,
      userType: onboardingData.userType
    });

    // Use transaction manager for atomicity and consistency
    const transactionResult = await executeOnboardingTransaction(
      userId,
      userEmail,
      onboardingData,
      normalizedHandle,
      { requestId }
    );

    if (!transactionResult.success) {
      await requestLogger.error('Onboarding transaction failed', {
        operation: 'complete_onboarding',
        error: transactionResult.error?.message,
        operationsCompleted: transactionResult.operationsCompleted,
        operationsFailed: transactionResult.operationsFailed,
        duration: transactionResult.duration
      }, transactionResult.error);

      // Handle specific error types
      if (transactionResult.error instanceof TransactionError) {
        const message = transactionResult.error.message;
        
        // Audit log onboarding failure
        await auditLogger.log(
          AuditEventType.ONBOARDING_FAILED,
          AuditSeverity.WARNING,
          `Onboarding failed for ${userEmail}: ${message}`,
          {
            userId,
            userEmail,
            request,
            error: transactionResult.error,
            metadata: { handle: normalizedHandle }
          }
        );
        
        if (message.includes('Handle is already taken')) {
          return NextResponse.json(ApiResponseHelper.error("Handle is already taken", "UNKNOWN_ERROR"), { status: 409 });
        }
        if (message.includes('Onboarding already completed')) {
          return NextResponse.json(ApiResponseHelper.error("Onboarding already completed", "UNKNOWN_ERROR"), { status: 409 });
        }
        if (message.includes('User not found')) {
          return NextResponse.json(ApiResponseHelper.error("User not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
        }
      }

      return NextResponse.json(ApiResponseHelper.error("Failed to complete onboarding", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
    }

    const result = transactionResult.data!;

    await requestLogger.info('Onboarding transaction completed successfully', {
      operation: 'complete_onboarding',
      handle: normalizedHandle,
      duration: transactionResult.duration,
      operationsCompleted: transactionResult.operationsCompleted
    });
    
    // Audit log successful onboarding
    await auditLogger.log(
      AuditEventType.ONBOARDING_COMPLETED,
      AuditSeverity.INFO,
      `User ${userEmail} completed onboarding successfully`,
      {
        userId,
        userEmail,
        request,
        metadata: {
          handle: normalizedHandle,
          userType: onboardingData.userType,
          major: onboardingData.major,
          graduationYear: onboardingData.graduationYear
        }
      }
    );

    // Create builder requests if user selected spaces (using transaction manager)
    if (onboardingData.builderRequestSpaces && onboardingData.builderRequestSpaces.length > 0) {
      await requestLogger.info('Creating builder requests', {
        operation: 'create_builder_requests',
        spaceCount: onboardingData.builderRequestSpaces.length,
        spaceIds: onboardingData.builderRequestSpaces
      });

      const builderRequestResult = await executeBuilderRequestCreation(
        userId,
        userEmail,
        result.updatedUserData.fullName || "",
        onboardingData.builderRequestSpaces,
        onboardingData.userType,
        { requestId }
      );

      if (!builderRequestResult.success) {
        await requestLogger.warn('Builder request creation failed, but onboarding succeeded', {
          operation: 'create_builder_requests',
          error: builderRequestResult.error,
          operationsCompleted: builderRequestResult.operationsCompleted,
          operationsFailed: builderRequestResult.operationsFailed
        });
      } else {
        await requestLogger.info('Builder requests created successfully', {
          operation: 'create_builder_requests',
          duration: builderRequestResult.duration,
          operationsCompleted: builderRequestResult.operationsCompleted
        });
      }
    }

    // After successful onboarding, create and auto-join cohort spaces
    try {
      await requestLogger.info('Creating cohort spaces', {
        operation: 'create_cohort_spaces',
        major: onboardingData.major,
        majors: onboardingData.majors || [onboardingData.major], // Ensure majors array exists
        graduationYear: onboardingData.graduationYear
      });

      const cohortResponse = await fetch(
        `${request.url.split("/api")[0]}/api/spaces/cohort/auto-create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            major: onboardingData.major,
        majors: onboardingData.majors || [onboardingData.major], // Ensure majors array exists // Send array instead of single major
            graduationYear: onboardingData.graduationYear
          }),
        }
      );

      if (!cohortResponse.ok) {
        const errorText = await cohortResponse.text();
        await requestLogger.warn('Cohort space creation failed, but onboarding succeeded', {
          operation: 'create_cohort_spaces',
          status: cohortResponse.status,
          error: errorText
        });
      } else {
        const cohortResult = await cohortResponse.json();
        await requestLogger.info('Cohort spaces created successfully', {
          operation: 'create_cohort_spaces',
          result: cohortResult
        });
      }
    } catch (cohortError) {
      await requestLogger.warn('Cohort space creation error, but onboarding succeeded', {
        operation: 'create_cohort_spaces',
        error: cohortError instanceof Error ? cohortError : new Error(String(cohortError))
      });
    }

    // After cohort space creation, auto-join the user to other relevant spaces
    try {
      await requestLogger.info('Attempting auto-join to spaces', {
        operation: 'auto_join_spaces'
      });

      const autoJoinResponse = await fetch(
        `${request.url.split("/api")[0]}/api/spaces/auto-join`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ userId }),
        }
      );

      if (!autoJoinResponse.ok) {
        const errorText = await autoJoinResponse.text();
        await requestLogger.warn('Auto-join failed, but onboarding succeeded', {
          operation: 'auto_join_spaces',
          status: autoJoinResponse.status,
          error: errorText
        });
      } else {
        const autoJoinResult = (await autoJoinResponse.json()) as unknown;
        await requestLogger.info('Auto-join successful', {
          operation: 'auto_join_spaces',
          result: autoJoinResult
        });
      }
    } catch (autoJoinError) {
      await requestLogger.warn('Auto-join error, but onboarding succeeded', {
        operation: 'auto_join_spaces',
        error: autoJoinError instanceof Error ? autoJoinError : new Error(String(autoJoinError))
      });
    }

    return NextResponse.json({
      success: true,
      message: "Onboarding completed successfully",
      user: {
        id: userId,
        fullName: result.updatedUserData.fullName,
        userType: result.updatedUserData.userType,
        handle: result.normalizedHandle,
        major: result.updatedUserData.major,
        majors: result.updatedUserData.majors || [result.updatedUserData.major],
        academicLevel: result.updatedUserData.academicLevel,
        graduationYear: result.updatedUserData.graduationYear,
        interests: result.updatedUserData.interests,
        builderRequestSpaces: result.updatedUserData.builderRequestSpaces,
      },
      builderRequestsCreated: onboardingData.builderRequestSpaces?.length || 0 });
  } catch (error) {
    logger.error('Error completing onboarding', { error: error, endpoint: '/api/auth/complete-onboarding' });

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: HttpStatus.BAD_REQUEST }
      );
    }

    if (error instanceof Error) {
      if (error.message === "Handle is already taken") {
        return NextResponse.json(ApiResponseHelper.error("Handle is already taken", "UNKNOWN_ERROR"), { status: 409 });
      }

      if (error.message === "Onboarding already completed") {
        return NextResponse.json(ApiResponseHelper.error("Onboarding already completed", "UNKNOWN_ERROR"), { status: 409 });
      }

      if (error.message === "User not found") {
        return NextResponse.json(ApiResponseHelper.error("User not found", "RESOURCE_NOT_FOUND"), { status: HttpStatus.NOT_FOUND });
      }
    }

    return NextResponse.json(ApiResponseHelper.error("Failed to complete onboarding", "INTERNAL_ERROR"), { status: HttpStatus.INTERNAL_SERVER_ERROR });
  }
}
