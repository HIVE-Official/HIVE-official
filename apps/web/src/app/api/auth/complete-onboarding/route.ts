import { z } from "zod";
import { type Timestamp } from "firebase-admin/firestore";
import { validateHandleFormat } from "@/lib/handle-service";
import {
  executeOnboardingTransaction,
  executeBuilderRequestCreation,
  TransactionError
} from "@/lib/transaction-manager";
import { createRequestLogger } from "@/lib/structured-logger";
import { withAuthValidationAndErrors, getUserId, getUserEmail, type AuthenticatedRequest } from "@/lib/middleware";
import { currentEnvironment, isFirebaseAdminConfigured } from "@/lib/env";
import { NextResponse } from "next/server";

// Conditionally import dev-auth-helper only in development
let isDevUser: (email: string) => boolean = () => false;
let getDevSchool: (email: string) => string | null = () => null;

if (process.env.NODE_ENV !== 'production') {
  const devAuthHelper = require("@/lib/dev-auth-helper");
  isDevUser = devAuthHelper.isDevUser;
  getDevSchool = devAuthHelper.getDevSchool;
}


const completeOnboardingSchema = z.object({
  fullName: z
    .string()
    .min(1, "Full name is required")
    .max(100, "Full name too long"),
  userType: z.enum(["student", "alumni", "faculty"]),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  major: z.string().min(1, "Major is required"),
  academicLevel: z.string().optional(),
  academicYear: z.string().optional(), // Add academicYear field
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
  consentGiven: z
    .boolean()
    .refine((val) => val === true, "Consent must be given"),
  // Additional optional fields for profile completeness
  bio: z.string().max(500).optional(),
  statusMessage: z.string().max(200).optional(),
  interests: z.array(z.string()).optional(),
  housing: z.string().max(200).optional(),
  pronouns: z.string().max(50).optional(),
  isPublic: z.boolean().optional(),
  builderOptIn: z.boolean().optional(),
  schoolId: z.string().optional()
});

interface UserData {
  handle?: string;
  fullName?: string;
  userType?: "student" | "alumni" | "faculty";
  firstName?: string;
  lastName?: string;
  major?: string;
  academicLevel?: string;
  graduationYear?: number;
  avatarUrl?: string;
  builderRequestSpaces?: string[];
  consentGiven?: boolean;
  consentGivenAt?: Timestamp;
  onboardingCompletedAt?: Timestamp;
  updatedAt?: Timestamp;
}

type OnboardingData = z.infer<typeof completeOnboardingSchema>;

