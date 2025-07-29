import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { z } from "zod";
import { dbAdmin } from "@/lib/firebase-admin";
import { getAuth } from "firebase-admin/auth";
import { type Timestamp } from "firebase-admin/firestore";
import { validateHandleFormat } from "@/lib/handle-service";
import { 
  executeOnboardingTransaction, 
  executeBuilderRequestCreation,
  TransactionError
} from "@/lib/transaction-manager";
import { createRequestLogger } from "@/lib/structured-logger";


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

export async function POST(request: NextRequest) {
  try {
    // Get the authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 }
      );
    }

    const idToken = authHeader.split("Bearer ")[1];
    
    // Check for development mode token
    if (idToken.startsWith("dev_token_")) {
      const body = (await request.json()) as unknown;
      const onboardingData = completeOnboardingSchema.parse(body);
      
      console.log('Development mode onboarding completion:', onboardingData);
      
      // In development mode, just return success
      return NextResponse.json({
        success: true,
        message: "Onboarding completed successfully (development mode)",
        user: {
          id: idToken.replace("dev_token_", ""),
          fullName: onboardingData.fullName,
          userType: onboardingData.userType,
          handle: onboardingData.handle.toLowerCase(),
          major: onboardingData.major,
          builderRequestSpaces: onboardingData.builderRequestSpaces,
        },
      });
    }
    
    const auth = getAuth();

    // Verify the ID token
    let decodedToken;
    try {
      decodedToken = await auth.verifyIdToken(idToken);
    } catch (error) {
      console.error("Invalid ID token:", error);
      return NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
    }

    const userId = decodedToken.uid;
    const userEmail = decodedToken.email;

    if (!userEmail) {
      return NextResponse.json(
        { error: "Email not found in token" },
        { status: 400 }
      );
    }

    // Parse and validate the request body
    const body = (await request.json()) as unknown;
    const onboardingData = completeOnboardingSchema.parse(body);

    // Validate handle format first (outside transaction)
    const formatValidation = validateHandleFormat(onboardingData.handle);
    if (!formatValidation.isAvailable) {
      return NextResponse.json(
        { error: formatValidation.error },
        { status: 400 }
      );
    }

    const normalizedHandle = formatValidation.normalizedHandle!;

    // Get request ID for tracking
    const requestId = request.headers.get('x-request-id') || `req_${Date.now()}`;
    const logger = createRequestLogger(requestId, userId);

    await logger.info('Starting onboarding completion', {
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
      await logger.error('Onboarding transaction failed', {
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
          return NextResponse.json({ error: "Handle is already taken" }, { status: 409 });
        }
        if (message.includes('Onboarding already completed')) {
          return NextResponse.json({ error: "Onboarding already completed" }, { status: 409 });
        }
        if (message.includes('User not found')) {
          return NextResponse.json({ error: "User not found" }, { status: 404 });
        }
      }

      return NextResponse.json(
        { error: "Failed to complete onboarding" },
        { status: 500 }
      );
    }

    const result = transactionResult.data!;

    await logger.info('Onboarding transaction completed successfully', {
      operation: 'complete_onboarding',
      handle: normalizedHandle,
      duration: transactionResult.duration,
      operationsCompleted: transactionResult.operationsCompleted
    });

    // Create builder requests if user selected spaces (using transaction manager)
    if (onboardingData.builderRequestSpaces && onboardingData.builderRequestSpaces.length > 0) {
      await logger.info('Creating builder requests', {
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
        await logger.warn('Builder request creation failed, but onboarding succeeded', {
          operation: 'create_builder_requests',
          error: builderRequestResult.error?.message,
          operationsCompleted: builderRequestResult.operationsCompleted,
          operationsFailed: builderRequestResult.operationsFailed
        }, builderRequestResult.error);
      } else {
        await logger.info('Builder requests created successfully', {
          operation: 'create_builder_requests',
          duration: builderRequestResult.duration,
          operationsCompleted: builderRequestResult.operationsCompleted
        });
      }
    }

    // After successful onboarding, create and auto-join cohort spaces
    try {
      await logger.info('Creating cohort spaces', {
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
            "Authorization": `Bearer ${idToken}`,
          },
          body: JSON.stringify({
            major: onboardingData.major,
            graduationYear: onboardingData.graduationYear
          }),
        }
      );

      if (!cohortResponse.ok) {
        const errorText = await cohortResponse.text();
        await logger.warn('Cohort space creation failed, but onboarding succeeded', {
          operation: 'create_cohort_spaces',
          status: cohortResponse.status,
          error: errorText
        });
      } else {
        const cohortResult = await cohortResponse.json();
        await logger.info('Cohort spaces created successfully', {
          operation: 'create_cohort_spaces',
          result: cohortResult
        });
      }
    } catch (cohortError) {
      await logger.warn('Cohort space creation error, but onboarding succeeded', {
        operation: 'create_cohort_spaces'
      }, cohortError instanceof Error ? cohortError : new Error(String(cohortError)));
    }

    // After cohort space creation, auto-join the user to other relevant spaces
    try {
      await logger.info('Attempting auto-join to spaces', {
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
        await logger.warn('Auto-join failed, but onboarding succeeded', {
          operation: 'auto_join_spaces',
          status: autoJoinResponse.status,
          error: errorText
        });
      } else {
        const autoJoinResult = (await autoJoinResponse.json()) as unknown;
        await logger.info('Auto-join successful', {
          operation: 'auto_join_spaces',
          result: autoJoinResult
        });
      }
    } catch (autoJoinError) {
      await logger.warn('Auto-join error, but onboarding succeeded', {
        operation: 'auto_join_spaces'
      }, autoJoinError instanceof Error ? autoJoinError : new Error(String(autoJoinError)));
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
        academicLevel: result.updatedUserData.academicLevel,
        graduationYear: result.updatedUserData.graduationYear,
        builderRequestSpaces: result.updatedUserData.builderRequestSpaces,
      },
      builderRequestsCreated: onboardingData.builderRequestSpaces?.length || 0,
    });
  } catch (error) {
    console.error("Error completing onboarding:", error);

    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Invalid request data", details: error.errors },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      if (error.message === "Handle is already taken") {
        return NextResponse.json(
          { error: "Handle is already taken" },
          { status: 409 }
        );
      }

      if (error.message === "Onboarding already completed") {
        return NextResponse.json(
          { error: "Onboarding already completed" },
          { status: 409 }
        );
      }

      if (error.message === "User not found") {
        return NextResponse.json({ error: "User not found" }, { status: 404 });
      }
    }

    return NextResponse.json(
      { error: "Failed to complete onboarding" },
      { status: 500 }
    );
  }
}