export const POST = withAuthValidationAndErrors(
  completeOnboardingSchema as any,
  async (request: AuthenticatedRequest, context, onboardingData: OnboardingData, respond) => {
    const userId = getUserId(request);
    const userEmail = getUserEmail(request);

    // Validate handle format first (outside transaction)
    const formatValidation = validateHandleFormat(onboardingData.handle);
    if (!formatValidation.isAvailable) {
      return respond.error(formatValidation.error || "Invalid handle format", "INVALID_INPUT", { status: 400 });
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

    // DEVELOPMENT: Handle development users in local environment
    const isDevelopmentUser = isDevUser(userEmail);
    const isLocalEnvironment = currentEnvironment === 'development' || !process.env.VERCEL;

    if (isDevelopmentUser && isLocalEnvironment) {
      await requestLogger.info('Development onboarding completion bypassing Firebase transaction', {
        operation: 'dev_complete_onboarding',
        handle: normalizedHandle,
        userType: onboardingData.userType
      });

      // Create mock successful onboarding result for development
      const mockUserData = {
        // Core identity fields
        fullName: onboardingData.fullName,
        handle: normalizedHandle,
        avatarUrl: onboardingData.avatarUrl || '',

        // Name fields
        firstName: onboardingData.firstName,
        lastName: onboardingData.lastName,

        // Academic information
        userType: onboardingData.userType,
        major: onboardingData.major,
        academicLevel: onboardingData.academicLevel,
        academicYear: onboardingData.academicYear || onboardingData.academicLevel,
        graduationYear: onboardingData.graduationYear,
        schoolId: 'ub-buffalo',

        // Personal information (with defaults)
        bio: onboardingData.bio || '',
        statusMessage: '',
        interests: [],
        housing: '',
        pronouns: '',

        // Privacy settings (sensible defaults)
        isPublic: true,
        showActivity: true,
        showSpaces: true,
        showConnections: true,
        allowDirectMessages: true,
        showOnlineStatus: true,

        // Builder information
        builderRequestSpaces: onboardingData.builderRequestSpaces,
        builderOptIn: onboardingData.builderRequestSpaces && onboardingData.builderRequestSpaces.length > 0,
        isBuilder: false,

        // Verification and timestamps
        consentGiven: onboardingData.consentGiven,
        consentGivenAt: new Date(),
        onboardingCompletedAt: new Date(),
        onboardingCompleted: true,
        emailVerified: true,
        profileVerified: false,
        accountStatus: 'active',
        updatedAt: new Date(),
      };

      await requestLogger.info('Development onboarding completed successfully', {
        operation: 'dev_complete_onboarding',
        handle: normalizedHandle,
        userType: onboardingData.userType
      });

      return respond.success({
        user: {
          id: userId,
          fullName: mockUserData.fullName,
          userType: mockUserData.userType,
          handle: normalizedHandle,
          major: mockUserData.major,
          academicLevel: mockUserData.academicLevel,
          graduationYear: mockUserData.graduationYear,
          builderRequestSpaces: mockUserData.builderRequestSpaces,
        },
        builderRequestsCreated: onboardingData.builderRequestSpaces?.length || 0,
        dev: true,
        devUserUpdate: {
          uid: userId,
          id: userId,
          email: userEmail,
          fullName: onboardingData.fullName,
          handle: normalizedHandle,
          bio: null,
          major: onboardingData.major,
          graduationYear: onboardingData.graduationYear,
          avatarUrl: onboardingData.avatarUrl || '',
          isBuilder: false,
          builderOptIn: false,
          schoolId: 'ub',
          onboardingCompleted: true
        }
      }, {
        message: "Development onboarding completed successfully"
      });
    }

    // Check if Firebase Admin is configured for non-development users
    if (isLocalEnvironment && !isFirebaseAdminConfigured) {
      return NextResponse.json(
        {
          error: "Firebase not configured. This feature requires Firebase Admin SDK configuration.",
          suggestion: "Please configure Firebase Admin credentials or use development users: student@test.edu, faculty@test.edu, admin@test.edu, jacob@test.edu, sarah.chen@buffalo.edu"
        },
        { status: 503 }
      );
    }

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
        if (message.includes('Handle is already taken')) {
          return respond.error("Handle is already taken", "CONFLICT", { status: 409 });
        }
        if (message.includes('Onboarding already completed')) {
          return respond.error("Onboarding already completed", "CONFLICT", { status: 409 });
        }
        if (message.includes('User not found')) {
          return respond.error("User not found", "RESOURCE_NOT_FOUND", { status: 404 });
        }
      }

      return respond.error("Failed to complete onboarding", "INTERNAL_ERROR", { status: 500 });
    }

    const result = transactionResult.data!;

    await requestLogger.info('Onboarding transaction completed successfully', {
      operation: 'complete_onboarding',
      handle: normalizedHandle,
      duration: transactionResult.duration,
      operationsCompleted: transactionResult.operationsCompleted
    });

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
        graduationYear: onboardingData.graduationYear
      });

      const cohortResponse = await fetch(
        `${request.url.split("/api")[0]}/api/spaces/cohort/auto-create`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": request.headers.get("authorization") || "",
          },
          body: JSON.stringify({
            major: onboardingData.major,
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

    return respond.success({
      user: {
        id: userId,
        fullName: result.updatedUserData.fullName,
        userType: result.updatedUserData.userType,
        handle: result.normalizedHandle,
        major: result.updatedUserData.major,
        academicLevel: result.updatedUserData.academicLevel,
        graduationYear: result.updatedUserData.graduationYear,
        builderRequestSpaces: result.updatedUserData.builderRequestSpaces,
      },
      builderRequestsCreated: onboardingData.builderRequestSpaces?.length || 0,
    }, {
      message: "Onboarding completed successfully"
    });
  }
);
